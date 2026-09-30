---
name: structured-saas-dev-tool-ui
description: "Reference guide for Structured SaaS / Dev-Tool Design"
encoding: "UTF-8"
---

# Structured SaaS / Dev-Tool Design
## Purpose
Create interfaces that belong to the same high-craft family as modern developer tools and premium B2B SaaS products without cloning any one product.
The target feeling is **precise, calm, intentional, efficient, mature, technically credible, restrained, and production-ready**. The aesthetic is not a fixed palette, font stack, radius value, or bag of effects. It is a system of decisions about hierarchy, restraint, density, composition, interaction, and where visual expression is allowed.
Treat referenced products and websites as evidence of design principles, not templates to reproduce.
## Core rule: restraint creates the premium feeling
Prefer fewer visual devices executed precisely over many decorative devices. The design should still feel strong if gradients, illustrations, most shadows, and most accent color are removed. Typography, spacing, alignment, information hierarchy, surface structure, and interaction must carry the experience first.
Treat visual emphasis as a limited budget. Strong contrast, accent color, glow, oversized type, or dramatic imagery should appear only where the user should actually look.
Every screen should establish this hierarchy:
1. Primary task, message, or object.
2. Supporting information.
3. Controls and navigation.
4. Metadata and secondary actions.
Do not allow several elements to compete for primary attention.
---
# 1. Choose the correct flavor
Classify the experience before designing.
### Austere / utilitarian
Use for application interiors, admin tools, developer tools, issue trackers, project management, configuration, tables, dashboards, editors, command interfaces, and data-heavy workflows.
Characteristics: neutral surfaces, minimal color, thin borders, little decorative glow, compact controls, high information density, crisp hierarchy, subtle surface shifts, and typography/alignment doing most of the visual work.
Primary reference behavior: Linear application UI, Vercel, Raycast working UI.
### Ambient / soft-glow
Use for marketing pages, heroes, onboarding, authentication, AI introductions, low-density empty states, launch moments, and premium feature storytelling.
Keep the austere structural discipline underneath, then add one controlled atmospheric color field, radial/mesh gradient, subtle blur, or glass layer around a focal moment.
Primary reference behavior: Reflect hero, selected Raycast marketing moments, Twingate marketing.
### Hybrid
Use for most polished SaaS products: ambient at the entrance/storytelling layer, austere inside the working product.
**Never smear marketing effects across operational UI.**
---
# 2. Reference family: extract behavior, not branding
### Linear
Learn severe reduction of decorative noise, product UI as a visual asset, editorial two-column layouts, large section headings, subtle figure labels, quiet monochrome navigation, low-contrast boundaries, semantic color used sparingly, and large macro whitespace around dense demonstrations.
### Raycast
Learn compact tool-like controls, keyboard-first interaction language, dark neutral framing, product windows floating in empty space, selective chromatic moments, localized dramatic hero artwork, and polished small-scale UI.
### Reflect
Learn ambient color as a focal event, luminous gradients behind product imagery, readable dark surfaces, calm/personal tone, and generous vertical storytelling rhythm.
### Twingate
Learn technically credible product storytelling, controlled environmental gradients, clean technical diagrams, and enterprise hierarchy without generic corporate styling.
### Vercel
Learn black-and-white confidence, extreme whitespace, geometric clarity, editorial asymmetry, typography as identity, and product visual references/diagrams shown with minimal framing.
### SaaS UI
Learn semantic tokens, reusable application patterns, accessible primitives, consistent component recipes, and systems that scale beyond one polished screen.
Never copy logos, proprietary copy, exact brand graphics, or another company's exact UI.
---
# 3. Inspect context before creating
Before editing or creating:
1. Inspect the selected frame, nearby screens, components, variables, styles, and visible product context.
2. Identify the user, primary task, primary object, primary action, and expected information density.
3. Classify the screen as marketing, onboarding, application UI, configuration, or data-heavy workflow.
4. Detect existing brand accent, typography, spacing, components, and interaction patterns.
5. Preserve established product conventions unless the user requests a redesign.
6. If visual references are provided in the current task, analyze their hierarchy, geometry, density, and visual behavior before drawing.
7. Do not invent hidden functionality that is neither visible nor described.
8. Make only the minimum assumptions required to complete the design.
If a design system already exists, adapt this aesthetic to it rather than replacing it.
---
# 4. Layout and spacing
Use an invisible grid. Nothing should look eyeballed.
Align headings, body copy, controls, cards, tables, section edges, visual references, dividers, and metadata to shared axes.
Use a 4 px base with an 8 px dominant rhythm when no system exists. Treat these as starting relationships, not immutable tokens:
- Icon-to-label: 6–8 px.
- Compact control gaps: 6–8 px.
- Related form fields: 12–16 px.
- Card/panel padding: 16–24 px.
- Subsections: 24–40 px.
- Major application regions: 32–64 px.
- Marketing chapters: 96–200+ px when large negative space improves pacing.
### Macro whitespace vs micro density
This contrast is essential:
- Use generous whitespace **between major ideas**.
- Use compact spacing **inside functional groups**.
- Keep tables, lists, metadata, toolbars, and navigation relatively dense.
- Let navigation chrome shrink so the content area dominates.
Do not make every component spacious. Excess padding makes serious SaaS interfaces feel generic and inefficient.
---
# 5. Composition
Prefer strong, simple compositions:
- large editorial heading paired with supporting copy in another column
- hero copy above a dominant product window
- product visual reference as the primary visual
- asymmetrical two-column section
- narrow text block beside a larger interface demonstration
- centered hero with one atmospheric focal effect
- small figure/section label above a major chapter
- full-width product canvas with only a few precise annotations
Negative space is structural. Do not fill a region simply because space exists.
On marketing pages, use large quiet transitions between conceptual chapters. Within each chapter, keep the composition compact and deliberate.
---
# 6. Typography
Typography should feel engineered rather than expressive.
Use one clean modern sans-serif/grotesk with neutral geometry and excellent legibility. Avoid decorative type families and unnecessary weight changes.
Use monospace selectively for IDs, keyboard shortcuts, code, commands, technical values, version numbers, and system-like metadata. Monospace communicates “fact/system,” not decoration.
Approximate ranges when no existing type scale exists:
- Marketing hero: 48–80 px.
- Marketing section heading: 32–56 px.
- Marketing body: 15–20 px.
- Application title: 20–32 px.
- Application section heading: 14–20 px.
- Interface body: 13–15 px.
- Metadata/eyebrow: 11–13 px.
Use optical judgment. Tighten large headings; keep body copy readable; keep metadata quieter but legible. Avoid center alignment in dense working UI. Reserve centered copy mainly for marketing, onboarding, and sparse states.
---
# 7. Color
Build from a coherent neutral scale first.
### Dark mode
Use near-black rather than featureless absolute black when possible. Elevated surfaces should differ subtly from the base. Borders should organize by adjacency, primary text should be bright but comfortable, and secondary/tertiary text should establish hierarchy without disappearing.
### Light mode
Do not force dark mode. Use restrained surface changes, thin neutral borders, strong typography, and intentional whitespace. Avoid flat pure-white monotony.
### Accent discipline
Default to one primary accent family. Spend it on selected state, primary action, focus, active navigation, meaningful status, key diagram relationships, or one atmospheric marketing moment.
Semantic success/warning/error colors are allowed when they communicate state, but keep them subordinate to the information architecture.
Do not distribute saturated accent color across arbitrary icons and decoration.
---
# 8. Depth, borders, shadows, blur, and glow
Create depth in this order:
1. Surface contrast.
2. 1 px low-contrast borders.
3. Nested surfaces.
4. Controlled transparency.
5. Soft environmental light only when appropriate.
Borders should organize content without becoming the subject. Strengthen them for focus, selection, active drop targets, critical states, or a deliberate hero frame.
If shadows are necessary, use broad, soft, low-opacity shadowing combined with borders/surface changes. Avoid sharp, heavy, single-layer drop shadows.
Use ambient glow only behind a hero product visual, AI introduction, onboarding moment, focal object, or section transition. Avoid glow behind tables, settings, forms, navigation, or every card.
A glow should feel environmental, not like an obvious Photoshop outer-glow effect.
---
# 9. Geometry and radii
Use restrained radii with a consistent hierarchy: modest on controls, modest-to-medium on inputs/buttons, medium on cards/panels, and medium on major product windows.
Pills are appropriate for compact filters, segmented controls, statuses, tags, and small toggle groups. Pills are **not** the default shape for every button, card, input, or navigation item.
---
# 10. Navigation
Navigation should recede behind content.
Prefer slim top bars, compact/collapsible sidebars, muted inactive states, minimal chrome, and clear selected states. Use icon + label only where useful. Optimize canvas area for the primary task.
Do not create a giant decorative sidebar unless the product genuinely requires it.
Use spacing, dividers, and surface shifts before ornament.
---
# 11. Search and command surfaces
When frequent navigation/actions are central, make keyboard-first behavior a first-class pattern.
A command palette should use:
- immediate search/input focus
- grouped results
- compact rows
- clear current selection
- keyboard hints where useful
- minimal decoration
- fast scanning
Do not scatter shortcut badges everywhere without functional value.
---
# 12. Buttons and actions
Establish a clear hierarchy.
**Primary:** one dominant action per local context where possible; use accent fill or high-contrast neutral treatment.
**Secondary:** subtle border, low-contrast surface, text button, or quiet icon button.
**Tertiary:** subdued text or icon-only action.
Avoid multiple equally prominent CTAs, oversized controls in dense UI, gratuitous gradients, glossy buttons, or hover scaling. Hover should usually be a restrained surface, border, or text change.
---
# 13. Inputs, forms, and configuration
Forms should feel compact and predictable. Use persistent labels when ambiguity matters, concise helper text, clear focus state, subtle boundaries, logical grouping, consistent control heights, and inline validation near the affected field.
Use modals, popovers, side panels, or compact settings views for configuration. Use full pages for primary reading/working surfaces.
Do not turn small configuration tasks into full-screen journeys.
---
# 14. Cards and panels
Do not put every piece of content in a card.
First ask whether grouping can be expressed through whitespace, alignment, divider, shared surface, or typography.
Use a card only for a meaningful object/group. Default card behavior: subtle border, small surface shift, restrained radius, minimal shadow, compact internal hierarchy.
Marketing feature cards may be more expressive only when the surrounding composition remains quiet.
---
# 15. Tables, lists, and dense workflows
Working interfaces should become flatter and denser.
Use compact rows, strong column alignment, sticky headers where useful, muted secondary metadata, monospace for technical IDs/values where beneficial, subtle row hover, quiet selected states, truncation, and clear sorting/filter affordances.
Avoid card-per-row layouts for naturally tabular data, gradients behind data, excessive vertical padding, decorative icons, and heavy separators.
Optimize for scanning speed.
---
# 16. Status, tags, and badges
Status may use a small dot, icon, compact label, restrained tint, or text color.
Do not create a rainbow of saturated pills. When many statuses appear together, reduce saturation and visual weight.
Color communicates meaning, not decoration.
---
# 17. Modals, popovers, menus, and overlays
Treat overlays as temporary tools: compact, clearly hierarchical, subtly bordered, slightly elevated, keyboard-friendly when relevant, and easy to dismiss.
Keep menus dense. Avoid enormous padded menus and unnecessary nested cards. Dim background context enough to focus attention without erasing orientation.
---
# 18. Empty states
Default empty state:
- short title or sentence
- one supporting line only if needed
- one primary action
Do not add a cute illustration by default.
A controlled ambient visual is acceptable only when the empty state is also a meaningful onboarding/brand moment.
---
# 19. Product UI as marketing artwork
For marketing work, prefer the real product as the hero asset.
Use one large realistic interface window, nested panels, purposeful crops, selective enlargement, subtle edge fade, and a restrained environmental glow if appropriate.
Do not hide a weak interface beneath decorative 3D objects. The product demonstration should communicate actual value.
---
# 20. Marketing-page rhythm
Do not build a page as an endless sequence of identical feature cards.
Create rhythm by alternating hero, product proof, editorial statement, focused capability, large UI demonstration, sparse technical explanation, social proof, and the next major chapter.
Use short, confident, declarative copy. Avoid inflated startup language, excessive adjectives, exclamation marks, long marketing paragraphs, and vague AI claims.
---
# 21. Application-UI rhythm
Product UI prioritizes utility over atmosphere.
Use persistent structural navigation, clear local context, compact toolbars, dense content, contextual panels, strong selected state, subdued inactive states, and predictable action placement.
The interface should feel usable for hours, not merely impressive in a visual reference.
When unsure, remove effects and improve hierarchy.
---
# 22. AI product patterns
Do not represent AI solely with gradients or sparkle icons.
Show AI through useful interaction: command input, contextual assistant panel, inline suggestion, generated result with status/provenance, activity log, processing state, accept/reject controls, concise next action, or a visible relationship to the user's current object.
A controlled ambient effect may introduce an important AI moment. Once work begins, flatten the interface again.
---
# 23. Iconography
Use one coherent icon family with consistent line weight and optical size. Icons should usually inherit surrounding text color. Filled/colored states are reserved for identity or semantic meaning.
Icons clarify actions; they do not decorate headings.
Never mix unrelated icon styles.
---
# 24. Motion and prototype behavior
Motion should be fast and purposeful.
Ordinary interactions should use quick hover feedback, short opacity/surface transitions, subtle overlay entrances, and immediate selection feedback.
Avoid bouncing, springy motion everywhere, hover lift, hover scaling, or drifting elements without function.
One or two signature motion moments may be expressive because the rest of the system is controlled.
---
# 25. Responsive behavior
Do not merely shrink desktop layouts.
At smaller widths:
1. Preserve the primary task.
2. Reduce peripheral chrome.
3. Collapse secondary navigation.
4. Stack editorial columns.
5. Protect readable line lengths.
6. Allow dense tables to scroll or hide secondary columns intentionally.
7. Preserve accessible targets.
8. Keep atmospheric effects behind, not over, content.
Maintain hierarchy across breakpoints.
---
# 26. Accessibility
Visual restraint does not justify weak usability.
Ensure readable contrast, visible focus, distinguishable selection, appropriate target sizes, legible text over effects, non-color status cues, and scannable dense UI.
Muted text must remain legible. Do not reduce contrast merely to look “minimal.”
---
# 27. Figma construction quality
When creating or rebuilding UI:
- Use Auto Layout for repeatable structures.
- Use coherent gap/padding values.
- Reuse suitable local components, variables, and styles.
- Create components for repeated patterns.
- Use variants for meaningful states.
- Create semantic variables when establishing a new system.
- Keep text styles consistent.
- Name important frames/components clearly.
- Maintain a clean layer hierarchy.
- Make resizing behavior intentional.
- Prefer Auto Layout/constraints over arbitrary absolute positioning.
- Do not detach instances unnecessarily.
Visual quality and file quality are both part of the result.
---
# 28. Adapt to the product
If a brand already has an accent, use it instead of importing a reference brand's color.
If the product is light mode, preserve the same restraint, hierarchy, borders, density, and semantic color; do not force dark mode.
If consumer-facing, allow slightly warmer typography, spacing, and ambient treatment while preserving structural discipline.
If enterprise/data-heavy, move toward the austere end: denser, flatter, less atmospheric, stronger metadata, clearer grouping.
If the user asks for a reference-heavy exploration, move closer to that reference's composition and mood while still avoiding literal cloning.
---
# 29. Reject generic “AI SaaS” patterns
Do not default to:
- purple-to-blue gradients everywhere
- glowing borders on every card
- excessive glassmorphism
- giant rounded cards
- pill-shaped everything
- heavy floating-card shadows
- several saturated accent colors
- gradient buttons by default
- arbitrary sparkle icons
- decorative blobs behind dense content
- huge empty cards containing tiny content
- oversized metrics without hierarchy
- icon tiles for every feature
- excessive card nesting
- arbitrary Bento grids
- generic stock illustrations
- fake decorative charts
- excessive blur
- weak gray-on-gray contrast
- microscopic body copy
- oversized padding in compact controls
- playful hover movement in serious workflows
- “minimalism” used to excuse missing information architecture
If the result looks like a generic template, simplify it and rebuild the hierarchy.
---
# 30. Required execution workflow
Follow this sequence every time the skill is invoked.
### Step 1 — Understand
Identify screen purpose, user, primary task, primary action, information density, product-vs-marketing context, brand constraints, and existing patterns.
### Step 2 — Classify
Choose austere, ambient, or hybrid and apply it consistently.
### Step 3 — Establish hierarchy
Define the primary focal point, secondary content, navigation, metadata, and supporting actions before styling.
### Step 4 — Build structure
Create grid, regions, alignment, Auto Layout, spacing rhythm, and component relationships. Do not begin with effects.
### Step 5 — Establish type and surfaces
Set typography hierarchy, neutral surfaces, border hierarchy, radii, and control sizing.
### Step 6 — Add semantic color
Apply brand accent, selection, focus, and status color intentionally.
### Step 7 — Add atmosphere only if justified
For ambient/hybrid moments, add one controlled effect and stop before it competes with content.
### Step 8 — Add important states
Design relevant default, hover, active, selected, focus, disabled, loading, error, and empty states. Do not create meaningless variants.
### Step 9 — Check density
Verify functional UI is compact enough, unrelated groups have separation, macro whitespace is sufficient, and key information scans quickly.
### Step 10 — Polish
Check alignment, baselines, icon optical sizing, repeated padding, borders, truncation, action hierarchy, realistic content, clipping, and resizing.
---
# 31. Final self-audit
Before presenting the design, verify:
### Hierarchy
- The purpose can be understood within seconds.
- Each local context has one dominant focal point.
- Secondary and tertiary information are visibly quieter.
### Restraint
- Every card, border, icon, color, glow, and effect earns its place.
- Effects are concentrated rather than distributed.
- Color communicates rather than decorates.
### Density
- Working UI is compact enough for repeated use.
- Marketing has enough macro whitespace.
- Layout/alignment replace unnecessary cards.
### Typography
- Type establishes unmistakable hierarchy.
- Headings are compact and intentional.
- Metadata remains legible.
- Monospace is semantically justified.
### Surfaces
- Depth comes primarily from layering and borders.
- Shadows are subtle.
- Radii are restrained and consistent.
- Pill usage is justified.
### Interaction
- Primary and secondary actions are distinguishable.
- Hover/focus/selected states are clear but quiet.
- Keyboard-oriented patterns are considered where relevant.
### Cohesion
- Components feel like one product.
- Iconography, spacing, borders, and states are consistent.
- The brand has been adapted rather than replaced by a reference brand.
### Production readiness
- Content and states are realistic.
- Likely edge cases are represented where relevant.
- Figma structure is reusable and maintainable.
- The result works as a real product, not only as a portfolio image.
If several checks fail, revise before finishing.
---
# 32. Quality bar
The result should feel closer to software from a mature product organization than to a template marketplace concept.
Prioritize in this order:
1. Usability.
2. Information architecture.
3. Hierarchy.
4. Composition.
5. Typography.
6. Spacing.
7. Interaction.
8. Surface treatment.
9. Color.
10. Decorative effects.
Never reverse this order.
A high-craft Structured SaaS design is not impressive because many things were added. It is impressive because almost nothing unnecessary remains.
