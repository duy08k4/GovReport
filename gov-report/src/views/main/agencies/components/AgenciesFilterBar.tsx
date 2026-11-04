import React from "react";

interface AgenciesFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  viewMode: "table" | "tree";
  onViewModeChange: (mode: "table" | "tree") => void;
  adminLevel: string;
  onAdminLevelChange: (val: string) => void;
  agencyType: string;
  onAgencyTypeChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  gisBound: string;
  onGisBoundChange: (val: string) => void;
  displayedCount: number;
  totalCount: number;
}

const AgenciesFilterBar: React.FC<AgenciesFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  adminLevel,
  onAdminLevelChange,
  agencyType,
  onAgencyTypeChange,
  status,
  onStatusChange,
  gisBound,
  onGisBoundChange,
  displayedCount,
  totalCount,
}) => {
  return (
    <div className="p-space-md rounded bg-surface-container-lowest shadow-sm mb-space-md flex flex-col gap-space-md border border-outline-variant/30">
      {/* Top row: Search, Count & View Mode */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/40 shadow-inner transition-colors"
            placeholder="Tìm theo mã cơ quan, tên đơn vị, cấp trên..."
            type="text"
          />
        </div>

        {/* Quick Stats & Active View Toggles */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-space-md">
          <div className="font-code-tabular text-code-tabular text-on-surface-variant">
            Hiển thị <span className="font-bold text-on-surface">{displayedCount}</span> trên tổng số{" "}
            <span className="font-bold text-on-surface">{totalCount}</span> cơ quan
          </div>

          {/* View mode switcher */}
          <div className="flex items-center p-0.5 rounded bg-surface-container font-label-sm text-label-sm border border-outline-variant/40">
            <button
              onClick={() => onViewModeChange("table")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
                viewMode === "table"
                  ? "bg-surface-container-lowest text-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">table_rows</span>
              <span>Dạng Bảng Phẳng</span>
            </button>
            <button
              onClick={() => onViewModeChange("tree")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all ${
                viewMode === "tree"
                  ? "bg-surface-container-lowest text-primary-container font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>Dạng Cây Phân Cấp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm pt-space-xs">
        {/* Administrative Level */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Cấp hành chính
          </label>
          <div className="relative">
            <select
              value={adminLevel}
              onChange={(e) => onAdminLevelChange(e.target.value)}
              className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-outline-variant/40"
            >
              <option value="all">Tất cả cấp hành chính</option>
              <option value="province">Cấp Tỉnh / Thành phố trực thuộc</option>
              <option value="district">Cấp Quận / Huyện / Thị xã</option>
              <option value="commune">Cấp Xã / Phường / Thị trấn</option>
              <option value="enterprise">Doanh nghiệp sự nghiệp công</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>

        {/* Agency Type */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Loại hình đơn vị
          </label>
          <div className="relative">
            <select
              value={agencyType}
              onChange={(e) => onAgencyTypeChange(e.target.value)}
              className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-outline-variant/40"
            >
              <option value="all">Tất cả loại hình</option>
              <option value="administrative">Hành chính công (ADMINISTRATIVE)</option>
              <option value="sector">Đơn vị chuyên môn (SECTOR)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Trạng thái vận hành
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-outline-variant/40"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động (active)</option>
              <option value="inactive">Tạm ngừng (inactive)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>

        {/* GIS Layer Integration */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Ranh giới GIS Đã đồng bộ
          </label>
          <div className="relative">
            <select
              value={gisBound}
              onChange={(e) => onGisBoundChange(e.target.value)}
              className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest appearance-none cursor-pointer border border-outline-variant/40"
            >
              <option value="all">Tất cả liên kết GIS</option>
              <option value="synced">Đã gắn Polygon địa lý</option>
              <option value="not_synced">Chưa cấu hình ranh giới</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenciesFilterBar;
