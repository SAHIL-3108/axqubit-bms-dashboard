'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LiveReadingProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  colorClass?: string;
  barColorClass?: string;
}

export default function LiveReading({
  icon: Icon,
  label,
  value,
  unit,
  min,
  max,
  colorClass = 'text-[#00d4ff]',
  barColorClass = 'bg-[#00d4ff]',
}: LiveReadingProps) {
  // Calculate percentage within the min/max limits
  const range = max - min;
  const percentage = range > 0 ? Math.max(0, Math.min(100, ((value - min) / range) * 100)) : 0;

  return (
    <div className="glass-panel flex flex-col justify-center rounded-xl p-4">
      {/* Label and Value Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/5 ${colorClass}`}>
            <Icon className="h-4 w-4 stroke-[2]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
            {label}
          </span>
        </div>
        
        <div className="flex items-baseline space-x-0.5">
          <span className="text-lg font-extrabold text-white tracking-tight">
            {value.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-[#9ca3af] ml-0.5">{unit}</span>
        </div>
      </div>

      {/* Progress Bar and Limits */}
      <div className="mt-3.5 space-y-1.5">
        {/* Bar track */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5 border border-white/5">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${barColorClass}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Boundary limits text */}
        <div className="flex justify-between text-[9px] font-bold text-[#9ca3af] uppercase tracking-widest">
          <span>Min: {min.toFixed(1)}</span>
          <span>Max: {max.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
