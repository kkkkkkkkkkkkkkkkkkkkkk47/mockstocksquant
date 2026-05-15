export default function SignalBadge({ signal, size = "sm" }) {
  const config = {
    Buy:  { bg: "rgba(34,197,94,0.15)",  color: "#22C55E", dot: "#22C55E" },
    Hold: { bg: "rgba(245,158,11,0.15)", color: "#F59E0B", dot: "#F59E0B" },
    Sell: { bg: "rgba(239,68,68,0.15)",  color: "#EF4444", dot: "#EF4444" },
  };

  const c = config[signal] || config["Hold"];
  const padding = size === "lg" ? "6px 14px" : "3px 10px";
  const fontSize = size === "lg" ? "13px" : "11px";

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-semibold"
      style={{ background: c.bg, color: c.color, padding, fontSize }}
    >
      <span
        className="rounded-full"
        style={{ width: 6, height: 6, background: c.dot, display: "inline-block" }}
      />
      {signal}
    </span>
  );
}
