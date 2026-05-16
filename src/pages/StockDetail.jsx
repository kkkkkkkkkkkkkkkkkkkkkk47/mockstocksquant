import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Star, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { mockStocks } from "../data/mockStocks";
import SignalBadge from "../components/SignalBadge";

const PERIODS = ["1W", "1M", "3M", "6M", "1Y"];

function ScoreBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: "#9CA3AF" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1F2937" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function StockDetail() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const stock = mockStocks.find(s => s.ticker === ticker) || mockStocks[0];
  const isPositive = stock.changePct >= 0;

  return (
    <div className="space-y-4">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm transition-colors duration-150"
        style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Header card */}
      <div className="rounded-xl p-4 md:p-6" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <div className="flex items-start justify-between gap-3">
          {/* Left: logo + name */}
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-sm md:text-lg font-black flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #1E3A5F, #3B82F6)", color: "#F9FAFB" }}
            >
              {stock.ticker.slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#F9FAFB" }}>{stock.ticker}</h1>
                <SignalBadge signal={stock.signal} size="lg" />
              </div>
              <p className="text-xs md:text-sm mt-0.5 truncate" style={{ color: "#9CA3AF" }}>{stock.company}</p>
              <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{stock.sector}</p>
            </div>
          </div>

          {/* Right: price */}
          <div className="text-right flex-shrink-0">
            <div className="text-2xl md:text-3xl font-black" style={{ color: "#F9FAFB" }}>
              ${stock.price.toFixed(2)}
            </div>
            <div
              className="flex items-center justify-end gap-1 mt-0.5 text-sm font-semibold"
              style={{ color: isPositive ? "#22C55E" : "#EF4444" }}
            >
              {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {isPositive ? "+" : ""}{stock.changePct.toFixed(2)}%
            </div>
            <div className="text-xs mt-1 hidden sm:block" style={{ color: "#9CA3AF" }}>
              Target: <span style={{ color: "#3B82F6", fontWeight: 600 }}>${stock.priceTarget}</span>
              <span className="ml-1.5" style={{ color: "#22C55E" }}>
                +{(((stock.priceTarget - stock.price) / stock.price) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Target row — visible on mobile below the header */}
        <div className="mt-3 sm:hidden text-xs" style={{ color: "#9CA3AF" }}>
          Target: <span style={{ color: "#3B82F6", fontWeight: 600 }}>${stock.priceTarget}</span>
          <span className="ml-1.5" style={{ color: "#22C55E" }}>
            +{(((stock.priceTarget - stock.price) / stock.price) * 100).toFixed(1)}% upside
          </span>
        </div>
      </div>

      {/* Price Chart */}
      <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <div className="flex items-center justify-between mb-3 gap-2">
          <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Price Chart</h3>
          {/* Period buttons — scrollable on mobile */}
          <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {PERIODS.map(p => (
              <button
                key={p}
                className="px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 transition-colors duration-150"
                style={{
                  background: p === "3M" ? "rgba(59,130,246,0.2)" : "#0D1117",
                  color: p === "3M" ? "#3B82F6" : "#9CA3AF",
                  border: `1px solid ${p === "3M" ? "rgba(59,130,246,0.3)" : "#1F2937"}`,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={stock.history} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={isPositive ? "#22C55E" : "#EF4444"} stopOpacity={0.25} />
                <stop offset="95%" stopColor={isPositive ? "#22C55E" : "#EF4444"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#9CA3AF", fontSize: 9 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fill: "#9CA3AF", fontSize: 9 }} axisLine={false} tickLine={false} width={52} tickFormatter={v => `$${v}`} domain={["auto", "auto"]} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="rounded-lg px-3 py-2 text-sm" style={{ background: "#1F2937", border: "1px solid #374151" }}>
                    <p style={{ color: "#9CA3AF" }}>{label}</p>
                    <p style={{ color: isPositive ? "#22C55E" : "#EF4444", fontWeight: 700 }}>${payload[0].value}</p>
                  </div>
                ) : null
              }
            />
            <Area
              type="monotone" dataKey="price"
              stroke={isPositive ? "#22C55E" : "#EF4444"} strokeWidth={2}
              fill="url(#stockGrad)" dot={false}
              activeDot={{ r: 4, fill: isPositive ? "#22C55E" : "#EF4444", stroke: "#111827", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics — 3 cols on mobile, 6 on desktop */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {[
          { label: "EPS",           value: `$${stock.eps}` },
          { label: "P/E Ratio",     value: `${stock.pe}x` },
          { label: "Revenue",       value: stock.revenue },
          { label: "Profit Margin", value: stock.profitMargin },
          { label: "Debt/Equity",   value: stock.debtEquity },
          { label: "Market Cap",    value: stock.marketCap },
        ].map(m => (
          <div
            key={m.label}
            className="rounded-xl p-3 text-center"
            style={{ background: "#111827", border: "1px solid #1F2937" }}
          >
            <div className="text-xs mb-1 leading-tight" style={{ color: "#9CA3AF" }}>{m.label}</div>
            <div className="text-sm font-bold" style={{ color: "#F9FAFB" }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Quant Score + Analyst + Bull/Bear — stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quant Score */}
        <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Quant Score</h3>
            <div
              className="text-2xl font-black px-3 py-1 rounded-lg"
              style={{
                background: stock.quantScore >= 80 ? "rgba(34,197,94,0.15)" : stock.quantScore >= 60 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                color: stock.quantScore >= 80 ? "#22C55E" : stock.quantScore >= 60 ? "#F59E0B" : "#EF4444",
              }}
            >
              {stock.quantScore}
            </div>
          </div>
          <div className="space-y-3">
            <ScoreBar label="Momentum"  value={stock.momentum}  color="#3B82F6" />
            <ScoreBar label="Value"     value={stock.value}     color="#8B5CF6" />
            <ScoreBar label="Volatility" value={stock.volatility} color="#F59E0B" />
            <ScoreBar label="Quality"   value={stock.quality}   color="#22C55E" />
            <ScoreBar label="Risk"      value={stock.risk}      color="#EC4899" />
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid #1F2937" }}>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>Confidence</span>
            <span className="text-sm font-bold" style={{ color: "#3B82F6" }}>{stock.confidence}%</span>
          </div>
        </div>

        {/* Analyst Rating */}
        <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: "#F9FAFB" }}>Analyst Consensus</h3>
          <div className="flex flex-col items-center gap-2 mb-4">
            <div
              className="text-base font-bold px-4 py-2 rounded-xl"
              style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6" }}
            >
              {stock.analystRating}
            </div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} fill={i <= 4 ? "#F59E0B" : "none"} style={{ color: "#F59E0B" }} />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: "Strong Buy", count: 12, pct: 48, color: "#22C55E" },
              { label: "Buy",        count: 8,  pct: 32, color: "#86EFAC" },
              { label: "Hold",       count: 4,  pct: 16, color: "#F59E0B" },
              { label: "Sell",       count: 1,  pct: 4,  color: "#EF4444" },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2">
                <span className="text-xs w-20 flex-shrink-0" style={{ color: "#9CA3AF" }}>{r.label}</span>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "#1F2937" }}>
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
                <span className="text-xs w-4 text-right flex-shrink-0" style={{ color: "#9CA3AF" }}>{r.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 flex justify-between" style={{ borderTop: "1px solid #1F2937" }}>
            <div className="text-center">
              <div className="text-xs" style={{ color: "#9CA3AF" }}>Target</div>
              <div className="text-sm font-bold" style={{ color: "#F9FAFB" }}>${stock.priceTarget}</div>
            </div>
            <div className="text-center">
              <div className="text-xs" style={{ color: "#9CA3AF" }}>Analysts</div>
              <div className="text-sm font-bold" style={{ color: "#F9FAFB" }}>25</div>
            </div>
            <div className="text-center">
              <div className="text-xs" style={{ color: "#9CA3AF" }}>Upside</div>
              <div className="text-sm font-bold" style={{ color: "#22C55E" }}>
                +{(((stock.priceTarget - stock.price) / stock.price) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Bull / Bear */}
        <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Investment Thesis</h3>
          <div className="rounded-lg p-3" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={13} style={{ color: "#22C55E" }} />
              <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>Bull Case</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>{stock.bullCase}</p>
          </div>
          <div className="rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={13} style={{ color: "#EF4444" }} />
              <span className="text-xs font-semibold" style={{ color: "#EF4444" }}>Bear Case</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>{stock.bearCase}</p>
          </div>
        </div>
      </div>

      {/* Related News */}
      <div className="rounded-xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#F9FAFB" }}>Related News</h3>
        <div className="space-y-2">
          {[
            { headline: `${stock.company} Reports Strong Quarterly Earnings, Beats Estimates`, source: "Bloomberg", time: "1h ago", sentiment: "positive" },
            { headline: `Analysts Raise Price Target for ${stock.ticker} Following Product Launch`, source: "Reuters", time: "3h ago", sentiment: "positive" },
            { headline: `${stock.ticker} Faces Regulatory Scrutiny in European Markets`, source: "FT", time: "5h ago", sentiment: "negative" },
            { headline: `Institutional Investors Increase ${stock.ticker} Holdings in Q1`, source: "WSJ", time: "8h ago", sentiment: "positive" },
          ].map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-100"
              style={{ background: "#0D1117" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: n.sentiment === "positive" ? "#22C55E" : "#EF4444" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug" style={{ color: "#F9FAFB" }}>{n.headline}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{n.source}</span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>·</span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{n.time}</span>
                </div>
              </div>
              <ExternalLink size={12} style={{ color: "#9CA3AF", flexShrink: 0, marginTop: 2 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
