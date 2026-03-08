---
description: "Write tests, test strategy, coverage improvements, and validation steps"
agents: [test-engineer, backend-specialist]
---

> **Canonical source**: `.kiro/skills/test/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for test framework, coverage status, past failures. **END**: Update with tests written and coverage changes.

## Steps
1. 🤖 **Agent**: Applying @test-engineer knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What to test? Test type (unit/integration/e2e)? Framework in use?
4. **Understand** what needs testing (feature, bug fix, edge case)
5. **Identify** appropriate test type
6. **Write** test cases covering happy path + edge cases + error conditions
7. **Suggest** coverage improvements
8. **Provide** instructions to run tests
9. **Update Memory** — Save test results to `.ai-memory.md`

## Checklist
- [ ] Test scope understood
- [ ] Test type chosen
- [ ] Happy path covered
- [ ] Edge cases covered
- [ ] Error conditions covered
- [ ] Tests are fast and isolated
- [ ] Run instructions provided
- [ ] Memory updated

## Related: `/debug`, `/create`, `/enhance`
