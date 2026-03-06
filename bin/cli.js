#!/usr/bin/env node

const path = require('path');
const https = require('https');

const {
  detectIDE,
  getAvailableIDENames,
  getIDEDefinition,
  getInstalledVersion,
  installBundle,
  listSkillNames,
  normalizeIDEName,
} = require('../lib/skill-bundle');

const PACKAGE_NAME = '@votruongdanh/ai-agent-skills';
const CURRENT_VERSION = require('../package.json').version;

function parseIDEFlag() {
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--ide=')) {
      return arg.split('=')[1];
    }
  }

  return null;
}

function checkForUpdates(callback) {
  https
    .get(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const latest = JSON.parse(data).version;
          if (latest !== CURRENT_VERSION) {
            console.log(`\nUpdate available: ${CURRENT_VERSION} -> ${latest}`);
            console.log(`Run: npx ${PACKAGE_NAME}@latest init\n`);
          }
        } catch (error) {
          // Ignore update check failures.
        }

        callback();
      });
    })
    .on('error', () => callback());
}

function resolveIDE() {
  const manualIDE = parseIDEFlag();

  if (manualIDE) {
    const normalized = normalizeIDEName(manualIDE);
    if (normalized) {
      return normalized;
    }

    console.log(`Unknown IDE flag: ${manualIDE}`);
    console.log(`Supported values: ${getAvailableIDENames().join(', ')}\n`);
  }

  return detectIDE(process.cwd());
}

function printInstallResult(result, previousVersion, scope) {
  const action = previousVersion ? 'Updated' : 'Installed';
  const targetLabel = scope === 'global' ? 'Global targets' : 'Targets';

  console.log(`${action} ${result.skillCount} skills for ${result.displayName}.`);
  if (previousVersion) {
    console.log(`Version: ${previousVersion} -> ${CURRENT_VERSION}`);
  }
  console.log(`${targetLabel}:`);
  for (const target of result.targets) {
    const relativePath = path.relative(process.cwd(), target.targetDir) || '.';
    const tag = target.compatibility ? ' (compat)' : '';
    console.log(`  - ${relativePath}${tag}`);
  }
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Reopen ${result.displayName}.`);
  console.log('  2. Open agent chat and type "/" to list skills or slash commands.');
  console.log('  3. Run a skill such as /create, /debug, or /plan.\n');
}

function install(scope) {
  try {
    const ide = resolveIDE();
    const ideDefinition = getIDEDefinition(ide);
    const baseDir = process.cwd();
    const rootDir =
      scope === 'global'
        ? ideDefinition.globalRoot
        : path.join(baseDir, ideDefinition.projectRoot);
    const installedVersion = getInstalledVersion(rootDir);

    console.log(
      `${installedVersion ? 'Updating' : 'Installing'} AI Agent Skills for ${ideDefinition.displayName}...\n`
    );

    const result = installBundle({
      baseDir,
      ide,
      scope,
      version: CURRENT_VERSION,
      includeCompatibilityAliases: true,
    });

    printInstallResult(result, installedVersion, scope);
  } catch (error) {
    console.error(`Error installing skills: ${error.message}`);
    process.exit(1);
  }
}

function showHelp() {
  const skillNames = listSkillNames().map((name) => `/${name}`).join(', ');

  console.log(`
AI Agent Skills CLI

Usage:
  npx ${PACKAGE_NAME} init
  npx ${PACKAGE_NAME} init --ide=<name>
  npx ${PACKAGE_NAME} global
  npx ${PACKAGE_NAME} help

Supported IDE values:
  antigravity  -> .agent/workflows (+ agent/workflows compatibility alias)
  kiro         -> .kiro/skills
  cursor       -> .cursor/skills (+ legacy .cursor/rules)
  vscode       -> .github/skills for VS Code agent mode
  copilot      -> .github/skills for GitHub Copilot agent mode
  generic      -> .kiro/skills fallback

Primary install path:
  npx ${PACKAGE_NAME} init

PowerShell wrapper (optional):
  powershell -ExecutionPolicy Bypass -File .\\bin\\install-skills.ps1 -Ide vscode

Available skills:
  ${skillNames}

Documentation: https://github.com/votruongdanh/ai-agent-skills
`);
}

const command = process.argv[2];

switch (command) {
  case 'init':
    checkForUpdates(() => install('project'));
    break;
  case 'global':
    checkForUpdates(() => install('global'));
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log('Unknown command. Use "init", "global", or "help".\n');
    showHelp();
    process.exit(1);
}
