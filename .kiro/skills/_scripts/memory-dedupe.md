---
name: memory-dedupe
description: Lightweight dedupe procedure for `.ai-memory.md` updates
---

## When to use
Run mentally for every memory update, especially when adding items to **Decisions**, **Known Issues**, or **Recent Work**.

## Dedupe procedure (fast)
1. Pick the **target section** (Decisions / Known Issues / Recent Work / etc.).
2. Before adding a new bullet, scan existing bullets for a near-match.
3. Normalize both bullets and compare:
   - lowercase
   - trim
   - collapse whitespace
   - remove trailing punctuation (`.`, `;`, `,`)
4. If it’s the same idea:
   - **merge** into the existing bullet
   - keep the most concrete version (file paths, error codes, IDs, dates)
   - remove the redundant one
5. Only append a new bullet if it’s clearly a new fact/event/decision.

## Examples
- Two bullets both say “Added auth middleware” → keep one, add the specific files touched.
- “Fix login bug” and “Fixed login issue” → merge into one with the root cause or PR/files.

