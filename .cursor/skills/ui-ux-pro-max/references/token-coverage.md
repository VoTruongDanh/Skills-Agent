---
name: token-coverage
description: "Reference guide for Token Coverage"
encoding: "UTF-8"
---

# Token Coverage

Reports what fraction of a Figma file's visual decisions are bound to variables and styles, and which hardcoded values should have been bound.

**This skill is read-only.** Rebinding a value changes how a design renders — it is meaningfully more destructive than a rename. Report first. Only rebind after explicit, itemised approval.

## What this skill is for

Two different questions, one report:

1. **The number** — a coverage percentage a design system owner can put in a review or track over time.
2. **The list** — the specific hardcoded values that have a variable sitting right there, unused.

The second is what makes the first actionable. A coverage report without matched suggestions is a scolding.

## Workflow

### 1. Establish scope

- **Selection** — the selected node and its subtree (default if something is selected)
- **Page** — the current page
- **File** — everything

Above ~600 nodes, report the count and ask before continuing.

Ask what to exclude, or infer it: illustration frames, marketing artwork, imported assets, and pages named `Scratch`, `Archive`, `Explorations`, `WIP`. Raw values are legitimate there, and counting them drags the number down for no reason. State what you excluded.

### 2. Load the variable inventory

`get_variable_defs` for all collections, modes, and resolved values. Build a lookup from resolved value to variable name — this is what makes matching possible. Include text styles and effect styles if the scope is File.

If the file has no variables at all, stop and say so plainly. The useful output there is different: the most-repeated raw values, as a starting token set. Offer that instead of a 0% report.

### 3. Gather node data

`get_design_context` for the scope — it exposes token bindings alongside resolved values. `get_metadata` only for structure when needed. Do not call `get_screenshot`.

### 4. Measure

Count bound versus hardcoded across these dimensions, each reported separately. See `references/coverage-rules.md` for what counts and what is exempt.

| Dimension | Bound means |
|---|---|
| Fill color | Variable or paint style |
| Stroke color | Variable or paint style |
| Typography | Text style, or font size/weight/line-height bound to variables |
| Corner radius | Variable |
| Spacing | Padding and item spacing bound to variables |
| Effects | Effect style |

Report per-dimension coverage and one overall figure. Say how the overall figure is weighted — an unweighted average across dimensions is fine, but state it, because a file with six radii and four hundred fills would otherwise be misread.

### 5. Classify every hardcoded value

- **Error** — the raw value exactly matches an existing variable's resolved value. Pure oversight. Highest-value finding in the whole report; lead with these.
- **Warning** — near miss (a hex within a small delta of a variable, a spacing value one off a scale step), or a raw value repeated three or more times with no variable counterpart. The first is probably a typo; the second is a missing token.
- **Info** — a one-off raw value with no counterpart and no repetition.

For every Error, name the variable it should bind to. For every repeated Warning, propose a variable name following the file's existing convention.

### 6. Write the report

Structure:

1. **Coverage summary** — overall figure, then a per-dimension table. Nodes scanned, what was excluded.
2. **Exact matches (Error)** — value, count, location, the variable it should be. This is the section people act on.
3. **Near misses and missing tokens (Warning)** — grouped by value, not by node. Forty rows of the same hex is noise; one row saying it appears forty times is a finding.
4. **Patterns** — 2–4 sentences. "Fills are 94% bound but spacing is 31%" tells the owner where to spend an afternoon. That sentence is worth more than the whole table.
5. **Next step** — offer to rebind the exact matches only.

If there are more than 40 distinct raw values, show the top 20 by occurrence count, state the total, offer the rest.

### 7. Applying fixes (only on explicit approval)

- Offer **exact matches only**. Never offer to bulk-rebind near misses — a near miss may be deliberate.
- Confirm the itemised list before touching anything.
- Rebind via `use_figma`, in batches, and report what changed.
- Skip anything inside a component that comes from an external library.

## Calibration

100% is not the goal and you should say so in the report. Illustrations, brand artwork, and one-off marketing layouts have legitimate raw values. A file at 85% with clean fills and messy decoration is healthier than one at 97% where someone tokenised a hero illustration.

Do not editorialise about how bad a low number is. Report it, name the biggest lever, stop.

## Boundaries

- Do not create variables. Propose names; the user creates them.
- Do not rename or restructure existing variables — that is the naming linter's job.
- Do not rebind anything inside instances of external library components. Flag the main component instead.
- If coverage is already high, say so in two sentences and list only the exact matches.

## Reference

- `references/coverage-rules.md` — what counts per dimension, exemptions, matching and near-miss thresholds.
