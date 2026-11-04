import React from "react";

export interface SlaCategory {
  code: string;
  dotColor: string;
  name: string;
  subDescription: string;
  responseHours: number;
  responseLabel: string;
  isUrgent?: boolean;
  resolveHours: number;
  resolveLabel: string;
  isActive: boolean;
  agency: string;
}

export const INITIAL_SLA_CATEGORIES: SlaCategory[] = [
  {
    code: "HO_GA",
    dotColor: "bg-error",
    name: "Hố ga mất nắp / Hư hỏng",
    subDescription: "Nguy cơ tai nạn giao thông nghiêm trọng",
    responseHours: 1,
    responseLabel: "1 giờ (Khẩn)",
    isUrgent: true,
    resolveHours: 6,
    resolveLabel: "6 giờ",
    isActive: true,
    agency: "Cty Thoát Nước Đô Thị",
  },
  {
    code: "NGAP_UNG",
    dotColor: "bg-secondary",
    name: "Ngập úng sau mưa lớn",
    subDescription: "Ảnh hưởng lưu thông & vệ sinh dịch tễ",
    responseHours: 2,
    responseLabel: "2 giờ",
    isUrgent: false,
    resolveHours: 12,
    resolveLabel: "12 giờ",
    isActive: true,
    agency: "Cty Thoát Nước Đô Thị",
  },
  {
    code: "CAY_DO",
    dotColor: "bg-error",
    name: "Cây gãy đổ chắn đường",
    subDescription: "Ùn tắc cục bộ & đứt đường dây điện thoại",
    responseHours: 1,
    responseLabel: "1 giờ (Khẩn)",
    isUrgent: true,
    resolveHours: 6,
    resolveLabel: "6 giờ",
    isActive: true,
    agency: "Cty Công Viên Cây Xanh",
  },
  {
    code: "CHIEU_SANG",
    dotColor: "bg-outline",
    name: "Mất điện chiếu sáng công cộng",
    subDescription: "Khu vực đường ngõ hẻm hoặc tuyến chính",
    responseHours: 4,
    responseLabel: "4 giờ",
    isUrgent: false,
    resolveHours: 24,
    resolveLabel: "24 giờ",
    isActive: true,
    agency: "Cty Chiếu Sáng Đô Thị",
  },
  {
    code: "LO_LUN",
    dotColor: "bg-secondary",
    name: "Lún nứt vỉa hè lòng đường",
    subDescription: "Hạ tầng giao thông đô thị xuống cấp",
    responseHours: 4,
    responseLabel: "4 giờ",
    isUrgent: false,
    resolveHours: 48,
    resolveLabel: "48 giờ",
    isActive: true,
    agency: "Sở Giao Thông Vận Tải",
  },
  {
    code: "RAC_THAI",
    dotColor: "bg-tertiary-fixed-dim",
    name: "Điểm tập kết rác sai quy định",
    subDescription: "Ô nhiễm môi trường khu dân cư",
    responseHours: 2,
    responseLabel: "2 giờ",
    isUrgent: false,
    resolveHours: 12,
    resolveLabel: "12 giờ",
    isActive: true,
    agency: "Cty Môi Trường Đô Thị (URENCO)",
  },
  {
    code: "CAP_TREO",
    dotColor: "bg-outline",
    name: "Đứt cáp quang / Cáp điện chùng",
    subDescription: "Mối nguy an toàn người tham gia giao thông",
    responseHours: 2,
    responseLabel: "2 giờ",
    isUrgent: false,
    resolveHours: 24,
    resolveLabel: "24 giờ",
    isActive: true,
    agency: "Sở Thông Tin & Truyền Thông",
  },
  {
    code: "VO_ONG_NUOC",
    dotColor: "bg-error",
    name: "Vỡ ống cấp nước sinh hoạt",
    subDescription: "Thất thoát tài nguyên & xói lở chân đường ngầm",
    responseHours: 1,
    responseLabel: "1 giờ (Khẩn)",
    isUrgent: true,
    resolveHours: 12,
    resolveLabel: "12 giờ",
    isActive: true,
    agency: "Tổng Cty Cấp Nước (SAWACO)",
  },
];

interface SlaTableProps {
  categories: SlaCategory[];
  onToggleActive: (code: string) => void;
  onOpenEditDrawer: (category: SlaCategory) => void;
  onShowHistory: (code: string) => void;
}

const SlaTable: React.FC<SlaTableProps> = ({
  categories,
  onToggleActive,
  onOpenEditDrawer,
  onShowHistory,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden mb-space-lg border border-outline-variant/30">
      <div className="overflow-x-auto">
        <table className="w-full text-left" id="categoriesTable">
          <thead>
            <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider border-b border-outline-variant/30">
              <th className="py-3 px-4 font-semibold w-36">Mã Danh Mục</th>
              <th className="py-3 px-4 font-semibold min-w-[220px]">
                Tên Hiển Thị Người Dân
              </th>
              <th className="py-3 px-4 font-semibold w-40">Cam Kết Tiếp Nhận</th>
              <th className="py-3 px-4 font-semibold w-40">Cam Kết Xử Lý</th>
              <th className="py-3 px-4 font-semibold w-36 text-center">Trạng Thái</th>
              <th className="py-3 px-4 font-semibold min-w-[180px]">Đơn Vị Thường Trực</th>
              <th className="py-3 px-4 font-semibold w-44 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm divide-y divide-surface-container-low">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-on-surface-variant">
                  Không tìm thấy danh mục sự cố nào phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              categories.map((item) => (
                <tr
                  key={item.code}
                  className="hover:bg-surface-container-low/60 transition-colors group"
                >
                  {/* Mã Danh Mục */}
                  <td className="py-3.5 px-4 font-code-tabular text-code-tabular font-bold text-primary">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                      <span>{item.code}</span>
                    </div>
                  </td>

                  {/* Tên Hiển Thị Người Dân */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-on-surface">{item.name}</div>
                    <div className="font-label-sm text-label-sm text-outline">
                      {item.subDescription}
                    </div>
                  </td>

                  {/* Cam Kết Tiếp Nhận */}
                  <td className="py-3.5 px-4">
                    {item.isUrgent ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-error-container text-error">
                        <span className="material-symbols-outlined text-[13px]">bolt</span>
                        {item.responseLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded font-label-sm text-label-sm font-semibold bg-surface-container-highest text-primary">
                        {item.responseLabel}
                      </span>
                    )}
                  </td>

                  {/* Cam Kết Xử Lý */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded font-code-tabular text-code-tabular font-medium bg-surface-container-high text-on-surface">
                      {item.resolveLabel}
                    </span>
                  </td>

                  {/* Trạng Thái Switch */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      aria-checked={item.isActive}
                      onClick={() => onToggleActive(item.code)}
                      className={`w-10 h-5 rounded-full transition-colors relative inline-flex items-center p-0.5 cursor-pointer ${
                        item.isActive ? "bg-secondary" : "bg-outline-variant"
                      }`}
                      role="switch"
                      type="button"
                      title={item.isActive ? "Đang bật - Nhấp để tắt" : "Đang tắt - Nhấp để bật"}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-surface-container-lowest transform transition-transform ${
                          item.isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Đơn Vị Thường Trực */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        corporate_fare
                      </span>
                      <span className="font-medium text-on-surface">{item.agency}</span>
                    </div>
                  </td>

                  {/* Thao Tác */}
                  <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => onOpenEditDrawer(item)}
                      className="px-2.5 py-1 rounded hover:bg-surface-container text-secondary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                      type="button"
                    >
                      Chỉnh sửa SLA
                    </button>
                    <button
                      onClick={() => onShowHistory(item.code)}
                      className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      title="Lịch sử điều chỉnh"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        history
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang tối giản phẳng */}
      <div className="px-space-md py-3 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm border-t border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
          <span>
            Đồng bộ máy chủ điều phối tự động:{" "}
            <strong className="font-code-tabular text-on-surface">2 phút trước</strong>
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="font-code-tabular text-code-tabular">Trang 1 / 1</span>
          <div className="flex items-center gap-1">
            <button
              className="p-1 rounded bg-surface-container-lowest text-outline cursor-not-allowed opacity-60"
              disabled
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              className="p-1 rounded bg-surface-container-lowest text-outline cursor-not-allowed opacity-60"
              disabled
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlaTable;
