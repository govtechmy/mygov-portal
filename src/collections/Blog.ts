import type { CollectionConfig } from 'payload';

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Kesihatan', value: 'kesihatan' },
        { label: 'Kelahiran', value: 'kelahiran' },
        { label: 'Pendidikan', value: 'pendidikan' },
        { label: 'Pekerjaan', value: 'pekerjaan' },
        { label: 'Keluarga', value: 'keluarga' },
        { label: 'Kediaman', value: 'kediaman' },
        { label: 'Pengangkutan', value: 'pengangkutan' },
        { label: 'Bantuan', value: 'bantuan' },
        { label: 'Perjalanan', value: 'perjalanan' },
        { label: 'Persaraan', value: 'persaraan' },
        { label: 'Kematian', value: 'kematian' },
        { label: 'Umum', value: 'umum' },
        { label: 'Hebahan', value: 'hebahan' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'readtime',
      type: 'number',
      required: true,
    },
    {
      name: 'datePublished',
      type: 'date',
      required: true,
      index: true,
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      index: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};
