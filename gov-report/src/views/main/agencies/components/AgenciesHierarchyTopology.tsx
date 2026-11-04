import React from "react";

const AgenciesHierarchyTopology: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md mb-space-lg">
      {/* Architecture Structure Map Card (2 cols) */}
      <div className="lg:col-span-2 p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div>
          <div className="flex items-center justify-between mb-space-md pb-space-xs border-b border-outline-variant/20">
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg sm:text-headline-sm text-on-surface font-semibold">
                Mô Hình Cây Phân Cấp &amp; Điều Phối Đa Đơn Vị
              </span>
              <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                Quy trình điều động xử lý sự cố hạ tầng xuyên cấp và đơn vị phụ trách trực tiếp
              </span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[24px]">
              hub
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm my-space-sm font-label-md text-label-md">
            {/* Level 1 */}
            <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1 border border-outline-variant/30">
              <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase">
                Cấp 1: Ban Chỉ Đạo Đô Thị
              </span>
              <span className="font-bold text-on-surface">UBND Tỉnh / Thành phố</span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-normal">
                Quyết định chủ trương, phê duyệt KPI xử lý SLA và tiếp nhận giám sát tối cao từ Trung tâm Điều hành Thông minh (IOC).
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1 border border-outline-variant/30">
              <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase">
                Cấp 2: Chỉ Huy Địa Bàn / Ngành
              </span>
              <span className="font-bold text-on-surface">UBND Quận/Huyện &amp; Sở</span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-normal">
                Sở Xây dựng, Giao thông &amp; UBND cấp quận tiếp nhận phân luồng tự động từ hệ thống GIS theo tọa độ sự cố.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1 border border-outline-variant/30">
              <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase">
                Cấp 3: Đội Tác Chiến Hiện Trường
              </span>
              <span className="font-bold text-on-surface">DN Công Ích &amp; Đội Cơ Động</span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-normal">
                Công ty Thoát nước, Chiếu sáng, Môi trường trực tiếp điều xe xử lý, chụp ảnh nghiệm thu hoàn thành lên hệ thống.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-space-xs font-code-tabular text-[12px] text-on-surface-variant mt-2">
          <span>Cập nhật giao thức: Routing Engine v3.1</span>
          <button
            onClick={() => alert("Mở sơ đồ kiến trúc topology phân quyền mạng lưới...")}
            className="text-secondary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            type="button"
          >
            <span>Xem sơ đồ tổ chức tương tác</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* GIS Roster Summary (1 col) */}
      <div className="p-space-md rounded bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">
              Trạng Thái Bản Đồ GIS
            </span>
            <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-code-tabular text-[11px] font-semibold">
              TỰ ĐỘNG KHỚP
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Đảm bảo 100% phản ánh của công dân được định tuyến chính xác vào ranh giới hành chính của cơ quan chịu trách nhiệm.
          </p>

          {/* Geo Progress Indicators */}
          <div className="space-y-space-sm font-label-sm text-label-sm">
            <div>
              <div className="flex justify-between text-on-surface mb-1">
                <span>Đơn vị đã liên kết đa giác ranh giới:</span>
                <span className="font-code-tabular font-bold">122 / 128 (95.3%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: "95.3%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-on-surface mb-1">
                <span>Hệ tọa độ xác thực VN-2000:</span>
                <span className="font-code-tabular font-bold">100%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                <div className="h-full bg-on-tertiary-container rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-space-sm rounded bg-surface-container-low mt-space-md flex items-center gap-space-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-secondary text-[24px] shrink-0">
            verified
          </span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-bold text-on-surface">
              Đồng Bộ PostGIS Quốc Gia
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              Không phát hiện xung đột không gian (Overlapping)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenciesHierarchyTopology;
