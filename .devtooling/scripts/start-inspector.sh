#!/bin/bash
set -e

echo "🔍 Starting MCP Inspector..."
echo "📍 Web UI will be available at: http://localhost:6274"
echo ""
echo "💡 Tip: Make sure your MCP servers are running before connecting"
echo "   Use 'bun run dev:mcp:<server-name>' to start individual servers"
echo ""
echo "Available MCP servers to inspect:"
echo "  - gitlab-cli        (stdio transport)"
echo "  - gitlab-api        (stdio transport)"
echo "  - minio-backend     (stdio transport)"
echo "  - redis-backend     (stdio transport)"
echo "  - orlop-cli         (stdio transport)"
echo "  - surrealdb-backend (stdio transport)"
echo "  - karakeep-cli      (stdio transport)"
echo "  - sourcegraph       (stdio transport)"
echo ""
echo "Press Ctrl+C to stop the inspector"
echo ""

# Run the inspector using installed dependency
bunx mcp-inspector