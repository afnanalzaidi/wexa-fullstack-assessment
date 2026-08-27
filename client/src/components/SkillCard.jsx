import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const SkillCard = ({ skill }) => {
  return (
    <div className="group bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {skill.name}
          </p>
          <p className="text-xs text-slate-500 mt-1">{skill.category}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:scale-110 transition-transform">
          {skill.jobsUnlocked}
        </div>
      </div>
      <div className="mt-3">
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((skill.jobsUnlocked / 10) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          <FiTrendingUp className="w-3 h-3" />
          {skill.jobsUnlocked} additional {skill.jobsUnlocked === 1 ? 'job' : 'jobs'} unlocked
        </p>
      </div>
    </div>
  );
};

export default SkillCard;