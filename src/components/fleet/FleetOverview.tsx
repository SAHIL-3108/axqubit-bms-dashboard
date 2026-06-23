'use client';

import React, { useEffect, useState } from 'react';
import { Search, Battery, Zap, AlertTriangle, AlertOctagon, PowerOff } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';
import { FleetPackInfo, PackApplication } from '@/types/bms';

export default function FleetOverview() {
  const { fleet, setFleet, setSelectedSerialNumber, selectedSerialNumber } = useBmsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<PackApplication | 'ALL'>('ALL');
  const [loading, setLoading] = useState(true);

  // Poll fleet status on mount
  useEffect(() => {
    async function fetchFleet() {
      try {
        const res = await fetch('/api/bms/fleet');
        if (res.ok) {
          const data = await res.json();
          setFleet(data);
        }
      } catch (err) {
        console.warn('Failed fetching fleet from backend, using frontend simulations.', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFleet();
    const interval = setInterval(fetchFleet, 2500); // Poll fleet status every 2.5s
    return () => clearInterval(interval);
  }, [setFleet]);

  const handlePackClick = (sn: string) => {
    setSelectedSerialNumber(sn);
    // Smooth scroll to pack diagnostic panel
    const element = document.querySelector('#pack-diagnostics-view');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusIcon = (status: FleetPackInfo['status']) => {
    switch (status) {
      case 'warning':
        return <AlertTriangle className="h-4.5 w-4.5 text-[#ffb300]" />;
      case 'fault':
        return <AlertOctagon className="h-4.5 w-4.5 text-[#ff3333] animate-bounce" />;
      case 'offline':
        return <PowerOff className="h-4.5 w-4.5 text-[#9ca3af]" />;
      case 'normal':
      default:
        return <Zap className="h-4.5 w-4.5 text-[#00e676]" />;
    }
  };

  const getStatusClass = (status: FleetPackInfo['status']) => {
    switch (status) {
      case 'warning':
        return 'border-[#ffb300]/20 bg-[#ffb300]/5 text-[#ffb300]';
      case 'fault':
        return 'border-[#ff3333]/20 bg-[#ff3333]/5 text-[#ff3333]';
      case 'offline':
        return 'border-white/5 bg-white/5 text-[#9ca3af]';
      case 'normal':
      default:
        return 'border-[#00e676]/20 bg-[#00e676]/5 text-[#00e676]';
    }
  };

  const getBatteryColor = (soc: number) => {
    if (soc >= 50) return 'text-[#00e676]';
    if (soc >= 20) return 'text-[#ffb300]';
    return 'text-[#ff3333]';
  };

  // Filter & Search logic
  const filteredFleet = fleet.filter((pack) => {
    const matchesSearch = pack.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || pack.application === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories: (PackApplication | 'ALL')[] = ['ALL', 'EV', 'Robotics', 'Drone', 'Solar ESS', 'OEM Pack'];

  if (loading && fleet.length === 0) {
    return (
      <div className="glass-panel flex h-80 items-center justify-center rounded-xl text-xs text-[#9ca3af]">
        Querying Fleet Registers...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter Topbar */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#00a3c4] text-background shadow-lg shadow-[#00d4ff]/10'
                  : 'bg-white/5 border border-white/5 text-[#9ca3af] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-[#6b7280]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Pack SN..."
            className="w-full rounded-lg border border-white/5 bg-white/5 pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of 32 battery packs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {filteredFleet.map((pack) => {
          const isSelected = selectedSerialNumber === pack.serialNumber;
          const statusStyle = getStatusClass(pack.status);

          return (
            <div
              key={pack.serialNumber}
              onClick={() => handlePackClick(pack.serialNumber)}
              className={`glass-panel cursor-pointer flex flex-col justify-between rounded-xl p-3 border transition-all duration-200 hover:-translate-y-1 ${
                isSelected
                  ? 'border-[#00d4ff] bg-gradient-to-br from-[#00d4ff]/5 to-transparent shadow-lg shadow-[#00d4ff]/5'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              {/* Header: SN & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white font-mono">{pack.serialNumber}</span>
                <span className={`rounded-full p-0.5 border ${statusStyle}`}>
                  {getStatusIcon(pack.status)}
                </span>
              </div>

              {/* Application type */}
              <div className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af] mt-1">
                {pack.application}
              </div>

              {/* Battery SOC Display */}
              <div className="mt-4 flex items-center justify-center space-x-1.5">
                <Battery className={`h-8 w-8 ${getBatteryColor(pack.soc)}`} />
                <span className="text-xl font-black tracking-tighter text-white">
                  {pack.soc.toFixed(0)}
                  <span className="text-[10px] text-[#9ca3af] ml-0.5">%</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4 space-y-1">
                <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pack.soc >= 50
                        ? 'bg-[#00e676]'
                        : pack.soc >= 20
                        ? 'bg-[#ffb300]'
                        : 'bg-[#ff3333]'
                    }`}
                    style={{ width: `${pack.soc}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[8px] font-bold text-[#9ca3af]">
                  <span>SOH: {pack.soh.toFixed(0)}%</span>
                  <span>Cyc: {pack.cycleCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
