'use client';

import React from 'react';
import { BrainCircuit, Activity, AlertTriangle, ShieldCheck, Wrench, ChevronRight } from 'lucide-react';
import { useBmsStore } from '@/store/bmsStore';
import {
  projectSoh,
  detectCellDegradation,
  getChargingAdvice,
  recommendMaintenance,
} from '@/lib/ai-engine';

export default function AiInsights() {
  const telemetry = useBmsStore((state) => state.telemetry);
  const cells = useBmsStore((state) => state.cells);

  const cycleCount = telemetry?.cycleCount || 0;
  const current = telemetry?.current || 0;
  const nominalCapacity = telemetry?.nominalCapacity || 100;
  const soc = telemetry?.soc || 0;
  const soh = telemetry?.soh || 100;

  // AI Calculations
  const regressionSamples = [
    { cycleCount: 0, soh: 100 },
    { cycleCount: Math.round(cycleCount / 2), soh: parseFloat((100 - (cycleCount / 2) * 0.0066).toFixed(1)) },
    { cycleCount, soh },
  ];
  
  const sohProjection = projectSoh(cycleCount, regressionSamples);
  const cellDiagnostics = detectCellDegradation(cells);
  const chargeAdvice = getChargingAdvice(current, nominalCapacity, soc);
  const maintenanceAdvice = recommendMaintenance(cycleCount);

  // Score Calculations for Bars (0-100%)
  // 1. SOH Health Score
  const sohScore = soh;
  
  // 2. Cell Balance Score: 100% at delta = 0mV, drops to 0% at delta >= 50mV
  const balanceScore = Math.max(0, Math.min(100, 100 - (cellDiagnostics.maxDeviationMv / 50) * 100));

  // 3. C-rate Score: 100% under 0.3C, tapers down if it exceeds 0.3C
  const cRateAbs = Math.abs(current) / nominalCapacity;
  const cRateScore = Math.max(0, Math.min(100, cRateAbs <= 0.3 ? 100 : 100 - ((cRateAbs - 0.3) / 0.7) * 100));

  // 4. Maintenance Score: percentage of cycle interval (0-100 cycles) before service
  const serviceIntervalProgress = (cycleCount % 100);
  const maintenanceScore = 100 - serviceIntervalProgress; // drops as we approach 100 cycles

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-[#00e676]';
    if (score >= 50) return 'bg-[#ffb300]';
    return 'bg-[#ff3333]';
  };

  return (
    <div className="glass-panel border-purple-500/20 bg-gradient-to-br from-[#120f26]/40 to-[#0a0c0f]/80 rounded-xl p-5 relative overflow-hidden">
      {/* Background neon blur */}
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-purple-600/10 blur-[60px]" />
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between pb-3 border-b border-white/5 relative z-10">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="h-5 w-5 text-purple-400 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">
              AI Diagnostics
            </span>
            <h3 className="text-sm font-bold text-white">AXQUBIT Battery Intelligence</h3>
          </div>
        </div>
      </div>

      {/* Grid of 4 Insight Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 relative z-10">
        {/* Card 1: Lifespan (SOH) */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">
                Lifespan & SOH
              </span>
              <h4 className="text-xs font-bold text-white uppercase">SOH Projection Index</h4>
            </div>
            <span className="text-[10px] font-mono text-purple-400 font-bold">
              RUL: {sohProjection.remainingCycles} cyc
            </span>
          </div>
          
          <p className="mt-3 text-[11px] leading-relaxed text-gray-300">
            Current SOH is {soh.toFixed(1)}%. AI projections estimate {sohProjection.remainingCycles} cycles remaining until EOL capacity fade.
          </p>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-[#9ca3af]">
              <span>HEALTH RATIO</span>
              <span className="text-white">{sohScore.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full ${getScoreColor(sohScore)}`} style={{ width: `${sohScore}%` }} />
            </div>
          </div>
        </div>

        {/* Card 2: Cell Balance */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">
                Cell Diagnostics
              </span>
              <h4 className="text-xs font-bold text-white uppercase">Voltage Balance Outliers</h4>
            </div>
            {cellDiagnostics.outlierDetected ? (
              <span className="text-[10px] font-bold text-[#ff3333] bg-[#ff3333]/15 px-1.5 py-0.5 rounded">
                OUTLIERS
              </span>
            ) : (
              <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded">
                NOMINAL
              </span>
            )}
          </div>
          
          <p className="mt-3 text-[11px] leading-relaxed text-gray-300">
            {cellDiagnostics.outlierDetected
              ? `Cell deviation is high (${cellDiagnostics.maxDeviationMv}mV). Degraded cells detected: #${cellDiagnostics.degradedCellNumbers.join(', #')}. Balance active.`
              : `Cell matching is healthy. Max delta is ${cellDiagnostics.maxDeviationMv}mV, well below the 25mV degradation outlier limit.`}
          </p>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-[#9ca3af]">
              <span>CELL SYMMETRY</span>
              <span className="text-white">{balanceScore.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full ${getScoreColor(balanceScore)}`} style={{ width: `${balanceScore}%` }} />
            </div>
          </div>
        </div>

        {/* Card 3: C-Rate Stress */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">
                Charge Stress
              </span>
              <h4 className="text-xs font-bold text-white uppercase">C-Rate Current Analysis</h4>
            </div>
            <span className="text-[10px] font-mono text-purple-400 font-bold">
              {(current / nominalCapacity).toFixed(2)}C Rate
            </span>
          </div>
          
          <p className="mt-3 text-[11px] leading-relaxed text-gray-300">
            {chargeAdvice.message}
          </p>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-[#9ca3af]">
              <span>CURRENT STRESS INDEX</span>
              <span className="text-white">{cRateScore.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full ${getScoreColor(cRateScore)}`} style={{ width: `${cRateScore}%` }} />
            </div>
          </div>
        </div>

        {/* Card 4: Mechanical Service */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">
                Maintenance Advisor
              </span>
              <h4 className="text-xs font-bold text-white uppercase">Physical Checkups</h4>
            </div>
            <span className="text-[10px] font-mono text-purple-400 font-bold">
              Next: {maintenanceAdvice.nextServiceAt} cyc
            </span>
          </div>
          
          <p className="mt-3 text-[11px] leading-relaxed text-gray-300">
            {maintenanceAdvice.message}
          </p>

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-[#9ca3af]">
              <span>INTERVAL Longevity</span>
              <span className="text-white">{maintenanceScore.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full ${getScoreColor(maintenanceScore)}`} style={{ width: `${maintenanceScore}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
