'use client';
import { Tabs, TabsList, TabsTrigger } from '@govtechmy/myds-react/tabs';
import { clx } from '@govtechmy/myds-react/utils';
import { useContext } from 'react';
import { SearchContext } from './searchProvider';
import { NewsCategory } from './NewsItemTypes';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function TabFiltered() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('SearchContext must be used within a SearchProvider');
  const { setType } = context;
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type') ?? 'Semua';
  return (
    <Tabs
      size="small"
      variant="pill"
      value={currentType}
      onValueChange={value => {
        setType(value as NewsCategory);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (value === 'Semua') {
          params.delete('type');
        } else {
          params.set('type', value);
        }
        params.set('page', '1');
        router.push(`/${locale}/blog?${params.toString()}`);
      }}
    >
      <TabsList
        width="full"
        className={clx(
          'no-scrollbar flex-grow items-center justify-center overflow-x-scroll scroll-smooth text-nowrap max-md:justify-start'
        )}
      >
        <TabsTrigger value="Semua">Semua</TabsTrigger>
        <TabsTrigger value="Kesihatan">Kesihatan</TabsTrigger>
        <TabsTrigger value="Kelahiran">Kelahiran</TabsTrigger>
        <TabsTrigger value="Pendidikan">Pendidikan</TabsTrigger>
        <TabsTrigger value="Pekerjaan">Pekerjaan</TabsTrigger>
        <TabsTrigger value="Keluarga">Keluarga</TabsTrigger>
        <TabsTrigger value="Kediaman">Kediaman</TabsTrigger>
        <TabsTrigger value="Pengangkutan">Pengangkutan</TabsTrigger>
        <TabsTrigger value="Bantuan">Bantuan</TabsTrigger>
        <TabsTrigger value="Perjalanan">Perjalanan</TabsTrigger>
        <TabsTrigger value="Persaraan">Persaraan</TabsTrigger>
        <TabsTrigger value="Kematian">Kematian</TabsTrigger>
        <TabsTrigger value="Umum">Umum</TabsTrigger>
        <TabsTrigger value="Hebahan">Hebahan</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
