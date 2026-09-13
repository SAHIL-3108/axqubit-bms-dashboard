'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VisionCategoryHub() {
  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Banner */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Eye className="w-4 h-4 text-purple-400" />
          <span>AXQUBIT EDGE AI VISION SYSTEMS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Edge AI Biometric & Optical Analytics
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          High-performance AI cameras and edge inference terminals running deep neural networks directly on chip for zero-latency facial recognition, access control, and vehicle Automatic Number Plate Recognition (ANPR).
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Face Recognition */}
        <div className="bg-[#0f141c] border border-purple-500/30 rounded-2xl p-8 flex flex-col justify-between hover:border-purple-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Face Recognition Access Terminals</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Biometric access control terminals with dual 3D IR liveness detection, thermal body temp sensing, and 50,000 face template offline database matching under 0.2 seconds.
            </p>
            <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Match Speed &lt; 0.2 seconds (99.9% Accuracy)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Anti-Spoofing 3D Infrared Liveness Sensor
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Wiegand, RS485, Relay & Ethernet API
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/vision/face-recognition" className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>View Face Recognition Lineup</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ANPR */}
        <div className="bg-[#0f141c] border border-indigo-500/30 rounded-2xl p-8 flex flex-col justify-between hover:border-indigo-400/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">ANPR License Plate Recognition</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Industrial outdoor ANPR cameras capable of capturing vehicle license plates at speeds up to 160 km/h under extreme low-light night conditions with IR strobe illuminators.
            </p>
            <ul className="space-y-2 text-xs font-mono text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Vehicle Speed: Up to 160 km/h
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> OCR Accuracy &gt; 98.5% across 100+ countries
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> IP67 Waterproof & IK10 Vandal-Proof
              </li>
            </ul>
          </div>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <Link href="/vision/anpr" className="w-full py-2.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <span>View ANPR Camera Lineup</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
