---
name: create
description: "Build new features, files, components, endpoints, pages, or scripts. Use when the user wants to create something new in the codebase. Triggers: create, build, add, new, scaffold, tạo, thêm mới, tạo trang, tạo API."
agents: [backend-specialist, frontend-specialist, database-architect]
related-skills: [plan, test, debug]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check tech stack, coding conventions, existing patterns, architecture decisions, and file structure notes.
**END**: Update `.ai-memory.md` with: what was created, files added/modified, patterns used, architecture decisions, and any follow-up tasks.

## Goal
Create a new implementation cleanly and with minimal disruption.

## Agent Routing
- If creating API/backend → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge
- If creating UI component/page → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- If creating database schema/migration → read `.kiro/skills/agents/agents/database-architect.md` and apply its knowledge
- If creating tests → read `.kiro/skills/agents/agents/test-engineer.md` and apply its knowledge
- If creating deployment config → read `.kiro/skills/agents/agents/devops-engineer.md` and apply its knowledge

## Socratic Gate
Before creating, verify:
1. What exactly should be created? (component, page, API, script?)
2. Does something similar already exist in the project?
3. What is the expected behavior/output?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context, conventions, and patterns.
2. Understand the requested artifact and the existing project structure.
3. Identify the smallest complete implementation that satisfies the request.
4. Create or update the necessary files only.
5. Reuse existing patterns, naming, and architecture already present in the repo.
6. Include basic validation and error handling.
7. Add brief usage notes, edge cases, and follow-up improvements.
8. **Update Memory** — Save what was created, patterns used, and follow-up notes to `.ai-memory.md`.

## Checklist
- [ ] Requirement clearly understood
- [ ] Existing patterns/conventions checked
- [ ] Minimal files created/modified
- [ ] Validation and error handling included
- [ ] Project conventions matched (naming, structure)
- [ ] Tests added if test framework exists
- [ ] Usage notes provided
- [ ] Memory file updated

## Rules
- Prefer incremental changes over large rewrites.
- Match the project's conventions.
- Include basic validation and error handling.
- If tests exist nearby, add or update them when appropriate.
- Always read and update the memory file.

## Quality Gate
After completing, read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks.

## Related Skills
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Plan before creating complex features
- `/test` → read `.kiro/skills/test/SKILL.md` — Write tests for new code
- `/debug` → read `.kiro/skills/debug/SKILL.md` — Fix issues in newly created code
