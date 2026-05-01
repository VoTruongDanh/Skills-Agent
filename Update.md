# 🔄 How to Update Package

## Quick Update Workflow

Khi bạn thay đổi code:

```bash
# 1. Chỉnh sửa code

# 2. Test trước khi release
node verify.js

# 3. Commit changes
git add .
git commit -m "Mô tả thay đổi của bạn"

# 4. Release version mới (chọn một)
npm run release:patch   # Bug fixes: 1.0.0 → 1.0.1
npm run release:minor   # Tính năng mới: 1.0.0 → 1.1.0
npm run release:major   # Breaking changes: 1.0.0 → 2.0.0
```

**Xong!** Script release sẽ tự động:
- ✅ Cập nhật version trong package.json
- ✅ Tạo git tag
- ✅ Push code + tag lên GitHub
- ✅ **GitHub Actions tự động publish lên npm** (không cần làm gì thêm!)

## Cách hoạt động

### Quy trình tự động hóa:

1. **Bạn chạy**: `npm run release:minor`
2. **Script thực hiện**:
   - Tăng version trong package.json (3.2.0 → 3.3.0)
   - Tạo git tag (v3.3.0)
   - Push code + tag lên GitHub
3. **GitHub Actions tự động**:
   - Phát hiện tag mới (v3.3.0)
   - Chạy workflow `.github/workflows/publish.yml`
   - Cài đặt dependencies
   - Publish lên npm với NPM_TOKEN

### Theo dõi quá trình publish:

Sau khi push tag, vào GitHub repo:
- Tab **Actions** → Xem workflow "Publish Package to npmjs"
- Nếu thành công: ✅ màu xanh
- Nếu lỗi: ❌ màu đỏ (xem log để debug)

## Version Types

| Command | Khi nào dùng | Ví dụ |
|---------|-------------|--------|
| `npm run release:patch` | Sửa bug, thay đổi nhỏ | 1.0.0 → 1.0.1 |
| `npm run release:minor` | Tính năng mới, tương thích ngược | 1.0.0 → 1.1.0 |
| `npm run release:major` | Breaking changes | 1.0.0 → 2.0.0 |

## Cách người dùng cập nhật

Sau khi bạn publish, người dùng có thể cập nhật bằng:

```bash
npx @votruongdanh/ai-agent-skills@latest init
```

CLI sẽ tự động:
- Phát hiện phiên bản cũ
- Hiển thị thông báo cập nhật
- Cài đặt phiên bản mới nhất

### Các chế độ cài đặt:

**Interactive mode (mặc định):**
```bash
npx @votruongdanh/ai-agent-skills@latest init
```

**Non-interactive mode (CI/CD):**
```bash
npx @votruongdanh/ai-agent-skills@latest init --ide=cursor
npx @votruongdanh/ai-agent-skills@latest init --ide=kiro
npx @votruongdanh/ai-agent-skills@latest init --ide=antigravity
npx @votruongdanh/ai-agent-skills@latest init --ide=vscode
npx @votruongdanh/ai-agent-skills@latest init --ide=copilot
npx @votruongdanh/ai-agent-skills@latest init --ide=all
```

**Thêm skills từ GitHub:**
```bash
npx @votruongdanh/ai-agent-skills@latest add owner/repo
npx @votruongdanh/ai-agent-skills@latest add owner/repo --skill=skill-name
```

## Kiểm tra phiên bản đã publish

```bash
# Xem phiên bản hiện tại trên npm
npm view @votruongdanh/ai-agent-skills version

# Xem tất cả phiên bản
npm view @votruongdanh/ai-agent-skills versions

# Test cài đặt
cd /tmp/test-install
npx @votruongdanh/ai-agent-skills@latest init
```

## Setup GitHub Actions (Chỉ cần làm 1 lần)

### Bước 1: Lấy NPM Token

1. Truy cập [npmjs.com](https://www.npmjs.com/) → Login
2. Vào **Access Tokens** → **Generate New Token** → Chọn **Automation**
3. **Copy token** (chỉ hiện 1 lần duy nhất!)

### Bước 2: Thêm Token vào GitHub Secrets

1. Mở repo `Skills-Agent` trên GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Dán token vừa copy

### Bước 3: Workflow đã được tạo sẵn

File `.github/workflows/publish.yml` đã có sẵn trong repo. Nó sẽ tự động:
- Chạy khi phát hiện tag mới (v*)
- Cài đặt dependencies
- Publish lên npm với NPM_TOKEN

## Lưu ý quan trọng

⚠️ **Người dùng nhận update từ npm, không phải GitHub**
- Chỉ push lên GitHub là CHƯA ĐỦ
- Phải chạy `npm run release:*` để tạo tag
- GitHub Actions sẽ tự động publish lên npm

✅ **Luôn test trước khi release**
- Chạy `node verify.js` để kiểm tra cấu trúc package
- Test local nếu có thể
- Kiểm tra tất cả files đã được include

✅ **Kiểm tra GitHub Actions**
- Sau khi push tag, vào tab **Actions** trên GitHub
- Đảm bảo workflow chạy thành công (màu xanh ✅)
- Nếu lỗi (màu đỏ ❌), xem log để debug

## Troubleshooting

### Problem: GitHub Actions workflow không chạy
**Solution:**
- Kiểm tra file `.github/workflows/publish.yml` có tồn tại
- Đảm bảo đã push tag đúng format: `v1.0.0`, `v3.3.0`
- Xem tab **Actions** trên GitHub để xem log

### Problem: Workflow chạy nhưng publish fail (401/403)
**Solution:**
- Kiểm tra `NPM_TOKEN` trong GitHub Secrets
- Token phải là loại **Automation**
- Token phải còn hiệu lực (không expired)
- Regenerate token mới nếu cần

### Problem: Người dùng không thấy update
**Solution:**
- Kiểm tra: Đã chạy `npm run release:*`?
- Kiểm tra: GitHub Actions đã chạy thành công?
- Verify: `npm view @votruongdanh/ai-agent-skills version`
- Có thể mất vài phút để npm registry cập nhật

### Problem: Git push fails
**Solution:**
- Đảm bảo có quyền push lên repo
- Kiểm tra git credentials đã được cấu hình
- Thử: `git push origin main --tags` thủ công

## Manual Release (Nếu cần)

Nếu cần kiểm soát chi tiết hơn:

```bash
# 1. Cập nhật version thủ công
npm version patch  # hoặc minor, major

# 2. Push với tags
git push origin main --tags

# 3. GitHub Actions sẽ tự động publish
# (hoặc publish thủ công nếu cần)
npm publish --access public
```

## Rollback Version (Nếu có lỗi)

Nếu publish nhầm version có lỗi:

```bash
# Unpublish version cụ thể (trong vòng 72h)
npm unpublish @votruongdanh/ai-agent-skills@3.3.0

# Hoặc deprecate version (khuyến nghị)
npm deprecate @votruongdanh/ai-agent-skills@3.3.0 "Version này có lỗi, vui lòng dùng 3.3.1"

# Sau đó release version fix
npm run release:patch
```

## Checklist trước khi Release

- [ ] Đã chạy `node verify.js` và pass tất cả checks
- [ ] Đã test local (nếu có thể)
- [ ] Đã commit tất cả thay đổi
- [ ] Đã cập nhật CHANGELOG.md (nếu có)
- [ ] NPM_TOKEN trong GitHub Secrets còn hiệu lực
- [ ] Đã chọn đúng loại version (patch/minor/major)
