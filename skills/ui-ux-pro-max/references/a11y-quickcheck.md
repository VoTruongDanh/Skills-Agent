---
name: a11y-quickcheck
description: "Reference guide for A11y Quickcheck"
encoding: "UTF-8"
---

# A11y Quickcheck

A fast, non-destructive accessibility pass for a selected frame. Use this
before handoff to catch the issues that are cheapest to fix in design and
most expensive to fix in code.

## Steps

1. **Identify scope.** Use the currently selected frame(s). If nothing is
   selected, ask the user which frame(s) to audit.

2. **Check color contrast (WCAG 2.1 AA).**
   - For every text layer, compute contrast against its background.
   - Required ratio: 4.5:1 for normal text; 3:1 for large text (≥18px bold
     or ≥24px regular).
   - Also check non-text UI elements (icon buttons, form field borders,
     focus indicators) against a 3:1 requirement.
   - Record: layer name, actual ratio, required ratio, pass/fail.

3. **Check tap/click target size.**
   - For every interactive element (button, icon button, checkbox, radio,
     input, link), measure its bounding box.
   - Flag anything smaller than 44x44px.
   - Flag any two adjacent interactive elements with less than 8px of
     spacing between their tap areas.

4. **Check for color-only meaning.**
   - Look for status indicators, error/success states, charts, or tags that
     rely solely on hue to convey meaning (no icon, label, or pattern).
   - Flag these as warnings, not hard fails, since severity depends on
     context.

5. **Check text alternatives.**
   - For every image, icon, and icon-only button, check whether the layer
     has been renamed to something descriptive (not "Frame 214" or
     "Vector 12") or has an annotation.
   - Flag any that still have default/generic names — treat this as a
     proxy for "no alt text planned."

6. **Check reading/focus order.**
   - Compare the visual top-to-bottom, left-to-right order of elements to
     their order in the layers panel.
   - Flag any mismatch, since this is what breaks keyboard and
     screen-reader navigation.

7. **Compile and place the report.**
   - Group findings into "Fail" (contrast, tap targets, reading order) and
     "Warning" (color-only meaning, missing labels).
   - For each finding, include: layer name, check failed, specific values,
     and a one-line concrete fix (e.g. "Darken text to #1A1A1A for 4.6:1"
     or "Increase hit area to 44x44px").
   - Add a one-line summary at the top: "X checked · Y fails · Z warnings."
   - Place this as a new frame or table on the canvas, positioned to the
     right of the audited frame. Do not edit the original design.

## Notes

- This is a fast triage pass, not a substitute for a full manual or
  assistive-technology audit.
- If a check can't be completed (e.g. no clear background for a text
  layer), state that explicitly in the report rather than guessing.
