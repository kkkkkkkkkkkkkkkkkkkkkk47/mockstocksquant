import { useState } from "react";
import { BookOpen, Brain, TrendingUp, Globe, Shield, Newspaper, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { mockStocks } from "../data/mockStocks";
import SignalBadge from "../components/SignalBadge";
import { useNavigate } from "react-router-dom";

const researchData = {
  AAPL: {
    aiSummary: "Apple Inc. continues to demonstrate resilient fundamentals despite macro headwinds. The company's Services segment is emerging as the primary growth driver, with revenue growing 15% YoY to $23.1B in the latest quarter. iPhone 16 cycle demand has exceeded initial estimates, particularly in emerging markets. The Vision Pro ecosystem, while nascent, positions Apple for the next computing paradigm. Management's $90B buyback authorization signals strong confidence in long-term value creation.",
    earningsInsight: "Q1 FY2026 EPS of $2.18 beat consensus by $0.12. Revenue of $124.3B grew 4.2% YoY, driven by Services (+15%) and Wearables (+8%). iPhone revenue of $69.7B was slightly below expectations due to China softness. Gross margin expanded 80bps to 46.5%, reflecting favorable Services mix shift. Management guided Q2 revenue of $88-92B, in line with consensus.",
    macroImpact: "Fed rate cuts expected in H2 2026 are a tailwind for growth stocks. USD strength creates FX headwinds (~2% revenue impact). China economic slowdown poses risk to ~18% of revenue. Consumer spending resilience supports premium device demand. AI infrastructure buildout benefits Apple's chip ecosystem.",
    competitivePosition: "Apple maintains dominant smartphone market share in premium segment (>80% of >$800 phones). App Store ecosystem creates high switching costs. Services ARPU growing as installed base monetization deepens. Samsung and Google compete on hardware; no credible threat to ecosystem lock-in. Regulatory pressure on App Store fees is the primary competitive risk.",
    riskFactors: [
      "China revenue concentration (~18% of total) amid geopolitical tensions",
      "EU Digital Markets Act forcing App Store changes, potential revenue impact",
      "Antitrust scrutiny of App Store 30% commission model",
      "Supply chain concentration in Taiwan/China",
      "Slowing hardware upgrade cycles in saturated markets",
    ],
    recentNews: [
      { headline: "Apple Services Revenue Hits Record $23.1B in Q1 FY2026", source: "Bloomberg", time: "2h ago", sentiment: "positive" },
      { headline: "EU Fines Apple €1.8B Over App Store Antitrust Violations", source: "Reuters", time: "1d ago", sentiment: "negative" },
      { headline: "Apple Vision Pro 2 Rumored for Late 2026 Launch", source: "9to5Mac", time: "2d ago", sentiment: "positive" },
      { headline: "Berkshire Hathaway Maintains Apple as Largest Holding", source: "WSJ", time: "3d ago", sentiment: "positive" },
    ],
  },
};

function Section({ title, icon: Icon, color = "#3B82F6", children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111827", border: "1px solid #1F2937" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors duration-150"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#1F2937")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg" style={{ background: `${color}20` }}>
            <Icon size={14} style={{ color }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>{title}</span>
        </div>
        {open ? <ChevronUp size={15} style={{ color: "#9CA3AF" }} /> : <ChevronDown size={15} style={{ color: "#9CA3AF" }} />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

export default function Research() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("AAPL");
  const stock = mockStocks.find(s => s.ticker === selected) || mockStocks[0];
  const data = researchData[selected] || researchData["AAPL"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "#F9FAFB" }}>Research Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>AI-powered deep-dive analysis and investment research</p>
      </div>

      {/* Stock Selector */}
      <div className="flex flex-wrap gap-2">
        {mockStocks.slice(0, 8).map(s => (
          <button
            key={s.ticker}
            onClick={() => setSelected(s.ticker)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
            style={{
              background: selected === s.ticker ? "rgba(59,130,246,0.2)" : "#111827",
              color: selected === s.ticker ? "#3B82F6" : "#9CA3AF",
              border: `1px solid ${selected === s.ticker ? "rgba(59,130,246,0.4)" : "#1F2937"}`,
              cursor: "pointer",
            }}
          >
            {s.ticker}
          </button>
        ))}
      </div>

      {/* Stock Header */}
      <div
        className="rounded-xl p-5 flex flex-wrap items-center justify-between gap-4"
        style={{ background: "#111827", border: "1px solid #1F2937" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-black"
            style={{ background: "linear-gradient(135deg, #1E3A5F, #3B82F6)", color: "#F9FAFB" }}
          >
            {stock.ticker.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: "#F9FAFB" }}>{stock.ticker}</span>
              <SignalBadge signal={stock.signal} />
            </div>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>{stock.company} · {stock.sector}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-2xl font-black" style={{ color: "#F9FAFB" }}>${stock.price.toFixed(2)}</div>
            <div className="text-sm font-semibold" style={{ color: stock.changePct >= 0 ? "#22C55E" : "#EF4444" }}>
              {stock.changePct >= 0 ? "+" : ""}{stock.changePct.toFixed(2)}% today
            </div>
          </div>
          <button
            onClick={() => navigate(`/stock/${stock.ticker}`)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
            style={{ background: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.3)", cursor: "pointer" }}
          >
            Full Analysis →
          </button>
        </div>
      </div>

      {/* AI Summary */}
      <Section title="AI Stock Summary" icon={Sparkles} color="#8B5CF6">
        <div
          className="rounded-lg p-4"
          style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={14} style={{ color: "#8B5CF6" }} />
            <span className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>QuantX AI · Generated May 15, 2026</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{data.aiSummary}</p>
        </div>
      </Section>

      {/* Earnings */}
      <Section title="Earnings Insight" icon={TrendingUp} color="#22C55E">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { label: "EPS (Actual)",   value: `$${stock.eps}`,       vs: "+$0.12 beat" },
            { label: "Revenue",        value: stock.revenue,          vs: "+4.2% YoY" },
            { label: "Gross Margin",   value: stock.profitMargin,     vs: "+80bps" },
            { label: "Next Earnings",  value: "Jul 31",               vs: "~47 days" },
          ].map(m => (
            <div key={m.label} className="rounded-lg p-3 text-center" style={{ background: "#0D1117" }}>
              <div className="text-xs mb-1" style={{ color: "#9CA3AF" }}>{m.label}</div>
              <div className="text-sm font-bold" style={{ color: "#F9FAFB" }}>{m.value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#22C55E" }}>{m.vs}</div>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{data.earningsInsight}</p>
      </Section>

      {/* Macro */}
      <Section title="Macro Impact" icon={Globe} color="#3B82F6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {[
            { factor: "Fed Rate Policy",    impact: "Positive",  detail: "Rate cuts expected H2 2026" },
            { factor: "USD Strength",       impact: "Negative",  detail: "~2% FX revenue headwind" },
            { factor: "China Economy",      impact: "Negative",  detail: "Slowdown risk to 18% revenue" },
            { factor: "Consumer Spending",  impact: "Positive",  detail: "Resilient premium demand" },
          ].map(m => (
            <div key={m.factor} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#0D1117" }}>
              <div>
                <div className="text-sm font-medium" style={{ color: "#F9FAFB" }}>{m.factor}</div>
                <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{m.detail}</div>
              </div>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: m.impact === "Positive" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                  color: m.impact === "Positive" ? "#22C55E" : "#EF4444",
                }}
              >
                {m.impact}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{data.macroImpact}</p>
      </Section>

      {/* Competitive Position */}
      <Section title="Competitive Position" icon={BookOpen} color="#F59E0B">
        <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{data.competitivePosition}</p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Market Share",   value: "18%",   sub: "Global Smartphone" },
            { label: "Premium Share",  value: "80%+",  sub: ">$800 Segment" },
            { label: "Ecosystem",      value: "2.2B",  sub: "Active Devices" },
          ].map(m => (
            <div key={m.label} className="rounded-lg p-3 text-center" style={{ background: "#0D1117" }}>
              <div className="text-lg font-black" style={{ color: "#F59E0B" }}>{m.value}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: "#F9FAFB" }}>{m.label}</div>
              <div className="text-xs" style={{ color: "#9CA3AF" }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Risk Factors */}
      <Section title="Risk Factors" icon={Shield} color="#EF4444">
        <div className="space-y-2">
          {data.riskFactors.map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: "rgba(239,68,68,0.2)", color: "#EF4444" }}
              >
                {i + 1}
              </span>
              <p className="text-sm" style={{ color: "#D1D5DB" }}>{r}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Recent News */}
      <Section title="Recent News" icon={Newspaper} color="#9CA3AF">
        <div className="space-y-2">
          {data.recentNews.map((n, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-100"
              style={{ background: "#0D1117" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1F2937")}
              onMouseLeave={e => (e.currentTarget.style.background = "#0D1117")}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: n.sentiment === "positive" ? "#22C55E" : "#EF4444" }}
                />
                <p className="text-sm" style={{ color: "#F9FAFB" }}>{n.headline}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-xs" style={{ color: "#9CA3AF" }}>{n.source}</div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
