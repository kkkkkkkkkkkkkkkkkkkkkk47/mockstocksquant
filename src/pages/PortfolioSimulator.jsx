import { TrendingUp, DollarSign, BarChart2, Shield } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { mockPortfolio } from "../data/mockPortfolio";

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={9} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PortfolioSimulator() {
  const p = mockPortfolio;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#F9FAFB" }}>Portfolio Simulator</h1>
        <p className="text-xs md:text-sm mt-1" style={{ color: "#9CA3AF" }}>Mock portfolio · Updated May 15, 2026</p>
      </div>

      {/* Summary Cards — 2 cols on mobile, 4 on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Value",  value: `$${p.totalValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, sub: `Cash: $${p.cash.toLocaleString()}`, color: "#3B82F6", icon: DollarSign },
          { label: "Daily Return", value: `+$${p.dailyReturn.toLocaleString("en-US", { minimumFractionDigits: 0 })}`, sub: `+${p.dailyReturnPct}% today`, color: "#22C55E", icon: TrendingUp },
          { label: "Total Return", value: `+$${p.totalReturn.toLocaleString("en-US", { minimumFractionDigits: 0 })}`, sub: `+${p.totalReturnPct}% all time`, color: "#22C55E", icon: BarChart2 },
          { label: "Sharpe Ratio", value: p.riskMetrics.sharpeRatio, sub: `Beta: ${p.riskMetrics.beta}`, color: "#8B5CF6", icon: Shield },
        ].map(c => (
          <div
            key={c.label}
            className="rounded-xl p-3 md:p-4 transition-all duration-200"
            style={{ background: "#111827", border: "1px solid #1F2937" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium uppercase tracking-wider leading-tight" style={{ color: "#9CA3AF" }}>{c.label}</span>
              <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: `${c.color}20` }}>
                <c.icon size={12} style={{ color: c.color }} />
              </div>
            </div>
            <div className="text-base md:text-xl font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Portfolio Performance</h3>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>vs S&P 500 · 3 months</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5" style={{ color: "#F9FAFB" }}>
              <span className="w-3 h-0.5 rounded inline-block" style={{ background: "#3B82F6" }} /> Portfolio
            </span>
            <span className="flex items-center gap-1.5" style={{ color: "#9CA3AF" }}>
              <span className="w-3 h-0.5 rounded inline-block" style={{ background: "#9CA3AF" }} /> Benchmark
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={p.performanceHistory.slice(-90)} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="benchGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#9CA3AF" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 9 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 9 }} axisLine={false} tickLine={false} width={52} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} domain={["auto", "auto"]} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "#1F2937", border: "1px solid #374151" }}>
                    <p style={{ color: "#9CA3AF", marginBottom: 4 }}>{label}</p>
                    {payload.map((p, i) => (
                      <p key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: ${p.value?.toLocaleString()}</p>
                    ))}
                  </div>
                ) : null
              }
            />
            <Area type="monotone" dataKey="benchmark" name="Benchmark" stroke="#9CA3AF" strokeWidth={1.5} fill="url(#benchGrad)" dot={false} />
            <Area type="monotone" dataKey="portfolio"  name="Portfolio"  stroke="#3B82F6" strokeWidth={2}   fill="url(#portGrad)"  dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Allocation + Sector — stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie */}
        <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#F9FAFB" }}>Asset Allocation</h3>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0" style={{ width: 160, height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={p.allocationByAsset}
                    cx="50%" cy="50%"
                    innerRadius={42} outerRadius={72}
                    dataKey="value" labelLine={false} label={renderCustomLabel}
                  >
                    {p.allocationByAsset.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5 min-w-0">
              {p.allocationByAsset.map(a => (
                <div key={a.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: a.color }} />
                    <span className="text-xs truncate" style={{ color: "#9CA3AF" }}>{a.name}</span>
                  </div>
                  <span className="text-xs font-semibold flex-shrink-0" style={{ color: "#F9FAFB" }}>{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Bar */}
        <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#F9FAFB" }}>Sector Exposure</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={p.sectorExposure} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "#9CA3AF", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="sector" tick={{ fill: "#9CA3AF", fontSize: 9 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                formatter={v => [`${v}%`, "Weight"]}
                contentStyle={{ background: "#1F2937", border: "1px solid #374151", borderRadius: 8, color: "#F9FAFB", fontSize: 11 }}
              />
              <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
                {p.sectorExposure.map((_, i) => (
                  <Cell key={i} fill={["#3B82F6","#8B5CF6","#22C55E","#EC4899","#F59E0B","#6B7280","#14B8A6"][i % 7]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings — table on desktop, cards on mobile */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1F2937" }}>
        <div className="px-4 py-3" style={{ background: "#111827", borderBottom: "1px solid #1F2937" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Holdings</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#0D1117" }}>
                {["Ticker", "Company", "Shares", "Avg Cost", "Current", "Value", "Gain/Loss", "Weight"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.holdings.map((h, i) => (
                <tr
                  key={h.ticker}
                  className="transition-colors duration-100"
                  style={{ background: i % 2 === 0 ? "#111827" : "#0D1117", borderBottom: "1px solid #1F2937" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1F2937")}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#111827" : "#0D1117")}
                >
                  <td className="px-4 py-3">
                    <span className="font-bold text-xs px-2 py-1 rounded" style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}>
                      {h.ticker}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: "#F9FAFB" }}>{h.company}</td>
                  <td className="px-4 py-3" style={{ color: "#9CA3AF" }}>{h.shares}</td>
                  <td className="px-4 py-3" style={{ color: "#9CA3AF" }}>${h.avgCost.toFixed(2)}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#F9FAFB" }}>${h.currentPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#F9FAFB" }}>
                    ${h.value.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3">
                    <div style={{ color: h.gain >= 0 ? "#22C55E" : "#EF4444" }}>
                      <div className="font-semibold text-xs">+${h.gain.toLocaleString("en-US", { minimumFractionDigits: 0 })}</div>
                      <div className="text-xs">+{h.gainPct.toFixed(1)}%</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: "#1F2937" }}>
                        <div className="h-full rounded-full" style={{ width: `${h.weight * 3}%`, background: "#3B82F6" }} />
                      </div>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{h.weight}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y" style={{ borderColor: "#1F2937" }}>
          {p.holdings.map((h, i) => (
            <div
              key={h.ticker}
              className="px-4 py-3"
              style={{ background: i % 2 === 0 ? "#111827" : "#0D1117" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs px-2 py-1 rounded" style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}>
                    {h.ticker}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#F9FAFB" }}>{h.company}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: h.gain >= 0 ? "#22C55E" : "#EF4444" }}>
                  +{h.gainPct.toFixed(1)}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div style={{ color: "#9CA3AF" }}>Shares</div>
                  <div style={{ color: "#F9FAFB", fontWeight: 600 }}>{h.shares}</div>
                </div>
                <div>
                  <div style={{ color: "#9CA3AF" }}>Current</div>
                  <div style={{ color: "#F9FAFB", fontWeight: 600 }}>${h.currentPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div style={{ color: "#9CA3AF" }}>Value</div>
                  <div style={{ color: "#F9FAFB", fontWeight: 600 }}>${(h.value / 1000).toFixed(1)}k</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Summary — 3 cols on mobile, 6 on lg */}
      <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#F9FAFB" }}>Risk / Return Summary</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {[
            { label: "Sharpe",      value: p.riskMetrics.sharpeRatio,              color: "#22C55E" },
            { label: "Beta",        value: p.riskMetrics.beta,                     color: "#3B82F6" },
            { label: "Alpha",       value: `+${p.riskMetrics.alpha}%`,             color: "#22C55E" },
            { label: "Max DD",      value: `${p.riskMetrics.maxDrawdown}%`,        color: "#EF4444" },
            { label: "Volatility",  value: `${p.riskMetrics.volatility}%`,         color: "#F59E0B" },
            { label: "VaR 95%",     value: `${p.riskMetrics.var95}%`,              color: "#EF4444" },
          ].map(m => (
            <div key={m.label} className="text-center rounded-lg p-2.5" style={{ background: "#0D1117" }}>
              <div className="text-xs mb-1" style={{ color: "#9CA3AF" }}>{m.label}</div>
              <div className="text-base font-bold" style={{ color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
