'use client';

import { createContext, useState, ReactNode, useMemo } from 'react';
import { newsData, NewsItem } from './NewsItemTypes';
import { DateRange } from '@govtechmy/myds-react/daterange-picker'; // import DateRange type

export type AllCategories =
  | 'Semua'
  | 'Kesihatan'
  | 'Kelahiran'
  | 'Pendidikan'
  | 'Pekerjaan'
  | 'Keluarga'
  | 'Kediaman'
  | 'Pengangkutan'
  | 'Bantuan'
  | 'Perjalanan'
  | 'Persaraan'
  | 'Kematian'
  | 'Umum'
  | 'Hebahan';

export type GroupedNews = Record<AllCategories, NewsItem[]>;

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  result: NewsItem[];
  type: AllCategories;
  setType: (type: AllCategories) => void;
  dateRange?: DateRange; // updated type
  setDateRange: (range?: DateRange) => void; // updated type
  showAll: boolean;
  setShowAll: (value: boolean) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<AllCategories>('Semua');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(); // updated type
  const [showAll, setShowAll] = useState<boolean>(true);

  const grouped_news = useMemo(() => {
    const group: GroupedNews = {
      Semua: [],
      Kesihatan: [],
      Kelahiran: [],
      Pendidikan: [],
      Pekerjaan: [],
      Keluarga: [],
      Kediaman: [],
      Pengangkutan: [],
      Bantuan: [],
      Perjalanan: [],
      Persaraan: [],
      Kematian: [],
      Umum: [],
      Hebahan: [],
    };

    for (const news of newsData) {
      group.Semua.push(news);

      switch (news.category) {
        case 'Kesihatan':
          group.Kesihatan.push(news);
          break;
        case 'Kelahiran':
          group.Kelahiran.push(news);
          break;
        case 'Pendidikan':
          group.Pendidikan.push(news);
          break;
        case 'Pekerjaan':
          group.Pekerjaan.push(news);
          break;
        case 'Keluarga':
          group.Keluarga.push(news);
          break;
        case 'Kediaman':
          group.Kediaman.push(news);
          break;
        case 'Pengangkutan':
          group.Pengangkutan.push(news);
          break;
        case 'Bantuan':
          group.Bantuan.push(news);
          break;
        case 'Perjalanan':
          group.Perjalanan.push(news);
          break;
        case 'Persaraan':
          group.Persaraan.push(news);
          break;
        case 'Kematian':
          group.Kematian.push(news);
          break;
        case 'Umum':
          group.Umum.push(news);
          break;
        case 'Hebahan':
          group.Hebahan.push(news);
          break;
      }
    }

    return group;
  }, []);

  const result = useMemo(() => {
    return grouped_news[type]
      .filter(news => news.title.toLowerCase().includes(query.toLowerCase()))
      .filter(news => {
        if (!dateRange?.from || !dateRange?.to) return true;
        const newsDate = new Date(news.date); // assumes date string like "11 Feb 2024"
        return newsDate >= dateRange.from && newsDate <= dateRange.to;
      });
  }, [query, type, grouped_news, dateRange]);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, type, setType, result, dateRange, setDateRange, showAll, setShowAll }}
    >
      {children}
    </SearchContext.Provider>
  );
}
