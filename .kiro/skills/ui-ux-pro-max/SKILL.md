---
name: ui-ux-pro-max
description: "Advanced UI/UX improvements — layout, design critique, copy refinement, interaction design, accessibility, and responsive patterns. Use when the user wants professional-grade UI/UX upgrades. Triggers: ui, ux, design, layout, responsive, giao diện, thiết kế, cải thiện UI."
agents: [frontend-specialist, performance-optimizer]
related-skills: [create, preview, enhance]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check design system, brand guidelines, component library, past UI decisions, accessibility notes, and responsive design patterns.
**END**: Update `.ai-memory.md` with: UI/UX changes recommended/applied, design patterns used, accessibility improvements, and brand consistency notes.

## Goal
Upgrade the product experience with clear, practical UI/UX improvements.

## Agent Routing
- Primary → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- For performance of UI (load time, animations) → read `.kiro/skills/agents/agents/performance-optimizer.md` and apply its knowledge
- For accessibility compliance → apply WCAG knowledge from frontend-specialist
- For mobile responsiveness → apply mobile patterns from frontend-specialist

## Socratic Gate
Before improving UI/UX, verify:
1. What screen, flow, or component is being improved?
2. What is the current pain point? (visual, usability, accessibility, performance?)
3. Are there existing design guidelines or component library?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for design history and UI patterns.
2. Identify the screen, flow, or component being improved.
3. Evaluate hierarchy, spacing, clarity, accessibility, states, feedback, and conversion friction.
4. Recommend concrete improvements with rationale.
5. When asked to implement, favor polished but maintainable UI.
6. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and verify all states and accessibility.
7. **Update Memory** — Save UI/UX decisions and patterns to `.ai-memory.md`.

## Output format
- UX issues found
- Visual issues found
- Recommended changes (prioritized)
- Accessibility notes (WCAG compliance)
- Implementation priorities
- Component states covered (empty, loading, error, success)

## Checklist
- [ ] Target screen/component identified
- [ ] Hierarchy and spacing evaluated
- [ ] Accessibility checked (WCAG)
- [ ] All states covered (empty, loading, error, success)
- [ ] Mobile responsiveness considered
- [ ] Performance impact assessed
- [ ] Brand consistency maintained
- [ ] Memory file updated

## Rules
- Optimize for clarity before decoration.
- Respect existing brand and component patterns when present.
- Include empty, loading, error, and success states when relevant.
- Always read and update the memory file.

## Related Skills
- `/create` → read `.kiro/skills/create/SKILL.md` — Implement UI components
- `/preview` → read `.kiro/skills/preview/SKILL.md` — Preview design before implementation
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — Improve existing UI code
