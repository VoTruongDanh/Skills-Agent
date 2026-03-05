---
name: deploy
description: Use when the user wants deployment steps, release preparation, environment setup, CI/CD guidance, production rollout, or types /deploy.
---

## Goal
Prepare a safe, repeatable deployment or release plan.

## Workflow
1. Detect the app type, runtime, dependencies, and target environment.
2. List prerequisites: secrets, env vars, build steps, infrastructure, database migrations, and health checks.
3. Produce a deployment sequence from pre-checks to rollback.
4. Call out risky steps explicitly.
5. Include post-deploy verification and monitoring.

## Output format
- Target environment
- Preconditions
- Deployment steps
- Verification
- Rollback plan

## Rules
- Prefer least-risk rollout patterns.
- Never expose secrets.
- Distinguish clearly between required and optional steps.
