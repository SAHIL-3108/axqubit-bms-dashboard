'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Gauge,
  Thermometer
} from 'lucide-react';

export default function TechnologyPage() {
  const [activeTab, setActiveTab] = useState<'balancing' | 'soc' | 'protection' | 'comms'>('balancing');

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT CORE HARDWARE & ALGORITHM SPECIFICATION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Deep Technical Architecture & Engineering
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          An in-depth look at AXQUBIT’s active inductive cell balancing, Extended Kalman Filter SOC/SOH estimators, 8-fault hardware safety matrix, and isolated dual CAN/RS485 communication protocols.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b border-gray-800 scrollbar-none">
        <div className="flex gap-2 p-1 bg-gray-900/60 border border-gray-800 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveTab('balancing')}
            className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'balancing' 
                ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Active Balancing</span>
          </button>

          <button
            onClick={() => setActiveTab('soc')}
            className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'soc' 
                ? 'bg-emerald-400 text-black shadow-md shadow-emerald-500/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Kalman SOC / SOH</span>
          </button>

          <button
            onClick={() => setActiveTab('protection')}
            className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'protection' 
                ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>8-Fault Protection</span>
          </button>

          <button
            onClick={() => setActiveTab('comms')}
            className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'comms' 
                ? 'bg-purple-400 text-black shadow-md shadow-purple-500/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>CAN & MQTT Topology</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE BALANCING */}
      {activeTab === 'balancing' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white">
                Active Inductive Balancing Circuit (1.2A – 3.0A)
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Conventional passive BMS systems bleed overcharged cell energy through resistors, wasting up to 15% of pack energy as heat. AXQUBIT’s Active Inductive Balancing circuit uses high-frequency switching inductors to transfer charge directly between neighboring cells.
              </p>
              <div className="space-y-2 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Bidirectional Buck-Boost Inductive Energy Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Delta Voltage (ΔV) Accuracy Trigger &lt; 3 mV</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Eliminates Thermal Hotspots & Extends Pack Life by +30%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Active in Charge, Discharge, and Standby Modes</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Diagram Box */}
            <div className="bg-[#0f141c] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl font-mono text-xs">
              <div className="text-cyan-400 font-bold mb-4 flex justify-between">
                <span>ACTIVE CELL BALANCING TOPOLOGY</span>
                <span className="text-emerald-400">STATUS: ENGAGED</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-900 border border-emerald-500/40 rounded flex items-center justify-between">
                  <span>CELL #3 (3.385V - High)</span>
                  <span className="text-emerald-400 font-bold">1.5A OUT → Inductor</span>
                </div>
                <div className="text-center text-cyan-400 font-bold">⚡ High-Frequency PWM Transfer (500 kHz)</div>
                <div className="p-3 bg-gray-900 border border-cyan-500/40 rounded flex items-center justify-between">
                  <span>CELL #4 (3.372V - Low)</span>
                  <span className="text-cyan-400 font-bold">1.5A IN ← Inductor</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: KALMAN SOC / SOH */}
      {activeTab === 'soc' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white">
                Extended Kalman Filter (EKF) SOC & SOH Estimation
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Simple voltage lookups fail in LiFePO₄ batteries because the open-circuit voltage curve remains completely flat between 20% and 80% SOC. AXQUBIT implements an Extended Kalman Filter (EKF) combining 16-bit Coulomb Counting shunt integration, internal cell resistance estimation, and dynamic temperature lookup tables.
              </p>
              <div className="space-y-2 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>State of Charge (SOC) Precision Error &lt; ±1.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Internal Resistance (DCIR) Tracking for SOH</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Remaining Useful Life (RUL) Predictive Cycle Count Model</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0f141c] border border-emerald-500/30 rounded-2xl p-6 font-mono text-xs space-y-4">
              <div className="text-emerald-400 font-bold">EKF ALGORITHM PIPELINE</div>
              <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                1. Predict State: x_k = A · x_k-1 + B · u_k (Coulomb Integration)
              </div>
              <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                2. Calculate Kalman Gain: K_k = P_k · H^T · (H · P_k · H^T + R)^-1
              </div>
              <div className="p-3 bg-gray-900 border border-emerald-500/40 rounded text-emerald-300">
                3. Update State & Resistance: x̂_k = x_k + K_k · (z_k - h(x_k))
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: 8-FAULT PROTECTION */}
      {activeTab === 'protection' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">
              8-Fault Hardware Safety Register Architecture
            </h2>
            <p className="text-xs text-gray-300 max-w-3xl leading-relaxed">
              Every AXQUBIT BMS incorporates a dual-layer fault detection engine: dedicated hardware IC comparator latches for nanosecond trip protection, and MCU-level software thresholds for warning triggers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">1. OVP (Over Voltage)</div>
                <div className="text-[11px] text-gray-400">Cell V &gt; 3.65V | Latches charge MOSFET cutoff in 10ms</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">2. UVP (Under Voltage)</div>
                <div className="text-[11px] text-gray-400">Cell V &lt; 2.50V | Latches discharge MOSFET cutoff</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">3. OCP (Over Current)</div>
                <div className="text-[11px] text-gray-400">Current &gt; 250A | Dual level hardware shunt trigger</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">4. OTP (Over Temp)</div>
                <div className="text-[11px] text-gray-400">Temp &gt; 65°C | Thermal cutoff on NTC probes</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">5. UTP (Under Temp)</div>
                <div className="text-[11px] text-gray-400">Temp &lt; 0°C | Blocks charging to prevent dendrites</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">6. SCP (Short Circuit)</div>
                <div className="text-[11px] text-gray-400">Instant hardware isolation in &lt; 200 µs</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">7. Cell Imbalance</div>
                <div className="text-[11px] text-gray-400">ΔV &gt; 100 mV | Triggers warning & limits C-rate</div>
              </div>
              <div className="p-4 bg-[#0f141c] border border-amber-500/30 rounded-xl space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400">8. Sensor Fault</div>
                <div className="text-[11px] text-gray-400">NTC wire break / AFE wire disconnect auto-detect</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMMS TOPOLOGY */}
      {activeTab === 'comms' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-white">
                Multi-Protocol Industrial Comms & Cloud MQTT
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                AXQUBIT hardware communicates natively across all industrial standards. Dual galvanically isolated CAN 2.0B ports allow simultaneous telemetry transmission to EV motor controllers and solar inverters, while the onboard ESP32-S3 streams encrypted MQTT data over Wi-Fi or Cellular gateways.
              </p>
              <div className="space-y-2 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>CAN Bus 2.0B (500 kbps / 250 kbps) with PGN & J1939 protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Isolated RS485 Modbus RTU Slave/Master Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Bluetooth 5.0 Low Energy (BLE) Mobile App connection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Secure MQTT / WebSockets streaming to SaaS Dashboard</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0f141c] border border-purple-500/30 rounded-2xl p-6 font-mono text-xs space-y-3">
              <div className="text-purple-400 font-bold">NETWORK TOPOLOGY DIAGRAM</div>
              <div className="p-3 bg-gray-900 border border-purple-500/40 rounded flex justify-between">
                <span>[BMS6000 Controller]</span>
                <span className="text-purple-300">MCU: ESP32-S3</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
                  <div className="text-cyan-400 font-bold">CAN Port 1</div>
                  <div className="text-gray-400">EV Motor Controller / Inverter</div>
                </div>
                <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
                  <div className="text-emerald-400 font-bold">RS485 Port</div>
                  <div className="text-gray-400">PLC / Modbus Energy Meter</div>
                </div>
                <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
                  <div className="text-amber-400 font-bold">Bluetooth BLE</div>
                  <div className="text-gray-400">Technician Mobile App</div>
                </div>
                <div className="p-2.5 bg-gray-900 rounded border border-gray-800">
                  <div className="text-purple-400 font-bold">MQTT / WSS</div>
                  <div className="text-gray-400">AXQUBIT SaaS Cloud</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
