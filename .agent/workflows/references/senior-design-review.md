---
name: senior-design-review
description: "Reference guide for Senior Design Review"
encoding: "UTF-8"
---

# Senior Design Review

A senior designer doesn't run a flat checklist. They triage. Confusion and friction lose more users than any single accessibility failure, so findings are weighted in this order:

1. **Cognitive load**: heaviest weight. Simplicity first.
2. **Accessibility (WCAG 2.1 A/AA)**: second. Physical and perceptual barriers.
3. **Usability heuristics**: general polish pass, catches what the first two miss.

Run all three on every design by default. Skip a section only if genuinely nothing applies, say so briefly, don't pad.

---

## 1. Cognitive Load Audit (primary weight)

Users abandon flows because thinking is tiring, not because they don't want to convert. Every unnecessary decision, unfamiliar pattern, or piece of visual noise drains a finite mental budget.

**Intrinsic load**: unavoidable thinking to understand the task. Don't add to it.
**Extraneous load**: everything else. This is what you cut.

**Lever 1, cut visual clutter.** For every element ask: does this help the user understand what to do or why? If removed, is anything lost? Watch for: redundant navigation, decorative images with no purpose, typography variation without semantic meaning, multiple competing CTAs, legal/compliance copy surfaced at the wrong moment.

**Lever 2, build on existing mental models.** Familiarity is a feature. Use known patterns: primary action = most prominent button, destructive actions = less prominent/text links, labels above or inside fields, red/yellow/green for error/warning/success, trust signals near the point of commitment. Flag any label or pattern a mainstream user wouldn't recognise from everyday apps.

**Lever 3, offload tasks from the user.** Don't make them remember, calculate, or decide what the product can handle. Re-display prior input at confirmation, use smart defaults, auto-fill from context, show totals instead of requiring mental math, show progress indicators.

**General checks worth confirming on most screens:**
- Legible default text size and generous line height over dense layouts
- Single clear primary action per screen, not competing choices
- No jargon, no icon-only actions without a text label
- Confirmation/undo on anything destructive or hard to reverse

**Do not cut:** confirmation steps on high-stakes actions, necessary intrinsic complexity of the task itself, honest defaults.

---

## 2. Accessibility Audit (WCAG 2.1 A/AA)

Baseline: WCAG 2.1 Level A and AA. Mention AAA only as a recommendation, never as a compliance bar, unless asked.

Be explicit about confidence when reviewing a static screen: contrast risk, text size, visible labels, layout, touch target size, spacing, and colour use can be assessed visually. Keyboard access, focus order, semantic markup, alt text, and screen reader behaviour cannot be fully verified from a screenshot, so say "likely issue" or "needs implementation verification," never claim conformance.

**Perceivable**
- Contrast minimum 4.5:1 normal text, 3:1 large text (1.4.3 AA): flag subtle grey-on-white and low-contrast placeholder-as-label text
- Never rely on colour alone for state or error (1.4.1 A)
- Non-text contrast ≥3:1 for icons, borders, focus indicators (1.4.11 AA)
- Text alternatives for meaningful images/icons (1.1.1 A)

**Operable**
- Target size: 44×44 CSS px minimum, more where the audience or context makes precision harder (2.5.5)
- Visible keyboard focus states on every interactive element (2.4.7 AA)
- No auto-advancing content without a pause control (2.2.2 A)
- Link/button labels describe destination or action, never "click here" (2.4.4 A)

**Understandable**
- Persistent visible labels, never placeholder-as-label (3.3.2 A)
- Errors identified in text, not colour alone, with a clear fix path (3.3.1 A, 3.3.3 AA)
- Consistent navigation and component behaviour across screens (3.2.3/3.2.4 AA)
- Confirmation or reversal step on high-stakes submissions (3.3.4 AA)

**Robust**
- Custom controls (segmented controls, toggles, custom dropdowns) need correct accessible name/role/state in implementation (4.1.2 A): flag these as implementation notes
- Async status changes (saved, error, loading) need to be announced (4.1.3 AA)

**Severity:** Blocker (prevents task completion) > High (major confusion or likely AA failure) > Medium (friction) > Low (polish).

---

## 3. Usability Heuristics (secondary pass)

Apply only the heuristics genuinely relevant to what's in front of you, skip the rest, don't force all ten.

- **H1 Visibility of system status**: loading, progress, success/error states always visible
- **H2 Match real world**: plain language and familiar concepts, no internal jargon
- **H3 User control and freedom**: clear exits, undo, cancel on everything
- **H4 Consistency and standards**: same component behaves the same everywhere
- **H5 Error prevention**: good defaults and confirmation beat a good error message
- **H6 Recognition over recall**: don't make users remember something from an earlier step
- **H7 Flexibility and efficiency**: fine to skip if the audience is novice-only and power-user paths add clutter
- **H8 Aesthetic and minimalist design**: every element should earn its place
- **H9 Recover from errors**: plain language, specific problem, clear fix
- **H10 Help and documentation**: self-explanatory first; contextual help second

---

## Output Format

Be brief. This is a scan result, not a report: the person reading it is mid-work, not reviewing documentation.

Hard limits:
- One line per finding. Format: `[Screen]: [issue] → [fix]`. No separate explanation, no "Fix:" on its own line, no restating why it matters unless the fix itself is non-obvious.
- Max 3 findings per section. If there are more real issues, keep only the highest-severity 3 and drop the rest, do not list every screen reviewed.
- Skip a section entirely (don't write "nothing to flag") if it's clean.
- No preamble, no scene-setting sentence before the verdict, no closing summary after priority actions.

```
**Verdict:** [one line]

**Cognitive load** (skip if clean)
- [Screen]: [issue] → [fix]

**Accessibility** (skip if clean)
- [Screen]: [issue] → [fix] (WCAG ref, severity)

**Heuristics** (skip if clean)
- [H#] [Screen]: [issue] → [fix]

**Priority actions** (max 3, ranked by impact)
1. ...
```

Total output should read in under 15 seconds. If a draft runs longer than the template above, cut findings, don't shrink the font: fewer, higher-severity items beats full coverage.
