import React, { useState } from "react";
import { useJobs } from "./hooks/useJobs";
import Header from "./components/Header";
import { JobCard } from "./components/JobCard";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import SkillCard from "./components/SkillCard";
import {
  FiBriefcase,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiUser,
  FiBarChart2,
  FiMenu,
  FiX,
} from "react-icons/fi";

function App() {
  const {
    candidate,
    jobs,
    candidateSkills,
    skillOpportunities,
    loading,
    error,
    selectedJob,
    skillGap,
    detailsLoading,
    detailsError,
    loadSkillGap,
    goBack,
  } = useJobs();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPageTitle = (tab) => {
    const titles = {
      dashboard: { title: "Dashboard", subtitle: "Career Graph" },
      jobs: { title: "Job Opportunities", subtitle: "Career Graph" },
      skills: { title: "Skills Matrix", subtitle: "Career Graph" },
      analytics: { title: "Career Insights", subtitle: "Career Graph" },
      profile: { title: "Profile Overview", subtitle: "Career Graph" },
    };
    return titles[tab] || titles.dashboard;
  };

  // Handle sidebar navigation from details page
  const handleTabChange = (tabId) => {
    if (selectedJob && typeof goBack === "function") {
      goBack();
    }
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu - SINGLE FUNCTION
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-indigo-600 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Loading your dashboard...
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Analyzing your skills and matching with jobs
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !selectedJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 sm:p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100">
            <span className="text-3xl font-bold text-red-500">!</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Job Details View
  if (selectedJob) {
    const missingSkills = skillGap?.missingSkills || [];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {/* Sidebar - Hidden on mobile, shown when menu open */}
        <div
          className={`${
            isMobileMenuOpen ? "fixed inset-0 z-50" : "hidden"
          } md:relative md:block md:z-auto`}
        >
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="relative z-50 w-72 h-full md:w-64 lg:w-72">
            <Sidebar
              candidate={candidate}
              activeTab="dashboard"
              onTabChange={handleTabChange}
            />
            {/* Close button for mobile */}
          </div>
        </div>

        <main className="flex-1 w-full md:ml-0">
          <Header candidate={candidate} variant="minimal" />

          <div className="p-3 sm:p-4 md:p-6 md:h-[650px] overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={goBack}
                className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-white text-slate-700 font-extrabold text-xs sm:text-sm rounded-xl border-2 border-slate-200 shadow-md hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
                Back to recommendations
              </button>

              {/* Job Header */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-md mb-4 sm:mb-6 border-2 border-indigo-500">
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-3 sm:gap-4">
                  <div className="w-full sm:w-auto">
                    <span className="text-xs font-extrabold text-indigo-100 bg-white/20 backdrop-blur px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      {selectedJob.company}
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mt-2 sm:mt-3 tracking-tight">
                      {selectedJob.title}
                    </h1>
                    <span className="inline-block mt-2 sm:mt-3 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-extrabold">
                      {selectedJob.level}
                    </span>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-center w-full sm:w-auto min-w-[100px] sm:min-w-[120px] border border-white/30 shadow-lg">
                    <p className="text-3xl sm:text-4xl font-extrabold">
                      {selectedJob.matchPercentage}%
                    </p>
                    <p className="text-xs font-bold text-indigo-100 uppercase tracking-wider mt-0.5">
                      Match Score
                    </p>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-indigo-100 font-medium max-w-2xl leading-relaxed text-xs sm:text-sm">
                  {selectedJob.description}
                </p>
              </div>

              {/* Match Score Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 border-slate-200 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Overall Match
                    </p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                      {selectedJob.matchPercentage}%
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Skill Alignment
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                      <span className="font-extrabold text-indigo-600">
                        {selectedJob.matchingSkills}
                      </span>{" "}
                      of{" "}
                      <span className="font-extrabold text-slate-900">
                        {selectedJob.totalRequiredSkills}
                      </span>{" "}
                      skills match
                    </p>
                  </div>
                </div>
                <div className="h-3 sm:h-3.5 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 shadow-sm"
                    style={{ width: `${selectedJob.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Skills Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Candidate Skills */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
                    <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
                      <FiTarget className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-600" />
                      Your Skills
                    </h3>
                    <span className="px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-extrabold border border-emerald-200 shadow-sm">
                      {candidateSkills.length} available
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-3 max-h-[320px] overflow-y-auto pr-1">
                    {candidateSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-50 rounded-xl border-2 border-slate-200"
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xs sm:text-sm font-extrabold shadow-md flex-shrink-0">
                          ✓
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                            {skill.name}
                          </p>
                          <p className="text-[10px] sm:text-xs font-bold text-slate-500 truncate">
                            {skill.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing / Gap Skills */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
                    <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
                      <FiTrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-amber-500" />
                      Skills to Develop
                    </h3>
                    <span className="px-2 sm:px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-extrabold border border-amber-200 shadow-sm">
                      {missingSkills.length} missing
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-3 max-h-[320px] overflow-y-auto pr-1">
                    {detailsLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="w-8 h-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
                      </div>
                    ) : missingSkills.length === 0 ? (
                      <div className="text-center p-4 sm:p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-200 shadow-inner">
                        <p className="text-2xl sm:text-3xl mb-2">🎉</p>
                        <p className="font-extrabold text-emerald-900 text-xs sm:text-sm">
                          Perfect Match!
                        </p>
                        <p className="text-[10px] sm:text-xs font-semibold text-emerald-700 mt-1">
                          You have all the required skills for this position.
                        </p>
                      </div>
                    ) : (
                      missingSkills.map((skill) => (
                        <div
                          key={
                            typeof skill === "string"
                              ? skill
                              : skill.id || skill.name
                          }
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-amber-50/50 rounded-xl border-2 border-amber-200 shadow-sm"
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white text-xs sm:text-sm font-extrabold shadow-md flex-shrink-0">
                            !
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                              {typeof skill === "string" ? skill : skill.name}
                            </p>
                            <p className="text-[10px] sm:text-xs font-bold text-slate-500 truncate">
                              {skill.category || "Skill Gap"}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Dashboard View
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardContent();
      case "jobs":
        return renderJobsContent();
      case "skills":
        return renderSkillsContent();
      case "analytics":
        return renderAnalyticsContent();
      case "profile":
        return renderProfileContent();
      default:
        return renderDashboardContent();
    }
  };

  // Dashboard
  const renderDashboardContent = () => {
    const totalOpportunities = skillOpportunities.reduce(
      (total, skill) => total + skill.jobsUnlocked,
      0,
    );

    return (
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-4 sm:py-5 shadow-md gap-3 sm:gap-0">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              Good morning, {candidate?.name || "User"}
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Here's what's happening with your career today
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold text-indigo-700">
              Career Dashboard
            </span>
          </div>
        </div>

        {/* Master Container for Stats and Skills */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-md mb-4 sm:mb-6 md:mb-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Jobs Available
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">
                {jobs.length}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Match Rate
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1 sm:mt-2">
                {Math.round(
                  jobs.reduce((acc, j) => acc + j.matchPercentage, 0) /
                    jobs.length,
                ) || 0}
                %
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tracked Skills
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">
                {candidateSkills.length}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Opportunities
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">
                {totalOpportunities}
              </p>
            </div>
          </div>

          {/* Skill Opportunities Section */}
          {skillOpportunities.length > 0 && (
            <div className="pt-4 sm:pt-6 border-t-2 border-slate-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Skills to develop
                </h2>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  {skillOpportunities.length} skills available
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {skillOpportunities.slice(0, 4).map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-slate-50 rounded-2xl p-3 sm:p-4 border-2 border-slate-200 shadow-sm hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                          {skill.name}
                        </p>
                        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5 truncate">
                          {skill.category}
                        </p>
                      </div>
                      <span className="px-2 sm:px-2.5 py-1 bg-indigo-100 text-indigo-700 font-extrabold text-[10px] sm:text-xs rounded-full border border-indigo-200 shadow-sm flex-shrink-0 ml-2">
                        +{skill.jobsUnlocked}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Master Container for Recommended Jobs */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-md mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Recommended jobs
            </h2>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {jobs.length} matches
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 text-center border-2 border-slate-200 shadow-sm">
                <p className="text-slate-500 font-semibold text-xs sm:text-sm">
                  No jobs found
                </p>
              </div>
            ) : (
              jobs.slice(0, 4).map((job) => (
                <div
                  key={job.jobId}
                  className="bg-slate-50 rounded-2xl p-4 sm:p-6 border-2 border-slate-200 shadow-sm hover:border-indigo-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] sm:text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 sm:px-3 py-1 rounded-full border border-indigo-200">
                          {job.company}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 bg-slate-100 rounded-full text-slate-700 border border-slate-200">
                          {job.level}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 line-clamp-2 sm:truncate">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-center sm:text-right">
                        <p className="text-lg sm:text-xl font-extrabold text-indigo-600">
                          {job.matchPercentage}%
                        </p>
                        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                          match
                        </p>
                      </div>
                      <button
                        onClick={() => loadSkillGap(job)}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-extrabold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-200 whitespace-nowrap"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {jobs.length > 4 && (
              <button
                onClick={() => {
                  setActiveTab("jobs"); 
                  setIsMobileMenuOpen(false); 
                }}
                className="w-full text-center py-2.5 sm:py-3 text-xs sm:text-sm text-indigo-600 font-extrabold hover:text-indigo-800 transition bg-slate-50 rounded-xl border-2 border-dashed border-indigo-200 shadow-sm mt-2 sm:mt-4 hover:border-indigo-400 hover:bg-indigo-50"
              >
                View all {jobs.length} jobs →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Jobs
  const renderJobsContent = () => {
    const displayedJobs = showAllJobs ? jobs : jobs.slice(0, 5);

    return (
      <div className=" max-w-7xl mx-auto">
        {/* Header section */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-4 sm:py-5 shadow-md gap-3 sm:gap-0">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              Job Opportunities
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400">
              {jobs.length} active positions matched to your skill profile
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold text-indigo-700">
              {jobs.length} Jobs
            </span>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-md mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              All Job Opportunities
            </h2>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {jobs.length} total
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {jobs.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 text-center border-2 border-slate-200 shadow-sm">
                <p className="text-slate-500 font-semibold text-xs sm:text-sm">
                  No jobs available
                </p>
              </div>
            ) : (
              <>
                {displayedJobs.map((job) => (
                  <div
                    key={job.jobId}
                    className="bg-slate-50 rounded-2xl p-4 sm:p-6 border-2 border-slate-200 shadow-sm hover:border-indigo-300 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 mb-2">
                          <span className="text-[10px] sm:text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2 sm:px-3 py-1 rounded-full border border-indigo-200">
                            {job.company}
                          </span>
                          <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 bg-slate-100 rounded-full text-slate-700 border border-slate-200">
                            {job.level}
                          </span>
                          <span className="text-[10px] sm:text-xs font-extrabold px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 shadow-sm">
                            {job.matchPercentage}% match
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                          {job.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 line-clamp-2 sm:line-clamp-1">
                          {job.description}
                        </p>
                      </div>
                      <button
                        onClick={() => loadSkillGap(job)}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-extrabold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-200 whitespace-nowrap w-full sm:w-auto"
                      >
                        View Details
                      </button>
                    </div>

                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t-2 border-slate-200/60">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <span className="text-[10px] sm:text-xs font-bold text-slate-600 whitespace-nowrap">
                          Skills:{" "}
                          <span className="text-slate-900 font-extrabold">
                            {job.matchingSkills}/{job.totalRequiredSkills}
                          </span>{" "}
                          matched
                        </span>
                        <div className="flex-1 w-full sm:w-auto h-2 sm:h-2.5 bg-white rounded-full overflow-hidden shadow-inner border border-slate-200">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${job.matchPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show/Hide button */}
                {jobs.length > 5 && (
                  <button
                    onClick={() => setShowAllJobs(!showAllJobs)}
                    className="w-full text-center py-2.5 sm:py-3 text-xs sm:text-sm text-indigo-600 font-extrabold hover:text-indigo-800 transition bg-slate-50 rounded-xl border-2 border-dashed border-indigo-200 shadow-sm mt-3 sm:mt-4 hover:border-indigo-400 hover:bg-indigo-50"
                  >
                    {showAllJobs
                      ? "Show less jobs ↑"
                      : `View all ${jobs.length} jobs →`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Skills
  const renderSkillsContent = () => {
    return (
      <div className=" max-w-7xl mx-auto">
        {/* Header section matching other tabs */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-4 sm:py-5 shadow-md gap-3 sm:gap-0">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              Your Skills Matrix
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400">
              {candidateSkills.length} active skills tracked in your profile
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-bold text-indigo-700">
              {candidateSkills.length} Skills
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Your Current Skills Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-4 mb-4 sm:mb-5 border-b-2 border-slate-200">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Current Skills
              </h3>
              <span className="px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] sm:text-xs font-bold border border-emerald-200 shadow-sm">
                {candidateSkills.length} Active
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {candidateSkills.length === 0 ? (
                <p className="text-xs sm:text-sm font-semibold text-slate-500 text-center py-6 sm:py-8">
                  No skills added yet
                </p>
              ) : (
                candidateSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-extrabold shadow-md shadow-emerald-200 flex-shrink-0">
                      ✓
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        {skill.name}
                      </p>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Skill Opportunities Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-4 mb-4 sm:mb-5 border-b-2 border-slate-200">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Skills to Learn
              </h3>
              <span className="px-2 sm:px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] sm:text-xs font-bold border border-indigo-200 shadow-sm">
                {skillOpportunities.length} Available
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {skillOpportunities.length === 0 ? (
                <p className="text-xs sm:text-sm font-semibold text-slate-500 text-center py-6 sm:py-8">
                  No opportunities found
                </p>
              ) : (
                skillOpportunities.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2.5 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all"
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        {skill.name}
                      </p>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">
                        {skill.category}
                      </p>
                    </div>
                    <span className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 font-extrabold text-[10px] sm:text-xs rounded-full border border-indigo-200 shadow-sm flex-shrink-0 ml-2">
                      +{skill.jobsUnlocked} Jobs
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Analytics
  const renderAnalyticsContent = () => {
    const totalOpportunities = skillOpportunities.reduce(
      (total, skill) => total + skill.jobsUnlocked,
      0,
    );

    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-4 sm:py-5 shadow-md gap-3 sm:gap-0">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              Career Insights
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Growth, matches & performance in one place
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-700">
              Up to date
            </span>
          </div>
        </div>

        {/* Master Container for 3-Column Stats Grid */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-md mb-4 sm:mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Match Rate
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1 sm:mt-2">
                {Math.round(
                  jobs.reduce((acc, j) => acc + j.matchPercentage, 0) /
                    jobs.length,
                ) || 0}
                %
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tracked Skills
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">
                {candidateSkills.length}
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-slate-200 shadow-sm">
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Opportunities
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 sm:mt-2">
                {totalOpportunities}
              </p>
            </div>
          </div>
        </div>

        {/* Main Breakdown Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-md">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <span>Job Matches Performance</span>
            <span className="text-[10px] sm:text-xs font-bold text-indigo-600 bg-indigo-50 px-2 sm:px-3 py-1 rounded-full border border-indigo-200">
              {jobs.length} Active Jobs
            </span>
          </h3>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {jobs.length === 0 ? (
              <p className="text-xs sm:text-sm font-semibold text-slate-500 text-center py-6 sm:py-8">
                No jobs to analyze
              </p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.jobId}
                  className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                    <span className="font-extrabold text-slate-800 truncate mr-2">
                      {job.title}
                    </span>
                    <span className="font-extrabold text-indigo-600 flex-shrink-0">
                      {job.matchPercentage}%
                    </span>
                  </div>
                  <div className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${job.matchPercentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Profile
  const renderProfileContent = () => {
    return (
      <div className=" max-w-7xl mx-auto">
        {/* Profile Overview Header */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-4 sm:py-5 shadow-md gap-3 sm:gap-0">
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
              Profile Overview
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400">
              Your activity, profile health & platform metrics
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-700">
              Active
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-md">
          {/* User Header Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 pb-4 sm:pb-6 border-b-2 border-slate-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center ring-4 ring-indigo-300 shadow-md flex-shrink-0">
              <span className="text-indigo-700 font-extrabold text-xl sm:text-2xl">
                {candidate?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {candidate?.name || "User"}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Active Candidate
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid / Breakdown */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 py-4 sm:py-6">
            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Saved Jobs
              </span>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">
                {jobs.length}
              </p>
            </div>
            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tracked Skills
              </span>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">
                {candidateSkills.length}
              </p>
            </div>
            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Average Match
              </span>
              <p className="text-lg sm:text-2xl font-extrabold text-indigo-600 mt-1">
                {Math.round(
                  jobs.reduce((acc, j) => acc + j.matchPercentage, 0) /
                    jobs.length,
                ) || 0}
                %
              </p>
            </div>
            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Opportunities
              </span>
              <p className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">
                {skillOpportunities.reduce(
                  (total, skill) => total + skill.jobsUnlocked,
                  0,
                )}
              </p>
            </div>
          </div>

          {/* Pro Tip Banner matching sidebar style */}
          <div className="mt-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-3 sm:p-5 shadow-sm border border-indigo-200">
            <p className="text-xs sm:text-sm font-extrabold text-indigo-700">
              💡 Profile Status
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              Your profile information is fully synchronized with Career Graph.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar
        candidate={candidate}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMobileOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      <main className="flex-1 w-full md:ml-0">
        <Header
          candidate={candidate}
          title={getPageTitle(activeTab).title}
          subtitle={getPageTitle(activeTab).subtitle}
          onMenuClick={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <div className="p-2  md:h-[650px] overflow-y-auto ">
          <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
