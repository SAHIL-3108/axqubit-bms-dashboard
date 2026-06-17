'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, AlertOctagon } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';

interface FlagDetail {
  key: string;
  name: string;
  desc: string;
}

const flagsList: FlagDetail[] = [
  { key: 'ovp', name: 'OVP', desc: 'Over Voltage Protection (Pack)' },
  { key: 'uvp', name: 'UVP', desc: 'Under Voltage Protection (Pack)' },
  { key: 'ocp', name: 'OCP', desc: 'Over Current Protection' },
  { key: 'scp', name: 'SCP', desc: 'Short Circuit Protection' },
  { key: 'otp', name: 'OTP', desc: 'Over Temperature Protection' },
  { key: 'utp', name: 'UTP', desc: 'Under Temperature Protection' },
  { key: 'covp', name: 'COVP', desc: 'Cell Over Voltage Protection' },
  { key: 'cuvp', name: 'CUVP', desc: 'Cell Under Voltage Protection' },
];

export default function ProtectionFlags() {
  const telemetry = useBmsStore((state) => state.telemetry);
  
  // Safe fallback if protection flags aren't loaded yet
  const protectionFlags = telemetry?.protectionFlags || {
    ovp: false,
    uvp: false,
    ocp: false,
    scp: false,
    otp: false,
    utp: false,
    covp: false,
    cuvp: false,
  };

  const activeCount = Object.values(protectionFlags).filter(Boolean).length;

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3 border-b border-white/5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Safety Thresholds
          </span>
          <h3 className="text-sm font-bold text-white">BMS Protection Registers</h3>
        </div>
        
        {activeCount > 0 ? (
          <div className="flex items-center space-x-1.5 rounded-full bg-[#ff3333]/10 px-2.5 py-0.5 border border-[#ff3333]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff3333] animate-ping" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ff3333]">
              {activeCount} TRIPPED
            </span>
          </div>
        ) : (
          <div className="flex items-center space-x-1.5 rounded-full bg-[#00e676]/10 px-2.5 py-0.5 border border-[#00e676]/20">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00e676]" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00e676]">
              ALL SAFE
            </span>
          </div>
        )}
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {flagsList.map((flag) => {
          const isTripped = (protectionFlags as any)[flag.key] === true;

          return (
            <div
              key={flag.key}
              className={`flex flex-col justify-between rounded-lg p-3 transition-all duration-300 ${
                isTripped
                  ? 'bg-[#ff3333]/10 border border-[#ff3333]/30 text-[#ff3333] shadow-md shadow-[#ff3333]/5'
                  : 'bg-white/5 border border-white/5 text-[#9ca3af]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black tracking-wider ${isTripped ? 'text-[#ff3333]' : 'text-white'}`}>
                  {flag.name}
                </span>
                {isTripped ? (
                  <AlertOctagon className="h-4 w-4 text-[#ff3333] animate-bounce" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00e676]" />
                )}
              </div>
              <p className="mt-2 text-[9px] leading-tight font-medium opacity-85">
                {flag.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
