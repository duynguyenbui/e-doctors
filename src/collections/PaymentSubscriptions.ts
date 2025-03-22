import type { CollectionConfig } from 'payload'

export const PaymentSubscriptions: CollectionConfig = {
  slug: 'paymentSubscriptions',
  labels: {
    singular: {
      vi: 'Gói dịch vụ',
    },
    plural: {
      vi: 'Gói dịch vụ',
    },
  },
  fields: [
    {
      name: 'name',
      label: {
        vi: 'Tên thuê bao',
      },
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subscription',
      label: {
        vi: 'Gói dịch vụ',
      },
      type: 'array',
      fields: [
        {
          name: 'startDate',
          label: {
            vi: 'Ngày bắt đầu',
          },
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd/MM/yyyy HH:mm:ss',
            },
          },
        },
        {
          name: 'endDate',
          label: {
            vi: 'Ngày kết thúc',
          },
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd/MM/yyyy HH:mm:ss',
            },
          },
        },
      ],
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
          admin: {
            readOnly: true,
          },
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
