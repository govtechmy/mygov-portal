import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';

const Footer: GlobalConfig = {
  slug: 'footer',
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
      name: 'facebookUrl',
      label: 'Facebook URL',
      type: 'text',
    },
    {
      name: 'twitterUrl',
      label: 'Twitter/X URL',
      type: 'text',
    },
    {
      name: 'instagramUrl',
      label: 'Instagram URL',
      type: 'text',
    },
    {
      name: 'tiktokUrl',
      label: 'TikTok URL',
      type: 'text',
    },
    {
      name: 'linkedinUrl',
      label: 'LinkedIn URL',
      type: 'text',
    },
  ],
};

export default Footer;
