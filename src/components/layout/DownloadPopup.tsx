'use client';

import { Dialog, DialogBody, DialogTitle } from '@govtechmy/myds-react/dialog';
import Link from 'next/link';
import Image from 'next/image';

interface DownloadPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function DownloadPopup({ open, onClose }: DownloadPopupProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v: boolean) => {
        if (!v) onClose();
      }}
    >
      {/* We build our own card so we can match Figma exactly */}
      <DialogBody
        onDismiss={onClose}
        className="lg:h-[339.54px] justify-center"
      >
        <DialogTitle></DialogTitle>
        <div className="relative rounded-2xl shadow-xl  mx-auto p-6 lg:p-12  ">
          {/* Content */}
          <div className="grid grid-cols-1 lg:flex items-center gap-6 ">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 lg">
              <div className="text-2xl font-semibold  text-black">
                Muat turun aplikasi MyGov Malaysia melalui platform berikut
              </div>

              {/* Store buttons */}
              <div className="flex gap-2.5">
                <StoreButtons />
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end ">
              <div
                className="absolute bottom-0 translate-y-2 lg:translate-y-4 w-[260px] h-[48px] rounded-full
                              bg-gradient-to-b from-[#4FAAFF] to-[#2E82FF] shadow-[0_8px_24px_rgba(46,130,255,0.35)]"
              />
              {/* phone */}
              <img
                src="/images/download_.png"
                alt="Aplikasi"
                className="relative "
              />
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

function StoreButtons() {
  return (
    <>
      <Link href="https://play.google.com/store/apps/details?id=my.gov.onegovappstore.jdn&hl=en">
        <div className="flex bg-black h-[44px] lg:w-32 px-3 items-center gap-2 rounded-md border border-[#A6A6A6] text-white shadow-md transition-shadow hover:shadow-lg">
          <Image
            src="/home/first_section/Playstore.png"
            alt="Google Play"
            width={21}
            height={24}
          />
          <div className="flex flex-col text-[10px] leading-tight ">
            <span>Muat Turun di</span>
            <span className="text-[12px] font-semibold">Google Play</span>
          </div>
        </div>
      </Link>

      <Link href="https://apps.apple.com/my/app/mygov-malaysia/id6502623525">
        <div className="flex bg-black h-[44px] lg:w-32 px-3 items-center gap-2 rounded-md border border-[#A6A6A6] text-white shadow-md transition-shadow hover:shadow-lg">
          <Image
            src="/home/first_section/Apple.png"
            alt="App Store"
            width={21}
            height={24}
          />
          <div className="flex flex-col text-[10px] leading-tight">
            <span>Muat Turun di</span>
            <span className="text-[12px] font-semibold">App Store</span>
          </div>
        </div>
      </Link>
    </>
  );
}
