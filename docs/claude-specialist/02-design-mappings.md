# Design Mappings: What Goes Where

This document maps types of learnings to the appropriate Claude Code
customization technique.

## Quick Reference Matrix

| Learning Type           | Primary Technique | Secondary Technique | Trigger Threshold               |
| ----------------------- | ----------------- | ------------------- | ------------------------------- |
| Project conventions     | CLAUDE.md         | -                   | 1st observation (if documented) |
| Repeated workflows      | Commands          | Hooks (automation)  | 3+ occurrences                  |
| Specialized expertise   | Agents            | -                   | Domain identified               |
| Automated validations   | Hooks             | -                   | Clear enforcement need          |
| Context optimization    | .claudeignore     | -                   | Repeated context pollution      |
| File operation patterns | Hooks             | -                   | 3+ similar operations           |
| Testing workflows       | Commands          | Hooks               | Both manual and auto            |
| Deployment procedures   | Commands          | -                   | Standardized process            |
| Code style enforcement  | Hooks             | CLAUDE.md           | Auto-format + guidelines        |
| Architecture patterns   | CLAUDE.md         | Agents              | Core + deep dives               |
| Gotchas/pitfalls        | CLAUDE.md         | -                   | 1st occurrence (if significant) |
| Security patterns       | Agents            | Hooks               | Review + validation             |
| Performance patterns    | Agents            | CLAUDE.md           | Specialized + general           |

## Detailed Decision Trees

### When to Use CLAUDE.md

**Add to CLAUDE.md if:**

- ✅ Pattern applies universally across the project
- ✅ It's a documented fact (found in code/docs)
- ✅ It's a critical constraint that must always be respected
- ✅ It's an architecture decision with broad impact
- ✅ It's a gotcha that caused actual problems
- ✅ Needed in every session

**Examples to capture**:

```text
# Discovered Convention

"All API calls in this project use React Query - found in api/README.md stating
this is a project-wide standard. Never use native fetch directly."

# Architecture Pattern

"Database queries always use .lean() for read-only operations - found
consistently across 15+ query files in src/db/"

# Critical Constraint

"Never use eval() or Function() constructor - explicit security policy in
SECURITY.md line 45"

# Known Gotcha

"Redis connection must be explicitly closed in tests - caused test hangs 3
times. Pattern found in test-utils.ts:cleanup()"
```

**Don't add to CLAUDE.md**:

- ❌ One-off operations
- ❌ Personal preferences without evidence
- ❌ Temporary workarounds
- ❌ Frequently changing patterns

### When to Create a Command

**Create command if:**

- ✅ Operation repeated 3+ times
- ✅ Multi-step workflow with predictable structure
- ✅ Common debugging scenario
- ✅ Standardized deployment/build procedure
- ✅ Test execution pattern

**Threshold**: 3+ occurrences of similar operation

**Examples**:

**Repeated Operation**:

```text
Observation: User runs "bun test && bun run lint && bun run type-check"
before every commit (4 times)

Action: Create /pre-commit command
```

**Multi-Step Workflow**:

```text
Observation: Database reset follows same pattern:
1. docker-compose down db
2. docker-compose up -d db
3. bun run db:migrate
4. bun run db:seed
(Repeated 3 times in 2 days)

Action: Create /db-reset command
```

**Common Debug Scenario**:

```text
Observation: When API tests fail, always run:
1. Check API logs: docker logs api-server
2. Check database state: psql -c "SELECT * FROM users"
3. Restart services: docker-compose restart api
(Repeated 3 times)

Action: Create /debug-api command
```

**Don't create command for**:

- ❌ Single use operations
- ❌ Highly variable workflows
- ❌ Exploratory work

### When to Create an Agent

**Create agent if:**

- ✅ Specialized domain expertise needed repeatedly
- ✅ Complex analysis requiring deep context
- ✅ Review process with specific criteria
- ✅ Different perspective needed (skeptical review, user advocacy)
- ✅ Heavy context that shouldn't always be loaded

**Examples**:

**Domain Expertise**:

```text
Observation: Database optimization questions come up regularly - query
performance, indexing strategies, schema design
(5 occurrences over 2 weeks)

Action: Create database_optimization_agent.md with expertise on:
- Query analysis and EXPLAIN plans
- Index strategy for this database (PostgreSQL)
- N+1 detection
- Schema normalization
```

**Review Process**:

```text
Observation: Security review needed before deploying auth changes
(Explicit requirement in SECURITY.md)

Action: Create security_auditor_agent.md with checklist:
- OWASP Top 10 vulnerabilities
- Authentication/authorization flows
- Input validation
- Secure defaults
```

**Specialized Analysis**:

```text
Observation: React performance optimization requires specialized knowledge
- Re-render analysis
- useMemo/useCallback usage
- Component architecture
(Recurring need identified)

Action: Create react_performance_agent.md
```

**Don't create agent for**:

- ❌ Quick one-off reviews
- ❌ Simple checklists (use commands instead)
- ❌ Universal knowledge (add to CLAUDE.md)

### When to Create a Hook

**Create hook if:**

- ✅ Automatic enforcement needed
- ✅ Quality check should happen every time
- ✅ Fast operation (< 2 seconds)
- ✅ Clear success/failure criteria
- ✅ Prevents common mistakes

**Examples**:

**Auto-Format** (Post-Edit hook):

```text
Observation: Code formatting inconsistencies in PRs
(Recurring issue)

Action: Add post-edit hook to run prettier
Trigger: After Edit or Write tool
Command: prettier --write {file}
```

**Pre-Commit Tests** (Pre-Bash hook):

```text
Observation: Broken code committed 3 times
(Should have caught with tests)

Action: Add pre-bash hook for git commit
Trigger: Before "git commit" command
Command: bun test && bun run lint
```

**Secret Detection** (Post-Write hook):

```text
Observation: Nearly committed .env file
(Security requirement)

Action: Add post-write hook to check for secrets
Trigger: After Write tool
Command: git-secrets --scan {file}
```

**Don't create hook for**:

- ❌ Slow operations (> 5 seconds) - use commands instead
- ❌ Operations that fail frequently
- ❌ Disruptive checks

### When to Update .claudeignore

**Add to .claudeignore if:**

- ✅ Files repeatedly loaded but never useful
- ✅ Large directories without source code
- ✅ Build artifacts, generated files
- ✅ Binary/media files
- ✅ Context pollution observed

**Auto-add triggers**:

- Large directories (>1000 files) without source code
- Repeated Grep/Read operations on irrelevant paths
- Binary files being loaded unnecessarily

**Examples**:

```text
Observation: node_modules/ appears in search results, slowing searches
Action: Add node_modules/ to .claudeignore

Observation: Coverage reports in coverage/ loaded during file searches
Action: Add coverage/ to .claudeignore

Observation: Minified bundles in dist/ consuming context
Action: Add dist/ to .claudeignore
```

## Decision Flowchart

```text
New Learning Observed
        ↓
    Is it a universal truth?
        ↓ Yes
    Add to CLAUDE.md

        ↓ No
    Is it repeated 3+ times?
        ↓ Yes
    Is it a workflow?
        ↓ Yes → Create Command
        ↓ No
    Is it a pattern to enforce?
        ↓ Yes → Create Hook

        ↓ No (not repeated)
    Is it specialized knowledge?
        ↓ Yes → Create Agent

        ↓ No
    Is it context pollution?
        ↓ Yes → Update .claudeignore

        ↓ No
    Don't capture (noise)
```

## Real-World Examples

### Example 1: API Testing Pattern

**Observation**: Testing API endpoints follows pattern:

1. Start server
2. Run curl command
3. Check database state
4. Stop server (Repeated 4 times)

**Decision**:

- **Primary**: Create `/test-api-endpoint` command (repeated workflow)
- **Secondary**: Consider post-edit hook to run related tests automatically

### Example 2: TypeScript Strict Mode

**Observation**: Found `"strict": true` in tsconfig.json, confirmed in docs as
project standard

**Decision**:

- **Primary**: Add to CLAUDE.md as universal constraint
- **Secondary**: Consider hook to run type-check on edit

### Example 3: React Performance Issues

**Observation**: Multiple performance optimization sessions dealing with
re-renders, memoization

**Decision**:

- **Primary**: Create `react_performance_agent.md` (specialized expertise)
- **Secondary**: Add general guidelines to CLAUDE.md

### Example 4: Pre-Commit Checks

**Observation**: Manual "lint → test → type-check" sequence before every commit
(5+ times)

**Decision**:

- **Primary**: Create pre-bash hook for git commit
- **Alternative**: Create `/pre-commit` command if hook too disruptive

### Example 5: Database Schema Changes

**Observation**: Database migrations must be reversible (found in
CONTRIBUTING.md)

**Decision**:

- **Primary**: Add to CLAUDE.md (documented convention)
- **Secondary**: Create hook to validate migration files have up() and down()

## Conflict Resolution

### What if multiple techniques apply?

**Use both when appropriate**:

- CLAUDE.md for universal context + Agent for deep dives
- Command for manual execution + Hook for automatic enforcement
- CLAUDE.md for the rule + Hook for enforcement

**Example**:

```text
Learning: All commits must follow Conventional Commits format

Implementation:
1. Add to CLAUDE.md: "This project uses Conventional Commits"
2. Create hook: Pre-bash git commit → validate message format
3. Create command: /commit-conventional → interactive commit with prompts

Rationale:
- CLAUDE.md: Claude knows the convention
- Hook: Automatic enforcement
- Command: Helpful guidance for formatting
```

### Overlapping Concerns

**Architecture patterns**:

- High-level in CLAUDE.md
- Deep analysis in specialized agent

**Testing workflows**:

- Quick smoke tests via hook
- Full test suite via command
- Test strategy in CLAUDE.md

**Code quality**:

- Auto-format via hook
- Style guidelines in CLAUDE.md
- Deep refactoring via agent

## Summary

Choose technique based on:

1. **Scope** - Universal (CLAUDE.md) vs. Specialized (Agent)
2. **Frequency** - Repeated (Command/Hook) vs. Occasional (Agent)
3. **Automation** - Auto-enforce (Hook) vs. Manual (Command)
4. **Context Weight** - Always needed (CLAUDE.md) vs. On-demand (Agent)
5. **Action Type** - Enforcement (Hook) vs. Workflow (Command) vs. Knowledge
   (CLAUDE.md/Agent)

When in doubt:

- Start with CLAUDE.md (easy to refactor later)
- Prefer commands over agents for simple workflows
- Only create hooks for fast, reliable checks
- Keep .claudeignore aggressive (exclude by default)
