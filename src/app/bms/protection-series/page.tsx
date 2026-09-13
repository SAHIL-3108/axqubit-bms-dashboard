'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, FileText, Download } from 'lucide-react';

export default function ProtectionSeriesPage() {
  const models = [
    { sku: 'AX-PCM-4S20A', series: '4S (12.8V)', current: '20A', chemistry: 'LiFePO4 / NMC', balancing: 'Passive 50mA', app: 'Light Mobility / Solar Lantern' },
    { sku: 'AX-PCM-8S40A', series: '8S (25.6V)', current: '40A', chemistry: 'LiFePO4', balancing: 'Passive 60mA', app: 'Solar Streetlight / E-Bikes' },
    { sku: 'AX-PCM-16S60A', series: '16S (51.2V)', current: '60A', chemistry: 'LiFePO4', balancing: 'Passive 80mA', app: 'EV 2W / Telecom Backup' },
    { sku: 'AX-PCM-24S100A', series: '24S (76.8V)', current: '100A', chemistry: 'LiFePO4 / NMC', balancing: 'Passive 100mA', app: 'EV 3-Wheeler Auto' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AXQUBIT HARDWARE PCM SERIES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Hardware Protection Circuit Modules (PCM)
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          The Protection Series provides hard-wired protection logic for lithium battery packs. Built with high-current MOSFET switching, thermal cutoffs, over-voltage/under-voltage protection ICs, and passive cell balancing.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-[#0e131b] border border-gray-800 rounded-xl">
          <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Over-Charge Cutoff</div>
          <div className="text-xs text-gray-400">3.65V per cell (LiFePO₄) / 4.25V per cell (NMC) with instant MOSFET trip.</div>
        </div>
        <div className="p-4 bg-[#0e131b] border border-gray-800 rounded-xl">
          <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Over-Discharge Cutoff</div>
          <div className="text-xs text-gray-400">2.50V per cell (LiFePO₄) / 2.80V per cell (NMC) deep discharge prevention.</div>
        </div>
        <div className="p-4 bg-[#0e131b] border border-gray-800 rounded-xl">
          <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Dual NTC Thermal Sensor</div>
          <div className="text-xs text-gray-400">Automatic charge block below 0°C and discharge block above 65°C.</div>
        </div>
        <div className="p-4 bg-[#0e131b] border border-gray-800 rounded-xl">
          <div className="text-xs font-mono text-emerald-400 font-bold mb-1">Short-Circuit Latch</div>
          <div className="text-xs text-gray-400">Instant hardware short-circuit isolation within &lt; 200 microseconds.</div>
        </div>
      </div>

      {/* Models Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">Popular Protection Series SKUs</h2>
        <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
                <th className="p-4">SKU Model</th>
                <th className="p-4">Series (Voltage)</th>
                <th className="p-4">Cont. Current</th>
                <th className="p-4">Chemistry</th>
                <th className="p-4">Balancing</th>
                <th className="p-4">Target Application</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {models.map((m, i) => (
                <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-4 font-bold text-emerald-400">{m.sku}</td>
                  <td className="p-4">{m.series}</td>
                  <td className="p-4 text-white font-bold">{m.current}</td>
                  <td className="p-4">{m.chemistry}</td>
                  <td className="p-4 text-gray-400">{m.balancing}</td>
                  <td className="p-4 text-gray-300">{m.app}</td>
                  <td className="p-4">
                    <Link href="/partners/oem" className="text-xs text-cyan-400 hover:underline">
                      Request Quote
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">Need custom dimensions or PCB layouts for your pack?</h3>
          <p className="text-xs text-gray-300 mt-1">
            AXQUBIT offers rapid engineering turnaround for custom PCB shapes and connector harnesses.
          </p>
        </div>
        <Link 
          href="/partners/oem" 
          className="px-6 py-3 bg-emerald-400 text-black text-xs font-mono font-bold rounded-xl hover:bg-emerald-300 transition-colors shrink-0"
        >
          Submit OEM Layout Spec
        </Link>
      </div>

    </div>
  );
}
