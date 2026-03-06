/**
 * AI Agent Skills by Vo Truong Danh
 * Cross-IDE agent skills for Kiro, Cursor, Antigravity, and VS Code/Copilot.
 */

const { getSkillCatalog, listSkillNames } = require('./lib/skill-bundle');

module.exports = {
  name: '@votruongdanh/ai-agent-skills',
  version: require('./package.json').version,
  author: 'Vo Truong Danh (votruongdanh)',
  skills: listSkillNames(),
  catalog: getSkillCatalog().map((skill) => ({
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    sourceRoot: skill.sourceRoot,
    hasScripts: skill.hasScripts,
    hasReferences: skill.hasReferences,
    hasAssets: skill.hasAssets,
    compatibility: skill.compatibility,
  })),
};
