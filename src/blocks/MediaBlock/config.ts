import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: {
      vi: 'Media',
    },
    plural: {
      vi: 'Media',
    },
  },
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      label: {
        vi: 'Media',
      },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
