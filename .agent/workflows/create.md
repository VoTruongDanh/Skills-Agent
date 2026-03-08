---
description: "Create a new implementation cleanly and with minimal disruption"
agents: [backend-specialist, frontend-specialist, database-architect]
---

> **Canonical source**: `.kiro/skills/create/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for conventions, patterns, stack. **END**: Update with what was created and patterns used.

## Steps
1. 🤖 **Agent**: Auto-select based on domain (backend/frontend/database)
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What to create? Does similar exist? Expected behavior?
4. **Understand** the requested artifact and existing project structure
5. **Identify** smallest complete implementation
6. **Create** necessary files, reusing existing patterns
7. **Include** validation, error handling, edge cases
8. **Add tests** if test framework exists
9. **Provide** usage notes and follow-up suggestions
10. **Update Memory** — Save what was created to `.ai-memory.md`

## Checklist
- [ ] Requirement understood
- [ ] Existing patterns checked
- [ ] Minimal files created
- [ ] Validation included
- [ ] Conventions matched
- [ ] Tests added if applicable
- [ ] Memory updated

## Related: `/plan`, `/test`, `/debug`
