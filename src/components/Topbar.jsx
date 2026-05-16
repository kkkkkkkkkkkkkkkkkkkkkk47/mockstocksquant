import { useState } from "react";
import { Search, Bell, Settings, ChevronDown, TrendingUp, TrendingDown, X, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockStocks } from "../data/mockStocks";

export default function Topbar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    setSearchOpen(false);
    navigate(`/stock/${ticker}`);
  };

  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: "rgba(8,11,18,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1F2937",
      }}
    >
      {/* Main bar */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ minHeight: "56px" }}>
        {/* Logo — mobile only (desktop has sidebar) */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: 30, height: 30, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
          >
            <Activity size={15} color="#fff" />
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "#F9FAFB" }}>
            Quant<span style={{ color: "#3B82F6" }}>X</span>
          </span>
        </div>

        {/* Desktop search */}
        <div className="relative hidden md:block flex-1 max-w-md">
          <SearchBox
            query={query}
            setQuery={setQuery}
            focused={focused}
            setFocused={setFocused}
            results={results}
            onSelect={handleSelect}
          />
        </div>

        <div className="flex-1 hidden md:block" />

        {/* Market status — desktop */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
          <span className="text-xs font-medium" style={{ color: "#22C55E" }}>Market Open</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          {/* Mobile search toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-150"
            style={{ background: "#111827", border: "1px solid #1F2937", color: "#9CA3AF", cursor: "pointer" }}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X size={16} /> : <Search size={16} />}
          </button>

          <button
            className="relative p-2 rounded-lg transition-colors duration-150"
            style={{ background: "#111827", border: "1px solid #1F2937", color: "#9CA3AF", cursor: "pointer" }}
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: "#EF4444" }} />
          </button>

          <button
            className="hidden md:flex p-2 rounded-lg transition-colors duration-150"
            style={{ background: "#111827", border: "1px solid #1F2937", color: "#9CA3AF", cursor: "pointer" }}
          >
            <Settings size={16} />
          </button>

          {/* Avatar */}
          <div
            className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg cursor-pointer"
            style={{ background: "#111827", border: "1px solid #1F2937" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff" }}
            >
              Q
            </div>
            <span className="text-sm font-medium hidden md:block" style={{ color: "#F9FAFB" }}>Trader</span>
            <ChevronDown size={14} className="hidden md:block" style={{ color: "#9CA3AF" }} />
          </div>
        </div>
      </div>

      {/* Mobile search drawer */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <SearchBox
            query={query}
            setQuery={setQuery}
            focused={focused}
            setFocused={setFocused}
            results={results}
            onSelect={handleSelect}
            autoFocus
          />
        </div>
      )}
    </header>
  );
}

function SearchBox({ query, setQuery, focused, setFocused, results, onSelect, autoFocus }) {
  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-150"
        style={{
          background: "#111827",
          border: `1px solid ${focused ? "#3B82F6" : "#1F2937"}`,
        }}
      >
        <Search size={15} style={{ color: "#9CA3AF", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search stocks, tickers..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          autoFocus={autoFocus}
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: "#F9FAFB" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {focused && results.length > 0 && (
        <div
          className="absolute top-full mt-1 w-full rounded-lg overflow-hidden z-50"
          style={{ background: "#111827", border: "1px solid #1F2937", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        >
          {results.map(stock => (
            <button
              key={stock.ticker}
              onMouseDown={() => onSelect(stock.ticker)}
              className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-100"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#F9FAFB" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1F2937")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
                  style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6" }}
                >
                  {stock.ticker}
                </span>
                <span className="text-sm truncate" style={{ color: "#9CA3AF" }}>{stock.company}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span className="text-sm font-medium">${stock.price.toFixed(2)}</span>
                <span
                  className="text-xs flex items-center gap-0.5"
                  style={{ color: stock.changePct >= 0 ? "#22C55E" : "#EF4444" }}
                >
                  {stock.changePct >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {stock.changePct >= 0 ? "+" : ""}{stock.changePct.toFixed(2)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
