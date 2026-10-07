import logo from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const links = (
    <>
      <li>
        <a
          href="#workouts"
          className="rounded-lg px-4 py-2 font-semibold text-current transition-colors hover:bg-[#C2F800]/10 hover:text-[#C2F800]"
        >
          Workouts
        </a>
      </li>

      <li>
        <a
          href="#plan"
          className="rounded-lg px-4 py-2 font-semibold text-current transition-colors hover:bg-[#C2F800]/10 hover:text-[#C2F800]"
        >
          My Plan
        </a>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/95 text-white backdrop-blur-xl">
      <div className="navbar mx-auto min-h-[76px] max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown dropdown-start lg:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open navigation menu"
              className="btn btn-circle mr-3 border-0 bg-[#C2F800]/15 text-[#C2F800] shadow-none hover:bg-[#C2F800] hover:text-black"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            className="flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#171912] p-1.5">
              <Image
                src={logo}
                alt="FITLOG Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              FIT<span className="text-[#C2F800]">LOG</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm">{links}</ul>
        </div>

        <div className="navbar-end gap-2 sm:gap-3">
          <button className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex">
            Saved
          </button>

          <button className="rounded-xl bg-[#C2F800] px-4 py-2.5 text-sm font-extrabold text-black shadow-[0_5px_18px_rgba(194,248,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b8ed00] hover:shadow-[0_8px_22px_rgba(194,248,0,0.32)] active:translate-y-0 sm:px-5">
            View plan
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
