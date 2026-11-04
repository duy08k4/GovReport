import React from "react";

interface AgenciesHeaderProps {
  onOpenCreateDrawer: () => void;
  onExportCsv: () => void;
}

const AgenciesHeader: React.FC<AgenciesHeaderProps> = ({
  onOpenCreateDrawer,
  onExportCsv,
}) => {
  return (
    <div className="flex flex-col w-full mb-space-lg">
      {/* Breadcrumb & Metric Accent Strip */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            domain
          </span>
          <span className="uppercase tracking-wider">Hệ Thống Đa Chủ Thể (Multi-Tenant Hub)</span>
          <span>/</span>
          <span className="text-on-surface font-label-md text-label-md font-semibold">
            Đơn Vị &amp; Cơ Quan Tác Chiến
          </span>
        </div>
        <div className="flex items-center gap-space-md font-code-tabular text-code-tabular text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            <span>Phân vùng cơ quan: 63 Tỉnh/TP</span>
          </div>
          <div className="hidden md:block w-px h-3 bg-outline-variant/60" />
          <div className="hidden md:flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              database
            </span>
            <span>Mã hóa ranh giới: WGS84/VN-2000</span>
          </div>
        </div>
      </div>

      {/* Header & Master Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-space-xs mb-1">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary text-on-primary font-code-tabular text-[11px] font-semibold tracking-wider uppercase">
              REGISTRY v2.6
            </span>
            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
              Tài nguyên tổ chức hạ tầng
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface tracking-tight mb-space-xs font-bold">
            Quản Lý Đơn Vị &amp; Cơ Quan (Multi-tenant Registry)
          </h1>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant">
            Quản trị cơ quan hành chính các cấp và đơn vị hạ tầng đô thị trên toàn quốc. Cấu hình định danh, phân quyền chỉ huy và liên kết dữ liệu ranh giới địa lý.
          </p>
        </div>

        <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
          <button
            onClick={onExportCsv}
            className="h-9 px-space-md rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-1.5 border border-outline-variant/40 font-medium cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              file_download
            </span>
            <span>Xuất danh bạ Tenant (CSV)</span>
          </button>
          <button
            onClick={onOpenCreateDrawer}
            className="h-9 px-space-md rounded bg-primary-container text-surface font-label-md text-label-md hover:bg-primary transition-colors shadow-sm flex items-center gap-1.5 font-semibold cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Thêm mới cơ quan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgenciesHeader;
