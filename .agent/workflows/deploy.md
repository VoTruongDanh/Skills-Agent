---
description: Deployment steps, release preparation, environment setup, and CI/CD guidance
---

## Goal
Guide deployment and release preparation with minimal risk.

## Workflow
1. Review the current deployment setup and target environment.
2. Identify deployment prerequisites (env vars, secrets, dependencies).
3. Outline deployment steps in order.
4. Suggest rollback procedures.
5. Recommend monitoring and verification steps post-deployment.

## Rules
- Always include rollback instructions.
- Verify environment variables and secrets are documented.
- Suggest smoke tests after deployment.
- Consider zero-downtime strategies when applicable.
