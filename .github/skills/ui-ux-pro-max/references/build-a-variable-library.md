---
name: build-a-variable-library
description: "Reference guide for Design System Variable Library"
encoding: "UTF-8"
---

# Design System Variable Library

*By UI Collective — generates the three-tier token architecture used in UI Collective's design systems.*

Generate a three-tier variable library in Figma from user-provided brand colors:

```
brand (raw)  →  alias (semantic ramps)  →  mapped (component tokens, Light/Dark)
```

- **brand** — raw 13-step color scales generated from each hex code, plus bundled
  neutrals, a numeric sizing scale, and font-family strings. Single mode.
- **alias** — role-based ramps (`primary/*`, `error/*`, `success/*`, `warning/*`,
  `information/*`, `secondary/*`, `neutral light/*`, `neutral dark/*`) that alias the
  brand ramps, plus border-width and border-radius tokens. Single mode.
- **mapped** — 150+ component-facing tokens (`surface/*`, `text/*`, `icon/*`,
  `border/*`) with **Light** and **Dark** modes, each mode aliasing into the alias
  collection.

Designers bind only `mapped` tokens to their designs; swapping the theme or rebranding
means touching only the layers underneath.

## Prerequisites

This skill executes Figma Plugin API JavaScript (via `use_figma` or the equivalent
script-execution tool in your environment). If a `figma-use` skill or
`skill://figma/figma-use/SKILL.md` resource is available, load it first; if not, this
skill is self-contained — follow the **Plugin API essentials** section below. The user
needs edit access to the target file.

## Step 0 — Preflight: this skill needs a fresh file

Before collecting anything, list the file's existing variable collections:

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
return collections.map(c => ({ name: c.name, count: c.variableIds.length }));
```

**Stop and do not build if the file already has an in-depth variable library** — any
collection named `brand`, `alias`, or `mapped`, or any existing collection with more
than ~20 variables. Tell the user:

> This file already contains a variable library. To avoid conflicts or overwriting
> your existing tokens, please create a new (or empty) Figma file and run this skill
> there.

Never modify, rename, or delete existing collections or variables. An empty file, or
one with only a handful of scratch variables, is fine to proceed in.

## Step 1 — Collect inputs (hex codes must come from the user)

The hex codes come **from the user, in chat**. They will usually not exist anywhere in
the file — this skill is typically run against a brand-new file. Never harvest colors
from existing variables, styles, or canvas fills, and never invent defaults for the
required colors. If any required color is missing from the conversation, ask for it
and wait before building anything.

Required:

| Input | Required | Alias ramp it powers |
|---|---|---|
| Primary color | Yes | `primary/*` |
| Error color | Yes | `error/*` |
| Success color | Yes | `success/*` |
| Warning color | Yes | `warning/*` |
| Information color | Yes | `information/*` |
| Secondary color | No | `secondary/*` (falls back to the bundled slate neutral) |

Validate each value is a parseable 6-digit hex. If a provided color is extremely light (L > 85%) or
dark (L < 25%), warn the user that mid-anchored scales work best and confirm before
proceeding — the algorithm still runs, but the ramp will be compressed on one side.

## Step 2 — Generate the color scales

Follow **Appendix A — Color Scale Generation** below exactly. Summary: each hex becomes
a 13-step ramp (100, 150, 200, 300 … 1200). The user's hex is placed verbatim at step
**500**; hue is held constant while per-step lightness targets and saturation curves
(interpolated between two documented families) produce the tints and shades. Compute
all ramps up front — inside your reasoning or a scratch script — so every hex is final
before you touch Figma.

Name each brand ramp by its detected hue (e.g. `#df5b5b` → `red`, `#478aff` → `blue`)
using the hue table in Appendix A. On a name collision between two inputs, suffix
the second (`blue`, `blue-2`). Confirm the auto-detected names with the user if any
look ambiguous.

## Step 3 — Build the `brand` collection

**Appendix B — Collection Inventories** below has the full inventory. Create in this order,
working in chunks of roughly 40–60 variables per `use_figma` call (Rule: small
incremental steps; validate after each):

1. Collection `brand`, single mode (rename default mode to `Mode 1`).
2. `white & black/white` (#ffffff), `white & black/black` (#000000).
3. One generated 13-step ramp per user color, named by hue (`red/100` … `red/1200`).
4. Bundled neutrals: the `slate/*` and `grey/*` ramps (13 steps each) with the exact
   hex values in Appendix C — these power the neutral aliases and are theme-agnostic.
5. `scale/*` FLOAT tokens (0 → 1024) and `font style/*` STRING tokens per Appendix B.

Scopes: raw **color ramps get `scopes: []`** (hidden from pickers — designers should
never bind raw values); `scale/*` and `font style/*` keep default scopes.

## Step 4 — Build the `alias` collection

Single mode. Every color variable here is a `VARIABLE_ALIAS` into `brand`:

- `foundations/white`, `foundations/black` → `white & black/*`
- `primary/100…1200` → the primary ramp; same pattern for `error`, `success`,
  `warning`, `information` (13 steps each, including 150)
- `secondary/100…1200` → the secondary ramp if provided, else → `slate/*`
- `neutral light/100…1200` → `slate/*` and `neutral dark/100…1200` → `grey/*`
  (**12 steps — no 150** in the neutral ramps; preserve this)
- `border width/*` and `border radius/*` FLOAT tokens → `scale/*` per the reference

Scopes: color aliases `[]` (hidden); border width/radius keep defaults.

## Step 5 — Build the `mapped` collection

**Appendix C — Mapped Tokens** below lists all 152 tokens with their exact Light and
Dark aliases. Create the collection with two modes (`Light`, `Dark`), then create the
tokens in chunks by family (`surface/*`, then `text/*`, `icon/*`, `border/*`), binding
each mode's value as an alias into the `alias` collection.

Scopes: mapped tokens use `ALL_SCOPES` — these are the tokens designers bind.

Three token names in Appendix C carry legacy inconsistencies (flagged inline). Keep
them verbatim by default for fidelity; offer the user the normalized names as an option.

## Step 6 — Verify

Run a read-back `use_figma` script that:
1. Confirms collection/variable counts match the Appendix B/C inventories.
2. Spot-resolves ~10 mapped tokens in both modes down to final hex and prints them.
3. Reports any variable whose alias failed to bind (value still a raw color where an
   alias was expected).

Then summarize for the user: collections created, variable counts, the generated ramp
hexes, and a reminder that components should bind `mapped` tokens only. Offer the
optional documentation page (Step 7).

## Step 7 (optional) — Generate on-canvas token documentation

After verification, offer to generate a documentation page. If the user accepts, build
it with variable-bound swatches so the docs stay live — a token edit updates the
documentation automatically. Build one section per script (small atomic chunks):

1. **Page.** Create a page named `Token Documentation` and switch to it with
   `await figma.setCurrentPageAsync(page)`.
2. **Fonts first.** Load before any text:
   `await figma.loadFontAsync({ family: "Inter", style: "Regular" })` and
   `{ family: "Inter", style: "Semi Bold" }`.
3. **Brand ramps section.** One auto-layout row per generated ramp (plus slate and
   grey): a Semi Bold row label, then thirteen 64×64 swatches. Bind each swatch fill
   to its variable — never paste raw hex:

   ```js
   const rect = figma.createRectangle();
   rect.resize(64, 64); rect.cornerRadius = 8;
   const paint = figma.variables.setBoundVariableForPaint(
     { type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", variable
   );
   rect.fills = [paint]; // setBoundVariableForPaint returns a NEW paint — reassign
   ```

   Under each swatch add a caption with the step number and resolved hex.
4. **Mapped tokens section.** For each family (`surface`, `text`, `icon`, `border`)
   build a token table: one row per token with a bound swatch, the token name, and its
   Light/Dark alias targets as text.
5. **Light/Dark preview.** Wrap the mapped tables in a `Light` frame, clone it as
   `Dark`, and pin the clone to the Dark mode so both render side by side:

   ```js
   darkFrame.setExplicitVariableModeForCollection(mappedCollection, darkModeId);
   ```
6. **Layout.** Stack sections in a page-level auto-layout frame positioned away from
   (0,0). Screenshot or read back node counts to verify, then report the page to the
   user.

Keep all documentation on this dedicated page — never modify the user's other pages.

## Plugin API essentials (self-contained reference)

These rules prevent the most common failures when no external Figma-API skill is
loaded:

- Write plain JavaScript with top-level `await` and `return` — return values are how
  data comes back; `console.log` is not returned. `figma.notify()` is unavailable.
- Colors are **0–1 floats**, not 0–255: `#df5b5b` →
  `{ r: 0xdf/255, g: 0x5b/255, b: 0x5b/255 }`.
- Create a collection with `figma.variables.createVariableCollection('brand')`; rename
  its default mode via `collection.renameMode(collection.modes[0].modeId, 'Mode 1')`;
  add a mode with `collection.addMode('Dark')`.
- Create a variable with
  `figma.variables.createVariable('red/500', collection, 'COLOR')` (also `'FLOAT'`,
  `'STRING'`). Set values per mode:
  `variable.setValueForMode(modeId, { r, g, b })`.
- Bind an alias:
  `variable.setValueForMode(modeId, figma.variables.createVariableAlias(targetVariable))`.
  Build one `name → variable` map per source collection up front instead of searching
  per token.
- Set `variable.scopes` explicitly: `[]` hides a variable from pickers (raw + alias
  color layers); mapped tokens keep `['ALL_SCOPES']`.
- Scripts are **atomic** — an error means nothing was written. Fix the script and
  retry; never assume partial state from a failed call.
- Keep each script small (roughly 40–60 variable creations) and validate between
  chunks with a read-back.

## Failure handling

- `use_figma` scripts are atomic — on error, stop, read the message, fix, retry. Never
  blind-retry.
- If a chunk partially exists from a previous attempt, query existing variable names in
  the collection first and skip duplicates rather than erroring on re-creation.
- Alias binding requires the target variable object: fetch targets by name via a map of
  `name → id` built once per collection, not by repeated per-variable searches.

---

## Appendix A — Color Scale Generation

Each user-provided hex becomes a 13-step ramp: **100, 150, 200, 300, 400, 500, 600,
700, 800, 900, 1000, 1100, 1200**. Step **500 is the user's hex verbatim**. All other
steps are computed in HSL: hue is held constant; saturation and lightness follow the
profiles below.

### Two reference families

The target system's ramps fall into two families depending on the base color's
saturation. Interpolate between them linearly by the base saturation `S₀` (clamp the
interpolation factor `t = (S₀ − 67) / 33` to 0…1; at `S₀ ≤ 67` use family A, at
`S₀ = 100` use family B).

### Family A — moderate saturation (base S ≈ 67%, L ≈ 62%)

| Step | L target | S target |
|---|---|---|
| 100 | 97.0 | min(100, S₀ × 1.10) |
| 150 | 94.4 | min(100, S₀ × 0.95) |
| 200 | 92.2 | min(100, S₀ × 0.98) |
| 300 | 85.5 | min(100, S₀ × 0.99) |
| 400 | 76.6 | min(100, S₀ × 1.00) |
| 500 | — (user hex) | — (user hex) |
| 600 | 52.0 | S₀ × 0.83 |
| 700 | 39.6 | S₀ × 0.99 |
| 800 | 30.0 | S₀ × 1.04 |
| 900 | 21.6 | S₀ × 1.05 |
| 1000 | 14.9 | S₀ × 1.10 |
| 1100 | 9.6 | S₀ × 1.12 |
| 1200 | 5.7 | S₀ × 1.08 |

### Family B — vivid (base S = 100%, L ≈ 64%)

| Step | L target | S target |
|---|---|---|
| 100 | 97.5 | 100 |
| 150 | 95.2 | 100 |
| 200 | 93.3 | 100 |
| 300 | 86.1 | 100 |
| 400 | 78.0 | 100 |
| 500 | — (user hex) | — (user hex) |
| 600 | 54.3 | 78.5 |
| 700 | 44.3 | 77.0 |
| 800 | 35.5 | 79.0 |
| 900 | 26.5 | 80.7 |
| 1000 | 19.4 | 81.8 |
| 1100 | 13.1 | 82.1 |
| 1200 | 7.8 | 85.0 |

### Guards

- **Monotonic lightness.** After computing, ensure L strictly decreases from 100 →
  1200. If the user's base L (step 500) breaks the sequence (very light or very dark
  base), compress the adjacent computed steps: rescale the light half (100–400)
  between `base L + 2` and the 100-target, and/or the dark half (600–1200) between
  `base L − 2` and the 1200-target, preserving proportional spacing.
- **Clamp** all S and L to 0–100 before converting back to hex.
- **Grey inputs** (S₀ < 12): hold S constant across all steps instead of applying the
  S curves; only the L targets apply.

### Reference JavaScript

Use this inside your scale computation:

```js
function hexToHsl(hex) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = (n >> 16 & 255)/255, g = (n >> 8 & 255)/255, b = (n & 255)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b), l = (max+min)/2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    h = max === r ? ((g-b)/d + (g < b ? 6 : 0)) : max === g ? (b-r)/d + 2 : (r-g)/d + 4;
    h *= 60;
  }
  return { h, s: s*100, l: l*100 };
}

function hslToHex(h, s, l) {
  s = Math.min(100, Math.max(0, s))/100; l = Math.min(100, Math.max(0, l))/100;
  const a = s * Math.min(l, 1-l);
  const f = k => {
    k = (k + h/30) % 12;
    const c = l - a * Math.max(-1, Math.min(k-3, Math.min(9-k, 1)));
    return Math.round(c*255).toString(16).padStart(2,'0');
  };
  return '#' + f(0) + f(8) + f(4);
}

const FAMILY_A = { L:{100:97.0,150:94.4,200:92.2,300:85.5,400:76.6,600:52.0,700:39.6,800:30.0,900:21.6,1000:14.9,1100:9.6,1200:5.7},
                   SR:{100:1.10,150:0.95,200:0.98,300:0.99,400:1.00,600:0.83,700:0.99,800:1.04,900:1.05,1000:1.10,1100:1.12,1200:1.08} };
const FAMILY_B = { L:{100:97.5,150:95.2,200:93.3,300:86.1,400:78.0,600:54.3,700:44.3,800:35.5,900:26.5,1000:19.4,1100:13.1,1200:7.8},
                   S:{100:100,150:100,200:100,300:100,400:100,600:78.5,700:77.0,800:79.0,900:80.7,1000:81.8,1100:82.1,1200:85.0} };

function generateRamp(hex) {
  const { h, s: S0, l: L0 } = hexToHsl(hex);
  const t = Math.min(1, Math.max(0, (S0 - 67) / 33));
  const steps = [100,150,200,300,400,500,600,700,800,900,1000,1100,1200];
  const ramp = {};
  for (const step of steps) {
    if (step === 500) { ramp[500] = hex.toLowerCase(); continue; }
    const L = FAMILY_A.L[step] * (1-t) + FAMILY_B.L[step] * t;
    let S;
    if (S0 < 12) S = S0;                                    // grey guard
    else {
      const sA = Math.min(100, S0 * FAMILY_A.SR[step]);
      S = sA * (1-t) + FAMILY_B.S[step] * t;
    }
    ramp[step] = hslToHex(h, S, L);
  }
  // monotonic-lightness guard around the base
  // (compress 100–400 above base L, 600–1200 below, if violated — see Guards)
  return ramp;
}
```

### Hue naming table

Name the brand ramp from the base hue angle (after the grey check, S₀ < 12 → `grey-2`
to avoid colliding with the bundled `grey`):

| Hue range | Name | | Hue range | Name |
|---|---|---|---|---|
| 345–360, 0–14 | red | | 166–185 | teal |
| 15–38 | orange | | 186–205 | cyan |
| 39–55 | amber | | 206–230 | blue |
| 56–70 | yellow | | 231–260 | indigo |
| 71–95 | lime | | 261–285 | purple |
| 96–135 | green | | 286–320 | magenta |
| 136–165 | emerald | | 321–344 | rose |

Collisions between two user inputs: keep the first, suffix the second (`blue-2`).

---

## Appendix B — Collection Inventories (`brand` and `alias`)

### `brand` collection (1 mode: "Mode 1")

### Foundations

| Variable | Type | Value | Scopes |
|---|---|---|---|
| `white & black/white` | COLOR | #ffffff | [] |
| `white & black/black` | COLOR | #000000 | [] |

### Generated ramps (one per user input)

13 steps each — `<hue>/100 … <hue>/1200` (incl. 150) — values from
Appendix A. Scopes `[]`.

### Bundled neutral ramps (fixed values — always create both)

Scopes `[]`. These are theme-agnostic neutrals the alias layer depends on.

| Step | `slate` | `grey` |
|---|---|---|
| 100 | #fbfcfd | #f9f9f9 |
| 150 | #f6f8fa | #f5f5f5 |
| 200 | #f0f3f7 | #f2f2f2 |
| 300 | #e0e5eb | #e5e5e5 |
| 400 | #c8d0da | #d1d1d1 |
| 500 | #a4b1c0 | #b8b8b8 |
| 600 | #8695a7 | #999999 |
| 700 | #687384 | #7a7a7a |
| 800 | #4f5864 | #5e5e5e |
| 900 | #38404a | #454545 |
| 1000 | #252b33 | #2f2f2f |
| 1100 | #161a20 | #1a1a1a |
| 1200 | #0b0e12 | #0d0d0d |

### Sizing scale (FLOAT, default scopes)

| Variable | Value | | Variable | Value |
|---|---|---|---|---|
| `scale/0` | 0 | | `scale/900` | 36 |
| `scale/25` | 1 | | `scale/1000` | 40 |
| `scale/50` | 2 | | `scale/1100` | 48 |
| `scale/100` | 4 | | `scale/1200` | 56 |
| `scale/150` | 6 | | `scale/1300` | 64 |
| `scale/200` | 8 | | `scale/1400` | 72 |
| `scale/300` | 12 | | `scale/1500` | 96 |
| `scale/400` | 16 | | `scale/1600` | 128 |
| `scale/500` | 20 | | `scale/1700` | 256 |
| `scale/600` | 24 | | `scale/1800` | 512 |
| `scale/700` | 28 | | `scale/1900` | 1024 |
| `scale/800` | 32 | | | |

### Typography (STRING, default scopes)

| Variable | Default value |
|---|---|
| `font style/heading` | Inter |
| `font style/paragraph` | Inter |

Ask the user if they want different font families; otherwise default to Inter.

### `alias` collection (1 mode: "Mode 1")

Every entry below is a VARIABLE_ALIAS. Color aliases: scopes `[]`. Border tokens:
default scopes.

### Foundations

| Variable | → brand target |
|---|---|
| `foundations/white` | `white & black/white` |
| `foundations/black` | `white & black/black` |

### Role ramps — 13 steps each (100, 150, 200, 300 … 1200)

| Alias ramp | → brand ramp |
|---|---|
| `primary/*` | the primary-color ramp |
| `secondary/*` | the secondary-color ramp, or `slate/*` if no secondary was provided |
| `error/*` | the error-color ramp |
| `success/*` | the success-color ramp |
| `warning/*` | the warning-color ramp |
| `information/*` | the information-color ramp |

Each step maps 1:1 (`primary/300` → `<primary hue>/300`, etc.).

### Neutral ramps — 12 steps each (100, 200, 300 … 1200 — **no 150**)

| Alias ramp | → brand ramp |
|---|---|
| `neutral light/*` | `slate/*` |
| `neutral dark/*` | `grey/*` |

### Border width (FLOAT)

| Variable | → brand target |
|---|---|
| `border width/xs (1)` | `scale/25` |
| `border width/sm (2)` | `scale/50` |
| `border width/md (4)` | `scale/100` |

### Border radius (FLOAT)

| Variable | → brand target | | Variable | → brand target |
|---|---|---|---|---|
| `border radius/none` | `scale/0` | | `border radius/400` | `scale/400` |
| `border radius/50` | `scale/50` | | `border radius/500` | `scale/500` |
| `border radius/100` | `scale/100` | | `border radius/600` | `scale/600` |
| `border radius/150` | `scale/150` | | `border radius/700` | `scale/700` |
| `border radius/200` | `scale/200` | | `border radius/800` | `scale/800` |
| `border radius/300` | `scale/300` | | `border radius/round` | `scale/1900` |

### Expected counts (for verification)

- `brand`: 2 (white & black) + 13 × (5 or 6 user ramps) + 26 (slate + grey) + 22
  (scale) + 2 (font style). Five user colors → 117; six → 130.
- `alias`: 2 + 13 × 6 role-ramp steps (78) + 24 neutrals + 3 border width + 12 border
  radius = **119**.
- `mapped`: **152** (Appendix C).

---

## Appendix C — `mapped` Collection: 152 Tokens, Light / Dark

All values are VARIABLE_ALIASes into the `alias` collection. Scopes: `ALL_SCOPES`.
Create in family chunks (surface → text → icon → border). Column format:
**Token | Light → | Dark →**.

Three names flagged ⚠ carry legacy inconsistencies preserved for fidelity — offer the
user normalized alternatives (`surface/primary/default-subtle-hover-alt`,
`border/warning/default-subtle-hover`, `icon/warning/on-color-subtle-hover`).

### surface (30)

| Token | Light → | Dark → |
|---|---|---|
| surface/primary/default | primary/1000 | neutral light/100 |
| surface/primary/default-hover | primary/1100 | neutral light/300 |
| surface/primary/default-subtle | primary/150 | neutral light/900 |
| surface/primary/default-subtle-hover | primary/200 | neutral light/800 |
| surface/primary/default-subtle-hover-atl ⚠ | primary/200 | neutral light/900 |
| surface/secondary/default | foundations/white | neutral dark/1000 |
| surface/secondary/default-hover | primary/150 | neutral dark/1000 |
| surface/secondary/default-subtle | foundations/white | neutral dark/1000 |
| surface/secondary/default-subtle-hover | primary/150 | neutral dark/1000 |
| surface/disabled/default | neutral dark/100 | neutral dark/1100 |
| surface/default | foundations/white | neutral dark/1100 |
| surface/secondary | neutral light/100 | neutral dark/1100 |
| surface/page | foundations/white | neutral dark/1100 |
| surface/page-secondary | neutral light/100 | neutral dark/1100 |
| surface/error/default | error/600 | error/300 |
| surface/error/default-hover | error/700 | error/400 |
| surface/error/default-subtle | error/100 | error/900 |
| surface/error/default-subtle-hover | error/150 | error/1000 |
| surface/success/default | success/800 | success/400 |
| surface/success/default-hover | success/900 | success/500 |
| surface/success/default-subtle | success/100 | success/900 |
| surface/success/default-subtle-hover | success/150 | success/1000 |
| surface/information/default | information/800 | information/300 |
| surface/information/default-hover | information/900 | information/400 |
| surface/information/default-subtle | information/100 | information/900 |
| surface/information/default-subtle-hover | information/150 | information/1000 |
| surface/warning/default | warning/800 | warning/400 |
| surface/warning/default-hover | warning/900 | warning/500 |
| surface/warning/default-subtle | warning/100 | warning/900 |
| surface/warning/default-subtle-hover | warning/150 | warning/1000 |

### text (48)

| Token | Light → | Dark → |
|---|---|---|
| text/default/hero | neutral light/1100 | neutral light/200 |
| text/default/heading | neutral light/1100 | neutral light/200 |
| text/default/body | neutral light/1000 | neutral light/100 |
| text/default/caption | neutral light/800 | neutral light/300 |
| text/default/placeholder | neutral light/700 | neutral light/300 |
| text/on-color/hero | neutral light/100 | neutral light/1100 |
| text/on-color/heading | neutral light/100 | neutral light/1100 |
| text/on-color/body | neutral light/100 | neutral light/1000 |
| text/on-color/caption | neutral light/200 | neutral light/800 |
| text/on-color/placeholder | neutral light/300 | neutral light/700 |
| text/primary/default | primary/900 | primary/200 |
| text/primary/default-hover | primary/1000 | primary/300 |
| text/primary/on-color | primary/100 | primary/1000 |
| text/primary/on-color-hover | primary/200 | primary/1000 |
| text/primary/on-color-subtle | primary/900 | primary/200 |
| text/primary/on-color-subtle-hover | primary/1000 | primary/300 |
| text/secondary/default | secondary/900 | secondary/300 |
| text/secondary/default-hover | secondary/1000 | secondary/400 |
| text/secondary/on-color | secondary/900 | secondary/300 |
| text/secondary/on-color-hover | secondary/1000 | secondary/400 |
| text/secondary/on-color-subtle | secondary/900 | secondary/300 |
| text/secondary/on-color-subtle-hover | secondary/1000 | secondary/400 |
| text/disabled/default | neutral light/600 | neutral light/300 |
| text/disabled/on-color | neutral light/600 | neutral light/300 |
| text/error/default | error/700 | error/300 |
| text/error/default-hover | error/800 | error/400 |
| text/error/on-color | neutral light/100 | neutral light/900 |
| text/error/on-color-hover | neutral light/200 | neutral light/1100 |
| text/error/on-color-subtle | error/700 | error/300 |
| text/error/on-color-subtle-hover | error/800 | error/400 |
| text/success/default | success/800 | success/300 |
| text/success/default-hover | success/900 | success/400 |
| text/success/on-color | neutral light/100 | neutral light/900 |
| text/success/on-color-hover | neutral light/200 | neutral light/1100 |
| text/success/on-color-subtle | success/800 | success/300 |
| text/success/on-color-subtle-hover | success/900 | success/400 |
| text/information/default | information/800 | information/300 |
| text/information/default-hover | information/900 | information/400 |
| text/information/on-color | neutral light/100 | neutral light/900 |
| text/information/on-color-hover | neutral light/200 | neutral light/1100 |
| text/information/on-color-subtle | information/800 | information/300 |
| text/information/on-color-subtle-hover | information/900 | information/400 |
| text/warning/default | warning/800 | warning/300 |
| text/warning/default-hover | warning/900 | warning/400 |
| text/warning/on-color | neutral light/100 | neutral light/900 |
| text/warning/on-color-hover | neutral light/200 | neutral light/1100 |
| text/warning/on-color-subtle | warning/800 | warning/300 |
| text/warning/on-color-subtle-hover | warning/900 | warning/400 |

### icon (40)

| Token | Light → | Dark → |
|---|---|---|
| icon/primary/default | primary/900 | primary/400 |
| icon/primary/default-hover | primary/1000 | primary/500 |
| icon/primary/default-subtle | primary/500 | primary/400 |
| icon/primary/default-subtle-hover | primary/600 | primary/500 |
| icon/primary/on-color | primary/100 | primary/900 |
| icon/primary/on-color-hover | primary/200 | primary/1000 |
| icon/primary/on-color-subtle | primary/900 | primary/200 |
| icon/primary/on-color-subtle-hover | primary/1000 | primary/300 |
| icon/secondary/default | secondary/900 | secondary/300 |
| icon/secondary/default-hover | secondary/1000 | secondary/400 |
| icon/secondary/on-color | secondary/900 | secondary/300 |
| icon/secondary/on-color-hover | secondary/1000 | secondary/400 |
| icon/secondary/on-color-subtle | secondary/900 | secondary/300 |
| icon/secondary/on-color-subtle-hover | secondary/1000 | secondary/400 |
| icon/disabled/default | neutral light/600 | neutral light/300 |
| icon/disabled/on-color | neutral light/600 | neutral light/300 |
| icon/error/default | error/700 | error/300 |
| icon/error/default-hover | error/800 | error/400 |
| icon/error/on-color | neutral light/100 | neutral light/1000 |
| icon/error/on-color-hover | neutral light/200 | neutral light/800 |
| icon/error/on-color-subtle | error/700 | error/300 |
| icon/error/on-color-subtle-hover | error/800 | error/400 |
| icon/success/default | success/800 | success/400 |
| icon/success/default-hover | success/900 | success/500 |
| icon/success/on-color | neutral light/100 | neutral light/900 |
| icon/success/on-color-hover | neutral light/200 | neutral light/800 |
| icon/success/on-color-subtle | success/800 | success/400 |
| icon/success/on-color-subtle-hover | success/900 | success/300 |
| icon/information/default | information/800 | information/400 |
| icon/information/default-hover | information/900 | information/500 |
| icon/information/on-color | neutral light/100 | neutral light/900 |
| icon/information/on-color-hover | neutral light/200 | neutral light/1000 |
| icon/information/on-color-subtle | information/800 | information/400 |
| icon/information/on-color-subtle-hover | information/900 | information/500 |
| icon/warning/default | warning/800 | warning/400 |
| icon/warning/default-hover | warning/900 | warning/500 |
| icon/warning/on-color | neutral light/100 | neutral light/900 |
| icon/warning/on-color-hover | neutral light/200 | neutral light/1000 |
| icon/warning/on-color-subtle | warning/800 | warning/400 |
| icon/warning/on-default-subtle-hover ⚠ | warning/900 | warning/500 |

### border (34)

| Token | Light → | Dark → |
|---|---|---|
| border/default | neutral light/400 | neutral light/800 |
| border/on-color | foundations/white | neutral light/800 |
| border/disabled/default | neutral light/200 | neutral light/1000 |
| border/disabled/on-color | neutral light/900 | neutral light/200 |
| border/primary/default | primary/900 | primary/300 |
| border/primary/default-hover | primary/1100 | primary/400 |
| border/primary/default-subtle | primary/300 | primary/700 |
| border/primary/default-subtle-hover | primary/500 | primary/800 |
| border/primary/focus | primary/900 | primary/300 |
| border/secondary/default | secondary/400 | secondary/800 |
| border/secondary/default-hover | secondary/500 | secondary/700 |
| border/secondary/default-subtle | secondary/400 | secondary/800 |
| border/secondary/default-subtle-hover | secondary/500 | secondary/700 |
| border/secondary/focus | secondary/400 | secondary/800 |
| border/error/default | error/600 | error/300 |
| border/error/default-hover | error/700 | error/400 |
| border/error/default-subtle | error/150 | error/800 |
| border/error/default-subtle-hover | error/300 | error/900 |
| border/error/focus | error/600 | error/300 |
| border/success/default | success/800 | success/400 |
| border/success/default-hover | success/900 | success/500 |
| border/success/default-subtle | success/150 | success/900 |
| border/success/default-subtle-hover | success/300 | success/1000 |
| border/success/focus | success/800 | success/400 |
| border/information/default | information/800 | information/400 |
| border/information/default-hover | information/900 | information/500 |
| border/information/default-subtle | information/150 | information/900 |
| border/information/default-subtle-hover | information/300 | information/1000 |
| border/information/focus | information/800 | information/400 |
| border/warning/default | warning/800 | warning/400 |
| border/warning/default-hover | warning/900 | warning/500 |
| border/warning/default-subtle | warning/150 | warning/900 |
| border/warning/action-subtle-hover ⚠ | warning/300 | warning/1000 |
| border/warning/focus | warning/800 | warning/400 |
