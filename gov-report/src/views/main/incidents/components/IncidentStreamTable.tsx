import React from "react";
import { IncidentItem, GeoConflictAlert } from "../types";

interface IncidentStreamTableProps {
  incidents: IncidentItem[];
  selectedIncidentId?: string | null;
  onSelectIncident: (incident: IncidentItem) => void;
  geoAlerts: GeoConflictAlert[];
}

const IncidentStreamTable: React.FC<IncidentStreamTableProps> = ({
  incidents,
  selectedIncidentId,
  onSelectIncident,
  geoAlerts,
}) => {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
        {/* Table Header Bar */}
        <div className="p-space-md flex flex-wrap items-center justify-between gap-2 bg-surface-container-lowest border-b border-outline-variant/30">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-lg sm:text-headline-sm text-on-surface font-bold">
              Danh Sách Phản Ánh Trực Tuyến
            </span>
            <span className="px-2 py-0.5 bg-surface-container font-code-tabular text-xs text-on-surface-variant font-medium">
              {incidents.length} / 142 sự cố lọc
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Tự động tải lại:
            </span>
            <span className="font-code-tabular text-code-tabular text-secondary font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-ping" />
              10s
            </span>
          </div>
        </div>

        {/* Table Stream View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase font-semibold border-b border-outline-variant/30">
                <th className="py-2.5 px-3">Mã Ticket • Gửi Lúc</th>
                <th className="py-2.5 px-3">Loại Sự Cố &amp; Tiêu Đề</th>
                <th className="py-2.5 px-3">Địa Bàn &amp; Tọa Độ</th>
                <th className="py-2.5 px-3">Cơ Quan Thụ Lý</th>
                <th className="py-2.5 px-3">Mức Độ</th>
                <th className="py-2.5 px-3">Trạng Thái</th>
                <th className="py-2.5 px-3">Hạn Định SLA</th>
                <th className="py-2.5 px-3 text-right">Can Thiệp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">
                      inbox
                    </span>
                    <p className="font-medium">Không tìm thấy sự cố phù hợp với bộ lọc hiện tại</p>
                  </td>
                </tr>
              ) : (
                incidents.map((item) => {
                  const isSelected = item.id === selectedIncidentId;
                  const isBreached = item.isBreached;

                  let rowBgClass = "hover:bg-surface-container-low";
                  if (isSelected) {
                    rowBgClass = "bg-secondary-fixed/20 hover:bg-secondary-fixed/30";
                  } else if (isBreached) {
                    rowBgClass = "bg-error-container/20 hover:bg-error-container/30";
                  }

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectIncident(item)}
                      className={`${rowBgClass} cursor-pointer transition-colors`}
                    >
                      {/* Ticket Code & Time */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        <div className="flex flex-col">
                          <span
                            className={`font-code-tabular text-code-tabular font-bold ${
                              isSelected
                                ? "text-secondary"
                                : isBreached
                                ? "text-error"
                                : "text-on-surface"
                            }`}
                          >
                            {item.code}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {item.timeAgo}
                          </span>
                        </div>
                      </td>

                      {/* Title & Category */}
                      <td className="py-3 px-3 align-top">
                        <div className="flex flex-col min-w-[170px]">
                          <span className="font-label-md text-label-md text-on-surface line-clamp-1 font-semibold">
                            {item.title}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            {item.category}
                          </span>
                        </div>
                      </td>

                      {/* Location & GPS */}
                      <td className="py-3 px-3 align-top">
                        <div className="flex flex-col min-w-[150px]">
                          <span className="font-body-sm text-body-sm text-on-surface line-clamp-1">
                            {item.address}
                          </span>
                          <span className="font-code-tabular text-code-tabular text-secondary flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[13px]">
                              pin_drop
                            </span>
                            {item.coordinates}
                          </span>
                        </div>
                      </td>

                      {/* Agency */}
                      <td className="py-3 px-3 align-top">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium block">
                          {item.agency}
                        </span>
                        {item.agencyWarning && (
                          <span
                            className={`block font-label-sm text-label-sm ${
                              item.agencyWarning.includes("Sai") ||
                              item.agencyWarning.includes("Chưa")
                                ? "text-error font-medium"
                                : "text-on-surface-variant"
                            }`}
                          >
                            {item.agencyWarning}
                          </span>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        {item.priority === "urgent" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-error-container text-error font-label-sm text-[11px] font-bold">
                            KHẨN CẤP
                          </span>
                        )}
                        {item.priority === "high" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-primary-fixed text-primary font-label-sm text-[11px] font-bold">
                            CAO
                          </span>
                        )}
                        {item.priority === "normal" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container text-on-surface font-label-sm text-[11px] font-semibold">
                            BÌNH THƯỜNG
                          </span>
                        )}
                        {item.priority === "low" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                            THẤP
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        {isBreached ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">
                            TRỄ HẠN
                          </span>
                        ) : item.status === "in_progress" ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[11px] font-semibold">
                            ĐANG XỬ LÝ
                          </span>
                        ) : item.status === "received" ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container text-on-surface font-label-sm text-[11px] font-semibold">
                            TIẾP NHẬN
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                            {item.statusLabel}
                          </span>
                        )}
                      </td>

                      {/* SLA Remaining */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        {isBreached ? (
                          <span className="font-code-tabular text-code-tabular text-error font-bold tracking-tight">
                            {item.slaRemaining}
                          </span>
                        ) : (
                          <div
                            className={`flex items-center gap-1 font-code-tabular text-code-tabular font-semibold ${
                              item.isSpinning ? "text-error" : "text-on-surface-variant"
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[15px] ${
                                item.isSpinning ? "animate-spin text-error" : ""
                              }`}
                            >
                              {item.isSpinning ? "timelapse" : "timer"}
                            </span>
                            <span>{item.slaRemaining}</span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                        {isSelected ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectIncident(item);
                            }}
                            className="px-2 py-1 bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm font-semibold cursor-pointer"
                          >
                            Can Thiệp
                          </button>
                        ) : isBreached ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectIncident(item);
                            }}
                            className="px-2 py-1 bg-error text-on-error font-label-sm text-label-sm hover:opacity-90 transition-opacity font-semibold cursor-pointer"
                          >
                            Ép Điều Chuyển
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectIncident(item);
                            }}
                            className="px-2 py-1 bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors font-medium cursor-pointer"
                          >
                            Chi tiết
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Summary */}
        <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant border-t border-outline-variant/30">
          <div>
            Hiển thị <strong>1 - {Math.min(5, incidents.length)}</strong> trên{" "}
            <strong>142</strong> phản ánh đang mở
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-2.5 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container disabled:opacity-40 cursor-pointer border border-outline-variant/30"
              disabled
              type="button"
            >
              Trước
            </button>
            <span className="px-2 py-1 bg-primary text-on-primary font-semibold">1</span>
            <button
              className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container cursor-pointer border border-outline-variant/30"
              type="button"
            >
              2
            </button>
            <button
              className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container cursor-pointer border border-outline-variant/30"
              type="button"
            >
              3
            </button>
            <span className="px-1">...</span>
            <button
              className="px-2.5 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container cursor-pointer border border-outline-variant/30"
              type="button"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Spatial SLA Telemetry Card */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-base sm:text-headline-sm text-on-surface font-bold">
            Cảnh Báo Điểm Nghẽn Ranh Giới (Geo-Conflict Alerts)
          </span>
          <span className="font-label-sm text-label-sm text-error bg-error-container px-2 py-0.5 font-bold">
            3 Điểm Tranh Chấp
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm mt-2">
          {geoAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-space-sm bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20 hover:border-outline-variant/50 transition-colors"
            >
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {alert.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {alert.description}
              </span>
              <span
                className={`font-code-tabular text-code-tabular mt-1 font-bold ${
                  alert.isUrgent ? "text-error" : "text-secondary"
                }`}
              >
                {alert.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentStreamTable;
