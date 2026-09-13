'use client';

import React from 'react';
import Link from 'next/link';

export default function TelecomPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-amber-400 font-bold uppercase">Application Solution</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Telecom Tower Base Station Backup Power
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          AXQUBIT 48V 100Ah / 200Ah 19-inch rack-mountable BMS units guarantee uninterrupted operations for 5G cellular towers, remote satellite relay stations, and ISP fiber nodes.
        </p>
      </div>

      <div className="p-6 bg-[#0f141c] border border-amber-500/30 rounded-2xl font-mono text-xs space-y-3">
        <div className="text-amber-400 font-bold">Key Specifications</div>
        <div>• 19" Rack-Mount 2U / 3U Enclosure form factor</div>
        <div>• RS485 Modbus SNMP Remote Gateway Integration</div>
        <div>• High Ambient Operating Temp: -20°C to +65°C</div>
        <div>• Auto Zero-Power Deep Sleep State during prolonged outages</div>
      </div>
    </div>
  );
}
