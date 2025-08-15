"use client";

import DatePickerClient from "@/components/layout/DatePickerClient";
import Hero from "@/components/layout/hero";
import ResultMap from "@/components/layout/ResultMap";
import SearchBarClient from "@/components/layout/searchBarClient";
import { SearchProvider } from "@/components/layout/searchProvider";
import TabFiltered from "@/components/layout/tabFiltered";

export default function BlogPage() {
  return (
    <SearchProvider>
      <Hero
        title="Blog"
        search={<SearchBarClient />}
        datepicker={<DatePickerClient />}
      ></Hero>
      <div className="mx-auto px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] py-16">
        <TabFiltered />
        <ResultMap />
      </div>
    </SearchProvider>
  );
}
