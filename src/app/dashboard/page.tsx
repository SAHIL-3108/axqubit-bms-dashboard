'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBmsStore } from '@/store/bmsStore';

// Tabs Views
import FleetOverview from '@/components/fleet/FleetOverview';
import ApiDocs from '@/components/docs/ApiDocs';

// Diagnostic Components
import SocGauge from '@/components/overview/SocGauge';
import StatusCard from '@/components/overview/StatusCard';
import MetricCard from '@/components/overview/MetricCard';
import LiveGrid from '@/components/live/LiveGrid';
import CellCard from '@/components/cells/CellCard';
import VoltageChart from '@/components/charts/VoltageChart';
import CurrentChart from '@/components/charts/CurrentChart';
import TempChart from '@/components/charts/TempChart';
import PowerChart from '@/components/charts/PowerChart';
import ProtectionFlags from '@/components/protection/ProtectionFlags';
import FaultHistory from '@/components/protection/FaultHistory';
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel';
import AiInsights from '@/components/ai/AiInsights';
import AlertConfig from '@/components/notifications/AlertConfig';
import DeviceInfo from '@/components/device/DeviceInfo';
import OtaUpdate from '@/components/ota/OtaUpdate';
import QrAccess from '@/components/qr/QrAccess';
import CommInterfaces from '@/components/device/CommInterfaces';

// Icons
import { Battery, ShieldCheck, Thermometer, Zap, Layers, Cpu, BookOpen } from 'lucide-react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'diagnostics' | 'api-docs'>('fleet');
  
  const {
    telemetry,
    cells,
    setTelemetry,
    setCells,
    addHistoryItem,
    selectedSerialNumber,
    setConnectionState,
  } = useBmsStore();

  // Watch for selected pack changes and fetch live readings
  useEffect(() => {
    let isSubscribed = true;

    async function fetchLiveReading() {
      if (!selectedSerialNumber) return;

      try {
        // Fetch from FastAPI backend
        const res = await fetch(`/api/bms/live?serialNumber=${selectedSerialNumber}`);
        if (!res.ok) throw new Error('API failure');
        
        const data = await res.json();
        
        if (isSubscribed) {
          setConnectionState('disconnected'); // Signifies fallback/rest mode
          setTelemetry(data.telemetry);
          setCells(data.cells);

          // Add to rolling chart history
          addHistoryItem({
            id: Math.random().toString(),
            timestamp: data.telemetry.timestamp,
            soc: data.telemetry.soc,
            soh: data.telemetry.soh,
            voltage: data.telemetry.voltage,
            current: data.telemetry.current,
            power: data.telemetry.power,
            packTemp: data.telemetry.packTemp,
          });
        }
      } catch (err) {
        console.warn('[Dashboard Page] Failed fetching telemetry for SN:', selectedSerialNumber);
      }
    }

    fetchLiveReading();
    const interval = setInterval(fetchLiveReading, 1000); // refresh every 1s

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [selectedSerialNumber, setTelemetry, setCells, addHistoryItem, setConnectionState]);

  const packAverage = cells.length > 0
    ? cells.reduce((sum, c) => sum + c.voltage, 0) / cells.length
    : 3.3;

  return (
    <div className="space-y-6 pb-16">
      {/* Navigation Tabs Bar */}
      <div className="flex border-b border-white/5 pb-2 space-x-6">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex items-center space-x-2 pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'fleet'
              ? 'border-[#00d4ff] text-[#00d4ff]'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <Layers className="h-4.5 w-4.5" />
          <span>Fleet Overview Matrix</span>
        </button>

        <button
          id="pack-diagnostics-view"
          onClick={() => setActiveTab('diagnostics')}
          className={`flex items-center space-x-2 pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'diagnostics'
              ? 'border-[#00d4ff] text-[#00d4ff]'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <Cpu className="h-4.5 w-4.5" />
          <span>Pack Diagnostics Stream</span>
        </button>

        <button
          onClick={() => setActiveTab('api-docs')}
          className={`flex items-center space-x-2 pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'api-docs'
              ? 'border-[#00d4ff] text-[#00d4ff]'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <BookOpen className="h-4.5 w-4.5" />
          <span>REST API Documentation</span>
        </button>
      </div>

      {/* Workspace Area */}
      <div>
        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] font-mono">
                Real-Time Fleet registers
              </span>
              <h3 className="text-lg font-black text-white">Multi-Pack Core Operations</h3>
            </div>
            <FleetOverview />
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Title */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] font-mono">
                Diagnostic Node: {selectedSerialNumber}
              </span>
              <h3 className="text-lg font-black text-white">Pack Telemetry and Balancing Registers</h3>
            </div>

            {/* 1. OVERVIEW ROW */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Semicircle Gauge Card */}
              <div className="glass-panel flex flex-col items-center justify-center rounded-xl p-5">
                <SocGauge soc={telemetry?.soc || 0} isBalancing={telemetry?.isBalancing} />
              </div>

              {/* Status Mode Card */}
              <StatusCard telemetry={telemetry} />

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  label="Pack Voltage"
                  value={telemetry?.voltage?.toFixed(2) || '0.00'}
                  unit="V"
                  icon={Zap}
                  subtext="Total pack voltage"
                />
                <MetricCard
                  label="Pack Current"
                  value={telemetry?.current?.toFixed(1) || '0.0'}
                  unit="A"
                  icon={telemetry?.current && telemetry.current > 0 ? Battery : ShieldCheck}
                  iconClassName={telemetry?.current && telemetry.current > 0 ? 'text-[#00e676]' : 'text-[#00d4ff]'}
                  subtext="Net charge current"
                />
                <MetricCard
                  label="Active Power"
                  value={telemetry?.power?.toFixed(0) || '0'}
                  unit="W"
                  icon={Zap}
                  iconClassName="text-[#00e676]"
                  subtext="Active power flow"
                />
                <MetricCard
                  label="Pack Temperature"
                  value={telemetry?.packTemp?.toFixed(1) || '0.0'}
                  unit="°C"
                  icon={Thermometer}
                  iconClassName="text-[#ff3333]"
                  subtext="Active sensor peak"
                />
              </div>
            </div>

            {/* 2. LIVE GAUGE GRID */}
            <LiveGrid />

            {/* 3. CELL BALANCE PANEL */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">6S Cell Symmetry Balance</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {cells.map((cell) => (
                  <CellCard key={cell.cellNumber} cell={cell} packAverage={packAverage} />
                ))}
              </div>
            </div>

            {/* 4. REALTIME CHARTS GRID (Recharts) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <VoltageChart />
              <CurrentChart />
              <TempChart />
              <PowerChart />
            </div>

            {/* 5. PROTECTIONS & ALERTS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ProtectionFlags />
              <FaultHistory />
            </div>

            {/* 6. AI DIAGNOSTICS & ANALYTICS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AiInsights />
              </div>
              <div>
                <AnalyticsPanel />
              </div>
            </div>

            {/* 7. TRANSCEIVERS CONFIG */}
            <CommInterfaces />

            {/* 8. ALERT CONFIGURATIONS */}
            <AlertConfig />

            {/* 9. DEVICE INFO & OTA FLASHER */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DeviceInfo />
              <OtaUpdate />
            </div>

            {/* 10. QR ACCESS CODE */}
            <QrAccess />
          </div>
        )}

        {activeTab === 'api-docs' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] font-mono">
                API Registries
              </span>
              <h3 className="text-lg font-black text-white">OEM System Integration Guide</h3>
            </div>
            <ApiDocs />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-sm font-semibold text-[#9ca3af]">
          Initializing AXQUBIT BMS SCADA Board...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
