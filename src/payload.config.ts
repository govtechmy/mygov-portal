// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { searchPlugin } from '@payloadcms/plugin-search';
import PayloadCollections, { Users } from './collections';
import HomePage from './globals/HomePage';
import Footer from './globals/Footer';
import { s3Storage } from '@payloadcms/storage-s3';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: PayloadCollections,
  globals: [HomePage, Footer],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    searchPlugin({
      collections: ['blog'],
    }),
    s3Storage({
      collections: {
        // media: true,
        media: {
          prefix: process.env.S3_PREFIX || '', // Optional: prefix for folder inside bucket
        },
      },
      bucket: process.env.S3_BUCKET_NAME || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.AWS_REGION || '',
        credentials: {
          accessKeyId: process.env.AWS_KEY_ID || '',
          secretAccessKey: process.env.AWS_ACCESS_ID || '',
        },
      },
      clientUploads: true, // allow client-side uploads
    }),
  ],
});
