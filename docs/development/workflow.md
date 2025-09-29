# Development Workflow

Standard development practices and workflows for the Claude Code Experiments
project.

## Overview

This guide covers the recommended development workflow for contributing to the
project, including coding standards, testing procedures, and deployment
practices.

## Getting Started

### Prerequisites

- **Node.js**: Version 22.7.5 or higher
- **Bun**: Latest stable version
- **Docker**: For running development services
- **Git**: For version control

### Environment Setup

1. **Clone and Setup**:

   ```bash
   git clone <repository-url>
   cd claude-code-experiments
   bun install
   ```

2. **Environment Configuration**:

   ```bash
   cp .env.template .env
   # Edit .env with your specific configuration
   ```

3. **Start Development Services**:

   ```bash
   bun run docker:up
   ```

## Development Process

### 1. Branch Management

- Create feature branches from `main`
- Use descriptive branch names: `feature/add-mcp-server`, `fix/redis-connection`
- Keep branches focused on single features or fixes

### 2. Code Standards

- **Linting**: Code is automatically linted with Biome
- **Formatting**: Prettier handles code formatting
- **TypeScript**: Strict type checking enabled
- **Markdown**: Documentation follows markdownlint rules

### 3. Pre-commit Hooks

The project uses Lefthook for pre-commit validation:

- Markdown linting and formatting
- JSON/YAML validation
- Secret scanning with Gitleaks
- TypeScript compilation checks

## Testing

### MCP Server Testing

Use MCP Inspector for interactive testing:

```bash
# Start a server
bun run dev:mcp:sourcegraph

# Launch inspector in another terminal
bun run inspector
```

### Automated Testing

```bash
# Run all linting
bun run lint

# Fix formatting issues
bun run lint:fix
bun run format

# Scan for secrets
bun run secrets
```

## Documentation

### Writing Documentation

- Use clear, concise language
- Include code examples where helpful
- Follow the established structure and style
- Test documentation examples

### Building Documentation

```bash
# Start development server
bun run docs:dev

# Build for production
bun run docs:build
```

## MCP Server Development

### Creating a New MCP Server

1. **Create Server Directory**:

   ```bash
   mkdir -p mcp/new-server
   ```

2. **Implement Server**:

   ```typescript
   // mcp/new-server/index.ts
   import { Server } from "@modelcontextprotocol/sdk/server/index.js";
   // ... implementation
   ```

3. **Add Scripts**:

   ```json
   {
     "scripts": {
       "mcp:new-server": "bun run mcp/new-server/index.ts",
       "dev:mcp:new-server": "bun --watch run mcp/new-server/index.ts"
     }
   }
   ```

4. **Create Documentation**:

   ```bash
   # Create docs/mcp/new-server/index.md
   ```

5. **Test with Inspector**:

   ```bash
   bun run dev:mcp:new-server
   bun run inspector
   ```

### Best Practices

- Follow existing server patterns and structure
- Include comprehensive error handling
- Add proper TypeScript types
- Document all tools and their parameters
- Test thoroughly with MCP Inspector

## Commit Guidelines

### Commit Messages

Use conventional commit format:

```text
type(scope): description

- feat: add new MCP server
- fix: resolve connection issue
- docs: update API documentation
- refactor: simplify error handling
```

### Pre-commit Process

1. **Stage Changes**: `git add .`
2. **Pre-commit Hooks Run Automatically**:
   - Linting and formatting
   - Secret scanning
   - JSON/YAML validation
3. **Commit**: `git commit -m "feat: add new feature"`

## Pull Request Process

1. **Create Feature Branch**
2. **Implement Changes**
3. **Test Thoroughly**
4. **Update Documentation**
5. **Create Pull Request**
6. **Address Review Feedback**
7. **Merge to Main**

## Troubleshooting

### Common Issues

1. **Pre-commit Hook Failures**:
   - Run `bun run lint:fix` to fix formatting
   - Check for secrets with `bun run secrets`
   - Validate JSON/YAML syntax

2. **MCP Server Connection Issues**:
   - Verify environment variables
   - Check server logs for errors
   - Test with MCP Inspector

3. **Docker Service Issues**:
   - Run `bun run docker:down && bun run docker:up`
   - Check service logs with `bun run docker:logs`

## See Also

- [MCP Inspector](./mcp-inspector/) - Server testing and debugging
- [Testing Guidelines](./testing/) - Testing strategies
- [Debugging Guide](./debugging/) - Troubleshooting techniques
