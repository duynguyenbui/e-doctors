import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { anyone } from '@/access/anyone'
import { admin } from '@/access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req }) => checkRole(['admin'], req.user ?? undefined),
    create: anyone,
    delete: admin,
    read: ({ req }) => checkRole(['admin'], req.user ?? undefined),
    update: ({ req }) =>
      checkRole(['admin'], req.user ?? undefined) && req.user?.id === req.query?.id,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        // { label: 'Doctor', value: 'doctor' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
  timestamps: true,
}
