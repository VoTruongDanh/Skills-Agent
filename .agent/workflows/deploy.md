---
description: "Deployment steps, release preparation, environment setup, and CI/CD guidance"
agents: [devops-engineer, security-auditor]
---

> **Canonical source**: `.kiro/skills/deploy/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for past deploys, env details, known issues. **END**: Update with deploy config, outcomes, lessons.

## Steps
1. 🤖 **Agent**: Applying @devops-engineer + @security-auditor knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if missing: Target env? Secrets ready? Rollback plan?
4. **Review** current deployment setup and target environment
5. **Identify** prerequisites (env vars, secrets, dependencies)
6. **Outline** deployment steps in order
7. **Define** rollback procedures
8. **Security check** — Verify no secrets in code, proper access controls
9. **Recommend** monitoring and smoke tests post-deployment
10. **Update Memory** — Save deploy details to `.ai-memory.md`

## Checklist
- [ ] Target environment confirmed
- [ ] Prerequisites documented
- [ ] Deployment steps ordered
- [ ] Rollback plan defined
- [ ] Secrets verified secure
- [ ] Smoke tests suggested
- [ ] Memory updated

## Related: `/plan`, `/test`, `/status`
