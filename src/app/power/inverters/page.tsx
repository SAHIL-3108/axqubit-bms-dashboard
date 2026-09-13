'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

export default function InvertersPage() {
  const models = [
    { sku: 'AX-INV-3KW-48V', power: '3.0 kW', battery: '48V LiFePO4', mppt: '80A MPPT (450V Voc)', thd: '< 2.5%', type: 'Single Phase Pure Sine' },
    { sku: 'AX-INV-5KW-48V', power: '5.0 kW', battery: '48V LiFePO4', mppt: '100A MPPT (500V Voc)', thd: '< 2.0%', type: 'Single Phase Hybrid' },
    { sku: 'AX-INV-10KW-3PH', power: '10.0 kW', battery: '48V / HV Stack', mppt: 'Dual MPPT 160A', thd: '< 1.8%', type: '3-Phase Grid-Tied Hybrid' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/80 border border-yellow-500/30 text-yellow-300 text-xs font-mono">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>AXQUBIT HYBRID SOLAR INVERTERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Pure Sine Wave & Hybrid Storage Inverters
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          High-efficiency hybrid inverters with integrated MPPT solar chargers, battery priority management, and direct CAN protocol handshake for AXQUBIT BMS systems.
        </p>
      </div>

      <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <th className="p-4">SKU Model</th>
              <th className="p-4">Power Rating</th>
              <th className="p-4">Battery Voltage</th>
              <th className="p-4">MPPT Solar Charger</th>
              <th className="p-4">Waveform THD</th>
              <th className="p-4">Inverter Type</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {models.map((m, i) => (
              <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-yellow-400">{m.sku}</td>
                <td className="p-4 text-white font-bold">{m.power}</td>
                <td className="p-4 text-yellow-300">{m.battery}</td>
                <td className="p-4">{m.mppt}</td>
                <td className="p-4 text-emerald-400">{m.thd}</td>
                <td className="p-4 text-gray-300">{m.type}</td>
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
  );
}
