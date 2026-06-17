'use client';

import React, { useState } from 'react';
import { Cpu, Terminal, ArrowUpCircle, Play, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useOta } from '@/hooks/useOta';
import { useBmsStore } from '@/store/bmsStore';

interface OtaHistoryItem {
  version: string;
  date: string;
  size: string;
  status: 'SUCCESS' | 'FAILED';
}

const mockOtaHistory: OtaHistoryItem[] = [
  { version: 'v1.0.0', date: '2026-02-15 14:32', size: '1.24 MB', status: 'SUCCESS' },
  { version: 'v0.9.8', date: '2025-11-10 09:12', size: '1.21 MB', status: 'SUCCESS' },
  { version: 'v0.9.5', date: '2025-08-01 17:45', size: '1.18 MB', status: 'SUCCESS' },
];

export default function OtaUpdate() {
  const telemetry = useBmsStore((state) => state.telemetry);
  const serialNumber = telemetry?.serialNumber || 'BMS6000-LFP-01';

  const { otaState, startOtaUpdate, resetOta } = useOta(serialNumber);

  const [firmwareUrl, setFirmwareUrl] = useState(
    'https://firmware.axqubit.com/bms6000/v1.1.0-release.bin'
  );
  const [targetVersion, setTargetVersion] = useState('v1.1.0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startOtaUpdate(firmwareUrl, targetVersion);
  };

  const isUpdating = otaState.status !== 'idle';
  const isComplete = otaState.status === 'complete';
  const isError = otaState.status === 'error';

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-[#00d4ff]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Gateway Flash
            </span>
            <h3 className="text-sm font-bold text-white">Over-the-Air (OTA) Firmware Update</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column: Form & Live Update console */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Firmware Flasher
          </h4>

          {!isUpdating && !isComplete && !isError ? (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white/5 border border-white/5 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Current Firmware</label>
                  <div className="rounded border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-white font-bold">
                    {otaState.currentVersion}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Target Version</label>
                  <input
                    type="text"
                    value={targetVersion}
                    onChange={(e) => setTargetVersion(e.target.value)}
                    required
                    className="w-full rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white font-bold focus:border-[#00d4ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Binary Payload URL</label>
                <input
                  type="url"
                  value={firmwareUrl}
                  onChange={(e) => setFirmwareUrl(e.target.value)}
                  required
                  className="w-full rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-white focus:border-[#00d4ff] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#00a3c4] py-2.5 text-xs font-bold text-background shadow-lg shadow-[#00d4ff]/10 hover:opacity-90 transition-all cursor-pointer"
              >
                <Play className="h-4 w-4 stroke-[2.5]" />
                <span>INITIATE FIRMWARE FLASH</span>
              </button>
            </form>
          ) : (
            /* Live Flash Console */
            <div className="rounded-lg bg-[#07090c] border border-white/5 p-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-purple-400 font-mono">
                  <Terminal className="h-4 w-4 animate-pulse" />
                  <span>ESP32 STATE MACHINE</span>
                </span>
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase">
                  STATUS: {otaState.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold font-mono">
                  <span className="text-gray-400">FLASH PROGRESS</span>
                  <span className="text-[#00d4ff]">{otaState.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00e676] transition-all duration-300"
                    style={{ width: `${otaState.progress}%` }}
                  />
                </div>
              </div>

              {/* Status log message */}
              <div className="rounded bg-black/50 border border-white/5 p-3 text-xs font-mono text-[#00e676]">
                <span className="text-gray-500 mr-1.5">&gt;</span>
                {otaState.message}
              </div>

              {/* Control Actions during complete / error */}
              {(isComplete || isError) && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2 text-xs">
                    {isComplete ? (
                      <span className="text-[#00e676] font-bold flex items-center space-x-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>SUCCESS</span>
                      </span>
                    ) : (
                      <span className="text-[#ff3333] font-bold flex items-center space-x-1">
                        <ShieldAlert className="h-4 w-4" />
                        <span>FAILED: {otaState.error}</span>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={resetOta}
                    className="rounded bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    DISMISS CONSOLE
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Flash history log */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <ArrowUpCircle className="h-3.5 w-3.5 text-[#00e676]" />
            <span>Flasher Log Registry</span>
          </h4>

          <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-extrabold uppercase tracking-widest text-[#9ca3af] bg-white/[0.02]">
                  <th className="py-2.5 px-4">Firmware</th>
                  <th className="py-2.5 px-4">Flash Date</th>
                  <th className="py-2.5 px-4">Bin Size</th>
                  <th className="py-2.5 px-4 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                {mockOtaHistory.map((log) => (
                  <tr key={log.version} className="hover:bg-white/[0.01]">
                    <td className="py-2.5 px-4 font-mono font-bold text-white">{log.version}</td>
                    <td className="py-2.5 px-4 text-[#9ca3af]">{log.date}</td>
                    <td className="py-2.5 px-4 text-[#9ca3af]">{log.size}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block rounded bg-[#00e676]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#00e676] border border-[#00e676]/20">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
