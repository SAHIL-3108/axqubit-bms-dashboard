'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact AXQUBIT Engineering & Sales</h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Have a question about our BMS products, power supplies, sample orders, or custom B2B projects? Our team in Vadodara is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Details */}
        <div className="space-y-6 bg-[#0f141c] border border-gray-800 rounded-2xl p-8 font-mono text-xs text-gray-300">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
            AXQUBIT Headquarters
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Head Office & R&D Center</div>
                <div className="text-gray-400 text-[11px] mt-0.5">
                  AXQUBIT Tech Park, GIDC Industrial Estate,<br />
                  Vadodara, Gujarat 390010, India 🇮🇳
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Email Communications</div>
                <div className="text-gray-400 text-[11px]">Sales: sales@axqubit.com</div>
                <div className="text-gray-400 text-[11px]">Support: support@axqubit.com</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Phone & WhatsApp</div>
                <div className="text-gray-400 text-[11px]">+91 (265) 299-AXQUBIT</div>
                <div className="text-gray-400 text-[11px]">+91 98765 43210</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-[#0f141c] border border-gray-800 rounded-2xl p-8 font-mono text-xs space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
            Send an Online Inquiry
          </h2>

          {submitted ? (
            <div className="p-8 bg-cyan-950/40 border border-cyan-500/50 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <div className="text-white font-bold text-base">Message Sent Successfully!</div>
              <div className="text-gray-300">Thank you for reaching out. An AXQUBIT representative will respond within 12 hours.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Your Name *</label>
                  <input type="text" required placeholder="Full Name" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Email Address *</label>
                  <input type="email" required placeholder="name@company.com" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Subject</label>
                <input type="text" placeholder="e.g. BMS6000 16S Sample Request" className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Message *</label>
                <textarea rows={4} required placeholder="Write your inquiry here..." className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"></textarea>
              </div>
              <button type="submit" className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
