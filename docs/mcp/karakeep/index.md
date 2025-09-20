# Karakeep MCP connector

TODO

## General refs

- Website: <https://karakeep.app/>
- Github: <https://github.com/karakeep-app/karakeep>
- Docker compose install: <https://docs.karakeep.app/Installation/docker>
- CLI (needs node.js): <https://docs.karakeep.app/command-line>
- Firefox extension: <https://addons.mozilla.org/en-US/firefox/addon/karakeep/>

## Karakeep CLI

Karakeep CLI is installed as a global npm module (by Ansible). For manual
installation: `npm i -g @karakeep/cli`

```bash
karakeep --help

Usage: karakeep [options] [command]

A CLI interface to interact with the karakeep api

Options:
  --api-key <key>       the API key to interact with the API (env: KARAKEEP_API_KEY)
  --server-addr <addr>  the address of the server to connect to (env: KARAKEEP_SERVER_ADDR)
  --json                to output the result as JSON
  -V, --version         output the version number
  -h, --help            display help for command

Commands:
  bookmarks             manipulating bookmarks
  lists                 manipulating lists
  tags                  manipulating tags
  whoami                returns info about the owner of this API key
  help [command]        display help for command
```
