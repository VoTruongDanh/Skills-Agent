# Changelog

## [Unreleased]

### Added
- **New IDE Support: Windsurf/Cascade** - Native `.windsurf/skills/<skill>/SKILL.md` support
  - Project installs to `.windsurf/skills/<skill>/SKILL.md`
  - Global installs to `~/.codeium/windsurf/skills/<skill>/SKILL.md`
  - CLI support for `--ide=windsurf` and `--ide=cascade`

## [3.3.0] - 2026-05-01

### Added
- **New IDE Support: Claude Code** - Full support for Claude Code IDE
  - Native `.claude/skills/<skill>/SKILL.md` format
  - Follows Agent Skills open standard
  - Auto-detection via `.claude` directory and `CLAUDE.md` file
- **New Skill: motion-ui** - Advanced Motion UI (AMUI) with Framer Motion micro-interactions
  - Complete design system with tokens (colors, timing, easing)
  - 6 component patterns (Button, Input, Alert, Success View, Card, Modal)
  - Motion rules and animation guidelines
  - Accessibility support (prefers-reduced-motion)
  - 3 example components with TypeScript/React code
- **Memory Compaction System** - New documentation for managing `.ai-memory.md`
  - `.kiro/skills/_scripts/memory-compact.md` - Full compaction procedure
  - Updated checklist.md with memory compaction checks
  - Updated instructions.md with compaction guidelines

### Enhanced
- Updated all documentation to reflect 16 skills (was 15)
- Updated README.md with motion-ui skill and Claude Code support
- Updated verify.js to check for 16 skills
- Improved memory management documentation
- CLI now supports `--ide=claude-code` flag

### Skills Now Include (16 total)
- agents, brainstorm, clean, create, debug, deploy, enhance, explain, integrate, **motion-ui (NEW)**, orchestrate, plan, preview, status, test, ui-ux-pro-max

### Infrastructure
- Added GitHub Actions workflow for automated npm publishing
- Updated release scripts to only create tags (publish is automated)
- Improved Update.md with GitHub Actions setup guide

### Supported IDEs (8 total)
- Kiro, Cursor, **Claude Code (NEW)**, Antigravity, Codex, VS Code, GitHub Copilot, Generic

## [1.5.0] - 2026-03-05

### Added
- **New Skill: Clean** - Remove junk files, temporary files, AI-generated artifacts, and cache
- Full support for Cursor IDE with `.cursor/rules/*.mdc` format
- Full support for Antigravity IDE with `.agent/rules/*.md` format
- Multi-IDE compatibility layer for all 12 skills

### Enhanced
- Updated README with 12 skills (added Clean)
- Improved package.json to include `.cursor` and `.agent` directories
- Better cross-IDE compatibility

### Skills Now Include
- brainstorm, clean (NEW), create, debug, deploy, enhance, orchestrate, plan, preview, status, test, ui-ux-pro-max

## [1.0.0] - 2026-03-05

### Added
- Initial release of AI Agent Skills
- 11 professional skills for AI-powered development
- Universal support for Kiro, Cursor, Windsurf, and other IDEs
- Automatic IDE detection
- One-command installation via npx
- Project-specific and global installation modes

### Skills Included
- brainstorm - Ideation and feature exploration
- create - Build new features and components
- debug - Root-cause analysis and bug fixing
- deploy - Deployment and release preparation
- enhance - Improve and refactor existing code
- orchestrate - Multi-step coordinated planning
- plan - Implementation planning and breakdown
- preview - Preview expected output and UX
- status - Project status and progress summary
- test - Test strategy and coverage
- ui-ux-pro-max - UI/UX improvements and design

### Features
- Zero dependencies
- Automatic IDE detection (Kiro, Cursor, Windsurf)
- Customizable skill definitions
- Works on Windows, macOS, Linux
- No GitHub cloning required

[1.0.0]: https://github.com/votruongdanh/ai-agent-skills/releases/tag/v1.0.0
