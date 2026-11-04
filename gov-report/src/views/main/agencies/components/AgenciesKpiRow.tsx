import React from "react";

const AgenciesKpiRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
      {/* KPI 1 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
          <span className="font-label-sm text-label-sm uppercase font-semibold">
            Tổng số cơ quan
          </span>
          <span className="material-symbols-outlined text-[20px] text-secondary">
            corporate_fare
          </span>
        </div>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface">
            128
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            thực thể
          </span>
        </div>
        <span className="font-code-tabular text-[11px] text-tertiary-fixed-variant mt-space-xs flex items-center gap-1 font-medium">
          <span className="material-symbols-outlined text-[13px] text-on-tertiary-container">
            check_circle
          </span>{" "}
          124 cơ quan đang trực tuyến
        </span>
      </div>

      {/* KPI 2 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
          <span className="font-label-sm text-label-sm uppercase font-semibold">
            Cơ quan Hành chính (UBND)
          </span>
          <span className="material-symbols-outlined text-[20px] text-primary">
            account_balance
          </span>
        </div>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface">
            76
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            đơn vị
          </span>
        </div>
        <span className="font-code-tabular text-[11px] text-on-surface-variant mt-space-xs">
          Tỉnh/TP: 14 • Quận/Huyện: 62
        </span>
      </div>

      {/* KPI 3 */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
          <span className="font-label-sm text-label-sm uppercase font-semibold">
            Đơn vị chuyên ngành
          </span>
          <span className="material-symbols-outlined text-[20px] text-secondary">
            construction
          </span>
        </div>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface">
            52
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Sở / DN Công ích
          </span>
        </div>
        <span className="font-code-tabular text-[11px] text-on-surface-variant mt-space-xs">
          Giao thông, Cây xanh, Thoát nước
        </span>
      </div>

      {/* KPI 4: Đội / Tổ Tác Chiến */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
          <span className="font-label-sm text-label-sm uppercase font-semibold">
            Đội / Tổ Tác Chiến
          </span>
          <span className="material-symbols-outlined text-[20px] text-secondary">
            groups
          </span>
        </div>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-headline-lg text-2xl sm:text-headline-lg font-bold text-on-surface">
            342
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            đội cơ động
          </span>
        </div>
        <span className="font-code-tabular text-[11px] text-on-surface-variant mt-space-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[13px] text-tertiary">
            check_circle
          </span>
          1,480 thành viên • 89% sẵn sàng trực
        </span>
      </div>
    </div>
  );
};

export default AgenciesKpiRow;
