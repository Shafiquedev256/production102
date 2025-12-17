export interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
  color: "teal" | "blue" | "green" | "emerald" | "orange" | "pink";
}

export default function MetricCard({
  label,
  value,
  change,
  trend,
  icon,
  color,
}: MetricCardProps) {
  const colorClasses: Record<MetricCardProps["color"], string> = {
    teal: "bg-teal-50 text-teal-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    pink: "bg-pink-50 text-pink-600",
  };

  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-red-600"
        : "text-gray-600";

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between'>
        {/* Left Side */}
        <div className='flex-1'>
          <p className='text-xs text-gray-500 uppercase tracking-wide font-medium'>
            {label}
          </p>

          <p className='text-3xl font-bold text-gray-900 mt-2'>{value}</p>

          <div className='flex items-center gap-1 mt-2'>
            {trend !== "neutral" && (
              <i
                className={`ri-arrow-${
                  trend === "up" ? "up" : "down"
                }-line ${trendColor} text-sm`}
              />
            )}
            <span className={`text-sm font-medium ${trendColor}`}>
              {change}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-lg flex items-center justify-center 
            ${colorClasses[color]}
          `}
        >
          <i className={`${icon} text-xl`} />
        </div>
      </div>
    </div>
  );
}
