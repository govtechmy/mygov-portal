import { useContext, useState, useEffect, useMemo, useRef } from 'react';
import { SearchContext } from './searchProvider';
import { ClockIcon } from '@govtechmy/myds-react/icon';
import { AutoPagination } from '@govtechmy/myds-react/pagination';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type { Blog } from '@/payload-types';
import { lexicalToPlainText } from '@/lib/lexical';
import { searchResultMap } from '@/lib/search';
import type { PaginatedDocs } from 'payload';

interface ResultMapProps {
  initialDocs?: Blog[];
  initialTotal?: number;
}

export default function ResultMap({ initialDocs, initialTotal }: ResultMapProps) {
  const context = useContext(SearchContext);
  if (!context) throw new Error('SearchContext must be used within a SearchProvider');
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Blog[]>(initialDocs ?? []);
  const [total, setTotal] = useState(initialTotal ?? (initialDocs ? initialDocs.length : 0));
  const [isLoading, setIsLoading] = useState(false);

  const limit = 12;
  const debounceMs = 200;
  const timerRef = useRef<number | undefined>(undefined);

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
    if (timerRef.current) window.clearTimeout(timerRef.current);

    // Set loading state when search parameters change
    if (!showAll || pageParam !== 1 || !initialDocs || initialDocs.length === 0) {
      setIsLoading(true);
    }

    timerRef.current = window.setTimeout(async () => {
      if (!isActive) return;
      // Use server-fetched initial results for the default view (page 1, show all)
      if (showAll && pageParam === 1 && initialDocs && initialDocs.length > 0) {
        setItems(initialDocs);
        setTotal(initialTotal ?? initialDocs.length);
        setIsLoading(false);
        return;
      }
      const res = (await searchResultMap(q, type, from, to, pageParam)) as PaginatedDocs<Blog>;
      if (!isActive) return;
      setItems(res?.docs ?? []);
      // totalDocs in Payload paginated response
      // fall back to docs length if unavailable
      // @ts-expect-error allow different shapes
      setTotal(res?.totalDocs ?? res?.total ?? (res?.docs ? res.docs.length : 0));
      setIsLoading(false);
    }, debounceMs);
    return () => {
      isActive = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q, type, from, to, pageParam, showAll, initialDocs, initialTotal]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="border shadow-sm border-[#E4E4E7] rounded-md p-6 flex flex-col animate-pulse">
      <div className="flex gap-2 items-center">
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="border-l border-[#D4D4D8] h-4"></div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex justify-between py-2 gap-4.5">
        <div className="flex flex-col gap-2">
          <div className="w-48 h-5 bg-gray-200 rounded"></div>
          <div className="w-64 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="w-24 h-4 bg-gray-200 rounded"></div>
    </div>
  );

  function ResultCard({ item, onClick }: { item: Blog; onClick: () => void }) {
    const excerpt = useMemo(() => {
      if (item.caption && item.caption.trim().length > 0) return item.caption;
      // Avoid heavy work if content missing
      if (!item.content) return '';
      return lexicalToPlainText(item.content).slice(0, 180);
    }, [item.caption, item.content]);

    const formattedDate = useMemo(() => {
      return new Date(item.datePublished).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }, [item.datePublished]);

    return (
      <div
        key={item.id}
        className="border shadow-sm border-[#E4E4E7] rounded-md p-6 flex flex-col hover:cursor-pointer"
        onClick={onClick}
      >
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-[#6B6B74]">{item.type}</div>
          <div className="border-l  border-[#D4D4D8] h-4"></div>
          <div className="flex items-center gap-1 text-[#71717A]">
            <ClockIcon />
            <div className="text-sm">Bacaan {item.readtime} Minit</div>
          </div>
        </div>

        <div className="flex justify-between py-2 gap-4.5">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-base">{item.title}</div>
            <div className="text-sm">{excerpt}</div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="text-sm text-[#]">{formattedDate}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="icon-custom-grid-cols grid gap-6 py-8">
        {isLoading
          ? // Show loading skeletons
            Array.from({ length: limit }).map((_, index) => <LoadingSkeleton key={index} />)
          : // Show actual results
            items.map(item => <ResultCard key={item.id} item={item} onClick={() => router.push(`blog/${item.id}`)} />)}
      </div>

      <AutoPagination
        page={page}
        limit={limit}
        count={total}
        type="default"
        onPageChange={nextPage => {
          setIsLoading(true); // Set loading when page changes
          setPage(nextPage);
          const params = new URLSearchParams(Array.from(searchParams.entries()));
          params.set('page', String(nextPage));
          router.push(`/${locale}/blog?${params.toString()}`);
        }}
      />
    </div>
  );
}
