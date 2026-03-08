---
description: "Help explore many realistic options before implementation"
agents: [project-planner, orchestrator]
---

> **Canonical source**: `.kiro/skills/brainstorm/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for project context. **END**: Update with options explored and decisions.

## Steps
1. 🤖 **Agent**: Applying @project-planner knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What problem? What constraints? Who are users?
4. **Restate** the problem in 1-2 sentences
5. **Identify** constraints, assumptions, success criteria
6. **Generate** 3-7 options with pros, cons, complexity, risk
7. **Highlight** most practical + boldest option
8. **Recommend** next step or implementation path
9. **Update Memory** — Save findings to `.ai-memory.md`

## Output format
- Problem framing
- Constraints
- Options (3-7 with pros/cons/complexity/risk)
- Recommendation
- Next step

## Checklist
- [ ] Problem restated
- [ ] Constraints identified
- [ ] 3+ options generated
- [ ] Practical + bold highlighted
- [ ] Next step recommended
- [ ] Memory updated

## Related: `/plan`, `/create`, `/orchestrate`
