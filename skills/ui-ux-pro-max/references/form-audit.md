---
name: form-audit
description: Audits a form on the Figma canvas for labels, required marking, states, error messages, reading order, grouping, and design system adherence. Use when the user selects a form or a screen containing input fields and asks for a review, a check, an audit, a completeness pass, or asks whether the form is ready for developer handoff.
encoding: "UTF-8"
---

# Form Audit

Structural audit of a form on the Figma canvas. Produces a prioritized report with concrete problems and proposed fixes.

## Scope

Apply to: frames containing two or more input fields, or to a single field when the user explicitly selects it.

Do not apply to: screens without inputs, read-only tables, single-control filters.

## Procedure

1. Read the selection. If empty, ask the user to select the form frame.
2. Identify the component library in use by inspecting existing instances and subscribed libraries. If none is detected, skip the design system section and say so in the report.
3. Enumerate all input fields in visual order (top to bottom, left to right).
4. Run the **Per-field checks** on each field.
5. Run the **Form-level checks**.
6. Produce the report in the format given under **Output**.

Do not modify the canvas. This is a read-only audit unless the user explicitly asks for the fixes to be applied.

## Per-field checks

### Label
- The label must be a persistent text element, above or beside the field.
- FAIL if the only identifying text sits inside the field (placeholder as label). The placeholder disappears on typing and leaves the user without context.
- FAIL if a label exists but the text is empty or filler ("Label", "Lorem").

### Required marking
- Marking must be consistent across the form: either mark the required fields or mark the optional ones. Never both, never partially.
- FAIL if some fields carry an asterisk while other required fields do not.
- FAIL if the asterisk is the only indicator, with no legend explaining what it means.

### States
Check that the design covers these states. Report the missing ones:
- default (empty)
- focus
- filled (with a value)
- error
- disabled
- readonly, only if the flow calls for it
- loading, only for fields with async validation or remote data (e.g. remote select, autocomplete)

A state counts as covered if it exists as a component variant or as a separate frame in the file.

### Error messages
- The message belongs below the field, not above it and not in a banner at the top of the form.
- The message must say what to do, not just what is wrong. FAIL on "Invalid field", "Error". PASS on "Enter an email address including the @ sign".
- Space for the message must be reserved in the layout, or the layout must absorb the shift without pushing the fields below out of place.
- FAIL if the error is carried by red color alone with no text.

### Control type
Check that the chosen control matches the expected data:
- email, phone, number, date, currency, password must use the specific control, not a generic text field.
- FAIL on a date field drawn as a free-text input with no date picker.
- FAIL on a field with fewer than 5 fixed options drawn as a dropdown instead of a radio group.
- FAIL on a field with more than 7 options drawn as a radio group instead of a searchable dropdown.
- FAIL on a binary choice drawn as two radios when the context is an immediate-effect setting: that calls for a toggle.

### Helper text
- If the field expects a non-obvious format (tax ID, IBAN, VAT number), a hint must be visible before typing, not only on error.

## Form-level checks

### Reading and tab order
- Visual reading order must match the logical completion order.
- FAIL on two-column layouts where the logical sequence jumps across columns and back.
- Report fields placed outside the main flow that keyboard navigation would reach at an unexpected point.

### Grouping
- Beyond 6 fields, the form must be split into groups with headings.
- Groups must follow a semantic criterion (personal details, contact, address), not space filling.
- FAIL if group headings are generic ("Section 1", "Other").

### Call to action
- One primary action per form.
- The primary action must have a loading state, to prevent double submission.
- Cancel or back must not carry the same visual weight as the primary.
- FAIL if the primary is disabled until the form is complete with no indication of what is missing. A disabled button with no explanation blocks the user without telling them why.

### Form states
Check that these exist:
- submitting
- global error (server failure), distinct from field-level errors
- success, or the screen that follows

### Length and progression
- Beyond 12 fields, consider splitting into steps with a progress indicator.
- Where conditional fields exist, check that the design shows both the state where they appear and the state where they are hidden.

## Design system adherence

Run this section only if step 2 of the procedure detected a component library.

For each field:
- Check that it is an instance of a library component, not a hand-rebuilt group.
- Report as **detached** any field that visually replicates an existing component without being an instance of it.
- Report as **structural override** any instance where hierarchy, fixed sizing, or inner layer visibility has been changed beyond what the component properties allow. For each, name the property or slot that would achieve the same result without the override.
- Report hardcoded values (color, spacing, typography) where a matching token or variable exists.
- Report as **missing component** any field the library has no match for. These are candidates to propose as library additions, not to rebuild by hand in the file.

## Output

Report in this format:

```
## Form audit: [frame name]
Fields analyzed: N
Library detected: [name, or "none"]

### Blockers
Problems that prevent developer handoff.
- [Field] Problem. → Proposed fix.

### To fix
Problems that will cause rework or friction in use.
- [Field] Problem. → Proposed fix.

### To consider
Optional improvements.
- [Field] Observation.

### Design system adherence
| Field | Library component | Result | Notes |
|---|---|---|---|

### Missing states
Per field, the states absent from the file.
```

Report rules:
- Refer to fields by layer name, not by position.
- Every entry must carry a concrete fix, not a general principle.
- If a section is empty, write "No issues found" rather than dropping it.
- Cap the report at 40 entries. Past that, report the most severe and state how many remain.

## Examples

**Blocker, good:**
`[email-field] No persistent label; identification relies on the placeholder "Your email". → Add an "Email" label above the field and move the placeholder to a format example, "name@domain.com".`

**Blocker, bad:**
`[email-field] Label missing.` — says nothing about what to do.

**Structural override, good:**
`[birth-date] Built as three side-by-side dropdowns for day, month, year. The library ships a date picker that covers this case and supports keyboard entry. → Replace with the date picker instance.`

**To consider, good:**
`[notes] Three-row text area for a field that collects long descriptions in this flow. → Consider height that adapts to content.`
