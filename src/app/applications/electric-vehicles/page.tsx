'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EVApplicationPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Application Solution</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Electric Vehicles (2W / 3W Auto Rickshaw / 4W Light Mobility)
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          AXQUBIT BMS hardware is field-proven across 10,000+ electric 3-wheelers and 2-wheelers in India and Southeast Asia. Engineered to withstand high ambient road temperatures (up to 55°C), road vibration, and rapid regenerative braking currents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0f141c] border border-cyan-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-cyan-400 font-bold">Vibration & Humidity Resistant</div>
          <div className="text-xs text-gray-300">Conformal PCB coating protects against dust, monsoon rain, and heavy road shock.</div>
        </div>
        <div className="p-6 bg-[#0f141c] border border-cyan-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-emerald-400 font-bold">Kelly / Sevcon / Curtis CAN Protocol</div>
          <div className="text-xs text-gray-300">Plug-and-play motor controller handshake for speed limiting and dashboard cluster display.</div>
        </div>
        <div className="p-6 bg-[#0f141c] border border-cyan-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-amber-400 font-bold">Fast Charging Support</div>
          <div className="text-xs text-gray-300">Supports 1C - 2C fast charge currents with real-time temperature sensing on cell busbars.</div>
        </div>
      </div>

      <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-2xl p-8 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Building an EV Battery Pack?</h3>
          <p className="text-xs text-gray-300 mt-1">Get custom harness lengths, CAN IDs, and sample boards for vehicle prototyping.</p>
        </div>
        <Link href="/partners/oem" className="px-6 py-3 bg-cyan-400 text-black text-xs font-mono font-bold rounded-xl hover:bg-cyan-300 transition-colors">
          Talk to EV Systems Engineer
        </Link>
      </div>
    </div>
  );
}
