import { NextResponse } from 'next/server';
import { FleetPackInfo } from '@/types/bms';

// Fallback seed simulation inside Next.js API in case FastAPI backend is offline
function generateMockFleet(): FleetPackInfo[] {
  const fleet: FleetPackInfo[] = [];

  // EV: 8 packs
  for (let i = 1; i <= 8; i++) {
    fleet.push({
      serialNumber: `AXQ-EV-${i.toString().padStart(2, '0')}`,
      application: 'EV',
      soc: 80.0 + Math.sin(i) * 15,
      soh: 98.5 - i * 0.1,
      voltage: 19.8 + (Math.sin(i) * 0.4),
      current: -25.0 + Math.cos(i) * 10,
      packTemp: 28.0 + (i % 3) * 2.5,
      cycleCount: 120 + i * 25,
      status: i === 5 ? 'warning' : 'normal',
      chargingMode: 'idle',
    });
  }

  // Robotics: 8 packs
  for (let i = 1; i <= 8; i++) {
    fleet.push({
      serialNumber: `AXQ-ROB-${i.toString().padStart(2, '0')}`,
      application: 'Robotics',
      soc: 70.0 + Math.cos(i) * 20,
      soh: 99.0 - i * 0.05,
      voltage: 19.6 + (Math.cos(i) * 0.3),
      current: -10.0 + Math.sin(i) * 4,
      packTemp: 25.0 + (i % 2) * 2.0,
      cycleCount: 80 + i * 12,
      status: i === 3 ? 'fault' : 'normal',
      chargingMode: 'idle',
    });
  }

  // Drones: 8 packs
  for (let i = 1; i <= 8; i++) {
    const isCharging = i === 2;
    fleet.push({
      serialNumber: `AXQ-DRN-${i.toString().padStart(2, '0')}`,
      application: 'Drone',
      soc: isCharging ? 92.0 : 40.0 + Math.sin(i * 1.5) * 25,
      soh: 97.5 - i * 0.15,
      voltage: isCharging ? 21.4 : 19.4 + Math.sin(i * 1.5) * 0.5,
      current: isCharging ? 12.5 : -35.0 + Math.cos(i * 1.5) * 8,
      packTemp: 32.0 + (i % 4) * 3.0,
      cycleCount: 40 + i * 8,
      status: i === 6 ? 'offline' : 'normal',
      chargingMode: isCharging ? 'bulk' : 'idle',
    });
  }

  // Solar ESS: 4 packs
  for (let i = 1; i <= 4; i++) {
    fleet.push({
      serialNumber: `AXQ-SLR-${i.toString().padStart(2, '0')}`,
      application: 'Solar ESS',
      soc: 85.0 + Math.sin(i * 2) * 10,
      soh: 99.4 - i * 0.02,
      voltage: 20.0 + Math.sin(i * 2) * 0.2,
      current: 18.0 + Math.cos(i * 2) * 5, // charging during day
      packTemp: 24.0 + (i % 2) * 1.5,
      cycleCount: 350 + i * 120,
      status: 'normal',
      chargingMode: i === 1 ? 'float' : 'bulk',
    });
  }

  // OEM Pack: 4 packs
  for (let i = 1; i <= 4; i++) {
    fleet.push({
      serialNumber: `AXQ-OEM-${i.toString().padStart(2, '0')}`,
      application: 'OEM Pack',
      soc: 50.0 + Math.cos(i * 3) * 45,
      soh: 98.8 - i * 0.08,
      voltage: 19.2 + Math.cos(i * 3) * 0.6,
      current: -2.0 + Math.sin(i * 3) * 1.5,
      packTemp: 26.0 + i * 1.0,
      cycleCount: 15 + i * 20,
      status: 'normal',
      chargingMode: 'idle',
    });
  }

  return fleet;
}

const mockFleetCache = generateMockFleet();

export async function GET() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  try {
    const res = await fetch(`${BACKEND_URL}/api/bms/fleet`, {
      next: { revalidate: 1 }, // Cache for 1s
    });

    if (!res.ok) throw new Error('FastAPI backend offline');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    // Fallback: Fluctuate Next.js simulated values slightly
    mockFleetCache.forEach((p) => {
      if (p.status === 'offline') return;
      if (p.chargingMode !== 'idle') {
        p.soc = Math.min(100.0, p.soc + 0.1);
      } else {
        p.soc = Math.max(0.0, p.soc - 0.05);
      }
      p.current = parseFloat((p.current + (Math.random() - 0.5) * 0.4).toFixed(2));
      p.voltage = parseFloat((19.2 + (p.soc / 100) * 2.1 + (Math.random() - 0.5) * 0.05).toFixed(2));
      p.packTemp = parseFloat((p.packTemp + (Math.random() - 0.5) * 0.1).toFixed(1));
    });

    return NextResponse.json(mockFleetCache);
  }
}
