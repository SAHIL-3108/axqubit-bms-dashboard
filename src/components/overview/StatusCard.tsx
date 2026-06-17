'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, XOctagon, RadioOff, BatteryCharging, ZapOff, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { BmsTelemetry } from '@/types/bms';

interface StatusCardProps {
  telemetry: BmsTelemetry | null;
  connectionState?: string;
}

export default function StatusCard({ telemetry, connectionState }: StatusCardProps) {
  const status = telemetry?.status || 'offline';
  const chargingMode = telemetry?.chargingMode || 'idle';
  const isCharging = telemetry?.isCharging || false;
  const isDischarging = telemetry?.isDischarging || false;

  // Status Details
  const getStatusConfig = () => {
    switch (status) {
      case 'normal':
        return {
          icon: ShieldCheck,
          text: 'SYSTEM HEALTHY',
          colorClass: 'text-[#00e676]',
          borderClass: 'border-[#00e676]/30',
          bgClass: 'bg-[#00e676]/5',
          description: 'All 6 cell parameters are within nominal safety thresholds.',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          text: 'WARNING DETECTED',
          colorClass: 'text-[#ffb300]',
          borderClass: 'border-[#ffb300]/30',
          bgClass: 'bg-[#ffb300]/5',
          description: 'Cell imbalance or temperature warning. System is running.',
        };
      case 'fault':
        return {
          icon: XOctagon,
          text: 'CRITICAL FAULT',
          colorClass: 'text-[#ff3333]',
          borderClass: 'border-[#ff3333]/30',
          bgClass: 'bg-[#ff3333]/5',
          description: 'Safety relays opened. Overvoltage, undervoltage, or short-circuit.',
        };
      case 'offline':
      default:
        return {
          icon: RadioOff,
          text: 'PACK OFFLINE',
          colorClass: 'text-[#9ca3af]',
          borderClass: 'border-white/5',
          bgClass: 'bg-white/5',
          description: 'No data transmitted from device serial gateway. Showing cached parameters.',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  // Charging Mode Details
  const getChargingLabel = () => {
    if (isCharging) {
      switch (chargingMode) {
        case 'bulk':
          return { label: 'Bulk Charging (CC)', desc: 'Constant current phase; fast charging' };
        case 'absorption':
          return { label: 'Absorption (CV)', desc: 'Constant voltage phase; cell balancing active' };
        case 'float':
          return { label: 'Float Charging', desc: 'Trickle charge maintaining cell levels' };
        default:
          return { label: 'Active Charging', desc: 'Charging power detected' };
      }
    }
    if (isDischarging) {
      return { label: 'Active Discharging', desc: 'Power flowing out to load busbar' };
    }
    return { label: 'Standby / Idle', desc: 'No net current flowing into pack' };
  };

  const chargeLabel = getChargingLabel();

  return (
    <div className={`glass-panel rounded-xl p-5 border ${statusConfig.borderClass} ${statusConfig.bgClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9ca3af]">
          BMS System Status
        </span>
        <span className="text-[10px] font-bold text-[#9ca3af] uppercase bg-white/5 px-2.5 py-0.5 rounded">
          6S LFP (19.2V Nom)
        </span>
      </div>

      {/* Main Status Block */}
      <div className="mt-5 flex items-center space-x-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 ${statusConfig.colorClass}`}>
          <StatusIcon className="h-6 w-6 stroke-[2]" />
        </div>
        <div>
          <h3 className={`text-lg font-extrabold tracking-wide ${statusConfig.colorClass}`}>
            {statusConfig.text}
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1">{statusConfig.description}</p>
        </div>
      </div>

      {/* Grid of details */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
        {/* Charge Mode */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Operating Mode
          </span>
          <div className="flex items-center space-x-2">
            {isCharging ? (
              <BatteryCharging className="h-4 w-4 text-[#00e676] animate-pulse" />
            ) : isDischarging ? (
              <ArrowDownLeft className="h-4 w-4 text-[#00d4ff]" />
            ) : (
              <ZapOff className="h-4 w-4 text-[#9ca3af]" />
            )}
            <span className="text-sm font-bold text-white leading-none">
              {chargeLabel.label}
            </span>
          </div>
          <p className="text-[10px] text-[#9ca3af]">{chargeLabel.desc}</p>
        </div>

        {/* Current Flow direction */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Power Flow
          </span>
          <div className="flex items-center space-x-1.5">
            {isCharging && (
              <span className="text-xs font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded flex items-center space-x-1">
                <ArrowUpRight className="h-3 w-3" />
                <span>INFLOW</span>
              </span>
            )}
            {isDischarging && (
              <span className="text-xs font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded flex items-center space-x-1">
                <ArrowDownLeft className="h-3 w-3" />
                <span>OUTFLOW</span>
              </span>
            )}
            {!isCharging && !isDischarging && (
              <span className="text-xs font-bold text-[#9ca3af] bg-white/5 px-2 py-0.5 rounded">
                BALANCED
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#9ca3af]">
            {telemetry?.current !== undefined
              ? `${telemetry.current > 0 ? '+' : ''}${telemetry.current.toFixed(1)} A net flow`
              : '0.0 A'}
          </p>
        </div>
      </div>
    </div>
  );
}
