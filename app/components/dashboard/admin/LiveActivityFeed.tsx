"use client";

import { useState, useEffect } from "react";

interface Activity {
  id: number;
  type: "click" | "conversion" | "signup" | "payout";
  user: string;
  action: string;
  time: string;
  amount?: string;
}

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "conversion",
      user: "John Smith",
      action: "completed a purchase",
      time: "Just now",
      amount: "$125",
    },
    {
      id: 2,
      type: "signup",
      user: "Sarah Johnson",
      action: "registered as affiliate",
      time: "1 min ago",
    },
    {
      id: 3,
      type: "click",
      user: "Mike Davis",
      action: "clicked campaign link",
      time: "2 min ago",
    },
    {
      id: 4,
      type: "payout",
      user: "Emma Wilson",
      action: "received payout",
      time: "5 min ago",
      amount: "$450",
    },
    {
      id: 5,
      type: "conversion",
      user: "Alex Brown",
      action: "completed a purchase",
      time: "8 min ago",
      amount: "$89",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: ["click", "conversion", "signup", "payout"][
          Math.floor(Math.random() * 4)
        ] as Activity["type"],
        user: [
          "John Smith",
          "Sarah Johnson",
          "Mike Davis",
          "Emma Wilson",
          "Alex Brown",
        ][Math.floor(Math.random() * 5)],
        action: "performed an action",
        time: "Just now",
        amount:
          Math.random() > 0.5
            ? `$${Math.floor(Math.random() * 500)}`
            : undefined,
      };

      // Limit feed to last 10 items
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "click":
        return "ri-cursor-line";
      case "conversion":
        return "ri-shopping-cart-line";
      case "signup":
        return "ri-user-add-line";
      case "payout":
        return "ri-money-dollar-circle-line";
      default:
        return "ri-notification-line";
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "click":
        return "bg-blue-50 text-blue-600";
      case "conversion":
        return "bg-green-50 text-green-600";
      case "signup":
        return "bg-teal-50 text-teal-600";
      case "payout":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 h-full'>
      {/* Header */}
      <div className='px-5 py-4 border-b border-gray-200 flex items-center justify-between'>
        <h3 className='text-base font-semibold text-gray-900'>
          Live Activity Feed
        </h3>
        <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
      </div>

      {/* Feed List */}
      <div className='divide-y divide-gray-100 max-h-[420px] overflow-y-auto custom-scrollbar'>
        {activities.map((activity) => (
          <div key={activity.id} className='px-5 py-4 flex items-start gap-3'>
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(
                activity.type
              )}`}
            >
              <i className={`${getActivityIcon(activity.type)} text-lg`} />
            </div>

            {/* Text */}
            <div className='flex-1'>
              <p className='text-sm text-gray-800'>
                <span className='font-semibold'>{activity.user}</span>{" "}
                {activity.action}
              </p>

              {activity.amount && (
                <p className='text-xs text-green-600 mt-1 font-medium'>
                  Amount: {activity.amount}
                </p>
              )}

              <p className='text-xs text-gray-500 mt-1'>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
