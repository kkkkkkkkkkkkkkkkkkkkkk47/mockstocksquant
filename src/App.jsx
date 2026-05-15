import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MarketOverview from "./pages/MarketOverview";
import StockScreener from "./pages/StockScreener";
import StockDetail from "./pages/StockDetail";
import QuantSignals from "./pages/QuantSignals";
import PortfolioSimulator from "./pages/PortfolioSimulator";
import Watchlist from "./pages/Watchlist";
import Research from "./pages/Research";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/"          element={<MarketOverview />} />
          <Route path="/screener"  element={<StockScreener />} />
          <Route path="/stock/:ticker" element={<StockDetail />} />
          <Route path="/signals"   element={<QuantSignals />} />
          <Route path="/portfolio" element={<PortfolioSimulator />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/research"  element={<Research />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
