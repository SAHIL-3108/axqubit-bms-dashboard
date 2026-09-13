'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function DocumentsPage() {
  const docs = [
    { title: 'BMS6000 Series Datasheet & Pinout Diagram', type: 'PDF Datasheet', size: '2.4 MB', cat: 'BMS' },
    { title: '7-Pin & 11-Pin Cell Balance Harness Wiring Guide', type: 'Wiring Guide', size: '1.1 MB', cat: 'Wiring' },
    { title: 'CAN Bus 2.0B Protocol Mapping & DBC Files', type: 'Protocol Manual', size: '850 KB', cat: 'Software' },
    { title: 'ISO 9001:2015 Factory Quality Certificate', type: 'Compliance', size: '420 KB', cat: 'Certification' },
    { title: 'CE & RoHS Test Report — AXQUBIT BMS Series', type: 'Compliance', size: '1.8 MB', cat: 'Certification' },
    { title: 'UN38.3 Lithium Transport Safety Certification', type: 'Compliance', size: '920 KB', cat: 'Certification' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Technical Downloads</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Datasheets, Manuals & Certifications</h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Download official hardware specifications, CAN DBC files, wiring schematics, and international compliance documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {docs.map((d, i) => (
          <div key={i} className="p-5 bg-[#0f141c] border border-gray-800 rounded-2xl flex items-center justify-between hover:border-cyan-500/50 transition-all">
            <div className="space-y-1">
              <div className="text-white font-bold text-sm">{d.title}</div>
              <div className="text-gray-400 text-[11px]">{d.type} • {d.size}</div>
            </div>
            <button 
              onClick={() => alert(`Downloading: ${d.title}`)}
              className="px-4 py-2 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded-xl flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
