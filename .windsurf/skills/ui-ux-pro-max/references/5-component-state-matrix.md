# Component State Matrix & Complete Coverage System

## 1. Nguyên tắc Trọn vẹn Trạng thái (The 8-State Rule)
Một giao diện chất lượng cao **bắt buộc** phải xử lý đầy đủ các trạng thái của dữ liệu và tương tác người dùng. Không được chỉ thiết kế trạng thái lý tưởng (Happy Path / Default).

Mỗi component (Button, Input, Card, List, Table, Page) phải được khai báo đủ 8 trạng thái:

| STT | Trạng thái | Yêu cầu thể hiện kỹ thuật & UI |
| :--- | :--- | :--- |
| **1** | **Default / Idle** | Trạng thái mặc định sẵn sàng tương tác, rõ ràng, tương phản chuẩn. |
| **2** | **Hover / Pointer-over** | Phản hồi thị giác tức thì (sáng hơn hoặc tối hơn 5-10%, thay đổi con trỏ chuột `cursor: pointer`). |
| **3** | **Focus-visible** | Viền focus rõ ràng (`outline: 2px solid`, `offset 2px`), tương thích duyệt bàn phím. |
| **4** | **Active / Pressed** | Hiệu ứng nhấn xuống (`transform: scale(0.98)` hoặc nền đậm hơn). |
| **5** | **Loading / Pending** | Spinner đơn sắc hoặc Skeleton placeholder. Khóa tương tác tránh double-submit. |
| **6** | **Disabled / Inactive** | Giảm độ mờ (`opacity: 0.5`), đổi con trỏ `cursor: not-allowed`, gỡ bỏ sự kiện click. |
| **7** | **Error / Invalid** | Viền đỏ rõ nét, icon cảnh báo đơn sắc và dòng thông báo lỗi cụ thể bên dưới. |
| **8** | **Empty State** | Trạng thái chưa có dữ liệu: Có lời giải thích rõ ràng và nút hành động (CTA) tạo mới. |

---

## 2. Tiêu chuẩn Cho Từng Component Trọng yếu

### 2.1. Nút bấm (Button)
- Phải có ít nhất 3 biến thể phân cấp: `Primary` (đậm nét), `Secondary / Outline` (viền mỏng), `Ghost` (trong suốt).
- Khi ở trạng thái `Loading`: Nút không được thay đổi kích thước đột ngột; icon spinner thay thế icon thường hoặc nhãn được làm mờ nhẹ nhưng giữ nguyên chiều rộng nút.

### 2.2. Ô nhập liệu (Input Field)
- Không bao giờ dùng placeholder để thay thế cho Label.
- Trạng thái `Error`: Thêm thuộc tính `aria-invalid="true"` và liên kết với dòng thông báo lỗi qua `aria-describedby="error-message-id"`.

### 2.3. Danh sách & Bảng (List & Data Table)
- **Loading:** Bắt buộc có khung xương (Skeleton lines) khớp với số lượng cột thực tế.
- **Empty:** Tuyệt đối không để màn hình trắng trơn. Phải hiển thị:
  - Icon đơn sắc biểu trưng cho dữ liệu trống.
  - Tiêu đề: *"Chưa có dữ liệu nào ở đây"*.
  - Đoạn mô tả: *"Bắt đầu bằng cách tạo bản ghi đầu tiên của bạn"*.
  - Nút bấm tạo mới (CTA Button).

---

## 3. Bảng Kiểm Duyệt Trạng Thái Trước Khi Bàn Giao
Trước khi kết luận component hoàn thiện, lập trình viên và AI agent phải tự trả lời 4 câu hỏi:
1. Khi mạng chậm hoặc API chưa trả kết quả, người dùng nhìn thấy gì? *(Có Loading/Skeleton không?)*
2. Khi cơ sở dữ liệu chưa có bản ghi nào, màn hình có bị vỡ không? *(Có Empty state không?)*
3. Khi người dùng nhập sai hoặc API báo lỗi 500, lỗi hiển thị ở đâu và sửa thế nào? *(Có Error state không?)*
4. Người dùng sử dụng bàn phím duyệt phím `Tab` có nhìn thấy viền focus không? *(Có Focus-visible không?)*
