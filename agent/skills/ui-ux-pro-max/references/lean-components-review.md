---
name: lean-components-review
description: "Reference guide for Lean component library review"
encoding: "UTF-8"
---

# Lean component library review

Review the requested component library, page, or selection for consistency and maintainability.

Treat recommendations from [Tao of Figma](https://www.taooffigma.com/) as principles, not rigid rules.

## Core principle

Prefer consistency over personal preference.

Infer conventions from the reviewed library. Flag inconsistencies with established patterns, but do not prescribe arbitrary naming, capitalization, separators, terminology, or structure when multiple approaches are valid.

Report:

> Property names mix lowercase and capitalized naming. Pick one convention and apply it consistently.

Not:

> Property names should be capitalized.

## Workflow

1. Inspect the requested scope.
2. Identify conventions used by most comparable components.
3. Find deviations, ambiguity, and unnecessary complexity.
4. Distinguish structural issues from context-dependent recommendations.
5. Report findings before making changes.
6. Only fix issues when explicitly asked.

## Review areas

### Naming consistency

Review names for:

- Components and component sets
- Variants and variant values
- Component properties
- Layers
- Hidden and deprecated components
- Icons

Flag inconsistent capitalization, separators, prefixes, suffixes, terminology, or ordering among comparable items. Do not flag intentional semantic differences.

### Property organization

Check that component properties follow a predictable visual or reading order.

Keep related properties together—for example, a visibility toggle and its corresponding instance-swap property.

### Variants, booleans, and hidden layers

Identify variants used only to show or hide optional layers. Suggest boolean properties when they reduce unnecessary variant combinations.

Flag hidden layers that are not connected to a boolean property, since component users may not be able to discover or control them. Do not flag layers that appear to be intentional implementation details or are controlled through another documented mechanism. When intent is unclear, frame the finding as a question or recommendation.

Do not suggest booleans when states have meaningful semantic, visual, or behavioral differences.

### Layer clarity

Flag default or ambiguous layer names that make components difficult to understand or maintain.

Check that comparable layers use a consistent naming format. Allow differences that communicate distinct semantics, hierarchy, or implementation roles.

Names do not need to be elaborate—only understandable and consistent.

### Component hierarchy

Look for:

- Components nested in unnecessary organizational frames
- Recursive components
- Excessive nesting
- Subcomponents that add maintenance cost without meaningful reuse

Allow grouping and composition that improve discoverability or reuse.

### Default variants

Check whether the default variant is a sensible, commonly used starting point.

If usage cannot be determined from the file, frame this as a question or recommendation.

### Icon discoverability

Check whether icon components can be distinguished from similarly named non-icon components.

Do not require a specific prefix or suffix. Recommend a consistent identifier if discoverability is poor.

### Documentation

Identify documentation that appears duplicated, stale, or disproportionately expensive to maintain.

Consider its audience, location, and purpose before suggesting removal.

## Reporting

Group findings by severity:

- **Structural issue** — likely to cause broken behavior, confusion, or significant maintenance cost
- **Consistency issue** — conflicts with an established pattern in the reviewed scope
- **Recommendation** — potentially useful, but dependent on team preference or context

For each finding, include:

- What was observed
- Why it matters
- Affected components or layers
- A neutral recommendation
- Confidence level when intent or usage is uncertain

Also include:

- Conventions inferred from the library
- Patterns already working well
- Questions requiring team context
- A short, prioritized action list

Avoid inventing problems to fill every category. If the library is consistent, say so.
