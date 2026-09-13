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
  Layers,
  BookOpen,
} from 'lucide-react';
import { useBmsStore, DashTab } from '@/store/bmsStore';

interface NavItem {
  label: string;
  /** Which dashboard tab this item belongs to */
  tab: DashTab;
  /** Section id to scroll to once that tab is open (without the # prefix) */
  sectionId?: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  // ── Fleet tab ────────────────────────────────────────────────────
  { label: 'Fleet Overview',  tab: 'fleet',       icon: Layers },

  // ── Diagnostics tab sections ──────────────────────────────────────
  { label: 'Overview',        tab: 'diagnostics', sectionId: 'section-overview',     icon: LayoutDashboard },
  { label: 'Live Readings',   tab: 'diagnostics', sectionId: 'section-live',         icon: Activity },
  { label: 'Cell Balance',    tab: 'diagnostics', sectionId: 'section-cells',        icon: Battery },
  { label: 'Protections',     tab: 'diagnostics', sectionId: 'section-protections',  icon: ShieldAlert },
  { label: 'AI Diagnostics',  tab: 'diagnostics', sectionId: 'section-ai',           icon: Brain },
  { label: 'Alerts Config',   tab: 'diagnostics', sectionId: 'section-alerts',       icon: Settings },
  { label: 'Device & OTA',    tab: 'diagnostics', sectionId: 'section-device',       icon: Cpu },
  { label: 'QR Scan',         tab: 'diagnostics', sectionId: 'section-qr',           icon: QrCode },

  // ── API Docs tab ──────────────────────────────────────────────────
  { label: 'REST API Docs',   tab: 'api-docs',    icon: BookOpen },
];

export default function Sidebar() {
  const connectionState  = useBmsStore((s) => s.connectionState);
  const telemetry        = useBmsStore((s) => s.telemetry);
  const activeDashTab    = useBmsStore((s) => s.activeDashTab);
  const pendingScrollId  = useBmsStore((s) => s.pendingScrollId);
  const navigateTo       = useBmsStore((s) => s.navigateTo);
  const setPendingScroll = useBmsStore((s) => s.setPendingScrollId);

  /* ── Scroll execution: runs whenever pendingScrollId or activeDashTab changes ─── */
  React.useEffect(() => {
    if (!pendingScrollId) return;
    // Give the tab's content a frame to render before scrolling
    const t = setTimeout(() => {
      const el = document.getElementById(pendingScrollId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPendingScroll(null);
    }, 120);
    return () => clearTimeout(t);
  }, [pendingScrollId, activeDashTab, setPendingScroll]);

  const handleNavClick = (item: NavItem) => {
    navigateTo(item.tab, item.sectionId);
  };

  const isActive = (item: NavItem) => {
    if (item.tab !== activeDashTab) return false;
    // If there's no sectionId, active when just on the same tab
    if (!item.sectionId) return activeDashTab === item.tab;
    return true; // highlight the tab-group item; finer per-section highlight below
  };

  // Determine active key for highlighting (tab+section combo)
  const activeKey = `${activeDashTab}:${pendingScrollId ?? ''}`;
  const itemKey   = (item: NavItem) => `${item.tab}:${item.sectionId ?? ''}`;

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
      <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1 scrollbar-none">

        {/* ── Section label: Fleet ──────────────────────────────── */}
        <p className="px-3 pt-1 pb-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#4b5563]">
          Fleet
        </p>

        {navItems.filter(i => i.tab === 'fleet').map((item) => {
          const Icon = item.icon;
          const active = activeDashTab === 'fleet';
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-transparent text-[#00d4ff] border-l-2 border-[#00d4ff]'
                  : 'text-[#9ca3af] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${active ? 'text-[#00d4ff]' : 'text-[#9ca3af]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* ── Section label: Diagnostics ────────────────────────── */}
        <p className="px-3 pt-4 pb-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#4b5563]">
          Pack Diagnostics
        </p>

        {navItems.filter(i => i.tab === 'diagnostics').map((item) => {
          const Icon = item.icon;
          const active = activeDashTab === 'diagnostics' && itemKey(item) === activeKey;
          const tabActive = activeDashTab === 'diagnostics';
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-transparent text-[#00d4ff] border-l-2 border-[#00d4ff]'
                  : tabActive
                  ? 'text-[#d1d5db] hover:bg-white/5 hover:text-white'
                  : 'text-[#9ca3af] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${active ? 'text-[#00d4ff]' : 'text-[#6b7280]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* ── Section label: API ────────────────────────────────── */}
        <p className="px-3 pt-4 pb-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#4b5563]">
          Developer
        </p>

        {navItems.filter(i => i.tab === 'api-docs').map((item) => {
          const Icon = item.icon;
          const active = activeDashTab === 'api-docs';
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                active
                  ? 'bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-transparent text-[#00d4ff] border-l-2 border-[#00d4ff]'
                  : 'text-[#9ca3af] hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${active ? 'text-[#00d4ff]' : 'text-[#9ca3af]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Connection Indicator Pill */}
      <div className="mt-4 rounded-xl border border-white/5 bg-white/5 p-4">
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
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff3333]"></span>
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
