#!/usr/bin/env node

/**
 * Verification script to check package structure before publishing
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying package structure...\n');

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
    test: () => {
      const content = fs.readFileSync('bin/cli.js', 'utf8');
      return content.startsWith('#!/usr/bin/env node');
    }
  },
  {
    name: '.kiro/skills directory exists',
    test: () => fs.existsSync('.kiro/skills')
  },
  {
    name: 'All 11 skills present',
    test: () => {
      const skills = [
        'brainstorm', 'create', 'debug', 'deploy', 'enhance',
        'orchestrate', 'plan', 'preview', 'status', 'test', 'ui-ux-pro-max'
      ];
      return skills.every(skill => 
        fs.existsSync(path.join('.kiro', 'skills', skill, 'SKILL.md'))
      );
    }
  },
  {
    name: 'package.json has correct bin field',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.bin && (pkg.bin['kiro-skills'] === 'bin/cli.js' || pkg.bin['ai-skills'] === 'bin/cli.js');
    }
  },
  {
    name: 'package.json has correct files field',
    test: () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.files && pkg.files.includes('.kiro');
    }
  },
  {
    name: '.gitignore exists',
    test: () => fs.existsSync('.gitignore')
  },
  {
    name: '.npmignore exists',
    test: () => fs.existsSync('.npmignore')
  }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
  try {
    if (check.test()) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${check.name} - Error: ${error.message}`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All checks passed! Package is ready to publish.\n');
  console.log('Next steps:');
  console.log('1. git init && git add . && git commit -m "Initial release"');
  console.log('2. Create GitHub repository');
  console.log('3. git remote add origin <your-repo-url>');
  console.log('4. git push -u origin main');
  console.log('5. npm login');
  console.log('6. npm publish --access public\n');
  process.exit(0);
} else {
  console.log('⚠️  Some checks failed. Please fix the issues before publishing.\n');
  process.exit(1);
}
