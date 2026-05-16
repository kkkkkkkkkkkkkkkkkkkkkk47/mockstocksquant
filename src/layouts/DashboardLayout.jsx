import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#080B12" }}>
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar />
        {/* Extra bottom padding on mobile so content clears the bottom nav */}
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6"
          style={{ background: "#080B12" }}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav — hidden on desktop */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
