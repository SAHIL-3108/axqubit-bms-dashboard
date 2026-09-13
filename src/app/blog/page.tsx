'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Sparkles, Calendar, Clock, User } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'Case Study: Deploying 10,000 BMS6000 Units in EV 3-Wheelers in India',
      category: 'Case Study',
      date: 'September 2026',
      readTime: '6 min read',
      author: 'AXQUBIT Field Systems Team',
      excerpt: 'How active inductive cell balancing reduced thermal cell degradation by 34% and extended battery pack range in heavy urban rickshaw duty cycles across Delhi & Gujarat.',
    },
    {
      title: 'Why Extended Kalman Filtering (EKF) Beats Open Circuit Voltage Lookups in LiFePO4',
      category: 'Engineering Notes',
      date: 'August 2026',
      readTime: '8 min read',
      author: 'Dr. R. Mehta, Chief Scientist',
      excerpt: 'A mathematical deep dive into Coulomb counting drift compensation, temperature lookup matrices, and internal DC resistance tracking for state of health (SOH) prediction.',
    },
    {
      title: 'The Future of High-Voltage 1000V DC Battery Architecture for Microgrid ESS',
      category: 'Industry Commentary',
      date: 'July 2026',
      readTime: '5 min read',
      author: 'AXQUBIT R&D Lab',
      excerpt: 'Analyzing master-slave BMU topologies, galvanic isolation barriers, and insulation resistance safety standards in containerized solar storage.',
    },
  ];

  return (
    <div className="bg-[#0a0c0f] min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>AXQUBIT ENGINEERING INSIGHTS & CASE STUDIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Notes & Battery Intelligence Blog
        </h1>
        <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
          Technical articles, real-world deployment case studies, and engineering commentary directly from the AXQUBIT R&D hardware & software team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <div key={i} className="bg-[#0f141c] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl">
            <div className="space-y-4">
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-700">
                {p.category}
              </span>
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {p.title}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                {p.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-800 space-y-3 font-mono text-[11px] text-gray-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
              </div>
              <div className="text-gray-400 font-bold">{p.author}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
