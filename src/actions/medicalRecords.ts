'use server'

import { getPayloadClient } from '@/get-payload'
import { getServerSideUser } from '@/get-serverside-user'
import { TPayloadMedicalRecordValidator, PayloadMedicalRecordValidator } from '@/validations'

export const getMedicalRecordsByUserId = async (userId: string) => {
  const { user } = await getServerSideUser()

  if (!user || !user.roles.includes('doctor')) {
    return {
      success: false,
      message: 'Bạn không có quyền truy cập trang này',
      data: [],
    }
  }

  const payload = await getPayloadClient()

  const currentPatient = await payload.findByID({
    collection: 'users',
    id: userId,
    depth: 0,
  })

  if (!currentPatient) {
    return {
      success: false,
      message: `Không tìm thấy bệnh nhân #${userId}`,
      data: [],
    }
  }

  const { docs: medicalRecords } = await payload.find({
    collection: 'medicalRecords',
    where: {
      and: [
        {
          'accountDetails.user.id': {
            equals: currentPatient.id,
          },
        },
        {
          'physician.accountDetails.user.id': {
            equals: user.id,
          },
        },
      ],
    },
    depth: 2,
    pagination: false,
  })

  if (!medicalRecords) {
    return {
      success: false,
      message: `Không tìm thấy hồ sơ bệnh án của bệnh nhân #${currentPatient.name}`,
      data: [],
    }
  }

  return {
    success: true,
    message: `Tìm thấy ${medicalRecords.length} hồ sơ bệnh án của bệnh nhân #${currentPatient.name}`,
    data: medicalRecords,
  }
}

export const createMedicalRecord = async (values: TPayloadMedicalRecordValidator) => {
  const { success, data, error } = PayloadMedicalRecordValidator.safeParse(values)
  const { user } = await getServerSideUser()

  if (!success) {
    return { success: false, data: null, message: error.message }
  }

  const { patientId, physician, note, diagnosis, treatment, symptoms, visitDate, prescriptions } =
    data

  const payload = await getPayloadClient()

  const patient = await payload.findByID({
    collection: 'users',
    id: patientId,
    depth: 0,
  })

  if (!patient || patient.roles.includes('doctor')) {
    return { success: false, data: null, message: 'Bệnh nhân không tồn tại' }
  }

  if (user?.id !== physician) {
    return {
      success: false,
      data: null,
      message: 'Bạn không có quyền tạo hồ sơ bệnh án cho bệnh nhân này',
    }
  }

  const { docs: physicianProfiles } = await payload.find({
    collection: 'physicianProfiles',
    where: {
      'accountDetails.user.id': {
        equals: physician,
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
        user: patient,
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

  if (!medicalRecord) {
    return { success: false, data: null, message: 'Lỗi khi tạo hồ sơ bệnh án' }
  }

  return { success: true, data: medicalRecord, message: 'Tạo hồ sơ bệnh án thành công' }
}
