---
name: signup-flow-review
description: "Reference guide for Signup Flow Review — SaaS Activation Reviewer"
encoding: "UTF-8"
---

# Signup Flow Review — SaaS Activation Reviewer

## What this skill does

Review a SaaS signup and activation journey like a senior product designer and growth UX specialist.

Trace the complete experience:

Landing page
↓
Signup
↓
Email verification
↓
Account setup
↓
Onboarding
↓
First value

The goal is to identify unnecessary friction, confusing steps, missing information, weak expectations, and barriers between a user's initial intent and their first meaningful product value.

Do not modify the Figma canvas during a review unless the user explicitly asks for fixes.

## Review areas

Evaluate:

- Landing-to-signup transition
- Signup form friction
- Authentication options
- Form field count
- Required vs optional information
- Password requirements
- Social login
- Error handling
- Email verification
- Verification recovery
- Account setup
- Onboarding length
- Progress visibility
- Personalization
- Skip options
- First-value path
- Empty states
- Loading states
- Error states
- Mobile behavior
- Trust and reassurance
- Conversion friction

## Flow analysis

### 1. Landing page → Signup

Check:

- CTA clarity
- Message continuity
- Expectation setting
- CTA-to-destination consistency
- Whether signup feels like a natural next step
- Trust signals near the CTA
- Unnecessary redirects

### 2. Signup

Check:

- Number of fields
- Required information
- Field labels and helper text
- Password complexity
- Email validation
- Social authentication
- Terms/privacy requirements
- CTA clarity
- Error prevention
- Inline validation
- Existing-account recovery

Identify fields that could be collected later.

### 3. Email verification

Check:

- Clear explanation of why verification is needed
- Verification status
- Resend functionality
- Wrong-email recovery
- Expired-link handling
- Spam-folder guidance
- Ability to change the email
- Clear next step after verification

### 4. Account setup

Check:

- Number of setup steps
- Information requested before value
- Whether setup can be skipped
- Progressive profiling opportunities
- Workspace/team setup
- Role and use-case selection
- Invitation requirements
- Unnecessary configuration

### 5. Onboarding

Check:

- Onboarding length
- Progress indicators
- Clear goals
- Personalization
- Contextual guidance
- Skip options
- Empty-state guidance
- Cognitive load
- Whether onboarding supports the user's actual intent

### 6. First value

Determine:

- What the first meaningful product value is
- How quickly users can reach it
- Whether the path is obvious
- What blocks users from reaching it
- Whether the product asks for too much before demonstrating value
- Whether the first success moment is clearly communicated

## Friction scoring

For each major step, evaluate:

- **Effort:** Low / Medium / High
- **Clarity:** Low / Medium / High
- **Value before effort:** Low / Medium / High
- **Drop-off risk:** Low / Medium / High

## Output

Return a structured review:

### Signup Flow Score

`74/100`

### Flow Summary

Briefly explain the overall journey and the biggest conversion risks.

### Funnel Breakdown

| Step | Effort | Clarity | Drop-off Risk | Key Issue |
|---|---|---|---|---|
| Landing → Signup | /10 | /10 | Low/Medium/High | ... |
| Signup | /10 | /10 | Low/Medium/High | ... |
| Email verification | /10 | /10 | Low/Medium/High | ... |
| Account setup | /10 | /10 | Low/Medium/High | ... |
| Onboarding | /10 | /10 | Low/Medium/High | ... |
| First value | /10 | /10 | Low/Medium/High | ... |

### Priority Findings

For every important issue provide:

- **Issue**
- **Severity:** Critical / High / Medium / Low
- **Evidence:** What is visible in the design
- **Impact:** Why it may cause friction or drop-off
- **Recommendation:** Specific actionable improvement

### Unnecessary Steps

Identify:

1. Steps that could be removed
2. Steps that could be combined
3. Information that could be collected later
4. Steps that could be made optional

### First-Value Analysis

Explain:

- What the first value moment appears to be
- How many meaningful steps are required to reach it
- What blocks the user
- How to shorten the path

### Missing States

Identify missing states such as:

- Invalid email
- Existing account
- Weak password
- Verification email not received
- Expired verification link
- Wrong email
- Resend limit
- Setup failure
- Onboarding skipped
- Onboarding completed
- Empty workspace
- First project created
- First value achieved

### Quick Wins

List 3–5 improvements that can be implemented with relatively low effort.

### Strategic Recommendations

List higher-impact improvements that may require product, engineering, analytics, or growth decisions.

## Evidence rules

- Base findings on visible Figma evidence whenever possible.
- Do not invent analytics, conversion rates, user research, or A/B-test results.
- Clearly label assumptions.
- Do not claim a step causes drop-off unless supported by evidence.
- Prioritize friction by likely user impact.
- Distinguish UX observations from growth hypotheses.

## Best used for

- SaaS signup flows
- B2B SaaS onboarding
- Product-led growth funnels
- Free trials
- Account creation flows
- Activation optimization
- Signup conversion reviews
- Onboarding redesigns
