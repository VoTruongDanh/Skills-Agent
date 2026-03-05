---
name: debug
description: Use when the user wants root-cause analysis for a bug, failing command, broken behavior, error log, or types /debug.
---

## Goal
Find the real root cause, not just the first visible symptom.

## Workflow
1. Summarize the bug, expected behavior, and actual behavior.
2. Gather evidence from logs, stack traces, code paths, config, and recent changes.
3. List the top hypotheses ranked by likelihood.
4. Eliminate hypotheses using direct evidence.
5. Identify the root cause.
6. Propose the smallest safe fix.
7. Suggest how to verify the fix and prevent regressions.

## Output format
- Symptom
- Evidence
- Hypotheses
- Root cause
- Fix
- Verification

## Rules
- Do not guess when evidence is missing; say what must be checked.
- Prefer deterministic reproduction steps.
- Mention any hidden risk or side effect of the fix.
