"use client";

import { useState } from "react";

interface Alert {
  id: number;
  type: "ip-cluster" | "bot-pattern" | "click-spike" | "abuse";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
  affectedUsers: number;
}

export default function FraudDetection() {
  const [alerts] = useState<Alert[]>([
    {
      id: 1,
      type: "ip-cluster",
      severity: "high",
      title: "Suspicious IP Cluster Detected",
      description: "15 accounts from same IP range 192.168.1.x",
      timestamp: "5 min ago",
      affectedUsers: 15,
    },
    {
      id: 2,
      type: "click-spike",
      severity: "medium",
      title: "Unusual Click Spike",
      description: "Campaign #1234 received 500% more clicks than average",
      timestamp: "15 min ago",
      affectedUsers: 1,
    },
    {
      id: 3,
      type: "bot-pattern",
      severity: "high",
      title: "Bot Activity Detected",
      description: "Automated clicking pattern from user ID 5678",
      timestamp: "1 hour ago",
      affectedUsers: 1,
    },
    {
      id: 4,
      type: "abuse",
      severity: "medium",
      title: "Multiple Failed Login Attempts",
      description: "Account admin@example.com has 12 failed login attempts",
      timestamp: "2 hours ago",
      affectedUsers: 1,
    },
  ]);

  const getSeverityColor = (severity: Alert["severity"]) => {
    const colors = {
      high: "bg-red-50 text-red-600 border-red-200",
      medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
      low: "bg-blue-50 text-blue-600 border-blue-200",
    };
    return colors[severity];
  };

  const getTypeIcon = (type: Alert["type"]) => {
    const icons = {
      "ip-cluster": "ri-global-line",
      "bot-pattern": "ri-robot-line",
      "click-spike": "ri-line-chart-line",
      abuse: "ri-alert-line",
    };
    return icons[type];
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Fraud Detection & Alerts
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Monitor suspicious activities and potential fraud
          </p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium'>
          <i className='ri-settings-3-line text-lg' />
          Configure Rules
        </button>
      </div>

      {/* Alert Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
        {[
          {
            title: "Total Alerts",
            value: alerts.length,
            icon: "ri-alarm-warning-line",
            color: "red",
          },
          {
            title: "High Severity",
            value: alerts.filter((a) => a.severity === "high").length,
            icon: "ri-error-warning-line",
            color: "red",
          },
          {
            title: "Blocked IPs",
            value: 23,
            icon: "ri-shield-cross-line",
            color: "gray",
          },
          {
            title: "Prevented Loss",
            value: "$12.5K",
            icon: "ri-shield-check-line",
            color: "green",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className='bg-white rounded-lg border p-4 flex items-center justify-between'
          >
            <div>
              <p className='text-xs text-gray-500 uppercase tracking-wide'>
                {stat.title}
              </p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  stat.color === "green"
                    ? "text-green-600"
                    : stat.color === "red"
                      ? "text-red-600"
                      : "text-gray-900"
                }`}
              >
                {stat.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-50`}
            >
              <i className={`${stat.icon} text-${stat.color}-600 text-xl`} />
            </div>
          </div>
        ))}
      </div>

      {/* Active Alerts */}
      <div className='bg-white rounded-lg border'>
        <div className='px-5 py-4 border-b border-gray-200'>
          <h3 className='text-base font-semibold text-gray-900'>
            Active Alerts
          </h3>
        </div>
        <div className='divide-y divide-gray-200'>
          {alerts.map((alert) => (
            <div key={alert.id} className='p-5 hover:bg-gray-50'>
              <div className='flex items-start gap-4'>
                {/* Alert Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(
                    alert.severity
                  )}`}
                >
                  <i className={`${getTypeIcon(alert.type)} text-xl`} />
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      {/* Alert Title & Description */}
                      <h4 className='text-sm font-semibold text-gray-900'>
                        {alert.title}
                      </h4>
                      <p className='text-sm text-gray-600 mt-1'>
                        {alert.description}
                      </p>

                      {/* Alert Metadata */}
                      <div className='flex items-center gap-4 mt-2 text-xs text-gray-500'>
                        <span>{alert.timestamp}</span>
                        <span>•</span>
                        <span>
                          {alert.affectedUsers} affected user
                          {alert.affectedUsers > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Severity Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                        alert.severity
                      )} border`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex items-center gap-2 mt-4'>
                    <button className='px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-xs font-medium'>
                      Investigate
                    </button>
                    <button className='px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium'>
                      Block
                    </button>
                    <button className='px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs font-medium'>
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
