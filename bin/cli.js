#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');

const command = process.argv[2];
const PACKAGE_NAME = '@votruongdanh/skills';
const CURRENT_VERSION = require('../package.json').version;

// Check for updates
function checkForUpdates(callback) {
  https.get(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const latest = JSON.parse(data).version;
        if (latest !== CURRENT_VERSION) {
          console.log(`\n📢 Update available: ${CURRENT_VERSION} → ${latest}`);
          console.log(`   Run: npx ${PACKAGE_NAME}@latest init\n`);
        }
        callback();
      } catch (e) {
        callback(); // Silent fail
      }
    });
  }).on('error', () => callback()); // Silent fail
}

// Detect IDE type with expanded support
function detectIDE() {
  const cwd = process.cwd();
  const homeDir = os.homedir();
  
  // IDE detection map - order matters (most specific first)
  const ideChecks = [
    { name: 'antigravity', paths: ['.antigravity', '.ag'] },
    { name: 'kiro', paths: ['.kiro'] },
    { name: 'cursor', paths: ['.cursor'] },
    { name: 'windsurf', paths: ['.windsurf'] },
    { name: 'continue', paths: ['.continue'] },
    { name: 'cody', paths: ['.cody'] },
    { name: 'copilot', paths: ['.github/copilot'] },
    { name: 'aider', paths: ['.aider'] },
    { name: 'tabnine', paths: ['.tabnine'] },
  ];
  
  // Check current directory first
  for (const ide of ideChecks) {
    for (const idePath of ide.paths) {
      if (fs.existsSync(path.join(cwd, idePath))) {
        return ide.name;
      }
    }
  }
  
  // Check home directory for global configs
  for (const ide of ideChecks) {
    for (const idePath of ide.paths) {
      if (fs.existsSync(path.join(homeDir, idePath))) {
        return ide.name;
      }
    }
  }
  
  // Default to kiro (most common and compatible)
  return 'kiro';
}

// Get IDE display name
function getIDEDisplayName(ide) {
  const names = {
    'antigravity': 'Antigravity',
    'kiro': 'Kiro',
    'cursor': 'Cursor',
    'windsurf': 'Windsurf',
    'continue': 'Continue',
    'cody': 'Cody',
    'copilot': 'GitHub Copilot',
    'aider': 'Aider',
    'tabnine': 'Tabnine'
  };
  return names[ide] || ide.charAt(0).toUpperCase() + ide.slice(1);
}

// Get IDE config directory
function getIDEConfigDir(ide) {
  const configDirs = {
    'antigravity': '.antigravity',
    'kiro': '.kiro',
    'cursor': '.cursor',
    'windsurf': '.windsurf',
    'continue': '.continue',
    'cody': '.cody',
    'copilot': '.github/copilot',
    'aider': '.aider',
    'tabnine': '.tabnine'
  };
  return configDirs[ide] || `.${ide}`;
}

function copyDirectory(src, dest, options = {}) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, options);
    } else {
      // Skip if file exists and preserve flag is set
      if (options.preserveExisting && fs.existsSync(destPath)) {
        console.log(`   ⏭️  Skipped (exists): ${entry.name}`);
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
      if (options.verbose) {
        console.log(`   ✓ ${entry.name}`);
      }
    }
  }
}

function saveVersionInfo(targetPath, version) {
  const versionFile = path.join(targetPath, '.skills-version');
  fs.writeFileSync(versionFile, version);
}

function getInstalledVersion(targetPath) {
  const versionFile = path.join(targetPath, '.skills-version');
  if (fs.existsSync(versionFile)) {
    return fs.readFileSync(versionFile, 'utf8').trim();
  }
  return null;
}

function init() {
  const cwd = process.cwd();
  const ide = detectIDE();
  const ideDisplay = getIDEDisplayName(ide);
  const ideConfigDir = getIDEConfigDir(ide);
  const skillsSource = path.join(__dirname, '..', '.kiro');
  const skillsTarget = path.join(cwd, ideConfigDir);
  const installedVersion = getInstalledVersion(skillsTarget);
  const isUpdate = installedVersion !== null;

  if (isUpdate) {
    console.log(`🔄 Updating AI Agent Skills for ${ideDisplay}...`);
    console.log(`   ${installedVersion} → ${CURRENT_VERSION}\n`);
  } else {
    console.log(`🚀 Installing AI Agent Skills for ${ideDisplay}...\n`);
  }

  try {
    if (fs.existsSync(skillsTarget) && !isUpdate) {
      console.log(`⚠️  ${ideConfigDir} folder already exists.`);
      console.log('   Merging skills into existing folder...\n');
    }

    // Preserve user customizations on update
    const options = isUpdate ? { preserveExisting: false, verbose: false } : {};
    copyDirectory(skillsSource, skillsTarget, options);
    saveVersionInfo(skillsTarget, CURRENT_VERSION);

    if (isUpdate) {
      console.log('✅ Successfully updated AI Agent Skills!\n');
    } else {
      console.log('✅ Successfully installed AI Agent Skills!\n');
    }
    console.log(`📦 Location: ${ideConfigDir}/skills/\n`);
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
    console.log(`   1. Reopen your project in ${ideDisplay}`);
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
  const ideDisplay = getIDEDisplayName(ide);
  const ideConfigDir = getIDEConfigDir(ide);
  const globalSkillsPath = path.join(homeDir, ideConfigDir, 'skills');
  const skillsSource = path.join(__dirname, '..', '.kiro', 'skills');

  console.log(`🌍 Installing AI Agent Skills globally for ${ideDisplay}...\n`);

  try {
    if (!fs.existsSync(globalSkillsPath)) {
      fs.mkdirSync(globalSkillsPath, { recursive: true });
    }

    copyDirectory(skillsSource, globalSkillsPath);

    console.log('✅ Successfully installed skills globally!\n');
    console.log('📍 Location: ' + globalSkillsPath + '\n');
    console.log('🎯 Next steps:');
    console.log(`   1. Restart ${ideDisplay}`);
    console.log('   2. Skills will be available in all projects\n');
  } catch (error) {
    console.error('❌ Error installing global skills:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
AI Agent Skills CLI - Universal skills for AI-powered IDEs

Usage:
  npx @votruongdanh/skills init       Install skills in current project
  npx @votruongdanh/skills global     Install skills globally
  npx @votruongdanh/skills help       Show this help message

Supported IDEs (Auto-detected):
  ✅ Antigravity    - .antigravity or .ag folder
  ✅ Kiro           - .kiro folder
  ✅ Cursor         - .cursor folder
  ✅ Windsurf       - .windsurf folder
  ✅ Continue       - .continue folder
  ✅ Cody           - .cody folder
  ✅ GitHub Copilot - .github/copilot folder
  ✅ Aider          - .aider folder
  ✅ Tabnine        - .tabnine folder
  ✅ Others         - Uses Kiro format by default

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

Documentation: https://github.com/votruongdanh/skills
`);
}

switch (command) {
  case 'init':
    checkForUpdates(() => init());
    break;
  case 'global':
    checkForUpdates(() => installGlobal());
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
