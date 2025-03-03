import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { authenticated } from '@/access/authenticated'

export const MedicalRecords: CollectionConfig = {
  slug: 'medical-records',
  access: {
    create: ({ req }) => checkRole(['doctor'], req.user ?? undefined),
    read: ({ req }) => checkRole(['admin', 'doctor'], req.user ?? undefined),
    update: ({ req }) => checkRole(['doctor'], req.user ?? undefined),
    delete: ({ req }) => checkRole(['admin'], req.user ?? undefined),
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
