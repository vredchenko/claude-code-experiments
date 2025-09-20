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
    ],

    sidebar: {
      "/mcp/": [
        {
          text: "MCP Servers",
          items: [
            { text: "Overview", link: "/mcp/" },
            { text: "GitLab Integration", link: "/mcp/gitlab" },
            { text: "Storage & Database", link: "/mcp/storage" },
            { text: "Karakeep Bookmarks", link: "/mcp/karakeep/" },
            { text: "Development", link: "/mcp/development" },
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
