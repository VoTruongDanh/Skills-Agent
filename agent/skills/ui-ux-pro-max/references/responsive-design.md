---
name: responsive-design
description: Takes any selected frame and produces adaptive versions at other breakpoints (phone, tablet, website), asking the user which sizes to target
encoding: "UTF-8"
---

# Responsive Design

Takes any selected frame — phone, tablet, or website — and produces adaptive versions at other breakpoints. Every output is built with auto-layout so content genuinely scales when the frame is resized. Reuses the file's existing components and variables, and keeps all of the source content.

## Default breakpoint sizes

- Phone — 402px wide
- Tablet — 834px wide (iPad Pro 11")
- Website — 1440px wide

## Inputs

The user selects ONE frame — the source design to adapt. If more than one frame is selected, ask which is the source.

## Step 0 — Ask the user what sizes to generate

Before doing any work, ask the user which target sizes they want. Present the options based on what makes sense given the source frame's width:

- If the source looks like a phone (~390–430px): offer Tablet and/or Website
- If the source looks like a tablet (~768–834px): offer Phone and/or Website
- If the source looks like a website (~1200–1440px+): offer Tablet and/or Phone

Let the user pick one or more targets. If they name custom widths or devices, use those instead of the defaults. Then proceed with the selected targets only.

## Reflow ruleset (apply per component type)

When going LARGER (e.g. phone → tablet/website):
- Single-column stacks may expand to multi-column grids
- Hamburger/drawer nav may expand to inline horizontal nav
- Stacked hero sections may go side-by-side (text beside image)
- Card lists may expand to 2-up, 3-up, or grid layouts
- Stacked table cards may become a proper table
- Step type sizes UP the scale (body stays comfortable, headings grow)
- Increase section padding, gutters, and side margins

When going SMALLER (e.g. website → tablet/phone):
- Multi-column grids — reduce column count: N cols → 2 → 1 (or 2 for small cards)
- Horizontal nav bar → condense on tablet → hamburger/drawer on phone
- Sidebars / side panels — move below main content or into a drawer
- Hero (text beside image) — stack to text-above-image; adjust image aspect for portrait
- Card rows — grid → 2-up or single column, or horizontal scroll
- Tables — horizontally scrollable, or restructure rows into stacked cards
- Step type sizes DOWN the scale (tablet ~80%, phone ~60–70% of website display sizes)
- Shrink section padding and gutters (e.g. phone section padding ~24px, side margins ~16–24px)

Always apply:
- **Body text** never below 16px
- **Line length** roughly 45–75 characters
- **Touch targets** at least 44×44 on tablet and phone with enough spacing between tappable items
- **Content priority** — keep every piece of content. If a section is heavy for the target size, collapse into an accordion or "show more" rather than deleting. Label it as progressive disclosure. Reorder for viewport priority but keep logical order intact.

## Content expansion rule (when going larger)

When adapting from a smaller screen to a larger one, the wider layout often has more grid columns and visual space. Fill that space with new, realistic content — NEVER duplicate existing items to pad the grid.

- **Product grids:** If the source shows 2 products and the wider layout has 4 columns, generate 6–8 unique products with distinct names, prices, category labels, and images that match the brand's aesthetic. Keep the original items and add new ones.
- **Navigation:** A website top nav can include more links than a mobile bottom bar — add realistic nav items that fit the brand (e.g. "New Arrivals", "Collections", "Journal", "About" for a fashion brand).
- **Filter sidebars:** When a larger layout adds a filter sidebar that didn't exist on mobile, populate it with realistic filter options relevant to the content (category, price range, size, color, etc.).
- **Featured sections:** Wider layouts may warrant additional content sections — e.g. a "New Arrivals" editorial row, a newsletter signup, or a brand story strip. Add these if they feel natural for the brand and layout, but don't force unnecessary content.
- **General rule:** Every piece of text, every product name, every price, and every image should be unique and realistic for the brand. Generic placeholder text ("Product 1", "Lorem ipsum") is never acceptable. Study the source frame's brand voice, naming patterns, and price ranges to generate content that belongs.

## Step 1 — Read the source and the system

Inspect the source frame's structure and read the file's existing components and variables/tokens. Also study the source frame's content closely — brand name, product naming conventions, price ranges, category names, writing tone — so that any new content generated for larger breakpoints is consistent with the brand.

## Step 2 — Create the breakpoint frames

Use evaluate_script to create a frame for each target breakpoint at the correct width, laid out in a row next to the source, largest to smallest, each named clearly (e.g. "Home — Tablet 834", "Home — Phone 402"). The source frame stays untouched.

## Step 3 — Adapt each breakpoint

For each breakpoint frame, use edit_design with these instructions:

"Adapt this frame to a {WIDTH}px-wide {DEVICE} layout of the same screen. Apply the responsive reflow rules: adjust column counts, navigation pattern, hero layout, card grids, tables, and type scale appropriately for this width.

CONTENT EXPANSION: When the wider layout creates more grid space or new sections, fill them with new, realistic content that matches the brand — unique product names, realistic prices, distinct images, and appropriate labels. NEVER duplicate existing content to fill space. Study the reference frame's brand voice and naming patterns to generate content that belongs. For product grids, ensure every card has a unique product name, price, category label, and image.

CRITICAL — AUTO-LAYOUT AND RESPONSIVENESS REQUIREMENTS:
Every single layer must participate in auto-layout. The root frame must use vertical auto-layout. Every section, row, card, nav bar, and content group must be an auto-layout frame — no absolutely positioned children unless they are intentional overlays (like text on a hero image). Specifically:
- The root frame: vertical auto-layout, hug height
- Every horizontal row (nav bars, card grids, filter chips, price lines): horizontal auto-layout
- Every vertical stack (sections, card contents, form groups): vertical auto-layout
- All content containers: set to fill-parent width so they stretch with the frame
- Text nodes: set to fill-parent width (not fixed width) so text reflows when the frame resizes
- Images and media: set to fill-parent width with a fixed aspect ratio or fixed height, so they scale proportionally
- Cards in a grid: each card should be fill-parent width within its row, so cards grow/shrink evenly
- Spacing: use auto-layout spacing and padding, never manual pixel gaps between siblings
- No fixed widths on content elements — only the root frame has a set width; everything inside fills or hugs

The test: if someone drags the frame wider or narrower by 100px, all content should reflow naturally — text rewraps, cards resize, images scale, spacing adjusts. Nothing should overflow, get clipped, or stay fixed-width while its parent grows.

Reuse the file's existing components and variables; do not reinvent styles. Keep all of the source content. Do not drop or fabricate content. If a section is too heavy for this width, collapse it into an accordion or 'show more' and label it as progressive disclosure rather than deleting it."

Pass the source frame as a reference (references.nodeIds) so the agent can match its style and content exactly.

## Step 4 — QA pass: auto-layout verification

After all breakpoint frames are adapted, use evaluate_script to verify that auto-layout is actually wired up. For each breakpoint frame, run a script that:

1. Checks the root frame has layoutMode set to "VERTICAL" or "HORIZONTAL" (not "NONE")
2. Recursively walks the tree and counts how many FRAME nodes have layoutMode "NONE" (absolutely positioned children)
3. Checks that direct children of auto-layout frames use layoutSizingHorizontal "FILL" (not "FIXED") where appropriate
4. Checks that TEXT nodes use layoutSizingHorizontal "FILL" (not "FIXED") so they reflow
5. Logs any violations found

If violations are found, use edit_design to fix them — specifically instruct: "Convert all fixed-position frames to auto-layout. Set all content containers and text nodes to fill-parent width. Remove absolute positioning except for intentional overlays. The frame must resize responsively when its width changes."

After fixes, resize each frame by ±50px using evaluate_script and take a screenshot to visually confirm content reflows correctly. Then resize back to the target width.

Also check:
- No unintended horizontal overflow or clipped/truncated text
- Body text >= 16px, tap targets >= 44px on touch devices
- Images adapted (re-cropped/aspect-adjusted), not distorted
- Nav usable at this width
- Components and tokens consistent with the source
- **No duplicated content** — every product card, nav item, and text block should be unique

## Step 5 — Output the responsive notes

Produce a short "Responsive notes" summary documenting, per breakpoint, the key adaptations: column counts, nav change, type scale shift, spacing changes, content additions, and anything collapsed into progressive disclosure.

## Guardrails

- Same content at every breakpoint; any hiding is labeled progressive disclosure, never silent deletion
- When expanding to a larger layout, add realistic new content — never duplicate existing items to fill space
- Reuse the existing design system; keep the identity identical across sizes
- EVERY frame must use auto-layout throughout — no static pixel-positioned layouts. This is non-negotiable. If a frame doesn't resize properly, it's not done.
- Keep the source frame untouched as the reference
- Report assumptions and any font/component substitutions; this is a strong starting point, not pixel-perfect final art
