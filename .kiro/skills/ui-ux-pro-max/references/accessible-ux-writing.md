---
name: accessible-ux-writing
description: "Reference guide for Accessible UX Writing"
encoding: "UTF-8"
---

# Accessible UX Writing

Use this skill to review the user-facing words in a Figma design or Figma Make project. Audit the selected scope when one exists; otherwise review the relevant screens or flows. Include visible text and any available accessible names, descriptions, captions, or alternative text. Ignore layer names, developer notes, sample data, and hidden content unless they will reach users.

Review English and Spanish directly. Detect other languages and make a best-effort review in the original language; clearly mark lower-confidence suggestions. Do not translate content unless asked. Preserve product meaning, legal accuracy, necessary domain terms, and established voice.

## Audit method

1. **Understand the context.** Identify the audience, their goal, the current step, likely emotional state, and what they need to do next. Read copy in its screen and flow rather than judging isolated strings.
2. **Inventory the copy.** Group text by screen and role: headings, body copy, buttons, links, labels, instructions, helper text, placeholders, errors, confirmations, empty states, notifications, onboarding, and accessibility text. Merge exact duplicates while recording every location. Check repeated actions and concepts for consistent wording.
3. **Review comprehension.** Flag content that cannot be understood on first reading. Prefer common, concrete words; short sentences and text blocks; simple tenses; active voice when it clarifies responsibility; literal language; and one instruction per step. Remove filler and unnecessary detail. Avoid or explain jargon, uncommon words, abbreviations, idioms, vague pronouns, double negatives, nested clauses, and unexplained numerical concepts. Keep specialist terms when the intended audience commonly uses them.
4. **Review UX behavior.** Headings should explain where users are. Buttons should start with a clear action and predict the result. Links should make their destination or purpose clear without relying on nearby text. Labels and instructions must provide enough information to complete the task. Errors must identify the problem and tell users how to recover without blame. Confirmations and status messages must state what happened and any next step. Do not rely on placeholder text as the only label.
5. **Review scanning and presentation.** Put the main point and useful keywords first. Break dense content into short sections, descriptive headings, steps, or parallel bullet lists. Flag text whose meaning relies only on position, color, shape, direction, or an image. Note when spacing, line length, hierarchy, or background interference makes otherwise clear text hard to read.
6. **Rewrite precisely.** Suggest the smallest change that solves the issue. Keep the original language and tone unless they are the cause of the problem. Do not oversimplify essential meaning or add promises the interface cannot support.

## Language guidance

- **English:** favor direct verbs, familiar vocabulary, contractions when they fit the voice, and clear subject–verb–object order.
- **Spanish:** favor natural, direct Spanish over literal translations; keep the chosen form of address consistent; avoid unnecessary nominalizations, gerunds, impersonal constructions, and English calques. Use inclusive wording that remains concise and readable.
- **Mixed-language interfaces:** flag accidental language changes, inconsistent terminology, and untranslated fragments. When a deliberate language change occurs, recommend that it be identified for assistive technology in implementation.

## Output

Start with the detected scope, languages, audience assumptions, and a short overall finding. Then provide a prioritized audit table:

| Priority | Location | Type | Original | Issue | Suggested copy | Why it is clearer |
| --- | --- | --- | --- | --- | --- | --- |

Use these priorities:

- **Critical:** wording may prevent task completion, cause a harmful decision, or hide essential information.
- **High:** the action, outcome, error, or instruction is ambiguous.
- **Medium:** reading effort, jargon, inconsistency, or poor scanning may exclude or slow users.
- **Low:** useful editorial polish with limited effect on comprehension.

Finish with:

- repeated terminology to standardize;
- missing states or messages;
- layout or implementation notes that affect understanding;
- a clean copy deck organized by screen when rewrites are requested;
- items requiring user research, legal review, subject-matter review, or native-language review.

If asked to apply changes, update only the approved scope and preserve text styles, component structure, variants, and layout constraints. Recheck truncation, wrapping, consistency, and every affected state afterward.

Do not claim that this editorial review proves WCAG conformance. Distinguish confirmed copy problems from recommendations, assumptions, and issues that require testing with users, assistive technology, or implementation code.
