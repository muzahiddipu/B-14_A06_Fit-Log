import Image from "next/image";
import bannerImage from "../../assets/banner.png";
import { oswald } from "../fonts";

const Banner = () => {
  return (
    <main className="relative isolate overflow-hidden bg-[linear-gradient(112deg,#0a0a0a_0%,#101407_55%,#0a0a0a_100%)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <section className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl grid-cols-1 items-center gap-6 px-4 py-10 sm:gap-8 sm:px-8 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:px-12">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#C2F800]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C2F800]">
              Workout library
            </span>
          </div>

          <h1
            className={`${oswald.className} text-3xl leading-[1.06] font-black sm:text-5xl sm:leading-[1.03] md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl`}
          >
            Train with intent.
            <span className="mt-2 block text-gray-400">Log every set.</span>
          </h1>

          <p
            className={` mt-5 max-w-xl text-base leading-7 text-gray-300 sm:mt-7 sm:text-lg sm:leading-8`}
          >
            FitLog is a focused gym companion: choose a lift, build today&apos;s
            plan, and watch your work add up.
          </p>

          <button
            type="button"
            className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-xl bg-[#C2F800] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#10110B] shadow-[0_8px_28px_rgba(194,248,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#d1ff27] hover:shadow-[0_12px_32px_rgba(194,248,0,0.3)] active:translate-y-0 sm:mt-8 sm:gap-5 sm:px-6 sm:py-3 sm:text-sm"
          >
            Browse workouts
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
            >
              <path
                d="M4 12h15m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center lg:justify-end">
          <Image
            src={bannerImage}
            alt="Athlete training on a seated exercise machine"
            priority
            className="relative z-10 h-auto w-full max-w-[440px] object-contain drop-shadow-[0_24px_35px_rgba(0,0,0,0.45)]"
          />
        </div>
      </section>
    </main>
  );
};

export default Banner;
