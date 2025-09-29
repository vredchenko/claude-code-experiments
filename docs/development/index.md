# Development

Development tools and workflows for the Claude Code Experiments project.

## Overview

This section covers development tools, testing workflows, and debugging
techniques for MCP servers and other project components.

## Available Tools

- **[MCP Inspector](./mcp-inspector/)** - Visual testing and debugging tool for
  MCP servers
- **[Development Workflow](./workflow/)** - Standard development practices and
  workflows
- **[Testing](./testing/)** - Testing strategies for MCP servers and components
- **[Debugging](./debugging/)** - Debugging techniques and troubleshooting
  guides

## Quick Start

### Start Development Environment

```bash
# Start all Docker services
bun run docker:up

# Start MCP Inspector for visual testing
bun run inspector

# Start a specific MCP server in development mode
bun run dev:mcp:sourcegraph
```

### Common Development Tasks

```bash
# Lint and format code
bun run lint:fix
bun run format

# Run security scans
bun run secrets

# Build documentation
bun run docs:build
bun run docs:dev
```

## Environment Setup

Ensure you have the required environment variables configured in `.env`:

```bash
# Copy template and customize
cp .env.template .env
$EDITOR .env
```

## See Also

- [MCP Servers Documentation](../mcp/) - Available MCP servers
- [Project README](../../README.md) - Project overview and setup
- [Contributing Guidelines](../../CONTRIBUTING.md) - How to contribute
