---
description: "Advanced UI/UX improvements — layout, design critique, copy refinement, interaction design, accessibility, design systems, and responsive patterns. Use when the user wants professional-grade UI/UX upgrades. Triggers: ui, ux, design, layout, responsive, giao diện, thiết kế, cải thiện UI, bento grid, typography, type scale, wcag, accessibility, tokens, shadcn, state matrix, empty state, anti slop, microcopy."
encoding: "UTF-8"
agents: [frontend-specialist, performance-optimizer]
---

Canonical source: .kiro/skills/ui-ux-pro-max/SKILL.md

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check design system, brand guidelines, component library, past UI decisions, accessibility notes, and responsive design patterns.
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: UI/UX changes, patterns used, a11y improvements, and brand consistency notes.

## Goal
Upgrade the product experience with clear, practical, accessible, and high-performance UI/UX improvements using a unified progressive-disclosure knowledge base referencing original specialized guides.

## Agent Routing
- Primary → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- For performance of UI (load time, animations) → read `.kiro/skills/agents/agents/performance-optimizer.md` and apply its knowledge
- For accessibility compliance → apply WCAG knowledge from frontend-specialist
- For mobile responsiveness → apply mobile patterns from frontend-specialist

## Socratic Gate
Before improving UI/UX, verify:
1. What screen, flow, or component is being improved?
2. What is the current pain point? (visual, usability, accessibility, performance?)
3. Are there existing design guidelines or component library?
If any answer is unclear, ASK before proceeding.

## Reference Routing Index
When addressing specific UI/UX domains, consult the corresponding original guides in `references/`:

### 1. Design Philosophy, Anti-Slop & Creative Direction
- `references/anti-ui-slop.md` — Extract design DNA, avoid generic AI slop and predictable SaaS patterns.
- `references/subtractive-design.md` — Eliminate unnecessary decoration, containers, and visual noise.
- `references/better-interface.md` — Core interface affordances and visual clarity principles.
- `references/modern-saas-design-audit.md` — Auditing SaaS interfaces against contemporary web standards.
- `references/structured-saas-dev-tool-ui.md` — High-density, developer-focused UI layouts and ergonomics.
- `references/senior-design-review.md` & `references/design-critique-ai-design-reviewer.md` — Systematic critique frameworks.

### 2. Typography & Hierarchy
- `references/type-scale.md` & `references/make-a-type-scale.md` — Mathematical modular type scales (Major Third / Perfect Fourth).
- `references/font-pairings.md` — Curated typographic pairings, body/display contrast ratios.

### 3. Colors, Tokens & Theming
- `references/shadcn-theme-variables.md` & `references/shadcn-component-structure.md` — CSS variable theming and Shadcn/Tailwind conventions.
- `references/token-coverage.md` & `references/import-tokens.md` — Token taxonomy, surface/foreground pairs.
- `references/build-a-variable-library.md` & `references/apply-color-variables.md` — Design system variable architectures.
- `references/dark-mode-converter.md` — Light/dark theme mirroring, elevation, and contrast preservation.
- `references/wcag-palette.md` — Accessible palette generation meeting WCAG contrast thresholds.

### 4. Layout, Bento Grid & Responsive Design
- `references/bento-grid-layout.md` & `references/bento-board-ui.md` — Content-led Bento Grid layouts with zero-crop hero detection.
- `references/responsive-design.md` & `references/responsive-design-checker.md` — Viewport fluidity, container widths, breakpoints.
- `references/responsive-breakpoint-adapter.md` & `references/mobile-breakpoint.md` — Mobile-first adaptation rules.
- `references/desktop-to-mobile.md` — Converting complex desktop views into clean mobile stacks.
- `references/container-layout-normalizer.md` & `references/spacing-audit.md` — 4px/8px rhythm normalization.
- `references/fluid-design.md` — Modern CSS clamp() and fluid sizing.

### 5. Component Architecture & State Coverage
- `references/state-matrix-generator.md` — Deterministic state matrix generation for components.
- `references/empty-loading-error-state-generator.md` & `references/empty-state-generator.md` — Full coverage for empty and async states.
- `references/generate-8-states.md` — Enforcing the 8 fundamental states (Default, Hover, Active, Focus, Loading, Disabled, Error, Empty).
- `references/state-coverage-flow-audit.md` & `references/ui-state-expander.md` — Validating state transition coverage across user journeys.
- `references/component-audit.md` & `references/component-quality-review.md` & `references/lean-components-review.md` — Component reusability and surface reviews.

### 6. Accessibility (WCAG 2.2 Level AA)
- `references/wcag-2-2-web.md` — Definitive WCAG 2.2 Level AA requirements for web prototypes and code.
- `references/a11y-wcag-fixer.md` & `references/a11y-quickcheck.md` — Rapid remediation of common accessibility defects.
- `references/accessibility-checker.md` & `references/accessibility-review.md` — Audit checklists for keyboard, focus, and contrast.
- `references/accessible-ux-writing.md` — Screen-reader-friendly microcopy and descriptive links.
- `references/ai-a11y-toolkit-wcag-22-aa.md` & `references/annotate-aria-landmarks.md` — Proper landmark, region, and role annotations.

### 7. Forms, Usability, Tables & Micro-copy
- `references/form-audit.md` — Form structural analysis (labels, inline validation, layout ordering, required marks).
- `references/ux-audit.md` & `references/saas-ux-review.md` — Comprehensive heuristic usability evaluation.
- `references/micro-copy-polisher.md` & `references/stress-test-copy.md` — Clear, actionable, non-blaming UI copy.
- `references/checkout-ux-review.md` & `references/signup-flow-review.md` — High-conversion, low-friction onboarding and checkout flows.
- `references/button-size-check.md` — Touch target compliance (minimum 44x44px touch targets).
- `references/ui-consistency-checker.md` — Cross-screen design alignment and style drift detection.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for design history and UI patterns.
2. Identify the target screen, component, or user flow being improved.
3. Consult the appropriate detailed reference files in `references/` via the Reference Routing Index above.
4. Evaluate hierarchy, spacing, contrast, accessibility, states, feedback, and conversion friction.
5. Recommend concrete improvements with rationale.
6. When asked to implement, favor polished, intentional, and maintainable UI code.
7. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` and verify all states and accessibility.
8. **Update Memory** — Save UI/UX decisions and patterns to `.ai-memory.md`.

## Output Format
- UX issues found
- Visual & layout issues found
- Recommended changes (prioritized)
- Accessibility notes (WCAG 2.2 AA compliance)
- Component states covered (Default, Loading, Empty, Error, Hover, Focus, Active, Disabled)
- Implementation plan and code changes

## Checklist
- [ ] Target screen/component identified
- [ ] Relevant `references/*.md` guide consulted
- [ ] Hierarchy and spacing evaluated (4px/8px rhythm)
- [ ] Accessibility checked (WCAG 2.2 AA, 4.5:1 contrast, :focus-visible)
- [ ] All 8 states covered (empty, loading, error, success, hover, focus, disabled, active)
- [ ] Mobile responsiveness considered (Breakpoints & 44px touch targets)
- [ ] Performance impact assessed
- [ ] Brand consistency maintained
- [ ] Memory file updated

- [ ] Clean code chuẩn (Standard clean code applied)
- [ ] Cập nhật đầy đủ tất cả các file liên quan (All related files fully updated)
- [ ] Cấm màu gradient (No gradient colors — solid/flat colors only)
- [ ] Cấm icon màu (No colored icons — monochrome / single-color only)

## Rules
- Optimize for clarity before decoration.
- Respect existing brand and component patterns when present.
- Include empty, loading, error, and success states when relevant.
- Avoid widespread redesigns unless asked; prioritize small, safe diffs and ASK before large UI rewrites.
- Always read and update the memory file.
- **Quy luật bắt buộc (Mandatory Rules):**
  - **Cấm màu gradient:** Tuyệt đối KHÔNG sử dụng màu gradient (`linear-gradient`, `radial-gradient`, `conic-gradient`, CSS gradient generator, v.v.). Chỉ sử dụng màu đơn sắc, màu phẳng (solid / flat colors) để đảm bảo tính tối giản, tương phản rõ ràng và tính nhất quán cao.
  - **Cấm icon màu:** Tuyệt đối KHÔNG sử dụng icon nhiều màu sắc (multicolor), icon 3D tô màu hoặc emoji màu trong giao diện UI. Chỉ sử dụng icon đơn sắc (monochrome / single-tone icons), đồng bộ với màu text hoặc màu chủ đạo của hệ thống qua `currentColor` hoặc mã màu đơn sắc được quy định.

## Related Skills
- `/create` → read `.kiro/skills/create/SKILL.md` — Implement UI components
- `/preview` → read `.kiro/skills/preview/SKILL.md` — Preview design before implementation
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — Improve existing UI code

## Encoding
All code snippets and example files referenced or produced by this skill must be UTF-8 encoded. When applicable, include `encoding: "UTF-8"` in SKILL.md front-matter and ensure saved files use UTF-8 (no BOM).
