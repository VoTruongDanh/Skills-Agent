---
name: dark-mode-converter
description: "Reference guide for Dark Mode Converter"
encoding: "UTF-8"
---

# Dark Mode Converter

**Name:** Dark Mode Converter
**Description:** Audits a frame for dark-mode readiness by checking every fill/stroke/text is bound to a token with both light and dark values, flags anything raw or unbound, and checks contrast specifically in dark mode. Run this whenever a frame needs a dark-mode version or a dark-mode readiness check.

## When to invoke
Trigger when asked to produce a dark-mode version of a light-mode frame, or to audit a frame for dark-mode readiness.

## Steps
1. Walk every fill, stroke, and text style in the frame; confirm each is bound to a variable that has both light and dark values defined.
2. For anything bound to a token: switch the frame/mode context so it resolves to dark automatically — do not hand-pick a "dark version" of the color.
3. For anything not bound to a token (raw hex, image with a baked-in background): flag it — this is exactly what breaks silently in dark mode — and propose the correct token to bind it to.
4. Check contrast specifically in dark mode; a pairing that passes in light mode can fail in dark, and vice versa.
5. Check images/icons that assume a light background (dark-line icons, logos with no dark variant) and flag them separately from color-token issues.

## Guardrails — do not bend
- Never approve a frame as "dark-mode ready" without checking every raw, unbound value first — that's the actual point of this audit.
- Don't invent a dark-mode value for a token that doesn't have one; flag it upstream instead of guessing.

## Output
- Findings table: `Element | Bound? | Issue | Suggested token`.
- The converted frame, if a conversion (not just an audit) was requested.
