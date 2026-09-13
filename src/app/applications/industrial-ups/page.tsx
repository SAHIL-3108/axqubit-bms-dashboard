'use client';

import React from 'react';
import Link from 'next/link';

export default function IndustrialUPSPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-blue-400 font-bold uppercase">Application Solution</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Industrial & Data Center Critical UPS Power
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          High C-rate pulse discharge protection logic engineered to safeguard data centers, hospital ICUs, and industrial PLC machinery against utility brownouts and power surges.
        </p>
      </div>

      <div className="p-6 bg-[#0f141c] border border-blue-500/30 rounded-2xl font-mono text-xs space-y-3">
        <div className="text-blue-400 font-bold">Key Performance Indicators</div>
        <div>• 0 ms Transfer Time Online Double Conversion compatibility</div>
        <div>• Peak 5C Pulse Discharge Current Handling for 10 seconds</div>
        <div>• High-voltage contactor pre-charge driver circuitry</div>
      </div>
    </div>
  );
}
