import React from "react";

interface AccountsFilterMatrixProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}

const AccountsFilterMatrix: React.FC<AccountsFilterMatrixProps> = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  onReset,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
        {/* Search bar */}
        <div className="md:col-span-5 relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline">
            search
          </span>
          <input
            className="w-full h-10 pl-9 pr-space-md bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 border border-outline-variant/30 transition-all"
            id="filter-search"
            placeholder="Tìm theo tên cán bộ, CCCD, email, số điện thoại công vụ..."
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Role Filter */}
        <div className="md:col-span-3 relative">
          <select
            className="w-full h-10 px-3 pr-8 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 transition-all cursor-pointer appearance-none"
            id="filter-role"
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
          >
            <option value="all">Tất cả vai trò hệ thống</option>
            <option value="root_admin">Root Administrator (Quản trị tối cao)</option>
            <option value="operator">Operator (Điều hành viên)</option>
            <option value="cadre">Cán bộ hiện trường / Chuyên viên</option>
            <option value="citizen">Công dân (Citizen)</option>
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
            expand_more
          </span>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-2 relative">
          <select
            className="w-full h-10 px-3 pr-8 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 transition-all cursor-pointer appearance-none"
            id="filter-status"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="all">Trạng thái: Tất cả</option>
            <option value="active">Đã kích hoạt (Active)</option>
            <option value="blocked">Đã tạm khóa (Blocked)</option>
            <option value="pending">Chờ thẩm duyệt</option>
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
            expand_more
          </span>
        </div>

        {/* Reset Button */}
        <div className="md:col-span-2 flex items-center justify-end gap-space-xs">
          <button
            className="w-full h-10 px-3 bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium border border-outline-variant/20"
            onClick={onReset}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Active Tags Indicators */}
      <div className="flex flex-wrap items-center gap-space-xs mt-3 pt-3 border-t border-outline-variant/20 bg-surface-container-lowest">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
          Bộ lọc đang áp dụng:
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container text-on-surface text-[12px] font-label-sm">
          <span>Tất cả đơn vị trực thuộc</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[12px] font-label-sm font-medium">
          <span>VNeID: Đã định danh</span>
        </span>
        <span className="font-code-tabular text-[12px] text-on-surface-variant ml-auto font-medium">
          Hiển thị {filteredCount} / {totalCount.toLocaleString()} bản ghi
        </span>
      </div>
    </div>
  );
};

export default AccountsFilterMatrix;
