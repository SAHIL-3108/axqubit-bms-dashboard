'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';

export default function ANPRPage() {
  const models = [
    { sku: 'AX-VIS-ANPR-2MP', sensor: '2MP Starlight Sony Sensor', speed: 'Up to 90 km/h', distance: '5m – 20m Detection', led: '850nm IR Illuminator', protection: 'IP67 / IK10' },
    { sku: 'AX-VIS-ANPR-4MP-HIGH', sensor: '4MP High-Speed AI Sensor', speed: 'Up to 160 km/h', distance: '10m – 40m Highway', led: 'White Light + IR Hybrid', protection: 'IP67 Outdoor Vandal' },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span>AXQUBIT AUTOMATIC NUMBER PLATE RECOGNITION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          ANPR License Plate Recognition Cameras
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Smart optical cameras equipped with deep learning OCR models to capture, index, and match vehicle license plates in parking lots, toll barriers, and high-speed highway lanes.
        </p>
      </div>

      <div className="overflow-x-auto bg-[#0f141c] border border-gray-800 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-gray-900/80 text-gray-400 border-b border-gray-800">
              <th className="p-4">SKU Model</th>
              <th className="p-4">Sensor Spec</th>
              <th className="p-4">Vehicle Speed Limit</th>
              <th className="p-4">Detection Range</th>
              <th className="p-4">Illumination</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {models.map((m, i) => (
              <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-indigo-400">{m.sku}</td>
                <td className="p-4 text-white font-bold">{m.sensor}</td>
                <td className="p-4 text-emerald-400">{m.speed}</td>
                <td className="p-4">{m.distance}</td>
                <td className="p-4 text-indigo-300">{m.led}</td>
                <td className="p-4 text-gray-300">{m.protection}</td>
                <td className="p-4">
                  <Link href="/partners/oem" className="text-xs text-cyan-400 hover:underline">
                    Request Spec Sheet
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
