"use client";

import { ISeller } from "@/app/hooks/useSeller";

interface AnalyticsProps {
  seller: ISeller;
}

export default function Analytics({ seller }: AnalyticsProps) {
  const metrics = [
    {
      label: "Total Views",
      value: seller.views.toLocaleString(),
      change: "+15.3%",
      icon: "ri-eye-line",
      trend: "up",
      color: "from-orange-500 to-amber-500",
    },
    {
      label: "Total Clicks",
      value: seller.clicks.toLocaleString(),
      change: "+8.7%",
      icon: "ri-cursor-line",
      trend: "up",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Conversions",
      value: seller.conversions.toLocaleString(),
      change: "+23.1%",
      icon: "ri-shopping-cart-line",
      trend: "up",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Conversion Rate",
      value: `${seller.conversionRate.toFixed(1)}%`,
      change: "+2.4%",
      icon: "ri-percent-line",
      trend: "up",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const trafficSources = [
    {
      source: "Direct",
      visits: 12450,
      percentage: 35,
      color: "from-orange-500 to-amber-500",
    },
    {
      source: "Social Media",
      visits: 8920,
      percentage: 25,
      color: "from-blue-500 to-cyan-500",
    },
    {
      source: "Search Engines",
      visits: 7136,
      percentage: 20,
      color: "from-green-500 to-emerald-500",
    },
    {
      source: "Referrals",
      visits: 5352,
      percentage: 15,
      color: "from-purple-500 to-pink-500",
    },
    {
      source: "Email",
      visits: 1784,
      percentage: 5,
      color: "from-red-500 to-rose-500",
    },
  ];

  const topAffiliates = [
    {
      name: "Sarah Johnson",
      sales: 342,
      commission: "$3,420",
      conversion: "12.5%",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      sales: 289,
      commission: "$2,890",
      conversion: "10.8%",
      avatar: "MC",
    },
    {
      name: "Emma Wilson",
      sales: 234,
      commission: "$2,340",
      conversion: "9.2%",
      avatar: "EW",
    },
    {
      name: "David Brown",
      sales: 198,
      commission: "$1,980",
      conversion: "8.5%",
      avatar: "DB",
    },
    {
      name: "Lisa Anderson",
      sales: 176,
      commission: "$1,760",
      conversion: "7.9%",
      avatar: "LA",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-bold text-gray-800'>Analytics</h2>
        <p className='text-sm text-gray-600 mt-1'>
          Track your performance metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <p className='text-sm text-gray-600 mb-1'>{metric.label}</p>
                <h3 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                  {metric.value}
                </h3>
                <div className='flex items-center gap-1'>
                  <i
                    className={`${
                      metric.trend === "up"
                        ? "ri-arrow-up-line text-green-600"
                        : "ri-arrow-down-line text-red-600"
                    } text-sm`}
                  ></i>
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-lg bg-linear-to-br ${metric.color} flex items-center justify-center text-white`}
              >
                <i className={`${metric.icon} text-2xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Performance Chart */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-lg font-bold text-gray-800'>
              Performance Trend
            </h3>
            <select className='px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500'>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className='h-64 flex items-end justify-between gap-2'>
            {[45, 68, 52, 78, 65, 88, 72, 95, 82, 70, 85, 92].map(
              (height, index) => (
                <div
                  key={index}
                  className='flex-1 flex flex-col items-center gap-2'
                >
                  <div
                    className='w-full bg-linear-to-t from-orange-500 to-amber-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer'
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              )
            )}
          </div>
          <div className='mt-4 flex items-center justify-center gap-6'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-linear-to-r from-orange-500 to-amber-500'></div>
              <span className='text-xs text-gray-600'>Sales</span>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
          <h3 className='text-lg font-bold text-gray-800 mb-6'>
            Traffic Sources
          </h3>
          <div className='space-y-4'>
            {trafficSources.map((source, index) => (
              <div key={index}>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-gray-700'>
                    {source.source}
                  </span>
                  <span className='text-sm font-semibold text-gray-800'>
                    {source.visits.toLocaleString()}
                  </span>
                </div>
                <div className='relative h-2 bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className={`absolute inset-y-0 left-0 bg-linear-to-r ${source.color} rounded-full transition-all`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <div className='mt-1 text-xs text-gray-600'>
                  {source.percentage}% of total traffic
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Affiliates */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200'>
          <h3 className='text-lg font-bold text-gray-800'>
            Top Performing Affiliates
          </h3>
        </div>

        {/* Mobile View */}
        <div className='lg:hidden divide-y divide-gray-200'>
          {topAffiliates.map((affiliate, index) => (
            <div key={index} className='p-4'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-12 h-12 rounded-full bg-linear-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold'>
                  {affiliate.avatar}
                </div>
                <div className='flex-1'>
                  <p className='font-semibold text-gray-800'>
                    {affiliate.name}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {affiliate.sales} sales
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='text-gray-600'>Commission:</span>
                  <p className='font-semibold text-gray-800'>
                    {affiliate.commission}
                  </p>
                </div>
                <div>
                  <span className='text-gray-600'>Conversion:</span>
                  <p className='font-semibold text-gray-800'>
                    {affiliate.conversion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className='hidden lg:block overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Affiliate
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Sales
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Commission
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Conversion Rate
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {topAffiliates.map((affiliate, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-linear-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold'>
                        {affiliate.avatar}
                      </div>
                      <span className='text-sm font-medium text-gray-800'>
                        {affiliate.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {affiliate.sales}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800'>
                    {affiliate.commission}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {affiliate.conversion}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button className='px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all whitespace-nowrap cursor-pointer'>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
