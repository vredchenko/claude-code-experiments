import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Claude Code Experiments",
  description: "Experiments and configurations for Claude Code-driven development",
  base: "/claude-code-experiments/",

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "MCP Servers", link: "/mcp/" },
      { text: "Agents", link: "/agents/" },
      { text: "Development", link: "/development/" },
    ],

    sidebar: {
      "/mcp/": [
        {
          text: "MCP Servers",
          items: [
            { text: "Overview", link: "/mcp/" },
            {
              text: "GitLab Integration",
              collapsed: false,
              items: [
                { text: "GitLab API", link: "/mcp/gitlab-api/" },
                { text: "GitLab CLI", link: "/mcp/gitlab-cli/" },
              ],
            },
            {
              text: "Storage & Database",
              collapsed: false,
              items: [
                { text: "MinIO Backend", link: "/mcp/minio-backend/" },
                { text: "Redis Backend", link: "/mcp/redis-backend/" },
                { text: "SurrealDB Backend", link: "/mcp/surrealdb-backend/" },
              ],
            },
            {
              text: "Code Search & Repository",
              collapsed: false,
              items: [{ text: "Sourcegraph", link: "/mcp/sourcegraph/" }],
            },
            {
              text: "Bookmark Management",
              collapsed: false,
              items: [{ text: "Karakeep", link: "/mcp/karakeep/" }],
            },
            {
              text: "Infrastructure",
              collapsed: false,
              items: [{ text: "Orlop CLI", link: "/mcp/orlop-cli/" }],
            },
          ],
        },
      ],
      "/agents/": [
        {
          text: "Agents",
          items: [
            { text: "Overview", link: "/agents/" },
            { text: "Grimface Agent", link: "/agents/grimface" },
          ],
        },
      ],
      "/development/": [
        {
          text: "Development",
          items: [
            { text: "Overview", link: "/development/" },
            { text: "MCP Inspector", link: "/development/mcp-inspector" },
            { text: "Development Workflow", link: "/development/workflow" },
            { text: "Testing", link: "/development/testing" },
            { text: "Debugging", link: "/development/debugging" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vredchenko/claude-code-experiments" },
    ],

    footer: {
      message: "Experimental repository for Claude Code features",
      copyright: "Copyright © 2025 vredchenko",
    },
  },

  markdown: {
    theme: "github-dark",
    lineNumbers: true,
  },
});
