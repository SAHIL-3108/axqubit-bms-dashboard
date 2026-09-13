'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, HelpCircle, LifeBuoy, Download, ArrowRight } from 'lucide-react';

export default function ResourcesHubPage() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          AXQUBIT Technical Resource Center
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Access official hardware datasheets, CE/RoHS compliance certificates, wiring schematics, technical FAQs, firmware downloads, and developer support ticket tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Documents */}
        <div className="bg-[#0f141c] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Document Library</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Hardware datasheets, 7-pin & 11-pin balance harness wiring diagrams, application notes, and ISO/CE safety certificates.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/resources/documents" className="w-full py-2.5 bg-cyan-400 text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>Open Document Library</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-[#0f141c] border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Technical FAQ</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Frequently asked questions covering cell balance wiring, CAN bus baud rate configuration, MQTT telemetry setup, and protection registers.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/resources/faq" className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>View Technical FAQ</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Help Desk */}
        <div className="bg-[#0f141c] border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Help Desk & Firmware</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Submit support tickets directly to AXQUBIT field application engineers (FAE), download firmware binaries (.bin), and view SLA guarantees.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/resources/help-desk" className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>Access Help Desk</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
