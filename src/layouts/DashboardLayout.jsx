import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#080B12" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "#080B12" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
