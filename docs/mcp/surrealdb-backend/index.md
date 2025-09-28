# SurrealDB Backend MCP Server

Multi-model database operations with SurrealDB for flexible data management.

## Overview

The SurrealDB Backend MCP server provides comprehensive database operations
through SurrealDB, a multi-model database that supports document, graph, and
relational data models in a single system.

## Features

- **Multi-Model Support**: Documents, graphs, and relational data
- **Real-Time Queries**: Live query subscriptions
- **ACID Transactions**: Full transactional support
- **Schema Flexibility**: Schemaless and schema-full modes
- **Advanced Querying**: SurrealQL query language

## Architecture

- **TypeScript Wrapper** → **Official SurrealMCP Docker Container** →
  **SurrealDB Docker Container**
- Uses `surrealdb/surrealmcp:latest` for comprehensive database operations
- Self-hosted SurrealDB Community Edition (`surrealdb/surrealdb:latest`)

## Prerequisites

- SurrealDB server running (local or remote)
- SurrealMCP container for MCP protocol bridging
- Valid database credentials and namespace access

## Configuration

Set the following environment variables:

- `SURREALDB_URL`: SurrealDB server URL
- `SURREALDB_PORT`: SurrealDB server port (default: 8000)
- `SURREALDB_USERNAME`: Database username
- `SURREALDB_PASSWORD`: Database password
- `SURREALDB_NAMESPACE`: Database namespace
- `SURREALDB_DATABASE`: Database name
- `SURREALDB_MCP_PORT`: SurrealMCP bridge port (default: 3004)

## Tools

### `surrealdb_query`

Execute SurrealQL queries on the database.

### `surrealdb_select`

Retrieve records from tables or collections.

### `surrealdb_create`

Insert new records into the database.

### `surrealdb_update`

Modify existing records.

### `surrealdb_delete`

Remove records from the database.

### `surrealdb_info`

Get database and table information.

## Usage Examples

```bash
# Run the server
bun run mcp:surrealdb

# Development mode with auto-reload
bun run dev:mcp:surrealdb
```

## See Also

- [SurrealDB Documentation](https://surrealdb.com/docs/)
- [SurrealQL Language Guide](https://surrealdb.com/docs/surrealql/)
- [SurrealMCP Bridge](https://github.com/surrealdb/surrealmcp)
