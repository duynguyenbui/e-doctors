import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { authenticated } from '@/access/authenticated'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  access: {
    create: authenticated,
    read: ({ req }) => checkRole(['admin', 'doctor'], req.user ?? undefined),
    update: ({ req }) => checkRole(['admin', 'doctor'], req.user ?? undefined),
    delete: ({ req }) => checkRole(['admin'], req.user ?? undefined),
  },
  admin: {
    defaultColumns: ['patient', 'doctor', 'date', 'status'],
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
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Đã xác nhận', value: 'confirmed' },
        { label: 'Đã hoàn thành', value: 'completed' },
        { label: 'Đã hủy', value: 'canceled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
