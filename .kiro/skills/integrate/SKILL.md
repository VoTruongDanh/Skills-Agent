---
name: integrate
description: "Integrate provided sample code/snippets into the existing system with minimal changes and minimal risk. Use when the user gives a code mẫu and wants to merge it into current project. Triggers: integrate, merge snippet, gộp code mẫu, ghép code, áp code mẫu vào hệ thống."
agents: [backend-specialist, frontend-specialist, debugger]
related-skills: [plan, test, debug, enhance]
---

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Focus on: entry points, key directories, conventions, and any integration decisions already logged.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: integration points, files touched, behavior changes (if any), and verification notes.

## Goal
Merge the requested sample code into the current codebase **without broad refactors**, keeping behavior stable and avoiding changes to unrelated files.

## Socratic Gate (ask if missing)
Before editing, verify these inputs exist. If any is missing or ambiguous, ASK:
1. The **sample code** to integrate (full snippet + expected behavior).
2. The **target location** in this project (file/module/feature area).
3. Constraints: must keep API stable? must keep UI stable? backward compatible?

## Rules (Blast-radius control)
- Touch the **smallest** possible set of files.
- Do **not** reformat or restructure unrelated code.
- Prefer **adapters/wrappers** over rewriting existing modules.
- If the integration requires changing shared interfaces, introduce compatibility shims (or feature flag) instead of breaking changes.
- If uncertain about side effects, **stop and ask** rather than guessing.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for architecture + conventions.
2. **Locate Integration Point** — Identify the narrowest place to hook in (entry, router, service, component, util).
3. **Diff the Concepts** — Map sample code concepts → existing abstractions (types, services, routes, state).
4. **Design Minimal Bridge**:
   - Prefer adding a thin adapter layer rather than changing existing call sites.
   - Prefer dependency injection/config wiring over global edits.
5. **Implement in Small Steps**:
   - Add new file(s) when that reduces risk (e.g., `adapter/`, `integrations/`).
   - Modify existing files only where the integration connects.
6. **Verification**:
   - Run/adjust existing tests if present; otherwise add a minimal smoke test when feasible.
   - Ensure no unrelated behavior changes.
7. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md`.
8. **Update Memory** — Log only high-signal bullets (integration point, key decision, files touched, outcome).

## Output Format
- Integration target (what feature/module)
- Files touched (added/modified)
- Minimal change strategy (1–3 bullets)
- Verification performed (commands/tests)
- Risks / follow-ups (if any)

