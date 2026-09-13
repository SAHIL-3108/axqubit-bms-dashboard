'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BatteryCharging, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  FileText 
} from 'lucide-react';

export default function BMSCategoryHub() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <BatteryCharging className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT BATTERY MANAGEMENT SYSTEMS (BMS)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Precision BMS Hardware & Cloud Intelligence
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          AXQUBIT manufactures lithium battery protection PCM boards, IoT-connected smart BMS units, and industrial high-voltage battery stack management architectures for LiFePO₄, NMC, and LTO chemistries.
        </p>
      </div>

      {/* BMS Series Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Protection Series */}
        <div className="bg-[#0f141c] border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Protection Series</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Standalone hardware Protection Circuit Modules (PCM/BMS) engineered for low-cost, high-reliability battery packs from 3S to 24S series.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Cell Series Count:</span>
                <span className="text-emerald-400 font-bold">3S – 24S</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Continuous Current:</span>
                <span className="text-white font-bold">20A – 200A</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Cell Chemistries:</span>
                <span className="text-white font-bold">LiFePO₄ / NMC / LTO</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Balancing Mode:</span>
                <span className="text-emerald-400 font-bold">Passive Resistive</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-800 space-y-3">
            <Link 
              href="/bms/protection-series" 
              className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore Protection Models</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Smart Series (BMS6000) */}
        <div className="bg-[#0f141c] border border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/70 transition-all shadow-xl relative overflow-hidden">
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-700">
            FLAGSHIP
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Smart Series (BMS6000)</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Industrial IoT Smart BMS with active cell balancing, ESP32-S3 wireless MCU, dual isolated CAN 2.0B / RS485 buses, Bluetooth 5.0, and SaaS cloud platform.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Cell Series Count:</span>
                <span className="text-cyan-400 font-bold">4S – 32S</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Continuous Current:</span>
                <span className="text-white font-bold">50A – 300A</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Balancing Mode:</span>
                <span className="text-cyan-400 font-bold">1.2A Active Inductive</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Telemetry:</span>
                <span className="text-cyan-400 font-bold">MQTT / CAN / BLE</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-800 space-y-3">
            <Link 
              href="/bms/smart-series" 
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Explore BMS6000 Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* High Voltage Series */}
        <div className="bg-[#0f141c] border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">High-Voltage Series</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Industrial Energy Storage (ESS) and Commercial Electric Vehicle high-voltage battery stack management architectures up to 1000V DC.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Voltage Stack:</span>
                <span className="text-amber-400 font-bold">100V – 1000V DC</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Architecture:</span>
                <span className="text-white font-bold">Master-Slave Stack</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Max Slave Modules:</span>
                <span className="text-amber-400 font-bold">32 Stack Units</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-800">
                <span className="text-gray-400">Isolation Safety:</span>
                <span className="text-emerald-400 font-bold">3500V Galvanic</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-800 space-y-3">
            <Link 
              href="/bms/high-voltage" 
              className="w-full py-2.5 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore HV Stack Systems</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Comparison Table Link */}
      <div className="bg-[#0e131b] border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white">Need detailed model parameters?</h3>
          <p className="text-xs text-gray-400 mt-1">
            Compare all 24+ BMS SKU models by continuous discharge current, chemistry, pin configuration, and communication ports.
          </p>
        </div>
        <Link 
          href="/catalogue" 
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Open Filterable Catalogue</span>
        </Link>
      </div>

    </div>
  );
}
