import React from "react";
import { AuditFilterState } from "../types";

interface AuditLogsFilterProps {
  filters: AuditFilterState;
  onFilterChange: <K extends keyof AuditFilterState>(
    key: K,
    value: AuditFilterState[K]
  ) => void;
  onReset: () => void;
}

const AuditLogsFilter: React.FC<AuditLogsFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="p-space-md rounded bg-surface-container-lowest shadow-sm mb-space-lg flex flex-col gap-space-md border border-outline-variant/30">
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[18px]">
            tune
          </span>
          <span className="font-label-lg text-label-lg text-on-surface font-bold">
            Bộ lọc kiểm toán chuyên sâu
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-secondary font-label-md text-label-md hover:underline flex items-center gap-1 cursor-pointer font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span>Đặt lại bộ lọc</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {/* Filter 1: Action */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Hành động kiểm toán (action)
          </label>
          <div className="relative">
            <select
              value={filters.action}
              onChange={(e) => onFilterChange("action", e.target.value)}
              className="w-full h-9 px-space-sm pr-8 bg-surface-container-low text-on-surface rounded font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
            >
              <option value="ALL">Tất cả hành động</option>
              <option value="OVERRIDE_ROUTING">OVERRIDE_ROUTING (Can thiệp luồng)</option>
              <option value="UPDATE_GIS">UPDATE_GIS (Sửa ranh giới)</option>
              <option value="ASSIGN_CADRE">ASSIGN_CADRE (Giao cán bộ)</option>
              <option value="BLOCK_ACCOUNT">BLOCK_ACCOUNT (Khóa tài khoản)</option>
              <option value="UPDATE_SLA">UPDATE_SLA (Thay đổi thời hạn)</option>
              <option value="LOGIN">LOGIN (Đăng nhập hệ thống)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Filter 2: Target Table */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Bảng dữ liệu can thiệp (target_table)
          </label>
          <div className="relative">
            <select
              value={filters.targetTable}
              onChange={(e) => onFilterChange("targetTable", e.target.value)}
              className="w-full h-9 px-space-sm pr-8 bg-surface-container-low text-on-surface rounded font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
            >
              <option value="ALL">Tất cả bảng cơ sở dữ liệu</option>
              <option value="reports">reports (Sự cố hạ tầng)</option>
              <option value="tenants">tenants (Cơ quan hành chính)</option>
              <option value="tenant_boundaries">tenant_boundaries (Đa giác GIS)</option>
              <option value="categories">categories (Danh mục xử lý)</option>
              <option value="users">users (Danh bạ cán bộ)</option>
              <option value="leader_sensitive_profiles">leader_sensitive_profiles (Hồ sơ nhạy cảm)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Filter 3: User/Actor */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Người thực hiện (User ID / Name)
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.actorQuery}
              onChange={(e) => onFilterChange("actorQuery", e.target.value)}
              placeholder="Nhập tên hoặc mã định danh..."
              className="w-full h-9 pl-8 pr-space-sm bg-surface-container-low text-on-surface rounded font-code-tabular text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 transition-colors"
            />
            <span className="material-symbols-outlined absolute left-2 top-2 text-[18px] text-outline">
              search
            </span>
          </div>
        </div>

        {/* Filter 4: Time Range */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Dải thời gian kiểm toán
          </label>
          <div className="relative">
            <select
              value={filters.timeRange}
              onChange={(e) => onFilterChange("timeRange", e.target.value)}
              className="w-full h-9 px-space-sm pr-8 bg-surface-container-low text-on-surface rounded font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
            >
              <option value="TODAY">Hôm nay (00:00:00 - Hiện tại)</option>
              <option value="7D">7 ngày vừa qua</option>
              <option value="30D">30 ngày vừa qua</option>
              <option value="CUSTOM">Khoảng tùy chọn (Thanh tra vụ việc)...</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Filter 5: IP Address */}
        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Địa chỉ IP thực hiện
          </label>
          <input
            type="text"
            value={filters.ipAddress}
            onChange={(e) => onFilterChange("ipAddress", e.target.value)}
            placeholder="VD: 14.225.210.45"
            className="h-9 px-space-sm bg-surface-container-low text-on-surface rounded font-code-tabular text-body-sm focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default AuditLogsFilter;
