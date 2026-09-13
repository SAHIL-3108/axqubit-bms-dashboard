'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PartnersOverviewPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT GLOBAL PARTNER NETWORK</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Join the AXQUBIT Global Partner Program
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Expand your enterprise product offerings with AXQUBIT’s industry-leading Battery Management Systems, Power Electronics, and AI Vision hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Reseller */}
        <div className="bg-[#0f141c] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Reseller Program</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ideal for regional battery pack assemblers, solar dealers, and electronics retailers looking to stock off-the-shelf AXQUBIT BMS & SMPS SKUs.
            </p>
            <div className="text-xs font-mono text-cyan-400 font-bold">
              • Tiered Volume Discounts starting at 25 Units<br/>
              • Fast 48-Hour Dispatch from Vadodara Hub<br/>
              • Marketing Collateral & Spec Sheets
            </div>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/partners/reseller" className="w-full py-2.5 bg-cyan-400 text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>Apply as Reseller</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Distributor */}
        <div className="bg-[#0f141c] border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Distributor Network</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Exclusive territorial distribution rights for national distributors with stockholding and technical support capabilities.
            </p>
            <div className="text-xs font-mono text-emerald-400 font-bold">
              • Exclusive State / Country Territory Rights<br/>
              • Dedicated Account Manager & SLA Support<br/>
              • Credit Terms & Co-Op Marketing Budget
            </div>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/partners/distributor" className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>Apply as Distributor</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* OEM */}
        <div className="bg-[#0f141c] border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">OEM White-Label</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Custom engineering, firmware modification, custom PCB sizing, and custom logo laser etching for high-volume vehicle and ESS manufacturers.
            </p>
            <div className="text-xs font-mono text-amber-400 font-bold">
              • Custom PCB Dimensions & Connector Wiring<br/>
              • Custom CAN Protocol Mapping<br/>
              • White-Label SaaS Dashboard Branding
            </div>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/partners/oem" className="w-full py-2.5 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>Apply for OEM Custom Design</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
