---
name: import-tokens
description: "Reference guide for Import Design Tokens"
encoding: "UTF-8"
---

# Import Design Tokens

Import design tokens from a user-provided file into the current Figma file as local variables and text/color/effect styles. Supports fresh imports into empty files and incremental updates to existing variable systems.

Run all scripts through `use_figma`, with `figma-use` in the `skillNames` parameter. Code is
auto-wrapped in an async context — use top-level `await` and `return` explicitly, since
only the returned value is visible and `console.log` is not.

---

## Supported Input Formats

Detect the format automatically by inspecting the file structure:

| Format | Detection Signal |
|---|---|
| **DTCG / tokens.json** | Objects with `$type` and `$value` keys |
| **Tailwind config** | `module.exports` or `export default` with `theme.extend` or `theme` |
| **Style Dictionary** | Objects with `value` and optionally `type` keys (no `$` prefix) |
| **CSS custom properties** | `:root { --var-name: value; }` |
| **Raw JSON** | Nested objects with leaf string/number values that look like colors (`#hex`, `rgb()`), sizes (`Npx`, `Nrem`), or font names |

If the format is ambiguous, ask the user which interpretation to use.

---

## Step 1: Parse the input file

Read the file the user provided (pasted inline or attached). Normalize all tokens into a flat internal list:

```
[
  { path: "color/background/default", type: "COLOR", value: "#f2f1ef" },
  { path: "spacing/space-1", type: "FLOAT", value: 4 },
  { path: "typography/fontFamily/sans", type: "STRING", value: "Season Sans" },
  ...
]
```

**Parsing rules:**
- `/` or `.` separators in token paths → split into collection + variable path
- Hex colors (`#rgb`, `#rrggbb`, `#rrggbbaa`) → type COLOR, convert to Figma RGBA (0-1 floats)
- `rgb()` / `rgba()` / `hsl()` / `hsla()` → type COLOR, convert to Figma RGBA
- Numbers with `px` or `rem` suffix → type FLOAT (strip unit, convert rem to px using 16px base)
- Plain numbers → type FLOAT
- `cubic-bezier(...)` → type FLOAT (store as easing metadata)
- Duration strings (`300ms`, `0.3s`) → type FLOAT (normalize to seconds)
- Font family strings → type STRING
- Font weight numbers → type FLOAT
- Boolean `true`/`false` → type BOOLEAN
- Alias references (`{path.to.token}` or `$value: "{...}"`) → type matches target, store as VARIABLE_ALIAS

**Collection inference:**
- If the input has top-level groups (e.g. `"sizing"`, `"color"`, `"typography"`), use those as collection names
- If it's a flat Tailwind config, infer collections from theme keys: `colors` → "color", `spacing` → "sizing", `fontSize`/`fontFamily`/`fontWeight` → "typography", `transitionDuration`/`transitionTimingFunction` → "motion", `borderRadius`/`blur`/`boxShadow` → "sizing"
- If the structure is unclear, create a single collection named after the file

---

## Step 2: Inventory existing variables

Use `use_figma` to read the current file's local variables and collections:

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const variables = await figma.variables.getLocalVariablesAsync();
```

Build a lookup map of `collectionName + "/" + variableName` → variable object, so you can detect what already exists.

Also read existing local paint styles and text styles for the style-creation step:
```js
const paintStyles = await figma.getLocalPaintStylesAsync();
const textStyles = await figma.getLocalTextStylesAsync();
```

---

## Step 3: Compute the change plan

Compare parsed tokens against existing variables to produce three lists:

- **Add**: Tokens with no matching existing variable (by collection + path)
- **Update**: Tokens that match an existing variable but the value differs
- **Remove**: Existing variables that are NOT in the incoming token file (only flag these — don't remove without asking)

Present the change plan to the user before executing:

```
📋 Import Plan:
• 12 new tokens to add (3 colors, 6 spacing, 3 typography)
• 4 tokens to update (2 color values changed, 2 font weights changed)
• 2 existing tokens not in the import file (will keep unless you say to remove)
• 0 new collections to create

Proceed?
```

If the user says to proceed, execute. If they want to remove the missing tokens too, include those in the execution.

---

## Step 4: Create/update collections

For each collection that needs to be created:

```js
const collection = figma.variables.createVariableCollection("collection-name");
// Rename the default mode if needed
collection.renameMode(collection.modes[0].modeId, "Default");
```

For existing collections, just look them up by name — do NOT recreate them.

---

## Step 5: Create/update variables

Process all tokens in dependency order (primitives first, then aliases that reference them).

**Creating a new variable:**
```js
const variable = figma.variables.createVariable("path/to/token", collectionId, resolvedType);
variable.setValueForMode(modeId, resolvedValue);
```

Where `resolvedType` is one of: `"COLOR"`, `"FLOAT"`, `"STRING"`, `"BOOLEAN"`

And `resolvedValue` for colors is: `{ r: 0-1, g: 0-1, b: 0-1, a: 0-1 }`

**Updating an existing variable:**
```js
const existing = await figma.variables.getVariableByIdAsync(existingId);
existing.setValueForMode(modeId, newValue);
```

**Setting alias references:**
If a token's value is an alias (e.g. `{color.primary.blue}`), resolve the target variable ID and set:
```js
variable.setValueForMode(modeId, { type: "VARIABLE_ALIAS", id: targetVariable.id });
```

**Setting scopes** (if provided in the input):
```js
variable.scopes = ["CORNER_RADIUS"]; // or ["ALL_SCOPES"], ["WIDTH_HEIGHT", "GAP"], etc.
```

**Setting code syntax** (if provided). `codeSyntax` is read-only — assigning to it throws,
so use the setter, one platform per call (`'WEB'`, `'ANDROID'`, `'iOS'`):
```js
variable.setVariableCodeSyntax("WEB", "var(--token-name)");
```

---

## Step 6: Create/update styles

After variables are in place, create local styles where appropriate:

**Color styles** — for each semantic color token (not primitives), create a paint style bound to its variable:
```js
const style = figma.createPaintStyle();
style.name = "Color/Background/Default"; // match the token path
const paint = figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 1 },
  "color",
  variable
);
style.paints = [paint];
```

**Text styles** — if typography tokens include fontSize + fontFamily + fontWeight combos, create text styles:
A `TextStyle` has no `fontWeight` and no `setFontNameAsync` — weight travels inside
`fontName.style`, and the font must be loaded before it is assigned:
```js
const fontName = { family: "Season Sans", style: "Regular" }; // 400 → "Regular", 700 → "Bold"
await figma.loadFontAsync(fontName);        // throws later if skipped
const style = figma.createTextStyle();
style.name = "Body/text-sans-16-400";
style.fontName = fontName;
style.fontSize = 16;
```
Map numeric weights to style names via `figma.listAvailableFontsAsync()` rather than
guessing — `"SemiBold"` and `"Semi Bold"` are both real and not interchangeable.

For existing styles with the same name, update their values instead of creating duplicates.

**Effect styles** — if depth/shadow tokens exist, create effect styles:
```js
const style = figma.createEffectStyle();
style.name = "Depth/200";
style.effects = [{
  type: "DROP_SHADOW",
  color: { r: 0, g: 0, b: 0, a: 0.1 },
  offset: { x: 0, y: 8 },
  radius: 16,
  spread: -4,
  visible: true,
  blendMode: "NORMAL"
}];
```

---

## Step 7: Report results

Present a summary to the user:

```
✅ Import complete — v0.2.0

Collections: 4 (1 new, 3 updated)
Variables: 218 total
  • 12 added
  • 4 updated
  • 202 unchanged

Styles: 24 total
  • 6 color styles created
  • 18 text styles created

No tokens were removed. 2 existing tokens were not in the import file and were kept.
```

---

## Handling Edge Cases

**Tailwind `DEFAULT` keys**: When a Tailwind config has `DEFAULT: "#value"`, map it to the parent path as the base value (e.g. `colors.red.DEFAULT` → variable path `color/red` with that value).

**Tailwind arrays for fontSize**: `"scale-01": ["14px", { lineHeight: "1.5" }]` → create a fontSize variable (14) and note the lineHeight for text style creation.

**Nested Tailwind objects**: Recursively flatten into paths. `colors.background.accent["gray-subtlest"]` → `color/background/accent/gray-subtlest`.

**Conflicting types**: If an incoming token has a different type than the existing variable (e.g. was STRING, now COLOR), warn the user and skip unless they confirm. Variables can't change type in place — would need to delete and recreate.

**Font availability**: When creating text styles, wrap font loading in try/catch. If a font isn't available, warn the user but still create the style with the closest available font.

**Large imports**: For files with 200+ tokens, batch the `use_figma` calls to avoid timeouts. Process in chunks of ~50 variables per call.

**rem to px**: Convert rem values using `1rem = 16px` unless the user specifies a different base.

---

Credit: Originally written by @marktoadvine (Mark Toadvine)
