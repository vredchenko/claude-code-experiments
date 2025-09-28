# Redis Backend MCP Server

High-performance caching and data structure operations with Redis.

## Overview

The Redis Backend MCP server provides fast, in-memory data storage capabilities
through Redis, enabling efficient caching, session management, and real-time
data operations.

## Features

- **Key-Value Operations**: Get, set, and delete key-value pairs
- **Data Structures**: Work with strings, lists, sets, hashes, and sorted sets
- **Expiration Management**: Set TTL for automatic key expiration
- **Pattern Matching**: Search keys using patterns
- **Connection Pooling**: Efficient Redis connection management

## Prerequisites

- Redis server running (local or remote)
- Network access to Redis instance
- Optional: Redis authentication configured

## Configuration

Set the following environment variables:

- `REDIS_HOST`: Redis server hostname (default: localhost)
- `REDIS_PORT`: Redis server port (default: 6379)
- `REDIS_PASSWORD`: Redis authentication password (if required)
- `REDIS_MAX_MEMORY`: Maximum memory allocation

## Tools

### `redis_get`

Retrieve value for a specific key.

### `redis_set`

Set key-value pairs with optional expiration.

### `redis_delete`

Remove keys from Redis.

### `redis_keys`

List keys matching a pattern.

### `redis_exists`

Check if keys exist in Redis.

### `redis_expire`

Set expiration time for keys.

### `redis_info`

Get Redis server information and statistics.

## Usage Examples

```bash
# Run the server
bun run mcp:redis

# Development mode with auto-reload
bun run dev:mcp:redis
```

## See Also

- [Redis Documentation](https://redis.io/docs/)
- [Redis Best Practices](https://redis.io/docs/manual/)
