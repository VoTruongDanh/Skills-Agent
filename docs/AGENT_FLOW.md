# Agent Flow Architecture

How AI Agent Skills processes a user request from start to finish.

## Flow Diagram

```
User Request
     │
     ▼
┌─────────────────┐
│  Read Memory     │ ← .ai-memory.md (project context)
│  (.ai-memory.md) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Classify Intent │ ← Match to skill (brainstorm/debug/create/etc.)
│  (Skill Router)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Select Agent    │ ← Domain-specific persona (debugger/backend/etc.)
│  (Agent Router)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Socratic Gate   │ ← Ask clarifying questions if info is missing
│  (Verify Intent) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Execute Skill   │ ← Follow workflow steps with agent knowledge
│  (Workflow)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Validate        │ ← Run checklist, verify deliverables
│  (Checklist)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update Memory   │ → .ai-memory.md (save learnings)
│  (.ai-memory.md) │
└────────┬────────┘
         │
         ▼
     Response
```

## Stage Details

### 1. Read Memory
- Load `.ai-memory.md` from project root
- Contains: tech stack, past decisions, known issues, project patterns
- If file doesn't exist, create it after completing the task

### 2. Classify Intent
- Read the entry point: `.kiro/skills/instructions.md`
- Match user request to one of 12 skills:
  - `/brainstorm` → `.kiro/skills/brainstorm/SKILL.md`
  - `/plan` → `.kiro/skills/plan/SKILL.md`
  - `/create` → `.kiro/skills/create/SKILL.md`
  - `/debug` → `.kiro/skills/debug/SKILL.md`
  - `/test` → `.kiro/skills/test/SKILL.md`
  - `/enhance` → `.kiro/skills/enhance/SKILL.md`
  - `/deploy` → `.kiro/skills/deploy/SKILL.md`
  - `/clean` → `.kiro/skills/clean/SKILL.md`
  - `/status` → `.kiro/skills/status/SKILL.md`
  - `/preview` → `.kiro/skills/preview/SKILL.md`
  - `/orchestrate` → `.kiro/skills/orchestrate/SKILL.md`
  - `/ui-ux-pro-max` → `.kiro/skills/ui-ux-pro-max/SKILL.md`
- For vague requests, see fallback table in `.kiro/skills/agents/SKILL.md`

### 3. Select Agent
- Read the agent router: `.kiro/skills/agents/SKILL.md`
- Based on domain keywords, read the specialist agent file:
  - **@debugger** → `.kiro/skills/agents/agents/debugger.md`
  - **@backend-specialist** → `.kiro/skills/agents/agents/backend-specialist.md`
  - **@frontend-specialist** → `.kiro/skills/agents/agents/frontend-specialist.md`
  - **@database-architect** → `.kiro/skills/agents/agents/database-architect.md`
  - **@security-auditor** → `.kiro/skills/agents/agents/security-auditor.md`
  - **@devops-engineer** → `.kiro/skills/agents/agents/devops-engineer.md`
  - **@test-engineer** → `.kiro/skills/agents/agents/test-engineer.md`
  - **@performance-optimizer** → `.kiro/skills/agents/agents/performance-optimizer.md`
  - **@documentation-writer** → `.kiro/skills/agents/agents/documentation-writer.md`
  - **@orchestrator** → `.kiro/skills/agents/agents/orchestrator.md`
  - **@project-planner** → `.kiro/skills/agents/agents/project-planner.md`

### 4. Socratic Gate
- Before executing, verify sufficient information:
  - What exactly does the user need?
  - What constraints exist?
  - Is the scope clear enough to proceed?
- Ask up to 3 clarifying questions if needed

### 5. Execute Skill
- Follow the skill's workflow steps in order
- Apply agent persona knowledge throughout
- Use project context from memory

### 6. Validate
- Run the skill's built-in checklist
- Read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks
- For deploy: also read `.kiro/skills/_scripts/pre-deploy.md`
- For status: also read `.kiro/skills/_scripts/verify-all.md`
- Verify all deliverables are complete
- Check for regressions or side effects

### 7. Update Memory
- Save to `.ai-memory.md`:
  - What was done
  - What was learned about the project
  - Decisions made
  - Issues found
  - Current project state

## Multi-Agent Scenarios
When a task spans multiple domains:
1. Read `.kiro/skills/agents/agents/orchestrator.md` as coordinator
2. Orchestrator decomposes into sub-tasks
3. For each sub-task, read the specialist agent file from the map above
4. Share state between agents via `.ai-memory.md`
5. Results are consolidated by the orchestrator
6. Single coherent response is delivered

## File System Architecture

| Layer | Location | Purpose | Precedence |
|-------|----------|---------|------------|
| **Canonical skills** | `.kiro/skills/*/SKILL.md` | Full skill definitions (source of truth) | **PRIMARY** |
| **Agent personas** | `.kiro/skills/agents/agents/*.md` | Specialist knowledge | Read when routing |
| **Entry point** | `.kiro/skills/instructions.md` | Bootstrap + routing table | Read first |
| **Shared scripts** | `.kiro/skills/_scripts/*.md` | Checklists + templates | Read during Quality Gate |
| **Workflows** | `.agent/workflows/*.md` | Antigravity runtime shortcuts | References canonical |
| **Rules** | `.agent/rules/*.md` | Antigravity rule shortcuts | References canonical |
| **Memory** | `.ai-memory.md` (project root) | Persistent project context | Read/write every task |

## Memory File Format (.ai-memory.md)
```markdown
# Project Memory

## Tech Stack
- Language: ...
- Framework: ...
- Database: ...

## Architecture
- Pattern: ...
- Key directories: ...

## Decisions
- [date] Decision description and rationale

## Known Issues
- Issue description and status

## Recent Changes
- What was changed and why
```
