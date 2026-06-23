'use client';

import React from 'react';
import { Download, RefreshCw, Radio, ServerCrash, User, ShieldAlert } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';
import { UserRole } from '@/types/bms';

export default function Topbar() {
  const {
    telemetry,
    connectionState,
    activeRole,
    setActiveRole,
    selectedSerialNumber,
    setSelectedSerialNumber,
    fleet,
    setHistory,
  } = useBmsStore();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleExportCSV = () => {
    window.open(`/api/export?serialNumber=${selectedSerialNumber}`, '_blank');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/bms/history?serialNumber=${selectedSerialNumber}&range=24h`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Refresh history failed:', err);
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveRole(e.target.value as UserRole);
  };

  const handlePackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSerialNumber(e.target.value);
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-[#0d1015] px-6">
      {/* Pack Selection & Title */}
      <div className="flex items-center space-x-3.5">
        <h2 className="hidden text-sm font-black tracking-wide text-white uppercase sm:block lg:text-base">
          SCADA Core
        </h2>

        {/* Selected Pack Switcher */}
        <div className="flex items-center space-x-1.5 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#9ca3af]">Active Pack:</span>
          <select
            value={selectedSerialNumber}
            onChange={handlePackChange}
            className="bg-transparent text-xs font-mono font-bold text-[#00d4ff] focus:outline-none cursor-pointer"
          >
            {fleet.length > 0 ? (
              fleet.map((p) => (
                <option key={p.serialNumber} value={p.serialNumber} className="bg-[#0d1015] text-white">
                  {p.serialNumber} ({p.application})
                </option>
              ))
            ) : (
              <option value={selectedSerialNumber} className="bg-[#0d1015]">
                {selectedSerialNumber}
              </option>
            )}
          </select>
        </div>
      </div>

      {/* Controls & Role Selector */}
      <div className="flex items-center space-x-3">
        {/* User Role Selector */}
        <div className="flex items-center space-x-1.5 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1">
          <User className="h-3.5 w-3.5 text-[#00d4ff]" />
          <select
            value={activeRole}
            onChange={handleRoleChange}
            className="bg-transparent text-[11px] font-bold text-white focus:outline-none cursor-pointer uppercase"
          >
            <option value="admin" className="bg-[#0d1015]">Role: Admin</option>
            <option value="engineer" className="bg-[#0d1015]">Role: Engineer</option>
            <option value="customer" className="bg-[#0d1015]">Role: Customer</option>
          </select>
        </div>

        {/* Live / Status Badge */}
        <div className="flex items-center rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold">
          {connectionState === 'connected' ? (
            <div className="flex items-center space-x-2 text-[#00e676]">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline text-[10px] tracking-wider font-extrabold uppercase">STREAMING</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-[#9ca3af]">
              <ServerCrash className="h-3.5 w-3.5 text-[#ff3333]" />
              <span className="hidden sm:inline text-[10px] tracking-wider font-extrabold uppercase">REST BACKEND</span>
            </div>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-[#9ca3af] hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
          title="Force Reload Data"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        {/* Export CSV button */}
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#00a3c4] px-4 py-2 text-xs font-bold text-background shadow-lg shadow-[#00d4ff]/10 hover:opacity-90 transition-all cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">EXPORT LOGS</span>
        </button>
      </div>
    </header>
  );
}
