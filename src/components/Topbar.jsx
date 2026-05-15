import { useState } from "react";
import { Search, Bell, Settings, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockStocks } from "../data/mockStocks";

export default function Topbar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const results = query.length > 0
    ? mockStocks.filter(
        s =>
          s.ticker.toLowerCase().includes(query.toLowerCase()) ||
          s.company.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelect = (ticker) => {
    setQuery("");
    setFocused(false);
    navigate(`/stock/${ticker}`);
  };

  return (
    <header
      className="flex items-center gap-4 px-6 py-3 sticky top-0 z-30"
      style={{
        background: "rgba(8,11,18,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1F2937",
        minHeight: "60px",
      }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-150"
          style={{
            background: "#111827",
            border: `1px solid ${focused ? "#3B82F6" : "#1F2937"}`,
          }}
        >
          <Search size={15} style={{ color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search stocks, tickers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: "#F9FAFB" }}
          />
          {query && (
            <kbd
              className="text-xs px-1 rounded"
              style={{ background: "#1F2937", color: "#9CA3AF" }}
            >
              ESC
            </kbd>
          )}
        </div>

        {/* Dropdown */}
        {focused && results.length > 0 && (
          <div
            className="absolute top-full mt-1 w-full rounded-lg overflow-hidden z-50"
            style={{ background: "#111827", border: "1px solid #1F2937", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
          >
            {results.map(stock => (
              <button
                key={stock.ticker}
                onMouseDown={() => handleSelect(stock.ticker)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-100"
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#F9FAFB" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1F2937")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6" }}
                  >
                    {stock.ticker}
                  </span>
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>{stock.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${stock.price.toFixed(2)}</span>
                  <span
                    className="text-xs flex items-center gap-0.5"
                    style={{ color: stock.changePct >= 0 ? "#22C55E" : "#EF4444" }}
                  >
                    {stock.changePct >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stock.changePct >= 0 ? "+" : ""}{stock.changePct.toFixed(2)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Market status */}
      <div className="hidden md:flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#22C55E" }}
        />
        <span className="text-xs font-medium" style={{ color: "#22C55E" }}>Market Open</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 rounded-lg transition-colors duration-150"
          style={{ background: "#111827", border: "1px solid #1F2937", color: "#9CA3AF", cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#F9FAFB")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
        >
          <Bell size={16} />
          <span
            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
            style={{ background: "#EF4444" }}
          />
        </button>
        <button
          className="p-2 rounded-lg transition-colors duration-150"
          style={{ background: "#111827", border: "1px solid #1F2937", color: "#9CA3AF", cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#F9FAFB")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
        >
          <Settings size={16} />
        </button>

        {/* Avatar */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-150"
          style={{ background: "#111827", border: "1px solid #1F2937" }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff" }}
          >
            Q
          </div>
          <span className="text-sm font-medium hidden md:block" style={{ color: "#F9FAFB" }}>Trader</span>
          <ChevronDown size={14} style={{ color: "#9CA3AF" }} />
        </div>
      </div>
    </header>
  );
}
