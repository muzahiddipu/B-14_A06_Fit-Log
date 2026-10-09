"use client";

import logo from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { oswald } from "../fonts";
import { useWorkoutStore } from "./WorkoutStore";

const NavBar = () => {
  const pathname = usePathname();
  const { plannedWorkouts, savedWorkouts } = useWorkoutStore();
  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workouts/");
  const isPlanActive = pathname.startsWith("/my-plan");

  const links = (
    <>
      <li>
        <Link
          href="/"
          aria-current={isWorkoutActive ? "page" : undefined}
          className={`rounded-lg px-3 py-2 font-bold transition-colors ${
            isWorkoutActive
              ? "bg-[#C2F800]/10 text-[#C2F800] ring-1 ring-inset ring-[#C2F800]/25 hover:bg-[#C2F800]/15"
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          Workout
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan"
          aria-current={isPlanActive ? "page" : undefined}
          className={`rounded-lg px-3 py-2 font-semibold transition-colors ${
            isPlanActive
              ? "bg-[#C2F800]/10 text-[#C2F800] ring-1 ring-inset ring-[#C2F800]/25"
              : "text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/95 text-white backdrop-blur-xl">
      <div className="navbar relative mx-auto min-h-[76px] max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="navbar-start w-auto min-w-0 flex-1">
          <div className="dropdown dropdown-start lg:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open navigation menu"
              className="btn btn-circle mr-1.5 h-9 w-9 min-h-0 border-0 bg-[#C2F800]/15 text-[#C2F800] shadow-none hover:bg-[#C2F800] hover:text-black sm:mr-3 sm:h-10 sm:w-10"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-10 mt-4 w-60 rounded-2xl border border-white/10 bg-[#171912] p-3 text-gray-100 shadow-xl shadow-black/30"
            >
              {links}
            </ul>
          </div>

          <Link
            href="/"
            aria-label="FitLog home"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#171912] p-1 sm:h-11 sm:w-11">
              <Image
                src={logo}
                alt="FITLOG Logo"
                width={30}
                height={30}
                className="object-contain"
              />
            </span>
            <span
              className={`${oswald.className} text-lg font-black tracking-tight text-white sm:text-xl`}
            >
              FIT<span className="text-[#C2F800]">LOG</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center absolute left-1/2 hidden -translate-x-1/2 lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm">{links}</ul>
        </div>

        <div className="navbar-end w-auto shrink-0 gap-1.5 sm:gap-2">
          <Link
            href="/my-plan?tab=today"
            aria-label={`Open today's plan (${plannedWorkouts.length} workouts)`}
            className="inline-flex min-h-8 items-center gap-1 rounded-full bg-[#C2F800] px-2 text-[11px] font-extrabold text-[#10110B] shadow-[0_4px_14px_rgba(194,248,0,0.16)] transition-colors hover:bg-[#d1ff27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800] sm:min-h-9 sm:gap-1.5 sm:px-3 sm:text-sm"
          >
            <span>Plan</span>
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-black/10 px-1 text-[10px] leading-none sm:h-5 sm:min-w-5 sm:text-xs">
              {plannedWorkouts.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            aria-label={`Open saved workouts (${savedWorkouts.length})`}
            className="inline-flex min-h-8 items-center gap-1 rounded-full border border-white/25 px-2 text-[11px] font-semibold text-gray-200 transition-colors hover:border-[#C2F800]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800] sm:min-h-9 sm:gap-1.5 sm:px-3 sm:text-sm"
          >
            <span>Saved</span>
            <span className="h-4 w-px bg-white/20" aria-hidden="true" />
            <span className="text-white">{savedWorkouts.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
