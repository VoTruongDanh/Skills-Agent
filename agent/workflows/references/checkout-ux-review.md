---
name: checkout-ux-review
description: "Reference guide for Checkout UX Review — Conversion & Payment UX Reviewer"
encoding: "UTF-8"
---

# Checkout UX Review — Conversion & Payment UX Reviewer

## What this skill does

Review a checkout or payment flow like a senior product designer and conversion UX specialist.

The goal is to identify friction that can prevent users from completing a purchase, subscription, upgrade, or payment.

Do not modify the Figma canvas during a review unless the user explicitly asks for fixes.

## Best used for

- SaaS upgrades
- Ecommerce checkout
- Subscription checkout
- Payment flows
- Free-to-paid conversion
- B2B purchasing
- Digital products
- Marketplace checkout
- Account-based purchases

## Review areas

Evaluate:

- Form friction
- Checkout structure
- Field count
- Required vs optional information
- Form labels and validation
- Trust signals
- Payment methods
- Payment security communication
- Order summary
- Pricing transparency
- Taxes and fees
- Discounts and promo codes
- Billing information
- Shipping information where relevant
- Errors and recovery
- Confirmation
- Abandonment risks
- Mobile checkout
- Guest checkout
- Account creation
- Subscription terms
- Cancellation and renewal clarity

## 1. Form friction

Check:

- Number of fields
- Field grouping
- Logical sequence
- Autofill support
- Labels and helper text
- Required vs optional fields
- Inline validation
- Error messaging
- Keyboard/input behavior
- Address entry
- Billing vs shipping duplication
- Account creation requirements

Identify information that could be collected later.

## 2. Trust

Check for:

- Secure-payment messaging
- Recognizable payment providers
- Customer support access
- Refund/return information
- Money-back guarantees where applicable
- Privacy reassurance
- Security/compliance signals
- Clear business identity
- Trust signals near the payment action

Do not recommend misleading security claims or fake trust signals.

## 3. Payment methods

Evaluate:

- Availability of relevant payment methods
- Credit/debit cards
- Digital wallets
- Bank transfer where relevant
- Buy-now-pay-later where relevant
- Payment-method discoverability
- Default payment method
- Switching between methods
- Payment-method-specific fields
- Failed payment recovery

Do not assume a payment method is required without evidence or context.

## 4. Order summary

Check:

- Product/service name
- Quantity
- Plan
- Price
- Discounts
- Taxes
- Fees
- Shipping
- Total
- Billing frequency
- Renewal terms
- Edit functionality

The final amount should be understandable before payment.

## 5. Pricing and subscription transparency

For SaaS and subscriptions, check:

- Monthly vs annual billing
- Trial duration
- Renewal price
- Renewal date
- Per-user pricing
- Seat quantity
- Usage limits
- Cancellation terms
- Refund terms
- One-time vs recurring charges

Flag unexpected or unclear commitments.

## 6. Errors and recovery

Check missing states such as:

- Invalid card
- Declined payment
- Expired card
- Incorrect CVV
- Invalid billing address
- Network failure
- Payment timeout
- Duplicate submission
- Session expiration
- Promo code failure
- Out-of-stock item where relevant
- Price changed during checkout
- Authentication/3DS failure

Evaluate whether errors explain:

1. What happened
2. Why it happened when useful
3. What the user should do next

## 7. Confirmation

Check whether confirmation clearly communicates:

- Payment success
- Order/subscription details
- Amount paid
- Order/reference number
- Delivery or next steps
- Receipt/invoice
- Account access
- Support options
- Cancellation or management options where relevant

The confirmation should give users confidence that the transaction completed successfully.

## 8. Abandonment risks

Look for:

- Unexpected costs
- Excessive fields
- Forced account creation
- Weak trust
- Confusing CTAs
- Hidden payment requirements
- Poor error recovery
- Unclear pricing
- Long checkout steps
- Distractions
- Unexpected redirects
- Unclear subscription commitment
- Mobile usability issues

Prioritize risks by likely impact rather than visual preference.

## Output

Return a structured review:

### Checkout UX Score

`76/100`

### Summary

Briefly explain the overall checkout experience and its biggest conversion risks.

### Funnel Breakdown

| Area | Score | Risk | Key Issue |
|---|---:|---|---|
| Form friction | /10 | Low/Medium/High | ... |
| Trust | /10 | Low/Medium/High | ... |
| Payment methods | /10 | Low/Medium/High | ... |
| Order summary | /10 | Low/Medium/High | ... |
| Pricing transparency | /10 | Low/Medium/High | ... |
| Errors & recovery | /10 | Low/Medium/High | ... |
| Confirmation | /10 | Low/Medium/High | ... |
| Mobile UX | /10 | Low/Medium/High | ... |

### Priority Findings

For every important issue provide:

- **Issue**
- **Severity:** Critical / High / Medium / Low
- **Evidence:** What is visible in the design
- **Impact:** Why it may cause friction, confusion, or abandonment
- **Recommendation:** Specific actionable improvement

### Abandonment Risk Map

Identify the highest-risk moments:

1. Before entering payment
2. During form completion
3. During payment
4. After payment failure
5. Before confirmation

Explain why each moment is risky.

### Missing States

List missing checkout states and recovery paths.

### Quick Wins

List 3–5 improvements that can be implemented with relatively low effort.

### Strategic Recommendations

List higher-impact improvements that may require product, engineering, payment, analytics, or business decisions.

## Evidence rules

- Base findings on visible Figma evidence whenever possible.
- Do not invent conversion rates, analytics, user research, or payment failures.
- Clearly label assumptions.
- Do not claim that an issue causes abandonment unless supported by evidence.
- Distinguish UX observations from conversion hypotheses.
- Consider the product context before recommending payment methods or checkout behavior.
