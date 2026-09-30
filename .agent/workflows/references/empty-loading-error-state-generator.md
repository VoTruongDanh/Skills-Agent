---
name: empty-loading-error-state-generator
description: "Reference guide for Empty / Loading / Error State Generator"
encoding: "UTF-8"
---

# Empty / Loading / Error State Generator

**Name:** Empty / Loading / Error State Generator
**Description:** Checks a flow or screen for missing empty, loading, and error states, then builds the missing ones by reusing the populated state's layout, tokens, and components. Run this whenever a state set needs completing or auditing.

## When to invoke
Trigger when asked to check state coverage on a flow, or to explicitly design empty/loading/error states for a screen.

## Steps
1. Identify the primary "populated" state as the source of truth — its layout, tokens, and components.
2. Enumerate the state set expected for this content type (empty, loading, error, partial-data, offline if relevant). Ask if the required set isn't obvious from context.
3. Check whether each state already exists elsewhere in the frame/library; reuse it instead of building a new one if so.
4. For missing states, reuse the populated state's layout and components, swapping only the content region (icon + message + optional CTA for an empty state) built from existing components/tokens.
5. Keep copy short and actionable; mark placeholder copy explicitly as placeholder.

## Guardrails — do not bend
- Never alter the populated (source of truth) state while building the others.
- Don't invent a new empty-state illustration or icon style — reuse the icon library.
- If an error state needs a specific recovery action (retry, contact support), ask rather than guessing which.

## Output
- New frames named `{ScreenName}/State=Empty|Loading|Error`.
- A short checklist of which states already existed vs. were newly built.
