'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, Flame, History } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';

export default function FaultHistory() {
  const faults = useBmsStore((state) => state.faults);
  const resolveFault = useBmsStore((state) => state.resolveFault);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Format Date String helper
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (!mounted) {
        return isoString;
      }
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour12: false })}`;
    } catch {
      return isoString;
    }
  };

  const getSeverityStyles = (severity: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'critical':
        return {
          dot: 'bg-[#ff3333]',
          text: 'text-[#ff3333]',
          bg: 'bg-[#ff3333]/10',
          icon: Flame,
        };
      case 'warning':
        return {
          dot: 'bg-[#ffb300]',
          text: 'text-[#ffb300]',
          bg: 'bg-[#ffb300]/10',
          icon: AlertCircle,
        };
      case 'info':
      default:
        return {
          dot: 'bg-[#00d4ff]',
          text: 'text-[#00d4ff]',
          bg: 'bg-[#00d4ff]/10',
          icon: Info,
        };
    }
  };

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <History className="h-4 w-4 text-[#00d4ff]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Fault Registers
            </span>
            <h3 className="text-sm font-bold text-white">Event Log History</h3>
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#9ca3af] uppercase bg-white/5 px-2 py-0.5 rounded">
          {faults.length} Events
        </span>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        {faults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-[#9ca3af]">
            <CheckCircle className="mb-2 h-8 w-8 text-[#00e676]" />
            <p className="text-xs font-bold text-white">All Systems Nominal</p>
            <p className="text-[10px] mt-1">No protection faults or warning codes detected.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-extrabold uppercase tracking-widest text-[#9ca3af]">
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Logged At</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px] font-medium text-gray-300">
              {faults.map((fault) => {
                const styles = getSeverityStyles(fault.severity);
                const Icon = styles.icon;

                return (
                  <tr key={fault.id} className="hover:bg-white/[0.02] transition-all duration-150">
                    {/* Severity */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        <span className={`uppercase text-[9px] font-bold ${styles.text}`}>
                          {fault.severity}
                        </span>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-3 px-3 font-mono font-bold text-white whitespace-nowrap">
                      {fault.code}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-3 max-w-xs truncate">{fault.message}</td>

                    {/* Logged At */}
                    <td className="py-3 px-3 text-[#9ca3af] whitespace-nowrap" suppressHydrationWarning>
                      {formatDate(fault.timestamp)}
                    </td>

                    {/* Status / Action */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {fault.resolved ? (
                        <span className="inline-flex items-center space-x-1 rounded bg-[#00e676]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#00e676] border border-[#00e676]/20">
                          <span>CLEARED</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => resolveFault(fault.id)}
                          className="inline-flex items-center space-x-1 rounded bg-[#ff3333]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#ff3333] border border-[#ff3333]/30 hover:bg-[#ff3333]/25 transition-all cursor-pointer"
                        >
                          <span>ACTIVE</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
