# Claude Code Hooks Configuration

This document contains recommended hooks for this project. To enable these
hooks, add them to your Claude Code settings.

## Location

Claude Code settings are stored at:

- `~/.config/claude-cli-nodejs/settings.local.json` (user-level settings)
- Or use project-specific settings if supported

## Recommended Hooks

### 1. User Prompt Submit Hook - Lint on Commit Intent

Automatically run lefthook pre-commit checks when you ask Claude to commit/push
code:

```json
{
  "hooks": {
    "userPromptSubmit": "if echo \"$PROMPT\" | grep -qi 'commit\\|push\\|pr\\|pull request'; then bunx lefthook run pre-commit; fi"
  }
}
```

**What it does**: Detects when you ask to commit/push and runs your linters and
checks first.

### 2. Pre-Tool Hook - Environment Check

Ensure `.env` file exists before running bash commands:

```json
{
  "hooks": {
    "preTool": {
      "Bash": "if [ ! -f .env ] && [ ! -f .env.local ]; then echo '⚠ Warning: .env file missing. Run: bun run start'; fi"
    }
  }
}
```

**What it does**: Warns if environment configuration is missing.

### 3. Post-Tool Hook - MCP Server Auto-Recovery

Auto-restart unhealthy docker services after tasks complete:

```json
{
  "hooks": {
    "postTool": {
      "Task": "if [ -f docker-compose.yml ]; then docker compose ps --format json 2>/dev/null | grep -q '\"Health\":\"unhealthy\"' && echo '🔄 Restarting unhealthy services...' && docker compose restart; fi"
    }
  }
}
```

**What it does**: Automatically recovers unhealthy MCP backend services.

## Complete Configuration Example

To enable all hooks, merge this into your `settings.local.json`:

```json
{
  "hooks": {
    "userPromptSubmit": "if echo \"$PROMPT\" | grep -qi 'commit\\|push\\|pr\\|pull request'; then bunx lefthook run pre-commit; fi",
    "preTool": {
      "Bash": "if [ ! -f .env ] && [ ! -f .env.local ]; then echo '⚠ Warning: .env file missing. Run: bun run start'; fi"
    },
    "postTool": {
      "Task": "if [ -f docker-compose.yml ]; then docker compose ps --format json 2>/dev/null | grep -q '\"Health\":\"unhealthy\"' && echo '🔄 Restarting unhealthy services...' && docker compose restart; fi"
    }
  }
}
```

## Installation

1. Open your Claude Code settings:

   ```bash
   # Settings location
   ~/.config/claude-cli-nodejs/settings.local.json
   ```

2. Add the hooks configuration from above

3. Restart Claude Code or start a new session

## Testing Hooks

After installation:

- Test commit hook: Ask "please commit these changes"
- Test env check: Remove `.env` temporarily and run a bash command
- Test auto-recovery: Stop a docker service and run `/mcp-health`

## Notes

- Hooks run in your shell environment and have access to environment variables
- `$PROMPT` variable contains the user's input in `userPromptSubmit` hooks
- Use non-zero exit codes in `preTool` hooks to block tool execution
- `postTool` hooks run after successful tool execution
