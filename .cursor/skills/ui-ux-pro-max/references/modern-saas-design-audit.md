---
name: modern-saas-design-audit
description: "Reference guide for Modern SaaS Design Audit"
encoding: "UTF-8"
---

# Modern SaaS Design Audit
## Purpose
Perform a focused visual audit, UX review, and design QA pass of the selected product screens, flows, states, or visual references.
Act as a **senior product designer and senior UI/UX designer** reviewing a modern software product.
Evaluate whether the experience is clear, intentional, efficient, cohesive, high-craft, mature, production-ready, easy to understand, appropriate for its users, and consistent with excellent contemporary software design.
Use the visible design as the **primary source of truth**.
Do not assume hidden functionality unless it is visible, explicitly described, or strongly implied by an established interaction pattern.
When something cannot be verified, say so rather than inventing behavior.
# 1. Start with a short audit plan
Before detailed feedback, briefly identify:
- screens, flows, states, and viewport sizes available
- major components and recurring patterns
- likely UX and visual-design focus areas
- what can and cannot be evaluated
- what “reviewed properly” means for this specific design
Keep this short. The purpose is to make the audit systematic rather than reactive.
# 2. Understand the product before critiquing it
For each major screen or flow, infer:
- what it represents and who the likely user is
- the user's primary goal and primary action
- important secondary actions
- primary versus supporting information
- how the screen relates to the wider product
- whether it appears optimized for occasional, frequent, or power users
- what cannot be confidently determined
Do not criticize an interface merely because it differs from another product. First determine whether it supports its own purpose.
# 3. Review every meaningful visible screen and state
For each meaningful screen, state, or variation, identify:
- what is shown and what the user appears to be accomplishing
- major components present
- what works well
- what feels weak, unfinished, inconsistent, confusing, unrefined, or unnecessary
- what may be missing
- what cannot be verified visually
Review relevant navigation, headers, toolbars, tables, lists, cards, forms, search, filters, tabs, actions, menus, dialogs, panels, popovers, visualizations, empty states, statuses, builders, settings, onboarding, and detail/master-detail views.
Never give vague feedback such as “make it cleaner,” “improve spacing,” “improve hierarchy,” or “make it more modern.”
For every issue, explain **where it occurs, why it matters, and what specifically should change**.
# 4. Audit product architecture and information hierarchy
Evaluate:
- navigation against the product mental model and current-location clarity
- parent/child and page hierarchy
- grouping of related information and separation of unrelated information
- primary focal point and primary/secondary/tertiary hierarchy
- whether important information is buried or secondary content competes with it
- whether actions sit close to the objects they affect
- whether complexity appears at the correct time
- whether progressive disclosure is effective
Identify unnecessary layers of navigation, panels, containers, or abstraction.
Also identify oversimplification that removes useful context.
# 5. Audit task clarity and workflow UX
Determine whether users can understand:
- what they are looking at, what they can do, and what they should do next
- what has already happened and what happens after an action
- editable versus read-only information
- reversible versus destructive actions
- save state and confirmation behavior where visible
Review primary, secondary, destructive, bulk, contextual, and inline actions; creation/editing flows; selection; filtering; search; sorting; save/cancel; and multi-step workflows.
Flag visual treatments that falsely imply interaction, and interactive controls that do not look interactive.
# 6. Audit visual hierarchy
Review titles, labels, metadata, values, action hierarchy, typography weight, contrast, scale, spacing, grouping, alignment, position, color emphasis, and surface treatment.
Ask:
- What does the eye notice first, and should it?
- Are too many elements competing?
- Are important elements understated?
- Are unimportant elements dominant?
- Is hierarchy structural or mostly decorative?
Prefer hierarchy created through **layout, typography, spacing, and contrast** over excessive cards, shadows, color, or decoration.
# 7. Audit layout, spacing, and alignment
Review outer margins, section spacing, component gaps, internal padding, vertical/horizontal rhythm, grid, columns, content widths, baselines, control heights, and repeated spacing values.
Look for arbitrary spacing, near-miss alignments, inconsistent padding, unbalanced compositions, excessive/insufficient whitespace, dense areas without structure, sparse areas that waste space, and elements floating without relationships.
Determine whether spacing is systematic or manually adjusted screen by screen.
# 8. Audit density and visual economy
High-quality SaaS should maximize **information clarity per unit of visual complexity**, not merely maximize whitespace.
Check whether content is too compressed or spread out, whether every item needs a card, whether nested containers are overused, whether borders do structural work, whether metadata can be more compact, whether controls can be contextual, whether secondary chrome can be reduced, and whether repeated labels add value.
Look specifically for **card proliferation**.
Prefer spacing, alignment, dividers, typography, subtle background shifts, columns, and indentation when they communicate structure more efficiently.
# 9. Audit typography
Evaluate font choice, readability, type scale, weights, line height, letter spacing, text color, heading/label/metadata hierarchy, numeric styling, code/monospace use, truncation, wrapping, and long-content handling.
Look for too many sizes/weights, weak hierarchy, low-contrast text, tiny metadata, oversized headings, marketing typography inside functional UI, inconsistent labels, and excessive bold text.
Typography should feel structured, calm, and highly legible.
Inter, Geist, SF Pro, and similar high-legibility grotesk/geometric sans-serif systems are useful reference points. Do not recommend a typeface change without a meaningful reason.
# 10. Audit color, contrast, surfaces, and depth
Evaluate background/surface hierarchy, text contrast, muted text, accent usage, semantic colors, selected/hover/focus/disabled states, success/warning/error/destructive states, and visualization colors where visible.
Ask whether color communicates meaning, too many accents compete, semantic colors are consistent, muted content remains legible, active states are clear, and the primary accent is overused.
For dark mode, evaluate tonal layering rather than treating black backgrounds as inherently modern.
Review 1 px borders, dividers, panel boundaries, shadows, elevation, overlays, floating surfaces, and radius consistency.
Flag borders around everything, bright borders, heavy shadows, inconsistent elevation, arbitrary surfaces, merged panels, unnecessary separation, and decorative depth without hierarchy.
# 11. Audit component quality and consistency
Treat repeated interface patterns as a design system.
Compare buttons, icon buttons, inputs, selects, search, tabs, cards, tables, rows, tags, statuses, menus, tooltips, popovers, dialogs, navigation, icons, and empty states.
Look for different heights/radii without purpose, inconsistent icon size/stroke, duplicate controls, equivalent actions treated differently, inconsistent spacing, and one-off styling.
Classify inconsistency as **intentional**, **context-dependent**, **accidental**, or **systemic**.
Call out systemic inconsistency separately from isolated polish.
# 12. Audit actions and navigation
For actions, assess prominence, placement, labels, grouping, size, consistency, and icon use.
Flag competing primary actions, excessive visible actions, text buttons that look like labels, ambiguous icon-only controls, over-prominent destructive actions, and actions located far from the content they affect.
Prefer contextual actions when permanent visibility creates noise.
For navigation, assess primary/secondary navigation, sidebars, tabs, breadcrumbs, page headers, search/command navigation, context switching, selected states, discoverability, depth, repetition, and nesting.
For power-user products, recommend keyboard/search/command navigation only when it meaningfully reduces overhead.
Do not recommend a command palette simply because modern products use one.
# 13. Audit tables, lists, forms, search, and filters
### Tables and lists
Review column hierarchy, row density, alignment, numeric alignment, headers, sorting, filtering, search, selection, bulk actions, row actions, pagination, statuses, long/empty values, truncation, clickability, and sticky behavior where relevant.
Determine what should be primary, secondary, metadata, or hidden until needed.
### Forms and configuration
Review label clarity, grouping, required/optional fields, helper text, validation, widths, defaults, advanced settings, dependencies, save/cancel, error recovery, and progressive disclosure.
Where useful, separate essential, optional, advanced, and system-managed information.
### Search and filters
Review placement, scope, discoverability, active-filter clarity, clearing, saved filters, sorting, result counts, and no-results feedback.
Users should understand what is being searched, what is filtered, and how to return to an unfiltered state.
# 14. Audit interaction efficiency and progressive disclosure
For frequent/advanced users, evaluate keyboard shortcuts, command palettes, quick search, inline editing, context menus, hover-revealed controls, multi-select, bulk actions, drag-and-drop, quick-create, shortcut hints, recent items, optimistic interactions, and persistent preferences.
Linear, Raycast, Superhuman, Cursor, Warp, and Notion are useful references for efficiency, not mandatory patterns.
Efficiency must not destroy discoverability.
Ask whether secondary actions can become contextual, advanced settings can collapse, metadata can appear only when relevant, selection/hover can reveal controls, important information is hidden too aggressively, or common actions are buried.
# 15. Audit states, feedback, empty states, and recovery
Check visible states and identify important unseen states requiring verification: default, hover, focus, active, selected, pressed, disabled, loading, saving, saved, success, error, warning, validation, empty/no-results, partial/missing data, read-only/editing, unsaved, offline, permission-restricted, and destructive confirmation.
Do **not** claim a state is missing merely because it is not shown.
Use **Cannot verify from supplied design** where appropriate, then identify which unseen states should be checked before production.
Empty states should explain the area, why it is empty where useful, and provide a relevant next action without unnecessary decoration.
For possible failures, assess whether the design explains what went wrong, why, what the user can do next, and whether work was preserved.
# 16. Audit accessibility-relevant decisions
Perform only visual accessibility checks supported by the design.
Review text/control contrast, color-only communication, focus visibility where shown, control size, text size, icon/label clarity, disabled contrast, and dense interaction targets.
Distinguish:
- **Visible accessibility concern**
- **Potential accessibility concern**
- **Cannot verify without implementation**
Never claim technical accessibility compliance from static design alone.
# 17. Audit responsiveness and motion only where evidence exists
If multiple viewport sizes are provided, review layout adaptation, navigation changes, prioritization, table/panel behavior, overflow, modal sizing, touch targets, and collapse patterns.
If only one viewport is shown, state: **Responsive behavior cannot be verified from the supplied design.**
When motion is visible or described, evaluate timing, easing, hover response, selection feedback, loading transitions, panel/menu transitions, drag behavior, and state changes.
Motion should support orientation, continuity, feedback, and hierarchy rather than decoration.
# 18. Audit contemporary SaaS craft
Evaluate execution quality using products such as Linear, Raycast, Vercel, Notion, Replicate, Resend, Supabase, Railway, Neon, Clerk, Cursor, Warp, Superhuman, and Notion Calendar as reference points.
Do **not** judge visual similarity.
Compare precision, restraint, hierarchy, density, typography, alignment, surface treatment, interaction feedback, keyboard efficiency, visual consistency, component quality, contextual actions, progressive disclosure, micro-interactions, perceived speed, product personality, and attention to detail.
A product can use a completely different visual language and still meet the quality bar.
# 19. Evaluate developer-tool aesthetics only where relevant
If the product intentionally uses a modern developer-tool/high-craft SaaS direction, evaluate whether it convincingly handles deep neutral dark modes, subtle 1 px borders, low-contrast layering, restrained palettes, limited accent color, radial/spotlight gradients, soft glows, legible sans-serif typography, compact layouts, geometric alignment, monochrome icons, contextual controls, command navigation, keyboard-first interaction, and refined micro-interactions.
These are **design tools, not requirements**.
Do not recommend glow, gradients, dark mode, borders, or command palettes merely to make a product appear modern.
# 20. Detect template SaaS, over-design, and under-design
### Template SaaS
Flag generic patterns only when they fail the product: generic dashboard cards, excessive rounded containers, identical card treatments for unrelated information, oversized titles, default-library spacing, repetitive icon-heading-description blocks, unnecessary gradients, empty panels, repeated three-column layouts, decorative statistics, excessive pills, generic AI sparkles, floating-card overload, or polish masking weak hierarchy.
### Over-design
Look for excessive borders, nested surfaces, shadows, gradients, glows, accents, badges, icons, animations, visible actions, radius variation, or decoration competing with content.
High-craft design should feel **controlled rather than impressive for its own sake**.
### Under-design
Look for equal visual weight everywhere, weak hierarchy, poor alignment, undifferentiated surfaces, bare text without structure, weak feedback, weak selected states, generic defaults, inconsistent spacing, or flatness where subtle depth would improve comprehension.
Minimalism is not the absence of design.
# 21. Identify systemic issues
Do not treat every issue independently.
Look for repeated root causes such as spacing inconsistency, card overuse, weak hierarchy, inconsistent actions or metadata, repeated low contrast, inconsistent panel architecture, excessive persistent actions, weak table density, or inconsistent selected states.
When several symptoms share a root cause, identify the **systemic issue** and change the underlying rule rather than patching every instance.
# 22. Classify issues correctly
Use these categories:
- **Product / workflow issue** — interaction model, task structure, or information architecture.
- **UX clarity issue** — intended behavior is not communicated clearly.
- **Design-system issue** — repeated components/rules are inconsistent.
- **Visual hierarchy issue** — correct information exists but is emphasized incorrectly.
- **Visual polish issue** — structure is sound but execution needs refinement.
- **Missing-state issue** — an important state needs consideration or verification.
Never recommend visual polish as the fix for a structural UX problem.
# 23. Be evidence-based
Use labels when useful:
- **Verified from design**
- **Strong inference**
- **Likely issue**
- **UX concern**
- **Visual design issue**
- **Design-system issue**
- **Potential missing state**
- **Cannot verify from design**
- **Needs product/design decision**
- **Needs implementation verification**
Do not state uncertain conclusions as fact. Label significant judgment calls.
# 24. Make every recommendation actionable
Every meaningful issue must include:
**Location** — where it occurs.
**Issue** — what is wrong or potentially weak.
**Why it matters** — usability, hierarchy, consistency, accessibility, efficiency, or quality impact.
**Recommended fix** — exactly what should change.
**Severity** — Critical / High / Medium / Low.
**Confidence** — High / Medium / Low.
Avoid “Improve spacing.”
Prefer: “Reduce the vertical gap between the page header and filter toolbar so they read as one functional header region. The current separation makes the filters appear detached from the content they modify.”
# 25. Severity model
### Critical
Only for a blocked core task, severe ambiguity, hidden essential functionality, serious destructive-action risk, major accessibility/usability blocker, or fundamentally incomplete experience.
### High
For major task friction, obscured important information, substantial hierarchy problems, major interaction inconsistency, unresolved important state, or meaningfully reduced confidence.
### Medium
For noticeable friction, weak scanability, inconsistency, reduced system cohesion, unnecessary cognitive load, unfinished craft, or issues that should be resolved before handoff.
### Low
For minor polish, consistency, alignment, spacing, or craft improvements without material impact on task completion.
Do not inflate severity because an issue is visually noticeable.
# 26. Prioritize high-leverage improvements
Prioritize in this order:
1. Structural workflow problems.
2. Information architecture.
3. Interaction clarity.
4. Systemic design-system inconsistencies.
5. Hierarchy and density.
6. Important missing states.
7. Visual refinement.
8. Micro-polish.
Do not produce a long list of tiny polish items while major structural problems remain.
# 27. Final Design Audit Report
End with this structure.
## 1. Audit scope
Summarize screens, flows, states, components, evaluable areas, and important limitations.
## 2. Product understanding
Briefly describe the product, visible user goals, apparent interaction model, and important assumptions.
## 3. Overall assessment
Give a direct senior-level assessment of usability, information architecture, interaction clarity, visual hierarchy, density, design-system consistency, visual craft, contemporary SaaS quality, completeness, and production readiness.
Include only meaningful **Biggest strengths** and **Biggest weaknesses**. Avoid generic praise.
## 4. Highest-leverage issues
Identify the **3–7 issues that matter most**. For each include Location, Issue, Why it matters, Recommended fix, Severity, and Confidence.
## 5. Detailed issues
Group remaining findings only under categories that contain meaningful issues: Product/workflow, Information architecture, UX/interaction, Visual hierarchy, Layout/spacing, Density, Typography, Color/contrast, Components, Navigation, Tables/lists, Forms, Search/filters, Interaction efficiency, Design-system consistency, States, Accessibility, or Visual polish.
Do not create empty sections.
## 6. Systemic design issues
For each repeated pattern explain what repeats, where, why it is systemic, the underlying rule to change, and which issues that change would resolve.
## 7. Contemporary SaaS craft assessment
Rate and explain Precision, Hierarchy, Density, Typography, Surface treatment, Interaction quality, Component consistency, Progressive disclosure, Perceived efficiency, Product personality, and Overall refinement.
Do not score based on visual similarity to reference brands.
Explain where the interface feels sophisticated and where it remains generic, unfinished, template-driven, over-designed, or under-designed.
## 8. Prioritized recommendations
Organize into **Critical fixes**, **High-priority fixes**, **Medium-priority improvements**, and **Low-priority polish**. Keep every item directly implementable.
## 9. Quick wins
List a small number of relatively low-effort changes with high usability/visual impact that do not require major product decisions.
## 10. What cannot be verified
List only relevant unknowns such as hover/focus, keyboard navigation, menus, search, validation, errors, loading, save behavior, permissions, responsive behavior, motion, realistic data behavior, performance, or technical accessibility.
## 11. Judgment calls
For significant assumptions include Judgment, Reasoning, Confidence, and whether it should be reviewed before implementation.
## 12. Final status
Finish with **exactly one**:
### Ready
Visible experience appears complete, coherent, high-quality, and no meaningful issues remain.
### Ready with notes
Experience is fundamentally strong and could proceed, but minor improvements remain.
### Needs follow-up
Meaningful UX, hierarchy, consistency, completeness, or design-quality issues should be addressed.
### Not ready
Significant unresolved structural, interaction, consistency, or completeness problems remain.
Be strict. Do not mark **Ready** unless important areas are visible, coherent, and sufficiently verified.
# 28. Optional: apply safe improvements
If direct design editing is available, complete the audit **before** applying changes.
Safe corrections include obvious alignment/spacing errors, typography inconsistencies, obvious component mismatches, border/divider inconsistencies, minor contrast corrections, accidental visual mismatches, and repeated system inconsistencies where the intended pattern is unambiguous.
Do **not** automatically change product architecture, core workflows, navigation structure, information architecture, major interaction patterns, destructive behavior, ambiguous content hierarchy, product terminology, or anything requiring a product decision.
For every applied correction, report what changed, where, why, which audit issue it resolves, and whether further review is required.
If a recommendation requires product or UX judgment, leave it as a recommendation rather than silently implementing it.
