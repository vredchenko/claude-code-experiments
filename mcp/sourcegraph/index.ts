#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "sourcegraph-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Sourcegraph configuration
const SOURCEGRAPH_ENDPOINT = process.env.SRC_ENDPOINT || "https://sourcegraph.com";
const SOURCEGRAPH_TOKEN = process.env.SRC_ACCESS_TOKEN;

// Data models matching the Python implementation
interface Match {
  line_number: number;
  text: string;
}

interface FormattedResult {
  filename: string;
  repository: string;
  matches: Match[];
  url: string;
}

// Helper function to perform Sourcegraph search using streaming API
async function sourcegraphSearch(query: string, num: number = 20): Promise<any> {
  const searchUrl = new URL(`${SOURCEGRAPH_ENDPOINT}/.api/search/stream`);
  searchUrl.searchParams.append("q", query);
  searchUrl.searchParams.append("t", "keyword");
  searchUrl.searchParams.append("v", "V3");
  searchUrl.searchParams.append("cm", "true");
  searchUrl.searchParams.append("display", num.toString());

  const headers: Record<string, string> = {
    Accept: "text/event-stream",
    "Cache-Control": "no-cache",
  };

  if (SOURCEGRAPH_TOKEN) {
    headers["Authorization"] = `token ${SOURCEGRAPH_TOKEN}`;
  }

  const response = await fetch(searchUrl.toString(), {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Sourcegraph search error: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  const events = text.split("\n\n").filter((event) => event.trim());

  let results: any[] = [];
  let filters: any[] = [];
  let progress: any[] = [];
  let alert: any = null;

  for (const event of events) {
    if (!event.startsWith("data: ")) continue;

    try {
      const data = JSON.parse(event.slice(6));

      if (data.type === "matches") {
        results.push(...data.data);
      } else if (data.type === "filters") {
        filters = data.data;
      } else if (data.type === "progress") {
        progress.push(data.data);
      } else if (data.type === "alert") {
        alert = data.data;
      }
    } catch (error) {
      // Skip malformed JSON
      continue;
    }
  }

  return { results, filters, progress, alert };
}

// Format search results to match Python implementation structure
function formatResults(searchResponse: any, num: number): FormattedResult[] {
  const { results } = searchResponse;
  const formattedResults: FormattedResult[] = [];

  for (const result of results.slice(0, num)) {
    if (result.type === "content") {
      const matches: Match[] = [];

      for (const lineMatch of result.lineMatches || []) {
        matches.push({
          line_number: lineMatch.lineNumber,
          text: lineMatch.line.slice(0, 200), // Truncate long lines like Python version
        });
      }

      formattedResults.push({
        filename: result.path,
        repository: result.repository,
        matches,
        url: `${SOURCEGRAPH_ENDPOINT}${result.repository}/-/blob${result.path}`,
      });
    }
  }

  return formattedResults;
}

// Helper function to fetch file content
async function fetchContent(
  repository: string,
  path: string,
  rev: string = "HEAD"
): Promise<string> {
  const contentUrl = `${SOURCEGRAPH_ENDPOINT}${repository}/-/raw${path}?rev=${rev}`;

  const headers: Record<string, string> = {};
  if (SOURCEGRAPH_TOKEN) {
    headers["Authorization"] = `token ${SOURCEGRAPH_TOKEN}`;
  }

  const response = await fetch(contentUrl, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

// Define available Sourcegraph tools matching Python implementation
const SOURCEGRAPH_TOOLS: Tool[] = [
  {
    name: "search",
    description:
      "Search code across repositories using Sourcegraph with advanced query syntax support",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search query using Sourcegraph search syntax (supports regex, language filters, etc.)",
        },
        num: {
          type: "number",
          description: "Maximum number of results to return",
          default: 20,
          minimum: 1,
          maximum: 100,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "search_prompt_guide",
    description: "Generate context-aware search query guidance and examples for Sourcegraph",
    inputSchema: {
      type: "object",
      properties: {
        context: {
          type: "string",
          description: "Context or domain for which to generate search guidance",
        },
        organization: {
          type: "string",
          description: "Optional organization name for customized guidance",
        },
      },
      required: ["context"],
    },
  },
  {
    name: "fetch_content",
    description: "Retrieve the full content of a specific file from a repository",
    inputSchema: {
      type: "object",
      properties: {
        repository: {
          type: "string",
          description: "Repository path (e.g., '/github.com/owner/repo')",
        },
        path: {
          type: "string",
          description: "File path within the repository (e.g., '/src/main.py')",
        },
        rev: {
          type: "string",
          description: "Git revision (branch, tag, or commit SHA)",
          default: "HEAD",
        },
      },
      required: ["repository", "path"],
    },
  },
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: SOURCEGRAPH_TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "search": {
        const query = args.query as string;
        const num = (args.num as number) || 20;

        const searchResponse = await sourcegraphSearch(query, num);
        const formattedResults = formatResults(searchResponse, num);

        // Format output similar to Python implementation
        let output = `Found ${formattedResults.length} results for query: "${query}"\n\n`;

        for (const result of formattedResults) {
          output += `Repository: ${result.repository}\n`;
          output += `File: ${result.filename}\n`;
          output += `URL: ${result.url}\n`;
          output += `Matches:\n`;

          for (const match of result.matches) {
            output += `  Line ${match.line_number}: ${match.text}\n`;
          }

          output += "\n---\n\n";
        }

        return {
          content: [
            {
              type: "text",
              text: output,
            },
          ],
        };
      }

      case "search_prompt_guide": {
        const context = args.context as string;
        const organization = args.organization as string;

        // Generate contextual search guidance
        let guide = `# Sourcegraph Search Guide for: ${context}\n\n`;
        guide += `## Basic Search Patterns\n`;
        guide += `- \`function_name\` - Find function definitions\n`;
        guide += `- \`class ClassName\` - Find class declarations\n`;
        guide += `- \`import package\` - Find import statements\n`;
        guide += `- \`"exact phrase"\` - Find exact text matches\n\n`;

        guide += `## Advanced Filters\n`;
        guide += `- \`lang:typescript\` - Filter by programming language\n`;
        guide += `- \`file:.*\\.test\\.\` - Filter by file pattern (regex)\n`;
        guide += `- \`repo:^github\\.com/org/\` - Filter by repository pattern\n`;
        guide += `- \`type:symbol\` - Search for symbols only\n`;
        guide += `- \`archived:no\` - Exclude archived repositories\n\n`;

        guide += `## Context-Specific Examples\n`;

        if (context.toLowerCase().includes("api")) {
          guide += `- \`@app.route lang:python\` - Find Flask/FastAPI routes\n`;
          guide += `- \`fetch.*api.*endpoint\` - Find API endpoint calls\n`;
        }

        if (context.toLowerCase().includes("test")) {
          guide += `- \`describe.*test lang:javascript\` - Find test suites\n`;
          guide += `- \`assert.*equal file:.*test\` - Find test assertions\n`;
        }

        if (organization) {
          guide += `\n## Organization-Specific Tips\n`;
          guide += `- Use \`repo:^github\\.com/${organization}/\` to search within your org\n`;
          guide += `- Common patterns in ${organization} codebase may include specific frameworks or conventions\n`;
        }

        guide += `\n## Pro Tips\n`;
        guide += `- Use \`.*\` for regex wildcards\n`;
        guide += `- Combine filters with \`AND\`, \`OR\`, \`NOT\`\n`;
        guide += `- Use parentheses for complex boolean logic\n`;

        return {
          content: [
            {
              type: "text",
              text: guide,
            },
          ],
        };
      }

      case "fetch_content": {
        const repository = args.repository as string;
        const path = args.path as string;
        const rev = (args.rev as string) || "HEAD";

        const content = await fetchContent(repository, path, rev);

        return {
          content: [
            {
              type: "text",
              text: `File: ${repository}${path} (rev: ${rev})\n\n${content}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sourcegraph MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
