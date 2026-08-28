import React, { useState, useEffect } from 'react';
import { FiHome, FiBriefcase, FiTarget, FiBarChart2, FiUser, FiZap, FiX } from 'react-icons/fi';
import { LuNetwork } from "react-icons/lu";

const Sidebar = ({ candidate, activeTab, onTabChange, isMobileOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'jobs', label: 'Jobs', icon: FiBriefcase },
    { id: 'skills', label: 'Skills', icon: FiTarget },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
    { id: 'profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-screen w-64 sm:w-72 bg-white border-r-2 border-slate-200 shadow-xl flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        md:translate-x-0
      `}>
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-xl shadow-lg border border-slate-200 md:hidden z-50"
          >
            <FiX className="w-5 h-5 text-slate-700" />
          </button>
        )}

        {/* Logo Section */}
        <div className="p-3 sm:p-4 mt-[1px] border-b-2 border-slate-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <LuNetwork className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                Career Graph
              </h1>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
               Find Your Next Opportunity
              </p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        {candidate && (
          <div className="p-4 sm:p-6 border-b-2 border-slate-200">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ring-2 ring-indigo-300 shadow-md flex-shrink-0">
                <span className="text-indigo-700 font-extrabold text-base sm:text-xl">
                  {candidate.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {candidate.name || 'User'}
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500">
                  Active Candidate
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`
                  w-full flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-xl transition-all 
                  text-sm sm:text-base font-semibold
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md border border-indigo-200' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm'
                  }
                `}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : ''}`} />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 sm:w-2 h-6 sm:h-10 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 shadow-md shadow-indigo-300 flex-shrink-0"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 sm:p-5 border-t-2 border-slate-200">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-3 sm:p-5 shadow-md border border-indigo-200">
            <p className="text-xs sm:text-sm font-extrabold text-indigo-700">💡 Pro Tip</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Complete your profile to get better matches
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;