'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Cpu } from 'lucide-react';

export default function OEMApplicationPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-mono text-amber-400 font-bold uppercase font-mono">Custom Engineering</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">OEM White-Label & Custom BMS Design</h1>
        <p className="text-gray-400 text-sm">
          Collaborate directly with AXQUBIT R&D engineers in Vadodara to design custom PCB footprints, firmware algorithms, and private-label cloud platforms.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-amber-950/40 border border-amber-500/50 rounded-2xl text-center space-y-4 font-mono">
          <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">OEM Inquiry Assigned to Engineering Lead!</h2>
          <p className="text-xs text-gray-300">
            Our Chief Hardware Architect will review your requirements and reach out via email for an initial NDA & technical review call.
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-[#0f141c] border border-gray-800 rounded-2xl p-8 space-y-6 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-bold mb-2">OEM Company Name *</label>
              <input type="text" required placeholder="EV Motors India Ltd" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Primary Product Line *</label>
              <select className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400">
                <option>Electric Vehicles (2W / 3W / 4W)</option>
                <option>Solar Energy Storage (ESS)</option>
                <option>Industrial Power & UPS</option>
                <option>Robotics & Drones</option>
                <option>Medical Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Engineering Contact *</label>
              <input type="text" required placeholder="Lead Engineer Name" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Email Address *</label>
              <input type="email" required placeholder="engineer@oem.com" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2">Custom Hardware & Software Requirements</label>
            <textarea rows={4} placeholder="Specify cell count (e.g. 16S LiFePO4), continuous current (e.g. 150A), desired CAN baud rate, PCB size constraints, and white-label branding details..." className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400"></textarea>
          </div>
          <button type="submit" className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all">
            <Cpu className="w-4 h-4" /> Request OEM Engineering Quote
          </button>
        </form>
      )}
    </div>
  );
}
