'use client';

import React from 'react';
import Link from 'next/link';

export default function SolarESSPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Application Solution</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Solar Energy Storage Systems (ESS)
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          AXQUBIT BMS and Hybrid Inverter systems form a complete renewable microgrid power foundation for residential wall-mounted batteries, commercial rooftop solar, and utility-scale MW container storage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0f141c] border border-emerald-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-emerald-400 font-bold">Victron / Deye / Growatt Sync</div>
          <div className="text-xs text-gray-300">Pre-loaded CAN protocol IDs for seamless communication with major solar inverter brands.</div>
        </div>
        <div className="p-6 bg-[#0f141c] border border-emerald-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-cyan-400 font-bold">Parallel Pack Scaling</div>
          <div className="text-xs text-gray-300">Connect up to 32 battery packs in parallel with auto DIP-switch ID addressing.</div>
        </div>
        <div className="p-6 bg-[#0f141c] border border-emerald-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-amber-400 font-bold">Cloud Webhook & API</div>
          <div className="text-xs text-gray-300">Integrate grid export energy data with your home automation or utility platform.</div>
        </div>
      </div>
    </div>
  );
}
