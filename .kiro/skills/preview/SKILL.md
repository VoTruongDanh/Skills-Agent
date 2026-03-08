---
name: preview
description: "Preview expected output, UX flows, copy, interaction design, or generated content before implementing. Use when the user wants to see what something will look like. Triggers: preview, mockup, show me, xem trước, thử xem, mô phỏng."
agents: [frontend-specialist, documentation-writer]
related-skills: [create, ui-ux-pro-max, plan]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check UI patterns, design decisions, existing previews, brand guidelines, and user flow notes.
**END**: Update `.ai-memory.md` with: what was previewed, assumptions made, feedback received, and design decisions confirmed.

## Goal
Show the user what the result will look or feel like before full implementation.

## Agent Routing
- If previewing UI/UX → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- If previewing documentation → read `.kiro/skills/agents/agents/documentation-writer.md` and apply its knowledge
- If previewing API response → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge

## Socratic Gate
Before previewing, verify:
1. What artifact is being previewed? (UI, API output, document, flow?)
2. What level of fidelity is expected? (wireframe, mockup, full sample?)
3. Any specific requirements or constraints?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context and design history.
2. Infer the artifact being previewed: UI, API output, document, message, workflow, or report.
3. Produce a faithful mock, sample output, walkthrough, or structured preview.
4. Highlight assumptions behind the preview.
5. Identify what could change during implementation.
6. **Update Memory** — Save preview details and decisions to `.ai-memory.md`.

## Checklist
- [ ] Artifact type identified
- [ ] Preview is realistic and faithful
- [ ] Assumptions clearly labeled
- [ ] Mock data marked as illustrative
- [ ] Implementation differences noted
- [ ] Memory file updated

## Rules
- Keep previews realistic and consistent with the current project.
- Label illustrative content clearly when it is mock data.
- Always read and update the memory file.

## Quality Gate
After completing, read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks.

## Related Skills
- `/create` → read `.kiro/skills/create/SKILL.md` — Implement the previewed design
- `/ui-ux-pro-max` → read `.kiro/skills/ui-ux-pro-max/SKILL.md` — Advanced UI/UX design
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Plan implementation of previewed feature
