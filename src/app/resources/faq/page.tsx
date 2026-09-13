'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    { q: 'How does AXQUBIT Active Cell Balancing work compared to passive balancing?', a: 'AXQUBIT Active Cell Balancing uses high-frequency inductive energy transfer to dynamically move charge from higher-voltage cells to lower-voltage cells at up to 2.0A transfer current. Unlike passive balancing which converts excess energy into heat through resistors, active balancing saves battery capacity and prevents thermal hot spots.' },
    { q: 'Can AXQUBIT BMS communicate with major inverter brands?', a: 'Yes. The BMS6000 and High-Voltage Series include pre-programmed CAN 2.0B and RS485 Modbus protocol definitions for brands including Victron Energy, Growatt, Deye, SMA, Voltronic, and Sofar.' },
    { q: 'How do I connect the BMS6000 to the Cloud SaaS platform?', a: 'The BMS6000 includes an onboard ESP32-S3 microcontroller with Wi-Fi and Bluetooth. Simply configure your Wi-Fi credentials via the mobile app or web portal. The device automatically establishes an encrypted TLS MQTT WebSocket connection to the SaaS Dashboard.' },
    { q: 'What safety protections are built into AXQUBIT hardware?', a: 'AXQUBIT BMS hardware features an 8-fault safety engine covering cell Over-Voltage (OVP), Under-Voltage (UVP), Over-Current (OCP), Over-Temperature (OTP), Under-Temperature (UTP), Short-Circuit (SCP), Cell Imbalance, and NTC Sensor Break detection.' },
    { q: 'Where are AXQUBIT products engineered and manufactured?', a: 'All AXQUBIT hardware, firmware, and SaaS cloud platforms are designed and manufactured at our R&D facility in Vadodara, Gujarat, India 🇮🇳.' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Help & Knowledge Base</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions (FAQ)</h1>
        <p className="text-gray-400 text-sm">
          Find instant answers to common technical, wiring, protocol, and cloud integration questions.
        </p>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#0f141c] border border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between font-bold text-white hover:bg-gray-800/40 transition-colors"
            >
              <span className="text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                {faq.q}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openIdx === idx ? 'rotate-180 text-emerald-400' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="p-5 pt-0 text-gray-300 border-t border-gray-800/60 leading-relaxed font-sans text-xs">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
