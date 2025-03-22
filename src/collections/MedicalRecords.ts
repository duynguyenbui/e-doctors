import type { CollectionConfig } from 'payload'

export const MedicalRecords: CollectionConfig = {
  slug: 'medicalRecords',
  labels: {
    singular: {
      vi: 'Lịch sử bệnh án',
    },
    plural: {
      vi: 'Lịch sử bệnh án',
    },
  },
  fields: [
    {
      name: 'physician',
      label: {
        vi: 'Bác sĩ phụ trách',
      },
      type: 'relationship',
      relationTo: 'physicianProfiles',
      hasMany: false,
      required: true,
    },
    {
      name: 'visitDate',
      label: {
        vi: 'Ngày khám',
      },
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      required: true,
    },
    {
      name: 'symptoms',
      label: {
        vi: 'Triệu chứng',
      },
      type: 'textarea',
    },
    {
      name: 'diagnosis',
      label: {
        vi: 'Chẩn đoán',
      },
      type: 'textarea',
    },
    {
      name: 'treatment',
      label: {
        vi: 'Phác đồ điều trị',
      },
      type: 'textarea',
    },
    {
      name: 'prescriptions',
      label: {
        vi: 'Đơn thuốc (s)',
      },
      type: 'array',
      fields: [
        {
          name: 'medication',
          type: 'text',
          label: {
            vi: 'Tên thuốc',
          },
          required: true,
        },
        {
          name: 'dosage',
          type: 'text',
          label: {
            vi: 'Liều dùng',
          },
        },
        {
          name: 'instructions',
          type: 'text',
          label: {
            vi: 'Hướng dẫn sử dụng',
          },
        }
      ]
    },
    {
      name: 'note',
      label: {
        vi: 'Ghi chú thêm',
      },
      type: 'textarea',
    },
    {
      name: 'accountDetails',
      label: {
        vi: 'Thông tin liên kết tài khoản',
      },
      type: 'group',
      fields: [
        {
          name: 'user',
          label: {
            vi: 'Tài khoản',
          },
          type: 'relationship',
          relationTo: 'users',
          hasMany: false,
          required: true,
        }
      ],
      admin: {
        position: 'sidebar',
      },
    }
  ],
}
