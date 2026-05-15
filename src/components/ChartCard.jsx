import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-sm"
        style={{ background: "#1F2937", border: "1px solid #374151", color: "#F9FAFB" }}
      >
        <p style={{ color: "#9CA3AF", marginBottom: 2 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {typeof p.value === "number" && p.value > 1000
              ? `$${p.value.toLocaleString()}`
              : `$${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartCard({ title, data, dataKey = "price", color = "#3B82F6", height = 200, subtitle }) {
  const isPositive = data && data.length >= 2
    ? data[data.length - 1][dataKey] >= data[0][dataKey]
    : true;

  const lineColor = color === "auto" ? (isPositive ? "#22C55E" : "#EF4444") : color;

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>{title}</h3>
            {subtitle && <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{subtitle}</p>}
          </div>
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={lineColor} stopOpacity={0.25} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={55}
            tickFormatter={v => v > 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`}
            domain={["auto", "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#grad-${dataKey})`}
            dot={false}
            activeDot={{ r: 4, fill: lineColor, stroke: "#111827", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
