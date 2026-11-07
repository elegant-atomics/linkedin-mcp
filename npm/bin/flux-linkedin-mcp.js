#!/usr/bin/env node
// Runs the hosted Flux LinkedIn MCP server over stdio for clients that cannot
// speak streamable HTTP directly. It is a thin wrapper around mcp-remote.
//
//   npx flux-linkedin-mcp            -> proxies https://www.fluxgraph.app/mcp
//   npx flux-linkedin-mcp --help     -> this message
//
// Any extra arguments are passed through to mcp-remote.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const ENDPOINT = "https://www.fluxgraph.app/mcp";
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  process.stdout.write(`flux-linkedin-mcp

Runs the Flux LinkedIn MCP server (${ENDPOINT}) over stdio.

Most MCP clients can connect to the hosted endpoint directly; use this wrapper
only when your client needs a local command.

Claude Desktop / Cursor / Windsurf config:

  {
    "mcpServers": {
      "flux-linkedin": {
        "command": "npx",
        "args": ["-y", "flux-linkedin-mcp"]
      }
    }
  }

Claude Code:

  claude mcp add flux-linkedin -- npx -y flux-linkedin-mcp

Docs: https://www.fluxgraph.app/features/mcp
Any other flags are passed through to mcp-remote.
`);
  process.exit(0);
}

const require = createRequire(import.meta.url);
const pkgPath = require.resolve("mcp-remote/package.json");
const pkg = require(pkgPath);
const proxy = join(dirname(pkgPath), pkg.bin["mcp-remote"]);

// The hosted server speaks streamable HTTP only, so skip the SSE attempt
// unless the caller chose a transport explicitly.
const passthrough = args.includes("--transport") ? args : ["--transport", "http-only", ...args];

const child = spawn(process.execPath, [proxy, ENDPOINT, ...passthrough], {
  stdio: "inherit",
  env: process.env,
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(sig, () => child.kill(sig));
}
