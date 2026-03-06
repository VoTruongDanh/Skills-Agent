#!/usr/bin/env node

/**
 * Verification script to check package structure before publishing.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  getIDEDefinition,
  installBundle,
  listSkillNames,
  parseFrontmatter,
} = require('./lib/skill-bundle');

console.log('Verifying package structure...\n');

const checks = [
  {
    name: 'package.json exists',
    test: () => fs.existsSync('package.json')
  },
  {
    name: 'README.md exists',
    test: () => fs.existsSync('README.md')
  },
  {
    name: 'LICENSE exists',
    test: () => fs.existsSync('LICENSE')
  },
  {
    name: 'bin/cli.js exists',
    test: () => fs.existsSync('bin/cli.js')
  },
  {
    name: 'bin/cli.js has shebang',
    test: () => fs.readFileSync('bin/cli.js', 'utf8').startsWith('#!/usr/bin/env node')
  },
  {
    name: 'bin/install-skills.ps1 exists',
    test: () => fs.existsSync('bin/install-skills.ps1')
  },
  {
    name: 'lib/skill-bundle.js exists',
    test: () => fs.existsSync('lib/skill-bundle.js')
  },
  {
    name: '.kiro/skills directory exists',
    test: () => fs.existsSync('.kiro/skills')
  },
  {
    name: 'All 12 skills present',
    test: () => {
      const expectedSkills = [
        'brainstorm', 'clean', 'create', 'debug', 'deploy', 'enhance',
        'orchestrate', 'plan', 'preview', 'status', 'test', 'ui-ux-pro-max'
      ];

      return expectedSkills.every((skill) =>
        fs.existsSync(path.join('.kiro', 'skills', skill, 'SKILL.md'))
      ) && listSkillNames().length === expectedSkills.length;
    }
  },
  {
    name: 'Every SKILL.md has name and description frontmatter',
    test: () => {
      return listSkillNames().every((skill) => {
        const content = fs.readFileSync(path.join('.kiro', 'skills', skill, 'SKILL.md'), 'utf8');
        const parsed = parseFrontmatter(content);
        return Boolean(parsed.frontmatter.name && parsed.frontmatter.description);
      });
    }
  },
  {
    name: 'package.json has correct bin field',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.bin && pkg.bin['ai-skills'] === 'bin/cli.js';
    }
  },
  {
    name: 'package.json has correct files field',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.files && pkg.files.includes('.kiro') && pkg.files.includes('lib') && pkg.files.includes('bin');
    }
  },
  {
    name: '.gitignore exists',
    test: () => fs.existsSync('.gitignore')
  },
  {
    name: '.npmignore exists',
    test: () => fs.existsSync('.npmignore')
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
            includeCompatibilityAliases: true
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
    }
  }
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
