# Usage Tracking and Feedback System

This document describes how to measure and validate the utility of Claude Code customizations.

## Goals

1. **Measure actual usage** - Which tools are invoked and how often
2. **Collect user feedback** - Are tools useful in practice
3. **Identify low-value tools** - What should be reconsidered or removed
4. **Validate improvements** - Did new tools actually help
5. **Enable A/B testing** - Test whether tools are missed when disabled

## Usage Tracking Mechanisms

### 1. Usage Statistics File

**Location**: `.claude/usage-stats.json`

**Gitignored**: Yes (personal usage data, not universal)

**Structure**:

```json
{
  "version": "1.0",
  "project": "claude-code-experiments",
  "tracking_started": "2025-11-01T00:00:00Z",

  "commands": {
    "test-all": {
      "invocations": 42,
      "first_used": "2025-11-01T10:00:00Z",
      "last_used": "2025-11-07T10:30:00Z",
      "avg_time_ms": 15000,
      "failures": 2,
      "feedback_score": 4.5,
      "feedback_count": 3
    },
    "db-reset": {
      "invocations": 8,
      "first_used": "2025-11-02T14:00:00Z",
      "last_used": "2025-11-06T09:15:00Z",
      "avg_time_ms": 5000,
      "failures": 0,
      "feedback_score": 5.0,
      "feedback_count": 2
    }
  },

  "agents": {
    "specialist_agent": {
      "invocations": 5,
      "first_used": "2025-11-01T10:00:00Z",
      "last_used": "2025-11-06T14:20:00Z",
      "avg_time_ms": 45000,
      "feedback_score": 4.8,
      "feedback_count": 5
    },
    "security_auditor": {
      "invocations": 2,
      "first_used": "2025-11-03T16:00:00Z",
      "last_used": "2025-11-05T11:30:00Z"
    }
  },

  "hooks": {
    "post-edit-format": {
      "executions": 156,
      "failures": 2,
      "first_executed": "2025-11-01T10:00:00Z",
      "last_executed": "2025-11-07T10:45:00Z",
      "avg_time_ms": 250,
      "blocked_operations": 0
    },
    "pre-commit-test": {
      "executions": 23,
      "failures": 5,
      "first_executed": "2025-11-01T12:00:00Z",
      "last_executed": "2025-11-07T09:00:00Z",
      "avg_time_ms": 8000,
      "blocked_operations": 5
    }
  },

  "patterns": {
    "claudemd_references": {
      "react_query_convention": 47,
      "jwt_token_format": 23,
      "migration_reversibility": 12
    }
  }
}
```

### 2. Tracking Implementation

**When to increment counters**:
- Command invoked via `/command-name`
- Agent loaded (track in agent prompt)
- Hook executed (track in hook runner)
- CLAUDE.md pattern referenced (harder to track, best effort)

**Automatic tracking**:
```typescript
// Pseudocode for command tracking
function invokeCommand(commandName: string) {
  const startTime = Date.now();

  // Load usage stats
  const stats = loadUsageStats();

  // Initialize if first use
  if (!stats.commands[commandName]) {
    stats.commands[commandName] = {
      invocations: 0,
      first_used: new Date().toISOString(),
      failures: 0
    };
  }

  // Increment counter
  stats.commands[commandName].invocations++;
  stats.commands[commandName].last_used = new Date().toISOString();

  try {
    // Execute command
    const result = await executeCommand(commandName);

    // Track timing
    const elapsed = Date.now() - startTime;
    updateAvgTime(stats.commands[commandName], elapsed);

    // Save stats
    saveUsageStats(stats);

    return result;
  } catch (error) {
    // Track failure
    stats.commands[commandName].failures++;
    saveUsageStats(stats);
    throw error;
  }
}
```

### 3. Privacy Considerations

**What to track**:
- ✅ Invocation counts
- ✅ Timestamps (for recency)
- ✅ Success/failure rates
- ✅ Timing information
- ✅ Feedback scores

**What NOT to track**:
- ❌ Command arguments (may contain sensitive data)
- ❌ File paths (may reveal project structure)
- ❌ Error messages (may contain sensitive info)
- ❌ User identity

**Storage options**:

**Option A: Local only (gitignored)**
- Pro: No privacy concerns
- Pro: Personal usage patterns
- Con: Not shared across team
- Con: Lost when cloning fresh

**Option B: Version controlled (aggregated)**
- Pro: Shared team insights
- Pro: Persists across clones
- Con: Privacy considerations
- Con: May create conflicts

**Recommendation**: Start with Option A (gitignored), add Option B aggregated summary if team wants shared insights.

## Feedback Collection

### 1. Lightweight Feedback Prompts

**Principle**: Non-intrusive, easy to dismiss, valuable when provided.

**Sampling strategy**:
- 1st use: Always ask (validate early)
- 5th use: Ask again (validate continued utility)
- 20th use: Ask once more (validate long-term value)
- Every 50 uses after: Occasional check-ins
- After failures: Always ask

**Prompt examples**:

**After command execution**:
```
✓ /test-all completed in 15s

Quick feedback (optional):
👍 Useful  |  👎 Not useful  |  ⏭  Skip

[User presses 👍]

Thanks! What made it useful? (optional, press Enter to skip)
> "Saves time running all checks manually"

[Recorded: feedback_score += 1, feedback_count++]
```

**After agent invocation**:
```
[Security audit complete]

Was the security_auditor agent helpful?
👍 Very  |  😐 Somewhat  |  👎 Not really  |  ⏭  Skip

[User presses 👍]

Optional: Any suggestions for improvement?
> "Could include more auth flow checks"

[Recorded: feedback_score = 5, feedback_count++, note saved]
```

**After hook execution (only on failure or occasional sampling)**:
```
Post-edit hook (prettier) ran in 250ms

[No prompt - seamless]

# Only prompt if:
# - Hook failed
# - 1st, 10th, 50th execution
# - User explicitly asks
```

### 2. Periodic Reviews

**Weekly Summary** (lightweight):
```
This week you used:
- /test-all (15 times) ⭐⭐⭐⭐⭐
- /db-reset (3 times) ⭐⭐⭐⭐⭐
- security_agent (once) [no rating yet]

Any tools feeling less useful? (yes/no/skip)
```

**Monthly Deep Review** (via Specialist Agent):
```
User: /reflect

Claude (Specialist Agent):

## Usage Analysis (Last 30 days)

### High-Value Tools (Keep, possibly expand)
1. /test-all - 60 uses, 4.8/5 rating, saved ~90 min
2. post-edit-format hook - 200+ runs, seamless
3. React Query convention (CLAUDE.md) - referenced 50+ times

### Moderate-Value Tools (Monitor)
1. /db-reset - 8 uses, 5/5 rating, low frequency but high value when needed
2. security_auditor agent - 2 uses, 5/5 rating, specialized but important

### Low-Value Tools (Consider for A/B testing)
1. /debug-cors - Created 30 days ago, used once
   - Recommendation: A/B test (disable, see if requested)
2. performance_optimizer agent - Never invoked
   - Recommendation: Keep for now, review in 30 days

### Failed/Problematic Tools
1. pre-commit-test hook - 5 failures out of 23 runs (22% failure rate)
   - Issue: Tests sometimes fail due to unrelated issues
   - Recommendation: Make hook less strict or convert to command

Proceed with recommendations? (all/selective/none)
```

### 3. Feedback Data Structure

```json
{
  "feedback": {
    "test-all": [
      {
        "timestamp": "2025-11-07T10:30:00Z",
        "score": 5,
        "comment": "Saves time running all checks manually",
        "invocation_number": 1
      },
      {
        "timestamp": "2025-11-08T14:20:00Z",
        "score": 4,
        "comment": "Sometimes slow, but useful",
        "invocation_number": 5
      }
    ]
  }
}
```

## A/B Testing Framework

### Purpose
Validate that tools are actually valuable, not just accumulated cruft.

### Test Types

#### 1. Shadow Disabling

**Concept**: Tool still exists but prompts user to choose.

```
User: /test-all

Claude: "The /test-all command is in A/B test mode.

Would you like to:
a) Use the command as normal
b) Do it manually (to test if command is worth keeping)
c) Skip test, always use command

Current test: Day 5 of 30
Manual choices so far: 0
Command choices so far: 4"

User: a

[Records choice, executes command]
```

**Test duration**: 30 days
**Success criteria**: If user always chooses command, keep it
**Failure criteria**: If user chooses manual 50%+ of time, consider removing

#### 2. Hard Disable

**Concept**: Temporarily remove tool completely.

```
User: /debug-cors

Claude: "The /debug-cors command is temporarily disabled for A/B testing.

You can still debug CORS issues manually. Would you like suggestions
on how to do that?

If you need this command back, let me know and I'll re-enable it."

[Records: Command was requested during disable period]
```

**Test duration**: 30 days
**Success criteria**: If never requested, consider removing
**Failure criteria**: If requested multiple times, keep it

#### 3. Feature Flag

**Concept**: Create two versions, test which is better.

```
# Version A: Simple command
/test-all → runs all tests

# Version B: Smart command
/test-all → runs only changed tests first, then all if those pass

# A/B test: Alternate between versions
# Track: Which version is faster, which is preferred
```

**Test duration**: 30 days
**Success criteria**: Pick version with better metrics
**Measurement**: Time saved, feedback scores

### A/B Test Configuration

```json
{
  "abTests": {
    "debug-cors-command": {
      "type": "shadow-disable",
      "status": "active",
      "start_date": "2025-11-01",
      "end_date": "2025-12-01",
      "reason": "Used only once in 30 days after creation",
      "metrics": {
        "command_choices": 4,
        "manual_choices": 0,
        "skipped": 0
      },
      "decision": null  // Will be set at end of test
    },
    "performance-optimizer-agent": {
      "type": "hard-disable",
      "status": "active",
      "start_date": "2025-11-07",
      "end_date": "2025-12-07",
      "reason": "Never invoked in 60 days",
      "metrics": {
        "requested_during_disable": 0
      },
      "decision": null
    }
  }
}
```

### Test Decision Criteria

**Keep if**:
- ✅ Shadow disable: Command chosen >80% of time
- ✅ Hard disable: Requested 2+ times during disable
- ✅ Feature flag: Clear winner on metrics

**Remove if**:
- ❌ Shadow disable: Manual chosen >50% of time
- ❌ Hard disable: Never requested during 30 days
- ❌ Feature flag: No measurable difference (remove complexity)

**Modify if**:
- 🔄 Mixed results but clear improvement opportunities
- 🔄 Useful but needs better UX
- 🔄 Right idea, wrong implementation

## Pruning Candidates

### Identification

**Low usage**:
- Commands: <3 uses in 30 days
- Agents: 0 uses in 60 days
- Hooks: Failure rate >20%

**Low value**:
- Feedback score <3.0
- Frequently skipped
- Negative user comments

**High maintenance**:
- Frequent updates needed
- Often breaks
- Complex to maintain

**Redundant**:
- Multiple tools doing same thing
- Tool obsoleted by better alternative
- Functionality moved elsewhere

### Pruning Process

1. **Identify candidate** (via Specialist Agent or usage stats)
2. **Propose A/B test** to user
3. **Run test** for 30 days
4. **Analyze results**
5. **Make decision**: Keep, modify, or remove
6. **If removing**: Create commit explaining why

**Example pruning commit**:
```
chore(claude): Remove /debug-cors command

Reason: A/B test showed command requested 0 times in 30 days
after being created. Original use case (CORS debugging) hasn't
recurred.

Usage stats:
- Created: 2025-10-01
- Total invocations: 1 (at creation)
- Last used: 2025-10-01
- A/B test: 30 days, 0 requests

Decision: Remove to reduce maintenance burden. Can recreate if
need arises again.
```

## Integration with Implementation Strategy

### Specialist Agent
- Analyzes usage stats
- Identifies high/low-value tools
- Proposes pruning candidates
- Presents monthly summaries

### Improvement Command
- Records new tool creation
- Initializes usage tracking
- Sets up feedback collection

### Background Detection
- Observes patterns
- Suggests when threshold hit
- References usage stats for validation

## Success Metrics

### Quantitative

**Usage metrics**:
- Tool invocation frequency
- Time saved (estimated)
- Failure rates
- Adoption speed (time to Nth use)

**Quality metrics**:
- Feedback scores (1-5 scale)
- Feedback participation rate
- A/B test success rate
- Pruning accuracy (removed tools not requested back)

### Qualitative

**User sentiment**:
- "Claude knows my project better"
- "Common tasks are easier"
- "Tools feel useful, not bloated"
- "Suggestions are relevant"

**System health**:
- CLAUDE.md stays concise
- Commands are actually used
- Agents invoked regularly
- Hooks don't cause friction

## Privacy and Data Handling

### Local Usage Stats (.gitignored)

**Pros**:
- No privacy concerns
- Personal usage patterns
- No merge conflicts

**Cons**:
- Not shared across team
- Lost on fresh clone
- Can't aggregate team insights

### Aggregated Stats (Version Controlled)

**Pros**:
- Team-wide insights
- Persistent across clones
- Inform shared decisions

**Cons**:
- Privacy considerations
- May create conflicts
- Needs careful aggregation

### Recommendation

**Default**: Local stats only (.gitignored)

**Optional**: User can opt-in to share aggregated stats:
```json
{
  "usage_tracking": {
    "share_aggregated_stats": false,
    "include_in_version_control": false
  }
}
```

**If shared**, only aggregate counts, no sensitive details:
```json
{
  "team_usage": {
    "commands": {
      "test-all": {"total_uses": 142, "unique_users": 3},
      "db-reset": {"total_uses": 28, "unique_users": 2}
    }
  }
}
```

## Implementation Checklist

- [ ] Create usage-stats.json structure
- [ ] Implement tracking for commands
- [ ] Implement tracking for agents
- [ ] Implement tracking for hooks
- [ ] Add feedback prompt system
- [ ] Create weekly summary generator
- [ ] Build monthly review (Specialist Agent)
- [ ] Implement A/B testing framework
- [ ] Add pruning candidate identification
- [ ] Document privacy policy
- [ ] Add opt-in for shared stats
