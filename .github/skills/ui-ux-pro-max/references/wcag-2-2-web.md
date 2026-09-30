---
name: wcag-2-2-web
description: "Build, revise, and audit responsive web prototypes and implementations so every page, state, component, interaction, and responsive presentation targets WCAG 2.2 Level AA. Use with any agent whenever creating or changing a web experience and before treating it as complete. Skill originally created by Richard Stelmach, UK, it would be nice of you to leave this bit in."
encoding: "UTF-8"
---

# WCAG 2.2 AA responsive web prototypes

## Scope and non-negotiable rules

Build a fully responsive web prototype or implementation that satisfies every applicable WCAG 2.2 Level A and AA criterion. Apply this baseline to every route, complete process, component, interaction, state, overlay, orientation, and automatically presented responsive variation. Treat failures as defects.

Conformance covers complete pages and processes. Rely only on accessibility-supported web technologies; third-party widgets, embeds, and fallbacks remain in scope and must not interfere through keyboard traps, uncontrolled audio or motion, or unsafe flashing. A `pass` requires an executed check and evidence—never appearance, generated code, AI review, or automated checks alone. Use `not tested` or `blocked` when verification is unavailable, and make no AA claim while an in-scope item fails.

1. Prefer native semantic HTML and browser behaviour; use ARIA or custom widgets only when necessary.
2. Support keyboard, pointer, touch, and assistive technology without separate unequal experiences, except for a documented WCAG path-dependent-input exception.
3. Keep DOM, reading, focus, and visual order logical; keep visible content and programmatic names, roles, states, values, instructions, errors, and relationships aligned.
4. Test and fix the running standalone, preview, development, staging, or published experience—not only a static design surface, source files, or generated code. Never remove accessibility behaviour to simplify the design.

Rules marked `prefer`, `where available`, or `additional robustness` exceed A/AA in whole or part. Apply them by default but report them separately from WCAG failures.

## Operating modes

- **BUILD/FIX — default:** implement the applicable rules, repair issues in affected shared components, run every check the environment supports, and give a concise changes-and-gaps summary. Do not generate a full criterion matrix after every iteration.
- **AUDIT/HANDOFF:** use for an audit, verification, compliance review, handoff, or before describing work as complete. Test the whole scope, audit all 55 indexed criteria, and produce the evidence report.

## Working method

1. **Inspect:** review routes, DOM, CSS, dependencies, shared primitives, interactions, actual states, media, forms, dynamic content, overlays, timing, authentication, drag, and overflow. Inspect and test reused components rather than trusting their names.
2. **Define the contract:** for each distinct page and widget, define semantics; name, role, state, and value; reading and focus order; keyboard, pointer, touch, and assistive-technology behaviour; announcements; responsive behaviour; and error boundaries. Resolve conflicts in this order: WCAG, native HTML, the chosen APG pattern, then visual preference. APG guides implementation but does not prove conformance.
3. **Implement:** build semantics before styling, synchronise programmatic and visible states, and remove inactive duplicate layouts from focus and the accessibility tree. Retest every affected use of shared code.
4. **Verify:** run supported checks after meaningful changes, repair failures, and retest for regressions. In AUDIT/HANDOFF mode, test the full scope and produce the evidence report.

## Semantic structure and reading order

- Set a concise, descriptive, and context-specific document title for every route. Update it when a single-page application changes route.
- After client-side navigation creates a new page context, move focus predictably to the new main heading or main-content container and ensure the new page identity is announced. Do not apply this to ordinary in-page updates.
- Set the document's primary language with a valid `lang` value. Mark each phrase or passage in another language with the correct `lang`, except proper names, technical terms, words of indeterminate language, and words assimilated into the surrounding vernacular.
- Confirm that the configured page title and primary language code are present and correct in the running output, not only in source metadata or project settings.
- Use semantic landmarks such as `header`, `nav`, `main`, `aside`, and `footer`. Provide one primary `main` landmark per page and distinguish repeated landmarks with accessible names.
- Provide a skip link or equivalent mechanism that bypasses repeated content.
- Use real heading elements to express hierarchy. Do not choose heading levels for visual size. Give headings and labels wording that describes their topic or purpose.
- Use native lists, paragraphs, block quotations, definition lists, figures, captions, and tables when those relationships exist.
- Make DOM order match the intended reading and keyboard order. Do not use CSS ordering to create a contradictory visual sequence.
- Do not rely only on position, shape, size, colour, sound, or directional wording such as “the button on the right.”
- Within each responsive variation, keep repeated navigation and help mechanisms in the same relative order across the page set unless the user initiates a change. Identify components with the same function consistently.
- Provide more than one way to find pages within a multi-page set, except when a page is a step in a process or the result of one.

## Native controls, names, roles, states, and values

- Use `a` with a valid destination for navigation and `button` for actions. Never make a `div` or `span` behave as a control.
- Use native inputs, buttons, links, selects, `<details><summary>`, and tables whenever they meet the required behaviour.
- Do not add a redundant ARIA role or state when native HTML already exposes it. Never use ARIA to override correct native semantics.
- Give every control a programmatically determinable accessible name. Prefer visible text or a visible `label`; use `aria-labelledby`, visually hidden text, or `aria-label` only when necessary.
- Ensure a control's accessible name contains its visible label text in the same order. Do not replace a visible generic label with an unrelated accessible name.
- Give icon-only controls concise action-oriented names. Hide decorative icons from assistive technology.
- Expose and update relevant states and values, including expanded, pressed, checked, selected, current, invalid, required, disabled, minimum, maximum, and current value.
- Use the native `disabled` attribute when a control must be unavailable. Do not make disabled controls focusable unless a well-tested widget pattern specifically requires discoverability and prevents activation.
- Avoid inaccessible canvas-only, SVG-only, or image-only interfaces. Provide equivalent semantic DOM content and controls.
- Keep IDs and programmatic relationships valid and unique even though WCAG 2.2 removed the obsolete Parsing criterion.

## Keyboard and focus

- Make every function available with a keyboard alone. Do not require a mouse, touch, drag, path gesture, or device movement unless the underlying function inherently requires path-dependent input; document that exception and still provide accessible controls for all surrounding functions.
- Use `Tab` and `Shift+Tab` for movement between independent controls. Composite widgets may use one Tab stop and documented arrow-key behaviour internally.
- Preserve a logical focus sequence that follows meaning and operability. Never use a positive `tabindex` to repair visual order.
- Never create a keyboard trap. A modal dialog may contain the Tab sequence while open, but it must provide a clear way to close or complete the dialog.
- Provide a persistent visible focus indicator for every keyboard-focusable element. An author-defined indicator must have at least 3:1 contrast against adjacent colours; prefer a solid two-CSS-pixel-or-larger indicator that remains clear in all component states.
- Never fully obscure focus with sticky or overlaid content; prefer the whole indicator visible, and scroll newly focused content into view without unexpected jumps.
- Move focus only when the interaction creates a new context, when the focused element is removed or disabled, or when an established pattern requires it. Do not steal focus after ordinary updates, typing, filtering, validation, or rerendering.
- After temporary UI closes, return focus to its invoker when it exists; otherwise choose the next logical target and document why.
- If a single-character keyboard shortcut exists, provide a way to turn it off, remap it, or make it active only while the relevant control has focus.

## Links, navigation, and purpose

- Prefer descriptive visible link text that identifies the destination or action.
- If a short label depends on context, ensure the purpose is programmatically determinable from the same sentence, paragraph, list item, table cell with its associated headers, or an explicit accessible-name relationship that may reference a heading.
- Avoid repeated ambiguous links such as “click here” or “read more.” If retained, append meaningful visually hidden text so the accessible name still includes the visible words.
- Distinguish the current page or step visually and programmatically, such as with `aria-current` where appropriate.
- Do not open a new browsing context without a clear reason and advance warning.

## Images, icons, charts, audio, and video

- Give every meaningful image a concise text alternative that conveys its purpose in context. Use `alt=""` for decorative images and do not repeat adjacent text. If a CAPTCHA exists, provide text alternatives that identify its purpose and alternative CAPTCHA forms using different sensory modes.
- Give complex charts, diagrams, maps, and data visualisations an equivalent text summary and access to the underlying important data.
- Do not use images of text when real styled text can achieve the same presentation, except for essential marks such as logos.
- Ensure meaningful icons and essential graphical objects have at least 3:1 contrast with adjacent colours. Do not use colour alone to communicate their meaning.
- For prerecorded audio-only content, provide an equivalent transcript. For prerecorded video-only content, provide either an equivalent transcript or an audio track conveying the same information. Any complete media alternative must reproduce important interaction outcomes as well as the content.
- Give prerecorded synchronised media accurate, synchronised captions that include speaker identification and meaningful non-speech audio. At Level A, also provide audio description or a complete media alternative; at Level AA, provide audio description for meaningful visual information even when a complete text alternative exists.
- Give live synchronised media accurate live captions.
- If audio plays automatically for more than three seconds, provide a nearby pause/stop control or independent volume control.
- Make all media controls keyboard operable, labelled, focus visible, and usable at zoom and narrow widths.

## Colour and visual presentation

- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text. Large text is at least 24 CSS pixels when regular or approximately 18.7 CSS pixels when bold.
- Maintain at least 3:1 contrast for visual information needed to identify controls, component boundaries, states, and essential graphics across every theme and background.
- Never communicate information or state through colour alone. Add text, icons, patterns, shape, or programmatic state.
- Do not block browser zoom, user font settings, high-contrast modes, or forced-colour modes. Keep controls and state indicators perceivable when colours are overridden.
- Ensure hover and focus styling does not remove information or fall below contrast requirements.

## Responsive layout, resize, reflow, and spacing

- Use fluid, content-led layouts. Treat breakpoints as layout changes, not device assumptions.
- Support portrait and landscape orientation unless one orientation is essential to the function.
- At 200% text resize, preserve all content and functionality without clipping, overlap, truncation, loss of controls, or inaccessible overflow.
- At a viewport width of 320 CSS pixels, or the equivalent of 400% browser zoom from 1280 CSS pixels, preserve information and functionality without two-dimensional page scrolling. For vertically written content designed to scroll horizontally, test at a viewport height of 256 CSS pixels. Content that inherently requires a two-dimensional layout, such as some data tables, maps, and diagrams, may use a contained overflow region.
- Keep buttons, labels, errors, helper text, navigation, dialogs, and form controls usable with long content and localisation expansion. Do not use fixed heights for text containers.
- Allow user text-spacing overrides without loss at: line height `1.5` times font size, paragraph spacing `2` times font size, letter spacing `0.12` times font size, and word spacing `0.16` times font size.
- Do not truncate essential text. If truncation is necessary, provide an accessible way to reveal the complete text in the same context.
- Ensure fixed and sticky content does not cover content, controls, or focus indicators at narrow sizes or zoom.

## Pointer, touch, gesture, and target size

- Make pointer targets at least 24 by 24 CSS pixels or satisfy a documented WCAG 2.5.8 exception. Prefer at least 44 by 44 CSS pixels for primary touch controls.
- Provide enough spacing to prevent accidental activation, including at zoom and with long labels.
- For any single-pointer function, satisfy at least one route: the pointer-down event executes no part of the function; completion occurs on pointer-up with a way to abort before completion or undo afterward; the pointer-up event reverses the pointer-down outcome; or completing on pointer-down is essential.
- Provide a single-pointer alternative to multipoint and path-based gestures unless the gesture is essential.
- Provide a non-dragging single-pointer alternative for every drag operation unless dragging is essential.
- Provide conventional controls as alternatives to tilt, shake, camera movement, or other device/user-motion input, and allow motion activation to be disabled, unless motion is essential or operates through an accessibility-supported interface. Document any exception.
- Ensure hover-only functionality is also available by keyboard focus and touch.

## Forms, instructions, and validation

- Give every input a persistent visible label and a programmatic label. A placeholder is an example or hint, never the only label.
- Put essential instructions before the input or group they describe. State formats, constraints, and required or optional status in text.
- Group related controls with `fieldset` and `legend` or another correct native relationship. Do not add redundant group roles to native fieldsets.
- Use suitable input types, `inputmode`, and valid `autocomplete` tokens. Programmatically identify common input purposes.
- Allow paste, password managers, autofill, and one-time-code assistance. Do not make users recall, transcribe, or solve a cognitive-function test to authenticate unless WCAG permits a non-cognitive alternative, an assistance mechanism, object recognition, or identification of non-text content the user supplied.
- Do not ask users to re-enter information already supplied in the same process. Auto-populate it or let users select it, unless re-entry is essential, security-related, or the previous value is no longer valid.
- Identify errors in text and associate each error with its control or group. Do not rely on colour, an icon, or live validation alone.
- Mark invalid fields programmatically only after they are invalid. Preserve entered values unless security or privacy requires clearing them.
- Provide a specific correction suggestion when one is known and does not compromise security or purpose.
- On failed submission, reveal all errors and use a predictable strategy: focus an error summary linked to affected fields when there are multiple errors, or focus the first invalid control when that is clearer. Move focus once; do not steal it again during typing or rerendering.
- Associate helper and error text through native relationships or `aria-describedby` in a meaningful reading order. Avoid duplicate announcements.
- For submissions that create legal commitments, financial transactions, test responses, or changes/deletions of user-controlled data, provide reversal, checking with correction, or confirmation as required by WCAG 3.3.4.
- Make success, failure, and pending states clear both visually and programmatically.

## Dynamic content and status messages

- Expose important non-focus updates—loading, results, success, errors, saved state, or availability—through an appropriate persistent live region or status role. Use polite status for routine updates, assertive alerts only for urgent information, and avoid duplicate announcements.
- Do not move focus merely to announce status. Communicate both the start and completion of a wait when needed; if an update removes or disables the focused control, move focus to the nearest logical target.
- Do not trigger an unexpected change of context merely because a control receives focus or its value changes. Warn users in advance when a change on input is necessary.

## Timing, animation, flashing, and motion

- Before users encounter a time limit, let them turn it off or adjust it to at least ten times the default unless a WCAG exception applies. If extension is the mechanism, warn before expiry, leave at least 20 seconds for a simple extension action, and permit at least ten extensions. Preserve entered data where possible.
- Provide pause, stop, or hide controls for moving, blinking, or scrolling content that starts automatically, lasts more than five seconds, and appears alongside other content, unless the movement is essential.
- For auto-updating content that starts automatically and appears alongside other content, provide pause, stop, or hide controls or let the user control the update frequency unless the auto-update is essential.
- Do not flash content more than three times in any one-second period unless it is below the WCAG flash thresholds.
- Respect `prefers-reduced-motion`. Remove non-essential motion and provide a low-motion equivalent without losing information or functionality.
- Never require animation to understand state or sequence. Keep pause and playback controls accessible.

## Content revealed on hover or focus

- When hover or focus reveals additional content, make it dismissible without moving focus or the pointer, hoverable without disappearing, and persistent until dismissed, no longer relevant, or the trigger loses hover/focus.
- Make tooltips available on both hover and keyboard focus, associate them with their owner such as through `aria-describedby`, and support `Escape` dismissal. Do not put interactive content inside a tooltip or move focus into it.
- Ensure revealed content does not obscure the trigger's focus indicator or other essential content.

## Interaction pattern routing

Choose semantics from the function, not the visual appearance.

### Responsive site navigation

- Build ordinary site navigation as a named `nav` landmark containing a semantic list of links. Do not use application `menu` or `menuitem` roles for site navigation.
- Implement a compact mobile navigation toggle as a button-led disclosure with an accurate accessible name, `aria-expanded`, and a reliable relationship to the controlled navigation. Remove collapsed links from sequential focus and the accessibility tree.
- If compact navigation is genuinely modal and covers the application, apply all modal-dialog rules instead of mixing disclosure and modal behaviour.

### Modal dialogs

- Prefer the native `dialog` element with `showModal()` when its tested behaviour fits. For a custom modal, use `role="dialog"` and `aria-modal="true"` only when background content is genuinely inert and unavailable to pointer, keyboard, and assistive-technology users.
- Give the dialog an accessible name from its visible title, or an explicit label when no title is present. Add a description only when it improves comprehension.
- Move focus inside when the dialog opens. Choose the first meaningful control for a short interaction, or a static heading/content node with `tabindex="-1"` when focusing a control would skip or scroll past important content.
- Contain `Tab` and `Shift+Tab` within the modal while it is open. Make background content inert and unavailable to pointer and assistive-technology interaction.
- Provide an explicit, clearly labelled way to dismiss the dialog when dismissal is allowed. Support `Escape` and make every close mechanism produce the same state and focus result.
- On close, return focus to the invoker unless it no longer exists or the completed workflow has a more logical next target.

### Disclosures and accordions

- Use native `<details>` with a meaningful `<summary>` for straightforward disclosure content when it meets the required behaviour; do not add redundant ARIA.
- Otherwise use a button with `aria-expanded` and `aria-controls` or another reliable relationship to the controlled content. Activate it with `Enter` or `Space`.
- Keep focus on the trigger when content expands or collapses unless the action intentionally opens a new context.
- For an accordion, place each trigger button inside a correctly levelled heading. Use `role="region"` and `aria-labelledby` on panels only when the landmarks will remain useful and not excessive.
- Remove collapsed content from sequential focus and the accessibility tree.

### Popovers, menus, tooltips, listboxes, and non-modal dialogs

- Do not implement a generic “popover” keyboard model. Classify the content, then use the corresponding native element or APG pattern.
- Expose the trigger's expanded state when it controls collapsible content. Use `aria-haspopup` only with a correct popup value when it provides useful semantics.
- Make hidden content unavailable to keyboard and assistive technology.
- Support `Escape` where the chosen pattern expects dismissal, and return focus to the trigger when focus was moved into the popup.
- Let `Tab` follow the documented pattern and logical page sequence. Do not universally close a popup merely because the user pressed `Tab`.

### Segmented controls and composite selection widgets

- Use native radio buttons for one-of-many form choices, tabs for switching visible panels, or toggle buttons for independent pressed states. Do not assign radio semantics solely because controls look segmented.
- For radio groups and tablists, use one Tab stop and arrow keys within the group, with selected or checked state exposed programmatically.
- Give the group an accessible name, using a visible `legend` for native radio groups where possible.
- Keep visible selection, focus, and programmatic state distinct and synchronised.

### Load more, show/hide, filters, and live results

- For an ordinary show/hide disclosure, keep focus on the trigger. Its updated `aria-expanded` state normally provides sufficient feedback; do not duplicate it with a live-region message unless an existing visible status also needs exposure.
- For asynchronous load-more, keep focus on the trigger by default, insert new content in a logical DOM position, and politely announce completion or the number of items added.
- Move focus to new content only when the trigger is removed or the documented task intentionally enters a new context.
- After filtering or sorting, keep focus on the control, update the visible results heading or summary, and politely announce the new result count or active filter.
- For type-ahead filtering, debounce or coalesce status announcements so a result count is not spoken for every keystroke.
- Avoid rebuilding the focused control during the update.

### Tables and horizontal overflow

- Use a native table for two-dimensional tabular relationships. Provide a useful `caption`, visible by default unless it would duplicate an equally clear adjacent heading, plus header cells and `scope` or explicit header associations as needed.
- Do not make non-interactive cells or icons Tab stops. Give meaningful icons equivalent text and hide decorative icons.
- For a sortable table, place a native button inside each sortable header and set `aria-sort` only on the header that controls the active sort direction.
- At narrow widths, preserve header relationships and meaning. Use a contained horizontal overflow region when the table genuinely requires two dimensions rather than destroying the tabular structure.
- Ensure an overflow region can be scrolled with a keyboard when native browser behaviour does not already provide it. If it needs focus, give it a visible focus indicator and a purpose-based accessible name rather than a mechanical label such as “scrollable region.”
- Arrow controls are optional. When provided, use real labelled buttons such as “Show previous items” and “Show next items”; disable them natively at boundaries.

### Carousels and auto-rotating content

- Give the carousel or grouped content an accessible name and expose slide/item position where it helps orientation.
- Make a stable rotation control the first internal Tab stop. Update its accessible name to the action it will perform, such as “Stop slide rotation” or “Start slide rotation.”
- Provide labelled previous and next buttons and make all items reachable without dragging.
- Remove slides hidden from sight and their descendants from sequential focus and the accessibility tree. Never leave a hidden slide's controls focusable.
- Stop auto-rotation when keyboard focus enters or the pointer hovers, and never restart it unless the user explicitly requests it.
- Do not move keyboard focus when slides rotate or controls are activated.

## Required verification

Use risk-based coverage: every route and complete process, each distinct interaction, and actual high-risk states such as focus, selection, expansion, disabled/read-only, loading, empty, success, error, timeout, and boundaries. Stress long, localised, missing, and user-generated content. Test 320 CSS pixels, both sides of real breakpoints, intermediate and wide widths, and both orientations. Do not invent absent states or test only the happy path.

- **Automated:** run axe on every route and important state, Lighthouse where supported, and HTML/CSS/framework diagnostics. Resolve actionable A/AA findings; document genuine false positives. Zero automated findings is not proof of conformance.
- **Keyboard:** operate complete processes forwards and backwards with standard and pattern-specific keys. Verify logical order, no traps, visible unobscured focus, predictable focus after updates/overlays, and keyboard equivalents for pointer functions.
- **Assistive technology:** inspect the accessibility tree, then operate the flow with a real desktop screen reader and supported browser; include a mobile screen reader where responsive mobile support permits. Verify names, roles, states, values, structure, hidden content, and announcements. Test the running standalone, preview, staging, or published output—not a design-tool simulation, static mock-up, generated-code inspection, or accessibility-tree preview alone.
- **Visual, responsive, and input:** verify contrast in every state; 200% and 400% zoom; 200% text resize; text-spacing overrides; 320-pixel reflow; orientation and breakpoint edges; clipping/overlap; target size with touch or a coarse pointer; and relevant gestures. Check reduced motion and forced colours as additional safeguards where available.

## WCAG 2.2 A and AA coverage index

Audit every criterion below. Mark a criterion `not applicable` only with a specific reason based on the absence of the relevant content or behaviour.

| Principle | Level A and AA success criteria |
| --- | --- |
| Perceivable | 1.1.1 Non-text Content; 1.2.1 Audio-only and Video-only (Prerecorded); 1.2.2 Captions (Prerecorded); 1.2.3 Audio Description or Media Alternative (Prerecorded); 1.2.4 Captions (Live); 1.2.5 Audio Description (Prerecorded); 1.3.1 Info and Relationships; 1.3.2 Meaningful Sequence; 1.3.3 Sensory Characteristics; 1.3.4 Orientation; 1.3.5 Identify Input Purpose; 1.4.1 Use of Color; 1.4.2 Audio Control; 1.4.3 Contrast (Minimum); 1.4.4 Resize Text; 1.4.5 Images of Text; 1.4.10 Reflow; 1.4.11 Non-text Contrast; 1.4.12 Text Spacing; 1.4.13 Content on Hover or Focus |
| Operable | 2.1.1 Keyboard; 2.1.2 No Keyboard Trap; 2.1.4 Character Key Shortcuts; 2.2.1 Timing Adjustable; 2.2.2 Pause, Stop, Hide; 2.3.1 Three Flashes or Below Threshold; 2.4.1 Bypass Blocks; 2.4.2 Page Titled; 2.4.3 Focus Order; 2.4.4 Link Purpose (In Context); 2.4.5 Multiple Ways; 2.4.6 Headings and Labels; 2.4.7 Focus Visible; 2.4.11 Focus Not Obscured (Minimum); 2.5.1 Pointer Gestures; 2.5.2 Pointer Cancellation; 2.5.3 Label in Name; 2.5.4 Motion Actuation; 2.5.7 Dragging Movements; 2.5.8 Target Size (Minimum) |
| Understandable | 3.1.1 Language of Page; 3.1.2 Language of Parts; 3.2.1 On Focus; 3.2.2 On Input; 3.2.3 Consistent Navigation; 3.2.4 Consistent Identification; 3.2.6 Consistent Help; 3.3.1 Error Identification; 3.3.2 Labels or Instructions; 3.3.3 Error Suggestion; 3.3.4 Error Prevention (Legal, Financial, Data); 3.3.7 Redundant Entry; 3.3.8 Accessible Authentication (Minimum) |
| Robust | 4.1.2 Name, Role, Value; 4.1.3 Status Messages |

## Evidence and claims

In BUILD/FIX mode, report changes, checks actually run, and remaining gaps concisely. In AUDIT/HANDOFF mode, provide a table with `criterion or requirement`, `page/component/state`, `method`, `result`, and `evidence or fix`, plus:

- exact automated, browser, screen-reader, input, zoom, reflow, contrast, target-size, motion, and responsive coverage;
- reasons and next actions for every `not applicable`, `not tested`, or `blocked` item;
- relied-upon technologies, third-party limitations, and running-output page-title/language confirmation.

Use only `pass`, `fail`, `not tested`, `not applicable`, or `blocked`. Describe the tested scope as verified for WCAG 2.2 AA only when every applicable criterion has executed evidence of `pass`, all routes/processes/variations are covered, no A/AA finding or failing third-party dependency remains, and relied-on technologies are accessibility-supported. Otherwise say it targets WCAG 2.2 AA, list the remaining work, and do not call it “compliant”, “certified”, or “passing”; it may still be ready for independent testing. Report enhanced safeguards separately.

## Authoritative references

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [How to Meet WCAG 2.2: Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
