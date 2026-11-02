# Flux LinkedIn MCP server

Flux ([fluxgraph.app](https://www.fluxgraph.app/features/mcp?utm_source=github&utm_medium=referral&utm_campaign=linkedin-mcp)) is a hosted MCP server for LinkedIn intelligence. Connect it to Claude, Cursor, or another MCP client, then ask about the posts and engagement of any public LinkedIn profile or company page.

```
https://www.fluxgraph.app/mcp
```

This repository holds documentation and an agent skill. The server itself is hosted and closed source, so there is nothing to install or run.

## What it does

- **Audit posting patterns.** Find which days, hours, formats, and lengths beat an account's own baseline, with the sample size behind each finding.
- **Research any public account.** Use it on your own profile, a client's, a prospect's, or a competitor's.
- **Search and track over time (paid).** Paid plans add full post history, weekly refresh, trends over time, search, and the engagement graph.

Flux is read-only on LinkedIn. It cannot publish, like, comment, connect, or message.

## Where the data comes from

Flux reads public LinkedIn data through a third-party data provider. It does not use an official LinkedIn API, and it is not affiliated with or endorsed by LinkedIn. You do not give Flux a LinkedIn password or cookie, and nothing runs under your LinkedIn account.

Flux has no impressions, profile viewers, or other private data. LinkedIn's User Agreement restricts automated data collection, so please decide whether this approach fits your own use.

## The free preview

Two tools offer a free preview of a public profile or company page:

| Tool | What it does |
|---|---|
| `preview_profile` | Takes a `linkedin_url`, pulls up to about 50 recent posts, and returns a `preview_id` and a short summary. |
| `preview_posting_insights` | Takes the `preview_id` and returns the breakdown by day, hour, format, and length. |

Things to know:

- Previews cover at most 50 posts and are pulled once per profile, so check `last_pull_at` to see how old the data is.
- Hours and days are in UTC.
- Usage limits apply, and some results may require a free Flux account.

## Connect it

**Claude (web, desktop, mobile).** Open **Settings → Connectors → Add custom connector**, name it Flux, and paste the URL above. Choose **Sign in when needed** and **Register automatically**.

**Claude Code**

```bash
claude mcp add --transport http --scope user flux https://www.fluxgraph.app/mcp
```

**Cursor and other clients that read `mcpServers`**

```json
{
  "mcpServers": {
    "flux": {
      "type": "http",
      "url": "https://www.fluxgraph.app/mcp"
    }
  }
}
```

For account tools in developer clients, generate a key under **Settings → MCP → Developer setups** in Flux, then send it as an `Authorization: Bearer YOUR_KEY` header. Tools outside the preview need a sign-in or a key, and most need a paid plan. See the [setup guide and tool reference](https://www.fluxgraph.app/features/mcp?utm_source=github&utm_medium=referral&utm_campaign=linkedin-mcp#setup).

Then try a prompt like this:

> Use Flux to preview linkedin.com/in/janedoe. Which days, hours, formats, and lengths beat this account's own baseline, and how many posts back each finding?

## The skill

[`skills/linkedin-mcp-posting-audit`](skills/linkedin-mcp-posting-audit/SKILL.md) teaches an agent to run that audit carefully. It labels thin samples as anecdotes, reports how old the data is, avoids claims about reach, and ends with one specific test to run. It also works on pasted posts if you would rather not make a network call.

To use it, copy the folder into your agent's skills directory (for Claude Code, `~/.claude/skills/`).

## Support

Please [open an issue](../../issues) for problems with these docs or the skill. For account questions, use the contact details at [fluxgraph.app](https://www.fluxgraph.app/?utm_source=github&utm_medium=referral&utm_campaign=linkedin-mcp).

## License

The documentation and skill in this repository are under the [MIT License](LICENSE). The Flux service is governed by its [terms](https://www.fluxgraph.app/terms).
