const { installBundle } = require('./lib/skill-bundle.js');
const targets = ['cursor', 'antigravity', 'kiro', 'vscode', 'codex', 'claude-code'];
const baseDir = __dirname;
const pkg = require('./package.json');

console.log('Syncing updated skills to all IDE targets...');
for (const ide of targets) {
  try {
    const result = installBundle({
      baseDir,
      ide,
      scope: 'project',
      version: pkg.version,
      includeCompatibilityAliases: true
    });
    console.log(`Successfully synced to ${result.ide} (${result.skillCount} skills)`);
  } catch (err) {
    console.error(`Failed for ${ide}:`, err.message);
  }
}
