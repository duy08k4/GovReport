import React from "react";

interface IncidentHeaderProps {
  onFilterUrgent: () => void;
  onExport: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const IncidentHeader: React.FC<IncidentHeaderProps> = ({
  onFilterUrgent,
  onExport,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md sm:p-space-lg shadow-sm border border-outline-variant/30">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 bg-error animate-pulse shrink-0 rounded-full" />
          <span className="font-label-sm text-label-sm text-error uppercase tracking-wider font-semibold">
            Hạ Tầng Khẩn Cấp • Cấp Độ 1
          </span>
          <span className="text-outline-variant">•</span>
          <span className="font-code-tabular text-code-tabular text-on-surface-variant font-medium">
            OPS-DISPATCH-NODE-03
          </span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface tracking-tight font-bold">
          Bàn Tác Chiến Giám Sát &amp; Can Thiệp Điều Phối Sự Cố
        </h1>
        <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant">
          Giám sát luồng phản ánh toàn quốc • Can thiệp điều chuyển sự cố vượt tuyến
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-space-sm shrink-0">
        <button
          onClick={onFilterUrgent}
          className="inline-flex items-center gap-space-xs h-9 px-space-md bg-error-container text-on-error-container font-label-lg text-label-lg transition-colors hover:bg-error hover:text-on-error cursor-pointer font-semibold shadow-xs"
          id="btn-quick-filter-urgent"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">emergency</span>
          <span>Lọc sự cố khẩn cấp (Urgent: 14)</span>
        </button>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-space-xs h-9 px-space-md bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/30 font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Xuất báo cáo tác chiến</span>
        </button>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center justify-center w-9 h-9 bg-primary-container text-on-primary-container hover:text-surface transition-colors cursor-pointer disabled:opacity-50"
          type="button"
          title="Làm mới luồng phản ánh"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isRefreshing ? "animate-spin text-secondary-fixed" : ""
            }`}
          >
            sync
          </span>
        </button>
      </div>
    </div>
  );
};

export default IncidentHeader;
