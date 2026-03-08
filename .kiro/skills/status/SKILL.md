---
name: status
description: "Project status summary, progress snapshots, repo overview, and outstanding work tracking. Use when the user wants to know where a project stands. Triggers: status, progress, overview, what's done, dự án đang ở đâu, tiến độ, tổng quan."
agents: [project-planner, orchestrator]
related-skills: [plan, debug, deploy]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. This is the PRIMARY source for status — check all recorded history, decisions, tasks, bugs, and milestones.
**END**: Update `.ai-memory.md` with: current status snapshot, what is working, what is incomplete, risks found, and recommended priorities.

## Goal
Summarize where things stand right now, leveraging the memory file for deep context.

## Agent Routing
- For project health overview → read `.kiro/skills/agents/agents/project-planner.md` and apply its knowledge
- For multi-workstream status → read `.kiro/skills/agents/agents/orchestrator.md` and apply its knowledge
- For technical debt assessment → read the relevant specialist agent file based on domain

## Workflow
1. **Read Memory** — Load `.ai-memory.md` as the primary context source.
2. Inspect the repository, relevant files, and any recent context from the chat.
3. Summarize what already exists.
4. Identify gaps, risks, TODOs, and likely next priorities.
5. Present a concise health/status view.
6. **Update Memory** — Save current status snapshot to `.ai-memory.md`.

## Output format
- Current state (from memory + repo scan)
- What is working
- What is incomplete
- Risks or blockers
- Recent changes (from memory)
- Recommended next step

## Checklist
- [ ] Memory file read for historical context
- [ ] Repository scanned for current state
- [ ] Working features identified
- [ ] Gaps and incomplete items listed
- [ ] Risks or blockers flagged
- [ ] Next priority recommended
- [ ] Memory file updated with status snapshot

## Rules
- Be specific and evidence-based.
- Separate facts from inference.
- Always read and update the memory file.

## Quality Gate
After completing, read `.kiro/skills/_scripts/verify-all.md` for full project verification checklist.

## Related Skills
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Create plan for incomplete items
- `/debug` → read `.kiro/skills/debug/SKILL.md` — Investigate flagged risks
- `/deploy` → read `.kiro/skills/deploy/SKILL.md` — Deploy when ready
