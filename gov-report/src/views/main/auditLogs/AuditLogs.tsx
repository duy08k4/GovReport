import React, { useState, useMemo } from "react";
import AuditLogsHeader from "./components/AuditLogsHeader";
import AuditLogsMetrics from "./components/AuditLogsMetrics";
import AuditLogsFilter from "./components/AuditLogsFilter";
import AuditLogsTable from "./components/AuditLogsTable";
import AuditDataDiffInspector from "./components/AuditDataDiffInspector";
import AuditIntegrityModal from "./components/AuditIntegrityModal";
import { MOCK_AUDIT_LOGS } from "./mockData";
import { AuditLogRecord, AuditFilterState } from "./types";

const INITIAL_FILTERS: AuditFilterState = {
  action: "ALL",
  targetTable: "ALL",
  actorQuery: "",
  timeRange: "7D",
  ipAddress: "",
};

const AuditLogs: React.FC = () => {
  const [filters, setFilters] = useState<AuditFilterState>(INITIAL_FILTERS);
  const [activeRecord, setActiveRecord] = useState<AuditLogRecord | null>(
    MOCK_AUDIT_LOGS[0]
  );
  const [isDiffViewerOpen, setIsDiffViewerOpen] = useState(true);
  const [isIntegrityModalOpen, setIsIntegrityModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFilterChange = <K extends keyof AuditFilterState>(
    key: K,
    value: AuditFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast("Đã thiết lập lại toàn bộ bộ lọc kiểm toán");
  };

  // Filter records
  const filteredRecords = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter((record) => {
      if (filters.action !== "ALL" && record.action !== filters.action) {
        return false;
      }
      if (
        filters.targetTable !== "ALL" &&
        record.targetTable !== filters.targetTable
      ) {
        return false;
      }
      if (filters.actorQuery.trim()) {
        const query = filters.actorQuery.toLowerCase();
        const matchesName = record.actor.name.toLowerCase().includes(query);
        const matchesId = record.actor.id.toLowerCase().includes(query);
        const matchesRole = record.actor.role.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesRole) {
          return false;
        }
      }
      if (filters.ipAddress.trim()) {
        if (!record.ipAddress.includes(filters.ipAddress.trim())) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  // Inspect record handler
  const handleInspectRecord = (record: AuditLogRecord) => {
    setActiveRecord(record);
    setIsDiffViewerOpen(true);
  };

  // Export report
  const handleExportReport = () => {
    showToast(
      "Đã kết xuất trích lục hồ sơ thanh tra mật (Định dạng PDF/A-3 có chữ ký số điện tử)!"
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-surface px-4 py-3 rounded shadow-xl flex items-center gap-2 border border-secondary-fixed/40 animate-bounce">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
            verified
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

      {/* 1. Page Context & Integrity Status Bar */}
      <AuditLogsHeader
        onVerifyHash={() => setIsIntegrityModalOpen(true)}
        onExportReport={handleExportReport}
      />

      {/* 2. Operational Metric Tiles */}
      <AuditLogsMetrics />

      {/* 3. Multi-parameter Operational Filter Console */}
      <AuditLogsFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* 4. Immutable Audit Log Data Table */}
      <AuditLogsTable
        records={filteredRecords}
        activeRecordId={isDiffViewerOpen ? activeRecord?.id || null : null}
        onInspectRecord={handleInspectRecord}
      />

      {/* 5. Data Diff Viewer Container (Can be toggled or reviewed in place) */}
      {isDiffViewerOpen && activeRecord && (
        <AuditDataDiffInspector
          record={activeRecord}
          onClose={() => setIsDiffViewerOpen(false)}
        />
      )}

      {/* 6. Notification Banner Modal Simulation for Integrity Verification */}
      <AuditIntegrityModal
        isOpen={isIntegrityModalOpen}
        onClose={() => setIsIntegrityModalOpen(false)}
      />
    </div>
  );
};

export default AuditLogs;
