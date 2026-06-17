'use client';

import React from 'react';
import { CellData } from '@/types/bms';

interface CellCardProps {
  cell: CellData;
  packAverage: number;
}

export default function CellCard({ cell, packAverage }: CellCardProps) {
  const { cellNumber, voltage, temp, isBalancing } = cell;

  // Delta voltage in millivolts
  const deltaMv = (voltage - packAverage) * 1000;
  
  // Progress bar calculation (LFP cell range: 2.5V to 3.7V)
  const MIN_V = 2.5;
  const MAX_V = 3.7;
  const percent = Math.max(0, Math.min(100, ((voltage - MIN_V) / (MAX_V - MIN_V)) * 100));

  // User Color thresholds: >=3.70V = green, >=3.65V = amber, <3.65V = red
  const getVoltageColorStyles = (v: number) => {
    if (v >= 3.70) {
      return {
        text: 'text-[#00e676]',
        bg: 'bg-[#00e676]/10',
        border: 'border-[#00e676]/20',
        bar: 'bg-[#00e676]',
      };
    }
    if (v >= 3.65) {
      return {
        text: 'text-[#ffb300]',
        bg: 'bg-[#ffb300]/10',
        border: 'border-[#ffb300]/20',
        bar: 'bg-[#ffb300]',
      };
    }
    return {
      text: 'text-[#ff3333]',
      bg: 'bg-[#ff3333]/10',
      border: 'border-[#ff3333]/20',
      bar: 'bg-[#ff3333]',
    };
  };

  const colors = getVoltageColorStyles(voltage);

  return (
    <div className={`glass-panel relative rounded-xl p-4 border ${colors.border}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-white/5 text-[10px] font-extrabold text-[#9ca3af]">
            #{cellNumber}
          </span>
          <span className="text-xs font-bold text-white">LFP CELL</span>
        </div>

        {/* Balancing Pulsing Indicator */}
        {isBalancing ? (
          <div className="flex items-center space-x-1.5 rounded-full bg-[#ffb300]/10 px-2 py-0.5 border border-[#ffb300]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffb300] animate-ping" />
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#ffb300]">
              BAL
            </span>
          </div>
        ) : (
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af]">
            PASSIVE
          </span>
        )}
      </div>

      {/* Main Reading */}
      <div className="mt-4 flex items-baseline justify-between">
        <div className="flex items-baseline space-x-0.5">
          <span className={`text-2xl font-extrabold tracking-tight ${colors.text}`}>
            {voltage.toFixed(3)}
          </span>
          <span className="text-xs font-semibold text-[#9ca3af] ml-0.5">V</span>
        </div>

        {/* Deviation Delta V */}
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            deltaMv >= 0
              ? 'text-[#00e676] bg-[#00e676]/5'
              : 'text-[#ff3333] bg-[#ff3333]/5'
          }`}
          title="Deviation from average cell voltage"
        >
          {deltaMv >= 0 ? '+' : ''}
          {deltaMv.toFixed(0)} mV
        </span>
      </div>

      {/* Voltage Bar Indicator */}
      <div className="mt-3.5 space-y-1">
        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${colors.bar}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-bold text-[#9ca3af] uppercase tracking-wider">
          <span>{MIN_V}V</span>
          <span>{MAX_V}V</span>
        </div>
      </div>

      {/* Bottom details */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-[#9ca3af]">
        <span>Cell Temp:</span>
        <span className="font-semibold text-white">{temp.toFixed(1)} °C</span>
      </div>
    </div>
  );
}
