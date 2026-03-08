---
name: verify-all
description: Full verification pass — run all checks across the project
---

## Steps
1. **Read Memory** — Load `.ai-memory.md` for known issues
2. **Structure Check** — Verify project structure matches expectations
3. **Dependency Check** — Are all dependencies installed and up to date?
4. **Lint/Format Check** — Does code pass linting and formatting rules?
5. **Test Check** — Do all existing tests pass?
6. **Build Check** — Does the project build successfully?
7. **Security Check** — Run security audit (npm audit, etc.)
8. **Documentation Check** — Are README and docs up to date?
9. **Git Check** — Any uncommitted changes? Branch is clean?
10. **Report** — Summarize findings with pass/fail for each check

## Output Format
```
✅ Structure    — OK
✅ Dependencies — OK  
⚠️  Lint        — 3 warnings
❌ Tests       — 1 failure in test/auth.test.js
✅ Build       — OK
⚠️  Security   — 2 moderate vulnerabilities
✅ Docs        — OK
✅ Git         — Clean
```
