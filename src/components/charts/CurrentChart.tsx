'use client';

import React from 'react';
import { useBmsStore } from '@/store/bmsStore';
import LiveRechart from './LiveRechart';

export default function CurrentChart() {
  const history = useBmsStore((state) => state.history);
  
  const windowData = history.slice(-60);
  const currentVal = windowData.length > 0 ? windowData[windowData.length - 1].current : 0;

  return (
    <div className="glass-panel rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Current Stream
          </span>
          <h3 className="text-sm font-bold text-white">Real-Time Pack Current</h3>
        </div>
        <div className="flex items-center space-x-1.5 rounded-full bg-[#ffb300]/10 px-2.5 py-0.5 border border-[#ffb300]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb300] animate-pulse"></span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ffb300]">
            {currentVal.toFixed(1)} A
          </span>
        </div>
      </div>
      <div className="h-44">
        <LiveRechart
          data={windowData}
          dataKey="current"
          color="#ffb300"
          suggestedMin={-65}
          suggestedMax={45}
        />
      </div>
    </div>
  );
}
