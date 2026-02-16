import { Media } from '@/payload-types';

export const resolveMediaSrc = (file: string | Media | null | undefined): string => {
  return typeof file === 'string' ? file : (file?.url ?? '');
};

export const resolveMediaRssSrc = (file: string | Media | null | undefined): string => {
  if (!file) return '';
  if (typeof file === 'string') return file;
  // Prefer generated rss size if available, else fallback to original
  const rssUrl = (file as Media & { sizes?: Record<string, { url?: string }> })?.sizes?.rss?.url;
  return rssUrl ?? file.url ?? '';
};

export const resolveMediaCloudFrontRssSrc = (file: string | Media | null | undefined): string => {
  if (!file) return '';
  if (typeof file === 'string') return file;

  const cfUrl = 'https://d3td9m6wtjh3ti.cloudfront.net/mygov-image/';
  const rssFileName = (file as Media & { sizes?: Record<string, { url?: string }> })?.sizes?.rss?.filename;

  if (rssFileName) {
    return `${cfUrl}${rssFileName}`;
  }

  return resolveMediaRssSrc(file);
};
