"use client";

import { useState, useEffect } from "react";

// Types
type ActivityType = "click" | "conversion" | "high-value";

type Activity = {
  id: number;
  type: ActivityType;
  user: string;
  link?: string;
  product?: string;
  time: string;
  value?: string | null;
};

type Stats = {
  clicksToday: number;
  conversionsToday: number;
  revenueToday: number;
  activeVisitors: number;
};

type TrendingProduct = {
  id: number;
  name: string;
  clicks: number;
  conversions: number;
  trend: string;
};

export default function RealTimeActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, type: "click", user: "User from New York", link: "summer-sale-2024", time: "Just now" },
    { id: 2, type: "conversion", user: "User from London", product: "Wireless Headphones", time: "2 min ago", value: "$89.99" },
    { id: 3, type: "click", user: "User from Tokyo", link: "tech-gadgets-promo", time: "3 min ago" },
    { id: 4, type: "high-value", user: "User from Paris", product: "Premium Laptop", time: "5 min ago", value: "$1,299.00" },
    { id: 5, type: "conversion", user: "User from Sydney", product: "Smart Watch", time: "7 min ago", value: "$249.99" },
  ]);

  const [stats, setStats] = useState<Stats>({
    clicksToday: 3456,
    conversionsToday: 234,
    revenueToday: 12450,
    activeVisitors: 127,
  });

  // Auto-update activity feed every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: Math.random() > 0.6 ? "conversion" : "click",
        user: `User from ${["New York", "London", "Tokyo", "Paris", "Sydney", "Berlin", "Toronto"][Math.floor(Math.random() * 7)]}`,
        link: ["summer-sale-2024", "tech-gadgets-promo", "fashion-week-special"][Math.floor(Math.random() * 3)],
        product: ["Wireless Headphones", "Smart Watch", "Premium Laptop", "Designer Bag"][Math.floor(Math.random() * 4)],
        time: "Just now",
        value: Math.random() > 0.6 ? `$${(Math.random() * 500 + 50).toFixed(2)}` : null,
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);

      setStats(prev => ({
        clicksToday: prev.clicksToday + (newActivity.type === "click" ? 1 : 0),
        conversionsToday: prev.conversionsToday + (newActivity.type === "conversion" ? 1 : 0),
        revenueToday: prev.revenueToday + (newActivity.value ? parseFloat(newActivity.value.replace("$", "")) : 0),
        activeVisitors: Math.max(50, prev.activeVisitors + Math.floor(Math.random() * 5 - 2)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const trendingProducts: TrendingProduct[] = [
    { id: 1, name: "Wireless Headphones Pro", clicks: 456, conversions: 34, trend: "+23%" },
    { id: 2, name: "Smart Watch Series 5", clicks: 389, conversions: 28, trend: "+18%" },
    { id: 3, name: "Premium Laptop Ultra", clicks: 312, conversions: 21, trend: "+15%" },
    { id: 4, name: "Designer Handbag Collection", clicks: 278, conversions: 19, trend: "+12%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Real-time Activity</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor live clicks, conversions, and trending products</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Clicks */}
        <StatCard label="Clicks Today" value={stats.clicksToday.toLocaleString()} icon="ri-cursor-line" color="blue" />
        {/* Conversions */}
        <StatCard label="Conversions Today" value={stats.conversionsToday.toLocaleString()} icon="ri-shopping-cart-line" color="green" />
        {/* Revenue */}
        <StatCard label="Revenue Today" value={`$${stats.revenueToday.toLocaleString()}`} icon="ri-money-dollar-circle-line" color="teal" />
        {/* Active Visitors */}
        <StatCard label="Active Visitors" value={stats.activeVisitors.toLocaleString()} icon="ri-user-line" color="purple" />
      </div>

      {/* Activity Feed + Trending Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap cursor-pointer">
              Pause Updates
            </button>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-all animate-fadeIn">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                  activity.type === "click" ? "bg-blue-100 text-blue-600" :
                  activity.type === "high-value" ? "bg-orange-100 text-orange-600" :
                  "bg-green-100 text-green-600"
                }`}>
                  <i className={`${
                    activity.type === "click" ? "ri-cursor-line" :
                    activity.type === "high-value" ? "ri-vip-crown-line" :
                    "ri-shopping-cart-line"
                  } text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === "click" ? "New Click" : activity.type === "high-value" ? "High-Value Sale" : "New Conversion"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.user} {activity.type === "click" ? `clicked on ${activity.link}` : `purchased ${activity.product}`}
                      </p>
                    </div>
                    {activity.value && <span className="text-sm font-semibold text-teal-600 whitespace-nowrap">{activity.value}</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Trending Products</h3>
            <i className="ri-fire-line text-xl text-orange-500"></i>
          </div>
          <div className="space-y-3">
            {trendingProducts.map((product, index) => (
              <div key={product.id} className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-lg font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{product.clicks} clicks</span>
                      <span>{product.conversions} conversions</span>
                      <span className="text-green-600">{product.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for stats cards
type StatCardProps = { label: string; value: string; icon: string; color: string };
const StatCard = ({ label, value, icon, color }: StatCardProps) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color === "blue" ? "bg-blue-100 text-blue-600" :
        color === "green" ? "bg-green-100 text-green-600" :
        color === "teal" ? "bg-teal-100 text-teal-600" :
        "bg-purple-100 text-purple-600"}`}>
        <i className={`${icon} text-xl`}></i>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-1">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-xs text-gray-500">Live tracking</span>
    </div>
  </div>
);
