'use server'

import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/get-serverside-user"
import { TPayloadMedicalRecordValidator, PayloadMedicalRecordValidator } from "@/validations"

export const createMedicalRecord = async (values: TPayloadMedicalRecordValidator) => {
  const { success, data, error } = PayloadMedicalRecordValidator.safeParse(values)
  const { user } = await getServerSideUser()

  if (!success) {
    return { success: false, data: null, message: error.message }
  }

  const { patientId, doctorId, note, diagnosis, treatment, symptoms, visitDate, prescriptions } = data

  const payload = await getPayloadClient();

  const patient = await payload.findByID({
    collection: 'users',
    id: patientId,
    depth: 0,
  })

  if (!patient || patient.roles.includes('doctor')) {
    return { success: false, data: null, message: 'Bệnh nhân không tồn tại' }
  }

  if(user?.id !== doctorId) {
    return { success: false, data: null, message: 'Bạn không có quyền tạo hồ sơ bệnh án cho bệnh nhân này' }
  }

  const {docs: physicianProfiles} = await payload.find({
    collection: 'physicianProfiles',
    where: {
      'accountDetails.user.id': {
        equals: doctorId,
      },
    },
    depth: 0,
    limit: 1,
  })

  const physicianProfile = physicianProfiles[0]

  if (!physicianProfile) {
    return { success: false, data: null, message: 'Bác sĩ không tồn tại' }
  }
  
  const medicalRecord = await payload.create({
    collection: 'medicalRecords',
    data: {
      accountDetails: {
        user: patient
      },
      physician: physicianProfile,
      visitDate: visitDate.toISOString(),
      note: note,
      diagnosis,
      treatment,
      symptoms,
      prescriptions,
    },
  })

  if(!medicalRecord) {
    return { success: false, data: null, message: 'Lỗi khi tạo hồ sơ bệnh án' }
  }

  return { success: true, data: medicalRecord, message: 'Tạo hồ sơ bệnh án thành công' }
}

