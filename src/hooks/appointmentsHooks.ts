// import type { PayloadRequest } from 'payload'

// export const hideSensitiveInfo = async ({ doc, req }: { doc: any; req: PayloadRequest }) => {
//   if (!req.user || !req.user.roles?.includes('admin')) {
//     if (doc?.patient?.phone) {
//       delete doc.patient.phone
//     }
//   }
//   return doc
// }
// export const assignDoctor = async ({ data, req }: { data: any; req: PayloadRequest }) => {
//   if (!data.department) {
//     throw new Error('Vui lòng chọn khoa khám.')
//   }

//   // Tìm bác sĩ trong khoa
//   const doctors = await req.payload.find({
//     collection: 'users',
//     where: {
//       department: { equals: data.department },
//       role: { equals: 'doctor' },
//     },
//   })

//   if (!doctors.docs.length) {
//     throw new Error('Không có bác sĩ nào trong khoa này.')
//   }

//   // Chọn bác sĩ ít cuộc hẹn nhất
//   let selectedDoctor = doctors.docs[0]
//   let minAppointments = Infinity

//   for (const doctor of doctors.docs) {
//     const appointments = await req.payload.find({
//       collection: 'appointments',
//       where: { doctor: { equals: doctor.id }, status: { in: ['pending', 'confirmed'] } },
//     })

//     if (appointments.docs.length < minAppointments) {
//       minAppointments = appointments.docs.length
//       selectedDoctor = doctor
//     }
//   }

//   data.doctor = selectedDoctor.id
//   return data
// }

// export const checkDoctorSchedule = async ({ data, req }: { data: any; req: PayloadRequest }) => {
//   const { doctor, date, time } = data
//   if (!doctor || !date || !time) return

//   const existingAppointments = await req.payload.find({
//     collection: 'appointments',
//     where: {
//       doctor: { equals: doctor },
//       date: { equals: date },
//       time: { equals: time },
//       status: { in: ['pending', 'confirmed'] },
//     },
//   })

//   if (existingAppointments.docs.length > 0) {
//     throw new Error('Không còn bác sĩ trống vào thời điểm này.')
//   }
// }

// export const setAppointmentCreator = async ({ data, req }: { data: any; req: PayloadRequest }) => {
//   return {
//     ...data,
//     createdBy: req.user?.id, // Lưu ID người đặt lịch
//   }
// }
