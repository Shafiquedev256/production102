import { useState } from "react";

interface AuditLog {
  id: number;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ip: string;
  device: string;
  status: "success" | "failed";
}

interface SystemAlert {
  type: "info" | "warning" | "error";
  message: string;
  time: string;
}

export default function AuditLogs() {
  const [logs] = useState<AuditLog[]>([
    {
      id: 1,
      user: "admin@platform.com",
      action: "Updated user permissions",
      resource: "User #1234",
      timestamp: "2024-03-10 14:32:15",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 2,
      user: "john@example.com",
      action: "Created new campaign",
      resource: "Campaign #5678",
      timestamp: "2024-03-10 14:15:42",
      ip: "192.168.1.101",
      device: "Safari on macOS",
      status: "success",
    },
    {
      id: 3,
      user: "sarah@example.com",
      action: "Failed login attempt",
      resource: "Authentication",
      timestamp: "2024-03-10 13:58:23",
      ip: "192.168.1.102",
      device: "Firefox on Linux",
      status: "failed",
    },
    {
      id: 4,
      user: "admin@platform.com",
      action: "Suspended user account",
      resource: "User #9012",
      timestamp: "2024-03-10 13:45:11",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      status: "success",
    },
    {
      id: 5,
      user: "mike@example.com",
      action: "Updated campaign settings",
      resource: "Campaign #3456",
      timestamp: "2024-03-10 13:22:05",
      ip: "192.168.1.103",
      device: "Edge on Windows",
      status: "success",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logs.filter((log) => {
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const systemAlerts: SystemAlert[] = [
    {
      type: "info",
      message: "Database backup completed successfully",
      time: "1 hour ago",
    },
    {
      type: "warning",
      message: "High memory usage detected on server #2",
      time: "2 hours ago",
    },
    {
      type: "error",
      message:
        "Failed login attempts exceeded threshold for user admin@platform.com",
      time: "3 hours ago",
    },
  ];

  const getAlertColor = (type: SystemAlert["type"]) => {
    const colors = {
      info: "bg-blue-50 text-blue-600",
      warning: "bg-yellow-50 text-yellow-600",
      error: "bg-red-50 text-red-600",
    };
    return colors[type];
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Audit Logs & Infrastructure Monitoring
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Track all system activities and monitor infrastructure health
          </p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium'>
          <i className='ri-download-line text-lg' />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg border border-gray-200 p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-2'>
              Search Logs
            </label>
            <div className='relative'>
              <i className='ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by user, action, or resource...'
                className='w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
              />
            </div>
          </div>
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-2'>
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer'
            >
              <option value='all'>All Status</option>
              <option value='success'>Success</option>
              <option value='failed'>Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        <div className='px-5 py-4 border-b border-gray-200'>
          <h3 className='text-base font-semibold text-gray-900'>
            Activity Logs
          </h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  User
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Action
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Resource
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Timestamp
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  IP Address
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Device
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredLogs.map((log) => (
                <tr key={log.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-4 text-sm font-medium text-gray-900'>
                    {log.user}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {log.action}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {log.resource}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {log.timestamp}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600 font-mono'>
                    {log.ip}
                  </td>
                  <td className='px-4 py-4 text-sm text-gray-600'>
                    {log.device}
                  </td>
                  <td className='px-4 py-4'>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${log.status === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Alerts */}
      <div className='bg-white rounded-lg border border-gray-200'>
        <div className='px-5 py-4 border-b border-gray-200'>
          <h3 className='text-base font-semibold text-gray-900'>
            System Alerts
          </h3>
        </div>
        <div className='p-5 space-y-3'>
          {systemAlerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm ${getAlertColor(alert.type)}`}
            >
              <div className='flex items-center justify-between'>
                <span>{alert.message}</span>
                <span className='text-xs text-gray-500'>{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
