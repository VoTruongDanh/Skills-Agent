---
name: enhance
description: "Improve existing code — refactor, optimize performance, tighten security, or enhance UX. Use when the user wants to make code better without changing its purpose. Triggers: enhance, improve, refactor, optimize, review, cải thiện, tối ưu, nhanh hơn, code dài quá."
agents: [performance-optimizer, security-auditor, frontend-specialist]
related-skills: [debug, test, plan]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check past enhancements, known pain points, tech debt notes, performance baselines, and architecture decisions.
**END**: Update `.ai-memory.md` with: what was enhanced, improvements made, performance gains, tradeoffs accepted, and any remaining tech debt.

## Goal
Improve an existing implementation without breaking working behavior.

## Agent Routing
- If enhancing performance → read `.kiro/skills/agents/agents/performance-optimizer.md` and apply its knowledge
- If tightening security → read `.kiro/skills/agents/agents/security-auditor.md` and apply its knowledge
- If improving UI/UX → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- If refactoring backend/API → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge
- If improving database queries → read `.kiro/skills/agents/agents/database-architect.md` and apply its knowledge

## Socratic Gate
Before enhancing, verify:
1. What specific aspect needs improvement? (performance, security, UX, maintainability?)
2. What is the current pain point or metric?
3. Are there existing tests that must continue to pass?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context and past enhancement history.
2. Understand the current state and pain points.
3. Identify high-impact improvements in quality, maintainability, performance, reliability, or UX.
4. Prioritize improvements by value versus effort.
5. Implement or recommend the top changes.
6. Explain tradeoffs and validation steps.
7. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and verify enhancements don't break existing behavior.
8. **Update Memory** — Save enhancement details and outcomes to `.ai-memory.md`.

## Checklist
- [ ] Current state documented
- [ ] Pain points identified
- [ ] Improvements prioritized by value/effort
- [ ] Existing behavior preserved
- [ ] Tradeoffs explained
- [ ] Tests still passing
- [ ] Memory file updated

## Rules
- Preserve behavior unless the user asked for a behavior change.
- Prefer small, meaningful upgrades over broad rewrites.
- If performance is discussed, explain where the gain comes from.
- Always read and update the memory file.

## Related Skills
- `/debug` → read `.kiro/skills/debug/SKILL.md` — Fix issues found during enhancement
- `/test` → read `.kiro/skills/test/SKILL.md` — Verify enhancements don't break things
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Plan large-scale refactoring
