'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Copy, Terminal } from 'lucide-react';

interface EndpointDoc {
  method: 'GET' | 'POST';
  path: string;
  desc: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
  bodyExample?: string;
  responseExample: string;
}

const docsList: EndpointDoc[] = [
  {
    method: 'GET',
    path: '/api/bms/fleet',
    desc: 'Retrieve telemetry logs for the entire 32-pack battery fleet, filtered by application.',
    responseExample: `[
  {
    "serialNumber": "AXQ-EV-01",
    "application": "EV",
    "soc": 82.4,
    "soh": 98.7,
    "voltage": 19.92,
    "current": -24.5,
    "packTemp": 32.5,
    "cycleCount": 124,
    "status": "normal",
    "chargingMode": "idle"
  }
]`,
  },
  {
    method: 'GET',
    path: '/api/bms/{serialNumber}/live',
    desc: 'Retrieve individual detailed telemetry metrics and 6-cell balancing parameters for a specific pack.',
    params: [
      { name: 'serialNumber', type: 'string', required: true, desc: 'Pack serial ID (e.g. AXQ-EV-01)' },
    ],
    responseExample: `{
  "telemetry": {
    "serialNumber": "AXQ-EV-01",
    "timestamp": "2026-06-23T11:20:00Z",
    "soc": 82.4,
    "soh": 98.7,
    "voltage": 19.92,
    "current": -2.5,
    "power": -49.8,
    "packTemp": 29.5,
    "cycleCount": 124,
    "isCharging": false,
    "isDischarging": true,
    "isBalancing": false,
    "status": "normal",
    "chargingMode": "idle",
    "remainingCapacity": 82.4,
    "nominalCapacity": 100.0,
    "energyThroughput": 238.08,
    "protectionFlags": { "ovp": false, "uvp": false, "ocp": false, "scp": false }
  },
  "cells": [
    { "cellNumber": 1, "voltage": 3.325, "temp": 29.2, "isBalancing": false, "deltaV": 0.005 }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/bms/{serialNumber}/history',
    desc: 'Retrieve historical records of voltage, current, power, and temperature for charting.',
    params: [
      { name: 'serialNumber', type: 'string', required: true, desc: 'Pack serial ID' },
      { name: 'range', type: 'string', required: false, desc: 'Time range filter (1h, 24h, 7d, 30d)' },
    ],
    responseExample: `{
  "history": [
    {
      "id": "mock-0",
      "timestamp": "2026-06-22T11:20:00Z",
      "soc": 82.0,
      "soh": 99.5,
      "voltage": 19.8,
      "current": -4.2,
      "power": -83.1,
      "packTemp": 28.5
    }
  ]
}`,
  },
  {
    method: 'POST',
    path: '/api/bms/{serialNumber}/ota',
    desc: 'Triggers an Over-the-Air (OTA) firmware flash command sequence via the MQTT command queue.',
    params: [
      { name: 'serialNumber', type: 'string', required: true, desc: 'Target pack serial ID' },
    ],
    bodyExample: `{
  "firmwareUrl": "https://firmware.axqubit.com/bms6000/v1.1.0.bin",
  "version": "v1.1.0"
}`,
    responseExample: `{
  "success": true,
  "message": "OTA update command successfully published over MQTT for pack AXQ-EV-01.",
  "firmware": "v1.1.0",
  "payloadUrl": "https://firmware.axqubit.com/bms6000/v1.1.0.bin"
}`,
  },
];

export default function ApiDocs() {
  const [openEndpoint, setOpenEndpoint] = useState<string | null>(null);

  const toggleEndpoint = (path: string) => {
    setOpenEndpoint(openEndpoint === path ? null : path);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="glass-panel rounded-xl p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-[#00d4ff]" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] font-mono">
              Integrations
            </span>
            <h3 className="text-sm font-bold text-white">REST API Developer Documentation</h3>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {docsList.map((doc) => {
          const isOpen = openEndpoint === doc.path;
          const isPost = doc.method === 'POST';

          return (
            <div
              key={doc.path}
              className="rounded-lg border border-white/5 bg-white/[0.01] overflow-hidden"
            >
              {/* Collapsible Trigger */}
              <button
                onClick={() => toggleEndpoint(doc.path)}
                className="flex w-full items-center justify-between p-4 hover:bg-white/[0.01] transition-all text-left cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-black font-mono border ${
                      isPost
                        ? 'text-[#00d4ff] bg-[#00d4ff]/10 border-[#00d4ff]/20'
                        : 'text-[#00e676] bg-[#00e676]/10 border-[#00e676]/20'
                    }`}
                  >
                    {doc.method}
                  </span>
                  <span className="font-mono text-xs text-white font-bold">{doc.path}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:inline text-[10px] text-[#9ca3af]">{doc.desc.slice(0, 45)}...</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-[#9ca3af]" /> : <ChevronDown className="h-4 w-4 text-[#9ca3af]" />}
                </div>
              </button>

              {/* Endpoint Details */}
              {isOpen && (
                <div className="border-t border-white/5 bg-[#0a0c10]/40 p-4 space-y-4 text-xs">
                  <p className="text-gray-300 leading-relaxed">{doc.desc}</p>

                  {/* Params */}
                  {doc.params && doc.params.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-white uppercase text-[9px] tracking-wider">Path/Query Parameters</h4>
                      <div className="rounded border border-white/5 overflow-hidden bg-white/[0.01]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 text-[9px] font-extrabold uppercase text-[#9ca3af] bg-white/[0.02]">
                              <th className="py-2 px-3">Name</th>
                              <th className="py-2 px-3">Type</th>
                              <th className="py-2 px-3">Required</th>
                              <th className="py-2 px-3">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                            {doc.params.map((p) => (
                              <tr key={p.name}>
                                <td className="py-2 px-3 font-mono font-bold text-white">{p.name}</td>
                                <td className="py-2 px-3 font-mono text-[#00d4ff]">{p.type}</td>
                                <td className="py-2 px-3">{p.required ? 'Yes' : 'No'}</td>
                                <td className="py-2 px-3 text-[#9ca3af]">{p.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Request Body */}
                  {doc.bodyExample && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white uppercase text-[9px] tracking-wider flex items-center space-x-1">
                          <Terminal className="h-3 w-3 text-[#00d4ff]" />
                          <span>Request Body (JSON)</span>
                        </h4>
                        <button
                          onClick={() => copyToClipboard(doc.bodyExample!)}
                          className="text-[9px] text-[#9ca3af] hover:text-white flex items-center space-x-1 cursor-pointer"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre className="rounded-lg border border-white/5 bg-black p-3.5 font-mono text-[10px] text-gray-300 overflow-x-auto">
                        {doc.bodyExample}
                      </pre>
                    </div>
                  )}

                  {/* Response Payload */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white uppercase text-[9px] tracking-wider flex items-center space-x-1">
                        <Terminal className="h-3 w-3 text-[#00e676]" />
                        <span>Response Payload (JSON)</span>
                      </h4>
                      <button
                        onClick={() => copyToClipboard(doc.responseExample)}
                        className="text-[9px] text-[#9ca3af] hover:text-white flex items-center space-x-1 cursor-pointer"
                      >
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <pre className="rounded-lg border border-white/5 bg-black p-3.5 font-mono text-[10px] text-gray-300 overflow-x-auto">
                      {doc.responseExample}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
