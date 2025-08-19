import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';

const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/');
      },
    ],
  },
  fields: [
    {
      name: 'aboutTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'aboutDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'leftItems',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'icon',
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
          name: 'highlights',
          type: 'array',
          fields: [
            {
              name: 'highlight',
              type: 'text',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'rightItems',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'icon',
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
          name: 'highlights',
          type: 'array',
          fields: [
            {
              name: 'highlight',
              type: 'text',
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      maxRows: 5,
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
    },
    {
      name: 'faq',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
    },
  ],
};
export default HomePage;
