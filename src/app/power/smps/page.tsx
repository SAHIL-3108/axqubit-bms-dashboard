'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Zap, ArrowRight } from 'lucide-react';

export default function SMPSPage() {
  const models = [
    { sku: 'AX-PSU-12V10A', voltage: '12V DC', power: '120W', current: '10A', efficiency: '91%', mounting: 'DIN Rail' },
    { sku: 'AX-PSU-24V20A', voltage: '24V DC', power: '480W', current: '20A', efficiency: '93.5%', mounting: 'DIN Rail / Enclosed' },
    { sku: 'AX-PSU-48V30A', voltage: '48V DC', power: '1440W', current: '30A', efficiency: '94.2%', mounting: '19" Rack 1U' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>AXQUBIT INDUSTRIAL POWER SUPPLIES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Switched-Mode Power Supplies (SMPS)
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          High-reliability DIN-rail and chassis-mount industrial DC power supplies featuring active Power Factor Correction (PFC), low ripple noise, and short-circuit auto-recovery.
        </p>
      </div>

      <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <th className="p-4">SKU Model</th>
              <th className="p-4">Output Voltage</th>
              <th className="p-4">Output Power</th>
              <th className="p-4">Current</th>
              <th className="p-4">Efficiency</th>
              <th className="p-4">Form Factor</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {models.map((m, i) => (
              <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-amber-400">{m.sku}</td>
                <td className="p-4 text-white font-bold">{m.voltage}</td>
                <td className="p-4 text-amber-300">{m.power}</td>
                <td className="p-4">{m.current}</td>
                <td className="p-4 text-emerald-400">{m.efficiency}</td>
                <td className="p-4 text-gray-300">{m.mounting}</td>
                <td className="p-4">
                  <Link href="/partners/oem" className="text-xs text-cyan-400 hover:underline">
                    Request Spec Sheet
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
