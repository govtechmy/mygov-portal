"use client";
import { Tabs, TabsList, TabsTrigger } from "@govtechmy/myds-react/tabs";
import { clx } from "@govtechmy/myds-react/utils";
import { useContext } from "react";
import { SearchContext } from "./searchProvider";
import { NewsCategory } from "./NewsItemTypes";

export default function TabFiltered() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("SearchContext must be used within a SearchProvider");

  const { setType } = context;
  return (
    <Tabs
      size="small"
      variant="pill"
      defaultValue="Semua"
      onValueChange={(value) => setType(value as NewsCategory)}
    >
      <TabsList
        width="full"
        className={clx(
          "no-scrollbar flex-grow items-center justify-center overflow-x-scroll scroll-smooth text-nowrap max-md:justify-start"
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
