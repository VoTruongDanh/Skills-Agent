---
name: component-audit
description: "Reference guide for Component Audit v2.2"
encoding: "UTF-8"
---

# Component Audit v2.2

## Purpose
Perform a container-first, full-depth component audit and approved repair. A simple trigger runs every mandatory phase and proactively reports issues beyond the literal request. Never interpret a component rebuild as page or screen design.

## Classify First
Classify the request before work:
- `AUDIT`: Read-only full scan and report.
- `REPAIR`: Repair explicitly approved, in-scope findings.
- `TOKEN_MIGRATION`: Replace token identities under the request’s token policy.
- `REBUILD_COPY`: Build an isolated copy while preserving original shared sources.
- `SOURCE_REPAIR`: Repair an authorized source definition.

Record classification, targets, mutation authority, token policy, and preservation requirements.

## Immutable Contract
Lock invariants for:
- scope and original nodes
- states, axes, visibility, content, interactions, exposed controls
- geometry, layout, typography, paints, effects, and rendering
- property definitions, names, types, order, defaults, references, preferred values, and overrides
- token identity, namespace, collection, mode, and intentional migrations

Separate invariant fields from intentional migration fields. Visual parity and token identity must both pass.

## Operating Flow
1. Classify and lock the contract.
2. Refresh file/library data.
3. Scan the complete container.
4. Report findings and proposed fixes.
5. Apply only authorized fixes.
6. Verify and recover.
7. Report final status.

`AUDIT` never mutates. `düzelt` authorizes only reported, in-scope, sufficiently confident findings. Architectural suggestions require separate approval.

## Mandatory Full Scan
Inspect every target container before descendants. Include every variant and axis, own nodes, nested instances, hidden and Boolean-gated descendants, invisible instance children, readable source subtrees, fills, strokes, color-bearing effects, layout, text, visibility, overrides, properties, and bindings.

Set `figma.skipInvisibleInstanceChildren = false`. If an instance subtree is unavailable, read its main component. Validate remote definitions by key when appropriate.

Never claim clean status when a mandatory phase is incomplete, truncated, inaccessible, or unverified.

## Truncation Recovery Workflow
If output is truncated:
1. Locate the complete saved output supplied by the operation.
2. Delegate reading it to a read-capable worker when available.
3. Otherwise read it in deterministic chunks until recovered.
4. Treat the complete saved output as authoritative.
5. Resume from the last verified boundary.
6. Record inaccessible content.

Never infer missing findings from a truncated excerpt. If recovery fails, report the affected phase as `Tamamlanamadı`.

## Naming and Typo Audit
Audit component, variant, axis, property, and node names. Team conventions have highest precedence, then file conventions, then general conventions.

Detect spelling errors, inconsistent equivalent names, default/generic/misleading names, and properties that conflict or are difficult to scan.

### Typo Confidence
- High: exact team/file correction, inconsistent equivalent sibling naming, or default name with strong sibling evidence.
- Medium: edit distance 1–2 from established terminology plus semantic evidence.
- Low: fuzzy similarity without structural evidence, unfamiliar terminology, or valid axis names resembling state values.

Only high-confidence findings are auto-fixable. Others require explicit approval.

### Baseline General UI Typo Lexicon
The baseline is fallback evidence only and never overrides team/file terminology.

General terms include: action, alignment, background, border, container, content, default, description, disabled, divider, empty, error, filled, focus, foreground, helper, hover, icon, item, label, leading, loading, placeholder, prefix, pressed, selected, size, state, status, stroke, subtitle, success, suffix, text, title, trailing, type, value, variant, visibility, warning.

Common typo map:
- aligment → alignment
- backgound → background
- boarder → border
- contnet → content
- deafult → default
- desciption → description
- disabeld → disabled
- divder → divider
- forgound → foreground
- hieght → height
- lable → label
- laoding → loading
- placehodler → placeholder
- selectd → selected
- subtitel → subtitle
- sucess → success
- titel → title
- varient → variant
- visiblity → visibility
- warnig → warning
- widht → width

A map match is high confidence only when it does not conflict with intentional terminology, proper nouns, axis semantics, or team/file conventions.

## Connection Validation and Candidates
Validate every remote nested instance using current remote data. For broken links search:
1. Importable remote instances already used in the file.
2. Matching components in candidate library files.
3. Sibling libraries discovered from validated candidates.

Remote definitions must never be modified or duplicated.

### Deterministic Candidate Scoring
- semantic name and role: 30%
- source/component-set identity: 20%
- variant/property compatibility: 20%
- structure: 15%
- visual similarity: 10%
- token compatibility: 5%

Semantic boosts use configurable context-appropriate synonyms, never hardcoded product-domain mappings.
- below 50%: not credible
- 50–84%: candidate requiring confirmation
- 85% or above: strong candidate, still requiring approval

Never report “no candidate” when any candidate scores at least 50%.

## Source Dependency Decisions
Use this order:
1. Reuse a compatible existing source.
2. Edit an authorized exclusively owned local source.
3. In `REBUILD_COPY` only, minimally isolate a shared local dependency.
4. Stop when success requires changing or duplicating a remote source.

Isolation is allowed only when necessary and only at the smallest dependency boundary.

## State and Identity Safety
- Never use `INSTANCE_SWAP` for a state-only change.
- Swap only when identity truly changes.
- Preserve state/property overrides during identity changes.
- Do not expose duplicate top-level and nested controls.
- Prefer one authoritative control path.
- Test current capabilities before declaring API-dependent work impossible.
- Never probe shared or remote sources destructively.

## Editor Interaction and Manipulability Policy
Treat product interaction, Figma editor manipulability, developer semantics, and presentation-only visuals as separate concerns. Never infer one from another.

Before recommending locks, clarify ambiguous intent one question at a time:
- Which areas should designers avoid selecting or editing?
- Are visible affordances runtime hit targets, developer-semantic markers, or presentation-only visuals?
- Should the change affect only the selected container or shared local sources?

Classify every candidate:
- `DESIGNER_EDITABLE`
- `RUNTIME_HIT_TARGET`
- `DEVELOPER_SEMANTIC`
- `PRESENTATION_ONLY`

Locking rules:
- Lock only approved `DEVELOPER_SEMANTIC` or `PRESENTATION_ONLY` layers that designers do not need to manipulate.
- Runtime clickability does not require Figma editor selectability.
- Prefer the smallest safe local boundary.
- Never lock a parent that contains designer-editable or independently controlled children.
- Prefer selected-container instance overrides when source-wide behavior is not authorized; report that resetOverrides can remove them.
- Shared local source changes require explicit source-impact approval. Remote sources remain read-only.
- Preserve geometry, visibility, tokens, variants, properties, overrides, reactions, and rendering.
- Keep semantic names and handoff meaning readable for developers.
- Designer-facing choices belong in component properties; implementation infrastructure should not become duplicate controls merely to stay selectable.
- Verify every variant, hidden state, effective lock state, visual parity, and mutation scope.

Report counts per classification and distinguish editor locking from runtime interaction behavior.

## Token Audit
Refresh variable IDs, names, collections, modes, aliases, and resolved values every run. Never hardcode token IDs or values. Request-level token policy has priority.

Audit own nodes and nested effective identity across every variant, hidden node, and readable source. Record actual identity, collection, resolved value/mode, inherited versus override status, hardcoded paints, expected identity, and confidence.

Token correctness is semantic identity, not RGB equality. Classify roles separately: background, empty/placeholder, state, stroke/border, content/foreground, interaction.

Detect fills used visually as outlines. Embedded UI components may use an approved component-specific token allowlist; do not force the container namespace onto them.

A typed namespace must be complete before migration or clean status. Apply paint bindings with `figma.variables.setBoundVariableForPaint()`. A token mismatch never justifies an identity swap.

### Own-Node Token Exception
An own node classified by the active contract as `Custom`, `Default`, `Generic`, `None`, or `Base` may be exempt from an inferred semantic-token requirement only when no more specific policy applies.

The exception:
- applies only to the qualifying own node
- requires role or file-convention evidence
- is overridden by explicit request namespace/migration policy
- never suppresses nested, descendant, inherited, or effective-token audits
- is reported as an accepted exception, not silently omitted
- cannot convert uncertainty into clean status

### Sibling Role Grouping and Counts
Group semantically equivalent siblings including left/right, leading/trailing, before/after, and start/end. Confirm roles using structure, position, source identity, property binding, layout direction, or repeated behavior—not names alone.

For each group and each variant count:
- correct
- wrong
- hardcoded
- uncertain
- sibling mismatch

Report per-variant and aggregate counts. An aggregate cannot hide an individual mismatch.

## Properties
Audit missing controls, missing intended text exposure, type/default correctness, duplicates, stale references, variant coverage, preferred values, slot metadata, visual/semantic order, and naming.

Variant properties remain first. Related controls stay adjacent.

### Deterministic Property Completeness
Inspect own content while skipping nested instance subtrees, then verify across all variants:
- editable text without TEXT property
- text with exposed visibility but unexposed characters
- uneditable generic placeholder content when customization is implied
- duplicate top-level and nested controls
- references without definitions

Paired visibility/content properties remain adjacent and follow team/file naming conventions.

### Deterministic Property Ordering
1. VARIANT properties first.
2. Top-to-bottom by bound node position.
3. Left-to-right on the same visual row.
4. Positions within 4 px are the same row unless semantics disagree.
5. Visibility Boolean immediately before related content.
6. Related groups remain contiguous.
7. Advanced controls follow primary controls.

For multi-node bindings, use the earliest primary semantic role.

### Safe Property Rebuild
1. Snapshot all rebuilt definitions.
2. Snapshot references across all variants.
3. Preserve defaults, preferred values, descriptions, slot settings, aliases, and overrides.
4. Delete only targeted properties.
5. Recreate in computed order.
6. Build old-key → new-key mapping.
7. Rebind every reference.
8. Restore instance overrides.
9. Verify definitions, order, defaults, references, and behavior.

Do not rebuild when affected references or instances cannot be enumerated safely.

## Figma Property Constraints C1–C5
### C1 — Directly Writable
Confirm node type/value, load fonts when needed, snapshot, mutate minimally, then re-read and visually verify.

### C2 — Dedicated Method Required
Use the supported dedicated operation, preserve immutable arrays and complete runtime property keys, and verify identity/layout side effects.

### C3 — Context or Ordering Constrained
Satisfy structural prerequisites reversibly. Append cloned variants before references, load subtree fonts before reparenting/text reflow, respect auto-layout and membership, and re-read runtime keys after structural change.

### C4 — Capability Uncertain
Inspect current typings/runtime. Test once on an isolated disposable local node. Never probe remote, shared, published, production, or user-authored sources destructively. Clean up the probe and record the result.

### C5 — Unsafe, Unsupported, or Non-Enumerable
Do not mutate or simulate success through detach, flatten, identity swap, or metadata loss. Report the exact blocker and offer only scoped alternatives preserving the immutable contract.

Constraint classification is operation-specific. One blocked field does not block unrelated safe repairs.

## Dynamic Count and Shared Visibility
For repeated optional content:
- begin with maximum supported count
- use layout that closes hidden gaps safely
- bind jointly visible elements to one shared Boolean
- name controls by semantic group, not index
- use separate Booleans only for independently controlled items
- verify hidden children leave the flow correctly

Layout infrastructure alone is not user-facing capability; required controls must be exposed.

## Cross-Variant Diff and Architecture
Before axis removal, consolidation, property conversion, or rebuild, diff variant pairs that differ only by the tested axis.

Match by stable role, source identity, normalized name, references, relative position, and structure. Index is last resort and lowers confidence.

Compare structure, source identity, dimensions, layout, text, visibility, paints, token identity, typography, effects, properties, references, and overrides.

- no difference: potentially redundant
- limited difference: report exact responsibility and alternatives
- significant difference: axis justified
- ambiguous matching: no destructive recommendation

Architectural review is mandatory but advisory unless separately approved.

## Swap Protocol
Every approved identity swap must:
1. Snapshot geometry, properties, text, visibility, paints, effects, bindings, source identity, and recursive overrides.
2. Separate invariants from intentional migration fields.
3. Swap to the validated candidate using the main-component setter.
4. Restore invariants through semantic matching.
5. Apply only declared migrations.
6. Reapply semantic instance names if reset by the source.
7. Verify source, state, properties, visual parity, and token identity.

Never detach instances or use swaps to hide unresolved state mapping.

## Technical Binding Rules
- Append cloned variants before assigning references.
- Preserve complete generated property keys.
- Use `setBoundVariableForPaint()` for fills/strokes.
- Reassign immutable paint arrays.
- Load all fonts before reparenting or text reflow.
- Preserve mirrored/rotated relative transforms.
- Reapply semantic names after replacement.

## Staged and Idempotent Mutation
Use independently verifiable bounded batches:
1. Re-read live state and skip correct targets.
2. Snapshot affected nodes/outcomes.
3. Apply the smallest mutation.
4. Verify immediately.
5. Stop on contract violation.
6. Recover precisely.
7. Continue only after the batch passes.

Do not mix unrelated structural, token, and naming changes. Correct a failure cause and retry once; otherwise mark the phase incomplete.

## Clone Hygiene and Sequential Content
For every clone:
1. Choose a verified neutral/default source, never an assumed index.
2. Record state and overrides.
3. Append to intended parent immediately.
4. Reset context-specific overrides.
5. Apply destination-state overrides.
6. Verify visibility, content, and token identity.
7. Confirm parent and final name.

For sequences, detect numeric, alphabetic, label, or semantic progression; continue it in all content states and preserve placeholders in non-content states.

## Post-Mutation Verification
Verify visual parity, exact token identity/mode, component/variant identity, properties/defaults/references/overrides, instance behavior, hidden content, lost state, variant membership, page hygiene, and immutable scope.

Remove only strays created by the current operation. Success requires both visual parity and token identity.

### Minimum Multi-State Screenshot Set
When represented, capture:
1. Default or Empty.
2. Filled or Normal.
3. Error or alternate state.
4. Disabled.
5. Specially modified state.

Cover every materially affected axis combination. Record unavailable categories. Screenshots never replace structural/property/token verification.

## Approval Rules
Present the read-only report before unrequested mutation. `düzelt` applies only reported, locked-scope, safe, confident, mode-permitted findings. It does not authorize unrelated architecture, source effects, uncertain typo fixes, ambiguous token mappings, or remote changes.

## Zero-Issue Completion Offer
After every mandatory phase passes with zero issues, report the verified result and offer to create or safely rebuild a new component under the same classification, immutable-contract, source, token, property, clone, screenshot, verification, and approval rules. The audit itself does not authorize creation.

## Legacy Safety Replacements — Capability Preserved
These capabilities were not removed; unsafe forms were replaced:
- Broad `düzelt` → all previously reported, scope-locked, sufficiently confident fixes remain available.
- Low-confidence typo correction → remains available after explicit approval; only auto-fix is confidence-limited.
- Global stray deletion → scoped cleanup remains available for current-operation nodes; unrelated nodes require explicit authority.
- Source repair → remains available for authorized local sources; remote mutation is replaced by reuse, validated replacement, or a blocked finding.
- Restore → remains available through complete snapshots and semantic/source identity; name-only restoration is replaced by identity-aware recovery.

This preserves capability while preventing unrelated mutation, uncertain correction, destructive cleanup, remote side effects, and incomplete restoration.

## Turkish Clickable Report
Report concisely in Turkish using only real selectable IDs:
- `<figma-node-link node-id="NODE_ID">Node adı</figma-node-link>`
- `<figma-node-group-link node-ids="ID1,ID2">Grup adı</figma-node-group-link>`

For every finding include: Sorun, Kapsam, Etki, Beklenen, Kanıt, Güven, Düzeltme, Yan etkiler, Adet.

Show representative links plus total counts. Conclude with mandatory-phase status, applied/deferred findings, verification, and unresolved risks. If any mandatory phase is incomplete, write `Tamamlanamadı` and never claim clean status.
