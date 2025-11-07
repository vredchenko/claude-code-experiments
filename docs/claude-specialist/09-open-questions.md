# Open Questions

This document catalogs unresolved design decisions that need answers before or during implementation.

## High Priority (Need answers for Phase 1)

### 1. Interruption Tolerance

**Question**: How often can Claude propose improvements without being annoying?

**Options**:
- **A. Conservative**: Only when explicitly asked (`/improve-claude`)
- **B. Moderate**: After hitting threshold (3+ occurrences), at task completion
- **C. Aggressive**: Proactively suggest as patterns emerge
- **D. Hybrid**: Different thresholds for different change types

**Considerations**:
- User working style (focused vs. exploratory)
- Context (debugging vs. building features)
- Change type (low-risk vs. high-risk)
- Session length (quick task vs. long session)

**Trade-offs**:
- More suggestions → Better capture, but potentially annoying
- Fewer suggestions → Less annoying, but miss patterns

**Current thinking**: Start with Moderate (B), tune based on user feedback.

**Decision needed by**: Phase 2 (Background Detection)

---

### 2. Usage Stats Privacy

**Question**: Should usage statistics be version controlled or gitignored?

**Options**:
- **A. Fully gitignored**: Personal data, never committed
  - Pro: Privacy-preserving
  - Con: Lost on clone, not shared across team

- **B. Aggregated in version control**: Team-wide summary only
  - Pro: Shared insights, persistent
  - Con: Privacy considerations, merge conflicts

- **C. Opt-in sharing**: User chooses whether to share
  - Pro: Flexibility, user control
  - Con: Complexity, may fragment data

- **D. Local by default, export on demand**: Gitignored, but can generate reports
  - Pro: Privacy + insights when needed
  - Con: Manual process

**Considerations**:
- Team collaboration (shared vs. individual learning)
- Privacy (personal usage patterns)
- Persistence (across clones)
- Merge conflicts (if version controlled)

**Current thinking**: Start with A (Fully gitignored), add C (Opt-in) later if needed.

**Decision needed by**: Phase 1 (Usage Tracking)

---

### 3. CLAUDE.md Organization

**Question**: How to keep CLAUDE.md from becoming unwieldy as it grows?

**Options**:
- **A. Strict size limit**: Max 500 lines, force consolidation
- **B. Categorized sections**: Organize by topic, enforce structure
- **C. Split into multiple files**: CLAUDE.md + .claude/docs/*.md
- **D. Tiered importance**: Critical section always loaded, details on-demand
- **E. No limit**: Let it grow organically, refactor when needed

**Considerations**:
- Context window constraints
- Readability (human and AI)
- Maintainability
- Lookup efficiency

**Trade-offs**:
- Comprehensive documentation vs. concise core instructions
- Single source of truth vs. organized split

**Current thinking**: Start with B (Categorized sections), enforce structure. Consider D (Tiered) if it grows too large.

**Decision needed by**: Phase 1 (CLAUDE.md Audit)

---

## Medium Priority (Need answers for Phase 2-3)

### 4. Confidence Calibration

**Question**: What confidence threshold should trigger different actions?

**Scenarios**:

**Auto-commit thresholds**:
- .claudeignore: After 3 occurrences? 5?
- Simple commands: After 3 occurrences? 4?
- Usage stats: Always (automated)?

**Propose first thresholds**:
- CLAUDE.md updates: 3 observations OR 1 documented?
- Complex commands: Always propose first?
- New agents: Always propose first?

**Always ask thresholds**:
- Removals: Always ask?
- Structural changes: Always ask?
- Contradictions: Always ask?

**Considerations**:
- False positive rate (capturing noise)
- False negative rate (missing signal)
- User trust over time
- Change risk level

**Current thinking**: Start conservative (higher thresholds), tune down based on acceptance rates.

**Decision needed by**: Phase 2 (Decision Framework)

---

### 5. Cross-Session Learning

**Question**: How to synthesize patterns across multiple sessions?

**Challenges**:
- Sessions may be days/weeks apart
- Context from previous sessions not available
- Pattern counting across session boundaries
- Temporal patterns (is this still relevant?)

**Options**:
- **A. Session-local only**: Only detect patterns within current session
  - Pro: Simple, no state management
  - Con: Misses cross-session patterns

- **B. Persistent state**: Track patterns across sessions in usage-stats.json
  - Pro: Captures long-term patterns
  - Con: State management complexity

- **C. Git history analysis**: Specialist Agent analyzes git history for patterns
  - Pro: Comprehensive, uses existing data
  - Con: Requires explicit invocation

- **D. Hybrid**: Session-local detection + periodic cross-session analysis
  - Pro: Best of both worlds
  - Con: Most complex

**Current thinking**: Start with A+C (Session-local + Specialist Agent analysis), add B (Persistent state) in Phase 3.

**Decision needed by**: Phase 2 (Background Detection)

---

### 6. Feedback Sampling Strategy

**Question**: When and how often to ask for feedback?

**Current proposal**:
- 1st use: Always ask
- 5th use: Ask again
- 20th use: Check-in
- Every 50 uses: Periodic

**Alternative strategies**:
- **Time-based**: Ask once per week max
- **Random sampling**: 10% of uses
- **Adaptive**: More frequent for new tools, less for established
- **On-demand**: Only when user explicitly provides feedback

**Considerations**:
- Participation fatigue
- Data quality vs. quantity
- Timing (don't interrupt critical work)
- Value of feedback at different stages

**Current thinking**: Use proposed strategy, adjust based on participation rates.

**Decision needed by**: Phase 3 (Feedback Loop)

---

## Lower Priority (Can defer to later phases)

### 7. Tool Lifecycle

**Question**: What's the expected lifespan of a command/agent?

**Considerations**:
- Some tools are permanent (core workflows)
- Some tools are temporary (project phase-specific)
- Some tools become obsolete (replaced by better alternatives)
- Some tools are seasonal (deploy commands used less often)

**Options**:
- **A. No expiration**: Tools live forever unless explicitly removed
- **B. Inactivity-based**: Remove if unused for 60+ days
- **C. Explicit lifetime**: Tag tools as temporary/permanent
- **D. Periodic review**: Human decision during monthly reviews

**Current thinking**: Start with D (Periodic review), consider B (Inactivity) for automation later.

**Decision needed by**: Phase 4 (A/B Testing)

---

### 8. Conflict Resolution

**Question**: What happens when learned patterns contradict each other?

**Scenarios**:
- CLAUDE.md says "use React Query" but code uses fetch()
- Command created for approach A, but approach B also used
- Two agents give different advice

**Options**:
- **A. Always ask**: User resolves contradiction
- **B. Timestamp priority**: Newer learning overrides older
- **C. Evidence-based**: More evidence wins
- **D. Context-dependent**: Both valid, document when to use each

**Considerations**:
- Legitimate exceptions (legacy code)
- Evolving patterns (transitioning approaches)
- Mistakes in capture (bad pattern codified)
- Context-specific rules

**Current thinking**: A (Always ask) + quality control (contradiction detection flags for review).

**Decision needed by**: Phase 2 (Quality Control)

---

### 9. Team Collaboration

**Question**: How should learnings be shared across team members?

**Scenarios**:
- Multiple developers on same project
- Different usage patterns
- Conflicting preferences
- Shared vs. personal customizations

**Options**:
- **A. Version control all**: Everyone shares same tools
  - Pro: Consistency across team
  - Con: Personal preferences conflict

- **B. Personal only**: Each dev has own setup
  - Pro: Personalized experience
  - Con: No knowledge sharing

- **C. Shared core + personal additions**: CLAUDE.md shared, commands/agents personal
  - Pro: Balance of sharing and personalization
  - Con: Complexity in deciding what's shared

- **D. Opt-in sharing**: Default personal, explicitly share useful tools
  - Pro: Maximum flexibility
  - Con: Coordination overhead

**Current thinking**: Start with C (Shared core + personal additions). CLAUDE.md version controlled, usage-stats.json gitignored.

**Decision needed by**: Phase 1 (Initial setup)

---

### 10. Tool Discoverability

**Question**: How do users discover available commands/agents?

**Current mechanisms**:
- `/help` lists commands (if implemented)
- README or docs (manual documentation)
- Natural usage (Claude suggests when relevant)

**Options**:
- **A. Auto-documentation**: Generate docs from command/agent files
- **B. Interactive help**: `/commands` lists all with descriptions
- **C. Contextual suggestions**: Claude mentions relevant tools during work
- **D. Weekly digest**: "Here are tools you haven't tried yet"

**Considerations**:
- Discoverability vs. overwhelm
- Active learning vs. passive availability
- Documentation maintenance

**Current thinking**: B (Interactive help) + C (Contextual suggestions).

**Decision needed by**: Phase 2 (Once multiple tools exist)

---

### 11. A/B Test Duration

**Question**: How long should A/B tests run?

**Current proposal**: 30 days

**Considerations**:
- Usage frequency (daily vs. weekly tools)
- Seasonality (deploy tools used less in some periods)
- Statistical significance (need enough data)
- User patience (want results sooner)

**Alternative durations**:
- 14 days (faster feedback)
- 60 days (more data, especially for infrequent tools)
- Variable (based on usage frequency)

**Current thinking**: 30 days default, can extend for low-frequency tools.

**Decision needed by**: Phase 4 (A/B Testing)

---

### 12. Error Handling in Hooks

**Question**: How should hooks handle failures?

**Scenarios**:
- Formatter fails (file syntax error)
- Linter fails (code issues)
- Tests fail (pre-commit hook)
- Hook command not found

**Options**:
- **A. Block operation**: Don't allow Edit/Commit if hook fails
  - Pro: Enforces quality
  - Con: Can be frustrating if hook is flaky

- **B. Warn but continue**: Show warning, let user decide
  - Pro: Non-blocking
  - Con: Hook can be ignored

- **C. Retry with fallback**: Try hook, fallback to no-hook if fails
  - Pro: Best effort
  - Con: Inconsistent behavior

- **D. User choice per hook**: Some hooks block, some warn
  - Pro: Flexibility
  - Con: Configuration complexity

**Current thinking**: B (Warn but continue) for most hooks, A (Block) only if user explicitly configures.

**Decision needed by**: Phase 2 (If hooks are implemented)

---

### 13. Specialist Agent Invocation Frequency

**Question**: How often should comprehensive reviews happen?

**Current proposal**: User-initiated via `/reflect`

**Alternatives**:
- Weekly automatic summary
- Monthly automatic deep review
- After N commits
- After major milestones

**Considerations**:
- Analysis depth (quick vs. comprehensive)
- User time investment (minutes vs. detailed review)
- Value vs. interruption
- Data availability (need enough activity)

**Current thinking**: User-initiated primarily, optional weekly/monthly automated summaries.

**Decision needed by**: Phase 3 (Feedback Loop)

---

## Research Questions (Long-term)

### 14. Pattern Prediction

**Question**: Can Claude anticipate needs before patterns fully emerge?

**Concept**: After 1-2 occurrences, predict if pattern will continue and suggest tool creation proactively.

**Challenges**:
- High false positive risk
- Requires sophisticated pattern recognition
- May be premature

**Potential approach**:
- Machine learning on historical patterns
- User behavior modeling
- Context similarity matching

**Timeline**: Phase 5 or later (requires substantial data)

---

### 15. Cross-Project Learning

**Question**: Can learnings from one project inform another?

**Concept**: General patterns (testing strategies, common commands) could transfer across projects.

**Challenges**:
- Project-specific vs. universal patterns
- Privacy across projects
- Different tech stacks
- Over-generalization risk

**Potential approach**:
- User-level skill library
- Tagged transferable patterns
- Opt-in sharing

**Timeline**: Future (beyond current design)

---

### 16. Automated Testing of Improvements

**Question**: Can we automatically test if new tools/patterns are actually beneficial?

**Concept**: After creating a tool, measure if it's actually used, saves time, reduces errors.

**Current approach**: A/B testing (manual analysis)

**Advanced approach**:
- Automated metrics (time saved calculated)
- Error rate comparison (before/after)
- User satisfaction scoring
- Impact analysis

**Timeline**: Phase 4-5 (part of A/B testing evolution)

---

## Decision Tracking

As questions are answered, update this section:

| Question | Decision | Date | Rationale |
|----------|----------|------|-----------|
| TBD | TBD | TBD | TBD |

---

## How to Use This Document

**During design**:
- Identify new open questions as they arise
- Research and discuss options
- Document trade-offs

**During implementation**:
- Make decisions for current phase
- Document decisions and rationale
- Update design docs with answers

**During refinement**:
- Revisit decisions based on real usage
- Adjust based on what worked/didn't work
- Update designs accordingly

**This document is living**: Questions will be added, answered, and new ones will emerge.
