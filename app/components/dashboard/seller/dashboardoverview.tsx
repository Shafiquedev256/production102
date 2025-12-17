import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 124567.89,
    totalClicks: 45678,
    conversions: 1234,
    activeAffiliates: 156,
    commissionsOwed: 12456.78,
    commissionsPaid: 98765.43,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalClicks: prev.totalClicks + Math.floor(Math.random() * 5),
        conversions: prev.conversions + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Map color names to Tailwind classes (static)
  const colorMap: Record<string, { bg: string; text: string }> = {
    teal: { bg: "bg-teal-50", text: "text-teal-600" },
    blue: { bg: "bg-blue-50", text: "text-blue-600" },
    green: { bg: "bg-green-50", text: "text-green-600" },
    orange: { bg: "bg-orange-50", text: "text-orange-600" },
    red: { bg: "bg-red-50", text: "text-red-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600" },
  };

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: "ri-money-dollar-circle-fill",
      color: "teal",
    },
    {
      label: "Total Clicks",
      value: metrics.totalClicks.toLocaleString(),
      change: "+8.3%",
      trend: "up",
      icon: "ri-cursor-fill",
      color: "blue",
    },
    {
      label: "Conversions",
      value: metrics.conversions.toLocaleString(),
      change: "+15.2%",
      trend: "up",
      icon: "ri-shopping-cart-fill",
      color: "green",
    },
    {
      label: "Active Affiliates",
      value: metrics.activeAffiliates.toString(),
      change: "+5.7%",
      trend: "up",
      icon: "ri-team-fill",
      color: "orange",
    },
    {
      label: "Commissions Owed",
      value: `$${metrics.commissionsOwed.toLocaleString()}`,
      change: "+3.2%",
      trend: "up",
      icon: "ri-wallet-fill",
      color: "red",
    },
    {
      label: "Commissions Paid",
      value: `$${metrics.commissionsPaid.toLocaleString()}`,
      change: "+18.9%",
      trend: "up",
      icon: "ri-check-double-fill",
      color: "purple",
    },
  ];

  const recentActivity = [
    {
      type: "conversion",
      affiliate: "Sarah Johnson",
      product: "Premium Plan",
      amount: 299.99,
      time: "2 min ago",
    },
    {
      type: "signup",
      affiliate: "Mike Chen",
      product: "New Affiliate",
      amount: 0,
      time: "15 min ago",
    },
    {
      type: "conversion",
      affiliate: "Emma Wilson",
      product: "Starter Pack",
      amount: 149.99,
      time: "23 min ago",
    },
    {
      type: "payout",
      affiliate: "David Brown",
      product: "Commission Payment",
      amount: 1250.0,
      time: "1 hour ago",
    },
    {
      type: "conversion",
      affiliate: "Lisa Anderson",
      product: "Enterprise Plan",
      amount: 999.99,
      time: "2 hours ago",
    },
  ];

  const topAffiliates = [
    {
      name: "Sarah Johnson",
      revenue: 15678.9,
      conversions: 89,
      commission: 3135.78,
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      revenue: 12456.5,
      conversions: 67,
      commission: 2491.3,
      avatar: "MC",
    },
    {
      name: "Emma Wilson",
      revenue: 10234.8,
      conversions: 54,
      commission: 2046.96,
      avatar: "EW",
    },
    {
      name: "David Brown",
      revenue: 9876.4,
      conversions: 48,
      commission: 1975.28,
      avatar: "DB",
    },
    {
      name: "Lisa Anderson",
      revenue: 8765.2,
      conversions: 42,
      commission: 1753.04,
      avatar: "LA",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>Dashboard Overview</h2>
        <p className='text-sm text-gray-600 mt-1'>
          Real-time performance metrics and insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {statCards.map((stat, index) => (
          <div
            key={index}
            className='bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <p className='text-sm text-gray-600 mb-1'>{stat.label}</p>
                <p className='text-2xl font-bold text-gray-900 mb-2'>
                  {stat.value}
                </p>
                <div className='flex items-center gap-1'>
                  <i
                    className={`ri-arrow-${stat.trend === "up" ? "up" : "down"}-line text-sm`}
                  ></i>
                  <span
                    className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                  <span className='text-xs text-gray-500 ml-1'>
                    vs last month
                  </span>
                </div>
              </div>
              <div
                className={`${colorMap[stat.color].bg} w-12 h-12 rounded-lg flex items-center justify-center`}
              >
                <i
                  className={`${stat.icon} ${colorMap[stat.color].text} text-xl`}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Activity Feed */}
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-bold text-gray-900'>Recent Activity</h3>
            <button className='text-sm text-teal-600 hover:text-teal-700 font-medium'>
              View All
            </button>
          </div>
          <div className='space-y-4'>
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className='flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0'
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === "conversion"
                      ? "bg-green-50"
                      : activity.type === "signup"
                        ? "bg-blue-50"
                        : "bg-purple-50"
                  }`}
                >
                  <i
                    className={`${
                      activity.type === "conversion"
                        ? "ri-shopping-cart-line text-green-600"
                        : activity.type === "signup"
                          ? "ri-user-add-line text-blue-600"
                          : "ri-money-dollar-circle-line text-purple-600"
                    } text-lg`}
                  ></i>
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {activity.affiliate}
                  </p>
                  <p className='text-xs text-gray-600'>{activity.product}</p>
                  <p className='text-xs text-gray-500 mt-1'>{activity.time}</p>
                </div>
                {activity.amount > 0 && (
                  <p className='text-sm font-bold text-gray-900'>
                    ${activity.amount.toFixed(2)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Affiliates Leaderboard */}
        <div className='bg-white rounded-xl border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-bold text-gray-900'>Top Affiliates</h3>
            <button className='text-sm text-teal-600 hover:text-teal-700 font-medium'>
              View All
            </button>
          </div>
          <div className='space-y-4'>
            {topAffiliates.map((affiliate, index) => (
              <div
                key={index}
                className='flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0'
              >
                <span className='text-sm font-bold text-gray-400 w-4'>
                  {index + 1}
                </span>
                <div className='w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-xs'>
                  {affiliate.avatar}
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {affiliate.name}
                  </p>
                  <p className='text-xs text-gray-600'>
                    {affiliate.conversions} conversions
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-bold text-gray-900'>
                    ${affiliate.revenue.toLocaleString()}
                  </p>
                  <p className='text-xs text-gray-600'>
                    ${affiliate.commission.toFixed(2)} comm.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>Quick Actions</h3>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
          <Link
            href={"/seller/upload"}
            className='flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all'
          >
            <i className='ri-add-circle-line text-2xl text-teal-600'></i>
            <span className='text-sm font-medium text-gray-900'>
              Add Product
            </span>
          </Link>

          <button className='flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all'>
            <i className='ri-user-add-line text-2xl text-teal-600'></i>
            <span className='text-sm font-medium text-gray-900'>
              Invite Affiliate
            </span>
          </button>
          <button className='flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all'>
            <i className='ri-file-chart-line text-2xl text-teal-600'></i>
            <span className='text-sm font-medium text-gray-900'>
              View Reports
            </span>
          </button>
          <button className='flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all'>
            <i className='ri-money-dollar-circle-line text-2xl text-teal-600'></i>
            <span className='text-sm font-medium text-gray-900'>
              Process Payouts
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
