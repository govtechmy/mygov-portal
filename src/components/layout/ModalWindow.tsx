import { Button } from '@govtechmy/myds-react/button';
import {
  Dialog,
  DialogTrigger,
  DialogBody,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@govtechmy/myds-react/dialog';
import Link from 'next/link';
import Image from 'next/image';

interface ModalWindowProps {
  downloads: React.ReactNode;
  messages: ReturnType<typeof import('@/lib/i18n').getMessages>;
}

export default function ModalWindow({ downloads, messages }: ModalWindowProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary-fill">{downloads}</Button>
      </DialogTrigger>

      <DialogBody className="lg:!w-[585px] lg:!max-w-[585px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogContent className="flex flex-row flex-wrap w-full items-center justify-center">
          <div className="flex-[200px] w-[400px]">
            <div className="font-semibold text-xl text-center pb-6">
              Muat turun aplikasi MyGov Malaysia melalui platform berikut
            </div>

            <div className="justify-center items-center flex flex-col gap-2">
              <Link href="https://apps.apple.com/my/app/mygov-malaysia/id6502623525">
                <div className="flex bg-black h-[35px] w-[120px] items-center gap-2 rounded-md border border-[#A6A6A6] p-2 text-white shadow-md transition-shadow hover:shadow-lg">
                  <Image src="/home/first_section/Apple.png" alt="App Store" width={21} height={24} />
                  <div className="flex flex-col text-[7px] lg:text-[10px]">
                    <span> {messages.homepg.herosection.buttondownload}</span>
                    <span className="font-semibold"> {messages.homepg.herosection.buttonapple}</span>
                  </div>
                </div>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=my.gov.onegovappstore.jdn&hl=en">
                <div className="flex bg-black h-[35px] w-[120px] items-center gap-2 rounded-md border border-[#A6A6A6] p-2 text-white shadow-md transition-shadow hover:shadow-lg">
                  <Image src="/home/first_section/Playstore.png" alt="Google Play" width={21} height={24} />
                  <div className="flex flex-col text-[7px] lg:text-[10px]">
                    <span> {messages.homepg.herosection.buttondownload}</span>
                    <span className="font-semibold">{messages.homepg.herosection.buttongoogle}</span>
                  </div>
                </div>
              </Link>
              <Link href="https://appgallery.huawei.com/app/C113752801">
                <div className="flex bg-black h-[35px] w-[120px] items-center gap-2 rounded-md border border-[#A6A6A6] p-2 text-white shadow-md transition-shadow hover:shadow-lg">
                  <Image src="/home/first_section/Huawei.png" alt="App Store" width={21} height={24} />
                  <div className="flex flex-col text-[7px] lg:text-[10px]">
                    <span> {messages.homepg.herosection.buttondownload}</span>
                    <span className="font-semibold"> {messages.homepg.herosection.buttonhuawei}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex-[200px] w-[400px] justify-center h-full pt-10">
            <Image src="/images/download.png" width={300} height={350} alt="download" />
          </div>
        </DialogContent>

        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogBody>
    </Dialog>
  );
}
