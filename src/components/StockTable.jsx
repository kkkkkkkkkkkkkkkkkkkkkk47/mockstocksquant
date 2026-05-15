import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Plus, Check } from "lucide-react";
import SignalBadge from "./SignalBadge";
import { useState } from "react";

export default function StockTable({ stocks }) {
  const navigate = useNavigate();
  const [watchlisted, setWatchlisted] = useState({});

  const toggleWatch = (e, ticker) => {
    e.stopPropagation();
    setWatchlisted(prev => ({ ...prev, [ticker]: !prev[ticker] }));
  };

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #1F2937" }}>
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0D1117", borderBottom: "1px solid #1F2937" }}>
            {["Ticker", "Company", "Price", "Change", "Market Cap", "P/E", "Volume", "Signal", ""].map(h => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#9CA3AF" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, i) => (
            <tr
              key={stock.ticker}
              onClick={() => navigate(`/stock/${stock.ticker}`)}
              className="transition-colors duration-100 cursor-pointer"
              style={{
                background: i % 2 === 0 ? "#111827" : "#0D1117",
                borderBottom: "1px solid #1F2937",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1F2937")}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "#111827" : "#0D1117")}
            >
              <td className="px-4 py-3">
                <span
                  className="font-bold text-xs px-2 py-1 rounded"
                  style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}
                >
                  {stock.ticker}
                </span>
              </td>
              <td className="px-4 py-3 font-medium" style={{ color: "#F9FAFB" }}>
                {stock.company}
              </td>
              <td className="px-4 py-3 font-semibold" style={{ color: "#F9FAFB" }}>
                ${stock.price.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <span
                  className="flex items-center gap-1 font-medium"
                  style={{ color: stock.changePct >= 0 ? "#22C55E" : "#EF4444" }}
                >
                  {stock.changePct >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {stock.changePct >= 0 ? "+" : ""}{stock.changePct.toFixed(2)}%
                </span>
              </td>
              <td className="px-4 py-3" style={{ color: "#9CA3AF" }}>{stock.marketCap}</td>
              <td className="px-4 py-3" style={{ color: "#9CA3AF" }}>{stock.pe}</td>
              <td className="px-4 py-3" style={{ color: "#9CA3AF" }}>{stock.volume}</td>
              <td className="px-4 py-3">
                <SignalBadge signal={stock.signal} />
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={e => toggleWatch(e, stock.ticker)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-150"
                  style={{
                    background: watchlisted[stock.ticker] ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.1)",
                    color: watchlisted[stock.ticker] ? "#22C55E" : "#3B82F6",
                    border: `1px solid ${watchlisted[stock.ticker] ? "rgba(34,197,94,0.3)" : "rgba(59,130,246,0.2)"}`,
                    cursor: "pointer",
                  }}
                >
                  {watchlisted[stock.ticker] ? <Check size={11} /> : <Plus size={11} />}
                  {watchlisted[stock.ticker] ? "Saved" : "Watch"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
