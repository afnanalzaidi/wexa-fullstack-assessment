import React from 'react';

const StatsCard = ({ icon: Icon, title, value, subtitle, color }) => {
  const colorMap = {
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-8 h-8 text-slate-600" />
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white text-sm font-bold`}>
          {value}
        </div>
      </div>
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
};

export default StatsCard;