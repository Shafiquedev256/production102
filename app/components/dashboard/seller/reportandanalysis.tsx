import { useState } from "react";

interface RevenueData {
  month: string;
  revenue: number;
  conversions: number;
}

interface TopProduct {
  name: string;
  revenue: number;
  conversions: number;
  rate: number;
}

interface GeoData {
  country: string;
  revenue: number;
  percentage: number;
}

interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("7days");

  const revenueData: RevenueData[] = [
    { month: "Jan", revenue: 45000, conversions: 234 },
    { month: "Feb", revenue: 52000, conversions: 289 },
    { month: "Mar", revenue: 48000, conversions: 256 },
    { month: "Apr", revenue: 61000, conversions: 312 },
    { month: "May", revenue: 55000, conversions: 298 },
    { month: "Jun", revenue: 67000, conversions: 345 },
  ];

  const topProducts: TopProduct[] = [
    { name: "Premium Plan", revenue: 89456, conversions: 298, rate: 4.2 },
    { name: "Enterprise Plan", revenue: 76543, conversions: 76, rate: 3.8 },
    { name: "Starter Pack", revenue: 65432, conversions: 436, rate: 5.1 },
    { name: "Basic Plan", revenue: 43210, conversions: 540, rate: 6.2 },
  ];

  const geoData: GeoData[] = [
    { country: "United States", revenue: 125678, percentage: 35 },
    { country: "United Kingdom", revenue: 89456, percentage: 25 },
    { country: "Canada", revenue: 67890, percentage: 19 },
    { country: "Australia", revenue: 45678, percentage: 13 },
    { country: "Germany", revenue: 28901, percentage: 8 },
  ];

  const funnelStages: FunnelStage[] = [
    { stage: "Clicks", count: 45678, percentage: 100 },
    { stage: "Landing Page Views", count: 38456, percentage: 84 },
    { stage: "Add to Cart", count: 12345, percentage: 27 },
    { stage: "Checkout Started", count: 5678, percentage: 12 },
    { stage: "Completed Purchase", count: 1234, percentage: 3 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Reports & Analytics
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Comprehensive performance insights
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent'
          >
            <option value='7days'>Last 7 Days</option>
            <option value='30days'>Last 30 Days</option>
            <option value='90days'>Last 90 Days</option>
            <option value='year'>This Year</option>
          </select>
          <button className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm whitespace-nowrap'>
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>Revenue Trend</h3>
        <div className='h-64 flex items-end justify-between gap-2'>
          {revenueData.map((data, index) => {
            const height = (data.revenue / maxRevenue) * 100;
            return (
              <div
                key={index}
                className='flex-1 flex flex-col items-center gap-2'
              >
                <div className='w-full flex flex-col items-center'>
                  <span className='text-xs font-semibold text-gray-900 mb-1'>
                    ${(data.revenue / 1000).toFixed(0)}k
                  </span>
                  <div
                    className='w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg hover:from-teal-600 hover:to-teal-500 transition-all cursor-pointer'
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className='text-xs font-medium text-gray-600'>
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top Products */}
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Top Performing Products
          </h3>
          <div className='space-y-4'>
            {topProducts.map((product, index) => (
              <div
                key={index}
                className='pb-4 border-b border-gray-100 last:border-0 last:pb-0'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-semibold text-gray-900'>
                    {product.name}
                  </span>
                  <span className='text-sm font-bold text-gray-900'>
                    ${product.revenue.toLocaleString()}
                  </span>
                </div>
                <div className='flex items-center gap-4 text-xs text-gray-600'>
                  <span>{product.conversions} conversions</span>
                  <span className='text-teal-600 font-semibold'>
                    {product.rate}% rate
                  </span>
                </div>
                <div className='mt-2 h-2 bg-gray-100 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full'
                    style={{
                      width: `${(product.revenue / topProducts[0].revenue) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <h3 className='text-lg font-bold text-gray-900 mb-4'>
            Geographic Distribution
          </h3>
          <div className='space-y-4'>
            {geoData.map((geo, index) => (
              <div
                key={index}
                className='pb-4 border-b border-gray-100 last:border-0 last:pb-0'
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-semibold text-gray-900'>
                    {geo.country}
                  </span>
                  <span className='text-sm font-bold text-gray-900'>
                    ${geo.revenue.toLocaleString()}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex-1 h-2 bg-gray-100 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full'
                      style={{ width: `${geo.percentage}%` }}
                    ></div>
                  </div>
                  <span className='text-xs font-semibold text-gray-600 w-10 text-right'>
                    {geo.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>
          Conversion Funnel
        </h3>
        <div className='space-y-3'>
          {funnelStages.map((stage, index) => (
            <div key={index}>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-sm font-semibold text-gray-900'>
                  {stage.stage}
                </span>
                <span className='text-sm text-gray-600'>
                  {stage.count.toLocaleString()} ({stage.percentage}%)
                </span>
              </div>
              <div className='h-3 bg-gray-100 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all'
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
