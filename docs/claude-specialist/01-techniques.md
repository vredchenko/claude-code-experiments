# Claude Code Customization Techniques

This document catalogs all available mechanisms for customizing Claude Code behavior, with guidance on when to use each.

## Quick Reference

| Technique | Scope | Visibility | Best For |
|-----------|-------|------------|----------|
| CLAUDE.md | Project-wide | Always loaded | Core conventions, architecture |
| Agents | On-demand | When invoked | Specialized expertise |
| Commands | On-demand | Via `/cmd` | Repeated workflows |
| Hooks | Event-driven | Auto-execute | Quality enforcement |
| Skills | On-demand | Invokable | Cross-project capabilities |
| .claudeignore | Context filtering | Always active | Exclude irrelevant files |
| Config | Settings | Always active | Preferences, overrides |

## 1. CLAUDE.md

**Location**: Root of repository

**Scope**: Project-wide instructions, always active

**Purpose**: Core project conventions, architecture decisions, development workflows

**When to use**:
- Project-specific requirements that apply universally
- Critical constraints and guidelines
- High-level architecture patterns
- Tech stack conventions
- Known gotchas and pitfalls

**Visibility**: Always loaded, highest priority context

**Examples**:
```markdown
# Project Conventions

- All API calls use React Query - never use native fetch directly
- Database migrations must be reversible - always include down()
- Components follow feature-based organization in src/features/
- Tests colocated with source: MyComponent.tsx → MyComponent.test.tsx
```

**Characteristics**:
- Highest priority context
- Should remain concise (risk: becomes unwieldy)
- Universal truths about the project
- Infrequently changed (avoid churn)

## 2. Agents (.claude/agents/)

**Location**: `.claude/agents/*.md`

**Scope**: On-demand specialized contexts

**Purpose**: Domain-specific expertise that's invoked when needed

**When to use**:
- Specialized tasks requiring deep domain knowledge
- Critical review processes (security, performance, accessibility)
- Different "modes" of operation (debugging, optimization, refactoring)
- Personas for specific perspectives (skeptical review, user advocacy)

**Visibility**: Loaded only when explicitly invoked

**Examples**:

**security_auditor.md**:
```markdown
You are a security-focused code reviewer. Analyze code for:
- OWASP Top 10 vulnerabilities
- Authentication/authorization flaws
- Input validation gaps
- Secure defaults
- Cryptographic mistakes
```

**performance_optimizer.md**:
```markdown
You are a performance optimization specialist. Focus on:
- Database query efficiency (N+1 problems)
- React re-render optimization
- Bundle size analysis
- Caching opportunities
- Lazy loading candidates
```

**api_design_reviewer.md**:
```markdown
You review API design for consistency and best practices:
- RESTful conventions
- Naming consistency
- Error response formats
- Versioning strategy
- Documentation completeness
```

**Characteristics**:
- Heavy context (can be verbose)
- Specialized knowledge
- Invoked explicitly when needed
- Multiple agents can exist for different domains

## 3. Commands (.claude/commands/)

**Location**: `.claude/commands/*.md`

**Scope**: Slash command shortcuts

**Purpose**: Frequently repeated operations bundled into convenient commands

**When to use**:
- Common workflows that follow predictable patterns (3+ uses)
- Multi-step operations repeated frequently
- Standardized processes (deployment, testing, code reviews)
- Quick access to complex tool invocations

**Visibility**: Available via `/command-name` syntax

**Examples**:

**test-all.md**:
```markdown
Run the complete test suite with coverage:
1. Run unit tests: `bun test`
2. Run integration tests: `bun test:integration`
3. Generate coverage report: `bun test:coverage`
4. Display coverage summary
```

**db-reset.md**:
```markdown
Reset the database to clean state:
1. Drop existing database
2. Run all migrations
3. Seed with test data
4. Confirm reset completed
```

**deploy-staging.md**:
```markdown
Deploy current branch to staging:
1. Run tests and type checking
2. Build production bundle
3. Run database migrations on staging
4. Deploy to staging environment
5. Run smoke tests
6. Display deployment URL
```

**Characteristics**:
- Lightweight (short prompts)
- Action-oriented
- Frequently invoked
- Should be discoverable (clear names)

## 4. Hooks

**Location**: `.claude/config.json` (hooks section)

**Scope**: Event-driven automation

**Purpose**: Automatic actions triggered by tool usage or session events

**Types**:
- **Pre-tool hooks** - Run before a tool executes
- **Post-tool hooks** - Run after a tool completes
- **User prompt submit hooks** - Run when user submits a message
- **Session start hooks** - Run at session initialization (web sessions)

**When to use**:
- Automated validation (linting, type checking)
- Automatic formatting
- Commit message validation
- Security checks before file operations
- Context setup automation

**Examples**:

```json
{
  "hooks": {
    "post-edit": "prettier --write {file}",
    "pre-bash": "if [[ {command} =~ 'git commit' ]]; then npm run lint && npm test; fi",
    "post-write": "eslint --fix {file}"
  }
}
```

**Hook scenarios**:

**Auto-format on save**:
- Trigger: Post-Edit, Post-Write
- Action: Run prettier/eslint --fix
- Benefit: Consistent code style without thinking

**Run tests after code changes**:
- Trigger: Post-Edit (for *.ts, *.tsx files)
- Action: Run tests for changed file
- Benefit: Immediate feedback on breakage

**Validate commit messages**:
- Trigger: Pre-Bash (git commit)
- Action: Check message format (conventional commits)
- Benefit: Consistent git history

**Security scanning**:
- Trigger: Post-Write
- Action: Check for secrets, vulnerabilities
- Benefit: Prevent accidental secret commits

**Characteristics**:
- Automatic execution
- Can be disruptive if too aggressive
- Should be fast (avoid blocking work)
- Clear success/failure feedback

## 5. Skills

**Location**: User-level or project-level skill definitions

**Scope**: Reusable capabilities

**Purpose**: Complex, multi-step capabilities that can be invoked

**When to use**:
- Cross-project functionality
- Complex workflows requiring multiple tool orchestrations
- Domain-specific expertise packages

**Note**: Skills are typically defined at user level, less common for project-specific use. Most project-specific needs are better served by Agents or Commands.

**Characteristics**:
- More complex than commands
- Can span multiple projects
- Less frequently used for project-specific customization

## 6. .claudeignore

**Location**: Root of repository (or subdirectories)

**Scope**: Context exclusion

**Purpose**: Prevent irrelevant files from consuming context window

**When to use**:
- Exclude build artifacts, dependencies, generated files
- Ignore large data files or binaries
- Filter out irrelevant configuration
- Reduce context pollution

**Examples**:

```
# Dependencies
node_modules/
vendor/
.pnpm-store/

# Build outputs
dist/
build/
.next/
out/

# Generated files
*.generated.ts
coverage/
.docusaurus/

# Large data files
*.csv
*.log
*.sqlite

# IDE and environment
.env
.env.local
.vscode/
.idea/

# Media files
*.png
*.jpg
*.mp4
```

**Characteristics**:
- Improves context window efficiency
- Reduces noise in file searches
- Faster read operations
- Similar syntax to .gitignore

## 7. Repository Config (.claude/config.json)

**Location**: `.claude/config.json`

**Scope**: Local settings that override global Claude Code config

**Purpose**: Project-specific preferences and behaviors

**When to use**:
- Override default model selection
- Configure hooks
- Set project-specific preferences
- Define custom tool behaviors

**Examples**:

```json
{
  "model": "claude-sonnet-4-5",
  "hooks": {
    "post-edit": "prettier --write {file}"
  },
  "autoApprove": {
    "read": true,
    "glob": true,
    "grep": true
  },
  "experimental": {
    "feature-x": true
  }
}
```

**Characteristics**:
- Project-specific overrides
- Affects all sessions for this project
- Version controlled
- Can include hook definitions

## 8. Session Start Hooks

**Context**: Web sessions (browser-based Claude Code at claude.ai/code)

**Purpose**: Initial setup when starting a web session

**When to use** (Web sessions only):
- Environment setup (install dependencies)
- Service initialization (start databases, servers)
- Context preparation

**Note**: Less relevant for CLI usage where environment persists between sessions. Primarily useful for ephemeral web-based environments that reset between sessions.

**Example**:

```bash
#!/bin/bash
# .claude/hooks/session-start.sh

# Install dependencies
bun install

# Start services
docker-compose up -d

# Wait for services
sleep 5

# Run migrations
bun run db:migrate

echo "Environment ready"
```

**Characteristics**:
- Web-session specific
- Not applicable to persistent CLI environments
- Can be time-consuming (runs once per session)
- Should be idempotent

---

## Summary

Each technique serves a specific purpose:

- **CLAUDE.md** - Universal project truths
- **Agents** - Specialized deep dives
- **Commands** - Frequent operations
- **Hooks** - Automatic enforcement
- **Skills** - Cross-project capabilities
- **.claudeignore** - Context optimization
- **Config** - Preferences and settings
- **Session hooks** - Web session setup

Choose the right technique based on:
- **Frequency** - How often is it needed?
- **Scope** - Project-wide or specialized?
- **Automation** - Should it auto-execute?
- **Visibility** - Always loaded or on-demand?
