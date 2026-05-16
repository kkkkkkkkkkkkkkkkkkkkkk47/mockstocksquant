import { TrendingUp, TrendingDown, Activity, BarChart2, Newspaper } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { marketIndices, topGainers, topLosers, sectorPerformance, marketNews } from "../data/mockStocks";
import ChartCard from "../components/ChartCard";

export default function MarketOverview() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#F9FAFB" }}>Market Overview</h1>
        <p className="text-xs md:text-sm mt-1" style={{ color: "#9CA3AF" }}>
          Friday, May 15, 2026 · NYSE &amp; NASDAQ · Real-time data
        </p>
      </div>

      {/* Index Cards — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {marketIndices.map(idx => (
          <div
            key={idx.name}
            className="rounded-xl p-3 md:p-4 transition-all duration-200"
            style={{ background: "#111827", border: "1px solid #1F2937" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium truncate pr-1" style={{ color: "#9CA3AF" }}>{idx.name}</span>
              <span
                className="text-xs font-semibold flex items-center gap-0.5 flex-shrink-0"
                style={{ color: idx.changePct >= 0 ? "#22C55E" : "#EF4444" }}
              >
                {idx.changePct >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {idx.changePct >= 0 ? "+" : ""}{idx.changePct.toFixed(2)}%
              </span>
            </div>
            <div className="text-base md:text-xl font-bold mb-0.5" style={{ color: "#F9FAFB" }}>
              {idx.value.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: idx.change >= 0 ? "#22C55E" : "#EF4444" }}>
              {idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)}
            </div>
            <div className="mt-2 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={idx.history.slice(-15)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`g-${idx.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={idx.changePct >= 0 ? "#22C55E" : "#EF4444"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={idx.changePct >= 0 ? "#22C55E" : "#EF4444"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="price" stroke={idx.changePct >= 0 ? "#22C55E" : "#EF4444"} strokeWidth={1.5} fill={`url(#g-${idx.name})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Main chart + Sentiment — stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard
            title="S&P 500 — 60 Day Performance"
            subtitle="Index price movement"
            data={marketIndices[0].history}
            dataKey="price"
            color="#3B82F6"
            height={220}
          />
        </div>

        {/* Sentiment */}
        <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <div className="flex items-center gap-2">
            <Activity size={15} style={{ color: "#3B82F6" }} />
            <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Market Sentiment</h3>
          </div>

          {/* On mobile: horizontal layout for gauge + bars */}
          <div className="flex items-center gap-4 md:flex-col md:items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "conic-gradient(#22C55E 0% 62%, #F59E0B 62% 78%, #EF4444 78% 100%)",
                padding: 3,
              }}
            >
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center" style={{ background: "#111827" }}>
                <span className="text-lg font-bold" style={{ color: "#22C55E" }}>62</span>
                <span className="text-xs" style={{ color: "#9CA3AF" }}>Greed</span>
              </div>
            </div>

            <div className="flex-1 space-y-2 w-full">
              {[
                { label: "Bullish", pct: 62, color: "#22C55E" },
                { label: "Neutral", pct: 16, color: "#F59E0B" },
                { label: "Bearish", pct: 22, color: "#EF4444" },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#9CA3AF" }}>{s.label}</span>
                    <span style={{ color: s.color, fontWeight: 600 }}>{s.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#1F2937" }}>
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "VIX", value: "14.82", sub: "Low Volatility" },
              { label: "Put/Call", value: "0.72", sub: "Bullish" },
            ].map(m => (
              <div key={m.label} className="rounded-lg p-2 text-center" style={{ background: "#0D1117" }}>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>{m.label}</div>
                <div className="text-sm font-bold mt-0.5" style={{ color: "#F9FAFB" }}>{m.value}</div>
                <div className="text-xs" style={{ color: "#22C55E" }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gainers / Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Top Gainers", data: topGainers, color: "#22C55E", icon: TrendingUp },
          { title: "Top Losers",  data: topLosers,  color: "#EF4444", icon: TrendingDown },
        ].map(({ title, data, color, icon: Icon }) => (
          <div key={title} className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={14} style={{ color }} />
              <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>{title}</h3>
            </div>
            <div className="space-y-1.5">
              {data.map(s => (
                <div
                  key={s.ticker}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: "#0D1117" }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0" style={{ background: `${color}15`, color }}>
                      {s.ticker}
                    </span>
                    <span className="text-xs truncate" style={{ color: "#9CA3AF" }}>{s.company}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>${s.price.toFixed(2)}</span>
                    <span className="text-xs font-semibold" style={{ color }}>
                      {s.changePct >= 0 ? "+" : ""}{s.changePct.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sector Heatmap */}
      <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 size={14} style={{ color: "#3B82F6" }} />
          <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Sector Performance</h3>
          <span className="text-xs ml-auto" style={{ color: "#9CA3AF" }}>Today %</span>
        </div>
        {/* 2 cols on mobile, more on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {sectorPerformance.map(s => {
            const intensity = Math.min(Math.abs(s.change) / 2, 1);
            const bg = s.change >= 0
              ? `rgba(34,197,94,${0.1 + intensity * 0.35})`
              : `rgba(239,68,68,${0.1 + intensity * 0.35})`;
            const color = s.change >= 0 ? "#22C55E" : "#EF4444";
            return (
              <div
                key={s.sector}
                className="rounded-lg p-2.5 text-center"
                style={{ background: bg, border: `1px solid ${color}30` }}
              >
                <div className="text-xs font-medium mb-0.5 leading-tight" style={{ color: "#F9FAFB" }}>{s.sector}</div>
                <div className="text-sm font-bold" style={{ color }}>
                  {s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* News */}
      <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <div className="flex items-center gap-2 mb-3">
          <Newspaper size={14} style={{ color: "#3B82F6" }} />
          <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Market News</h3>
        </div>
        {/* 1 col on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {marketNews.map(n => (
            <div
              key={n.id}
              className="rounded-lg p-3 cursor-pointer transition-all duration-150"
              style={{ background: "#0D1117", border: "1px solid #1F2937" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{
                    background: n.sentiment === "positive" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                    color: n.sentiment === "positive" ? "#22C55E" : "#EF4444",
                  }}
                >
                  {n.sentiment === "positive" ? "Bullish" : "Bearish"}
                </span>
                <span className="text-xs ml-auto flex-shrink-0" style={{ color: "#9CA3AF" }}>{n.time}</span>
              </div>
              <p className="text-sm font-medium leading-snug mb-2" style={{ color: "#F9FAFB" }}>{n.headline}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#9CA3AF" }}>{n.source}</span>
                <div className="flex gap-1">
                  {n.tickers.map(t => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
