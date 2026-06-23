import { NextResponse } from 'next/server';
import { BmsTelemetry, CellData } from '@/types/bms';

let currentSoc = 78.4;
let chargeDirection = 1;
let currentPackCycles = 124;
let cumThroughput = 248.5;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serialNumber = searchParams.get('serialNumber') || 'AXQ-BMS6000-LFP-082301';

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  try {
    // Attempt proxying to FastAPI backend
    const res = await fetch(`${BACKEND_URL}/api/bms/${serialNumber}/live`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('FastAPI offline');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    // Fallback: local simulated fluctuations if python backend is offline
    currentSoc += 0.05 * chargeDirection;
    if (currentSoc >= 99.8) {
      currentSoc = 99.8;
      chargeDirection = -1;
      currentPackCycles += 1;
    } else if (currentSoc <= 12.0) {
      currentSoc = 12.0;
      chargeDirection = 1;
      currentPackCycles += 1;
    }

    cumThroughput += 0.01;

    let currentAmps = 0;
    let isCharging = false;
    let isDischarging = false;
    let chargingMode: 'idle' | 'bulk' | 'absorption' | 'float' = 'idle';

    if (chargeDirection === 1) {
      isCharging = true;
      currentAmps = 14.8 + Math.random() * 0.4;
      chargingMode = currentSoc >= 95 ? 'absorption' : 'bulk';
    } else if (chargeDirection === -1) {
      isDischarging = true;
      currentAmps = -21.5 - Math.random() * 0.8;
    }

    const baseVoltage = isCharging ? 3.38 : isDischarging ? 3.22 : 3.30;
    const nominalCapacity = 100.0;
    const remainingCapacity = (currentSoc / 100) * nominalCapacity;

    const cellDeviations = [0.005, -0.004, 0.009, -0.007, 0.002, -0.005];
    
    const cells: CellData[] = Array.from({ length: 6 }, (_, i) => {
      const noise = (Math.random() - 0.5) * 0.002;
      const cellVoltage = baseVoltage + cellDeviations[i] + noise;
      const cellTemp = 28.4 + (Math.random() - 0.5) * 0.5 + (isCharging ? 1.5 : isDischarging ? 3.2 : 0);

      return {
        cellNumber: i + 1,
        voltage: parseFloat(cellVoltage.toFixed(3)),
        temp: parseFloat(cellTemp.toFixed(1)),
        isBalancing: isCharging && cellVoltage > 3.375,
        deltaV: 0,
      };
    });

    const packVoltage = cells.reduce((sum, cell) => sum + cell.voltage, 0);
    const packTemp = Math.max(...cells.map((c) => c.temp));
    const activePower = packVoltage * currentAmps;

    const telemetry: BmsTelemetry = {
      serialNumber,
      timestamp: new Date().toISOString(),
      soc: parseFloat(currentSoc.toFixed(2)),
      soh: parseFloat((100 - currentPackCycles * 0.0066).toFixed(2)),
      voltage: parseFloat(packVoltage.toFixed(2)),
      current: parseFloat(currentAmps.toFixed(2)),
      power: parseFloat(activePower.toFixed(2)),
      packTemp: parseFloat(packTemp.toFixed(1)),
      cycleCount: currentPackCycles,
      isCharging,
      isDischarging,
      isBalancing: cells.some((c) => c.isBalancing),
      status: packTemp > 55 ? 'warning' : 'normal',
      chargingMode,
      remainingCapacity: parseFloat(remainingCapacity.toFixed(1)),
      nominalCapacity,
      energyThroughput: parseFloat(cumThroughput.toFixed(2)),
      protectionFlags: {
        ovp: packVoltage > 22.0,
        uvp: packVoltage < 15.0,
        ocp: Math.abs(currentAmps) > 60.0,
        scp: false,
        otp: packTemp > 60.0,
        utp: packTemp < -5.0,
        covp: cells.some((c) => c.voltage > 3.70),
        cuvp: cells.some((c) => c.voltage < 2.50),
      },
    };

    return NextResponse.json({ telemetry, cells });
  }
}
