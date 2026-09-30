---
name: empty-state-generator
description: "Reference guide for Empty State Generator — Figma"
encoding: "UTF-8"
---

# Empty State Generator — Figma

## What this skill does

Create thoughtful, contextual empty states for Figma designs.

The goal is not to add decorative illustrations to every empty screen. The goal is to help users understand why the screen is empty, what they can do next, and how to recover or continue their task.

When reviewing an existing design, identify missing empty states and recommend the right pattern.

Do not modify the Figma canvas unless the user explicitly asks for the empty state to be created or designed.

## Best used for

- SaaS products
- Dashboards
- Admin panels
- CRM platforms
- Project management tools
- E-commerce
- Search interfaces
- Data tables
- Notifications
- Inbox and messaging
- File management
- Analytics
- User management
- Onboarding

## Empty-state types

Identify which state applies before recommending content.

### 1. First-use state

The user has not created or added anything yet.

Purpose:
- Explain what the area is for
- Encourage the first action
- Reduce uncertainty

Recommended structure:
- Clear title
- Short explanation
- Primary action
- Optional supporting visual

Example:
**No projects yet**
Create your first project to start organizing your team's work.
**Create project**

### 2. No-results state

The system contains data, but the current search or query returns nothing.

Purpose:
- Explain that the search produced no results
- Help users recover

Recommended actions:
- Clear search
- Adjust filters
- Search again
- Browse all results

Avoid treating no-results as if the user has never created data.

### 3. Filtered-empty state

Data exists, but active filters remove all visible results.

Show:
- Which filters are active
- Why nothing is displayed
- Clear filters action

Example:
**No projects match these filters**
Try removing a filter or changing your date range.
**Clear filters**

### 4. Error state

Content cannot be loaded because of a system or network problem.

Purpose:
- Explain the problem honestly
- Provide recovery

Recommended actions:
- Try again
- Retry loading
- Check connection
- Contact support when appropriate

Do not use "Nothing here" when the actual issue is a failed request.

### 5. Permission state

The user cannot access content because of their role or permissions.

Purpose:
- Explain the restriction
- Avoid implying that the content does not exist

Recommended actions:
- Request access
- Contact administrator
- Return to previous screen

### 6. Completed state

The user has completed all available work.

Examples:
- Inbox cleared
- Tasks completed
- Setup completed
- No pending approvals

This should communicate success rather than absence.

### 7. Offline state

The application cannot currently access required network resources.

Provide:
- Clear offline explanation
- Available offline actions
- Retry when connection returns

### 8. Archived/deleted state

The expected content has been archived, removed, or moved.

Provide:
- Clear explanation
- Recovery or navigation option when possible

## Review process

Follow this sequence:

1. Identify the purpose of the screen.
2. Determine why the state is empty.
3. Identify the user's likely next task.
4. Select the correct empty-state type.
5. Write concise contextual messaging.
6. Define the primary action.
7. Add a secondary action only when useful.
8. Determine whether an illustration or icon adds value.
9. Check hierarchy and visual balance.
10. Consider loading, error, permission, and populated states.
11. Recommend the smallest useful design solution.
12. Avoid generic filler copy.

## Empty-state content framework

Every useful empty state should answer:

### What happened?

Explain the current condition.

### Why does it matter?

Connect the state to the user's task when useful.

### What can I do next?

Give the clearest next action.

A strong empty state usually contains:

1. Visual cue — optional
2. Short title
3. Supporting explanation
4. Primary action
5. Optional secondary action

## Copywriting rules

### Titles

Keep titles:

- Short
- Specific
- Contextual
- Human

Prefer:

- "No projects yet"
- "No search results"
- "Your inbox is clear"
- "No teammates added"

Avoid:

- "Nothing here"
- "Oops!"
- "No data"
- "Empty state"

### Descriptions

Use one or two short sentences.

Explain the state without unnecessary technical language.

Avoid:
"An error occurred while attempting to retrieve the requested resources."

Prefer:
"We couldn't load your projects. Try again or check your connection."

### Buttons

Use action-oriented labels.

Prefer:
- Create project
- Add teammate
- Clear filters
- Try again
- Request access
- Start a search

Avoid:
- Click here
- Submit
- Continue
- OK

unless the context genuinely requires it.

## CTA prioritization

Use one primary action whenever possible.

Choose the action that best advances the user's current task.

Use a secondary action only when it provides meaningful recovery or navigation.

Do not create multiple competing CTAs.

## Illustration guidance

Use illustrations when they:

- Clarify the context
- Add personality
- Support the product's brand
- Help users understand the state

Avoid illustrations when they:

- Delay the primary action
- Add unnecessary visual noise
- Distract from important recovery instructions
- Make a critical error state look playful

For operational errors, prioritize clarity over decoration.

## Accessibility considerations

Check:

- Text contrast
- Text size
- Button visibility
- Focus states
- Screen-reader-friendly content
- Meaningful labels
- Icon-only actions
- Color-independent meaning
- Responsive behavior

Do not rely on an illustration or color alone to communicate the state.

## Responsive behavior

Consider empty states at:

- Desktop
- Tablet
- Mobile

Check:

- Text wrapping
- Illustration scaling
- CTA stacking
- Vertical spacing
- Modal/container height
- Button width
- Content alignment

The message should remain understandable on smaller screens.

## Finding missing states

When auditing a screen, identify missing states such as:

- First use
- No results
- Filtered results
- Error
- Permission denied
- Offline
- Completed
- Archived
- Deleted
- Loading
- Partial data

Do not assume every product needs every state.

Only recommend states relevant to the product workflow.

## Output format

When generating an empty state:

# Empty State

**State type:** First-use / No results / Filtered / Error / Permission / Completed / Offline / Other

**Context:** What screen or workflow this belongs to.

### Recommended content

**Title:**  
[Short title]

**Description:**  
[Contextual explanation]

**Primary CTA:**  
[Action]

**Secondary CTA:**  
[Optional action]

**Visual direction:**  
[Optional illustration/icon guidance]

### UX rationale

Explain:
- Why this state is appropriate
- What user problem it solves
- Why the CTA is the correct next action

### Responsive behavior

Explain how the empty state should adapt across desktop, tablet, and mobile.

### Accessibility notes

List important accessibility considerations.

## Audit format

When reviewing an existing product:

# Empty State Audit

## Current coverage

List the empty states currently represented.

## Missing states

List relevant states that should be designed.

## Priority

Assign:

- Critical — blocks recovery or important workflow
- High — important user task lacks a useful state
- Medium — creates confusion or weak guidance
- Low — polish or consistency improvement

## Recommended states

For each state provide:

**State:**  
**Priority:**  
**Trigger:**  
**Title:**  
**Description:**  
**Primary CTA:**  
**Secondary CTA:**  
**Rationale:**

## Quality checklist

Before finalizing an empty state, verify:

- [ ] The reason for the empty state is clear.
- [ ] The message matches the actual system state.
- [ ] The next action is obvious.
- [ ] There is one clear primary CTA.
- [ ] Copy is concise.
- [ ] The visual supports rather than distracts.
- [ ] Error states provide recovery.
- [ ] Permission states do not imply missing data.
- [ ] No-results states distinguish search/filter issues from first-use states.
- [ ] Completed states communicate success.
- [ ] Mobile behavior is considered.
- [ ] Accessibility is considered.

## Important principles

1. An empty state is part of the product experience, not a placeholder.
2. Explain why the screen is empty.
3. Always consider the user's next task.
4. Do not use the same empty state for every situation.
5. Error is different from no data.
6. No results is different from first use.
7. Keep the primary action obvious.
8. Use visuals only when they add meaning.
9. Preserve accessibility and responsive behavior.
10. Do not modify the Figma file unless explicitly asked.

## Example request

"Review this SaaS dashboard and identify all empty states we need. Then create copy and CTA recommendations for first use, no results, filtered results, error, permission, and completed states where relevant."

## Example output

### State: First use

**Priority:** High

**Title:** No projects yet

**Description:** Create your first project to start organizing your team's work.

**Primary CTA:** Create project

**Secondary CTA:** Learn more

**Rationale:** The user has no projects because they have not created one yet, so the state should explain the purpose of the area and provide a direct first action.

### State: No results

**Priority:** Medium

**Title:** No projects found

**Description:** Try a different search term or remove some filters.

**Primary CTA:** Clear filters

**Rationale:** The system contains projects, but the current query does not return any matches. The recovery action should help the user broaden the search rather than create a new project.
