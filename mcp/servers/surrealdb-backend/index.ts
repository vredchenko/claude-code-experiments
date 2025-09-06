#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Surreal } from "surrealdb.js";

interface SurrealDBConfig {
  url: string;
  username?: string;
  password?: string;
  namespace: string;
  database: string;
}

class SurrealDBMCPServer {
  private server: Server;
  private db: Surreal;

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

    // SurrealDB configuration
    const config: SurrealDBConfig = {
      url: process.env.SURREALDB_URL || "http://localhost:8000/rpc",
      username: process.env.SURREALDB_USERNAME || "root",
      password: process.env.SURREALDB_PASSWORD || "root",
      namespace: process.env.SURREALDB_NAMESPACE || "test",
      database: process.env.SURREALDB_DATABASE || "test",
    };

    this.db = new Surreal();
    this.initializeConnection(config);
    this.setupToolHandlers();
  }

  private async initializeConnection(config: SurrealDBConfig): Promise<void> {
    try {
      await this.db.connect(config.url);
      await this.db.signin({
        username: config.username!,
        password: config.password!,
      });
      await this.db.use({
        namespace: config.namespace,
        database: config.database,
      });
    } catch (error) {
      console.error("Failed to connect to SurrealDB:", error);
    }
  }

  private setupToolHandlers(): void {
    // Define available SurrealDB tools
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
        description: "Select records from a table",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name to select from" },
            where: { type: "string", description: "WHERE clause (optional)" },
            limit: { type: "number", description: "Limit number of results (optional)" },
          },
          required: ["table"],
        },
      },
      {
        name: "surrealdb_create",
        description: "Create a new record",
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
            merge: { type: "boolean", description: "Merge with existing data", default: true },
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

      // Schema Operations
      {
        name: "surrealdb_info",
        description: "Get database information",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "What to get info about (db, ns, tb, sc, etc.)",
              default: "db",
            },
            name: { type: "string", description: "Specific name (for tables, etc.)" },
          },
        },
      },
      {
        name: "surrealdb_define_table",
        description: "Define a new table with schema",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Table name" },
            drop: { type: "boolean", description: "Allow dropping records", default: false },
            schemafull: { type: "boolean", description: "Enforce schema", default: false },
            permissions: { type: "object", description: "Table permissions" },
          },
          required: ["name"],
        },
      },
      {
        name: "surrealdb_define_field",
        description: "Define a field on a table",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            field: { type: "string", description: "Field name" },
            type: { type: "string", description: "Field type (string, number, bool, etc.)" },
            value: { type: "string", description: "Default value expression" },
            assert: { type: "string", description: "Assertion clause" },
            permissions: { type: "object", description: "Field permissions" },
          },
          required: ["table", "field"],
        },
      },
      {
        name: "surrealdb_define_index",
        description: "Define an index on a table",
        inputSchema: {
          type: "object",
          properties: {
            table: { type: "string", description: "Table name" },
            name: { type: "string", description: "Index name" },
            fields: {
              type: "array",
              items: { type: "string" },
              description: "Fields to index",
            },
            unique: { type: "boolean", description: "Unique index", default: false },
          },
          required: ["table", "name", "fields"],
        },
      },

      // Transaction Operations
      {
        name: "surrealdb_transaction",
        description: "Execute multiple queries in a transaction",
        inputSchema: {
          type: "object",
          properties: {
            queries: {
              type: "array",
              items: { type: "string" },
              description: "Array of SurrealQL queries",
            },
          },
          required: ["queries"],
        },
      },

      // Utility Operations
      {
        name: "surrealdb_ping",
        description: "Ping the database connection",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "surrealdb_version",
        description: "Get SurrealDB version",
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

        switch (name) {
          // Database Operations
          case "surrealdb_query":
            result = await this.db.query(args.query, args.variables);
            break;

          case "surrealdb_select":
            let selectQuery = `SELECT * FROM ${args.table}`;
            if (args.where) {
              selectQuery += ` WHERE ${args.where}`;
            }
            if (args.limit) {
              selectQuery += ` LIMIT ${args.limit}`;
            }
            result = await this.db.query(selectQuery);
            break;

          case "surrealdb_create":
            if (args.id) {
              result = await this.db.create(`${args.table}:${args.id}`, args.data);
            } else {
              result = await this.db.create(args.table, args.data);
            }
            break;

          case "surrealdb_update":
            let target = args.table;
            if (args.id) {
              target = `${args.table}:${args.id}`;
            }
            if (args.merge) {
              result = await this.db.merge(target, args.data);
            } else {
              result = await this.db.update(target, args.data);
            }
            break;

          case "surrealdb_delete":
            let deleteTarget = args.table;
            if (args.id) {
              deleteTarget = `${args.table}:${args.id}`;
            }
            if (args.where) {
              result = await this.db.query(`DELETE FROM ${args.table} WHERE ${args.where}`);
            } else {
              result = await this.db.delete(deleteTarget);
            }
            break;

          // Schema Operations
          case "surrealdb_info":
            result = await this.db.query(`INFO FOR ${args.target.toUpperCase()}${args.name ? ` ${args.name}` : ""}`);
            break;

          case "surrealdb_define_table":
            let defineTableQuery = `DEFINE TABLE ${args.name}`;
            if (args.drop) defineTableQuery += " DROP";
            if (args.schemafull) defineTableQuery += " SCHEMAFULL";
            if (args.permissions) {
              defineTableQuery += ` PERMISSIONS ${JSON.stringify(args.permissions)}`;
            }
            result = await this.db.query(defineTableQuery);
            break;

          case "surrealdb_define_field":
            let defineFieldQuery = `DEFINE FIELD ${args.field} ON TABLE ${args.table}`;
            if (args.type) defineFieldQuery += ` TYPE ${args.type}`;
            if (args.value) defineFieldQuery += ` VALUE ${args.value}`;
            if (args.assert) defineFieldQuery += ` ASSERT ${args.assert}`;
            if (args.permissions) {
              defineFieldQuery += ` PERMISSIONS ${JSON.stringify(args.permissions)}`;
            }
            result = await this.db.query(defineFieldQuery);
            break;

          case "surrealdb_define_index":
            let defineIndexQuery = `DEFINE INDEX ${args.name} ON TABLE ${args.table} FIELDS ${args.fields.join(", ")}`;
            if (args.unique) defineIndexQuery += " UNIQUE";
            result = await this.db.query(defineIndexQuery);
            break;

          // Transaction Operations
          case "surrealdb_transaction":
            result = [];
            for (const query of args.queries) {
              const queryResult = await this.db.query(query);
              result.push(queryResult);
            }
            break;

          // Utility Operations
          case "surrealdb_ping":
            result = await this.db.ping();
            break;

          case "surrealdb_version":
            result = await this.db.version();
            break;

          default:
            throw new Error(`Unknown tool: ${name}`);
        }

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
              text: `SurrealDB error: ${error instanceof Error ? error.message : String(error)}`,
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
    console.error("SurrealDB MCP server running on stdio");
  }
}

// Start the server
const server = new SurrealDBMCPServer();
server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});