'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function DistributorApplicationPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-mono text-emerald-400 font-bold uppercase font-mono">Territory Partnership</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">National / Regional Distributor Application</h1>
        <p className="text-gray-400 text-sm">
          Apply for exclusive territory distribution rights, credit terms, and dedicated technical SLA support.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center space-y-4 font-mono">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Distributor Inquiry Submitted!</h2>
          <p className="text-xs text-gray-300">
            Our Director of Global Sales will contact you directly to schedule an executive briefing.
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-[#0f141c] border border-gray-800 rounded-2xl p-8 space-y-6 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-bold mb-2">Company Name *</label>
              <input type="text" required placeholder="Distributor Corp" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Target Territory *</label>
              <input type="text" required placeholder="e.g. Western India / Germany / UAE" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Work Email *</label>
              <input type="email" required placeholder="corp@distributor.com" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Phone Number *</label>
              <input type="text" required placeholder="+91 98765 43210" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400" />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2">Current Logistics & Warehousing Infrastructure</label>
            <textarea rows={4} placeholder="Describe warehouse location, sales team size, and existing battery client base..." className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400"></textarea>
          </div>
          <button type="submit" className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all">
            <Send className="w-4 h-4" /> Submit Distributor Proposal
          </button>
        </form>
      )}
    </div>
  );
}
