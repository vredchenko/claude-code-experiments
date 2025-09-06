#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

interface SurrealMCPConfig {
  mcpUrl: string;
}

class SurrealDBMCPServer {
  private server: Server;
  private mcpUrl: string;

  constructor() {
    this.server = new Server(
      {
        name: "surrealdb-backend-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // SurrealMCP HTTP endpoint configuration
    const config: SurrealMCPConfig = {
      mcpUrl: process.env.SURREALDB_MCP_URL || "http://localhost:3004",
    };

    this.mcpUrl = config.mcpUrl;
    this.setupToolHandlers();
  }

  private async callSurrealMCP(method: string, params: any): Promise<any> {
    try {
      const response = await fetch(`${this.mcpUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method: method,
          params: params
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message || 'SurrealMCP error');
      }

      return result.result;
    } catch (error) {
      console.error(`SurrealMCP call failed:`, error);
      throw error;
    }
  }

  private setupToolHandlers(): void {
    // Define available SurrealDB tools (proxying to official SurrealMCP)
    const SURREALDB_TOOLS: Tool[] = [
      // Database Operations
      {
        name: "surrealdb_query",
        description: "Execute a SurrealQL query",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "SurrealQL query to execute" },
            variables: {
              type: "object",
              description: "Query variables (optional)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "surrealdb_select",
        description: "Select records from a table with filtering and pagination",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name to select from" },
            where: { type: "string", description: "WHERE clause (optional)" },
            limit: { type: "number", description: "Limit number of results (optional)" },
            start: { type: "number", description: "Starting offset (optional)" },
          },
          required: ["table"],
        },
      },
      {
        name: "surrealdb_insert",
        description: "Insert new records into a table",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            data: { 
              type: "array", 
              items: { type: "object" },
              description: "Array of records to insert" 
            },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "surrealdb_create",
        description: "Create a single record",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            data: { type: "object", description: "Record data" },
            id: { type: "string", description: "Record ID (optional)" },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "surrealdb_upsert",
        description: "Create or update a record",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            data: { type: "object", description: "Record data" },
            id: { type: "string", description: "Record ID (optional)" },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "surrealdb_update",
        description: "Update existing records",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            id: { type: "string", description: "Record ID (optional, updates all if not provided)" },
            data: { type: "object", description: "Data to update" },
            where: { type: "string", description: "WHERE clause (optional)" },
          },
          required: ["table", "data"],
        },
      },
      {
        name: "surrealdb_delete",
        description: "Delete records",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            id: { type: "string", description: "Record ID (optional, deletes all if not provided)" },
            where: { type: "string", description: "WHERE clause (optional)" },
          },
          required: ["table"],
        },
      },
      {
        name: "surrealdb_relate",
        description: "Create relationships between records",
        inputSchema: {
          type: "object",
          properties: {
            from: { type: "string", description: "Source record ID" },
            relation: { type: "string", description: "Relation table name" },
            to: { type: "string", description: "Target record ID" },
            data: { type: "object", description: "Relation data (optional)" },
          },
          required: ["from", "relation", "to"],
        },
      },

      // Connection Management
      {
        name: "surrealdb_connect_endpoint",
        description: "Connect to a SurrealDB database endpoint",
        inputSchema: {
          type: "object",
          properties: {
            url: { type: "string", description: "Database URL" },
            username: { type: "string", description: "Username" },
            password: { type: "string", description: "Password" },
          },
          required: ["url"],
        },
      },
      {
        name: "surrealdb_disconnect_endpoint",
        description: "Disconnect from current database endpoint",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "surrealdb_use_namespace",
        description: "Switch to a different namespace",
        inputSchema: {
          type: "object",
          properties: {
            namespace: { type: "string", description: "Namespace name" },
          },
          required: ["namespace"],
        },
      },
      {
        name: "surrealdb_use_database",
        description: "Switch to a different database",
        inputSchema: {
          type: "object",
          properties: {
            database: { type: "string", description: "Database name" },
          },
          required: ["database"],
        },
      },
      {
        name: "surrealdb_list_namespaces",
        description: "List available namespaces",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "surrealdb_list_databases",
        description: "List available databases in current namespace",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },

      // Health and Info
      {
        name: "surrealdb_health",
        description: "Check database health status",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "surrealdb_version",
        description: "Get SurrealDB version information",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ];

    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: SURREALDB_TOOLS };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        let result: any;
        
        // Map our tool names to SurrealMCP method names
        const methodName = name.replace('surrealdb_', '');
        
        // Call the official SurrealMCP sidecar
        result = await this.callSurrealMCP(`tools/${methodName}`, args || {});

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `SurrealDB MCP error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("SurrealDB MCP proxy server running on stdio");
  }
}

// Start the server
const server = new SurrealDBMCPServer();
server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});