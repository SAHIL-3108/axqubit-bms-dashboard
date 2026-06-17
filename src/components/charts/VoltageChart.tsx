'use client';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useBmsStore } from '@/store/bmsStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function VoltageChart() {
  const history = useBmsStore((state) => state.history);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="glass-panel flex h-60 items-center justify-center rounded-xl text-xs text-[#9ca3af]">
        Loading Voltage Realtime Stream...
      </div>
    );
  }

  // Slice last 120 points (60s rolling window if data updates at 500ms)
  const windowData = history.slice(-120);

  const labels = windowData.map((item) => {
    try {
      const d = new Date(item.timestamp);
      return `${d.getHours().toString().padStart(2, '0')}:${d
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    } catch {
      return '';
    }
  });

  const voltages = windowData.map((item) => item.voltage);

  const data = {
    labels,
    datasets: [
      {
        label: 'Pack Voltage',
        data: voltages,
        fill: true,
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.05)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Disable animations for smooth fast-rendering updates
    },
    hover: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 9 },
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
        },
        ticks: {
          color: '#6b7280',
          font: { size: 9 },
        },
        suggestedMin: 18.0,
        suggestedMax: 21.6,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#0d1015',
        titleColor: '#9ca3af',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="glass-panel rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af]">
            Voltage Stream
          </span>
          <h3 className="text-sm font-bold text-white">60s Rolling Window</h3>
        </div>
        <div className="flex items-center space-x-1.5 rounded-full bg-[#00d4ff]/10 px-2 py-0.5 border border-[#00d4ff]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] animate-pulse"></span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00d4ff]">
            {voltages.length > 0 ? `${voltages[voltages.length - 1].toFixed(2)} V` : '0.00 V'}
          </span>
        </div>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
