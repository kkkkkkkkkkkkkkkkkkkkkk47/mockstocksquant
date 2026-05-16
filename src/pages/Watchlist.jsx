import { useState } from "react";
import { Bell, Trash2, TrendingUp, TrendingDown, Plus, BellRing } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { mockStocks } from "../data/mockStocks";

const DEFAULT_WATCHLIST = ["AAPL", "MSFT", "NVDA", "META", "GOOGL", "JPM"];

export default function Watchlist() {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(DEFAULT_WATCHLIST);
  const [alerts, setAlerts] = useState({});

  const stocks = mockStocks.filter(s => watchlist.includes(s.ticker));
  const remove = (ticker) => setWatchlist(prev => prev.filter(t => t !== ticker));
  const toggleAlert = (ticker) => setAlerts(prev => ({ ...prev, [ticker]: !prev[ticker] }));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#F9FAFB" }}>Watchlist</h1>
          <p className="text-xs md:text-sm mt-0.5" style={{ color: "#9CA3AF" }}>{stocks.length} stocks tracked</p>
        </div>
        <button
          onClick={() => navigate("/screener")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
          style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.3)", cursor: "pointer" }}
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add Stock</span>
        </button>
      </div>

      {stocks.length === 0 ? (
        <div className="text-center py-20 rounded-xl" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <Bell size={40} className="mx-auto mb-3 opacity-20" style={{ color: "#9CA3AF" }} />
          <p className="text-sm" style={{ color: "#9CA3AF" }}>Your watchlist is empty.</p>
          <button
            onClick={() => navigate("/screener")}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.3)", cursor: "pointer" }}
          >
            Browse Stocks
          </button>
        </div>
      ) : (
        /* 1 col on mobile, 2 on md, 3 on xl */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {stocks.map(stock => {
            const isPositive = stock.changePct >= 0;
            const miniData = stock.history.slice(-20);

            return (
              <div
                key={stock.ticker}
                className="rounded-xl p-4 transition-all duration-200"
                style={{ background: "#111827", border: "1px solid #1F2937" }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="cursor-pointer min-w-0"
                    onClick={() => navigate(`/stock/${stock.ticker}`)}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base" style={{ color: "#F9FAFB" }}>{stock.ticker}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                        style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6" }}
                      >
                        {stock.sector.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#9CA3AF" }}>{stock.company}</p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <button
                      onClick={() => toggleAlert(stock.ticker)}
                      className="p-1.5 rounded-lg transition-colors duration-150"
                      style={{
                        background: alerts[stock.ticker] ? "rgba(245,158,11,0.15)" : "#1F2937",
                        color: alerts[stock.ticker] ? "#F59E0B" : "#9CA3AF",
                        border: "none", cursor: "pointer",
                      }}
                    >
                      {alerts[stock.ticker] ? <BellRing size={14} /> : <Bell size={14} />}
                    </button>
                    <button
                      onClick={() => remove(stock.ticker)}
                      className="p-1.5 rounded-lg transition-colors duration-150"
                      style={{ background: "#1F2937", color: "#9CA3AF", border: "none", cursor: "pointer" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#EF4444"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#1F2937"; e.currentTarget.style.color = "#9CA3AF"; }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Price row */}
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-2xl font-black" style={{ color: "#F9FAFB" }}>
                      ${stock.price.toFixed(2)}
                    </div>
                    <div
                      className="flex items-center gap-1 text-sm font-semibold mt-0.5"
                      style={{ color: isPositive ? "#22C55E" : "#EF4444" }}
                    >
                      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {isPositive ? "+" : ""}{stock.change.toFixed(2)} ({isPositive ? "+" : ""}{stock.changePct.toFixed(2)}%)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>Mkt Cap</div>
                    <div className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>{stock.marketCap}</div>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-14 mb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={miniData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`wl-${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={isPositive ? "#22C55E" : "#EF4444"} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={isPositive ? "#22C55E" : "#EF4444"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone" dataKey="price"
                        stroke={isPositive ? "#22C55E" : "#EF4444"} strokeWidth={1.5}
                        fill={`url(#wl-${stock.ticker})`} dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #1F2937" }}>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    Vol: <span style={{ color: "#F9FAFB" }}>{stock.volume}</span>
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>
                    P/E: <span style={{ color: "#F9FAFB" }}>{stock.pe}x</span>
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: stock.signal === "Buy" ? "rgba(34,197,94,0.15)" : stock.signal === "Hold" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                      color: stock.signal === "Buy" ? "#22C55E" : stock.signal === "Hold" ? "#F59E0B" : "#EF4444",
                    }}
                  >
                    {stock.signal}
                  </span>
                </div>

                {alerts[stock.ticker] && (
                  <div
                    className="mt-2 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
                    style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B" }}
                  >
                    <BellRing size={11} />
                    Alert active · Notify at ±5%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
