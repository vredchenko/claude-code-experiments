# Agents

Claude Code agents are specialized configurations that provide Claude with
specific personalities and capabilities for different use cases.

## Available Agents

### Grimface Agent

**Purpose**: Skeptical critical thinking agent for challenging assumptions and
stress-testing ideas

**Location**: `.claude/agents/grimface_agent.md`

**Use Cases**:

- Reality checks before major decisions
- Proposal reviews to find weaknesses
- Combating groupthink
- Assumption audits

**Warning**: The grimface agent is designed to be intellectually uncomfortable
and will challenge weak reasoning without sugar-coating feedback.

## Usage Tips

1. **Invoke grimface** when you need critical analysis of ideas
2. **Use before decisions** to identify potential flaws
3. **Deploy against consensus** when everyone agrees too easily
4. **Activate for reviews** to find weaknesses proactively

## Agent Development

Agents are defined as markdown files in the `.claude/agents/` directory. Each
agent includes:

- Personality definition
- Specific instructions
- Use case guidelines
- Behavioral parameters

To create a new agent, add a new `.md` file to the agents directory with
appropriate configuration.
