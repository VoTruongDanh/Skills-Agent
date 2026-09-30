---
name: apply-color-variables
description: "Reference guide for Apply existing Color variables"
encoding: "UTF-8"
---

# Apply existing Color variables

## Purpose
Use this skill to replace hard-coded colors in a Figma file with **existing Color variables** from the chosen Variables collection. The goal is to make fills, strokes, text colors, and effect colors use the design system’s variable collection instead of raw color values.

## When to use
Use this skill when the user asks to:
- apply existing Color variables to colors that are not using variables
- convert raw hex/RGB colors to variables
- clean up a Figma file so colors use the team’s Variables collection
- audit a design for unbound colors and bind them to existing variables

Do **not** use this skill to create, rename, delete, or change variables.

## Default behavior
If the user does not specify details, use these defaults:
- **Scope:** current selection; if nothing is selected, use the current page
- **Variable source:** ONLY use referenced aliases collection.
- NEVER bind Primitives collection variables directly to nodes. Primitive variables are implementation details that should only be referenced through semantic aliases.
- **Matching rule:** exact color matches only
- **Variable creation:** never create new variables
- **Unmatched colors:** report them instead of changing them

## Clarify only when necessary
Ask a short question before editing if any of these are unclear and materially affect the result:
1. Which Variables collection should be used?
2. Should the work apply to the selection, current page, or entire file?
3. Should matching be exact only, or may near matches be used?
4. If the file uses modes such as Light and Dark, which mode should be used for matching?

If the likely answer is obvious from the file context, proceed and state the assumption in the final summary.

## Operating rules
- Use only **existing Color variables**.
- Bind colors to variables; do not simply copy variable values as raw colors.
- Preserve layout, layer structure, names, constraints, variants, component relationships, and non-color styling.
- Leave any color that is already bound to a variable unchanged unless it is bound to the wrong collection and the user explicitly asked to normalize collections.
- Do not replace variables with paint styles unless the user explicitly asks for styles.
- Do not approximate colors unless the user explicitly allows near-match replacement.
- Do not change opacity, blend mode, stroke width, effect blur, or any non-color property.

## Step-by-step process

### 1. Identify the target scope
Determine whether to scan:
- the current selection
- the current page
- the entire file
- a specific frame, section, component, or page named by the user

If scanning the entire file could be large or risky, tell the user what scope you are using before applying changes.

### 2. Build the Color variable map
From the target Variables collection or collections:
1. List all variables of type **Color**.
2. Resolve their values for the relevant mode or modes.
3. Normalize each variable value into comparable RGBA values.
4. Record each variable’s name, collection, mode, and resolved color.

Prefer semantic variables when there are duplicates. For example, prefer `Semantic / Background / Primary` over `Primitive / Blue / 500` when both match and the semantic variable appears intended for UI usage.

### 3. Scan for unbound color properties
Within the target scope, inspect color-bearing properties, including where supported:
- fills
- strokes
- text fills
- effect colors, such as shadows
- component and instance properties that expose color values

For each property, classify it as:
- **Already variable-bound** — leave unchanged
- **Hard-coded and matchable** — candidate for variable binding
- **Hard-coded and unmatched** — report only
- **Unsupported or ambiguous** — report only

### 4. Match hard-coded colors to variables
For every hard-coded color:
1. Normalize the color and opacity to RGBA.
2. Compare it against the Color variable map.
3. Use exact RGBA matching by default.
4. If multiple variables match, choose the best candidate using this priority:
1. variable from the user-specified collection
2. semantic token over primitive/raw token
3. token name that matches the layer/property context
4. shorter, cleaner, more current-looking token name
5. if still ambiguous, do not guess; report the ambiguity

### 5. Apply bindings
For every confident match:
1. Bind the color property to the matched existing Color variable.
2. Preserve the property’s non-color settings.
3. Keep the visual appearance unchanged after binding.
4. If a variable has modes, bind the variable itself rather than hard-coding a mode value.

### 6. Validate the result
After applying changes:
1. Re-scan the same scope.
2. Confirm that matched hard-coded colors are now variable-bound.
3. Confirm unmatched colors were not changed.
4. Confirm visible appearance is unchanged except for variable binding.
5. Check representative examples: fill, stroke, text, and effect color if present.

## Final response format
Return a concise summary with these sections:

### Updated
- Number of layers or nodes checked
- Number of color properties changed from hard-coded values to Color variables
- Number of properties already using variables

### Unmatched colors
List hard-coded colors that could not be mapped to an existing variable. Group by color value and include where they appear.

Example:
- `#F24E1E` at 80% opacity — 3 uses: `Button / Icon`, `Alert / Border`, `Badge / Fill`

### Ambiguities
List cases where multiple variables matched and no confident choice was possible, or state that there were none.

### Assumptions
State any assumptions made, such as scope, collection, or mode.

## Edge cases
- **Gradients:** bind variable-supported gradient stops only if Figma supports variable binding for that property. Otherwise report them.
- **Images:** do not attempt to alter bitmap/image colors.
- **Remote libraries:** use available library variables if they are enabled and accessible. If not accessible, report that the variable source is unavailable.
- **Detached or legacy components:** update only the eligible color properties; do not restructure components.
- **Different opacity:** treat opacity as part of the color match. `#000000` at 40% is not the same as `#000000` at 100%.
- **Near matches:** only use near matches when explicitly allowed by the user. When allowed, report every near match separately from exact matches.

## Hard stop conditions
Stop and ask the user before editing if:
- no Color variable collection is available
- multiple likely collections exist and choosing the wrong one would be risky
- the user requested near matching but gave no tolerance or rule
- the requested change would require creating or modifying variables
- applying the change would affect a very large scope and the user did not explicitly request that scope
