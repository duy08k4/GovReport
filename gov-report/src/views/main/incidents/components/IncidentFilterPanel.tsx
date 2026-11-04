import React from "react";

interface IncidentFilterPanelProps {
  ticketCode: string;
  onTicketCodeChange: (value: string) => void;
  tenantFilter: string;
  onTenantFilterChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onReset: () => void;
}

const IncidentFilterPanel: React.FC<IncidentFilterPanelProps> = ({
  ticketCode,
  onTicketCodeChange,
  tenantFilter,
  onTenantFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  onReset,
}) => {
  return (
    <section className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface font-bold">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            tune
          </span>
          <span>Bộ Lọc Điều Phối Sự Cố Đa Tuyến</span>
        </div>
        <button
          onClick={onReset}
          className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1 cursor-pointer font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[14px]">refresh</span>
          <span>Đặt lại bộ lọc</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-space-sm">
        {/* Search code */}
        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-2">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant font-medium"
            htmlFor="filter-ticket"
          >
            Mã vé phản ánh (ticket_code)
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[18px] text-outline">
              search
            </span>
            <input
              className="w-full h-9 pl-9 pr-3 bg-surface-container-low font-code-tabular text-code-tabular text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-colors border border-outline-variant/30"
              id="filter-ticket"
              placeholder="VD: SC-2026-HN01..."
              type="text"
              value={ticketCode}
              onChange={(e) => onTicketCodeChange(e.target.value)}
            />
          </div>
        </div>

        {/* Tenants */}
        <div className="flex flex-col gap-1 relative">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant font-medium"
            htmlFor="filter-tenant"
          >
            Cơ quan phụ trách
          </label>
          <div className="relative">
            <select
              className="w-full h-9 px-2 pr-7 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
              id="filter-tenant"
              value={tenantFilter}
              onChange={(e) => onTenantFilterChange(e.target.value)}
            >
              <option value="all">Tất cả đơn vị</option>
              <option value="ubnd-hoankiem">UBND Quận Hoàn Kiếm</option>
              <option value="sgtvt-hanoi">Sở GTVT Hà Nội</option>
              <option value="socongthuong">Sở Công Thương</option>
              <option value="evn-hanoi">Tổng Công ty Điện Lực HN</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1 relative">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant font-medium"
            htmlFor="filter-category"
          >
            Danh mục sự cố
          </label>
          <div className="relative">
            <select
              className="w-full h-9 px-2 pr-7 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
              id="filter-category"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              <option value="drainage">Thoát nước &amp; Hố ga</option>
              <option value="electric">Cáp viễn thông &amp; Điện lực</option>
              <option value="roads">Đường bộ &amp; Giao thông</option>
              <option value="trees">Cây xanh gãy đổ</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1 relative">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant font-medium"
            htmlFor="filter-priority"
          >
            Mức độ ưu tiên
          </label>
          <div className="relative">
            <select
              className="w-full h-9 px-2 pr-7 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
              id="filter-priority"
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
            >
              <option value="all">Tất cả mức độ</option>
              <option value="urgent">Khẩn cấp (Urgent)</option>
              <option value="high">Cao (High)</option>
              <option value="normal">Bình thường (Normal)</option>
              <option value="low">Thấp (Low)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 relative">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant font-medium"
            htmlFor="filter-status"
          >
            Trạng thái xử lý
          </label>
          <div className="relative">
            <select
              className="w-full h-9 px-2 pr-7 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30 cursor-pointer appearance-none"
              id="filter-status"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="submitted">Mới gửi (submitted)</option>
              <option value="received">Đã tiếp nhận (received)</option>
              <option value="in_progress">Đang xử lý (in_progress)</option>
              <option value="resolved">Đã giải quyết (resolved)</option>
              <option value="rejected">Từ chối (rejected)</option>
              <option value="closed">Đã đóng (closed)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-on-surface-variant text-[16px]">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncidentFilterPanel;
