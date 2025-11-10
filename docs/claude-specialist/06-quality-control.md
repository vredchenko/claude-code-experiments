# Quality Control: Preventing Bad Patterns

This document describes mechanisms to prevent incorrect or low-quality patterns
from being codified in Claude Code customizations.

## Core Principle

**Better to miss a good pattern than to capture a bad one.**

Bad patterns can:

- Mislead Claude in future sessions
- Waste time with ineffective tools
- Create maintenance burden
- Spread misinformation across team

## Validation Checks

### 1. Repetition Threshold

**Principle**: Don't capture patterns based on single observations.

**Thresholds**:

- **Commands**: 3+ identical operations
- **CLAUDE.md conventions**: 3+ occurrences OR 1 explicit documentation
- **Agents**: 3+ instances of specialized need
- **.claudeignore**: 3+ context pollution occurrences
- **Hooks**: Clear requirement + user approval

**Why**:

- One-off operations are common during exploration
- Temporary workarounds look like patterns
- Edge cases shouldn't drive design

**Example** of what NOT to capture:

```text
Session 1: User runs complex regex to fix malformed data
Observation: Complex data transformation

❌ DON'T: Create command or add to CLAUDE.md
✅ DO: Note the occurrence, wait for pattern

Session 2: Same issue doesn't recur

Result: Correctly avoided capturing noise
```

### 2. Contradiction Detection

**Principle**: New learnings shouldn't contradict existing knowledge.

**Check before adding**:

- Does this conflict with CLAUDE.md?
- Does this contradict existing commands/agents?
- Does this oppose documented project practices?

**If contradiction found**:

1. **Flag for user review**: "This contradicts existing guidance - clarification
   needed"
2. **Present both**: Show existing vs. new information
3. **Ask for resolution**: Which is correct? Both valid? Context-dependent?

**Example**:

```text
Existing CLAUDE.md:
"All API calls use React Query"

New observation:
Found fetch() being used in api/legacy.ts

Analysis:
- Possible contradiction
- Could be legacy code exception
- Could be CLAUDE.md outdated
- Need user clarification

Action: ALWAYS ASK
"I found fetch() in api/legacy.ts, but CLAUDE.md says to use React Query.
Is this:
a) Legacy exception (document as exception)
b) CLAUDE.md outdated (update guidance)
c) Code that should be refactored (don't capture)"
```

### 3. Source Verification

**Principle**: Documented facts are more trustworthy than inferred patterns.

**Source hierarchy** (highest to lowest confidence):

1. **Explicit documentation** (README.md, CONTRIBUTING.md, architecture docs)
   - High confidence
   - Can cite source
   - Example: "Found in README.md:15"

2. **Code comments** (especially TODO, NOTE, IMPORTANT)
   - Medium-high confidence
   - Intent explicit
   - Example: "// IMPORTANT: Always call cleanup() after"

3. **Consistent code patterns** (3+ occurrences)
   - Medium confidence
   - Inferred, not explicit
   - Could be coincidence

4. **Configuration files** (package.json, tsconfig.json, .eslintrc)
   - High confidence for settings
   - Explicit choices
   - Example: `"strict": true` in tsconfig

5. **Single observations**
   - Low confidence
   - Wait for confirmation
   - Don't capture yet

**Verification process**:

```typescript
function verifyPattern(pattern: Pattern): VerificationResult {
  // Check for explicit documentation
  const docSources = searchDocs(pattern);
  if (docSources.length > 0) {
    return { confidence: "high", sources: docSources };
  }

  // Check for code comments
  const commentSources = searchComments(pattern);
  if (commentSources.length > 0) {
    return { confidence: "medium-high", sources: commentSources };
  }

  // Check for consistent code patterns
  const occurrences = countOccurrences(pattern);
  if (occurrences >= 3) {
    return { confidence: "medium", occurrences };
  }

  // Single observation
  return { confidence: "low", occurrences: 1 };
}
```

### 4. Temporal Validation

**Principle**: Distinguish permanent patterns from temporary situations.

**Red flags** for temporal patterns:

- All occurrences in same session
- Related to debugging specific issue
- Tied to temporary workaround
- Part of exploratory work

**Green flags** for permanent patterns:

- Occurrences across multiple sessions
- Stable over time (weeks, not hours)
- Not tied to specific bug/issue
- Consistent with project architecture

**Example of temporal (DON'T capture)**:

```text
Session on 2025-11-07:
- Bug: API endpoint returns 500
- Workaround: Add console.log statements everywhere
- Pattern observed: Heavy logging in API code

❌ DON'T: Add to CLAUDE.md "Use extensive logging in API"
✅ DO: Recognize as debugging session, temporary pattern
```

**Example of permanent (DO capture)**:

```text
Session on 2025-11-01:
- Observe: .lean() used in 4 query files

Session on 2025-11-05:
- Observe: .lean() used in 3 more query files

Session on 2025-11-07:
- Observe: .lean() used in 2 more query files

✅ DO: Add to CLAUDE.md "Use .lean() for read-only database queries"
✅ Rationale: Consistent across multiple sessions, stable pattern
```

### 5. Scope Validation

**Principle**: Distinguish project-specific patterns from personal preferences.

**Is this pattern**:

- ✅ **Project-specific**: Found in project docs, consistent in codebase,
  architectural decision
- ❌ **Personal preference**: User's coding style, not documented, not
  consistently applied

**Questions to ask**:

- Is this documented anywhere in the project?
- Would another team member follow this pattern?
- Is this an architectural decision or personal choice?
- Does this apply universally in this project?

**Example of personal preference (DON'T capture)**:

```text
Observation: User prefers importing React as `import * as React`

Analysis:
- Not documented in style guide
- Other files use `import React from 'react'`
- Personal preference, not project standard

❌ DON'T: Add to CLAUDE.md
✅ DO: Respect in current session, but don't codify
```

**Example of project standard (DO capture)**:

```text
Observation: All test files use `describe` and `it` from vitest

Analysis:
- Consistent across all 45 test files
- Testing framework choice documented in package.json
- Project-wide standard

✅ DO: Add to CLAUDE.md "Testing with vitest: use describe/it/expect"
```

## Red Flags

Patterns that should NOT be captured without user confirmation:

### 1. Error-Related Patterns

```text
❌ Pattern based on workaround for bug
❌ Commands created during error investigation
❌ Conventions inferred from broken code

Example:
User repeatedly restarts server due to bug
→ DON'T create /restart-server command
→ Bug should be fixed, not automated
```

### 2. Contradictory Patterns

```text
❌ New pattern contradicts existing CLAUDE.md
❌ New pattern conflicts with documented standard
❌ Unclear which pattern is correct

Example:
CLAUDE.md says "use TypeScript strict mode"
But found `"strict": false` in tsconfig.json
→ ALWAYS ASK for clarification
```

### 3. Over-Specific Patterns

```text
❌ Tied to specific bug/ticket/situation
❌ Only relevant for current work
❌ Won't generalize

Example:
Working on ticket-1234: special data migration
Pattern: Complex data transformation scripts
→ DON'T create general command (too specific)
```

### 4. Premature Optimization

```text
❌ Creating tools before need is proven
❌ Complex automation for rare operation
❌ Over-engineering simple tasks

Example:
User runs `git log --graph` once
→ DON'T immediately create /git-graph command
→ Wait for pattern (3+ uses)
```

### 5. Unstable Patterns

```text
❌ Pattern still evolving
❌ Approach changes frequently
❌ Experimentation phase

Example:
User tries 3 different testing approaches in same session
→ DON'T capture any yet
→ Wait for settled approach
```

## Validation Checklist

Before capturing any pattern, verify:

- [ ] **Repetition**: Observed 3+ times (or documented explicitly)
- [ ] **Non-contradictory**: Doesn't conflict with existing guidance
- [ ] **Verified source**: Can cite documentation or consistent code
- [ ] **Temporal stability**: Not tied to temporary situation
- [ ] **Project scope**: Project-wide, not personal preference
- [ ] **Not error-related**: Based on correct code, not workarounds
- [ ] **Generalizable**: Will apply in future, not over-specific
- [ ] **Proven need**: Actual benefit demonstrated

**If any item fails**: Either don't capture, or propose to user for validation.

## Correction Mechanisms

### 1. Git Rollback

**All improvements are version controlled** - easy to revert.

```bash
# Rollback specific improvement
git log --oneline -- .claude/
git revert <commit-hash>

# Or manual edit and commit correction
```

**User commands**:

```text
User: "That pattern you added to CLAUDE.md is wrong"

Claude: "I'll remove it. Which pattern specifically?"

User: "The one about using fetch()"

Claude: [Searches CLAUDE.md, finds pattern, removes it, commits]

Commit: "fix(claude): Remove incorrect fetch() pattern from CLAUDE.md

User reported this pattern was incorrect. Removing to prevent
misinformation. Original addition in commit abc123."
```

### 2. User Override

**User can explicitly correct**:

```text
User: "Actually, we use fetch() in some cases, not always React Query"

Claude: "Thanks for clarifying. Should I:
a) Remove the React Query guidance entirely
b) Update to note both are acceptable
c) Document when to use each
d) Leave as-is but note exceptions"

User: "c - document when to use each"

Claude: [Updates CLAUDE.md with nuanced guidance, commits]
```

### 3. A/B Testing Catches Bad Tools

If a tool is created but never used, A/B testing will identify it for removal:

```text
Tool created: /debug-cors
Usage: 0 times in 30 days
A/B test: 30 days, never requested

Result: Remove tool (wasn't actually useful)
Lesson: Wait for more occurrences before creating tools
```

### 4. Monthly Review

Specialist Agent periodically reviews all customizations:

```text
Specialist Agent:

"Reviewing CLAUDE.md patterns:

✓ React Query convention - referenced 47 times ✓ (high value)
✓ JWT token format - referenced 23 times ✓ (good value)
⚠ Migration reversibility - mentioned in code, but violations found
   → 3 migrations without down() methods
   → Recommendation: Need better enforcement or remove from CLAUDE.md

Propose removing or updating migration guidance?"
```

## Continuous Learning

### Learn from Mistakes

Track when captured patterns turn out to be wrong:

```json
{
  "pattern_corrections": [
    {
      "pattern": "All API calls use React Query",
      "added": "2025-11-01",
      "corrected": "2025-11-07",
      "reason": "Found legitimate fetch() uses in legacy code",
      "lesson": "Check for exceptions before generalizing"
    }
  ]
}
```

Use these to improve future pattern recognition:

- Similar patterns should trigger extra verification
- Categories prone to errors need higher thresholds
- Certain sources more reliable than others

### Feedback Loop

User corrections inform future decisions:

```text
User frequently corrects CLAUDE.md additions
→ Increase threshold for CLAUDE.md (require more evidence)
→ Always propose CLAUDE.md changes, never auto-commit

User never objects to .claudeignore additions
→ Maintain current threshold
→ Continue auto-committing obvious patterns
```

## Quality Metrics

Track quality of captured patterns:

**Good indicators**:

- ✅ Pattern used frequently after capture
- ✅ No user corrections needed
- ✅ Positive feedback scores
- ✅ Referenced naturally in conversations

**Bad indicators**:

- ❌ User corrects or removes pattern
- ❌ Pattern never referenced/used
- ❌ Contradictions discovered later
- ❌ Negative feedback

**Quality score**:

```text
Pattern Quality = (Uses + Positive_Feedback - Corrections - Removals) / Time_Since_Capture

High quality: >0.5
Medium quality: 0.1-0.5
Low quality: <0.1 (consider removing)
```

## Summary

Quality control through:

1. **Prevention**:
   - Repetition thresholds (3+ occurrences)
   - Contradiction detection
   - Source verification
   - Temporal validation
   - Scope validation

2. **Detection**:
   - Red flags for problematic patterns
   - Validation checklist
   - User confirmation for uncertain patterns

3. **Correction**:
   - Git rollback (easy revert)
   - User override (explicit corrections)
   - A/B testing (catch unused tools)
   - Monthly review (periodic audit)

4. **Learning**:
   - Track corrections
   - Adjust thresholds
   - Improve recognition

**Default stance**: When uncertain, ask user. Better to be cautious than to
codify bad patterns.
