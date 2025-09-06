#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { Client } from 'minio';

interface MinIOClientConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

class MinIOMCPServer {
  private server: Server;
  private minioClient: Client;

  constructor() {
    this.server = new Server({
      name: 'minio-server',
      version: '1.0.0',
    }, {
      capabilities: {
        tools: {},
      },
    });

    const clientConfig: MinIOClientConfig = {
      endPoint: process.env.MINIO_ENDPOINT || 'localhost:9000',
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ROOT_USER || 'admin',
      secretKey: process.env.MINIO_ROOT_PASSWORD || 'password123',
    };

    this.minioClient = new Client(clientConfig);
    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'create_bucket',
          description: 'Create a new bucket in MinIO',
          inputSchema: {
            type: 'object',
            properties: {
              bucketName: {
                type: 'string',
                description: 'Name of the bucket to create',
              },
            },
            required: ['bucketName'],
          },
        },
        {
          name: 'list_buckets',
          description: 'List all buckets in MinIO',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'upload_object',
          description: 'Upload an object to a bucket',
          inputSchema: {
            type: 'object',
            properties: {
              bucketName: {
                type: 'string',
                description: 'Name of the bucket',
              },
              objectName: {
                type: 'string',
                description: 'Name of the object',
              },
              filePath: {
                type: 'string',
                description: 'Local file path to upload',
              },
            },
            required: ['bucketName', 'objectName', 'filePath'],
          },
        },
        {
          name: 'download_object',
          description: 'Download an object from a bucket',
          inputSchema: {
            type: 'object',
            properties: {
              bucketName: {
                type: 'string',
                description: 'Name of the bucket',
              },
              objectName: {
                type: 'string',
                description: 'Name of the object',
              },
              filePath: {
                type: 'string',
                description: 'Local file path to save to',
              },
            },
            required: ['bucketName', 'objectName', 'filePath'],
          },
        },
        {
          name: 'list_objects',
          description: 'List objects in a bucket',
          inputSchema: {
            type: 'object',
            properties: {
              bucketName: {
                type: 'string',
                description: 'Name of the bucket',
              },
              prefix: {
                type: 'string',
                description: 'Object name prefix to filter by',
              },
            },
            required: ['bucketName'],
          },
        },
        {
          name: 'delete_object',
          description: 'Delete an object from a bucket',
          inputSchema: {
            type: 'object',
            properties: {
              bucketName: {
                type: 'string',
                description: 'Name of the bucket',
              },
              objectName: {
                type: 'string',
                description: 'Name of the object to delete',
              },
            },
            required: ['bucketName', 'objectName'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_bucket':
            await this.minioClient.makeBucket(args.bucketName);
            return {
              content: [
                {
                  type: 'text',
                  text: `Bucket '${args.bucketName}' created successfully`,
                },
              ],
            };

          case 'list_buckets':
            const buckets = await this.minioClient.listBuckets();
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(buckets, null, 2),
                },
              ],
            };

          case 'upload_object':
            await this.minioClient.fPutObject(args.bucketName, args.objectName, args.filePath);
            return {
              content: [
                {
                  type: 'text',
                  text: `Object '${args.objectName}' uploaded to bucket '${args.bucketName}' successfully`,
                },
              ],
            };

          case 'download_object':
            await this.minioClient.fGetObject(args.bucketName, args.objectName, args.filePath);
            return {
              content: [
                {
                  type: 'text',
                  text: `Object '${args.objectName}' downloaded from bucket '${args.bucketName}' to '${args.filePath}' successfully`,
                },
              ],
            };

          case 'list_objects':
            const objects: any[] = [];
            const stream = this.minioClient.listObjectsV2(args.bucketName, args.prefix || '', true);
            for await (const obj of stream) {
              objects.push(obj);
            }
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(objects, null, 2),
                },
              ],
            };

          case 'delete_object':
            await this.minioClient.removeObject(args.bucketName, args.objectName);
            return {
              content: [
                {
                  type: 'text',
                  text: `Object '${args.objectName}' deleted from bucket '${args.bucketName}' successfully`,
                },
              ],
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

const server = new MinIOMCPServer();
server.run().catch(console.error);