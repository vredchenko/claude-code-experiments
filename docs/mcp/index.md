# MCP Servers

Model Context Protocol (MCP) servers provide Claude Code with specialized
capabilities for interacting with external services and tools.

## Available MCP Servers

### GitLab Integration

- **gitlab-api**: Direct GitLab REST API integration
- **gitlab-cli**: Uses `glab` CLI commands

### Storage & Database

- **minio-backend**: MinIO object storage operations
- **redis-backend**: Redis cache operations
- **surrealdb-backend**: SurrealDB multi-model database operations

### Bookmark Management

- **karakeep-cli**: Karakeep bookmark manager CLI integration

## Quick Commands

```bash
# Setup all services and MCP servers
bun run start

# Run individual MCP servers
bun run mcp:gitlab-api
bun run mcp:minio
bun run mcp:redis
bun run mcp:surrealdb
bun run mcp:karakeep

# Debug with Inspector
bun run dev:inspector
```

## Configuration

MCP servers are configured via `mcp-servers-config.json`. The setup script
automatically creates this from the template.

## Development

Each MCP server includes:

- TypeScript implementation
- Development mode with hot reload
- Comprehensive error handling
- Docker integration where applicable
