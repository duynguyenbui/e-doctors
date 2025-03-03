import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { authenticated } from '@/access/authenticated'

export const MedicalRecords: CollectionConfig = {
  slug: 'medical-records',
  access: {
    create: ({ req }) => checkRole(['doctor'], req.user ?? undefined), // Chỉ bác sĩ tạo được hồ sơ
    read: ({ req }) => checkRole(['admin', 'doctor'], req.user ?? undefined), // Bác sĩ & admin có thể xem
    update: ({ req }) => checkRole(['doctor'], req.user ?? undefined), // Chỉ bác sĩ chỉnh sửa được hồ sơ
    delete: ({ req }) => checkRole(['admin'], req.user ?? undefined), // Chỉ admin có thể xóa hồ sơ
  },
  admin: {
    defaultColumns: ['patient', 'doctor', 'diagnosis', 'createdAt'],
    useAsTitle: 'patient',
  },
  fields: [
    {
      name: 'patient',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'doctor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'diagnosis',
      type: 'textarea',
      required: true,
    },
    {
      name: 'treatment',
      type: 'textarea',
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [{ name: 'file', type: 'upload', relationTo: 'media' }],
    },
  ],
  timestamps: true,
}
