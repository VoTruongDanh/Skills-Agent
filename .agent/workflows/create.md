---
description: Create a new implementation cleanly and with minimal disruption
---

## Goal
Create a new implementation cleanly and with minimal disruption.

## Workflow
1. Understand the requested artifact and the existing project structure.
2. Identify the smallest complete implementation that satisfies the request.
3. Create or update the necessary files only.
4. Reuse existing patterns, naming, and architecture already present in the repo.
5. Add brief usage notes, edge cases, and follow-up improvements.

## Rules
- Prefer incremental changes over large rewrites.
- Match the project's conventions.
- Include basic validation and error handling.
- If tests exist nearby, add or update them when appropriate.
