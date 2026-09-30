---
name: ui-consistency-checker
description: "Reference guide for UI Consistency Checker — AI UI Quality Reviewer"
encoding: "UTF-8"
---

# UI Consistency Checker — AI UI Quality Reviewer

## Purpose

Audit selected Figma screens, components, or user flows for UI consistency.

The goal is to identify visual and interaction patterns that are unintentionally inconsistent across the product and explain how to make the interface feel more cohesive, predictable, and scalable.

Do not modify the Figma canvas unless the user explicitly asks for fixes.

## Best used for

- SaaS products
- Web applications
- Mobile applications
- Dashboards
- Multi-screen products
- Design QA
- Pre-development reviews
- Product redesigns
- UI cleanup
- Design system preparation

## Audit workflow

1. Inspect the selected Figma screens, components, or flow.
2. Identify repeated UI patterns.
3. Compare similar elements across screens.
4. Detect inconsistent visual and interaction behavior.
5. Group related inconsistencies.
6. Prioritize issues by user impact and frequency.
7. Explain the evidence behind each finding.
8. Recommend a consistent pattern.

## Core review areas

### 1. Layout consistency

Check:

- Page margins
- Container widths
- Grid alignment
- Section spacing
- Card spacing
- Content alignment
- Header and footer positioning
- Vertical rhythm
- Horizontal rhythm

Identify repeated layouts that should follow the same structure.

### 2. Typography consistency

Check:

- Font family
- Heading sizes
- Body sizes
- Font weights
- Line heights
- Letter spacing
- Text hierarchy
- Button text
- Labels
- Helper text
- Error messages

Flag visually similar text that uses different styles without an apparent reason.

### 3. Color consistency

Check:

- Primary colors
- Secondary colors
- Text colors
- Background colors
- Border colors
- Semantic colors
- Success
- Warning
- Error
- Information

Identify similar but inconsistent colors and incorrect semantic usage.

### 4. Component consistency

Check repeated:

- Buttons
- Inputs
- Selects
- Cards
- Tables
- Modals
- Tabs
- Navigation
- Dropdowns
- Tooltips
- Badges
- Alerts
- Avatars

Compare:

- Size
- Shape
- Padding
- Radius
- Border
- Icon placement
- Typography
- States
- Behavior

### 5. Icon consistency

Check:

- Icon family
- Stroke weight
- Size
- Alignment
- Spacing
- Visual style
- Filled vs outlined usage

Flag icons that look inconsistent with the established product style.

### 6. Forms and controls

Check:

- Field height
- Label placement
- Placeholder styling
- Input padding
- Required indicators
- Error states
- Helper text
- Checkbox and radio patterns
- Button placement
- Form spacing

### 7. Navigation consistency

Check:

- Header patterns
- Sidebar patterns
- Breadcrumbs
- Tabs
- Active states
- Back navigation
- Menu behavior
- Navigation labels
- Icon usage

### 8. States and feedback

Check:

- Default
- Hover
- Focus
- Active
- Selected
- Disabled
- Loading
- Error
- Success
- Empty

Similar components should communicate similar states in similar ways.

### 9. Responsive consistency

When multiple breakpoints are available, check:

- Layout transitions
- Navigation behavior
- Container resizing
- Component scaling
- Typography changes
- Spacing changes
- Mobile controls
- Content priority

Do not claim responsive problems when only one viewport is available unless the issue can be reasonably inferred.

## Evidence standards

Every important finding should include specific evidence.

Use:

**Confirmed inconsistency**
The same or equivalent UI pattern clearly behaves or appears differently.

**Likely inconsistency**
The elements appear to represent the same pattern, but the available context is incomplete.

**Recommendation**
A consistency improvement rather than a confirmed defect.

Do not assume two elements must be identical when there is a clear contextual reason for variation.

## Severity

### Critical
An inconsistency that can cause serious user confusion, incorrect actions, accessibility problems, or broken interaction expectations.

### High
A repeated inconsistency affecting important workflows or frequently used components.

### Medium
A noticeable inconsistency that reduces clarity, predictability, or perceived product quality.

### Low
A minor visual or polish inconsistency with limited user impact.

## Finding format

For each significant finding provide:

**Issue:** What is inconsistent.

**Evidence:** Where the inconsistency appears.

**Pattern affected:** Button, typography, spacing, navigation, etc.

**Expected behavior:** The pattern that should be standardized.

**Why it matters:** User, usability, accessibility, or product-quality impact.

**Classification:** Confirmed inconsistency / Likely inconsistency / Recommendation.

**Severity:** Critical / High / Medium / Low.

**Recommendation:** Specific action to create consistency.

**Confidence:** High / Medium / Low.

## Output structure

# UI Consistency Health

Provide:

- Overall consistency assessment
- Strongest consistency area
- Biggest inconsistency
- Most important improvement

## Consistency Score

Provide a 0–100 score only when enough screens or patterns are available.

Explain the main factors behind the score.

## Priority Findings

| Priority | Pattern | Finding | Severity | Impact |
|---|---|---|---|---|

## Detailed Audit

### Layout

Findings about grids, spacing, alignment, containers, and rhythm.

### Typography

Findings about type hierarchy and text styles.

### Colors

Findings about visual and semantic color usage.

### Components

Findings about buttons, inputs, cards, navigation, tables, modals, and other repeated UI.

### Icons

Findings about icon family, sizing, stroke, and placement.

### Forms

Findings about fields, labels, errors, and controls.

### Navigation

Findings about menus, tabs, breadcrumbs, and active states.

### States

Findings about interaction and feedback states.

### Responsive Behavior

Findings when multiple breakpoints are available.

## Repeated Pattern Opportunities

Identify UI patterns that should become:

- Shared components
- Variants
- Tokens
- Templates
- Standardized interaction patterns

## Quick Wins

List the highest-impact consistency fixes that can be made quickly.

## Recommended Standard

For each major repeated pattern, recommend one clear standard such as:

- Button height
- Input height
- Card radius
- Heading style
- Section spacing
- Icon size
- Navigation behavior

Only recommend a standard when there is enough evidence to justify it.

## Important rules

- Do not redesign the interface during an audit.
- Do not modify Figma unless explicitly asked.
- Do not treat every visual difference as an error.
- Consider product context and intentional exceptions.
- Compare equivalent patterns rather than unrelated elements.
- Never invent undocumented design-system rules.
- Separate confirmed inconsistencies from recommendations.
- Prioritize repeated patterns and high-impact workflows.
- Prefer one reusable standard over many isolated fixes.
- Focus on consistency that improves usability, predictability, accessibility, and maintainability.
