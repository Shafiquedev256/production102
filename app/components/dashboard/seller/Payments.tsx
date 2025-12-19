"use client";

import { useState } from "react";
import { ISeller } from "@/app/hooks/useSeller";

interface PaymentsProps {
  seller: ISeller;
}

export default function Payments({ seller }: PaymentsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const paymentStats = [
    {
      label: "Total Earnings",
      value: `${seller.currency} ${seller.totalEarnings.toLocaleString()}`,
      icon: "ri-money-dollar-circle-line",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Pending Payout",
      value: `${seller.currency} ${seller.pendingPayout.toLocaleString()}`,
      icon: "ri-time-line",
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "This Month",
      value: `${seller.currency} 12,340`,
      icon: "ri-calendar-line",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Last Payout",
      value: `${seller.currency} 5,680`,
      icon: "ri-check-line",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const transactions = [
    {
      id: "TXN-8901",
      type: "Payout",
      amount: `${seller.currency} 5,680`,
      status: "Completed",
      date: "2024-01-10",
      method: "Bank Transfer",
    },
    {
      id: "TXN-8900",
      type: "Sale",
      amount: `${seller.currency} 299`,
      status: "Completed",
      date: "2024-01-15",
      method: "Credit Card",
    },
    {
      id: "TXN-8899",
      type: "Sale",
      amount: `${seller.currency} 49`,
      status: "Completed",
      date: "2024-01-15",
      method: "PayPal",
    },
    {
      id: "TXN-8898",
      type: "Refund",
      amount: `-${seller.currency} 79`,
      status: "Processed",
      date: "2024-01-14",
      method: "Credit Card",
    },
    {
      id: "TXN-8897",
      type: "Sale",
      amount: `${seller.currency} 159`,
      status: "Completed",
      date: "2024-01-13",
      method: "Credit Card",
    },
    {
      id: "TXN-8896",
      type: "Payout",
      amount: `${seller.currency} 4,230`,
      status: "Completed",
      date: "2023-12-25",
      method: "Bank Transfer",
    },
    {
      id: "TXN-8895",
      type: "Sale",
      amount: `${seller.currency} 89`,
      status: "Pending",
      date: "2024-01-12",
      method: "PayPal",
    },
  ];

  const payoutHistory = [
    {
      date: "2024-01-10",
      amount: `${seller.currency} 5,680`,
      method: "Bank Transfer",
      status: "Completed",
      reference: "PAY-2024-001",
    },
    {
      date: "2023-12-25",
      amount: `${seller.currency} 4,230`,
      method: "Bank Transfer",
      status: "Completed",
      reference: "PAY-2023-012",
    },
    {
      date: "2023-12-10",
      amount: `${seller.currency} 3,890`,
      method: "Bank Transfer",
      status: "Completed",
      reference: "PAY-2023-011",
    },
    {
      date: "2023-11-25",
      amount: `${seller.currency} 4,560`,
      method: "Bank Transfer",
      status: "Completed",
      reference: "PAY-2023-010",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Payments</h2>
          <p className='text-sm text-gray-600 mt-1'>
            Manage your earnings and payouts
          </p>
        </div>
        <button className='flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer'>
          <i className='ri-download-line text-lg'></i>
          <span>Request Payout</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
        {paymentStats.map((stat, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <p className='text-sm text-gray-600 mb-1'>{stat.label}</p>
                <h3 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                  {stat.value}
                </h3>
              </div>
              <div
                className={`w-12 h-12 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center text-white`}
              >
                <i className={`${stat.icon} text-2xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
        <div className='border-b border-gray-200 px-4 sm:px-6'>
          <div className='flex gap-2 sm:gap-4 overflow-x-auto'>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === "overview"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("payouts")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === "payouts"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Payout History
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                activeTab === "settings"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Payment Settings
            </button>
          </div>
        </div>

        {/* Transactions Tab */}
        {activeTab === "overview" && (
          <div className='p-4 sm:p-6'>
            {/* Mobile */}
            <div className='lg:hidden space-y-4'>
              {transactions.map((txn, idx) => (
                <div
                  key={idx}
                  className='bg-gray-50 rounded-lg p-4 border border-gray-200'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <p className='font-semibold text-gray-800'>{txn.id}</p>
                      <p className='text-sm text-gray-600 mt-1'>{txn.type}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        txn.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : txn.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    <div>
                      <span className='text-gray-600'>Amount:</span>
                      <p className='font-semibold text-gray-800'>
                        {txn.amount}
                      </p>
                    </div>
                    <div>
                      <span className='text-gray-600'>Method:</span>
                      <p className='font-medium text-gray-800'>{txn.method}</p>
                    </div>
                    <div className='col-span-2'>
                      <span className='text-gray-600'>Date:</span>
                      <p className='font-medium text-gray-800'>{txn.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className='hidden lg:block overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                      Transaction ID
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                      Type
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                      Method
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
                  {transactions.map((txn, idx) => (
                    <tr
                      key={idx}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-6 py-4 text-sm font-medium text-gray-800'>
                        {txn.id}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {txn.type}
                      </td>
                      <td className='px-6 py-4 text-sm font-semibold text-gray-800'>
                        {txn.amount}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {txn.method}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            txn.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : txn.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-600'>
                        {txn.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payout History Tab */}
        {activeTab === "payouts" && (
          <div className='p-4 sm:p-6 overflow-x-auto'>
            <table className='w-full bg-white rounded-lg shadow-sm border border-gray-100'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Amount
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Method
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {payoutHistory.map((payout, idx) => (
                  <tr key={idx} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 text-sm text-gray-800'>
                      {payout.date}
                    </td>
                    <td className='px-6 py-4 text-sm font-semibold text-gray-800'>
                      {payout.amount}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      {payout.method}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payout.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {payout.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-600'>
                      {payout.reference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payment Settings Tab */}
        {activeTab === "settings" && (
          <div className='p-4 sm:p-6'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>
              Payment Settings
            </h3>
            <p className='text-sm text-gray-600'>
              Configure your payout methods, bank accounts, and other payment
              preferences here. (Integration with backend API required)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
