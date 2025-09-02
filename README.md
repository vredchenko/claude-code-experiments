# claude-code-experiments
Sandbox for playing around with Claude Code

## GitLab MCP Servers

Custom Model Context Protocol (MCP) servers for GitLab integration:

### Available Servers

- **`gitlab-cli`** - Uses `glab` CLI commands for GitLab operations
- **`gitlab-api`** - Direct GitLab REST API integration

### Usage

```bash
# See .env.template - create a .env in repo root

# Run CLI-based server
bun run mcp:gitlab-cli

# Run API-based server (requires GITLAB_TOKEN env var)
bun run mcp:gitlab-api
```

### Features

Both servers provide tools for:
- Listing and viewing issues
- Listing and viewing merge requests
- Project information
- Pipeline status (API server only)

Built with Bun.js and the official MCP TypeScript SDK.
