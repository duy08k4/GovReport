import React, { useState } from "react";

const OverviewCommandBar: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<"today" | "7d" | "30d">(
    "today"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-lg gap-space-md">
      {/* Title & Technical Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 bg-secondary shrink-0" />
          <h1 className="font-headline-md text-lg sm:text-headline-md text-on-surface tracking-tight uppercase font-bold">
            Tổng Quan Hệ Thống Điều Phối &amp; Tác Chiến GIS
          </h1>
        </div>
        <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1">
          Dữ liệu giám sát thời gian thực toàn quốc • Động cơ phân tích không gian PostGIS 3.4 • Mã hệ thống: VN-GIS-8400
        </p>
      </div>

      {/* Date Filter & Realtime Auto-refresh */}
      <div className="flex items-center gap-space-xs bg-surface-container-lowest p-1 shadow-sm self-start md:self-auto border border-outline-variant/30 flex-wrap">
        <div className="inline-flex items-center">
          <button
            onClick={() => setSelectedRange("today")}
            className={`px-space-sm py-1.5 font-label-md text-label-md transition-colors ${
              selectedRange === "today"
                ? "bg-primary text-on-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
            type="button"
          >
            Hôm nay (Thời gian thực)
          </button>
          <button
            onClick={() => setSelectedRange("7d")}
            className={`px-space-sm py-1.5 font-label-md text-label-md transition-colors ${
              selectedRange === "7d"
                ? "bg-primary text-on-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
            type="button"
          >
            7 ngày qua
          </button>
          <button
            onClick={() => setSelectedRange("30d")}
            className={`px-space-sm py-1.5 font-label-md text-label-md transition-colors ${
              selectedRange === "30d"
                ? "bg-primary text-on-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
            type="button"
          >
            30 ngày qua
          </button>
        </div>

        <div className="h-4 w-px bg-outline-variant/60 mx-1 hidden sm:block" />

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 font-label-md text-label-md bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors shrink-0 font-medium"
          type="button"
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              isRefreshing ? "animate-spin" : "animate-spin"
            }`}
            style={{ animationDuration: isRefreshing ? "0.6s" : "4s" }}
          >
            autorenew
          </span>
          <span>Làm mới (4s)</span>
        </button>
      </div>
    </div>
  );
};

export default OverviewCommandBar;
