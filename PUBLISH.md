# How to Publish

## Quick Steps

### 1. Update Your Info (Optional)

Edit `package.json`:
```json
{
  "author": {
    "email": "your-email@example.com"
  }
}
```

### 2. Verify Package

```bash
node verify.js
```

Should show all ✅

### 3. Publish to GitHub

```bash
git init
git add .
git commit -m "Initial release v1.0.0"

# Create repo at: https://github.com/new
# Name: ai-agent-skills

git remote add origin https://github.com/votruongdanh/ai-agent-skills.git
git branch -M main
git push -u origin main
```

### 4. Publish to npm

```bash
npm login
npm publish --access public
```

### 5. Done!

Users can now install with:
```bash
npx @votruongdanh/ai-agent-skills init
```

## Test Installation

```bash
cd /tmp
mkdir test
cd test
npx @votruongdanh/ai-agent-skills init
```

## Update Version

```bash
npm version patch  # 1.0.0 → 1.0.1
git push --tags
npm publish
```

## Troubleshooting

- **Package name exists**: Change name in package.json
- **npm login fails**: Create account at npmjs.com
- **Git push rejected**: Use Personal Access Token from github.com/settings/tokens
