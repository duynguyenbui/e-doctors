import type { CollectionConfig } from 'payload'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  labels: {
    singular: {
      vi: 'Cuộc hội thoại',
    },
    plural: {
      vi: 'Cuộc hội thoại',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: {
        vi: 'Tên cuộc hội thoại',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'participants',
      label: {
        vi: 'Người tham gia',
      },
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      minRows: 2,
      maxRows: 2,
      required: true,
    },
    {
      name: 'messages',
      label: {
        vi: 'Tin nhắn',
      },
      type: 'join',
      collection: 'messages',
      on: 'conversation',
    },
  ],
}
