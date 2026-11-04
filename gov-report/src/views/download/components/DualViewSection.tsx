import React from "react";

const DualViewSection: React.FC = () => {
  return (
    <section className="w-full mt-6 sm:mt-space-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-space-sm gap-1.5 sm:gap-0">
        <div className="flex items-center gap-1.5 sm:gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px] sm:text-[22px]">
            split_scene
          </span>
          <h2 className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold">
            Kiến Trúc Hai Chế Độ (Dual-View Architecture)
          </h2>
        </div>
        <span className="font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant">
          Tự động kích hoạt qua phân quyền RBAC
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-space-md">
        {/* Thẻ Chế độ Công dân (Citizen View) */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 sm:p-space-lg flex flex-col justify-between hover:border-secondary transition-colors shadow-sm">
          <div>
            {/* Header Card */}
            <div className="flex items-center justify-between pb-3 sm:pb-space-sm border-b border-surface-container">
              <div className="flex items-center gap-2 sm:gap-space-xs">
                <span className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary-container shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                    person_pin_circle
                  </span>
                </span>
                <div>
                  <span className="font-label-sm text-[11px] sm:text-label-sm text-secondary font-semibold uppercase tracking-wider block">
                    DÀNH CHO NGƯỜI DÂN ĐÔ THỊ
                  </span>
                  <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                    Citizen Simplified Mode
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A] border border-[#86EFAC] shrink-0">
                Công cộng
              </span>
            </div>

            {/* Highlight Core Concept */}
            <div className="mt-3 sm:mt-space-md mb-2 sm:mb-space-sm">
              <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold">
                Báo cáo sự cố 1 chạm tức thì
              </h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Đơn giản hóa tuyệt đối các thao tác nhằm giúp người dân gửi hiện
                trạng nhanh chóng, an toàn khi đang lưu thông.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-2.5 sm:gap-space-sm mt-3 sm:mt-space-md">
              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  wb_sunny
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Tối ưu thao tác ngoài trời:</strong> Giao diện độ
                  tương phản cao, phím bấm vật lý ảo ngoại cỡ, chống lóa tốt
                  dưới ánh nắng chói chang.
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  location_searching
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Chụp ảnh &amp; Ghim GPS tự động:</strong> Tự trích
                  xuất kinh độ/vĩ độ với sai số dưới 3 mét, gán nhãn thời gian
                  thực (Timestamp) không thể làm giả.
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  no_accounts
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Không bắt buộc đăng nhập:</strong> Gửi phản ánh khẩn
                  cấp trong 15 giây. Hệ thống chống spam tự động bằng dấu vân
                  tay thiết bị (Hardware Fingerprint).
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Minh bạch hóa tiến độ:</strong> Tra cứu nhanh tình
                  trạng hồ sơ qua mã Ticket và nhận thông báo hình ảnh nghiệm thu
                  sau khi khắc phục.
                </p>
              </div>
            </div>
          </div>

          {/* Mode Footer Stamp */}
          <div className="mt-4 sm:mt-space-lg pt-2.5 sm:pt-space-sm border-t border-surface-container flex flex-wrap items-center justify-between text-on-surface-variant font-code-tabular text-xs sm:text-body-sm gap-1">
            <span>Quy trình xử lý: 3 Bước</span>
            <span className="text-secondary font-medium">
              Chụp → Định vị → Xác nhận
            </span>
          </div>
        </div>

        {/* Thẻ Chế độ Cán bộ (Cadre / Field Worker View) */}
        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 sm:p-space-lg flex flex-col justify-between hover:border-secondary transition-colors shadow-sm">
          <div>
            {/* Header Card */}
            <div className="flex items-center justify-between pb-3 sm:pb-space-sm border-b border-outline-variant/60">
              <div className="flex items-center gap-2 sm:gap-space-xs">
                <span className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                    shield_person
                  </span>
                </span>
                <div>
                  <span className="font-label-sm text-[11px] sm:text-label-sm text-primary-container font-semibold uppercase tracking-wider block">
                    DÀNH CHO CÁN BỘ HIỆN TRƯỜNG
                  </span>
                  <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                    Cadre Tactical Dispatch View
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] border border-[#FCA5A5] shrink-0">
                Nghiệp vụ
              </span>
            </div>

            {/* Highlight Core Concept */}
            <div className="mt-3 sm:mt-space-md mb-2 sm:mb-space-sm">
              <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold">
                Bảng điều khiển tác chiến cơ động
              </h3>
              <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Tích hợp công cụ tiếp nhận phản ánh phân luồng tự động, định vị
                không gian và hoàn tất thủ tục bàn giao ngoài thực địa.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-2.5 sm:gap-space-sm mt-3 sm:mt-space-md">
              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  assignment_turned_in
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Điều phối ca trực &amp; Địa bàn:</strong> Tiếp nhận
                  nhiệm vụ tự động theo khu vực hành chính (phường/xã/tổ đội) hoặc
                  chuyên môn hạ tầng được giao.
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  notifications_active
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Báo động đỏ sự cố (Urgent):</strong> Nhận âm thanh
                  chuông báo nghiệp vụ đặc chủng khi phát sinh sự cố ngập úng
                  nghiêm trọng hoặc sập đổ cây xanh.
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  explore
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Bản đồ số GIS dẫn đường:</strong> Dẫn hướng chính xác
                  đến từng hố ga, cọc tiêu, tủ điện hạ thế kèm thông số kỹ thuật
                  ngầm hiển thị theo lớp.
                </p>
              </div>

              <div className="flex items-start gap-2 sm:gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
                  camera_enhance
                </span>
                <p className="font-body-sm text-xs sm:text-body-sm text-on-surface leading-relaxed">
                  <strong>Nghiệm thu đóng Ticket chuẩn SLA:</strong> Chụp ảnh
                  sau xử lý, ký biên bản điện tử và gửi xác thực tức thời về
                  trung tâm giám sát IOC.
                </p>
              </div>
            </div>
          </div>

          {/* Mode Footer Stamp */}
          <div className="mt-4 sm:mt-space-lg pt-2.5 sm:pt-space-sm border-t border-outline-variant/60 flex flex-wrap items-center justify-between text-on-surface-variant font-code-tabular text-xs sm:text-body-sm gap-1">
            <span>Tiêu chuẩn xử lý: ISO 37120</span>
            <span className="text-secondary font-medium">
              Xác thực: VNeID / Công vụ Gov
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualViewSection;
