'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ResellerApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: 'India',
    annualVolume: '50 - 200 units',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Partner Portal</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Reseller Application Form</h1>
        <p className="text-gray-400 text-sm">
          Complete the form below to apply for AXQUBIT Reseller wholesale pricing and sales authorization.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-cyan-950/40 border border-cyan-500/50 rounded-2xl text-center space-y-4 font-mono">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Reseller Application Received!</h2>
          <p className="text-xs text-gray-300">
            Thank you, {formData.contactName}. Our partner manager will review your submission and email your wholesale catalog within 24 business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#0f141c] border border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
            <div>
              <label className="block text-gray-300 font-bold mb-2">Company / Shop Name *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Apex Lithium Solutions"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-2">Contact Person *</label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Full Name"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-2">Business Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sales@company.com"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-2">Phone / WhatsApp *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-2">Country / Region</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-2">Estimated Quarterly Volume</label>
              <select
                value={formData.annualVolume}
                onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="25 - 50 units">25 - 50 units</option>
                <option value="50 - 200 units">50 - 200 units</option>
                <option value="200 - 1000 units">200 - 1,000 units</option>
                <option value="1000+ units">1,000+ units</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-mono">
            <label className="block text-gray-300 font-bold mb-2">Additional Business Information</label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us about your current products, EV/battery lines, or target customers..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Send className="w-4 h-4" /> Submit Reseller Application
          </button>
        </form>
      )}

    </div>
  );
}
