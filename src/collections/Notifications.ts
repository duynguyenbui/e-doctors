// collections/Notifications.ts
import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import adminOrDoctors from '@/access/adminsOrDoctors'
import { protectRoles } from '@/hooks/protectRole'
import { anyone } from '@/access/anyone'
import { admins } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { onlyOwnData } from '@/access/onlyOwnData'
export const Notifications: CollectionConfig = {
  slug: 'notifications',
  labels: {
    singular: 'Thông Báo',
    plural: 'Thông Báo',
  },
  access: {
    create: adminOrDoctors,
    read: onlyOwnData,
    update: authenticated,
    delete: admins, 
  },
  fields: [
    {
      name: 'recipient',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Người Nhận',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'message',
      type: 'text',
      required: true,
      label: 'Nội Dung Thông Báo',
    },
    {
      name: 'isRead',
      type: 'checkbox',
      defaultValue: false,
      label: 'Đã Đọc',
    },
    {
        name: 'diagnosisId',
        type: 'relationship',
        relationTo: 'diagnoses',
        required: false,
      
      },
  ],
  timestamps: true, 
}