import { useState } from "react";

interface Transaction {
  id: number;
  type: "payout" | "commission" | "refund" | "revenue";
  user: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  method: string;
}

export default function Financials() {
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "payout",
      user: "John Smith",
      amount: 1250,
      status: "completed",
      date: "2024-03-10",
      method: "PayPal",
    },
    {
      id: 2,
      type: "commission",
      user: "Sarah Johnson",
      amount: 450,
      status: "pending",
      date: "2024-03-09",
      method: "Bank Transfer",
    },
    {
      id: 3,
      type: "revenue",
      user: "Mike Davis",
      amount: 3200,
      status: "completed",
      date: "2024-03-08",
      method: "Stripe",
    },
    {
      id: 4,
      type: "refund",
      user: "Emma Wilson",
      amount: -180,
      status: "completed",
      date: "2024-03-07",
      method: "PayPal",
    },
    {
      id: 5,
      type: "payout",
      user: "Alex Brown",
      amount: 890,
      status: "pending",
      date: "2024-03-06",
      method: "Bank Transfer",
    },
  ]);

  const getTypeIcon = (type: Transaction["type"]) => {
    const icons = {
      payout: "ri-arrow-up-circle-line",
      commission: "ri-percent-line",
      refund: "ri-refund-2-line",
      revenue: "ri-arrow-down-circle-line",
    };
    return icons[type];
  };

  const getTypeColor = (type: Transaction["type"]) => {
    const colors = {
      payout: "text-red-600",
      commission: "text-blue-600",
      refund: "text-orange-600",
      revenue: "text-green-600",
    };
    return colors[type];
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    const colors = {
      completed: "bg-green-50 text-green-600",
      pending: "bg-yellow-50 text-yellow-600",
      failed: "bg-red-50 text-red-600",
    };
    return colors[status];
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Financials & Payouts
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Track all financial transactions and manage payouts
          </p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer'>
          <i className='ri-download-line text-lg' />
          Export Report
        </button>
      </div>

      {/* Transactions Table */}
      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        <div className='px-5 py-4 border-b border-gray-200 flex items-center justify-between'>
          <h3 className='text-base font-semibold text-gray-900'>
            Recent Transactions
          </h3>
          <div className='flex items-center gap-2'>
            <button className='px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer'>
              All
            </button>
            <button className='px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer'>
              Pending
            </button>
            <button className='px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer'>
              Completed
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Type
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  User
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Amount
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Method
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Date
                </th>
                <th className='px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-4'>
                    <div className='flex items-center gap-2'>
                      <i
                        className={`${getTypeIcon(transaction.type)} ${getTypeColor(transaction.type)} text-lg`}
                      />
                      <span className='text-sm font-medium text-gray-900 capitalize'>
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-900'>
                    {transaction.user}
                  </td>
                  <td className='px-4 py-4'>
                    <span
                      className={`text-sm font-semibold ${transaction.amount >= 0 ? "text-gray-900" : "text-red-600"}`}
                    >
                      ${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {transaction.method}
                  </td>
                  <td className='px-4 py-4'>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {transaction.date}
                  </td>
                  <td className='px-4 py-4 text-right'>
                    <button className='text-gray-400 hover:text-gray-600 transition-colors'>
                      <i className='ri-more-2-line text-lg' />
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
