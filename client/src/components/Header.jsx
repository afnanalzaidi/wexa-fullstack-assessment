import React, { useState, useEffect } from "react";
import {
  FiBell,
  FiUser,
  FiZap,
  FiSearch,
  FiMenu,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

const Header = ({
  candidate,
  candidateId,
  setCandidateId,
  title = "Dashboard",
  subtitle = "Career Graph",
  variant = "default",
  onMenuClick,
  isMobileMenuOpen,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [candidateMenuOpen, setCandidateMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white border-b-2 border-slate-200"
      }`}
    >
      <div className="px-3 sm:px-5 md:px-8 py-3 sm:py-4 md:py-5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Section - Page Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Menu Button */}
            {onMenuClick && (
              <button
                onClick={handleMenuToggle}
                className="md:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-all relative"
                aria-label="Toggle menu"
              >
                <FiMenu className="w-5 h-5" />
                {/* Optional: Show active state indicator */}
                {isMobileMenuOpen && (
                  <span className="absolute inset-0 rounded-xl ring-2 ring-indigo-400 ring-offset-2"></span>
                )}
              </button>
            )}

            <div className="flex items-center gap-1 sm:gap-3 min-w-0">
              <span className="text-sm sm:text-base md:text-2xl text-indigo-600 whitespace-nowrap font-extrabold">
                {title}
              </span>
            </div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 flex-shrink-0">
            {/* Notification Bell */}
            <button className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
              <FiBell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            </button>

            {/* Candidate Info Profile Pill */}
            {candidate && (
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 md:pl-4 border-l-2 border-slate-200">
                <div className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ring-2 ring-indigo-300 shadow-md flex-shrink-0">
                  <span className="text-indigo-700 font-extrabold text-xs sm:text-sm">
                    {candidate.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                    {candidate.name || "User"}
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold text-indigo-600">
                    Active Candidate
                  </p>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCandidateMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm transition-all hover:border-indigo-300 hover:bg-indigo-50/50"
                  >
                    <span className="text-xs font-bold text-slate-700">
                      Switch
                    </span>

                    <FiChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        candidateMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {candidateMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                      <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Candidate
                      </p>

                      {[
                        { id: "candidate1", name: "Afnan" },
                        { id: "candidate2", name: "Musa" },
                        { id: "candidate3", name: "Omar" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setCandidateId(item.id);
                            setCandidateMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            candidateId === item.id
                              ? "bg-indigo-50 font-bold text-indigo-700"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{item.name}</span>

                          {candidateId === item.id && (
                            <FiCheck className="h-4 w-4 text-indigo-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User Icon - Visible on very small screens if no candidate name */}
            {!candidate && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ring-2 ring-indigo-300 shadow-md">
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
