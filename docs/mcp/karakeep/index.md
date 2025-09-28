# Karakeep MCP Server

Bookmark management integration with Karakeep for organizing and accessing web
resources.

## Overview

The Karakeep MCP server provides comprehensive bookmark management capabilities
through integration with the Karakeep bookmark manager, enabling efficient
organization and retrieval of web resources.

## Features

- **Bookmark Management**: Create, read, update, and delete bookmarks
- **List Organization**: Organize bookmarks into custom lists
- **Tag System**: Categorize bookmarks with tags for easy filtering
- **Search Capabilities**: Find bookmarks by title, URL, or tags
- **Self-Hosted Support**: Works with custom Karakeep instances

## Prerequisites

- Karakeep CLI tool (`karakeep`) installed
- Valid Karakeep API credentials
- Access to a Karakeep instance (self-hosted or managed)

## Configuration

Set the following environment variables:

- `KARAKEEP_API_KEY`: API key for Karakeep authentication
- `KARAKEEP_SERVER_ADDR`: Karakeep server URL

## Tools

### `karakeep_bookmarks_list`

List bookmarks with optional filtering by list or tag.

### `karakeep_bookmarks_create`

Create a new bookmark with title, description, and tags.

### `karakeep_bookmarks_get`

Retrieve detailed information about a specific bookmark.

### `karakeep_bookmarks_update`

Update existing bookmark properties.

### `karakeep_bookmarks_delete`

Remove a bookmark from the system.

### `karakeep_lists_list`

List all available bookmark lists.

### `karakeep_lists_create`

Create a new bookmark list.

### `karakeep_tags_list`

List all available tags.

### `karakeep_tags_create`

Create a new tag with optional color coding.

## Usage Examples

```bash
# Run the server
bun run mcp:karakeep

# Development mode with auto-reload
bun run dev:mcp:karakeep
```

## See Also

- [Karakeep Documentation](https://github.com/karakeep/karakeep)
