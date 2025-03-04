// import type { CollectionConfig } from 'payload'
// import { checkRole } from '@/access/checkRole'
// import { authenticated } from '@/access/authenticated'
// import { checkDoctorSchedule, assignDoctor, setAppointmentCreator } from '@/hooks/appointmentsHooks'

// export const Appointments: CollectionConfig = {
//   slug: 'appointments',
//   access: {
//     create: authenticated,
//     read: ({ req }) => checkRole(['admin', 'doctor', 'patient'], req.user ?? undefined),
//     update: ({ req }) => checkRole(['admin', 'doctor'], req.user ?? undefined),
//     delete: ({ req }) => checkRole(['admin'], req.user ?? undefined),
//   },
//   admin: {
//     defaultColumns: ['patient', 'department', 'doctor', 'date', 'status'],
//     useAsTitle: 'patient',
//   },
//   hooks: {
//     beforeChange: [assignDoctor, checkDoctorSchedule, setAppointmentCreator],
//   },
//   fields: [
//     {
//       name: 'patient',
//       type: 'relationship',
//       relationTo: 'users',
//       required: true,
//     },
//     // {
//     //   name: 'department',
//     //   type: 'relationship',
//     //   relationTo: 'departments',
//     //   required: true,
//     // },
//     {
//       name: 'doctor',
//       type: 'relationship',
//       relationTo: 'users',
//       admin: { hidden: true }, // Ẩn trong admin, bác sĩ được chỉ định tự động
//     {
//       name: 'date',
//       type: 'date',
//       required: true,
//       validate: (val) => {
//         if (!val) return 'Vui lòng chọn ngày khám.'
//         const selectedDate = new Date(val)
//         if (selectedDate < new Date()) {
//           return 'Ngày khám không thể là quá khứ.'
//         }
//         return true
//       },
//     },
//     {
//       name: 'time',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'status',
//       type: 'select',
//       options: [
//         { label: 'Chờ xác nhận', value: 'pending' },
//         { label: 'Đã xác nhận', value: 'confirmed' },
//         { label: 'Đã hoàn thành', value: 'completed' },
//         { label: 'Đã hủy', value: 'canceled' },
//       ],
//       defaultValue: 'pending',
//     },
//     {
//       name: 'symptoms',
//       type: 'textarea',
//       required: true,
//     },
//     {
//       name: 'medicalHistory',
//       type: 'textarea',
//       defaultValue: '',
//     },
//     {
//       name: 'createdBy',
//       type: 'relationship',
//       relationTo: 'users',
//       admin: { hidden: true },
//     },
//   ],
//   timestamps: true,
// }
