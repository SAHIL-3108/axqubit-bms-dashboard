'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Zap, ShieldCheck, Cpu, ArrowRight, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>ABOUT AXQUBIT TECHNOLOGIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Powering the World's Clean Energy & Automation Transition
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Headquartered in Vadodara, Gujarat, India, AXQUBIT Technologies designs, engineers, and manufactures industrial-grade battery management hardware, power electronics, and edge AI vision systems for clients worldwide.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0f141c] border border-gray-800 rounded-3xl p-8 sm:p-12">
        <div className="space-y-4">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Why AXQUBIT</span>
          <h2 className="text-3xl font-extrabold text-white">Full-Stack Vertical Integration</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Unlike off-the-shelf component assemblers, AXQUBIT owns the complete technology stack: from high-current PCB layout design and firmware development to cloud SaaS telemetry infrastructure and AI neural network optimization.
          </p>
          <div className="space-y-2 text-xs font-mono text-gray-300 pt-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>In-House SMT Assembly & Automated Optical Inspection (AOI)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Rigorous 100% End-of-Line Functional Burn-in Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified ISO 9001:2015 Manufacturing Facilities in Gujarat</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-6 font-mono text-xs text-gray-300 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <span className="text-cyan-400 font-bold">R&D FACILITY SNAPSHOT</span>
            <span className="text-emerald-400">VADODARA, INDIA 🇮🇳</span>
          </div>
          <div className="space-y-2">
            <div>📍 Location: GIDC Industrial Estate, Vadodara 390010</div>
            <div>🔬 R&D Engineers: 45+ Embedded & AI Specialists</div>
            <div>🏭 Production Capacity: 50,000 BMS Units / Month</div>
            <div>⚡ Testing Equipment: Keysight Battery Cyclers, Climatic Chambers</div>
          </div>
        </div>
      </div>

      {/* Leadership & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div className="p-6 bg-[#0f141c] border border-gray-800 rounded-2xl space-y-2">
          <div className="text-cyan-400 font-bold text-sm">Mission</div>
          <div className="text-gray-400">To accelerate zero-emission e-mobility and energy resilience through intelligent hardware.</div>
        </div>
        <div className="p-6 bg-[#0f141c] border border-gray-800 rounded-2xl space-y-2">
          <div className="text-emerald-400 font-bold text-sm">Innovation</div>
          <div className="text-gray-400">Continuous R&D in active balancing, solid-state battery management, and edge AI algorithms.</div>
        </div>
        <div className="p-6 bg-[#0f141c] border border-gray-800 rounded-2xl space-y-2">
          <div className="text-amber-400 font-bold text-sm">Global Reach</div>
          <div className="text-gray-400">Serving EV OEMs, solar integrators, and industrial automation clients across 20+ countries.</div>
        </div>
      </div>

    </div>
  );
}
