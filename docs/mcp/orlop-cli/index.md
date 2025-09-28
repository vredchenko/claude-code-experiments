# Orlop CLI MCP Server

System administration and infrastructure management with Orlop CLI tools.

## Overview

The Orlop CLI MCP server provides system administration capabilities through the
Orlop CLI toolkit, enabling infrastructure management, server provisioning, and
automated deployment workflows.

## Features

- **Infrastructure Management**: Server provisioning and configuration
- **Deployment Automation**: Automated application deployments
- **Configuration Management**: System configuration and updates
- **Monitoring Integration**: System health and performance monitoring
- **Ansible Integration**: Leverage Ansible playbooks and roles

## Prerequisites

- Orlop CLI tools installed and configured
- Access to target infrastructure
- Valid credentials for managed systems
- Network access to target servers

## Configuration

Set the following environment variables:

- `ORLOP_CONFIG_PATH`: Path to Orlop configuration files
- `ORLOP_INVENTORY_PATH`: Ansible inventory file path
- `ORLOP_VAULT_PASSWORD`: Ansible Vault password (if using encrypted vars)

## Tools

### `orlop_inventory_list`

List available servers and groups from inventory.

### `orlop_deploy`

Execute deployment workflows for applications.

### `orlop_configure`

Apply configuration changes to target systems.

### `orlop_status`

Check status and health of managed infrastructure.

### `orlop_logs`

Retrieve logs from managed systems.

### `orlop_playbook_run`

Execute Ansible playbooks through Orlop.

## Usage Examples

```bash
# Run the server
bun run mcp:orlop-cli

# Development mode with auto-reload
bun run dev:mcp:orlop-cli
```

## See Also

- [Orlop Documentation](../../../tools/orlop/)
- [Ansible Documentation](https://docs.ansible.com/)
- [Infrastructure as Code Best Practices](../../../guides/infrastructure/)
