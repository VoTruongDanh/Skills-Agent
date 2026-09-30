---
name: responsive-design-checker
description: "Reference guide for Responsive Design Checker — Figma"
encoding: "UTF-8"
---

# Responsive Design Checker — Figma

## What this skill does

Review selected Figma screens, frames, components, or user flows for responsive behavior across viewport sizes.

The goal is not to redesign the interface automatically. The goal is to identify where a design may fail, become difficult to use, or lose visual hierarchy when the viewport changes.

Do not modify the Figma canvas during a review unless the user explicitly asks for fixes.

## Best used for

- SaaS dashboards
- Web applications
- Marketing websites
- E-commerce interfaces
- Mobile-responsive websites
- Tablet layouts
- Design-system components
- Landing pages
- Onboarding and signup flows
- Data-heavy interfaces

## Primary review areas

### 1. Breakpoint behavior

Check whether the layout has clear behavior at common viewport ranges:

- Large desktop
- Standard desktop
- Tablet
- Mobile
- Small mobile

Identify layouts that appear dependent on a single fixed width.

Look for missing breakpoint decisions such as:

- Navigation collapse
- Sidebar collapse
- Multi-column to single-column transitions
- Table-to-card transformations
- Grid column changes
- Content reordering

### 2. Layout and spacing

Evaluate:

- Fixed widths that may cause overflow
- Excessive horizontal padding
- Inconsistent margins
- Broken spacing scales
- Elements touching viewport edges
- Cards that cannot shrink correctly
- Uneven column behavior
- Misaligned content at smaller widths

Distinguish intentional fixed dimensions from risky fixed dimensions.

### 3. Typography scaling

Check:

- Heading sizes
- Body text
- Line height
- Text wrapping
- Long labels
- Button labels
- Navigation labels
- Data-heavy text

Flag cases where text becomes:

- Too large for the available width
- Too small to remain readable
- Unexpectedly truncated
- Excessively wrapped
- Visually unbalanced

### 4. Component responsiveness

Check components such as:

- Buttons
- Inputs
- Cards
- Modals
- Navigation
- Tabs
- Dropdowns
- Tables
- Charts
- Sidebars
- Headers
- Toolbars

Verify whether components have appropriate responsive variants or behavior.

### 5. Overflow and clipping

Look for:

- Horizontal scrolling
- Cropped content
- Hidden controls
- Text clipping
- Images extending outside containers
- Charts exceeding their containers
- Tables becoming unusable
- Modals exceeding viewport height or width

### 6. Touch and mobile usability

For mobile layouts, check:

- Touch-target size
- Spacing between interactive elements
- Thumb reach
- Sticky controls
- Bottom navigation
- Input usability
- Keyboard-related layout risks
- Dense action groups

Do not claim exact pixel compliance unless the dimensions are available in the Figma data.

### 7. Information hierarchy

Evaluate whether responsive changes preserve:

- Primary actions
- Important information
- Navigation priority
- Content hierarchy
- Visual grouping
- User orientation

Flag cases where responsive compression makes important content harder to discover.

### 8. Images and media

Check:

- Image cropping
- Aspect-ratio behavior
- Responsive scaling
- Hero sections
- Product images
- Video containers
- Decorative graphics

Identify media that may become distorted, excessively cropped, or too large on smaller screens.

### 9. Forms

Check:

- Input width
- Label wrapping
- Multi-column forms
- Button placement
- Error-message wrapping
- Form section hierarchy
- Keyboard-friendly layouts

Recommend stacking or restructuring when side-by-side controls become difficult to use.

### 10. Tables and data-heavy UI

Check whether:

- Tables fit smaller screens
- Columns have reasonable priorities
- Secondary information can collapse
- Horizontal scrolling is intentional
- Mobile alternatives are provided
- Important actions remain accessible

Do not automatically recommend converting every table into cards. Consider the information structure and user task first.

## Review process

Follow this sequence:

1. Identify the selected frames and available viewport sizes.
2. Determine the intended responsive structure.
3. Compare layouts across available sizes.
4. Identify visual and functional risks.
5. Separate confirmed issues from assumptions.
6. Assign severity and user impact.
7. Explain the evidence.
8. Recommend the smallest practical design change.
9. Identify missing responsive states.
10. Summarize the highest-priority issues.

## Severity levels

Use four levels:

### Critical
A responsive issue can prevent users from completing an important task.

Examples:
- Primary action becomes inaccessible
- Content is clipped
- Navigation becomes unusable
- Critical form fields cannot be reached

### High
A major issue creates significant friction or confusion.

Examples:
- Important content overflows
- Mobile navigation is difficult to operate
- A key workflow breaks at a common viewport
- Large sections become unusable

### Medium
A noticeable issue affects usability or visual quality but does not block the task.

Examples:
- Awkward wrapping
- Inconsistent spacing
- Poor component stacking
- Weak hierarchy at tablet widths

### Low
A polish or consistency issue with limited user impact.

Examples:
- Minor alignment differences
- Small spacing inconsistencies
- Slightly inefficient use of available space

## Evidence rules

Every finding should include evidence.

Good evidence:

- "The three-column dashboard remains unchanged at the mobile width, leaving insufficient space for the table content."
- "The header keeps six navigation actions in one row while the available width decreases substantially."
- "The form fields remain side-by-side at the narrow viewport, creating very short input areas."

Avoid unsupported claims such as:

- "Users will definitely abandon this."
- "This violates accessibility standards" unless the relevant dimensions or requirements are confirmed.
- "This will break on every phone."

Use uncertainty language when the evidence is incomplete.

## Finding format

Return findings using this structure:

### Finding [number]: [Short issue title]

**Severity:** Critical / High / Medium / Low  
**Area:** Layout / Typography / Navigation / Component / Overflow / Touch / Forms / Data / Media  
**Viewport:** Desktop / Tablet / Mobile / Specific frame  
**Evidence:** What was observed.  
**Impact:** Why it matters to the user's task.  
**Recommendation:** The practical change to consider.  
**Confidence:** High / Medium / Low

## Responsive score

When enough evidence is available, provide a score from 0–100.

Use these dimensions:

- Layout adaptability — 20
- Content readability — 15
- Component behavior — 15
- Navigation adaptability — 15
- Overflow and clipping — 15
- Touch/mobile usability — 10
- Visual hierarchy — 10

Do not present the score as an objective industry standard. It is a review heuristic.

## Output structure

Use this final report structure:

# Responsive Design Review

## Overall score

**Score:** XX/100  
**Summary:** One or two sentences describing the overall responsive quality.

## Top issues

List the 3–5 highest-priority findings.

## Detailed findings

Provide findings using the standard finding format.

## Missing responsive states

List important states that are not represented, such as:

- Mobile navigation open
- Collapsed sidebar
- Stacked form
- Tablet navigation
- Horizontal table scroll
- Long-content state
- Small-screen modal

## Recommended breakpoint strategy

Suggest behavioral breakpoints rather than blindly prescribing exact widths.

For example:

- Desktop: full navigation + multi-column layout
- Tablet: reduced navigation + simplified grid
- Mobile: collapsed navigation + stacked content

Only provide exact breakpoint values when the design context supports them.

## Quick wins

List small changes that can improve responsive quality quickly.

## Design-system implications

Identify reusable patterns that should become responsive component variants.

Examples:

- Responsive container
- Stack component
- Responsive grid
- Mobile navigation
- Adaptive table
- Responsive modal
- Button group behavior

## Important principles

1. Review behavior, not just screenshots.
2. Preserve task priority across viewport sizes.
3. Do not assume desktop layouts simply shrink.
4. Prefer intentional responsive transformations.
5. Avoid unnecessary redesign recommendations.
6. Separate evidence from assumptions.
7. Consider real content, not only placeholder content.
8. Do not modify the Figma file unless explicitly asked.
9. Prioritize user impact over visual perfection.
10. Recommend reusable responsive patterns when the same issue appears repeatedly.

## Example request

"Review these SaaS dashboard screens for responsive issues across desktop, tablet, and mobile. Identify the most important problems, explain the evidence, assign severity, and recommend practical fixes."

## Example output

**Responsive score: 76/100**

### Finding 1: Dashboard table does not adapt to mobile
**Severity:** High  
**Area:** Data / Overflow  
**Viewport:** Mobile  
**Evidence:** The table retains multiple desktop columns at the narrow viewport.  
**Impact:** Important values and actions may become difficult to scan or access.  
**Recommendation:** Prioritize columns and introduce horizontal scrolling or a mobile-specific data presentation.  
**Confidence:** High

### Finding 2: Header actions compete for limited space
**Severity:** Medium  
**Area:** Navigation / Layout  
**Viewport:** Mobile  
**Evidence:** Multiple navigation and utility actions remain visible in a single horizontal row.  
**Impact:** Labels may wrap or controls may become compressed.  
**Recommendation:** Collapse secondary actions into a menu while preserving the primary action.  
**Confidence:** High
