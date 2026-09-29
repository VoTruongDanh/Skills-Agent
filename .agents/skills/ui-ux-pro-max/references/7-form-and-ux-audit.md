# Form Usability, Data Table UX & Micro-copy Polisher

## 1. Kiểm duyệt Biểu mẫu Nhập liệu (Form Usability Audit)
Biểu mẫu là nơi tạo ra ma sát chuyển đổi lớn nhất của sản phẩm. Một form chuẩn phải đạt các tiêu chuẩn sau:

### 1.1. Bố cục và Vị trí Nhãn (Labeling)
- **Vị trí nhãn:** Nhãn của trường nhập liệu (Label) luôn nằm **phía trên** ô nhập liệu (`top-aligned`), không nằm bên trong (placeholder) hoặc nằm ngang hàng (trừ trường hợp form bảng nhỏ).
- **Tuyệt đối không dùng Placeholder làm Label:** Placeholder sẽ biến mất khi người dùng gõ phím, khiến họ mất ngữ cảnh trường thông tin đang nhập.
- **Bố cục 1 cột (Single Column):** Sắp xếp form thành một cột thẳng đứng từ trên xuống. Không chia 2 cột song song (trừ Họ & Tên hoặc Tháng & Năm hết hạn), vì mắt người đọc theo hình chữ Z sẽ dễ bỏ sót trường.

### 1.2. Đánh dấu Trường Bắt buộc (Required vs Optional)
- Tính nhất quán tuyệt đối: Hoặc đánh dấu tất cả các trường bắt buộc (bằng dấu sao đỏ `*` hoặc chữ `(bắt buộc)`), hoặc chỉ đánh dấu các trường không bắt buộc `(tùy chọn)`. Không bao giờ kết hợp lộn xộn cả hai kiểu.

### 1.3. Cơ chế Báo lỗi Biểu mẫu (Validation & Error Feedback)
- **Kiểm tra khi rời ô (Inline validation on blur):** Chỉ hiện thông báo lỗi khi người dùng đã hoàn thành việc gõ và nhấp chuột ra ngoài ô (`blur`), không báo lỗi khi người dùng đang gõ dở ký tự đầu tiên.
- **Thông điệp lỗi hữu ích:** Thông báo lỗi phải chỉ ra rõ cách khắc phục:
  - *Sai:* "Email không hợp lệ"
  - *Đúng:* "Vui lòng nhập đúng định dạng email (ví dụ: name@example.com)"

---

## 2. Tiêu chuẩn Bảng Dữ liệu (Data Table UX)

- **Căn lề dữ liệu theo quy luật toán học:**
  - **Văn bản (Tên, địa chỉ, trạng thái):** Căn lề trái (`text-align: left`).
  - **Số liệu (Giá tiền, số lượng, phần trăm, ngày tháng):** Căn lề phải (`text-align: right`) để người dùng dễ so sánh độ lớn hàng đơn vị, hàng chục, hàng trăm theo trục dọc.
  - **Hành động (Actions, nút sửa/xóa):** Căn giữa hoặc căn lề phải.
- **Cố định tiêu đề bảng (Sticky Header):** Với bảng có hơn 15 hàng, thanh tiêu đề cột phải được ghim cố định khi người dùng cuộn trang xuống.
- **Trạng thái trỏ chuột (Row Hover State):** Hàng đang được rê chuột phải có màu nền sáng/tối nhẹ (`var(--muted)`) để mắt người đọc không bị lệch dòng.

---

## 3. Tinh chỉnh Văn phong Giao diện (Micro-copy Polishing)

- **Ngắn gọn, đi thẳng vào vấn đề:** Cắt bỏ mọi từ đệm không cần thiết.
  - *Dài dòng:* "Bạn có chắc chắn rằng bạn thực sự muốn xóa mục này khỏi cơ sở dữ liệu không?"
  - *Tối ưu:* "Xóa tài liệu này? Thao tác này không thể hoàn tác."
- **Nút hành động có động từ cụ thể:** Không dùng từ chung chung như "OK" hoặc "Có / Không".
  - *Sai:* Popup "Hủy đơn hàng?" -> Nút: [Có] [Không]
  - *Đúng:* Popup "Hủy đơn hàng?" -> Nút: [Hủy đơn hàng] (Primary) [Giữ lại] (Secondary)
- **Không đổ lỗi cho người dùng:**
  - *Sai:* "Bạn đã nhập sai mật khẩu"
  - *Đúng:* "Mật khẩu không khớp. Vui lòng thử lại hoặc lấy lại mật khẩu."
