import React from "react";

const IncidentMetricsBento: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
      {/* Metric 1 */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
            Tổng Sự Cố Trong Ngày
          </span>
          <span className="material-symbols-outlined text-secondary text-[20px]">
            radar
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline justify-between">
          <span className="font-headline-xl text-3xl font-bold text-on-surface font-code-tabular">
            1,428
          </span>
          <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold flex items-center">
            +4.2% so hôm qua
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
          <div className="bg-secondary h-1 w-3/4" />
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-error">
          <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
            Vi Phạm Hạn Định SLA
          </span>
          <span className="material-symbols-outlined text-error text-[20px]">
            alarm_off
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline justify-between">
          <span className="font-headline-xl text-3xl font-bold text-error font-code-tabular">
            09
          </span>
          <span className="font-code-tabular text-code-tabular text-error bg-error-container px-1.5 py-0.5 font-bold text-xs">
            Tắc nghẽn cao
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
          <div className="bg-error h-1 w-2/5" />
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
            Tỉ Lệ Độc Quyền PostGIS
          </span>
          <span className="material-symbols-outlined text-secondary text-[20px]">
            polyline
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline justify-between">
          <span className="font-headline-xl text-3xl font-bold text-on-surface font-code-tabular">
            98.4%
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Gán chuẩn ranh giới
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
          <div className="bg-secondary h-1 w-[98.4%]" />
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
            Lệnh Can Thiệp Hôm Nay
          </span>
          <span className="material-symbols-outlined text-secondary text-[20px]">
            published_with_changes
          </span>
        </div>
        <div className="mt-space-sm flex items-baseline justify-between">
          <span className="font-headline-xl text-3xl font-bold text-secondary font-code-tabular">
            37
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Root Overrides
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-1 mt-2 rounded-full overflow-hidden">
          <div className="bg-secondary h-1 w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default IncidentMetricsBento;
