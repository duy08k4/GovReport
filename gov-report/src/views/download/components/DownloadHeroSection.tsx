import React from "react";

const DownloadHeroSection: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center text-center py-6 sm:py-8 md:py-space-lg px-2 sm:px-space-xs">
      {/* Badge định danh */}
      <div className="inline-flex items-center gap-1.5 bg-[#E0F2FE] text-[#0084A3] px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold rounded-[4px] border border-[#B8EAFF] uppercase tracking-wider mb-3 sm:mb-space-sm">
        <span className="material-symbols-outlined text-[15px] sm:text-[16px]">chevron_forward</span>
        <span>Ứng dụng di động dùng chung toàn hệ thống</span>
      </div>

      {/* Headline H1 */}
      <h1 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl lg:text-headline-xl text-primary font-bold tracking-tight max-w-4xl leading-tight">
        Một Ứng Dụng Duy Nhất Cho Mọi Nhu Cầu Tác Chiến &amp; Phản Ánh
      </h1>

      {/* Sub-headline */}
      <p className="font-body-lg text-sm sm:text-base lg:text-body-lg text-on-surface-variant mt-3 sm:mt-space-sm max-w-3xl leading-relaxed">
        Hệ thống tự động nhận diện vai trò tài khoản để hiển thị giao diện phù hợp:
        Giao diện Tối giản 1 chạm cho Người dân và Bảng điều khiển Tác chiến hiện
        trường cho Cán bộ công quyền.
      </p>

      {/* Operational KPI quick tags */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-space-sm mt-6 sm:mt-space-lg w-full max-w-3xl">
        <div className="bg-surface-container-lowest p-3 sm:p-space-sm border border-outline-variant rounded-lg flex flex-col items-center shadow-sm">
          <span className="font-code-tabular text-xl sm:text-headline-sm text-primary font-bold">
            0.8s
          </span>
          <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant uppercase mt-0.5 font-medium">
            Khởi động camera
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3 sm:p-space-sm border border-outline-variant rounded-lg flex flex-col items-center shadow-sm">
          <span className="font-code-tabular text-xl sm:text-headline-sm text-secondary font-bold">
            &lt; 3m
          </span>
          <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant uppercase mt-0.5 font-medium">
            Độ lệch GPS chuẩn
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3 sm:p-space-sm border border-outline-variant rounded-lg flex flex-col items-center shadow-sm">
          <span className="font-code-tabular text-xl sm:text-headline-sm text-primary font-bold">
            100%
          </span>
          <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant uppercase mt-0.5 font-medium">
            Dữ liệu mã hóa AES
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3 sm:p-space-sm border border-outline-variant rounded-lg flex flex-col items-center shadow-sm">
          <span className="font-code-tabular text-xl sm:text-headline-sm text-secondary font-bold">
            24/7
          </span>
          <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant uppercase mt-0.5 font-medium">
            Đồng bộ nền PostGIS
          </span>
        </div>
      </div>
    </section>
  );
};

export default DownloadHeroSection;
