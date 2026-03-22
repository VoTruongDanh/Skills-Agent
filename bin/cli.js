#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const readline = require('readline');

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
  parseFrontmatter,
} = require('../lib/skill-bundle');

const PACKAGE_NAME = '@votruongdanh/ai-agent-skills';
const CURRENT_VERSION = require('../package.json').version;

// ─── ANSI Colors ────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m',
  white: '\x1b[37m',
};

function badge(text) {
  return `${c.bgBlue}${c.white}${c.bold} ${text} ${c.reset}`;
}

function success(text) {
  return `${c.green}✔${c.reset} ${text}`;
}

function warn(text) {
  return `${c.yellow}⚠${c.reset} ${text}`;
}

function info(text) {
  return `${c.cyan}ℹ${c.reset} ${text}`;
}

function error(text) {
  return `${c.red}✖${c.reset} ${text}`;
}

function step(num, text) {
  return `${c.dim}[${num}]${c.reset} ${text}`;
}

// ─── Interactive Prompt Helpers ─────────────────────────────────────────────
function createRL() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function selectMenu(rl, title, options) {
  console.log(`\n${c.bold}${title}${c.reset}\n`);
  options.forEach((opt, i) => {
    const marker = opt.recommended ? ` ${c.green}← recommended${c.reset}` : '';
    const desc = opt.description ? ` ${c.dim}(${opt.description})${c.reset}` : '';
    console.log(`  ${c.cyan}${i + 1}${c.reset}) ${c.bold}${opt.label}${c.reset}${desc}${marker}`);
  });
  console.log('');

  while (true) {
    const answer = await ask(rl, `  ${c.dim}Your choice (1-${options.length}):${c.reset} `);
    const num = parseInt(answer.trim(), 10);
    if (num >= 1 && num <= options.length) {
      return options[num - 1];
    }
    console.log(`  ${c.red}Please enter a number between 1 and ${options.length}${c.reset}`);
  }
}

async function confirm(rl, question) {
  const answer = await ask(rl, `  ${question} ${c.dim}(y/n):${c.reset} `);
  return answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes';
}

function parseIDEFlag() {
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--ide=')) {
      return arg.split('=')[1];
    }
  }
  return null;
}

function parseArg(prefix) {
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith(`--${prefix}=`)) {
      return arg.split('=').slice(1).join('=');
    }
  }
  return null;
}

function hasFlag(flag) {
  return process.argv.slice(2).includes(flag);
}

function positionalArg(index) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  return args[index] || null;
}

// ─── Update Check ───────────────────────────────────────────────────────────
function checkForUpdates(callback) {
  https
    .get(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const latest = JSON.parse(data).version;
          if (latest !== CURRENT_VERSION) {
            console.log(warn(`Update available: ${c.yellow}${CURRENT_VERSION}${c.reset} → ${c.green}${latest}${c.reset}`));
            console.log(info(`Run: ${c.cyan}npx ${PACKAGE_NAME}@latest init${c.reset}\n`));
          }
        } catch (_) {}
        callback();
      });
    })
    .on('error', () => callback());
}

// ─── IDE Resolution ─────────────────────────────────────────────────────────
function resolveInstallContext() {
  const cwd = process.cwd();
  const manualIDE = parseIDEFlag();

  if (manualIDE) {
    const normalized = normalizeIDEName(manualIDE);
    if (normalized) {
      const projectMatch = findProjectRootForIDE(cwd, normalized);
      const useDetectedProjectRoot = projectMatch && projectMatch.projectDir === cwd;
      return {
        ide: normalized,
        source: 'flag',
        baseDir: useDetectedProjectRoot ? projectMatch.projectDir : cwd,
        matchedPath: useDetectedProjectRoot ? projectMatch.matchedPath : null,
      };
    }
    console.log(error(`Unknown IDE: ${manualIDE}`));
    console.log(info(`Supported: ${getAvailableIDENames().join(', ')}\n`));
  }

  const detected = findIDEContext(cwd);
  return {
    ide: detected.ide,
    source: detected.source,
    baseDir: detected.projectDir || cwd,
    matchedPath: detected.matchedPath,
  };
}

// ─── Interactive Init ───────────────────────────────────────────────────────
async function interactiveInit() {
  const rl = createRL();

  console.log(`\n${badge('AI Agent Skills')} v${CURRENT_VERSION}\n`);

  // Step 1: Choose IDE
  const ideFlag = parseIDEFlag();
  let selectedIDE;
  const supportedIDEOptions = [
    { label: 'Cursor', value: 'cursor', description: '.cursor/skills + .cursor/rules', recommended: true },
    { label: 'Kiro', value: 'kiro', description: '.kiro/skills' },
    { label: 'Antigravity', value: 'antigravity', description: '.agent/workflows' },
    { label: 'Codex', value: 'codex', description: '.agents/skills (+ AGENTS.md / memories)' },
    { label: 'VS Code', value: 'vscode', description: '.github/skills' },
    { label: 'GitHub Copilot', value: 'copilot', description: '.github/skills' },
    { label: 'All supported IDEs', value: 'all', description: 'Install for every supported IDE' },
  ];

  if (ideFlag) {
    if (String(ideFlag).trim().toLowerCase() === 'all') {
      selectedIDE = 'all';
      console.log(info(`IDE target: ${c.bold}All supported IDEs${c.reset} (from --ide flag)\n`));
    } else {
      selectedIDE = normalizeIDEName(ideFlag);
    }

    if (!selectedIDE || selectedIDE === 'generic') {
      console.log(error(`Unknown IDE: ${ideFlag}`));
      console.log(info(`Supported: cursor, kiro, antigravity, codex, vscode, copilot, all\n`));
      rl.close();
      process.exit(1);
    }

    if (selectedIDE !== 'all') {
      const def = getIDEDefinition(selectedIDE);
      console.log(info(`IDE: ${c.bold}${def.displayName}${c.reset} (from --ide flag)\n`));
    }
  } else {
    const choice = await selectMenu(rl, '🔧 Choose your IDE:', supportedIDEOptions);
    selectedIDE = choice.value;
  }

  // Step 2: Choose scope (project vs global)
  let scope = hasFlag('--global') ? 'global' : null;

  if (!scope) {
    const globalDescription =
      selectedIDE === 'all'
        ? 'Install to each IDE global directory'
        : `~/${getIDEDefinition(selectedIDE).projectRoot}`;
    const scopeOptions = [
      { label: 'This project only', value: 'project', description: process.cwd(), recommended: true },
      { label: 'Global (all projects)', value: 'global', description: globalDescription },
    ];
    const scopeChoice = await selectMenu(rl, '📂 Install scope:', scopeOptions);
    scope = scopeChoice.value;
  }

  rl.close();

  // Step 3: Install
  const cwd = process.cwd();
  const installTargets =
    selectedIDE === 'all'
      ? ['cursor', 'kiro', 'antigravity', 'codex', 'vscode', 'copilot']
      : [selectedIDE];

  console.log(`\n${step(1, 'Installing skills...')}`);

  const installResults = [];
  for (const ide of installTargets) {
    const ideDefinition = getIDEDefinition(ide);
    const baseDir = cwd;
    const rootDir =
      scope === 'global'
        ? ideDefinition.globalRoot
        : path.join(baseDir, ideDefinition.projectRoot);
    const installedVersion = getInstalledVersion(rootDir);

    const result = installBundle({
      baseDir,
      ide,
      scope,
      version: CURRENT_VERSION,
      includeCompatibilityAliases: true,
    });

    installResults.push({ result, installedVersion });
  }

  for (const { result, installedVersion } of installResults) {
    console.log(success(`${result.skillCount} skills installed for ${c.bold}${result.displayName}${c.reset}`));
    if (installedVersion) {
      console.log(info(`Updated: ${c.yellow}${installedVersion}${c.reset} → ${c.green}${CURRENT_VERSION}${c.reset}`));
    }
  }

  console.log(`\n${step(2, 'Targets created:')}`);
  for (const { result } of installResults) {
    for (const target of result.targets) {
      const rel = path.relative(cwd, target.targetDir) || '.';
      const tag = target.compatibility ? ` ${c.dim}(compat)${c.reset}` : '';
      console.log(`  ${c.green}→${c.reset} ${rel}${tag}`);
    }
  }

  // Warnings
  const uniqueWarnings = dedupeWarnings(installResults.flatMap(({ result }) => result.warnings));
  if (uniqueWarnings.length) {
    console.log('');
    for (const w of uniqueWarnings) {
      console.log(warn(w.message));
    }
  }

  // Next steps
  const nextStepIDEName =
    selectedIDE === 'all'
      ? 'your IDE'
      : installResults[0].result.displayName;
  console.log(`\n${c.bold}${c.green}Done!${c.reset} Next steps:\n`);
  console.log(`  1. ${c.dim}Reopen${c.reset} ${c.bold}${nextStepIDEName}${c.reset}`);
  console.log(`  2. ${c.dim}Open agent chat and type${c.reset} ${c.cyan}/${c.reset} ${c.dim}to list skills${c.reset}`);
  console.log(`  3. ${c.dim}Try:${c.reset} ${c.cyan}/create${c.reset}, ${c.cyan}/debug${c.reset}, ${c.cyan}/explain${c.reset}, or ${c.cyan}/plan${c.reset}`);
  console.log('');
}

// ─── GitHub Skill Fetcher ───────────────────────────────────────────────────
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const options = { headers: { 'User-Agent': 'ai-agent-skills-cli' } };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGet(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchGitHubTree(owner, repo, branch) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  const data = JSON.parse(await httpsGet(url));
  return data.tree || [];
}

async function fetchGitHubFile(owner, repo, branch, filePath) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
  return httpsGet(url);
}

async function addSkillFromGitHub() {
  const source = positionalArg(1); // e.g. "owner/repo" or "owner/repo/skills/my-skill"

  if (!source) {
    console.log(error('Usage: ai-skills add <owner/repo> [--skill=name] [--ide=cursor]'));
    console.log(info('Example: ai-skills add anthropics/skills --skill=pdf-processing'));
    console.log(info('Example: ai-skills add anthropics/skills  (lists all skills)'));
    process.exit(1);
  }

  const parts = source.split('/');
  if (parts.length < 2) {
    console.log(error('Format: owner/repo (e.g. anthropics/skills)'));
    process.exit(1);
  }

  const owner = parts[0];
  const repo = parts[1];
  const branch = parseArg('branch') || 'main';
  const skillFilter = parseArg('skill');

  console.log(`\n${badge('AI Agent Skills')} ${c.dim}— Add from GitHub${c.reset}\n`);
  console.log(info(`Fetching from ${c.cyan}${owner}/${repo}${c.reset} (${branch})...`));

  try {
    const tree = await fetchGitHubTree(owner, repo, branch);

    // Find all SKILL.md files
    const skillFiles = tree
      .filter((item) => item.path.endsWith('/SKILL.md') && item.type === 'blob')
      .map((item) => {
        const dir = path.dirname(item.path);
        const name = path.basename(dir);
        return { name, dir, skillMdPath: item.path };
      });

    if (!skillFiles.length) {
      console.log(error('No SKILL.md files found in this repository.'));
      process.exit(1);
    }

    console.log(success(`Found ${c.bold}${skillFiles.length}${c.reset} skills in repo\n`));

    // If --skill specified, filter
    let selectedSkills = skillFiles;
    if (skillFilter) {
      selectedSkills = skillFiles.filter((s) => s.name === skillFilter);
      if (!selectedSkills.length) {
        console.log(error(`Skill "${skillFilter}" not found. Available:`));
        skillFiles.forEach((s) => console.log(`  ${c.cyan}→${c.reset} ${s.name} ${c.dim}(${s.dir})${c.reset}`));
        process.exit(1);
      }
    } else {
      // Interactive selection
      const rl = createRL();

      console.log(`${c.bold}Available skills:${c.reset}\n`);
      skillFiles.forEach((s, i) => {
        console.log(`  ${c.cyan}${i + 1}${c.reset}) ${c.bold}${s.name}${c.reset} ${c.dim}(${s.dir})${c.reset}`);
      });
      console.log(`  ${c.cyan}${skillFiles.length + 1}${c.reset}) ${c.bold}All skills${c.reset} ${c.dim}(install everything)${c.reset}`);
      console.log('');

      const answer = await ask(rl, `  ${c.dim}Choose (1-${skillFiles.length + 1}):${c.reset} `);
      const num = parseInt(answer.trim(), 10);

      if (num === skillFiles.length + 1) {
        // Install all
      } else if (num >= 1 && num <= skillFiles.length) {
        selectedSkills = [skillFiles[num - 1]];
      } else {
        console.log(error('Invalid choice'));
        rl.close();
        process.exit(1);
      }

      // Choose target IDE
      const ideFlag = parseIDEFlag();
      let targetIDE;

      if (ideFlag) {
        targetIDE = normalizeIDEName(ideFlag);
      } else {
        const ideOptions = [
          { label: 'Cursor', value: 'cursor', description: '.cursor/skills', recommended: true },
          { label: 'Kiro', value: 'kiro', description: '.kiro/skills' },
          { label: 'Antigravity', value: 'antigravity', description: '.agent/workflows' },
          { label: 'Codex', value: 'codex', description: '.agents/skills (+ AGENTS.md / memories)' },
          { label: 'VS Code', value: 'vscode', description: '.github/skills' },
          { label: 'GitHub Copilot', value: 'copilot', description: '.github/skills' },
        ];
        const ideChoice = await selectMenu(rl, '🔧 Install to:', ideOptions);
        targetIDE = ideChoice.value;
      }

      // Choose scope
      let scope = 'project';
      if (!hasFlag('--global')) {
        const scopeOptions = [
          { label: 'This project', value: 'project', recommended: true },
          { label: 'Global (~/.agents/skills)', value: 'global' },
        ];
        const scopeChoice = await selectMenu(rl, '📂 Scope:', scopeOptions);
        scope = scopeChoice.value;
      }

      rl.close();

      // Download and install
      console.log(`\n${step(1, 'Downloading skills...')}`);

      const targetBase = scope === 'global' ? os.homedir() : process.cwd();
      let targetDir;
      if (targetIDE === 'agents') {
        targetDir = path.join(targetBase, '.agents', 'skills');
      } else {
        const ideDef = getIDEDefinition(targetIDE);
        if (ideDef) {
          const target = ideDef.targets.find((t) => t.format === 'skill') || ideDef.targets[0];
          targetDir = scope === 'global'
            ? path.join(ideDef.globalRoot, target.relativeDir)
            : path.join(targetBase, ideDef.projectRoot, target.relativeDir);
        } else {
          targetDir = path.join(targetBase, '.agents', 'skills');
        }
      }

      let installed = 0;
      for (const skill of selectedSkills) {
        process.stdout.write(`  ${c.cyan}↓${c.reset} ${skill.name}...`);

        // Fetch SKILL.md
        const content = await fetchGitHubFile(owner, repo, branch, skill.skillMdPath);
        const skillDir = path.join(targetDir, skill.name);
        fs.mkdirSync(skillDir, { recursive: true });
        fs.writeFileSync(path.join(skillDir, 'SKILL.md'), content, 'utf8');

        // Fetch companion dirs (scripts/, references/, assets/)
        const companionDirs = ['scripts', 'references', 'assets'];
        for (const companion of companionDirs) {
          const prefix = `${skill.dir}/${companion}/`;
          const companionFiles = tree.filter((item) => item.path.startsWith(prefix) && item.type === 'blob');
          for (const file of companionFiles) {
            const relativePath = file.path.slice(skill.dir.length + 1);
            const destPath = path.join(skillDir, relativePath);
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            const fileContent = await fetchGitHubFile(owner, repo, branch, file.path);
            fs.writeFileSync(destPath, fileContent, 'utf8');
          }
        }

        installed++;
        console.log(` ${c.green}✔${c.reset}`);
      }

      console.log(`\n${success(`Installed ${c.bold}${installed}${c.reset} skill(s) to ${c.cyan}${path.relative(process.cwd(), targetDir) || targetDir}${c.reset}`)}`);
      console.log(`\n${c.bold}${c.green}Done!${c.reset} Skills are ready to use.\n`);
      return;
    }
  } catch (err) {
    console.log(error(`Failed: ${err.message}`));
    process.exit(1);
  }
}

function printResolution(context) {
  const ideDefinition = getIDEDefinition(context.ide);

  if (context.source === 'flag') {
    console.log(info(`Using IDE: ${c.bold}${ideDefinition.displayName}${c.reset} (from --ide flag)`));
    if (context.matchedPath) {
      console.log(info(`Workspace: ${c.dim}${context.baseDir}${c.reset} (found ${context.matchedPath})\n`));
    } else {
      console.log(info(`Workspace: ${c.dim}${context.baseDir}${c.reset}\n`));
    }
    return;
  }

  if (context.source === 'project') {
    console.log(info(`Auto-detected ${c.bold}${ideDefinition.displayName}${c.reset} from ${c.dim}${context.matchedPath}${c.reset}\n`));
    return;
  }

  if (context.source === 'global') {
    console.log(info(`Auto-detected ${c.bold}${ideDefinition.displayName}${c.reset} from global config ${c.dim}${context.matchedPath}${c.reset}\n`));
    return;
  }

  console.log(warn('No IDE marker found. Falling back to generic SKILL.md layout.'));
  console.log(info(`Tip: use ${c.cyan}--ide=cursor${c.reset}, ${c.cyan}--ide=kiro${c.reset}, ${c.cyan}--ide=antigravity${c.reset}, ${c.cyan}--ide=codex${c.reset}, ${c.cyan}--ide=vscode${c.reset}, or ${c.cyan}--ide=copilot${c.reset}\n`));
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

  for (const warning of uniqueWarnings) {
    console.log(warn(warning.message));
  }
  console.log('');
}

function printInstallResult(result, previousVersion, scope) {
  const action = previousVersion ? 'Updated' : 'Installed';

  console.log(success(`${action} ${c.bold}${result.skillCount}${c.reset} skills for ${c.bold}${result.displayName}${c.reset}`));
  if (previousVersion) {
    console.log(info(`Version: ${c.yellow}${previousVersion}${c.reset} → ${c.green}${CURRENT_VERSION}${c.reset}`));
  }

  console.log(`\n${c.bold}Targets:${c.reset}`);
  for (const target of result.targets) {
    const relativePath = path.relative(process.cwd(), target.targetDir) || '.';
    const tag = target.compatibility ? ` ${c.dim}(compat)${c.reset}` : '';
    console.log(`  ${c.green}→${c.reset} ${relativePath}${tag}`);
  }
  console.log('');
  printWarnings(result.warnings);

  console.log(`${c.bold}${c.green}Done!${c.reset} Next steps:\n`);
  console.log(`  1. ${c.dim}Reopen${c.reset} ${c.bold}${result.displayName}${c.reset}`);
  console.log(`  2. ${c.dim}Open agent chat and type${c.reset} ${c.cyan}/${c.reset} ${c.dim}to list skills${c.reset}`);
  console.log(`  3. ${c.dim}Try:${c.reset} ${c.cyan}/create${c.reset}, ${c.cyan}/debug${c.reset}, ${c.cyan}/explain${c.reset}, or ${c.cyan}/plan${c.reset}`);
  console.log('');
}

function install(scope) {
  try {
    console.log(`\n${badge('AI Agent Skills')} v${CURRENT_VERSION}\n`);

    const ideFlag = parseIDEFlag();
    if (!ideFlag) {
      console.log(error('Non-interactive install requires --ide=<name|all>.'));
      console.log(info('Supported: cursor, kiro, antigravity, codex, vscode, copilot, all\n'));
      process.exit(1);
    }

    const ideFlagNormalized = String(ideFlag).trim().toLowerCase();
    const installTargets =
      ideFlagNormalized === 'all'
        ? ['cursor', 'kiro', 'antigravity', 'codex', 'vscode', 'copilot']
        : null;

    if (!installTargets && !normalizeIDEName(ideFlag)) {
      console.log(error(`Unknown IDE: ${ideFlag}`));
      console.log(info(`Supported: cursor, kiro, antigravity, codex, vscode, copilot, all\n`));
      process.exit(1);
    }

    if (installTargets) {
      console.log(info(`Using IDE target: ${c.bold}All supported IDEs${c.reset} (from --ide flag)\n`));
      const baseDir = process.cwd();

      for (const targetIDE of installTargets) {
        const ideDefinition = getIDEDefinition(targetIDE);
        const rootDir =
          scope === 'global'
            ? ideDefinition.globalRoot
            : path.join(baseDir, ideDefinition.projectRoot);
        const installedVersion = getInstalledVersion(rootDir);

        console.log(step(1, `${installedVersion ? 'Updating' : 'Installing'} skills for ${c.bold}${ideDefinition.displayName}${c.reset}...\n`));

        const result = installBundle({
          baseDir,
          ide: targetIDE,
          scope,
          version: CURRENT_VERSION,
          includeCompatibilityAliases: true,
        });

        printInstallResult(result, installedVersion, scope);
      }

      return;
    }

    const context = resolveInstallContext();
    const ideDefinition = getIDEDefinition(context.ide);
    const baseDir = scope === 'global' ? process.cwd() : context.baseDir;
    const rootDir =
      scope === 'global'
        ? ideDefinition.globalRoot
        : path.join(baseDir, ideDefinition.projectRoot);
    const installedVersion = getInstalledVersion(rootDir);

    printResolution(context);

    console.log(step(1, `${installedVersion ? 'Updating' : 'Installing'} skills for ${c.bold}${ideDefinition.displayName}${c.reset}...\n`));

    const result = installBundle({
      baseDir,
      ide: context.ide,
      scope,
      version: CURRENT_VERSION,
      includeCompatibilityAliases: true,
    });

    printInstallResult(result, installedVersion, scope);
  } catch (err) {
    console.log(error(`Install failed: ${err.message}`));
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

    const ideDefinition = getIDEDefinition(context.ide);
    console.log(`\n${badge('AI Agent Skills')} ${c.dim}— Skill Catalog${c.reset}\n`);
    console.log(info(`IDE: ${c.bold}${ideDefinition.displayName}${c.reset}`));
    if (context.matchedPath) {
      console.log(info(`Detected from: ${c.dim}${context.matchedPath}${c.reset}`));
    }
    console.log('');

    console.log(`${c.bold}Available skills (${catalogResult.skills.length}):${c.reset}\n`);
    for (const skill of catalogResult.skills) {
      const compat = formatCompatibilitySummary(skill, context.ide);
      console.log(`  ${c.cyan}/${skill.slug}${c.reset} ${c.dim}—${c.reset} ${skill.description}`);
      console.log(`    ${c.dim}source: ${skill.sourceRoot} | ${compat}${c.reset}`);
    }
    console.log('');
    printWarnings(catalogResult.diagnostics);
  } catch (err) {
    console.log(error(`List failed: ${err.message}`));
    process.exit(1);
  }
}

function statusReport() {
  try {
    const context = resolveInstallContext();
    const ideDefinition = getIDEDefinition(context.ide);
    const rootDir = path.join(context.baseDir, ideDefinition.projectRoot);
    const installedVersion = getInstalledVersion(rootDir);
    const catalogResult = getSkillCatalog({ includeDiagnostics: true });

    console.log(`\n${badge('AI Agent Skills')} ${c.dim}— Status${c.reset}\n`);

    const rows = [
      ['Package', PACKAGE_NAME],
      ['Bundle version', CURRENT_VERSION],
      ['Installed version', installedVersion || `${c.yellow}not installed${c.reset}`],
      ['IDE', ideDefinition.displayName],
      ['Workspace', context.baseDir],
      ['Skills', `${catalogResult.skills.length}`],
    ];

    const agentSkill = catalogResult.skills.find((s) => s.slug === 'agents');
    if (agentSkill && agentSkill.agents) {
      rows.push(['Agent routing', `${c.green}enabled${c.reset}`]);
    }

    const needsUpdate = installedVersion && installedVersion !== CURRENT_VERSION;
    rows.push(['Update needed', needsUpdate ? `${c.yellow}yes${c.reset}` : `${c.green}no${c.reset}`]);

    for (const [label, value] of rows) {
      console.log(`  ${c.dim}${label}:${c.reset} ${value}`);
    }

    if (catalogResult.diagnostics.length) {
      console.log('');
      printWarnings(catalogResult.diagnostics);
    }

    console.log('');
  } catch (err) {
    console.log(error(`Status failed: ${err.message}`));
    process.exit(1);
  }
}

function showHelp() {
  const skillNames = listSkillNames().map((name) => `${c.cyan}/${name}${c.reset}`).join(', ');

  console.log(`
${badge('AI Agent Skills')} v${CURRENT_VERSION}

${c.bold}Usage:${c.reset}

  ${c.green}npx ${PACKAGE_NAME} init${c.reset}              ${c.dim}Interactive setup (choose IDE + scope)${c.reset}
  ${c.green}npx ${PACKAGE_NAME} init --ide=cursor${c.reset}  ${c.dim}Non-interactive install for specific IDE${c.reset}
  ${c.green}npx ${PACKAGE_NAME} init --ide=all${c.reset}     ${c.dim}Non-interactive install for all supported IDEs${c.reset}
  ${c.green}npx ${PACKAGE_NAME} init --ide=codex${c.reset}   ${c.dim}Install skills for Codex-style workspace${c.reset}
  ${c.green}npx ${PACKAGE_NAME} init --ide=vscode${c.reset}  ${c.dim}Install skills to VS Code/Copilot layout${c.reset}
  ${c.green}npx ${PACKAGE_NAME} global${c.reset}            ${c.dim}Install globally for all projects${c.reset}
  ${c.green}npx ${PACKAGE_NAME} add owner/repo${c.reset}    ${c.dim}Add skills from a GitHub repository${c.reset}
  ${c.green}npx ${PACKAGE_NAME} list${c.reset}              ${c.dim}List all bundled skills${c.reset}
  ${c.green}npx ${PACKAGE_NAME} list --json${c.reset}       ${c.dim}JSON output for scripts${c.reset}
  ${c.green}npx ${PACKAGE_NAME} status${c.reset}            ${c.dim}Show install status & versions${c.reset}
  ${c.green}npx ${PACKAGE_NAME} help${c.reset}              ${c.dim}Show this help${c.reset}

${c.bold}GitHub Add Examples:${c.reset}

  ${c.green}npx ${PACKAGE_NAME} add anthropics/skills${c.reset}
  ${c.green}npx ${PACKAGE_NAME} add anthropics/skills --skill=pdf-processing${c.reset}
  ${c.green}npx ${PACKAGE_NAME} add anthropics/skills --ide=cursor --branch=main${c.reset}

${c.bold}Supported IDEs:${c.reset}

  ${c.cyan}cursor${c.reset}       ${c.dim}→ .cursor/skills + .cursor/rules${c.reset}
  ${c.cyan}kiro${c.reset}         ${c.dim}→ .kiro/skills${c.reset}
  ${c.cyan}antigravity${c.reset}  ${c.dim}→ .agent/workflows${c.reset}
  ${c.cyan}codex${c.reset}        ${c.dim}→ .agents/skills (detected via AGENTS.md / memories)${c.reset}
  ${c.cyan}vscode${c.reset}       ${c.dim}→ .github/skills${c.reset}
  ${c.cyan}copilot${c.reset}      ${c.dim}→ .github/skills${c.reset}
  ${c.cyan}all${c.reset}          ${c.dim}→ install to all IDE targets above${c.reset}

${c.bold}Available skills:${c.reset}
  ${skillNames}

${c.dim}Documentation: https://github.com/votruongdanh/ai-agent-skills${c.reset}
`);
}

// ─── Main ───────────────────────────────────────────────────────────────────
const command = process.argv[2];

switch (command) {
  case 'init':
    if (hasFlag('--no-interactive')) {
      // Non-interactive: --ide flag or explicit opt-out
      checkForUpdates(() => install('project'));
    } else {
      // Interactive mode by default
      checkForUpdates(() => interactiveInit().catch((err) => {
        console.log(error(err.message));
        process.exit(1);
      }));
    }
    break;
  case 'global':
    checkForUpdates(() => install('global'));
    break;
  case 'add':
    checkForUpdates(() => addSkillFromGitHub().catch((err) => {
      console.log(error(err.message));
      process.exit(1);
    }));
    break;
  case 'list':
    listSkills();
    break;
  case 'status':
    statusReport();
    break;
  case 'update':
    if (hasFlag('--no-interactive')) {
      checkForUpdates(() => install('project'));
    } else {
      checkForUpdates(() => interactiveInit().catch((err) => {
        console.log(error(err.message));
        process.exit(1);
      }));
    }
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (!command) {
      // No command = show interactive init
      checkForUpdates(() => interactiveInit().catch((err) => {
        console.log(error(err.message));
        process.exit(1);
      }));
    } else {
      console.log(error(`Unknown command: ${command}`));
      console.log(info(`Run ${c.cyan}npx ${PACKAGE_NAME} help${c.reset} for usage.\n`));
      showHelp();
      process.exit(1);
    }
}
