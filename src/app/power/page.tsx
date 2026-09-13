'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Layers, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PowerCategoryHub() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>AXQUBIT POWER ELECTRONICS & CONVERSION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          High-Efficiency Power Systems & Inverters
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Industrial Switched-Mode Power Supplies (SMPS), Pure Sine Wave Hybrid Solar Storage Inverters, and Online Double-Conversion UPS Systems engineered for maximum efficiency, continuous duty, and industrial thermal endurance.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* SMPS */}
        <div className="bg-[#0f141c] border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Industrial SMPS Line</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              DIN-rail & enclosed Switched-Mode Power Supplies delivering 12V, 24V, and 48V DC with up to 94% efficiency and PFC active power factor correction.
            </p>
            <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Output Power: 60W – 1500W
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Ultra-Wide Input: 85V – 264V AC
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> MTBF &gt; 350,000 Hours
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/power/smps" className="w-full py-2.5 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>View SMPS Lineup</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Inverters */}
        <div className="bg-[#0f141c] border border-yellow-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-950 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Hybrid Inverters</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pure Sine Wave Off-Grid and On-Grid Hybrid Inverters with built-in MPPT solar charge controllers and BMS CAN protocol handshake.
            </p>
            <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> Power Rating: 3kW – 15kW Single/3-Phase
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> Peak Efficiency: 97.6%
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" /> BMS RS485 & CAN Auto-Sync
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/power/inverters" className="w-full py-2.5 bg-yellow-950 hover:bg-yellow-900 border border-yellow-500/40 text-yellow-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>View Hybrid Inverters</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Industrial UPS */}
        <div className="bg-[#0f141c] border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Industrial UPS</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Zero-transfer-time Online Double-Conversion UPS systems designed for critical server rooms, hospital ICU equipment, and industrial automation lines.
            </p>
            <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Rating: 1kVA – 80kVA 3-Phase
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Transfer Time: 0 ms (Online Double)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> LiFePO4 External Battery Cabinet
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/power/ups" className="w-full py-2.5 bg-blue-950 hover:bg-blue-900 border border-blue-500/40 text-blue-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>View Industrial UPS</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
