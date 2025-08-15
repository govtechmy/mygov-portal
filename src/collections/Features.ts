import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'open',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'desc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'support',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}


