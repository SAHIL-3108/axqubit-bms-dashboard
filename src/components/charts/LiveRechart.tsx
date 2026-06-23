'use client';

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LiveRechartProps {
  data: any[];
  dataKey: string;
  color: string;
  suggestedMin?: number;
  suggestedMax?: number;
}

export default function LiveRechart({
  data,
  dataKey,
  color,
  suggestedMin,
  suggestedMax,
}: LiveRechartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center text-xs text-[#9ca3af]">
        Loading stream...
      </div>
    );
  }

  // Format timestamp for XAxis
  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return `${d.getHours().toString().padStart(2, '0')}:${d
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    } catch {
      return '';
    }
  };

  const gradientId = `grad-${dataKey}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.03)"
          vertical={false}
        />

        <XAxis
          dataKey="timestamp"
          tickFormatter={formatTime}
          tick={{ fill: '#6b7280', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
          tickLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
          minTickGap={30}
        />

        <YAxis
          domain={[
            suggestedMin !== undefined ? suggestedMin : 'auto',
            suggestedMax !== undefined ? suggestedMax : 'auto',
          ]}
          tick={{ fill: '#6b7280', fontSize: 9 }}
          axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
          tickLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#0d1015',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#fff',
          }}
          labelFormatter={(label) => `Time: ${formatTime(label)}`}
          formatter={(value: any) => [parseFloat(value).toFixed(2), '']}
        />

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          isAnimationActive={false} // Disable animation for rapid real-time updates
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
