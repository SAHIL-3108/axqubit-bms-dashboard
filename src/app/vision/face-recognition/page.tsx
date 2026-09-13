'use client';

import React from 'react';
import Link from 'next/link';
import { Users, CheckCircle2 } from 'lucide-react';

export default function FaceRecognitionPage() {
  const models = [
    { sku: 'AX-VIS-FACE-7IN', display: '7" Touchscreen', capacity: '50,000 Faces', speed: '< 0.18s', temp: 'Integrated IR Sensor', relay: 'Dual Wiegand + Dry Contact' },
    { sku: 'AX-VIS-FACE-GATE', display: 'Gate Turnstile Mount', capacity: '20,000 Faces', speed: '< 0.15s', temp: 'N/A', relay: 'Dry Contact Door Latch' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Users className="w-4 h-4 text-purple-400" />
          <span>AXQUBIT BIOMETRIC ACCESS CONTROL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Edge AI Face Recognition Terminals
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          High-accuracy biometric access control units powered by neural processing units (NPU) for instant offline template matching, attendance logging, and turnstile gate opening.
        </p>
      </div>

      <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <th className="p-4">SKU Model</th>
              <th className="p-4">Form Factor</th>
              <th className="p-4">Face Capacity</th>
              <th className="p-4">Match Speed</th>
              <th className="p-4">Thermal Sensor</th>
              <th className="p-4">Control Relays</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {models.map((m, i) => (
              <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-purple-400">{m.sku}</td>
                <td className="p-4 text-white font-bold">{m.display}</td>
                <td className="p-4 text-purple-300">{m.capacity}</td>
                <td className="p-4 text-emerald-400">{m.speed}</td>
                <td className="p-4">{m.temp}</td>
                <td className="p-4 text-gray-300">{m.relay}</td>
                <td className="p-4">
                  <Link href="/partners/oem" className="text-xs text-cyan-400 hover:underline">
                    Request Quote
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
