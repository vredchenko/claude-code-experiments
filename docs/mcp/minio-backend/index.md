# MinIO Backend MCP Server

Object storage operations with MinIO for scalable file and data management.

## Overview

The MinIO Backend MCP server provides comprehensive object storage capabilities
through MinIO, enabling efficient file uploads, downloads, and bucket management
for scalable cloud storage solutions.

## Features

- **Bucket Management**: Create, list, and manage storage buckets
- **Object Operations**: Upload, download, and delete objects
- **Metadata Handling**: Manage object metadata and properties
- **Presigned URLs**: Generate secure temporary access URLs
- **Self-Hosted Support**: Works with self-hosted MinIO instances

## Prerequisites

- MinIO server running (local or remote)
- Valid MinIO access credentials
- Network access to MinIO endpoint

## Configuration

Set the following environment variables:

- `MINIO_ENDPOINT`: MinIO server endpoint
- `MINIO_PORT`: MinIO server port (default: 9000)
- `MINIO_ROOT_USER`: MinIO access key
- `MINIO_ROOT_PASSWORD`: MinIO secret key
- `MINIO_USE_SSL`: Enable SSL/TLS (default: false)

## Tools

### `minio_list_buckets`

List all available storage buckets.

### `minio_create_bucket`

Create a new storage bucket.

### `minio_list_objects`

List objects in a specific bucket.

### `minio_upload_object`

Upload files to a bucket.

### `minio_download_object`

Download objects from storage.

### `minio_delete_object`

Remove objects from storage.

### `minio_get_presigned_url`

Generate temporary access URLs for objects.

## Usage Examples

```bash
# Run the server
bun run mcp:minio

# Development mode with auto-reload
bun run dev:mcp:minio
```

## See Also

- [MinIO Documentation](https://min.io/docs/)
- [Object Storage Best Practices](../../../guides/object-storage/)
