import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  labels: {
    singular: {
      vi: 'Mã lệnh',
    },
    plural: {
      vi: 'Mã lệnh',
    },
  },
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      label: {
        vi: 'Ngôn ngữ',
      },
      type: 'select',
      defaultValue: 'typescript',
      options: [
        {
          label: 'Typescript',
          value: 'typescript',
        },
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'CSS',
          value: 'css',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}
