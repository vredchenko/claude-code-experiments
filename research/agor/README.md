# Agor Research

> "Figma, but for AI coding assistants" - Preset.io

**Status**: Research initialized, ready for experimentation
**Date**: 2025-11-12
**Branch**: `claude/explore-agor-preset-011CV4HtMZUXxgnTsMiWz5Jv`

## What is This?

This directory contains research, experimentation notes, and evaluation materials for [Agor](https://github.com/preset-io/agor) - an innovative platform for orchestrating multiple AI coding assistants across a shared spatial canvas.

## Why Agor?

Agor addresses key pain points in AI-assisted development:
- **Parallel work**: Run multiple AI agents simultaneously without conflicts
- **Visual coordination**: See all agent work on a Figma-like canvas
- **Workflow automation**: Zone-based triggers for repetitive tasks
- **Team collaboration**: Real-time multiplayer for distributed teams
- **Git integration**: Automatic worktree and branch management

## Quick Start

1. **Understand**: Read [`OVERVIEW.md`](./OVERVIEW.md) for comprehensive background
2. **Experiment**: Follow [`EXPERIMENTATION.md`](./EXPERIMENTATION.md) for structured approach
3. **Reference**: Use [`QUICKREF.md`](./QUICKREF.md) for commands and examples

## Files in This Directory

| File | Purpose |
|------|---------|
| `README.md` | This file - directory overview |
| `OVERVIEW.md` | Comprehensive Agor overview, features, tech stack |
| `EXPERIMENTATION.md` | 6-phase experimentation plan (~3 weeks) |
| `QUICKREF.md` | Quick reference for commands, patterns, tips |

## Documentation to Create During Experimentation

As you experiment, create these files:

- `SETUP-NOTES.md` - Installation issues and solutions
- `WORKFLOW-PATTERNS.md` - Effective zone templates
- `TROUBLESHOOTING.md` - Common issues and fixes
- `PERFORMANCE.md` - Benchmarks and optimization
- `EVALUATION.md` - Final comprehensive assessment
- `BEST-PRACTICES.md` - Recommended usage patterns
- `LESSONS-LEARNED.md` - Key insights and gotchas

## Experimentation Phases

### Phase 1: Setup (Day 1-2)
Get Agor running, create first worktree and session

### Phase 2: Workflows (Day 3-5)
Create zones and automation pipelines

### Phase 3: Multi-Agent (Day 6-8)
Coordinate multiple agents simultaneously

### Phase 4: Real Work (Day 9-12)
Use Agor for actual feature development

### Phase 5: Advanced (Day 13-15)
Push limits, discover optimal patterns

### Phase 6: Evaluation (Day 16-18)
Security assessment, cost-benefit analysis, final decision

## Key Features to Explore

### 1. Spatial Canvas
Figma-like interface for visualizing agent work

### 2. Git Worktrees
Automatic isolated environments per task

### 3. Zone Automation
Trigger templated prompts by dragging worktrees

### 4. Session Trees
Fork and spawn sessions for exploration

### 5. Multi-Agent Coordination
Multiple agents working in parallel

### 6. Mobile Workflow
Monitor and control from mobile devices

## Integration Opportunities

### With This Repository

**Existing Agents**:
- Foundation Agent → Verify Agor understanding
- Grimface Agent → Challenge workflow assumptions
- AI Security Agents → Assess multi-agent risks

**Existing Skills**:
- Verification-First → Apply to Agor setup
- Playwright → Test Agor UI
- AI Security Assessment → Evaluate coordination

**MCP Servers**:
- GitLab → Extend Agor to GitLab
- SurrealDB → Store session data
- Sourcegraph → Enhanced code search

## Success Criteria

### Minimum
- 3+ concurrent agents working
- One real feature completed with Agor
- Zone automation reliable
- No major security concerns

### Ideal
- 10+ concurrent agents smooth
- 30%+ productivity gain
- Seamless workflow integration
- Mobile workflow useful
- Team collaboration effective
- Clear best practices

## Resources

- **GitHub**: https://github.com/preset-io/agor
- **Website**: https://agor.live/
- **Stars**: 626+ (active development)
- **Tech**: TypeScript, React, FeathersJS, LibSQL
- **Architecture**: Monorepo (pnpm + Turbo)

## Getting Started

```bash
# Install
npm install -g agor-live

# Initialize and start
agor init
agor daemon start
agor open

# Or development setup
git clone https://github.com/preset-io/agor.git
cd agor
pnpm install
# Then run daemon and UI in separate terminals
```

## Research Questions

- How many concurrent agents is practical?
- What's the learning curve?
- When to use Agor vs traditional workflow?
- Is mobile workflow genuinely useful?
- How to handle agent failures?
- What security implications exist?
- Can we integrate custom MCP servers?
- What workflow patterns work best?

## Contributing Back

If you discover bugs or improvements:
- **Report**: https://github.com/preset-io/agor/issues
- **Fix**: The team pledges to fix one issue per GitHub star
- **Contribute**: PR with improvements welcome

## Notes

- Built with significant Claude AI assistance (meta!)
- Very active development (866+ commits)
- Novel approach to AI agent coordination
- Treats agent orchestration like design collaboration
- TypeScript-heavy (93.6% of codebase)

---

**Ready to experiment?** Start with `OVERVIEW.md` then follow `EXPERIMENTATION.md`!

**Questions?** Check `QUICKREF.md` for quick answers.

**Good luck!** This is a genuinely innovative tool - excited to see what you discover! 🚀
