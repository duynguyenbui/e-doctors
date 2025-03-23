# e-Doctors

## Giới Thiệu
**e-Doctors** là một nền tảng hỗ trợ quản lý hồ sơ bệnh án và kết nối giữa bác sĩ và bệnh nhân.



## 1. Yêu Cầu Hệ Thống
Trước khi cài đặt, hãy đảm bảo server hoặc môi trường của bạn có:
- **Node.js** (>= 18.x)
- **Yarn** hoặc **npm**
- **Cơ sở dữ liệu**: PostgreSQL / MySQL

## 2. Cài Đặt Dự Án
### 2.1 Clone Source Code
```bash
git clone https://github.com/duynguyenbui/e-doctors.git
cd e-doctors
git checkout master
```

### 2.2 Cấu Hình Environment
Tạo file `.env` dựa trên `.env.example` và chỉnh sửa thông tin:
```bash
cp .env.example .env
```
Chỉnh sửa `.env` để phù hợp với môi trường của bạn (DB, API Keys,...).

### 2.3 Cài Đặt Dependencies
```bash
yarn install
# Hoặc sử dụng npm
npm install
```

## 3. Khởi Chạy Ứng Dụng
### 3.1 Chạy Local
```bash
yarn dev  # Hoặc npm run dev
```
Mở trình duyệt: `http://localhost:3000`

### 3.2 Build Production
```bash
yarn build
```

### 3.3 Start Server
```bash
yarn start
```

## 4. Kết Luận
Ứng dụng đã được cài đặt và khởi chạy thành công trên môi trường local. Nếu có lỗi, kiểm tra logs để debug.

🔥 **Liên hệ:** Nếu gặp vấn đề, hãy mở issue trên GitHub hoặc tham gia nhóm hỗ trợ! 🚀

