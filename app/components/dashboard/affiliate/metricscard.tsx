"use client";

interface MetricsCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: "blue" | "green" | "purple" | "teal" | "orange";
}

export default function MetricsCard({
  label,
  value,
  change,
  trend,
  icon,
  color,
}: MetricsCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    teal: "bg-teal-100 text-teal-600",
    orange: "bg-orange-100 text-orange-600",
  };

  const selectedColor =
    colorClasses[color] || "bg-gray-100 text-gray-600"; // fallback safety

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition duration-200 hover:-translate-y-0.5 cursor-pointer">
      <div className="flex items-start justify-between">
        
        {/* Left side */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>

          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>

          <div className="flex items-center gap-1 mt-2">
            <i
              className={`${
                trend === "up"
                  ? "ri-arrow-up-line text-green-600"
                  : "ri-arrow-down-line text-red-600"
              } text-sm`}
            ></i>

            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>

            <span className="text-xs text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-lg ${selectedColor}`}
        >
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}
