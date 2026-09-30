---
name: accessibility-review
description: "Reference guide for Accessibility Review — WCAG 2.2, canvas-native, two-pass-in-one"
encoding: "UTF-8"
---

# Accessibility Review — WCAG 2.2, canvas-native, two-pass-in-one

This skill audits **exactly what's selected** — Page (canvas contents), Section,
Frame, Group, or Component/Set — against WCAG 2.2, using real measured values
(computed contrast ratios, actual px sizes, actual token bindings), never
eyeballed. It pins violations onto the canvas and returns a ranked pass/fail
report in chat.

**There is no separate "pass 1 / pass 2" mode.** Every invocation runs the
same algorithm: fully re-check the selection, then reconcile fresh results
against whatever is already pinned. Re-run and it clears what's fixed.

Load `figma-use` before any `use_figma` call in this workflow.

## Check EVERY element — not just the obvious ones (read first)

The most common failure is fixating on one control and skipping a grid/list of
similar components. DO NOT do this.

- **Walk into every component instance.** Chips, list rows, cards, toggles, tabs
  — each instance is its own element. Measure the text and meaningful icons
  *inside each instance*, using the instance's rendered (overridden) colors. A
  row of 10 "Label" chips is 10 elements to check, not 1.
- **A component repeated in many color variants is a trap:** some pass, some fail.
  Evaluate and report each.
- **Report an honest, itemized element count** equal to the elements measured.

## Annotation model — ONE consolidated pin per element (important)

Do NOT create a separate annotation for every criterion. That floods the frame.
Instead:

- **One annotation per failing element**, listing ALL of that element's failures
  together. A chip whose text fails 1.4.3 AND icon fails 1.4.11 gets a SINGLE pin
  reading, e.g.:
  ```
  🚨 2 issues
  • Text too light — 3.46:1, needs 4.5:1 (WCAG 1.4.3) · Fix: darken text
  • Icon too faint — 2.85:1, needs 3:1 (WCAG 1.4.11) · Fix: darken icon stroke
  ```
  A single failure reads `🚨 1 issue` + the one line.
- **Plain language first, jargon second** on every line.
- **One frame-level summary badge** (separate) shows the overall count — see below.
- Result: N failing elements → N element pins + 1 summary badge. Never one pin
  per criterion.

### Method A — native Figma Annotations (PREFERRED, always try first)
Use the Plugin API `figma.annotations`. Native annotations show as visible pins
in normal design mode and need NO comment permission or REST token. Write one
consolidated annotation per failing element (category `Accessibility Review`).

### Method B — drawn markers (FALLBACK only, if native annotations unavailable)
Create one locked overlay frame `⚠️ Accessibility Annotations` at the reviewed
frame's exact x/y/width/height. For each failing element draw a red (#E5484D) 2px
outline over its bounds, a leader line, and ONE auto-sizing callout listing all
its issues (never clip). Number multiple failing elements ①②③.

## Frame-level summary badge (always add one, separate from element pins)

Place ONE badge on the reviewed frame with the headline verdict, so the overall
state reads at a glance:
- `🚨 16 Blockers · 0 Warnings · 0 Advisories · WCAG 2.2 AA`, or if clean
  `✅ 0 Blockers · WCAG 2.2 AA — passes`.
- Method A: native annotation on the frame node, tagged `[SUMMARY]`.
- Method B: a pill label at the frame's top-left inside the overlay.
- Update it every run (or flip to ✅) — never leave a stale count. Its blocker
  count MUST equal the sum of blocker issues across all element pins.

## Two annotation categories

| Category | Color | Purpose | Who reads it |
|---|---|---|---|
| `Accessibility Review` | `red` | Open violations, one consolidated pin per element, cleared once fixed | The designer, in this file |
| `Accessibility` | `blue` | Final, resolved specs — written once fixed/intent decided | Downstream web + iOS/Android workflows |

```js
const existing = await figma.annotations.getAnnotationCategoriesAsync()
async function getOrCreate(label, color) {
  const found = existing.find(c => c.label === label)
  if (found) return found
  return await figma.annotations.addAnnotationCategoryAsync({ label, color })
}
const reviewCat = await getOrCreate('Accessibility Review', 'red')
const specCat = await getOrCreate('Accessibility', 'blue')
```

## Tagging + upsert (one review annotation per node, replaced on re-run)

Each element carries at most ONE review annotation, tagged `[A11Y]`; the frame
carries one `[SUMMARY]`. Read, preserve unrelated annotations, replace only these.

```js
// Consolidated per-element review annotation. `lines` = array of issue strings.
function upsertNodeReview(node, categoryId, lines) {
  const others = (node.annotations || []).filter(a => !/^\[A11Y\]/.test(a.label || ''))
  if (!lines.length) { node.annotations = others; return }   // passes now → clear
  const header = lines.length === 1 ? '🚨 1 issue' : `🚨 ${lines.length} issues`
  node.annotations = [
    ...others,
    { categoryId, label: `[A11Y] ${header}`, labelMarkdown: [header, ...lines].join('\n') }
  ]
}
// Frame summary badge — replace any prior [SUMMARY] on the frame node
function upsertSummary(frameNode, categoryId, text) {
  const others = (frameNode.annotations || []).filter(a => !/^\[SUMMARY\]/.test(a.label || ''))
  frameNode.annotations = [...others, { categoryId, label: `[SUMMARY] ${text}` }]
}
```

## Scope resolution

- Nothing selected → **ask the user to select the frame(s) first.**
- Selection present → walk that node and EVERY descendant, including inside
  instances (measure the instance as rendered).
- Confirm you're reviewing the current selection; if findings mention elements
  not present, you reviewed a stale node — re-read and start over.
- Very large node overflows → drill into children, still covering every child.

```js
const sel = figma.currentPage.selection
const roots = sel.length ? sel : figma.currentPage.children
const scopeNodes = roots.flatMap(r => [r, ...r.findAll(() => true)])
```

## Scope discipline — product UI vs documentation
Only **product UI** counts toward totals. Documentation scaffolding (annotation
labels, spec captions, legend/status chips, "Do/Don't" notes) goes in a separate
"Documentation (not counted)" section. When unsure, list as documentation.

## Contrast only applies where content sits on a surface
Contrast is measured between **text or a meaningful icon** and the surface behind
it. A plain shape with nothing on top (decorative rectangle, swatch, empty
placeholder) has NO contrast requirement and must NOT be flagged. A component that
CONTAINS text or icons IS in scope.

## The algorithm (runs identically every time)

1. **Read prior state** — existing `[A11Y]` per node and the frame `[SUMMARY]`.
2. **Gather fresh facts** — `get_screenshot`, `get_variable_defs`,
   `get_design_context` / `get_metadata`. Enumerate every text node and
   meaningful icon, INCLUDING those inside instances.
3. **Classify** product-UI vs documentation.
4. **Run every checkpoint** against fresh facts for every in-scope element.
5. **Collect failures per element**, then `upsertNodeReview(node, reviewCat.id, lines)`
   with ALL of that element's failing-criterion lines (empty list → clears a
   previously-open pin). Resolved intents (Design+annotate) → write final spec to
   `Accessibility`.
6. **Self-check before reporting — MANDATORY HARD GATE.** Enumerate every distinct
   interactive/content element visible; each MUST appear in findings as a
   violation, an explicit pass, or explicitly decorative. If any visible element
   is missing, measure it and add it before finalizing.
7. **Write the frame summary badge** with final counts, then report.

## Severity (for the chat report)

- **Blocker** — a **MEASURED** Design-type A/AA failure. Always a Blocker. Total
  blocker count = sum of blocker issues across element pins = the summary badge.
- **Warning** — target 24–44px, borderline non-text contrast, heading jump,
  reflow risk; or INFERRED med/high confidence.
- **Advisory** — Design+annotate / Runtime-only; or low-confidence inferred.

## Report template (SAVE to a file AND print in chat)

```
## Accessibility review — <selection name>
Scope: product-ui · WCAG 2.2 AA · N elements checked (M text+icon checks)
Verdict: 🚨 N Blockers · N Warnings · N Advisories · N resolved this run

### Elements checked (itemized)
1. Button "Primary Button" — text 2.02:1 ❌ · icons 2.02:1 ❌ → 1 pin, 3 issues
2. Green chip 1 — text 3.46:1 ❌ · icon 2.85:1 ❌ → 1 pin, 2 issues
… every element, with its verdict …

### Pass/fail summary
| Check | WCAG | Result | Detail |
|---|---|---|---|
| Color contrast | 1.4.3 | ❌ FAIL / ✅ PASS / — N/A | worst value |
| Non-text contrast | 1.4.11 | … | … |
| Target size | 2.5.8 | … | … |
| Text resize/reflow | 1.4.4/1.4.10 | … | … |
| Use of color | 1.4.1 | … | … |
| Labels / names | 1.1.1/4.1.2 | … | … |
| Focus visible/order | 2.4.7/2.4.3 | … | … |

### Blockers (grouped by element)
- **Green chip 1** — [1.4.3] text 3.46:1 (needs 4.5); [1.4.11] icon 2.85:1 (needs 3).
  Fix: darken text and icon. → one pin in Accessibility Review

### Warnings / Advisory / Documentation (not counted) / Since last run
… as applicable …
```

## Contrast math — compute, never eyeball

```python
def _lin(c):
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
def _lum(r, g, b):
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)
def _hex(h):
    h = h.lstrip('#')
    if len(h) == 3: h = ''.join(ch * 2 for ch in h)
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def ratio(fg_hex, bg_hex):
    l1, l2 = _lum(*_hex(fg_hex)), _lum(*_hex(bg_hex))
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)
def verdict(fg, bg, font_px, bold=False):
    r = ratio(fg, bg)
    large = font_px >= 24 or (font_px >= 18.66 and bold)
    need = 3.0 if large else 4.5
    return f"{r:.2f}:1 need {need}:1 ({'PASS' if r >= need else 'FAIL'})"
```

**Thresholds:** normal text **4.5:1**; large text (≥24px, or ≥18.66px bold)
**3:1**; UI boundary / meaningful icon / focus ring / chart mark **3:1**;
disabled controls exempt. **Alpha/layering:** composite against the effective
background before computing; state the color source. **Text on image/gradient:**
do NOT invent a sampled number — require a solid scrim/plate and measure against
that; report as a Blocker until a solid backing is added.

## Full checkpoint table (WCAG 2.2 → Figma)

### 1. Perceivable
| WCAG | Lv | Type | Check → fix |
|---|---|---|---|
| 1.1.1 Non-text Content | A | Design + annotate | Informative image/icon/chart has intended alt; decorative marked `alt=""`; icon-only controls have a name. |
| 4.1.2 (icon rows) | A | Design + annotate | **Count icons before naming.** Enumerate every glyph; proposed names MUST equal that count. If decorative, say so per icon. |
| 1.3.1 Info & Relationships | A | Design + annotate | Real headings, lists, tables with header rows/cols; inputs labeled; groups have a legend. |
| 1.3.2 Meaningful Sequence | A | Design + annotate | Visual order matches reading order; annotate reorders. |
| 1.4.1 Use of Color | A | **Design** | No meaning by color alone — add icon/underline/text/shape. |
| 1.4.3 Contrast (Minimum) | AA | **Design** | Text ≥4.5:1; large text ≥3:1. Disabled exempt. |
| 1.4.4 Resize Text | AA | **Design** | Survives 200% zoom; auto-layout + relative sizing. |
| 1.4.5 Images of Text | AA | **Design** | Critical text is live text, not an image. |
| 1.4.10 Reflow | AA | **Design** | Reflows to 320px, no horizontal scroll/clipping. |
| 1.4.11 Non-text Contrast | AA | **Design** | Component borders, meaningful icons, focus rings ≥3:1. |
| 1.4.12 Text Spacing | AA | **Design** | Survives line-height ≥1.5× without clipping. |
| 1.4.13 Content on Hover/Focus | AA | Design + annotate | Tooltips dismissible, hoverable, persistent. |

### 2. Operable
| WCAG | Lv | Type | Check → fix |
|---|---|---|---|
| 2.1.1/2.1.2 Keyboard / No Trap | A | Runtime only | Real interactive components; annotate custom widgets. |
| 2.2.1/2.2.2 Timing / Pause-Stop | A | **Design** | Carousels/animations have pause/stop; no marquee/blink. |
| 2.3.1 Three Flashes | A | **Design** | Nothing flashes >3×/second. |
| 2.4.3 Focus Order | A | Design + annotate | Tab order = reading order; annotate visual ≠ logical. |
| 2.4.4 Link Purpose | A | **Design** | Link text describes destination. |
| 2.4.6 Headings & Labels | AA | **Design** | Descriptive; step by one level; no empty headings. |
| 2.4.7 Focus Visible | AA | **Design** | Every interactive component has a focus variant (ring ≥3:1). |
| 2.4.11 Focus Not Obscured | AA | **Design** | Sticky bars don't cover focused elements. |
| 2.5.3 Label in Name | A | **Design** | Visible text is contained in the accessible name. |
| 2.5.7 Dragging Movements | AA | **Design** | Drag UI has a non-drag alternative. |
| 2.5.8 Target Size | AA | **Design** | Targets ≥24×24px (or ≥24px spacing); inline links exempt; 44×44 comfortable. |

### 3. Understandable
| WCAG | Lv | Type | Check → fix |
|---|---|---|---|
| 3.2.1/3.2.2 On Focus/Input | A | Runtime only | Focus/input shouldn't auto-navigate/submit. |
| 3.3.1/3.3.3 Error ID & Suggestion | A/AA | **Design** | Errors in text + icon with a suggested fix, not color alone. |
| 3.3.2 Labels or Instructions | A | **Design** | Persistent labels, never placeholder-only. |
| 3.3.4 Error Prevention | AA | **Design** | High-stakes actions reversible/confirmable. |
| 3.3.7 Redundant Entry | A | **Design** | Don't re-ask info already given. |
| 3.3.8 Accessible Authentication | AA | **Design** | Allow password-manager paste; offer non-cognitive auth. |

### 4. Robust
| WCAG | Lv | Type | Check → fix |
|---|---|---|---|
| 4.1.2 Name, Role, Value | A | Design + annotate | Custom components annotated with role + name + states. |
| 4.1.3 Status Messages | AA | Design + annotate | Toasts/inline validation announced without moving focus. |

## What this skill does NOT guarantee

Runtime-only criteria (2.1.1/2.1.2, 2.4.3 behavior, 4.1.2/4.1.3 wiring,
3.1.1/3.1.2 language, 3.2.1/3.2.2) can't be verified from a static frame. They
land as standing entries in `Accessibility`, flagged for a live pass.

## Execution notes

- Batch reads (screenshot + variable defs + metadata) before any writes.
- Prefer native annotations (Method A); use drawn markers (Method B) only if
  native annotations aren't available. Never skip on-canvas annotation.
- **One consolidated pin per failing element** (all its issues in that one pin) —
  NOT one per criterion — plus one `[SUMMARY]` badge on the frame.
- Always save the report to a Markdown file AND print it in chat.
- Do NOT end by asking "want me to annotate?" — annotation is part of the run.
