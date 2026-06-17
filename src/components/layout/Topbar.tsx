'use client';

import React from 'react';
import { Download, RefreshCw, Radio, ServerCrash, Battery } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';

export default function Topbar() {
  const telemetry = useBmsStore((state) => state.telemetry);
  const connectionState = useBmsStore((state) => state.connectionState);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const serialNumber = telemetry?.serialNumber || 'BMS6000-LFP-01';

  const handleExportCSV = () => {
    // Open CSV export API endpoint in a new tab to trigger download
    window.open(`/api/export?serialNumber=${serialNumber}`, '_blank');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh (history fetch)
    try {
      const res = await fetch(`/api/bms/history?serialNumber=${serialNumber}&range=24h`);
      if (res.ok) {
        const data = await res.json();
        useBmsStore.getState().setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Refresh history failed:', err);
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-[#0d1015] px-6">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <h2 className="text-md font-bold tracking-wide text-white uppercase md:text-lg">
          Telemetry Dashboard
        </h2>
        {/* Mobile Logo Fallback */}
        <div className="flex items-center space-x-1 md:hidden">
          <span className="text-[10px] uppercase font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded">
            6S LFP
          </span>
        </div>
      </div>

      {/* Controls Area */}
      <div className="flex items-center space-x-3">
        {/* Live / Status Badge */}
        <div className="flex items-center rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold">
          {connectionState === 'connected' ? (
            <div className="flex items-center space-x-2 text-[#00e676]">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline">LIVE FEED</span>
            </div>
          ) : connectionState === 'connecting' ? (
            <div className="flex items-center space-x-2 text-[#ffb300]">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span className="hidden sm:inline">CONNECTING</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-[#9ca3af]">
              <ServerCrash className="h-3.5 w-3.5 text-[#ff3333]" />
              <span className="hidden sm:inline text-xs">POLLING API</span>
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
