---
name: state-coverage-flow-audit
description: "Reference guide for State Coverage & Flow Audit v2.1"
encoding: "UTF-8"
---

# State Coverage & Flow Audit v2.1

A professional design QA/audit tool for UI state completeness. Not a generic design checklist — this skill reasons about what can actually happen in the selected UI and documents findings as a polished audit report directly in the Figma file.

**Primary workflow:** INSPECT → MODEL → EVALUATE → DOCUMENT → ANNOTATE → PRIORITIZE → TRACK

This skill answers four questions:
1. What states does this design need to represent?
2. Which of those states are already designed?
3. Which important states are missing?
4. What should the designer address first?

**This is NOT a generic design QA tool.** Do not audit spacing, colors, typography, accessibility, visual polish, component naming, design-system compliance, or developer handoff. Focus specifically on STATE COVERAGE.

---

## Applicability principle

A transaction-history screen can reasonably need: populated, empty, loading, error, partial data.
A static marketing hero does NOT automatically need: empty, loading, offline, timeout.

Do not create findings for states that are clearly not applicable. The skill distinguishes:
- ✓ Covered
- ✕ Missing
- ~ Partial / unclear
- — Not applicable
- ⚠ Recommended / uncertain

Never treat a heuristic recommendation as a definite defect.

---

## Evidence-based language

Never make claims about the actual shipped product when only the Figma file was inspected.

**BAD:** "The app has no error states."
**GOOD:** "No explicit error state was identified in the reviewed designs."

Always distinguish:
- **OBSERVED:** What exists or does not exist in the inspected Figma file
- **INFERENCE:** What risk that absence could create

Do not present inference as fact.

---

## Evidence model

Every finding must classify its evidence level:

- **CONFIRMED** — The state is visibly present in the inspected design.
- **GAP** — No corresponding state was found within the inspected scope.
- **NOT VERIFIABLE** — Available Figma evidence is insufficient to determine whether the state exists elsewhere.

Never claim a state definitely does not exist when the available evidence cannot establish that.

Add confidence where useful: **High**, **Medium**, **Low**.

---

## Hard rule — every flag must be specific, never generic

**Banned, always:**
- Writing "add an X state" without naming the specific content and why it matters for *this* screen
- Flagging a state that doesn't apply to this screen's actual content just to keep the checklist symmetric
- Marking a state "covered" because a matching variant *could* be built from a component in the library, when nothing in scope actually shows it applied
- Manufacturing findings to make the report look useful

**Required:** Every gap finding must name the specific content region, the specific state missing, and the specific user impact for *this* screen.

---

## Supported analysis scope

When the user runs the skill, ask what they want to review:
- Selected layers
- Selected component
- Current page
- Selected screens / frames
- Entire user flow
- Entire file

If the user has already selected an obvious target, use that target and avoid unnecessary questions.

---

## State categories (reasoning reference — do NOT apply all blindly)

### Core states
- Default, Empty, Populated, Loading, Success, Error, Disabled

### Input / form states
- Empty input, Filled input, Focus, Invalid input, Validation error, Disabled input
- Submission loading, Submission success, Submission failure

### Network / system states
- Offline, Network failure, Timeout, API failure, Session expired, Permission denied

### Transaction states
- Review, Confirmation, Processing, Success, Failed, Cancelled
- Duplicate submission protection, Retry/recovery

### Authentication states
- Login, Invalid credentials, Loading, OTP entry, Invalid OTP, Expired OTP
- Resend, Resend cooldown, Verification success, Verification failure

Only mark a state as applicable when the screen or user flow actually requires it.

---

## Flow-aware analysis

Do not analyze screens in isolation. First understand:
- What the screen is for
- Where the user came from
- What action the user can perform
- What happens after the action
- Whether the action changes data
- Whether the action depends on network/API behavior
- Whether the action involves authentication
- Whether the action involves financial or irreversible activity

A static About screen does not need loading/submission/transaction failure states.
An IPO application submission DOES need validation/processing/success/failure/retry states.

---

## Applicability engine

Before reporting a missing state, internally classify each candidate:

- **REQUIRED** — Clearly relevant to the UI's normal behavior
- **CONDITIONAL** — Relevant under a plausible condition but not necessarily required
- **NOT APPLICABLE** — No meaningful evidence that the state belongs to this UI
- **UNKNOWN** — Insufficient evidence to determine applicability

Only report REQUIRED missing states as definite gaps. CONDITIONAL states appear under "Recommended considerations." UNKNOWN states should not be presented as defects.

---

## Detect existing coverage

A state counts as covered when it is visibly represented by:
- An existing frame or screen
- A component variant
- An instance
- A state-specific screen
- A prototype destination
- A clearly labeled state
- A nearby related screen that clearly represents the same state

Do not assume a state is missing simply because it is not visible in the currently selected frame. Search the relevant scope for related states before declaring a gap.

---

## Financial / high-risk flows

For financial, payment, trading, IPO, transfer, or other high-impact flows, explicitly check for:
- Validation
- Confirmation / review step
- Processing / loading
- Success with clear completion feedback
- Failure with actionable guidance
- Retry / recovery path
- Duplicate submission protection

These are CRITICAL when missing from a financial transaction flow.

---

## Important special states

### A. Partial / degraded
Dashboard loads account balance but market data fails. Look for partial availability.

### B. Boundary / limit
Maximum characters, upload size, selections, amounts, list size.

### C. Interrupted / unsaved
Unsaved form changes, interrupted uploads/payments, abandoned multi-step processes.

### D. Authentication vs. Authorization
Keep separate. Authentication: "Your session expired." Authorization: "You don't have permission."

### E. Recovery
Check for: Retry, Resend, Undo, Back, Edit, Restore, Contact support.

### F. Empty sub-states
- **First-run empty** — user has never had content. Needs guidance and CTA.
- **Returning-empty** — content cleared/completed. Needs acknowledgment, not onboarding.

When both sub-states are plausible (lists, feeds, notifications), flag if neither is distinguished.

---

## Severity model

CRITICAL — Missing state could materially affect: financial transaction completion, authentication/security, irreversible action, data integrity, inability to know whether a critical transaction succeeded.

HIGH — Important production flow with meaningful user impact: core feature errors, missing validation, missing empty state for primary workflows, missing retry/recovery.

MEDIUM — Useful state that improves robustness but is less critical.

LOW — Advisory or edge-case consideration.

Do not inflate severity simply because a state is missing.

### Journey weighting
- **Critical path** (login, signup, checkout, payment) — highest priority
- **Core feature** (main content, lists, dashboards) — high priority
- **Secondary** (about, support, preferences, static) — lower priority

---

## Content-type detection

Classify each content region independently:

| Content type | Signal |
|---|---|
| **List / collection** | Repeated siblings of near-identical structure |
| **Form** | Input nodes grouped with labels and submit action |
| **Search** | Text input + magnifying glass icon feeding a list |
| **Media / upload** | Image node + upload/camera affordance |
| **User-generated text** | Text node with user-authored content |
| **Detail / profile** | Composite region showing one entity's full view |
| **Destructive affordance** | Button/action implying deletion, removal, cancellation |
| **Authenticated region** | Screen behind login or showing role-specific content |

Low-confidence classification is reported as such.

---

## Checkpoint table

`Required` = always checked. `Conditional` = checked only when applicable. `---` = doesn't apply.

| Content type | Empty | Loading | Error | Long-content | Success | Validation | Destructive confirm |
|---|---|---|---|---|---|---|---|
| List / collection | Required | Required | Required | Required | --- | --- | Conditional |
| Form | --- | Required | Required | Required | Required | Required | Conditional |
| Search | Required | Required | Required | Required | --- | --- | --- |
| Media / upload | Required | Required | Required | Required | Required | --- | Conditional |
| Detail / profile | Required | Required | Required | Required | --- | --- | Conditional |
| Destructive affordance | --- | --- | Required | --- | Required | --- | **Required** |
| Authenticated region | --- | --- | --- | --- | --- | --- | --- |

Additional checks applied contextually: Offline (when screen fetches live data), Timeout (long-running requests), Permission/Auth (screens behind login), Retry/Recovery (for all error states), Duplicate submission protection (financial transactions).

---

## Annotation strategy

Annotations should be useful, not noisy.

**Rules:**
- Maximum one summary annotation per screen
- Group related gaps into a single annotation per screen — do NOT create separate annotations for "missing loading," "missing success," "missing error" when they describe the same submission-state gap
- One combined gap annotation per screen when findings are related
- Add additional annotations only when findings are sufficiently distinct

### Clean screen handling
If a screen has no meaningful state gap, do NOT create a gap annotation. The report counts it as reviewed with no findings. Do not manufacture findings.

### Annotation tiers

**Tier 1: Summary badge** — One per screen with gaps, filed under `State Coverage Summary` category.
- 0-30% coverage: red
- 31-50%: yellow
- 51-85%: orange
- 86-95%: blue
- 96-100%: green

**Tier 2: Gap annotation** — One per screen (grouping all gaps), filed under `State Coverage Gap` category (red).

**Tier 3: Consistency annotation** — One per cross-screen consistency finding, filed under `State Coverage Consistency` category (orange).

### Re-run behavior
- Detect existing State Coverage annotations before writing
- Update/replace stale findings
- Remove annotations for gaps that are now resolved
- Do not duplicate annotations on every run

---

## Counting rules — keep metrics separate and reconciled

### Separate metrics (never interchangeable):
- **Screens reviewed** — Number of Figma frames examined
- **Screens with gaps** — Screens containing >=1 meaningful gap
- **Clean screens** — Screens with no applicable gaps
- **Findings** — Distinct state-coverage issues identified
- **Annotations** — Figma annotation objects created

### Reconciliation requirements:
Screens with gaps + Clean screens = Screens reviewed
Covered + Missing + Partial = Applicable state checks

Never report contradictory totals. If numbers do not reconcile, STOP AND CORRECT THE REPORT before publishing.

---

## Duplicate finding prevention

If multiple screens share the same gap (e.g., three forms all lack validation), consider a cross-flow finding instead of three separate findings — unless the consequences are materially different on each screen.

---

## Cross-screen consistency

Compare related screens and flows for:
- Inconsistent loading patterns
- Inconsistent error patterns
- Inconsistent empty states
- Inconsistent success confirmations
- Inconsistent validation
- Inconsistent button behavior
- Inconsistent retry behavior
- Inconsistent destructive confirmations

Group related inconsistencies into meaningful findings. Do NOT create one annotation per identical problem. If insufficient evidence exists, say so.

---

## Audit identity

Every audit must have:
- **Audit ID**: SC-YYYY-MMDD-NNN (e.g. SC-2026-0929-001)
- **Run date**: Date of execution
- **Skill version**: State Coverage & Flow Audit v2.1
- **Scope**: What was reviewed

If another audit is run later, generate a new ID.

---

## Regression / re-audit mode

If a previous State Coverage report exists in the file, detect it. Compare:
- Resolved findings
- Still open
- New findings
- Changed findings
- Regression
- Coverage change

If no previous audit exists, state: "No previous audit found — baseline audit established."

Do NOT invent historical data.

---

## Report — must be a real Figma document

After completing the audit, create a dedicated documentation frame beside the audited design. Do NOT simply output the report as conversational text.

The report must be a polished, professional internal audit document using Auto Layout throughout, with consistent spacing (8px system: 8, 16, 24, 32, 40, 48, 64), tables, cards, badges, status indicators, dividers, and clear typography hierarchy.

---

## CRITICAL: Report Auto Layout & Sizing Rules

**These rules are MANDATORY for every frame and node in the report. Violating them causes clipped text, invisible content, and broken layouts.**

### Rule 1: Every container frame MUST use HUG content for height

NEVER set a fixed pixel height on any frame in the report. Every frame — the root report frame, every section, every card, every table row, every metadata block — MUST have its vertical sizing set to HUG so it grows to fit its content.

Implementation:
- Root report frame: layoutMode = "VERTICAL", counterAxisSizingMode = "FIXED" (width only), primaryAxisSizingMode = "AUTO" (height hugs)
- Section frames: layoutSizingHorizontal = "FILL", layoutSizingVertical = "HUG"
- Card frames: layoutSizingHorizontal = "FILL", layoutSizingVertical = "HUG"
- Row frames: layoutSizingHorizontal = "FILL", layoutSizingVertical = "HUG"
- Badge/tag frames: layoutSizingHorizontal = "HUG", layoutSizingVertical = "HUG"

### Rule 2: Text nodes MUST use proper auto-resize

Every text node MUST have textAutoResize set so text is never clipped:
- For paragraph/body text that should wrap: textAutoResize = "HEIGHT" (fixed width, height grows with content)
- For labels, badges, short metadata: textAutoResize = "WIDTH_AND_HEIGHT" (both dimensions hug the text)
- NEVER use textAutoResize = "NONE" or "TRUNCATE" — these cause invisible/clipped text

### Rule 3: Report root frame sizing

The root report frame MUST be:
- layoutMode = "VERTICAL"
- Width: FIXED at the report width (900-1100px)
- Height: HUG (primaryAxisSizingMode = "AUTO") — NEVER a fixed pixel height
- padding: 48px all sides
- itemSpacing: 40px between sections
- fills: white (#FFFFFF)
- clipsContent = false

### Rule 4: Section frame sizing

Every section container MUST be:
- layoutMode = "VERTICAL"
- layoutSizingHorizontal = "FILL" (stretch to parent width)
- layoutSizingVertical = "HUG" (grow to fit content)
- itemSpacing: 16-24px between children
- clipsContent = false

### Rule 5: Metric cards (Executive Summary)

Metric cards MUST be:
- layoutMode = "VERTICAL"
- layoutSizingVertical = "HUG" — NEVER a fixed height
- layoutSizingHorizontal = "FILL" (within the row) or fixed minimum width of 140px
- padding: 16px all sides
- itemSpacing: 8px
- The metric number text: fontSize >= 28px, textAutoResize = "WIDTH_AND_HEIGHT"
- The metric label text: fontSize >= 12px, textAutoResize = "WIDTH_AND_HEIGHT"
- Both text nodes MUST be fully visible — no clipping

The metric cards row MUST be:
- layoutMode = "HORIZONTAL"
- layoutSizingHorizontal = "FILL"
- layoutSizingVertical = "HUG"
- layoutWrap = "WRAP" if cards exceed width
- itemSpacing: 12-16px

### Rule 6: Table construction — MANDATORY pattern

Tables are the most common source of clipped text. Follow this pattern exactly:

**Table container:**
- layoutMode = "VERTICAL"
- layoutSizingHorizontal = "FILL"
- layoutSizingVertical = "HUG"
- itemSpacing: 0 (rows are flush)
- clipsContent = false

**Each row (header and data):**
- layoutMode = "HORIZONTAL"
- layoutSizingHorizontal = "FILL"
- layoutSizingVertical = "HUG" — NEVER fixed height
- padding: vertical 10-12px, horizontal 0
- itemSpacing: 8-12px between cells
- Bottom border: 1px line frame or rectangle at bottom

**Each cell:**
- layoutMode = "VERTICAL" (or NONE for single-line)
- width: FIXED per column (use proportional widths that sum to table width)
- height: HUG — NEVER fixed
- The text inside each cell: textAutoResize = "HEIGHT" (wraps within cell width)
- Minimum font size for table body text: 12px (NEVER smaller than 11px)
- clipsContent = false

**Column width guidelines for common table layouts:**
- ID column: 60-80px
- Severity badge: 80-100px
- Screen name: 120-160px
- Flow name: 100-140px
- Missing States / Description: 200-300px (largest column — give it the most space)
- Evidence: 80-100px
- Confidence: 80-100px
- Total table width: match parent (FILL)

### Rule 7: Finding cards

Each finding card MUST be:
- layoutMode = "VERTICAL"
- layoutSizingHorizontal = "FILL"
- layoutSizingVertical = "HUG"
- padding: 20-24px
- itemSpacing: 12px
- cornerRadius: 8px
- stroke or fill for visual separation
- clipsContent = false

Inside the card:
- Title text: textAutoResize = "HEIGHT", layoutSizingHorizontal = "FILL"
- Body/description text: textAutoResize = "HEIGHT", layoutSizingHorizontal = "FILL"
- Tags/badges row: layoutMode = "HORIZONTAL", layoutWrap = "WRAP", layoutSizingVertical = "HUG"
- Each tag: layoutSizingHorizontal = "HUG", layoutSizingVertical = "HUG", padding 4-6px horizontal / 2-4px vertical

### Rule 8: Dividers

Section dividers:
- Create as a frame with layoutMode = "VERTICAL"
- layoutSizingHorizontal = "FILL"
- height: FIXED at 1px (this is the ONE exception where fixed height is correct)
- fills: #E0E0E0

### Rule 9: clipsContent = false everywhere

Set clipsContent = false on EVERY frame in the report. The only exception is the root report frame which may clip. All inner frames — sections, cards, rows, cells — MUST NOT clip content.

### Rule 10: Verification after building the report

After creating the report, take a screenshot of the full report frame. Visually verify:
- All metric card numbers and labels are fully visible (not clipped)
- All table text is readable (minimum 11px, ideally 12px+)
- No text is cut off at frame boundaries
- All sections are visible and properly spaced
- The report frame height accommodates all content (not truncated at bottom)

If any content appears clipped or invisible, fix the offending frame's sizing to HUG before finishing.

---

### Report visual system

**Typography hierarchy (Inter or file's existing system font):**
- Report Title: 32-36px / Bold
- Section Title: 20-24px / SemiBold (use Bold if SemiBold unavailable)
- Subsection: 16-18px / SemiBold/Bold
- Body: 13-14px / Regular
- Metadata / captions: 11-12px / Regular or Medium
- Table body: 12-13px / Regular (NEVER below 11px)
- Metric numbers: 28-36px / Bold
- Metric labels: 12-13px / Medium

**Surface:** White or neutral report background. Use Auto Layout for every section, card, table row, and metadata block. Avoid manually positioned text.

**Colors:**
- Critical: #DC2626
- High: #EA580C
- Medium: #CA8A04
- Low/Advisory: #2563EB
- Covered/Clean: #16A34A
- Neutral text: #1A1A1A (headers), #333333 (body), #737373 (metadata)
- Dividers: #E0E0E0
- Card backgrounds: #F9FAFB (light gray) or white
- Card borders: #E5E7EB

### Report structure (in order):

**01 — Audit Header**
Title: "STATE COVERAGE & FLOW AUDIT"
Metadata grid: Audit ID, Run date, Scope, Pages inspected, Screens inspected, Design mode/theme, Skill version, Previous audit status.
Layout: Vertical auto-layout, all HUG height. Metadata as label:value pairs in a 2-column grid (horizontal row per pair, wrapped in vertical container).

**02 — Executive Summary**
Key metrics as cards: Screens Reviewed, Screens With Gaps, Clean Screens, Applicable Checks, Designed (Covered), Missing, Partial, Coverage percentage.
Layout: Horizontal wrapping row of metric cards. Each card is vertical auto-layout with HUG height. Number text large (28-36px), label text below (12-13px). Cards MUST NOT clip their content.
Label coverage clearly: "State coverage: N / M applicable checks" — do NOT present 0% as a definitive quality score.

**03 — Findings Overview**
Severity breakdown: count per severity level (Critical, High, Medium, Low/Advisory).
Layout: Horizontal row of severity count cards, each HUG both axes.

**04-07 — Findings by Severity**
Each finding as a structured card:
- Severity badge (colored, HUG both axes)
- Finding title (Screen — Issue)
- Evidence level (GAP / CONFIRMED / NOT VERIFIABLE)
- Confidence (High / Medium / Low)
- Target info: Page, Screen/frame, Target node/action, Flow
- Observed: What exists or doesn't in the reviewed designs
- Required states: List of missing states as tags/badges (wrapping horizontal row)
- Recommended: Design sequence to close the gap
Layout: Each card is vertical auto-layout, FILL width, HUG height, 20-24px padding, 12px gap.

**08 — State Coverage Matrix**
Professional table grouped by flow. Columns: Screen, Empty, Loading, Error, Success, Validation, Confirmation, Search, Disabled. Cells use status indicators.
Layout: Follow the mandatory table construction pattern above. All rows HUG height. All cells HUG height with fixed width.

**09 — Findings Summary Table**
Compact scannable table: ID, Severity, Screen, Flow, Missing States, Evidence, Confidence.
Layout: Follow the mandatory table construction pattern. Give "Missing States" column the widest allocation (200-300px). All text minimum 12px. Row height HUG.

**10 — Cross-Flow Consistency**
Grouped consistency findings comparing related screens for inconsistent patterns.

**11 — State Design Recipes**
For each major finding, a practical numbered recipe bridging audit to design work.
Layout: Each recipe in a card (vertical auto-layout, HUG height). Steps as individual text nodes within the card.

**12 — Recommended Design Work**
Prioritized worklist table: Priority, Finding, Affected Flow, Recommended Work, Reason.
Layout: Follow mandatory table construction pattern.

**13 — Annotation Summary**
Screens annotated, gap/summary/consistency annotation counts, totals. Must reconcile with screen counts.

**14 — Clean Screens**
Compact table: Screen, Reason, Applicable Dynamic States, Result. Explain: "No applicable dynamic-state gap was identified within the inspected scope."

**15 — Limitations**
What could not be verified: Figma-only inspection, no runtime/backend verification, prototype behavior may not represent production, absence of visual evidence does not equal absence in production.

**16 — Audit Metadata**
Full metadata: Audit ID, version, date, scope, page, section, screen count, previous audit comparison if available.

### Large-file behavior

- 10 screens: Detailed individual cards.
- 50 screens: Group findings by flow, use summary tables.
- 100+ screens: Condensed finding cards, grouped sections.
- 300+ screens: Aggregate repeated findings, do NOT create hundreds of annotations.

---

## Scope resolution

- **Nothing selected** -> ask the user to select frames/flow first
- Accepts Section, single Frame, multiple Frames, or Page contents
- Follow prototype connections one hop out to surface directly-linked screens
- Report honest, itemized counts

### Scope size
Process one screen at a time: classify regions, check applicable states, write findings, move to next. Report progress for large scopes.

---

## Safety rules

NEVER:
- Delete or modify original design
- Detach components unnecessarily
- Change component definitions or design-system tokens
- Create fake states and present them as existing
- Claim a state is missing when related frames weren't inspected
- Invent business logic
- Present inference as fact
- Automatically generate new screens/components (the skill discovers, analyzes, documents, and prioritizes — it does not auto-design)

---

## Chat response format

Keep the chat response SHORT after the Figma report has been created:

State Coverage & Flow Audit complete.

Screens reviewed: [N]
Screens with gaps: [N]
Clean screens: [N]

Applicable checks: [N]
Covered: [N]
Missing: [N]
Coverage: [X]%

Critical: [N]
High: [N]
Medium: [N]
Low: [N]

Top finding:
[One sentence, evidence-based]

Report: [link to report frame]
Annotations: [N] total ([N] gap, [N] summary, [N] consistency)

Do NOT paste the entire report into chat. The detailed report lives in the Figma file.

---

## Self-check before completion

- Report exists inside Figma, beside the audited design
- Report uses Auto Layout throughout with HUG height on every container
- ALL metric cards show full numbers and labels (not clipped)
- ALL table text is readable at minimum 12px (never below 11px)
- NO text is cut off at any frame boundary
- clipsContent = false on all inner frames
- Root report frame height is HUG (not fixed)
- Tables are structured and readable
- Metrics reconcile (screens, findings, annotations, coverage math)
- Evidence level and confidence included per finding
- Exact targets included where verifiable
- Evidence-based language throughout — no unsupported claims
- No false positives on static/non-applicable screens
- Findings are specific to each screen's content
- Related gaps grouped into single annotations
- Clean screens included
- Limitations included
- Cross-screen consistency checked
- Recovery paths checked for error states
- Financial/high-risk flows given extra scrutiny
- Previous audit comparison only used when evidence exists
- Chat contains only a concise summary
- No original design was modified
- Screenshot verification of report confirms all content visible

---

## Honest limits

- Content-type classification is a structural heuristic, not certainty
- "Covered" means designed somewhere in scope, not verified to work correctly
- Runtime behavior is out of scope — this is a static-file completeness check
- Destructive-action detection is text/name-based — disguised buttons may be missed
- Journey weighting is heuristic, not definitive
- Consistency analysis requires >=2 instances of the same state type
- **This skill flags, it doesn't fix** — pair with actual design work to close gaps
