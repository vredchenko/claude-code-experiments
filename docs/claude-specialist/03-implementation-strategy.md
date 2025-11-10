# Implementation Strategy

This document outlines the four-pronged approach for implementing the Claude
Code Specialist system.

## Overview

The system uses four complementary mechanisms working together:

1. **Specialist Agent** - Deep periodic analysis
2. **Improvement Command** - Explicit capture trigger
3. **Background Pattern Detection** - Passive observation
4. **Post-Session Hook** - Optional reflection prompts

Each serves a distinct purpose and operates at different levels of proactivity.

## 1. Specialist Agent

### Purpose

Deep analysis of project history and patterns to propose comprehensive
improvements.

### File Location

`.claude/agents/specialist_agent.md`

### When Invoked

- Weekly/monthly reviews (explicit `/reflect` command)
- After major feature completions
- When explicitly requested by user

### Responsibilities

**Analyze git history for patterns**:

- Frequent command sequences in commit messages
- Files modified together often
- Commit message patterns and conventions

**Review conversation logs** (if available):

- Repeated operations across sessions
- Common questions asked multiple times
- Pain points mentioned by user

**Identify gaps in current tooling**:

- Operations that should be commands but aren't
- Knowledge that should be in CLAUDE.md
- Enforcement needs without hooks

**Propose comprehensive updates**:

- Specific additions to CLAUDE.md
- New commands to create
- New agents for specialized domains
- Hooks to add for automation
- .claudeignore patterns

**Perform cost/benefit analysis**:

- Estimated time savings
- Maintenance burden
- Risk of false positives

### Example Invocation

```text
User: /reflect

Claude (as Specialist Agent):

Analyzing project activity from the last 30 days...

## Findings

### High-Value Patterns (Recommend capturing)

1. **Database Reset Workflow** (repeated 7 times)
   - Sequence: docker-compose down db → up -d → migrate → seed
   - Recommendation: Create /db-reset command
   - Time savings: ~2 min per use, ~14 min/month

2. **API Endpoint Testing** (repeated 5 times)
   - Pattern: Start server → curl test → check DB → stop server
   - Recommendation: Create /test-api command
   - Time savings: ~3 min per use, ~15 min/month

3. **Pre-commit Checks** (inconsistently applied)
   - Should run: lint → test → type-check
   - Recommendation: Add pre-bash hook for git commit
   - Benefit: Prevent broken commits

### Knowledge Gaps (Recommend documenting)

1. **React Query Convention**
   - Found in 12 files: Always use React Query, never fetch
   - Recommendation: Add to CLAUDE.md
   - Benefit: Consistent API patterns

2. **Migration Reversibility**
   - Found in CONTRIBUTING.md, but not enforced
   - Recommendation: Add to CLAUDE.md + validation hook
   - Benefit: Safe database changes

### Context Optimization

1. **Coverage Reports** (loaded 8 times, never useful)
   - Recommendation: Add coverage/ to .claudeignore
   - Benefit: Faster searches, cleaner context

Proceed with these improvements? (all/selective/none)
```

### Agent Prompt Structure

```text
You are the Claude Code Specialist Agent, responsible for analyzing project
patterns and proposing improvements to Claude's project-specific tooling.

## Your Task

Analyze the project and identify opportunities to improve Claude's effectiveness
through:

1. New commands for repeated workflows
2. CLAUDE.md updates for discovered conventions
3. New agents for specialized domains
4. Hooks for quality enforcement
5. .claudeignore patterns for context optimization

## Analysis Sources

- Git commit history (last 30-60 days)
- File modification patterns
- Current CLAUDE.md content
- Existing commands, agents, hooks
- .claudeignore patterns
- Usage statistics (if available)

## Decision Criteria

Only propose improvements that:

- Save significant time (>30 sec per use)
- Prevent common mistakes
- Capture universal truths (not opinions)
- Have been observed 3+ times
- Provide clear value

## Output Format

For each recommendation:

1. Pattern observed (with frequency)
2. Proposed improvement (specific)
3. Expected benefit (quantified if possible)
4. Implementation approach
5. Risk/maintenance considerations

Prioritize recommendations by impact.
```

## 2. Improvement Command

### Purpose

Explicit trigger for capturing learnings from recent work.

### File Location

`.claude/commands/improve-claude.md`

### When Invoked

- End of feature development
- After resolving complex issues
- When user wants to "remember this"
- User types `/improve-claude`

### Responsibilities

**Review recent work**:

- Git log (last N commits)
- Files changed recently
- Commands run in this session

**Identify patterns worth capturing**:

- Repeated operations
- Emerging conventions
- New knowledge discovered

**Propose specific additions/modifications**:

- Draft CLAUDE.md updates
- Suggest command names and workflows
- Identify automation opportunities

**Create commits with improvements**:

- Clear commit messages
- Explain what was learned
- Document the rationale

### Example Invocation

````text
User: /improve-claude

Claude:
Reviewing recent work...

## Recent Activity
- Implemented authentication system (3 commits, 8 files)
- Fixed CORS issues twice
- Set up JWT token validation
- Added rate limiting middleware

## Learnings to Capture

### 1. JWT Token Convention
Found: JWT tokens use RS256, not HS256 (auth/jwt.ts:15)
Recommendation: Add to CLAUDE.md

```markdown
# Authentication
- JWT tokens use RS256 (asymmetric) for better security
- Private key in AUTH_PRIVATE_KEY env var
- Public key in AUTH_PUBLIC_KEY env var
```

Proceed? (yes/no/modify)

### 2. CORS Debugging Command

Observed: Debugged CORS twice with same sequence:

1. Check preflight: curl -X OPTIONS -H "Origin: ..."
2. Check headers: curl -v ... | grep -i cors
3. Restart API server

Recommendation: Create /debug-cors command

Proceed? (yes/no/modify)

### 3. Rate Limiting Pattern

Found: All API routes use express-rate-limit with:

- windowMs: 15 _60_ 1000 (15 min)
- max: 100 requests
- standardHeaders: true

Recommendation: Add to CLAUDE.md

Proceed? (yes/no/modify)
````

### Command Prompt Structure

```text
Review recent work and identify learnings to capture in Claude Code
customizations.

## Steps

1. Check git log for recent commits (last 5-10)
2. Review files changed in this session
3. Identify patterns:
   - Operations repeated 2+ times
   - Conventions discovered in code
   - Pain points encountered
   - Solutions that worked well

4. For each learning, propose:
   - CLAUDE.md addition (if universal truth)
   - Command creation (if repeated workflow)
   - Agent creation (if specialized knowledge)
   - Hook addition (if automation needed)
   - .claudeignore update (if context pollution)

5. Draft specific changes and ask for approval

## Output

Present findings one at a time:
- What was observed
- What to capture
- Where to capture it
- Specific content to add
- Ask for confirmation before committing
```

## 3. Background Pattern Detection

### Purpose

Passive observation without interrupting work.

### Mechanism

Built-in awareness during normal Claude operation (not a separate file/tool).

### Behavior

**Track patterns silently**:

- Count repeated operations
  - Bash command sequences
  - File search patterns
  - Repeated reads of same files
  - Similar edit operations
- Notice emerging conventions
  - Naming patterns
  - File organization
  - Code style choices
- Identify pain points
  - Operations that fail frequently
  - Slow processes
  - Context pollution

**Do NOT auto-act**:

- Store observations internally
- Track occurrence counts
- Note temporal patterns (across sessions if possible)

**Occasionally propose**:

- After hitting threshold (3+ occurrences)
- At natural breakpoints (task completion)
- Non-intrusive suggestions

### Trigger Thresholds

| Pattern                 | Threshold | Suggestion                       |
| ----------------------- | --------- | -------------------------------- |
| Identical bash sequence | 3 times   | "Create command?"                |
| Similar file operations | 5 times   | "Create hook?"                   |
| Same search repeated    | 3 times   | "Add to CLAUDE.md?"              |
| Files repeatedly loaded | 5 times   | "Add to .claudeignore?"          |
| Same question asked     | 2 times   | "Create agent or documentation?" |

### Example Interaction

```text
User: Run the tests for the authentication module

Claude: [runs tests]

# Internal: Increment counter for "bun test auth"
# Counter: 3 occurrences

Claude: "I've noticed you run 'bun test auth' frequently (3 times today).
Would you like me to create a /test-auth command for quick access?"

User: Yes

Claude: [Creates command, commits]
```

### Non-Intrusive Suggestions

**Good timing**:

- After completing a task
- During natural pauses
- When pattern just crossed threshold

**Bad timing**:

- Middle of debugging
- During error investigation
- When user is clearly focused

**Phrasing**:

- ✅ "I noticed [pattern]. Would you like me to [action]?"
- ✅ "This is the third time [operation]. Create a shortcut?"
- ❌ "PATTERN DETECTED - RECOMMENDATION FOLLOWS" (too robotic)
- ❌ Interrupting with suggestions mid-task

## 4. Post-Session Hook (Optional)

### Purpose

Prompt for lightweight reflection after work sessions.

### File Location

`.claude/config.json` (post-session hook, if supported)

### When Triggered

- End of significant work sessions
- After completing major tasks
- Natural stopping points

### Behavior

**Quick summary**:

- What was accomplished
- Patterns observed
- Potential learnings

**Low friction question**:

- "Anything worth capturing?"
- Easy to skip/dismiss
- Optional engagement

**Avoid**:

- Lengthy questionnaires
- Forced documentation
- Interrupting flow

### Example Interaction

```text
[User completes feature work]

Claude: "Session summary:
- Implemented payment processing
- Fixed 3 Stripe webhook issues
- Added transaction logging

I noticed you checked Stripe webhook signatures in all 3 fixes.
Worth capturing this pattern? (yes/skip)"

User: yes

Claude: "What should I capture?
a) Add to CLAUDE.md (all webhooks need signature verification)
b) Create agent for Stripe integration knowledge
c) Both"

User: a

Claude: [Updates CLAUDE.md, commits]
```

### Hook Configuration (Conceptual)

```json
{
  "hooks": {
    "post-session": {
      "enabled": true,
      "trigger": "session_end",
      "prompt": "Quick reflection - any learnings to capture?"
    }
  }
}
```

**Note**: Post-session hooks may not be currently supported. This is a design
concept for future implementation.

## Integration: How They Work Together

### Scenario 1: Repeated Workflow

1. **Background Detection** (silent): Counts "bun test auth" - 3 times
2. **Background Detection** (suggests): "Create /test-auth command?"
3. **User**: "Yes"
4. **Improvement Command** (auto): Creates command, commits
5. **Specialist Agent** (later): Validates command is being used, kept in
   monthly review

### Scenario 2: Discovered Convention

1. **User**: Asks about API patterns while coding
2. **Claude**: Discovers React Query convention in docs
3. **Background Detection** (notes): Universal pattern detected
4. **Improvement Command** (proposes): "Add to CLAUDE.md?"
5. **User**: "/improve-claude" (or auto-proposed)
6. **Claude**: Adds to CLAUDE.md, commits
7. **Specialist Agent** (later): Confirms pattern is actually universal

### Scenario 3: Specialized Knowledge Need

1. **User**: Repeatedly asks about database optimization
2. **Background Detection** (tracks): DB optimization questions - 5 occurrences
3. **Claude**: "I notice DB optimization comes up often. Create specialized
   agent?"
4. **User**: "Yes"
5. **Specialist Agent** (invoked): Creates comprehensive DB optimization agent
6. **Usage Tracking** (ongoing): Monitors agent invocations
7. **Monthly Review**: Validates agent is useful, not just created

### Scenario 4: Context Pollution

1. **Background Detection** (observes): coverage/ loaded in searches repeatedly
2. **Background Detection** (notes): Never useful, always noise
3. **After 5 occurrences**: "Add coverage/ to .claudeignore?"
4. **User**: "Yes" or auto-commit (low risk)
5. **Specialist Agent** (later): Confirms improved search performance

## Proactivity Levels

Different mechanisms have different proactivity:

| Mechanism            | Proactivity    | User Control  |
| -------------------- | -------------- | ------------- |
| Specialist Agent     | User-initiated | Full control  |
| Improvement Command  | User-initiated | Full control  |
| Background Detection | Suggests       | Accept/reject |
| Post-Session Hook    | Prompts        | Can skip      |

**Balance**:

- More automation for low-risk (e.g., .claudeignore)
- More user control for high-risk (e.g., CLAUDE.md changes)
- Never silently change core instructions

## Success Criteria

The system is working well when:

✅ User rarely explains same pattern twice ✅ Common operations become
one-command shortcuts ✅ Claude proactively offers useful suggestions ✅
Suggestions are relevant, not annoying ✅ Easy to accept or decline proposals ✅
Low maintenance burden ✅ Knowledge compounds visibly over time ✅ Tools created
are actually used

## Failure Modes to Avoid

❌ Too many suggestions (interruption fatigue) ❌ Capturing noise (one-off
operations) ❌ Codifying bad patterns (temporary workarounds) ❌ Creating tools
that aren't used ❌ Making CLAUDE.md unwieldy ❌ Hooks that fail frequently ❌
Suggestions at bad times (mid-debugging)

## Next Steps

1. Implement Specialist Agent first (user-initiated, safest)
2. Add Improvement Command (user-initiated, controlled)
3. Build Background Detection (requires careful tuning)
4. Consider Post-Session Hook (optional, least critical)

Each phase should validate approach before moving to next level of automation.
