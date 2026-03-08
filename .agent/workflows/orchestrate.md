---
description: "Coordinate multi-step workflows across multiple roles, files, systems, or parallel workstreams"
agents: [orchestrator, project-planner]
---

> **Canonical source**: `.kiro/skills/orchestrate/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for project state, active workstreams. **END**: Update with orchestration plan and status.

## Steps
1. 🤖 **Agent**: Applying @orchestrator knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What’s the high-level objective? How many workstreams? What’s the timeline?
4. **Break down** objective into distinct phases
5. **Map** dependencies between phases
6. **Assign** clear responsibilities (agents/roles) for each phase
7. **Identify** parallel workstreams
8. **Define** checkpoints and validation between phases
9. **Include** rollback/recovery for each phase
10. **Update Memory** — Save orchestration plan to `.ai-memory.md`

## Checklist
- [ ] Objective decomposed into phases
- [ ] Dependencies mapped
- [ ] Responsibilities assigned
- [ ] Parallel streams identified
- [ ] Checkpoints defined
- [ ] Rollback plans included
- [ ] Memory updated

## Related: `/plan`, `/brainstorm`, `/status`
