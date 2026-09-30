---
name: annotate-aria-landmarks
description: "Reference guide for Annotate ARIA Landmarks"
encoding: "UTF-8"
---

# Annotate ARIA Landmarks

Add ARIA landmark role annotations to selected frames using the Accessibility annotation category. Annotate structural regions only — not individual text elements or interactive controls.

## Landmark roles

Map frame regions to these ARIA landmark roles:

- `role="navigation"` — primary or secondary navigation areas (sidebars, nav bars, tab bars)
- `role="banner"` — page-level headers containing titles, status indicators, and top-level actions
- `role="main"` — the primary content area of the page
- `role="complementary"` — secondary/contextual content that supports the main area (e.g. contextual side panels)
- `role="dialog"` — overlay or modal containers (when applicable)

## Workflow

1. **Inspect and propose** — Use `evaluate_script` to build the layer tree (depth 3, increase if structural nesting warrants it) of each selected frame AND view thumbnails. Propose the landmark mapping to the user — list each region, suggested role, and short justification. Ask the user to confirm or adjust.

2. **Apply annotations** — Use `evaluate_script` to apply all annotations in a single call:
   - Look up the Accessibility category via `figma.annotations.getAnnotationCategoriesAsync()` (match on `.label`, not `.name`)
   - If it doesn't exist, create it with `figma.annotations.addAnnotationCategoryAsync({ label: 'Accessibility', color: 'pink' })`
   - For each landmark node, spread existing `node.annotations` and append: `{ label: 'role="<role>"', categoryId }`
   - Reassign the full array to `node.annotations`

3. **Summarize** what was applied per frame with node links.

## Important

- Only annotate structural container nodes (frames, slots, layout wrappers) — not individual text, icon, or button nodes.
- Preserve any existing annotations on the node — spread the current array when adding.
- The category property is `.label` (not `.name`). The create method is `addAnnotationCategoryAsync` (not `createAnnotationCategoryAsync`).
- If a region could reasonably be either `navigation` or `complementary`, default to `complementary` for contextual side panels and `navigation` for global nav.
