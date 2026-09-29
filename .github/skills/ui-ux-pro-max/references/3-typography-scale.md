# Typography System & Mathematical Type Scale

## 1. Thang Tỉ lệ Chữ Đoán định (Modular Type Scale)
Để giao diện đạt được tính nhịp điệu và phân cấp thị giác mạch lạc, kích thước chữ phải tuân theo một tỉ lệ toán học cố định thay vì chọn số ngẫu nhiên.

### Thang tỉ lệ khuyến nghị:
- **Web App / Dashboard (Mật độ cao):** Major Third (tỉ lệ **1.250**)
- **Marketing / Landing Page (Tương phản cao):** Perfect Fourth (tỉ lệ **1.333**)

| Tên Token | Major Third (1.25) | Perfect Fourth (1.333) | Ứng dụng thực tế |
| :--- | :--- | :--- | :--- |
| `text-xs` | 10.24px / 0.64rem | 9.00px / 0.56rem | Badge, tags, chú thích siêu nhỏ |
| `text-sm` | 12.80px / 0.80rem | 12.00px / 0.75rem | Helper text, breadcrumbs, caption |
| `text-base` | **16.00px / 1.00rem** | **16.00px / 1.00rem** | **Body text tiêu chuẩn (Mặc định)** |
| `text-lg` | 20.00px / 1.25rem | 21.33px / 1.33rem | Lead text, Subtitle, Card Header |
| `text-xl` | 25.00px / 1.56rem | 28.43px / 1.77rem | Tiêu đề H3 |
| `text-2xl` | 31.25px / 1.95rem | 37.90px / 2.37rem | Tiêu đề H2, Section Title |
| `text-3xl` | 39.06px / 2.44rem | 50.52px / 3.16rem | Tiêu đề H1 chính |
| `text-4xl` | 48.83px / 3.05rem | 67.34px / 4.21rem | Hero Headline trên Desktop |

---

## 2. Quy tắc Chiều cao Dòng (Line Height / Leading)
- **Quy luật nghịch đảo:** Font chữ càng lớn thì line-height càng phải nhỏ lại; font chữ càng nhỏ thì line-height càng cần thoáng để dễ đọc.
  - **Tiêu đề lớn (Display / H1):** `line-height: 1.1` đến `1.2` (tránh tiêu đề bị giãn cách quá xa).
  - **Tiêu đề vừa (H2 / H3):** `line-height: 1.25` đến `1.35`.
  - **Văn bản thân (Body text):** `line-height: 1.5` đến `1.65` (đạt chuẩn WCAG về khả năng đọc lướt).
  - **Dòng ngắn / Badge / Button:** `line-height: 1` hoặc `1.2`.

---

## 3. Khoảng cách Ký tự (Letter Spacing / Tracking)
- **Tiêu đề lớn (từ 24px trở lên):** Thu hẹp nhẹ letter-spacing để tạo cảm giác chắc chắn, chuyên nghiệp:
  ```css
  h1, .hero-title {
    letter-spacing: -0.025em; /* hoặc -0.02em */
  }
  ```
- **Văn bản thân (Body 16px):** Giữ letter-spacing tự nhiên (`letter-spacing: normal` hoặc `-0.011em`).
- **Chữ in hoa (ALL CAPS / Badges / Labels):** Luôn mở rộng letter-spacing để tránh dính chữ:
  ```css
  .uppercase-label {
    letter-spacing: 0.05em; /* đến 0.08em */
    text-transform: uppercase;
    font-size: 0.75rem;
  }
  ```

---

## 4. Công thức Kiểu chữ Co giãn Linh hoạt (Fluid Typography)
Sử dụng hàm `clamp()` để tiêu đề tự động điều chỉnh theo kích thước màn hình mà không cần quá nhiều Media Queries:
```css
/* Hero Title: tối thiểu 32px trên mobile, co giãn linh hoạt, tối đa 56px trên desktop */
.fluid-hero-title {
  font-size: clamp(2rem, 1.2rem + 3.5vw, 3.5rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
}
```

---

## 5. Giới hạn Chiều rộng Đoạn văn (Optimal Reading Measure)
- Không để dòng văn bản trải dài hết chiều rộng màn hình máy tính.
- Độ dài lý tưởng cho mắt người đọc là **50 đến 75 ký tự mỗi dòng** (tương đương `max-width: 65ch` hoặc `680px` đối với font 16px).
