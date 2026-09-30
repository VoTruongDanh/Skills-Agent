---
name: responsive-breakpoint-adapter
description: "Reference guide for Responsive / Breakpoint Adapter"
encoding: "UTF-8"
---

# Responsive / Breakpoint Adapter

**Name:** Responsive / Breakpoint Adapter
**Description:** Produces the mobile (or tablet) version of an existing frame by applying each value's paired layout-variable/mobile value instead of manually resizing, and flags anything with no mobile mapping. Run this whenever a frame needs a version at another breakpoint.

## When to invoke
Trigger when asked to produce a version of an existing frame at another breakpoint, or to check whether a frame is ready to adapt.

## Steps
1. Read the source frame's spacing/sizing values and identify which are backed by a layout/jumper variable (desktop→mobile pair) versus a fixed value.
2. For every value backed by a layout variable, apply its counterpart at the target breakpoint — do not manually guess a smaller number.
3. For content with no defined responsive behavior (e.g. a 3-column grid with no documented mobile pattern), apply the file's established pattern if one exists; ask if none exists.
4. Re-check text styles against the responsive type collection so type sizes switch mode too, not just spacing.
5. Flag anything with no mobile-mapped variable at all — that's a gap in the token system, not something to invent a value for.

## Guardrails — do not bend
- Never introduce a spacing or type value that isn't backed by a token, even to "make it fit."
- Don't reflow content order without confirming — going from a grid to a stack can change reading order, which is a content decision, not a spacing one.

## Output
- New frame at the target breakpoint.
- Table: `Property | Source value/token | Target value/token`.
- List of any values with no mapped counterpart found.
