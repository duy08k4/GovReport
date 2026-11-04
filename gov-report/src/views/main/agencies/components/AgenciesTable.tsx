import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../config/Routing";
import { AgencyItem, TeamItem } from "../types";

export type { AgencyItem };

export const INITIAL_AGENCIES: AgencyItem[] = [
  {
    id: "ag-1",
    code: "UBND-HN",
    name: "Ủy ban Nhân dân Thành phố Hà Nội",
    isCentral: true,
    level: "Tỉnh / Thành phố",
    levelBadgeClass: "bg-primary-fixed text-on-primary-fixed",
    category: "Hành chính công",
    status: "active",
    staffCount: "148 cán bộ",
    staffSub: "32 điều phối viên",
    gisSynced: true,
    hotline: "024.3825.3536",
    address: "Số 12 phố Lê Lai, P. Lý Thái Tổ, Q. Hoàn Kiếm, Hà Nội",
  },
  {
    id: "ag-2",
    code: "SXD-HN",
    name: "Sở Xây Dựng TP. Hà Nội",
    parentCode: "UBND-HN",
    level: "Sở Ngành Chuyên Môn",
    levelBadgeClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
    category: "Chuyên trách Hạ tầng",
    status: "active",
    staffCount: "64 cán bộ",
    staffSub: "18 điều phối viên",
    gisSynced: true,
    hotline: "024.3976.2205",
    address: "52 Lê Đại Hành, P. Lê Đại Hành, Q. Hai Bà Trưng, Hà Nội",
  },
  {
    id: "ag-3",
    code: "UBND-Q1-HCM",
    name: "UBND Quận 1 - TP. Hồ Chí Minh",
    parentCode: "UBND-HCM",
    level: "Quận / Huyện",
    levelBadgeClass: "bg-surface-container-high text-on-surface",
    category: "Hành chính công",
    status: "active",
    staffCount: "42 cán bộ",
    staffSub: "12 điều phối viên",
    gisSynced: true,
    hotline: "028.3827.9446",
    address: "47 Lê Duẩn, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  },
  {
    id: "ag-4",
    code: "TN-HCM",
    name: "Công ty TNHH MTV Thoát Nước Đô Thị HCM",
    parentCode: "SXD-HCM",
    level: "Doanh nghiệp công ích",
    levelBadgeClass: "bg-surface-container-highest text-on-surface",
    category: "Thoát nước & Chống ngập",
    status: "active",
    staffCount: "112 công nhân",
    staffSub: "8 tổ trưởng số hóa",
    gisSynced: true,
    hotline: "028.3844.5939",
    address: "Số 8 Lý Thường Kiệt, Phường 7, Tân Bình, TP. Hồ Chí Minh",
  },
  {
    id: "ag-5",
    code: "DLU-DN",
    name: "Công ty Cổ phần Chiếu Sáng Đô Thị Đà Nẵng",
    parentCode: "SGTVT-DN",
    level: "Doanh nghiệp công ích",
    levelBadgeClass: "bg-surface-container-highest text-on-surface",
    category: "Chiếu sáng đô thị",
    status: "active",
    staffCount: "36 kỹ thuật viên",
    staffSub: "4 trạm điều khiển",
    gisSynced: true,
    hotline: "0236.3821.567",
    address: "142 Nguyễn Thị Minh Khai, Hải Châu, TP. Đà Nẵng",
  },
  {
    id: "ag-6",
    code: "UBND-PX-BD",
    name: "UBND Phường Phú Hòa - TP. Thủ Dầu Một",
    parentCode: "UBND-TDM-BD",
    level: "Xã / Phường",
    levelBadgeClass: "bg-surface-container text-on-surface",
    category: "Hành chính công",
    status: "inactive",
    staffCount: "8 cán bộ",
    staffSub: "Bảo trì hệ thống",
    gisSynced: false,
    hotline: "0274.3822.456",
    address: "Đường Phú Lợi, P. Phú Hòa, TP. Thủ Dầu Một, Bình Dương",
  },
  {
    id: "ag-7",
    code: "CX-HN",
    name: "Công ty TNHH MTV Công viên Cây xanh Hà Nội",
    parentCode: "SXD-HN",
    level: "Doanh nghiệp công ích",
    levelBadgeClass: "bg-surface-container-highest text-on-surface",
    category: "Cây xanh & Chiếu sáng",
    status: "active",
    staffCount: "88 công nhân",
    staffSub: "15 xe chuyên dùng",
    gisSynced: true,
    hotline: "024.3829.1122",
    address: "Số 2 phố Nguyễn Đình Chiểu, Hai Bà Trưng, Hà Nội",
  },
  {
    id: "ag-8",
    code: "UBND-HA-QN",
    name: "Ủy ban Nhân dân Thành phố Hội An",
    parentCode: "UBND-QNA",
    level: "Quận / Huyện / TP Thuộc Tỉnh",
    levelBadgeClass: "bg-surface-container-high text-on-surface",
    category: "Hành chính công",
    status: "active",
    staffCount: "54 cán bộ",
    staffSub: "14 điều phối viên",
    gisSynced: true,
    hotline: "0235.3861.240",
    address: "Số 10 đường Trần Hưng Đạo, TP. Hội An, Quảng Nam",
  },
];

interface AgenciesTableProps {
  agencies: AgencyItem[];
  viewMode: "table" | "tree";
  onToggleStatus: (id: string) => void;
  onViewDetail: (agency: AgencyItem) => void;
  teamsMap?: Record<string, TeamItem[]>;
}

const AgenciesTable: React.FC<AgenciesTableProps> = ({
  agencies,
  viewMode,
  onToggleStatus,
  onViewDetail,
  teamsMap = {},
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleGisConfig = (code: string) => {
    navigate(ROUTES.GIS_BOUNDARIES);
  };

  return (
    <div className="rounded bg-surface-container-lowest shadow-sm overflow-hidden mb-space-lg border border-outline-variant/30">
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/40">
                <th className="py-3 px-space-md">Mã Tenant</th>
                <th className="py-3 px-space-md">Tên Cơ Quan / Cơ Quan Cấp Trên</th>
                <th className="py-3 px-space-md">Cấp Hành Chính</th>
                <th className="py-3 px-space-md">Phân Loại Ngành</th>
                <th className="py-3 px-space-md">Đội Tác Chiến</th>
                <th className="py-3 px-space-md">Trạng Thái</th>
                <th className="py-3 px-space-md">Nhân Lực Tác Chiến</th>
                <th className="py-3 px-space-md text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface font-body-sm text-body-sm">
              {agencies.map((item, index) => {
                const isEvenRow = index % 2 === 1;
                const itemTeams = teamsMap[item.id] || [];
                const teamCount = itemTeams.length;
                const memberCount = itemTeams.reduce(
                  (acc, t) => acc + (t.members?.length || 0),
                  0
                );

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-surface-container ${
                      isEvenRow ? "bg-surface-container-low" : ""
                    }`}
                  >
                    {/* Mã Tenant */}
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onViewDetail(item)}
                        className="font-code-tabular text-code-tabular font-bold text-primary-container px-2 py-1 rounded bg-surface-container border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-high transition-colors cursor-pointer"
                        title="Xem chi tiết Tenant"
                      >
                        {item.code}
                      </button>
                    </td>

                    {/* Tên Cơ Quan / Cấp Trên */}
                    <td className="py-3.5 px-space-md">
                      <div className="flex flex-col min-w-[220px]">
                        <button
                          type="button"
                          onClick={() => onViewDetail(item)}
                          className="font-label-lg text-label-lg text-on-surface font-semibold text-left hover:text-primary transition-colors cursor-pointer group flex items-center gap-1.5"
                          title="Nhấp để xem chi tiết cơ quan & danh sách các đội tác chiến"
                        >
                          <span className="group-hover:underline underline-offset-2">{item.name}</span>
                          <span className="material-symbols-outlined text-[15px] opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                            open_in_new
                          </span>
                        </button>
                        {item.isCentral ? (
                          <span className="font-code-tabular text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[13px] text-outline">
                              account_balance
                            </span>{" "}
                            Cấp trung ương trực thuộc
                          </span>
                        ) : (
                          <span className="font-code-tabular text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[13px] text-outline">
                              turn_right
                            </span>{" "}
                            Thuộc: {item.parentCode}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Cấp Hành Chính */}
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${item.levelBadgeClass}`}
                      >
                        {item.level}
                      </span>
                    </td>

                    {/* Phân Loại Ngành */}
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span>{item.category}</span>
                      </span>
                    </td>

                    {/* Đội Tác Chiến (Theo schema bảng teams) */}
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onViewDetail(item)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary-fixed/30 hover:bg-secondary-fixed text-on-secondary-fixed-variant border border-secondary/25 transition-all cursor-pointer group shadow-2xs"
                        title="Nhấn để mở popup xem thông tin Tenant và danh sách các Đội công tác"
                      >
                        <span className="material-symbols-outlined text-[16px] text-secondary group-hover:scale-110 transition-transform">
                          groups
                        </span>
                        <span className="font-label-sm font-bold text-secondary">
                          {teamCount} đội
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-code-tabular">
                          ({memberCount} TV)
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-outline group-hover:text-secondary group-hover:translate-x-0.5 transition-transform">
                          chevron_right
                        </span>
                      </button>
                    </td>

                    {/* Trạng Thái */}
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      {item.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                          <span>Đang hoạt động</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-error shrink-0" />
                          <span>Tạm dừng</span>
                        </span>
                      )}
                    </td>

                    {/* Nhân Lực Tác Chiến */}
                    <td className="py-3.5 px-space-md whitespace-nowrap">
                      <div className="flex flex-col font-code-tabular text-code-tabular">
                        <span className="font-semibold text-on-surface">{item.staffCount}</span>
                        <span className="text-[11px] text-on-surface-variant">
                          {item.staffSub}
                        </span>
                      </div>
                    </td>

                    {/* Thao Tác */}
                    <td className="py-3.5 px-space-md whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleGisConfig(item.code)}
                          className="p-1.5 rounded hover:bg-surface-container-high text-secondary transition-colors cursor-pointer"
                          title="Cấu hình ranh giới GIS"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            share_location
                          </span>
                        </button>
                        <button
                          onClick={() => onViewDetail(item)}
                          className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                          title="Chi tiết Tenant & Đội tác chiến"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                        <button
                          onClick={() => onToggleStatus(item.id)}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            item.status === "active"
                              ? "hover:bg-error-container text-outline hover:text-error"
                              : "hover:bg-tertiary-fixed text-tertiary"
                          }`}
                          title={item.status === "active" ? "Khóa tạm thời" : "Kích hoạt lại"}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {item.status === "active" ? "lock" : "lock_open"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Tree Hierarchy View Mode */
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/30 text-on-surface font-label-md">
            <span className="font-bold">Cây phân cấp cơ quan (Hierarchical Tree)</span>
            <span className="text-on-surface-variant text-xs">8 đơn vị hiển thị</span>
          </div>

          <div className="flex flex-col gap-3 font-body-sm text-body-sm">
            {/* Level 1: Tỉnh / Thành phố */}
            <div className="p-space-md rounded bg-surface-container-low border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    account_balance
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const found = agencies.find((a) => a.code === "UBND-HN") || agencies[0];
                      if (found) onViewDetail(found);
                    }}
                    className="font-bold text-on-surface text-base hover:text-primary transition-colors cursor-pointer text-left"
                  >
                    Ủy ban Nhân dân Thành phố Hà Nội (UBND-HN)
                  </button>
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-xs font-semibold">
                    Cấp Trung Ương Trực Thuộc
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const found = agencies.find((a) => a.code === "UBND-HN") || agencies[0];
                      if (found) onViewDetail(found);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary-fixed/50 hover:bg-secondary-fixed text-secondary font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">groups</span>
                    <span>2 Đội tác chiến</span>
                  </button>
                  <span className="text-on-tertiary-container font-semibold text-xs">
                    ● Đang hoạt động (148 cán bộ)
                  </span>
                </div>
              </div>

              {/* Nested Children */}
              <div className="pl-6 border-l-2 border-secondary/40 flex flex-col gap-2 mt-2">
                <div className="p-2.5 rounded bg-surface-container-lowest flex items-center justify-between flex-wrap gap-2 border border-outline-variant/30">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      construction
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const found = agencies.find((a) => a.code === "SXD-HN");
                        if (found) onViewDetail(found);
                      }}
                      className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      Sở Xây Dựng TP. Hà Nội (SXD-HN)
                    </button>
                    <span className="px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] rounded">
                      Sở Ngành Chuyên Môn
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const found = agencies.find((a) => a.code === "SXD-HN");
                        if (found) onViewDetail(found);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-secondary-fixed text-secondary text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">groups</span>
                      <span>2 Đội • Chi tiết</span>
                    </button>
                    <span className="text-on-surface-variant text-xs">64 cán bộ</span>
                  </div>
                </div>

                <div className="pl-6 border-l-2 border-secondary/20 flex flex-col gap-2">
                  <div className="p-2.5 rounded bg-surface-container-lowest flex items-center justify-between flex-wrap gap-2 border border-outline-variant/30">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">
                        park
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const found = agencies.find((a) => a.code === "CX-HN");
                          if (found) onViewDetail(found);
                        }}
                        className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer text-left"
                      >
                        Công ty TNHH MTV Công viên Cây xanh Hà Nội (CX-HN)
                      </button>
                      <span className="px-1.5 py-0.2 bg-surface-container-highest text-on-surface text-[11px] rounded">
                        DN Công ích
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const found = agencies.find((a) => a.code === "CX-HN");
                          if (found) onViewDetail(found);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-secondary-fixed text-secondary text-xs font-semibold cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">groups</span>
                        <span>1 Đội • Chi tiết</span>
                      </button>
                      <span className="text-on-surface-variant text-xs">88 công nhân</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level 2: TP. Hồ Chí Minh branch */}
            <div className="p-space-md rounded bg-surface-container-low border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    account_balance
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const found = agencies.find((a) => a.code === "UBND-Q1-HCM");
                      if (found) onViewDetail(found);
                    }}
                    className="font-bold text-on-surface text-base hover:text-primary transition-colors cursor-pointer text-left"
                  >
                    Ủy ban Nhân dân Quận 1 (UBND-Q1-HCM)
                  </button>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-xs font-semibold">
                    Quận / Huyện
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const found = agencies.find((a) => a.code === "UBND-Q1-HCM");
                      if (found) onViewDetail(found);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary-fixed/50 hover:bg-secondary-fixed text-secondary font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">groups</span>
                    <span>1 Đội tác chiến</span>
                  </button>
                  <span className="text-on-tertiary-container font-semibold text-xs">
                    ● Đang hoạt động (42 cán bộ)
                  </span>
                </div>
              </div>

              {/* Sub-children */}
              <div className="pl-6 border-l-2 border-secondary/40 flex flex-col gap-2 mt-2">
                <div className="p-2.5 rounded bg-surface-container-lowest flex items-center justify-between flex-wrap gap-2 border border-outline-variant/30">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      water_drop
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const found = agencies.find((a) => a.code === "TN-HCM");
                        if (found) onViewDetail(found);
                      }}
                      className="font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      Công ty TNHH MTV Thoát Nước Đô Thị HCM (TN-HCM)
                    </button>
                    <span className="px-1.5 py-0.2 bg-surface-container-highest text-on-surface text-[11px] rounded">
                      DN Công ích
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const found = agencies.find((a) => a.code === "TN-HCM");
                        if (found) onViewDetail(found);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-secondary-fixed text-secondary text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">groups</span>
                      <span>1 Đội • Chi tiết</span>
                    </button>
                    <span className="text-on-surface-variant text-xs">112 công nhân</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Pagination & Metadata Footer */}
      <div className="px-space-md py-space-sm bg-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-sm font-code-tabular text-code-tabular text-on-surface-variant border-t border-outline-variant/40">
        <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
          <span>Hiển thị trang {currentPage} / 16 (128 bản ghi)</span>
          <span className="text-outline hidden xs:inline">•</span>
          <span>Bộ nhớ đệm GIS: Đã đồng bộ lúc 14:32:00</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`p-1 rounded bg-surface-container ${
              currentPage === 1
                ? "text-outline cursor-not-allowed"
                : "text-on-surface hover:bg-surface-container-highest cursor-pointer"
            }`}
            type="button"
            aria-label="Trang trước"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-7 h-7 rounded font-bold text-center leading-7 cursor-pointer ${
              currentPage === 1
                ? "bg-primary text-on-primary"
                : "hover:bg-surface-container text-on-surface"
            }`}
            type="button"
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`w-7 h-7 rounded text-center leading-7 cursor-pointer transition-colors ${
              currentPage === 2
                ? "bg-primary text-on-primary font-bold"
                : "hover:bg-surface-container text-on-surface"
            }`}
            type="button"
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className={`w-7 h-7 rounded text-center leading-7 cursor-pointer transition-colors ${
              currentPage === 3
                ? "bg-primary text-on-primary font-bold"
                : "hover:bg-surface-container text-on-surface"
            }`}
            type="button"
          >
            3
          </button>
          <span className="px-1 text-outline">...</span>
          <button
            onClick={() => setCurrentPage(16)}
            className={`w-7 h-7 rounded text-center leading-7 cursor-pointer transition-colors ${
              currentPage === 16
                ? "bg-primary text-on-primary font-bold"
                : "hover:bg-surface-container text-on-surface"
            }`}
            type="button"
          >
            16
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 16))}
            disabled={currentPage === 16}
            className="p-1 rounded bg-surface-container hover:bg-surface-container-highest text-on-surface transition-colors cursor-pointer"
            type="button"
            aria-label="Trang kế tiếp"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgenciesTable;
