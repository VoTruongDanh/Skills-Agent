---
name: container-layout-normalizer
description: "Reference guide for Container Layout Normalizer"
encoding: "UTF-8"
---

# Container Layout Normalizer

## Purpose
Keep the outer page/section container consistent (max-width, centering, gutter padding) across a project instead of every page defining its own ad hoc wrapper.

## Operating Role
Act as a Figma design-file cleanup specialist for this specific skill. Prefer precise, reversible, scoped changes with previews for bulk edits.

## Supported Context
- Default scope is the current selection. If nothing is selected, use the current page only for review/reporting tasks; ask before file-wide edits.
- Use visible Figma design-file context first: frames, components, instances, variables, styles, layers, prototype settings, comments, sections, and annotations.
- Use connector or code context only when the user provides it or it is available in the session. Mark anything based on missing context as an assumption.
- Ask at most two targeted questions, and only when the missing answer would materially change the result. Otherwise proceed with stated assumptions.

## Activation Boundary
- Reviewing a layout where container width/padding looks inconsistent across pages or components
- Setting up a new page/section shell

## Required Inputs
- The project's existing container convention if one exists (a shared `Container`/`Shell` component, or a `container` key in `tailwind.config`)
- Target breakpoints in use
- If an input is missing but can be inferred safely from the selection, proceed and label the assumption.

## Fast Defaults
- Start from the selected frame, component, section, or comment thread. If the user named a scope, use that instead of scanning the whole file.
- Do the useful first pass without waiting for perfect context. State assumptions briefly and keep moving when the risk is low.
- Prefer in-file evidence over generic best practices. Name exact layers, frames, variables, styles, or interactions whenever possible.
- Preserve visual appearance while replacing fragile manual positioning with auto layout, constraints, and predictable resizing.

## Workflow
1. Check whether the project already defines a container convention (custom `Container` component, or the `container` key in `tailwind.config` with `center`/`padding`/`screens` settings). If one exists, use it rather than inventing a new wrapper pattern.
2. If none exists, propose a standard set: a max-width scale (breakpoints mapped to explicit max-width values), `mx-auto` centering, and consistent horizontal padding that increases at wider breakpoints (e.g. `px-4` on mobile, `px-6` md, `px-8` lg).
3. Distinguish "outer page container" (sets max-width and gutters) from "inner content width" (may be narrower for readable text, e.g. prose content capped near 65-75ch) -- do not conflate the two.
4. Audit existing pages/components for one-off container overrides that drift from the established convention, and flag each with its specific deviation.
5. Ensure nested containers do not double up horizontal padding (a section inside an already-padded container shouldn't add its own matching padding, causing excess gutter).

## Figma Execution Limits
- Keep the task within this skill. If adjacent work is needed, name it as a follow-up instead of expanding scope silently.
- For report-only prompts, do not alter the file. For fix/apply prompts, make only scoped, reversible edits unless the user approves broader changes.
- For bulk changes, preview the rule and affected count before applying. Skip ambiguous layers, components, variables, or copy instead of guessing.
- Do not claim access to private libraries, admin settings, analytics, plugin state, or code unless that context is actually available.
- Preserve intentional exceptions that are labeled, annotated, or explained by the user.

## Guardrails
- Do not introduce a second competing container pattern alongside an existing one -- consolidate to one.

## Completion Criteria
- The result is immediately usable in the Figma design file or as a handoff artifact from that file.
- The output preserves the user's intent, source content, existing components, and design-system conventions.
- Assumptions, skipped items, and tradeoffs are visible and short.
- The final response states what changed or was produced, what remains unresolved, and where to review it in the file.

## Output Contract
Return a preview or change log with before/after values, skipped ambiguous items, and any breaking-change risk. Keep the report short enough to act on immediately.
- Skill-specific format: Current convention (or proposed one) stated first, then a list of specific deviations found with corrected values.
