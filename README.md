# AI Agent Skills

Cross-IDE AI agent skills with interactive CLI, dual-source `SKILL.md` discovery, GitHub skill fetching, and installers that render the right layout for each IDE.

[![npm version](https://img.shields.io/npm/v/@votruongdanh/ai-agent-skills.svg)](https://www.npmjs.com/package/@votruongdanh/ai-agent-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Install

```bash
npx @votruongdanh/ai-agent-skills init
```

The CLI launches an **interactive setup** — it always asks you to choose an IDE from the full supported list, then picks project vs global scope:

```
 AI Agent Skills  v3.2.0

🔧 Choose your IDE:
  1) Cursor
  2) Kiro
  3) Antigravity
  4) Codex
  5) VS Code
  6) GitHub Copilot
  7) All supported IDEs

📂 Install scope:
  1) This project only    ← recommended
  2) Global (all projects)

[1] Installing skills...
✔ 15 skills installed for Cursor

Done! Next steps:
  1. Reopen Cursor
  2. Open agent chat and type / to list skills
  3. Try: /create, /debug, /explain, or /plan
```

### Non-interactive mode

For CI/CD or scripting, pass `--ide` to skip prompts:

```bash
npx @votruongdanh/ai-agent-skills init --ide=cursor
npx @votruongdanh/ai-agent-skills init --ide=all
npx @votruongdanh/ai-agent-skills init --ide=kiro
npx @votruongdanh/ai-agent-skills init --ide=antigravity
npx @votruongdanh/ai-agent-skills init --ide=codex
npx @votruongdanh/ai-agent-skills init --ide=vscode
npx @votruongdanh/ai-agent-skills init --ide=copilot
npx @votruongdanh/ai-agent-skills init --no-interactive
```

The CLI still supports marker-based context detection for status/list flows when applicable, including parent-folder lookup.

For non-interactive mode (`--no-interactive`), `--ide` is required. You can pass `--ide=all` to install for every supported IDE in one run.

## Add Skills from GitHub

Fetch skills directly from any GitHub repository:

```bash
# Browse and pick skills interactively
npx @votruongdanh/ai-agent-skills add owner/repo

# Install a specific skill
npx @votruongdanh/ai-agent-skills add anthropics/skills --skill=pdf-processing

# Specify branch and target IDE
npx @votruongdanh/ai-agent-skills add anthropics/skills --ide=cursor --branch=main
```

The `add` command:
- Fetches the GitHub repo tree via API
- Lists all `SKILL.md` files found
- Lets you pick one skill or install all
- Downloads companion `scripts/`, `references/`, `assets/` directories
- Installs to your chosen IDE format and scope

## Commands

| Command | Description |
|---------|-------------|
| `npx @votruongdanh/ai-agent-skills init` | Interactive setup (choose IDE + scope) |
| `npx @votruongdanh/ai-agent-skills init --ide=cursor` | Non-interactive install for specific IDE |
| `npx @votruongdanh/ai-agent-skills global` | Install globally for all projects |
| `npx @votruongdanh/ai-agent-skills add owner/repo` | Add skills from a GitHub repository |
| `npx @votruongdanh/ai-agent-skills list` | List all bundled skills |
| `npx @votruongdanh/ai-agent-skills list --json` | JSON output for scripts |
| `npx @votruongdanh/ai-agent-skills status` | Show install status & versions |
| `npx @votruongdanh/ai-agent-skills help` | Show help |

## Supported IDEs

| IDE | Installed layout | Notes |
| --- | --- | --- |
| Kiro | `.kiro/skills/<skill>/SKILL.md` | Native skill format |
| Cursor | `.cursor/skills/<skill>/SKILL.md` | Native skill format |
| Cursor legacy | `.cursor/rules/<skill>.mdc` | Generated compatibility layer |
| Antigravity | `.agent/workflows/<skill>.md` | Generated workflow bridge |
| Antigravity legacy | `agent/workflows/<skill>.md` | Compatibility alias for older setups |
| Codex | `.agents/skills/<skill>/SKILL.md` | Detected from `.agents/skills`, `AGENTS.md`, and/or `memories/` |
| VS Code | `.github/skills/<skill>/SKILL.md` | Native SKILL.md format for Copilot Chat |
| GitHub Copilot | `.github/skills/<skill>/SKILL.md` | Alias of VS Code target |

Native skill targets keep the full skill directory. Generated compatibility targets (Cursor `.mdc` rules, Antigravity workflows) only render `SKILL.md` content — companion `scripts/`, `references/`, and `assets/` remain native-only.

## Available Skills (15)

| Skill | Description |
|-------|-------------|
| `/agents` | Agent routing — auto-selects specialist agent per request |
| `/brainstorm` | Ideation, option generation, feature exploration |
| `/clean` | Clean junk files, caches, AI artifacts |
| `/create` | Build new features, files, components, endpoints |
| `/debug` | Root-cause analysis for bugs and errors |
| `/deploy` | Deployment, CI/CD, release preparation |
| `/enhance` | Refactor, optimize, tighten security, improve UX |
| `/explain` | Explain code, walk through logic and architecture |
| `/orchestrate` | Coordinate multi-step plans across domains |
| `/plan` | Implementation plans with milestones and breakdown |
| `/preview` | Preview output, UX flows, mockups before building |
| `/status` | Project health, dependency, and progress reports |
| `/test` | Generate and run tests, coverage analysis |
| `/ui-ux-pro-max` | UI/UX design, accessibility, responsive layouts |
| `/integrate` | Safely merge sample/snippet code into the existing system with minimal changes |

All skills support both English and Vietnamese trigger keywords.

## Project Memory & `.ai-memory.md`

The skills share a **project-wide memory file** (`.ai-memory.md`) that captures tech stack, architecture, decisions, known issues, and recent work.  
Memory writes are optimized to stay **short and de-duplicated**:
- Central **Memory Compaction Rules** limit bullets per section and enforce concise, file-focused notes.
- A lightweight **dedupe protocol** prevents duplicate bullets by normalizing/merging similar entries instead of appending.
- Every skill’s `Memory Protocol` uses these rules, so memory stays useful over long-lived projects without growing out of control.

For Codex-style workspaces, memory can also be mirrored into:
- `memories/` (persistent user notes)
- `memories/session/` (conversation-scoped notes)
- `memories/repo/` (repo-scoped facts)

`.ai-memory.md` remains the cross-IDE canonical memory file.

## Agent Routing System

The `/agents` skill includes 11 specialist agent personas that are automatically selected based on your request:

- **Architect** — system design, scalability
- **Backend** — APIs, databases, server logic
- **Frontend** — UI, components, styling
- **DevOps** — CI/CD, Docker, infrastructure
- **QA** — testing, quality assurance
- **Security** — vulnerability analysis, hardening
- **Data** — databases, queries, migrations
- **Performance** — optimization, profiling
- **Documentation** — docs, README, guides
- **Reviewer** — code review, best practices
- **Fullstack** — cross-domain coordination

The router handles keyword matching, Vietnamese triggers, compound keywords, and vague-request fallback.

## How the Package is Structured

```
.kiro/skills/          # Canonical skill source (15 skills)
.agents/skills/        # Cross-client interop root
lib/skill-bundle.js    # Discovery, YAML parsing, catalog, render, install
bin/cli.js             # Interactive CLI with colors, prompts, GitHub fetcher
bin/install-skills.ps1 # Optional PowerShell wrapper
scripts/render-targets.js  # Sample output renderer
verify.js              # 44-check test suite
```

- Canonical source prefers `.skills`, then falls back to `.kiro/skills`
- `lib/skill-bundle.js` contains all discovery, parsing, rendering, and install logic
- `bin/cli.js` provides interactive install, GitHub `add`, list, status, and help commands
- Each skill exposes: `slug`, `name`, `description`, `sourceRoot`, `hasScripts`, `hasReferences`, `hasAssets`, and per-target compatibility metadata

## Development

```bash
# Run test suite (44 checks)
node verify.js

# Render sample targets
npm run build:targets
```

See [docs/skills-benchmark.md](docs/skills-benchmark.md) for the benchmark summary behind this design.

## Updating

See [Update.md](Update.md) for the full release workflow:

```bash
node verify.js                # Test first
git add . && git commit -m "description"
npm run release:patch         # Bug fixes: x.x.0 → x.x.1
npm run release:minor         # New features: x.0.x → x.1.0
npm run release:major         # Breaking: 0.x.x → 1.x.x
```

## License

MIT
