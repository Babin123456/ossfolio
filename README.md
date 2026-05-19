<div align="center">

# OSSfolio

**Your open-source identity, beyond GitHub.**

[![CI](https://github.com/PRODHOSH/ossfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/PRODHOSH/ossfolio/actions/workflows/ci.yml)
[![CodeQL](https://github.com/PRODHOSH/ossfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/PRODHOSH/ossfolio/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![All Contributors](https://img.shields.io/github/all-contributors/PRODHOSH/ossfolio?color=ee8449)](https://github.com/PRODHOSH/ossfolio#contributors)

</div>

---

## What is OSSfolio?

GitHub shows your repos. OSSfolio shows **you**.

OSSfolio is a free, open-source platform where contributors get a public profile page at `ossfolio.me/username` — showcasing the full picture of their open-source journey. The PRs you merged into other projects, the issues you filed, the orgs you contributed to, the programs you participated in like GSoC or GSSoC — all in one shareable link.

No manual input. Just sign in with GitHub and your profile is ready.

---

## Why does this exist?

If you've been contributing to open source for a while, you know the problem — your GitHub profile doesn't tell the full story.

Stars and repo counts get all the attention. But the person who's reviewed 50 PRs, fixed bugs in other people's projects, and helped maintain a popular library? That work is basically invisible on a standard GitHub profile.

OSSfolio is built to fix that — for students applying to GSoC, for developers sharing their work with recruiters, and for anyone who wants their contributions to actually be seen.

---

## Features

- **Shareable profile** at `ossfolio.me/username`
- **Contribution stats** — merged PRs, issues opened, commits, reviews
- **Heatmap & streak** — just like GitHub's, but for all your contributions
- **Tech stack** — auto-detected from your repos, no tagging needed
- **Organizations** — every org you've contributed to
- **GSoC / GSSoC badges** — show your program participation
- **Contributor score** — a single number summarizing your impact
- **Leaderboard** — see how you rank against other contributors

---

## Tech Stack

| | |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |
| Backend | Supabase + PostgreSQL |
| Data | GitHub GraphQL API |
| Hosting | Vercel |

---

## Running it locally

You'll need Node.js 20+ and a free Supabase account.

```bash
git clone https://github.com/PRODHOSH/ossfolio.git
cd ossfolio
npm install
cp .env.example .env.local
# add your Supabase keys to .env.local
npm run dev
```

Visit `http://localhost:3000` and you're in.

For the full setup — Supabase schema, GitHub OAuth config, environment variables — check [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Want to contribute?

OSSfolio is built by contributors, for contributors. That's kind of the whole point.

If you want to help, here's how to get started:

1. Browse the [open issues](https://github.com/PRODHOSH/ossfolio/issues) — look for `good first issue` if it's your first time
2. Comment on the issue explaining how you'd approach it — in your own words, not AI-generated
3. Wait to get assigned, then open a PR

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before you start. They're short, worth the read.

---

## Contributors

Everyone who's helped build OSSfolio — code, design, docs, ideas, all of it.

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://prodhosh.me/"><img src="https://avatars.githubusercontent.com/u/213995806?v=4?s=100" width="100px;" alt="PRODHOSH V.S"/><br /><sub><b>PRODHOSH V.S</b></sub></a><br /><a href="https://github.com/PRODHOSH/ossfolio/commits?author=PRODHOSH" title="Code">💻</a> <a href="https://github.com/PRODHOSH/ossfolio/commits?author=PRODHOSH" title="Documentation">📖</a> <a href="#design-PRODHOSH" title="Design">🎨</a> <a href="https://github.com/PRODHOSH/ossfolio/issues?q=author%3APRODHOSH" title="Bug reports">🐛</a> <a href="https://github.com/PRODHOSH/ossfolio/pulls?q=is%3Apr+reviewed-by%3APRODHOSH" title="Reviewed Pull Requests">👀</a> <a href="#ideas-PRODHOSH" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-PRODHOSH" title="Maintenance">🚧</a> <a href="https://github.com/PRODHOSH/ossfolio/commits?author=PRODHOSH" title="Tests">⚠️</a> <a href="#infra-PRODHOSH" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## License

[MIT](LICENSE) — free to use, fork, and build on.
