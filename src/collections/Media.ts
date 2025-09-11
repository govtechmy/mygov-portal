import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'rss',
        formatOptions: {
          format: 'jpg',
          options: {
            quality: 50,
          },
        },
      },
    ],
  },
};
