'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Download, Shield, Users, Lock, Key } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';

interface AccessRule {
  id: string;
  role: string;
  identity: string;
  scope: 'READ' | 'READ_WRITE' | 'FULL_CONTROL';
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

const mockAccessRules: AccessRule[] = [
  { id: '1', role: 'System Admin', identity: 'admin@axqubit.com', scope: 'FULL_CONTROL', status: 'ACTIVE' },
  { id: '2', role: 'Field Engineer', identity: 'eng@axqubit.com', scope: 'READ_WRITE', status: 'ACTIVE' },
  { id: '3', role: 'Viewer Client', identity: 'client@axqubit.com', scope: 'READ', status: 'ACTIVE' },
];

export default function QrAccess() {
  const telemetry = useBmsStore((state) => state.telemetry);
  const qrRef = useRef<HTMLDivElement>(null);

  const serialNumber = telemetry?.serialNumber || 'BMS6000-LFP-01';
  // Point mobile app or web browser to this specific pack URL
  const packUrl = `https://bms.axqubit.com/pack/${serialNumber}`;

  const downloadQrCode = () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    // Serialize SVG element to XML string
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);

    // Trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = `AXQUBIT_BMS_${serialNumber}_QR.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  };

  const getScopeLabel = (scope: AccessRule['scope']) => {
    switch (scope) {
      case 'FULL_CONTROL':
        return 'Read/Write/Config';
      case 'READ_WRITE':
        return 'Read/Write';
      case 'READ':
      default:
        return 'Read-Only';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <QrCode className="h-4 w-4 text-[#ffb300]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
              Mobile Sync
            </span>
            <h3 className="text-sm font-bold text-white">QR Access & Security Permissions</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* QR Code Sized Block (Span 1) */}
        <div className="rounded-lg bg-white/5 border border-white/5 p-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">
              Mobile Interface
            </span>
            <h4 className="text-xs font-bold text-white uppercase">Scan Pack Credentials</h4>
          </div>

          {/* QR container */}
          <div ref={qrRef} className="rounded-xl bg-white p-3.5 shadow-lg shadow-[#00d4ff]/5">
            <QRCodeSVG
              value={packUrl}
              size={128}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={false}
            />
          </div>

          <button
            onClick={downloadQrCode}
            className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>DOWNLOAD QR (.SVG)</span>
          </button>
        </div>

        {/* Permissions Table (Span 2) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
            <Lock className="h-3.5 w-3.5 text-[#00d4ff]" />
            <span>Gateway Access Register</span>
          </h4>

          <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-extrabold uppercase tracking-widest text-[#9ca3af] bg-white/[0.02]">
                  <th className="py-2.5 px-4">Operator Role</th>
                  <th className="py-2.5 px-4">Credential ID</th>
                  <th className="py-2.5 px-4">Scope</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                {mockAccessRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-white/[0.01]">
                    <td className="py-3 px-4 font-bold text-white flex items-center space-x-1.5">
                      <Key className="h-3.5 w-3.5 text-[#00d4ff]" />
                      <span>{rule.role}</span>
                    </td>
                    <td className="py-3 px-4 font-mono">{rule.identity}</td>
                    <td className="py-3 px-4 text-[#9ca3af]">{getScopeLabel(rule.scope)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block rounded bg-[#00e676]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#00e676] border border-[#00e676]/20">
                        {rule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded bg-white/[0.02] border border-white/5 p-3 text-[10px] text-[#9ca3af] flex items-center space-x-2">
            <Shield className="h-4 w-4 text-[#00e676] flex-shrink-0" />
            <p>
              Security gateway uses AES-128 cryptographic tokens. Mobile scans require field keys configured on the hardware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
