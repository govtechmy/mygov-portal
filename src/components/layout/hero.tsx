import HeroPattern from "./heroPattern";

export default function Hero({
  title,
  search,
}: {
  title: string;
  subtitle?: string;
  search?: React.ReactNode;
  splaskPrivacyPolicy?: boolean;
}) {
  return (
    <section className="relative border-b border-outline-200">
      <div className="absolute -z-10 flex h-full w-full justify-center overflow-x-hidden">
        <HeroPattern className="absolute" />
      </div>

      <div className=" flex flex-col gap-6 py-16">
        <h1 className="text-center font-poppins font-semibold">
          <div className="text-[2rem]/10"> {title}</div>
        </h1>
        <div className="justify-center items-center flex w-full">
          <div className="flex-1 max-w-[600px]">{search}</div>
        </div>
      </div>
    </section>
  );
}
