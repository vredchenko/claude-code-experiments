# Agor Quick Reference

## Essential Links

- **GitHub**: https://github.com/preset-io/agor
- **Website**: https://agor.live/
- **Documentation**: https://agor.live/ (docs section)
- **Issues**: https://github.com/preset-io/agor/issues

## Installation

```bash
# Global install (recommended for trying it out)
npm install -g agor-live

# Or with pnpm
pnpm add -g agor-live

# Initialize and start
agor init              # Creates ~/.agor/ database
agor daemon start      # Starts background service
agor open             # Opens web UI
```

## Development Setup

```bash
# Clone and setup
git clone https://github.com/preset-io/agor.git
cd agor
pnpm install

# Terminal 1: Backend (port 3030)
cd apps/agor-daemon
pnpm dev

# Terminal 2: Frontend (port 5173)
cd apps/agor-ui
pnpm dev
```

## Key Commands

```bash
# Daemon management
agor daemon start      # Start daemon
agor daemon stop       # Stop daemon
agor daemon status     # Check status
agor daemon restart    # Restart daemon

# UI
agor open             # Open web interface

# Worktree management (likely)
agor worktree create  # Create new worktree
agor worktree list    # List worktrees
```

## Core Concepts

### Worktrees
- Isolated dev environments linked to GitHub issues/PRs
- Each gets unique branch, port, resources
- Move between zones on canvas

### Zones
- Spatial regions that trigger actions
- Use templated prompts: `{{ worktree.issue_url }}`
- Common zones: analyze, develop, test, review, deploy

### Sessions
- Individual AI agent conversations
- Can fork, spawn, terminate
- Visualized as trees

### Canvas
- 2D Figma-like interface
- Real-time multiplayer
- Drag-and-drop workflow

## Zone Template Examples

### Analysis Zone
```
Analyze this issue and provide implementation approach: {{ worktree.issue_url }}

Consider:
- Technical approach
- Potential challenges
- Testing strategy
- Time estimate
```

### Development Zone
```
Implement the solution for: {{ worktree.issue_url }}

Requirements:
- Follow existing code patterns
- Add comprehensive tests
- Update documentation
- Run linters and formatters
```

### Review Zone
```
Review the code changes in this worktree.

Check for:
- [ ] Security vulnerabilities
- [ ] Test coverage
- [ ] Code quality
- [ ] Documentation
- [ ] Performance issues

Provide detailed feedback.
```

### Deploy Zone
```
Prepare for deployment:

1. Run all tests
2. Update CHANGELOG
3. Create PR description
4. Push to GitHub
5. Notify team
```

## Workflow Pattern Examples

### Bug Fix Pipeline
```
Issue → Analyze Zone → Develop Zone → Test Zone → Review Zone → Deploy Zone
```

### Feature Development
```
Issue → Plan Zone → [Frontend Worktree + Backend Worktree] → Integration Zone → QA Zone → Deploy Zone
```

### Documentation Update
```
[Doc1 + Doc2 + Doc3] → Parallel Edit → Consistency Check → Review → Merge
```

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React |
| Backend | FeathersJS (Node.js) |
| Database | LibSQL (SQLite-like) |
| ORM | Drizzle |
| Real-time | WebSocket |
| Protocol | MCP (JSON-RPC 2.0) |
| CLI | oclif |
| Monorepo | pnpm + Turbo |
| Language | TypeScript (93.6%) |

## Port Assignments

- **Daemon**: 3030 (default)
- **UI**: 5173 (dev mode)
- **Worktrees**: Auto-assigned unique ports

## File Locations

```bash
~/.agor/              # Agor data directory
~/.agor/database      # Local database
~/.agor/config        # Configuration (likely)
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill existing daemon
agor daemon stop

# Or find and kill process
lsof -i :3030
kill -9 <PID>
```

### Database Corruption
```bash
# Backup first
cp ~/.agor/database ~/.agor/database.backup

# Reinitialize
agor init --force
```

### Agent Connection Issues
- Check API keys/tokens are set
- Verify Claude Code configuration
- Check network connectivity
- Review daemon logs

## Performance Tips

### Resource Management
- Close unused sessions
- Clean up old worktrees
- Monitor memory usage: `agor daemon status`

### Optimization
- Use zones for automation (reduce manual prompts)
- Fork sessions instead of starting fresh
- Batch similar tasks in parallel

## Integration Ideas

### With This Repository

**MCP Servers**:
- Could Agor use our GitLab MCP?
- Store sessions in SurrealDB?
- Integrate Sourcegraph for code search?

**Agents**:
- Foundation Agent: Verify Agor workflows
- Grimface Agent: Challenge assumptions
- AI Security Agents: Assess multi-agent risks

**Skills**:
- Verification-First: Apply to Agor setup
- Playwright: Test Agor UI
- AI Security Assessment: Evaluate coordination risks

## Metrics to Track

### Performance
- Concurrent agents supported
- Memory per agent
- Response time
- Resource usage

### Productivity
- Time saved vs traditional
- Context switches reduced
- Tasks completed in parallel
- Setup time per workflow

### Quality
- Code quality scores
- Error rates
- Test coverage
- Security issues

## Next Steps

1. **Read**: `OVERVIEW.md` for comprehensive background
2. **Plan**: Review `EXPERIMENTATION.md` for structured approach
3. **Install**: Follow installation steps above
4. **Experiment**: Start with Phase 1 tasks
5. **Document**: Create `SETUP-NOTES.md` with your findings

## Useful Searches

```bash
# In the agor repository
cd agor

# Find zone examples
grep -r "zone" apps/agor-ui/

# Find template examples
grep -r "template" apps/

# Find MCP protocol usage
grep -r "mcp" apps/agor-daemon/

# Find worktree management
grep -r "worktree" apps/
```

## Questions for Exploration

- How does authentication work with GitHub?
- What Claude Code configuration is needed?
- Can we use custom MCP servers?
- What's the agent limit in practice?
- How does mobile workflow really work?
- Can zones have conditionals/branching?
- How to handle agent failures mid-pipeline?
- What's the coordination overhead?

---

**Pro Tip**: Start simple! Create one worktree, one zone, one session. Get comfortable with the basics before trying multi-agent coordination.

**Remember**: Agor is actively developed (866+ commits). If you hit issues, check GitHub issues or contribute back!
