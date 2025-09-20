# claude-code-experiments

[![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=white)](https://claude.ai/code)

Sandbox for playing around with Claude Code. Co-authored together with Claude
Code

## Quick Start

1. **Copy environment template:**

   ```bash
   cp .env.template .env
   ```

2. **Edit `.env` with your credentials:**
   - `GITLAB_TOKEN`: Your GitLab personal access token
   - `MINIO_ROOT_PASSWORD`: Your preferred MinIO password

3. **Run setup script:**

   ```bash
   bun start.ts
   ```

4. **Restart Claude Code** to load MCP servers

## Dev Dependencies

This project requires the following development dependencies:

- **[Claude Code](https://claude.ai/code)** - Anthropic's agentic coding tool
  (Claude Code alternatives are possible but not tested)
- **[Bun.js](https://bun.sh/)** - Fast JavaScript runtime and package manager
- **[Docker](https://www.docker.com/)** - Container platform for services
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container
  application orchestration

Additional MCP component-specific dependencies are automatically installed
during setup and include specialized libraries for GitLab integration, database
connections, and storage operations.

## What You Get

Through Claude Code, you can now:

### **File Storage (MinIO)**

- Create and manage storage buckets
- Upload/download files
- Browse and organize objects
- Access web UI at <http://localhost:9001>

### **Multi-Model Database (SurrealDB)**

- Full-featured database with document, graph, key-value, and time-series
  support
- Natural language queries via Claude Code → SurrealQL translation
- Relationship modeling and graph traversal
- Real-time subscriptions and live queries
- Access database at <http://localhost:8000>
- Official SurrealMCP integration for comprehensive tooling

### **GitLab Integration**

- List issues and merge requests
- View project information
- Access CI/CD pipeline data
- Works with GitLab.com or self-hosted instances

## MCP Servers

Custom Model Context Protocol (MCP) servers for various integrations:

### Available Servers

#### GitLab Integration

- **`gitlab-cli`** - Uses `glab` CLI commands for GitLab operations
- **`gitlab-api`** - Direct GitLab REST API integration

#### Storage & Database

- **`minio-backend`** - MinIO object storage operations
- **`redis-backend`** - Redis cache operations
- **`surrealdb-backend`** - SurrealDB multi-model database operations

### Server Structure

```text
mcp/
└── servers/
    ├── gitlab-api/
    │   └── index.ts
    ├── gitlab-cli/
    │   └── index.ts
    ├── minio-backend/
    │   └── index.ts
```

### Configuration

#### MCP Configuration Files

This project includes **two MCP configuration files** for maximum compatibility:

- **`.mcp.json`** - Used by **Claude Code CLI**
  - Simpler format with automatic `.env` file loading
  - Uses `bash -c "source .env && ..."` to load environment variables
  - All servers configured as `stdio` type
- **`mcp-servers-config.json`** - **Standard MCP format** for other AI providers
  - Explicit environment variable configuration
  - Compatible with other MCP-supporting AI tools and clients
  - More portable across different platforms

Both files define the same 6 servers and should be kept in sync for
compatibility.

#### Running Servers

All servers are configured for auto-start and can be run individually:

```bash
# GitLab servers
bun run mcp/servers/gitlab-cli/index.ts
bun run mcp/servers/gitlab-api/index.ts

# Storage servers
bun run mcp/servers/minio-backend/index.ts
bun run mcp/servers/redis-backend/index.ts
bun run mcp/servers/surrealdb-backend/index.ts
```

### Features

**GitLab Servers:**

- Listing and viewing issues
- Listing and viewing merge requests
- Project information
- Pipeline status (API server only)

**MinIO Server:**

- Create/list buckets
- Upload/download/delete objects
- List objects with prefix filtering

**Redis Server:**

- Key-value operations (get/set/delete)
- List operations (push/pop/range)
- Hash operations
- Pub/sub messaging

**SurrealDB Server:** (via official SurrealMCP sidecar)

- **Architecture**: TypeScript MCP Wrapper → Official SurrealMCP Docker
  Container → SurrealDB Community Edition
- **Database Operations**: Full SurrealQL query execution (`query`, `select`,
  `insert`, `create`, `upsert`, `update`, `delete`)
- **Relationship Management**: Graph operations (`relate`) for connecting data
  across tables
- **Connection Management**: Database switching (`connect_endpoint`,
  `use_namespace`, `use_database`)
- **Administration**: List resources (`list_namespaces`, `list_databases`),
  health monitoring
- **Multi-Model Storage**: Documents, graphs, key-value, time-series in one
  database
- **Claude Code Integration**: Natural language → SurrealQL query translation,
  schema design assistance

### Docker Services

The project includes the following Docker services in `docker-compose.yml`:

**Database & Storage:**

- **`surrealdb`** (`surrealdb/surrealdb:latest`): Multi-model database on port
  8000
- **`surrealdb-mcp`** (`surrealdb/surrealmcp:latest`): Official SurrealMCP
  server on port 3004
- **`redis`** (`redis:7-alpine`): Redis cache on port 6379
- **`minio`** (`minio/minio:latest`): Object storage on ports 9000/9001

**Service Dependencies:**

- `surrealdb-mcp` depends on `surrealdb` health check
- All services connected via `dev-network` for internal communication
- Persistent volumes for data storage

### Environment Variables

Key environment variables (see `.env.template` for full list):

- `SURREALDB_USERNAME/PASSWORD`: Database authentication
- `SURREALDB_MCP_URL`: SurrealMCP sidecar endpoint (<http://localhost:3004>)
- `MINIO_ROOT_PASSWORD`: MinIO admin password
- `GITLAB_TOKEN`: GitLab API access token

Built with [Bun.js](https://bun.sh/) and the official
[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).
