---
name: Verification-First Workflow
description:
  A structured workflow that ensures users understand tasks manually before
  automating them, implementing the "earn the privilege to use automation"
  philosophy. Prevents illusion of competence by building deep understanding
  before AI assistance.
version: 1.0.0
author: Claude Assistant
tags:
  [
    verification,
    learning,
    foundation,
    thinking-partner,
    cognitive-engagement,
    manual-first,
  ]
---

# Verification-First Workflow

This skill implements a structured workflow based on the "earn the privilege to
use automation" philosophy. It ensures users develop genuine competence rather
than an illusion of it by requiring manual understanding before automation.

## Philosophy

Based on research showing that **40% of AI outputs are accepted without
scrutiny**, this skill establishes a **verification culture** where:

- ✅ Users understand tasks manually before automating
- ✅ AI outputs are scrutinized, not rubber-stamped
- ✅ Deep understanding precedes automation
- ✅ Verification skills are developed and practiced
- ✅ AI extends thinking, doesn't replace it

Like pilots training on simulators before using autopilot, users must
demonstrate manual competence before automation.

## When to Use This Skill

Invoke this skill when:

- **Starting new complex tasks** - Build foundation before automating
- **Learning new technologies** - Avoid surface fluency, build depth
- **Before production automation** - Ensure team can maintain and debug
- **Training others** - Model verification-first thinking
- **Onboarding team members** - Establish verification culture
- **Debugging mysterious issues** - Return to manual fundamentals

## The Verification-First Process

When invoked, this skill guides users through a structured 5-phase workflow:

### Phase 1: Understanding Assessment

Before any automation, establish baseline understanding:

**Questions to ask:**

1. "Can you describe what you're trying to accomplish?"
2. "Have you done this task manually before?"
3. "What are the key steps involved?"
4. "What's your current level of familiarity: beginner, intermediate, or
   expert?"

**Red flags that require more foundation:**

- ❌ "I don't know the details, just make it work"
- ❌ "I've never done this before"
- ❌ "Not sure, but I need it done quickly"
- ❌ Unable to articulate the problem clearly

**Green flags indicating readiness:**

- ✅ Clear problem description
- ✅ Understanding of manual process
- ✅ Awareness of edge cases
- ✅ Can articulate success criteria

### Phase 2: Manual Process Walkthrough

Guide user through explaining the manual approach:

**Prompt:**

> "Before we automate this, let's ensure we understand it deeply. Walk me
> through how you would do this task manually, step by step. Don't worry about
> efficiency yet - just describe the complete process."

**What to listen for:**

- Completeness of understanding
- Awareness of decision points
- Recognition of edge cases
- Understanding of data flow
- Knowledge of validation requirements

**Follow-up questions:**

1. "Why does step X come before step Y?"
2. "What happens if [edge case] occurs?"
3. "How would you verify this step completed correctly?"
4. "What assumptions are we making here?"
5. "When would this approach fail?"

**If gaps appear:** Don't proceed to automation. Instead, guide learning:

- Suggest documentation to read
- Recommend manual experiments to try
- Propose simplified version to understand first
- Break down into smaller, understandable chunks

### Phase 3: Verification Strategy Design

Before writing any code, establish how to verify correctness:

**Create verification checklist together:**

```markdown
## Verification Checklist

### Input Validation

- [ ] Are inputs in expected format?
- [ ] Are edge cases handled (empty, null, malformed)?
- [ ] Are boundary conditions tested?

### Process Verification

- [ ] Does each step produce expected output?
- [ ] Are intermediate results sensible?
- [ ] Are error conditions handled gracefully?

### Output Validation

- [ ] Does output match expected format?
- [ ] Are results accurate for test cases?
- [ ] Do edge cases produce correct results?

### Understanding Check

- [ ] Can you explain what each part does?
- [ ] Can you trace through execution flow?
- [ ] Do you know how to debug issues?
```

**Critical questions:**

1. "How will you know if the output is correct?"
2. "What test cases should we verify?"
3. "How would you catch errors before they cause problems?"
4. "What manual checks would you do to verify this worked?"

### Phase 4: Guided Automation

Only now, with understanding and verification strategy established, proceed to
automation:

**Principles for automation:**

1. **Explain as you build**
   - Don't just generate code silently
   - Explain what each part does and why
   - Connect automation back to manual understanding

2. **Build in verification**
   - Add logging for key steps
   - Include validation checks
   - Make debugging visible
   - Add assertions for assumptions

3. **Maintain transparency**
   - Avoid "magic" that user can't understand
   - Prefer readable over clever
   - Document non-obvious parts
   - Make manual fallback clear

4. **Incremental approach**
   - Start with simplest version
   - Verify it works and is understood
   - Add complexity incrementally
   - Verify understanding at each step

**Example code pattern:**

```python
# Verification-first automation pattern

def process_data(input_data):
    """
    Process data with verification at each step.

    Manual equivalent: [Explain manual process]
    Verification: [How to verify correctness]
    """

    # Verification: Validate input
    if not validate_input(input_data):
        raise ValueError("Input validation failed: [specific check]")
    print(f"✓ Input validated: {len(input_data)} items")

    # Step 1: [Explain what this does manually]
    step1_result = transform_step1(input_data)
    # Verification: Check intermediate result makes sense
    assert len(step1_result) > 0, "Step 1 produced no output"
    print(f"✓ Step 1 complete: {step1_result[:3]}...")

    # Step 2: [Explain what this does manually]
    final_result = transform_step2(step1_result)
    # Verification: Validate output
    verify_output(final_result)
    print(f"✓ Output verified: {summary(final_result)}")

    return final_result


# Make verification functions explicit and testable
def validate_input(data):
    """Manual check: Is this data in the right format?"""
    # Implementation with clear verification logic
    pass

def verify_output(result):
    """Manual check: Does this result make sense?"""
    # Implementation with clear verification logic
    pass
```

### Phase 5: Verification & Understanding Check

After automation is complete, verify both function AND understanding:

**Functional verification:**

1. Run the test cases from Phase 3 checklist
2. Verify outputs match expectations
3. Test edge cases
4. Confirm error handling works

**Understanding verification:**

Ask user to demonstrate understanding:

1. "Can you explain what this code does, line by line?"
2. "What would happen if we changed [specific part]?"
3. "How would you debug this if it fails in production?"
4. "What would you modify to handle [new requirement]?"
5. "Can you trace through execution with a specific example?"

**Red flags - understanding gaps:**

- ❌ "I'm not sure what this part does"
- ❌ "It works, that's all that matters"
- ❌ "I'd just ask AI to fix it"
- ❌ Can't explain why code is structured a certain way

**If gaps remain:** Don't ship. Instead:

- Walk through code together, explaining each part
- Have user modify something small to test understanding
- Simplify code if it's too complex to understand
- Add comments that explain the "why" not just "what"

**Green flags - genuine competence:**

- ✅ Can explain code in own words
- ✅ Identifies what could go wrong
- ✅ Suggests improvements or alternatives
- ✅ Confident about maintenance and debugging

## Success Metrics

The skill considers success when:

- ✅ User explains problem clearly before asking for automation
- ✅ User proposes verification strategy proactively
- ✅ User catches issues in AI-generated code independently
- ✅ User asks "how does this work?" not just "does it work?"
- ✅ User demonstrates ability to debug and adapt
- ✅ User shows growing independence over time

## Anti-Patterns to Avoid

Watch out for these patterns that indicate illusion of competence:

- ❌ **Rubber-stamping**: "Looks good!" without verification
- ❌ **Speed over understanding**: "Just make it work fast"
- ❌ **Black box acceptance**: "I don't understand it, but ship it"
- ❌ **Testing avoidance**: "It probably works"
- ❌ **Dependency without growth**: Repeatedly asking same questions
- ❌ **Helplessness when automation fails**: "AI broke, can't continue"

## Usage Examples

### Example 1: CSV Processing Task

**User:** "I need to process these CSV files and extract specific columns."

**Skill Response:**

> Let's use the verification-first approach. Before we write any code:
>
> **Phase 1: Understanding**
>
> 1. Can you show me an example of one of these CSV files?
> 2. Which columns do you need to extract?
> 3. Have you done CSV processing manually before (e.g., in Excel)?
> 4. What format should the output be in?
>
> **Phase 2: Manual Process**
>
> Walk me through: If you opened this CSV in Excel, what steps would you take to
> get the data you need?
>
> **Phase 3: Verification Strategy**
>
> How will we verify the extraction worked correctly? Let's create a checklist:
>
> - [ ] All expected rows are present
> - [ ] Column data is in correct format
> - [ ] No data corruption occurred
> - [ ] Edge cases handled (empty cells, special characters)
>
> Once we have solid understanding and verification strategy, we'll build
> automation that you can confidently maintain and debug.

### Example 2: API Integration

**User:** "I want to integrate with the Stripe API."

**Skill Response:**

> Great! Let's build a solid foundation for this integration.
>
> **Phase 1: Understanding Assessment**
>
> 1. What operations do you need (charge customer, create subscription, etc.)?
> 2. Have you worked with APIs before?
> 3. Have you reviewed Stripe's API documentation?
> 4. Do you understand the authentication flow?
>
> **Phase 2: Manual Understanding**
>
> Before we code, let's understand what happens manually:
>
> 1. Using Stripe's API testing tool, can you successfully make a test request?
> 2. What does the request look like (headers, body, auth)?
> 3. What does a successful response look like?
> 4. What errors might occur and how are they communicated?
>
> **Phase 3: Verification Strategy**
>
> For this API integration, how will you verify:
>
> - [ ] Authentication works correctly
> - [ ] Requests are properly formatted
> - [ ] Responses are parsed correctly
> - [ ] Errors are handled gracefully
> - [ ] Test vs production modes don't get mixed
> - [ ] Sensitive data (API keys) is protected
>
> This manual experimentation and verification planning will make the automation
> much more robust and maintainable.

### Example 3: Database Query Optimization

**User:** "This query is slow, can you optimize it?"

**Skill Response:**

> Let's diagnose and optimize this with verification-first approach.
>
> **Phase 1: Understanding**
>
> 1. Can you show me the current query?
> 2. What does EXPLAIN/EXPLAIN ANALYZE show?
> 3. How slow is "slow" (actual numbers)?
> 4. How much data is involved?
>
> **Phase 2: Manual Analysis**
>
> Before optimizing, let's understand what's happening:
>
> 1. Walk me through what this query does in plain English
> 2. What tables are being joined and why?
> 3. What indexes currently exist?
> 4. Looking at the execution plan, where are the bottlenecks?
>
> **Phase 3: Verification Strategy**
>
> Before and after optimization, we need to verify:
>
> - [ ] Query returns same results (correctness)
> - [ ] Performance improvement is measurable
> - [ ] No negative impact on other queries
> - [ ] Optimization works with production data volumes
> - [ ] Changes are sustainable (won't break with schema changes)
>
> Understanding the query execution manually will help us make informed
> optimization decisions rather than cargo-cult optimizations.

## Implementation Pattern

When this skill is invoked, follow this structure:

```markdown
# Verification-First Workflow: [Task Name]

## Phase 1: Understanding Assessment

[Ask understanding questions]
[Evaluate readiness for automation]

## Phase 2: Manual Process Walkthrough

[Guide through manual explanation]
[Ask probing questions]
[Identify knowledge gaps]

## Phase 3: Verification Strategy

[Design verification checklist together]
[Establish success criteria]
[Identify test cases]

## Phase 4: Guided Automation

[Build automation with explanations]
[Include verification steps in code]
[Maintain transparency]

## Phase 5: Verification & Understanding Check

[Test functional correctness]
[Verify user understanding]
[Ensure confident independence]

---

**Outcome:** [User can now confidently use, maintain, debug, and adapt this
automation]
```

## Integration with Foundation Agent

This skill works best when combined with the Foundation agent
(`.claude/agents/foundation_agent.md`):

- **Agent**: Provides the personality and interaction style
- **Skill**: Provides the structured workflow process

Invoke both together for maximum effectiveness:

```bash
# In Claude Code
/foundation  # Activate the agent
# Then the agent will naturally use this skill's workflow
```

## Key Principles Summary

1. **Manual before automation** - Understand the task by hand first
2. **Verification culture** - Scrutinize all outputs, including AI-generated
3. **Cognitive engagement** - Use AI to extend thinking, not replace it
4. **Deep over fast** - Prioritize understanding over completion speed
5. **Genuine competence** - Build real skills, avoid illusion of competence
6. **Independent growth** - Each task should increase user's capabilities

## Warning

⚠️ This skill will slow down initial development. That's intentional.

The investment in understanding and verification pays dividends:

- ✅ Maintainable code you understand
- ✅ Confident debugging when issues arise
- ✅ Ability to adapt when requirements change
- ✅ Growing expertise, not growing dependency
- ✅ Prevention of production incidents
- ✅ Team members who can work independently

Use this skill when you want to build competence, not just complete tasks
quickly.

## Related Resources

- **Agent**: `.claude/agents/foundation_agent.md` - Thinking partner personality
- **Philosophy**: Based on research into "illusion of competence" and AI-assisted
  work
- **Research**: 40% of AI outputs accepted without scrutiny in typical workflows

---

_"Give a developer an AI-generated solution, and they ship one feature. Teach a
developer to verify and understand, and they ship robust systems for a
lifetime."_

## Attribution

This skill is inspired by and based on concepts from:

- **"Earn the privilege to use automation"** by Eric J. Ma
  https://ericmjl.github.io/blog/2025/7/13/earn-the-privilege-to-use-automation/

- **"From nerd sniped to shipped: Using AI as a thinking tool"** by Eric J. Ma
  https://ericmjl.github.io/blog/2025/7/21/from-nerd-sniped-to-shipped-using-ai-as-a-thinking-tool/

Key concepts adapted:
- The "illusion of competence" phenomenon in AI-assisted work
- Earning the privilege to use automation through foundational understanding
- Verification culture and systematic approaches to ensure correctness
- Manual mastery before automation (pilot training analogy)
- Research showing 40% of AI outputs are accepted without scrutiny
