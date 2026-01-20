// import { nextAppHandler } from '@payloadcms/next'
// import config from './payload.config'

// export const handler = nextAppHandler({ config })
// old 3.52 example:
import payload from 'payload';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // initialize Payload if not already initialized
  if (!payload) throw new Error('Payload not initialized');
  // you can forward requests to Payload's API here
  res.status(200).json({ status: 'ok' });
}
