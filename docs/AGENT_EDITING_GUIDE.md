# AGENT Editing Guide

This guide is for future AI agents that edit this repository.

## Purpose

This repository is a cross-IDE skill pack. The source of truth is the `skills/` directory, and generated or compatibility outputs must stay synchronized with it.

When you change anything, optimize for:
- Smallest correct change
- Root-cause fixes over surface patches
- Keeping all IDE targets in sync
- Passing verification before finishing

## Start Here

Before editing, always identify:
1. The exact user request
2. The concrete file, symbol, or command that controls the behavior
3. The cheapest check that can prove your hypothesis wrong

Do not start broad exploration. Read only the nearby files needed to understand the local control path.

## Repository Model

### Canonical source
- `skills/` is the source of truth for all skills.
- Edit skill behavior in `skills/<skill>/SKILL.md` first.
- Do not manually edit generated IDE targets unless you are fixing generator output itself.

### Generated / compatibility targets
- `.agent/workflows/` and `agent/workflows/` are Antigravity workflow bridges.
- `.cursor/rules/` is a generated Cursor compatibility layer.
- `.github/skills/` and other IDE-specific targets are generated from the canonical skill source.
- If you change the renderer, sync script, or detection logic, regenerate outputs afterward.

### Memory
- `.ai-memory.md` is the canonical project memory file.
- `memories/`, `memories/session/`, and `memories/repo/` are Codex-style memory locations.
- Update memory only when the task introduces durable repo knowledge or a meaningful decision.

## Important Files

If you are changing skill behavior, the usual control files are:
- `skills/instructions.md`
- `skills/agents/SKILL.md`
- `lib/skill-bundle.js`
- `bin/cli.js`
- `scripts/sync-all.js`
- `scripts/render-targets.js`
- `verify.js`
- `README.md`

If you are changing generated outputs, verify whether the change belongs in the generator instead.

## Skill Editing Workflow

1. Find the canonical skill under `skills/<skill>/SKILL.md`.
2. Edit the source skill first.
3. Update any routing or shared instructions that reference it.
4. Update the generator or bundle logic if the behavior depends on IDE detection, output format, or target list.
5. Regenerate generated targets with the sync script.
6. Run verification.
7. Fix only the failing slice, then rerun the same check.

## IDE Target Rules

Supported targets are defined in `lib/skill-bundle.js` and surfaced in the CLI and README.

When adding or changing an IDE target:
- Update alias mappings in `lib/skill-bundle.js`
- Update IDE definitions in `lib/skill-bundle.js`
- Update detection paths in `lib/skill-bundle.js`
- Update CLI menus/help text in `bin/cli.js`
- Update README supported IDE tables and examples
- Update `scripts/sync-all.js` if the new target should be regenerated
- Update `scripts/render-targets.js` if generated previews should include it
- Update `verify.js` so tests cover the new target

For Windsurf/Cascade specifically:
- Workspace skills live in `.windsurf/skills/<skill>/SKILL.md`
- Global skills live in `~/.codeium/windsurf/skills/<skill>/SKILL.md`
- `cascade` should be treated as an alias of `windsurf` if you support it in CLI input

## Workflow Bridge Rules

For Antigravity workflow files:
- Keep a canonical source marker in the generated workflow files
- The bridge file should point back to the canonical skill path
- If a generated workflow is missing the canonical source line, fix the renderer, then regenerate all workflow targets

## Validation Rules

Always validate after the first substantive edit.

Preferred order:
1. The cheapest behavior-scoped check
2. A narrow test for the touched slice
3. A narrow compile or lint check
4. `node verify.js` if it covers the changed behavior

Do not keep editing before running a focused validation unless the validation is impossible to run.

If verification fails:
- Determine whether the failure is caused by your change or by missing generated artifacts
- Fix the local slice immediately
- Rerun the same check before expanding scope

## Editing Rules

- Prefer `apply_patch` for manual edits
- Preserve existing style and formatting
- Do not reformat unrelated files
- Do not revert user changes you did not make
- Do not use destructive git commands unless explicitly requested
- Do not add broad comments unless they prevent confusion
- Keep file paths and target names exact

## What Not To Do

- Do not edit generated files when the generator is the real fix
- Do not add a new target in one place only
- Do not update README without updating code paths if the behavior changed
- Do not skip verification because the change looks small
- Do not widen scope after a failing check unless the failure proves your hypothesis wrong

## Checklist For Future Edits

- [ ] I found the concrete control file first
- [ ] I changed the canonical source before generated output
- [ ] I updated all related sync points
- [ ] I regenerated outputs if needed
- [ ] I ran the narrowest useful validation
- [ ] I fixed the failing slice only
- [ ] I finished with a passing verification step

## Quick Reference

If you are unsure where to start:
- Skills and routing: `skills/`
- Generated skill targets: `agent/workflows/` and `.agent/workflows/`
- CLI behavior: `bin/cli.js`
- Bundle and IDE definitions: `lib/skill-bundle.js`
- Sync generation: `scripts/sync-all.js`
- Preview generation: `scripts/render-targets.js`
- Safety checks: `verify.js`
- Human release notes: `Update.md`

## Final Principle

If a change affects behavior, routing, or installation, assume there is a shared source of truth somewhere else in the repo. Find that source and update it too.