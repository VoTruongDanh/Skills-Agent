---
name: generate-8-states
description: "Reference guide for Generate State Frames"
encoding: "UTF-8"
---

# Generate State Frames

Create 8 UI state variation frames from the user's selected screen. Each frame preserves the selected screen's shell (status bar, navigation/header, tab bar, home indicator, and any other chrome components) and replaces the body/content area with state-specific content.

## Workflow

### 1. Inspect the selected screen

Use `evaluate_script` to walk the selected screen's layer tree. Identify and record:

- **Shell layers** — status bar, header/nav bar, dividers, tab bar, bottom nav, home indicator, or any other persistent chrome. Note their node IDs and component keys.
- **Body/content area** — the main scrollable or content frame between the shell layers. This is what gets replaced per state.
- **Screen dimensions** — width and height of the selected frame.
- **Visual style cues** — background color, corner radius, font families, primary/accent colors, spacing scale, and border/divider usage so the state content matches.

### 2. Check the design system

Before creating, search the file's enabled libraries for any existing state-related components that should be reused:
- Empty state illustrations or placeholders
- Error banners or alert components
- Loading skeletons or spinner components
- Button components (primary, secondary, ghost)
- Icon components (warning, error, lock, wifi-off, cloud-off)
- Toast / snackbar components

Use any that exist. Only create custom content where no DS component covers the need.

### 3. Generate all 8 state frames

Call the design tool to create the 8 frames in a single batch. Each frame must:

- Be the same dimensions as the selected screen
- Keep the shell layers identical (status bar, header, divider, tab bar, home indicator)
- Adapt the header title if contextually appropriate (e.g., keep the same title)
- Replace ONLY the body/content area with state-specific content
- Follow the same spacing scale, font families, and color palette as the original
- Center state content vertically within the body area
- Use the screen's name as a prefix: `{ScreenName} — {StateName}`

#### Frame definitions

**Loading**
- Skeleton placeholders mimicking the shape of the original content (rounded rectangles for text lines, circles/rounded-rects for images, cards, or chips)
- Subtle shimmer or pulse implied through reduced-opacity fills
- No actionable buttons

**Empty**
- Centered illustration placeholder or icon (inbox, folder, list icon)
- Headline: contextual "No [items] yet" message
- Subtitle: one-line encouragement or explanation
- Primary CTA button to add/create the first item

**First Run**
- Welcome or onboarding illustration placeholder
- Headline: "Get started with [feature]"
- 2–3 short bullet points or step indicators explaining the feature
- Primary CTA button to begin

**Error**
- Warning/error icon or illustration
- Headline: "Something went wrong"
- Subtitle: brief apology and suggestion to retry
- Primary "Try Again" button and secondary "Go Back" text button

**Offline**
- Cloud-off or wifi-off icon
- Headline: "You're offline"
- Subtitle: "Check your connection and try again"
- Primary "Retry" button

**Permission Denied**
- Lock or shield icon
- Headline: "Access restricted"
- Subtitle: "You don't have permission to view this. Contact your admin for access."
- Primary "Request Access" button and secondary "Go Back" text button

**Over Limit**
- Gauge/meter or limit icon
- Headline: "Limit reached"
- Subtitle: contextual message about the plan or quota limit
- Primary "Upgrade" or "View Plans" button and secondary "Dismiss" text button

**Partial Data**
- Show 1–2 skeleton/placeholder content cards at the top to imply some content loaded
- Below them, a subtle divider or spacing break
- Centered notice: "Some content couldn't be loaded"
- Small "Retry" link/button beneath the notice
- The partial cards should echo the shape of the original screen's content items

### 4. Arrange on canvas

After creation, use `evaluate_script` to arrange all 8 frames in a 4×2 grid to the right of the selected screen, with consistent horizontal and vertical spacing (e.g., 80px gap). Order: Loading, Empty, First Run, Error (top row), Offline, Permission Denied, Over Limit, Partial Data (bottom row).

### 5. Present results

Tell the user the 8 state frames are ready and link to them as a group. Ask if they'd like adjustments to any specific state.
