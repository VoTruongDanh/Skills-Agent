#!/usr/bin/env node

const path = require('path');
const https = require('https');

const {
  findIDEContext,
  findProjectRootForIDE,
  getAvailableIDENames,
  getIDEDefinition,
  getInstalledVersion,
  getSkillCatalog,
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

function hasFlag(flag) {
  return process.argv.slice(2).includes(flag);
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

function resolveInstallContext() {
  const cwd = process.cwd();
  const manualIDE = parseIDEFlag();

  if (manualIDE) {
    const normalized = normalizeIDEName(manualIDE);
    if (normalized) {
      const projectMatch = findProjectRootForIDE(cwd, normalized);
      return {
        ide: normalized,
        source: 'flag',
        baseDir: projectMatch ? projectMatch.projectDir : cwd,
        matchedPath: projectMatch ? projectMatch.matchedPath : null,
      };
    }

    console.log(`Unknown IDE flag: ${manualIDE}`);
    console.log(`Supported values: ${getAvailableIDENames().join(', ')}\n`);
  }

  const detected = findIDEContext(cwd);
  return {
    ide: detected.ide,
    source: detected.source,
    baseDir: detected.projectDir || cwd,
    matchedPath: detected.matchedPath,
  };
}

function printResolution(context) {
  const ideDefinition = getIDEDefinition(context.ide);

  if (context.source === 'flag') {
    console.log(`Using IDE flag: ${ideDefinition.displayName}`);
    if (context.matchedPath) {
      console.log(`Workspace root: ${context.baseDir} (found ${context.matchedPath})\n`);
    } else {
      console.log(`Workspace root: ${context.baseDir}\n`);
    }
    return;
  }

  if (context.source === 'project') {
    console.log(
      `Auto-detected ${ideDefinition.displayName} from ${context.matchedPath} at ${context.baseDir}\n`
    );
    return;
  }

  if (context.source === 'global') {
    console.log(
      `Auto-detected ${ideDefinition.displayName} from global config ${context.matchedPath}\n`
    );
    return;
  }

  console.log('No IDE marker found. Falling back to generic SKILL.md layout.');
  console.log('Tip: use --ide=cursor, --ide=antigravity, --ide=vscode, or --ide=kiro\n');
}

function dedupeWarnings(warnings) {
  const seen = new Set();
  const uniqueWarnings = [];

  for (const warning of warnings || []) {
    const key = `${warning.code || 'warning'}:${warning.message}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueWarnings.push(warning);
  }

  return uniqueWarnings;
}

function printWarnings(warnings) {
  const uniqueWarnings = dedupeWarnings(warnings);
  if (!uniqueWarnings.length) {
    return;
  }

  console.log('Warnings:');
  for (const warning of uniqueWarnings) {
    console.log(`  - ${warning.message}`);
  }
  console.log('');
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
  printWarnings(result.warnings);
  console.log('Next steps:');
  console.log(`  1. Reopen ${result.displayName}.`);
  console.log('  2. Open agent chat and type "/" to list skills or slash commands.');
  console.log('  3. Run a skill such as /create, /debug, or /plan.\n');
}

function install(scope) {
  try {
    const context = resolveInstallContext();
    const ideDefinition = getIDEDefinition(context.ide);
    const baseDir = scope === 'global' ? process.cwd() : context.baseDir;
    const rootDir =
      scope === 'global'
        ? ideDefinition.globalRoot
        : path.join(baseDir, ideDefinition.projectRoot);
    const installedVersion = getInstalledVersion(rootDir);

    printResolution(context);

    console.log(
      `${installedVersion ? 'Updating' : 'Installing'} AI Agent Skills for ${ideDefinition.displayName}...\n`
    );

    const result = installBundle({
      baseDir,
      ide: context.ide,
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

function getTargetCompatibility(skill, ide) {
  const ideDefinition = getIDEDefinition(ide) || getIDEDefinition('generic');

  return ideDefinition.targets.map((target) => ({
    format: target.format,
    status: skill.compatibility[target.format].status,
    warnings: skill.compatibility[target.format].warnings,
  }));
}

function formatCompatibilitySummary(skill, ide) {
  return getTargetCompatibility(skill, ide)
    .map((target) => {
      const status = target.status === 'generated-with-warnings' ? 'generated+warnings' : target.status;
      return `${target.format}: ${status}`;
    })
    .join(', ');
}

function printListContext(context) {
  const ideDefinition = getIDEDefinition(context.ide);
  console.log(`Listing bundled skills for ${ideDefinition.displayName}.`);
  if (context.matchedPath) {
    console.log(`Detected from: ${context.matchedPath}`);
  }
  console.log('');
}

function listSkills() {
  try {
    const context = resolveInstallContext();
    const catalogResult = getSkillCatalog({ includeDiagnostics: true });
    const jsonMode = hasFlag('--json');
    const renderedCatalog = catalogResult.skills.map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      description: skill.description,
      sourceRoot: skill.sourceRoot,
      hasScripts: skill.hasScripts,
      hasReferences: skill.hasReferences,
      hasAssets: skill.hasAssets,
      compatibility: getTargetCompatibility(skill, context.ide),
    }));

    if (jsonMode) {
      console.log(
        JSON.stringify(
          {
            package: PACKAGE_NAME,
            version: CURRENT_VERSION,
            ide: context.ide,
            skills: renderedCatalog,
            diagnostics: dedupeWarnings(catalogResult.diagnostics),
          },
          null,
          2
        )
      );
      return;
    }

    printListContext(context);
    console.log('Available skills:');
    for (const skill of catalogResult.skills) {
      console.log(
        `  - /${skill.slug} - ${skill.description} [source: ${skill.sourceRoot}] [${formatCompatibilitySummary(
          skill,
          context.ide
        )}]`
      );
    }
    console.log('');
    printWarnings(catalogResult.diagnostics);
  } catch (error) {
    console.error(`Error listing skills: ${error.message}`);
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
  npx ${PACKAGE_NAME} list
  npx ${PACKAGE_NAME} list --json
  npx ${PACKAGE_NAME} help

Supported IDE values:
  antigravity  -> .agent/workflows (+ agent/workflows compatibility alias)
  kiro         -> .kiro/skills
  cursor       -> .cursor/skills (+ legacy .cursor/rules)
  vscode       -> .github/skills for VS Code agent mode
  copilot      -> .github/skills for GitHub Copilot agent mode
  generic      -> .kiro/skills fallback

Canonical skill roots:
  .skills      -> preferred portable source
  .kiro/skills -> legacy fallback source

Generated target limitations:
  Cursor .mdc rules and Antigravity workflows only render SKILL.md content.
  Companion scripts/, references/, and assets/ stay native-only.

Primary install path:
  npx ${PACKAGE_NAME} init

Force a specific IDE:
  npx ${PACKAGE_NAME} init --ide=cursor
  npx ${PACKAGE_NAME} init --ide=antigravity
  npx ${PACKAGE_NAME} init --ide=vscode
  npx ${PACKAGE_NAME} init --ide=kiro

Inspect the bundled catalog:
  npx ${PACKAGE_NAME} list
  npx ${PACKAGE_NAME} list --json

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
  case 'list':
    listSkills();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log('Unknown command. Use "init", "global", "list", or "help".\n');
    showHelp();
    process.exit(1);
}
