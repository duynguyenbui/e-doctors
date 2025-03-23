import type { CollectionConfig } from 'payload'
import { protectRoles } from '@/hooks/protectRole'
import { anyone } from '@/access/anyone'
import { admins } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { checkRole } from '@/access/checkRole'
import { populatePhysicianProfiles } from './Hooks/UserHooks/populatePhysicianProfiles'
import { populatePaymentSubscriptions } from './Hooks/UserHooks/populatePaymentSubscriptions'
import { deletePhysicianProfiles } from './Hooks/UserHooks/deletePhysicianProfiles'
import { deletePaymentSubscriptions } from './Hooks/UserHooks/deletePaymentSubscriptions'

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
  hooks: {
    afterChange: [populatePhysicianProfiles, populatePaymentSubscriptions],
    afterDelete: [deletePhysicianProfiles, deletePaymentSubscriptions],
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
      name: 'dob',
      type: 'date',
      label: {
        vi: 'Ngày sinh',
      },
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      label: {
        vi: 'Giới tính',
      },
      options: [
        {
          label: {
            vi: 'Nam',
          },
          value: 'male',
        },
        {
          label: {
            vi: 'Nữ',
          },
          value: 'female',
        },
      ],
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: {
        vi: 'Số điện thoại',
      },
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      label: {
        vi: 'Địa chỉ',
      },
      required: true,
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
      // hooks: {
      //   beforeChange: [protectRoles],
      // },
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
