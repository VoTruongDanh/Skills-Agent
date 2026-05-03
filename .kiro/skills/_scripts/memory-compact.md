---
name: memory-compact
description: Procedure to compact `.ai-memory.md` when it grows too long
---

## When to compact
Run this procedure when `.ai-memory.md` exceeds **500 lines** or when you notice:
- Duplicate or near-duplicate bullets
- Outdated information (old decisions, resolved issues, ancient work items)
- Verbose bullets that could be shortened
- Sections exceeding their hard limits (see Memory Compaction Rules)

## Compaction procedure

### 1. Check section limits (from `.ai-memory-template.md`)
- **Tech Stack**: max 6 bullets
- **Architecture**: max 8 bullets
- **Conventions**: max 8 bullets
- **Decisions**: keep last 12 items
- **Known Issues**: keep last 20 items (remove resolved/closed)
- **Recent Work**: keep last 15 items

### 2. Dedupe within each section
For each section:
1. Read all bullets
2. Group similar bullets (same topic, same file, same decision)
3. Merge groups into single bullets:
   - Keep most specific wording
   - Preserve all file paths, dates, IDs
   - Remove redundant phrases

**Example:**
```markdown
Before:
- [2024-01-15] Added auth middleware to protect routes
- [2024-01-16] Implemented authentication middleware in src/middleware/auth.js
- Auth middleware added for route protection

After:
- [2024-01-15] Added auth middleware (src/middleware/auth.js) to protect routes
```

### 3. Remove outdated items
- **Decisions**: Keep only decisions still relevant to current architecture
- **Known Issues**: Remove resolved/closed issues older than 30 days
- **Recent Work**: Keep only last 15 items (remove older)

### 4. Shorten verbose bullets
Target: ≤ 140 characters per bullet

**Techniques:**
- Remove filler words: "basically", "essentially", "in order to"
- Use abbreviations: "impl" for "implemented", "cfg" for "config"
- Use file paths instead of descriptions: `src/auth.js` not "the authentication file"
- Use symbols: `+` for "added", `~` for "updated", `-` for "removed"

**Example:**
```markdown
Before:
- [2024-01-15] We implemented a new authentication system that uses JWT tokens for user sessions in the backend API

After:
- [2024-01-15] + JWT auth system (src/api/auth.js) for user sessions
```

### 5. Enforce hard limits
If a section still exceeds limits after deduping and shortening:
- **Decisions**: Keep last 12, archive older ones in a comment
- **Known Issues**: Keep last 20, remove oldest resolved
- **Recent Work**: Keep last 15, remove oldest

**Archive pattern:**
```markdown
## Decisions
- [2024-03-01] Current decision 1
- [2024-02-28] Current decision 2
...

<!-- Archived decisions (for reference):
- [2024-01-15] Old decision that's no longer relevant
-->
```

### 6. Verify compaction
After compacting:
- [ ] No section exceeds hard limits
- [ ] No duplicate bullets
- [ ] All bullets ≤ 140 characters (or split into 2)
- [ ] File paths preserved
- [ ] Dates preserved
- [ ] Recent/important info retained

## Quick compaction (when in a hurry)
If you need to compact quickly:
1. **Recent Work**: Keep last 15, delete rest
2. **Known Issues**: Remove all resolved/closed, keep last 20
3. **Decisions**: Keep last 12
4. Run dedupe on remaining bullets (merge similar ones)

## Automation tip
When updating memory, always:
1. Check if section is at limit BEFORE adding
2. If at limit, remove oldest item OR merge with existing
3. Never append if it creates a duplicate

## Example: Full compaction

**Before (verbose, duplicates, over limits):**
```markdown
## Recent Work
- [2024-01-10] Added login page
- [2024-01-11] Created login component
- [2024-01-12] Implemented login functionality
- [2024-01-13] Fixed login bug
- [2024-01-14] Updated login styles
- [2024-01-15] Added logout button
- [2024-01-16] Implemented logout functionality
- [2024-01-17] Fixed logout bug
- [2024-01-18] Added user profile page
- [2024-01-19] Created user profile component
- [2024-01-20] Implemented profile edit
- [2024-01-21] Fixed profile bug
- [2024-01-22] Added settings page
- [2024-01-23] Created settings component
- [2024-01-24] Implemented settings save
- [2024-01-25] Fixed settings bug
- [2024-01-26] Added dashboard
- [2024-01-27] Created dashboard component
```

**After (compact, deduped, within limits):**
```markdown
## Recent Work
- [2024-01-27] + Dashboard (src/pages/Dashboard.jsx)
- [2024-01-26] + Settings page (src/pages/Settings.jsx) with save functionality
- [2024-01-22] + User profile page (src/pages/Profile.jsx) with edit feature
- [2024-01-15] + Login/logout (src/pages/Login.jsx, src/components/LogoutBtn.jsx)
```

## Related
- Read `.kiro/skills/_scripts/.ai-memory-template.md` for Memory Compaction Rules
- Read `.kiro/skills/_scripts/memory-dedupe.md` for dedupe procedure
