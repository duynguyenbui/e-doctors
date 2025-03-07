import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const Profiles: CollectionConfig = {
  slug: 'profiles',
  access: {
    read: authenticated,
    update: authenticated,
  },

  admin: {
    defaultColumns: ['name', 'dob', 'gender'],
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
        if (!val) return 'không được để trống'
        const birthDate = new Date(val)
        if (isNaN(birthDate.getTime())) return 'không hợp lệ'
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        if (age < 0 || age > 120) return 'không hợp lệ'
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
      name: 'specialization',
      type: 'text',
      admin: { condition: (data) => data.user?.roles?.includes('doctor') },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
  ],

  timestamps: true,
}
