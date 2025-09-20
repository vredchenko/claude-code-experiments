#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { $ } from "zx";

// Configure zx to not echo commands for cleaner output
$.verbose = false;

const server = new Server(
  {
    name: "karakeep-cli-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available Karakeep CLI tools
const KARAKEEP_TOOLS: Tool[] = [
  {
    name: "karakeep_whoami",
    description: "Get information about the owner of the API key",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "karakeep_bookmarks_list",
    description: "List bookmarks with optional filtering",
    inputSchema: {
      type: "object",
      properties: {
        list_id: {
          type: "string",
          description: "Filter by list ID",
        },
        tag: {
          type: "string",
          description: "Filter by tag name",
        },
        limit: {
          type: "number",
          description: "Maximum number of bookmarks to return",
          default: 20,
        },
        format: {
          type: "string",
          enum: ["table", "json"],
          description: "Output format",
          default: "table",
        },
      },
    },
  },
  {
    name: "karakeep_bookmarks_create",
    description: "Create a new bookmark",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "The URL to bookmark",
        },
        title: {
          type: "string",
          description: "Title for the bookmark",
        },
        description: {
          type: "string",
          description: "Description of the bookmark",
        },
        list_id: {
          type: "string",
          description: "List ID to add bookmark to",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Tags to apply to the bookmark",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "karakeep_bookmarks_get",
    description: "Get details of a specific bookmark",
    inputSchema: {
      type: "object",
      properties: {
        bookmark_id: {
          type: "string",
          description: "The bookmark ID to retrieve",
        },
      },
      required: ["bookmark_id"],
    },
  },
  {
    name: "karakeep_bookmarks_update",
    description: "Update an existing bookmark",
    inputSchema: {
      type: "object",
      properties: {
        bookmark_id: {
          type: "string",
          description: "The bookmark ID to update",
        },
        title: {
          type: "string",
          description: "New title for the bookmark",
        },
        description: {
          type: "string",
          description: "New description for the bookmark",
        },
        url: {
          type: "string",
          description: "New URL for the bookmark",
        },
      },
      required: ["bookmark_id"],
    },
  },
  {
    name: "karakeep_bookmarks_delete",
    description: "Delete a bookmark",
    inputSchema: {
      type: "object",
      properties: {
        bookmark_id: {
          type: "string",
          description: "The bookmark ID to delete",
        },
      },
      required: ["bookmark_id"],
    },
  },
  {
    name: "karakeep_lists_list",
    description: "List all bookmark lists",
    inputSchema: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["table", "json"],
          description: "Output format",
          default: "table",
        },
      },
    },
  },
  {
    name: "karakeep_lists_create",
    description: "Create a new bookmark list",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name of the new list",
        },
        description: {
          type: "string",
          description: "Description of the new list",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "karakeep_lists_get",
    description: "Get details of a specific list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: {
          type: "string",
          description: "The list ID to retrieve",
        },
      },
      required: ["list_id"],
    },
  },
  {
    name: "karakeep_lists_update",
    description: "Update an existing list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: {
          type: "string",
          description: "The list ID to update",
        },
        name: {
          type: "string",
          description: "New name for the list",
        },
        description: {
          type: "string",
          description: "New description for the list",
        },
      },
      required: ["list_id"],
    },
  },
  {
    name: "karakeep_lists_delete",
    description: "Delete a list",
    inputSchema: {
      type: "object",
      properties: {
        list_id: {
          type: "string",
          description: "The list ID to delete",
        },
      },
      required: ["list_id"],
    },
  },
  {
    name: "karakeep_tags_list",
    description: "List all available tags",
    inputSchema: {
      type: "object",
      properties: {
        format: {
          type: "string",
          enum: ["table", "json"],
          description: "Output format",
          default: "table",
        },
      },
    },
  },
  {
    name: "karakeep_tags_create",
    description: "Create a new tag",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name of the new tag",
        },
        color: {
          type: "string",
          description: "Color for the tag (hex format)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "karakeep_tags_get",
    description: "Get details of a specific tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: {
          type: "string",
          description: "The tag ID to retrieve",
        },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "karakeep_tags_update",
    description: "Update an existing tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: {
          type: "string",
          description: "The tag ID to update",
        },
        name: {
          type: "string",
          description: "New name for the tag",
        },
        color: {
          type: "string",
          description: "New color for the tag (hex format)",
        },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "karakeep_tags_delete",
    description: "Delete a tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: {
          type: "string",
          description: "The tag ID to delete",
        },
      },
      required: ["tag_id"],
    },
  },
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: KARAKEEP_TOOLS,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "karakeep_whoami": {
        const result = await $`karakeep whoami --json`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_bookmarks_list": {
        let command = ["karakeep", "bookmarks", "list"];

        if (args.list_id) command.push("--list", args.list_id);
        if (args.tag) command.push("--tag", args.tag);
        if (args.limit) command.push("--limit", args.limit.toString());
        if (args.format === "json") command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_bookmarks_create": {
        let command = ["karakeep", "bookmarks", "create", args.url];

        if (args.title) command.push("--title", args.title);
        if (args.description) command.push("--description", args.description);
        if (args.list_id) command.push("--list", args.list_id);
        if (args.tags && args.tags.length > 0) {
          command.push("--tags", args.tags.join(","));
        }

        command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_bookmarks_get": {
        const result = await $`karakeep bookmarks get ${args.bookmark_id} --json`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_bookmarks_update": {
        let command = ["karakeep", "bookmarks", "update", args.bookmark_id];

        if (args.title) command.push("--title", args.title);
        if (args.description) command.push("--description", args.description);
        if (args.url) command.push("--url", args.url);

        command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_bookmarks_delete": {
        const result = await $`karakeep bookmarks delete ${args.bookmark_id} --json`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_lists_list": {
        let command = ["karakeep", "lists", "list"];
        if (args.format === "json") command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_lists_create": {
        let command = ["karakeep", "lists", "create", args.name];

        if (args.description) command.push("--description", args.description);
        command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_lists_get": {
        const result = await $`karakeep lists get ${args.list_id} --json`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_lists_update": {
        let command = ["karakeep", "lists", "update", args.list_id];

        if (args.name) command.push("--name", args.name);
        if (args.description) command.push("--description", args.description);
        command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_lists_delete": {
        const result = await $`karakeep lists delete ${args.list_id} --json`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_tags_list": {
        let command = ["karakeep", "tags", "list"];
        if (args.format === "json") command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_tags_create": {
        let command = ["karakeep", "tags", "create", args.name];

        if (args.color) command.push("--color", args.color);
        command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_tags_get": {
        const result = await $`karakeep tags get ${args.tag_id} --json`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_tags_update": {
        let command = ["karakeep", "tags", "update", args.tag_id];

        if (args.name) command.push("--name", args.name);
        if (args.color) command.push("--color", args.color);
        command.push("--json");

        const result = await $`${command}`;
        return {
          content: [
            {
              type: "text",
              text: result.stdout,
            },
          ],
        };
      }

      case "karakeep_tags_delete": {
        const result = await $`karakeep tags delete ${args.tag_id} --json`;
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
          text: `Error executing Karakeep CLI command: ${error instanceof Error ? error.message : String(error)}`,
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
  console.error("Karakeep CLI MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
