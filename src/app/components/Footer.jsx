import Image from "next/image";
import footerLogo from "../../assets/SVG.png";

import { oswald } from "../fonts";

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#0a0a0a] px-4 pb-6 pt-4 text-white sm:px-8 sm:pb-8 lg:px-12">
      <hr className="m-0 h-px min-h-0 w-full border-0 bg-[#C2F800]/70" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <Image
              src={footerLogo}
              alt="FitLog"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span
              className={`${oswald.className} text-lg font-black tracking-tight text-white sm:text-xl`}
            >
              FIT<span className="text-[#C2F800]">LOG</span>
            </span>
          </div>
          <p className="text-xs leading-5 text-gray-400 sm:text-sm">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
