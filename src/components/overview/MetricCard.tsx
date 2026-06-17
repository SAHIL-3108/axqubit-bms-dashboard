'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  trend?: {
    value: string | number;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: LucideIcon;
  iconClassName?: string;
  valueClassName?: string;
}

export default function MetricCard({
  label,
  value,
  unit = '',
  subtext = '',
  trend,
  icon: Icon,
  iconClassName = 'text-[#00d4ff]',
  valueClassName = 'text-white',
}: MetricCardProps) {
  return (
    <div className="glass-panel glass-card-glow flex flex-col justify-between rounded-xl p-5">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af]">
            {label}
          </span>
          <div className="flex items-baseline space-x-0.5">
            <span className={`text-2xl font-extrabold tracking-tight ${valueClassName}`}>
              {value}
            </span>
            {unit && (
              <span className="text-sm font-semibold text-[#9ca3af] ml-0.5">{unit}</span>
            )}
          </div>
        </div>

        {/* Icon slot */}
        {Icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/5 ${iconClassName}`}>
            <Icon className="h-5 w-5 stroke-[2]" />
          </div>
        )}
      </div>

      {/* Footer Details */}
      {(subtext || trend) && (
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px]">
          <span className="text-[#9ca3af] font-medium truncate">{subtext}</span>
          
          {trend && (
            <span
              className={`font-semibold ${
                trend.isNeutral
                  ? 'text-[#9ca3af]'
                  : trend.isPositive
                  ? 'text-[#00e676]'
                  : 'text-[#ff3333]'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
