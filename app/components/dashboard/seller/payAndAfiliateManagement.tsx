import { useState } from "react";

interface Payout {
  id: number;
  affiliate: string;
  email: string;
  amount: number;
  conversions: number;
  period: string;
  date?: string;
  avatar: string;
}

export default function PayoutsManagement() {
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "paid" | "affiliates"
  >("pending");
  const [selected, setSelected] = useState<number[]>([]);

  const pendingPayouts: Payout[] = [
    {
      id: 1,
      affiliate: "Sarah Johnson",
      email: "sarah@example.com",
      amount: 3135.78,
      conversions: 89,
      period: "Jan 2024",
      avatar: "SJ",
    },
    {
      id: 2,
      affiliate: "Mike Chen",
      email: "mike@example.com",
      amount: 2491.3,
      conversions: 67,
      period: "Jan 2024",
      avatar: "MC",
    },
    {
      id: 3,
      affiliate: "Emma Wilson",
      email: "emma@example.com",
      amount: 2046.96,
      conversions: 54,
      period: "Jan 2024",
      avatar: "EW",
    },
    {
      id: 4,
      affiliate: "David Brown",
      email: "david@example.com",
      amount: 1975.28,
      conversions: 48,
      period: "Jan 2024",
      avatar: "DB",
    },
  ];

  const paidPayouts: Payout[] = [
    {
      id: 5,
      affiliate: "Lisa Anderson",
      email: "lisa@example.com",
      amount: 1753.04,
      conversions: 42,
      period: "Dec 2023",
      date: "2024-01-05",
      avatar: "LA",
    },
    {
      id: 6,
      affiliate: "Tom Roberts",
      email: "tom@example.com",
      amount: 1456.89,
      conversions: 38,
      period: "Dec 2023",
      date: "2024-01-05",
      avatar: "TR",
    },
  ];

  const handleSelectAll = () => {
    if (selected.length === pendingPayouts.length) {
      setSelected([]);
    } else {
      setSelected(pendingPayouts.map((p) => p.id));
    }
  };

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const totalSelected = pendingPayouts
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Payouts & Affiliate Management
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Manage commission payments and affiliates
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-gray-600'>Pending Payouts</span>
            <i className='ri-time-line text-lg text-orange-600'></i>
          </div>
          <p className='text-2xl font-bold text-gray-900'>$9,649.32</p>
          <p className='text-xs text-gray-600 mt-1'>4 affiliates</p>
        </div>
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-gray-600'>Paid This Month</span>
            <i className='ri-check-double-line text-lg text-green-600'></i>
          </div>
          <p className='text-2xl font-bold text-gray-900'>$3,209.93</p>
          <p className='text-xs text-gray-600 mt-1'>2 affiliates</p>
        </div>
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm text-gray-600'>Total Affiliates</span>
            <i className='ri-team-line text-lg text-teal-600'></i>
          </div>
          <p className='text-2xl font-bold text-gray-900'>156</p>
          <p className='text-xs text-gray-600 mt-1'>89 active</p>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-xl border border-gray-200'>
        <div className='border-b border-gray-200 px-6'>
          <div className='flex gap-6'>
            <button
              onClick={() => setSelectedTab("pending")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === "pending"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Pending Approval
            </button>
            <button
              onClick={() => setSelectedTab("paid")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === "paid"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Payment History
            </button>
            <button
              onClick={() => setSelectedTab("affiliates")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === "affiliates"
                  ? "border-teal-600 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              All Affiliates
            </button>
          </div>
        </div>

        <div className='p-6'>
          {/* Pending Approval */}
          {selectedTab === "pending" && (
            <div>
              {selected.length > 0 && (
                <div className='mb-4 p-4 bg-teal-50 rounded-lg flex items-center justify-between'>
                  <span className='text-sm font-medium text-teal-900'>
                    {selected.length} selected • Total: $
                    {totalSelected.toFixed(2)}
                  </span>
                  <button className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium'>
                    Process Bulk Payout
                  </button>
                </div>
              )}

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-200'>
                      <th className='text-left pb-3'>
                        <input
                          type='checkbox'
                          checked={selected.length === pendingPayouts.length}
                          onChange={handleSelectAll}
                          className='w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer'
                        />
                      </th>
                      <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                        Affiliate
                      </th>
                      <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                        Period
                      </th>
                      <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                        Conversions
                      </th>
                      <th className='text-right text-xs font-semibold text-gray-600 pb-3'>
                        Amount
                      </th>
                      <th className='text-right text-xs font-semibold text-gray-600 pb-3'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPayouts.map((payout) => (
                      <tr
                        key={payout.id}
                        className='border-b border-gray-100 hover:bg-gray-50'
                      >
                        <td className='py-4'>
                          <input
                            type='checkbox'
                            checked={selected.includes(payout.id)}
                            onChange={() => handleSelect(payout.id)}
                            className='w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer'
                          />
                        </td>
                        <td className='py-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-xs'>
                              {payout.avatar}
                            </div>
                            <div>
                              <p className='text-sm font-semibold text-gray-900'>
                                {payout.affiliate}
                              </p>
                              <p className='text-xs text-gray-600'>
                                {payout.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='py-4 text-sm text-gray-600'>
                          {payout.period}
                        </td>
                        <td className='py-4 text-sm text-gray-600'>
                          {payout.conversions}
                        </td>
                        <td className='py-4 text-right text-sm font-bold text-gray-900'>
                          ${payout.amount.toFixed(2)}
                        </td>
                        <td className='py-4 text-right'>
                          <button className='px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs font-medium'>
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment History */}
          {selectedTab === "paid" && (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                      Affiliate
                    </th>
                    <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                      Period
                    </th>
                    <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                      Paid Date
                    </th>
                    <th className='text-left text-xs font-semibold text-gray-600 pb-3'>
                      Conversions
                    </th>
                    <th className='text-right text-xs font-semibold text-gray-600 pb-3'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paidPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className='border-b border-gray-100 hover:bg-gray-50'
                    >
                      <td className='py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-xs'>
                            {payout.avatar}
                          </div>
                          <div>
                            <p className='text-sm font-semibold text-gray-900'>
                              {payout.affiliate}
                            </p>
                            <p className='text-xs text-gray-600'>
                              {payout.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 text-sm text-gray-600'>
                        {payout.period}
                      </td>
                      <td className='py-4 text-sm text-gray-600'>
                        {payout.date}
                      </td>
                      <td className='py-4 text-sm text-gray-600'>
                        {payout.conversions}
                      </td>
                      <td className='py-4 text-right text-sm font-bold text-gray-900'>
                        ${payout.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* All Affiliates Tab */}
          {selectedTab === "affiliates" && (
            <div className='text-gray-600'>
              Affiliate list view coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
