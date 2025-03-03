import type { CollectionConfig } from 'payload'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  admin: {
    useAsTitle: 'Name',
  },
  access: {
    create: () => false,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
    },
    {
      name: 'isGroupChat',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'lastMessage',
      type: 'relationship',
      relationTo: 'messages',
      hasMany: false,
    },
  ],
}
