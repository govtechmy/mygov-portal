import { useContext, useState, useEffect } from 'react';
import { SearchContext } from './searchProvider';
import { ClockIcon } from '@govtechmy/myds-react/icon';
import { AutoPagination } from '@govtechmy/myds-react/pagination';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type { Blog } from '@/payload-types';
import { searchResultMap } from '@/lib/search';
import type { PaginatedDocs } from 'payload';

interface ResultMapProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function ResultMap({ messages }: ResultMapProps) {
  const context = useContext(SearchContext);
  if (!context) throw new Error('SearchContext must be used within a SearchProvider');
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);

  const limit = 12;

  const q = searchParams.get('q') ?? '';
  const type = searchParams.get('type') ?? 'Semua';
  const from = searchParams.get('from') ?? '';
  const to = searchParams.get('to') ?? '';
  const pageParam = Number(searchParams.get('page') ?? '1');
  const showAll = !q && !from && !to && type === 'Semua';

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    let isActive = true;
    const run = async () => {
      const res = (await searchResultMap(q, type, from, to, pageParam)) as PaginatedDocs<Blog>;
      if (!isActive) return;
      setItems(res?.docs ?? []);
      // totalDocs in Payload paginated response
      // fall back to docs length if unavailable
      // @ts-expect-error allow different shapes
      setTotal(res?.totalDocs ?? res?.total ?? (res?.docs ? res.docs.length : 0));
      console.log(res);
    };
    run();
    return () => {
      isActive = false;
    };
  }, [q, type, from, to, pageParam, showAll]);

  return (
    <div>
      <div className="icon-custom-grid-cols grid gap-6 py-8">
        {items.map(item => (
          <div
            key={item.id}
            className="border shadow-sm border-[#E4E4E7] rounded-md p-6 flex flex-col hover:cursor-pointer"
            onClick={() => router.push(`blog/${item.id}`)}
          >
            <div className="flex gap-2 items-center">
              <div className="text-sm font-semibold text-[#6B6B74]">{item.type}</div>
              <div className="border-l  border-[#D4D4D8] h-4"></div>
              <div className="flex items-center gap-1 text-[#71717A]">
                <ClockIcon />
                <div className="text-sm">Bacaan {item.readtime}</div>
              </div>
            </div>

            <div className="flex justify-between py-2 gap-4.5">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-base">{item.title}</div>
                {item.caption && <div className="text-sm">{item.caption}</div>}
              </div>
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm text-[#]">{new Date(item.datePublished).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      <AutoPagination
        page={page}
        limit={limit}
        count={total}
        type="default"
        onPageChange={nextPage => {
          setPage(nextPage);
          const params = new URLSearchParams(Array.from(searchParams.entries()));
          params.set('page', String(nextPage));
          router.push(`/${locale}/blog?${params.toString()}`);
        }}
      />
    </div>
  );
}
