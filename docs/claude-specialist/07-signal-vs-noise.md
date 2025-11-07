# Signal vs. Noise: What to Capture

This document provides clear guidance on distinguishing valuable patterns (signal) from irrelevant or temporary patterns (noise).

## Core Principle

**Capture patterns that will be useful in the future, not just artifacts of current work.**

## High Signal (Capture These)

### ✅ Repeated Operations

**Pattern**: Same operation performed multiple times (3+).

**Examples**:

```
Signal: User runs "bun test && bun lint && bun type-check" before every commit (5 times)
→ Create /pre-commit command

Signal: User resets database with same sequence 4 times
→ Create /db-reset command

Signal: User searches for same pattern in codebase 3 times across sessions
→ Add pattern to CLAUDE.md or create agent
```

**Why high signal**:
- Proven need (not hypothetical)
- Clear time savings
- Will likely recur

### ✅ Discovered Conventions

**Pattern**: Found in project documentation, code comments, or consistent codebase patterns.

**Examples**:

```
Signal: README.md states "All API calls use React Query"
→ Add to CLAUDE.md with citation

Signal: CONTRIBUTING.md requires reversible database migrations
→ Add to CLAUDE.md, consider validation hook

Signal: Found .lean() in 12 query files consistently
→ Add to CLAUDE.md (inferred but consistent convention)

Signal: All test files use vitest describe/it/expect pattern
→ Add to CLAUDE.md (testing framework choice)
```

**Why high signal**:
- Documented intent (not just happenstance)
- Project-wide standard
- New code should follow

### ✅ Pain Points with Clear Solutions

**Pattern**: Recurring problems with known fixes.

**Examples**:

```
Signal: CORS issues debugged twice with same steps
→ Create /debug-cors command

Signal: Tests fail due to missing cleanup (3 times)
→ Add to CLAUDE.md about test cleanup requirement

Signal: Formatting inconsistencies in PRs
→ Add post-edit hook to run prettier
```

**Why high signal**:
- Prevents repeated mistakes
- Clear value proposition
- Automation opportunity

### ✅ Successful Patterns

**Pattern**: Approaches that worked well and should be reused.

**Examples**:

```
Signal: React Query pattern for optimistic updates works well (used 3+ times)
→ Document pattern in CLAUDE.md

Signal: Database migration approach is safe and reversible (consistent use)
→ Add to CLAUDE.md as standard approach

Signal: Testing strategy for async operations (repeated successfully)
→ Create testing_patterns_agent or add to CLAUDE.md
```

**Why high signal**:
- Proven effective
- Should be default approach
- Saves reinventing

### ✅ Discovered Gotchas

**Pattern**: Issues that caused actual problems and should be avoided.

**Examples**:

```
Signal: Forgetting to call cleanup() in tests causes hangs (happened 3 times)
→ Add to CLAUDE.md: "Always call cleanup() in afterEach"

Signal: Using eval() in templates violates security policy (found in docs)
→ Add to CLAUDE.md: "Never use eval() - explicit security requirement"

Signal: Redis connections must be closed in tests (caused CI failures)
→ Add to CLAUDE.md + consider hook to validate
```

**Why high signal**:
- Prevents real problems
- Hard-won knowledge
- Easy to forget

### ✅ Architecture Decisions

**Pattern**: High-level structural choices that inform implementation.

**Examples**:

```
Signal: Feature-based directory structure (documented in ARCHITECTURE.md)
→ Add to CLAUDE.md

Signal: Event-driven architecture with message queue (consistent pattern)
→ Add to CLAUDE.md, consider architecture_agent

Signal: Microservices communicate via REST APIs, not direct DB access
→ Add to CLAUDE.md (architectural constraint)
```

**Why high signal**:
- Foundational decisions
- Affects many implementation choices
- Should be consistent

## Low Signal (Ignore These)

### ❌ One-Off Operations

**Pattern**: Complex operation performed once.

**Examples**:

```
Noise: User runs complex regex to fix malformed data once
→ DON'T create command (unlikely to recur)

Noise: One-time migration script for legacy data
→ DON'T capture (temporal, specific to migration)

Noise: Exploratory git command to analyze history
→ DON'T create command (exploration, not workflow)
```

**Why noise**:
- Not proven to be recurring need
- May be specific to situation
- Would clutter tooling

### ❌ Personal Preferences

**Pattern**: User's coding style without project grounding.

**Examples**:

```
Noise: User prefers `const` for everything (no project style guide)
→ DON'T add to CLAUDE.md (personal style)

Noise: User likes to use TODO comments (no project standard)
→ DON'T capture (personal habit)

Noise: User runs tests with --verbose flag (preference, not requirement)
→ DON'T make default (personal preference)
```

**Why noise**:
- Not project-wide standard
- Other team members may differ
- Would impose opinion

**Exception**: If documented in project style guide, then it's signal.

### ❌ Temporary Workarounds

**Pattern**: Solutions for current bugs or issues.

**Examples**:

```
Noise: Adding console.log everywhere to debug issue
→ DON'T capture as pattern (debugging, temporary)

Noise: Disabling strict mode to meet deadline
→ DON'T capture (workaround, should be fixed)

Noise: Manually mocking module due to test bug
→ DON'T create pattern (bug should be fixed)
```

**Why noise**:
- Should be fixed, not codified
- Temporary situation
- Not best practice

### ❌ Exploratory Work

**Pattern**: Trying different approaches, learning.

**Examples**:

```
Noise: User tries 3 different state management approaches
→ DON'T capture yet (still exploring)

Noise: Experimenting with different testing strategies
→ DON'T capture yet (approach not settled)

Noise: Refactoring component multiple times to find best structure
→ DON'T capture until approach is stable
```

**Why noise**:
- Pattern not established yet
- Approach still evolving
- Wait for decision

### ❌ Failed Approaches

**Pattern**: Things that didn't work (unless documenting what NOT to do).

**Examples**:

```
Noise: Tried approach A, didn't work, switched to approach B
→ DON'T capture approach A (failed)
→ MAYBE capture approach B if successful and repeated

Noise: Performance optimization that made things slower
→ DON'T capture (counterproductive)

Exception: May capture as "anti-pattern" if important to avoid
→ "DON'T use approach X - makes things slower (tested 2025-11-07)"
```

**Why noise**:
- Doesn't help (or actively hurts)
- Learn and move on
- Exception: Important anti-patterns

### ❌ Assumptions Without Evidence

**Pattern**: Beliefs not grounded in project reality.

**Examples**:

```
Noise: "This API endpoint seems slow" (observation without measurement)
→ DON'T add to CLAUDE.md (unverified assumption)

Noise: "Components should probably be small" (general belief)
→ DON'T add unless project has documented standard

Noise: "Tests should be unit tests" (opinion)
→ DON'T add unless project testing strategy documents this
```

**Why noise**:
- Not verified
- May be incorrect
- Could mislead

## Decision Matrix

| Characteristic | Signal ✅ | Noise ❌ |
|----------------|-----------|----------|
| **Frequency** | 3+ occurrences | 1-2 occurrences |
| **Source** | Documented or consistent | Inferred from single instance |
| **Temporal** | Across sessions, stable | Within session, temporary |
| **Scope** | Project-wide | Personal or specific |
| **Intent** | Deliberate choice | Happenstance |
| **Value** | Saves time, prevents errors | No clear benefit |
| **Context** | General applicability | Tied to specific situation |

## Examples with Analysis

### Example 1: Database Query Pattern

**Observation**: User uses `.lean()` in mongoose queries.

**Analysis**:

| Factor | Assessment | Signal/Noise |
|--------|------------|--------------|
| Frequency | Found in 12 files | ✅ Signal |
| Consistency | Always for read-only queries | ✅ Signal |
| Documentation | Not documented, but consistent | ⚠️ Moderate |
| Scope | Project-wide pattern | ✅ Signal |
| Temporal | Stable over weeks | ✅ Signal |

**Decision**: ✅ **CAPTURE**
- Add to CLAUDE.md: "Use .lean() for read-only database queries"
- Cite occurrences: "Found consistently in 12+ query files"

### Example 2: Debugging with Console.log

**Observation**: User adds many console.log statements while debugging.

**Analysis**:

| Factor | Assessment | Signal/Noise |
|--------|------------|--------------|
| Frequency | Many in one session | ❌ Noise |
| Context | Debugging specific bug | ❌ Noise |
| Temporal | Only during bug investigation | ❌ Noise |
| Best practice | Should use proper debugger | ❌ Noise |
| Persistence | Removed after debugging | ❌ Noise |

**Decision**: ❌ **DON'T CAPTURE**
- Temporary debugging approach
- Not a pattern to codify
- Part of problem-solving process

### Example 3: Pre-Commit Command Sequence

**Observation**: User runs "bun test && bun lint && bun type-check" before git commits.

**Analysis**:

| Factor | Assessment | Signal/Noise |
|--------|------------|--------------|
| Frequency | 5 times across 3 sessions | ✅ Signal |
| Consistency | Exact same sequence | ✅ Signal |
| Intent | Quality gate before commit | ✅ Signal |
| Time savings | ~30 sec per invocation | ✅ Signal |
| Generalizability | Should always run before commit | ✅ Signal |

**Decision**: ✅ **CAPTURE**
- Create /pre-commit command
- Consider pre-commit hook (with user approval)

### Example 4: Experimenting with State Management

**Observation**: User tries Redux, then Zustand, then Jotai in same session.

**Analysis**:

| Factor | Assessment | Signal/Noise |
|--------|------------|--------------|
| Frequency | Multiple attempts | ⚠️ Exploratory |
| Consistency | Different approaches | ❌ Noise |
| Stability | Still deciding | ❌ Noise |
| Temporal | All in one session | ❌ Noise |

**Decision**: ❌ **DON'T CAPTURE YET**
- Wait for decision
- Note observation
- Check back when approach stabilizes
- Then capture chosen approach (if repeated)

### Example 5: React Query Convention

**Observation**: Found "Use React Query for data fetching" in README.md line 15.

**Analysis**:

| Factor | Assessment | Signal/Noise |
|--------|------------|--------------|
| Source | Explicit documentation | ✅ Signal |
| Authority | Project README | ✅ Signal |
| Scope | All data fetching | ✅ Signal |
| Verifiable | Can cite source | ✅ Signal |
| Consistency | Confirmed in code (12 files) | ✅ Signal |

**Decision**: ✅ **CAPTURE IMMEDIATELY**
- Add to CLAUDE.md with citation
- High confidence (documented + observed)
- First occurrence is enough (explicit doc)

## Special Cases

### Anti-Patterns

Sometimes worth capturing what NOT to do:

```
✅ Capture anti-pattern if:
- Tried and proven harmful
- Easy mistake to make
- Important to avoid
- Clear alternative exists

Example:
"DON'T use eval() in templates - explicit security policy in SECURITY.md:45
→ Use template literals or JSX instead"
```

### Exceptions to Rules

General patterns with known exceptions:

```
✅ Capture both pattern and exception:

"Use React Query for all API calls
→ Exception: Legacy admin panel (admin/legacy/*) uses fetch()
→ Reason: Planned for refactor, not updated yet"
```

### Evolving Patterns

Patterns in transition:

```
⚠️ Note as evolving:

"State management transitioning from Redux to Zustand
→ New code: Use Zustand (src/stores/*)
→ Legacy code: Still uses Redux (will be migrated)
→ DON'T mix: Pick Zustand for new features"
```

## Practical Rules of Thumb

### CAPTURE if:
1. Repeated 3+ times OR explicitly documented
2. Will save time or prevent errors
3. Applies broadly (not situation-specific)
4. Based on facts, not assumptions
5. Stable over time

### DON'T CAPTURE if:
1. Only seen once or twice
2. Tied to specific bug/issue
3. Personal preference without project grounding
4. Temporary or exploratory
5. Failed approach

### WAIT AND OBSERVE if:
1. Pattern emerging but not established
2. Only 2 occurrences (almost threshold)
3. Uncertain if project-wide or personal
4. Approach seems to be evolving

## Noise Reduction Strategies

### 1. Session Boundaries

Patterns within one session are more likely noise:
- Debugging session: Lots of temporary code
- Exploration: Trying different approaches
- Bug fix: One-off operations

Patterns across sessions are more likely signal:
- Repeated in different contexts
- Stable over time
- Not tied to specific issue

### 2. Evidence Requirements

Higher bar for controversial changes:
- CLAUDE.md: Require documentation OR 3+ observations
- Commands: 3+ identical operations
- Agents: Clear domain + repeated need
- Hooks: User approval always

Lower bar for obvious changes:
- .claudeignore: 2-3 context pollution instances
- Documented facts: 1 occurrence if explicitly written

### 3. Reversibility

Lower bar if easy to undo:
- .claudeignore additions (easy to remove)
- Simple commands (easy to delete)

Higher bar if hard to undo:
- CLAUDE.md additions (will influence all future work)
- Hooks (auto-executing, can be disruptive)

## Summary

**High signal patterns**:
- Repeated operations (3+)
- Discovered conventions (documented or consistent)
- Pain points with clear solutions
- Successful patterns worth reusing
- Discovered gotchas (prevent problems)
- Architecture decisions

**Noise to avoid**:
- One-off operations
- Personal preferences
- Temporary workarounds
- Exploratory work (before decision)
- Failed approaches
- Unverified assumptions

**When uncertain**: Wait and observe. Better to miss a pattern than to capture noise.

**Gold standard**: Explicit documentation + consistent code = capture immediately with high confidence.
