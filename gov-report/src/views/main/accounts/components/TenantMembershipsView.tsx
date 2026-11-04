import React, { useState } from "react";
import { SystemAccount } from "./AccountsTable";

export interface TenantMembership {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  cadreCode: string;
  roleInTenant: string;
  roleBadgeColor: string;
  title: string;
  agencyName: string;
  decreeCode: string;
  gisScope: string;
  permissions: string;
  validity: string;
  cccd: string;
  phone: string;
  certCode: string;
}

export const INITIAL_TENANT_MEMBERSHIPS: TenantMembership[] = [
  {
    id: "tm-1",
    name: "Nguyễn Minh Tuấn",
    initials: "NT",
    avatarBg: "bg-primary-container",
    avatarText: "text-surface-container-lowest",
    cadreCode: "CV-0128",
    roleInTenant: "DISPATCHER (ĐIỀU PHỐI)",
    roleBadgeColor: "bg-surface-container text-primary font-semibold",
    title: "Chuyên viên Quản lý Đô thị",
    agencyName: "UBND Quận Ba Đình, TP. Hà Nội",
    decreeCode: "QĐ số 412/QĐ-UBND",
    gisScope: "14 Phường trực thuộc Quận Ba Đình",
    permissions: "Phê duyệt, Chuyển tiếp cấp 2, Đóng phiếu",
    validity: "15/01/2023 - Vô thời hạn",
    cccd: "001092003881",
    phone: "0978.552.199",
    certCode: "BCY-CP/2023-41002",
  },
  {
    id: "tm-2",
    name: "Lê Hoàng Nam",
    initials: "LN",
    avatarBg: "bg-secondary-container",
    avatarText: "text-on-secondary-container",
    cadreCode: "KS-0941",
    roleInTenant: "FIELD_WORKER (HIỆN TRƯỜNG)",
    roleBadgeColor: "bg-surface-container text-secondary font-semibold",
    title: "Đội trưởng Cơ động Phản ứng nhanh",
    agencyName: "Công ty TNHH MTV Cây Xanh Hà Nội",
    decreeCode: "QĐ số 108/QĐ-CX",
    gisScope: "Hạ tầng Cây Xanh Toàn Thành Phố (Khu vực 1)",
    permissions: "Tiếp nhận lệnh hiện trường, Cập nhật tiến độ ảnh",
    validity: "01/06/2023 - 31/05/2026",
    cccd: "001088019402",
    phone: "0934.119.882",
    certCode: "BCY-CP/2024-88421",
  },
];

interface TenantMembershipsViewProps {
  memberships: TenantMembership[];
  onOpenSecureProfile: (account: Partial<SystemAccount>) => void;
  onExport: () => void;
}

const TenantMembershipsView: React.FC<TenantMembershipsViewProps> = ({
  memberships,
  onOpenSecureProfile,
  onExport,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMemberships = memberships.filter((m) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      m.name.toLowerCase().includes(q) ||
      m.agencyName.toLowerCase().includes(q) ||
      m.decreeCode.toLowerCase().includes(q) ||
      m.cadreCode.toLowerCase().includes(q)
    );
  });

  return (
    <section className="flex flex-col w-full gap-space-md" id="view-tenants">
      {/* Header of Tenant Memberships */}
      <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-sm border border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              domain_verification
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Danh Bạ Cán Bộ Tiếp Nhận &amp; Xử Lý Sự Cố Cấp Cơ Sở
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
            Quyết định bổ nhiệm công quyền và chỉ định quyền hạn xử lý trong hệ thống phân tán đa cơ quan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[16px] text-outline">
              search
            </span>
            <input
              className="h-9 pl-8 pr-3 bg-surface-container-low font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
              placeholder="Tìm theo số QĐ, tên đơn vị, ngạch..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={onExport}
            className="h-9 px-3 bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high flex items-center gap-1 cursor-pointer transition-colors border border-outline-variant/20 font-medium"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Xuất danh sách</span>
          </button>
        </div>
      </div>

      {/* Tenant Memberships Grid/Cards Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
        {filteredMemberships.map((item, idx) => {
          const accentColor = idx % 2 === 0 ? "bg-secondary" : "bg-primary-container";

          return (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/30 hover:border-outline-variant/60 transition-all"
            >
              <div className={`absolute top-0 left-0 w-1.5 h-full ${accentColor}`} />

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`w-12 h-12 ${item.avatarBg} ${item.avatarText} flex items-center justify-center font-headline-sm uppercase shrink-0 font-bold`}
                    >
                      {item.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                          {item.name}
                        </h3>
                        <span className="font-code-tabular text-[12px] px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant font-semibold">
                          {item.cadreCode}
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Chức vụ: {item.title}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-1 font-label-sm text-label-sm uppercase font-semibold self-start sm:self-auto ${item.roleBadgeColor}`}
                  >
                    {item.roleInTenant}
                  </span>
                </div>

                {/* Assignment Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space-md gap-y-2 mt-space-md p-space-sm bg-surface-container-low border border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Cơ quan phụ trách:
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {item.agencyName}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Căn cứ pháp lý / Quyết định:
                    </span>
                    <span className="font-code-tabular text-on-surface font-semibold">
                      {item.decreeCode}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Phạm vi GIS phụ trách:
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {item.gisScope}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Quyền hạn tiếp nhận:
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface">
                      {item.permissions}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mt-space-md pt-space-sm border-t border-outline-variant/20 bg-surface-container-lowest">
                <div className="flex items-center gap-2 text-on-surface-variant font-code-tabular text-[12px]">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">
                    verified
                  </span>
                  <span>Hiệu lực: {item.validity}</span>
                </div>

                <div className="flex items-center gap-space-xs">
                  <button
                    className="px-3 h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer transition-colors border border-outline-variant/20"
                    onClick={() =>
                      onOpenSecureProfile({
                        name: item.name,
                        cccd: item.cccd,
                        phoneFull: item.phone,
                        agency: item.agencyName,
                        title: item.title,
                        certCode: item.certCode,
                      })
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">badge</span>
                    <span>Hồ sơ công vụ</span>
                  </button>

                  <button
                    className="px-3 h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm cursor-pointer transition-colors border border-outline-variant/20"
                    onClick={() => alert(`Điều chỉnh ngạch công vụ cho: ${item.name}`)}
                    type="button"
                  >
                    Điều chỉnh ngạch
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TenantMembershipsView;
