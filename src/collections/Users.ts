import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { anyone } from '@/access/anyone'
import { admin } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { canViewOwnProfile } from '@/access/canViewOwnProfile'
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    admin: ({ req }) => checkRole(['admin'], req.user ?? undefined),
    create: anyone,
    delete: admin,
    read: canViewOwnProfile,
    update: authenticated,
  },

  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },

    {
      name: 'password',
      type: 'text',
      admin: {
        condition: ({ operation }) => operation === 'create',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      validate: (val: number | null | undefined) => {
        if (typeof val !== 'number' || val < 0 || val > 120) {
          return 'Tuổi không hợp lệ!'
        }
        return true
      },
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
        { label: 'Khác', value: 'other' },
      ],
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Doctor', value: 'doctor' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'specialization',
      type: 'text',
      admin: { condition: (data) => data.roles?.includes('doctor') },
    },
  ],

  timestamps: true,
}
