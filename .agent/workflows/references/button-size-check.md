---
name: button-size-check
version: 2.7.0
description: >
  Scans selected Figma frames or full pages for interactive elements and executes
  a 4-stage UI/UX audit: touch target sizing, hit area spacing, CTA placement,
  and CTA visual hierarchy. Injects non-destructive, color-coded visual overlays
  and summary annotations directly onto the canvas.
tags:
  - touch-targets
  - button
  - CTA
  - Clickable-Area
  - UI-audit
encoding: "UTF-8"
---

# Button Size Check Skill Specification

## 1. Overview & Capabilities

The **Button Size Check** skill (`/button-size-check`) evaluates UI frames for usability, ergonomics, and accessibility compliance. It overlays dynamic canvas markers, vector bounding boxes, and diagnostic sticky panels directly inside Figma.

* **Invocation:** Call `/button-size-check` directly in the prompt or command bar.
* **Target Selection:** Single frame, multi-frame flow, or entire page.
* **Element Detection Strategy:** Component type metadata, layer naming conventions (`Button/*`, `Icon/*`, `Input/*`, `CTA=true`), and Figma prototype interaction links.
* **Canvas Output:** Auto-generated `_audit-overlay` layer groups containing vectors, bounding squares, and a summary card.

---

## 2. Canvas Rendering & Verification Rules

* **Viewport Clamping & Scroll Exclusion:** All visual marks must be generated strictly within the visible frame bounds (`clipContent = true` viewport boundary). Completely exclude any interactive elements positioned above or below the active scroll area.
* **Empty Area Check:** If an area is empty and the frame does not contain an icon or interactive layer, do **not** render red selections, bounding boxes, or grey dots. Overlays must strictly bind to detected interactive nodes within visible bounds.
* **Minimal Visual Annotations:** Do **not** render floating text labels with numeric values directly on the screen/frame canvas. Use **red squares only** for canvas highlights. Detailed numeric values (pixel sizes, deficits, gaps) belong exclusively in the summary panel.
* **Marker Styling:**
  * **Stroke Style:** Dashed stroke exclusively.
  * **Stroke Weight:** `1px`.
  * **Dash Pattern:** Dash `2px`, Gap `2px` (`dashPattern: [2, 2]`).
  * **Fill Opacity:** `15%` (e.g., `rgba(255, 59, 48, 0.15)`).

---

## 3. Core Audit Modules

### Module 1: Touch Target Size
Measures the physical bounding box of all interactive components within visible bounds against industry touch standards.

* **Platform Compliance Standards:**
  * **iOS HIG:** $44 \times 44\,\text{pt}$
  * **Android Material 3:** $48 \times 48\,\text{dp}$
  * **WCAG 2.2 AA:** $24 \times 24\,\text{px}$ minimum
  * **WCAG 2.2 AAA:** $44 \times 44\,\text{px}$ target
* **Overlay System:**
  * Render **red squares only** (Stroke: 1px dashed [2, 2], Fill: 15% opacity) over failing target layers.
  * Omit inline numeric text badges from the canvas.

---

### Module 2: Hit Area Spacing
Analyzes clickable interaction envelopes and spacing buffers between neighboring interactive elements inside the viewport to eliminate mis-taps.

* **Trigger Conditions:**
  * Inter-target gap $< 8\,\text{px}$ between clickable bounds.
  * Overlapping hit-boxes caused by negative margins or component padding.
  * Nested touch layers (e.g., notification badge on a clickable avatar).
* **Overlay System:**
  * Highlight conflicting interactive bounds with red bounding squares (Stroke: 1px dashed [2, 2], Fill: 15% opacity).
  * Do not render numeric gap text directly across the visual layout.

---

### Module 3: CTA Placement & Flow Ergonomics
Evaluates primary/secondary action positioning across platform thumb zones and sequence consistency within the visible viewport.

* **Validation Rules:**
  * **Mobile Thumb Reach:** Flags primary actions anchored to the top third of mobile frames; recommends bottom-third docking.
  * **Flow Consistency:** Detects coordinate/layout drift of the primary CTA across sequential step frames (e.g., checkout steps).
  * **Competition & Ambiguity:** Flags viewports containing multiple competing primary styles or missing a designated "happy path" action.

---

### Module 4: CTA Visual Hierarchy & Contrast
Quantifies the visual weight of visible primary CTAs relative to surrounding UI elements to ensure decisive prominence.

* **Evaluation Axes:**
  1. **Luminosity/Fill Contrast:** Primary vs. canvas background.
  2. **Relative Scale:** Component dimensions relative to secondary/tertiary controls.
  3. **Shape Prominence:** Corner radius, border treatment, and elevation/shadow depth.
  4. **WCAG Color Contrast:** Text/icon against button fill (4.5:1 for standard text, 3:1 for large text).

---

## 4. Output Schema & Summary Template

All numeric metrics and diagnostic text are routed to a summary card adjacent to the frame rather than drawn directly onto the screen layout. Modules that pass without issues are marked with **✓**.

```markdown
┌────────────────────────────────────────────────────────────────────────┐
│ Frame: [Frame Name / Screen Title]                                     │
├────────────────────────────────────────────────────────────────────────┤
│ • Touch Targets : ✓ All targets meet minimum size                      │
│                   OR [X] checked, [Y] fail ([Layer], [WxH] → +[N]px)   │
│ • Hit Areas     : ✓ 0 overlaps detected (all gaps ≥ 8px)               │
│                   OR [X] overlap ([Target A] + [Target B], [N]px gap)  │
│ • CTA Placement : ✓ Platform conventions and flow alignment verified   │
│                   OR [Drift / Reachability Warning + Recommendation]   │
│ • CTA Hierarchy : ✓ Primary action clearly distinguished               │
│                   OR [Inverted / Competing Target + Reason]            │
└────────────────────────────────────────────────────────────────────────┘
