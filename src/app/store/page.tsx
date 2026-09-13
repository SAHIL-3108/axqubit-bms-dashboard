'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function StorePage() {
  const kits = [
    { name: 'BMS6000 6S Evaluation Kit', price: '$120 / ₹9,800', desc: 'Includes BMS6000 6S Board, 7-Pin Balance Harness, USB-UART Converter & MQTT License', stock: 'In Stock' },
    { name: 'BMS6000 16S Pro EV Kit', price: '$280 / ₹22,500', desc: 'Includes BMS6000 16S 150A Board, Dual CAN Interface, 17-Pin Harness & Bluetooth Antenna', stock: 'In Stock' },
    { name: 'Industrial SMPS 24V 20A Sample', price: '$85 / ₹6,900', desc: '480W DIN-rail power supply sample unit with PFC active power correction', stock: 'In Stock' },
    { name: 'Edge AI Face Access Terminal Sample', price: '$220 / ₹17,500', desc: '7-inch biometric access terminal with dual IR liveness sensor & relay board', stock: 'In Stock' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT DIRECT SAMPLE STORE & EVALUATION KITS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Direct-to-Buyer Evaluation Kits</h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Order sample evaluation units directly for R&D testing, prototyping, and engineering validation before committing to volume production orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {kits.map((k, i) => (
          <div key={i} className="bg-[#0f141c] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-base">{k.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 text-[10px]">
                  {k.stock}
                </span>
              </div>
              <div className="text-cyan-400 text-lg font-bold">{k.price}</div>
              <p className="text-gray-400 leading-relaxed font-sans text-xs pt-1">{k.desc}</p>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                <Truck className="w-3.5 h-3.5 text-cyan-400" /> Dispatch in 24h
              </div>
              <Link 
                href="/company/contact" 
                className="px-4 py-2 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors"
              >
                Order Sample →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div>
          <h3 className="text-lg font-bold text-white">Need Volume MOQ Pricing (&gt; 500 units)?</h3>
          <p className="text-gray-300 mt-1">Contact AXQUBIT Corporate Sales for tiered B2B pricing and OEM contract manufacturing.</p>
        </div>
        <Link href="/partners/oem" className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors shrink-0">
          Request Volume Quote
        </Link>
      </div>

    </div>
  );
}
