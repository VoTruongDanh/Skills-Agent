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

The CLI automatically detects your IDE and installs to the correct location:

✅ **Antigravity** - `.antigravity/` or `.ag/`  
✅ **Kiro** - `.kiro/`  
✅ **Cursor** - `.cursor/`  
✅ **Windsurf** - `.windsurf/`  
✅ **Continue** - `.continue/`  
✅ **Cody** - `.cody/`  
✅ **GitHub Copilot** - `.github/copilot/`  
✅ **Aider** - `.aider/`  
✅ **Tabnine** - `.tabnine/`  
✅ **Others** - Uses Kiro format (most compatible)

No configuration needed - just run the install command!

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

1. Run `npx @votruongdanh/ai-agent-skills init`
2. CLI automatically detects your IDE (Antigravity, Kiro, Cursor, etc.)
3. Skills installed to the correct config folder
4. Restart your IDE
5. Type `/` in chat to see available skills

Works with 9+ AI-powered IDEs out of the box!

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

**Note:** Updates will overwrite skill files. To preserve customizations:
1. Backup your modified skills before updating
2. Or create custom skills with different names

## 🔄 Updates

The CLI automatically checks for updates and notifies you. To update:

```bash
npx @votruongdanh/ai-agent-skills@latest init
```

**Smart Update Features:**
- ✅ Auto-detects installed version
- ✅ Shows version comparison
- ✅ Preserves your customizations (optional)
- ✅ Works across all supported IDEs

## 📄 License

MIT - Use freely in any project

## 👤 Author

**Vo Truong Danh**  
GitHub: [@votruongdanh](https://github.com/votruongdanh)

## 🤝 Contributing

Issues and PRs welcome at [GitHub](https://github.com/votruongdanh/ai-agent-skills)

## 🌟 Inspired By

This project is inspired by [Antigravity Kit](https://github.com/vudovn/antigravity-kit) - A collection of powerful AI development tools.

---

Made with ❤️ for the AI developer community
