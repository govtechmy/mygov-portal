"use client";

import Hero from "@/components/layout/hero";
import SearchBarClient from "@/components/layout/searchBarClient";

export default function BlogPage() {
  return (
    <div className="">
      <Hero title="Blog" search={<SearchBarClient />}></Hero>
    </div>
  );
}
