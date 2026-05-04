---
description: "Advanced Motion UI (AMUI) — Create clean, modern UI with subtle Framer Motion micro-interactions, clear states (idle/loading/success/error), consistent styling via design tokens, and smooth animations. Use when the user wants motion-rich, polished UI with micro-interactions. Triggers: motion, animation, framer motion, micro-interaction, smooth ui, amui, chuyển động, hiệu ứng mượt."
encoding: "UTF-8"
agents: [frontend-specialist]
---

Canonical source: .kiro/skills/motion-ui/SKILL.md

## Memory Protocol
**START**: Read `.ai-memory.md` from project root. Check design tokens, motion patterns, component library, animation conventions, and accessibility settings (prefers-reduced-motion).
**END**: Update `.ai-memory.md` using **Memory Compaction Rules** with: motion patterns used, components created, animation decisions, and accessibility notes.

## Goal
Create a clean, modern UI with subtle Framer Motion micro-interactions, clear states (idle/loading/success/error), and consistent styling via CSS variables/tokens. Motion should be purposeful, smooth, and enhance user experience without being distracting.

## Design Philosophy (AMUI Principles)

### 1. Clarity-First
- States are always clear: idle / hover / active / loading / success / error / disabled
- Visual feedback for every interaction
- No ambiguous UI states

### 2. Motion with Purpose
Animation is not decoration, but serves to:
- Guide user attention
- Show system response
- Reduce jarring/abrupt UI changes
- Provide feedback and context

### 3. Subtle Micro-Interactions
- Hover: scale 1.01–1.02
- Tap/Active: scale 0.97–0.98
- No excessive bounce or dramatic effects
- Keep it elegant and professional

### 4. Immediate Feedback
- Validation shows instantly
- Submit actions show loading state
- Success shows with green check animation
- Errors show with alert animation

### 5. Brand Ambient Layer (Optional)
- Gradient backgrounds with blur orbs
- Dot grid patterns
- Subtle noise textures
- Use sparingly for auth/landing/empty states

## Technical Stack

### Required
- **Framer Motion** (`motion`, `AnimatePresence`) for smooth transitions
- **CSS Variables** for design tokens (colors, spacing, timing)
- **Tailwind CSS** or global CSS for styling

### Recommended
- **Lucide Icons** for clean, consistent iconography
- **TypeScript** for type-safe components

## Design Tokens System

### Surface Colors
```css
--c-bg: /* main background */
--c-surface: /* card/panel background */
--c-surface-2: /* hover surface */
```

### Border Colors
```css
--c-border: /* default border */
--c-border-strong: /* focus/active border */
```

### Text Colors
```css
--c-text-1: /* primary text */
--c-text-2: /* secondary text */
--c-text-3: /* muted text */
--c-text-4: /* disabled text */
```

### Semantic Colors
```css
--c-success: /* success text/icon */
--c-success-bg: /* success background */
--c-success-bd: /* success border */

--c-danger: /* error text/icon */
--c-danger-bg: /* error background */
--c-danger-bd: /* error border */

--c-warning: /* warning text/icon */
--c-warning-bg: /* warning background */
--c-warning-bd: /* warning border */
```

### Motion Timing
```css
--t-fast: 120ms;
--t-med: 180ms;
--t-slow: 260ms;
--ease-smooth: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Motion Rules

### Durations & Easing
- **Small transitions** (hover, focus): 120–180ms
- **Enter/exit animations**: 180–240ms
- **Page/section transitions**: 240–320ms
- **Easing**: `easeOut` for enter, `easeIn` for exit

### Pattern 1: Fade + Slide (Standard Entry)
```jsx
// Enter animation
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.24, ease: "easeOut" }}

// Exit animation
exit={{ opacity: 0, y: -10 }}
transition={{ duration: 0.18, ease: "easeIn" }}
```

### Pattern 2: Layout Shift Prevention
- Use `AnimatePresence` for conditional rendering
- Use `layout` prop for smooth layout changes
- Animate height changes smoothly (0 → auto)
- Prevent layout jumps during loading states

### Pattern 3: Button Micro-Interactions
```jsx
<motion.button
  whileHover={{ scale: loading ? 1 : 1.015 }}
  whileTap={{ scale: loading ? 1 : 0.975 }}
  transition={{ duration: 0.12 }}
>
```

**Rules:**
- Disabled buttons: no scale, reduced opacity, cursor not-allowed
- Loading buttons: maintain width, show spinner, disable interactions

## State System

### Form States
1. **idle** — Initial state, ready for input
2. **editing** — User is interacting
3. **submitting** — Loading, processing request
4. **success** — Action completed successfully
5. **error** — Action failed, show error message

**Display Rules:**
- `submitting`: disable inputs + button, show spinner, text "Processing..."
- `error`: show alert with icon + message, animate expand/collapse
- `success`: show green check icon panel, animate scale-in, auto-redirect

### Input Validation States
1. **default** — No validation shown
2. **focus** — User is typing
3. **valid** — Input passes validation (optional green border/check)
4. **invalid** — Input fails validation (red border + error message)

**UX Rules:**
- Only show "invalid" after user interaction (touched) or submit attempt
- Show "valid" state subtly (optional)
- Error messages animate in/out smoothly

## Component Patterns

### 1. AMUI Button
**Required Features:**
- 3 sizes: sm / md / lg
- 5 states: default / hover / active / loading / disabled
- Optional: leftIcon / rightIcon
- Motion: whileHover scale 1.015, whileTap scale 0.975

**Loading Behavior:**
- Set `aria-busy="true"`
- Disable click events
- Show spinner + text
- Maintain button width (no layout jump)

### 2. AMUI Input
**Required Features:**
- Label + optional hint text
- Error message with animation
- Optional left/right icons
- Focus ring (subtle, using tokens)
- Validation states

**Animation:**
- Error message: expand/collapse with height + opacity
- Focus ring: fade in/out

### 3. AMUI Alert / Toast
**Variants:**
- **Success**: light green bg + green border + check icon
- **Error**: light red bg + red border + alert icon
- **Warning**: light yellow bg + yellow border + warning icon
- **Info**: light blue bg + blue border + info icon

**Animation:**
- Enter: opacity 0→1, y 8→0
- Exit: opacity 1→0, y 0→-10
- Use `AnimatePresence` for mount/unmount

### 4. AMUI Success Check View
**Pattern:**
When action succeeds, transition entire panel to:
- Large check icon in circle
- "Success" heading
- Optional subtext
- Scale-in animation (0.98 → 1) + fade-in

**Example Use Cases:**
- Login success
- Form submission success
- Payment confirmation
- Account creation

### 5. AMUI Card / Panel
**Features:**
- Subtle shadow
- Border using tokens
- Hover state (optional lift effect)
- Smooth transitions

### 6. AMUI Modal / Dialog
**Animation:**
- Backdrop: fade in/out
- Content: fade + scale (0.95 → 1)
- Use `AnimatePresence` for mount/unmount

## Ambient Background Layer

### When to Use
- Auth pages (login, register)
- Onboarding flows
- Empty states
- Dashboard landing pages

### When NOT to Use
- Dense data tables
- Forms with lots of inputs
- Content-heavy pages

### Implementation
```jsx
<div className="ambient-bg">
  {/* Gradient base */}
  <div className="gradient-layer" />
  
  {/* Blur orbs */}
  <motion.div 
    className="orb orb-1"
    animate={{ 
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
  
  {/* Optional: dot grid */}
  <div className="dot-grid" />
</div>
```

**Rules:**
- Large blur radius (100px+)
- Low opacity (0.2–0.5)
- Slow animation (7–12s)
- `pointer-events: none`
- Don't cause eye strain

## Accessibility Requirements

### Motion
- Respect `prefers-reduced-motion` media query
- Disable/reduce animations when user prefers reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Buttons
- `aria-busy` when loading
- `disabled` attribute when disabled
- Clear focus-visible ring
- Keyboard accessible

### Alerts
- Use `role="alert"` for error/success messages
- Ensure screen readers announce state changes

### Color Contrast
- Text on backgrounds must meet WCAG AA (4.5:1 for normal text)
- Test gradients and ambient backgrounds for contrast

## Agent Routing
- Primary → read `.kiro/skills/agents/agents/frontend-specialist.md` and apply its knowledge
- For accessibility → apply WCAG knowledge from frontend-specialist
- For performance → ensure animations don't cause jank

## Socratic Gate
Before implementing Motion UI, verify:
1. What component/page needs motion UI? (button, form, modal, page?)
2. What states need to be shown? (loading, success, error?)
3. Are there existing design tokens or should we create them?
4. Should we use ambient background layer?
If any answer is unclear, ASK before proceeding.

## Workflow
1. **Read Memory** — Load `.ai-memory.md` for design tokens and motion patterns.
2. Identify the component/page to implement.
3. Set up design tokens if not present (CSS variables).
4. Implement component with all required states.
5. Add Framer Motion animations following AMUI patterns.
6. Ensure accessibility (aria attributes, focus management, reduced motion).
7. Test all states: idle, hover, active, loading, success, error, disabled.
8. **Quality Gate** — Read `.kiro/skills/_scripts/checklist.md` for verification.
9. **Update Memory** — Save motion patterns and tokens to `.ai-memory.md`.

## Checklist
- [ ] Component/page identified
- [ ] Design tokens defined (colors, timing, easing)
- [ ] All states implemented (idle/hover/active/loading/success/error/disabled)
- [ ] Framer Motion animations added (fade, slide, scale)
- [ ] Micro-interactions on buttons (whileHover, whileTap)
- [ ] AnimatePresence for conditional UI
- [ ] Layout shift prevention (stable widths, smooth height changes)
- [ ] Accessibility: aria attributes, focus management
- [ ] prefers-reduced-motion support
- [ ] Color contrast verified (WCAG AA)
- [ ] Memory file updated

- [ ] Clean code chuẩn (Standard clean code applied)
- [ ] Cập nhật đầy đủ tất cả các file liên quan (All related files fully updated)

## Rules
- Motion should enhance, not distract.
- Keep animations subtle and purposeful.
- Always provide immediate visual feedback.
- Maintain layout stability (no jumps during loading).
- Respect user motion preferences.
- Use design tokens consistently.
- Test all interactive states.
- Always read and update the memory file.

## Quality Gate
After completing, read `.kiro/skills/_scripts/checklist.md` for cross-cutting quality checks.

## Related Skills
- `/create` → read `.kiro/skills/create/SKILL.md` — Create new motion UI components
- `/ui-ux-pro-max` → read `.kiro/skills/ui-ux-pro-max/SKILL.md` — Advanced UI/UX improvements
- `/enhance` → read `.kiro/skills/enhance/SKILL.md` — Improve existing components with motion

## Example: AMUI Button Component

```tsx
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AMUIButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

export function AMUIButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
}: AMUIButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      className={`amui-btn amui-btn-${variant} amui-btn-${size}`}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      whileHover={{ scale: isDisabled ? 1 : 1.015 }}
      whileTap={{ scale: isDisabled ? 1 : 0.975 }}
      transition={{ duration: 0.12 }}
    >
      {loading && <Loader2 className="amui-btn-spinner" />}
      {!loading && leftIcon && <span className="amui-btn-icon-left">{leftIcon}</span>}
      <span className="amui-btn-text">{children}</span>
      {!loading && rightIcon && <span className="amui-btn-icon-right">{rightIcon}</span>}
    </motion.button>
  );
}
```

## Example: AMUI Success View

```tsx
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface AMUISuccessViewProps {
  title?: string;
  message?: string;
}

export function AMUISuccessView({ 
  title = 'Success!', 
  message 
}: AMUISuccessViewProps) {
  return (
    <motion.div
      className="amui-success-view"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <motion.div
        className="amui-success-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.3, 
          delay: 0.1,
          type: 'spring',
          stiffness: 200
        }}
      >
        <CheckCircle size={48} />
      </motion.div>
      <h2 className="amui-success-title">{title}</h2>
      {message && <p className="amui-success-message">{message}</p>}
    </motion.div>
  );
}
```

## Example: AMUI Alert with Animation

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AMUIAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  visible: boolean;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function AMUIAlert({ type, message, visible }: AMUIAlertProps) {
  const Icon = icons[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`amui-alert amui-alert-${type}`}
          role="alert"
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="amui-alert-icon" size={20} />
          <span className="amui-alert-message">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```
