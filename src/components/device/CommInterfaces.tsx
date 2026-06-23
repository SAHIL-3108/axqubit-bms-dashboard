'use client';

import React from 'react';
import { Cpu, CheckCircle2, XCircle, Sliders, ToggleLeft } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';
import { CommProtocolState } from '@/types/bms';

export default function CommInterfaces() {
  const { commProtocols, updateCommProtocol, activeRole } = useBmsStore();
  const isViewOnly = activeRole === 'customer';

  const handleToggle = (protocol: keyof CommProtocolState) => {
    if (isViewOnly) return;
    const isCurrentlyEnabled = commProtocols[protocol].enabled;
    updateCommProtocol(protocol, {
      enabled: !isCurrentlyEnabled,
      status: !isCurrentlyEnabled ? 'connected' : 'disabled',
    });
  };

  const handleDetailChange = (protocol: keyof CommProtocolState, value: string) => {
    if (isViewOnly) return;
    updateCommProtocol(protocol, { detail: value });
  };

  const getStatusIcon = (status: 'connected' | 'error' | 'disabled') => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-4 w-4 text-[#00e676]" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-[#ff3333]" />;
      case 'disabled':
      default:
        return <Sliders className="h-4 w-4 text-[#9ca3af]" />;
    }
  };

  const getStatusClass = (status: 'connected' | 'error' | 'disabled') => {
    switch (status) {
      case 'connected':
        return 'text-[#00e676] bg-[#00e676]/10 border-[#00e676]/20';
      case 'error':
        return 'text-[#ff3333] bg-[#ff3333]/15 border-[#ff3333]/30';
      case 'disabled':
      default:
        return 'text-[#9ca3af] bg-white/5 border-white/5';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-[#ffb300]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Hardware Buses
            </span>
            <h3 className="text-sm font-bold text-white">Transceiver Interface Registries</h3>
          </div>
        </div>
        {isViewOnly && (
          <span className="text-[9px] font-bold text-[#ffb300] bg-[#ffb300]/10 px-2 py-0.5 rounded uppercase">
            View Only Mode
          </span>
        )}
      </div>

      {/* Grid of Protocols */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {/* UART */}
        <div className={`rounded-xl border p-4 space-y-4 bg-white/[0.01] ${commProtocols.uart.enabled ? 'border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white font-mono">UART (TTL)</span>
            <button
              onClick={() => handleToggle('uart')}
              disabled={isViewOnly}
              className={`rounded p-0.5 border ${getStatusClass(commProtocols.uart.status)} transition-all`}
            >
              {getStatusIcon(commProtocols.uart.status)}
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af]">Baudrate</label>
            <select
              value={commProtocols.uart.detail}
              disabled={isViewOnly || !commProtocols.uart.enabled}
              onChange={(e) => handleDetailChange('uart', e.target.value)}
              className="w-full rounded border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] font-mono text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
            >
              <option value="9600 bps (8N1)" className="bg-[#0d1015]">9600 bps</option>
              <option value="19200 bps (8N1)" className="bg-[#0d1015]">19200 bps</option>
              <option value="115200 bps (8N1)" className="bg-[#0d1015]">115200 bps</option>
            </select>
          </div>
        </div>

        {/* CAN Bus */}
        <div className={`rounded-xl border p-4 space-y-4 bg-white/[0.01] ${commProtocols.can.enabled ? 'border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white font-mono">CAN Bus</span>
            <button
              onClick={() => handleToggle('can')}
              disabled={isViewOnly}
              className={`rounded p-0.5 border ${getStatusClass(commProtocols.can.status)}`}
            >
              {getStatusIcon(commProtocols.can.status)}
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af]">Bitrate</label>
            <select
              value={commProtocols.can.detail}
              disabled={isViewOnly || !commProtocols.can.enabled}
              onChange={(e) => handleDetailChange('can', e.target.value)}
              className="w-full rounded border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] font-mono text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
            >
              <option value="125 Kbps (2.0B)" className="bg-[#0d1015]">125 Kbps</option>
              <option value="250 Kbps (2.0B)" className="bg-[#0d1015]">250 Kbps</option>
              <option value="500 Kbps (2.0B)" className="bg-[#0d1015]">500 Kbps</option>
              <option value="1 Mbps (2.0B)" className="bg-[#0d1015]">1 Mbps</option>
            </select>
          </div>
        </div>

        {/* RS485 */}
        <div className={`rounded-xl border p-4 space-y-4 bg-white/[0.01] ${commProtocols.rs485.enabled ? 'border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white font-mono">RS485 Modbus</span>
            <button
              onClick={() => handleToggle('rs485')}
              disabled={isViewOnly}
              className={`rounded p-0.5 border ${getStatusClass(commProtocols.rs485.status)}`}
            >
              {getStatusIcon(commProtocols.rs485.status)}
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af]">Node Address</label>
            <input
              type="text"
              value={commProtocols.rs485.detail}
              disabled={isViewOnly || !commProtocols.rs485.enabled}
              onChange={(e) => handleDetailChange('rs485', e.target.value)}
              placeholder="Node ID: 0x01"
              className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>

        {/* Bluetooth */}
        <div className={`rounded-xl border p-4 space-y-4 bg-white/[0.01] ${commProtocols.ble.enabled ? 'border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white font-mono">BLE Wireless</span>
            <button
              onClick={() => handleToggle('ble')}
              disabled={isViewOnly}
              className={`rounded p-0.5 border ${getStatusClass(commProtocols.ble.status)}`}
            >
              {getStatusIcon(commProtocols.ble.status)}
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af]">Signal (RSSI)</label>
            <input
              type="text"
              value={commProtocols.ble.detail}
              disabled={isViewOnly || !commProtocols.ble.enabled}
              onChange={(e) => handleDetailChange('ble', e.target.value)}
              className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>

        {/* MQTT */}
        <div className={`rounded-xl border p-4 space-y-4 bg-white/[0.01] ${commProtocols.mqtt.enabled ? 'border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-white font-mono">MQTT Protocol</span>
            <button
              onClick={() => handleToggle('mqtt')}
              disabled={isViewOnly}
              className={`rounded p-0.5 border ${getStatusClass(commProtocols.mqtt.status)}`}
            >
              {getStatusIcon(commProtocols.mqtt.status)}
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-extrabold uppercase tracking-widest text-[#9ca3af]">Broker Gateway</label>
            <input
              type="text"
              value={commProtocols.mqtt.detail}
              disabled={isViewOnly || !commProtocols.mqtt.enabled}
              onChange={(e) => handleDetailChange('mqtt', e.target.value)}
              className="w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono text-white focus:border-[#00d4ff] focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
