import { useContext, useState, useEffect } from 'react';
import { SearchContext } from './searchProvider';
import { ClockIcon } from '@govtechmy/myds-react/icon';
import { AutoPagination } from '@govtechmy/myds-react/pagination';
import { useRouter } from 'next/navigation';

export default function ResultMap() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('SearchContext must be used within a SearchProvider');
  const router = useRouter();
  const { result } = context;
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    setPage(1);
  }, [result]);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResult = result.slice(startIndex, endIndex);

  return (
    <div>
      <div className="icon-custom-grid-cols grid gap-6 py-8">
        {paginatedResult.map((news, index) => (
          <div
            key={startIndex + index}
            className="border shadow-sm border-[#E4E4E7] rounded-md p-6 flex flex-col hover:cursor-pointer"
            onClick={() => router.push(`blog/${news.id}`)}
          >
            <div className="flex gap-2 items-center">
              <div className="text-sm font-semibold text-[#6B6B74]">
                {news.category}
              </div>
              <div className="border-l  border-[#D4D4D8] h-4"></div>
              <div className="flex items-center gap-1 text-[#71717A]">
                <ClockIcon />
                <div className="text-sm">Bacaan {news.readTime}</div>
              </div>
            </div>

            <div className="flex justify-between py-2 gap-4.5">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-base">{news.title}</div>
                <div className="text-sm">{news.description}</div>
              </div>
              {news.svg && (
                <div className="text-[#3F3F46] rounded-lg !border-2 !border-white !shadow-sm shrink-0 w-24 h-24 items-center justify-center flex">
                  {news.svg}
                </div>
              )}
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm text-[#]">{news.date}</div>
          </div>
        ))}
      </div>

      <AutoPagination
        page={page}
        limit={limit}
        count={result.length}
        type="default"
        onPageChange={setPage}
      />
    </div>
  );
}
