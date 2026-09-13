'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function UPSPage() {
  const models = [
    { sku: 'AX-UPS-ONLINE-3KVA', power: '3.0 kVA / 2.7 kW', transfer: '0 ms (Online)', battery: '48V LiFePO4 External', pf: '0.99 Active PFC' },
    { sku: 'AX-UPS-ONLINE-10KVA', power: '10.0 kVA / 9.0 kW', transfer: '0 ms (Online)', battery: '192V LiFePO4 Cabinet', pf: '0.99 Active PFC' },
    { sku: 'AX-UPS-ONLINE-40KVA-3PH', power: '40.0 kVA / 36 kW', transfer: '0 ms (Online)', battery: '384V HV Battery Rack', pf: '0.99 Active PFC' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>AXQUBIT CRITICAL UPS SYSTEMS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Online Double-Conversion Industrial UPS
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Zero-transfer-time double conversion power protection for critical medical infrastructure, data center server racks, telecom hubs, and industrial PLC control panels.
        </p>
      </div>

      <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <th className="p-4">SKU Model</th>
              <th className="p-4">Power Capacity</th>
              <th className="p-4">Transfer Time</th>
              <th className="p-4">Battery Bank</th>
              <th className="p-4">Power Factor</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {models.map((m, i) => (
              <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-blue-400">{m.sku}</td>
                <td className="p-4 text-white font-bold">{m.power}</td>
                <td className="p-4 text-emerald-400">{m.transfer}</td>
                <td className="p-4 text-gray-300">{m.battery}</td>
                <td className="p-4 text-blue-300">{m.pf}</td>
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
