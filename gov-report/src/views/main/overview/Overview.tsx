import React, { useEffect } from "react";
import OverviewCommandBar from "./components/OverviewCommandBar";
import StatMetricCards from "./components/StatMetricCards";
import GisMapConsole from "./components/GisMapConsole";
import OperationalBroadcastRibbon from "./components/OperationalBroadcastRibbon";
import SlaRankingSection from "./components/SlaRankingSection";
import LiveAuditFeed from "./components/LiveAuditFeed";

const Overview: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full pb-space-lg">
      {/* Top Command Action Bar */}
      <OverviewCommandBar />

      {/* Row 1: 4 Flat Stat Metric Cards */}
      <StatMetricCards />

      {/* Main Work Center Layout: 65% / 35% Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column: GIS Map Console & Operational Ribbon (65% ~ 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <GisMapConsole />
          <OperationalBroadcastRibbon />
        </div>

        {/* Right Column: SLA Breach Ranking & Live Audit Feeds (35% ~ 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <SlaRankingSection />
          <LiveAuditFeed />
        </div>
      </div>
    </div>
  );
};

export default Overview;
