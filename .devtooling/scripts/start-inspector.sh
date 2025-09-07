#!/bin/bash
set -e

echo "🔍 Starting MCP Inspector..."
echo "📍 Web UI will be available at: http://localhost:6274"
echo ""
echo "💡 Tip: Make sure your MCP servers are running before connecting"
echo "   Use 'bun run dev:mcp:<server-name>' to start individual servers"
echo ""
echo "Available MCP servers to inspect:"
echo "  - gitlab-cli    (port varies)"
echo "  - gitlab-api    (port varies)" 
echo "  - minio-backend (port varies)"
echo "  - redis-backend (port varies)"
echo "  - orlop-cli     (port varies)"
echo "  - surrealdb-backend (port varies)"
echo ""
echo "Press Ctrl+C to stop the inspector"
echo ""

# Run the inspector
bun x @modelcontextprotocol/inspector