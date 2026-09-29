# Semantic Design Tokens & Theme Variables (Shadcn/Tailwind Standard)

## 1. Kiến trúc Token Ngữ nghĩa (Semantic-Only Architecture)
Không bao giờ hardcode mã màu hex (`#ffffff`, `#1e293b`) trực tiếp vào CSS hoặc component. Sử dụng hệ thống biến ngữ nghĩa (Semantic Tokens) ánh xạ tự động qua CSS Custom Properties.

Điều này đảm bảo:
- Hỗ trợ đổi giao diện Sáng / Tối (Light / Dark Mode) tức thì.
- Dễ dàng thay đổi bảng màu thương hiệu tại một điểm duy nhất.
- Đảm bảo tính nhất quán giữa Figma và Code.

---

## 2. Bảng Biến Ngữ nghĩa Chuẩn (The Core Theme Tokens)

```css
:root {
  /* Nền và Chữ cơ bản */
  --background: #ffffff;
  --foreground: #09090b;

  /* Card và Surface */
  --card: #ffffff;
  --card-foreground: #09090b;

  /* Popover, Dropdown, Tooltip */
  --popover: #ffffff;
  --popover-foreground: #09090b;

  /* Màu Chủ đạo (Primary) - Nền tối, chữ trắng hoặc ngược lại */
  --primary: #18181b;
  --primary-foreground: #fafafa;

  /* Màu Phụ (Secondary) */
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;

  /* Màu Làm dịu / Mờ (Muted) */
  --muted: #f4f4f5;
  --muted-foreground: #71717a;

  /* Màu Nhấn (Accent) */
  --accent: #f4f4f5;
  --accent-foreground: #18181b;

  /* Trạng thái Phá hủy / Lỗi (Destructive) */
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;

  /* Đường viền, Ô nhập liệu, Vòng focus */
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #18181b;

  /* Bán kính bo góc chuẩn */
  --radius: 0.5rem; /* 8px */
}

/* Chế độ Tối (Dark Theme) */
.dark, [data-theme="dark"] {
  --background: #09090b;
  --foreground: #fafafa;

  --card: #09090b;
  --card-foreground: #fafafa;

  --popover: #09090b;
  --popover-foreground: #fafafa;

  --primary: #fafafa;
  --primary-foreground: #18181b;

  --secondary: #27272a;
  --secondary-foreground: #fafafa;

  --muted: #27272a;
  --muted-foreground: #a1a1aa;

  --accent: #27272a;
  --accent-foreground: #fafafa;

  --destructive: #7f1d1d;
  --destructive-foreground: #fafafa;

  --border: #27272a;
  --input: #27272a;
  --ring: #d4d4d8;
}
```

---

## 3. Quy tắc Đối xứng Surface / Foreground
- **Bắt buộc đi theo cặp:** Mọi token nền (`surface`, `card`, `primary`, `muted`, `popover`) **phải luôn** đi kèm với token chữ tương ứng (`foreground`, `card-foreground`, `primary-foreground`, `muted-foreground`).
- Ví dụ đúng:
  ```css
  .custom-badge {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    border: 1px solid var(--border);
  }
  ```
- Không bao giờ dùng nền `var(--primary)` nhưng lại dùng chữ màu hardcode `#ffffff`.

---

## 4. Bo góc Thống nhất (Border Radius Scale)
Không dùng bán kính bo góc ngẫu nhiên cho các thành phần trên cùng một màn hình:
- `radius-sm`: `calc(var(--radius) - 4px)` (4px) cho Badge, Tooltip, Checkbox.
- `radius-md`: `calc(var(--radius) - 2px)` (6px) cho Input, Button, Dropdown item.
- `radius-lg`: `var(--radius)` (8px) cho Card, Dialog modal.
- `radius-full`: `9999px` cho Avatar hoặc Pill badges.
