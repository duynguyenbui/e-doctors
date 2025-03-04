// import { checkRole } from '@/access/checkRole'
// import type { CollectionConfig } from 'payload'

// export const Prescriptions: CollectionConfig = {
//   slug: 'prescriptions',
//   access: {
//     create: ({ req }) => checkRole(['doctor'], req.user ?? undefined),
//     read: ({ req }) => checkRole(['admin', 'doctor'], req.user ?? undefined),
//     update: ({ req }) => checkRole(['doctor'], req.user ?? undefined),
//     delete: ({ req }) => checkRole(['admin'], req.user ?? undefined),
//   },
//   admin: {
//     defaultColumns: ['patient', 'doctor', 'createdAt'],
//     useAsTitle: 'patient',
//   },
//   fields: [
//     {
//       name: 'patient',
//       type: 'relationship',
//       relationTo: 'users',
//       required: true,
//     },
//     {
//       name: 'doctor',
//       type: 'relationship',
//       relationTo: 'users',
//       required: true,
//     },
//     {
//       name: 'medicalRecord',
//       type: 'relationship',
//       relationTo: 'medical-records',
//       required: true,
//     },
//     {
//       name: 'medicines',
//       type: 'array',
//       fields: [
//         { name: 'name', type: 'text', required: true },
//         { name: 'dosage', type: 'text', required: true },
//         { name: 'frequency', type: 'text', required: true },
//         { name: 'notes', type: 'textarea' },
//       ],
//       validate: (medicines) => {
//         if (!medicines || medicines.length === 0) {
//           return 'Cần ít nhất một loại thuốc!'
//         }
//         return true
//       },
//     },
//   ],
//   timestamps: true,
// }
