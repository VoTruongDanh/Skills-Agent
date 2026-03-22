const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('yaml');

const PACKAGE_ROOT = path.join(__dirname, '..');
const PORTABLE_SKILLS_DIR = path.join(PACKAGE_ROOT, '.skills');
const LEGACY_CANONICAL_SKILLS_DIR = path.join(PACKAGE_ROOT, '.kiro', 'skills');
const CANONICAL_SKILLS_DIR = LEGACY_CANONICAL_SKILLS_DIR;
const CANONICAL_SKILL_ROOTS = ['.skills', '.agents/skills', '.kiro/skills'];
const PORTABLE_ASSET_DIRS = ['scripts', 'references', 'assets', 'agents'];

const IDE_ALIASES = {
  antigravity: 'antigravity',
  antigrafity: 'antigravity',
  kiro: 'kiro',
  cursor: 'cursor',
  codex: 'codex',
  'openai-codex': 'codex',
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
    detectProjectPaths: ['.agent', '.agent/workflows', 'agent', 'agent/workflows', '.agents/skills'],
    detectGlobalPaths: ['.agent'],
    targets: [{ relativeDir: 'workflows', format: 'workflow' }],
    compatibilityProjectRoots: ['agent'],
  },
  kiro: {
    displayName: 'Kiro',
    projectRoot: '.kiro',
    globalRoot: path.join(os.homedir(), '.kiro'),
    detectProjectPaths: ['.kiro', '.kiro/skills', '.agents/skills'],
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
      '.agents/skills',
    ],
    detectGlobalPaths: ['.cursor'],
    targets: [
      { relativeDir: 'skills', format: 'skill' },
      { relativeDir: 'rules', format: 'cursor-rule' },
    ],
  },
  codex: {
    displayName: 'Codex',
    projectRoot: '.agents',
    globalRoot: path.join(os.homedir(), '.agents'),
    detectProjectPaths: [
      '.agents/skills',
      'AGENTS.md',
      'memories',
    ],
    detectGlobalPaths: ['.agents/skills', '.codex', '.codex/memories'],
    targets: [{ relativeDir: 'skills', format: 'skill' }],
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
      '.agents/skills',
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

function getCanonicalSkillRootDefinitions(options = {}) {
  const bundleRoot = path.resolve(options.bundleRoot || PACKAGE_ROOT);

  return [
    {
      sourceRoot: '.skills',
      sourceDir: path.join(bundleRoot, '.skills'),
      priority: 0,
    },
    {
      sourceRoot: '.agents/skills',
      sourceDir: path.join(bundleRoot, '.agents', 'skills'),
      priority: 1,
    },
    {
      sourceRoot: '.kiro/skills',
      sourceDir: path.join(bundleRoot, '.kiro', 'skills'),
      priority: 2,
    },
  ];
}

function listSkillDirectories(sourceDir) {
  return fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => entry.name)
    .sort();
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    throw new Error('Missing YAML frontmatter');
  }

  const frontmatter = yaml.parse(match[1]);
  if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) {
    throw new Error('YAML frontmatter must be a mapping');
  }

  const body = text.slice(match[0].length).trim();

  return { frontmatter, body };
}

function getPortableAssets(skillDir) {
  const assets = {};

  for (const assetDir of PORTABLE_ASSET_DIRS) {
    assets[assetDir] = fs.existsSync(path.join(skillDir, assetDir));
  }

  return {
    hasScripts: assets.scripts,
    hasReferences: assets.references,
    hasAssets: assets.assets,
    assetDirectories: PORTABLE_ASSET_DIRS.filter((assetDir) => assets[assetDir]),
  };
}

function buildCompatibility(assetDirectories) {
  const generatedWarnings = assetDirectories.map(
    (assetDir) => `${assetDir}/ is only preserved for native SKILL.md targets`
  );

  return {
    skill: {
      status: 'native',
      warnings: [],
    },
    'cursor-rule': {
      status: generatedWarnings.length ? 'generated-with-warnings' : 'generated',
      warnings: generatedWarnings,
    },
    workflow: {
      status: generatedWarnings.length ? 'generated-with-warnings' : 'generated',
      warnings: generatedWarnings,
    },
  };
}

function normalizeDescription(value, skillName) {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value == null) {
    return '';
  }

  return String(value).trim() || skillName;
}

function readSkillFromSource(rootDefinition, skillName) {
  const skillDir = path.join(rootDefinition.sourceDir, skillName);
  const skillFile = path.join(skillDir, 'SKILL.md');

  if (!fs.existsSync(skillFile)) {
    throw new Error(`Missing skill file: ${skillFile}`);
  }

  const original = fs.readFileSync(skillFile, 'utf8');
  const parsed = parseFrontmatter(original);
  const frontmatter = parsed.frontmatter;
  const resolvedName =
    typeof frontmatter.name === 'string' && frontmatter.name.trim()
      ? frontmatter.name.trim()
      : skillName;
  const description = normalizeDescription(frontmatter.description, skillName);

  if (!description) {
    throw new Error(`Skill "${skillName}" is missing a non-empty description`);
  }

  const portableAssets = getPortableAssets(skillDir);

  return {
    slug: skillName,
    name: resolvedName,
    description,
    body: parsed.body,
    original,
    frontmatter,
    metadata:
      frontmatter.metadata && typeof frontmatter.metadata === 'object' ? frontmatter.metadata : null,
    agents: Array.isArray(frontmatter.agents) ? frontmatter.agents : null,
    relatedSkills: Array.isArray(frontmatter['related-skills']) ? frontmatter['related-skills'] : null,
    allowedTools: frontmatter['allowed-tools'] || null,
    skillDir,
    skillFile,
    sourceRoot: rootDefinition.sourceRoot,
    hasScripts: portableAssets.hasScripts,
    hasReferences: portableAssets.hasReferences,
    hasAssets: portableAssets.hasAssets,
    assetDirectories: portableAssets.assetDirectories,
    compatibility: buildCompatibility(portableAssets.assetDirectories),
  };
}

function getSkillCatalog(options = {}) {
  const includeDiagnostics = Boolean(options.includeDiagnostics);
  const diagnostics = [];
  const catalog = new Map();
  const rootDefinitions = getCanonicalSkillRootDefinitions(options);
  const existingRoots = rootDefinitions.filter((rootDefinition) =>
    fs.existsSync(rootDefinition.sourceDir)
  );

  if (!existingRoots.length) {
    throw new Error(
      `Skill source directories not found: ${rootDefinitions
        .map((rootDefinition) => rootDefinition.sourceDir)
        .join(', ')}`
    );
  }

  for (const rootDefinition of existingRoots) {
    for (const skillName of listSkillDirectories(rootDefinition.sourceDir)) {
      const skill = readSkillFromSource(rootDefinition, skillName);

      if (catalog.has(skillName)) {
        const winner = catalog.get(skillName);
        diagnostics.push({
          severity: 'warning',
          code: 'duplicate-skill',
          skill: skillName,
          sourceRoot: rootDefinition.sourceRoot,
          message: `Skipping duplicate skill "${skillName}" from ${rootDefinition.sourceRoot}; ${winner.sourceRoot} takes precedence.`,
        });
        continue;
      }

      catalog.set(skillName, skill);

      if (skill.name !== skillName) {
        diagnostics.push({
          severity: 'warning',
          code: 'name-mismatch',
          skill: skillName,
          sourceRoot: rootDefinition.sourceRoot,
          message: `Skill directory "${skillName}" does not match frontmatter name "${skill.name}".`,
        });
      }

      if (skill.assetDirectories.length) {
        diagnostics.push({
          severity: 'warning',
          code: 'generated-target-assets',
          skill: skillName,
          sourceRoot: rootDefinition.sourceRoot,
          message: `Skill "${skillName}" includes ${skill.assetDirectories
            .map((assetDir) => `${assetDir}/`)
            .join(', ')}; generated workflow and rule targets only keep SKILL.md content.`,
        });
      }
    }
  }

  const skills = Array.from(catalog.values()).sort((left, right) => left.slug.localeCompare(right.slug));

  if (includeDiagnostics) {
    return { skills, diagnostics };
  }

  return skills;
}

function listSkillNames(options = {}) {
  return getSkillCatalog(options).map((skill) => skill.slug);
}

function readSkill(skillName, options = {}) {
  const skill = getSkillCatalog(options).find((entry) => entry.slug === skillName);

  if (!skill) {
    throw new Error(`Unknown skill: ${skillName}`);
  }

  return skill;
}

function toYamlString(value) {
  return JSON.stringify(value || '');
}

function renderSkillFile(skill, format) {
  if (format === 'skill') {
    return skill.original.trimEnd() + '\n';
  }

  if (format === 'cursor-rule') {
    const isAutoLoad = skill.slug === 'agents' || Boolean(skill.metadata && skill.metadata['auto-load']);
    const lines = [
      '---',
      `description: ${toYamlString(skill.description)}`,
    ];
    if (skill.agents && skill.agents.length) {
      lines.push(`agents: [${skill.agents.join(', ')}]`);
    }
    lines.push('globs: ""', `alwaysApply: ${isAutoLoad}`, '---', '', skill.body, '');
    return lines.join('\n');
  }

  if (format === 'workflow') {
    const lines = [
      '---',
      `description: ${toYamlString(skill.description)}`,
    ];
    if (skill.agents && skill.agents.length) {
      lines.push(`agents: [${skill.agents.join(', ')}]`);
    }
    lines.push('---', '', skill.body, '');
    return lines.join('\n');
  }

  throw new Error(`Unsupported skill format: ${format}`);
}

function buildGeneratedTargetWarnings(skill, format, targetDir) {
  if (format === 'skill' || !skill.assetDirectories.length) {
    return [];
  }

  return [
    {
      severity: 'warning',
      code: 'generated-target-assets',
      skill: skill.slug,
      format,
      targetDir,
      message: `Generated ${format} target for "${skill.slug}" omits ${skill.assetDirectories
        .map((assetDir) => `${assetDir}/`)
        .join(', ')}.`,
    },
  ];
}

function writeSkillTarget(skill, targetDir, format) {
  ensureDirectory(targetDir);

  if (format === 'skill') {
    copyDirectory(skill.skillDir, path.join(targetDir, skill.slug));
    return {
      outputPath: path.join(targetDir, skill.slug, 'SKILL.md'),
      warnings: [],
    };
  }

  const fileName = format === 'cursor-rule' ? `${skill.slug}.mdc` : `${skill.slug}.md`;
  const outputPath = path.join(targetDir, fileName);
  fs.writeFileSync(outputPath, renderSkillFile(skill, format), 'utf8');

  return {
    outputPath,
    warnings: buildGeneratedTargetWarnings(skill, format, targetDir),
  };
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
    bundleRoot,
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

  const catalogResult = getSkillCatalog({
    bundleRoot,
    includeDiagnostics: true,
  });

  ensureDirectory(rootDir);

  const outputFiles = [];
  const warnings = [...catalogResult.diagnostics];

  for (const skill of catalogResult.skills) {
    for (const target of targets) {
      const result = writeSkillTarget(skill, target.targetDir, target.format);
      outputFiles.push(result.outputPath);
      warnings.push(...result.warnings);
    }
  }

  // Copy _scripts supplementary directory to skill-format targets
  const existingRoots = getCanonicalSkillRootDefinitions({ bundleRoot }).filter((r) =>
    fs.existsSync(r.sourceDir)
  );
  for (const rootDef of existingRoots) {
    const scriptsDir = path.join(rootDef.sourceDir, '_scripts');
    if (fs.existsSync(scriptsDir)) {
      for (const target of targets) {
        if (target.format === 'skill') {
          copyDirectory(scriptsDir, path.join(target.targetDir, '_scripts'));
        }
      }
    }

    // Copy instructions.md as auto-load entry point
    const instructionsFile = path.join(rootDef.sourceDir, 'instructions.md');
    if (fs.existsSync(instructionsFile)) {
      for (const target of targets) {
        if (target.format === 'skill') {
          // Native: copy as-is
          fs.copyFileSync(instructionsFile, path.join(target.targetDir, 'instructions.md'));
        } else if (target.format === 'cursor-rule') {
          // Cursor: render as alwaysApply rule so routing is always active
          const body = fs.readFileSync(instructionsFile, 'utf8');
          const lines = [
            '---',
            'description: "AI Agent Skills — auto-routing system. Analyzes every request and routes to the correct specialist skill and agent."',
            'globs: ""',
            'alwaysApply: true',
            '---',
            '',
            body,
            '',
          ];
          ensureDirectory(target.targetDir);
          fs.writeFileSync(path.join(target.targetDir, 'instructions.mdc'), lines.join('\n'), 'utf8');
        } else if (target.format === 'workflow') {
          // Antigravity: copy as entry-point workflow
          const body = fs.readFileSync(instructionsFile, 'utf8');
          const lines = [
            '---',
            'description: "AI Agent Skills — auto-routing system. Analyzes every request and routes to the correct specialist skill and agent."',
            'autoRun: true',
            '---',
            '',
            body,
            '',
          ];
          ensureDirectory(target.targetDir);
          fs.writeFileSync(path.join(target.targetDir, '_instructions.md'), lines.join('\n'), 'utf8');
        }
      }
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
    warnings,
    diagnostics: catalogResult.diagnostics,
    catalog: catalogResult.skills,
    skillCount: catalogResult.skills.length,
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
  const candidates = ['antigravity', 'kiro', 'cursor', 'codex', 'copilot', 'vscode'];

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
  CANONICAL_SKILL_ROOTS,
  detectIDE,
  getAvailableIDENames,
  getIDEDefinition,
  getInstalledVersion,
  getSkillCatalog,
  findIDEContext,
  findProjectRootForIDE,
  installBundle,
  listSkillNames,
  normalizeIDEName,
  parseFrontmatter,
  readSkill,
};
