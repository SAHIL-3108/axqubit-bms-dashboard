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

export default function PowerChart() {
  const history = useBmsStore((state) => state.history);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="glass-panel flex h-60 items-center justify-center rounded-xl text-xs text-[#9ca3af]">
        Loading Power Realtime Stream...
      </div>
    );
  }

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

  const powers = windowData.map((item) => item.power);

  const data = {
    labels,
    datasets: [
      {
        label: 'Pack Power',
        data: powers,
        fill: true,
        borderColor: '#00e676',
        backgroundColor: 'rgba(0, 230, 118, 0.05)',
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
      duration: 0,
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
        suggestedMin: -500,
        suggestedMax: 500,
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
            Power Stream
          </span>
          <h3 className="text-sm font-bold text-white">60s Rolling Window</h3>
        </div>
        <div className="flex items-center space-x-1.5 rounded-full bg-[#00e676]/10 px-2 py-0.5 border border-[#00e676]/20">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#00e676]">
            {powers.length > 0 ? `${powers[powers.length - 1].toFixed(0)} W` : '0 W'}
          </span>
        </div>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
