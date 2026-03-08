---
description: "Create a concrete implementation plan with milestones and task breakdown"
agents: [project-planner, orchestrator]
---

> **Canonical source**: `.kiro/skills/plan/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for project context, past plans, constraints. **END**: Update with plan details and milestones.

## Steps
1. 🤖 **Agent**: Applying @project-planner knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What’s the scope? Deadline constraints? Must-haves vs nice-to-haves?
4. **Understand** the feature or change request
5. **Break down** into logical milestones
6. **List** specific tasks for each milestone
7. **Identify** risks and dependencies
8. **Suggest** implementation order (incremental delivery)
9. **Include** testing and documentation tasks
10. **Update Memory** — Save plan to `.ai-memory.md`

## Checklist
- [ ] Requirement understood
- [ ] Milestones defined
- [ ] Tasks are small and testable
- [ ] Risks identified
- [ ] Dependencies mapped
- [ ] Incremental delivery suggested
- [ ] Memory updated

## Related: `/brainstorm`, `/create`, `/orchestrate`
