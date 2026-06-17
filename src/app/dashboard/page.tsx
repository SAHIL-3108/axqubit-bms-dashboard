'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBmsLive } from '@/hooks/useBmsLive';
import { useBmsStore } from '@/store/bmsStore';

// Overview Components
import SocGauge from '@/components/overview/SocGauge';
import StatusCard from '@/components/overview/StatusCard';
import MetricCard from '@/components/overview/MetricCard';

// Live Components
import LiveGrid from '@/components/live/LiveGrid';

// Cell Components
import CellCard from '@/components/cells/CellCard';

// Realtime Charts (Dynamic Imports or client safety handled inside)
import VoltageChart from '@/components/charts/VoltageChart';
import CurrentChart from '@/components/charts/CurrentChart';
import TempChart from '@/components/charts/TempChart';
import PowerChart from '@/components/charts/PowerChart';

// Protections
import ProtectionFlags from '@/components/protection/ProtectionFlags';
import FaultHistory from '@/components/protection/FaultHistory';

// AI & Analytics
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel';
import AiInsights from '@/components/ai/AiInsights';

// Config & Diagnostics
import AlertConfig from '@/components/notifications/AlertConfig';
import DeviceInfo from '@/components/device/DeviceInfo';
import OtaUpdate from '@/components/ota/OtaUpdate';
import QrAccess from '@/components/qr/QrAccess';

// Icons
import { Battery, ShieldCheck, Thermometer, Zap } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const serialNumber = searchParams.get('sn') || 'AXQ-BMS6000-LFP-082301';

  // Spin up live telemetry connection
  useBmsLive(serialNumber);

  const telemetry = useBmsStore((state) => state.telemetry);
  const cells = useBmsStore((state) => state.cells);

  const packAverage = cells.length > 0
    ? cells.reduce((sum, c) => sum + c.voltage, 0) / cells.length
    : 3.3;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. OVERVIEW SECTION */}
      <section id="overview" className="scroll-mt-6 space-y-6">
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
      </section>

      {/* 2. LIVE READINGS PANEL */}
      <section id="live-feed" className="scroll-mt-6">
        <LiveGrid />
      </section>

      {/* 3. CELL BALANCE PANEL */}
      <section id="cells" className="scroll-mt-6 space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Diagnostics
          </span>
          <h3 className="text-lg font-extrabold text-white">6S Cell Symmetry Balance</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cells.map((cell) => (
            <CellCard key={cell.cellNumber} cell={cell} packAverage={packAverage} />
          ))}
        </div>
      </section>

      {/* 4. REALTIME CHARTS GRID */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <VoltageChart />
        <CurrentChart />
        <TempChart />
        <PowerChart />
      </section>

      {/* 5. PROTECTIONS & ALERTS */}
      <section id="protections" className="scroll-mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProtectionFlags />
        <FaultHistory />
      </section>

      {/* 6. AI DIAGNOSTICS & ANALYTICS */}
      <section id="ai-diagnostics" className="scroll-mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AiInsights />
        </div>
        <div>
          <AnalyticsPanel />
        </div>
      </section>

      {/* 7. ALERT CONFIGURATIONS */}
      <section id="alerts" className="scroll-mt-6">
        <AlertConfig />
      </section>

      {/* 8. DEVICE INFO & OTA FLASHER */}
      <section id="device-ota" className="scroll-mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DeviceInfo />
        <OtaUpdate />
      </section>

      {/* 9. QR ACCESS CODE */}
      <section id="qr-code" className="scroll-mt-6">
        <QrAccess />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-sm font-semibold text-[#9ca3af]">
          Initializing AXQUBIT BMS6000 System Core...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
