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
    create: ({ req, data }) => {
      const roles = data?.roles || []
      if (!data.roles || data.roles.length == 0 || data.roles.includes('user')) {
        return true
      }
      if (roles.includes('doctor') || roles.includes('admin')) {
        return checkRole(['admin'], req.user ?? undefined)
      }
      return false
    },
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
      name: 'dob',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
      validate: (val: Date | null | undefined) => {
        if (val === undefined) return true
        if (!val) return 'khong duoc de trong'
        const birtDate = new Date(val)
        if (isNaN(birtDate.getTime())) return 'hop le'
        const today = new Date()
        const age = today.getFullYear() - birtDate.getFullYear()
        if (age < 0 || age > 120) return 'khong hop le'
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
