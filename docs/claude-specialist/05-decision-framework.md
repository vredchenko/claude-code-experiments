# Decision Framework: When to Auto-Commit vs. Propose vs. Ask

This document defines clear criteria for different levels of automation in Claude Code improvements.

## Three Levels of Autonomy

| Level | When to Use | Risk | Examples |
|-------|-------------|------|----------|
| **Auto-Commit** | Low-risk, factual, reversible | Low | .claudeignore, usage stats |
| **Propose First** | Medium-risk, interpretive | Medium | CLAUDE.md updates, new commands |
| **Always Ask** | High-risk, structural, destructive | High | Removing tools, changing core instructions |

## Auto-Commit (Low Risk)

### Criteria

Changes that are:
- ✅ **Factual** (not interpretive or opinion-based)
- ✅ **Reversible** (easy to undo via git)
- ✅ **Low impact** (won't break workflows)
- ✅ **Obvious value** (clearly beneficial)
- ✅ **Non-controversial** (no reasonable objection)

### Examples

**Add to .claudeignore**:
```
Observation: node_modules/ appears in 15 search results, never useful
Action: Add node_modules/ to .claudeignore
Auto-commit: YES
Rationale: Standard practice, obviously irrelevant, easy to revert
```

**Create command for clear pattern**:
```
Observation: User ran "bun test && bun run lint && bun run type-check" 5 times
Action: Create /pre-commit command
Auto-commit: YES (if pattern is unambiguous)
Rationale: Clear repeated workflow, low risk, easy to remove
```

**Update usage statistics**:
```
Observation: Command invoked
Action: Increment usage counter in usage-stats.json
Auto-commit: YES
Rationale: Automated tracking, no user impact, expected behavior
```

**Document discovered facts**:
```
Observation: Found explicit comment in code: "Always use React Query"
Action: Add to CLAUDE.md
Auto-commit: MAYBE (see below for documentation changes)
Rationale: Explicitly documented fact, not interpretation
```

### Auto-Commit Examples

#### .claudeignore additions

```bash
# Auto-commit
git add .claudeignore
git commit -m "chore(claude): Add coverage/ to .claudeignore

Observed: coverage/ directory loaded in context 8 times, never useful
Impact: Reduce context noise, faster searches
Risk: Low (easy to revert, standard practice)"
```

#### Simple command creation

```bash
# Auto-commit after 4+ identical operations
git add .claude/commands/test-auth.md
git commit -m "feat(claude): Add /test-auth command

Observed: 'bun test auth' sequence repeated 4 times
Saves: ~30 seconds per use
Risk: Low (simple command, easy to remove if not useful)"
```

### When NOT to Auto-Commit

Even low-risk changes should be proposed first if:
- ❌ First occurrence (wait for pattern confirmation)
- ❌ Could be temporary situation
- ❌ Might conflict with existing setup
- ❌ Interpretation required (not purely factual)
- ❌ User has expressed preference for control

## Propose First (Medium Risk)

### Criteria

Changes that:
- ⚠️ **Require interpretation** (pattern recognition)
- ⚠️ **Modify core behavior** (CLAUDE.md, hooks)
- ⚠️ **Create new tools** (agents, complex commands)
- ⚠️ **Could be wrong** (inference, not fact)
- ⚠️ **Have alternatives** (multiple valid approaches)

### Examples

**Update CLAUDE.md with observed pattern**:
```
Observation: Found .lean() used in 12 database query files
Action: Add to CLAUDE.md: "Use .lean() for read-only queries"
Propose first: YES
Rationale: Interpretation of pattern, could be wrong, affects core guidance
```

**Create new agent**:
```
Observation: 5 database optimization questions in 2 weeks
Action: Create database_optimization_agent.md
Propose first: YES
Rationale: Significant new tool, need to validate scope and content
```

**Add hook for automation**:
```
Observation: Code formatting inconsistencies in commits
Action: Add post-edit hook to run prettier
Propose first: YES
Rationale: Auto-executing change, could be disruptive, user should approve
```

**Modify existing command**:
```
Observation: /test-all command could be faster by running changed files first
Action: Update /test-all to be smarter
Propose first: YES
Rationale: Changing existing behavior, user might prefer current version
```

### Proposal Format

**Template**:
```
I've noticed [pattern/observation].

I propose [specific change]:
[Exact content to add/modify]

Benefits:
- [Benefit 1]
- [Benefit 2]

Potential risks:
- [Risk 1, if any]
- [Risk 2, if any]

Alternative approaches:
- [Alternative 1, if applicable]

Proceed? (yes/no/modify)
```

**Example proposal**:

```markdown
I've noticed React Query is used in all API calls (found in 12 components),
and the README.md explicitly states "use React Query for all data fetching."

I propose adding this to CLAUDE.md:

```
## API Patterns
- All data fetching uses React Query (never native fetch directly)
- Query keys follow pattern: ['resource', id, ...filters]
- Mutations use optimistic updates for better UX
```

Benefits:
- Consistent API patterns across sessions
- Prevents accidental use of fetch()
- Captures documented project convention

Potential risks:
- Pattern might be evolving (though README suggests it's stable)
- Could be exceptions I haven't seen

Alternative approaches:
- Create an agent for React Query expertise (more heavyweight)
- Create a hook to check for fetch() usage (more enforcement)

Proceed? (yes/no/modify)
```

### User Response Options

**Yes**: Proceed with proposal as-is
**No**: Don't make this change
**Modify**: Suggest different approach or content
**Later**: Defer decision (don't ask again this session)

### Handling Responses

```typescript
// Pseudocode
function handleProposalResponse(response: string, proposal: Proposal) {
  switch (response.toLowerCase()) {
    case 'yes':
      applyChange(proposal);
      commitChange(proposal);
      recordDecision(proposal, 'accepted');
      break;

    case 'no':
      recordDecision(proposal, 'rejected');
      // Don't ask about this pattern again
      break;

    case 'modify':
      askForModifications(proposal);
      // User provides feedback, iterate
      break;

    case 'later':
      recordDecision(proposal, 'deferred');
      // Can ask again in future session
      break;
  }
}
```

## Always Ask (High Risk)

### Criteria

Changes that:
- 🚨 **Destructive** (delete tools, remove content)
- 🚨 **Structural** (reorganize, refactor)
- 🚨 **High impact** (change fundamental behavior)
- 🚨 **Controversial** (valid reasons to disagree)
- 🚨 **Uncertain** (low confidence in correctness)

### Examples

**Remove existing tool**:
```
Observation: /debug-cors command used 0 times in 30 days
Action: Remove the command
Always ask: YES
Rationale: Destructive, might be needed later, user should decide
```

**Change core instruction**:
```
Observation: CLAUDE.md says "use fetch()" but seeing React Query everywhere
Action: Change CLAUDE.md to contradict itself
Always ask: YES
Rationale: High risk, might be wrong, need user clarification
```

**Restructure .claude/ organization**:
```
Observation: Many agents, could organize into subdirectories
Action: Reorganize .claude/agents/ into categories
Always ask: YES
Rationale: Structural change, user might have preferences
```

**Disable or modify hook**:
```
Observation: pre-commit hook fails 30% of time
Action: Disable or make less strict
Always ask: YES
Rationale: User explicitly set up hook, should decide changes
```

### Question Format

**Template**:
```
Analysis suggests [observation].

Current situation:
- [Details about current state]
- [Metrics or evidence]

I'm uncertain how to proceed. Options:
a) [Option 1]
b) [Option 2]
c) [Option 3]
d) Other (please specify)

What would you like to do?
```

**Example question**:

```markdown
Analysis suggests the /debug-cors command may not be useful:

Current situation:
- Created: 2025-10-01 (5 weeks ago)
- Total invocations: 1 (at creation)
- Last used: 2025-10-01
- Feedback: No ratings collected

A/B test results:
- Test duration: 30 days
- Command requested: 0 times during disable

Options:
a) Keep as-is (low usage doesn't mean not valuable)
b) A/B test for another 30 days (maybe timing was bad)
c) Remove command (hasn't proven useful, reduce maintenance)
d) Modify command to be more useful (refactor approach)
e) Other (please specify)

What would you like to do?
```

### User-Initiated Changes

**If user explicitly requests removal/change**:
- Always confirm understanding
- Show what will be removed/changed
- Ask for final confirmation
- Execute with clear commit message

```
User: Remove the debug-cors command, I don't need it

Claude: "I'll remove the /debug-cors command.

This will delete:
- .claude/commands/debug-cors.md
- Usage stats for this command

The command can be recreated later if needed.

Confirm removal? (yes/no)"

User: yes

Claude: [Removes file, commits]

Commit message:
"feat(claude): Remove /debug-cors command per user request

User confirmed command is no longer needed. Can be recreated from
git history if needed in future."
```

## Decision Flowchart

```
New improvement identified
        ↓
   Is it destructive/structural?
        ↓ Yes → ALWAYS ASK
        ↓ No

   Does it require interpretation?
        ↓ Yes → PROPOSE FIRST
        ↓ No

   Is it factual and obvious?
        ↓ Yes → Consider AUTO-COMMIT
        ↓ No → PROPOSE FIRST

   Has pattern been observed 3+ times?
        ↓ Yes → AUTO-COMMIT (if still qualifies)
        ↓ No → PROPOSE FIRST (wait for confirmation)
```

## Special Cases

### CLAUDE.md Changes

**Documented facts** (found in code comments, README, docs):
- Propose first with source citation
- Example: "Found in README.md:15 - 'Use React Query for all API calls'"

**Observed patterns** (inferred from code):
- Always propose first
- Requires 3+ observations
- Show evidence
- Example: "Observed .lean() in 12 files, consistently used for read-only queries"

**Removal of outdated info**:
- Always ask
- Show what's being removed and why
- User should confirm

### Commands

**Simple commands** (3+ identical operations):
- Auto-commit if unambiguous
- Commit message includes occurrence count

**Complex commands** (multi-step with logic):
- Propose first
- Show exact workflow
- Get approval

**Command modifications**:
- Always propose first
- Existing behavior might be relied upon

### Agents

**New agents**:
- Propose first (significant addition)
- Show scope and purpose
- Demonstrate need (invocation frequency)

**Agent modifications**:
- Propose first
- Show what's changing and why

**Agent removal**:
- Always ask
- Show usage stats
- Offer A/B test alternative

### Hooks

**New hooks**:
- Always propose first
- Could be disruptive
- User should opt-in to automation

**Hook modifications**:
- Propose first
- Changing auto-executing behavior

**Hook removal/disabling**:
- Always ask
- User set up intentionally
- Might have important reason

## Commit Message Format

All automated or proposed changes should have clear commit messages:

**Template**:
```
<type>(claude): <description>

<body explaining what was learned and why change was made>

Observation: <what pattern was observed>
Action: <what was changed>
Benefit: <expected improvement>
Risk: <any risks or caveats>
```

**Examples**:

**Auto-commit**:
```
chore(claude): Add dist/ to .claudeignore

Observation: dist/ directory loaded in searches 12 times, never useful
Action: Added dist/ to .claudeignore
Benefit: Reduced context noise, faster searches
Risk: Low (standard practice, easy to revert)
```

**After proposal accepted**:
```
feat(claude): Add React Query convention to CLAUDE.md

Observation: React Query used in all 12 API call sites, explicitly
documented in README.md:15 as project standard
Action: Added API patterns section to CLAUDE.md documenting this convention
Benefit: Consistent API implementation across sessions
Risk: Low (documented standard, not interpretation)
Approved-by: User (proposal accepted 2025-11-07)
```

**After user request**:
```
feat(claude): Create /test-auth command per user request

User requested command for frequently-run test sequence.
Action: Created command wrapping 'bun test auth --coverage'
Benefit: Quick access to auth module testing
```

## Confidence Calibration

### High Confidence → Consider Auto-Commit

- Pattern observed 5+ times
- Documented in project files
- Standard practice (e.g., .gitignore patterns)
- Unambiguous evidence
- Low risk, easy to revert

### Medium Confidence → Propose First

- Pattern observed 2-4 times
- Inferred from code, not documented
- Could have alternative interpretations
- Medium impact
- Requires user validation

### Low Confidence → Always Ask

- Pattern observed 1 time
- Multiple possible interpretations
- High impact or risk
- Uncertain correctness
- Structural or destructive

## Override Mechanisms

### User Preferences

Allow user to set preferences:

```json
{
  "improvements": {
    "auto_commit_level": "conservative",  // "aggressive" | "conservative" | "ask_always"
    "auto_ignore": true,  // Auto-commit .claudeignore changes
    "auto_commands": false,  // Propose commands instead of auto-creating
    "proposal_format": "concise"  // "concise" | "detailed"
  }
}
```

### Per-Session Control

User can temporarily change behavior:

```
User: "Be more aggressive with improvements this session"
Claude: [Increases auto-commit threshold]

User: "Ask me before making any changes"
Claude: [Switches to always-ask mode]
```

## Summary

The framework balances automation with control:

- **Auto-commit**: Fast iteration for obvious, low-risk improvements
- **Propose first**: User validation for interpretive or medium-risk changes
- **Always ask**: User decision for high-risk or uncertain changes

**Default bias**: When uncertain, propose first (safer).

**User override**: Preferences can adjust automation level.

**Learning**: System learns from user responses to calibrate future decisions.
