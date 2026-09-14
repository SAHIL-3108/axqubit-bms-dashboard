'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2,
  MessageSquare,
  Send,
  Star
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterXIcon, YoutubeIcon } from './SocialIcons';

export default function Footer() {
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Hide footer inside dashboard
  if (pathname.startsWith('/dashboard')) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#07090c] border-t border-gray-800/80 text-gray-400 text-sm">
      {/* Top Banner Callout with Social Media & GitHub Banner */}
      <div className="border-b border-gray-800/60 bg-gradient-to-r from-cyan-950/50 via-blue-950/30 to-purple-950/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>OEM & Open Hardware Engineering</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Join the AXQUBIT Hardware & Energy Revolution
            </h3>
            <p className="text-gray-300 mt-1 text-sm max-w-2xl">
              Engineered in Vadodara, Gujarat 🇮🇳. Star our GitHub repositories or consult with AXQUBIT R&D engineers for custom battery architecture, active balancing, and power electronics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/SAHIL-3108/axqubit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 text-xs font-bold font-mono text-white bg-gray-900 hover:bg-gray-800 border border-cyan-500/50 hover:border-cyan-400 rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>GitHub Base</span>
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </a>

            <Link
              href="/partners/oem"
              className="px-5 py-3 text-xs font-bold font-mono text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              Request OEM Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand, Address & Social Icons Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Zap className="w-5 h-5 text-black font-bold fill-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-white">
                  AXQUBIT
                </span>
                <span className="text-[10px] tracking-widest text-cyan-400 font-mono uppercase -mt-1">
                  Technologies
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              AXQUBIT Technologies is an innovation-driven battery management, industrial power electronics, and edge AI hardware manufacturer headquartered in Vadodara, Gujarat, India.
            </p>

            {/* Social Media Links Bar */}
            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://github.com/SAHIL-3108/axqubit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                title="GitHub Repo"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                title="Twitter / X"
              >
                <TwitterXIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-rose-400 hover:border-rose-500/50 transition-all"
                title="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@axqubit.com"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2 pt-2 text-xs font-mono text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>AXQUBIT Tech Park, GIDC Industrial Estate, Vadodara, Gujarat 390010, India 🇮🇳</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>contact@axqubit.com | sales@axqubit.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 (265) 299-AXQUBIT / +91 98765 43210</span>
              </div>
            </div>

            {/* Newsletter Box */}
            <div className="pt-2">
              <div className="text-xs font-mono font-bold text-white mb-2">Subscribe to Hardware Engineering Notes</div>
              {subscribed ? (
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="engineer@company.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 flex-1 font-mono"
                  />
                  <button type="submit" className="px-3 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs rounded-lg transition-colors flex items-center gap-1">
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>

            {/* Certifications Badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> ISO 9001:2015
              </span>
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" /> CE Certified
              </span>
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded text-[11px] font-mono text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-amber-400" /> RoHS Compliant
              </span>
              <span className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded text-[11px] font-mono text-purple-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-purple-400" /> UN38.3 Safety
              </span>
            </div>
          </div>

          {/* Product Lines Column */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Products & Lines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/bms/smart-series" className="hover:text-cyan-400 transition-colors">
                  BMS6000 Smart Series
                </Link>
              </li>
              <li>
                <Link href="/bms/protection-series" className="hover:text-cyan-400 transition-colors">
                  PCM Protection Series
                </Link>
              </li>
              <li>
                <Link href="/bms/high-voltage" className="hover:text-cyan-400 transition-colors">
                  High-Voltage Stacks (1000V)
                </Link>
              </li>
              <li>
                <Link href="/power/smps" className="hover:text-cyan-400 transition-colors">
                  Industrial SMPS Power Supplies
                </Link>
              </li>
              <li>
                <Link href="/power/inverters" className="hover:text-cyan-400 transition-colors">
                  Pure Sine Wave Inverters
                </Link>
              </li>
              <li>
                <Link href="/power/ups" className="hover:text-cyan-400 transition-colors">
                  Double-Conversion UPS
                </Link>
              </li>
              <li>
                <Link href="/vision/face-recognition" className="hover:text-cyan-400 transition-colors">
                  Edge AI Face Access
                </Link>
              </li>
              <li>
                <Link href="/vision/anpr" className="hover:text-cyan-400 transition-colors">
                  ANPR License Plate Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Applications Column */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Applications
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/applications/electric-vehicles" className="hover:text-cyan-400 transition-colors">
                  Electric Vehicles (2W/3W/4W)
                </Link>
              </li>
              <li>
                <Link href="/applications/solar-energy-storage" className="hover:text-cyan-400 transition-colors">
                  Solar Energy Storage (ESS)
                </Link>
              </li>
              <li>
                <Link href="/applications/telecom" className="hover:text-cyan-400 transition-colors">
                  Telecom Base Station Backup
                </Link>
              </li>
              <li>
                <Link href="/applications/industrial-ups" className="hover:text-cyan-400 transition-colors">
                  Industrial & Data Center Power
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-cyan-400 transition-colors font-semibold text-cyan-400">
                  Active Balancing Architecture
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-cyan-400 transition-colors font-semibold text-cyan-400">
                  Interactive Model Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources Column */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              GitHub & Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="https://github.com/SAHIL-3108/axqubit" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub: SAHIL-3108/axqubit
                </a>
              </li>
              <li>
                <a href="https://github.com/SAHIL-3108/axqubit-bms-dashboard" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-bold flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub: axqubit-bms-dashboard
                </a>
              </li>
              <li>
                <Link href="/company/about" className="hover:text-cyan-400 transition-colors">
                  Why AXQUBIT (About Us)
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-cyan-400 transition-colors">
                  Partner Overview
                </Link>
              </li>
              <li>
                <Link href="/partners/reseller" className="hover:text-cyan-400 transition-colors">
                  Reseller Portal
                </Link>
              </li>
              <li>
                <Link href="/partners/distributor" className="hover:text-cyan-400 transition-colors">
                  Distributor Application
                </Link>
              </li>
              <li>
                <Link href="/partners/oem" className="hover:text-cyan-400 transition-colors">
                  OEM White-Label Design
                </Link>
              </li>
              <li>
                <Link href="/resources/documents" className="hover:text-cyan-400 transition-colors">
                  Datasheet Center
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="hover:text-cyan-400 transition-colors">
                  Technical FAQ
                </Link>
              </li>
              <li>
                <Link href="/resources/help-desk" className="hover:text-cyan-400 transition-colors">
                  Help Desk & Firmware Center
                </Link>
              </li>
              <li>
                <Link href="/company/careers" className="hover:text-cyan-400 transition-colors">
                  Careers at AXQUBIT
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} AXQUBIT Technologies Pvt. Ltd. All rights reserved. Made in India 🇮🇳
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/company/contact" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/company/contact" className="hover:text-gray-300">Terms of Supply</Link>
            <a href="https://github.com/SAHIL-3108/axqubit" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5" /> Open Source Repos
            </a>
            <Link href="/dashboard" className="text-cyan-400 hover:underline">SaaS Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
