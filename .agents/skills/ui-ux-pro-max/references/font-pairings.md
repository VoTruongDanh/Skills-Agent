---
name: font-pairings
description: "Reference guide for Font Pairings"
encoding: "UTF-8"
---

# Font Pairings

Analyze a design's visual character, then generate and apply alternate font pairing options as side-by-side duplicates with labeled previews for easy comparison.

## Workflow

### Step 1 — Analyze the design

Before suggesting any pairings, analyze the selected frame to understand its character. Use the Plugin API and visual inspection to assess:

**Content & Purpose:**
- What type of artifact is this? (landing page, dashboard, app screen, editorial, documentation, marketing, etc.)
- What's the information density? (sparse/airy vs. data-heavy)
- What's the text hierarchy depth? (simple heading/body vs. complex multi-level)

**Visual Tone & Aesthetic:**
- What's the overall mood? (corporate, playful, editorial, technical, luxurious, minimal, brutalist, etc.)
- Color palette character — warm/cool, muted/vibrant, monochrome/colorful
- Layout style — grid-rigid, organic, card-based, editorial columns, etc.
- Use of imagery vs. text-driven

**Typographic Role:**
- How prominent is typography in the design? (hero element vs. functional/secondary)
- Are there decorative type moments (large display text, pull quotes) or is it purely functional?
- What rhythm does the current type create? (tight/dense vs. open/breathing)

**Current Font Assessment:**
- Scan all text nodes and identify current heading, body, and tertiary fonts
- Note the current pairing's character (geometric, humanist, monospace, serif, etc.)
- Identify what's working and what a new pairing should preserve (e.g. "the monospace labels are essential to the dev-tool identity")

Summarize the analysis in 3-4 sentences for the user before proceeding.

### Step 2 — Generate font pairing options

Propose **5 font pairing options** informed by the design analysis. Each option includes:
- A **heading font** (display/headline use)
- A **body font** (paragraph/readable use)
- A short **rationale** connecting the choice to what you observed in the design

**How to select pairings:**

If the user provided direction (e.g. "fun, serif, monospaced, financial"):
- Use each user-specified direction as one pairing slot
- Fill remaining slots (up to 5) with suggestions informed by the design analysis
- The analysis-informed slots should offer complementary or contrasting directions the user might not have considered — based on what suits the design's character

If the user provided NO direction:
- Use the design analysis to suggest 5 pairings that span a range from safe evolution to adventurous departure
- Weight suggestions toward pairings that respect the design's purpose and tone
- Include at least one "unexpected but justified" option that reframes the design's personality

**Pairing principles:**
- Mix contrast: pair a serif heading with a sans body, or a bold geometric with a humanist sans
- Ensure readability: body fonts must work well at 14–18px
- Match the design's information density — don't put a decorative display face on a data-heavy dashboard
- Consider the tertiary/mono layer — some designs need a monospace accent; suggest one when appropriate
- Only suggest fonts available in Figma (Google Fonts catalog)

Present the 5 options briefly, then immediately proceed to Step 3. Do NOT wait for the user to pick — apply all 5 simultaneously as side-by-side duplicates.

### Step 3 — Create duplicate frames with font pairings applied

Automatically duplicate the selected frame 5 times, positioning copies side-by-side with a 100px gap. For each duplicate:

1. Rename the frame to "Font Pairing N — [Heading Font] + [Body Font]"
2. Load all required font variants using `figma.loadFontAsync()`
3. Walk all text nodes and reclassify by original font family:
   - Original heading font → new heading font
   - Original body font → new body font
   - Original mono/tertiary font → new mono/tertiary font
4. Map weight variants to the closest available weight in the new family (check with `figma.listAvailableFontsAsync()` first)
5. Preserve all sizes, colors, line heights, and alignment

### Step 4 — Add label frames above each duplicate

Create a label frame above each duplicated design frame showing the pairing in action:

**Label frame specs:**
- Auto-layout frame, vertical, fixed width matching the design frame (e.g. 1280px), height hugs content
- Padding: 40px all sides
- Item spacing: 16px
- Light background fill (e.g. #F7F7F7), 8px corner radius

**Heading text:**
- Set in the heading font of that pairing
- Font size: 32px, line height: 40px
- Content: A fun, clever sentence that starts with the font name (e.g. "Fraunces Is Not French, Madam")

**Body text:**
- Set in the body font of that pairing
- Font size: 16px, line height: 24px
- Content: A witty sentence that starts with the body font name and references its role (e.g. "DM Sans? I'm not going to send any DM's to him. He stole all of the feet off of my sentences last week.")

**Copy guidelines:**
- First word(s) must be the font name, cleverly worked into a sentence
- Tone: playful, witty, typographic humor — never NSFW or racy
- Each pairing gets unique copy; no repeats
- Heading copy should be 5-8 words
- Body copy should be 1-2 sentences

**Height matching:**
After creating all 5 labels, find the tallest one and set ALL labels to that fixed height so they align evenly across the row. Reposition each label to sit directly above its design frame with a 40px gap.

### Step 5 — Invite feedback

After all frames and labels are created, present the results as clickable node links and ask:
"Want me to try different directions, adjust any of these, or remove the ones you don't like?"

## Important Notes

- Always check available font styles with `figma.listAvailableFontsAsync()` BEFORE attempting to load fonts — many families don't have "Medium" and need "SemiBold" or "Bold" as a substitute
- Font style names require spaces (e.g. "Semi Bold" not "SemiBold", "Extra Light" not "ExtraLight")
- Always load fonts before applying them
- When changing font family, map weights to the closest available weight in the new family
- Preserve mixed-style text runs (e.g., a bold word within a body paragraph)
- If a frame contains components/instances, work on the overrideable text layers only
- Never change font sizes, line heights, or letter spacing unless the user asks
