import type { PayloadRequest } from "payload";

export const createMedicalRecord = async ({ req, doc }: { req: PayloadRequest; doc: any }) => {
  const payload = req.payload;

  try {
   
    const existingRecord = await payload.find({
      collection: "medical-records",
      where: { user: { equals: doc.id } },
    });

    if (existingRecord.docs.length > 0) return;


    await payload.create({
      collection: "medical-records",
      data: {
        user: doc.id,
        medicalHistory: {
          chronicDiseases: [], 
          allergies: [],
          surgeries: [],
          otherConditions: "",
        },
        examinationDate: new Date().toISOString(),
      },
    });

    console.log(`✅ Hồ sơ bệnh án đã được tạo cho user: ${doc.id}`);
  } catch (error) {
    console.error("🚨 Lỗi khi tạo bệnh án:", error);
  }
};
