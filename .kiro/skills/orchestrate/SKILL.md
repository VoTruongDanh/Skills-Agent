---
name: orchestrate
description: "Coordinate multi-step plans across multiple roles, files, systems, or parallel workstreams. Use when the user has a complex request spanning multiple domains or needing decomposition. Triggers: orchestrate, coordinate, multi-step, full-stack, tổng hợp, làm nhiều bước."
agents: [orchestrator, project-planner]
related-skills: [plan, create, deploy, test]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check project architecture, team structure, past orchestration plans, ongoing tasks, and blockers.
**END**: Update `.ai-memory.md` with: workstreams defined, agent assignments, dependencies identified, execution order, and any blockers or risks discovered.

## Goal
Break a complex request into a coordinated execution plan with clear agent assignments.

## Agent Routing
- Primary coordinator → read `.kiro/skills/agents/agents/orchestrator.md` and apply its knowledge
- For planning phases → read `.kiro/skills/agents/agents/project-planner.md` and apply its knowledge
- For each workstream, read the most relevant agent file:
  - Frontend tasks → read `.kiro/skills/agents/agents/frontend-specialist.md`
  - Backend tasks → read `.kiro/skills/agents/agents/backend-specialist.md`
  - Database tasks → read `.kiro/skills/agents/agents/database-architect.md`
  - Testing → read `.kiro/skills/agents/agents/test-engineer.md`
  - Security review → read `.kiro/skills/agents/agents/security-auditor.md`
  - Deployment → read `.kiro/skills/agents/agents/devops-engineer.md`

## Socratic Gate
Before orchestrating, verify:
1. What is the full objective? (end-to-end scope)
2. How many domains are involved? (frontend, backend, DB, infra?)
3. Are there hard dependencies or deadlines?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context and history.
2. Decompose the objective into workstreams.
3. Assign each workstream to the appropriate agent/role.
4. Identify dependencies, blockers, and the critical path.
5. Define parallelizable tasks and merge points.
6. Produce an execution order with clear handoffs.
7. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and verify each workstream output before merge.
8. **Update Memory** — Save orchestration plan to `.ai-memory.md`.

## Output format
- Objective
- Workstreams (with assigned agents)
- Dependencies and critical path
- Execution order (sequential + parallel)
- Risks and mitigations
- Done criteria for each workstream

## Checklist
- [ ] Objective clearly defined
- [ ] Workstreams decomposed
- [ ] Agents assigned to each workstream
- [ ] Dependencies mapped
- [ ] Critical path identified
- [ ] Parallel tasks defined
- [ ] Handoff points clear
- [ ] Done criteria set
- [ ] Memory file updated

## Rules
- Keep plans realistic for the current project.
- Surface unknowns early.
- Favor visible checkpoints over long hidden work.
- Always read and update the memory file.

## Related Skills
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Detailed planning for individual workstreams
- `/create` → read `.kiro/skills/create/SKILL.md` — Execute creation tasks
- `/deploy` → read `.kiro/skills/deploy/SKILL.md` — Deploy completed work
- `/test` → read `.kiro/skills/test/SKILL.md` — Validate each workstream
