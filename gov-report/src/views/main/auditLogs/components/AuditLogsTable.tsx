import React from "react";
import { AuditLogRecord } from "../types";

interface AuditLogsTableProps {
  records: AuditLogRecord[];
  activeRecordId: string | null;
  onInspectRecord: (record: AuditLogRecord) => void;
}

const AuditLogsTable: React.FC<AuditLogsTableProps> = ({
  records,
  activeRecordId,
  onInspectRecord,
}) => {
  const getActionBadge = (action: string) => {
    switch (action) {
      case "OVERRIDE_ROUTING":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-[#B45309]">
            OVERRIDE_ROUTING
          </span>
        );
      case "UPDATE_GIS":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-secondary">
            UPDATE_GIS
          </span>
        );
      case "UPDATE_SLA":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-primary-container">
            UPDATE_SLA
          </span>
        );
      case "BLOCK_ACCOUNT":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-error">
            BLOCK_ACCOUNT
          </span>
        );
      case "LOGIN":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-on-surface-variant">
            LOGIN
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-high text-on-surface">
            {action}
          </span>
        );
    }
  };

  return (
    <div className="rounded bg-surface-container-lowest shadow-sm overflow-hidden mb-space-lg flex flex-col border border-outline-variant/30">
      {/* Table Header Info */}
      <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-xs text-on-surface border-b border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <span className="font-label-lg text-label-lg font-bold">
            Nhật ký sự kiện thời gian thực
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container font-code-tabular text-label-sm text-on-surface-variant font-medium">
            {records.length} kết quả phù hợp
          </span>
        </div>
        <div className="flex items-center gap-space-xs font-code-tabular text-label-sm text-on-surface-variant">
          <span>Tự động đồng bộ chuỗi kiểm toán mỗi 10 giây</span>
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-ping" />
        </div>
      </div>

      {/* Table Canvas */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/60 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold border-b border-outline-variant/30">
              <th className="py-3 px-4">Mốc Thời Gian (UTC+7)</th>
              <th className="py-3 px-4">Cán Bộ Thực Hiện</th>
              <th className="py-3 px-4">Hành Động</th>
              <th className="py-3 px-4">Bảng Tác Động &amp; Khóa</th>
              <th className="py-3 px-4">Địa Chỉ IP &amp; Thiết Bị</th>
              <th className="py-3 px-4 text-right">Đối Soát Thay Đổi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container text-body-sm">
            {records.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">
                    history_toggle_off
                  </span>
                  <p className="font-medium">
                    Không tìm thấy bản ghi kiểm toán phù hợp với bộ lọc
                  </p>
                </td>
              </tr>
            ) : (
              records.map((log) => {
                const isActive = log.id === activeRecordId;
                return (
                  <tr
                    key={log.id}
                    className={`transition-colors ${
                      isActive
                        ? "bg-secondary-fixed/20 hover:bg-secondary-fixed/30"
                        : "hover:bg-surface-container-low"
                    }`}
                  >
                    {/* Timestamp & Hash Preview */}
                    <td className="py-3.5 px-4 font-code-tabular whitespace-nowrap">
                      <div className="text-on-surface font-semibold">{log.timestamp}</div>
                      <div className="text-outline text-label-sm">Băm: {log.hash}</div>
                    </td>

                    {/* Actor Details */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded flex items-center justify-center font-label-sm font-bold ${log.actor.avatarBg}`}
                        >
                          {log.actor.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {log.actor.name}
                          </span>
                          <span className="text-label-sm text-on-surface-variant font-code-tabular">
                            {log.actor.role} • {log.actor.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Action Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>

                    {/* Target Table & Key */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-code-tabular text-on-surface font-medium">
                          {log.targetTable}
                        </span>
                        <span className="font-code-tabular text-label-sm text-secondary hover:underline cursor-pointer">
                          {log.targetKey}
                        </span>
                      </div>
                    </td>

                    {/* IP & Device */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-code-tabular text-on-surface font-medium">
                          {log.ipAddress}
                        </span>
                        <span className="text-label-sm text-on-surface-variant truncate max-w-[150px]">
                          {log.deviceInfo}
                        </span>
                      </div>
                    </td>

                    {/* Action button */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onInspectRecord(log)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded font-label-md text-label-md transition-colors cursor-pointer font-semibold ${
                          isActive
                            ? "bg-secondary text-surface-container-lowest hover:bg-secondary/90 shadow-sm"
                            : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          compare_arrows
                        </span>
                        <span>Xem đối soát</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Chain Verification Footer */}
      <div className="p-space-md bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/30">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
          <span>Hiển thị 1 - {records.length} của 1,842,903 bản ghi</span>
          <span className="w-1 h-1 rounded-full bg-outline" />
          <span className="font-code-tabular text-secondary font-medium">
            Merkle Root: 9e20a4ff...6107
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded text-outline hover:bg-surface-container disabled:opacity-40 cursor-pointer"
            disabled
            type="button"
            title="Trang đầu"
          >
            <span className="material-symbols-outlined text-[18px]">first_page</span>
          </button>
          <button
            className="p-1.5 rounded text-outline hover:bg-surface-container disabled:opacity-40 cursor-pointer"
            disabled
            type="button"
            title="Trang trước"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <span className="px-3 py-1 rounded bg-primary-container text-surface-container-lowest font-code-tabular text-label-sm font-semibold">
            1
          </span>
          <button
            className="px-3 py-1 rounded hover:bg-surface-container text-on-surface font-code-tabular text-label-sm cursor-pointer"
            type="button"
          >
            2
          </button>
          <button
            className="px-3 py-1 rounded hover:bg-surface-container text-on-surface font-code-tabular text-label-sm cursor-pointer"
            type="button"
          >
            3
          </button>
          <span className="px-2 text-outline font-code-tabular text-label-sm">...</span>
          <button
            className="px-3 py-1 rounded hover:bg-surface-container text-on-surface font-code-tabular text-label-sm cursor-pointer"
            type="button"
          >
            368,581
          </button>
          <button
            className="p-1.5 rounded text-on-surface hover:bg-surface-container cursor-pointer"
            type="button"
            title="Trang sau"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
          <button
            className="p-1.5 rounded text-on-surface hover:bg-surface-container cursor-pointer"
            type="button"
            title="Trang cuối"
          >
            <span className="material-symbols-outlined text-[18px]">last_page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsTable;
