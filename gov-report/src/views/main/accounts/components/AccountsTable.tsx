import React, { useState } from "react";

export interface SystemAccount {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  uid: string;
  isVerifiedLeader?: boolean;
  email: string;
  phoneMasked: string;
  phoneFull: string;
  cccd: string;
  role: "root_admin" | "operator" | "cadre" | "citizen";
  roleLabel: string;
  roleBadgeColor: string;
  vneidLevel: "level_2" | "level_1";
  vneidLabel: string;
  status: "active" | "blocked" | "pending";
  statusLabel: string;
  updatedAt: string;
  agency: string;
  title: string;
  certCode: string;
}

export const INITIAL_SYSTEM_ACCOUNTS: SystemAccount[] = [
  {
    id: "acc-1",
    name: "Đoàn Mạnh Hùng",
    initials: "ĐM",
    avatarBg: "bg-primary-container",
    avatarText: "text-surface-container-lowest",
    uid: "USR-VN-000109",
    isVerifiedLeader: true,
    email: "hung.dm@cucgiamsoat.gov.vn",
    phoneMasked: "0903.***.888 (Mã hóa)",
    phoneFull: "0903.888.999",
    cccd: "001089004128",
    role: "root_admin",
    roleLabel: "ROOT ADMIN",
    roleBadgeColor: "bg-error-container text-on-error-container font-semibold",
    vneidLevel: "level_2",
    vneidLabel: "Mức 2 (BCA)",
    status: "active",
    statusLabel: "Đã kích hoạt",
    updatedAt: "10 phút trước",
    agency: "Cục Điều Hành Giám Sát Quốc Gia",
    title: "Root Administrator",
    certCode: "BCY-CP/2023-99412",
  },
  {
    id: "acc-2",
    name: "Trần Thu Mai",
    initials: "TM",
    avatarBg: "bg-secondary-container",
    avatarText: "text-on-secondary-container",
    uid: "USR-VN-000491",
    isVerifiedLeader: false,
    email: "mai.tt@hanoi.gov.vn",
    phoneMasked: "0912.***.341",
    phoneFull: "0912.341.890",
    cccd: "001193005819",
    role: "operator",
    roleLabel: "OPERATOR",
    roleBadgeColor: "bg-secondary-fixed text-on-secondary-fixed-variant font-semibold",
    vneidLevel: "level_2",
    vneidLabel: "Mức 2 (BCA)",
    status: "active",
    statusLabel: "Đã kích hoạt",
    updatedAt: "45 phút trước",
    agency: "Trung Tâm Điều Hành Đô Thị TP Hà Nội",
    title: "Điều hành viên tổng đài GIS",
    certCode: "BCY-CP/2024-10283",
  },
  {
    id: "acc-3",
    name: "Nguyễn Minh Tuấn",
    initials: "NT",
    avatarBg: "bg-surface-container-highest",
    avatarText: "text-on-surface-variant",
    uid: "USR-VN-002104",
    isVerifiedLeader: false,
    email: "tuan.nm@badinh.gov.vn",
    phoneMasked: "0978.***.552",
    phoneFull: "0978.552.199",
    cccd: "001092003881",
    role: "cadre",
    roleLabel: "CÁN BỘ HIỆN TRƯỜNG",
    roleBadgeColor: "bg-primary-fixed text-on-primary-fixed-variant font-semibold",
    vneidLevel: "level_2",
    vneidLabel: "Mức 2 (BCA)",
    status: "active",
    statusLabel: "Đã kích hoạt",
    updatedAt: "08:14 Hôm nay",
    agency: "UBND Quận Ba Đình",
    title: "Chuyên viên Quản lý đô thị",
    certCode: "BCY-CP/2023-41002",
  },
  {
    id: "acc-4",
    name: "Lê Hoàng Nam",
    initials: "LN",
    avatarBg: "bg-surface-container-highest",
    avatarText: "text-on-surface-variant",
    uid: "USR-VN-003810",
    isVerifiedLeader: false,
    email: "nam.lh@cayxanhhn.com.vn",
    phoneMasked: "0934.***.119",
    phoneFull: "0934.119.882",
    cccd: "001088019402",
    role: "cadre",
    roleLabel: "CÁN BỘ HIỆN TRƯỜNG",
    roleBadgeColor: "bg-primary-fixed text-on-primary-fixed-variant font-semibold",
    vneidLevel: "level_2",
    vneidLabel: "Mức 2 (BCA)",
    status: "active",
    statusLabel: "Đã kích hoạt",
    updatedAt: "Hôm qua",
    agency: "Công Ty Cây Xanh Hà Nội",
    title: "Đội trưởng ứng cứu cơ động",
    certCode: "BCY-CP/2024-88421",
  },
  {
    id: "acc-5",
    name: "Vũ Thị Phương",
    initials: "VP",
    avatarBg: "bg-surface-container",
    avatarText: "text-outline",
    uid: "USR-VN-094182",
    isVerifiedLeader: false,
    email: "phuong.vt88@gmail.com",
    phoneMasked: "0983.***.012",
    phoneFull: "0983.012.345",
    cccd: "001195009841",
    role: "citizen",
    roleLabel: "CÔNG DÂN",
    roleBadgeColor: "bg-surface-container-highest text-on-surface-variant font-medium",
    vneidLevel: "level_1",
    vneidLabel: "Mức 1 (Cơ bản)",
    status: "blocked",
    statusLabel: "Đã tạm khóa (Vi phạm SLA)",
    updatedAt: "03/05/2024",
    agency: "Công dân thành phố",
    title: "Tài khoản định danh cơ bản",
    certCode: "N/A",
  },
];

interface AccountsTableProps {
  accounts: SystemAccount[];
  onOpenSecureProfile: (account: SystemAccount) => void;
  onToggleLock: (id: string) => void;
}

const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  onOpenSecureProfile,
  onToggleLock,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isAllSelected =
    accounts.length > 0 && selectedIds.length === accounts.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(accounts.map((a) => a.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body-md text-body-md">
          <thead>
            <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider select-none border-b border-outline-variant/30">
              <th className="py-3 px-space-md w-12 text-center">
                <input
                  aria-label="Chọn toàn bộ"
                  className="accent-primary cursor-pointer"
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3 px-space-md">Họ Tên &amp; Hồ Sơ</th>
              <th className="py-3 px-space-md">Liên Hệ &amp; Định Danh</th>
              <th className="py-3 px-space-md">Vai Trò Hệ Thống</th>
              <th className="py-3 px-space-md">Xác Thực VNeID</th>
              <th className="py-3 px-space-md">Trạng Thái</th>
              <th className="py-3 px-space-md">Cập Nhật</th>
              <th className="py-3 px-space-md text-right">Thao Tác Quản Trị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
            {accounts.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-on-surface-variant">
                  Không tìm thấy tài khoản nào khớp với bộ lọc.
                </td>
              </tr>
            ) : (
              accounts.map((acc) => {
                const isSelected = selectedIds.includes(acc.id);
                const isBlocked = acc.status === "blocked";

                return (
                  <tr
                    key={acc.id}
                    className={`hover:bg-surface-container-low/60 transition-colors ${
                      isBlocked ? "bg-surface-container-low/20" : ""
                    }`}
                  >
                    <td className="py-3 px-space-md text-center">
                      <input
                        className="accent-primary cursor-pointer"
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(acc.id)}
                      />
                    </td>

                    {/* Họ Tên & Hồ Sơ */}
                    <td className="py-3 px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div
                          className={`w-9 h-9 rounded ${acc.avatarBg} ${acc.avatarText} flex items-center justify-center font-headline-sm text-headline-sm uppercase shrink-0 font-bold`}
                        >
                          {acc.initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-label-lg text-label-lg font-semibold truncate ${
                                isBlocked ? "text-on-surface-variant" : "text-on-surface"
                              }`}
                            >
                              {acc.name}
                            </span>
                            {acc.isVerifiedLeader && (
                              <span
                                className="material-symbols-outlined text-secondary text-[16px]"
                                title="Tài khoản Quản trị cấp quốc gia"
                              >
                                verified
                              </span>
                            )}
                          </div>
                          <span
                            className={`font-code-tabular text-[11px] ${
                              isBlocked ? "text-outline" : "text-on-surface-variant"
                            }`}
                          >
                            UID: {acc.uid}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Liên Hệ & Định Danh */}
                    <td className="py-3 px-space-md">
                      <div className="flex flex-col font-code-tabular text-[12px]">
                        <span
                          className={`truncate ${
                            isBlocked ? "text-on-surface-variant" : "text-on-surface font-medium"
                          }`}
                        >
                          {acc.email}
                        </span>
                        <span className="text-on-surface-variant text-xs">
                          {acc.phoneMasked}
                        </span>
                      </div>
                    </td>

                    {/* Vai Trò Hệ Thống */}
                    <td className="py-3 px-space-md">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 font-label-sm text-label-sm ${acc.roleBadgeColor}`}
                      >
                        {acc.roleLabel}
                      </span>
                    </td>

                    {/* Xác Thực VNeID */}
                    <td className="py-3 px-space-md">
                      {acc.vneidLevel === "level_2" ? (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-tertiary-container text-tertiary-fixed-dim font-label-sm text-label-sm font-medium">
                          <span className="material-symbols-outlined text-[14px]">star</span>
                          <span>{acc.vneidLabel}</span>
                        </div>
                      ) : (
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {acc.vneidLabel}
                        </span>
                      )}
                    </td>

                    {/* Trạng Thái */}
                    <td className="py-3 px-space-md">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            acc.status === "active"
                              ? "bg-on-tertiary-container"
                              : acc.status === "blocked"
                              ? "bg-error"
                              : "bg-outline"
                          }`}
                        />
                        <span
                          className={`font-label-sm text-label-sm ${
                            acc.status === "blocked" ? "text-error font-medium" : "text-on-surface"
                          }`}
                        >
                          {acc.statusLabel}
                        </span>
                      </div>
                    </td>

                    {/* Cập Nhật */}
                    <td className="py-3 px-space-md font-code-tabular text-[12px] text-on-surface-variant whitespace-nowrap">
                      {acc.updatedAt}
                    </td>

                    {/* Thao Tác Quản Trị */}
                    <td className="py-3 px-space-md text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {acc.role !== "citizen" ? (
                          <>
                            <button
                              className="px-2 py-1 bg-surface-container hover:bg-surface-container-high text-secondary font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer border border-outline-variant/20 font-medium"
                              onClick={() => onOpenSecureProfile(acc)}
                              title="Hồ sơ an ninh"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                shield
                              </span>
                              <span>Bảo mật</span>
                            </button>
                            <button
                              className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                              title="Chỉnh sửa quyền"
                              type="button"
                              onClick={() =>
                                alert(`Chỉnh sửa ma trận phân quyền cho: ${acc.name}`)
                              }
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                edit
                              </span>
                            </button>
                            <button
                              className={`p-1 transition-colors cursor-pointer ${
                                acc.status === "blocked"
                                  ? "hover:bg-tertiary-container text-on-tertiary-container"
                                  : "hover:bg-error-container text-on-surface-variant hover:text-error"
                              }`}
                              title={acc.status === "blocked" ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                              onClick={() => onToggleLock(acc.id)}
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {acc.status === "blocked" ? "lock_open" : "lock"}
                              </span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="px-2 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm cursor-pointer border border-outline-variant/20 font-medium"
                              onClick={() => onToggleLock(acc.id)}
                              type="button"
                            >
                              {acc.status === "blocked" ? "Mở khóa" : "Tạm khóa"}
                            </button>
                            <button
                              className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-on-surface cursor-pointer"
                              title="Xem chi tiết lịch sử"
                              type="button"
                              onClick={() => alert(`Xem lịch sử công dân: ${acc.name}`)}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                more_vert
                              </span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-space-md bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-md text-label-md border-t border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <span>Hiển thị</span>
          <select
            className="h-8 px-2 bg-surface-container-low font-code-tabular text-on-surface focus:outline-none border border-outline-variant/30 cursor-pointer"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10 bản ghi/trang</option>
            <option value={25}>25 bản ghi/trang</option>
            <option value={50}>50 bản ghi/trang</option>
          </select>
          <span className="font-code-tabular text-sm">Trang {currentPage} / 4,892</span>
        </div>

        <div className="flex items-center gap-1 font-code-tabular">
          <button
            className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary font-semibold"
            type="button"
          >
            1
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
            type="button"
          >
            2
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
            type="button"
          >
            3
          </button>
          <span className="px-1 text-outline">...</span>
          <button
            className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
            type="button"
          >
            4892
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high text-on-surface cursor-pointer"
            onClick={() => setCurrentPage((p) => p + 1)}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountsTable;
