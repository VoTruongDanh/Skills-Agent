---
name: ai-a11y-toolkit-wcag-22-aa
description: "Reference guide for AI A11y Toolkit"
encoding: "UTF-8"
---

# AI A11y Toolkit

WCAG 2.2 Level AA rules for humans and AI agents building digital experiences.

Written by Dana Randall. Licensed CC BY 4.0, free to use commercially, adapt,
and redistribute, with attribution.

The full reference, all eighteen sections and all 55 Level A and AA criteria:
https://github.com/danarandall/ai-a11y-toolkit
Current release and feedback: https://danarandall.com/ai-a11y-toolkit

Apply the non-negotiables to everything you produce. Follow the directives when you generate code. Report what still needs human and screen reader testing.

## The non-negotiables

These thirteen rules prevent most real-world accessibility failures. They apply to every role, every framework, every deliverable.

1. **Semantics before ARIA.** Use the native HTML element that already has the right role and behavior. `<button>`, `<a href>`, `<input>`, `<select>`, `<nav>`, `<table>`. Only reach for ARIA when no native element exists. The first rule of ARIA is not to use ARIA.
2. **Everything works with a keyboard alone.** Every interactive element is reachable by Tab, operable by Enter or Space, and escapable. No keyboard traps. Test by unplugging the mouse. (2.1.1, 2.1.2)
3. **Focus is always visible.** Never remove focus indicators. Never write `outline: none` without a replacement of equal or better visibility. Focus must not be hidden behind sticky headers, footers, or overlays. (2.4.7, 2.4.11)
4. **Every control has an accessible name.** Icon-only buttons, form fields, links, and inputs all need programmatic names. A visible `<label>` is preferred. If the control has visible text, the accessible name must include that text. (4.1.2, 3.3.2, 2.5.3)
5. **Every non-decorative image has meaningful, informative alt text.** Decorative images get `alt=""`. Never leave `alt` off entirely. Never use a filename, an internal SKU, or a color code. "RD-100" tells a customer nothing; "bright red pebbled leather" tells them what they are choosing. (1.1.1)
6. **Text contrast is at least 4.5:1.** Large text, meaning 24px regular or 18.66px bold and above, may go to 3:1. UI components, icons, borders, focus rings, and chart elements need 3:1. (1.4.3, 1.4.11)
7. **Color is never the only signal.** Errors, states, required fields, availability, chart series, and links inside text blocks all need a second cue: text, icon, underline, shape, or pattern. Roughly 13 million Americans have a color vision deficiency, and a red-only error state is invisible to many of them. (1.4.1)
8. **Heading structure is logical and unskipped.** One `<h1>` per page, descending order, no levels used for visual size. Headings are the primary navigation tool for screen reader users. (1.3.1, 2.4.6)
9. **Text reflows at 200% zoom and 320px CSS width with nothing cut off, truncated, or covered.** No horizontal scrolling for vertical content, no clipped or overlapping text, no fixed pixel heights on text containers, no sticky element covering content at large text sizes. (1.4.4, 1.4.10, 1.4.12)
10. **Motion is user-controlled by default.** Honor `prefers-reduced-motion` automatically, without the user configuring anything in your product. Anything that auto-plays, auto-advances, moves, or scrolls for more than five seconds needs a persistent pause, stop, or hide control. This includes carousels, background video, animated backgrounds, marquees, tickers, and looping GIFs. Nothing flashes more than three times per second. (2.2.2, 2.3.1)
11. **Errors are identified in text, next to the field, and describe the fix.** Not just a red border. Not just a summary at the top. Associate the message programmatically with the input. (3.3.1, 3.3.3)
12. **Interactive targets are at least 44x44 CSS pixels.** 24x24 is the WCAG AA floor and only passes with adequate spacing (2.5.8). 44x44 is Level AAA (2.5.5) and is the house standard here because it is what actually works for tremor, low vision, switch access, and one-handed mobile use. Falling short of 44 is a miss against this house standard, not a Level AA failure.
13. **Dynamic changes are announced.** Anything that updates without a page load, meaning validation, filter results, cart totals, toasts, loading states, needs a live region or focus management. Silent updates do not exist for screen reader users. (4.1.3)

## Working in a design file

A design file settles fewer criteria than most people expect. Three things are
worth getting exactly right in the file, because they are cheap to fix in design
and expensive to fix later: text contrast, non-text contrast, and target size.
Measured across WCAG 2.2 A and AA, those three are what a design kit determines
on its own. It influences fourteen more and cannot affect the remaining
thirty-eight. At Level A it determines none of the thirty-one.

That scope describes a static file, not design as a practice. Reading order,
focus order, heading levels, error copy, alternative text, and state design are
all decided during design work and then implemented in code. Deciding them early
is what prevents rework, and annotating them in the file is what carries them
into the build.

Never state or imply that using a design system makes a product accessible. It
settles a small number of criteria and leaves the rest open. When someone asks
whether a component from a kit is accessible, answer for the criteria the kit can
actually determine and name the ones still open.

## Design systems

The single highest-leverage accessibility decision is not a rule in this file. It is whether you build on a well-tested design system and then use it consistently.

Accessibility defects in a one-off component affect one screen. Accessibility defects in a shared component affect every screen, which sounds worse but is actually the opportunity: fix the component once and every instance inherits the fix. A design system converts accessibility from a per-screen tax into a one-time investment that compounds.

This matters more in AI-assisted work, not less. AI tools default to generating novel, one-off components from scratch, and a from-scratch combobox, dialog, or date picker is where the hardest accessibility bugs live. A design system is the direct antidote: it constrains generation to primitives that already work.

#### 4.1 Do not hand-build the hard components

Some patterns have accessibility requirements complex enough that hand-rolling them is malpractice. Use a tested implementation for:

Dialog and modal, combobox and autocomplete, listbox and custom select, menu and menubar, tabs, disclosure and accordion, tooltip, date picker, slider, tree view, toolbar, carousel, data grid, and toast or notification region.

Each of these has a documented pattern in the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) with a full keyboard interaction model, roles, states, and focus behavior. The APG describes what correct looks like. It is a specification, not a component library, so pair it with an implementation rather than treating its code samples as production-ready.

#### 4.2 How to evaluate an open source system

Popularity is not evidence of accessibility. Use this rubric before adopting.

| Criterion | What to look for | Red flag |
| --- | --- | --- |
| Published conformance | An accessibility conformance report, VPAT, or per-component statement | Marketing copy saying "accessible" with nothing behind it |
| Assistive tech testing | Documented testing with named screen readers and browser pairings | No mention of NVDA, JAWS, VoiceOver, or TalkBack anywhere |
| APG alignment | Explicit references to APG patterns per component | Invented interaction models |
| Documented keyboard model | A key bindings table on each component page | Keyboard behavior left undocumented |
| Focus management | Built-in focus trap, restore, and roving tabindex | You have to wire focus yourself |
| ARIA passthrough | Spreads props, forwards refs, allows `aria-*` overrides | Sealed components you must fork to fix |
| Accessible-name API | Name is a required or strongly encouraged prop on icon-only variants | Icon buttons with no name affordance |
| Contrast-safe theming | Tokens with documented ratios, theming that cannot silently break contrast | Free-form color props with no guardrails |
| Maintenance health | Accessibility issues triaged and closed, recent releases | Open a11y issues sitting for years |
| Governance and license | Clear ownership, permissive license, versioning discipline | Abandoned or single-maintainer with no successor |

Ask for the conformance report specifically. A system that has done the work usually publishes it. [USWDS, for example, publishes an accessibility conformance report using VPAT 2.5 covering 44 assessed components](https://designsystem.digital.gov/documentation/accessibility/).

#### 4.3 Open source systems worth building on

Grouped by what you actually need. None of these makes your product accessible on its own, but all of them start you far ahead of a blank file.

**Headless behavior primitives.** You own all visual design, the library owns keyboard, focus, and ARIA. This is usually the right choice when you have a brand to express.

| System | Notes |
| --- | --- |
| [React Aria and React Aria Components](https://react-spectrum.adobe.com/react-aria/) | Adobe's accessibility-first primitives, the strictest ARIA pattern implementations available, broad component coverage, strong internationalization and touch and screen reader handling. Pick this when conformance is contractual. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | The pragmatic default for React, roughly 28 primitives, excellent docs and DX, the foundation under shadcn/ui. Very good accessibility, slightly less exhaustive than React Aria. |
| [Ariakit](https://ariakit.org/) | APG-focused React primitives with a broad component set and detailed accessibility notes. |
| [Base UI](https://base-ui.com/) | Headless React primitives from the MUI, Radix, and Floating UI maintainers. |
| [Ark UI and Zag.js](https://ark-ui.com/) | State-machine-driven primitives that work across React, Vue, Svelte, and Solid. Useful for multi-framework organizations. |
| [Headless UI](https://headlessui.com/) | Tailwind Labs primitives for React and Vue. Small component set, clean implementation, fine for simpler needs. |

**Complete systems with published accessibility documentation.** Choose these when you want tokens, visual design, patterns, and guidance rather than only behavior.

| System | Notes |
| --- | --- |
| [U.S. Web Design System](https://designsystem.digital.gov/documentation/accessibility/) | Built on Section 508 and WCAG requirements, publishes a VPAT-based conformance report, targets WCAG 2.1 AA and works toward 2.2 criteria. Framework-agnostic HTML and CSS. |
| [GOV.UK Design System](https://design-system.service.gov.uk/accessibility/) | The strongest example of components validated through real user research and assistive technology testing, with published research behind pattern decisions. Read it even if you never use the code. |
| [IBM Carbon](https://carbondesignsystem.com/guidelines/accessibility/overview/) | Mature enterprise system with per-component accessibility documentation and a dedicated accessibility toolkit. |
| [Microsoft Fluent 2](https://fluent2.microsoft.design/) | Broad platform coverage across web, Windows, iOS, and Android with accessibility guidance per component. |
| [Adobe Spectrum](https://spectrum.adobe.com/) and [React Spectrum](https://react-spectrum.adobe.com/) | Spectrum is the design language, React Spectrum the implementation on top of React Aria. |
| [Shopify Polaris](https://polaris.shopify.com/) | Strong content and accessibility guidance alongside components. |
| [GitHub Primer](https://primer.style/) | Documented accessibility per component with a public checklist and review process. |
| [Salesforce Lightning](https://www.lightningdesignsystem.com/) and [Atlassian Design System](https://atlassian.design/) | Large enterprise systems with accessibility guidance and pattern libraries. |

**Framework-agnostic web components.** Useful when multiple stacks must share one system.

[Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/), [Carbon Web Components](https://web-components.carbondesignsystem.com/), and [Shoelace and Web Awesome](https://shoelace.style/) all ship accessible custom elements. Verify how each handles shadow DOM, label association, and form participation, since those are the common failure points in web component accessibility.

**A note on shadcn/ui.** It copies Radix-based component source into your repository rather than installing a dependency. You get full control, and you also own every accessibility bug from the moment you paste it in. You will not receive upstream accessibility fixes automatically. If you use it, treat the copied components as your own code, subject to your own review and testing, and track upstream changes deliberately.

**A note on Material UI and similar.** Widely used is not the same as well tested. Material UI has real accessibility work behind it and also real long-standing gaps, particularly in custom select, autocomplete, and date components under screen readers. If you adopt a large opinionated system, verify the specific components you rely on with your own assistive technology testing rather than trusting the brand.

#### 4.4 Using the system consistently

Adoption without consistency gives you the cost of a design system and none of the benefit. Consistency is itself a WCAG requirement, through Consistent Navigation (3.2.3), Consistent Identification (3.2.4), and Consistent Help (3.2.6).

- **One system per surface.** Do not mix two component libraries in one product. Mixed systems produce conflicting focus behavior, duplicate and contradictory ARIA, competing focus styles, and two different keyboard models for the same interaction. That inconsistency is the accessibility defect.
- **Import, do not recreate.** If the system has a component, use it. A locally rebuilt button, modal, or dropdown is an accessibility regression with a deadline attached.
- **No arbitrary style values.** Style through tokens only. Arbitrary hex values and one-off Tailwind color utilities are how contrast compliance silently degrades. If a needed token does not exist, that is a system request, not a local override.
- **Never override focus styles per instance.** Focus indication belongs to the system. Local overrides are how `outline: none` gets reintroduced.
- **Same component, same name, same behavior everywhere.** A control that means "delete" must look, read, and behave identically across the product. Identical function requires identical labeling (3.2.4).
- **Keep navigation, search, and help in the same relative place** on every page and view (3.2.3, 3.2.6).
- **Pin versions and upgrade on a schedule.** Accessibility fixes arrive in minor releases. A system three years stale is a system that stopped protecting you. Read release notes for a11y fixes specifically.
- **Fix upstream, not locally.** When you find a defect, patch the shared component and let every consumer inherit it. Local workarounds fragment behavior and hide the real bug.
- **Have a contribution path.** If designers and engineers cannot get a new component into the system in reasonable time, they will build one-offs. The governance process is an accessibility control.
- **Document every deviation as debt,** with an owner and a date. Undocumented deviations become permanent.
- **Mirror the system in your design tool.** The Figma library and the code library must share component names, variants, states, and tokens. Divergence between design source and code source is where accessibility intent gets lost in handoff.
- **Include accessibility in the definition of done** for every component, using the checklist below. A component is not shipped until it passes.

#### 4.5 Component definition of done

No component enters the system until all of these are true.

- [ ] Built on a native element or a documented APG pattern
- [ ] Full keyboard operation, with the key bindings documented on the component page
- [ ] Visible focus indicator at 3:1 contrast against adjacent colors, not removable per instance
- [ ] Accessible name required by the API for icon-only and ambiguous variants
- [ ] All states exposed programmatically: expanded, selected, checked, current, pressed, disabled, invalid
- [ ] Focus management specified for open, close, select, submit, and error
- [ ] Hit area at least 44x44 CSS pixels
- [ ] Text contrast 4.5:1 and non-text contrast 3:1 verified in every theme, including dark mode
- [ ] Reflows and remains uncovered at 200% text zoom and 320px CSS width
- [ ] Motion gated behind `prefers-reduced-motion`
- [ ] Any auto-advancing or auto-playing behavior has a persistent pause control
- [ ] `aria-*` props and refs pass through to the underlying element
- [ ] Tested with at least two screen reader and browser pairings, results recorded
- [ ] Automated accessibility check passes in component tests
- [ ] Accessibility notes, including known limitations, published in the component documentation

#### 4.6 Telling AI tools to respect the system

Add this to your project instruction file alongside Section 2 of the full reference. It is the difference between an assistant that extends your system and one that quietly replaces it.

```
DESIGN SYSTEM CONSTRAINTS

- Use the project's existing design system for all UI. Import components from it.
- Never hand-build a dialog, combobox, select, menu, tabs, tooltip, date picker,
  slider, or carousel. Use the system's component or its underlying primitive.
- Never recreate a component that already exists in the system, even if a local
  version would be simpler.
- Style only with the system's design tokens. No arbitrary hex values, no one-off
  color or spacing utilities, no inline styles that bypass tokens.
- Never override focus styles, focus behavior, or keyboard handling at the call site.
- Pass accessible names explicitly for every icon-only control.
- If the system lacks a needed component, say so and propose either a composition of
  existing primitives or a specification for a new system component. Do not silently
  invent one.
- If asked to build outside the system, flag the accessibility and consistency cost
  before proceeding.
- When you do add a component, satisfy the component definition of done in Section 4.5 of the full reference
  and list which items still need human verification.
```

## For designers

You are the earliest point of control in this process. By the time a model is generating markup, most of the decisions that determine whether the result is accessible have already been made or left unmade by you. Karen Hawkins' research finds that around 96 percent of WCAG criteria can be addressed before development begins ([Level Access](https://www.levelaccess.com/blog/play-your-part-role-based-advice-for-agile-accessibility/)). When generation takes ninety seconds, that number tells you something specific about where a designer's leverage sits: almost all of it is upstream of the first line of code.

This section is organized around a different question than the rest of this file. Everywhere else, the question is what the code must do. Here, the question is what you must decide and write down before the code exists.

#### 9.1 Your design scope is a system, not a screen

The most useful reframe I know for this comes from Karen Hawkins, Principal of Accessible Design at Level Access, in her [Accessible Design Framework](https://www.levelaccess.com/blog/introducing-the-accessible-design-framework/). Her argument is that the scope of design is not the human alone. It is a system made of a human plus the technologies that let them do what they came to do. Designers, she observes, are good at considering the human and much weaker at considering the technology.

That gap explains almost every accessibility failure an AI tool produces.

A generation model has exactly one technology in its head: a screen operated by a mouse. It has no representation of a keyboard as a primary input, no representation of a screen reader as an output, no representation of a finger as an imprecise pointer, no representation of a magnifier showing eight percent of the viewport at once. It is not being careless. It is completing the pattern it was trained on, and that pattern assumes your hardware.

When this toolkit was tested by building the same brief twice, once unguided and once with these files installed, every failure in the unguided build was a technology the model never considered. Contrast failures are the screen. Missing focus indicators are the keyboard. Unnamed graphics and absent landmarks are the screen reader. Targets under 24 pixels are the finger. See `research/2-icon-browser/README.md`.

So the discipline is simple to state. For every component you design, walk the technologies. Not the criteria, the technologies. The criteria fall out on their own.

| Technology | The question to ask | What it usually surfaces |
|---|---|---|
| Screen, full sight | Does this read at a glance? | Hierarchy, contrast, density |
| Screen, low vision or magnified | Does this survive 200% zoom and a 320 pixel viewport? | Reflow, truncation, lost context (1.4.4, 1.4.10) |
| Screen, color vision deficiency | Does this still work in grayscale? | Color as the only cue (1.4.1) |
| Keyboard | Can I reach it, see where I am, and get back out? | Focus order, focus visibility, traps (2.1.1, 2.1.2, 2.4.7) |
| Screen reader | What does this announce, and in what order? | Names, roles, states, landmarks, live regions (1.1.1, 4.1.2, 4.1.3) |
| Touch and imprecise pointing | Can I hit it without hitting its neighbor? | Target size and spacing (2.5.8) |
| Voice control | Can I say the label I can see? | Visible label matching accessible name (2.5.3) |
| Switch or other slow input | How many actions does this cost, and is there a time limit? | Timing, redundant steps (2.2.1, 3.3.7) |
| Reduced motion preference | Is the calm version a real design or an afterthought? | Motion policy (2.3.3) |

Run this sweep once per component and you will find more than any scan will.

#### 9.2 The three phases

Hawkins' framework moves each component through three phases of the exchange between a person and their technology: **perceive, understand, operate**. It is a better sequence for design work than the WCAG principle order, because it follows what actually happens to a user in the first two seconds.

Use it as a thinking order, not a checklist.

**Perceive.** Can the person detect that this thing exists, in whatever way they take in information? This covers contrast in every state, not just the resting one. It covers text alternatives. It covers whether the thing is announced at all. A control that is visually beautiful and programmatically silent has failed at perceive for a whole category of user.

**Understand.** Now that they have detected it, do they know what it is, what it does, and what state it is in? This is where labels, names, roles, grouping, instructions, and error copy live. It is also where most AI-generated interfaces quietly fail, because a model will produce a control that looks self-explanatory to a sighted mouse user and communicates nothing to anyone else. An icon-only button is the canonical case: perfectly perceivable, completely opaque.

**Operate.** Can they act on it with the input they have, and recover when it goes wrong? Reachability, target size, focus management, timing, undo, and error recovery.

The reason this ordering earns its place in a file about AI generation is that models fail at these three phases in a predictable ratio. They are decent at perceive, weak at understand, and worst at operate. Understand and operate are also the two phases automated tooling covers least well, which is why they are where expert review and testing with disabled users earn their keep. Spend your own review time accordingly.

#### 9.3 Write the annotation, because the annotation is now the prompt

This is the most important change to how designers work, and it is the part I got wrong for a long time.

Accessible design practice has always asked designers to annotate their concepts: mark the heading levels, the landmarks, the tab order, the accessible names, the focus behavior, the error messages, the live region politeness. In Hawkins' heuristics guide the recurring verb is "documented," appearing in roughly one heuristic in ten. The deliverable was never just the pixels. It was the pixels plus the intent.

In a traditional workflow that annotation is a note to a developer, and it gets lost at handoff often enough that most designers stopped writing it.

**In an AI workflow there is no handoff. The annotation is the input.**

A generation tool reads what you give it. If you give it a layout, it infers everything else from pixels, and pixel inference is exactly how you get twelve unnamed icons and a div that behaves like a button. If you give it a layout plus intent, the intent survives into the code. The annotation you stopped writing because developers ignored it is now the single highest-leverage artifact you produce.

So write it. Here is a format that works, structured by the three phases. Fill it in per component and paste it with your design.

```
COMPONENT: transaction row action menu

PERCEIVE
  Visible label:        "Actions"
  Icon:                 three-dot, decorative, hidden from AT
  Contrast:             icon 4.8:1 resting, 6.2:1 hover, both on #FFFFFF
  Focus indicator:      2px solid #0B4BD6, 2px offset, 7.02:1 on white
  Not conveyed by color alone: yes, label text present

UNDERSTAND
  Accessible name:      "Actions for {merchant}, {date}, {amount}"
  Role:                 button, opens menu
  State to expose:      aria-expanded true/false
  Group:                menu items grouped, labeled "Transaction actions"
  Instructions needed:  none
  Error copy:           n/a

OPERATE
  Keyboard:             Enter or Space opens, Escape closes and returns focus
                        to the trigger, arrow keys move within the menu
  Focus on open:        first menu item
  Focus on close:       back to the trigger, always
  Target size:          44x44 including padding, 24 minimum (2.5.8)
  Always present:       yes, not revealed on hover (2.1.1)
  Motion:               none, or 120ms fade honoring prefers-reduced-motion
  Timing:               no time limit
```

Notes on making this work in practice.

**Write it before the visual is finished, not after.** Half of these fields will change your design. Discovering that you need a visible label will change the layout. Discovering that focus has to return somewhere will change the interaction.

**Name the states explicitly.** Design every state a component can hold: default, hover, focus, active, disabled, loading, selected, expanded, error, empty. A model will invent the states you do not specify, and it will invent them without contrast checks. Note that focus and hover are different states with different users, and a hover style is not a focus indicator.

**Say what is decorative.** An unmarked icon is an ambiguity, and models resolve ambiguity by guessing. Mark decorative graphics as decorative and they will be hidden correctly.

**Put contrast values in, not just color names.** Write the ratio. "Muted gray" is not a specification and a model will pick something that fails.

**Annotate the empty, loading, and error states too.** These are generated least carefully and reviewed least often.

#### 9.4 Decide these before you generate anything

A short list of decisions that are cheap now and expensive later.

- **Focus indicator.** One indicator, defined once, in the design system. Specify color, thickness, offset, and its contrast against every background it will sit on (2.4.11, 1.4.11). If this is not in your tokens, every generated component will invent its own or remove it.
- **Contrast tokens.** Audit the palette itself, not the components. A token pair that fails will fail everywhere it is used, and component-level scanning will report it as many separate defects instead of one root cause. See Section 7 of the full reference.
- **Target size floor.** 24 by 24 CSS pixels is the requirement (2.5.8). 44 by 44 is the number to design to. Set it as a rule for the whole system rather than per component.
- **Motion policy.** Decide what moves, what triggers it, and what the reduced motion experience is. Treat the reduced version as a real design rather than a fallback (2.3.3).
- **Heading structure per template.** One h1, properly nested, headings marking real sections.
- **Landmark map per template.** Where main, nav, header, footer, and search go. All content inside a landmark.
- **Error and status copy.** Written by you, in plain language, saying what happened and what to do next (3.3.1, 3.3.3). Also decide which messages are polite and which are assertive, because a model will not.
- **Form label position and required marking.** Labels visible, positioned consistently, and requirement indicated in text rather than color or an unlabeled asterisk (3.3.2).
- **Two cues for anything that matters.** Any information carried by color needs a second, non-color cue: text, shape, position, or an icon with a name (1.4.1).

#### 9.5 Smaller things that are easy to specify and easy to lose

Not all of these are WCAG requirements. They are the details that separate a technically conformant interface from a usable one, and models get them wrong by default.

- Put form labels above or to the left of their input, consistently, and put radio and checkbox labels to the right of the control. Consistent placement is what lets people with magnification find them.
- Keep controls and their labels physically close. Proximity is what communicates the relationship before any code does.
- Avoid placeholder text as a label substitute. It disappears on input, usually fails contrast, and is not reliably announced.
- Keep tables simple. Merged cells break the header association that screen reader users depend on.
- Use SVG rather than raster images for anything that functions as a control, so it survives zoom and high contrast mode.
- Differentiate table headers from data cells visually, not only structurally.
- Give sortable columns a visible indication of which column is sorted and in which direction.
- Make sticky headers, toolbars, and non-modal dialogs movable or dismissible, and make sure a focused element is never left underneath one (2.4.11).
- Give every page a title that describes its purpose, and update it when the state changes to searched, filtered, sorted, or error.
- Design a way to bypass repeated blocks. A skip link is the cheapest version and almost no generated build includes one (2.4.1).
- Design the visible focus state for every interactive element, including ones the design system inherited rather than authored.

#### 9.6 Design deliverables checklist

Before anything goes to a generation tool:

- [ ] Every component annotated across perceive, understand, and operate
- [ ] Every state designed, including focus, disabled, loading, empty, and error
- [ ] Focus indicator defined in the system with contrast values
- [ ] Contrast verified at the token level, in every state, in every theme
- [ ] Heading structure and landmark map specified per template
- [ ] Tab order stated where it differs from visual order
- [ ] Accessible names written for every control, including icon-only ones
- [ ] Decorative graphics marked as decorative
- [ ] Target sizes specified, 24 minimum and 44 preferred
- [ ] Motion policy stated, including the reduced motion experience
- [ ] Error, empty, and loading copy written in plain language
- [ ] Live region politeness decided for each status message, and a settle delay specified for any value the user drags or types
- [ ] Every text color in the palette contrast-checked, including the faintest tier
- [ ] Units specified for any slider readout, so the announcement is not a bare number
- [ ] Reflow verified at 320 CSS pixels and 200% zoom
- [ ] Text spacing overrides survive: 1.5 line height, 2x paragraph, 0.12em letter, 0.16em word (1.4.12)
- [ ] Grayscale check passed, no meaning carried by color alone

If you hand a generation tool a design that satisfies this list, most of what the rest of this file enforces has already been decided by a person. That is the point.

---

**Credit.** The perceive, understand, operate sequence and the framing of design scope as a human plus technology system come from the Accessible Design Framework by Karen Hawkins, Principal of Accessible Design at Level Access. Her [Accessible Design Principles and Heuristics](https://www.levelaccess.com/resources/accessible-design-principles-and-heuristics/) guide, which organizes more than 170 heuristics into eight principles, and her article [Introducing the Accessible Design Framework](https://www.levelaccess.com/blog/introducing-the-accessible-design-framework/) are the best designer-facing accessibility resources I know of. Go read them in full. They are published by Level Access and remain its copyright.

The section above is written for a narrower purpose than hers, which is instructing a generation tool rather than teaching a designer. The wording, the technology sweep, and the annotation format are mine, as is any error in the translation.

## Design tools and AI prompting

#### If you are adopting a design system

A design system is a file. Design is a practice. The two get talked about as one thing, and the gap between them is where most accessibility defects live.

Classified against all 55 WCAG 2.2 Level A and AA criteria, a Figma design kit determines 3 and influences 14. At Level A it determines none of 31. The three it settles anywhere are text contrast, non-text contrast, and target size. Palette and sizes. Accessible names, exposed state, focus order and management, error association, heading structure, bypass mechanisms, and status messages do not exist until somebody builds. A coded component library reaches further, determining 4 and influencing 32, and it still cannot decide how you assemble it. The criterion by criterion classification is in [research/4-design-system-ceiling](https://github.com/danarandall/ai-a11y-toolkit/blob/main/research/4-design-system-ceiling/README.md).

What to do with that:

- Measure the palette you inherited instead of trusting the claim attached to it. In one current, well made, paid system measured for that study, every base color step cleared 3:1 and not one reached 4.5:1, across four releases and four years. (1.4.3)
- Check interaction states, not just resting states. Contrast should hold or rise on hover, focus, and active. The same system's primary button shipped white text at 4.48:1 at rest and dropped to 3.16:1 on hover and focus, so contrast fell exactly when the user was engaging with it. Measure all four states. (1.4.3, 1.4.11)
- Treat the kit as a floor for the three things it settles and assume nothing about the other 52.
- Do not let adoption replace design review. The defects a design system cannot reach are precisely the ones that are cheapest to catch before code exists, and they are decisions somebody has to make rather than accidents that appear at implementation time.

#### Figma and design files

- Use auto layout so reflow behavior is expressible rather than pixel-pinned.
- Name layers meaningfully. Layer names become the first draft of everyone's mental model, and of code generation output.
- Use text styles and color variables with contrast documented on the token, so accessible pairings are picked by default.
- Order layers to match intended reading order. Design tool layer order and generated DOM order are correlated.
- Annotate with a handoff plugin or a dedicated annotation layer covering headings, landmarks, tab order, alt text, and focus states. In an AI workflow this annotation is not a note to a developer, it is the input the tool builds from, so it is worth more than it used to be. Section 9.3 of the full reference has a format for it.
- Include the keyboard flow in prototypes, not just click paths.
- Record the measured contrast ratio on the token itself rather than the intent behind it. A token named for accessibility is not evidence, and values drift between releases while names do not.

#### Prompting AI tools for UI

Weak prompt: "Build a pricing page with three tiers."

Strong prompt: "Build a pricing page with three tiers. Requirements: semantic HTML with a single h1 and h2 per tier, WCAG 2.2 AA contrast on all text and borders with the ratio noted in a comment, focus-visible styles on every interactive element, the recommended tier distinguished by more than color, feature comparison as a real table with scope attributes, and CTA buttons at 44px minimum height with unique accessible names such as 'Choose Starter plan' rather than three identical 'Choose' buttons."

Prompt patterns that work:

- Name the standard and level explicitly. "WCAG 2.2 AA."
- Ask for the reasoning. "List each accessibility decision you made and the criterion it satisfies."
- Ask for the gaps. "List what still needs manual or screen reader verification."
- Constrain the primitives. "Use semantic HTML only. No div with click handlers. No positive tabindex."
- Require the states. "Include focus, error, empty, loading, and disabled states."
- Ask for a self-audit pass. "Now review your output against this file and fix violations."
- Paste the component annotation from Section 9.3 of the full reference alongside the design. A model given explicit accessible names, states, focus behavior, and target sizes will use them. A model given only a layout will infer them from pixels, which is how you get twelve unnamed icons.

#### AI-generated visuals and layouts

- Generated mockups routinely produce low-contrast gray-on-gray, tiny targets, and text baked into images. Check contrast and target size on anything you take from a generated comp.
- Never ship an AI-generated image containing meaningful text as an image. Extract the text into real markup. (1.4.5)
- Generated icon sets often lack a consistent 3:1 contrast against the surfaces they sit on. Verify per surface, not just once. (1.4.11)
- Generated illustrations of people flatten disability representation. If your imagery depicts users, decide deliberately who appears in it.

## Agent directives

This is the block to paste into your AI tool's instruction file. It is written as directives, not prose.

```
ACCESSIBILITY CONSTRAINTS (WCAG 2.2 AA)

ALWAYS:
- Use semantic HTML elements over div/span with handlers.
- Give every interactive element a visible label or an accessible name.
- Preserve and style focus indicators with at least 3:1 contrast against adjacent colors.
- Include alt text on images; use alt="" only for decorative images.
- Maintain 4.5:1 text contrast and 3:1 non-text contrast; state the ratio when specifying colors.
- Associate labels, hints, and error messages with inputs via for/id, aria-describedby, or aria-errormessage.
- Set lang on the html element and on any inline language change.
- Give every page a unique, descriptive title and a single h1.
- Provide a skip-to-content link as the first focusable element.
- Size every interactive target at 44x44 CSS pixels minimum, including icon buttons, carousel arrows, close buttons, and table row actions.
- Provide a non-drag alternative for any drag interaction.
- Wrap every animation, transition, and auto-scroll in a prefers-reduced-motion guard, in CSS and in JS.
- Trigger motion only from a direct user action. Never on page load, on a timer, or at random intervals.
- Limit motion to micro-interactions on the element being acted on, 100ms to 300ms, with a hard ceiling of 5 seconds for any animation.
- Prefer opacity and color change over movement, and keep any displacement to a few pixels.
- Give every carousel, slideshow, and auto-advancing region a visible, persistent, keyboard-reachable pause and play control as its first focusable child.
- Give every background video and animated background a visible pause control, and set them to paused by default under reduced-motion.
- Default autoplay to off when prefers-reduced-motion is set. Check the preference in JS before calling play() on any media element.
- Ensure text is never clipped, truncated, or covered by another element at 200% zoom and at 320px CSS width.
- Announce async state changes with aria-live, role="status", or role="alert", or move focus deliberately.
- Let a continuously changing value settle for 500ms to 1000ms before writing it to a live region. Announce the result once, not every intermediate value.
- Add aria-valuetext to any range input whose value carries a unit, and give the input itself a 44px target height rather than styling only the track.
- Verify contrast for every text token in the palette, including the faintest one used for column headers, hints, timestamps, and captions.
- Support text spacing overrides without clipping content.
- Keep repeated navigation, search, help, and footer content in the same relative order on every page.
- Use one accessible name and one icon per function across the whole product.
- Use the project's existing design system and its tested primitives instead of hand-building components.
- Style through design tokens only, never arbitrary color or spacing values.

NEVER:
- Never write outline: none, outline: 0, or remove focus styles without an equivalent replacement.
- Never use positive tabindex values. Use tabindex="0" or "-1" only.
- Never add aria-label to a non-interactive, roleless element and expect it to be read.
- Never use role="button" on an element that could be a button.
- Never use placeholder text as the only label.
- Never use color, position, shape, or sound as the only means of conveying information.
- Never nest interactive elements, for example a button inside a link.
- Never use aria-hidden="true" on a focusable element or its ancestor.
- Never hide content from assistive tech with display:none when it should be visually hidden only; use a clip-based visually-hidden utility.
- Never auto-play audio longer than 3 seconds without a control.
- Never build a carousel or slideshow that auto-advances with no pause control.
- Never use parallax scrolling, scroll-jacking, or scroll-triggered reveal chains.
- Never use infinite or looping animation, marquees, tickers, or looping GIFs.
- Never use bounce, spring, elastic, or overshoot easing, spinning, 3D rotation, or blur transitions.
- Never animate full-page or viewport-scale transitions, or animate text in word by word.
- Never make motion the only signal for a state change, and never block interaction until an animation finishes.
- Never animate or count a number that sits inside a live region, and never ship a counting number without a reduced-motion path that jumps to the final value.
- Never write to a live region on every keystroke or every step of a slider drag.
- Never show selection or validation state with a CSS class or a color alone. Expose aria-pressed or radio semantics for selection, and aria-invalid plus a text message for errors.
- Never autoplay or loop a background video without a pause control.
- Never set fixed heights, line clamps, or overflow: hidden on containers holding user-facing text.
- Never position a sticky, fixed, or absolutely positioned element so it can cover text when text size increases.
- Never require a CAPTCHA that depends on cognitive function tests as the only authentication path.
- Never generate lorem ipsum alt text, filename alt text, or "image of" prefixes.
- Never hand-roll a dialog, combobox, select, menu, tabs, tooltip, date picker, slider, or carousel when a tested primitive exists.
- Never recreate a component that already exists in the design system.
- Never mix two component libraries in the same product surface.
- Never suggest an accessibility overlay, widget, or third-party remediation script. Fix the source.
- Never substitute a different accessibility testing engine for the ones named in Section 14 of the full reference.
- Never suppress, ignore, or baseline a finding to make a scan pass.
- Never report UI work as complete without running the scan and repair loop in Section 14.4 of the full reference and updating the manual test queue.
- Never assert that generated output is accessible or compliant. Report what was implemented and what needs human and screen reader testing.

WHEN UNCERTAIN:
- Choose the more conservative, more semantic option.
- Flag the ambiguity in a comment or in your response rather than guessing.
- Prefer a documented pattern from the ARIA Authoring Practices Guide over an invented one.
```

## Common AI-generated failure patterns

What to look for specifically when reviewing AI output. These recur across tools.

| Pattern | Why it happens | Fix |
| --- | --- | --- |
| `<div onClick>` instead of `<button>` | Training data is full of it | Use the native element |
| `outline: none` in a reset | Copied from legacy CSS resets | Replace with `:focus-visible` styles |
| Placeholder used as the label | Looks cleaner in a screenshot | Add a persistent visible label |
| Identical link or button names repeated | Component reuse without context | Unique accessible names per instance |
| Markup injected with `dangerouslySetInnerHTML` or `innerHTML` | Icon sets, CMS content, and SVG sprites arrive as strings | Normalize at the injection point; lint cannot see runtime strings |
| `maximum-scale=1` or `user-scalable=no` in the viewport tag | Copied from mobile app scaffolding | Delete both; never block zoom |
| Animation utilities with no `prefers-reduced-motion` handling | The preference is invisible in a screenshot | One global reduce block, shipped with the first animation |
| `aria-label` placed on a `<div>` or `<span>` | Reads as helpful, is silently discarded | Use a real element, or a role that permits a name |
| Border and input tokens below 3:1 | Reviewers look at text, not boundaries | Audit tokens as data against 1.4.11 |
| Same function named differently across screens | Each file generated in isolation | One accessible name per function, product-wide |
| aria-label that differs from the visible text | Models over-describe | Match the visible label (2.5.3) |
| Navigation or help relocated per template | No cross-page context in the prompt | Same relative order on every page (3.2.3, 3.2.6) |
| `aria-label` layered onto correct semantics | ARIA treated as a fix-all | Remove the redundant ARIA |
| Invented ARIA patterns for menus and comboboxes | Half-remembered specs | Use an APG pattern or a tested primitive |
| Low-contrast gray text on white | Aesthetic defaults in training data | Verify every ratio |
| A second, dimmer text token used only for column headers and hints | Invented for de-emphasis, too rare to get reviewed | Audit the faintest text token first (1.4.3) |
| Live region rewritten on every keystroke or slider step | The model learned that a live region is the fix, not how to govern one | Settle the value, then announce once (4.1.3) |
| Counting or animated numbers with no reduced-motion path | Reads as polish, invisible in a screenshot | Jump to the final value under reduce (2.3.3) |
| `<input type="range">` announcing a bare number | Correct element chosen, unit never added | Add `aria-valuetext` with the unit (4.1.2) |
| A styled range input only a few pixels tall | The track is styled, the input box is forgotten | Measure the input, not the thumb (2.5.8) |
| Selected state shown with a CSS class only | Visual selection is obvious to the person looking at it | Expose `aria-pressed` or use radio semantics (4.1.2) |
| Validation shown by turning the field red | The brief said make it red, and it did | Add a text message and `aria-invalid` (3.3.1) |
| Red-only error states | Visual convention in training data | Text message plus icon, adjacent to the field |
| Green and red for good and bad | Universal convention, unusable for red-green CVD | Add text or distinct shapes |
| Filename, SKU, or color code as alt text | CMS data passed straight through | Human-readable descriptions only |
| Chart series distinguished only by a color legend | Charting library defaults | Direct labels, second encoding, data table |
| Suppressing a scanner finding instead of fixing it | Optimizing for a green build | Blocked by the loop in 14.4 |
| Declaring output "WCAG compliant" after an automated pass | Overconfidence about tooling | Report what was scanned and what was not |
| Hand-rolled components because no design system was declared | Missing project configuration | Fill in Section 0 of the full reference and use the gate |
| Tailwind utility classes on a bare `div` acting as a control | Tailwind treated as a component library | Declare a primitives layer, see 0.3 |
| Dense screens with several competing primary actions | Trained on marketing pages | One primary action per view |
| "Click here" and "Learn more" link text | Extremely common in training data | Describe the destination or outcome |
| CAPTCHA or puzzle as the only authentication path | Default signup boilerplate | An alternative that requires no cognitive test |
| Asking for the same information twice in a flow | Screen-by-screen generation without state | Carry data forward or auto-populate |
| Missing focus management in modals and drawers | Visual-only reasoning | Trap, Escape, restore focus |
| Silent async updates | No model of the non-visual experience | Add a live region |
| Alt text that describes rather than functions | Models caption, they do not consider purpose | Rewrite by purpose |
| Icon-only controls with no name | Icon fonts and SVGs look self-explanatory | Add accessible names |
| Animation with no reduced-motion guard | Motion demos well | Wrap in the media query |
| 16px or smaller tap targets | Desktop-first defaults | 44px minimum |
| Parallax and scroll-triggered reveals | Portfolio and landing-page training data is full of them | Remove; use static depth and layout instead |
| Ambient, autoplaying, or looping animation | Motion demos well in a screenshot-driven world | Trigger from user action only, no loops |
| Bounce and spring easing on everything | Framer Motion defaults | Standard easing, 150ms to 300ms |
| Inventing a one-off component instead of using the system | Models generate from scratch by default | Point the tool at the design system explicitly |
| Hand-rolled combobox, dialog, or date picker | Looks plausible, fails on focus and ARIA | Use React Aria, Radix, Ariakit, or the system component |
| Arbitrary hex and one-off color utilities | Token systems are invisible in a prompt | Constrain to tokens in the instruction file |
| Auto-advancing carousel with no pause control | Autoplay reads as polished in demos | Persistent pause control as the first focusable child |
| Claims of "fully accessible" output | Confident tone by default | Require an explicit gap list |

## Verification

Automated tooling finds a minority of issues. This sequence catches most of the rest.

#### Fast pass, every build

1. Run an automated checker and fix every violation. The [IBM Equal Access](https://github.com/IBMa/equal-access) extension for Chrome, Firefox, or Edge gives you an in-browser pass in seconds, and [Pa11y](https://pa11y.org/) covers a URL list from the command line.
2. Tab through the entire page. Confirm you can see focus at every stop and reach every control.
3. Zoom to 200% and to 400%. Confirm nothing is clipped or lost.
4. Check contrast on new colors.

#### Full pass, before release

5. Test with a screen reader on the real flow. VoiceOver with Safari on macOS and iOS, NVDA with Firefox or Chrome on Windows, TalkBack with Chrome on Android. Do not test a screen reader with the wrong browser pairing.
6. Test at 320px CSS width.
7. Test with the 1.4.12 text spacing overrides applied. The snippet is in 3.6.
8. Test in Windows High Contrast and forced-colors mode.
9. Test with `prefers-reduced-motion` enabled at the OS level.
10. Test keyboard-only completion of every critical path, including error recovery.
11. Test with voice control, meaning Voice Control or Dragon, where visible labels must match accessible names. (2.5.3)

#### Manual inspection tools

12. Inspect the accessible name, role, and state of individual elements by hand. The Firefox DevTools Accessibility Inspector and the Chrome DevTools accessibility tree both expose this without installing anything, and [ANDI](https://www.ssa.gov/accessibility/andi/help/install.html), a free bookmarklet from the U.S. Social Security Administration, walks structure, headings, links, tables, and contrast interactively. For contrast, the color picker in Chrome and Firefox DevTools reports the ratio live against the actual rendered background.

#### Two cheap checks worth building into design review

13. **Grayscale review.** Flip the design or the live page to grayscale. Anything that stops making sense was relying on hue. Seconds to run, and it catches most color-only failures before code exists ([Level Access](https://www.levelaccess.com/blog/color-blindness-accessibility-what-designers-need-to-know/)).
14. **Spoken user interface.** During prototyping, have someone read the interface aloud, in the order a screen reader would encounter it. Decide how each element and component should be announced and in what order. This surfaces garbled price announcements, missing labels, and nonsensical reading order long before development ([Level Access, Cart confidence](https://www.levelaccess.com/blog/elevating-e-commerce-accessibility-cart-confidence/)).

#### The pass that matters most

15. Test with people with disabilities, paid for their time, on real tasks, on their own assistive technology and settings. Nothing in this file substitutes for that. Automated tools and expert review find defects. Users find the ones that stop them.

## What is not in this file

This build carries the rules that apply on every task. Each area below is a
section of the full reference at
https://github.com/danarandall/ai-a11y-toolkit

| Area | Where |
| --- | --- |
| Motion, video, carousels, target size, zoom, reflow, text spacing | Section 3 of the full reference |
| Interface consistency and repeated components | Section 5 of the full reference |
| Alt text decision tree, charts, icons, decorative art | Section 6 of the full reference |
| Contrast and color independence in detail | Section 7 of the full reference |
| Cognitive load, clear language, non-apparent disabilities | Section 8 of the full reference |
| HTML, CSS, React, and component frameworks | Sections 10 and 11 |
| The build loop, scanning, and the manual test queue | Section 14 of the full reference |
| Every Level A and AA success criterion | Section 16 of the full reference |

## Attribution

Written by Dana Randall in a personal capacity. Licensed CC BY 4.0.
https://creativecommons.org/licenses/by/4.0/

If you adapt or redistribute this, credit Dana Randall and link
https://danarandall.com/ai-a11y-toolkit

The perceive, understand, operate sequence and the framing of design scope as a
human plus technology system come from the Accessible Design Framework by Karen
Hawkins, Principal of Accessible Design at Level Access.

Found something that does not work? https://danarandall.com/ai-a11y-toolkit#feedback
