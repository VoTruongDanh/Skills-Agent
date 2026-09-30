---
name: shadcn-component-structure
description: "Reference guide for Shadcn Component Structure"
encoding: "UTF-8"
---

# Shadcn Component Structure

## Purpose
Make generated component code structurally consistent with shadcn/ui conventions so it fits naturally into a shadcn-based codebase.

## Operating Role
Act as a design-to-code bridge for this specific skill. Use Figma design context for visual structure and only use code conventions, imports, and APIs that are provided or inspectable.

## Supported Context
- Default scope is the current selection. If nothing is selected, use the current page only for review/reporting tasks; ask before file-wide edits.
- Use visible Figma design-file context first: frames, components, instances, variables, styles, layers, prototype settings, comments, sections, and annotations.
- Use connector or code context only when the user provides it or it is available in the session. Mark anything based on missing context as an assumption.
- Ask at most two targeted questions, and only when the missing answer would materially change the result. Otherwise proceed with stated assumptions.
- When used from a Figma design file without code access, produce a handoff-ready implementation plan or draft snippet instead of pretending the repo was inspected.

## Activation Boundary
- Generating a new UI component for a shadcn/ui project
- Reviewing or refactoring existing component code for structural consistency

## Required Inputs
- The component to generate/review
- Whether the project uses the React.forwardRef pattern or plain function components with ref as a prop (React 19+)
- The project's existing `cn` utility import path (commonly `lib/utils`)
- If an input is missing but can be inferred safely from the selection, proceed and label the assumption.

## Fast Defaults
- Start from the selected frame, component, section, or comment thread. If the user named a scope, use that instead of scanning the whole file.
- Do the useful first pass without waiting for perfect context. State assumptions briefly and keep moving when the risk is low.
- Prefer in-file evidence over generic best practices. Name exact layers, frames, variables, styles, or interactions whenever possible.
- Map Figma states and variants to a clean component API before writing or revising files.

## Workflow
1. Confirm the component signature matches convention: a typed props interface extending the appropriate native element props (e.g. `React.ComponentProps<"button">`), with ref handled per the project's React version convention.
2. Use `cn()` (clsx + tailwind-merge) to merge internal base classes with a consumer-supplied `className` prop, so consumer overrides win over base styles without breaking structurally required classes.
3. If the component has visual variants (size, variant, state), define them with `cva` (class-variance-authority) rather than manual conditional string building, with `defaultVariants` set.
4. Export both the component and its variant config (e.g. `buttonVariants`) when other components may need to reuse the same visual variant styling (e.g. a `Link` styled like a `Button`).
5. Place the file under the project's UI components directory (commonly `components/ui/<component-name>.tsx`) using kebab-case filenames matching shadcn's own convention, unless the project structure differs -- confirm before assuming.
6. Verify `displayName` is set for components wrapped in `forwardRef`, for clean DevTools/debugging output.

## Figma Execution Limits
- Keep the task within this skill. If adjacent work is needed, name it as a follow-up instead of expanding scope silently.
- For report-only prompts, do not alter the file. For fix/apply prompts, make only scoped, reversible edits unless the user approves broader changes.
- For bulk changes, preview the rule and affected count before applying. Skip ambiguous layers, components, variables, or copy instead of guessing.
- Do not claim access to private libraries, admin settings, analytics, plugin state, or code unless that context is actually available.
- Preserve intentional exceptions that are labeled, annotated, or explained by the user.
- Do not invent packages, imports, component APIs, token names, or Code Connect mappings.
- Use design tokens and existing component names only when they are visible or provided.

## Guardrails
- Do not introduce a new className-merging utility if the project already has one; reuse it.
- Do not hardcode variant class strings inline once a `cva` config exists elsewhere for the same variant.

## Completion Criteria
- The result is immediately usable in the Figma design file or as a handoff artifact from that file.
- The output preserves the user's intent, source content, existing components, and design-system conventions.
- Assumptions, skipped items, and tradeoffs are visible and short.
- The final response states what changed or was produced, what remains unresolved, and where to review it in the file.

## Output Contract
Return code or mapping output only when enough context exists. Otherwise return a design-to-code plan with required missing code context, proposed props, token mappings, and unresolved assumptions.
- Skill-specific format: Corrected/generated component code block, followed by a short list of structural conventions applied.
