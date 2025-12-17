"use client";

import { useState, useEffect } from "react";
import MetricCard, { MetricCardProps } from "./MetricCard";
import LiveActivityFeed from "./LiveActivityFeed";
import RevenueChart from "./RevenueChart";

type Metrics = {
  totalTraffic: number;
  totalClicks: number;
  conversions: number;
  revenue: number;
  activeSessions: number;
  payouts: number;
};

export default function Overview() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalTraffic: 145823,
    totalClicks: 89456,
    conversions: 12847,
    revenue: 284950,
    activeSessions: 1247,
    payouts: 156780,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalTraffic: prev.totalTraffic + Math.floor(Math.random() * 10),
        totalClicks: prev.totalClicks + Math.floor(Math.random() * 5),
        activeSessions: Math.max(
          1000,
          prev.activeSessions + Math.floor(Math.random() * 20) - 10
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // FIXED: Type annotation added
  const metricCards: MetricCardProps[] = [
    {
      label: "Total Traffic",
      value: metrics.totalTraffic.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: "ri-eye-line",
      color: "teal",
    },
    {
      label: "Total Clicks",
      value: metrics.totalClicks.toLocaleString(),
      change: "+8.3%",
      trend: "up",
      icon: "ri-cursor-line",
      color: "blue",
    },
    {
      label: "Conversions",
      value: metrics.conversions.toLocaleString(),
      change: "+15.7%",
      trend: "up",
      icon: "ri-check-double-line",
      color: "green",
    },
    {
      label: "Revenue",
      value: `$${metrics.revenue.toLocaleString()}`,
      change: "+22.1%",
      trend: "up",
      icon: "ri-money-dollar-circle-line",
      color: "emerald",
    },
    {
      label: "Active Sessions",
      value: metrics.activeSessions.toLocaleString(),
      change: "Live",
      trend: "neutral",
      icon: "ri-user-line",
      color: "orange",
    },
    {
      label: "Total Payouts",
      value: `$${metrics.payouts.toLocaleString()}`,
      change: "+5.2%",
      trend: "up",
      icon: "ri-wallet-3-line",
      color: "pink",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Overview & Real-Time Metrics
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Monitor your platform&apos;s performance in real-time
          </p>
        </div>

        <div className='flex items-center gap-2 text-sm'>
          <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
          <span className='text-gray-600'>Live Updates Active</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {metricCards.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <RevenueChart />
        </div>
        <div className='lg:col-span-1'>
          <LiveActivityFeed />
        </div>
      </div>

      {/* More content... */}
    </div>
  );
}
