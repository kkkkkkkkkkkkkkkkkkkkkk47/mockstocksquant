export default function MetricCard({ label, value, sub, icon: Icon, trend, accent = "#3B82F6", className = "" }) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 hover:scale-[1.01] ${className}`}
      style={{
        background: "#111827",
        border: "1px solid #1F2937",
        cursor: "default",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "#1F2937")}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
          {label}
        </span>
        {Icon && (
          <div
            className="p-1.5 rounded-lg"
            style={{ background: `${accent}20` }}
          >
            <Icon size={14} style={{ color: accent }} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-xl font-bold" style={{ color: "#F9FAFB" }}>
          {value}
        </span>
        {trend !== undefined && (
          <span
            className="text-xs font-medium mb-0.5"
            style={{ color: trend >= 0 ? "#22C55E" : "#EF4444" }}
          >
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      {sub && (
        <span className="text-xs" style={{ color: "#9CA3AF" }}>
          {sub}
        </span>
      )}
    </div>
  );
}
