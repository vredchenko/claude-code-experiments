# Agor Research Overview

## What is Agor?

**Agor** is an open-source platform that functions as **"Figma, but for AI coding assistants"**. It enables teams to orchestrate multiple AI agent sessions (Claude Code, Google Codex, Gemini) across a shared, spatial canvas while managing Git workflows in real-time.

**Repository**: https://github.com/preset-io/agor
**Website**: https://agor.live/
**GitHub Stars**: 626+ (active development with 866+ commits)

## Why This is Exciting

Agor addresses a critical gap in team-based AI development:
- **Coordinating parallel AI-assisted coding** without context switching
- **Preventing port conflicts** and workflow bottlenecks
- **Visualizing AI agent work** like collaborative design tools
- **Managing multiple PRs simultaneously** with isolated environments

## Core Features

### 1. Spatial Multiplayer Canvas
- 2D board interface similar to Figma/Miro
- Real-time cursor positions and facepiles showing active team members
- Visualize AI sessions, worktrees, and collaboration spatially
- Drag-and-drop workflow management

### 2. Git Worktree Management
- Each task links to a specific GitHub issue or PR
- Automatically creates isolated Git branches
- Multiple agents work simultaneously without interference
- Separate ports and database states per worktree

### 3. Zone-Based Automation
- Define workflow zones: analyze, develop, review, deploy
- Zones trigger templated prompts when worktrees are positioned there
- Dynamic template injection: `"analyze this issue: {{ worktree.issue_url }}"`
- Automate repetitive agent workflows

### 4. Session Trees
- Fork existing sessions to explore alternatives
- Spawn subsessions for focused subtasks
- Maintain genealogical relationships in visual tree structure
- Easy comparison of different approaches

### 5. Isolated Development Environments
- Unique, auto-managed ports per worktree
- Prevents conflicts when multiple agents test simultaneously
- Independent resource allocation
- Clean separation of concerns

### 6. Mobile-Optimized UI
- Responsive interface for mobile devices
- Send prompts and monitor progress on the go
- Manage sessions from anywhere

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React-based web UI |
| **Backend** | FeathersJS server (Node.js) |
| **Database** | LibSQL (local SQLite alternative) |
| **ORM** | Drizzle ORM (type-safe queries) |
| **Agent Integration** | Custom SDKs for Claude, Codex, Gemini |
| **Communication** | REST + WebSocket (real-time) |
| **MCP Protocol** | JSON-RPC 2.0 for agent coordination |
| **CLI** | oclif framework |
| **Package Manager** | pnpm with monorepo (Turbo) |
| **Language** | TypeScript (93.6% of codebase) |

## Quick Start

### Installation

```bash
# Install globally
npm install -g agor-live

# Or using pnpm
pnpm add -g agor-live
```

### Basic Usage

```bash
# Initialize Agor (creates ~/.agor/ database)
agor init

# Start background service
agor daemon start

# Open web interface
agor open
```

### Development Setup

```bash
# Clone repository
git clone https://github.com/preset-io/agor.git
cd agor

# Install dependencies
pnpm install

# Terminal 1: Start backend (port 3030)
cd apps/agor-daemon
pnpm dev

# Terminal 2: Start frontend (port 5173)
cd apps/agor-ui
pnpm dev
```

### Docker Setup

```bash
# Using Docker Compose
docker-compose up -d
```

## Key Concepts

### Worktrees
- Isolated development contexts linked to GitHub issues
- Each has its own branch and environment
- Can be moved between workflow zones
- Automatic resource management

### Zones
- Spatial regions on canvas
- Execute templated prompts when worktrees are dropped
- Support dynamic variable injection
- Enable workflow automation

### Sessions
- Individual AI agent conversations
- Can fork, spawn, or terminate independently
- Maintain parent-child relationships
- Visualized as tree structures

### MCP Service
- Internal protocol for agent coordination
- Enables agents to query Agor's state
- Allows agent-to-agent supervision
- Coordinates parallel work

## Use Case Example

**Scenario**: Team managing 5 parallel PRs

1. **Create 5 linked worktrees** (one per PR)
2. **Spawn AI sessions** for each worktree
3. **Drop sessions into analysis zones** → triggers automatic issue review
4. **Watch all agents work simultaneously** with isolated ports
5. **Review progress** in spatial canvas view
6. **Push directly to GitHub** when complete

Benefits:
- No port conflicts
- No context switching
- Visual progress tracking
- Parallel execution
- Automated workflows

## Integration with Claude Code

Agor is designed to work with Claude Code (among other AI assistants):
- Native support for Claude sessions
- Can orchestrate multiple Claude instances
- Integrates with Claude's MCP protocol
- Enables Claude-to-Claude coordination
- Visual monitoring of Claude's work

## Potential Experiments

### 1. Multi-Agent Coordination
- Spawn multiple Claude Code sessions for different parts of a feature
- Use zones to automate testing, linting, documentation
- Coordinate agents working on frontend + backend simultaneously

### 2. Workflow Automation
- Create zones for: analyze → implement → test → review → deploy
- Template prompts for common tasks
- Reduce manual agent guidance

### 3. Parallel PR Management
- Work on multiple features simultaneously
- Prevent resource conflicts
- Visual tracking of all active work

### 4. Agent Supervision
- Use one Claude instance to supervise others
- Coordinate complex multi-file changes
- Review and merge agent outputs

### 5. Mobile Development Workflow
- Monitor long-running agent tasks from mobile
- Send correction prompts on the go
- Quick status checks

## Integration with This Repository

Potential synergies with existing capabilities:

### With Existing Agents
- **Foundation Agent**: Verify Agor setup and understanding
- **Grimface Agent**: Challenge Agor workflow assumptions
- **AI Security Agents**: Analyze security implications of multi-agent systems

### With Existing Skills
- **Verification-First Workflow**: Apply to Agor setup
- **Playwright Skill**: Test Agor's web UI
- **AI Security Assessment**: Evaluate multi-agent coordination risks

### With MCP Servers
- **GitLab Integration**: Extend Agor to work with GitLab
- **SurrealDB**: Store Agor session data in SurrealDB
- **Sourcegraph**: Enhanced code search within Agor workflows

## Research Questions

1. **Performance**: How does Agor handle 10+ simultaneous agent sessions?
2. **Resource Usage**: What are memory/CPU requirements at scale?
3. **Claude Code Integration**: How smooth is the Claude Code experience?
4. **Workflow Patterns**: What zone templates work best?
5. **Team Collaboration**: Real-world effectiveness for distributed teams?
6. **Security**: Implications of multiple agents accessing codebase?
7. **MCP Protocol**: Can we extend with custom MCP servers?
8. **Mobile Experience**: Is mobile workflow actually practical?

## Next Steps

See [EXPERIMENTATION.md](./EXPERIMENTATION.md) for detailed experimentation plan.

## Resources

- **GitHub Repository**: https://github.com/preset-io/agor
- **Website**: https://agor.live/
- **Documentation**: Available at agor.live
- **Issue Tracker**: https://github.com/preset-io/agor/issues
- **Stars**: 626+ (developers pledge to fix one issue per star)

## Notes

- Built heavily with Claude AI assistance (meta!)
- Active development (866+ commits)
- TypeScript-heavy codebase (93.6%)
- Real-time multiplayer with comments and reactions
- Novel approach: treating agent coordination like design collaboration

---

**Status**: Research initialized
**Date**: 2025-11-12
**Branch**: `claude/explore-agor-preset-011CV4HtMZUXxgnTsMiWz5Jv`
