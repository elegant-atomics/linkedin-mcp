# flux-linkedin-mcp

LinkedIn MCP server for Claude, Cursor, Windsurf, Claude Code, and any other MCP client. Ask about the posts and engagement of any public LinkedIn profile or company page: which days, hours, formats, and lengths beat the account's own baseline, who engages, and what to post next.

Flux ([fluxgraph.app](https://www.fluxgraph.app/features/mcp?utm_source=npm&utm_medium=referral&utm_campaign=linkedin-mcp)) hosts the server. This package is a thin stdio wrapper around [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) for clients that need a local command. If your client supports remote MCP servers, you can skip the package and connect to the endpoint directly:

```
https://www.fluxgraph.app/mcp
```

## Install

Claude Desktop, Cursor, Windsurf, and most JSON-configured clients:

```json
{
  "mcpServers": {
    "flux-linkedin": {
      "command": "npx",
      "args": ["-y", "flux-linkedin-mcp"]
    }
  }
}
```

Claude Code:

```bash
claude mcp add flux-linkedin -- npx -y flux-linkedin-mcp
```

Then ask, for example: *"Audit the posting patterns of linkedin.com/in/someone and tell me when and how they should post."*

## What it does

- **Audit posting patterns.** Find which days, hours, formats, and lengths beat an account's own baseline, with the sample size behind each finding.
- **Research any public account.** Your own profile, a client's, a prospect's, or a competitor's.
- **Search and track over time (paid plans).** Full post history, weekly refresh, trends over time, post search, and the engagement graph.

Two preview tools work with no account at all, under a daily budget. The rest sign in with a free Flux account through OAuth; your client will open the sign-in page the first time it needs it.

## What it does not do

Flux is read-only on LinkedIn. It cannot publish, like, comment, connect, or message. It reads public LinkedIn data through a third-party data provider, does not use LinkedIn's official API, and never asks for your LinkedIn password or cookie. It is not affiliated with or endorsed by LinkedIn. LinkedIn's User Agreement restricts automated data collection, so decide whether this approach fits your own use.

## Links

- Docs and setup: https://www.fluxgraph.app/features/mcp
- Agent skill and source for this package: https://github.com/elegant-atomics/linkedin-mcp
- Official MCP Registry entry: `app.fluxgraph/linkedin`

MIT © Elegant Atomics
