# Sourcegraph MCP Server

Advanced code search and repository exploration with Sourcegraph.

## Overview

The Sourcegraph MCP server provides powerful code search capabilities across
repositories using Sourcegraph's advanced search engine, enabling developers to
find code patterns, explore codebases, and retrieve file content efficiently.

**Based on:** This implementation is a TypeScript/Bun.js port of the Python
[sourcegraph-mcp](https://github.com/divar-ir/sourcegraph-mcp) project by
divar-ir, maintaining API compatibility while leveraging the Node.js ecosystem.

## Features

- **Advanced Code Search**: Regex patterns, language filters, boolean operators
- **Repository Discovery**: Find repositories matching specific criteria
- **File Content Retrieval**: Fetch complete file contents from repositories
- **Symbol Search**: Find functions, classes, and other code symbols
- **Context-Aware Guidance**: Generate tailored search query examples
- **Self-Hosted Support**: Works with custom Sourcegraph instances

## Prerequisites

- Access to Sourcegraph instance (public or self-hosted)
- Optional: Sourcegraph access token for private instances
- Network access to Sourcegraph endpoint

## Configuration

Set the following environment variables:

- `SRC_ENDPOINT`: Sourcegraph instance URL (default: <https://sourcegraph.com>)
- `SRC_ACCESS_TOKEN`: Access token for authentication (optional for public
  instances)

## Tools

### `search`

Search code across repositories using Sourcegraph's advanced query syntax.

**Parameters:**

- `query`: Search query with Sourcegraph syntax support
- `num`: Maximum number of results (default: 20, max: 100)

**Features:**

- Supports regex patterns (`.*`, `\\w+`)
- Language filtering (`lang:typescript`, `lang:python`)
- File pattern matching (`file:.*\\.test\\.`)
- Repository filtering (`repo:^github\\.com/org/`)
- Boolean operators (`AND`, `OR`, `NOT`)

### `search_prompt_guide`

Generate context-aware search query guidance and examples.

**Parameters:**

- `context`: Domain or context for search guidance (e.g., "API", "testing")
- `organization`: Optional organization name for customized tips

**Generates:**

- Basic search patterns for the given context
- Advanced filter examples
- Organization-specific search tips
- Pro tips for complex queries

### `fetch_content`

Retrieve the complete content of a specific file from a repository.

**Parameters:**

- `repository`: Repository path (e.g., `/github.com/owner/repo`)
- `path`: File path within repository (e.g., `/src/main.ts`)
- `rev`: Git revision - branch, tag, or commit SHA (default: `HEAD`)

## Usage Examples

```bash
# Run the server
bun run mcp:sourcegraph

# Development mode with auto-reload
bun run dev:mcp:sourcegraph
```

### Search Examples

```javascript
// Basic function search
search({ query: "function handleClick", num: 10 });

// Language-specific search with regex
search({ query: "class.*Component lang:typescript" });

// Repository-scoped search
search({ query: "import React repo:^github\\.com/facebook/" });

// File pattern search
search({ query: "test.*async file:.*\\.test\\." });
```

### Content Retrieval Examples

```javascript
// Get main file from repository
fetch_content({
  repository: "/github.com/microsoft/vscode",
  path: "/src/vs/code/electron-main/main.ts",
});

// Get file from specific branch
fetch_content({
  repository: "/github.com/facebook/react",
  path: "/packages/react/src/React.js",
  rev: "main",
});
```

## Search Query Syntax

### Basic Patterns

- `function_name` - Find function definitions
- `class ClassName` - Find class declarations
- `"exact phrase"` - Find exact text matches

### Advanced Filters

- `lang:typescript` - Filter by programming language
- `file:.*\\.test\\.` - Filter by file pattern (regex)
- `repo:^github\\.com/org/` - Filter by repository pattern
- `type:symbol` - Search for symbols only
- `archived:no` - Exclude archived repositories

### Boolean Logic

- `term1 AND term2` - Both terms must be present
- `term1 OR term2` - Either term can be present
- `NOT term` - Exclude term from results
- `(term1 OR term2) AND term3` - Complex boolean expressions

## Attribution

This TypeScript implementation is based on the Python
[sourcegraph-mcp](https://github.com/divar-ir/sourcegraph-mcp) project:

- **Original Authors**: divar-ir team
- **Original Repository**: <https://github.com/divar-ir/sourcegraph-mcp>
- **License**: MIT (original project)
- **Adaptations**: Ported to TypeScript/Bun.js with equivalent functionality

## See Also

- [Sourcegraph Documentation](https://docs.sourcegraph.com/)
- [Sourcegraph Search Syntax](https://docs.sourcegraph.com/code_search/reference/queries)
- [Original Python Implementation](https://github.com/divar-ir/sourcegraph-mcp)
