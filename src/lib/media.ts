import { Media } from '@/payload-types';

export const resolveMediaSrc = (file: string | Media | null | undefined): string => {
  return typeof file === 'string' ? file : (file?.url ?? '');
};
