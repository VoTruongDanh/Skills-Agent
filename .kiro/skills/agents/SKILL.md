---
name: agents
description: "Agent routing system — automatically selects the best specialist agent based on user request domain. Handles keyword matching, Vietnamese and English triggers, compound-keyword routing, vague-request fallback, and multi-agent coordination. This skill is always loaded silently."
metadata:
  category: system
  auto-load: true
---

## Purpose
This is the master agent routing skill. It analyzes every user request and silently applies the most relevant specialist knowledge.

## Memory Protocol
**START**: Read `.ai-memory.md` from project root — check which agents were used previously and what domain knowledge has been accumulated.
**END**: Update `.ai-memory.md` with which agent was applied and why.

## Agent Selection Matrix

| Domain | Primary Agent | Agent File | Trigger Keywords | Skill Files to Load |
|--------|--------------|-----------|------------------|---------------------|
| Bug/Error analysis | @debugger | `.kiro/skills/agents/agents/debugger.md` | debug, lỗi, error, bug, crash, 500, exception, fail, fix, sửa, hỏng, lỗi rồi | `.kiro/skills/debug/SKILL.md`, `.kiro/skills/test/SKILL.md` |
| API/Backend | @backend-specialist | `.kiro/skills/agents/agents/backend-specialist.md` | api, server, endpoint, route, middleware, auth, jwt, database query, tạo API, backend | `.kiro/skills/create/SKILL.md`, `.kiro/skills/deploy/SKILL.md` |
| UI/Frontend | @frontend-specialist | `.kiro/skills/agents/agents/frontend-specialist.md` | ui, ux, component, page, css, layout, responsive, animation, tạo trang, giao diện, trang | `.kiro/skills/create/SKILL.md`, `.kiro/skills/ui-ux-pro-max/SKILL.md` |
| Database | @database-architect | `.kiro/skills/agents/agents/database-architect.md` | database, schema, migration, query, sql, prisma, orm, model, cơ sở dữ liệu | `.kiro/skills/create/SKILL.md`, `.kiro/skills/deploy/SKILL.md` |
| Security | @security-auditor | `.kiro/skills/agents/agents/security-auditor.md` | security, vulnerability, xss, csrf, injection, auth, encrypt, ssl, bảo mật | `.kiro/skills/debug/SKILL.md`, `.kiro/skills/test/SKILL.md` |
| DevOps/Deploy | @devops-engineer | `.kiro/skills/agents/agents/devops-engineer.md` | deploy, ci/cd, docker, kubernetes, aws, vercel, pipeline, build, triển khai, phát hành | `.kiro/skills/deploy/SKILL.md` |
| Testing | @test-engineer | `.kiro/skills/agents/agents/test-engineer.md` | test, coverage, jest, vitest, playwright, e2e, unit test, spec, kiểm thử, viết test | `.kiro/skills/test/SKILL.md` |
| Performance | @performance-optimizer | `.kiro/skills/agents/agents/performance-optimizer.md` | performance, slow, optimize, cache, bundle, lighthouse, speed, chậm, nhanh hơn, tối ưu | `.kiro/skills/enhance/SKILL.md` |
| Documentation | @documentation-writer | `.kiro/skills/agents/agents/documentation-writer.md` | docs, readme, api docs, changelog, comment, jsdoc, tài liệu | `.kiro/skills/create/SKILL.md` |
| Code Explanation | @documentation-writer | `.kiro/skills/agents/agents/documentation-writer.md` | explain, giải thích, walkthrough, how does this work, what does this do, hiểu code | `.kiro/skills/explain/SKILL.md` |
| Planning/Multi-domain | @orchestrator | `.kiro/skills/agents/agents/orchestrator.md` | orchestrate, coordinate, full-stack, multi-step, complex, tổng hợp | `.kiro/skills/orchestrate/SKILL.md`, `.kiro/skills/plan/SKILL.md` |
| Project planning | @project-planner | `.kiro/skills/agents/agents/project-planner.md` | plan, milestone, breakdown, estimate, roadmap, sprint, kế hoạch, lên kế hoạch | `.kiro/skills/plan/SKILL.md`, `.kiro/skills/brainstorm/SKILL.md` |

## Compound Keyword Rules (checked BEFORE single keywords)

| Pattern | Route |
|---------|-------|
| test + fail/error/broken/lỗi | @debugger → debug test failures (`.kiro/skills/debug/SKILL.md`) |
| create + test / viết test | @test-engineer → write new tests (`.kiro/skills/test/SKILL.md`) |
| deploy + fail/error/lỗi | @debugger + @devops-engineer → debug deploy issues (`.kiro/skills/debug/SKILL.md`) |
| review + code | @security-auditor + @performance-optimizer + @documentation-writer → holistic review (`.kiro/skills/enhance/SKILL.md`) |

## Routing Protocol

1. Analyze the user's request for domain keywords from the matrix above.
2. Select the primary agent from the matching row.
3. **Read the agent's persona file** at the path listed in "Agent File" column.
4. **Read the skill file(s)** listed in "Skill Files to Load" column.
5. If request spans multiple domains, read `.kiro/skills/agents/agents/orchestrator.md` to coordinate.
6. Announce: "🤖 Applying @{agent} knowledge..."

## Vague / General Request Fallback

When the user's request does NOT match any domain keywords:

| User says | Action |
|-----------|--------|
| "Help me", "What should I do?" | Read `.kiro/skills/status/SKILL.md` → then `.kiro/skills/plan/SKILL.md` |
| "Review my code", "review code cho tôi" | Read `.kiro/skills/enhance/SKILL.md` with @security-auditor + @performance-optimizer + @documentation-writer (holistic review) |
| "I'm stuck", "Don't know where to start" | Read `.kiro/skills/status/SKILL.md` → then `.kiro/skills/brainstorm/SKILL.md` |
| "Explain this", "giải thích code", "how does this work?" | Read `.kiro/skills/explain/SKILL.md` with @documentation-writer |
| Complaints about code ("too long", "messy", "dài quá", "rối quá") | Read `.kiro/skills/enhance/SKILL.md` or `.kiro/skills/clean/SKILL.md` — ask Socratic Gate to clarify intent |
| Any multi-part or unclear request | Read `.kiro/skills/agents/agents/orchestrator.md` → triage into sub-tasks |
| Greeting ("hi", "hello", "xin chào") | Respond warmly, list skills, ask how to help |
| Empty message | Respond with skill menu, ask what to work on |
| Completely unclear | Ask ONE clarifying question, then route to the best matching skill |

**Never skip routing for general requests.** General requests need the MOST help, not the least.

## Multi-Agent Scenarios

For complex requests that span domains:
1. Read `.kiro/skills/agents/agents/orchestrator.md` as coordinator
2. Orchestrator decomposes task into workstreams
3. For each workstream, read the specialist agent file from the matrix
4. Execute sequentially, sharing state via `.ai-memory.md`
5. Merge results with consistency checks

## Quality Gate
After completing any routed task, read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks.

## Rules
- Agent selection is SILENT — do not ask the user which agent to use
- Always announce which agent is being applied
- **Never skip routing for general/vague requests** — use the fallback table above
- Never override an explicit user request with agent logic
