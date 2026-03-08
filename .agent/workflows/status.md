---
description: "Get current project status summary, progress snapshot, repo overview, and outstanding work"
agents: [orchestrator, project-planner]
---

> **Canonical source**: `.kiro/skills/status/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for project history, past status, known issues. **END**: Update with current snapshot.

## Steps
1. 🤖 **Agent**: Applying @orchestrator knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Scan** repository structure and key files
4. **Check** git history for recent changes (if available)
5. **Identify** completed features, in-progress work, outstanding tasks
6. **Highlight** blockers, risks, known issues
7. **Suggest** actionable next steps and priorities
8. **Update Memory** — Save current status snapshot to `.ai-memory.md`

## Output format
- Project overview
- Recent changes
- In-progress work
- Outstanding tasks
- Blockers/risks
- Suggested next steps

## Checklist
- [ ] Repo structure scanned
- [ ] Git history checked
- [ ] Feature status identified
- [ ] Blockers highlighted
- [ ] Next steps suggested
- [ ] Memory updated

## Related: `/plan`, `/orchestrate`, `/clean`
