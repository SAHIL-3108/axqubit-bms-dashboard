'use client';

import React from 'react';
import { Cpu, HardDrive, ShieldCheck, Wifi, ShieldAlert, CpuIcon } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';

export default function DeviceInfo() {
  const telemetry = useBmsStore((state) => state.telemetry);
  const otaState = useBmsStore((state) => state.otaState);

  const serialNumber = telemetry?.serialNumber || 'AXQ-BMS6000-LFP-082301';
  const currentVersion = otaState.currentVersion || 'v1.0.0';

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-[#00e676]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Hardware Profiles
            </span>
            <h3 className="text-sm font-bold text-white">System Specification Sheet</h3>
          </div>
        </div>
      </div>

      {/* Two Column Specifications */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Column 1: Hardware Specifications */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <CpuIcon className="h-3.5 w-3.5 text-[#00d4ff]" />
            <span>Electrical Parameters</span>
          </h4>

          <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Pack Chemistry</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">LiFePO4 (LFP)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Configuration</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">6S (6 Cells in Series)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Nominal Voltage</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">19.2 V (3.2V per cell)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Nominal Capacity</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">100 Ah (1.92 kWh)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Cell Voltage Limits</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">2.50V (Min) to 3.65V (Max)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Continuous Rating</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">60A Charge / 100A Discharge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: System Specifications */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <HardDrive className="h-3.5 w-3.5 text-[#ffb300]" />
            <span>Controller Registries</span>
          </h4>

          <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Device Serial</td>
                  <td className="py-2.5 px-4 text-right font-mono text-white font-bold">{serialNumber}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">ESP32 Firmware</td>
                  <td className="py-2.5 px-4 text-right font-mono text-white font-bold">{currentVersion}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">MAC Gateway</td>
                  <td className="py-2.5 px-4 text-right font-mono text-white font-bold">24:0A:C4:B8:31:0D</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Hardware Version</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">BMS6000 Rev 3.2</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Calibration Offset</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold">Offset calibrated (-2mV)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-[#9ca3af]">Comm Gateways</td>
                  <td className="py-2.5 px-4 text-right text-white font-bold flex items-center justify-end space-x-1">
                    <Wifi className="h-3.5 w-3.5 text-[#00d4ff]" />
                    <span>WiFi / RS485 / CAN</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
