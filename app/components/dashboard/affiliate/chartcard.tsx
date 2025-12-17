"use client";

import { useEffect, useRef } from "react";

interface ChartCardProps {
  title: string;
  timeRange: string; // "7d" | "30d" | "90d"
}

export default function ChartCard({ title, timeRange }: ChartCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Auto-resize for crisp high-DPI rendering
    const parentWidth = canvas.parentElement?.clientWidth ?? 800;
    canvas.width = parentWidth * 2;
    canvas.height = 300 * 2;
    canvas.style.width = parentWidth + "px";
    canvas.style.height = "300px";

    const width = canvas.width;
    const height = canvas.height;

    ctx.scale(2, 2);

    // === DATA ===
    const clicksData =
      timeRange === "7d"
        ? [1200, 1450, 1300, 1680, 1890, 2100, 1950]
        : timeRange === "30d"
          ? [
              1200, 1350, 1500, 1450, 1680, 1890, 2100, 1950, 2200, 2350, 2150,
              2400, 2600, 2450, 2700, 2850, 2650, 2900, 3100, 2950, 3200, 3350,
              3150, 3400, 3600, 3450, 3700, 3850, 3650, 3900,
            ]
          : // 90d sample
            [2100, 2300, 2500, 2400, 2680, 2890, 3100, 2950, 3200, 3350];

    const conversionsData =
      timeRange === "7d"
        ? [85, 98, 92, 115, 128, 142, 135]
        : timeRange === "30d"
          ? [
              85, 92, 98, 95, 115, 128, 142, 135, 148, 155, 145, 162, 175, 168,
              182, 195, 185, 198, 210, 202, 218, 225, 215, 232, 245, 238, 252,
              265, 255, 270,
            ]
          : [142, 155, 168, 162, 182, 195, 210, 202, 218, 225];

    // === CHART CALCULATIONS ===
    const padding = 40;
    const chartWidth = parentWidth - padding * 2;
    const chartHeight = 300 - padding * 2;

    const maxClicks = Math.max(...clicksData);
    const maxConversions = Math.max(...conversionsData) * 20; // scale conversions visually
    const maxValue = Math.max(maxClicks, maxConversions);

    const stepX = chartWidth / (clicksData.length - 1);

    ctx.clearRect(0, 0, width, height);

    // === GRID LINES ===
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(chartWidth + padding, y);
      ctx.stroke();
    }

    // ==== CLICK LINE (TEAL) ====
    ctx.beginPath();
    ctx.strokeStyle = "#14b8a6";
    ctx.lineWidth = 3;

    clicksData.forEach((value, i) => {
      const x = padding + stepX * i;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill under click line
    ctx.fillStyle = "rgba(20, 184, 166, 0.12)";
    ctx.beginPath();
    ctx.moveTo(padding, chartHeight + padding);
    clicksData.forEach((value, i) => {
      const x = padding + stepX * i;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(
      padding + stepX * (clicksData.length - 1),
      chartHeight + padding
    );
    ctx.closePath();
    ctx.fill();

    // ==== CONVERSION LINE (PURPLE) ====
    ctx.beginPath();
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 3;

    conversionsData.forEach((value, i) => {
      const scaled = value * 20;
      const x = padding + stepX * i;
      const y = padding + chartHeight - (scaled / maxValue) * chartHeight;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // CLICK DOTS
    clicksData.forEach((value, i) => {
      const x = padding + stepX * i;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;

      ctx.beginPath();
      ctx.fillStyle = "#14b8a6";
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // CONVERSION DOTS
    conversionsData.forEach((value, i) => {
      const scaled = value * 20;
      const x = padding + stepX * i;
      const y = padding + chartHeight - (scaled / maxValue) * chartHeight;

      ctx.beginPath();
      ctx.fillStyle = "#8b5cf6";
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [timeRange]);

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-teal-500 rounded-full'></div>
            <span className='text-sm text-gray-600'>Clicks</span>
          </div>

          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-purple-500 rounded-full'></div>
            <span className='text-sm text-gray-600'>Conversions</span>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className='w-full h-[300px]'></canvas>
    </div>
  );
}
