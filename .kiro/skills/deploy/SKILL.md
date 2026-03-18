---
name: deploy
description: "Deployment steps, release preparation, environment setup, CI/CD guidance, and production rollout. Use when the user wants to deploy, release, or set up infrastructure. Triggers: deploy, release, CI/CD, docker, production, triển khai, phát hành, đưa lên production."
agents: [devops-engineer, security-auditor]
related-skills: [test, status, plan]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check deployment history, target environments, known infrastructure, CI/CD setup, past deployment issues.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: target, steps, env details, issues, rollback notes, and infra decisions.

## Goal
Prepare a safe, repeatable deployment or release plan.

## Agent Routing
- For infrastructure/CI/CD → read `.kiro/skills/agents/agents/devops-engineer.md` and apply its knowledge
- For security review before deploy → read `.kiro/skills/agents/agents/security-auditor.md` and apply its knowledge
- For database migrations → read `.kiro/skills/agents/agents/database-architect.md` and apply its knowledge
- For performance validation → read `.kiro/skills/agents/agents/performance-optimizer.md` and apply its knowledge

## Socratic Gate
Before deploying, verify:
1. What is the target environment? (staging, production, preview?)
2. Are all tests passing?
3. Are there database migrations or breaking changes?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for deployment history and environment details.
2. Detect the app type, runtime, dependencies, and target environment.
3. List prerequisites: secrets, env vars, build steps, infrastructure, database migrations, and health checks.
4. Produce a deployment sequence from pre-checks to rollback.
5. Call out risky steps explicitly.
6. Include post-deploy verification and monitoring.
7. **Quality Gate** — Read `.kiro/skills/_scripts/pre-deploy.md` for pre-deploy checklist, then `.kiro/skills/_scripts/checklist.md` for cross-cutting checks.
8. **Update Memory** — Save deployment details and outcomes to `.ai-memory.md`.

## Output format
- Target environment
- Preconditions
- Deployment steps (numbered, with risk flags)
- Verification (health checks, smoke tests)
- Rollback plan

## Checklist
- [ ] Target environment confirmed
- [ ] All tests passing
- [ ] Secrets/env vars configured
- [ ] Database migrations planned
- [ ] Build artifacts ready
- [ ] Rollback plan documented
- [ ] Health checks defined
- [ ] Post-deploy verification planned
- [ ] Memory file updated

## Rules
- Prefer least-risk rollout patterns.
- Never expose secrets.
- Distinguish clearly between required and optional steps.
- Avoid unrelated infra/app changes; if a deployment step requires broad refactors, ASK first.
- Always read and update the memory file.

## Related Skills
- `/test` → read `.kiro/skills/test/SKILL.md` — Run tests before deployment
- `/status` → read `.kiro/skills/status/SKILL.md` — Check project readiness
- `/plan` → read `.kiro/skills/plan/SKILL.md` — Plan complex deployment sequences
