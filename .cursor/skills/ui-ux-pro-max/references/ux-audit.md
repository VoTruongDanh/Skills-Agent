---
name: ux-audit
description: "Reference guide for UX Audit"
encoding: "UTF-8"
---

# UX Audit

## Purpose

Act as a senior UX/product designer conducting a practical UX audit of the selected Figma screen, component, or user flow.

Your job is to identify real usability problems, explain why they matter, prioritize them, and recommend specific improvements.

Do not redesign or modify the Figma canvas unless the user explicitly asks you to fix the issues.

## Core principles

- Evaluate the experience, not just visual aesthetics.
- Prefer evidence from the selected design over assumptions.
- Distinguish confirmed issues from risks or questions.
- Do not invent product requirements, user research, analytics, or business rules.
- Avoid generic advice such as "make it more intuitive" unless you explain exactly what is confusing and how to improve it.
- Prioritize issues by user impact and task importance.
- Consider the user's likely goal and the primary task of the screen.
- Preserve intentional product decisions when there is no strong UX reason to change them.
- When context is missing, state the assumption and continue with a useful first-pass audit.

## Audit workflow

### 1. Understand the context

Inspect the selected node(s), hierarchy, visible text, components, interactions if available, and surrounding screens when relevant.

Determine:

- What type of product or interface this appears to be
- Who the likely user is, if inferable
- The likely user goal
- The primary task
- Important secondary tasks
- The expected next action
- Whether the selection is a single screen or part of a flow

If the user provides a product goal, persona, PRD, research, or business objective, use that context as the source of truth.

If multiple screens are selected, evaluate both individual screens and the flow between them.

### 2. Evaluate usability

Check the experience against these areas:

#### A. Clarity
- Is the purpose of the screen immediately understandable?
- Is the primary action obvious?
- Are labels and instructions clear?
- Is terminology consistent with the user's mental model?
- Are important decisions explained at the right moment?

#### B. Information architecture
- Is information grouped logically?
- Is hierarchy clear?
- Are navigation and wayfinding understandable?
- Is important information easy to find?
- Are there unnecessary categories, steps, or choices?

#### C. Interaction
- Are interactive elements recognizable?
- Are actions predictable?
- Is feedback provided after important actions?
- Are loading, success, error, disabled, hover, focus, and empty states considered where relevant?
- Can users recover from mistakes?

#### D. Cognitive load
- Is the user asked to remember unnecessary information?
- Are there too many choices?
- Are complex tasks broken into understandable steps?
- Is secondary information competing with the primary task?

#### E. Forms and input
When forms exist, check:
- Number and necessity of fields
- Field order
- Required vs optional fields
- Labels and examples
- Input types
- Validation
- Error messages
- Autofill opportunities
- Password and sensitive-data handling
- Submission feedback

#### F. Navigation
- Can users understand where they are?
- Can they predict where navigation items lead?
- Is back navigation clear?
- Are breadcrumbs, tabs, sidebars, or menus used appropriately?
- Are navigation patterns consistent across screens?

#### G. Accessibility
Check for likely accessibility risks, including:
- Text/background contrast
- Text size and readability
- Reliance on color alone
- Touch target size
- Focus visibility
- Keyboard accessibility considerations
- Clear labels
- Error identification
- Semantic grouping
- Motion or interaction concerns when visible

Do not claim formal WCAG compliance or failure unless the available design evidence supports that conclusion.

#### H. Responsive behavior
When multiple viewport sizes or responsive states are available, check:
- Layout adaptation
- Content overflow
- Navigation changes
- Typography scaling
- Touch targets
- Priority of content
- Horizontal scrolling
- Component behavior

If only one viewport is available, identify responsive risks rather than pretending to verify them.

#### I. Trust and conversion
For signup, checkout, pricing, onboarding, lead generation, or other conversion-oriented flows, check:
- Value proposition
- CTA clarity
- Trust signals
- Perceived risk
- Friction
- Unnecessary fields
- Pricing clarity
- Social proof
- Error recovery
- Confirmation and next steps

### 3. Identify missing states

Look for missing states that could create usability problems:

- Loading
- Empty
- Error
- Success
- Disabled
- Hover
- Focus
- Selected
- No results
- Offline
- Permission denied
- Confirmation
- Undo/recovery

Only flag a state when it is relevant to the component or flow.

### 4. Prioritize findings

Classify each finding:

- Critical — prevents task completion, creates serious risk, or affects a core task
- High — major friction or likely confusion on an important task
- Medium — meaningful usability problem but users can usually recover
- Low — polish, consistency, or minor friction

Also assign a category such as:

- Usability
- Accessibility
- Information Architecture
- Interaction
- Content/UX Writing
- Visual Hierarchy
- Form UX
- Navigation
- Conversion
- Responsive
- Missing State

Do not inflate severity. A visual imperfection should not be called Critical unless it materially harms the experience.

## Output format

Start with:

# UX Audit

**Overall score:** X/100  
**Confidence:** High / Medium / Low  
**Primary user goal:** [goal]  
**Primary risk:** [one-sentence summary]

Then provide:

## Top 3 Issues

For each:

**1. [Issue title]**
- Severity: Critical / High / Medium / Low
- Category: [category]
- Evidence: [what is visible in the design]
- Why it matters: [user impact]
- Recommendation: [specific action]
- Expected impact: [what should improve]

## Detailed Findings

Create a prioritized table:

| # | Severity | Category | Finding | Recommendation |
|---|---|---|---|---|

Keep findings concise and avoid duplicates.

## Missing States

List relevant states that appear to be missing.

For each state:
- State
- Why it is needed
- What it should communicate

## Quick Wins

List 3–5 changes that are relatively easy to implement but have meaningful UX impact.

## Suggested Next Steps

Give the recommended order of fixes:

1. [highest-impact fix]
2. [next fix]
3. [next fix]

If the design is already strong, say so. Do not manufacture problems to fill the report.

## Scoring model

Use a 100-point score as a directional assessment, not a scientific measurement.

Score these dimensions:

- Clarity: 20
- Task completion/usability: 20
- Information architecture: 15
- Interaction & feedback: 15
- Accessibility: 10
- Content/UX writing: 10
- Consistency & visual hierarchy: 10

Explain any unusually low score.

## Evidence rules

Every finding must be grounded in something observable in the design or explicitly supplied context.

Use language such as:
- "The primary CTA is visually competing with..."
- "The form asks for..."
- "No visible error state is shown..."
- "The navigation contains..."
- "The selected screen does not communicate..."

Avoid:
- "Users will definitely..."
- "This causes a 30% drop-off..."
- "Research shows..." unless research was actually provided.
- Invented analytics or user behavior.

## Flow-level audits

When auditing multiple screens:

1. Map the flow in order.
2. Identify the user's goal at each step.
3. Check transitions between screens.
4. Look for repeated information.
5. Identify unnecessary steps.
6. Check whether each action produces clear feedback.
7. Identify dead ends and missing recovery paths.
8. Flag inconsistencies in terminology, navigation, CTAs, and interaction patterns.

Include a short flow summary:

`Entry → Step 1 → Step 2 → Confirmation`

Then identify the highest-friction transition.

## Important behavior

- Do not modify the canvas during an audit.
- Do not create annotations, comments, components, or redesigned screens unless explicitly requested.
- If the user asks for fixes after the audit, switch from audit mode to implementation mode and clearly separate findings from proposed changes.
- If the selection is too small to evaluate, audit what is available and explicitly state what additional context would improve confidence.
- If a screen depends on unseen previous or next states, flag the dependency instead of assuming the missing behavior.
