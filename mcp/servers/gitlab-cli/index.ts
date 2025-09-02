#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { $ } from "zx";

// Configure zx to not echo commands for cleaner output
$.verbose = false;

const server = new Server(
  {
    name: "gitlab-cli-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available GitLab CLI tools
const GITLAB_TOOLS: Tool[] = [
  {
    name: "gitlab_issues_list",
    description: "List issues in a GitLab project using glab CLI",
    inputSchema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "Project path (owner/repo) or project ID. Optional - uses current repo if omitted",
        },
        state: {
          type: "string",
          enum: ["opened", "closed", "all"],
          description: "Issue state filter",
          default: "opened",
        },
        assignee: {
          type: "string",
          description: "Filter by assignee username",
        },
        label: {
          type: "string",
          description: "Filter by label",
        },
        limit: {
          type: "number",
          description: "Maximum number of issues to return",
          default: 20,
        },
      },
    },
  },
  {
    name: "gitlab_issue_view",
    description: "View detailed information about a specific GitLab issue",
    inputSchema: {
      type: "object",
      properties: {
        issue_id: {
          type: "number",
          description: "Issue ID or number",
        },
        project: {
          type: "string",
          description: "Project path (owner/repo) or project ID. Optional - uses current repo if omitted",
        },
      },
      required: ["issue_id"],
    },
  },
  {
    name: "gitlab_mr_list",
    description: "List merge requests in a GitLab project using glab CLI",
    inputSchema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "Project path (owner/repo) or project ID. Optional - uses current repo if omitted",
        },
        state: {
          type: "string",
          enum: ["opened", "closed", "merged", "all"],
          description: "Merge request state filter",
          default: "opened",
        },
        assignee: {
          type: "string",
          description: "Filter by assignee username",
        },
        author: {
          type: "string",
          description: "Filter by author username",
        },
        limit: {
          type: "number",
          description: "Maximum number of merge requests to return",
          default: 20,
        },
      },
    },
  },
  {
    name: "gitlab_mr_view",
    description: "View detailed information about a specific merge request",
    inputSchema: {
      type: "object",
      properties: {
        mr_id: {
          type: "number",
          description: "Merge request ID or number",
        },
        project: {
          type: "string",
          description: "Project path (owner/repo) or project ID. Optional - uses current repo if omitted",
        },
      },
      required: ["mr_id"],
    },
  },
  {
    name: "gitlab_project_info",
    description: "Get information about a GitLab project",
    inputSchema: {
      type: "object",
      properties: {
        project: {
          type: "string",
          description: "Project path (owner/repo) or project ID. Optional - uses current repo if omitted",
        },
      },
    },
  },
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: GITLAB_TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "gitlab_issues_list": {
        let command = "glab issue list";
        
        if (args.project) command += ` --repo ${args.project}`;
        if (args.state) command += ` --state ${args.state}`;
        if (args.assignee) command += ` --assignee ${args.assignee}`;
        if (args.label) command += ` --label "${args.label}"`;
        if (args.limit) command += ` --limit ${args.limit}`;

        const result = await $`${command.split(" ")}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "gitlab_issue_view": {
        let command = `glab issue view ${args.issue_id}`;
        
        if (args.project) command += ` --repo ${args.project}`;

        const result = await $`${command.split(" ")}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "gitlab_mr_list": {
        let command = "glab mr list";
        
        if (args.project) command += ` --repo ${args.project}`;
        if (args.state) command += ` --state ${args.state}`;
        if (args.assignee) command += ` --assignee ${args.assignee}`;
        if (args.author) command += ` --author ${args.author}`;
        if (args.limit) command += ` --limit ${args.limit}`;

        const result = await $`${command.split(" ")}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "gitlab_mr_view": {
        let command = `glab mr view ${args.mr_id}`;
        
        if (args.project) command += ` --repo ${args.project}`;

        const result = await $`${command.split(" ")}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "gitlab_project_info": {
        let command = "glab repo view";
        
        if (args.project) command += ` ${args.project}`;

        const result = await $`${command.split(" ")}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
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
          text: `Error executing GitLab CLI command: ${error instanceof Error ? error.message : String(error)}`,
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
  console.error("GitLab CLI MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});