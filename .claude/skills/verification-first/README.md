# Verification-First Workflow

A structured approach to using AI that ensures genuine competence before
automation.

## Quick Start

```bash
# In Claude Code, invoke the Foundation agent
/foundation

# Or reference the agent directly
# See: ../../agents/foundation_agent.md
```

## Philosophy

Based on the principle: **Earn the privilege to use automation**

Research shows 40% of AI outputs are accepted without scrutiny, leading to an
"illusion of competence" where users appear productive but lack deep
understanding.

## The 5-Phase Workflow

1. **Understanding Assessment** - Can you explain the problem clearly?
2. **Manual Process Walkthrough** - How would you do this by hand?
3. **Verification Strategy** - How will you know if it's correct?
4. **Guided Automation** - Build with understanding and transparency
5. **Verification Check** - Verify both function AND comprehension

## Key Principles

- 🔧 **Manual before automation** - Like pilots before autopilot
- ✅ **Verification culture** - Scrutinize, don't rubber-stamp
- 🧠 **Cognitive engagement** - AI extends thinking, doesn't replace it
- 📚 **Deep understanding** - Probe beyond surface fluency
- 🚀 **Independent growth** - Build genuine skills, not dependency

## When to Use

- ✅ Starting complex automation projects
- ✅ Learning new technologies
- ✅ Training team members
- ✅ Before production deployments
- ✅ Debugging mysterious issues

## Anti-Patterns to Avoid

- ❌ **Rubber-stamping**: "Looks good!" without verification
- ❌ **Speed over understanding**: "Just make it work fast"
- ❌ **Black box acceptance**: "I don't understand it, but ship it"
- ❌ **Testing avoidance**: "It probably works"

## Example Workflow

```markdown
## Task: Process CSV files

### Phase 1: Understanding
- What columns need extraction?
- What format for output?
- Have you done CSV processing before?

### Phase 2: Manual Process
- Walk through: How would you do this in Excel?
- What steps in what order?

### Phase 3: Verification
- [ ] All expected rows present
- [ ] Column data in correct format
- [ ] Edge cases handled

### Phase 4: Automation
[Build code with explanations and built-in verification]

### Phase 5: Verification Check
- Run tests against checklist
- User explains code functionality
- Can user debug issues independently?
```

## Success Metrics

You've succeeded when you can:

- ✅ Explain what the automation does and why
- ✅ Verify outputs with confidence
- ✅ Debug issues independently
- ✅ Adapt code when requirements change
- ✅ Teach others how it works

## Integration

Works best with:

- **Foundation Agent** (`.claude/agents/foundation_agent.md`) - Provides the
  thinking partner personality
- **Slash Command** (`/foundation`) - Quick invocation

## Resources

- **Full Workflow**: See `SKILL.md` in this directory
- **Agent Personality**: See `../../agents/foundation_agent.md`
- **Slash Command**: See `../../commands/foundation.md`

## References

Based on research into:

- Illusion of competence in AI-assisted work
- Verification culture for catching errors
- Manual-first learning (pilot simulator analogy)
- Cognitive engagement vs surface fluency

---

_"Give a developer an AI-generated solution, and they ship one feature. Teach a
developer to verify and understand, and they ship robust systems for a
lifetime."_
