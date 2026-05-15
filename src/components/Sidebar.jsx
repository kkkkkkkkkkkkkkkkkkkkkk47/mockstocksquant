import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Zap,
  Briefcase,
  Bookmark,
  BookOpen,
  ChevronRight,
  Activity,
} from "lucide-react";

const navItems = [
  { to: "/",          icon: LayoutDashboard, label: "Market Overview" },
  { to: "/screener",  icon: Search,          label: "Stock Screener" },
  { to: "/signals",   icon: Zap,             label: "Quant Signals" },
  { to: "/portfolio", icon: Briefcase,       label: "Portfolio" },
  { to: "/watchlist", icon: Bookmark,        label: "Watchlist" },
  { to: "/research",  icon: BookOpen,        label: "Research" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 z-40"
      style={{
        width: collapsed ? "64px" : "220px",
        background: "#0D1117",
        borderRight: "1px solid #1F2937",
        minWidth: collapsed ? "64px" : "220px",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: "1px solid #1F2937" }}
      >
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: 36, height: 36, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
        >
          <Activity size={18} color="#fff" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight" style={{ color: "#F9FAFB" }}>
            Quant<span style={{ color: "#3B82F6" }}>X</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 mb-1 rounded-lg transition-all duration-150 group ${
                isActive ? "nav-active" : "nav-inactive"
              }`
            }
            style={({ isActive }) => ({
              padding: collapsed ? "10px 14px" : "10px 12px",
              background: isActive ? "rgba(59,130,246,0.15)" : "transparent",
              color: isActive ? "#3B82F6" : "#9CA3AF",
              justifyContent: collapsed ? "center" : "flex-start",
            })}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium truncate">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center m-3 rounded-lg transition-colors duration-150"
        style={{
          padding: "8px",
          background: "#1F2937",
          color: "#9CA3AF",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#374151")}
        onMouseLeave={e => (e.currentTarget.style.background = "#1F2937")}
      >
        <ChevronRight
          size={16}
          style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s" }}
        />
      </button>
    </aside>
  );
}
