"use client";

import { ISeller } from "@/app/hooks/useSeller"; // Correct absolute path
import Image from "next/image";

interface OverviewProps {
  seller: ISeller;
}

export default function Overview({ seller }: OverviewProps) {
  const stats = [
    {
      label: "Total Earnings",
      value: `${seller.currency} ${seller.totalEarnings.toLocaleString()}`,
      change: "+12.5%",
      icon: "ri-money-dollar-circle-line",
      trend: "up",
    },
    {
      label: "Total Products",
      value: seller.totalProducts.toString(),
      change: "+8",
      icon: "ri-shopping-bag-line",
      trend: "up",
    },
    {
      label: "Total Orders",
      value: seller.totalOrders.toLocaleString(),
      change: "+23.1%",
      icon: "ri-shopping-cart-line",
      trend: "up",
    },
    {
      label: "Pending Payout",
      value: `${seller.currency} ${seller.pendingPayout.toLocaleString()}`,
      change: "-5.2%",
      icon: "ri-wallet-line",
      trend: "down",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-2341",
      product: "Premium Headphones",
      customer: "Sarah Johnson",
      amount: "$299",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "#ORD-2340",
      product: "Wireless Mouse",
      customer: "Mike Chen",
      amount: "$49",
      status: "Processing",
      date: "2024-01-15",
    },
    {
      id: "#ORD-2339",
      product: "Laptop Stand",
      customer: "Emma Wilson",
      amount: "$79",
      status: "Completed",
      date: "2024-01-14",
    },
    {
      id: "#ORD-2338",
      product: "USB-C Hub",
      customer: "David Brown",
      amount: "$89",
      status: "Shipped",
      date: "2024-01-14",
    },
    {
      id: "#ORD-2337",
      product: "Keyboard",
      customer: "Lisa Anderson",
      amount: "$159",
      status: "Completed",
      date: "2024-01-13",
    },
  ];

  const topProducts = [
    {
      name: "Premium Headphones",
      sales: 342,
      revenue: "$102,258",
      image:
        "https://readdy.ai/api/search-image?query=modern premium wireless headphones with sleek black design on clean white background professional product photography studio lighting&width=80&height=80&seq=prod1&orientation=squarish",
    },
    {
      name: "Wireless Mouse",
      sales: 289,
      revenue: "$14,156",
      image:
        "https://readdy.ai/api/search-image?query=ergonomic wireless computer mouse in white color on minimal white background professional product shot clean studio lighting&width=80&height=80&seq=prod2&orientation=squarish",
    },
    {
      name: "Laptop Stand",
      sales: 234,
      revenue: "$18,486",
      image:
        "https://readdy.ai/api/search-image?query=aluminum laptop stand with modern design on white background professional product photography minimalist style&width=80&height=80&seq=prod3&orientation=squarish",
    },
    {
      name: "USB-C Hub",
      sales: 198,
      revenue: "$17,622",
      image:
        "https://readdy.ai/api/search-image?query=compact usb-c hub adapter with multiple ports on clean white background professional product photography studio lighting&width=80&height=80&seq=prod4&orientation=squarish",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <p className='text-sm text-gray-600 mb-1'>{stat.label}</p>
                <h3 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                  {stat.value}
                </h3>
                <div className='flex items-center gap-1'>
                  <i
                    className={`${stat.trend === "up" ? "ri-arrow-up-line text-green-600" : "ri-arrow-down-line text-red-600"} text-sm`}
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
              <div className='w-12 h-12 rounded-lg bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white'>
                <i className={`${stat.icon} text-2xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Top Products */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Sales Chart */}
        <div className='lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-bold text-gray-800'>Sales Overview</h2>
            <select className='px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500'>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className='h-64 flex items-end justify-between gap-2'>
            {[65, 45, 78, 52, 88, 72, 95].map((height, index) => (
              <div
                key={index}
                className='flex-1 flex flex-col items-center gap-2'
              >
                <div
                  className='w-full bg-linear-to-t from-orange-500 to-amber-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer'
                  style={{ height: `${height}%` }}
                ></div>
                <span className='text-xs text-gray-600'>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
          <h2 className='text-lg font-bold text-gray-800 mb-4'>Top Products</h2>
          <div className='space-y-4'>
            {topProducts.map((product, index) => (
              <div key={index} className='flex items-center gap-3'>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className='rounded-lg object-cover'
                />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold text-gray-800 truncate'>
                    {product.name}
                  </p>
                  <p className='text-xs text-gray-600'>{product.sales} sales</p>
                </div>
                <p className='text-sm font-bold text-gray-800'>
                  {product.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200'>
          <h2 className='text-lg font-bold text-gray-800'>Recent Orders</h2>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Order ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Product
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Customer
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Date
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {recentOrders.map((order, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    {order.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {order.product}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {order.customer}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800'>
                    {order.amount}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {order.date}
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
