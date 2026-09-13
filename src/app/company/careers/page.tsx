'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { title: 'Senior Embedded Hardware Engineer (BMS)', loc: 'Vadodara, Gujarat', dept: 'Hardware R&D', exp: '4+ Years', skills: 'High-current PCB, Altium Designer, STM32 / ESP32, CAN Bus' },
    { title: 'Full-Stack Next.js / TypeScript SaaS Developer', loc: 'Vadodara / Hybrid', dept: 'Software Platform', exp: '2+ Years', skills: 'Next.js, React 19, WebSockets, MQTT, TailWindCSS, Node.js' },
    { title: 'Field Application Engineer (FAE) — EV Systems', loc: 'Vadodara / Remote India', dept: 'Customer Support', exp: '3+ Years', skills: 'EV Battery Packs, CAN Analyzer, On-site Debugging, Customer SLA' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Join AXQUBIT</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Careers at AXQUBIT Technologies</h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Help us build the next generation of battery management, power electronics, and AI vision systems. Work on high-impact energy infrastructure engineered in India for the global market.
        </p>
      </div>

      <div className="space-y-4 font-mono text-xs">
        <h2 className="text-xl font-bold text-white font-mono">Open Engineering Positions</h2>
        {jobs.map((j, i) => (
          <div key={i} className="p-6 bg-[#0f141c] border border-gray-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-cyan-500/50 transition-all">
            <div className="space-y-1">
              <div className="text-white font-bold text-base">{j.title}</div>
              <div className="text-cyan-400 text-[11px]">{j.dept} • {j.loc} • {j.exp}</div>
              <div className="text-gray-400 text-[11px] pt-1">Skills: {j.skills}</div>
            </div>
            <Link href="/company/contact" className="px-5 py-2.5 bg-cyan-400 text-black font-bold rounded-xl flex items-center justify-center gap-1 shrink-0 hover:bg-cyan-300 transition-colors">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
