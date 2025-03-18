import type { PayloadRequest } from "payload";

export const createProfile = async ({ doc, req }: { doc: any; req: PayloadRequest }) => {
  console.log("🔥 Hook createProfile được gọi!");
  console.log("📝 User doc:", doc);
  const payload = req.payload;

  if (!doc.profile) {
    try {
      const profile = await payload.create({
        collection: "profiles",
        data: {
          user: doc.id, 
          phone: doc.phone || "Chưa cập nhật", 
          address: doc.address || "Chưa cập nhật",
          gender: doc.gender && ["male", "female", "other"].includes(doc.gender) ? doc.gender : "other",
          dob: doc.dob && /^\d{4}-\d{2}-\d{2}$/.test(doc.dob) ? doc.dob : "2000-01-01",
        },
      });
      console.log("✅ Profile đã tạo:", profile);
   
      await payload.update({
        collection: "users",
        id: doc.id,
        data: { profileId: profile.id },
      });

    } catch (error) {
      console.error("Lỗi tạo profile:", error);
    }
  }
};
