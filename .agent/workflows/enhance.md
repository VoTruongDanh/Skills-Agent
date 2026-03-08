---
description: "Improve an existing implementation without breaking working behavior"
agents: [performance-optimizer, security-auditor]
---

> **Canonical source**: `.kiro/skills/enhance/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for past improvements, known tech debt. **END**: Update with changes made and metrics improved.

## Steps
1. 🤖 **Agent**: Applying @performance-optimizer knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What aspect to improve? Performance/quality/UX? Current pain points?
4. **Understand** current state and pain points
5. **Identify** high-impact improvements (quality, maintainability, performance, reliability, UX)
6. **Prioritize** by value vs effort
7. **Implement** top changes preserving existing behavior
8. **Explain** tradeoffs and validation steps
9. **Update Memory** — Save improvements to `.ai-memory.md`

## Checklist
- [ ] Current state understood
- [ ] Pain points identified
- [ ] Improvements prioritized
- [ ] Behavior preserved
- [ ] Tradeoffs explained
- [ ] Validation steps provided
- [ ] Memory updated

## Related: `/debug`, `/test`, `/clean`
