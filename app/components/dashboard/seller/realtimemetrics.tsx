import { useState, useEffect } from "react";

export default function RealTimeMetrics() {
  const [liveData, setLiveData] = useState({
    currentVisitors: 234,
    clicksPerMinute: 12,
    conversionsToday: 45,
    revenueToday: 6789.5,
    activeAffiliates: 89,
    avgConversionRate: 3.2,
  });

  const [recentClicks, setRecentClicks] = useState([
    {
      id: 1,
      affiliate: "Sarah J.",
      product: "Premium Plan",
      location: "New York, US",
      time: "Just now",
    },
    {
      id: 2,
      affiliate: "Mike C.",
      product: "Starter Pack",
      location: "London, UK",
      time: "5s ago",
    },
    {
      id: 3,
      affiliate: "Emma W.",
      product: "Enterprise",
      location: "Sydney, AU",
      time: "12s ago",
    },
    {
      id: 4,
      affiliate: "David B.",
      product: "Premium Plan",
      location: "Toronto, CA",
      time: "18s ago",
    },
    {
      id: 5,
      affiliate: "Lisa A.",
      product: "Starter Pack",
      location: "Berlin, DE",
      time: "25s ago",
    },
  ]);

  // Map color names to Tailwind-safe classes
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    teal: { bg: "bg-teal-50", text: "text-teal-600" },
    green: { bg: "bg-green-50", text: "text-green-600" },
    orange: { bg: "bg-orange-50", text: "text-orange-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600" },
    red: { bg: "bg-red-50", text: "text-red-600" },
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        ...prev,
        currentVisitors:
          prev.currentVisitors + Math.floor(Math.random() * 11 - 5), // -5 to +5
        clicksPerMinute: Math.max(
          5,
          prev.clicksPerMinute + Math.floor(Math.random() * 7 - 3)
        ), // -3 to +3
        conversionsToday: prev.conversionsToday + (Math.random() > 0.8 ? 1 : 0),
        revenueToday:
          prev.revenueToday + (Math.random() > 0.8 ? Math.random() * 200 : 0),
      }));

      // Add new click to stream
      if (Math.random() > 0.6) {
        const affiliates = [
          "Sarah J.",
          "Mike C.",
          "Emma W.",
          "David B.",
          "Lisa A.",
          "Tom R.",
          "Anna K.",
        ];
        const products = [
          "Premium Plan",
          "Starter Pack",
          "Enterprise",
          "Basic Plan",
        ];
        const locations = [
          "New York, US",
          "London, UK",
          "Sydney, AU",
          "Toronto, CA",
          "Berlin, DE",
          "Tokyo, JP",
        ];

        setRecentClicks((prev) => [
          {
            id: Date.now(),
            affiliate:
              affiliates[Math.floor(Math.random() * affiliates.length)],
            product: products[Math.floor(Math.random() * products.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            time: "Just now",
          },
          ...prev.slice(0, 9), // Keep only 10 most recent
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const liveMetrics = [
    {
      label: "Current Visitors",
      value: liveData.currentVisitors,
      icon: "ri-user-line",
      color: "blue",
      pulse: true,
    },
    {
      label: "Clicks/Minute",
      value: liveData.clicksPerMinute,
      icon: "ri-cursor-line",
      color: "teal",
      pulse: true,
    },
    {
      label: "Conversions Today",
      value: liveData.conversionsToday,
      icon: "ri-shopping-cart-line",
      color: "green",
      pulse: false,
    },
    {
      label: "Revenue Today",
      value: `$${liveData.revenueToday.toFixed(2)}`,
      icon: "ri-money-dollar-circle-line",
      color: "orange",
      pulse: false,
    },
    {
      label: "Active Affiliates",
      value: liveData.activeAffiliates,
      icon: "ri-team-line",
      color: "purple",
      pulse: false,
    },
    {
      label: "Avg Conversion Rate",
      value: `${liveData.avgConversionRate}%`,
      icon: "ri-percent-line",
      color: "red",
      pulse: false,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header with Live Indicator */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Real-Time Metrics
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Live platform performance data
          </p>
        </div>
        <div className='flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg'>
          <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
          </span>
          <span className='text-sm font-medium text-green-700'>
            Live Updates
          </span>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {liveMetrics.map((metric, index) => (
          <div
            key={index}
            className='bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden'
          >
            {metric.pulse && (
              <div className='absolute top-3 right-3'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-teal-500'></span>
                </span>
              </div>
            )}
            <div className='flex items-start gap-4'>
              <div
                className={`${colorMap[metric.color].bg} w-12 h-12 rounded-lg flex items-center justify-center`}
              >
                <i
                  className={`${metric.icon} ${colorMap[metric.color].text} text-xl`}
                ></i>
              </div>
              <div className='flex-1'>
                <p className='text-sm text-gray-600 mb-1'>{metric.label}</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {metric.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Click Stream Table */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-bold text-gray-900'>Live Click Stream</h3>
          <div className='flex items-center gap-2'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-teal-500'></span>
            </span>
            <span className='text-xs text-gray-600'>Updating live</span>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-200'>
                <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                  Affiliate
                </th>
                <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                  Product
                </th>
                <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                  Location
                </th>
                <th className='text-right text-xs font-semibold text-gray-600 pb-3'>
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {recentClicks.map((click) => (
                <tr
                  key={click.id}
                  className='border-b border-gray-100 hover:bg-gray-50 transition-colors'
                >
                  <td className='py-3 text-sm font-medium text-gray-900'>
                    {click.affiliate}
                  </td>
                  <td className='py-3 text-sm text-gray-600'>
                    {click.product}
                  </td>
                  <td className='py-3 text-sm text-gray-600'>
                    {click.location}
                  </td>
                  <td className='py-3 text-sm text-gray-500 text-right'>
                    {click.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fraud Detection Alerts */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-bold text-gray-900'>Fraud Detection</h3>
          <span className='px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full'>
            All Clear
          </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-700'>
                Suspicious Clicks
              </span>
              <i className='ri-shield-check-line text-lg text-green-600'></i>
            </div>
            <p className='text-2xl font-bold text-gray-900'>0</p>
            <p className='text-xs text-gray-600 mt-1'>Last 24 hours</p>
          </div>
          <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-700'>
                Duplicate IPs
              </span>
              <i className='ri-shield-check-line text-lg text-green-600'></i>
            </div>
            <p className='text-2xl font-bold text-gray-900'>2</p>
            <p className='text-xs text-gray-600 mt-1'>Within threshold</p>
          </div>
          <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-gray-700'>
                Bot Traffic
              </span>
              <i className='ri-shield-check-line text-lg text-green-600'></i>
            </div>
            <p className='text-2xl font-bold text-gray-900'>0.3%</p>
            <p className='text-xs text-gray-600 mt-1'>Normal range</p>
          </div>
        </div>
      </div>
    </div>
  );
}
