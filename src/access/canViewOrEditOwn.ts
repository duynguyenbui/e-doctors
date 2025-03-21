import { Access } from "payload";

export const canViewOrEditOwn: Access = ({ req }) => {
 

  // Đảm bảo `req.user` tồn tại trước khi truy cập thuộc tính
  if (!req.user || !req.user.roles) {
    console.log("Unauthorized access - user not found");
    return false;
  }

  // Nếu là admin, cho phép truy cập tất cả
  if (req.user.roles.includes("admin")) return true;

  // Kiểm tra `req.user.id` có tồn tại không
  if (!req.user.id) {
    console.log("User ID is missing");
    return false;
  }


  return {
    user: {
      equals: req.user.id,
    },
  };
};
