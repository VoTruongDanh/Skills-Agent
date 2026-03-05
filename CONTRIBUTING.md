# Contributing

Thanks for your interest! Here's how to contribute:

## Reporting Issues

- Use GitHub Issues
- Provide clear descriptions
- Include your IDE and OS

## Adding Skills

1. Fork the repo
2. Create folder in `.kiro/skills/your-skill/`
3. Add `SKILL.md` with frontmatter:

```markdown
---
name: your-skill
description: What it does
---

## Goal
...

## Workflow
...

## Rules
...
```

4. Update README.md
5. Submit PR

## Code Style

- Clear variable names
- Comment complex logic
- Follow existing patterns

## Testing

Test installation before submitting:
```bash
npm link
ai-skills init
```

## Questions?

Open a discussion on GitHub.
