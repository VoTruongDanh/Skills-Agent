# AI Agent Skills

Cross-IDE AI agent skills with one canonical `SKILL.md` source and installers that render the right layout for each IDE.

[![npm version](https://img.shields.io/npm/v/@votruongdanh/ai-agent-skills.svg)](https://www.npmjs.com/package/@votruongdanh/ai-agent-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick install

```bash
npx @votruongdanh/ai-agent-skills init
```

This is the primary online install path for any machine with Node.js.

If auto-detection is ambiguous, force the target IDE:

```bash
npx @votruongdanh/ai-agent-skills init --ide=cursor
npx @votruongdanh/ai-agent-skills init --ide=antigravity
npx @votruongdanh/ai-agent-skills init --ide=vscode
npx @votruongdanh/ai-agent-skills init --ide=kiro
```

The CLI now also searches parent folders, so running the command inside `src/`, `apps/web/`, or another subfolder can still detect the IDE marker from the workspace root.

PowerShell wrapper is optional only. The package does not require PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\bin\install-skills.ps1 -Ide vscode
```

## What is actually supported

The installer now writes IDE-specific layouts instead of copying `.kiro` everywhere.

| IDE | Installed layout | Notes |
| --- | --- | --- |
| Kiro | `.kiro/skills/<skill>/SKILL.md` | Native skill format |
| Cursor | `.cursor/skills/<skill>/SKILL.md` | Native skill format |
| Cursor legacy | `.cursor/rules/<skill>.mdc` | Generated compatibility layer |
| Antigravity | `.agent/workflows/<skill>.md` | Generated workflow bridge |
| Antigravity legacy | `agent/workflows/<skill>.md` | Compatibility alias for older setups |
| VS Code / GitHub Copilot | `.github/skills/<skill>/SKILL.md` | Native agent skills |
| Global Copilot | `~/.copilot/skills/<skill>/SKILL.md` | Used by `global` install |

## Available skills

- `/brainstorm`
- `/clean`
- `/create`
- `/debug`
- `/deploy`
- `/enhance`
- `/orchestrate`
- `/plan`
- `/preview`
- `/status`
- `/test`
- `/ui-ux-pro-max`

## Commands

```bash
npx @votruongdanh/ai-agent-skills init
npx @votruongdanh/ai-agent-skills init --ide=kiro
npx @votruongdanh/ai-agent-skills init --ide=cursor
npx @votruongdanh/ai-agent-skills init --ide=antigravity
npx @votruongdanh/ai-agent-skills init --ide=vscode
npx @votruongdanh/ai-agent-skills init --ide=copilot
npx @votruongdanh/ai-agent-skills init --ide=generic
npx @votruongdanh/ai-agent-skills global
```

Recommended:

- Use `npx @votruongdanh/ai-agent-skills init` for normal online install.
- Use `--ide=<name>` only when auto-detect picks the wrong target.
- If you run the command from a nested folder, the CLI will try to install at the detected workspace root.
- Ignore the PowerShell wrapper unless you specifically want a Windows shortcut.

## How the package is structured

- Canonical source lives in `.kiro/skills`.
- `bin/cli.js` renders each skill into the correct target format for the chosen IDE.
- `lib/skill-bundle.js` contains the shared render and install logic.
- `scripts/render-targets.js` renders sample outputs under `generated/`.

## Development

```bash
npm test
npm run build:targets
```

`npm test` runs installation verification against temporary Kiro, Cursor, Antigravity, and VS Code targets.

## License

MIT
