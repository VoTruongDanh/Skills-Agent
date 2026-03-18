---
name: checklist
description: Reusable pre/post checklists for any skill execution
---

## Pre-Execution Checklist (Run before ANY skill)
- [ ] Read `.ai-memory.md` from project root
- [ ] Understand user intent (ask if unclear)
- [ ] Check if similar work was done before (from memory)
- [ ] Identify the correct agent for the domain
- [ ] Minimize blast radius: identify the smallest set of files that must change
- [ ] If any step is uncertain or could cause broad changes, ask before editing

## Post-Execution Checklist (Run after ANY skill)
- [ ] All checklist items from the skill are satisfied
- [ ] No regressions introduced
- [ ] Code follows existing project conventions
- [ ] Update `.ai-memory.md` with findings (follow “Memory Compaction Rules”)
- [ ] Dedupe `.ai-memory.md` updates: merge similar bullets instead of appending duplicates
- [ ] Suggest related next steps

## Code Quality Checklist
- [ ] No hardcoded secrets or credentials
- [ ] Error handling at system boundaries
- [ ] Input validation for user-facing code
- [ ] Existing tests still pass
- [ ] New code is covered by tests (if test framework exists)

## Security Checklist
- [ ] No SQL injection vectors
- [ ] No XSS vulnerabilities
- [ ] No exposed secrets in code or logs
- [ ] Dependencies are up to date
- [ ] Access controls are appropriate
