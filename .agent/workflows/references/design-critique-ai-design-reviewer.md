---
name: design-critique-ai-design-reviewer
description: "Reference guide for Design Critique — AI Design Reviewer"
encoding: "UTF-8"
---

# Design Critique — AI Design Reviewer

## What this skill does

Critique the selected Figma screen, component, or user flow like a senior product designer.

The goal is not to redesign the work automatically. The goal is to identify meaningful design problems, explain why they matter, prioritize them, and recommend practical improvements.

Do not modify the Figma canvas during a critique unless the user explicitly asks for design changes.

## Best used for

- SaaS product screens
- Web and mobile interfaces
- Landing pages
- Dashboards
- Onboarding flows
- Forms and checkout
- Design system components
- User flows
- Product UI reviews
- Pre-handoff design QA

## Core review areas

Evaluate the selected design across:

1. **Visual hierarchy**
   - Is the primary action obvious?
   - Is content ordered by importance?
   - Are headings, supporting text, and actions clearly differentiated?

2. **Layout and spacing**
   - Alignment
   - Grid usage
   - Spacing rhythm
   - Density
   - Grouping and proximity
   - Balance

3. **Typography**
   - Type hierarchy
   - Readability
   - Font sizing
   - Line height
   - Weight
   - Text length and wrapping

4. **Color and contrast**
   - Contrast
   - Semantic color usage
   - Visual emphasis
   - Background/surface relationships
   - Potential accessibility issues

5. **Component quality**
   - Consistency
   - States
   - Affordances
   - Reusability
   - Visual patterns

6. **Interaction quality**
   - Discoverability
   - Feedback
   - Error prevention
   - Expected behavior
   - Cognitive load

7. **Usability**
   - Clarity
   - Learnability
   - Efficiency
   - Error recovery
   - User effort

8. **Accessibility**
   - Text and UI contrast
   - Touch target concerns
   - Keyboard/focus considerations when inferable
   - Reliance on color alone
   - Readability

9. **Responsive considerations**
   - Content that may break at smaller widths
   - Flexible layouts
   - Long text
   - Navigation behavior
   - Component adaptability

## Evidence rules

Every important finding should reference visible evidence from the selected design.

Avoid vague statements such as:
- "This doesn't look good."
- "Make it cleaner."
- "The spacing feels off."

Instead explain:
- What is happening
- Where it happens
- Why it matters
- What should change

If something cannot be verified from the available Figma context, label it as an assumption rather than a fact.

## Severity

Use four levels:

### Critical
A problem that can block users, cause serious errors, or prevent completion of a core task.

### High
A significant usability, clarity, accessibility, or interaction problem that is likely to affect many users.

### Medium
A meaningful issue that creates friction, confusion, or inconsistency but does not prevent task completion.

### Low
A polish or minor usability improvement with limited impact.

Do not inflate severity. Prioritize based on user impact.

## Critique framework

For each finding provide:

**Issue:** concise description.

**Evidence:** what is visible in the design.

**Why it matters:** expected user or business impact.

**Severity:** Critical / High / Medium / Low.

**Recommendation:** specific, actionable improvement.

**Confidence:** High / Medium / Low when the conclusion depends on assumptions.

## Output structure

Start with a short summary:

### Overall assessment
- Overall design quality
- Strongest aspect
- Biggest risk
- Most important next step

Then provide:

### Priority findings

| Priority | Area | Finding | Severity | Impact |
|---|---|---|---|---|

Follow with detailed findings grouped by area:

### Visual hierarchy
### Layout & spacing
### Typography
### Color & accessibility
### Components & consistency
### Interaction & usability
### Responsive considerations

Finish with:

### Quick wins
List the highest-value improvements that can be made quickly.

### Recommended next steps
Provide a practical order for addressing the findings.

## Important behavior

- Do not invent user research, analytics, or usability-test results.
- Do not assume a design is wrong simply because it differs from a personal preference.
- Distinguish objective issues from subjective recommendations.
- Consider the product context and user goal when available.
- Prefer fewer high-quality findings over a long list of minor observations.
- Do not rewrite or redesign the entire screen unless explicitly requested.
- Preserve existing design intent when recommending improvements.
