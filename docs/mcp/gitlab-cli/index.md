# GitLab CLI MCP Server

GitLab integration using the `glab` CLI tool for enhanced developer workflows.

## Overview

The GitLab CLI MCP server leverages the official `glab` command-line tool to
provide GitLab integration with a focus on developer-friendly commands and
workflows.

## Features

- **CLI-Based**: Uses `glab` for authentic GitLab CLI experience
- **Workflow Integration**: Supports common developer workflows
- **Issue Management**: Create and manage issues
- **Merge Request Operations**: Handle MR creation and review
- **Pipeline Monitoring**: Track CI/CD pipeline status

## Prerequisites

- Install `glab` CLI tool: <https://gitlab.com/gitlab-org/cli>
- Configure `glab` authentication: `glab auth login`

## Configuration

Set the following environment variables:

- `GITLAB_TOKEN`: Personal access token (if not using glab auth)
- `GITLAB_HOST`: GitLab instance URL

## Tools

### `gitlab_cli_projects_list`

List projects using glab CLI.

### `gitlab_cli_issues_list`

List issues with glab formatting.

### `gitlab_cli_merge_requests_list`

List merge requests using glab.

### `gitlab_cli_pipelines_list`

Monitor pipelines via glab.

## Usage Examples

```bash
# Run the server
bun run mcp:gitlab-cli

# Development mode with auto-reload
bun run dev:mcp:gitlab-cli
```

## See Also

- [GitLab API MCP Server](../gitlab-api/) - Direct REST API integration
- [glab CLI Documentation](https://gitlab.com/gitlab-org/cli)
