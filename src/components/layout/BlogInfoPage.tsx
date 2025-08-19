'use client';
import Image from 'next/image';
import { Button } from '@govtechmy/myds-react/button';
import {
  ChevronRightIcon,
  ClockIcon,
  EmailIcon,
  FacebookIcon,
  LinkDiagonalIcon,
  PdfIcon,
  PrinterIcon,
  TwitterXIcon,
} from '@govtechmy/myds-react/icon';
import { Blog } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { resolveMediaSrc } from '@/lib/media';
import { formatDateTime } from '@/lib/date';

interface BlogInfoPageProps {
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
  blog: Blog;
}

export default function BlogInfoPage({ blog }: BlogInfoPageProps) {
  return (
    <div className="mx-auto px-[18px] sm:px-[18px] md:px-[24px] lg:px-[24px] xl:px-[24px] max-w-[1328px] py-16 items-center justify-center flex">
      <div className="items-center justify-start flex flex-col max-w-[800px] gap-6">
        <div className="flex self-start items-center gap-1">
          <div className="text-[#71717A]">Blog</div>
          <ChevronRightIcon className="text-[#A1A1AA]" />
          <div className="text-base font-medium">{blog.title.toUpperCase()}</div>
        </div>
        <div className="self-start gap-3 flex flex-col">
          <div className="text-[#15803D]">{blog.type}</div>
          <div className="text-2xl">{blog.title.toUpperCase()}</div>
          <div className="flex items-center gap-5 self-start text-[#71717A]">
            <div className="flex items-center gap-1">
              <ClockIcon></ClockIcon>
              <div>Bacaan {blog.readtime} minit</div>
            </div>
            <div>{formatDateTime(blog.datePublished)}</div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <LinkDiagonalIcon className="m-2" />
            <EmailIcon className="m-2" />
            <FacebookIcon className="m-2" />
            <TwitterXIcon className="m-2" />
          </div>
          <Button variant="default-outline">
            <PrinterIcon />
            Cetak
          </Button>
        </div>
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-[#F4F4F5]">
          <Image
            src={resolveMediaSrc(blog.picture)}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 800px, 100vw"
            priority={false}
          />
        </div>
        <div className="gap-6 flex flex-col">
          <RichText data={blog.content as SerializedEditorState} className="whitespace-pre-line" />
        </div>
        <hr className="border-t border-black my-2 w-full" />
        <div className="self-start">
          <Button variant="default-outline" className="w-[200px] gap-1.5">
            <PdfIcon className="shrink-0" />

            <div className="text-start w-full">
              <div className="max-w-[151px] truncate">22072025_SIARAN_SDDSSDDAS</div>
              <div className="text-[#71717A] text-xs">1.2MB</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
