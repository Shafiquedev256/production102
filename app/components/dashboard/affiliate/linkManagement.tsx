import { useState } from 'react';

interface Link {
  id: number;
  name: string;
  url: string;
  shortUrl: string;
  clicks: number;
  conversions: number;
  revenue: string;
  conversionRate: string;
  status: 'active' | 'paused';
  created: string;
}

export default function LinkManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const links: Link[] = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      url: 'https://aff.example.com/summer-sale-2024',
      shortUrl: 'aff.link/ss24',
      clicks: 3245,
      conversions: 187,
      revenue: '$1,245',
      conversionRate: '5.8%',
      status: 'active',
      created: '2024-05-15',
    },
    {
      id: 2,
      name: 'Tech Gadgets Promo',
      url: 'https://aff.example.com/tech-gadgets-promo',
      shortUrl: 'aff.link/tgp24',
      clicks: 2890,
      conversions: 156,
      revenue: '$2,340',
      conversionRate: '5.4%',
      status: 'active',
      created: '2024-05-10',
    },
    {
      id: 3,
      name: 'Fashion Week Special',
      url: 'https://aff.example.com/fashion-week-special',
      shortUrl: 'aff.link/fws24',
      clicks: 1876,
      conversions: 98,
      revenue: '$890',
      conversionRate: '5.2%',
      status: 'active',
      created: '2024-05-08',
    },
    {
      id: 4,
      name: 'Home Decor Deals',
      url: 'https://aff.example.com/home-decor-deals',
      shortUrl: 'aff.link/hdd24',
      clicks: 1654,
      conversions: 89,
      revenue: '$670',
      conversionRate: '5.4%',
      status: 'paused',
      created: '2024-05-05',
    },
  ];

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateQRCode = (url: string) => {
    alert(`QR Code generated for: ${url}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Link Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create, track, and manage your affiliate links</p>
        </div>
        <br />
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
        >
          <i className="ri-add-line"></i>
          <span>Create New Link</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Links</p>
              <h3 className="text-2xl font-bold text-gray-900">{links.length}</h3>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg">
              <i className="ri-links-line text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Links</p>
              <h3 className="text-2xl font-bold text-gray-900">{links.filter(l => l.status === 'active').length}</h3>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg">
              <i className="ri-checkbox-circle-line text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Clicks</p>
              <h3 className="text-2xl font-bold text-gray-900">{links.reduce((sum, l) => sum + l.clicks, 0).toLocaleString()}</h3>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg">
              <i className="ri-cursor-line text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg. Conv. Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">5.5%</h3>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-600 rounded-lg">
              <i className="ri-percent-line text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search links..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                <option>Sort by: Recent</option>
                <option>Sort by: Clicks</option>
                <option>Sort by: Revenue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Link Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{link.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Created: {link.created}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">{link.shortUrl}</code>
                      <button
                        onClick={() => handleCopy(link.id, link.url)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        title="Copy URL"
                      >
                        <i className={`${copiedId === link.id ? 'ri-check-line text-green-600' : 'ri-file-copy-line text-gray-600'} text-sm`}></i>
                      </button>
                      <button
                        onClick={() => generateQRCode(link.url)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        title="Generate QR Code"
                      >
                        <i className="ri-qrcode-line text-sm text-gray-600"></i>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{link.clicks.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{link.conversions}</p>
                      <p className="text-xs text-gray-500">{link.conversionRate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-teal-600">{link.revenue}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      link.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {link.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-blue-600 hover:underline">Edit</button>
                      <button className="text-sm text-red-600 hover:underline">Delete</button>
                    </div>
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
