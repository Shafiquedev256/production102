"use client";

import { useState } from "react";

export default function RevenueChart() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">(
    "7d"
  );

  const data: { day: string; revenue: number; clicks: number }[] = [
    { day: "Mon", revenue: 12500, clicks: 3200 },
    { day: "Tue", revenue: 15800, clicks: 4100 },
    { day: "Wed", revenue: 18200, clicks: 4800 },
    { day: "Thu", revenue: 14600, clicks: 3900 },
    { day: "Fri", revenue: 21400, clicks: 5600 },
    { day: "Sat", revenue: 19800, clicks: 5200 },
    { day: "Sun", revenue: 16900, clicks: 4400 },
  ];

  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className='bg-white rounded-lg border border-gray-200'>
      {/* Header with Time Range Selector */}
      <div className='px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h3 className='text-base font-semibold text-gray-900'>
            Revenue & Performance
          </h3>
          <p className='text-sm text-gray-500 mt-1'>
            Track your earnings and click performance
          </p>
        </div>

        <div className='flex items-center gap-2'>
          {(["24h", "7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                timeRange === range
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className='p-5'>
        <div className='flex items-end justify-between gap-2 h-64'>
          {data.map((item, index) => (
            <div
              key={index}
              className='flex-1 flex flex-col items-center gap-2'
            >
              {/* Revenue Bar */}
              <div className='w-full flex flex-col gap-1'>
                <div
                  className='w-full bg-teal-500 rounded-t-lg transition-all hover:bg-teal-600 cursor-pointer relative group'
                  style={{
                    height: `${(item.revenue / maxRevenue) * 200}px`,
                  }}
                >
                  {/* Tooltip */}
                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Day Label */}
              <span className='text-xs text-gray-600 font-medium'>
                {item.day}
              </span>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className='grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200'>
          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wide'>
              Total Revenue
            </p>
            <p className='text-2xl font-bold text-gray-900 mt-1'>$119,200</p>
            <p className='text-sm text-green-600 mt-1'>
              <i className='ri-arrow-up-line' /> +18.2% vs last period
            </p>
          </div>

          <div>
            <p className='text-xs text-gray-500 uppercase tracking-wide'>
              Total Clicks
            </p>
            <p className='text-2xl font-bold text-gray-900 mt-1'>31,200</p>
            <p className='text-sm text-green-600 mt-1'>
              <i className='ri-arrow-up-line' /> +12.5% vs last period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
