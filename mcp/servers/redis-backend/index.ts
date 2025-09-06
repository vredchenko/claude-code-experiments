#!/usr/bin/env bun

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import Redis from "ioredis";

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

class RedisMCPServer {
  private server: Server;
  private redis: Redis;

  constructor() {
    this.server = new Server(
      {
        name: "redis-cache-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Redis configuration
    const config: RedisConfig = {
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD || undefined,
    };

    this.redis = new Redis(config);
    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    // Define available Redis tools
    const REDIS_TOOLS: Tool[] = [
      // Key-Value Operations
      {
        name: "redis_set",
        description: "Set a key-value pair with optional expiration",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "The key to set" },
            value: { type: "string", description: "The value to store" },
            ttl: { type: "number", description: "TTL in seconds (optional)" },
          },
          required: ["key", "value"],
        },
      },
      {
        name: "redis_get",
        description: "Get a value by key",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "The key to retrieve" },
          },
          required: ["key"],
        },
      },
      {
        name: "redis_delete",
        description: "Delete one or more keys",
        inputSchema: {
          type: "object",
          properties: {
            keys: {
              type: "array",
              items: { type: "string" },
              description: "Array of keys to delete",
            },
          },
          required: ["keys"],
        },
      },
      {
        name: "redis_exists",
        description: "Check if keys exist",
        inputSchema: {
          type: "object",
          properties: {
            keys: {
              type: "array",
              items: { type: "string" },
              description: "Array of keys to check",
            },
          },
          required: ["keys"],
        },
      },
      {
        name: "redis_keys",
        description: "Find keys matching a pattern",
        inputSchema: {
          type: "object",
          properties: {
            pattern: {
              type: "string",
              description: "Pattern to match (e.g., 'user:*')",
              default: "*",
            },
          },
        },
      },

      // List Operations
      {
        name: "redis_lpush",
        description: "Push values to the left of a list",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "List key" },
            values: {
              type: "array",
              items: { type: "string" },
              description: "Values to push",
            },
          },
          required: ["key", "values"],
        },
      },
      {
        name: "redis_rpush",
        description: "Push values to the right of a list",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "List key" },
            values: {
              type: "array",
              items: { type: "string" },
              description: "Values to push",
            },
          },
          required: ["key", "values"],
        },
      },
      {
        name: "redis_lrange",
        description: "Get a range of elements from a list",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "List key" },
            start: { type: "number", description: "Start index", default: 0 },
            stop: { type: "number", description: "Stop index", default: -1 },
          },
          required: ["key"],
        },
      },

      // Hash Operations
      {
        name: "redis_hset",
        description: "Set hash field values",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Hash key" },
            fields: {
              type: "object",
              description: "Field-value pairs to set",
            },
          },
          required: ["key", "fields"],
        },
      },
      {
        name: "redis_hget",
        description: "Get a hash field value",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Hash key" },
            field: { type: "string", description: "Field name" },
          },
          required: ["key", "field"],
        },
      },
      {
        name: "redis_hgetall",
        description: "Get all hash field-value pairs",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Hash key" },
          },
          required: ["key"],
        },
      },

      // Pub/Sub Operations
      {
        name: "redis_publish",
        description: "Publish a message to a channel",
        inputSchema: {
          type: "object",
          properties: {
            channel: { type: "string", description: "Channel name" },
            message: { type: "string", description: "Message to publish" },
          },
          required: ["channel", "message"],
        },
      },

      // Stream Operations
      {
        name: "redis_xadd",
        description: "Add entry to a stream",
        inputSchema: {
          type: "object",
          properties: {
            stream: { type: "string", description: "Stream key" },
            fields: {
              type: "object",
              description: "Field-value pairs for the entry",
            },
            maxlen: {
              type: "number",
              description: "Limit stream length (optional)",
            },
          },
          required: ["stream", "fields"],
        },
      },
      {
        name: "redis_xread",
        description: "Read entries from streams",
        inputSchema: {
          type: "object",
          properties: {
            streams: {
              type: "array",
              items: { type: "string" },
              description: "Array of stream keys",
            },
            count: {
              type: "number",
              description: "Max entries to read per stream",
            },
            block: {
              type: "number",
              description: "Block for N milliseconds if no data",
            },
          },
          required: ["streams"],
        },
      },

      // Info/Stats Operations
      {
        name: "redis_info",
        description: "Get Redis server information",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              description: "Info section (server, memory, stats, etc.)",
            },
          },
        },
      },
      {
        name: "redis_flushdb",
        description: "Clear current database",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ];

    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return { tools: REDIS_TOOLS };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        let result: any;

        switch (name) {
          // Key-Value Operations
          case "redis_set":
            if (args.ttl) {
              result = await this.redis.setex(args.key, args.ttl, args.value);
            } else {
              result = await this.redis.set(args.key, args.value);
            }
            break;

          case "redis_get":
            result = await this.redis.get(args.key);
            break;

          case "redis_delete":
            result = await this.redis.del(...args.keys);
            break;

          case "redis_exists":
            result = await this.redis.exists(...args.keys);
            break;

          case "redis_keys":
            result = await this.redis.keys(args.pattern || "*");
            break;

          // List Operations
          case "redis_lpush":
            result = await this.redis.lpush(args.key, ...args.values);
            break;

          case "redis_rpush":
            result = await this.redis.rpush(args.key, ...args.values);
            break;

          case "redis_lrange":
            result = await this.redis.lrange(args.key, args.start || 0, args.stop || -1);
            break;

          // Hash Operations
          case "redis_hset":
            const flatFields = Object.entries(args.fields).flat();
            result = await this.redis.hset(args.key, ...flatFields);
            break;

          case "redis_hget":
            result = await this.redis.hget(args.key, args.field);
            break;

          case "redis_hgetall":
            result = await this.redis.hgetall(args.key);
            break;

          // Pub/Sub Operations
          case "redis_publish":
            result = await this.redis.publish(args.channel, args.message);
            break;

          // Stream Operations
          case "redis_xadd":
            const streamArgs: any[] = [args.stream, "*"];
            Object.entries(args.fields).forEach(([field, value]) => {
              streamArgs.push(field, value);
            });
            if (args.maxlen) {
              streamArgs.splice(2, 0, "MAXLEN", "~", args.maxlen);
            }
            result = await this.redis.xadd(...streamArgs);
            break;

          case "redis_xread":
            const xreadArgs: any[] = ["COUNT", args.count || 100];
            if (args.block) {
              xreadArgs.unshift("BLOCK", args.block);
            }
            xreadArgs.push("STREAMS", ...args.streams, ...args.streams.map(() => "$"));
            result = await this.redis.xread(...xreadArgs);
            break;

          // Info/Stats Operations
          case "redis_info":
            result = await this.redis.info(args.section);
            break;

          case "redis_flushdb":
            result = await this.redis.flushdb();
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
              text: `Redis error: ${error instanceof Error ? error.message : String(error)}`,
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
    console.error("Redis MCP server running on stdio");
  }
}

// Start the server
const server = new RedisMCPServer();
server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});