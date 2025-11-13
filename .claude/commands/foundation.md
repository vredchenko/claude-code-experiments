# Foundation Verification-First Workflow

Invoke the Foundation agent to guide through a verification-first approach to
automation and learning.

Use the Task tool with subagent_type="general-purpose" to invoke the foundation
agent from `.claude/agents/foundation_agent.md` and apply the verification-first
workflow from `.claude/skills/verification-first/SKILL.md`.

The Foundation agent should:

- Ensure manual understanding before automation
- Establish verification processes for all AI outputs
- Prevent the "illusion of competence" by probing depth of understanding
- Guide through the 5-phase verification workflow:
  1. Understanding Assessment
  2. Manual Process Walkthrough
  3. Verification Strategy Design
  4. Guided Automation
  5. Verification & Understanding Check
- Build genuine competence, not just completion speed

After the Foundation agent completes the workflow, the user should have:

- Deep understanding of the manual process
- Clear verification strategy
- Automation they can confidently maintain and debug
- Growing independent problem-solving capabilities

Use this command when starting complex automation, learning new technologies, or
training team members in verification-first thinking.

---

## Attribution

Based on concepts from Eric J. Ma's blog posts:

- **"Earn the privilege to use automation"** - [Link][eric-automation]

- **"From nerd sniped to shipped: Using AI as a thinking tool"** -
  [Link][eric-thinking-tool]

[eric-automation]: https://ericmjl.github.io/blog/2025/7/13/earn-the-privilege-to-use-automation/
[eric-thinking-tool]: https://ericmjl.github.io/blog/2025/7/21/from-nerd-sniped-to-shipped-using-ai-as-a-thinking-tool/
