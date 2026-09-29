# Layout Architecture, Bento Grid & Spacing Hierarchy

## 1. Hệ thống Nhịp điệu Khoảng cách (The 8px/4px Spacing Rhythm)
Mọi padding, margin, gap và kích thước component phải là bội số của **8px** (hoặc bước đệm **4px** cho các chi tiết nhỏ):

| Token | Giá trị px | Giá trị rem | Ứng dụng chuẩn |
| :--- | :--- | :--- | :--- |
| `space-1` | 4px | 0.25rem | Icon gap, viền nhỏ, padding badge |
| `space-2` | 8px | 0.50rem | Khoảng cách giữa các phần tử phụ thuộc (label & input) |
| `space-3` | 12px | 0.75rem | Padding trong button nhỏ, input compact |
| `space-4` | 16px | 1.00rem | Padding chuẩn của button, card content, form group gap |
| `space-6` | 24px | 1.50rem | Padding giữa các section con, card lớn |
| `space-8` | 32px | 2.00rem | Khoảng cách giữa các khối chức năng chính |
| `space-12` | 48px | 3.00rem | Padding trên/dưới của khối section |
| `space-16` | 64px | 4.00rem | Khoảng cách giữa các Section trang Landing page |

---

## 2. Nghệ thuật Bố cục Bento Grid (Zero-Crop Content-Led Grid)
Bento Grid là phương pháp bố cục trực quan hiện đại, gom các tính năng/thông tin vào các ô lưới với kích thước bất đối xứng có chủ đích.

### 2.1. Xác định Khối Trung tâm (Hero Element Detection)
- Trong một cụm Bento Grid, luôn phải có **1 khối Hero chủ đạo** (chiếm 2 cột hoặc 2 hàng, diện tích lớn nhất hoặc vị trí dẫn mắt đầu tiên).
- Không được tạo ra các ô lưới có kích thước hoàn toàn bằng nhau một cách đơn điệu.

### 2.2. Mẫu Bento Grid Chuẩn (CSS Grid Template)
```css
.bento-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* 24px */
}

/* Tablet & Desktop */
@media (min-width: 768px) {
  .bento-container {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(220px, auto);
  }

  /* Khối Hero chính: chiếm 2 cột */
  .bento-hero {
    grid-column: span 2;
    grid-row: span 2;
  }

  /* Khối Dọc: chiếm 1 cột, 2 hàng */
  .bento-tall {
    grid-column: span 1;
    grid-row: span 2;
  }

  /* Khối Tiêu chuẩn: 1 cột, 1 hàng */
  .bento-card {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

### 2.3. Quy tắc Không Cắt Xén Hình ảnh & Dữ liệu (Zero-Crop)
- Mọi hình ảnh hoặc biểu đồ minh họa trong ô Bento phải hiển thị trọn vẹn nội dung quan trọng.
- Sử dụng `object-fit: contain` hoặc căn lề khéo léo, tránh việc ảnh bị cắt cụt mặt người hoặc mất thông số biểu đồ khi co giãn responsive.

---

## 3. Hệ thống Điểm dừng Màn hình (Responsive Breakpoints)
Sử dụng bộ điểm dừng chuẩn mực (đồng bộ với Tailwind CSS & tiêu chuẩn thiết bị):
- **Mobile (`< 640px`):** Giao diện 1 cột (single-column stack), padding lề 16px.
- **Tablet (`sm: 640px` - `md: 768px`):** Lưới 2 cột, padding lề 24px.
- **Desktop nhỏ (`lg: 1024px`):** Lưới 3 hoặc 4 cột, thanh điều hướng mở rộng.
- **Desktop chuẩn (`xl: 1280px`):** Chiều rộng tối đa container `max-width: 1200px` căn giữa.
- **Màn hình lớn (`2xl: 1536px`):** Giữ container không giãn quá `1400px` để tránh loãng thông tin.
