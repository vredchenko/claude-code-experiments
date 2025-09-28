# GitLab API MCP Server

Direct GitLab REST API integration for comprehensive project management.

## Overview

The GitLab API MCP server provides direct access to GitLab's REST API, enabling
seamless integration with GitLab projects, issues, merge requests, and CI/CD
pipelines.

## Features

- **Projects**: List, search, and retrieve project information
- **Issues**: Create, read, update, and manage issues
- **Merge Requests**: Handle merge request workflows
- **Pipelines**: Monitor CI/CD pipeline status and results
- **Direct API Access**: Leverages GitLab's official REST API endpoints

## Configuration

Set the following environment variables:

- `GITLAB_TOKEN`: Personal access token for GitLab authentication
- `GITLAB_HOST`: GitLab instance URL (default: gitlab.com)
- `GITLAB_API_VERSION`: API version (default: v4)

## Tools

### `gitlab_api_projects_list`

List GitLab projects with filtering options.

### `gitlab_api_project_get`

Get detailed information about a specific project.

### `gitlab_api_issues_list`

List issues in a project with state and assignee filtering.

### `gitlab_api_issue_get`

Retrieve detailed issue information.

### `gitlab_api_merge_requests_list`

List merge requests with various filters.

### `gitlab_api_merge_request_get`

Get detailed merge request information.

### `gitlab_api_pipelines_list`

List CI/CD pipelines for a project.

## Usage Examples

```bash
# Run the server
bun run mcp:gitlab-api

# Development mode with auto-reload
bun run dev:mcp:gitlab-api
```

## See Also

- [GitLab CLI MCP Server](../gitlab-cli/) - Alternative using `glab` CLI
- [GitLab REST API Documentation](https://docs.gitlab.com/ee/api/)
