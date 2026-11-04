import React from "react";

const ArchitectureSection: React.FC = () => {
  return (
    <section className="w-full py-space-lg sm:py-space-xl">
      <div className="flex flex-col mb-space-md sm:mb-space-lg">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px]">
            architecture
          </span>
          <span className="font-label-md text-[11px] sm:text-label-md uppercase tracking-wider text-secondary font-semibold">
            KIẾN TRÚC NỀN TẢNG
          </span>
        </div>
        <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-headline-lg text-primary-container font-bold mt-1">
          Nền Tảng Kiến Trúc Thích Ứng Linh Hoạt
        </h2>
        <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-1 max-w-3xl leading-relaxed">
          Được thiết kế nhằm giải quyết bài toán phức tạp của bộ máy hành chính
          công, vừa đảm bảo tính bảo mật cục bộ, vừa linh hoạt thích ứng trước
          những thay đổi địa giới chính sách.
        </p>
      </div>

      {/* 3 Architecture Feature Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md sm:gap-space-lg">
        {/* BLOCK 1: Multi-tenant */}
        <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-sm sm:mb-space-md">
              <span className="material-symbols-outlined text-[22px] sm:text-[28px]">
                apartment
              </span>
            </div>
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="font-code-tabular text-xs sm:text-label-sm text-secondary font-bold">
                MOD.01
              </span>
              <span className="text-outline-variant font-code-tabular">/</span>
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase font-semibold">
                KIẾN TRÚC TÁCH BIỆT
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary-container font-semibold">
              Cơ chế Đa cơ quan (Multi-tenant Architecture)
            </h3>
            <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-space-xs sm:mt-space-sm leading-relaxed">
              Tách biệt an toàn dữ liệu và quyền tác chiến giữa các đơn vị hành
              chính; hỗ trợ phân cấp từ cấp Tỉnh/Thành phố, Quận/Huyện, Xã/Phường
              đến các doanh nghiệp công ích (Cấp thoát nước, Chiếu sáng công
              cộng, Công viên cây xanh, Môi trường đô thị). Đảm bảo mỗi tenant
              độc lập nghiệp vụ nhưng liên thông dữ liệu điều phối toàn tỉnh.
            </p>
          </div>
          <div className="mt-space-md sm:mt-space-lg pt-space-sm sm:pt-space-md bg-surface-container-low p-space-xs sm:p-space-sm rounded-lg">
            <div className="flex items-center justify-between font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant mb-1">
              <span>Mô hình dữ liệu phân vùng:</span>
              <span className="font-code-tabular font-semibold text-secondary">
                Row Level Security
              </span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
              <div className="bg-secondary h-full w-full"></div>
            </div>
            <span className="font-label-sm text-[10px] sm:text-[11px] text-outline mt-1 block">
              Cô lập hoàn toàn không gian dữ liệu giữa các Sở ngành.
            </span>
          </div>
        </div>

        {/* BLOCK 2: Temporal PostGIS */}
        <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-space-sm sm:mb-space-md">
              <span className="material-symbols-outlined text-[22px] sm:text-[28px]">
                map
              </span>
            </div>
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="font-code-tabular text-xs sm:text-label-sm text-secondary font-bold">
                MOD.02
              </span>
              <span className="text-outline-variant font-code-tabular">/</span>
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase font-semibold">
                KHÔNG GIAN THEO THỜI GIAN
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary-container font-semibold">
              Ranh giới GIS theo phiên bản quyết định (Temporal PostGIS)
            </h3>
            <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-space-xs sm:mt-space-sm leading-relaxed">
              Khi có nghị quyết sáp nhập, chia tách hoặc điều chỉnh địa giới hành
              chính của Quốc hội hay HĐND, quản trị viên chỉ cần cập nhật tập tin
              dữ liệu Shapefile/GeoJSON vào hệ thống. Mọi luồng định tuyến tự động
              chuyển đổi theo ranh giới mới ngay lập tức mà không làm gián đoạn
              vận hành hoặc mất dữ liệu lịch sử phản ánh.
            </p>
          </div>
          <div className="mt-space-md sm:mt-space-lg pt-space-sm sm:pt-space-md bg-surface-container-low p-space-xs sm:p-space-sm rounded-lg">
            <div className="flex items-center justify-between font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant mb-1">
              <span>Định dạng tương thích:</span>
              <span className="font-code-tabular font-semibold text-primary-container">
                GeoJSON / SHP / WKT
              </span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-[10px] sm:text-[11px] text-on-tertiary-container mt-1">
              <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                history
              </span>
              <span>Truy xuất dữ liệu đúng theo niên độ hành chính cũ.</span>
            </div>
          </div>
        </div>

        {/* BLOCK 3: SLA Enforcement */}
        <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-sm sm:mb-space-md">
              <span className="material-symbols-outlined text-[22px] sm:text-[28px]">
                timer
              </span>
            </div>
            <div className="flex items-center gap-space-xs mb-space-xs">
              <span className="font-code-tabular text-xs sm:text-label-sm text-secondary font-bold">
                MOD.03
              </span>
              <span className="text-outline-variant font-code-tabular">/</span>
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase font-semibold">
                TRÁCH NHIỆM MINH BẠCH
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-primary-container font-semibold">
              Cam kết Trách nhiệm Giải trình (SLA Enforcement)
            </h3>
            <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-space-xs sm:mt-space-sm leading-relaxed">
              Quy định khung giờ chuẩn cho từng loại sự cố (Ví dụ: Tiếp nhận trong
              2 giờ, xử lý hố ga mất nắp trong 6 giờ, giải quyết triệt để trong 48
              giờ). Mỗi trạng thái chuyển đổi bắt buộc có ảnh chụp đối soát hiện
              trường và ghi nhận định danh cán bộ thực hiện nhằm loại trừ khả năng
              gian lận tiến độ.
            </p>
          </div>
          <div className="mt-space-md sm:mt-space-lg pt-space-sm sm:pt-space-md bg-surface-container-low p-space-xs sm:p-space-sm rounded-lg">
            <div className="flex items-center justify-between font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant mb-1">
              <span>Kiểm tra thực địa qua ảnh:</span>
              <span className="font-code-tabular font-semibold text-on-tertiary-container">
                BẮT BUỘC TRƯỚC / SAU
              </span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-[10px] sm:text-[11px] text-outline mt-1">
              <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                fingerprint
              </span>
              <span>Gắn mác thời gian thực tế EXIF &amp; GPS metadata.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
