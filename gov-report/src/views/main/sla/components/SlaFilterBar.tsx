import React from "react";

interface SlaFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
  onRefresh: () => void;
}

const SlaFilterBar: React.FC<SlaFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  filteredCount,
  totalCount,
  onRefresh,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-space-sm mb-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-sm border border-outline-variant/30">
      <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full md:w-auto">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
            search
          </span>
          <input
            className="w-full h-9 pl-9 pr-3 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
            id="tableFilter"
            placeholder="Tìm kiếm theo mã, tên sự cố hoặc đơn vị..."
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            className="w-full sm:w-auto h-9 px-3 pr-8 rounded bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 shrink-0 cursor-pointer appearance-none"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="all">Tất cả trạng thái (Bật/Tắt)</option>
            <option value="active">Chỉ hiển thị đang kích hoạt</option>
            <option value="paused">Tạm dừng tiếp nhận</option>
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-2 pointer-events-none text-on-surface-variant text-[18px]">
            expand_more
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-xs w-full md:w-auto justify-between sm:justify-end">
        <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">
          Hiển thị: {filteredCount}/{totalCount} danh mục
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            className="p-2 rounded hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
            title="Làm mới dữ liệu"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">sync</span>
          </button>
          <button
            onClick={() => alert("Chức năng Tùy biến cột đang được cấu hình theo quyền hạn Root Admin.")}
            className="p-2 rounded hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
            title="Tùy biến cột"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">view_column</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlaFilterBar;
