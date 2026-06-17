import { NextResponse } from 'next/server';
import { CellData } from '@/types/bms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serialNumber = searchParams.get('serialNumber') || 'AXQ-BMS6000-LFP-082301';

  // ESP32 simulation for 6 cells
  const baseVoltage = 3.315;
  const cellDeviations = [0.006, -0.003, 0.008, -0.005, 0.001, -0.004];

  const cells: CellData[] = Array.from({ length: 6 }, (_, i) => {
    const noise = (Math.random() - 0.5) * 0.001;
    const voltage = baseVoltage + cellDeviations[i] + noise;
    const temp = 26.5 + (Math.random() - 0.5) * 0.4;

    return {
      cellNumber: i + 1,
      voltage: parseFloat(voltage.toFixed(3)),
      temp: parseFloat(temp.toFixed(1)),
      isBalancing: voltage > 3.32, // balancing threshold active
      deltaV: 0,
    };
  });

  return NextResponse.json({ serialNumber, cells });
}
