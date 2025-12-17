"use client";

import { useState } from "react";

interface Campaign {
  id: number;
  name: string;
  owner: string;
  status: "active" | "paused" | "pending";
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
  startDate: string;
}

export default function CampaignOversight() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Summer Sale 2024",
      owner: "Sarah Johnson",
      status: "active",
      clicks: 12500,
      conversions: 1850,
      revenue: 45800,
      commission: 15,
      startDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Product Launch Campaign",
      owner: "John Smith",
      status: "active",
      clicks: 8900,
      conversions: 1240,
      revenue: 32100,
      commission: 20,
      startDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Holiday Special",
      owner: "Emma Wilson",
      status: "paused",
      clicks: 5600,
      conversions: 780,
      revenue: 18900,
      commission: 12,
      startDate: "2024-01-20",
    },
    {
      id: 4,
      name: "New Customer Promo",
      owner: "Mike Davis",
      status: "pending",
      clicks: 0,
      conversions: 0,
      revenue: 0,
      commission: 18,
      startDate: "2024-03-05",
    },
    {
      id: 5,
      name: "Flash Sale Weekend",
      owner: "Alex Brown",
      status: "active",
      clicks: 15200,
      conversions: 2340,
      revenue: 58700,
      commission: 22,
      startDate: "2024-02-10",
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const getStatusBadge = (status: Campaign["status"]) => {
    const colors = {
      active: "bg-green-50 text-green-600",
      paused: "bg-yellow-50 text-yellow-600",
      pending: "bg-gray-50 text-gray-600",
    };
    return colors[status];
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Campaigns & Product Oversight
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Monitor and manage all campaigns across the platform
          </p>
        </div>

        <button className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium'>
          <i className='ri-add-line text-lg' />
          Create Campaign
        </button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs text-gray-500 uppercase'>Total Campaigns</p>
              <p className='text-2xl font-bold mt-1'>{campaigns.length}</p>
            </div>
            <div className='w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center'>
              <i className='ri-megaphone-line text-teal-600 text-xl' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs text-gray-500 uppercase'>Active</p>
              <p className='text-2xl font-bold text-green-600 mt-1'>
                {campaigns.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center'>
              <i className='ri-play-circle-line text-green-600 text-xl' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs text-gray-500 uppercase'>Total Revenue</p>
              <p className='text-2xl font-bold mt-1'>
                $
                {campaigns
                  .reduce((sum, c) => sum + c.revenue, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className='w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center'>
              <i className='ri-money-dollar-circle-line text-emerald-600 text-xl' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs text-gray-500 uppercase'>Avg. Conversion</p>
              <p className='text-2xl font-bold mt-1'>14.8%</p>
            </div>
            <div className='w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
              <i className='ri-percent-line text-blue-600 text-xl' />
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Table */}
      <div className='bg-white rounded-lg border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Campaign
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Owner
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Clicks
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Conversions
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Revenue
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Commission
                </th>
                <th className='px-4 py-3 text-right text-xs font-semibold'>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className='divide-y'>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className='hover:bg-gray-50'>
                  {/* Campaign */}
                  <td className='px-4 py-4'>
                    <p className='text-sm font-medium text-gray-900'>
                      {campaign.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      Started {campaign.startDate}
                    </p>
                  </td>

                  {/* Owner */}
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {campaign.owner}
                  </td>

                  {/* Status */}
                  <td className='px-4 py-4'>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>

                  {/* Clicks */}
                  <td className='px-4 py-4 text-sm'>
                    {campaign.clicks.toLocaleString()}
                  </td>

                  {/* Conversions */}
                  <td className='px-4 py-4 text-sm'>
                    {campaign.conversions.toLocaleString()}
                  </td>

                  {/* Revenue */}
                  <td className='px-4 py-4 text-sm font-medium'>
                    ${campaign.revenue.toLocaleString()}
                  </td>

                  {/* Commission */}
                  <td className='px-4 py-4 text-sm'>{campaign.commission}%</td>

                  {/* Actions */}
                  <td className='px-4 py-4 text-right'>
                    <div className='flex justify-end gap-2'>
                      {/* View */}
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg'
                        title='View Details'
                      >
                        <i className='ri-eye-line text-lg' />
                      </button>

                      {/* Edit */}
                      <button
                        className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg'
                        title='Edit'
                      >
                        <i className='ri-edit-line text-lg' />
                      </button>

                      {/* Pause / Resume */}
                      <button
                        className='p-2 text-gray-600 hover:bg-gray-100 rounded-lg'
                        title='Pause/Resume'
                      >
                        <i
                          className={`${
                            campaign.status === "paused"
                              ? "ri-play-circle-line"
                              : "ri-pause-circle-line"
                          } text-lg`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg max-w-3xl w-full overflow-hidden'>
            {/* Modal Header */}
            <div className='px-6 py-4 border-b flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Campaign Details</h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className='text-gray-500 hover:text-gray-700'
              >
                <i className='ri-close-line text-xl' />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6 space-y-4'>
              <p className='text-xl font-bold'>{selectedCampaign.name}</p>
              <p className='text-sm text-gray-600'>
                Owner: {selectedCampaign.owner}
              </p>
              <p>Status: {selectedCampaign.status}</p>
              <p>Revenue: ${selectedCampaign.revenue.toLocaleString()}</p>
              <p>Clicks: {selectedCampaign.clicks.toLocaleString()}</p>
              <p>
                Conversions: {selectedCampaign.conversions.toLocaleString()}
              </p>
              <p>Commission: {selectedCampaign.commission}%</p>
              <p>Started: {selectedCampaign.startDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
