"use client";

import { useState } from "react";
import MetricsCard from "./metricscard";
import ChartCard from "./chartcard";

// Types
type TimeRange = "7d" | "30d" | "90d";

type Metric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: "blue" | "green" | "purple" | "teal" | "orange";
};

type CommissionItem = {
  label: string;
  value: string;
  color: string;
  percentage: number;
};

type Campaign = {
  id: number;
  name: string;
  clicks: number;
  conversions: number;
  commission: string;
  status: "active" | "paused" | "completed";
  endDate: string;
};

type TopLink = {
  id: number;
  url: string;
  clicks: number;
  conversions: number;
  revenue: string;
};

export default function Overview() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const metrics: Metric[] = [
    {
      label: "Total Clicks",
      value: "12,458",
      change: "+12.5%",
      trend: "up",
      icon: "ri-cursor-line",
      color: "blue",
    },
    {
      label: "Conversions",
      value: "847",
      change: "+8.2%",
      trend: "up",
      icon: "ri-shopping-cart-line",
      color: "green",
    },
    {
      label: "Conversion Rate",
      value: "6.8%",
      change: "+0.5%",
      trend: "up",
      icon: "ri-percent-line",
      color: "purple",
    },
    {
      label: "Total Commissions",
      value: "$8,945",
      change: "+15.3%",
      trend: "up",
      icon: "ri-money-dollar-circle-line",
      color: "teal",
    },
  ];

  const commissionBreakdown: CommissionItem[] = [
    {
      label: "Pending",
      value: "$2,340",
      color: "bg-yellow-500",
      percentage: 26,
    },
    {
      label: "Approved",
      value: "$4,125",
      color: "bg-blue-500",
      percentage: 46,
    },
    { label: "Paid", value: "$2,480", color: "bg-green-500", percentage: 28 },
  ];

  const activeCampaigns: Campaign[] = [
    {
      id: 1,
      name: "Summer Sale 2024",
      clicks: 3245,
      conversions: 187,
      commission: "$1,245",
      status: "active",
      endDate: "2024-06-30",
    },
    {
      id: 2,
      name: "Tech Gadgets Promo",
      clicks: 2890,
      conversions: 156,
      commission: "$2,340",
      status: "active",
      endDate: "2024-07-15",
    },
    {
      id: 3,
      name: "Fashion Week Special",
      clicks: 1876,
      conversions: 98,
      commission: "$890",
      status: "active",
      endDate: "2024-06-25",
    },
  ];

  const topLinks: TopLink[] = [
    {
      id: 1,
      url: "summer-sale-2024",
      clicks: 1245,
      conversions: 89,
      revenue: "$1,245",
    },
    {
      id: 2,
      url: "tech-gadgets-promo",
      clicks: 987,
      conversions: 67,
      revenue: "$2,340",
    },
    {
      id: 3,
      url: "fashion-week-special",
      clicks: 756,
      conversions: 45,
      revenue: "$890",
    },
    {
      id: 4,
      url: "home-decor-deals",
      clicks: 654,
      conversions: 38,
      revenue: "$670",
    },
  ];

  return (
    <div className='space-y-6 animate-fadeIn'>
      {/* Top Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Dashboard Overview
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Track your affiliate performance and earnings
          </p>
        </div>

        {/* Time Range Selector */}
        <div className='flex items-center gap-2'>
          {["7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as TimeRange)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                timeRange === range
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {range === "7d"
                ? "7 Days"
                : range === "30d"
                  ? "30 Days"
                  : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {metrics.map((metric) => (
          <MetricsCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Chart + Commission Breakdown */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <ChartCard title='Performance Trends' timeRange={timeRange} />
        </div>

        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Commission Breakdown
          </h3>
          <div className='space-y-4'>
            {commissionBreakdown.map((item) => (
              <div key={item.label}>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-gray-700'>
                    {item.label}
                  </span>
                  <span className='text-sm font-semibold text-gray-900'>
                    {item.value}
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`${item.color} rounded-full h-2 transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 pt-6 border-t border-gray-200'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium text-gray-700'>
                Total Balance
              </span>
              <span className='text-xl font-bold text-gray-900'>$8,945</span>
            </div>
            <button className='w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium'>
              Request Payout
            </button>
          </div>
        </div>
      </div>

      {/* Active Campaigns + Top Links */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Active Campaigns */}
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Active Campaigns
            </h3>
            <button className='text-sm text-teal-600 hover:text-teal-700 font-medium'>
              View All
            </button>
          </div>
          <div className='space-y-3'>
            {activeCampaigns.map((c) => (
              <div
                key={c.id}
                className='p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition cursor-pointer'
              >
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-900 text-sm'>
                      {c.name}
                    </h4>
                    <p className='text-xs text-gray-500 mt-1'>
                      Ends: {c.endDate}
                    </p>
                  </div>
                  <span className='inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
                    {c.status === "active"
                      ? "Active"
                      : c.status === "paused"
                        ? "Paused"
                        : "Completed"}
                  </span>
                </div>
                <div className='grid grid-cols-3 gap-3 mt-3'>
                  <div>
                    <p className='text-xs text-gray-500'>Clicks</p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {c.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Conversions</p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {c.conversions}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Commission</p>
                    <p className='text-sm font-semibold text-teal-600'>
                      {c.commission}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Links */}
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Top Performing Links
            </h3>
            <button className='text-sm text-teal-600 hover:text-teal-700 font-medium'>
              View All
            </button>
          </div>
          <div className='space-y-3'>
            {topLinks.map((link, index) => (
              <div
                key={link.id}
                className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition cursor-pointer'
              >
                <div className='flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-lg font-semibold text-sm'>
                  #{index + 1}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>
                    {link.url}
                  </p>
                  <div className='flex items-center gap-3 mt-1'>
                    <span className='text-xs text-gray-500'>
                      {link.clicks} clicks
                    </span>
                    <span className='text-xs text-gray-500'>
                      {link.conversions} conversions
                    </span>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-semibold text-teal-600'>
                    {link.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
