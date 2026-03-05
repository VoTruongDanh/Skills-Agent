#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const command = process.argv[2];

// Detect IDE type
function detectIDE() {
  const cwd = process.cwd();
  
  // Check for Kiro
  if (fs.existsSync(path.join(cwd, '.kiro'))) return 'kiro';
  
  // Check for Cursor
  if (fs.existsSync(path.join(cwd, '.cursor'))) return 'cursor';
  
  // Check for Windsurf
  if (fs.existsSync(path.join(cwd, '.windsurf'))) return 'windsurf';
  
  // Check home directory for global configs
  const homeDir = os.homedir();
  if (fs.existsSync(path.join(homeDir, '.kiro'))) return 'kiro';
  if (fs.existsSync(path.join(homeDir, '.cursor'))) return 'cursor';
  if (fs.existsSync(path.join(homeDir, '.windsurf'))) return 'windsurf';
  
  // Default to Kiro (most common)
  return 'kiro';
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function init() {
  const cwd = process.cwd();
  const ide = detectIDE();
  const skillsSource = path.join(__dirname, '..', '.kiro');
  const skillsTarget = path.join(cwd, `.${ide}`);

  console.log(`🚀 Installing AI Agent Skills for ${ide.toUpperCase()}...\n`);

  try {
    if (fs.existsSync(skillsTarget)) {
      console.log(`⚠️  .${ide} folder already exists.`);
      console.log('   Merging skills into existing folder...\n');
    }

    copyDirectory(skillsSource, skillsTarget);

    console.log('✅ Successfully installed AI Agent Skills!\n');
    console.log(`📦 Installed to: .${ide}/skills/\n`);
    console.log('📋 Available skills:');
    console.log('   • /brainstorm    - Ideation and feature exploration');
    console.log('   • /create        - Build new features and components');
    console.log('   • /debug         - Root-cause analysis and bug fixing');
    console.log('   • /deploy        - Deployment and release preparation');
    console.log('   • /enhance       - Improve and refactor existing code');
    console.log('   • /orchestrate   - Multi-step coordinated planning');
    console.log('   • /plan          - Implementation planning and breakdown');
    console.log('   • /preview       - Preview expected output and UX');
    console.log('   • /status        - Project status and progress summary');
    console.log('   • /test          - Test strategy and coverage');
    console.log('   • /ui-ux-pro-max - UI/UX improvements and design\n');
    console.log('🎯 Next steps:');
    console.log(`   1. Reopen your project in ${ide.charAt(0).toUpperCase() + ide.slice(1)}`);
    console.log('   2. Type "/" in chat to see available skills');
    console.log('   3. Start using skills like /create, /debug, /enhance\n');
  } catch (error) {
    console.error('❌ Error installing skills:', error.message);
    process.exit(1);
  }
}

function installGlobal() {
  const homeDir = os.homedir();
  const ide = detectIDE();
  const globalSkillsPath = path.join(homeDir, `.${ide}`, 'skills');
  const skillsSource = path.join(__dirname, '..', '.kiro', 'skills');

  console.log(`🌍 Installing AI Agent Skills globally for ${ide.toUpperCase()}...\n`);

  try {
    if (!fs.existsSync(globalSkillsPath)) {
      fs.mkdirSync(globalSkillsPath, { recursive: true });
    }

    copyDirectory(skillsSource, globalSkillsPath);

    console.log('✅ Successfully installed skills globally!\n');
    console.log('📍 Location: ' + globalSkillsPath + '\n');
    console.log('🎯 Next steps:');
    console.log(`   1. Restart ${ide.charAt(0).toUpperCase() + ide.slice(1)}`);
    console.log('   2. Skills will be available in all projects\n');
  } catch (error) {
    console.error('❌ Error installing global skills:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
AI Agent Skills CLI - Universal skills for Kiro, Cursor, Windsurf & more

Usage:
  npx @votruongdanh/ai-agent-skills init       Install skills in current project
  npx @votruongdanh/ai-agent-skills global     Install skills globally
  npx @votruongdanh/ai-agent-skills help       Show this help message

Supported IDEs:
  ✅ Kiro      - Automatically detected
  ✅ Cursor    - Automatically detected
  ✅ Windsurf  - Automatically detected
  ✅ Others    - Uses Kiro format by default

Available Skills:
  /brainstorm    - Ideation and feature exploration
  /create        - Build new features and components
  /debug         - Root-cause analysis and bug fixing
  /deploy        - Deployment and release preparation
  /enhance       - Improve and refactor existing code
  /orchestrate   - Multi-step coordinated planning
  /plan          - Implementation planning and breakdown
  /preview       - Preview expected output and UX
  /status        - Project status and progress summary
  /test          - Test strategy and coverage
  /ui-ux-pro-max - UI/UX improvements and design

Documentation: https://github.com/votruongdanh/ai-agent-skills
`);
}

switch (command) {
  case 'init':
    init();
    break;
  case 'global':
    installGlobal();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log('❌ Unknown command. Use "init", "global", or "help".\n');
    showHelp();
    process.exit(1);
}
