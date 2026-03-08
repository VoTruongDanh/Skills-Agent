---
description: "Find the real root cause, not just the first visible symptom"
agents: [debugger, backend-specialist, frontend-specialist]
---

> **Canonical source**: `.kiro/skills/debug/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for past bugs, fixes, known issues. **END**: Update with root cause, fix applied, lessons learned.

## Steps
1. 🤖 **Agent**: Applying @debugger knowledge (+ domain specialist as needed)
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if missing: Expected vs actual? Log/stacktrace? When started?
4. **Summarize** bug, expected behavior, actual behavior
5. **Gather** evidence from logs, stack traces, code, config, recent changes
6. **Hypothesize** — List top causes ranked by likelihood
7. **Eliminate** — Use evidence to narrow down
8. **Root Cause** — Confirm with evidence
9. **Fix** — Propose smallest safe change
10. **Verify** — How to test fix + prevent regression
11. **Update Memory** — Save root cause and fix to `.ai-memory.md`

## Output format
- Symptom
- Evidence
- Hypotheses (ranked)
- Root cause
- Fix
- Verification + regression prevention

## Checklist
- [ ] Bug described (expected vs actual)
- [ ] Evidence gathered
- [ ] Hypotheses ranked
- [ ] Root cause confirmed
- [ ] Fix is minimal and safe
- [ ] No side effects
- [ ] Verification steps provided
- [ ] Memory updated

## Related: `/test`, `/enhance`, `/status`
