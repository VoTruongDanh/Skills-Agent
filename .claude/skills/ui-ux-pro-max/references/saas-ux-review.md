---
name: saas-ux-review
description: "Reference guide for SaaS UX Review"
encoding: "UTF-8"
---

# SaaS UX Review

## What this skill does

Review a SaaS product, screen, feature, or user flow like a senior SaaS product designer.

The goal is not to make the interface visually prettier.

The goal is to identify UX problems that can make a SaaS product harder to understand, harder to use, harder to adopt, or harder to convert.

Evaluate the product from both the user's perspective and the business perspective.

Do not modify the Figma canvas during a review unless the user explicitly asks for design changes.

---

## Best used for

- SaaS dashboards
- B2B SaaS products
- AI SaaS products
- Admin platforms
- CRM products
- Project management tools
- Analytics products
- Productivity tools
- Collaboration products
- Developer tools
- SaaS onboarding
- Signup and login flows
- Activation flows
- Core product workflows
- Upgrade and pricing flows
- Settings and account management
- Empty, loading, error, and success states

---

# Review Framework

Evaluate the selected screen or flow across the following dimensions.

## 1. First Impression & Product Clarity

Check:

- Can users understand what this product or screen does?
- Is the primary purpose obvious?
- Is the value proposition clear?
- Does the interface communicate what users should do next?
- Is the most important information visually dominant?
- Is unnecessary information competing for attention?

Identify:

- Confusing hierarchy
- Ambiguous labels
- Unclear terminology
- Weak primary actions
- Excessive cognitive load

---

## 2. Information Architecture

Evaluate:

- Navigation structure
- Page hierarchy
- Grouping
- Naming
- Categorization
- Information discoverability
- Relationships between screens
- Global versus local navigation
- Search and filtering

Ask:

- Can users predict where information lives?
- Are related actions grouped together?
- Are navigation labels understandable?
- Is the hierarchy consistent?
- Are users forced to remember information between screens?

---

## 3. Onboarding

Evaluate the onboarding experience.

Check:

- Signup friction
- Account setup
- Workspace setup
- Profile completion
- Product education
- Progressive disclosure
- Empty-state guidance
- First successful action
- Time to value

Ask:

- Does the user understand what happens after signup?
- Is the first meaningful action obvious?
- Is onboarding asking for information too early?
- Can users experience value before completing unnecessary setup?
- Are users guided toward activation?

---

## 4. Activation

Identify the actions that represent meaningful product adoption.

Evaluate:

- Time to first value
- Primary activation action
- CTA clarity
- Setup friction
- Required versus optional steps
- Feedback after actions
- Progress indicators
- Completion states

Ask:

- What is the user's first meaningful success?
- How many steps are required to reach it?
- Where could users abandon the flow?
- Does the interface clearly communicate progress?

---

## 5. Core Workflow

Review the primary user task.

Evaluate:

- Number of steps
- Task complexity
- Cognitive load
- Defaults
- Input requirements
- Decision points
- Feedback
- Confirmation
- Error recovery
- Workflow continuity

Identify unnecessary:

- Clicks
- Screens
- Forms
- Decisions
- Context switching
- Manual work

---

## 6. Navigation & Wayfinding

Check:

- Current location
- Breadcrumbs
- Sidebar navigation
- Tabs
- Back navigation
- Page titles
- Context preservation
- Deep navigation

Ask:

- Does the user know where they are?
- Does the user know where they came from?
- Does the user know where they can go next?
- Does navigation remain predictable across the product?

---

## 7. Dashboard UX

For dashboards evaluate:

- Information hierarchy
- KPI prioritization
- Data density
- Scanability
- Filtering
- Date ranges
- Sorting
- Search
- Empty states
- Visualization clarity
- Actionability

Ask:

- Does the dashboard help users make decisions?
- Are important insights easy to find?
- Are metrics explained?
- Is data presented without unnecessary complexity?

---

## 8. Forms & Data Entry

Evaluate:

- Number of fields
- Field ordering
- Labels
- Defaults
- Input types
- Validation
- Error messages
- Required fields
- Optional fields
- Autofill opportunities
- Inline feedback

Ask:

- Can the form be shorter?
- Are users being asked for information they don't need yet?
- Can sensible defaults reduce effort?
- Are errors easy to understand and recover from?

---

## 9. Conversion & Monetization

Evaluate SaaS conversion points including:

- Signup
- Trial
- Demo request
- Upgrade
- Pricing
- Paywalls
- Feature limits
- Checkout
- Upgrade prompts

Check:

- CTA clarity
- Value communication
- Trust
- Pricing comprehension
- Friction
- Timing of upsells
- Feature differentiation
- Upgrade motivation

Do not assume that more CTAs improve conversion.

Prioritize reducing uncertainty and friction.

---

## 10. Retention & Habit Formation

Look for UX patterns that encourage continued product usage.

Evaluate:

- Saved work
- Progress
- Notifications
- Recurring workflows
- Personalization
- History
- Collaboration
- Reminders
- Reporting
- Meaningful feedback

Ask:

- Why would the user return?
- Does the product help users build momentum?
- Does the product make previous work valuable?
- Are recurring tasks unnecessarily difficult?

---

## 11. Trust & Transparency

Evaluate:

- System status
- Confirmation
- Permissions
- Security messaging
- Data handling
- Billing transparency
- Destructive actions
- AI-generated content
- Automation
- Account changes

Check whether users understand:

- What will happen
- Why it happens
- What information is being used
- What action they are authorizing
- How to undo or recover

---

## 12. AI SaaS UX

If the product includes AI, additionally evaluate:

- AI capability clarity
- User expectations
- Prompting
- Input guidance
- Output quality communication
- Loading states
- Uncertainty
- Citations or sources
- Editability
- Regeneration
- Undo
- Human control
- Failure recovery

Avoid treating AI output as automatically correct.

The interface should communicate appropriate confidence and user control.

---

## 13. Accessibility

Review visible accessibility risks including:

- Color contrast
- Text readability
- Touch target size
- Keyboard navigation implications
- Focus states
- Error communication
- Labels
- Icon-only controls
- Status communication
- Reliance on color alone

Only identify accessibility issues that can reasonably be inferred from the available design context.

Do not claim compliance with a formal accessibility standard unless sufficient evidence exists.

---

## 14. Responsive UX

When responsive designs or mobile screens are available, evaluate:

- Layout adaptation
- Navigation
- Content prioritization
- Tables
- Forms
- Modals
- Charts
- Touch targets
- Overflow
- Sticky elements
- Responsive hierarchy

Identify desktop patterns that may create mobile friction.

---

## 15. Missing States

Check for missing:

- Empty states
- Loading states
- Error states
- Success states
- Disabled states
- Permission states
- Offline states
- First-use states
- Returning-user states
- Partial completion states
- No-results states

Missing states are important when they can create uncertainty or block the user's task.

---

# SaaS UX Evaluation Model

For each finding, evaluate:

### Severity

- Critical — blocks the user's task or creates serious product risk
- High — significantly harms usability, activation, conversion, or workflow completion
- Medium — creates meaningful friction but users can continue
- Low — minor usability or clarity issue

### Impact

Classify the likely impact as:

- Usability
- Activation
- Conversion
- Retention
- Trust
- Efficiency
- Accessibility
- Discoverability

### Confidence

Use:

- High — directly observable from the design
- Medium — strongly inferred
- Low — requires product or user research validation

Do not present assumptions as facts.

---

# Evidence Rules

Every finding should include evidence from the selected Figma design.

Use:

- Visible UI
- Text labels
- Layout hierarchy
- Interaction patterns
- User-flow sequence
- Existing states
- Missing states

Avoid inventing:

- Analytics
- User behavior
- Business metrics
- Conversion rates
- Customer complaints
- Research findings

If something requires validation, explicitly label it as a hypothesis.

---

# Prioritization

Prioritize findings using:

1. User impact
2. Business impact
3. Frequency of occurrence
4. Task criticality
5. Confidence

Focus on the highest-value problems first.

Do not produce a long list of low-value visual observations.

---

# Output Format

Return the review using this structure:

## Executive Summary

Provide:

- Overall UX assessment
- Strongest part of the experience
- Biggest UX risk
- Biggest opportunity
- Recommended priority

## UX Score

Provide a score from 0–100.

Break it down into:

| Dimension | Score |
|---|---:|
| Clarity | /100 |
| Navigation | /100 |
| Onboarding | /100 |
| Activation | /100 |
| Core Workflow | /100 |
| Conversion | /100 |
| Trust | /100 |
| Accessibility | /100 |
| Responsive UX | /100 |

Only score dimensions that can reasonably be evaluated from the provided design.

## Top UX Issues

For each issue provide:

### [Severity] Issue title

**Evidence**

What is visible in the design.

**Why it matters**

Explain the user and/or business impact.

**Recommendation**

Provide a practical solution.

**Impact:** Activation / Conversion / Retention / Usability / etc.

**Confidence:** High / Medium / Low

---

## Quick Wins

Identify improvements that:

- Require relatively little design effort
- Have meaningful UX impact
- Can be implemented quickly

---

## Strategic Opportunities

Identify larger improvements involving:

- Product structure
- User flows
- Information architecture
- Onboarding
- Activation
- Conversion
- Retention

---

## Recommended Next Steps

End with the 3–5 highest-priority actions.

Rank them:

1. Highest priority
2. Second priority
3. Third priority
4. Fourth priority
5. Fifth priority

---

# Important Rules

1. Do not redesign the Figma file during a review.
2. Do not modify components unless explicitly asked.
3. Do not invent user research or analytics.
4. Do not confuse visual preference with a UX problem.
5. Do not recommend changes without explaining the problem.
6. Prioritize problems over aesthetics.
7. Consider both user and business outcomes.
8. Distinguish observed evidence from hypotheses.
9. Avoid generic recommendations.
10. Provide actionable recommendations.
11. Focus on the most important problems first.
12. Preserve the existing product context when making recommendations.

---

# Review Mindset

Think like a senior SaaS product designer.

Ask:

- What is the user trying to accomplish?
- What prevents them from accomplishing it quickly?
- What information do they need?
- What decisions are they forced to make?
- Where could they become confused?
- Where could they abandon the flow?
- What creates unnecessary cognitive load?
- What improves activation?
- What improves conversion?
- What improves retention?
- What increases trust?
- What should be tested with users?

The goal is not to find the most problems.

The goal is to find the **most important problems and explain how to solve them.**
