// collections/Diagnosis.ts
import type { CollectionConfig } from 'payload'
import { checkRole } from '@/access/checkRole'
import { admins } from '@/access/admin'
import { authenticated } from '@/access/authenticated'
import { notifyDiagnosisAfterChange, notifyDiagnosisAfterDelete } from '@/hooks/notifyDiagnosis'

export const Diagnosis: CollectionConfig = {
  slug: 'diagnoses',
  labels: {
    singular: 'Chuẩn Đoán',
    plural: 'Chuẩn Đoán',
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: admins,
  },
  hooks: {
    afterChange: [notifyDiagnosisAfterChange],
    afterDelete: [notifyDiagnosisAfterDelete], 
  },
  fields: [
    {
      name: 'conversation',
      type: 'relationship',
      relationTo: 'conversations',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'diagnosis',
      type: 'text',
      label: 'Kết Luận Chuẩn Đoán',
      required: true,
    },
    {
      name: 'diagnosisDate',
      type: 'date',
      label: 'Ngày Chuẩn Đoán',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
    {
      name: 'treatment',
      type: 'textarea',
      label: 'Phương Pháp Điều Trị',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng Thái',
      options: [
        { label: 'Chờ Xử Lý', value: 'pending' },
        { label: 'Đã Phê Duyệt', value: 'approved' },
        { label: 'Đã Từ Chối', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'approvedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Người Phê Duyệt',
      admin: {
        condition: (data) => data.status === 'approved' || data.status === 'rejected',
      },
    },
    {
      name: 'approvedAt',
      type: 'date',
      label: 'Ngày Phê Duyệt',
      admin: {
        condition: (data) => data.status === 'approved' || data.status === 'rejected',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        },
      },
    },
  ],
}