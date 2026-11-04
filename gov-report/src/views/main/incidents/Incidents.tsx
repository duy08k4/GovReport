import React, { useState, useMemo } from "react";
import IncidentHeader from "./components/IncidentHeader";
import IncidentMetricsBento from "./components/IncidentMetricsBento";
import IncidentFilterPanel from "./components/IncidentFilterPanel";
import IncidentStreamTable from "./components/IncidentStreamTable";
import IncidentDetailDrawer from "./components/IncidentDetailDrawer";
import { MOCK_INCIDENTS, GEO_CONFLICT_ALERTS } from "./mockData";
import { IncidentItem } from "./types";

const Incidents: React.FC = () => {
  const [incidentsList, setIncidentsList] = useState<IncidentItem[]>(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(null);

  // Filters state
  const [ticketCode, setTicketCode] = useState("");
  const [tenantFilter, setTenantFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // UI state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Quick action: Filter Urgent
  const handleFilterUrgent = () => {
    setPriorityFilter("urgent");
    showToast("Đã kích hoạt chế độ xem ưu tiên: Sự cố Khẩn Cấp (Urgent: 14)");
  };

  // Quick action: Export Report
  const handleExport = () => {
    showToast("Đã xuất báo cáo tác chiến định dạng PostGIS Shapefile/GeoJSON thành công!");
  };

  // Quick action: Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Dữ liệu luồng sự cố trực tuyến PostGIS đã đồng bộ tức thì (4ms)");
    }, 600);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setTicketCode("");
    setTenantFilter("all");
    setCategoryFilter("all");
    setPriorityFilter("all");
    setStatusFilter("all");
    showToast("Đã thiết lập lại toàn bộ bộ lọc đa tuyến");
  };

  // Filtered list
  const filteredIncidents = useMemo(() => {
    return incidentsList.filter((item) => {
      if (
        ticketCode.trim() &&
        !item.code.toLowerCase().includes(ticketCode.toLowerCase()) &&
        !item.title.toLowerCase().includes(ticketCode.toLowerCase()) &&
        !item.address.toLowerCase().includes(ticketCode.toLowerCase())
      ) {
        return false;
      }

      if (tenantFilter !== "all" && item.agencyTenantId !== tenantFilter) {
        return false;
      }

      if (categoryFilter !== "all" && item.categoryId !== categoryFilter) {
        return false;
      }

      if (priorityFilter !== "all" && item.priority !== priorityFilter) {
        return false;
      }

      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [incidentsList, ticketCode, tenantFilter, categoryFilter, priorityFilter, statusFilter]);

  // When clicking an incident row (toggle selection if clicking the same one)
  const handleSelectIncident = (item: IncidentItem) => {
    setSelectedIncident((prev) => (prev?.id === item.id ? null : item));
  };

  // Handle successful override
  const handleOverrideSuccess = (incidentId: string, targetAgency: string, _reason: string) => {
    setIncidentsList((prev) =>
      prev.map((item) =>
        item.id === incidentId
          ? {
              ...item,
              agency: targetAgency,
              agencyWarning: "Đã qua thẩm quyền Root Override",
              status: "in_progress",
              slaRemaining: "Còn 30 phút",
              isSpinning: true,
              isBreached: false,
            }
          : item
      )
    );

    setSelectedIncident((prev) => {
      if (prev && prev.id === incidentId) {
        return {
          ...prev,
          agency: targetAgency,
          agencyWarning: "Đã qua thẩm quyền Root Override",
          status: "in_progress",
          slaRemaining: "Còn 30 phút",
          isSpinning: true,
          isBreached: false,
        };
      }
      return prev;
    });

    const targetItem = incidentsList.find((i) => i.id === incidentId);
    showToast(`Đã điều chuyển sự cố ${targetItem?.code || ""} sang ${targetAgency}`);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Toast banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-surface px-4 py-3 rounded shadow-xl flex items-center gap-2 border border-secondary-fixed/40 animate-bounce">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
            info
          </span>
          <span className="font-label-md text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-surface/70 hover:text-surface cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* 1. Operational Stats Header Strip */}
      <IncidentHeader
        onFilterUrgent={handleFilterUrgent}
        onExport={handleExport}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 2. Operational Metrics Bento Banner */}
      <IncidentMetricsBento />

      {/* 3. Multi-Criteria Dispatch Filter Panel */}
      <IncidentFilterPanel
        ticketCode={ticketCode}
        onTicketCodeChange={setTicketCode}
        tenantFilter={tenantFilter}
        onTenantFilterChange={setTenantFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onReset={handleResetFilters}
      />

      {/* 4. Incident Operations Center: Data Grid & Details Splitting */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* Left Main Grid: 12 cols when no selection, 7 cols when incident is selected */}
        <div className={selectedIncident ? "xl:col-span-7" : "xl:col-span-12"}>
          <IncidentStreamTable
            incidents={filteredIncidents}
            selectedIncidentId={selectedIncident?.id}
            onSelectIncident={handleSelectIncident}
            geoAlerts={GEO_CONFLICT_ALERTS}
          />
        </div>

        {/* Right Column: Incident Override Drawer (Only rendered when an incident is selected) */}
        {selectedIncident && (
          <div className="xl:col-span-5 animate-fadeIn">
            <IncidentDetailDrawer
              incident={selectedIncident}
              onClose={() => setSelectedIncident(null)}
              onRefreshData={handleRefresh}
              onOverrideSuccess={handleOverrideSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Incidents;
