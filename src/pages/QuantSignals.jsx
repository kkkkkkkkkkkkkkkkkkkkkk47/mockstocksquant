import { Zap, TrendingUp, Shield, Award, BarChart2, Target } from "lucide-react";
import { mockSignals, signalSummary } from "../data/mockSignals";
import SignalBadge from "../components/SignalBadge";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

function ScoreBar({ label, value, color, icon: Icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: `${color}20` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: "#9CA3AF" }}>{label}</span>
          <span style={{ color, fontWeight: 700 }}>{value}/100</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1F2937" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}60, ${color})` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function QuantSignals() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#F9FAFB" }}>Quant Signals</h1>
        <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
          AI-powered quantitative analysis across momentum, value, quality, and risk dimensions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Buy Signals",      value: signalSummary.buy,            color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
          { label: "Hold Signals",     value: signalSummary.hold,           color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
          { label: "Avg Confidence",   value: `${signalSummary.avgConfidence}%`, color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
          { label: "Avg Quant Score",  value: signalSummary.avgQuantScore,  color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
        ].map(c => (
          <div
            key={c.label}
            className="rounded-xl p-4 text-center"
            style={{ background: "#111827", border: "1px solid #1F2937" }}
          >
            <div className="text-xs mb-2" style={{ color: "#9CA3AF" }}>{c.label}</div>
            <div
              className="text-2xl font-black px-3 py-1 rounded-lg inline-block"
              style={{ background: c.bg, color: c.color }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Signal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockSignals.map(s => {
          const radarData = [
            { subject: "Momentum", value: s.momentum },
            { subject: "Value",    value: s.value },
            { subject: "Quality",  value: s.quality },
            { subject: "Risk",     value: s.risk },
            { subject: "Volatility", value: s.volatility },
          ];

          return (
            <div
              key={s.ticker}
              className="rounded-xl p-5 cursor-pointer transition-all duration-200"
              style={{ background: "#111827", border: "1px solid #1F2937" }}
              onClick={() => navigate(`/stock/${s.ticker}`)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#3B82F6";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#1F2937";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base" style={{ color: "#F9FAFB" }}>{s.ticker}</span>
                    <SignalBadge signal={s.signal} />
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{s.company}</p>
                </div>
                <div className="text-right">
                  <div
                    className="text-xl font-black px-2 py-0.5 rounded-lg"
                    style={{
                      background: s.quantScore >= 80 ? "rgba(34,197,94,0.15)" : s.quantScore >= 60 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                      color: s.quantScore >= 80 ? "#22C55E" : s.quantScore >= 60 ? "#F59E0B" : "#EF4444",
                    }}
                  >
                    {s.quantScore}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Quant Score</div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="h-36 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                    <PolarGrid stroke="#1F2937" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#9CA3AF", fontSize: 9 }} />
                    <Radar
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.2}
                      strokeWidth={1.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Score Bars */}
              <div className="space-y-2.5">
                <ScoreBar label="Momentum"  value={s.momentum}  color="#3B82F6" icon={TrendingUp} />
                <ScoreBar label="Value"     value={s.value}     color="#8B5CF6" icon={Award} />
                <ScoreBar label="Quality"   value={s.quality}   color="#22C55E" icon={BarChart2} />
                <ScoreBar label="Risk"      value={s.risk}      color="#EC4899" icon={Shield} />
              </div>

              {/* Footer */}
              <div
                className="mt-4 pt-4 flex items-center justify-between"
                style={{ borderTop: "1px solid #1F2937" }}
              >
                <div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Price Target</div>
                  <div className="text-sm font-bold" style={{ color: "#F9FAFB" }}>${s.priceTarget}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Upside</div>
                  <div className="text-sm font-bold" style={{ color: "#22C55E" }}>+{s.upside}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Confidence</div>
                  <div className="flex items-center gap-1 justify-end">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "#1F2937" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.confidence}%`, background: "#3B82F6" }}
                      />
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#3B82F6" }}>{s.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
