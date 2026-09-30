---
name: wcag-palette
description: "Reference guide for Accessible palette from one or more colors (WCAG)"
encoding: "UTF-8"
---

# Accessible palette from one or more colors (WCAG)

Goal: from one or more base colors, build an 11-step scale for each, semantic tokens for light and dark themes, and a visual layout in Figma. Every "passes" claim must be backed by a calculation on the final HEX values actually written to the file. A result with an unverified or failing pair is not finished.

Language: all layout text (headings, labels, legend, warnings, notes) and the report use the language of the user's request. Token names, HEX values, and level codes (AAA, AA, UI) are never translated.

Work in phases: 1 → version, 2 → scales, 3 → variables, 4 → layout, 5 → self-check, 6 → report. Finish and verify each phase before starting the next.

## Known failures from earlier runs — never repeat them

- Several colors given, but only the first one was built. Build every color (Step 0).
- Layout text and fills tinted with the palette color. Documentation chrome uses only the fixed neutral colors from 5.3.
- Text clipped by fixed-width frames (for example, "brand/base" instead of the full line). Follow 5.4.
- A single-line warning pushed the frame wider than 1440. Paragraphs must wrap.
- Matrix labels overflowing into neighboring cells. Use the cell format from 5.5.
- Border contrast in Dark calculated against #000 instead of the real surface. Use the real surface tokens.
- Borders and focus rings labeled "AA". Non-text elements get UI labels only.
- Duplicate primitives such as `base/white-2`. Reuse existing ones.
- Swatch badges without a text color ("AAA" alone).
- Tables built as columns instead of rows: rows can misalign when text wraps. Build tables row by row.
- Abbreviated names in the "Checked against" column ("surface", "accent states"). Always use full token names.

## Step 0. Input

### 0.1. Collecting colors

Accepted formats: HEX (3, 6, or 8 digits), RGB, HSL, OKLCH, CSS color names.

Sources, in priority order:
1. **Colors in the message.** Keep the order in which they were written.
2. **Selected layers.**
   - From each layer, take the topmost visible solid fill.
   - Skip gradients, images, and layers without a solid fill, and list the skipped layers in the report.
   - Order: left to right, then top to bottom on the canvas.
   - If a layer has several visible solid fills, use the topmost and mention it.

Then:
- Merge identical HEX values into one color.
- Maximum 6 colors per run. If there are more, ask which 6 to build (or whether to split into several runs) and stop.
- No colors at all: ask once and stop.
- A value can't be parsed: ask once about that value; build the rest only after the answer.

Per color:
- alpha < 1: composite over white, use the result, and warn;
- outside sRGB (for example, Display P3): reduce chroma to fit sRGB, and warn.

### 0.2. Names and roles

**Roles.** If the user assigned roles ("primary #3684DD, error #E11D48", "brand", "success"), use the role as the color's name: it becomes the scale name, the token group name, and the section title. Use lowercase with hyphens.

Reserved names that can't be used as a role: `bg`, `text`, `border`, `focus`, `base`, `brand`, `core`. If the user gives one of them, append `-color` (`text-color`) and mention it in the report.

**Hue names.** Colors without a role are named by OKLCH hue H:

| Name | H range |
|---|---|
| `red` | 10–40 |
| `orange` | 40–70 |
| `yellow` | 70–115 |
| `lime` | 115–140 |
| `green` | 140–170 |
| `teal` | 170–200 |
| `cyan` | 200–230 |
| `blue` | 230–268 |
| `indigo` | 268–285 |
| `purple` | 285–330 |
| `pink` | 330–360 and 0–10 |
| `neutral` | any hue, chroma < 0.02 |

If two inputs get the same name, the second becomes `{name}-2`, the third `{name}-3`, in input order.

### 0.3. Scale roles in the system

- **Accent scale (A):**
  - the color with the role `primary`, `brand`, or `accent`;
  - otherwise, the first non-neutral color;
  - if all colors are neutral, the first color.
- **Surface scale (S):** the first `neutral` color if there is one; otherwise S = A.
- **Extra scales (X):** every other color. Each gets its own token group (5.2).
- A neutral color that became S doesn't get an extra group, unless the user explicitly assigned it a role.

### 0.4. Defaults

- target level: AA. If the user asks for AAA, apply the overrides from 5.2;
- themes: Light and Dark.

If a WCAG palette frame from a previous run with the same colors exists in the file, ask whether to update it or create a new one.

Don't ask other questions. Make reasonable decisions and list them in the report.

## Step 1. WCAG version check (every run)

1. If you have web access or a suitable connector, open:
   - https://www.w3.org/WAI/standards-guidelines/wcag/
   - https://www.w3.org/TR/WCAG/ (always points to the latest published Recommendation)
   - https://www.w3.org/TR/wcag-3.0/
2. Find the newest version with **W3C Recommendation** status and the date of its edition.
3. Apply only a W3C Recommendation. Never apply Working Drafts or Candidate Recommendations as rules: they change between editions (for example, the contrast method in WCAG 3), and conformance to a draft cannot be claimed. A new draft may be mentioned as an FYI.
4. Compare with the baseline below (WCAG 2.2, edition of 12.12.2024).
   - Same version: use Step 2 as is.
   - Newer Recommendation: read its color, contrast, and focus-indicator contrast criteria, replace Step 2 with them, use its contrast formula, and list the differences in the report.
5. If there is no network access or the pages don't load, never claim the check was done. Use the baseline and show this message in the user's language: "Version check was not performed in this run: no network access. WCAG 2.2 (ed. 12.12.2024) was used. The baseline was last verified against w3.org on 15.09.2026: at that time it was the current Recommendation and WCAG 3.0 was still a draft. Check current status at w3.org/TR/WCAG/."
6. If today is more than 6 months after 15.09.2026, add: "The skill baseline is outdated, update the skill."

Output: `Standard: WCAG X.Y (W3C Recommendation, ed. DD.MM.YYYY) · checked now: yes/no · baseline verified: 15.09.2026`.

## Step 2. Baseline rules (WCAG 2.2)

| Criterion | Level | Requirement |
|---|---|---|
| 1.4.3 Contrast (Minimum) | AA | Text ≥ 4.5:1; large text ≥ 3:1 |
| 1.4.6 Contrast (Enhanced) | AAA | Text ≥ 7:1; large text ≥ 4.5:1 |
| 1.4.11 Non-text Contrast | AA | UI component boundaries, states, and meaningful graphics ≥ 3:1 against adjacent colors |
| 1.4.1 Use of Color | A | Color is never the only way to convey meaning |
| 2.4.13 Focus Appearance | AAA | Focus indicator ≥ 3:1 between focused and unfocused pixels |

Large text: ≥ 24 px regular or ≥ 18.66 px bold. In Figma, 1 px = 1 CSS px.

Exempt from contrast requirements: disabled components, pure decoration, logos. Create disabled and decorative tokens anyway, and mark them `exception`.

Contrast formula (WCAG 2.x):
- channel / 255, then `c ≤ 0.04045 ? c/12.92 : ((c+0.055)/1.055)^2.4`;
- `L = 0.2126·R + 0.7152·G + 0.0722·B`;
- ratio `(L_lighter + 0.05) / (L_darker + 0.05)`.

Rounding: never round up. 4.499 fails 4.5. Display values truncated to two decimals. Composite semi-transparent colors over their background before calculating.

Level labels:
- text pairs: `AAA` (≥ 7), `AA` (≥ 4.5), `AA large` (≥ 3), `fail` (< 3);
- non-text (borders, focus rings, icons, graphics): `UI ✓` (≥ 3) or `UI fail`. Never label them AA or AAA;
- exempt tokens: `exception`.

## Step 3. Scale generation (repeat for every color)

Each step is defined by a minimum contrast against white. The contrast between two steps is roughly the ratio of their targets. This holds within one scale and between different scales, so the pairs in Step 4 hold for any combination of colors.

| Step | Min contrast vs white | Chroma factor |
|---|---|---|
| 50 | 1.06 | 0.25 |
| 100 | 1.18 | 0.40 |
| 200 | 1.42 | 0.60 |
| 300 | 1.85 | 0.80 |
| 400 | 2.55 | 0.95 |
| 500 | 3.30 | 1.00 |
| 600 | 4.80 | 1.00 |
| 700 | 7.50 | 0.90 |
| 800 | 10.50 | 0.75 |
| 900 | 14.00 | 0.60 |
| 950 | 17.50 | 0.45 |

For each step:
1. Convert the base color to OKLCH and keep hue H.
2. Chroma = base chroma × factor. If base chroma < 0.02, chroma = 0.
3. Binary-search lightness L for the lowest contrast against #FFFFFF that is still ≥ the target.
4. If the color is out of sRGB, reduce chroma and keep L and H.
5. Round to HEX, re-check, and lower L slightly if rounding pushed the contrast below the target.

Each base color:
- is stored as its own token and never replaces a step;
- nearest step = the step whose target is closest to the base's contrast against white in ratio terms (smallest |ln(base / target)|);
- if the user wants a base placed in its scale, put it on the nearest step, recalculate that matrix, and list every pair that stopped passing.

Warm hues (yellow, lime, orange) look olive or brown at 500–700. This is a consequence of contrast, not a bug; mention it in the report.

Reference implementation (use it if you can run code; otherwise follow the same math manually):

```js
const T={50:1.06,100:1.18,200:1.42,300:1.85,400:2.55,500:3.3,600:4.8,700:7.5,800:10.5,900:14,950:17.5};
const K={50:.25,100:.4,200:.6,300:.8,400:.95,500:1,600:1,700:.9,800:.75,900:.6,950:.45};
const lin=c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4, gam=c=>c<=0.0031308?12.92*c:1.055*c**(1/2.4)-0.055;
const lum=([r,g,b])=>0.2126*lin(r/255)+0.7152*lin(g/255)+0.0722*lin(b/255);
const cr=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
function okToLin(L,C,H){const h=H*Math.PI/180,a=C*Math.cos(h),b=C*Math.sin(h);
 const l=(L+.3963377774*a+.2158037573*b)**3,m=(L-.1055613458*a-.0638541728*b)**3,s=(L-.0894841775*a-1.291485548*b)**3;
 return[4.0767416621*l-3.3077115913*m+.2309699292*s,-1.2684380046*l+2.6097574011*m-.3413193965*s,-.0041960863*l-.7034186147*m+1.707614701*s]}
function rgbToOk(rgb){const[r,g,b]=rgb.map(v=>lin(v/255));
 const l=Math.cbrt(.4122214708*r+.5363031299*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
 const A=1.9779984951*l-2.428592205*m+.4505937099*s,B=.0259040371*l+.7827717662*m-.808675766*s;
 return[.2104542553*l+.793617785*m-.0040720468*s,Math.hypot(A,B),(Math.atan2(B,A)*180/Math.PI+360)%360]}
const inG=v=>v.every(x=>x>=-1e-4&&x<=1+1e-4);
function toRgb(L,C,H){let c=C;while(c>0&&!inG(okToLin(L,c,H)))c-=.002;
 return okToLin(L,Math.max(c,0),H).map(v=>Math.round(Math.min(1,Math.max(0,gam(Math.min(1,Math.max(0,v)))))*255))}
function step(base,s){let[,C,H]=rgbToOk(base);C=C<.02?0:C*K[s];const W=[255,255,255];let lo=0,hi=1;
 for(let i=0;i<40;i++){const m=(lo+hi)/2;cr(toRgb(m,C,H),W)>=T[s]?lo=m:hi=m}
 let L=lo,rgb=toRgb(L,C,H);while(cr(rgb,W)<T[s]){L-=.0005;rgb=toRgb(L,C,H)}return rgb}
```

Reference results:
- `#3B82F6` (H 259.8 → blue) → `#F5F8FF` `#E2EDFE` `#C3DAFE` `#99C0FF` `#6BA2FE` `#448AFE` `#266DE0` `#0F4FB2` `#073B89` `#032864` `#011740`;
- `#3684DD` (H 254.1 → blue) → `#F4F8FE` `#E1EDFE` `#BFDBFE` `#90C2FF` `#5CA5FB` `#428FE9` `#2273CA` `#0754A0` `#023F7B` `#002B59` `#001939`.

If your values differ noticeably, the math is wrong. Fix it before continuing.

## Step 4. Pairs guaranteed by the scales

Verified on 432 test colors within one scale, and on 26,244 combinations of two different scales. In the table, "fg" and "bg" can come from the same scale or from different scales.

| Use | fg on bg | Min |
|---|---|---|
| White text on solid fill | #FFF on 600 | 4.5 |
| White text on hover fill | #FFF on 700 | 7 |
| White text on pressed fill | #FFF on 800 | 7 |
| Colored text on subtle bg | 600 on 50 | 4.5 |
| Colored text, AAA | 700 on 50 | 7 |
| Text on tinted bg | 700 on 100 and 200 | 4.5 |
| Text on saturated bg | 800 on 200 · 900 on 300 | 7 |
| Primary text | 950 on #FFF and 50 | 7 |
| Secondary text | 700 on #FFF | 7 |
| Border, icon | 500 on #FFF and 50 · 600 on 100 | 3 |
| Dark: primary text | 50 on 950 and 900 | 7 |
| Dark: secondary text | 300 on 950 and 900 | 7 |
| Dark: colored text | 400 on 950 and 900 | 4.5 |
| Dark: text on solid fill | 950 on 400, 300, 200 | 4.5 |
| Dark: border, icon | 500 on 950 and 900 | 3 |

For any other pair, use only calculated values.

## Step 5. Building in Figma

### 5.1. Name conflicts

- Check existing collections and variables first.
- If `base/white` (#FFFFFF) or `base/black` (#000000) already exists with that exact value, reuse it. Never create duplicates.
- If a scale name is already taken in the file, ask whether to overwrite or create new. For new, suffix only the conflicting names (`blue-2/…`, `brand/blue-2`).
- Never delete variables, styles, or frames you didn't create in this run.

### 5.2. Variables

**Collection `Color / Primitives`**, for every color:
- `{name}/50` … `{name}/950`;
- `brand/{name}` (the base color);
- `base/white` and `base/black`, if missing.

**Collection `Color / Semantic`** with modes `Light` and `Dark`. Every value is an alias to a primitive. `S/NNN` = a step of the surface scale, `A/NNN` = a step of the accent scale (0.3).

Core tokens:

| Token | Light | Dark | Checked against |
|---|---|---|---|
| `bg/surface` | base/white | S/950 | — |
| `bg/field` | base/white | S/900 | — |
| `bg/muted` | S/50 | S/900 | text/primary |
| `border/subtle` | S/200 | S/800 | exception (decorative) |
| `text/primary` | S/950 | S/50 | bg/surface, bg/field, bg/muted |
| `text/secondary` | S/700 | S/300 | bg/surface, bg/field |
| `bg/accent` | A/600 | A/400 | text/on-accent |
| `bg/accent-hover` | A/700 | A/300 | text/on-accent |
| `bg/accent-pressed` | A/800 | A/200 | text/on-accent |
| `text/on-accent` | base/white | A/950 | bg/accent, bg/accent-hover, bg/accent-pressed |
| `bg/accent-subtle` | A/50 | A/900 | text/accent |
| `text/accent` | A/600 | A/400 | bg/surface, bg/accent-subtle |
| `border/interactive` | A/500 | A/500 | bg/surface, bg/field (UI) |
| `focus/ring` | A/600 | A/400 | bg/surface (UI) |
| `bg/disabled` | S/100 | S/900 | text/disabled (exception) |
| `text/disabled` | S/400 | S/600 | bg/disabled (exception) |

Group tokens, for every extra scale X, with group name `{x}` = the color's name:

| Token | Light | Dark | Checked against |
|---|---|---|---|
| `{x}/bg` | X/600 | X/400 | `{x}/on-bg` |
| `{x}/bg-hover` | X/700 | X/300 | `{x}/on-bg` |
| `{x}/on-bg` | base/white | X/950 | `{x}/bg`, `{x}/bg-hover` |
| `{x}/bg-subtle` | X/50 | X/900 | `{x}/text` |
| `{x}/text` | X/600 | X/400 | bg/surface, `{x}/bg-subtle` |
| `{x}/border` | X/500 | X/500 | bg/surface, bg/field (UI) |

AAA target overrides:

| Token | Light | Dark |
|---|---|---|
| `bg/accent`, `{x}/bg` | 700 | 300 |
| `bg/accent-hover`, `{x}/bg-hover` | 800 | 200 |
| `bg/accent-pressed` | 900 | 100 |
| `text/accent`, `{x}/text` | 700 | 300 |

Each token's contrast is calculated against the real token colors from "Checked against", in the same mode. With several, use the lowest value and record which token produced it. Never substitute #FFF or #000 for a real surface.

### 5.3. Colors in the layout

The layout has two kinds of color. Never mix them.

**Documentation chrome: fixed neutral colors.** These colors are set directly as HEX. They are not bound to variables, and they never come from the palette, the semantic tokens, or any generated scale (including a generated neutral):

| Element | Color |
|---|---|
| Page background | `#FFFFFF` |
| Titles, body text, table text, warnings (with ⚠) | `#191919` |
| Captions, legends, roles, secondary cell lines, state notes | `#545454` |
| Table header rows, group rows, matrix header cells | `#F8F8F8` |
| Dividers, row separators, swatch outlines, dot outlines (decorative, no contrast requirement) | `#D8D8D8` |

Contrast of the chrome: `#191919` on `#FFFFFF` 17.5 and on `#F8F8F8` 16.5; `#545454` on `#FFFFFF` 7.5 and on `#F8F8F8` 7.1. All pass AAA.

**Palette content: bound to variables.**

| Element | Variable |
|---|---|
| Base color swatches and overview swatches | `brand/{name}` |
| Scale swatches and color dots | primitives `{name}/NNN` |
| Text inside scale swatches | `base/white` or `base/black` |
| `#FFF` / `#000` dots in matrices | `base/white` / `base/black` |

No text anywhere in the frame uses a palette color, except the text inside scale swatches. That text is always pure white or pure black.

### 5.4. Layout build rules

**Fonts and sizes**
- Font: the file's main text font if one exists; otherwise Inter. Load fonts before creating or editing any text.
- Font sizes: page title 32, color section titles 24, block titles 20, body 14, tables and captions 12–13. Nothing below 12 px.

**Frames and sizing**
- Root frame: width fixed at 1440, height hug, vertical auto layout, padding 48, gap 48, fill `#FFFFFF`. This leaves 1344 px of content width.
- Every section: width "Fill container". Nothing may be wider than the root.
- A parent is either Hug, or Fixed/Fill and wide enough for its children. A child is never wider or taller than its parent.
- Siblings in auto layout never overlap. Use auto layout gaps; never position siblings absolutely, and never use negative gaps.
- `clipsContent = false` on all content frames. Never hide text by clipping.

**Text**
- short labels (step names, HEX, values): auto width;
- sentences and paragraphs: width "Fill container", auto height, wrapping.

**Tables**
- Matrices and the semantic tokens table are built row by row.
- Each row is a horizontal auto layout with counter-axis alignment Center; the row height follows the tallest cell.
- Each cell has a fixed column width, a minimum height, and its content centered vertically.
- Never build a table as independent columns.

### 5.5. Layout content

All text colors, header fills, and dividers below follow the chrome table in 5.3. "Primary text" = `#191919`, "secondary text" = `#545454`, "header fill" = `#F8F8F8`, "divider" = `#D8D8D8`.

**Frame name:**
- one color: `{Name} · WCAG palette`;
- 2–3 colors: `{Name1} + {Name2} + {Name3} · WCAG palette`;
- 4–6 colors: `{N} colors · WCAG palette`.

Sections in order:

**1. Header.** In primary text:
- frame name as the title;
- generation date (secondary text);
- the standard line;
- the ⚠ warning paragraph, if the version check wasn't done.

**2. Overview** (only when there are 2 or more colors). One row of cards, one per color, each 200 px wide, wrapping. Each card has:
- a 200×64 swatch bound to `brand/{name}`, with a 1 px divider-colored outline;
- name in primary text;
- HEX and system role in secondary text (`accent`, `surface`, or `group {x}`).

Under the row, one sentence in secondary text: "Surfaces and text tokens use the {S} scale; the interactive accent uses the {A} scale."

**3. Color sections.** One section per color, in input order, separated by a 1 px divider. Each section contains:
- **Title:** `{Name}` in primary text, then its role in secondary text.
- **Base color:** a horizontal row with:
  - a 160×96 swatch bound to `brand/{name}`, with a 1 px divider outline;
  - a text column (fill width, wrapping) with four lines:
    - token name and HEX (primary text);
    - `White x.xx:1 · Black x.xx:1` (secondary text);
    - `Nearest step: {name}/NNN` (secondary text);
    - a one-sentence verdict (primary text), for example: "White text on this color: 3.81:1 — large text and UI only. For white text on fills, use blue/600."
- **Scale:** one row of 11 swatches, each 114 px wide, gap 8, padding 12, radius 12, hug height. Each swatch has:
  - step name (16 px, bold);
  - HEX;
  - `White x.xx`;
  - `Black x.xx`;
  - two-line badge: `Black text` or `White text`, then the level (`AAA`, `AA`, or `AA large`).

  Swatch text uses whichever of `base/white` / `base/black` gives the higher contrast. Swatches 50 and 100 always get a 1 px inside outline in the divider color; no other swatch gets an outline.
- **Contrast matrix:** 14 columns (1 header + 13), each 88 px wide, gap 2; total width 1258 px. Rows 48 px high, gap 2. Built row by row.
  - Rows and columns: the color's 50–950, `#FFF`, `#000`.
  - Header cells: header fill, content centered both ways: a 12 px dot bound to the step's primitive with a 1 px divider outline, and the step name in primary text.
  - Data cells: no fill, content centered both ways, two lines:
    - line 1: the value without ":1" (`4.50`), 13 px, primary text;
    - line 2: the level, 12 px bold, primary text: `✓ AAA`, `✓ AA`, `✓ 3+`, or `—`.
    The ✓ is only on line 2, so the values in line 1 stay aligned.
  - Diagonal cells: a single `·`, centered both ways, secondary text.
  - Legend above each matrix, in secondary text: "Values are contrast ratios (x:1). AAA ≥ 7 · AA ≥ 4.5 · 3+ = AA large text and UI (≥ 3) · — below 3. ✓ marks passing pairs."

**4. Cross-scale note** (only when there are 2 or more colors). One paragraph in secondary text: "Scales are built on the same contrast steps, so the same step pairs work across scales. For example, text {A}/600 on background {S}/50 still passes AA."

**5. Semantic tokens.** One table for all tokens, built row by row, primary text unless stated otherwise.
- Column widths: `Token` 190, `Checked against` 300, `Light alias` 170, `Light contrast` 170, `Dark alias` 170, `Dark contrast` 170.
- Header row: header fill, height 40, text vertically centered.
- Groups: first `Core`, then one group per extra scale (`{x}`). Each group starts with a full-width group row: header fill, the group name, and for extra groups a 12 px dot bound to `brand/{x}`.
- Data rows: no fill, minimum height 44, content vertically centered, 1 px bottom divider.
- `Checked against`: full token names separated by commas, wrapping if needed. Never abbreviate.
- Alias cells: a 12 px dot bound to the primitive (1 px divider outline), then the alias name.
- Contrast cells: line 1 is `x.xx:1 · LEVEL` using the labels from Step 2. If more than one token is checked, line 2 is `lowest vs {token}` in secondary text, 12 px.
- Dark values are read from the Dark mode of `Color / Semantic`, never copied by hand.

**6. Notes.** In secondary text:
- Disabled is exempt from contrast requirements.
- Don't use color alone to convey meaning; pair it with an icon or text (1.4.1). This matters most for status colors (error, success, warning).
- Draw the focus indicator with `focus/ring` and a 2 px gap from the element, so the ring doesn't merge with an accent-colored control.
- Contrast is only one part of accessibility; test real components, keyboard focus order, target sizes, labels, and reading order separately.

## Step 6. Self-check (mandatory)

1. **Coverage.** Every collected color has its primitives, its `brand/{name}` token, and its section in the frame. Every extra scale has its token group. The number of colors in the frame equals the number collected in Step 0.
2. **Values.** Read the actual resolved values of all created variables from the file, for both modes. Don't use planned values.
3. **Pairs.** Recalculate every semantic token pair against real surface tokens, including pairs that mix scales (for example, `{x}/text` on `bg/surface`). Also spot-check the Step 4 pairs within each scale. Any failure: fix the mapping or the step, then repeat from item 2.
4. **Labels.** Every number printed in the layout matches the recalculated value, and every `lowest vs` note names the correct token.
5. **Colors in the layout.**
   - Every text node outside scale swatches is exactly `#191919` or `#545454`.
   - Every chrome fill and stroke is one of `#FFFFFF`, `#F8F8F8`, `#D8D8D8`.
   - Every swatch and color dot is bound to its variable.
   - Text inside scale swatches is bound to `base/white` or `base/black`.
6. **Geometry.** Read absolute bounding boxes and check programmatically if possible, otherwise by inspection:
   - the root is exactly 1440 wide, and no descendant extends beyond it;
   - no child extends beyond its parent's bounds;
   - no two siblings in any auto layout intersect;
   - no frame clips content;
   - no text is under 12 px;
   - all swatches are the same size, and only 50 and 100 have an outline;
   - in every table row, all cells share the same vertical center, and no cell text overflows its cell;
   - in each matrix, line-1 values are horizontally centered in their cells.
7. **Content.** Walk through "Known failures" at the top and confirm none of them occurs. Also confirm:
   - all text is in the user's language;
   - every base block is complete.

Fix everything found and re-run the relevant checks before reporting.

## Step 7. Report

Short, in this order:
1. The standard line, plus an FYI if a new draft exists.
2. The colors collected: name, HEX, role (accent / surface / group), source (message or layer name). List any skipped layers and why.
3. For each color:
   - its scale as step → HEX;
   - the nearest step to its base;
   - the base's contrast with white and black.
4. Decisions made on your own (names, roles, level, input conversions, reused variables).
5. What was created: collections, variable count, token groups, frame.
6. Self-check: `N pairs checked, failures: 0`, `layout colors: OK`, `geometry: OK`, or a list of fixes applied.
7. Limitations:
   - disabled is exempt;
   - color alone must not carry meaning, especially for status colors;
   - contrast is only part of accessibility.
