'use client';

import React, { useState } from 'react';
import { LifeBuoy, Send, Download, CheckCircle2 } from 'lucide-react';

export default function HelpDeskPage() {
  const [ticketSent, setTicketSent] = useState(false);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 font-bold uppercase">Customer Support & Engineering SLA</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Help Desk & Firmware Download Center</h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Submit technical tickets to AXQUBIT Field Application Engineers (FAE), request custom CAN protocol mappings, and access official firmware binaries (.bin).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
        
        {/* Support Ticket Form */}
        <div className="bg-[#0f141c] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-purple-400" /> Submit Engineering Ticket
          </h2>

          {ticketSent ? (
            <div className="p-6 bg-purple-950/40 border border-purple-500/40 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-white font-bold text-sm">Ticket Created: #AX-SUP-8924</div>
              <div className="text-gray-400 text-[11px]">An FAE engineer will respond within 4 hours.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setTicketSent(true); }} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Your Name *</label>
                <input type="text" required placeholder="Technician Name" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">BMS Serial / SKU *</label>
                <input type="text" required placeholder="AX-BMS6000-16S-9921" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Issue Category</label>
                <select className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400">
                  <option>CAN Bus Inverter Handshake</option>
                  <option>Active Balance Calibration</option>
                  <option>SaaS Cloud Telemetry Offline</option>
                  <option>Firmware OTA Flashing</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Detailed Description *</label>
                <textarea rows={3} placeholder="Describe fault register alerts or telemetry symptoms..." className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-purple-400 hover:bg-purple-300 text-black font-bold rounded-xl flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Ticket
              </button>
            </form>
          )}
        </div>

        {/* Firmware Download Center */}
        <div className="bg-[#0f141c] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-400" /> Firmware Center (.bin)
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
              <div className="flex justify-between text-cyan-400 font-bold">
                <span>BMS6000 Firmware v2.4.1</span>
                <span>ESP32-S3</span>
              </div>
              <div className="text-[11px] text-gray-400">Added active balancing ΔV hysteresis tuning and Deye CAN auto-detect.</div>
              <button onClick={() => alert('Downloading Firmware v2.4.1')} className="text-[11px] text-cyan-400 hover:underline pt-1 inline-block">
                Download .BIN (1.4 MB) →
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
              <div className="flex justify-between text-amber-400 font-bold">
                <span>HV Stack Master v1.8.0</span>
                <span>STM32F4</span>
              </div>
              <div className="text-[11px] text-gray-400">Insulation resistance self-test routine & pre-charge contactor timing.</div>
              <button onClick={() => alert('Downloading Firmware v1.8.0')} className="text-[11px] text-amber-400 hover:underline pt-1 inline-block">
                Download .BIN (980 KB) →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
