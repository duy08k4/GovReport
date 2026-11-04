import React from "react";

interface AccountsHeaderProps {
  activeTab: "users" | "tenants";
  onTabChange: (tab: "users" | "tenants") => void;
  onOpenAssignModal: () => void;
  onSyncSupabase: () => void;
  isSyncing: boolean;
}

const AccountsHeader: React.FC<AccountsHeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAssignModal,
  onSyncSupabase,
  isSyncing,
}) => {
  return (
    <div className="w-full bg-surface-container-lowest p-space-md sm:p-space-lg mb-space-md shadow-sm border border-outline-variant/30">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs mb-1">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
              Phân hệ RBAC &amp; Điều Phối Nhân Lực
            </span>
            <span className="text-outline-variant">/</span>
            <span className="font-code-tabular text-code-tabular text-on-surface-variant font-medium">
              SEC-LEVEL: L2-GOV
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface tracking-tight font-bold">
            Quản Trị Tài Khoản &amp; Phân Công Cán Bộ Công Quyền
          </h1>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant mt-0.5 max-w-4xl leading-relaxed">
            Kiểm soát ma trận phân quyền, xác thực danh tính điện tử VNeID và danh bạ điều hành cơ quan các cấp
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button
            onClick={onSyncSupabase}
            disabled={isSyncing}
            className={`inline-flex items-center gap-space-xs px-3.5 h-9 bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors border border-outline-variant/30 cursor-pointer font-medium ${
              isSyncing ? "opacity-60 pointer-events-none" : ""
            }`}
            id="btn-sync-supabase"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[18px] text-secondary ${
                isSyncing ? "animate-spin" : ""
              }`}
            >
              {isSyncing ? "sync" : "cloud_sync"}
            </span>
            <span>{isSyncing ? "Đang đồng bộ..." : "Đồng bộ Supabase Auth"}</span>
          </button>

          <button
            onClick={onOpenAssignModal}
            className="inline-flex items-center gap-space-xs px-4 h-9 bg-primary-container text-surface-container-lowest font-label-lg text-label-lg hover:bg-primary transition-colors cursor-pointer font-semibold shadow-sm"
            id="btn-open-assign-modal"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
              person_add
            </span>
            <span>Phân công cán bộ mới</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-space-lg pt-space-md bg-surface-container-low p-space-sm border border-outline-variant/20">
        <div className="flex flex-col px-space-sm py-1 bg-surface-container-lowest border border-outline-variant/10">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
            Tổng người dùng đăng ký
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-md text-xl sm:text-headline-md text-primary font-code-tabular font-bold">
              48,920
            </span>
            <span className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
              +142 hôm nay
            </span>
          </div>
        </div>

        <div className="flex flex-col px-space-sm py-1 bg-surface-container-lowest border border-outline-variant/10">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
            Cán bộ công quyền (Active)
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-md text-xl sm:text-headline-md text-secondary font-code-tabular font-bold">
              1,842
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              100% định danh
            </span>
          </div>
        </div>

        <div className="flex flex-col px-space-sm py-1 bg-surface-container-lowest border border-outline-variant/10">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
            Định danh VNeID Mức 2
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-md text-xl sm:text-headline-md text-tertiary font-code-tabular font-bold">
              96.8%
            </span>
            <span className="font-label-sm text-label-sm text-tertiary-fixed-dim bg-tertiary-container px-1 py-0.5 rounded font-semibold text-xs">
              Chuẩn BCA
            </span>
          </div>
        </div>

        <div className="flex flex-col px-space-sm py-1 bg-surface-container-lowest border border-outline-variant/10">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
            Chứng thư số công vụ
          </span>
          <div className="flex items-baseline gap-space-xs mt-1">
            <span className="font-headline-md text-xl sm:text-headline-md text-on-surface font-code-tabular font-bold">
              812
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-code-tabular font-semibold">
              BCY-CP
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-center gap-space-xs mt-space-lg bg-surface-container p-1 border border-outline-variant/30">
        <button
          className={`w-full sm:flex-1 py-2.5 px-space-md font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors cursor-pointer font-semibold ${
            activeTab === "users"
              ? "bg-surface-container-lowest text-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          }`}
          id="tab-btn-users"
          onClick={() => onTabChange("users")}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">group</span>
          <span>Tài Khoản Hệ Thống (System Accounts)</span>
          <span className="ml-1 px-1.5 py-0.5 text-[11px] font-code-tabular bg-secondary-fixed text-on-secondary-fixed-variant rounded font-bold">
            48,920
          </span>
        </button>

        <button
          className={`w-full sm:flex-1 py-2.5 px-space-md font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors cursor-pointer font-semibold ${
            activeTab === "tenants"
              ? "bg-surface-container-lowest text-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          }`}
          id="tab-btn-tenants"
          onClick={() => onTabChange("tenants")}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">
            corporate_fare
          </span>
          <span>Hồ Sơ Phân Công Cơ Quan (Tenant Memberships)</span>
          <span className="ml-1 px-1.5 py-0.5 text-[11px] font-code-tabular bg-surface-container-highest text-on-surface-variant rounded font-bold">
            1,842
          </span>
        </button>
      </div>
    </div>
  );
};

export default AccountsHeader;
