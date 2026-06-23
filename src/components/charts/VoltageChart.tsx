'use client';

import React from 'react';
import { useBmsStore } from '@/store/bmsStore';
import LiveRechart from './LiveRechart';

export default function VoltageChart() {
  const history = useBmsStore((state) => state.history);
  
  // Slice last 60 points for the rolling view
  const windowData = history.slice(-60);
  const currentVal = windowData.length > 0 ? windowData[windowData.length - 1].voltage : 0;

  return (
    <div className="glass-panel rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Voltage Stream
          </span>
          <h3 className="text-sm font-bold text-white">Real-Time Pack Voltage</h3>
        </div>
        <div className="flex items-center space-x-1.5 rounded-full bg-[#00d4ff]/10 px-2.5 py-0.5 border border-[#00d4ff]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] animate-pulse"></span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00d4ff]">
            {currentVal.toFixed(2)} V
          </span>
        </div>
      </div>
      <div className="h-44">
        <LiveRechart
          data={windowData}
          dataKey="voltage"
          color="#00d4ff"
          suggestedMin={17.5}
          suggestedMax={21.8}
        />
      </div>
    </div>
  );
}
