---
description: "Help the user deeply understand code, logic, architecture, or behavior"
agents: [documentation-writer, backend-specialist, frontend-specialist]
---

> **Canonical source**: `.kiro/skills/explain/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for tech stack, architecture, past explanations. **END**: Update with key insights shared.

## Steps
1. 🤖 **Agent**: Applying @documentation-writer knowledge (+ domain specialist as needed)
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if missing: Which code? What detail level? Familiarity?
4. **Read** the target code thoroughly — understand intent, not just syntax
5. **Scope** — Identify: single function, module, data flow, or architecture
6. **Explain** at the requested level (high-level / detailed / line-by-line)
7. **Highlight** non-obvious logic, hidden side effects, design trade-offs
8. **Suggest** follow-up topics if relevant
9. **Update Memory** — Save explanation context to `.ai-memory.md`

## Output format
- What it does (one-sentence summary)
- How it works (step-by-step at requested level)
- Key design decisions
- Non-obvious details
- Related context
