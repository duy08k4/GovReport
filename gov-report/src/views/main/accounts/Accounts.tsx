import React, { useState, useEffect, useMemo } from "react";
import AccountsHeader from "./components/AccountsHeader";
import AccountsFilterMatrix from "./components/AccountsFilterMatrix";
import AccountsTable, {
  SystemAccount,
  INITIAL_SYSTEM_ACCOUNTS,
} from "./components/AccountsTable";
import TenantMembershipsView, {
  TenantMembership,
  INITIAL_TENANT_MEMBERSHIPS,
} from "./components/TenantMembershipsView";
import SecureProfileModal, {
  SecureProfileData,
} from "./components/SecureProfileModal";
import AssignCadreModal from "./components/AssignCadreModal";

const Accounts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "tenants">("users");

  // Dữ liệu tài khoản hệ thống
  const [accounts, setAccounts] = useState<SystemAccount[]>(
    INITIAL_SYSTEM_ACCOUNTS
  );

  // Dữ liệu phân công cơ quan
  const [memberships, setMemberships] = useState<TenantMembership[]>(
    INITIAL_TENANT_MEMBERSHIPS
  );

  // Bộ lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Trạng thái đồng bộ Supabase
  const [isSyncing, setIsSyncing] = useState(false);

  // Trạng thái modal
  const [isSecureProfileOpen, setIsSecureProfileOpen] = useState(false);
  const [selectedProfileData, setSelectedProfileData] =
    useState<SecureProfileData | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3500);
  };

  // Lọc tài khoản theo tiêu chí
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      // Tìm kiếm từ khóa
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = acc.name.toLowerCase().includes(q);
        const matchesEmail = acc.email.toLowerCase().includes(q);
        const matchesUid = acc.uid.toLowerCase().includes(q);
        const matchesPhone = acc.phoneFull.includes(q) || acc.phoneMasked.includes(q);
        const matchesCccd = acc.cccd.includes(q);
        if (!matchesName && !matchesEmail && !matchesUid && !matchesPhone && !matchesCccd) {
          return false;
        }
      }

      // Lọc vai trò
      if (roleFilter !== "all" && acc.role !== roleFilter) {
        return false;
      }

      // Lọc trạng thái
      if (statusFilter !== "all" && acc.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [accounts, searchTerm, roleFilter, statusFilter]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const handleSyncSupabase = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast(
        "Đã hoàn tất đồng bộ 48,920 tài khoản từ Supabase Auth sang hạ tầng GovReport GIS."
      );
    }, 1200);
  };

  const handleToggleLock = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const isBlocked = acc.status === "blocked";
          const newStatus = isBlocked ? "active" : "blocked";
          const newLabel = isBlocked ? "Đã kích hoạt" : "Đã tạm khóa (Vi phạm SLA)";
          showToast(
            isBlocked
              ? `Đã mở khóa tài khoản cho ${acc.name}.`
              : `Đã tạm khóa tài khoản của ${acc.name}.`
          );
          return {
            ...acc,
            status: newStatus as "active" | "blocked",
            statusLabel: newLabel,
          };
        }
        return acc;
      })
    );
  };

  const handleOpenSecureProfile = (acc: Partial<SystemAccount>) => {
    setSelectedProfileData({
      name: acc.name || "Cán bộ công quyền",
      cccd: acc.cccd || "001092******",
      phone: acc.phoneFull || "0912.xxx.xxx",
      agency: acc.agency || "Cơ quan điều hành",
      role: acc.title || acc.roleLabel || "Chuyên viên",
      certCode: acc.certCode || "BCY-CP/2023-99412",
    });
    setIsSecureProfileOpen(true);
  };

  const handleAssignSubmit = (data: {
    cadreId: string;
    cadreName: string;
    agencyKey: string;
    agencyName: string;
    tenantRole: string;
    cadreCode: string;
    title: string;
    decreeCode: string;
    syncGis: boolean;
  }) => {
    const roleLabels: Record<string, string> = {
      dispatcher: "DISPATCHER (ĐIỀU PHỐI)",
      field_worker: "FIELD_WORKER (HIỆN TRƯỜNG)",
      tenant_viewer: "TENANT_VIEWER (GIÁM SÁT)",
      agency_leader: "AGENCY_LEADER (LÃNH ĐẠO)",
    };

    const newMembership: TenantMembership = {
      id: `tm-${Date.now()}`,
      name: data.cadreName,
      initials: data.cadreName
        .split(" ")
        .slice(-2)
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "CB",
      avatarBg:
        data.tenantRole === "dispatcher"
          ? "bg-primary-container"
          : "bg-secondary-container",
      avatarText:
        data.tenantRole === "dispatcher"
          ? "text-surface-container-lowest"
          : "text-on-secondary-container",
      cadreCode: data.cadreCode,
      roleInTenant: roleLabels[data.tenantRole] || data.tenantRole.toUpperCase(),
      roleBadgeColor:
        data.tenantRole === "dispatcher"
          ? "bg-surface-container text-primary font-semibold"
          : "bg-surface-container text-secondary font-semibold",
      title: data.title,
      agencyName: data.agencyName,
      decreeCode: data.decreeCode,
      gisScope: "Phân quyền tự động theo địa giới GIS",
      permissions: "Tiếp nhận, xử lý, nghiệm thu báo cáo",
      validity: `${new Date().toLocaleDateString("vi-VN")} - Vô thời hạn`,
      cccd: "001092******",
      phone: "0912.xxx.xxx",
      certCode: "BCY-CP/2024-AUTO",
    };

    setMemberships((prev) => [newMembership, ...prev]);
    setIsAssignModalOpen(false);
    showToast(
      `Đã phân công ${data.cadreName} vào ${data.agencyName}. Mã quyền đã đồng bộ với PostGIS RLS.`
    );
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm rounded shadow-xl flex items-center gap-3 transition-all duration-300 ${
          toastMessage
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
          check_circle
        </span>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-semibold">
            Thông báo bảo mật &amp; nhân sự
          </span>
          <span className="font-body-sm text-body-sm text-on-primary-container">
            {toastMessage}
          </span>
        </div>
      </div>

      {/* Top Command & Status Bar with Metrics and Tabs */}
      <AccountsHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAssignModal={() => setIsAssignModalOpen(true)}
        onSyncSupabase={handleSyncSupabase}
        isSyncing={isSyncing}
      />

      {/* TAB 1: System Accounts Section */}
      {activeTab === "users" && (
        <section className="flex flex-col w-full gap-space-md" id="view-users">
          {/* Filter Matrix */}
          <AccountsFilterMatrix
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onReset={handleResetFilters}
            filteredCount={filteredAccounts.length}
            totalCount={accounts.length}
          />

          {/* Accounts Data Table */}
          <AccountsTable
            accounts={filteredAccounts}
            onOpenSecureProfile={handleOpenSecureProfile}
            onToggleLock={handleToggleLock}
          />
        </section>
      )}

      {/* TAB 2: Tenant Memberships Section */}
      {activeTab === "tenants" && (
        <TenantMembershipsView
          memberships={memberships}
          onOpenSecureProfile={handleOpenSecureProfile}
          onExport={() =>
            showToast("Đã xuất danh bạ phân công cán bộ cấp cơ sở (Excel/PDF) thành công.")
          }
        />
      )}

      {/* MODAL 1: Leader Sensitive Profiles Modal */}
      <SecureProfileModal
        isOpen={isSecureProfileOpen}
        onClose={() => setIsSecureProfileOpen(false)}
        profileData={selectedProfileData}
      />

      {/* MODAL 2: Create / Assign Tenant Cadre Modal */}
      <AssignCadreModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignSubmit}
      />
    </div>
  );
};

export default Accounts;
