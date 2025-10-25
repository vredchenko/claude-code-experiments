# MCP Health Check

Check the health of all MCP servers by:

1. Verify docker services are running (SurrealDB, MinIO, Redis)
2. Test connectivity to each MCP server using their health/status endpoints
3. Report which servers are accessible and which have issues

For each MCP server, check:

- gitlab-api: API connectivity
- gitlab-cli: glab CLI tool availability
- minio-backend: MinIO service and bucket access
- redis-backend: Redis connection and key operations
- surrealdb-backend: SurrealDB connection and version
- sourcegraph: API connectivity (if configured)
- karakeep-cli: karakeep CLI tool availability

Provide a summary table showing service status (✓ or ✗) and any error messages.
