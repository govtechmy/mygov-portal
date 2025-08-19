'use server';

import { getPayload, Where } from 'payload';
import config from '@/payload.config';
import type { Blog } from '@/payload-types';

export async function searchBarServer(query: string) {
  // Short-circuit very short queries to avoid unnecessary server work
  if (!query || query.trim().length < 2) {
    // Minimal shape needed by callers
    return { docs: [] } as { docs: Blog[] };
  }
  const payload = await getPayload({ config });
  const results = await payload.find({
    collection: 'blog',
    limit: 10,
    depth: 0,
    // Only fields needed for the suggestion list
    select: {
      id: true,
      title: true,
      type: true,
    },
    where: {
      OR: [
        {
          title: {
            like: query,
          },
        },
      ],
    },
  });
  return results;
}

// create search function for result map that has type, title, and date
export async function searchResultMap(query: string, type: string, dateFrom: string, dateTo: string, page: number) {
  const payload = await getPayload({ config });

  const typeMap: Record<string, Blog['type']> = {
    Kesihatan: 'kesihatan',
    Kelahiran: 'kelahiran',
    Pendidikan: 'pendidikan',
    Pekerjaan: 'pekerjaan',
    Keluarga: 'keluarga',
    Kediaman: 'kediaman',
    Pengangkutan: 'pengangkutan',
    Bantuan: 'bantuan',
    Perjalanan: 'perjalanan',
    Persaraan: 'persaraan',
    Kematian: 'kematian',
    Umum: 'umum',
    Hebahan: 'hebahan',
  };

  const andConditions: Where[] = [];

  if (query) {
    andConditions.push({
      OR: [{ title: { like: query } }, { caption: { like: query } }],
    });
  }

  const mappedType = typeMap[type] as Blog['type'] | undefined;
  if (mappedType) {
    andConditions.push({ type: { equals: mappedType } });
  }

  if (dateFrom) {
    andConditions.push({ datePublished: { greater_than_equal: new Date(dateFrom).toISOString() } });
  }
  if (dateTo) {
    andConditions.push({ datePublished: { less_than_equal: new Date(dateTo).toISOString() } });
  }

  const results = await payload.find({
    collection: 'blog',
    limit: 12,
    page,
    sort: '-datePublished',
    depth: 0,
    // Only fields needed by ResultMap cards
    select: {
      id: true,
      title: true,
      type: true,
      readtime: true,
      datePublished: true,
      caption: true,
      content: true,
    },
    where: andConditions.length ? ({ AND: andConditions } as unknown as Where) : undefined,
  });
  return results;
}
