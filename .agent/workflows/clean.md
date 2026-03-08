---
description: "Clean up junk files, temporary files, AI-generated artifacts, and cache"
agents: [devops-engineer]
---

> **Canonical source**: `.kiro/skills/clean/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for cleanup history. **END**: Update with files cleaned and patterns found.

## Steps
1. 🤖 **Agent**: Applying @devops-engineer knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: Is project under VCS? Uncommitted changes? Patterns to preserve?
4. **Scan** project for junk patterns (tmp, logs, cache, build artifacts, AI artifacts)
5. **Present** file list with sizes and reasons
6. **Confirm** with user before deletion
7. **Remove** approved files, report space saved
8. **Suggest** .gitignore updates
9. **Update Memory** — Save cleanup results to `.ai-memory.md`

## Safety: Never delete `.ai-memory.md`, source code, or config without explicit confirmation.

## Checklist
- [ ] Git status checked
- [ ] Junk patterns scanned
- [ ] File list presented
- [ ] User confirmed
- [ ] Files removed
- [ ] .gitignore updated
- [ ] Memory updated

## Related: `/status`, `/enhance`
