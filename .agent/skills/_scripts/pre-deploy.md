---
name: pre-deploy
description: Pre-deployment verification checklist
---

## Pre-Deploy Checklist

### Code Readiness
- [ ] All tests pass
- [ ] No lint errors
- [ ] Build succeeds
- [ ] No TODO/FIXME in critical paths
- [ ] Version number updated (package.json, CHANGELOG)

### Security
- [ ] No secrets in source code
- [ ] Environment variables documented
- [ ] Dependencies audited (`npm audit`)
- [ ] No known critical vulnerabilities

### Configuration
- [ ] Environment config is correct for target
- [ ] Database migrations are ready (if applicable)
- [ ] API keys and secrets are in environment, not code
- [ ] Feature flags set appropriately

### Documentation
- [ ] CHANGELOG updated
- [ ] README reflects current state
- [ ] API docs updated (if applicable)
- [ ] Deployment instructions are current

### Rollback Plan
- [ ] Previous version tagged
- [ ] Rollback procedure documented
- [ ] Database rollback scripts ready (if applicable)
- [ ] Monitoring alerts configured

## After Deploy
- [ ] Smoke tests pass
- [ ] Monitoring shows healthy metrics
- [ ] Update `.ai-memory.md` with deploy details
