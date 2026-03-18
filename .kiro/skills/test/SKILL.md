---
name: test
description: "Write tests, improve coverage, define test strategy, and add validation. Use when the user wants to test code, add unit/integration/e2e tests, or check coverage. Triggers: test, coverage, jest, vitest, playwright, spec, kiểm thử, viết test."
agents: [test-engineer, debugger]
related-skills: [debug, create, enhance]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check test framework in use, existing test coverage, known failing tests, testing patterns, and CI/CD test configuration.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: tests changed, coverage deltas (if known), patterns established, and gaps.

## Goal
Improve confidence in the system through targeted testing.

## Agent Routing
- Primary → read `.kiro/skills/agents/agents/test-engineer.md` and apply its knowledge
- If testing reveals bugs → read `.kiro/skills/agents/agents/debugger.md` and apply its knowledge
- For E2E/integration tests with UI → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- For API/backend tests → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge
- For security testing → read `.kiro/skills/agents/agents/security-auditor.md` and apply its knowledge

## Socratic Gate
Before writing tests, verify:
1. What is the test scope? (unit, integration, E2E, API?)
2. Does a test framework already exist in the project?
3. What are the critical paths that must be tested?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for testing history and patterns.
2. Identify the unit, integration, API, UI, or regression scope.
3. Enumerate critical paths, edge cases, and failure modes.
4. Add or propose tests that cover the most important risks first.
5. Explain how to run the tests and what passing means.
6. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and run test suite after writing tests.
7. **Update Memory** — Save test details and coverage notes to `.ai-memory.md`.

## Checklist
- [ ] Test scope identified
- [ ] Test framework confirmed/proposed
- [ ] Critical paths covered
- [ ] Edge cases included
- [ ] Failure modes tested
- [ ] Tests are stable (not brittle)
- [ ] Run instructions provided
- [ ] Memory file updated

## Rules
- Prefer stable tests over brittle tests.
- Cover both happy path and key edge cases.
- If no test framework exists, propose the lightest practical option.
- Avoid changing unrelated production code; if tests require refactors, ASK before widening scope.
- Always read and update the memory file.

## Related Skills
- `/debug` → read `.kiro/skills/debug/SKILL.md` — Fix failing tests or bugs found
- `/create` → read `.kiro/skills/create/SKILL.md` — Create test fixtures or helpers
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — Improve test quality and coverage
