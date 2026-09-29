# Anti-UI Slop & Subtractive Design System

## 1. Triết lý Thiết kế Cốt lõi (Core Philosophy)
Mục tiêu của việc thiết kế và lập trình giao diện **KHÔNG PHẢI** là tạo ra một giao diện "trông có vẻ đẹp" kiểu AI tổng hợp (AI slop), mà là tạo ra sản phẩm:
- **Có chủ đích (Intentional):** Mỗi pixel, khoảng cách, font chữ đều có lý do tồn tại.
- **Có bản sắc (Authored):** Thể hiện rõ DNA của thương hiệu, nhất quán từ màn hình đầu tiên đến màn hình cuối cùng.
- **Tối giản thực chất (Subtractive):** Loại bỏ mọi chi tiết trang trí vô nghĩa làm xao nhãng người dùng.
- **Cao cấp (Premium):** Bố cục vững chắc, nhịp điệu thị giác rõ ràng, độ hoàn thiện cao.

---

## 2. Quy tắc Bắt buộc Tuyệt đối (Non-Negotiable Constraints)

### 2.1. Cấm Tuyệt đối Màu Gradient
- **Quy định:** Không sử dụng bất kỳ hiệu ứng gradient nào (`linear-gradient`, `radial-gradient`, `conic-gradient`, các generator gradient CSS...).
- **Giải pháp thay thế:** Sử dụng màu phẳng, màu đơn sắc (solid / flat colors) với sắc độ được chọn lọc kỹ lưỡng, đảm bảo độ tương phản cao, tối giản và chuyên nghiệp.

### 2.2. Cấm Tuyệt đối Icon Nhiều Màu Sắc
- **Quy định:** Không sử dụng icon 3D tô màu, icon đa màu (multicolor), emoji màu hoặc icon hoạt hình trong UI.
- **Giải pháp thay thế:** Sử dụng hoàn toàn icon đơn sắc (monochrome / single-tone), đồng nhất nét vẽ (stroke 1.5px hoặc 2px), kế thừa màu chữ thông qua `currentColor` hoặc mã màu chủ đạo của hệ thống.

---

## 3. Nguyên tắc Subtractive Design (Thiết kế Loại trừ)

Trước khi thêm bất kỳ thành phần mới nào vào giao diện, hãy tự hỏi: *"Bỏ cái này đi thì người dùng có hoàn thành tác vụ dễ dàng hơn không?"*

### 3.1. Loại bỏ các "Hộp lồng Hộp" (Container Slop)
- **Vấn đề:** Nhiều giao diện lạm dụng thẻ Card bao quanh mọi thứ: một Card bọc ngoài, bên trong là 3 Card con, mỗi Card con lại có viền bo tròn và bóng đổ riêng.
- **Khắc phục:** Sử dụng khoảng trắng (whitespace) và phân cấp cỡ chữ để phân tách khu vực thay vì dùng viền (border) và khung (card) liên tục.

### 3.2. Giảm thiểu Bóng đổ (Drop Shadows)
- Tránh bóng đổ đậm, lòe loẹt hoặc bóng đa màu.
- Nếu cần độ nổi (elevation), chỉ dùng viền phẳng tinh tế `1px solid var(--border)` hoặc bóng mờ cực nhẹ (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)`).

### 3.3. Tối ưu hóa Mật độ Thông tin (Information Density)
- Nhóm các thông tin liên quan lại gần nhau theo nguyên lý Gestalt (Proximity).
- Giữ khoảng cách giữa các nhóm khác nhau lớn gấp đôi khoảng cách giữa các phần tử cùng nhóm.

---

## 4. Quy trình Đánh giá Anti-Slop (Checklist)
- [ ] Giao diện có bị cảm giác "template SaaS generic" không?
- [ ] Các thành phần có đồng nhất một ngôn ngữ thiết kế duy nhất không?
- [ ] Đã kiểm tra loại bỏ 100% gradient chưa?
- [ ] Đã kiểm tra tất cả icon là đơn sắc (monochrome) chưa?
- [ ] Có viền thừa, bóng đổ thừa nào có thể xóa bỏ mà không ảnh hưởng cấu trúc không?
