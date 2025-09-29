# Testing

Testing strategies and tools for MCP servers and project components.

## Overview

This guide covers testing approaches for MCP servers, including interactive
testing with MCP Inspector, automated testing strategies, and validation
techniques.

## Testing Tools

### MCP Inspector

Primary tool for interactive testing and debugging:

- **Visual Interface**: Web-based testing environment
- **Real-time Debugging**: Monitor server communication
- **Tool Execution**: Test individual server tools
- **Resource Exploration**: Browse server capabilities

See [MCP Inspector Guide](./mcp-inspector/) for detailed usage.

### Automated Testing

```bash
# Code quality checks
bun run lint
bun run format

# Security scanning
bun run secrets

# Documentation validation
bun run lint:md
```

## Testing MCP Servers

### Interactive Testing

1. **Start Server**:

   ```bash
   bun run dev:mcp:sourcegraph
   ```

2. **Launch Inspector**:

   ```bash
   bun run inspector
   ```

3. **Test Scenarios**:
   - Connect to server
   - List available tools
   - Execute tools with various inputs
   - Verify expected outputs
   - Test error conditions

### Manual Testing Checklist

For each MCP server, verify:

- [ ] Server starts without errors
- [ ] All tools are listed correctly
- [ ] Tool schemas are valid
- [ ] Tools execute with valid inputs
- [ ] Error handling works properly
- [ ] Environment variables are respected
- [ ] Authentication works (if applicable)

### Example Test Cases

#### Sourcegraph Server

```bash
# Test basic search
search({
  query: "function main",
  num: 5
})

# Test advanced search with filters
search({
  query: "class Component lang:typescript",
  num: 10
})

# Test content fetching
fetch_content({
  repository: "/github.com/microsoft/vscode",
  path: "/src/main.ts"
})

# Test search guidance
search_prompt_guide({
  context: "API development"
})
```

#### GitLab Server

```bash
# Test project listing
gitlab_api_projects_list({
  owned: true,
  per_page: 10
})

# Test issue retrieval
gitlab_api_issues_list({
  project_id: "project-name",
  state: "opened"
})
```

## Validation Strategies

### Input Validation

Test tool inputs with:

- Valid parameters
- Invalid parameter types
- Missing required parameters
- Edge case values (empty strings, large numbers)
- Malformed data

### Output Validation

Verify tool outputs:

- Correct data structure
- Expected field types
- Error messages are helpful
- No sensitive data leakage

### Environment Testing

Test different environment configurations:

- Missing environment variables
- Invalid credentials
- Network connectivity issues
- Service unavailability

## Performance Testing

### Load Testing

For production deployments, consider:

- Multiple concurrent connections
- Large response handling
- Memory usage monitoring
- Response time measurement

### Monitoring

```bash
# Resource usage
top -p $(pgrep -f "mcp.*index.ts")

# Memory usage
ps aux | grep "mcp.*index.ts"

# Network connections
netstat -tulpn | grep :6274
```

## Error Testing

### Common Error Scenarios

1. **Authentication Failures**:
   - Invalid tokens
   - Expired credentials
   - Missing permissions

2. **Network Issues**:
   - Service unavailable
   - Timeout errors
   - Connection refused

3. **Input Validation**:
   - Invalid parameters
   - Type mismatches
   - Missing required fields

### Error Handling Verification

Ensure servers:

- Return meaningful error messages
- Don't expose sensitive information
- Handle errors gracefully
- Log errors appropriately

## Integration Testing

### Multi-Server Testing

Test interactions between:

- Multiple MCP servers
- External services (GitLab, Sourcegraph, etc.)
- Docker services (Redis, MinIO, SurrealDB)

### End-to-End Scenarios

Real-world workflow testing:

1. Search for code with Sourcegraph
2. Create GitLab issue for findings
3. Store results in MinIO
4. Cache frequently accessed data in Redis

## Continuous Integration

### Pre-commit Validation

Automated checks run on every commit:

```bash
# Triggered automatically by Lefthook
bun run pre-commit
```

### Manual CI Simulation

```bash
# Run all validation checks
bun run lint
bun run format
bun run secrets
bun run lint:md
bun run lint:json
bun run lint:yaml
```

## Troubleshooting Tests

### Debug Server Issues

1. **Enable Debug Logging**:

   ```bash
   DEBUG=mcp:* bun run dev:mcp:sourcegraph
   ```

2. **Check Server Output**:

   ```bash
   # Monitor server logs in real-time
   tail -f server.log
   ```

3. **Verify Environment**:

   ```bash
   # Check environment variables
   env | grep -E "(SRC_|GITLAB_|REDIS_|MINIO_)"
   ```

### Inspector Connection Issues

1. **Verify Server Status**:

   ```bash
   ps aux | grep "mcp.*index.ts"
   ```

2. **Check Port Usage**:

   ```bash
   lsof -i :6274
   ```

3. **Test Direct Connection**:

   ```bash
   curl http://localhost:6274
   ```

## Test Documentation

### Documenting Test Cases

For each server, maintain:

- Test case descriptions
- Expected inputs and outputs
- Error scenarios
- Performance benchmarks
- Known limitations

### Example Test Documentation

```markdown
## Sourcegraph Search Tests

### Test Case: Basic Search

- **Input**: `{ query: "function main", num: 5 }`
- **Expected**: List of 5 search results with file paths and line matches
- **Error Cases**: Invalid query syntax, server unavailable

### Test Case: Content Fetching

- **Input**: Valid repository and file path
- **Expected**: File content as string
- **Error Cases**: File not found, access denied, invalid path
```

## See Also

- [MCP Inspector](./mcp-inspector/) - Interactive testing tool
- [Development Workflow](./workflow/) - General development practices
- [Debugging Guide](./debugging/) - Troubleshooting techniques
