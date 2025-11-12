# Agor Experimentation Plan

## Phase 1: Setup and Basic Exploration (Day 1-2)

### Goals
- Get Agor running locally
- Understand the UI and core concepts
- Successfully create first worktree + session

### Tasks

#### 1.1 Installation
```bash
# Try global installation first
npm install -g agor-live
# Or: pnpm add -g agor-live

# Initialize
agor init
agor daemon start
agor open
```

**Success Criteria**:
- [ ] Daemon starts without errors
- [ ] Web UI opens and loads
- [ ] Database created at ~/.agor/

#### 1.2 Development Setup (if global fails)
```bash
# Clone repository
git clone https://github.com/preset-io/agor.git
cd agor
pnpm install

# Start services
# Terminal 1:
cd apps/agor-daemon && pnpm dev

# Terminal 2:
cd apps/agor-ui && pnpm dev
```

**Success Criteria**:
- [ ] Backend runs on port 3030
- [ ] Frontend runs on port 5173
- [ ] Can access http://localhost:5173

#### 1.3 First Worktree
- [ ] Connect GitHub account (if needed)
- [ ] Create first worktree linked to a test issue
- [ ] Observe automatic branch creation
- [ ] Check port allocation

#### 1.4 First Session
- [ ] Spawn Claude Code session
- [ ] Send simple prompt
- [ ] Observe response in UI
- [ ] Test session fork/spawn capabilities

### Questions to Answer
- How does authentication work?
- What permissions does Agor need?
- How are Claude Code sessions connected?
- What's the initial learning curve?

---

## Phase 2: Zone-Based Workflows (Day 3-5)

### Goals
- Create custom workflow zones
- Test templated prompts
- Build automation pipeline

### Tasks

#### 2.1 Create Analysis Zone
```text
Template: "Analyze this issue and provide implementation approach: {{ worktree.issue_url }}"
```

**Test**:
- [ ] Drop worktree into zone
- [ ] Verify prompt triggers automatically
- [ ] Observe agent response
- [ ] Assess quality of analysis

#### 2.2 Create Development Zone
```text
Template: "Implement the solution for: {{ worktree.issue_url }}. Follow these coding standards: [standards]. Run tests after implementation."
```

**Test**:
- [ ] Move worktree from analysis to development
- [ ] Watch agent implement solution
- [ ] Verify isolation (ports, branches)
- [ ] Check test execution

#### 2.3 Create Review Zone
```text
Template: "Review the code changes in this worktree. Check for: security issues, test coverage, code quality, documentation. Provide detailed feedback."
```

**Test**:
- [ ] Move worktree to review zone
- [ ] Agent performs code review
- [ ] Fork session to explore alternative implementation
- [ ] Compare approaches

#### 2.4 Create Deploy Zone
```text
Template: "Prepare this worktree for deployment: run final tests, update changelog, create PR description, push to GitHub."
```

**Test**:
- [ ] Final zone in pipeline
- [ ] Agent handles PR creation
- [ ] Verify GitHub integration
- [ ] Check PR quality

### Questions to Answer
- What's the optimal zone structure?
- How do you handle failures in zones?
- Can zones have conditionals?
- How to handle agent errors mid-pipeline?

---

## Phase 3: Multi-Agent Coordination (Day 6-8)

### Goals
- Run multiple agents simultaneously
- Test resource isolation
- Coordinate complex feature work

### Tasks

#### 3.1 Parallel Simple Tasks
**Scenario**: 3 independent bug fixes

- [ ] Create 3 worktrees for 3 different bugs
- [ ] Spawn 3 Claude Code sessions
- [ ] Run all simultaneously
- [ ] Verify no port conflicts
- [ ] Measure completion time vs sequential

#### 3.2 Frontend + Backend Split
**Scenario**: Feature requiring both frontend and backend changes

- [ ] Worktree 1: Frontend implementation
- [ ] Worktree 2: Backend API
- [ ] Coordinate: Ensure API contract matches
- [ ] Test: Integration between both
- [ ] Merge strategy

#### 3.3 Agent Supervision
**Scenario**: One agent coordinates multiple specialized agents

- [ ] Supervisor agent: Plans and delegates
- [ ] Agent 1: Handles database changes
- [ ] Agent 2: Handles API layer
- [ ] Agent 3: Handles frontend
- [ ] Supervisor: Reviews and integrates

#### 3.4 Session Trees
- [ ] Create parent session
- [ ] Spawn 3 child sessions for exploration
- [ ] Compare approaches
- [ ] Select best approach
- [ ] Continue with winning session

### Questions to Answer
- How many concurrent agents is practical?
- What's the coordination overhead?
- When does human intervention help?
- Best practices for agent delegation?
- How to handle conflicting agent changes?

---

## Phase 4: Real-World Integration (Day 9-12)

### Goals
- Integrate Agor into this repository's workflow
- Test with actual feature development
- Evaluate productivity impact

### Tasks

#### 4.1 MCP Server Development
**Use Case**: Develop a new MCP server with Agor

- [ ] Create worktree for new MCP server
- [ ] Use zones: plan → implement → test → document
- [ ] Track time savings vs manual approach
- [ ] Document pain points

#### 4.2 Multi-File Feature
**Use Case**: Feature spanning agents, skills, docs

- [ ] Complex feature requiring coordination
- [ ] Use multiple agents for different files
- [ ] Test zone-based workflow
- [ ] Measure productivity gains

#### 4.3 Documentation Update
**Use Case**: Update AI security docs across multiple files

- [ ] Multiple worktrees for different doc files
- [ ] Parallel updates
- [ ] Consistency checking agent
- [ ] Final review zone

#### 4.4 Mobile Workflow Test
- [ ] Start long-running task on desktop
- [ ] Monitor progress on mobile
- [ ] Send correction prompt from mobile
- [ ] Verify completion
- [ ] Assess mobile UX

### Questions to Answer
- Is Agor worth the overhead for this project?
- What workflows benefit most?
- Where does it add friction?
- Mobile: genuinely useful or gimmick?

---

## Phase 5: Advanced Patterns (Day 13-15)

### Goals
- Push Agor's limits
- Discover optimal patterns
- Document best practices

### Tasks

#### 5.1 Custom MCP Integration
**Explore**: Can we integrate our existing MCP servers?

- [ ] Research Agor's MCP protocol usage
- [ ] Attempt to connect GitLab MCP
- [ ] Try SurrealDB for session storage
- [ ] Test Sourcegraph integration

#### 5.2 Agent-to-Agent Communication
- [ ] Set up direct agent messaging
- [ ] Test coordination protocols
- [ ] Measure overhead vs sequential
- [ ] Document communication patterns

#### 5.3 Workflow Templates
**Create reusable templates for**:
- [ ] Bug fix pipeline
- [ ] Feature development pipeline
- [ ] Documentation update pipeline
- [ ] Security assessment pipeline
- [ ] Refactoring pipeline

#### 5.4 Performance Benchmarking
- [ ] 5 agents: resource usage, completion time
- [ ] 10 agents: stress test
- [ ] 20 agents: breaking point
- [ ] Document hardware requirements
- [ ] Identify bottlenecks

### Questions to Answer
- What's the practical agent limit?
- When to use Agor vs traditional approach?
- Best patterns for different task types?
- How to version control Agor configs?

---

## Phase 6: Security and Team Evaluation (Day 16-18)

### Goals
- Security assessment of multi-agent approach
- Team collaboration evaluation
- Decision: adopt or not?

### Tasks

#### 6.1 Security Assessment
**Use AI Security Agents/Skills**:
- [ ] ATLAS threat model for multi-agent setup
- [ ] Analyze agent isolation security
- [ ] Review GitHub token handling
- [ ] Assess data exposure risks
- [ ] Document security recommendations

#### 6.2 Team Collaboration Test
**If possible with team members**:
- [ ] Multi-user session
- [ ] Real-time collaboration
- [ ] Communication patterns
- [ ] Conflict resolution
- [ ] Gather feedback

#### 6.3 Cost-Benefit Analysis
**Document**:
- [ ] Setup time investment
- [ ] Learning curve steepness
- [ ] Productivity gains (quantified)
- [ ] Friction points
- [ ] Maintenance overhead
- [ ] Token usage vs traditional

#### 6.4 Final Decision
- [ ] Write comprehensive evaluation
- [ ] Pros and cons list
- [ ] Recommendation: adopt, experiment further, or abandon
- [ ] If adopt: integration plan
- [ ] If abandon: lessons learned

---

## Metrics to Track

### Performance Metrics
- Agent response time
- Concurrent agent count
- Memory usage per agent
- CPU usage during multi-agent work
- Time to complete tasks (Agor vs traditional)

### Quality Metrics
- Code quality of agent outputs
- Error rate in automated workflows
- Test coverage of agent-generated code
- Security issues introduced
- Documentation quality

### Productivity Metrics
- Setup time per workflow
- Time saved on repetitive tasks
- Context switching reduction
- Parallel work efficiency
- Human intervention frequency

### UX Metrics
- Learning curve duration
- UI responsiveness
- Mobile usability
- Error recovery experience
- Overall satisfaction

---

## Success Criteria

### Minimum Viable Success
- [ ] Successfully run 3+ concurrent agents
- [ ] Complete at least one real feature using Agor
- [ ] Zone-based automation working reliably
- [ ] No major security concerns

### Ideal Success
- [ ] 10+ concurrent agents work smoothly
- [ ] 30%+ productivity gain on complex tasks
- [ ] Seamless integration with existing workflow
- [ ] Mobile workflow genuinely useful
- [ ] Team collaboration effective
- [ ] Clear best practices documented

### Red Flags (Consider Abandoning If...)
- Constant crashes or instability
- Agent isolation fails (conflicts)
- Learning curve > 2 weeks
- No measurable productivity gains
- Security concerns cannot be mitigated
- More friction than traditional approach

---

## Documentation to Create

### During Experimentation
- [ ] `SETUP-NOTES.md` - Installation issues and solutions
- [ ] `WORKFLOW-PATTERNS.md` - Effective zone templates and patterns
- [ ] `TROUBLESHOOTING.md` - Common issues and fixes
- [ ] `PERFORMANCE.md` - Benchmarks and optimization tips

### After Experimentation
- [ ] `EVALUATION.md` - Comprehensive assessment
- [ ] `BEST-PRACTICES.md` - Recommended usage patterns
- [ ] `INTEGRATION-GUIDE.md` - How to adopt in projects
- [ ] `LESSONS-LEARNED.md` - Key insights and gotchas

---

## Integration with Repository

### Potential Additions to CLAUDE.md
If Agor proves valuable:

```markdown
## Agor Integration

- **Location**: `research/agor/`
- **Purpose**: Multi-agent coordination platform for parallel AI development
- **Use Cases**:
  - Complex features requiring frontend + backend work
  - Parallel bug fixes
  - Documentation updates across multiple files
  - Agent supervision and coordination
- **Setup**: See `research/agor/SETUP-NOTES.md`
- **Patterns**: See `research/agor/WORKFLOW-PATTERNS.md`
```

### New Agent Possibilities
- **Agor Supervisor Agent**: Coordinates multiple Claude Code sessions
- **Workflow Orchestrator Agent**: Manages zone-based pipelines

### New Skill Possibilities
- **Multi-Agent Coordination Skill**: Step-by-step guide for using Agor
- **Parallel Development Skill**: Patterns for splitting work across agents

---

## Timeline Overview

| Phase | Duration | Focus |
|-------|----------|-------|
| 1 | Day 1-2 | Setup, basics |
| 2 | Day 3-5 | Zone workflows |
| 3 | Day 6-8 | Multi-agent |
| 4 | Day 9-12 | Real work |
| 5 | Day 13-15 | Advanced |
| 6 | Day 16-18 | Evaluation |

**Total**: ~3 weeks for comprehensive evaluation

---

## Quick Start Checklist

When you're ready to start:

- [ ] Install Agor: `npm install -g agor-live`
- [ ] Initialize: `agor init && agor daemon start && agor open`
- [ ] Read: `OVERVIEW.md` for background
- [ ] Follow: Phase 1 tasks in this document
- [ ] Document: Create `SETUP-NOTES.md` for your experience
- [ ] Experiment: Don't be afraid to break things!

---

**Happy experimenting!** This looks like a genuinely innovative tool. Looking forward to seeing what you discover! 🚀
