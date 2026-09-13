'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Zap, Activity, CheckCircle2, ArrowRight, ShieldCheck, Download, Radio, LayoutDashboard } from 'lucide-react';

export default function SmartSeriesPage() {
  const models = [
    { sku: 'AX-BMS6000-6S', voltage: '19.2V (6S LiFePO4)', current: '60A / 120A Peak', comms: 'UART + BLE 5.0 + CAN', balance: '1.2A Active' },
    { sku: 'AX-BMS6000-8S', voltage: '25.6V (8S LiFePO4)', current: '100A / 200A Peak', comms: 'UART + RS485 + CAN', balance: '1.2A Active' },
    { sku: 'AX-BMS6000-16S', voltage: '51.2V (16S LiFePO4)', current: '150A / 300A Peak', comms: 'Dual CAN 2.0B + RS485 + WiFi/MQTT', balance: '2.0A Active' },
    { sku: 'AX-BMS6000-24S', voltage: '76.8V (24S LiFePO4)', current: '200A / 400A Peak', comms: 'Dual CAN 2.0B + RS485 + WiFi/MQTT', balance: '2.0A Active' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT FLAGSHIP SMART BMS PLATFORM</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          BMS6000 Smart Series with Active Balancing & Cloud SaaS
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          The BMS6000 Smart Series combines ESP32-S3 dual-core microcontroller processing, active inductive cell balancing, precision 16-bit analog front-end voltage measurement, and multi-protocol industrial connectivity (CAN Bus 2.0B, RS485, Modbus, Bluetooth, MQTT).
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0f141c] border border-cyan-500/30 rounded-2xl space-y-3">
          <Activity className="w-6 h-6 text-cyan-400" />
          <h3 className="text-base font-bold text-white font-mono">Active Inductive Balancing</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Transfers energy directly from high-voltage cells to low-voltage cells at up to 2.0A transfer current without wasting battery energy as heat.
          </p>
        </div>

        <div className="p-6 bg-[#0f141c] border border-cyan-500/30 rounded-2xl space-y-3">
          <Radio className="w-6 h-6 text-emerald-400" />
          <h3 className="text-base font-bold text-white font-mono">Cloud Telemetry & OTA</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Built-in Wi-Fi & MQTT transport sends sub-second telemetry to the AXQUBIT SaaS dashboard and supports encrypted over-the-air firmware updates.
          </p>
        </div>

        <div className="p-6 bg-[#0f141c] border border-cyan-500/30 rounded-2xl space-y-3">
          <Zap className="w-6 h-6 text-amber-400" />
          <h3 className="text-base font-bold text-white font-mono">Dual CAN & RS485 Bus</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Pre-configured protocols for standard EV motor controllers (Kelly, Sevcon, Curtis) and commercial solar inverters (Victron, Growatt, Deye, SMA).
          </p>
        </div>
      </div>

      {/* Model Spec Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-mono">BMS6000 Series Models</h2>
          <Link href="/dashboard" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono">
            <LayoutDashboard className="w-3.5 h-3.5" /> Test Live Dashboard Demo →
          </Link>
        </div>

        <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
                <th className="p-4">SKU Model</th>
                <th className="p-4">Nominal Pack Voltage</th>
                <th className="p-4">Continuous / Peak Current</th>
                <th className="p-4">Balancing Rate</th>
                <th className="p-4">Connectivity Interfaces</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-gray-200">
              {models.map((m, i) => (
                <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-4 font-bold text-cyan-400">{m.sku}</td>
                  <td className="p-4 text-white">{m.voltage}</td>
                  <td className="p-4 text-emerald-400 font-bold">{m.current}</td>
                  <td className="p-4 text-cyan-300">{m.balance}</td>
                  <td className="p-4 text-gray-300">{m.comms}</td>
                  <td className="p-4">
                    <Link href="/resources/documents" className="text-xs text-cyan-400 hover:underline">
                      Download Datasheet
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">Experience the BMS6000 SaaS Intelligence Platform</h3>
          <p className="text-xs text-gray-300 mt-1">
            Monitor real-time cell voltages, state of charge (SOC), health (SOH), and 8-fault diagnostic logs live in your browser.
          </p>
        </div>
        <Link 
          href="/dashboard" 
          className="px-6 py-3 bg-cyan-400 text-black text-xs font-mono font-bold rounded-xl hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 shrink-0"
        >
          Launch Live SaaS Dashboard
        </Link>
      </div>

    </div>
  );
}
