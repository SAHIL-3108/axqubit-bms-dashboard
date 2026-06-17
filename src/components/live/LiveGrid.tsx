'use client';

import React from 'react';
import {
  Zap,
  Activity,
  Thermometer,
  Battery,
  Heart,
  RefreshCcw,
  Gauge,
  Boxes,
  SlidersHorizontal,
  FlameKindling,
} from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';
import LiveReading from './LiveReading';

export default function LiveGrid() {
  const telemetry = useBmsStore((state) => state.telemetry);

  // Fallbacks if data is not loaded yet
  const voltage = telemetry?.voltage || 0;
  const current = telemetry?.current || 0;
  const packTemp = telemetry?.packTemp || 0;
  const soc = telemetry?.soc || 0;
  const soh = telemetry?.soh || 0;
  const cycleCount = telemetry?.cycleCount || 0;
  const power = telemetry?.power || 0;
  const energyThroughput = telemetry?.energyThroughput || 0;
  const remainingCapacity = telemetry?.remainingCapacity || 0;
  const nominalCapacity = telemetry?.nominalCapacity || 100;

  return (
    <div className="space-y-6">
      {/* 4 Larger Live Readings with Progress Bars */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <LiveReading
          icon={Zap}
          label="Pack Voltage"
          value={voltage}
          unit="V"
          min={16.0} // Minimum LFP limit (6 * 2.5V + buffer)
          max={22.0} // Maximum LFP limit (6 * 3.65V)
          colorClass="text-[#00d4ff]"
          barColorClass="bg-[#00d4ff]"
        />
        
        <LiveReading
          icon={Activity}
          label="Pack Current"
          value={current}
          unit="A"
          min={-60.0} // Max discharge current
          max={60.0}  // Max charge current
          colorClass="text-[#ffb300]"
          barColorClass="bg-[#ffb300]"
        />

        <LiveReading
          icon={Thermometer}
          label="Pack Temp"
          value={packTemp}
          unit="°C"
          min={-10.0}
          max={65.0}
          colorClass="text-[#ff3333]"
          barColorClass="bg-gradient-to-r from-blue-500 to-red-500"
        />

        <LiveReading
          icon={Battery}
          label="State of Charge"
          value={soc}
          unit="%"
          min={0}
          max={100}
          colorClass="text-[#00e676]"
          barColorClass="bg-[#00e676]"
        />
      </div>

      {/* 6 Mini Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {/* SOH */}
        <div className="glass-panel rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9ca3af]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Health (SOH)</span>
            <Heart className="h-4 w-4 text-[#ff3333] fill-[#ff3333]/10" />
          </div>
          <div className="mt-3 flex items-baseline space-x-0.5">
            <span className="text-xl font-extrabold text-white">{soh.toFixed(1)}</span>
            <span className="text-xs font-semibold text-[#9ca3af]">%</span>
          </div>
        </div>

        {/* Cycles */}
        <div className="glass-panel rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9ca3af]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Cycles</span>
            <RefreshCcw className="h-4 w-4 text-[#00d4ff]" />
          </div>
          <div className="mt-3">
            <span className="text-xl font-extrabold text-white">{cycleCount}</span>
          </div>
        </div>

        {/* Active Power */}
        <div className="glass-panel rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9ca3af]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Power</span>
            <Gauge className="h-4 w-4 text-[#00e676]" />
          </div>
          <div className="mt-3 flex items-baseline space-x-0.5">
            <span className="text-xl font-extrabold text-white">{power.toFixed(0)}</span>
            <span className="text-xs font-semibold text-[#9ca3af]">W</span>
          </div>
        </div>

        {/* Energy Throughput */}
        <div className="glass-panel rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9ca3af]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Throughput</span>
            <Boxes className="h-4 w-4 text-[#ffb300]" />
          </div>
          <div className="mt-3 flex items-baseline space-x-0.5">
            <span className="text-xl font-extrabold text-white">{energyThroughput.toFixed(1)}</span>
            <span className="text-xs font-semibold text-[#9ca3af]">kWh</span>
          </div>
        </div>

        {/* Remaining Capacity */}
        <div className="glass-panel rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9ca3af]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Remaining Cap</span>
            <SlidersHorizontal className="h-4 w-4 text-[#00d4ff]" />
          </div>
          <div className="mt-3 flex items-baseline space-x-0.5">
            <span className="text-xl font-extrabold text-white">{remainingCapacity.toFixed(1)}</span>
            <span className="text-xs font-semibold text-[#9ca3af]">Ah</span>
          </div>
        </div>

        {/* Nominal Capacity */}
        <div className="glass-panel rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9ca3af]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Nominal Cap</span>
            <FlameKindling className="h-4 w-4 text-[#9ca3af]" />
          </div>
          <div className="mt-3 flex items-baseline space-x-0.5">
            <span className="text-xl font-extrabold text-white">{nominalCapacity}</span>
            <span className="text-xs font-semibold text-[#9ca3af]">Ah</span>
          </div>
        </div>
      </div>
    </div>
  );
}
