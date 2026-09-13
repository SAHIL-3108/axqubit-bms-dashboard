'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ApplicationsHubPage() {
  const apps = [
    { title: 'Electric Vehicles (EV)', link: '/applications/electric-vehicles', icon: '🚗', desc: 'Battery pack monitoring and active balancing for 2-wheeler, 3-wheeler auto rickshaw, and light commercial EV fleets.', features: ['Vibration-resistant PCB coating', 'CAN 2.0B speed controller sync', 'Regen current absorption protection'] },
    { title: 'Solar Energy Storage (ESS)', link: '/applications/solar-energy-storage', icon: '☀️', desc: 'Multi-string high-voltage battery storage management for residential, commercial microgrids, and MW containerized ESS.', features: ['Hybrid inverter protocol handshake', 'Multi-stack master-slave connection', 'Insulation resistance monitoring'] },
    { title: 'Telecom Base Stations', link: '/applications/telecom', icon: '📡', desc: '48V 100Ah / 200Ah rack-mounted backup power BMS units for 5G towers and remote telecom shelters.', features: ['Standard 19" rack enclosure mounting', 'RS485 Modbus SNMP remote gateway', 'Long-life LiFePO4 battery optimization'] },
    { title: 'Industrial UPS Systems', link: '/applications/industrial-ups', icon: '🏭', desc: 'High-rate discharge protection systems for critical hospital ICU, data center server, and factory PLC backup power.', features: ['Zero-transfer-time double conversion', 'High C-rate pulse discharge safety', 'Instantaneous short-circuit isolation'] },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Vertical Industry Application Solutions
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Discover how AXQUBIT hardware and cloud SaaS platforms are customized to solve demanding energy storage and power management challenges across key industrial sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {apps.map((a, i) => (
          <div key={i} className="bg-[#0f141c] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-8 flex flex-col justify-between transition-all group">
            <div className="space-y-4">
              <div className="text-3xl">{a.icon}</div>
              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{a.title}</h2>
              <p className="text-xs text-gray-400 leading-relaxed">{a.desc}</p>
              <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
                {a.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-800">
              <Link href={a.link} className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                View Application Deep-Dive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
