'use client';

import React from 'react';
import {
  LayoutDashboard,
  Battery,
  Activity,
  ShieldAlert,
  Brain,
  Settings,
  Cpu,
  QrCode,
  Zap,
} from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '#overview', icon: LayoutDashboard },
  { label: 'Live Readings', href: '#live-feed', icon: Activity },
  { label: 'Cell Balance', href: '#cells', icon: Battery },
  { label: 'Protections', href: '#protections', icon: ShieldAlert },
  { label: 'AI Diagnostics', href: '#ai-diagnostics', icon: Brain },
  { label: 'Alerts Config', href: '#alerts', icon: Settings },
  { label: 'Device & OTA', href: '#device-ota', icon: Cpu },
  { label: 'QR Scan', href: '#qr-code', icon: QrCode },
];

export default function Sidebar() {
  const connectionState = useBmsStore((state) => state.connectionState);
  const telemetry = useBmsStore((state) => state.telemetry);
  const [activeAnchor, setActiveAnchor] = React.useState('#overview');

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveAnchor(window.location.hash || '#overview');
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check initially
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveAnchor(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden h-screen w-64 flex-shrink-0 flex-col border-r border-border bg-[#0d1015] p-5 md:flex">
      {/* Brand Logo */}
      <div className="mb-8 flex items-center space-x-2.5 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#00e676] text-background shadow-lg shadow-[#00d4ff]/10">
          <Zap className="h-6 w-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wider text-white">AXQUBIT</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#00d4ff] font-semibold">
            BMS6000 Series
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeAnchor === item.href;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-transparent text-[#00d4ff] border-l-2 border-[#00d4ff]'
                  : 'text-[#9ca3af] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-[#00d4ff]' : 'text-[#9ca3af]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Connection Indicator Pill */}
      <div className="mt-auto rounded-xl border border-white/5 bg-white/5 p-4">
        <div className="mb-2 flex items-center justify-between text-[11px] text-[#9ca3af]">
          <span>PACK ID</span>
          <span className="font-mono text-white font-semibold">
            {telemetry?.serialNumber ? telemetry.serialNumber.substring(0, 8) : 'SN-6000X'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {connectionState === 'connected' && (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e676] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e676]"></span>
              </span>
              <span className="text-xs font-semibold text-[#00e676] uppercase tracking-wider">
                MQTT Online
              </span>
            </>
          )}

          {connectionState === 'connecting' && (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb300] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffb300]"></span>
              </span>
              <span className="text-xs font-semibold text-[#ffb300] uppercase tracking-wider animate-pulse">
                Reconnecting...
              </span>
            </>
          )}

          {connectionState === 'disconnected' && (
            <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff3333] led-pulse text-[#ff3333]"></span>
              </span>
              <span className="text-xs font-semibold text-[#ff3333] uppercase tracking-wider">
                HTTP Fallback
              </span>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
