"use client";

import { useState } from "react";
import { newsData } from "./NewsItemTypes";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@govtechmy/myds-react/icon";
import { Pill } from "@govtechmy/myds-react/pill";
import {
  SearchBar,
  SearchBarInputContainer,
  SearchBarInput,
  SearchBarClearButton,
  SearchBarSearchButton,
  SearchBarHint,
  SearchBarResults,
  SearchBarResultsItem,
} from "@govtechmy/myds-react/search-bar";

export default function SearchBarClient() {
  const [hasFocus, setHasFocus] = useState(false);
  const [query, setQuery] = useState("");
  const hasQuery = query.length > 0;
  const router = useRouter();

  const results = newsData.filter((item) =>
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-[600px] px-4">
      <SearchBar
        size="large"
        onBlur={(e) => {
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
          {query && <SearchBarClearButton onClick={() => setQuery("")} />}
          <SearchBarSearchButton />
          {!hasFocus && (
            <SearchBarHint className="hidden lg:flex">
              Press <Pill size="small">/</Pill> to search
            </SearchBarHint>
          )}
        </SearchBarInputContainer>

        <SearchBarResults open={hasQuery && hasFocus}>
          {hasQuery && !results.length && (
            <p className="text-txt-black-900 text-center">No results found</p>
          )}

          {hasQuery && results.length > 0 && (
            <div
              onMouseDown={(e) => e.preventDefault()} // prevent blur before click
              className="max-h-[400px] overflow-y-scroll"
            >
              {results.map((item) => (
                <SearchBarResultsItem
                  key={item.id}
                  value={item.description}
                  className="cursor-pointer"
                >
                  <button onClick={() => router.push(`blog/${item.id}`)}>
                    <p className="line-clamp-1 flex-1">
                      {item.category}{" "}
                      <span className="text-txt-black-500 text-xs">
                        {item.title}
                      </span>
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
