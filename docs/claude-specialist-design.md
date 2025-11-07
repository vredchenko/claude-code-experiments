# Claude Code Specialist - Self-Improving Project Intelligence

## Overview

This design document outlines a system for Claude Code to automatically improve and advance its project-specific expertise through organic learning during development work. Rather than requiring manual authoring and refinement of project customizations, Claude learns patterns, conventions, and workflows as it works, then proposes or automatically implements improvements to its own tooling.

## Motivation

- **Reduce manual documentation burden** - Capture learnings as a natural byproduct of work
- **Compound effectiveness over time** - Each session makes Claude more capable for this project
- **Version-controlled knowledge** - Full history and rollback capability
- **Context-aware** - Captures actual usage patterns, not just intended behavior
- **Organic knowledge capture** - Patterns emerge naturally during work

## Claude Code Customization Techniques

### 1. CLAUDE.md
- **Location**: Root of repository
- **Scope**: Project-wide instructions, always active
- **Purpose**: Core project conventions, architecture decisions, development workflows
- **When to use**:
  - Project-specific requirements that apply universally
  - Critical constraints and guidelines
  - High-level architecture patterns
  - Tech stack conventions
- **Visibility**: Always loaded, highest priority context

### 2. Agents (.claude/agents/)
- **Location**: `.claude/agents/*.md`
- **Scope**: On-demand specialized contexts
- **Purpose**: Domain-specific expertise that's invoked when needed
- **When to use**:
  - Specialized tasks requiring deep domain knowledge
  - Critical review processes (security, performance, accessibility)
  - Different "modes" of operation (debugging, optimization, refactoring)
  - Personas for specific perspectives (skeptical review, user advocacy)
- **Visibility**: Loaded only when explicitly invoked
- **Examples**:
  - Security auditor agent
  - Performance optimization agent
  - API design reviewer
  - Database schema expert

### 3. Commands (.claude/commands/)
- **Location**: `.claude/commands/*.md`
- **Scope**: Slash command shortcuts
- **Purpose**: Frequently repeated operations bundled into convenient commands
- **When to use**:
  - Common workflows that follow predictable patterns
  - Multi-step operations repeated frequently
  - Standardized processes (deployment, testing, code reviews)
  - Quick access to complex tool invocations
- **Visibility**: Available via `/command-name` syntax
- **Examples**:
  - `/test-all` - Run full test suite with coverage
  - `/deploy-staging` - Deploy to staging environment
  - `/review-pr <number>` - Review a pull request

### 4. Hooks
- **Location**: `.claude/config.json` (hooks section)
- **Scope**: Event-driven automation
- **Purpose**: Automatic actions triggered by tool usage or session events
- **Types**:
  - **Pre-tool hooks** - Run before a tool executes
  - **Post-tool hooks** - Run after a tool completes
  - **User prompt submit hooks** - Run when user submits a message
  - **Session start hooks** - Run at session initialization (web sessions)
- **When to use**:
  - Automated validation (linting, type checking)
  - Automatic formatting
  - Commit message validation
  - Security checks before file operations
  - Context setup automation
- **Examples**:
  - Auto-format on file write
  - Run tests after code edits
  - Validate commit messages

### 5. Skills
- **Location**: User-level or project-level skill definitions
- **Scope**: Reusable capabilities
- **Purpose**: Complex, multi-step capabilities that can be invoked
- **When to use**:
  - Cross-project functionality
  - Complex workflows requiring multiple tool orchestrations
  - Domain-specific expertise packages
- **Note**: Skills are typically defined at user level, less common for project-specific use

### 6. .claudeignore
- **Location**: Root of repository (or subdirectories)
- **Scope**: Context exclusion
- **Purpose**: Prevent irrelevant files from consuming context window
- **When to use**:
  - Exclude build artifacts, dependencies, generated files
  - Ignore large data files or binaries
  - Filter out irrelevant configuration
- **Examples**:
  ```
  node_modules/
  dist/
  *.log
  .env
  ```

### 7. Repository Config (.claude/config.json)
- **Location**: `.claude/config.json`
- **Scope**: Local settings that override global Claude Code config
- **Purpose**: Project-specific preferences and behaviors
- **When to use**:
  - Override default model selection
  - Configure hooks
  - Set project-specific preferences
  - Define custom tool behaviors
- **Examples**:
  - Default model preference
  - Auto-approval rules
  - Hook configurations

### 8. Session Start Hooks
- **Context**: Web sessions (browser-based Claude Code)
- **Purpose**: Initial setup when starting a web session
- **When to use** (Web sessions):
  - Environment setup (install dependencies)
  - Service initialization (start databases, servers)
  - Context preparation
- **Note**: Less relevant for CLI usage, primarily for web-based Claude Code

## Design Principles: Mapping Improvements to Techniques

### Quick Reference Matrix

| Learning Type | Primary Technique | Secondary Technique | Notes |
|--------------|-------------------|---------------------|-------|
| Project conventions | CLAUDE.md | - | Core, universal patterns |
| Repeated workflows | Commands | Hooks (automation) | 3+ occurrences trigger |
| Specialized expertise | Agents | - | Domain-specific knowledge |
| Automated validations | Hooks | - | Event-driven checks |
| Context optimization | .claudeignore | - | Reduce noise |
| File operation patterns | Hooks | - | Pre/post tool automation |
| Testing workflows | Commands | Hooks | Both manual and auto |
| Deployment procedures | Commands | - | Standardized processes |
| Code style enforcement | Hooks | CLAUDE.md | Auto-format + guidelines |
| Architecture patterns | CLAUDE.md | Agents | Core + deep dives |
| Gotchas/pitfalls | CLAUDE.md | - | Universal awareness |
| Security patterns | Agents | Hooks | Review + validation |
| Performance patterns | Agents | CLAUDE.md | Specialized + general |

### Detailed Mapping Guidelines

#### Use CLAUDE.md for:
- **Project architecture patterns** discovered during development
- **Universal conventions** that apply across all work
- **Critical constraints** that must always be respected
- **Tech stack decisions** and their rationale
- **Known gotchas** that caused problems
- **Development workflow** basics

**Example additions:**
- "This project uses React Query for all API calls - never use native fetch directly"
- "Database migrations must be reversible - always include down() methods"
- "All API endpoints must have corresponding TypeScript types in api-types.ts"

#### Use Agents for:
- **Specialized review modes** (security, performance, accessibility)
- **Domain expertise** that's needed occasionally
- **Different perspectives** (critical thinking, user advocacy)
- **Complex analysis** requiring deep context
- **Specialized refactoring** patterns

**Example agents:**
- Database optimization agent (analyzes queries, suggests indexes)
- API design reviewer (ensures REST conventions, consistency)
- React performance agent (identifies re-render issues, memoization opportunities)
- Security auditor (checks for OWASP vulnerabilities)

#### Use Commands for:
- **Frequently repeated sequences** (3+ occurrences)
- **Multi-step workflows** with predictable structure
- **Common debugging scenarios**
- **Deployment/build procedures**
- **Test execution patterns**

**Example commands:**
- `/test-changed` - Run tests for git-modified files
- `/check-types` - Full TypeScript type check with verbose output
- `/db-reset` - Drop, recreate, seed database
- `/api-test <endpoint>` - Test specific API endpoint with common scenarios

#### Use Hooks for:
- **Automatic code quality enforcement** (format, lint)
- **Pre-commit validations**
- **Post-edit test runs**
- **Security checks** on file operations
- **Automatic documentation updates**

**Example hooks:**
- Post-Edit: Run prettier on modified file
- Pre-Bash(git commit): Run linter and tests
- Post-Write: Update API documentation if routes changed
- User-prompt-submit: Check for potential secrets in message

#### Use .claudeignore for:
- **Build artifacts** (dist/, build/, .next/)
- **Dependencies** (node_modules/, vendor/)
- **Large generated files** (bundle stats, coverage reports)
- **Irrelevant configs** (IDE settings)
- **Data files** that don't inform development

**Auto-add triggers:**
- Large directories (>1000 files) without source code
- Repeated context pollution from same paths
- Binary/media files being unnecessarily loaded

#### Use Repository Config for:
- **Model preferences** for this project
- **Hook definitions**
- **Project-specific overrides**
- **Tool behavior customization**

## Implementation Strategy

### Four-Pronged Approach

#### 1. Specialist Agent
**File**: `.claude/agents/specialist_agent.md`

**Purpose**: Deep analysis of project history and patterns to propose comprehensive improvements

**When invoked**:
- Weekly/monthly reviews (explicit `/reflect` command)
- After major feature completions
- When explicitly requested

**Responsibilities**:
- Analyze git history for patterns
- Review conversation logs for repeated operations
- Identify gaps in current tooling
- Propose comprehensive updates across all techniques
- Perform cost/benefit analysis of changes

#### 2. Improvement Command
**File**: `.claude/commands/improve-claude.md`

**Purpose**: Explicit trigger for capturing learnings from recent work

**When invoked**:
- End of feature development
- After resolving complex issues
- When user wants to "remember this"

**Responsibilities**:
- Review recent work (git log, file changes)
- Identify patterns worth capturing
- Propose specific additions/modifications
- Create commits with improvements

#### 3. Background Pattern Detection
**Mechanism**: Built-in awareness during normal operation

**Purpose**: Passive observation without interrupting work

**Behavior**:
- Count repeated operations (bash sequences, file patterns, searches)
- Notice emerging conventions
- Track pain points and inefficiencies
- **Do not auto-act** - only store observations
- Occasionally propose: "I've noticed X happening repeatedly - should we capture this?"

**Trigger thresholds**:
- 3+ identical command sequences → Consider creating command
- 5+ similar file operations → Consider hook automation
- Repeated searches for same patterns → Consider adding to CLAUDE.md
- Same question asked multiple times → Consider agent or documentation

#### 4. Post-Session Hook (Optional)
**File**: `.claude/config.json` (post-session hook)

**Purpose**: Prompt for lightweight reflection after work sessions

**When triggered**:
- End of significant work sessions
- After completing major tasks

**Behavior**:
- Quick summary of what was learned
- Ask: "Anything worth capturing?"
- Low friction - easy to skip

## Usage Tracking and Feedback System

### Tracking Mechanisms

#### 1. Usage Counters
Track invocations of each customization:

**Tracked metrics**:
- Command invocation count
- Agent invocation count
- Hook execution count
- Patterns captured in CLAUDE.md (referenced how often?)

**Storage**:
- `.claude/usage-stats.json` (gitignored)
- Or embedded in config with timestamps

**Structure**:
```json
{
  "commands": {
    "test-all": {
      "invocations": 42,
      "lastUsed": "2025-11-07T10:30:00Z",
      "avgTimeMs": 15000,
      "feedbackScore": 4.5
    }
  },
  "agents": {
    "specialist_agent": {
      "invocations": 5,
      "lastUsed": "2025-11-06T14:20:00Z"
    }
  },
  "hooks": {
    "post-edit-format": {
      "executions": 156,
      "failures": 2
    }
  }
}
```

#### 2. Feedback Collection

**Lightweight feedback prompts** (non-intrusive):

After using a command/agent (randomly sampled):
```
Just used /test-all command
👍 Useful  👎 Not useful  ⏭ Skip feedback
```

Periodic review (weekly):
```
This week you used:
- /test-all (15 times)
- /db-reset (3 times)
- security_agent (once)

Any feedback on these tools?
```

**Feedback triggers**:
- 1st, 5th, 20th use (early validation)
- Every 50 uses after that
- After errors/failures
- During `/reflect` sessions

**Feedback data**:
- Useful/not useful
- Success/failure from user perspective
- Free-form comments
- Time saved (perceived)

#### 3. A/B Testing Framework

**Purpose**: Validate that tools are actually valuable, not just accumulated cruft

**Mechanism**:
- Temporarily disable a tool to see if it's missed
- Enable "experimental" versions of tools
- Compare usage patterns with/without features

**A/B test types**:

**Shadow disabling** (tool still exists but suggests alternative):
```
/test-all command is in A/B test mode
Would you like to:
a) Use the command as normal
b) Do the equivalent manually (to test if command is worth keeping)
```

**Periodic pruning candidates**:
- Commands used <3 times in 30 days
- Agents never invoked in 60 days
- Hooks that frequently fail
- .claudeignore patterns that don't match files

**Test procedure**:
1. Identify low-usage tools (usage-stats.json)
2. Mark for A/B test (add to config)
3. Monitor: Does user request it when disabled?
4. Decision: Keep, modify, or remove

**Example A/B test config**:
```json
{
  "abTests": {
    "db-reset-command": {
      "status": "testing-removal",
      "startDate": "2025-11-01",
      "endDate": "2025-11-30",
      "reason": "Used only 2 times in last 60 days",
      "manualRequests": 0
    }
  }
}
```

### Feedback Loop Integration

**Monthly review cycle**:
1. Specialist agent analyzes usage stats
2. Identifies high-value tools (reinforce/expand)
3. Identifies low-value tools (A/B test candidates)
4. Proposes new tools based on unmet patterns
5. Suggests consolidation opportunities

**Questions to answer**:
- Which commands/agents are most valuable?
- What's being used vs. what's being ignored?
- Are hooks helping or causing friction?
- What patterns are emerging that aren't captured?
- What captured patterns turned out to be temporary?

## Decision Framework: When to Auto-commit vs. Propose vs. Ask

### Auto-commit (Low Risk)
- Adding to .claudeignore (non-controversial paths)
- Creating commands for clearly repeated patterns (4+ occurrences)
- Usage stat updates
- Documentation of discovered facts (not opinions)

**Commit message format**:
```
chore(claude): Add .claudeignore entry for coverage reports

Observed: Coverage reports repeatedly loaded in context without value
Action: Added coverage/ to .claudeignore
Impact: Reduced context noise
```

### Propose First (Medium Risk)
- Updates to CLAUDE.md (changes to core instructions)
- Creating new agents
- Modifying existing commands
- Adding hooks that auto-execute

**Proposal format**:
```
I've noticed [pattern]. I propose:

[Specific change]

Benefits: [list]
Risks: [list]

Proceed? (yes/no/modify)
```

### Always Ask (High Risk)
- Removing existing tools
- Changing core project instructions
- Modifying user-created content
- Structural changes to .claude/ organization
- A/B test decisions (remove/keep)

**Question format**:
```
Analysis suggests [tool] may not be useful:
- Used [N] times in [period]
- Last used [date]
- Alternative: [manual approach]

Options:
a) Keep as-is
b) Modify to be more useful
c) A/B test (temporary disable)
d) Remove

What would you like to do?
```

## Quality Control Mechanisms

### Prevent Bad Patterns from Being Codified

**Validation checks before committing improvements**:

1. **Confidence threshold**: Only capture patterns observed 3+ times
2. **Contradiction detection**: Check if new addition conflicts with CLAUDE.md
3. **Scope check**: Is this project-specific or personal preference?
4. **Temporal check**: Is this a one-time situation or recurring pattern?
5. **User validation**: For uncertain patterns, always ask first

**Red flags** (require user confirmation):
- Pattern observed in only one session
- Contradicts existing documentation
- Involves security-sensitive operations
- Changes fundamental project assumptions
- Based on error/failure scenarios (might be bugs, not patterns)

### Learning Correction

**If bad pattern is captured**:
- Easy rollback via git
- User can explicitly override
- Monthly review catches accumulated cruft
- A/B testing validates actual utility

**Correction commands**:
- `/claude-rollback <commit>` - Revert specific improvement
- `/claude-review` - Audit all recent improvements
- `/claude-reset` - Return to clean slate (keep only manual additions)

## Signal vs. Noise: What to Capture

### High Signal (Capture These)

✅ **Repeated operations** (3+ times in similar context)
✅ **Discovered conventions** (found in codebase, not invented)
✅ **Pain points** that have clear solutions
✅ **Successful patterns** that worked well
✅ **Gotchas** that caused actual problems
✅ **Architecture decisions** discovered in code/docs

### Low Signal (Ignore These)

❌ **One-off operations** (even if complex)
❌ **Personal preferences** not grounded in project
❌ **Temporary workarounds** for bugs
❌ **Exploratory work** that won't repeat
❌ **Failed approaches** (unless documenting what NOT to do)
❌ **Assumptions** without evidence

### Examples

**Capture this**:
- "Noticed database queries always use `.lean()` in this project - discovered convention in schema design docs"
- "Third time debugging CORS issues - always same fix. Create command."
- "Always run format → lint → test before commit. Create hook."

**Don't capture this**:
- "Used complex regex once to fix data - unlikely to repeat"
- "Temporarily disabled TypeScript strict mode to meet deadline"
- "This API endpoint seems slow" (observation without action)

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Create Specialist Agent (`.claude/agents/specialist_agent.md`)
- [ ] Create Improvement Command (`.claude/commands/improve-claude.md`)
- [ ] Set up usage tracking infrastructure (`.claude/usage-stats.json`)
- [ ] Document current project patterns in CLAUDE.md
- [ ] Create initial .claudeignore based on repository analysis

### Phase 2: Basic Automation (Week 2)
- [ ] Implement background pattern detection (built-in awareness)
- [ ] Add threshold-based suggestions (3+ occurrences)
- [ ] Create decision framework integration
- [ ] Test auto-commit for low-risk changes
- [ ] Validate propose-first for medium-risk changes

### Phase 3: Feedback Loop (Week 3)
- [ ] Implement lightweight feedback prompts
- [ ] Add usage counter tracking
- [ ] Create weekly review summary
- [ ] Test feedback collection workflow

### Phase 4: A/B Testing & Optimization (Week 4)
- [ ] Implement A/B testing framework
- [ ] Create pruning candidate identification
- [ ] Add monthly review cycle
- [ ] Test tool removal/modification workflow
- [ ] Validate full learning-to-removal lifecycle

### Phase 5: Refinement (Ongoing)
- [ ] Tune thresholds based on actual usage
- [ ] Improve specialist agent analysis
- [ ] Optimize signal vs. noise detection
- [ ] Refine auto-commit vs. propose criteria
- [ ] Enhance feedback mechanisms

## Open Questions

1. **Interruption tolerance**: How often can Claude propose improvements without being annoying?
2. **Confidence calibration**: What threshold of certainty requires user validation?
3. **Cross-session learning**: How to synthesize patterns across multiple sessions?
4. **Tool lifecycle**: What's the expected lifespan of a command/agent? When to retire?
5. **Scope creep**: How to prevent CLAUDE.md from becoming unwieldy?
6. **Conflict resolution**: What happens when learned patterns contradict each other?
7. **Privacy**: What usage data is tracked? Should it be gitignored?
8. **Portability**: Should learnings be shareable across team members?

## Success Metrics

**Quantitative**:
- Reduction in repeated operations (before/after command creation)
- Time saved by automation (hooks, commands)
- Context window efficiency (files excluded via .claudeignore)
- Tool usage rates (high usage = valuable)
- Feedback scores (user satisfaction)

**Qualitative**:
- User feels Claude "knows" the project better over time
- Fewer explanations needed for project-specific patterns
- Natural accumulation of useful tools
- Low maintenance burden (doesn't require manual curation)
- High signal-to-noise ratio (captured patterns are actually useful)

## Next Steps

1. **Validate design** with user - ensure alignment with vision
2. **Prioritize techniques** - which to implement first?
3. **Create initial tooling** - specialist agent and improvement command
4. **Define thresholds** - specific numbers for auto-commit vs. propose
5. **Build MVP** - minimal viable version to test concept
6. **Iterate based on real usage** - let the system improve itself

---

*This is a living document. As the Claude Code Specialist system is implemented and used, learnings will be incorporated back into this design.*
