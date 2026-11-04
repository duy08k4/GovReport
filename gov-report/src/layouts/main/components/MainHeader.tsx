import React, { useState } from "react";

interface MainHeaderProps {
  onToggleSidebar: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/40 z-50 px-4 sm:px-space-md lg:px-space-lg flex items-center justify-between gap-space-md shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 -ml-1 mr-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container md:hidden transition-colors"
          type="button"
          aria-label="Mở danh mục điều hướng"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">
          account_balance
        </span>
        <span className="font-body-md text-body-md text-on-surface-variant whitespace-nowrap hidden sm:inline">
          Cổng Điều Phối Quốc Gia
        </span>
        <span className="material-symbols-outlined text-[14px] hidden sm:inline">
          chevron_right
        </span>
        <span className="font-label-lg text-label-lg text-on-surface truncate font-semibold">
          Phân Hệ Giám Sát
        </span>
      </div>

      {/* Middle: Global Search Input */}
      <div className="flex-1 max-w-md hidden md:flex items-center relative">
        <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline">
          search
        </span>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-9 pl-9 pr-4 rounded bg-surface-container-low border border-outline-variant font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:bg-surface-container-lowest transition-colors"
          placeholder="Tra cứu mã vé (TK-), cơ quan, mã cán bộ..."
          type="text"
        />
      </div>

      {/* Right: Telemetry & Status Badges, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-space-md shrink-0">
        {/* PostGIS Telemetry HUD status badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-container border border-outline-variant/60 font-code-tabular text-code-tabular text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />
          <span>PostGIS: 4ms | Trực tuyến</span>
        </div>

        {/* Urgent Notification Bell */}
        <button
          aria-label="Thông báo khẩn cấp"
          className="relative p-2 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest animate-pulse" />
        </button>

        {/* Root User Profile */}
        <div className="flex items-center gap-space-sm pl-space-xs border-l border-outline-variant/40">
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
              Root Administrator
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight text-[11px]">
              Trung tâm Điều hành GIS
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
