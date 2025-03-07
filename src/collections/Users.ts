import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { admin } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { canCreateDoctor } from '@/access/canCreateDoctor'
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    admin: ({ req }) => checkRole(['admin'], req.user ?? undefined),
    create: canCreateDoctor,
    delete: admin,
    read: authenticated,
    update: authenticated,
  },

  admin: {
    defaultColumns: ['email', 'roles'],
    useAsTitle: 'email',
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      admin: { condition: ({ operation }) => operation === 'create' },
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
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: false,
    },
  ],

  timestamps: true,
}
