#!/usr/bin/env node

/**
 * Verification script to check package structure before publishing.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const {
  CANONICAL_SKILL_ROOTS,
  findIDEContext,
  getIDEDefinition,
  getSkillCatalog,
  installBundle,
  listSkillNames,
  parseFrontmatter,
  readSkill,
} = require('./lib/skill-bundle');

console.log('Verifying package structure...\n');

function writeSkill(rootDir, sourceRoot, skillName, frontmatter, body) {
  const sourceDir =
    sourceRoot === '.skills'
      ? path.join(rootDir, '.skills', skillName)
      : path.join(rootDir, '.kiro', 'skills', skillName);

  fs.mkdirSync(sourceDir, { recursive: true });
  fs.writeFileSync(
    path.join(sourceDir, 'SKILL.md'),
    ['---', frontmatter.trim(), '---', '', body.trim(), ''].join('\n'),
    'utf8'
  );

  return sourceDir;
}

function runCli(args) {
  return execFileSync(process.execPath, [path.join(__dirname, 'bin', 'cli.js'), ...args], {
    cwd: __dirname,
    encoding: 'utf8',
  });
}

const checks = [
  {
    name: 'package.json exists',
    test: () => fs.existsSync('package.json'),
  },
  {
    name: 'README.md exists',
    test: () => fs.existsSync('README.md'),
  },
  {
    name: 'LICENSE exists',
    test: () => fs.existsSync('LICENSE'),
  },
  {
    name: 'bin/cli.js exists',
    test: () => fs.existsSync('bin/cli.js'),
  },
  {
    name: 'bin/cli.js has shebang',
    test: () => fs.readFileSync('bin/cli.js', 'utf8').startsWith('#!/usr/bin/env node'),
  },
  {
    name: 'bin/install-skills.ps1 exists',
    test: () => fs.existsSync('bin/install-skills.ps1'),
  },
  {
    name: 'lib/skill-bundle.js exists',
    test: () => fs.existsSync('lib/skill-bundle.js'),
  },
  {
    name: 'At least one canonical skill root exists',
    test: () => CANONICAL_SKILL_ROOTS.some((root) => fs.existsSync(root)),
  },
  {
    name: 'All 14 bundled skills are discoverable',
    test: () => {
      const expectedSkills = [
        'agents',
        'brainstorm',
        'clean',
        'create',
        'debug',
        'deploy',
        'enhance',
        'explain',
        'orchestrate',
        'plan',
        'preview',
        'status',
        'test',
        'ui-ux-pro-max',
      ];

      return (
        expectedSkills.every((skill) => listSkillNames().includes(skill)) &&
        listSkillNames().length === expectedSkills.length
      );
    },
  },
  {
    name: 'Every bundled skill has name and description frontmatter',
    test: () => {
      return getSkillCatalog().every((skill) => Boolean(skill.name && skill.description));
    },
  },
  {
    name: 'package.json has correct bin field',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.bin && pkg.bin['ai-skills'] === 'bin/cli.js';
    },
  },
  {
    name: 'package.json files include portable and legacy roots',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return (
        pkg.files &&
        pkg.files.includes('.skills') &&
        pkg.files.includes('.agents') &&
        pkg.files.includes('.kiro') &&
        pkg.files.includes('lib') &&
        pkg.files.includes('bin')
      );
    },
  },
  {
    name: '.gitignore exists',
    test: () => fs.existsSync('.gitignore'),
  },
  {
    name: '.npmignore exists',
    test: () => fs.existsSync('.npmignore'),
  },
  {
    name: 'Dual-source discovery prefers .skills over .kiro/skills',
    test: () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-dual-source-'));

      try {
        writeSkill(
          tempRoot,
          '.kiro/skills',
          'demo',
          `
name: demo
description: Legacy copy
metadata:
  source: legacy
          `,
          'Legacy body'
        );
        writeSkill(
          tempRoot,
          '.skills',
          'demo',
          `
name: demo
description: Portable copy
metadata:
  source: portable
          `,
          'Portable body'
        );

        const result = getSkillCatalog({ bundleRoot: tempRoot, includeDiagnostics: true });
        return (
          result.skills.length === 1 &&
          result.skills[0].sourceRoot === '.skills' &&
          result.skills[0].metadata.source === 'portable' &&
          result.diagnostics.some((warning) => warning.code === 'duplicate-skill')
        );
      } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
      }
    },
  },
  {
    name: 'parseFrontmatter supports nested YAML metadata and quoted colons',
    test: () => {
      const parsed = parseFrontmatter(`---
name: parser-check
description: "Parse: nested metadata"
metadata:
  category: validation
  tags:
    - yaml
    - nested
allowed-tools:
  - read
  - write
---

Body`);

      return (
        parsed.frontmatter.description === 'Parse: nested metadata' &&
        parsed.frontmatter.metadata.category === 'validation' &&
        Array.isArray(parsed.frontmatter.metadata.tags) &&
        parsed.frontmatter['allowed-tools'][1] === 'write'
      );
    },
  },
  {
    name: 'readSkill preserves optional frontmatter fields and source metadata',
    test: () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-read-skill-'));

      try {
        writeSkill(
          tempRoot,
          '.skills',
          'catalog-demo',
          `
name: catalog-demo
description: Catalog demo
metadata:
  category: benchmark
allowed-tools:
  - read
compatibility:
  copilot: native
license: MIT
          `,
          'Catalog body'
        );

        const skill = readSkill('catalog-demo', { bundleRoot: tempRoot });
        return (
          skill.sourceRoot === '.skills' &&
          skill.metadata.category === 'benchmark' &&
          skill.allowedTools[0] === 'read' &&
          skill.frontmatter.compatibility.copilot === 'native' &&
          skill.frontmatter.license === 'MIT'
        );
      } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
      }
    },
  },
  {
    name: 'installBundle creates Kiro, Cursor, Antigravity, and VS Code targets',
    test: () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-verify-'));
      const targets = ['kiro', 'cursor', 'antigravity', 'vscode'];

      try {
        for (const ide of targets) {
          const projectRoot = path.join(tempRoot, ide);
          fs.mkdirSync(projectRoot, { recursive: true });

          const result = installBundle({
            baseDir: projectRoot,
            ide,
            scope: 'project',
            version: 'verify',
            includeCompatibilityAliases: true,
          });

          const definition = getIDEDefinition(ide);
          const versionFile = path.join(projectRoot, definition.projectRoot, '.skills-version');
          if (!fs.existsSync(versionFile)) {
            return false;
          }

          if (!result.targets.every((target) => fs.existsSync(target.targetDir))) {
            return false;
          }
        }

        return true;
      } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
      }
    },
  },
  {
    name: 'Generated targets warn when portable assets cannot be preserved',
    test: () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-assets-'));
      const installRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-assets-install-'));

      try {
        const skillDir = writeSkill(
          tempRoot,
          '.skills',
          'asset-demo',
          `
name: asset-demo
description: Asset demo
          `,
          'Asset body'
        );
        fs.mkdirSync(path.join(skillDir, 'scripts'), { recursive: true });
        fs.writeFileSync(path.join(skillDir, 'scripts', 'helper.sh'), 'echo helper\n', 'utf8');
        fs.mkdirSync(path.join(skillDir, 'references'), { recursive: true });
        fs.writeFileSync(path.join(skillDir, 'references', 'README.md'), '# Ref\n', 'utf8');

        const result = installBundle({
          baseDir: installRoot,
          bundleRoot: tempRoot,
          ide: 'cursor',
          scope: 'project',
          version: 'verify',
          includeCompatibilityAliases: false,
        });

        return (
          fs.existsSync(path.join(installRoot, '.cursor', 'skills', 'asset-demo', 'scripts', 'helper.sh')) &&
          result.warnings.some(
            (warning) =>
              warning.code === 'generated-target-assets' &&
              warning.skill === 'asset-demo' &&
              warning.format === 'cursor-rule'
          )
        );
      } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
        fs.rmSync(installRoot, { recursive: true, force: true });
      }
    },
  },
  {
    name: 'findIDEContext detects IDE markers from parent workspace folders',
    test: () => {
      const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ai-skills-detect-'));

      try {
        const workspaceRoot = path.join(tempRoot, 'workspace');
        const nestedDir = path.join(workspaceRoot, 'apps', 'web');
        fs.mkdirSync(path.join(workspaceRoot, '.cursor'), { recursive: true });
        fs.mkdirSync(nestedDir, { recursive: true });

        const result = findIDEContext(nestedDir);
        return (
          result.ide === 'cursor' &&
          result.source === 'project' &&
          result.projectDir === workspaceRoot &&
          result.matchedPath === '.cursor'
        );
      } finally {
        fs.rmSync(tempRoot, { recursive: true, force: true });
      }
    },
  },
  {
    name: 'CLI list renders text output with source roots and compatibility',
    test: () => {
      const output = runCli(['list', '--ide=cursor']);
      return (
        output.includes('Available skills:') &&
        output.includes('/plan') &&
        output.includes('source: .kiro/skills') &&
        output.includes('skill: native')
      );
    },
  },
  {
    name: 'CLI list --json returns parseable catalog output',
    test: () => {
      const output = runCli(['list', '--json']);
      const parsed = JSON.parse(output);
      return (
        parsed.package === '@votruongdanh/ai-agent-skills' &&
        Array.isArray(parsed.skills) &&
        parsed.skills.some((skill) => skill.slug === 'plan') &&
        Array.isArray(parsed.diagnostics)
      );
    },
  },
  {
    name: 'Agent routing skill has agents frontmatter',
    test: () => {
      const skill = readSkill('agents');
      return (
        skill.slug === 'agents' &&
        skill.description &&
        skill.body.includes('Agent Selection')
      );
    },
  },
  {
    name: 'Agent persona files exist',
    test: () => {
      const agentsDir = path.join('.kiro', 'skills', 'agents', 'agents');
      if (!fs.existsSync(agentsDir)) return false;
      const files = fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
      return files.length >= 10;
    },
  },
  {
    name: '_scripts supplementary directory exists',
    test: () => {
      const scriptsDir = path.join('.kiro', 'skills', '_scripts');
      return (
        fs.existsSync(scriptsDir) &&
        fs.existsSync(path.join(scriptsDir, 'checklist.md')) &&
        fs.existsSync(path.join(scriptsDir, 'verify-all.md')) &&
        fs.existsSync(path.join(scriptsDir, 'pre-deploy.md'))
      );
    },
  },
  {
    name: 'Skills with agents frontmatter have valid arrays',
    test: () => {
      const catalog = getSkillCatalog();
      const skillsWithAgents = catalog.filter((s) => s.agents);
      return (
        skillsWithAgents.length >= 1 &&
        skillsWithAgents.every((s) => Array.isArray(s.agents) && s.agents.length > 0)
      );
    },
  },
  {
    name: 'CLI status command runs without error',
    test: () => {
      const output = runCli(['status']);
      return output.includes('AI Agent Skills Status') && output.includes('Skills:');
    },
  },
  {
    name: 'AGENT_FLOW.md documentation exists',
    test: () => {
      return (
        fs.existsSync('docs/AGENT_FLOW.md') &&
        fs.readFileSync('docs/AGENT_FLOW.md', 'utf8').includes('Agent Flow')
      );
    },
  },
  {
    name: 'Entry-point instructions.md exists with routing table',
    test: () => {
      const file = path.join('.kiro', 'skills', 'instructions.md');
      if (!fs.existsSync(file)) return false;
      const content = fs.readFileSync(file, 'utf8');
      return (
        content.includes('.kiro/skills/debug/SKILL.md') &&
        content.includes('.kiro/skills/agents/agents/debugger.md') &&
        content.includes('vague') &&
        content.includes('_scripts/checklist.md')
      );
    },
  },
  {
    name: 'All skills reference agent files by real path',
    test: () => {
      const catalog = getSkillCatalog();
      const skillsWithRouting = catalog.filter((s) => s.slug !== 'agents' && s.body.includes('Agent Routing'));
      return skillsWithRouting.every((s) =>
        s.body.includes('.kiro/skills/agents/agents/') && !s.body.match(/→ apply @\w/)
      );
    },
  },
  {
    name: 'All skills reference related skills by real path',
    test: () => {
      const catalog = getSkillCatalog();
      const skillsWithRelated = catalog.filter((s) => s.body.includes('Related Skills'));
      return skillsWithRelated.every((s) => s.body.includes('.kiro/skills/') && s.body.includes('/SKILL.md'));
    },
  },
  {
    name: 'All skills have Quality Gate referencing _scripts',
    test: () => {
      const catalog = getSkillCatalog();
      const domainSkills = catalog.filter((s) => s.slug !== 'agents');
      return domainSkills.every((s) => s.body.includes('_scripts/'));
    },
  },
  {
    name: '.ai-memory-template.md exists in _scripts',
    test: () => {
      return fs.existsSync(path.join('.kiro', 'skills', '_scripts', '.ai-memory-template.md'));
    },
  },
  {
    name: 'All workflows reference their canonical SKILL.md',
    test: () => {
      const workflowDir = path.join('.agent', 'workflows');
      if (!fs.existsSync(workflowDir)) return false;
      const files = fs.readdirSync(workflowDir).filter((f) => f.endsWith('.md'));
      return files.every((f) => {
        const content = fs.readFileSync(path.join(workflowDir, f), 'utf8');
        return content.includes('Canonical source');
      });
    },
  },
  {
    name: 'Agent router has vague-request fallback table',
    test: () => {
      const skill = readSkill('agents');
      return (
        skill.body.includes('Vague / General Request Fallback') &&
        skill.body.includes('Help me') &&
        skill.body.includes('Review my code') &&
        skill.body.includes('Never skip routing for general requests')
      );
    },
  },
  {
    name: 'Explain skill exists with proper structure',
    test: () => {
      const skill = readSkill('explain');
      return (
        skill.slug === 'explain' &&
        skill.description.includes('explain') &&
        skill.body.includes('Socratic Gate') &&
        skill.body.includes('Agent Routing') &&
        skill.body.includes('.kiro/skills/agents/agents/')
      );
    },
  },
  {
    name: 'Instructions.md has greeting/empty input handling (step 0)',
    test: () => {
      const file = path.join('.kiro', 'skills', 'instructions.md');
      const content = fs.readFileSync(file, 'utf8');
      return (
        content.includes('Validate input') &&
        content.includes('greeting') &&
        content.includes('empty')
      );
    },
  },
  {
    name: 'Agent router has Vietnamese trigger keywords',
    test: () => {
      const skill = readSkill('agents');
      return (
        skill.body.includes('sửa') &&
        skill.body.includes('tạo trang') &&
        skill.body.includes('triển khai') &&
        skill.body.includes('giải thích')
      );
    },
  },
  {
    name: 'Agent router has compound-keyword routing rules',
    test: () => {
      const skill = readSkill('agents');
      return (
        skill.body.includes('Compound Keyword Rules') &&
        skill.body.includes('test + fail') &&
        skill.body.includes('review + code')
      );
    },
  },
  {
    name: 'Instructions.md routes explain and complaint requests',
    test: () => {
      const file = path.join('.kiro', 'skills', 'instructions.md');
      const content = fs.readFileSync(file, 'utf8');
      return (
        content.includes('/explain') &&
        content.includes('explain/SKILL.md') &&
        content.includes('Complaints about code')
      );
    },
  },
  {
    name: 'Explain workflow exists with canonical source',
    test: () => {
      const workflowFile = path.join('.agent', 'workflows', 'explain.md');
      if (!fs.existsSync(workflowFile)) return false;
      const content = fs.readFileSync(workflowFile, 'utf8');
      return content.includes('Canonical source') && content.includes('explain/SKILL.md');
    },
  },
  {
    name: 'CANONICAL_SKILL_ROOTS includes .agents/skills for cross-client interop',
    test: () => {
      return CANONICAL_SKILL_ROOTS.includes('.agents/skills');
    },
  },
  {
    name: 'Skill descriptions include Vietnamese trigger keywords',
    test: () => {
      const catalog = getSkillCatalog();
      const viKeywords = ['lỗi', 'tạo', 'triển khai', 'kế hoạch', 'giải thích', 'kiểm thử', 'giao diện'];
      const descs = catalog.map((s) => s.description).join(' ');
      return viKeywords.every((kw) => descs.includes(kw));
    },
  },
];

let passed = 0;
let failed = 0;

checks.forEach((check) => {
  try {
    if (check.test()) {
      console.log(`[PASS] ${check.name}`);
      passed++;
    } else {
      console.log(`[FAIL] ${check.name}`);
      failed++;
    }
  } catch (error) {
    console.log(`[FAIL] ${check.name} - Error: ${error.message}`);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('All checks passed.\n');
  process.exit(0);
}

console.log('Some checks failed. Fix them before publishing.\n');
process.exit(1);
