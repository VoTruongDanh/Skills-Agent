const fs = require('fs');
const os = require('os');
const path = require('path');

const CANONICAL_SKILLS_DIR = path.join(__dirname, '..', '.kiro', 'skills');

const IDE_ALIASES = {
  antigravity: 'antigravity',
  antigrafity: 'antigravity',
  kiro: 'kiro',
  cursor: 'cursor',
  vscode: 'vscode',
  'vs-code': 'vscode',
  'vs_code': 'vscode',
  code: 'vscode',
  copilot: 'copilot',
  'github-copilot': 'copilot',
  generic: 'generic',
};

const IDE_DEFINITIONS = {
  antigravity: {
    displayName: 'Antigravity',
    projectRoot: '.agent',
    globalRoot: path.join(os.homedir(), '.agent'),
    detectProjectPaths: ['.agent', '.agent/workflows', 'agent', 'agent/workflows'],
    detectGlobalPaths: ['.agent'],
    targets: [{ relativeDir: 'workflows', format: 'workflow' }],
    compatibilityProjectRoots: ['agent'],
  },
  kiro: {
    displayName: 'Kiro',
    projectRoot: '.kiro',
    globalRoot: path.join(os.homedir(), '.kiro'),
    detectProjectPaths: ['.kiro', '.kiro/skills'],
    detectGlobalPaths: ['.kiro'],
    targets: [{ relativeDir: 'skills', format: 'skill' }],
  },
  cursor: {
    displayName: 'Cursor',
    projectRoot: '.cursor',
    globalRoot: path.join(os.homedir(), '.cursor'),
    detectProjectPaths: [
      '.cursor',
      '.cursor/skills',
      '.cursor/rules',
      '.cursorignore',
      '.cursorindexingignore',
    ],
    detectGlobalPaths: ['.cursor'],
    targets: [
      { relativeDir: 'skills', format: 'skill' },
      { relativeDir: 'rules', format: 'cursor-rule' },
    ],
  },
  vscode: {
    displayName: 'VS Code',
    projectRoot: '.github',
    globalRoot: path.join(os.homedir(), '.copilot'),
    detectProjectPaths: [
      '.github/skills',
      '.github/copilot-instructions.md',
      '.github/prompts',
      '.vscode',
      '*.code-workspace',
    ],
    detectGlobalPaths: ['.copilot/skills'],
    targets: [{ relativeDir: 'skills', format: 'skill' }],
  },
  copilot: {
    displayName: 'GitHub Copilot',
    projectRoot: '.github',
    globalRoot: path.join(os.homedir(), '.copilot'),
    detectProjectPaths: ['.github/skills', '.github/copilot-instructions.md', '.github/prompts'],
    detectGlobalPaths: ['.copilot/skills'],
    targets: [{ relativeDir: 'skills', format: 'skill' }],
  },
  generic: {
    displayName: 'Generic SKILL.md',
    projectRoot: '.kiro',
    globalRoot: path.join(os.homedir(), '.kiro'),
    detectProjectPaths: [],
    detectGlobalPaths: [],
    targets: [{ relativeDir: 'skills', format: 'skill' }],
  },
};

function normalizeIDEName(value) {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase();
  return IDE_ALIASES[normalized] || null;
}

function getIDEDefinition(ide) {
  const normalized = normalizeIDEName(ide);

  if (!normalized || !IDE_DEFINITIONS[normalized]) {
    return null;
  }

  return { name: normalized, ...IDE_DEFINITIONS[normalized] };
}

function ensureDirectory(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function copyDirectory(src, dest) {
  ensureDirectory(dest);

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
  }
}

function listSkillNames() {
  if (!fs.existsSync(CANONICAL_SKILLS_DIR)) {
    throw new Error(`Skill source directory not found: ${CANONICAL_SKILLS_DIR}`);
  }

  return fs
    .readdirSync(CANONICAL_SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    throw new Error('Missing YAML frontmatter');
  }

  const frontmatter = {};
  const lines = match[1].split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      throw new Error(`Invalid frontmatter line: ${line}`);
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    frontmatter[key] = stripQuotes(rawValue);
  }

  const body = text.slice(match[0].length).trim();

  return { frontmatter, body };
}

function readSkill(skillName) {
  const skillDir = path.join(CANONICAL_SKILLS_DIR, skillName);
  const skillFile = path.join(skillDir, 'SKILL.md');

  if (!fs.existsSync(skillFile)) {
    throw new Error(`Missing skill file: ${skillFile}`);
  }

  const original = fs.readFileSync(skillFile, 'utf8');
  const parsed = parseFrontmatter(original);

  return {
    skillDir,
    skillFile,
    name: parsed.frontmatter.name || skillName,
    description: parsed.frontmatter.description || skillName,
    body: parsed.body,
    original,
  };
}

function toYamlString(value) {
  return JSON.stringify(value || '');
}

function renderSkillFile(skill, format) {
  if (format === 'skill') {
    return skill.original.trimEnd() + '\n';
  }

  if (format === 'cursor-rule') {
    return [
      '---',
      `description: ${toYamlString(skill.description)}`,
      'globs: ""',
      'alwaysApply: false',
      '---',
      '',
      skill.body,
      '',
    ].join('\n');
  }

  if (format === 'workflow') {
    return [
      '---',
      `description: ${toYamlString(skill.description)}`,
      '---',
      '',
      skill.body,
      '',
    ].join('\n');
  }

  throw new Error(`Unsupported skill format: ${format}`);
}

function writeSkillTarget(skillName, targetDir, format) {
  const skill = readSkill(skillName);
  ensureDirectory(targetDir);

  if (format === 'skill') {
    copyDirectory(skill.skillDir, path.join(targetDir, skillName));
    return path.join(targetDir, skillName, 'SKILL.md');
  }

  const fileName = format === 'cursor-rule' ? `${skillName}.mdc` : `${skillName}.md`;
  const outputPath = path.join(targetDir, fileName);
  fs.writeFileSync(outputPath, renderSkillFile(skill, format), 'utf8');
  return outputPath;
}

function buildTargetList(ideDefinition, scope, baseDir, includeCompatibilityAliases) {
  const rootDir =
    scope === 'global'
      ? ideDefinition.globalRoot
      : path.join(baseDir, ideDefinition.projectRoot);

  const targets = ideDefinition.targets.map((target) => ({
    rootDir,
    targetDir: path.join(rootDir, target.relativeDir),
    format: target.format,
  }));

  if (
    includeCompatibilityAliases &&
    scope === 'project' &&
    Array.isArray(ideDefinition.compatibilityProjectRoots)
  ) {
    for (const compatibilityRoot of ideDefinition.compatibilityProjectRoots) {
      const aliasRootDir = path.join(baseDir, compatibilityRoot);
      for (const target of ideDefinition.targets) {
        targets.push({
          rootDir: aliasRootDir,
          targetDir: path.join(aliasRootDir, target.relativeDir),
          format: target.format,
          compatibility: true,
        });
      }
    }
  }

  return { rootDir, targets };
}

function saveVersionInfo(rootDir, version) {
  fs.writeFileSync(path.join(rootDir, '.skills-version'), String(version), 'utf8');
}

function getInstalledVersion(rootDir) {
  const versionFile = path.join(rootDir, '.skills-version');
  if (!fs.existsSync(versionFile)) {
    return null;
  }

  return fs.readFileSync(versionFile, 'utf8').trim() || null;
}

function installBundle(options) {
  const {
    baseDir,
    ide,
    scope = 'project',
    version = null,
    includeCompatibilityAliases = true,
  } = options;

  const ideDefinition = getIDEDefinition(ide);
  if (!ideDefinition) {
    throw new Error(`Unsupported IDE: ${ide}`);
  }

  const { rootDir, targets } = buildTargetList(
    ideDefinition,
    scope,
    baseDir,
    includeCompatibilityAliases
  );

  ensureDirectory(rootDir);

  const outputFiles = [];
  const skillNames = listSkillNames();

  for (const skillName of skillNames) {
    for (const target of targets) {
      outputFiles.push(writeSkillTarget(skillName, target.targetDir, target.format));
    }
  }

  if (version) {
    saveVersionInfo(rootDir, version);
  }

  return {
    ide: ideDefinition.name,
    displayName: ideDefinition.displayName,
    rootDir,
    targets,
    outputFiles,
    skillCount: skillNames.length,
  };
}

function pathExists(baseDir, relativeOrAbsolutePath) {
  const fullPath = path.isAbsolute(relativeOrAbsolutePath)
    ? relativeOrAbsolutePath
    : path.join(baseDir, relativeOrAbsolutePath);

  return fs.existsSync(fullPath);
}

function directoryMatchesMarker(baseDir, marker) {
  if (marker === '*.code-workspace') {
    try {
      return fs
        .readdirSync(baseDir, { withFileTypes: true })
        .some((entry) => entry.isFile() && entry.name.endsWith('.code-workspace'));
    } catch (error) {
      return false;
    }
  }

  return pathExists(baseDir, marker);
}

function walkAncestorDirectories(startDir) {
  const directories = [];
  let currentDir = path.resolve(startDir);

  while (true) {
    directories.push(currentDir);
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
  }

  return directories;
}

function findProjectRootForIDE(startDir, ide) {
  const ideDefinition = getIDEDefinition(ide);
  if (!ideDefinition) {
    return null;
  }

  for (const currentDir of walkAncestorDirectories(startDir)) {
    for (const detectPath of ideDefinition.detectProjectPaths) {
      if (directoryMatchesMarker(currentDir, detectPath)) {
        return {
          ide: ideDefinition.name,
          source: 'project',
          projectDir: currentDir,
          matchedPath: detectPath,
        };
      }
    }
  }

  return null;
}

function findIDEContext(startDir) {
  const candidates = ['antigravity', 'kiro', 'cursor', 'copilot', 'vscode'];

  for (const currentDir of walkAncestorDirectories(startDir)) {
    for (const candidate of candidates) {
      const match = findProjectRootForIDE(currentDir, candidate);
      if (match && match.projectDir === currentDir) {
        return match;
      }
    }
  }

  const homeDir = os.homedir();
  for (const candidate of candidates) {
    const definition = getIDEDefinition(candidate);
    for (const detectPath of definition.detectGlobalPaths) {
      if (pathExists(homeDir, detectPath)) {
        return {
          ide: candidate,
          source: 'global',
          projectDir: path.resolve(startDir),
          matchedPath: `~/${detectPath.replace(/\\/g, '/')}`,
        };
      }
    }
  }

  return {
    ide: 'generic',
    source: 'fallback',
    projectDir: path.resolve(startDir),
    matchedPath: null,
  };
}

function detectIDE(baseDir) {
  return findIDEContext(baseDir).ide;
}

function getAvailableIDENames() {
  return Object.keys(IDE_DEFINITIONS);
}

module.exports = {
  CANONICAL_SKILLS_DIR,
  detectIDE,
  getAvailableIDENames,
  getIDEDefinition,
  getInstalledVersion,
  findIDEContext,
  findProjectRootForIDE,
  installBundle,
  listSkillNames,
  normalizeIDEName,
  parseFrontmatter,
};
