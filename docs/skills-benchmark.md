# Skills Benchmark Notes

This package stays intentionally small. The goal is to keep a tight install-and-distribute tool for curated agent skills, not to become a full marketplace or workflow runtime.

## Kept

- `antigravity-kit`: specialist workflows and project packaging confirmed that generated compatibility outputs are useful, but they should stay a bridge rather than become the core model.
- `agentskills.io` and GitHub Copilot agent skills: validated the portable `SKILL.md` direction and the idea that skills can include companion folders such as `scripts/`, `references/`, and `assets/`.
- `skillcreatorai/Ai-Agent-Skills`, `vercel-labs/skills`, and SkillPort: reinforced the value of lightweight catalog discovery, metadata, and validation instead of shipping a large monolithic bundle.
- Cursor docs: confirmed `.mdc` rules are compatibility/context artifacts, not a full replacement for native skill folders.
- Kiro Powers: useful as a north-star for capability bundles, but broader than this package should absorb right now.

## Implemented from the benchmark

- Dual-source canonical discovery with `.skills` first and `.kiro/skills` as a fallback.
- YAML parsing that preserves richer frontmatter fields instead of flattening them.
- A small bundled catalog surface for `list` and `list --json`.
- Compatibility warnings when generated targets cannot preserve companion asset folders.

## Deliberately skipped

- Remote registries or GitHub import flows
- Marketplace search UX beyond local bundled catalog listing
- MCP servers, hook orchestration, or runtime sub-agent systems
- Converting the package into a full Kiro Power or Antigravity project scaffold

The package should remain easy to audit, small enough to use end-to-end, and focused on shipping curated skills across multiple IDEs.
