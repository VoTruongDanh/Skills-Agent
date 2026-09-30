---
name: bento-grid-layout
description: "Reference guide for Bento Grid Layout — Content-Led Smart Grid (Zero-Crop)"
encoding: "UTF-8"
---

# Bento Grid Layout — Content-Led Smart Grid (Zero-Crop)

Every bento is a custom solution. Never repeat a layout structure, proportion, or hero position across builds.

---

## PHASE 1: Deep Content Analysis

Inspect every selected image. Classify each one:
- Category, niche, brand identity, visual style
- Colors, palette, temperature (warm/cool)
- **Exact pixel dimensions and aspect ratio** (width ÷ height)
- Focal points, text content, crop sensitivity
- Content importance: hero, supporting, or accent
- Collection-level: brand language, color harmony, hierarchy candidates

### Smart Hero Detection

Analyze ALL images to identify which are "hero" or "main" images. Consider:
- **Visual impact** — bold typography, large headlines, dramatic imagery
- **Brand anchors** — logos, taglines, hero banners, flagship product shots
- **Compositional weight** — images that demand attention or carry the brand message
- **Emotional pull** — the image that makes you stop scrolling

Hero selection is a creative decision with many valid answers — the same set of images can produce different heroes depending on the design direction. Trust design psychology and instinct. There is no single correct hero.

### Hero Placement Possibilities (pick any — never default to top-left):
- **Largest tile** — hero gets the most area in the grid
- **Center anchor** — hero sits in the visual center of the composition
- **First position** — hero leads the eye at entry point
- **Full-width banner** — hero spans the entire grid width
- **Dramatic pairing** — hero next to its visual opposite for contrast
- **Bottom anchor** — hero grounds the composition at the base
- **Split hero** — two related hero images bookend the grid
- **Pillar hero** — tall portrait hero creates a vertical axis

---

## PHASE 2: Unique Creative Direction

**Every grid must be visually distinct.** Never produce two grids that look structurally similar.

### Vary these across builds:
- **Grid structure** — 3×2, 4×3, 5×2, 3×4, 3×3, 5×3, masonry, or any custom ratio
- **Hero position** — top-left, top-right, center, bottom, split across edges, pillar, banner
- **Hero size** — determined by the image's natural aspect ratio at larger scale
- **Proportion** — landscape-wide, portrait-tall, square, panoramic, vertical magazine
- **Tile variety** — mix large spans with singles, avoid uniform grids
- **Corner style** — each tile gets unique randomized corners (never all the same)
- **Composition** — L-shape clusters, diagonal flow, center-weighted, edge-anchored, staircase, masonry cascade

### Design language (driven by content):
Minimal · Bold · Editorial · Commercial · Experimental · Photographic · UI-led · Typographic · Luxury · Playful · Maximal · Corporate — or any other that fits.

---

## PHASE 3: Build — Zero-Crop Masonry System

### CRITICAL: Aspect-Ratio Fitted Tiles (Zero-Crop)

**Every tile's dimensions MUST match its source image's exact aspect ratio.** This ensures NO content — text, logos, edges — is ever cropped.

#### How it works:
1. Group images into rows based on compatible aspect ratios and visual flow
2. For each row, calculate the shared row height so all tiles fit the target width:
   ```
   availableWidth = targetWidth - (numTiles - 1) × GAP
   sumOfAspectRatios = sum of (imageWidth ÷ imageHeight) for each image in row
   rowHeight = availableWidth ÷ sumOfAspectRatios
   tileWidth = rowHeight × imageAspectRatio (for each tile)
   ```
3. Each row has a DIFFERENT height — this is intentional and creates visual rhythm
4. Hero images go in rows with fewer tiles (1–2) so they get more height/area
5. Supporting images go in rows with more tiles (3–5) for compact presentation
6. Adjust the last tile's width per row to absorb rounding (±1px)

#### Row Grouping Strategy:
- **Hero row** (1–2 tiles): hero image(s) get maximum height and visual weight
- **Feature row** (2–3 tiles): important images at medium prominence
- **Strip row** (3–5 tiles): supporting images in a cinematic band
- Mix portrait + landscape in the same row for width contrast
- Pair ultra-wide with portrait/square to balance proportions

#### Target Container Width:
- Landscape grids: ~2400px inner width
- Portrait grids (height > width): ~1500–1800px inner width
- Square grids: ~2000px inner width

### Resolution (default: 2K)

| Tier | Gap  | Tile R | Container R | Pad  |
|------|------|--------|-------------|------|
| 2K   | 24px | 28px   | 32px        | 32px |
| 3K   | 32px | 36px   | 40px        | 40px |
| 4K   | 40px | 44px   | 48px        | 48px |
| 6K   | 48px | 52px   | 56px        | 56px |

Note: Cell size from the old grid system is NO LONGER USED. Tile dimensions come from aspect-ratio math, not fixed cell multiples.

### Background — MUST CONTRAST content
- Light/pastel content → DARK background
- Dark content → LIGHT background
- Never use a color that appears in the content images

### Roundness
Randomized per tile. Each tile gets unique individual corner radii for organic shape variety.

### Build Rules
- **FILL scale mode** — safe because tile dimensions match image aspect ratio exactly, so FILL = no crop
- Clip content on every tile
- Clear tile names (numbered + descriptive)
- Consistent gaps between all tiles
- Row edges aligned to container padding

### CRITICAL: SCALE Constraints
```javascript
child.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
```
Mandatory on every tile, every build.

---

## PHASE 4: Bento Grid Guidance Panel

After building the grid, create a guidance panel **to the right** of the grid, 40px gap.

### Panel specs
- **Width:** 380px fixed
- **Background:** ALWAYS dark (rgb 0.059, 0.059, 0.078)
- **Corner radius:** 20px
- **Layout:** vertical auto-layout
- **Padding:** 28px all sides
- **Item spacing:** 16px
- **Name:** "Bento Grid Guidance"

### Title
Horizontal auto-layout:
- 8px purple dot (rgb 0.7, 0.55, 0.85)
- "Bento Grid Guidance" — Inter Bold, 16px, white

### Single body text
- Inter Regular, 13px, muted (rgb 0.6, 0.55, 0.65), line height 1.5×
- **MAXIMUM 500 characters total** — this is a hard limit
- One compact paragraph, not multiple sections
- Combine hero rationale, aspect-ratio fitting insight, and brand observation into one flowing note
- Senior designer tone — sharp, opinionated, specific to these images
- Reference actual image names and placements

---

## PHASE 5: Interactive Clickable Controls

After every grid creation or modification, present clickable options using `ask_user_question`. This makes every option a real tappable button the user can click to instantly trigger changes.

### Flow: Two-step interactive menu

**Step 1 — Category picker.** Immediately after showing the grid info (name, structure, tiles list), call `ask_user_question` with these category options:

```
question: "What would you like to change?"
options: ["🎯 Try a different style", "⭕ Change roundness", "🎨 Change background"]
explanation: "[Grid Name] — [structure] · [resolution] · [background] · [gap]\n\nTiles:\n1. [name] · [dims]\n2. [name] · [dims]\n...\n\nOr type: Swap 1 and 3 · Reorder · Gap tight · Gap spacious · Scale to 4K · Scale to 6K"
```

**Step 2 — Option picker.** When the user selects a category, immediately present the specific options for that category using another `ask_user_question`:

**If "Try a different style":**
```
question: "Pick a style:"
options: ["Balanced Flow — rows similar height", "Center-Weighted — hero dominates center", "Inverted Cascade — hero top, shrinks down"]
explanation: "Each style rebuilds the grid from scratch with your same images.\n\nOr type: Waisted · Portrait Magazine"
```

**If "Change roundness":**
```
question: "Pick roundness:"
options: ["Sharp — 0px, geometric edges", "Subtle — 8-12px, barely there", "Rounded — 36-48px, friendly and bold"]
explanation: "Updates all tiles on the current grid.\n\nOr type: Medium (20-28px) · Pill (max radius)"
```

**If "Change background":**
```
question: "Pick background:"
options: ["Dark — deep black/charcoal", "Light — soft white/cream", "Brand color — from image palette"]
explanation: "Updates the container fill.\n\nOr type: Gradient · Contrast auto"
```

### After every change, repeat the flow
After executing any change (style rebuild, roundness update, background swap, etc.), show the updated grid screenshot, then call `ask_user_question` again with the category picker (Step 1). This keeps the loop going so the user can keep refining without typing.

### Handling typed commands
If the user types a command directly instead of clicking (e.g. "Swap 1 and 3", "Gap tight", "Portrait Magazine", "Pill corners"), execute it immediately — no need for the question flow. After executing, return to the category picker.

### Control behaviors

**Style commands** — Build a completely new grid with the specified style. Keep the same images. Each style has a specific character:
- **Balanced Flow**: Group images so all row heights stay within 40-60px of each other. No tile visually dominates.
- **Center-Weighted**: Hero pair in the center row (2 tiles) gets 2-3× the height of flanking strip rows (4-5 tiles each).
- **Inverted Cascade**: Hero trio at top (tallest row), rows progressively shorter toward bottom.
- **Waisted**: Landscape images in a narrow middle row, portrait-heavy rows above and below create an hourglass shape.
- **Portrait Magazine**: Use narrower target width (1500-1800px) so container height > width. Vertical reading flow.

**Roundness commands** — Update all tile corner radii on the existing grid:
- **Sharp**: all corners 0px
- **Subtle**: all corners random 8-12px
- **Medium**: all corners random 20-28px
- **Rounded**: all corners random 36-48px
- **Pill**: all corners set to min(width, height) / 2

**Background commands** — Update the container fill:
- **Dark**: rgb(0.06, 0.06, 0.08)
- **Light**: rgb(0.96, 0.95, 0.93)
- **Brand color**: extract dominant color from images, darken/lighten for contrast
- **Gradient**: two-color linear gradient derived from image palette
- **Contrast auto**: analyze image brightness, pick dark bg for light content and vice versa

**Swap** — Exchange image fills between the two numbered tiles.
**Reorder** — Fresh arrangement using same assets, new row grouping.
**Gap** — Update gap between all tiles (tight=12px, spacious=40px).
**Scale 4K/6K** — Multiply all dimensions proportionally.

### Rules
- Number every tile for fast Swap
- Apply changes directly, show updated screenshot
- **Always use `ask_user_question` for the category picker after every build or change** — this is the core interactive loop
- When user taps a style option, build a completely fresh grid — different row grouping, different hero position
- Always use the same selected images unless user provides new ones
