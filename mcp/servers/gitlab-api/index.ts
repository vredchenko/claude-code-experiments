#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "gitlab-api-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// GitLab API configuration
const GITLAB_API_BASE = process.env.GITLAB_API_URL || "https://gitlab.com/api/v4";
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

if (!GITLAB_TOKEN) {
  console.error("Error: GITLAB_TOKEN environment variable is required");
  process.exit(1);
}

// Helper function to make GitLab API requests
async function gitLabApiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${GITLAB_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${GITLAB_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`GitLab API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Define available GitLab API tools
const GITLAB_TOOLS: Tool[] = [
  {
    name: "gitlab_api_projects_list",
    description: "List GitLab projects using direct API calls",
    inputSchema: {
      type: "object",
      properties: {
        owned: {
          type: "boolean",
          description: "Limit to projects owned by authenticated user",
          default: false,
        },
        membership: {
          type: "boolean",
          description: "Limit to projects that user is a member of",
          default: false,
        },
        starred: {
          type: "boolean",
          description: "Limit to projects starred by authenticated user",
          default: false,
        },
        search: {
          type: "string",
          description: "Search for projects by name",
        },
        per_page: {
          type: "number",
          description: "Number of projects per page",
          default: 20,
          maximum: 100,
        },
        page: {
          type: "number",
          description: "Page number",
          default: 1,
        },
      },
    },
  },
  {
    name: "gitlab_api_project_get",
    description: "Get detailed information about a specific GitLab project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID or path (e.g., 'owner/project' or '123')",
        },
      },
      required: ["project_id"],
    },
  },
  {
    name: "gitlab_api_issues_list",
    description: "List issues in a GitLab project using direct API calls",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID or path (e.g., 'owner/project' or '123')",
        },
        state: {
          type: "string",
          enum: ["opened", "closed", "all"],
          description: "Issue state filter",
          default: "opened",
        },
        assignee_username: {
          type: "string",
          description: "Filter by assignee username",
        },
        author_username: {
          type: "string",
          description: "Filter by author username",
        },
        labels: {
          type: "string",
          description: "Comma-separated list of label names",
        },
        milestone: {
          type: "string",
          description: "Milestone title",
        },
        per_page: {
          type: "number",
          description: "Number of issues per page",
          default: 20,
          maximum: 100,
        },
        page: {
          type: "number",
          description: "Page number",
          default: 1,
        },
      },
      required: ["project_id"],
    },
  },
  {
    name: "gitlab_api_issue_get",
    description: "Get detailed information about a specific GitLab issue",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID or path (e.g., 'owner/project' or '123')",
        },
        issue_iid: {
          type: "number",
          description: "Issue internal ID (IID)",
        },
      },
      required: ["project_id", "issue_iid"],
    },
  },
  {
    name: "gitlab_api_merge_requests_list",
    description: "List merge requests in a GitLab project using direct API calls",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID or path (e.g., 'owner/project' or '123')",
        },
        state: {
          type: "string",
          enum: ["opened", "closed", "locked", "merged", "all"],
          description: "Merge request state filter",
          default: "opened",
        },
        target_branch: {
          type: "string",
          description: "Filter by target branch",
        },
        source_branch: {
          type: "string",
          description: "Filter by source branch",
        },
        assignee_username: {
          type: "string",
          description: "Filter by assignee username",
        },
        author_username: {
          type: "string",
          description: "Filter by author username",
        },
        labels: {
          type: "string",
          description: "Comma-separated list of label names",
        },
        per_page: {
          type: "number",
          description: "Number of merge requests per page",
          default: 20,
          maximum: 100,
        },
        page: {
          type: "number",
          description: "Page number",
          default: 1,
        },
      },
      required: ["project_id"],
    },
  },
  {
    name: "gitlab_api_merge_request_get",
    description: "Get detailed information about a specific merge request",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID or path (e.g., 'owner/project' or '123')",
        },
        merge_request_iid: {
          type: "number",
          description: "Merge request internal ID (IID)",
        },
      },
      required: ["project_id", "merge_request_iid"],
    },
  },
  {
    name: "gitlab_api_pipelines_list",
    description: "List CI/CD pipelines for a GitLab project",
    inputSchema: {
      type: "object",
      properties: {
        project_id: {
          type: "string",
          description: "Project ID or path (e.g., 'owner/project' or '123')",
        },
        status: {
          type: "string",
          enum: ["created", "waiting_for_resource", "preparing", "pending", "running", "success", "failed", "canceled", "skipped", "manual", "scheduled"],
          description: "Pipeline status filter",
        },
        ref: {
          type: "string",
          description: "Git reference (branch/tag)",
        },
        per_page: {
          type: "number",
          description: "Number of pipelines per page",
          default: 20,
          maximum: 100,
        },
        page: {
          type: "number",
          description: "Page number",
          default: 1,
        },
      },
      required: ["project_id"],
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
      case "gitlab_api_projects_list": {
        let endpoint = "/projects";
        const params = new URLSearchParams();

        if (args.owned) params.append("owned", "true");
        if (args.membership) params.append("membership", "true");
        if (args.starred) params.append("starred", "true");
        if (args.search) params.append("search", args.search);
        if (args.per_page) params.append("per_page", args.per_page.toString());
        if (args.page) params.append("page", args.page.toString());

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const data = await gitLabApiRequest(endpoint);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "gitlab_api_project_get": {
        const projectId = encodeURIComponent(args.project_id);
        const data = await gitLabApiRequest(`/projects/${projectId}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "gitlab_api_issues_list": {
        const projectId = encodeURIComponent(args.project_id);
        let endpoint = `/projects/${projectId}/issues`;
        const params = new URLSearchParams();

        if (args.state) params.append("state", args.state);
        if (args.assignee_username) params.append("assignee_username", args.assignee_username);
        if (args.author_username) params.append("author_username", args.author_username);
        if (args.labels) params.append("labels", args.labels);
        if (args.milestone) params.append("milestone", args.milestone);
        if (args.per_page) params.append("per_page", args.per_page.toString());
        if (args.page) params.append("page", args.page.toString());

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const data = await gitLabApiRequest(endpoint);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "gitlab_api_issue_get": {
        const projectId = encodeURIComponent(args.project_id);
        const data = await gitLabApiRequest(`/projects/${projectId}/issues/${args.issue_iid}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "gitlab_api_merge_requests_list": {
        const projectId = encodeURIComponent(args.project_id);
        let endpoint = `/projects/${projectId}/merge_requests`;
        const params = new URLSearchParams();

        if (args.state) params.append("state", args.state);
        if (args.target_branch) params.append("target_branch", args.target_branch);
        if (args.source_branch) params.append("source_branch", args.source_branch);
        if (args.assignee_username) params.append("assignee_username", args.assignee_username);
        if (args.author_username) params.append("author_username", args.author_username);
        if (args.labels) params.append("labels", args.labels);
        if (args.per_page) params.append("per_page", args.per_page.toString());
        if (args.page) params.append("page", args.page.toString());

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const data = await gitLabApiRequest(endpoint);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "gitlab_api_merge_request_get": {
        const projectId = encodeURIComponent(args.project_id);
        const data = await gitLabApiRequest(`/projects/${projectId}/merge_requests/${args.merge_request_iid}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "gitlab_api_pipelines_list": {
        const projectId = encodeURIComponent(args.project_id);
        let endpoint = `/projects/${projectId}/pipelines`;
        const params = new URLSearchParams();

        if (args.status) params.append("status", args.status);
        if (args.ref) params.append("ref", args.ref);
        if (args.per_page) params.append("per_page", args.per_page.toString());
        if (args.page) params.append("page", args.page.toString());

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const data = await gitLabApiRequest(endpoint);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
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
          text: `Error calling GitLab API: ${error instanceof Error ? error.message : String(error)}`,
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
  console.error("GitLab API MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});