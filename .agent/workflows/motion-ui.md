---
description: "Advanced Motion UI (AMUI) — Create clean, modern UI with subtle Framer Motion micro-interactions, clear states, and smooth animations"
agents: [frontend-specialist]
---

> **Canonical source**: `.kiro/skills/motion-ui/SKILL.md` — read it for full workflow details.

## Memory Protocol
**START**: Read `.ai-memory.md` for design tokens, motion patterns, animation conventions. **END**: Update with motion patterns used, components created, and accessibility notes.

## Steps
1. 🤖 **Agent**: Applying @frontend-specialist knowledge
2. **Read Memory** — Load `.ai-memory.md`
3. **Socratic Gate** — Ask if unclear: What component/page needs motion UI? What states to show? Existing design tokens?
4. **Set up design tokens** if not present (CSS variables for colors, timing, easing)
5. **Implement component** with all required states (idle/hover/active/loading/success/error/disabled)
6. **Add Framer Motion animations** following AMUI patterns:
   - Enter: opacity 0→1, y 8→0, duration 0.18-0.28s easeOut
   - Exit: opacity 1→0, y 0→-10, duration 0.16-0.24s easeIn
   - Button micro-interactions: whileHover scale 1.015, whileTap scale 0.975
7. **Ensure accessibility**: aria attributes, focus management, prefers-reduced-motion support
8. **Test all states**: idle, hover, active, loading, success, error, disabled
9. **Update Memory** — Save motion patterns and tokens to `.ai-memory.md`

## Design Principles (AMUI)
1. **Clarity-first**: States always clear (idle/hover/active/loading/success/error/disabled)
2. **Motion with purpose**: Animation guides attention, shows system response, reduces jarring changes
3. **Subtle micro-interactions**: Hover scale 1.01-1.02, tap scale 0.97-0.98
4. **Immediate feedback**: Validation/submit shows loading + success (green check) + error (alert)
5. **Brand ambient layer** (optional): Gradient + blur orbs + dot grid for auth/landing pages

## Motion Rules
- **Small transitions**: 120-180ms
- **Enter/exit**: 180-240ms
- **Page transitions**: 240-320ms
- **Easing**: easeOut for enter, easeIn for exit
- **Layout stability**: Use AnimatePresence, maintain widths, smooth height changes

## Component Patterns
- **AMUI Button**: 3 sizes, 5 states, optional icons, motion micro-interactions
- **AMUI Input**: Label + hint + error, focus ring, validation states
- **AMUI Alert/Toast**: Success/error/warning/info variants with animation
- **AMUI Success Check View**: Large check icon + text, scale-in animation
- **AMUI Card/Panel**: Subtle shadow, border, hover lift effect
- **AMUI Modal/Dialog**: Backdrop fade, content fade + scale

## Checklist
- [ ] Component/page identified
- [ ] Design tokens defined (colors, timing, easing)
- [ ] All states implemented
- [ ] Framer Motion animations added
- [ ] Micro-interactions on buttons
- [ ] AnimatePresence for conditional UI
- [ ] Layout shift prevention
- [ ] Accessibility: aria attributes, focus management
- [ ] prefers-reduced-motion support
- [ ] Color contrast verified (WCAG AA)
- [ ] Memory updated

## Related: `/create`, `/ui-ux-pro-max`, `/enhance`
