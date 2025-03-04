// import { PayloadRequest } from "payload/types";
// import bcrypt from "bcrypt";

// function changePasswordAPI(payload) {
//   payload.express.post("/change-password", async (req: PayloadRequest, res) => {
//     try {
//       const { userId, oldPassword, newPassword } = req.body;

//       // Lấy thông tin user từ Payload CMS
//       const user = await payload.findByID({
//         collection: "users",
//         id: userId,
//       });

//       if (!user) {
//         return res.status(404).json({ message: "Người dùng không tồn tại" });
//       }

//       // Kiểm tra mật khẩu cũ
//       const isMatch = await bcrypt.compare(oldPassword, user.hash);
//       if (!isMatch) {
//         return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
//       }

//       // Băm mật khẩu mới
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(newPassword, salt);

//       // Cập nhật mật khẩu mới
//       await payload.update({
//         collection: "users",
//         id: userId,
//         data: { password: hashedPassword },
//       });

//       res.json({ message: "Đổi mật khẩu thành công!" });
//     } catch (error) {
//       res.status(500).json({ message: "Lỗi server", error });
//     }
//   });
// }

// // ✅ Xuất ra với tên cụ thể
// export default changePasswordAPI;
