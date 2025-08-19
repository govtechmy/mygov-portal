'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRightIcon } from '@govtechmy/myds-react/icon';
import { Pill } from '@govtechmy/myds-react/pill';
import {
  SearchBar,
  SearchBarInputContainer,
  SearchBarInput,
  SearchBarClearButton,
  SearchBarSearchButton,
  SearchBarHint,
  SearchBarResults,
  SearchBarResultsItem,
} from '@govtechmy/myds-react/search-bar';
import { searchBarServer } from '@/lib/search';
import { trackSearch, trackButtonClick } from '@/lib/analytics';
import type { Blog } from '@/payload-types';
import { SearchContext } from './searchProvider';

export default function SearchBarClient() {
  const searchCtx = useContext(SearchContext);
  if (!searchCtx) throw new Error('SearchContext must be used within a SearchProvider');
  const { dateRange, type } = searchCtx;
  const [hasFocus, setHasFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Blog[]>([]);
  const hasQuery = query.length > 0;
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const debounceMs = 300;
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let isActive = true;

    // Clear any pending debounce
    if (timerRef.current) window.clearTimeout(timerRef.current);

    // Debounce search and enforce a minimum length to avoid noisy queries
    timerRef.current = window.setTimeout(async () => {
      if (!isActive) return;
      if (!query || query.trim().length < 2) {
        setResults([]);
        return;
      }
      try {
        const res = await searchBarServer(query.trim());
        if (!isActive) return;
        setResults(res?.docs ?? []);
      } catch {
        if (!isActive) return;
        setResults([]);
      }
    }, debounceMs);

    return () => {
      isActive = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [query]);

  return (
    <div className="max-w-[600px] px-4">
      <SearchBar
        size="large"
        onBlur={e => {
          const blurredByChild = e.currentTarget.contains(e.relatedTarget);
          if (blurredByChild) return;
          setHasFocus(false);
        }}
      >
        <SearchBarInputContainer>
          <SearchBarInput
            placeholder="Search by name"
            value={query}
            onValueChange={setQuery}
            onFocus={() => setHasFocus(true)}
          />
          {query && <SearchBarClearButton onClick={() => setQuery('')} />}
          <SearchBarSearchButton
            onClick={() => {
              // Track search event
              if (query.trim()) {
                trackSearch(query.trim(), {
                  search_type: type || 'Semua',
                  has_date_range: !!(dateRange?.from || dateRange?.to),
                });
              }

              const params = new URLSearchParams();
              params.set('q', query);
              if (type && type !== 'Semua') params.set('type', type);
              if (dateRange?.from) params.set('from', dateRange.from.toISOString());
              if (dateRange?.to) params.set('to', dateRange.to.toISOString());
              params.set('page', '1');
              setResults([]);
              setHasFocus(false);
              router.push(`/${locale}/blog?${params.toString()}`);
            }}
          />
          {!hasFocus && (
            <SearchBarHint className="hidden lg:flex">
              Press <Pill size="small">/</Pill> to search
            </SearchBarHint>
          )}
        </SearchBarInputContainer>

        <SearchBarResults open={hasQuery && hasFocus}>
          {hasQuery && !results.length && <p className="text-txt-black-900 text-center">No results found</p>}

          {hasQuery && results.length > 0 && (
            <div
              onMouseDown={e => e.preventDefault()} // prevent blur before click
              className="max-h-[400px] overflow-y-scroll"
            >
              {results.map(item => (
                <SearchBarResultsItem key={item.id} value={item.title} className="cursor-pointer">
                  <button
                    onClick={() => {
                      // Track result click
                      trackButtonClick('search_result_click', {
                        result_title: item.title,
                        result_type: item.type,
                        search_query: query,
                      });
                      router.push(`/${locale}/blog/${item.id}`);
                    }}
                  >
                    <p className="line-clamp-1 flex-1">
                      {item.type} <span className="text-txt-black-500 text-xs">{item.title}</span>
                    </p>
                  </button>
                  <ChevronRightIcon />
                </SearchBarResultsItem>
              ))}
            </div>
          )}
        </SearchBarResults>
      </SearchBar>
    </div>
  );
}
