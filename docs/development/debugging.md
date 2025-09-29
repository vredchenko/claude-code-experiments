# Debugging

Debugging techniques and troubleshooting guides for MCP servers and project
components.

## Overview

This guide provides debugging strategies, common issue resolutions, and
troubleshooting techniques for the Claude Code Experiments project.

## Debugging Tools

### MCP Inspector

Primary debugging tool for MCP servers:

- **Real-time Communication**: Monitor server requests/responses
- **Error Visualization**: See detailed error messages and stack traces
- **Interactive Testing**: Test server tools step-by-step
- **Connection Diagnostics**: Verify server connectivity

### Logging

Enable detailed logging for servers:

```bash
# Debug all MCP-related logs
DEBUG=mcp:* bun run dev:mcp:sourcegraph

# Server-specific debugging
DEBUG=sourcegraph:* bun run dev:mcp:sourcegraph

# Multiple debug patterns
DEBUG=mcp:*,sourcegraph:*,redis:* bun run dev:mcp:redis
```

### System Monitoring

```bash
# Process monitoring
ps aux | grep -E "(bun|mcp)"

# Resource usage
top -p $(pgrep -f "mcp.*index.ts")

# Network connections
netstat -tulpn | grep -E "(6274|3005)"

# Port usage
lsof -i :6274
lsof -i :3005
```

## Common Issues

### Server Startup Problems

#### Issue: Server Won't Start

**Symptoms**:

- Error messages during startup
- Process exits immediately
- "Module not found" errors

**Debugging Steps**:

1. **Check Dependencies**:

   ```bash
   bun install
   ```

2. **Verify File Paths**:

   ```bash
   ls -la mcp/sourcegraph/index.ts
   ```

3. **Check Syntax**:

   ```bash
   bun run --dry-run mcp/sourcegraph/index.ts
   ```

4. **Environment Variables**:

   ```bash
   env | grep -E "(SRC_|GITLAB_|REDIS_|MINIO_)"
   ```

#### Issue: Port Already in Use

**Symptoms**:

- "EADDRINUSE" errors
- "Port already in use" messages

**Resolution**:

1. **Find Process Using Port**:

   ```bash
   lsof -i :6274
   netstat -tulpn | grep :6274
   ```

2. **Kill Process**:

   ```bash
   kill -9 $(lsof -t -i:6274)
   ```

3. **Use Different Port**:

   ```bash
   MCP_INSPECTOR_PORT=6275 bun run inspector
   ```

### Connection Issues

#### Issue: Inspector Can't Connect to Server

**Symptoms**:

- "Connection refused" in Inspector
- Timeout errors
- Server appears to be running but unreachable

**Debugging Steps**:

1. **Verify Server Status**:

   ```bash
   ps aux | grep "mcp.*sourcegraph"
   ```

2. **Check Server Logs**:

   ```bash
   # Look for error messages in server output
   DEBUG=* bun run dev:mcp:sourcegraph
   ```

3. **Test Transport Method**:

   ```bash
   # For stdio transport, ensure server is reading from stdin
   echo '{"jsonrpc": "2.0", "method": "ping", "id": 1}' | bun run mcp/sourcegraph/index.ts
   ```

4. **Verify Inspector Configuration**:

   ```bash
   cat .devtooling/configs/mcp-inspector.json
   ```

### Authentication Issues

#### Issue: API Authentication Failures

**Symptoms**:

- 401/403 HTTP errors
- "Unauthorized" messages
- Tool execution failures

**Resolution**:

1. **Check Environment Variables**:

   ```bash
   echo "GitLab Token: ${GITLAB_TOKEN:0:10}..."
   echo "Sourcegraph Token: ${SRC_ACCESS_TOKEN:0:10}..."
   ```

2. **Validate Tokens**:

   ```bash
   # Test GitLab token
   curl -H "Authorization: Bearer $GITLAB_TOKEN" \
        "https://gitlab.com/api/v4/user"

   # Test Sourcegraph access (if using private instance)
   curl -H "Authorization: token $SRC_ACCESS_TOKEN" \
        "$SRC_ENDPOINT/.api/search?q=test"
   ```

3. **Check Token Permissions**:
   - Ensure tokens have required scopes
   - Verify token hasn't expired
   - Check if 2FA is required

### Tool Execution Failures

#### Issue: Tool Returns Errors

**Symptoms**:

- Tool execution fails in Inspector
- Error messages in server logs
- Unexpected tool responses

**Debugging Steps**:

1. **Validate Input Parameters**:

   ```bash
   # Check tool schema requirements
   # Use Inspector to see exact parameter format
   ```

2. **Test with Minimal Input**:

   ```bash
   # Start with simplest possible parameters
   # Gradually add complexity
   ```

3. **Check External Service Status**:

   ```bash
   # Test service availability
   curl -I https://sourcegraph.com
   curl -I https://gitlab.com
   ```

4. **Review Server Implementation**:

   ```typescript
   // Check error handling in server code
   // Verify parameter validation
   // Look for null/undefined checks
   ```

### Performance Issues

#### Issue: Slow Response Times

**Symptoms**:

- Tools take long time to execute
- Inspector timeouts
- High resource usage

**Debugging Steps**:

1. **Monitor Resource Usage**:

   ```bash
   # CPU and memory usage
   top -p $(pgrep -f "mcp.*index.ts")

   # Network activity
   iotop -ao
   ```

2. **Check Network Latency**:

   ```bash
   # Test external service response times
   time curl -I https://sourcegraph.com
   time curl -I https://gitlab.com
   ```

3. **Profile Server Performance**:

   ```bash
   # Use Node.js profiling
   NODE_OPTIONS="--prof" bun run mcp/sourcegraph/index.ts
   ```

## Environment-Specific Debugging

### Docker Services

#### Issue: Docker Services Not Available

**Debugging**:

1. **Check Service Status**:

   ```bash
   docker compose ps
   docker compose logs redis
   docker compose logs minio
   ```

2. **Restart Services**:

   ```bash
   docker compose down
   docker compose up -d
   ```

3. **Check Port Conflicts**:

   ```bash
   docker compose port redis 6379
   docker compose port minio 9000
   ```

### Development Environment

#### Issue: Inconsistent Behavior

**Common Causes**:

- Cached files or dependencies
- Environment variable conflicts
- Version mismatches

**Resolution**:

1. **Clean and Reinstall**:

   ```bash
   rm -rf node_modules
   rm bun.lockb
   bun install
   ```

2. **Reset Environment**:

   ```bash
   # Restart shell or reload environment
   source ~/.bashrc
   # Or reload .env file
   set -a && source .env && set +a
   ```

3. **Verify Versions**:

   ```bash
   bun --version
   node --version
   docker --version
   ```

## Advanced Debugging

### Network Debugging

#### Monitor HTTP Traffic

```bash
# Use tcpdump to monitor network traffic
sudo tcpdump -i any -A port 6274

# Monitor specific hosts
sudo tcpdump -i any host sourcegraph.com
```

#### Debug TLS/SSL Issues

```bash
# Test SSL connectivity
openssl s_client -connect sourcegraph.com:443

# Check certificate details
curl -vI https://sourcegraph.com
```

### Memory Debugging

#### Monitor Memory Usage

```bash
# Detailed memory info
cat /proc/$(pgrep -f "mcp.*index.ts")/status

# Memory maps
cat /proc/$(pgrep -f "mcp.*index.ts")/maps
```

#### Detect Memory Leaks

```bash
# Use Node.js heap snapshots
NODE_OPTIONS="--inspect" bun run mcp/sourcegraph/index.ts
# Then connect Chrome DevTools to inspect memory
```

### Process Debugging

#### Attach Debugger

```bash
# Enable Node.js inspector
NODE_OPTIONS="--inspect=0.0.0.0:9229" bun run mcp/sourcegraph/index.ts

# For debugging on startup
NODE_OPTIONS="--inspect-brk=0.0.0.0:9229" bun run mcp/sourcegraph/index.ts
```

#### Stack Traces

```bash
# Get stack trace of running process
kill -USR1 $(pgrep -f "mcp.*index.ts")

# Enable core dumps
ulimit -c unlimited
```

## Debugging Checklist

### Before Starting

- [ ] All dependencies installed (`bun install`)
- [ ] Environment variables configured
- [ ] Docker services running (if needed)
- [ ] No port conflicts

### During Debugging

- [ ] Enable debug logging
- [ ] Use MCP Inspector for real-time monitoring
- [ ] Check server and service logs
- [ ] Monitor resource usage
- [ ] Test with minimal configurations

### After Resolution

- [ ] Document the issue and solution
- [ ] Add preventive measures if possible
- [ ] Update troubleshooting guides
- [ ] Consider adding automated tests

## Getting Help

### Information to Collect

When reporting issues:

1. **Environment Details**:

   ```bash
   bun --version
   node --version
   uname -a
   ```

2. **Error Messages**:
   - Complete error output
   - Stack traces
   - Server logs

3. **Configuration**:
   - Environment variables (redacted)
   - MCP Inspector config
   - Docker compose status

4. **Reproduction Steps**:
   - Exact commands used
   - Input parameters
   - Expected vs actual behavior

### Resources

- [MCP Inspector Documentation](./mcp-inspector/)
- [Development Workflow](./workflow/)
- [Testing Guide](./testing/)
- [Project Issues](https://github.com/vredchenko/claude-code-experiments/issues)

## See Also

- [MCP Inspector](./mcp-inspector/) - Primary debugging tool
- [Testing](./testing/) - Testing strategies and validation
- [Development Workflow](./workflow/) - Standard practices
