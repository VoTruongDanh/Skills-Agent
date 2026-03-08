## AI Agent Skills — System Bootstrap

This project uses an **AI Skills system** with 13 skills, 11 specialist agents, and a memory protocol.

### On EVERY request, follow this flow:

0. **Validate input**:
   - If the message is empty or contains no meaningful content → Respond with a friendly greeting, list the available skills below with one-line descriptions, and ask what the user would like to work on. Do NOT proceed to classification.
   - If the message is a greeting ("hi", "hello", "hey", "xin chào", "chào") → Respond warmly, briefly list what you can help with (the skills below), and ask how you can help. Do NOT proceed to classification.

1. **Read memory**: If `.ai-memory.md` exists in project root, read it first for context.
   - If it doesn't exist, create it after completing the first task using the template at the end of this file.

2. **Classify the request** — Match to one of these skills:

   | Command | Skill file to read | When to use |
   |---------|-------------------|-------------|
   | `/brainstorm` | `.kiro/skills/brainstorm/SKILL.md` | Explore options, ideate solutions |
   | `/plan` | `.kiro/skills/plan/SKILL.md` | Create implementation plan with milestones |
   | `/create` | `.kiro/skills/create/SKILL.md` | Build new feature/file/component |
   | `/debug` | `.kiro/skills/debug/SKILL.md` | Fix bugs, analyze errors |
   | `/test` | `.kiro/skills/test/SKILL.md` | Write tests, improve coverage |
   | `/enhance` | `.kiro/skills/enhance/SKILL.md` | Improve existing code without breaking it |
   | `/deploy` | `.kiro/skills/deploy/SKILL.md` | Deployment and release guidance |
   | `/clean` | `.kiro/skills/clean/SKILL.md` | Remove junk files, clean up |
   | `/status` | `.kiro/skills/status/SKILL.md` | Project status summary |
   | `/preview` | `.kiro/skills/preview/SKILL.md` | Preview output/UX before implementing |
   | `/orchestrate` | `.kiro/skills/orchestrate/SKILL.md` | Coordinate multi-step workflows |
   | `/ui-ux-pro-max` | `.kiro/skills/ui-ux-pro-max/SKILL.md` | Advanced UI/UX improvements |
   | `/explain` | `.kiro/skills/explain/SKILL.md` | Explain code, walk through logic, understand architecture |

3. **If the request is vague/general** (no clear skill match):
   - "Help me with this project" → Read `.kiro/skills/status/SKILL.md` first, then suggest next steps
   - "Review my code" → Read `.kiro/skills/enhance/SKILL.md` with all agents (not just performance)
   - "I'm stuck" / "What should I do?" → Read `.kiro/skills/status/SKILL.md` then `.kiro/skills/plan/SKILL.md`
   - "Make this better" → Read `.kiro/skills/enhance/SKILL.md`
   - "Explain this code" / "What does this do?" / "giải thích code" → Read `.kiro/skills/explain/SKILL.md`
   - Complaints about code quality ("too long", "messy", "sao dài quá", "rối quá") → Read `.kiro/skills/enhance/SKILL.md` or `.kiro/skills/clean/SKILL.md`
   - Any multi-step or complex request → Read `.kiro/skills/orchestrate/SKILL.md`
   - If still unclear → Read `.kiro/skills/agents/SKILL.md` and use @orchestrator to triage

4. **Load the agent**: Each skill specifies agents. To load an agent persona, read its file:

   | Agent handle | File to read |
   |-------------|-------------|
   | `@debugger` | `.kiro/skills/agents/agents/debugger.md` |
   | `@backend-specialist` | `.kiro/skills/agents/agents/backend-specialist.md` |
   | `@frontend-specialist` | `.kiro/skills/agents/agents/frontend-specialist.md` |
   | `@database-architect` | `.kiro/skills/agents/agents/database-architect.md` |
   | `@security-auditor` | `.kiro/skills/agents/agents/security-auditor.md` |
   | `@devops-engineer` | `.kiro/skills/agents/agents/devops-engineer.md` |
   | `@test-engineer` | `.kiro/skills/agents/agents/test-engineer.md` |
   | `@performance-optimizer` | `.kiro/skills/agents/agents/performance-optimizer.md` |
   | `@documentation-writer` | `.kiro/skills/agents/agents/documentation-writer.md` |
   | `@orchestrator` | `.kiro/skills/agents/agents/orchestrator.md` |
   | `@project-planner` | `.kiro/skills/agents/agents/project-planner.md` |

5. **Execute the skill workflow** — Follow the steps in the SKILL.md file.

6. **Run quality checks**: Read `.kiro/skills/_scripts/checklist.md` for cross-cutting checks.

7. **Update memory**: Save findings to `.ai-memory.md`.

### .ai-memory.md Template (create if not exists)

```markdown
# Project Memory

## Tech Stack
- Language: (detected)
- Framework: (detected)
- Database: (if any)
- Package manager: (detected)

## Architecture
- Pattern: (detected)
- Key directories: (discovered)

## Decisions
- (date) Decision and rationale

## Known Issues
- (none yet)

## Recent Work
- (none yet)
```
