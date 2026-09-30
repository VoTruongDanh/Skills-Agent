---
name: component-quality-review
description: "Reference guide for Component Quality Review — AI Component Reviewer"
encoding: "UTF-8"
---

# Component Quality Review — AI Component Reviewer

## What this skill does

Review a selected Figma component, component set, or reusable UI element like a senior design-system designer.

The goal is to identify quality, maintainability, scalability, and usability issues before components spread across a product.

Do not modify the Figma canvas during a review unless the user explicitly asks for fixes.

## Best used for

- Design-system component audits
- SaaS product UI libraries
- Component libraries and shared UI kits
- Pre-handoff design QA
- Design-system cleanup
- Component governance
- Reusable UI quality checks

## Review dimensions

### 1. Variants

Check whether:

- Variants represent meaningful states or configurations
- Variant properties are structured logically
- Variant combinations are complete
- Duplicate or unnecessary variants exist
- Variant naming is predictable
- State and size variations are handled consistently

### 2. Properties

Review:

- Boolean properties
- Instance swap properties
- Text properties
- Variant properties
- Property naming
- Default values
- Property usefulness
- Unnecessary or duplicated properties

Flag properties that make components difficult to understand or maintain.

### 3. Naming

Check:

- Component names
- Component-set names
- Variant names
- Property names
- Layer names
- Naming consistency
- Semantic clarity
- Scalable naming patterns

Recommend names that are concise, predictable, and understandable by designers and developers.

### 4. Auto Layout

Check:

- Horizontal and vertical Auto Layout
- Padding
- Gaps
- Alignment
- Hug contents
- Fill container
- Fixed dimensions
- Nested Auto Layout
- Content-driven sizing
- Resizing behavior

Identify fixed values that may cause components to break when content changes.

### 5. Responsive behavior

Evaluate how the component behaves when:

- Text becomes longer
- Content becomes shorter
- Labels change
- Icons are added or removed
- Container width changes
- Components are placed in different layouts
- Mobile and desktop constraints change

Flag layouts that depend on fragile positioning or fixed dimensions.

### 6. States

Check whether important states are represented where appropriate:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Success
- Selected
- Empty

Do not require every state for every component; judge states based on component purpose and interaction model.

### 7. Accessibility

Review:

- Color contrast
- Focus visibility
- Touch target considerations
- Text readability
- State communication
- Icon-only controls
- Disabled-state clarity
- Keyboard interaction considerations
- Reliance on color alone

Clearly distinguish issues that can be verified from the Figma file from issues that require implementation testing.

### 8. Reusability

Evaluate:

- Component flexibility
- Appropriate use of properties
- Hardcoded content
- Detached instances
- One-off variants
- Overly specific structures
- Duplication
- Opportunities for composition
- Suitability for use across multiple product areas

## Review process

1. Identify the selected component or component set.
2. Inspect component structure and hierarchy.
3. Review variants and properties.
4. Inspect Auto Layout and resizing behavior.
5. Evaluate responsive behavior.
6. Review interaction states.
7. Check visible accessibility considerations.
8. Assess naming and organization.
9. Evaluate reusability and scalability.
10. Identify duplicate or unnecessary patterns.
11. Prioritize findings by severity and impact.
12. Provide actionable recommendations.

## Severity levels

Use:

- **Critical** — Component is likely to fail, create serious accessibility problems, or cause major system inconsistency.
- **High** — Significant quality or scalability issue that should be addressed soon.
- **Medium** — Meaningful issue that may create friction or maintenance cost.
- **Low** — Minor inconsistency or improvement opportunity.

## Output format

Start with a concise component summary.

Then provide:

### Component Quality Score

Give a score from 0–100 and explain the major factors affecting it.

### Findings

For each issue use:

**[Severity] Issue title**

- **Area:** Variants / Properties / Naming / Auto Layout / Responsive / States / Accessibility / Reusability
- **Evidence:** What was observed
- **Impact:** Why it matters
- **Recommendation:** Specific action to improve it

### Strengths

List the strongest aspects of the component.

### Priority fixes

Group recommendations into:

1. Fix now
2. Improve next
3. Nice to have

### Component quality checklist

| Area | Status | Notes |
|---|---|---|
| Variants | Pass / Review / Fail | |
| Properties | Pass / Review / Fail | |
| Naming | Pass / Review / Fail | |
| Auto Layout | Pass / Review / Fail | |
| Responsive behavior | Pass / Review / Fail | |
| States | Pass / Review / Fail | |
| Accessibility | Pass / Review / Fail | |
| Reusability | Pass / Review / Fail | |

## Rules

- Base findings on observable evidence.
- Do not invent component properties, variants, or states.
- Separate confirmed issues from assumptions.
- Do not recommend unnecessary complexity.
- Prefer scalable component patterns over one-off fixes.
- Consider the existing design system before suggesting new patterns.
- Do not change the Figma design unless explicitly requested.
- When implementation behavior cannot be verified from Figma, state that it requires development or accessibility testing.
