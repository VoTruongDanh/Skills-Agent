# WCAG 2.2 Level AA Web Accessibility Standard

## 1. Phạm vi & Tiêu chuẩn Bắt buộc (Scope & Baseline)
Mọi trang web, component, trạng thái, modal, bảng biểu và luồng thao tác phải đáp ứng đầy đủ tiêu chuẩn **WCAG 2.2 Level AA**. Bất kỳ lỗi truy cập nào cũng được xem là **Lỗi phần mềm nghiêm trọng (Defect)** cần phải sửa.

---

## 2. Tiêu chuẩn Tương phản Màu sắc (Color Contrast - SC 1.4.3 & SC 1.4.11)
- **Văn bản thông thường (dưới 18pt hoặc dưới 14pt bold):** Tỉ lệ tương phản tối thiểu **4.5:1** so với màu nền.
- **Văn bản lớn (từ 18pt/24px trở lên hoặc 14pt/18.5px bold):** Tỉ lệ tương phản tối thiểu **3.0:1**.
- **Thành phần giao diện người dùng & Icon chức năng (UI Components):** Nút bấm, viền ô nhập liệu (inputs), checkboxes, trạng thái active phải đạt tối thiểu **3.0:1** so với màu nền xung quanh.
- **Không truyền tải thông tin chỉ bằng màu sắc (SC 1.4.1):** Khi hiển thị trạng thái lỗi hoặc thành công, phải có icon hoặc văn bản đi kèm bên cạnh màu sắc (ví dụ: thông báo lỗi đỏ phải có chữ mô tả lỗi cụ thể).

---

## 3. Điều hướng Bàn phím & Trọng tâm trực quan (Keyboard & Focus)

### 3.1. Chỉ báo Focus rõ ràng (Focus Visible - SC 2.4.7 & SC 2.4.13)
- Tuyệt đối **KHÔNG ĐƯỢC** xóa bỏ viền focus bằng `outline: none` mà không có kiểu thay thế.
- Chuẩn viền focus bắt buộc:
  ```css
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
  ```
- Khu vực hiển thị focus phải có độ tương phản tối thiểu 3:1 so với nền trước khi được kích hoạt focus.

### 3.2. Thứ tự Tab hợp lý (Logical Tab Order - SC 2.4.3)
- Thứ tự điều hướng phím `Tab` trong cây DOM phải khớp hoàn toàn với thứ tự đọc tự nhiên trên màn hình (từ trái qua phải, từ trên xuống dưới).
- Không dùng thuộc tính `tabindex` dương (> 0). Chỉ dùng `tabindex="0"` để đưa phần tử vào luồng tab hoặc `tabindex="-1"` khi quản lý focus bằng script.

### 3.3. Bẫy Focus trong Hộp thoại (Dialog Focus Trap)
- Khi mở Modal hoặc Drawer: Focus phải tự động chuyển vào phần tử đầu tiên bên trong modal, người dùng bấm `Tab` chỉ được duyệt vòng quanh các phần tử trong modal, không được nhảy ra ngoài trang nền. Bấm phím `Escape` phải đóng modal và hoàn trả focus về nút đã mở modal.

---

## 4. Ngữ nghĩa HTML & Trợ năng (Semantics & ARIA)

### 4.1. Ưu tiên HTML Semantic nguyên bản
- Luôn ưu tiên dùng thẻ nguyên bản: `<button>`, `<a>`, `<input>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`, `<section>` thay vì dùng `<div>` gắn sự kiện click.
- Với nút bấm: Bắt buộc dùng `<button>` thực thụ (hỗ trợ sẵn phím `Enter` và `Space`).

### 4.2. Hỗ trợ Trình đọc màn hình (Screen Readers)
- Nút bấm chỉ có icon: Bắt buộc phải có `aria-label` hoặc thẻ ẩn `<span class="sr-only">Nội dung nút</span>`.
- Phần tử mở rộng (Accordion, Dropdown): Bắt buộc khai báo `aria-expanded="true|false"` và `aria-controls="id-phan-tu"`.
- Trạng thái thông báo động (Live Regions): Sử dụng `aria-live="polite"` cho thông báo chung và `role="alert"` / `aria-live="assertive"` cho lỗi quan trọng.

---

## 5. Mục tiêu Chạm trên Di động (Target Size - SC 2.5.8)
- Kích thước vùng bấm chạm tối thiểu trên màn hình cảm ứng: **24x24 CSS pixels** (khuyến nghị tiêu chuẩn Apple/Google: **44x44px** hoặc **48x48px**).
- Khoảng cách giữa các nút bấm liền kề phải đủ lớn để người dùng không bấm nhầm.
