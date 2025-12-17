"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "affiliate" | "business" | "admin";
  status: "active" | "suspended" | "pending";
  revenue: number;
  clicks: number;
  joined: string;
  lastActive: string;
}

type RoleFilter = "all" | User["role"];
type StatusFilter = "all" | User["status"];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "affiliate",
      status: "active",
      revenue: 12500,
      clicks: 3200,
      joined: "2024-01-15",
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "business",
      status: "active",
      revenue: 45800,
      clicks: 8900,
      joined: "2024-01-10",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      role: "affiliate",
      status: "suspended",
      revenue: 8200,
      clicks: 2100,
      joined: "2024-02-01",
      lastActive: "3 days ago",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "affiliate",
      status: "active",
      revenue: 28900,
      clicks: 6700,
      joined: "2023-12-20",
      lastActive: "15 min ago",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@example.com",
      role: "business",
      status: "pending",
      revenue: 0,
      clicks: 0,
      joined: "2024-03-05",
      lastActive: "Never",
    },
  ]);

  const [filterRole, setFilterRole] = useState<RoleFilter>("all");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter results
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesStatus && matchesSearch;
  });

  // Toggle suspension
  const handleSuspend = (userId: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "suspended" ? "active" : "suspended" }
          : u
      )
    );
  };

  // Delete user
  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  // Badge styles
  const roleBadge = {
    affiliate: "bg-blue-50 text-blue-600",
    business: "bg-teal-50 text-teal-600",
    admin: "bg-orange-50 text-orange-600",
  } as const;

  const statusBadge = {
    active: "bg-green-50 text-green-600",
    suspended: "bg-red-50 text-red-600",
    pending: "bg-yellow-50 text-yellow-600",
  } as const;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            User & Account Management
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Manage all users, affiliates, and business accounts
          </p>
        </div>

        <button className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium'>
          <i className='ri-user-add-line text-lg' />
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg border border-gray-200 p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {/* Search */}
          <div>
            <label className='block text-xs font-medium mb-2 text-gray-700'>
              Search Users
            </label>
            <div className='relative'>
              <i className='ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' />
              <input
                type='text'
                className='w-full pl-10 pr-4 py-2 border rounded-lg text-sm'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Name or email...'
              />
            </div>
          </div>

          {/* Filter Role */}
          <div>
            <label className='block text-xs font-medium mb-2 text-gray-700'>
              Filter by Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as RoleFilter)}
              className='w-full px-4 py-2 border rounded-lg text-sm'
            >
              <option value='all'>All Roles</option>
              <option value='affiliate'>Affiliate</option>
              <option value='business'>Business</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          {/* Filter Status */}
          <div>
            <label className='block text-xs font-medium mb-2 text-gray-700'>
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as StatusFilter)}
              className='w-full px-4 py-2 border rounded-lg text-sm'
            >
              <option value='all'>All Status</option>
              <option value='active'>Active</option>
              <option value='suspended'>Suspended</option>
              <option value='pending'>Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
        <div className='bg-white border rounded-lg p-4'>
          <p className='text-xs text-gray-500'>Total Users</p>
          <p className='text-2xl font-bold mt-1'>{users.length}</p>
        </div>
        <div className='bg-white border rounded-lg p-4'>
          <p className='text-xs text-gray-500'>Active</p>
          <p className='text-2xl font-bold text-green-600 mt-1'>
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className='bg-white border rounded-lg p-4'>
          <p className='text-xs text-gray-500'>Suspended</p>
          <p className='text-2xl font-bold text-red-600 mt-1'>
            {users.filter((u) => u.status === "suspended").length}
          </p>
        </div>
        <div className='bg-white border rounded-lg p-4'>
          <p className='text-xs text-gray-500'>Pending</p>
          <p className='text-2xl font-bold text-yellow-600 mt-1'>
            {users.filter((u) => u.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  User
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Role
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Revenue
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Clicks
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold'>
                  Last Active
                </th>
                <th className='px-4 py-3 text-right text-xs font-semibold'>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className='divide-y'>
              {filteredUsers.map((user) => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  {/* User */}
                  <td className='px-4 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center'>
                        <span className='font-semibold text-teal-600'>
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className='text-sm font-medium'>{user.name}</p>
                        <p className='text-xs text-gray-500'>{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className='px-4 py-4'>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge[user.role]}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className='px-4 py-4'>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Revenue */}
                  <td className='px-4 py-4'>
                    ${user.revenue.toLocaleString()}
                  </td>

                  {/* Clicks */}
                  <td className='px-4 py-4'>{user.clicks}</td>

                  {/* Last Active */}
                  <td className='px-4 py-4'>{user.lastActive}</td>

                  {/* Actions */}
                  <td className='px-4 py-4 text-right'>
                    <button
                      onClick={() => handleSuspend(user.id)}
                      className='text-sm text-blue-600 hover:underline mr-4'
                    >
                      {user.status === "suspended" ? "Activate" : "Suspend"}
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className='text-sm text-red-600 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className='text-center py-6 text-gray-500 text-sm'>
              No users match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
