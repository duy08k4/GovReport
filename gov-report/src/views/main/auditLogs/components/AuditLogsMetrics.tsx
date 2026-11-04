import React from "react";

const AuditLogsMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
      {/* Metric 1 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
            Tổng Bản Ghi Ghi Nhận
          </span>
          <span className="material-symbols-outlined text-secondary text-[20px]">
            database
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-code-tabular font-bold">
            1,842,903
          </span>
          <span className="font-label-sm text-label-sm text-tertiary-fixed-variant font-semibold">
            +128 hôm nay
          </span>
        </div>
        <div className="mt-space-xs w-full bg-surface-container rounded-full h-1 overflow-hidden">
          <div className="bg-secondary h-1 rounded-full w-full" />
        </div>
      </div>

      {/* Metric 2 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
            Can Thiệp Điều Phối (Manual Override)
          </span>
          <span className="material-symbols-outlined text-error text-[20px]">
            swap_calls
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg text-error font-code-tabular font-bold">
            47
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-code-tabular font-medium">
            Cần giải trình: <strong className="text-error font-bold">02</strong>
          </span>
        </div>
        <div className="mt-space-xs w-full bg-surface-container rounded-full h-1 overflow-hidden">
          <div className="bg-error h-1 rounded-full w-[24%]" />
        </div>
      </div>

      {/* Metric 3 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
            Hiệu Chỉnh Ranh Giới GIS
          </span>
          <span className="material-symbols-outlined text-secondary-container text-[20px]">
            polyline
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-code-tabular font-bold">
            12
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Phường/Xã thay đổi
          </span>
        </div>
        <div className="mt-space-xs w-full bg-surface-container rounded-full h-1 overflow-hidden">
          <div className="bg-secondary-fixed-dim h-1 rounded-full w-[45%]" />
        </div>
      </div>

      {/* Metric 4 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
            Khối Băm Gốc (Genesis Block)
          </span>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            lock
          </span>
        </div>
        <div className="mt-space-sm flex flex-col">
          <span className="font-code-tabular text-[12px] text-on-surface font-semibold truncate">
            000000000019d6689c085ae165831...
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-code-tabular">
            Ký số bởi Ban Cơ Yếu Chính Phủ
          </span>
        </div>
        <div className="mt-space-xs flex items-center gap-1 font-label-sm text-label-sm text-tertiary-fixed-variant font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
          Khớp hoàn toàn (100% Valid)
        </div>
      </div>
    </div>
  );
};

export default AuditLogsMetrics;
