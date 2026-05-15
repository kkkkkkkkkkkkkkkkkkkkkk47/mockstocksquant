import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { mockStocks } from "../data/mockStocks";
import StockTable from "../components/StockTable";

const SIGNALS = ["All", "Buy", "Hold", "Sell"];
const SECTORS = ["All", "Technology", "Financials", "Healthcare", "Energy", "Communication Services", "Consumer Discretionary"];

export default function StockScreener() {
  const [search, setSearch] = useState("");
  const [signal, setSignal] = useState("All");
  const [sector, setSector] = useState("All");
  const [maxPE, setMaxPE] = useState(100);
  const [minVolume, setMinVolume] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = mockStocks.filter(s => {
    const matchSearch =
      s.ticker.toLowerCase().includes(search.toLowerCase()) ||
      s.company.toLowerCase().includes(search.toLowerCase());
    const matchSignal = signal === "All" || s.signal === signal;
    const matchSector = sector === "All" || s.sector === sector;
    const matchPE = s.pe <= maxPE;
    const volNum = parseFloat(s.volume.replace("M", "")) * 1e6;
    const matchVol = volNum >= minVolume * 1e6;
    return matchSearch && matchSignal && matchSector && matchPE && matchVol;
  });

  const clearFilters = () => {
    setSearch("");
    setSignal("All");
    setSector("All");
    setMaxPE(100);
    setMinVolume(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#F9FAFB" }}>Stock Screener</h1>
          <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
            {filtered.length} stocks match your criteria
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
          style={{
            background: showFilters ? "rgba(59,130,246,0.15)" : "#111827",
            color: showFilters ? "#3B82F6" : "#9CA3AF",
            border: `1px solid ${showFilters ? "rgba(59,130,246,0.3)" : "#1F2937"}`,
            cursor: "pointer",
          }}
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: "#111827", border: "1px solid #1F2937" }}
      >
        <Search size={16} style={{ color: "#9CA3AF" }} />
        <input
          type="text"
          placeholder="Search by ticker or company name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#F9FAFB" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="rounded-xl p-5 space-y-5" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>Filters</h3>
            <button
              onClick={clearFilters}
              className="text-xs flex items-center gap-1 transition-colors duration-150"
              style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
            >
              <X size={12} /> Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {/* Signal */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: "#9CA3AF" }}>Signal</label>
              <div className="flex flex-wrap gap-1.5">
                {SIGNALS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSignal(s)}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150"
                    style={{
                      background: signal === s ? "rgba(59,130,246,0.2)" : "#0D1117",
                      color: signal === s ? "#3B82F6" : "#9CA3AF",
                      border: `1px solid ${signal === s ? "rgba(59,130,246,0.4)" : "#1F2937"}`,
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium block mb-2" style={{ color: "#9CA3AF" }}>Sector</label>
              <div className="flex flex-wrap gap-1.5">
                {SECTORS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSector(s)}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150"
                    style={{
                      background: sector === s ? "rgba(59,130,246,0.2)" : "#0D1117",
                      color: sector === s ? "#3B82F6" : "#9CA3AF",
                      border: `1px solid ${sector === s ? "rgba(59,130,246,0.4)" : "#1F2937"}`,
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* P/E */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: "#9CA3AF" }}>
                Max P/E Ratio: <span style={{ color: "#F9FAFB" }}>{maxPE}x</span>
              </label>
              <input
                type="range"
                min={5}
                max={100}
                value={maxPE}
                onChange={e => setMaxPE(Number(e.target.value))}
                className="w-full accent-blue-500"
                style={{ accentColor: "#3B82F6" }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#9CA3AF" }}>
                <span>5x</span><span>100x</span>
              </div>
            </div>
          </div>

          {/* Min Volume */}
          <div className="max-w-xs">
            <label className="text-xs font-medium block mb-2" style={{ color: "#9CA3AF" }}>
              Min Volume: <span style={{ color: "#F9FAFB" }}>{minVolume}M+</span>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={minVolume}
              onChange={e => setMinVolume(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "#3B82F6" }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: "#9CA3AF" }}>
              <span>0M</span><span>50M</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <StockTable stocks={filtered} />

      {filtered.length === 0 && (
        <div className="text-center py-16" style={{ color: "#9CA3AF" }}>
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No stocks match your filters. Try adjusting the criteria.</p>
        </div>
      )}
    </div>
  );
}
