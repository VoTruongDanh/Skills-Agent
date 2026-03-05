# 🚀 AI Agent Skills

Professional AI agent skills for Kiro, Cursor, Windsurf, and other AI-powered IDEs. 11 battle-tested workflows to supercharge your development.

[![npm version](https://img.shields.io/npm/v/@votruongdanh/ai-agent-skills.svg)](https://www.npmjs.com/package/@votruongdanh/ai-agent-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ⚡ Quick Install

One command, works everywhere:

```bash
npx @votruongdanh/ai-agent-skills init
```

That's it! No need to clone repos or download files.

## 🎯 Supported IDEs

✅ **Kiro** - Auto-detected  
✅ **Cursor** - Auto-detected  
✅ **Windsurf** - Auto-detected  
✅ **Others** - Uses Kiro format

The CLI automatically detects your IDE and installs to the right location.

## 📦 11 Professional Skills

| Skill | Command | Use Case |
|-------|---------|----------|
| **Brainstorm** | `/brainstorm` | Generate ideas and explore features |
| **Create** | `/create` | Build new features from scratch |
| **Debug** | `/debug` | Find and fix bugs systematically |
| **Deploy** | `/deploy` | Deployment and CI/CD guidance |
| **Enhance** | `/enhance` | Improve existing code quality |
| **Orchestrate** | `/orchestrate` | Coordinate multi-step workflows |
| **Plan** | `/plan` | Break down implementation tasks |
| **Preview** | `/preview` | Preview UX and output |
| **Status** | `/status` | Get project status overview |
| **Test** | `/test` | Write tests and improve coverage |
| **UI/UX Pro Max** | `/ui-ux-pro-max` | Advanced UI/UX improvements |

## 💡 Usage Examples

```
/create Add user authentication with JWT
/debug Login form not submitting on mobile
/enhance Optimize database query performance
/plan Implement real-time notifications
```

## 🌍 Installation Options

### Project-specific (Recommended)
```bash
cd your-project
npx @votruongdanh/ai-agent-skills init
```

### Global (All projects)
```bash
npx @votruongdanh/ai-agent-skills global
```

## 🔧 How It Works

1. Run the npx command
2. CLI detects your IDE automatically
3. Skills installed to `.kiro/`, `.cursor/`, or `.windsurf/`
4. Restart your IDE
5. Type `/` in chat to see skills

## ⚙️ Customization

Each skill is a markdown file you can edit:

```bash
# For Kiro
code .kiro/skills/create/SKILL.md

# For Cursor
code .cursor/skills/create/SKILL.md

# For Windsurf
code .windsurf/skills/create/SKILL.md
```

## 🔄 Updates

```bash
npx @votruongdanh/ai-agent-skills@latest init
```

## 📄 License

MIT - Use freely in any project

## 👤 Author

**Vo Truong Danh**  
GitHub: [@votruongdanh](https://github.com/votruongdanh)

## 🤝 Contributing

Issues and PRs welcome at [GitHub](https://github.com/votruongdanh/ai-agent-skills)

---

Made with ❤️ for the AI developer community
