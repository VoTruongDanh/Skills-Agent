---
name: plan
description: "Create concrete implementation plans with milestones, task breakdowns, and estimates. Use when the user wants to plan, organize work, or create a roadmap. Triggers: plan, milestone, breakdown, roadmap, estimate, kế hoạch, lên kế hoạch, phân chia công việc."
agents: [project-planner, orchestrator]
related-skills: [brainstorm, create, orchestrate]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check existing plans, milestones, project structure, tech stack, ongoing work, and past decisions.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: plan summary, phases/tasks, key risks, and first recommended action.

## Goal
Turn a request into an actionable plan with clear phases and tasks.

## Agent Routing
- For architecture planning → read `.kiro/skills/agents/agents/project-planner.md` and apply its knowledge
- For multi-domain coordination → read `.kiro/skills/agents/agents/orchestrator.md` and apply its knowledge
- For technical feasibility → read the relevant specialist agent file:
  - Backend: `.kiro/skills/agents/agents/backend-specialist.md`
  - Frontend: `.kiro/skills/agents/agents/frontend-specialist.md`
  - Database: `.kiro/skills/agents/agents/database-architect.md`

## Socratic Gate
Before planning, verify:
1. What is the desired outcome? (specific deliverable)
2. What constraints exist? (time, resources, tech stack)
3. What is already built vs needs to be built?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context and history.
2. Define the objective and acceptance criteria.
3. Break the work into phases and tasks.
4. Note file areas, systems, or modules likely to change.
5. Estimate complexity and highlight risky items.
6. End with a recommended first task.
7. **Update Memory** — Save plan details to `.ai-memory.md`.

## Output format
- Objective
- Acceptance criteria
- Phases (with tasks under each)
- File areas / modules affected
- Risks (with mitigation)
- Recommended first action

## Checklist
- [ ] Objective clearly stated
- [ ] Acceptance criteria defined
- [ ] Phases broken down
- [ ] Tasks are specific and actionable
- [ ] Complexity estimated per task
- [ ] Risks identified with mitigation
- [ ] First action recommended
- [ ] Memory file updated

## Rules
- Plans should be specific enough to execute.
- Prefer task sizes that can be completed and reviewed quickly.
- Minimize blast radius: call out the smallest set of files likely to change; if scope is unclear, ASK.
- Always read and update the memory file.

## Quality Gate
After completing, read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks.

## Related Skills
- `/brainstorm` → read `.kiro/skills/brainstorm/SKILL.md` — Explore options before planning
- `/create` → read `.kiro/skills/create/SKILL.md` — Execute planned tasks
- `/orchestrate` → read `.kiro/skills/orchestrate/SKILL.md` — Coordinate complex plans across teams
