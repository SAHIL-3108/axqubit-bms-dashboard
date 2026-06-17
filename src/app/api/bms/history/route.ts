import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { BmsHistoryItem } from '@/types/bms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serialNumber = searchParams.get('serialNumber') || 'AXQ-BMS6000-LFP-082301';
  const range = searchParams.get('range') || '24h';

  // Calculate cutoff timestamp
  const now = new Date();
  let cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // default 24h

  if (range === '1h') {
    cutoffDate = new Date(now.getTime() - 60 * 60 * 1000);
  } else if (range === '7d') {
    cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (range === '30d') {
    cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  try {
    // Attempt database query
    const records = await prisma.telemetryRecord.findMany({
      where: {
        serialNumber,
        timestamp: {
          gte: cutoffDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    if (records.length > 0) {
      // Map to history structure
      const history: BmsHistoryItem[] = records.map((r) => ({
        id: r.id,
        timestamp: r.timestamp.toISOString(),
        soc: r.soc,
        soh: r.soh,
        voltage: r.voltage,
        current: r.current,
        power: r.power,
        packTemp: r.packTemp,
      }));
      return NextResponse.json({ history });
    }

    // Fallback to mock data if DB has no records
    throw new Error('Database is empty, falling back to mock history.');

  } catch (err) {
    console.warn('[History API] Database query failed or returned empty. serving mock data.', err);
    
    // Generate realistic historical curve
    const history: BmsHistoryItem[] = [];
    const numPoints = range === '1h' ? 60 : range === '24h' ? 48 : 30; // points count
    const intervalMs = (now.getTime() - cutoffDate.getTime()) / numPoints;

    let rollingSoc = 85.0;
    let rollingSoh = 99.5;

    for (let i = 0; i < numPoints; i++) {
      const timestamp = new Date(cutoffDate.getTime() + i * intervalMs);
      
      // Simulate charging cycles over days
      if (range === '7d' || range === '30d') {
        rollingSoc = 40 + Math.sin(i / 2) * 40 + (Math.random() - 0.5) * 5;
        rollingSoh -= 0.01; // SOH decay
      } else {
        // Shorter ranges show smooth curve
        rollingSoc = Math.max(15, Math.min(99, rollingSoc + (Math.random() - 0.4) * 2));
      }

      // Safe bounds
      const volts = 18.0 + (rollingSoc / 100) * 3.2 + (Math.random() - 0.5) * 0.1;
      const amps = Math.sin(i / 3) * 15 + (Math.random() - 0.5) * 2;
      const powerWatts = volts * amps;
      const tempC = 25.0 + Math.abs(amps) * 0.4 + (Math.random() - 0.5) * 0.5;

      history.push({
        id: `mock-${i}-${timestamp.getTime()}`,
        timestamp: timestamp.toISOString(),
        soc: parseFloat(rollingSoc.toFixed(1)),
        soh: parseFloat(rollingSoh.toFixed(2)),
        voltage: parseFloat(volts.toFixed(2)),
        current: parseFloat(amps.toFixed(2)),
        power: parseFloat(powerWatts.toFixed(1)),
        packTemp: parseFloat(tempC.toFixed(1)),
      });
    }

    return NextResponse.json({ history });
  }
}
