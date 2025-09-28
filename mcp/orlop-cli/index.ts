#!/usr/bin/env bun

import { spawn } from "node:child_process";
import { access, constants } from "node:fs/promises";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";

interface ToolConfig {
  name: string;
  description: string;
  category: string;
  schema: any;
}

interface DockerExecOptions {
  workdir?: string;
  user?: string;
  env?: Record<string, string>;
  volumes?: Array<{ host: string; container: string; mode?: string }>;
}

class OrlopCLIMCPServer {
  private server: Server;
  private containerImage = "orlopdeck:latest";
  private tools: ToolConfig[] = [];

  constructor() {
    this.server = new Server(
      {
        name: "orlop-cli-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.initializeTools();
    this.setupToolHandlers();
  }

  private initializeTools(): void {
    this.tools = [
      // Text Search & Processing
      {
        name: "ripgrep_search",
        description: "Search text in files using ripgrep",
        category: "search",
        schema: {
          type: "object",
          properties: {
            pattern: { type: "string", description: "Search pattern (regex)" },
            path: { type: "string", description: "Path to search in", default: "." },
            file_type: { type: "string", description: "File type filter (e.g., 'rust', 'js')" },
            case_sensitive: {
              type: "boolean",
              description: "Case sensitive search",
              default: false,
            },
            context_lines: { type: "number", description: "Context lines to show", default: 0 },
            max_count: { type: "number", description: "Maximum number of matches" },
          },
          required: ["pattern"],
        },
      },
      {
        name: "view_file",
        description: "View file contents with syntax highlighting using bat",
        category: "file",
        schema: {
          type: "object",
          properties: {
            file_path: { type: "string", description: "Path to file to view" },
            line_range: { type: "string", description: "Line range (e.g., '10:20')" },
            language: { type: "string", description: "Force syntax highlighting language" },
            style: { type: "string", description: "Output style", default: "auto" },
            show_all: {
              type: "boolean",
              description: "Show non-printable characters",
              default: false,
            },
          },
          required: ["file_path"],
        },
      },
      {
        name: "json_grep",
        description: "Search and extract data from JSON using gron",
        category: "data",
        schema: {
          type: "object",
          properties: {
            file_path: { type: "string", description: "Path to JSON file" },
            pattern: { type: "string", description: "Pattern to search for" },
            ungron: {
              type: "boolean",
              description: "Convert gron output back to JSON",
              default: false,
            },
          },
          required: ["file_path"],
        },
      },

      // File Operations
      {
        name: "find_files",
        description: "Find files and directories using fd",
        category: "file",
        schema: {
          type: "object",
          properties: {
            pattern: { type: "string", description: "File name pattern" },
            path: { type: "string", description: "Path to search in", default: "." },
            type: {
              type: "string",
              enum: ["f", "d", "l"],
              description: "Type: f=file, d=directory, l=link",
            },
            extension: { type: "string", description: "File extension filter" },
            size: { type: "string", description: "Size filter (e.g., '+1M', '-100k')" },
            max_depth: { type: "number", description: "Maximum search depth" },
            hidden: { type: "boolean", description: "Include hidden files", default: false },
          },
          required: ["pattern"],
        },
      },
      {
        name: "list_directory",
        description: "List directory contents with details using lsd",
        category: "file",
        schema: {
          type: "object",
          properties: {
            path: { type: "string", description: "Directory path", default: "." },
            all: { type: "boolean", description: "Show hidden files", default: false },
            long: { type: "boolean", description: "Long format", default: true },
            tree: { type: "boolean", description: "Tree view", default: false },
            depth: { type: "number", description: "Tree depth", default: 2 },
            size_sort: { type: "boolean", description: "Sort by size", default: false },
            time_sort: { type: "boolean", description: "Sort by time", default: false },
          },
        },
      },
      {
        name: "disk_usage",
        description: "Analyze disk usage using gdu",
        category: "system",
        schema: {
          type: "object",
          properties: {
            path: { type: "string", description: "Path to analyze", default: "." },
            show_apparent_size: {
              type: "boolean",
              description: "Show apparent size",
              default: false,
            },
            no_cross: {
              type: "boolean",
              description: "Don't cross filesystem boundaries",
              default: false,
            },
          },
        },
      },

      // Development Tools
      {
        name: "code_statistics",
        description: "Generate code statistics using tokei",
        category: "development",
        schema: {
          type: "object",
          properties: {
            path: { type: "string", description: "Path to analyze", default: "." },
            languages: { type: "string", description: "Comma-separated list of languages" },
            exclude: { type: "string", description: "Patterns to exclude" },
            sort: {
              type: "string",
              enum: ["files", "lines", "code", "comments", "blanks"],
              description: "Sort by",
            },
            output_format: {
              type: "string",
              enum: ["default", "json"],
              description: "Output format",
              default: "default",
            },
          },
        },
      },
      {
        name: "benchmark_command",
        description: "Benchmark command execution using hyperfine",
        category: "development",
        schema: {
          type: "object",
          properties: {
            commands: {
              type: "array",
              items: { type: "string" },
              description: "Commands to benchmark",
            },
            runs: { type: "number", description: "Number of runs", default: 10 },
            warmup: { type: "number", description: "Warmup runs", default: 3 },
            min_time: { type: "number", description: "Minimum time per run (seconds)" },
            export_json: { type: "string", description: "Export results to JSON file" },
          },
          required: ["commands"],
        },
      },
      {
        name: "hex_dump",
        description: "View file as hex dump using hexyl",
        category: "development",
        schema: {
          type: "object",
          properties: {
            file_path: { type: "string", description: "File to dump" },
            length: { type: "number", description: "Number of bytes to read" },
            skip: { type: "number", description: "Number of bytes to skip" },
            display_offset: { type: "number", description: "Display offset" },
          },
          required: ["file_path"],
        },
      },

      // System Monitoring
      {
        name: "process_info",
        description: "Show process information using procs",
        category: "system",
        schema: {
          type: "object",
          properties: {
            pattern: { type: "string", description: "Process name pattern" },
            tree: { type: "boolean", description: "Show process tree", default: false },
            thread: { type: "boolean", description: "Show threads", default: false },
            tcp: { type: "boolean", description: "Show TCP connections", default: false },
            udp: { type: "boolean", description: "Show UDP connections", default: false },
          },
        },
      },
      {
        name: "system_monitor",
        description: "System monitoring using bottom",
        category: "system",
        schema: {
          type: "object",
          properties: {
            time_delta: { type: "number", description: "Time between updates (ms)", default: 1000 },
            basic: { type: "boolean", description: "Basic mode", default: true },
            dot_marker: {
              type: "boolean",
              description: "Use dot marker for graphs",
              default: false,
            },
          },
        },
      },

      // Git Integration
      {
        name: "git_diff_enhanced",
        description: "Enhanced git diff using delta",
        category: "git",
        schema: {
          type: "object",
          properties: {
            file1: { type: "string", description: "First file to compare" },
            file2: { type: "string", description: "Second file to compare" },
            syntax_theme: { type: "string", description: "Syntax highlighting theme" },
            side_by_side: { type: "boolean", description: "Side-by-side view", default: false },
            line_numbers: { type: "boolean", description: "Show line numbers", default: true },
          },
        },
      },

      // GitHub/GitLab Integration
      {
        name: "github_operation",
        description: "Execute GitHub CLI operations",
        category: "vcs",
        schema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: [
                "repo-list",
                "repo-create",
                "issue-list",
                "issue-create",
                "pr-list",
                "pr-create",
                "auth-status",
              ],
              description: "GitHub action to perform",
            },
            args: { type: "array", items: { type: "string" }, description: "Additional arguments" },
          },
          required: ["action"],
        },
      },
      {
        name: "gitlab_operation",
        description: "Execute GitLab CLI operations",
        category: "vcs",
        schema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: [
                "repo-list",
                "issue-list",
                "issue-create",
                "mr-list",
                "mr-create",
                "auth-status",
              ],
              description: "GitLab action to perform",
            },
            args: { type: "array", items: { type: "string" }, description: "Additional arguments" },
          },
          required: ["action"],
        },
      },

      // MinIO/S3 Operations
      {
        name: "minio_operation",
        description: "Execute MinIO client operations",
        category: "storage",
        schema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: ["ls", "cp", "mv", "rm", "mirror", "sync", "alias-set", "alias-list"],
              description: "MinIO action to perform",
            },
            source: { type: "string", description: "Source path/URL" },
            destination: { type: "string", description: "Destination path/URL" },
            recursive: { type: "boolean", description: "Recursive operation", default: false },
            args: { type: "array", items: { type: "string" }, description: "Additional arguments" },
          },
          required: ["action"],
        },
      },
    ];
  }

  private async checkDockerAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      const docker = spawn("docker", ["info"], { stdio: "ignore" });
      docker.on("close", (code) => {
        resolve(code === 0);
      });
      docker.on("error", () => {
        resolve(false);
      });
    });
  }

  private async checkImageExists(): Promise<boolean> {
    return new Promise((resolve) => {
      const docker = spawn("docker", ["images", "-q", this.containerImage], { stdio: "pipe" });
      let output = "";

      docker.stdout?.on("data", (data) => {
        output += data.toString();
      });

      docker.on("close", () => {
        resolve(output.trim().length > 0);
      });

      docker.on("error", () => {
        resolve(false);
      });
    });
  }

  private async executeInContainer(
    command: string[],
    options: DockerExecOptions = {}
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise(async (resolve, reject) => {
      // Check if Docker is available
      if (!(await this.checkDockerAvailable())) {
        reject(new Error("Docker is not available or not running"));
        return;
      }

      // Check if image exists
      if (!(await this.checkImageExists())) {
        reject(
          new Error(
            `Container image ${this.containerImage} not found. Run 'make build' to create it.`
          )
        );
        return;
      }

      const dockerArgs = ["run", "--rm", "--interactive"];

      // Add volumes
      const defaultVolumes = [
        { host: process.cwd(), container: "/workspace" },
        { host: `${process.env.HOME}/.gitconfig`, container: "/home/orlop/.gitconfig", mode: "ro" },
        { host: `${process.env.HOME}/.ssh`, container: "/home/orlop/.ssh", mode: "ro" },
      ];

      const allVolumes = [...defaultVolumes, ...(options.volumes || [])];

      for (const volume of allVolumes) {
        try {
          await access(volume.host, constants.F_OK);
          const mountStr = volume.mode
            ? `${volume.host}:${volume.container}:${volume.mode}`
            : `${volume.host}:${volume.container}`;
          dockerArgs.push("-v", mountStr);
        } catch (_error) {
          // Skip mounting if host path doesn't exist
        }
      }

      // Set working directory
      if (options.workdir) {
        dockerArgs.push("-w", options.workdir);
      } else {
        dockerArgs.push("-w", "/workspace");
      }

      // Set user
      if (options.user) {
        dockerArgs.push("--user", options.user);
      }

      // Set environment variables
      if (options.env) {
        for (const [key, value] of Object.entries(options.env)) {
          dockerArgs.push("-e", `${key}=${value}`);
        }
      }

      // Pass through common environment variables
      const envVars = ["GITHUB_TOKEN", "GITLAB_TOKEN", "GH_TOKEN", "GLAB_TOKEN"];
      for (const envVar of envVars) {
        if (process.env[envVar]) {
          dockerArgs.push("-e", `${envVar}=${process.env[envVar]}`);
        }
      }

      dockerArgs.push(this.containerImage, ...command);

      const docker = spawn("docker", dockerArgs, { stdio: "pipe" });
      let stdout = "";
      let stderr = "";

      docker.stdout?.on("data", (data) => {
        stdout += data.toString();
      });

      docker.stderr?.on("data", (data) => {
        stderr += data.toString();
      });

      docker.on("close", (code) => {
        resolve({ stdout, stderr, exitCode: code || 0 });
      });

      docker.on("error", (error) => {
        reject(new Error(`Docker execution failed: ${error.message}`));
      });
    });
  }

  private setupToolHandlers(): void {
    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = this.tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.schema,
      }));

      return { tools };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        let result: { stdout: string; stderr: string; exitCode: number };

        switch (name) {
          case "ripgrep_search":
            result = await this.handleRipgrepSearch(args);
            break;
          case "view_file":
            result = await this.handleViewFile(args);
            break;
          case "json_grep":
            result = await this.handleJsonGrep(args);
            break;
          case "find_files":
            result = await this.handleFindFiles(args);
            break;
          case "list_directory":
            result = await this.handleListDirectory(args);
            break;
          case "disk_usage":
            result = await this.handleDiskUsage(args);
            break;
          case "code_statistics":
            result = await this.handleCodeStatistics(args);
            break;
          case "benchmark_command":
            result = await this.handleBenchmarkCommand(args);
            break;
          case "hex_dump":
            result = await this.handleHexDump(args);
            break;
          case "process_info":
            result = await this.handleProcessInfo(args);
            break;
          case "system_monitor":
            result = await this.handleSystemMonitor(args);
            break;
          case "git_diff_enhanced":
            result = await this.handleGitDiffEnhanced(args);
            break;
          case "github_operation":
            result = await this.handleGithubOperation(args);
            break;
          case "gitlab_operation":
            result = await this.handleGitlabOperation(args);
            break;
          case "minio_operation":
            result = await this.handleMinioOperation(args);
            break;
          default:
            throw new Error(`Unknown tool: ${name}`);
        }

        const output = result.stdout || result.stderr;
        const isError = result.exitCode !== 0;

        return {
          content: [
            {
              type: "text",
              text: output || "Command completed successfully (no output)",
            },
          ],
          isError,
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  // Tool implementation methods
  private async handleRipgrepSearch(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["rg"];

    if (!args.case_sensitive) command.push("-i");
    if (args.context_lines) command.push("-C", args.context_lines.toString());
    if (args.file_type) command.push("--type", args.file_type);
    if (args.max_count) command.push("-m", args.max_count.toString());

    command.push(args.pattern);
    if (args.path) command.push(args.path);

    return this.executeInContainer(command);
  }

  private async handleViewFile(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["bat"];

    if (args.line_range) command.push("--line-range", args.line_range);
    if (args.language) command.push("--language", args.language);
    if (args.style !== "auto") command.push("--style", args.style);
    if (args.show_all) command.push("--show-all");

    command.push(args.file_path);

    return this.executeInContainer(command);
  }

  private async handleJsonGrep(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    let command = ["gron", args.file_path];

    if (args.pattern) {
      const result = await this.executeInContainer([...command, "|", "grep", args.pattern]);
      return result;
    }

    if (args.ungron) command = ["gron", "--ungron", args.file_path];

    return this.executeInContainer(command);
  }

  private async handleFindFiles(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["fd"];

    if (args.type) command.push("--type", args.type);
    if (args.extension) command.push("--extension", args.extension);
    if (args.size) command.push("--size", args.size);
    if (args.max_depth) command.push("--max-depth", args.max_depth.toString());
    if (args.hidden) command.push("--hidden");

    command.push(args.pattern);
    if (args.path) command.push(args.path);

    return this.executeInContainer(command);
  }

  private async handleListDirectory(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["lsd"];

    if (args.all) command.push("--all");
    if (args.long) command.push("--long");
    if (args.tree) {
      command.push("--tree");
      if (args.depth) command.push("--depth", args.depth.toString());
    }
    if (args.size_sort) command.push("--size", "short");
    if (args.time_sort) command.push("--timesort");

    if (args.path) command.push(args.path);

    return this.executeInContainer(command);
  }

  private async handleDiskUsage(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["gdu"];

    if (args.show_apparent_size) command.push("-a");
    if (args.no_cross) command.push("-x");
    command.push("-n"); // Non-interactive mode

    if (args.path) command.push(args.path);

    return this.executeInContainer(command);
  }

  private async handleCodeStatistics(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["tokei"];

    if (args.languages) command.push("--languages", args.languages);
    if (args.exclude) command.push("--exclude", args.exclude);
    if (args.sort) command.push("--sort", args.sort);
    if (args.output_format === "json") command.push("--output", "json");

    if (args.path) command.push(args.path);

    return this.executeInContainer(command);
  }

  private async handleBenchmarkCommand(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["hyperfine"];

    if (args.runs) command.push("--runs", args.runs.toString());
    if (args.warmup) command.push("--warmup", args.warmup.toString());
    if (args.min_time) command.push("--min-time", args.min_time.toString());
    if (args.export_json) command.push("--export-json", args.export_json);

    command.push(...args.commands);

    return this.executeInContainer(command);
  }

  private async handleHexDump(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["hexyl"];

    if (args.length) command.push("--length", args.length.toString());
    if (args.skip) command.push("--skip", args.skip.toString());
    if (args.display_offset) command.push("--display-offset", args.display_offset.toString());

    command.push(args.file_path);

    return this.executeInContainer(command);
  }

  private async handleProcessInfo(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["procs"];

    if (args.tree) command.push("--tree");
    if (args.thread) command.push("--thread");
    if (args.tcp) command.push("--tcp");
    if (args.udp) command.push("--udp");

    if (args.pattern) command.push(args.pattern);

    return this.executeInContainer(command);
  }

  private async handleSystemMonitor(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["btm"];

    if (args.basic) command.push("--basic");
    if (args.time_delta) command.push("--time_delta", args.time_delta.toString());
    if (args.dot_marker) command.push("--dot_marker");
    command.push("--once"); // Run once for MCP usage

    return this.executeInContainer(command);
  }

  private async handleGitDiffEnhanced(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["delta"];

    if (args.syntax_theme) command.push("--syntax-theme", args.syntax_theme);
    if (args.side_by_side) command.push("--side-by-side");
    if (args.line_numbers) command.push("--line-numbers");

    if (args.file1 && args.file2) {
      command.push(args.file1, args.file2);
    }

    return this.executeInContainer(command);
  }

  private async handleGithubOperation(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["gh"];

    switch (args.action) {
      case "repo-list":
        command.push("repo", "list");
        break;
      case "repo-create":
        command.push("repo", "create");
        break;
      case "issue-list":
        command.push("issue", "list");
        break;
      case "issue-create":
        command.push("issue", "create");
        break;
      case "pr-list":
        command.push("pr", "list");
        break;
      case "pr-create":
        command.push("pr", "create");
        break;
      case "auth-status":
        command.push("auth", "status");
        break;
      default:
        throw new Error(`Unknown GitHub action: ${args.action}`);
    }

    if (args.args) command.push(...args.args);

    return this.executeInContainer(command);
  }

  private async handleGitlabOperation(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["glab"];

    switch (args.action) {
      case "repo-list":
        command.push("repo", "list");
        break;
      case "issue-list":
        command.push("issue", "list");
        break;
      case "issue-create":
        command.push("issue", "create");
        break;
      case "mr-list":
        command.push("mr", "list");
        break;
      case "mr-create":
        command.push("mr", "create");
        break;
      case "auth-status":
        command.push("auth", "status");
        break;
      default:
        throw new Error(`Unknown GitLab action: ${args.action}`);
    }

    if (args.args) command.push(...args.args);

    return this.executeInContainer(command);
  }

  private async handleMinioOperation(
    args: any
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const command = ["mc"];

    switch (args.action) {
      case "ls":
        command.push("ls");
        if (args.source) command.push(args.source);
        break;
      case "cp":
        command.push("cp");
        if (args.recursive) command.push("--recursive");
        if (args.source && args.destination) {
          command.push(args.source, args.destination);
        }
        break;
      case "mv":
        command.push("mv");
        if (args.source && args.destination) {
          command.push(args.source, args.destination);
        }
        break;
      case "rm":
        command.push("rm");
        if (args.recursive) command.push("--recursive");
        if (args.source) command.push(args.source);
        break;
      case "mirror":
        command.push("mirror");
        if (args.source && args.destination) {
          command.push(args.source, args.destination);
        }
        break;
      case "sync":
        command.push("sync");
        if (args.source && args.destination) {
          command.push(args.source, args.destination);
        }
        break;
      case "alias-set":
        command.push("alias", "set");
        break;
      case "alias-list":
        command.push("alias", "list");
        break;
      default:
        throw new Error(`Unknown MinIO action: ${args.action}`);
    }

    if (args.args) command.push(...args.args);

    return this.executeInContainer(command);
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Orlop CLI MCP server running on stdio");
  }
}

// Start the server
const server = new OrlopCLIMCPServer();
server.start().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
