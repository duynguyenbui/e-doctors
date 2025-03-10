import type { CollectionConfig } from 'payload'
import { protectRoles } from '@/hooks/protectRole'
import { anyone } from '@/access/anyone'
import { admins } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { checkRole } from '@/access/checkRole'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      vi: 'Người dùng',
    },
    plural: {
      vi: 'Người dùng',
    },
  },
  auth: true,
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user ?? undefined),
    create: anyone,
    delete: admins,
    read: authenticated,
    update: admins,
  },
  fields: [
    {
      name: 'name',
      label: {
        vi: 'Tên',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      label: {
        vi: 'Ảnh đại diện',
      },
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      label: {
        vi: 'Vai trò (sẽ được lưu vào JWT)',
      },
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      required: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: {
            vi: 'Quản trị viên',
          },
          value: 'admin',
        },
        {
          label: {
            vi: 'Bác sĩ',
          },
          value: 'doctor',
        },
        {
          label: {
            vi: 'Người dùng',
          },
          value: 'user',
        },
      ],
    },
  ],
  timestamps: true,
}
