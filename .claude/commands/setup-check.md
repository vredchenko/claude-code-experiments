# Development Environment Setup Check

Verify that the development environment is properly configured.

Check the following in order:

1. **Configuration Files**
   - Verify `.env` exists and has required variables (GITLAB*TOKEN, MINIO\*\*,
     REDIS\_*, SURREALDB\_\*)
   - Verify `mcp-servers-config.json` exists
   - Check if templates exist (`.env.template`,
     `mcp-servers-config.template.json`)

2. **Runtime Dependencies**
   - Check `bun --version` (bun.js installation)
   - Check `docker --version` and `docker compose version`
   - Verify docker daemon is running with `docker ps`

3. **MCP CLI Tools**
   - Check `glab --version` (GitLab CLI)
   - Check `karakeep --version` (Karakeep CLI)
   - Note: Some tools are optional but should be reported if missing

4. **Docker Services**
   - Run `docker compose ps` to check service status
   - List running containers and their health

5. **Project Dependencies**
   - Check if `node_modules` exists (dependencies installed)
   - Verify `package.json` and `bun.lock` are present

Provide a summary report with:

- ✓ for items that are properly configured
- ✗ for missing or broken items
- Suggestions for fixing any issues found
