import type { CollectionConfig } from 'payload'

export const PhysicianProfiles: CollectionConfig = {
  slug: 'physicianProfiles',
  labels: {
    singular: {
      vi: 'Hồ sơ bác sĩ',
    },
    plural: {
      vi: 'Hồ sơ bác sĩ',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        vi: 'Tên bác sĩ và mã định danh bác sĩ (dựa vào hồ sơ)',
      },
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'specialty',
      type: 'text',
      label: {
        vi: 'Chuyên khoa',
      },
    },
    {
      name: 'experience',
      type: 'number',
      label: {
        vi: 'Số năm kinh nghiệm',
      },
      min: 0,
      max: 100,
    },
    {
      name: 'education',
      type: 'textarea',
      label: {
        vi: 'Học vấn',
      },
    },
    {
      name: 'academicRank',
      type: 'select',
      label: {
        vi: 'Học hàm',
      },
      options: [
        {
          label: {
            vi: 'Bác sĩ',
          },
          value: 'preDoctor',
        },
        {
          label: {
            vi: 'Thạc sĩ',
          },
          value: 'master',
        },
        {
          label: {
            vi: 'Tiến sĩ',
          },
          value: 'doctor',
        }
      ],
    },
    {
      name: 'awards',
      type: 'textarea',
      label: {
        vi: 'Giải thưởng',
      },
    },
    {
      name: 'accountDetails',
      label: {
        vi: 'Thông tin liên kết tài khoản',
      },
      type: 'group',
      fields: [
        {
          name: 'available',
          type: 'checkbox',
          label: {
            vi: 'Đang làm việc',
          },
          required: true,
        },
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
        }
      ],
      admin: {
        position: 'sidebar',
      },
    }
  ],
}
