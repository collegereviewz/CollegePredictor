// Navbar.tsx
import logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img src={logo} className="w-8 h-8 rounded-xl" alt="CollegeReviewz logo" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold italic">
                CollegeReviewz
              </span>
              <span className="text-[11px] text-slate-400 italic">
                Elevate Your Education
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/60 bg-emerald-500/15 px-3 py-1 text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              B.Tech
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-slate-200">
              2025 data
            </span>
            <button className="ml-2 inline-flex items-center rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-500 transition">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
