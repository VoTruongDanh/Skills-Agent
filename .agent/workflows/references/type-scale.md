---
name: type-scale
description: "Reference guide for TypeScale — Type Scale Generator & Registration Skill"
encoding: "UTF-8"
---

# TypeScale — Type Scale Generator & Registration Skill

Calculate a type scale and batch-create Figma local variables (fontFamily, fontWeight, fontSize, letterSpacing, lineHeight) and text styles.

## Modes

### Expert Mode
When the user provides multiple parameters in their first message, skip already-known items and only ask about what is missing.

Example: "Noto Sans JP, base 16px, Harmonic Series, T-shirt sizing, Medium+Bold, Standard, CJK adjustment yes, mobile mode at 14px, collection name Typography, with preview" → only ask for missing params.

### Beginner Mode
When invoked with just "/type-scale" and no additional parameters, ask the following questions one at a time using ask_user_question.

---

## Question Flow

### Q1: Font Family
Ask via ask_user_question with no preset options (free-text input).
- Question: "What font family would you like to use? (e.g., Inter, Noto Sans JP, Helvetica Neue)"

### Q2: Base Size
- Question: "What base font size?"
- Options: "14px", "16px", "18px"
- Default: 16px
- User can pick "Other" to enter a custom value

### Q3: Scale Ratio
- Question: "Which scale ratio would you like to use?"
- Options:
  - "Harmonic Series (recommended) — natural progression where larger sizes have smaller increments, ideal for web & apps"
  - "1.250 - Major Third — versatile and balanced, a great all-rounder"
  - "1.333 - Perfect Fourth — clear hierarchy, great for blogs and editorial"
- If "Other" is selected, offer these additional choices or allow a custom number:
  - 1.067 - Minor Second (subtle differences, dashboards and compact UI)
  - 1.125 - Major Second (gentle hierarchy, information-dense apps)
  - 1.200 - Minor Third (moderate hierarchy, content-rich websites)
  - 1.500 - Perfect Fifth (dynamic, landing pages and portfolios)
  - 1.618 - Golden Ratio (most dramatic, posters and editorial impact)

### Q4: Naming Convention
- Question: "Which naming convention for the scale levels?"
- Options:
  - "Semantic (h1, h2, h3, h4, h5, h6, body, caption, note, copyright — 10 levels)"
  - "T-shirt sizing (6xl, 5xl, 4xl, 3xl, 2xl, xl, lg, md, sm, xs, 2xs, 3xs — 12 levels)"

### Q5: Weight Configuration
- Question: "How should font weights be configured for each level?"
- Options:
  - "Single weight only (e.g., Regular)"
  - "Regular + Bold (two variants per level)"
  - "All available weights"
- If "Single weight only" is chosen, ask a follow-up to pick which weight (use evaluate_script to fetch available weights for the font from Q1, then present as options)

### Q6: Typography Style
- Question: "Choose a typography spacing style"
- Options:
  - "Tight — balanced, standard spacing"
  - "Standard — comfortable and refined"
  - "Relaxed — open and editorial"
- If "Other" is selected, ask for line-height (heading / body) and letter-spacing (heading / body) as numeric values

#### Typography Preset Values (Latin Fonts)

| Preset | Heading LH | Body LH | Heading LS (‰) | Body LS (‰) |
|---|---|---|---|---|
| Tight | 1.3 | 1.5 | 0 | 20 |
| Standard | 1.4 | 1.75 | 20 | 40 |
| Relaxed | 1.5 | 2.0 | 50 | 80 |

#### CJK Font Adjusted Values

| Preset | Heading LH | Body LH | Heading LS (‰) | Body LS (‰) |
|---|---|---|---|---|
| Tight | 1.4 | 1.6 | 10 | 30 |
| Standard | 1.5 | 1.85 | 30 | 60 |
| Relaxed | 1.6 | 2.1 | 60 | 100 |

### Q6b: CJK Font Detection (only when detected)
If the font name from Q1 contains any of these keywords, add this question:
- Detection keywords: JP, Gothic, Mincho, Noto Sans JP, Noto Serif JP, SC, TC, HK, CJK, KR, or CJK characters in the name

- Question: "A CJK font was detected. Would you like to adjust letter-spacing and line-height for CJK typography? (wider spacing is recommended for CJK text)"
- Options: "Yes (recommended)", "No (use Latin values)"

### Q7: Mobile Mode
- Question: "Would you like to create a separate mobile type scale? (creates Desktop and Mobile modes within the same collection)"
- Options: "Yes", "No"
- If "Yes", follow-up questions:
  - "Base size for mobile?" (Options: "12px", "14px", "16px")
  - "Use the same scale ratio as desktop?" (Options: "Yes", "No (specify a different ratio)")

### Q8: Collection Name
- Question: "Collection name — is 'Type Scale' OK?"
- Options: "Type Scale is fine", "I'd like a different name"
- Only ask for free-text input if they want to change it

### Q9: Advanced Settings
- Question: "Would you like to configure advanced settings? (leadingTrim for vertical text trimming, OpenType features like kerning)"
- Options: "No (use defaults)", "Yes, configure"
- If "Yes":
  - Enable leadingTrim? (Yes / No)
  - Enable OpenType Features (kern, palt, etc.)? (Yes / No)

### Q10: Preview Output
- Question: "Would you like to output a type scale preview on the canvas?"
- Options: "Yes", "No"
- If "Yes": generate a frame on the canvas with text nodes stacked vertically, each with the created text style applied and a label showing name, size, weight, letter-spacing, and line-height.

---

## Type Scale Calculation Logic

### Semantic Names
SCALE_NAMES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'note', 'copyright']
bodyIndex = 6 (body is the base size)

### T-Shirt Size Names
TSHIRT_NAMES = ['6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs', '3xs']
baseIndex = 7 (md is the base size)

### Harmonic Series Calculation
size = Math.round((baseSize * 8) / (i - baseIndex + 8))
- i is the item index (0-based)
- baseIndex is the index of the base size item

### Ratio-Based Calculation
size = Math.round(baseSize * Math.pow(scaleRatio, baseIndex - i))

### Heading vs. Body Classification
- Semantic: h1–h6 (index 0–5) are headings; body onward (index 6+) are body
- T-shirt: lg and above (index 0–6) are headings; md onward (index 7+) are body

### Weight Expansion
- Single weight: item names stay as-is (e.g., h1, h2, body)
- Regular + Bold: each item splits into two (e.g., h1/Regular, h1/Bold) sharing the same fontSize but different fontWeight
- All weights: each item splits into all available font weights (e.g., h1/Thin, h1/Light, h1/Regular, h1/Bold, h1/Black)

---

## Execution Steps

Once all parameters are collected, use evaluate_script with the Figma Plugin API to execute the following.

### Step 1: Create Variable Collection

1. Search for an existing collection with the same name (reuse if found)
2. Create or retrieve the collection
3. Configure modes:
   - Without mobile: use the default mode as-is (no mode name)
   - With mobile: rename the default mode to "Desktop" and add a "Mobile" mode
4. Save metadata to pluginData (baseSize, scaleRatio, itemOrder)

### Step 2: Create Variables for Each Item

For each item (e.g., h1/Regular), create 5 variables:
- {name}/fontFamily (STRING, scope: FONT_FAMILY)
- {name}/fontWeight (STRING, scope: FONT_STYLE)
- {name}/fontSize (FLOAT, scope: FONT_SIZE)
- {name}/letterSpacing (FLOAT, scope: LETTER_SPACING) — store raw ‰ value (for reference)
- {name}/lineHeight (FLOAT, scope: LINE_HEIGHT) — store raw multiplier (for reference)

Replace spaces in names with hyphens.
If a variable with the same name exists, overwrite it (setValueForMode).

When mobile mode is enabled, set values for both Desktop and Mobile modes. Mobile recalculates fontSize only; fontFamily, fontWeight, letterSpacing, and lineHeight remain the same as Desktop.

### Step 3: Create Text Styles

**CRITICAL: Do NOT bind letterSpacing or lineHeight variables to text styles. Set these properties directly on the text style.**
Figma variables for these properties are interpreted as pixel values, which is incompatible with the relative units (‰ and multiplier) used here. Only bind fontFamily, fontStyle, and fontSize.

For each item, create a text style:

1. Reuse an existing text style with the same name, or create with figma.createTextStyle()
2. textStyle.name = item name
3. await figma.loadFontAsync({ family, style }) to load the font
4. textStyle.fontName = { family, style }

5. **Variable bindings (only these 3):**
   - textStyle.setBoundVariable('fontFamily', fontFamilyVar)
   - textStyle.setBoundVariable('fontStyle', fontWeightVar)
   - textStyle.setBoundVariable('fontSize', fontSizeVar)

6. **Set letterSpacing directly (do NOT bind):**
   - Convert ‰ to % and set directly
   - textStyle.letterSpacing = { value: letterSpacingPerMille / 10, unit: 'PERCENT' }
   - Example: 30‰ → { value: 3, unit: 'PERCENT' }

7. **Set lineHeight directly (do NOT bind):**
   - Convert multiplier to % and set directly
   - textStyle.lineHeight = { value: lineHeightMultiplier * 100, unit: 'PERCENT' }
   - Example: 1.5 → { value: 150, unit: 'PERCENT' }

8. If leadingTrim is enabled: textStyle.leadingTrim = 'CAP_HEIGHT'
9. If OpenType Features are enabled: textStyle.kerning = true; save others (palt, etc.) via textStyle.setPluginData()

### Step 4: Preview Output (only if Q10 = Yes)

1. Create a frame at the user's current viewport position
2. Stack text nodes vertically inside the frame (Auto Layout, vertical, spacing 24px)
3. Apply the created text style to each text node
4. Add a small label above each text node (name — sizepx / weight / LS‰ / LH)
5. Use dummy text appropriate for the font language:
   - Latin: "The quick brown fox jumps over the lazy dog."
   - CJK/Japanese: "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら"

### Step 5: Completion Report

After creation, report:
- Number of variables created
- Number of text styles created
- Collection name and mode configuration
- Table of all items with name and font size
