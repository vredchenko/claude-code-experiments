# claude-code-experiments

[![Claude](https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=white)](https://claude.ai/code)

Experiments with Claude Code, MCP servers, AI security, and agentic workflows.
Built with [Bun.js](https://bun.sh/) and the
[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).

- **Project board**: <https://github.com/users/vredchenko/projects/2/views/1>
- **Documentation**: <https://vredchenko.github.io/claude-code-experiments/>

## Quick Start

```bash
cp .env.template .env
# Edit .env with your credentials
bun run start
```

Then restart Claude Code to load MCP servers.

## Requirements

- [Claude Code](https://claude.ai/code)
- [Bun.js](https://bun.sh/)
- [Docker](https://www.docker.com/) &
  [Docker Compose](https://docs.docker.com/compose/)

## MCP Servers

Custom Model Context Protocol servers for Claude Code integrations:

| Server              | Purpose                        | Port      |
| ------------------- | ------------------------------ | --------- |
| `gitlab-api`        | GitLab REST API integration    | -         |
| `gitlab-cli`        | GitLab CLI (`glab`) operations | -         |
| `minio-backend`     | Object storage (MinIO)         | 9000/9001 |
| `redis-backend`     | Redis cache operations         | 6379      |
| `surrealdb-backend` | Multi-model database           | 8000      |
| `orlop-cli`         | Orlop CLI operations           | -         |
| `karakeep-cli`      | Bookmark manager               | -         |
| `sourcegraph`       | Code search                    | -         |

Run individual servers:

```bash
bun run mcp:gitlab-api
bun run mcp:minio
bun run mcp:surrealdb
```

See `.devtooling/configs/` for MCP configuration templates.

## AI Security

Comprehensive AI/ML security capabilities based on MITRE ATLAS:

### Documentation

Located in `docs/ai-security/`:

- `MITRE-ATLAS-REFERENCE.md` - Complete ATLAS framework (14 tactics, 56
  techniques)
- `OWASP-LLM-SECURITY.md` - LLM Top 10 and defenses
- `COMPLIANCE-FRAMEWORKS.md` - NIST, ISO, EU AI Act
- `RED-TEAM-METHODOLOGIES.md` - Offensive testing
- `EMERGING-THREATS.md` - Agentic AI, federated learning
- `THREAT-INTELLIGENCE.md` - CVEs, incidents, IoCs

### Agents

Located in `.claude/agents/ai-security/`:

- **ATLAS Threat Modeling** - Systematic threat analysis
- **AI Red Team** - Adversarial testing (requires authorization)
- **AI Defense Strategy** - Security architecture and mitigations

### Skills

Located in `.claude/skills/`:

- `ai-security-assessment/` - End-to-end security workflow
- `adversarial-testing/` - Hands-on robustness testing
- `ai-security-update/` - Documentation maintenance

## Development Agents

- **Foundation Agent** (`.claude/agents/foundation_agent.md`) -
  Verification-first workflow, master fundamentals before automation
- **Grimface Agent** (`.claude/agents/grimface_agent.md`) - Skeptical critical
  thinking for stress-testing ideas
- **Software Dev Specialist**
  (`.claude/agents/software-dev-specialist-cli.md`) - CLI-focused development
  workflows

## Skills

- **Verification-First Workflow** (`.claude/skills/verification-first/`) -
  Structured workflow for building automation with understanding
- **Playwright Skill** (`.claude/skills/playwright-skill/`) - Browser automation
  and testing

## Docker Services

```yaml
surrealdb:8000      # Multi-model database
surrealdb-mcp:3004  # Official SurrealMCP server
redis:6379          # Cache
minio:9000/9001     # Object storage (UI at :9001)
```

## Configuration

MCP servers are disabled by default. Enable selectively from templates in
`.devtooling/configs/`:

- `.mcp.template.json` → `.mcp.json` (Claude Code CLI)
- `mcp-servers-config.template.json` → `mcp-servers-config.json` (Standard MCP)

Environment variables in `.env`:

```bash
GITLAB_TOKEN=<your-token>
MINIO_ROOT_PASSWORD=<password>
SURREALDB_USERNAME=root
SURREALDB_PASSWORD=root
```
