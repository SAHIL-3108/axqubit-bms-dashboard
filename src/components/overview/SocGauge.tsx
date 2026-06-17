'use client';

import React from 'react';

interface SocGaugeProps {
  soc: number;
  isBalancing?: boolean;
}

export default function SocGauge({ soc = 0, isBalancing = false }: SocGaugeProps) {
  // Enforce boundary values
  const safeSoc = Math.max(0, Math.min(100, soc));
  
  // Semicircle geometry
  // Radius R = 80px. Length of semicircle path L = π * R ≈ 251.32
  const strokeLength = 251.3;
  const strokeOffset = strokeLength * (1 - safeSoc / 100);

  // Dynamic status color
  const getStatusColor = (val: number) => {
    if (val >= 50) return 'text-[#00e676]';
    if (val >= 20) return 'text-[#ffb300]';
    return 'text-[#ff3333]';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative h-32 w-52 overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            {/* Gradient from cyan to green */}
            <linearGradient id="socGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#00e676" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20, 100 A 80, 80 0 0, 1 180, 100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Active Gradient Arc */}
          <path
            d="M 20, 100 A 80, 80 0 0, 1 180, 100"
            fill="none"
            stroke="url(#socGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeLength}
            strokeDashoffset={strokeOffset}
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            filter="url(#glow)"
          />
        </svg>

        {/* Center Text (Absolute Overlay) */}
        <div className="absolute bottom-1 left-0 right-0 flex flex-col items-center justify-end">
          <span className={`text-4xl font-extrabold tracking-tight ${getStatusColor(safeSoc)}`}>
            {safeSoc.toFixed(0)}
            <span className="text-lg font-bold text-[#9ca3af] ml-0.5">%</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mt-1">
            State of Charge
          </span>
        </div>
      </div>
      
      {/* Balancing State Badging */}
      {isBalancing && (
        <div className="mt-2 flex items-center space-x-1.5 rounded-full bg-[#ffb300]/10 px-2.5 py-0.5 border border-[#ffb300]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb300] animate-pulse"></span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ffb300]">
            Active Balancing
          </span>
        </div>
      )}
    </div>
  );
}
