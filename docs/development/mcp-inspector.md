# MCP Inspector

Visual testing and debugging tool for Model Context Protocol (MCP) servers.

## Overview

MCP Inspector is a developer tool that provides both a web-based UI and CLI
interface for testing and debugging MCP servers. It consists of two main
components:

- **MCP Inspector Client (MCPI)**: React-based web UI for interactive testing
- **MCP Proxy (MCPP)**: Node.js server that bridges communication between the
  web UI and MCP servers

## Installation

MCP Inspector is already installed as a development dependency in this project:

```json
{
  "devDependencies": {
    "@modelcontextprotocol/inspector": "^0.16.8"
  }
}
```

## Usage

### Quick Start

```bash
# Start MCP Inspector with helpful information
bun run inspector

# Or start directly
bun run inspector:ui
```

This will:

- Start the MCP Inspector web UI at `http://localhost:6274`
- Show available MCP servers in this project
- Provide connection instructions

### Available Scripts

| Script                  | Description                          |
| ----------------------- | ------------------------------------ |
| `bun run inspector`     | Start with project-specific guidance |
| `bun run inspector:ui`  | Start MCP Inspector directly         |
| `bun run inspector:cli` | Show CLI help and options            |
| `bun run dev:inspector` | Alias for `inspector` script         |

### Web UI Features

The MCP Inspector web interface provides:

- **Server Connection**: Connect to running MCP servers
- **Resource Exploration**: Browse available resources and tools
- **Interactive Testing**: Execute tools and test server responses
- **Real-time Debugging**: Monitor server communication and errors
- **Configuration Export**: Export server configurations for reuse

### CLI Mode

For automated testing and scripting:

```bash
# Get CLI help
bunx mcp-inspector --help

# Connect to a specific server (example)
bunx mcp-inspector --server-command "bun run mcp/sourcegraph/index.ts"
```

## Configuration

### Project Configuration

The project includes a configuration file at
`.devtooling/configs/mcp-inspector.json` with sensible defaults for all MCP
servers:

```json
{
  "inspector": {
    "ui": {
      "host": "localhost",
      "port": 6274,
      "openBrowser": true
    },
    "servers": [
      {
        "name": "sourcegraph",
        "description": "Sourcegraph code search and repository exploration",
        "command": "bun",
        "args": ["run", "./mcp/sourcegraph/index.ts"],
        "env": {
          "SRC_ENDPOINT": "${SRC_ENDPOINT}",
          "SRC_ACCESS_TOKEN": "${SRC_ACCESS_TOKEN}"
        }
      }
    ]
  }
}
```

### Environment Variables

MCP Inspector uses environment variables from your `.env` file. Ensure you have
configured the necessary variables for the servers you want to test:

```bash
# Sourcegraph
SRC_ENDPOINT=https://sourcegraph.com
SRC_ACCESS_TOKEN=your_token_here

# GitLab
GITLAB_TOKEN=your_gitlab_token
GITLAB_HOST=gitlab.com

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# And so on...
```

## Testing MCP Servers

### 1. Start a Server

First, start the MCP server you want to test:

```bash
# Start Sourcegraph server in development mode
bun run dev:mcp:sourcegraph

# Or start any other server
bun run dev:mcp:gitlab-api
bun run dev:mcp:minio-backend
bun run dev:mcp:redis-backend
```

### 2. Launch Inspector

In a separate terminal, start MCP Inspector:

```bash
bun run inspector
```

### 3. Connect and Test

1. Open `http://localhost:6274` in your browser
2. Configure the connection to your running MCP server
3. Explore available tools and resources
4. Test tool execution and server responses

## Transport Methods

MCP Inspector supports different transport methods:

- **stdio**: Standard input/output (default for our servers)
- **SSE**: Server-Sent Events for web-based servers
- **HTTP**: Direct HTTP communication

All MCP servers in this project use stdio transport by default.

## Debugging Tips

### Common Issues

1. **Server Not Starting**
   - Check environment variables are properly set
   - Verify dependencies are installed (`bun install`)
   - Check server logs for specific error messages

2. **Connection Refused**
   - Ensure the MCP server is running before connecting
   - Verify the correct transport method (stdio)
   - Check firewall settings if using network transports

3. **Tool Execution Failures**
   - Validate input parameters match the tool's schema
   - Check server logs for detailed error messages
   - Verify external service credentials and connectivity

### Enable Debug Logging

For more detailed logging, you can modify the server startup:

```bash
# Add debug environment variable
DEBUG=mcp:* bun run dev:mcp:sourcegraph
```

## Advanced Usage

### Custom Server Configuration

You can test custom server configurations by modifying the inspector
configuration or starting servers manually:

```bash
# Start a server with custom parameters
SRC_ENDPOINT=https://your-sourcegraph.com bun run mcp/sourcegraph/index.ts
```

### Integration Testing

MCP Inspector can be used for integration testing:

```bash
# Automated testing example
bunx mcp-inspector --test-mode --config .devtooling/configs/mcp-inspector.json
```

## See Also

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Development Workflow](./workflow/) - General development practices
- [MCP Servers Documentation](../mcp/) - Available servers in this project
