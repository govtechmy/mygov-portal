import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  admin: { useAsTitle: 'filename' },
  fields: [{ name: 'filename', type: 'text', required: true }],
  access: {
    read: () => true, // public read
  },
  upload: {
    staticDir: 'mygov-image',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
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
