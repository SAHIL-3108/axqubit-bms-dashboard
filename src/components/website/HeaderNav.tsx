'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  ChevronDown, 
  Cpu, 
  BatteryCharging, 
  ShieldCheck, 
  Eye, 
  Layers, 
  Wrench, 
  Building2, 
  FileText, 
  Users, 
  ShoppingBag, 
  LayoutDashboard, 
  Search, 
  Menu, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HeaderNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Is dashboard route
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a0c0f]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20' 
        : 'bg-[#0a0c0f] border-b border-gray-800/60'
    }`}>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-[#0d1520] to-cyan-950 text-cyan-300 text-xs py-1.5 px-4 text-center border-b border-cyan-900/30 font-mono flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>AXQUBIT BMS6000 Series II Released with Active Balancing & Dual CAN Interface</span>
        <Link href="/bms/smart-series" className="underline font-semibold hover:text-cyan-100 transition-colors ml-2 inline-flex items-center gap-1">
          Explore Spec Sheet <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <Zap className="w-5 h-5 text-black font-bold fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                AXQUBIT
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400 font-mono -mt-1 uppercase">
                Power & AI Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* BMS Hub Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('bms')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/bms') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}>
                <BatteryCharging className="w-4 h-4 text-cyan-400" />
                <span>BMS Line</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'bms' && (
                <div className="absolute top-full left-0 w-80 p-3 bg-[#0f141c] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold px-3 py-1 uppercase tracking-wider">
                    Battery Management Systems
                  </div>
                  <Link href="/bms/protection-series" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cyan-950/40 group/item transition-colors">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-cyan-300">Protection Series</div>
                      <div className="text-xs text-gray-400">Hardware PCM for 3S–24S Lithium packs</div>
                    </div>
                  </Link>
                  <Link href="/bms/smart-series" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cyan-950/40 group/item transition-colors">
                    <Cpu className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-cyan-300">Smart Series (BMS6000)</div>
                      <div className="text-xs text-gray-400">IoT connected, CAN/RS485 & Cloud SaaS</div>
                    </div>
                  </Link>
                  <Link href="/bms/high-voltage" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cyan-950/40 group/item transition-colors">
                    <Zap className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-cyan-300">High Voltage Series</div>
                      <div className="text-xs text-gray-400">Industrial ESS & EV HV Stacks up to 1000V</div>
                    </div>
                  </Link>
                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <Link href="/bms" className="block text-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1">
                      View Complete BMS Lineup →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Power Electronics Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('power')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/power') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}>
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Power Systems</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'power' && (
                <div className="absolute top-full left-0 w-80 p-3 bg-[#0f141c] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-mono text-amber-400 font-semibold px-3 py-1 uppercase tracking-wider">
                    Power Conversion & Storage
                  </div>
                  <Link href="/power/smps" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-950/30 group/item transition-colors">
                    <Layers className="w-5 h-5 text-amber-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-amber-300">Industrial SMPS</div>
                      <div className="text-xs text-gray-400">High efficiency switched-mode supplies</div>
                    </div>
                  </Link>
                  <Link href="/power/inverters" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-950/30 group/item transition-colors">
                    <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-amber-300">Inverters</div>
                      <div className="text-xs text-gray-400">Pure Sine Wave & Hybrid ESS Inverters</div>
                    </div>
                  </Link>
                  <Link href="/power/ups" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-amber-950/30 group/item transition-colors">
                    <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-amber-300">Industrial UPS</div>
                      <div className="text-xs text-gray-400">Online double conversion backup power</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* AI Vision Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('vision')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/vision') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}>
                <Eye className="w-4 h-4 text-purple-400" />
                <span>AI Vision</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'vision' && (
                <div className="absolute top-full left-0 w-80 p-3 bg-[#0f141c] border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-950/50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-mono text-purple-400 font-semibold px-3 py-1 uppercase tracking-wider">
                    Edge AI Analytics
                  </div>
                  <Link href="/vision/face-recognition" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-950/30 group/item transition-colors">
                    <Users className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-purple-300">Face Recognition</div>
                      <div className="text-xs text-gray-400">Biometric security & access control</div>
                    </div>
                  </Link>
                  <Link href="/vision/anpr" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-purple-950/30 group/item transition-colors">
                    <Eye className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover/item:text-purple-300">ANPR Line</div>
                      <div className="text-xs text-gray-400">Automatic Number Plate Recognition</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link 
              href="/technology" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/technology' ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Technology
            </Link>

            <Link 
              href="/applications" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/applications') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Applications
            </Link>

            <Link 
              href="/catalogue" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/catalogue' ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Catalogue
            </Link>

            <Link 
              href="/partners" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/partners') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Partners
            </Link>

            <Link 
              href="/resources" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/resources') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Resources
            </Link>

            <Link 
              href="/company/about" 
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/company') ? 'text-cyan-400 bg-cyan-950/40' : 'text-gray-300 hover:text-white hover:bg-gray-800/40'
              }`}
            >
              Company
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/store"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-white border border-gray-700/60 rounded-lg hover:border-gray-500 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sample Store</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>SaaS Platform</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-black bg-cyan-400 rounded-lg"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>SaaS</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1017] border-b border-gray-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-800">
            <Link 
              href="/bms" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-gray-900/60 rounded-lg text-xs font-semibold text-cyan-400 flex items-center gap-2"
            >
              <BatteryCharging className="w-4 h-4" /> BMS Lineup
            </Link>
            <Link 
              href="/power" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-gray-900/60 rounded-lg text-xs font-semibold text-amber-400 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" /> Power Electronics
            </Link>
            <Link 
              href="/vision" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-gray-900/60 rounded-lg text-xs font-semibold text-purple-400 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> AI Vision
            </Link>
            <Link 
              href="/technology" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-gray-900/60 rounded-lg text-xs font-semibold text-emerald-400 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" /> Technology
            </Link>
          </div>

          <div className="space-y-1 text-sm font-medium">
            <Link 
              href="/applications" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-800"
            >
              Applications (EV, ESS, Telecom, UPS)
            </Link>
            <Link 
              href="/catalogue" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-800"
            >
              Product Catalogue & Specifications
            </Link>
            <Link 
              href="/partners" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-800"
            >
              Partner Portal (Reseller / OEM)
            </Link>
            <Link 
              href="/resources" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-800"
            >
              Resources & Documents
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-800"
            >
              Engineering Blog & Case Studies
            </Link>
            <Link 
              href="/company/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-800"
            >
              About AXQUBIT
            </Link>
            <Link 
              href="/store" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-cyan-400 hover:bg-gray-800"
            >
              Sample Store / Direct Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
