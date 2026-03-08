---
name: explain
description: "Explain code, walk through logic, and help understand architecture or behavior. Use when the user asks what code does, how something works, or wants a walkthrough. Triggers: explain, what does this do, how does this work, giải thích, giải thích code, code này làm gì."
agents: [documentation-writer, backend-specialist, frontend-specialist]
related-skills: [debug, enhance, status]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check tech stack, architecture notes, past explanations, and domain context.
**END**: Update `.ai-memory.md` with: what was explained, key insights shared, any misconceptions clarified, and follow-up topics noted.

## Goal
Help the user deeply understand code, logic, architecture, or behavior — at the level of detail they need.

## Agent Routing
- If explaining backend/API logic → read `.kiro/skills/agents/agents/backend-specialist.md` and apply its knowledge
- If explaining UI/component behavior → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- If explaining database schema/queries → read `.kiro/skills/agents/agents/database-architect.md` and apply its knowledge
- If explaining security mechanisms → read `.kiro/skills/agents/agents/security-auditor.md` and apply its knowledge
- Default → read `.kiro/skills/agents/agents/documentation-writer.md` for clear, structured explanation

## Socratic Gate
Before explaining, verify:
1. Which file, function, or code block should be explained?
2. What level of detail? (high-level overview vs line-by-line walkthrough)
3. What is the user's familiarity level with this area?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for project context, tech stack, and architecture.
2. Read the target code thoroughly — understand intent, not just syntax.
3. Identify the explanation scope: single function, module, data flow, or architecture.
4. Explain at the requested level:
   - **High-level**: Purpose, inputs/outputs, how it fits in the system.
   - **Detailed**: Step-by-step logic, control flow, edge cases, design decisions.
   - **Line-by-line**: What each line does and why.
5. Highlight non-obvious logic, hidden side effects, and design trade-offs.
6. Use analogies or diagrams if the concept is complex.
7. Suggest follow-up topics if relevant (e.g., "you may also want to understand X").
8. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` for cross-cutting checks.
9. **Update Memory** — Save explanation context and insights to `.ai-memory.md`.

## Output format
- **What it does**: One-sentence summary
- **How it works**: Step-by-step explanation at the requested level
- **Key design decisions**: Why it was built this way
- **Non-obvious details**: Edge cases, side effects, gotchas
- **Related context**: Connected files/modules worth understanding

## Checklist
- [ ] Target code identified and read
- [ ] Explanation level matches user need
- [ ] Logic explained clearly, not just syntax described
- [ ] Non-obvious details highlighted
- [ ] Design decisions explained
- [ ] Follow-up suggestions provided
- [ ] Memory file updated

## Rules
- Explain the WHY, not just the WHAT — developers can read syntax themselves.
- Match explanation depth to the user's familiarity level.
- If the code is unclear or has issues, mention them without derailing the explanation.
- Always read and update the memory file.

## Related Skills
- `/debug` → read `.kiro/skills/debug/SKILL.md` — If explanation reveals bugs
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — If explanation reveals improvement opportunities
- `/status` → read `.kiro/skills/status/SKILL.md` — For project-wide understanding
