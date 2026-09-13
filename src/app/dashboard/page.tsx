'use client';

import React, { Suspense, useEffect } from 'react';
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
  const {
    telemetry,
    cells,
    setTelemetry,
    setCells,
    addHistoryItem,
    selectedSerialNumber,
    setConnectionState,
    // Shared nav state driven by Sidebar
    activeDashTab,
    setActiveDashTab,
  } = useBmsStore();

  // Watch for selected pack changes and fetch live readings
  useEffect(() => {
    let isSubscribed = true;

    async function fetchLiveReading() {
      if (!selectedSerialNumber) return;

      try {
        const res = await fetch(`/api/bms/live?serialNumber=${selectedSerialNumber}`);
        if (!res.ok) throw new Error('API failure');

        const data = await res.json();

        if (isSubscribed) {
          setConnectionState('disconnected');
          setTelemetry(data.telemetry);
          setCells(data.cells);

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
    const interval = setInterval(fetchLiveReading, 1000);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [selectedSerialNumber, setTelemetry, setCells, addHistoryItem, setConnectionState]);

  const packAverage =
    cells.length > 0
      ? cells.reduce((sum, c) => sum + c.voltage, 0) / cells.length
      : 3.3;

  return (
    <div className="space-y-6 pb-16">
      {/* ── Tab Bar ─────────────────────────────────────────────── */}
      <div className="flex border-b border-white/5 pb-2 space-x-6">
        <button
          onClick={() => setActiveDashTab('fleet')}
          className={`flex items-center space-x-2 pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeDashTab === 'fleet'
              ? 'border-[#00d4ff] text-[#00d4ff]'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Fleet Overview Matrix</span>
        </button>

        <button
          id="pack-diagnostics-view"
          onClick={() => setActiveDashTab('diagnostics')}
          className={`flex items-center space-x-2 pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeDashTab === 'diagnostics'
              ? 'border-[#00d4ff] text-[#00d4ff]'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <Cpu className="h-4 w-4" />
          <span>Pack Diagnostics Stream</span>
        </button>

        <button
          onClick={() => setActiveDashTab('api-docs')}
          className={`flex items-center space-x-2 pb-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeDashTab === 'api-docs'
              ? 'border-[#00d4ff] text-[#00d4ff]'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>REST API Documentation</span>
        </button>
      </div>

      {/* ── Fleet Tab ────────────────────────────────────────────── */}
      {activeDashTab === 'fleet' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] font-mono">
              Real-Time Fleet Registers
            </span>
            <h3 className="text-lg font-black text-white">Multi-Pack Core Operations</h3>
          </div>
          <FleetOverview />
        </div>
      )}

      {/* ── Diagnostics Tab ──────────────────────────────────────── */}
      {activeDashTab === 'diagnostics' && (
        <div className="space-y-10 animate-fadeIn">
          {/* Title */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] font-mono">
              Diagnostic Node: {selectedSerialNumber}
            </span>
            <h3 className="text-lg font-black text-white">Pack Telemetry and Balancing Registers</h3>
          </div>

          {/* ① OVERVIEW ─────────────────────────────────────────── */}
          <section id="section-overview" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Overview
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* SOC Gauge */}
              <div className="glass-panel flex flex-col items-center justify-center rounded-xl p-5">
                <SocGauge soc={telemetry?.soc || 0} isBalancing={telemetry?.isBalancing} />
              </div>

              {/* Status Card */}
              <StatusCard telemetry={telemetry} />

              {/* Metric Cards */}
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
                  iconClassName={
                    telemetry?.current && telemetry.current > 0
                      ? 'text-[#00e676]'
                      : 'text-[#00d4ff]'
                  }
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
          </section>

          {/* ② LIVE READINGS ────────────────────────────────────── */}
          <section id="section-live" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Live Readings
            </p>
            <LiveGrid />
          </section>

          {/* ③ CELL BALANCE ─────────────────────────────────────── */}
          <section id="section-cells" className="scroll-mt-6 space-y-4">
            <p className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Cell Balance
            </p>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              6S Cell Symmetry Balance
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {cells.map((cell) => (
                <CellCard key={cell.cellNumber} cell={cell} packAverage={packAverage} />
              ))}
            </div>

            {/* Realtime charts below cell balance */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-2">
              <VoltageChart />
              <CurrentChart />
              <TempChart />
              <PowerChart />
            </div>
          </section>

          {/* ④ PROTECTIONS ──────────────────────────────────────── */}
          <section id="section-protections" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Protections
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ProtectionFlags />
              <FaultHistory />
            </div>
          </section>

          {/* ⑤ AI DIAGNOSTICS ───────────────────────────────────── */}
          <section id="section-ai" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ AI Diagnostics
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AiInsights />
              </div>
              <div>
                <AnalyticsPanel />
              </div>
            </div>
          </section>

          {/* ⑥ COMM INTERFACES ─────────────────────────────────── */}
          <section id="section-comm" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Communication Interfaces
            </p>
            <CommInterfaces />
          </section>

          {/* ⑦ ALERTS CONFIG ────────────────────────────────────── */}
          <section id="section-alerts" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Alerts Config
            </p>
            <AlertConfig />
          </section>

          {/* ⑧ DEVICE & OTA ─────────────────────────────────────── */}
          <section id="section-device" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ Device & OTA
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DeviceInfo />
              <OtaUpdate />
            </div>
          </section>

          {/* ⑨ QR SCAN ─────────────────────────────────────────── */}
          <section id="section-qr" className="scroll-mt-6">
            <p className="mb-4 text-[10px] font-extrabold uppercase tracking-widest text-[#4b5563]">
              ▸ QR Scan
            </p>
            <QrAccess />
          </section>
        </div>
      )}

      {/* ── API Docs Tab ─────────────────────────────────────────── */}
      {activeDashTab === 'api-docs' && (
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
