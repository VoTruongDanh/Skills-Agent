# 🔄 How to Update Package

## Quick Update Workflow

When you make changes to the code:

```bash
# 1. Edit your code files

# 2. Test locally
node verify.js

# 3. Commit changes
git add .
git commit -m "Your change description"
git push

# 4. Release new version (choose one)
npm run release:patch   # Bug fixes: 1.0.0 → 1.0.1
npm run release:minor   # New features: 1.0.0 → 1.1.0
npm run release:major   # Breaking changes: 1.0.0 → 2.0.0
```

**Done!** The release command automatically:
- ✅ Updates version in package.json
- ✅ Creates git tag
- ✅ Pushes to GitHub
- ✅ Publishes to npm

## Version Types

| Command | When to Use | Example |
|---------|-------------|---------|
| `npm run release:patch` | Bug fixes, small changes | 1.0.0 → 1.0.1 |
| `npm run release:minor` | New features, backward compatible | 1.0.0 → 1.1.0 |
| `npm run release:major` | Breaking changes | 1.0.0 → 2.0.0 |

## How Users Get Updates

After you publish, users can update by running:

```bash
npx @votruongdanh/ai-agent-skills@latest init
```

If IDE auto-detect is unclear, users can force the target IDE:

```bash
npx @votruongdanh/ai-agent-skills@latest init --ide=cursor
npx @votruongdanh/ai-agent-skills@latest init --ide=antigravity
npx @votruongdanh/ai-agent-skills@latest init --ide=vscode
npx @votruongdanh/ai-agent-skills@latest init --ide=kiro
```

The CLI will automatically:
- Detect if they have an older version
- Show update notification
- Install the latest version

## Verify Published Version

```bash
# Check current published version
npm view @votruongdanh/ai-agent-skills version

# Test installation
cd /tmp/test-install
npx @votruongdanh/ai-agent-skills@latest init
```

## Important Notes

⚠️ **Users get updates from npm, not GitHub**
- Just pushing to GitHub is NOT enough
- You MUST run `npm run release:*` to publish to npm
- GitHub is for source code, npm is for distribution

✅ **Always test before releasing**
- Run `node verify.js` to check package structure
- Test locally if possible
- Check that all files are included

## Troubleshooting

**Problem: "npm publish" fails with 403**
- Solution: Check your npm token is valid
- Run: `npm config set //registry.npmjs.org/:_authToken "YOUR_TOKEN"`

**Problem: Users don't see updates**
- Check: Did you run `npm run release:*`?
- Verify: `npm view @votruongdanh/ai-agent-skills version`

**Problem: Git push fails**
- Solution: Make sure you have push access to the repo
- Check: Your git credentials are configured

## Manual Update (If Needed)

If you need more control:

```bash
# 1. Update version manually
npm version patch  # or minor, major

# 2. Push with tags
git push --follow-tags

# 3. Publish to npm
npm publish --access public
```
