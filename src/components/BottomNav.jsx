import { NavLink } from "react-router-dom";
import { LayoutDashboard, Search, Zap, Briefcase, Bookmark, BookOpen } from "lucide-react";

const navItems = [
  { to: "/",          icon: LayoutDashboard, label: "Market" },
  { to: "/screener",  icon: Search,          label: "Screener" },
  { to: "/signals",   icon: Zap,             label: "Signals" },
  { to: "/portfolio", icon: Briefcase,       label: "Portfolio" },
  { to: "/watchlist", icon: Bookmark,        label: "Watchlist" },
  { to: "/research",  icon: BookOpen,        label: "Research" },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1 py-2"
      style={{
        background: "rgba(13,17,23,0.97)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid #1F2937",
        height: "64px",
      }}
    >
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-lg transition-all duration-150"
          style={({ isActive }) => ({
            color: isActive ? "#3B82F6" : "#6B7280",
            background: "transparent",
          })}
        >
          {({ isActive }) => (
            <>
              <div
                className="p-1 rounded-lg transition-all duration-150"
                style={{ background: isActive ? "rgba(59,130,246,0.15)" : "transparent" }}
              >
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
