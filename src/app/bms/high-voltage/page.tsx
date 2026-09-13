'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Cpu, ArrowRight, Layers, Building2 } from 'lucide-react';

export default function HighVoltageBMSPage() {
  const models = [
    { sku: 'AX-HV-BMU-MASTER', type: 'Master Controller Unit (BCU)', voltage: '100V – 1000V DC', comms: 'Dual Isolated CAN 2.0B / Ethernet Modbus', feature: 'High-voltage Contactor & Insulation Monitoring' },
    { sku: 'AX-HV-SLAVE-16S', type: 'Stack Slave Unit (BMU)', voltage: '16S LiFePO4 Module', comms: 'Internal Isolated Daisy-Chain Daisy-Bus', balance: '2.5A Active Transformer Balancing' },
    { sku: 'AX-HV-SLAVE-24S', type: 'Stack Slave Unit (BMU)', voltage: '24S LiFePO4 Module', comms: 'Internal Isolated Daisy-Chain Daisy-Bus', balance: '2.5A Active Transformer Balancing' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>AXQUBIT INDUSTRIAL HIGH VOLTAGE ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          High Voltage Stack BMS Systems (Up to 1000V DC)
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Engineered for MW-scale Containerized Solar Energy Storage (ESS), Commercial EV Buses, Heavy Equipment, and Microgrid Battery Systems. Featuring modular Master-Slave topology, 3500V galvanic isolation, and real-time insulation resistance monitoring.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0f141c] border border-amber-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-amber-400 font-bold">1000V Isolation Barrier</div>
          <div className="text-xs text-gray-300">Continuous insulation measurement between positive/negative DC buses and chassis earth ground.</div>
        </div>

        <div className="p-6 bg-[#0f141c] border border-amber-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-amber-400 font-bold">Up to 32 Slave Stacks</div>
          <div className="text-xs text-gray-300">Scalable daisy-chain communication monitoring up to 512 series cells simultaneously.</div>
        </div>

        <div className="p-6 bg-[#0f141c] border border-amber-500/30 rounded-2xl space-y-2">
          <div className="text-xs font-mono text-amber-400 font-bold">Pre-Charge & Contactor Driver</div>
          <div className="text-xs text-gray-300">Integrated pre-charge circuit logic to eliminate inrush current spikes during contactor closure.</div>
        </div>
      </div>

      {/* Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">High Voltage Architecture Components</h2>
        <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
                <th className="p-4">SKU Code</th>
                <th className="p-4">Component Type</th>
                <th className="p-4">Operating Range</th>
                <th className="p-4">Communication Interface</th>
                <th className="p-4">Key Specification</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {models.map((m, i) => (
                <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-4 font-bold text-amber-400">{m.sku}</td>
                  <td className="p-4 text-white">{m.type}</td>
                  <td className="p-4 text-amber-300">{m.voltage}</td>
                  <td className="p-4">{m.comms}</td>
                  <td className="p-4 text-gray-300">{m.feature}</td>
                  <td className="p-4">
                    <Link href="/partners/oem" className="text-xs text-cyan-400 hover:underline">
                      Consult Engineering
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
