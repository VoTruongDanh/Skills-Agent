#!/usr/bin/env node

const path = require('path');

const { installBundle } = require('../lib/skill-bundle');
const pkg = require('../package.json');

const repoRoot = path.join(__dirname, '..');
const targets = ['cursor', 'antigravity', 'vscode'];
const generatedRoot = path.join(repoRoot, 'generated');

for (const ide of targets) {
  installBundle({
    baseDir: path.join(generatedRoot, ide),
    ide,
    scope: 'project',
    version: pkg.version,
    includeCompatibilityAliases: false,
  });
}

console.log('Rendered generated skill targets for Cursor, Antigravity, and VS Code/Copilot.');
