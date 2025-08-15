"use client";
import { UserIcon, ChevronRightIcon } from "@govtechmy/myds-react/icon";
import { Pill } from "@govtechmy/myds-react/pill";
import {
  SearchBar,
  SearchBarInputContainer,
  SearchBarInput,
  SearchBarClearButton,
  SearchBarSearchButton,
  SearchBarHint,
  SearchBarResults,
  SearchBarResultsList,
  SearchBarResultsItem,
} from "@govtechmy/myds-react/search-bar";
import { useState } from "react";
import { newsData } from "./NewsItemTypes";

export default function SearchBarClient() {
  const [hasFocus, setHasFocus] = useState(false);
  const [query, setQuery] = useState("");
  const hasQuery = query.length > 0;

  const notableMalaysians = newsData;
  const results = notableMalaysians.filter((person) =>
    person.category.toLowerCase().includes(query.toLocaleLowerCase())
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
            onBlur={() => setHasFocus(false)}
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
            <SearchBarResultsList className="max-h-[400px] overflow-y-scroll">
              {results.map((item) => (
                <SearchBarResultsItem
                  key={item.description}
                  value={item.description}
                >
                  <span className="bg-primary-50 text-txt-primary rounded-full p-px">
                    <UserIcon className="size-4" />
                  </span>
                  <p className="line-clamp-1 flex-1">
                    {item.category}{" "}
                    <span className="text-txt-black-500 text-xs">
                      {item.title}
                    </span>
                  </p>
                  <ChevronRightIcon />
                </SearchBarResultsItem>
              ))}
            </SearchBarResultsList>
          )}
        </SearchBarResults>
      </SearchBar>
    </div>
  );
}
