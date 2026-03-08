---
name: brainstorm
description: "Ideation, option generation, and feature exploration. Use when the user wants to brainstorm ideas, explore options, compare approaches, or generate creative solutions. Triggers: brainstorm, ideate, options, ý tưởng, so sánh phương án."
agents: [project-planner, orchestrator]
related-skills: [plan, create, orchestrate]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Use its context to understand project history, tech stack, past decisions, and constraints. If missing, note this and create it after completing this task.
**END**: Update `.ai-memory.md` with: problem explored, options considered, chosen direction, constraints discovered, and any new project understanding.

## Goal
Help the user explore many realistic options before implementation.

## Agent Routing
- If brainstorm involves system architecture → read `.kiro/skills/agents/agents/project-planner.md` and apply its knowledge
- If brainstorm spans multiple domains → read `.kiro/skills/agents/agents/orchestrator.md` and apply its knowledge
- If brainstorm is about UI/UX → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- If brainstorm is about APIs/backend → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge

## Socratic Gate
Before generating options, verify:
1. What problem are we solving? (clarity check)
2. What constraints exist? (budget, time, tech stack, team)
3. Who are the users/stakeholders?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context.
2. Restate the problem in one or two sentences.
3. Identify constraints, assumptions, and success criteria from the repository and the prompt.
4. Produce 3-7 strong options with pros, cons, complexity, and risks.
5. Call out the most practical option and the boldest option.
6. End with a recommended next step or implementation path.
7. **Update Memory** — Save new understanding to `.ai-memory.md`.

## Output format
- Problem framing
- Constraints
- Options (3-7 with pros/cons/complexity/risk for each)
- Recommendation (most practical + boldest)
- Next step

## Checklist
- [ ] Problem clearly restated
- [ ] Constraints identified from repo + prompt
- [ ] At least 3 viable options generated
- [ ] Each option has pros, cons, complexity rating
- [ ] Practical and bold options highlighted
- [ ] Next step recommended
- [ ] Memory file updated

## Rules
- Prefer practical ideas grounded in the current project.
- Avoid pretending uncertain assumptions are facts.
- If code context matters, inspect the repo structure first.
- Always read and update the memory file.

## Quality Gate
After completing, read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks.

## Related Skills
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Turn chosen option into actionable plan
- `/create` → read `.kiro/skills/create/SKILL.md` — Implement the chosen option
- `/orchestrate` → read `.kiro/skills/orchestrate/SKILL.md` — Coordinate multi-domain brainstorm results
