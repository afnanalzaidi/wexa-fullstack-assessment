import React from 'react';

export function JobCard({ job, onViewDetails, variant = "default" }) {
  
  // DETAILS VARIANT - Job details view
  if (variant === "details") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <button
          onClick={onViewDetails}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to recommendations
        </button>

        {/* Job Header with gradient */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 rounded-2xl text-white shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10">
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-200">{job.company}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {job.title}
              </h2>
              <span className="rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold text-white border border-white/30">
                {job.level}
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-7 text-indigo-100">{job.description}</p>
          </div>
        </div>

        {/* Match card with animated progress */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-300">Your match</p>
                <div className="flex items-end gap-2">
                  <p className="mt-1 text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {job.matchPercentage}%
                  </p>
                  <span className="text-slate-400 text-sm mb-1">match</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-white">{job.matchingSkills}</span> of{" "}
                  <span className="font-bold text-white">{job.totalRequiredSkills}</span> skills match
                </p>
                <div className="mt-1 flex gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i < Math.round((job.matchingSkills / job.totalRequiredSkills) * 5)
                          ? 'bg-indigo-400'
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-all duration-1000 relative"
                style={{ width: `${job.matchPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VARIANT - Compact card for dashboard
  if (variant === "dashboard") {
    return (
      <div className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm font-bold text-indigo-600">{job.company}</p>
                <span className="px-2.5 py-0.5 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-xs font-medium text-indigo-700">
                  {job.level}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                  ★ {job.matchPercentage}% match
                </span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {job.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">{job.description}</p>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-600">{job.matchPercentage}%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">match score</p>
              </div>
              <button
                onClick={() => onViewDetails(job)}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 hover:shadow-indigo-200"
              >
                View Details →
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-500">Skills match</span>
              <span className="font-semibold text-slate-700">
                {job.matchingSkills}/{job.totalRequiredSkills} skills
                <span className="text-slate-400 text-xs ml-1">
                  ({Math.round((job.matchingSkills / job.totalRequiredSkills) * 100)}%)
                </span>
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 relative"
                style={{ width: `${job.matchPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VARIANT - Full card view (original enhanced)
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-200 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm font-bold text-indigo-600">{job.company}</p>
              <span className="inline-flex rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {job.level}
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h3>
          </div>
          
          <div className="sm:text-right bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl min-w-[100px] border border-indigo-100">
            <div className="flex items-center gap-2 sm:justify-end">
              <span className="text-3xl font-bold tracking-tight text-indigo-600">{job.matchPercentage}%</span>
              <span className="text-xs font-medium text-slate-500">match</span>
            </div>
            <div className="mt-1 flex gap-1 justify-start sm:justify-end">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i < Math.round(job.matchPercentage / 20)
                      ? 'bg-indigo-500'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{job.description}</p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">Match quality</span>
            <span className="font-semibold text-slate-700">
              {job.matchingSkills}/{job.totalRequiredSkills} skills
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 relative"
              style={{ width: `${job.matchPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-600"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{job.matchingSkills}</span> of{" "}
              <span className="font-semibold text-slate-700">{job.totalRequiredSkills}</span> skills match
            </p>
          </div>
          <button
            onClick={() => onViewDetails(job)}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105 hover:shadow-indigo-200 flex items-center gap-2"
          >
            View details
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default JobCard;