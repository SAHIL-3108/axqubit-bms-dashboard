'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  BatteryCharging, 
  Cpu, 
  ShieldCheck, 
  Eye, 
  Layers, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  Radio, 
  ChevronRight, 
  Building2, 
  FileText, 
  ShoppingBag,
  Gauge,
  Thermometer,
  Lock,
  Globe
} from 'lucide-react';

export default function Home() {
  const [telemetrySim, setTelemetrySim] = useState({
    soc: 88.5,
    soh: 98.2,
    voltage: 52.8,
    current: 24.3,
    temp: 29.4,
    balancing: true
  });

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800/60 overflow-hidden">
        {/* Glowing Background Radial Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -top-20 right-10 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              
              {/* Release Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-semibold">BMS6000 SERIES II HARDWARE & SAAS PLATFORM</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Intelligence for{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Next-Gen Energy
                </span>{' '}
                & Industrial Automation
              </h1>

              {/* Subheading */}
              <p className="text-lg text-gray-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                AXQUBIT Technologies manufactures industrial-grade Lithium Battery Management Systems (BMS), active cell balancing hardware, high-efficiency power electronics, and edge AI vision solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/bms/smart-series"
                  className="px-6 py-3.5 text-sm font-bold font-mono text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <BatteryCharging className="w-4 h-4" />
                  <span>Explore BMS6000 Smart Series</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="px-6 py-3.5 text-sm font-bold font-mono text-gray-200 hover:text-white bg-gray-900 hover:bg-gray-800 border border-cyan-500/30 rounded-xl transition-all flex items-center gap-2"
                >
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Launch SaaS Dashboard</span>
                </Link>

                <Link
                  href="/catalogue"
                  className="px-6 py-3.5 text-sm font-mono text-gray-400 hover:text-gray-200 border border-gray-800 rounded-xl transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Catalogue</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-800/80 max-w-md mx-auto lg:mx-0 font-mono text-xs text-gray-400">
                <div>
                  <div className="text-xl font-bold text-white">10,000+</div>
                  <div>Deployed EV Packs</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-400">&lt; 500 ms</div>
                  <div>Telemetry Latency</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-400">99.8%</div>
                  <div>System Accuracy</div>
                </div>
              </div>

            </div>

            {/* Right Interactive Telemetry Preview Card */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative bg-[#0d121a] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl">
                {/* Header of Preview */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono">PACK #AX-6000-LIVE</h3>
                      <span className="text-[11px] text-cyan-400 font-mono">16S 48V 100Ah LiFePO₄ Battery Pack</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-700/50">
                    CAN BUS OK
                  </span>
                </div>

                {/* Simulated Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 py-5">
                  <div className="bg-[#121924] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>State of Charge (SOC)</span>
                      <Gauge className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-cyan-300 font-mono">{telemetrySim.soc}%</div>
                    <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full" style={{ width: `${telemetrySim.soc}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-[#121924] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Health Index (SOH)</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">{telemetrySim.soh}%</div>
                    <div className="text-[11px] text-gray-400 mt-2 font-mono">Est. RUL: 2,850 Cycles</div>
                  </div>

                  <div className="bg-[#121924] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Pack Voltage / Current</span>
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{telemetrySim.voltage} V</div>
                    <div className="text-xs text-amber-400 font-mono mt-1">+{telemetrySim.current} A Charging</div>
                  </div>

                  <div className="bg-[#121924] p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>NTC Temperature</span>
                      <Thermometer className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="text-xl font-bold text-white font-mono">{telemetrySim.temp} °C</div>
                    <div className="text-xs text-emerald-400 font-mono mt-1">Nominal Range</div>
                  </div>
                </div>

                {/* Active Balance Indicator */}
                <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3.5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span className="text-cyan-200">Active Cell Balancing Engaged (ΔV = 4 mV)</span>
                  </div>
                  <span className="text-emerald-400 font-bold">1.2A Transfer</span>
                </div>

                {/* CTA Link */}
                <div className="mt-4 text-center">
                  <Link href="/dashboard" className="text-xs font-mono text-cyan-400 hover:underline flex items-center justify-center gap-1">
                    Open Full Multi-Pack Telemetry SaaS Studio <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK CATEGORY NAVIGATION STRIP */}
      <section className="py-6 bg-[#080b0e] border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto gap-4 scrollbar-none py-1">
            
            <Link href="/bms/protection-series" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-xs font-mono text-gray-300 hover:text-white shrink-0 transition-all">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>BMS Protection Series</span>
            </Link>

            <Link href="/bms/smart-series" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-xs font-mono text-cyan-300 shrink-0 transition-all">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>BMS6000 Smart IoT</span>
            </Link>

            <Link href="/bms/high-voltage" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-amber-500/50 text-xs font-mono text-gray-300 hover:text-white shrink-0 transition-all">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>HV BMS Stacks (1000V)</span>
            </Link>

            <Link href="/power/smps" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-amber-500/50 text-xs font-mono text-gray-300 hover:text-white shrink-0 transition-all">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Industrial SMPS</span>
            </Link>

            <Link href="/power/inverters" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-yellow-500/50 text-xs font-mono text-gray-300 hover:text-white shrink-0 transition-all">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Hybrid Inverters</span>
            </Link>

            <Link href="/vision/face-recognition" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/50 text-xs font-mono text-gray-300 hover:text-white shrink-0 transition-all">
              <Eye className="w-4 h-4 text-purple-400" />
              <span>AI Vision Line</span>
            </Link>

          </div>
        </div>
      </section>

      {/* CORE PRODUCT LINE MATRIX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            AXQUBIT Flagship Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered for Industrial Reliability & High Energy Density
          </h2>
          <p className="text-gray-400 text-sm">
            From precision lithium cell protection to cloud-connected battery telemetry, high-efficiency power supplies, and edge AI visual recognition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: BMS Category */}
          <div className="bg-[#0f141c] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/60 transition-all group shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                Category Hub 01
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Battery Management Systems (BMS)
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Smart BMS boards from 3S to 24S (LiFePO₄ / NMC / LTO) and High-Voltage stacks up to 1000V. Featuring active balancing, Coulomb Counting SOC, CAN bus, RS485, and MQTT cloud telemetry.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> BMS Protection Series (Hardware PCM)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> BMS6000 Smart Series (IoT Enabled)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> High Voltage HV ESS Series (1000V)
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-800">
              <Link href="/bms" className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                Explore BMS Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Power Systems */}
          <div className="bg-[#0f141c] border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all group shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider block">
                Category Hub 02
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Power Electronics & Conversion
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Switched-mode power supplies (SMPS), pure sine wave hybrid inverters, and online double-conversion UPS systems designed for critical telecom, industrial, and solar storage applications.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Industrial SMPS (12V/24V/48V)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Pure Sine Wave Hybrid Inverters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Industrial Online Double UPS
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-800">
              <Link href="/power" className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                Explore Power Electronics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: AI Vision */}
          <div className="bg-[#0f141c] border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-400/60 transition-all group shadow-xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-purple-400 font-semibold uppercase tracking-wider block">
                Category Hub 03
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                AI Vision & Access Line
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Edge AI facial recognition cameras and Automatic Number Plate Recognition (ANPR) units. Neural network processing on edge hardware for security, tolling, and fleet logistics.
              </p>
              <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Face Recognition Access Terminals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> High-Speed ANPR Cameras
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Edge AI Analytics Engine
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-800">
              <Link href="/vision" className="text-xs font-mono font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                Explore AI Vision Systems <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* DEEP TECHNOLOGY PREVIEW SECTION */}
      <section className="py-20 bg-[#070a0e] border-y border-gray-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>AXQUBIT Engineering Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Deep Technical Rigor & Multi-Fault Protection Architecture
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                AXQUBIT systems combine active inductive cell balancing, dual-stage hardware current shunts, and Extended Kalman Filtering for precise state estimation across cell temperature extremes.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-gray-900/90 border border-gray-800 rounded-xl">
                  <div className="text-xs font-mono text-cyan-400 font-bold mb-1">Active Balancing</div>
                  <div className="text-xs text-gray-400">1.2A - 3.0A bi-directional charge transfer between adjacent cells.</div>
                </div>

                <div className="p-3.5 bg-gray-900/90 border border-gray-800 rounded-xl">
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">SOC / SOH Kalman</div>
                  <div className="text-xs text-gray-400">Coulomb counting with automatic temperature compensation.</div>
                </div>

                <div className="p-3.5 bg-gray-900/90 border border-gray-800 rounded-xl">
                  <div className="text-xs font-mono text-amber-400 font-bold mb-1">8-Fault Register</div>
                  <div className="text-xs text-gray-400">OVP, UVP, OCP, OTP, UTP, Short Circuit, Sensor & Deviation alerts.</div>
                </div>

                <div className="p-3.5 bg-gray-900/90 border border-gray-800 rounded-xl">
                  <div className="text-xs font-mono text-purple-400 font-bold mb-1">Dual CAN & RS485</div>
                  <div className="text-xs text-gray-400">Isolated industrial transceiver buses + MQTT WebSocket telemetry.</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/technology" className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold font-mono text-white bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 rounded-xl transition-all">
                  <span>View Interactive Technology Diagrams</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>

            {/* Circuit Topology Schematic Box */}
            <div className="flex-1 w-full max-w-lg bg-[#0c1118] p-6 rounded-2xl border border-cyan-500/30 shadow-2xl font-mono text-xs text-gray-300">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span className="text-cyan-400 font-bold">BMS6000 Topology Diagram</span>
                <span className="text-[10px] text-gray-400">ESP32-S3 MCU</span>
              </div>
              <div className="py-4 space-y-3">
                <div className="p-3 bg-gray-900/90 rounded border border-cyan-900/50 flex justify-between items-center">
                  <span>[Cells 1–16 LiFePO4]</span>
                  <span className="text-cyan-400">⇄ 7-Pin Balance Harness</span>
                </div>
                <div className="text-center text-cyan-400">↓ Analog Front End (AFE)</div>
                <div className="p-3 bg-gray-900/90 rounded border border-cyan-900/50 flex justify-between items-center">
                  <span>[100A Shunt & NTCs]</span>
                  <span className="text-emerald-400">⇄ ADC 16-bit Delta-Sigma</span>
                </div>
                <div className="text-center text-cyan-400">↓ Isolated Bus Transceivers</div>
                <div className="p-3 bg-gray-900/90 rounded border border-cyan-900/50 flex justify-between items-center">
                  <span>[CAN Bus 2.0B / RS485]</span>
                  <span className="text-purple-400">⇄ Secure MQTT TLS</span>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-gray-400 text-center border-t border-gray-800">
                Hardware design verified at AXQUBIT R&D Facility, Vadodara.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TARGET APPLICATIONS GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
              Industry Verticals
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Tailored Solutions for Demanding Applications
            </h2>
          </div>
          <Link href="/applications" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
            Browse All Application Notes →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/applications/electric-vehicles" className="p-5 bg-[#0f141c] border border-gray-800 hover:border-cyan-500/50 rounded-2xl transition-all group">
            <div className="text-2xl mb-3">🚗</div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Electric Vehicles (EV)
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Pack monitoring for 2-wheeler, 3-wheeler, and light commercial EV fleets with vibration resistance.
            </p>
          </Link>

          <Link href="/applications/solar-energy-storage" className="p-5 bg-[#0f141c] border border-gray-800 hover:border-emerald-500/50 rounded-2xl transition-all group">
            <div className="text-2xl mb-3">☀️</div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              Solar ESS Storage
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Multi-string high voltage rack BMS for residential, microgrid, and commercial solar energy storage.
            </p>
          </Link>

          <Link href="/applications/telecom" className="p-5 bg-[#0f141c] border border-gray-800 hover:border-amber-500/50 rounded-2xl transition-all group">
            <div className="text-2xl mb-3">📡</div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Telecom Towers
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              48V 100Ah / 200Ah rack-mounted backup BMS with RS485 SNMP gateway integration.
            </p>
          </Link>

          <Link href="/applications/industrial-ups" className="p-5 bg-[#0f141c] border border-gray-800 hover:border-purple-500/50 rounded-2xl transition-all group">
            <div className="text-2xl mb-3">🏭</div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              Industrial UPS
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              High-rate discharge protection for data center and medical continuous power supplies.
            </p>
          </Link>
        </div>
      </section>

      {/* FINAL B2B CALL TO ACTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono inline-block">
              AXQUBIT B2B & OEM PARTNERSHIP PROGRAM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Partner with AXQUBIT for Direct Engineering & Volume Supply
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Whether you are an EV battery pack assembler, solar system integrator, or OEM distributor, get custom hardware modifications, white-label branding, and dedicated tech support.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/partners/oem"
                className="px-6 py-3 text-xs font-bold font-mono text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all flex items-center gap-2"
              >
                <span>Apply as OEM Partner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalogue"
                className="px-6 py-3 text-xs font-mono text-gray-200 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-all"
              >
                <span>Download Model Datasheets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
