---
description: "Root-cause analysis for bugs, failing commands, broken behavior, and error logs. Use when the user encounters errors, crashes, or unexpected behavior. Triggers: debug, fix, bug, error, crash, lỗi, sửa lỗi, hỏng, fail."
agents: [debugger, backend-specialist, frontend-specialist]
---

Canonical source: .kiro/skills/debug/SKILL.md

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check for known bugs, past fixes, tech stack details, common error patterns, and architecture notes.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: bug, root cause, fix, files touched, lessons learned, and remaining risks.

## Goal
Find the real root cause, not just the first visible symptom.

## Agent Routing
- If bug is in API/server/backend → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge
- If bug is in UI/rendering/CSS → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- If bug is in database/queries → read `.kiro/skills/agents/agents/database-architect.md` and apply its knowledge
- If bug may be a security issue → read `.kiro/skills/agents/agents/security-auditor.md` and apply its knowledge
- Default → read `.kiro/skills/agents/agents/debugger.md` and apply its systematic analysis

## Socratic Gate
Before debugging, verify:
1. What is the expected behavior vs actual behavior?
2. Is there a log, stacktrace, or error message?
3. When did this start? (recent change, always broken, intermittent?)
4. Have we tried this before?
If any answer is missing, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context and past bug history.
2. Summarize the bug, expected behavior, and actual behavior.
3. Gather evidence from logs, stack traces, code paths, config, and recent changes.
4. List the top hypotheses ranked by likelihood. **Eliminate previously failed hypotheses immediately.**
5. Eliminate hypotheses using direct evidence.
6. Identify the root cause and confirm with evidence before attempting any code changes.
7. Propose an effective solution that addresses the root cause definitively. **Ensure clean code standards are met and fully update all related files.**
8. Suggest how to verify the fix and prevent regressions.
9. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and run cross-cutting quality checks.
10. **Update Memory** — Save root cause, fix, and lessons to `.ai-memory.md`.

## Output format
- Symptom
- Evidence collected
- Failed Attempts (to avoid repetition)
- Hypotheses (ranked by likelihood)
- Root cause
- Fix (Clean code & complete file updates)
- Verification steps
- Regression prevention

## Checklist
- [ ] Bug clearly described (expected vs actual)
- [ ] Past failed attempts reviewed to prevent loop
- [ ] Evidence gathered and root cause definitively confirmed
- [ ] Hypotheses listed and ranked
- [ ] Root cause confirmed with evidence
- [ ] Fix is effective and addresses root cause directly
- [ ] No side effects introduced
- [ ] Verification steps provided
- [ ] Regression prevention suggested
- [ ] Memory file updated

- [ ] Clean code chuẩn (Standard clean code applied)
- [ ] Cập nhật đầy đủ tất cả các file liên quan (All related files fully updated)

## Rules
- Do not guess when evidence is missing; say what must be checked.
- Prefer deterministic reproduction steps.
- Mention any hidden risk or side effect of the fix.
- Avoid changing unrelated files; if a fix seems wide-impact, ASK before proceeding.
- Always read and update the memory file.

## Related Skills
- `/test` → read `.kiro/skills/test/SKILL.md` — Write tests to prevent regression
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — Improve code quality after fixing
- `/status` → read `.kiro/skills/status/SKILL.md` — Check project health after fix
