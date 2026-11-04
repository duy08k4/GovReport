import React from "react";

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Top Operational Context Strip */}
      <div className="w-full py-space-xs sm:py-space-sm mb-space-md sm:mb-space-lg flex flex-wrap items-center justify-between gap-2 sm:gap-space-sm bg-surface-container-low px-space-sm sm:px-space-md rounded-lg mt-space-sm sm:mt-space-md">
        <div className="flex items-center gap-space-xs sm:gap-space-sm flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0"></span>
          <span className="font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant uppercase tracking-widest">
            Tài liệu giới thiệu giải pháp kỹ thuật
          </span>
          <span className="text-outline-variant font-code-tabular text-xs sm:text-body-sm hidden xs:inline">
            |
          </span>
          <span className="font-code-tabular text-xs sm:text-body-sm text-secondary font-medium">
            SYS.VER: 3.4.2-STABLE
          </span>
        </div>
        <div className="flex items-center gap-space-sm sm:gap-space-md text-on-surface-variant font-code-tabular text-xs sm:text-body-sm flex-wrap">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
              verified
            </span>
            PostGIS 3.4 Enabled
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
              security
            </span>
            Tiêu chuẩn An toàn Cấp độ 3
          </span>
        </div>
      </div>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full pb-space-lg sm:pb-space-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg sm:gap-space-xl items-start">
          <div className="lg:col-span-8 flex flex-col items-start">
            <div className="inline-flex items-center gap-space-xs bg-secondary-container/30 text-secondary px-2.5 sm:px-3 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-secondary">
                hub
              </span>
              <span className="font-label-sm text-[11px] sm:text-label-sm uppercase tracking-wider font-semibold">
                MÔ HÌNH VẬN HÀNH CÔNG VỤ HIỆN ĐẠI
              </span>
            </div>
            <h1 className="font-headline-xl text-2xl sm:text-3xl lg:text-headline-xl text-primary-container font-bold leading-tight mt-space-sm sm:mt-space-md">
              Hiện Đại Hóa Công Tác Quản Trị Đô Thị Bằng Dữ Liệu Không Gian Số
            </h1>
            <p className="font-body-lg text-sm sm:text-base lg:text-body-lg text-on-surface-variant mt-space-sm sm:mt-space-md max-w-3xl leading-relaxed">
              Xóa bỏ sự chậm trễ của các kênh phản ánh giấy tờ, xây dựng cầu nối số
              minh bạch và có trách nhiệm giải trình giữa người dân và chính quyền đô
              thị.
            </p>

            {/* KPI Summary Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-space-sm w-full mt-space-md sm:mt-space-xl">
              <div className="bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg flex flex-col justify-between shadow-sm">
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase">
                  Tiếp nhận sơ bộ
                </span>
                <span className="font-code-tabular text-lg sm:text-xl lg:text-headline-md text-primary-container font-bold mt-0.5 sm:mt-1">
                  ≤ 2.0{" "}
                  <span className="font-label-md text-xs sm:text-label-md font-normal text-on-surface-variant">
                    giờ
                  </span>
                </span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-on-tertiary-container mt-0.5 sm:mt-1 font-medium">
                  ↑ 99.4% đúng hạn
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg flex flex-col justify-between shadow-sm">
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase">
                  Định tuyến PostGIS
                </span>
                <span className="font-code-tabular text-lg sm:text-xl lg:text-headline-md text-secondary font-bold mt-0.5 sm:mt-1">
                  &lt; 45{" "}
                  <span className="font-label-md text-xs sm:text-label-md font-normal text-on-surface-variant">
                    ms
                  </span>
                </span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant mt-0.5 sm:mt-1">
                  Chuẩn không gian thực
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg flex flex-col justify-between shadow-sm">
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase">
                  Khấu hao giấy tờ
                </span>
                <span className="font-code-tabular text-lg sm:text-xl lg:text-headline-md text-primary-container font-bold mt-0.5 sm:mt-1">
                  -88%
                </span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-on-tertiary-container mt-0.5 sm:mt-1 font-medium">
                  Quy trình số 100%
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg flex flex-col justify-between shadow-sm">
                <span className="font-label-sm text-[10px] sm:text-label-sm text-outline uppercase">
                  Bảo mật thông tin
                </span>
                <span className="font-code-tabular text-lg sm:text-xl lg:text-headline-md text-primary-container font-bold mt-0.5 sm:mt-1">
                  Cấp 3
                </span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant mt-0.5 sm:mt-1">
                  Tuân thủ pháp lệnh
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Specimen Card */}
          <div className="lg:col-span-4 w-full flex flex-col gap-space-sm">
            <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-sm">
              <div className="flex items-center justify-between pb-space-xs sm:pb-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px]">
                    radar
                  </span>
                  <span className="font-label-md text-xs sm:text-label-md font-semibold text-primary-container">
                    ĐIỀU PHỐI KHÔNG GIAN THỰC
                  </span>
                </div>
                <span className="font-code-tabular text-[10px] sm:text-label-sm bg-surface-container text-on-surface-variant px-1.5 sm:px-2 py-0.5 rounded-lg">
                  ACTIVE EPSG:4326
                </span>
              </div>

              {/* Mini Operational Visual Simulation */}
              <div className="w-full bg-surface-container-low rounded-lg p-space-sm sm:p-space-md flex flex-col gap-space-sm my-space-sm">
                <div className="flex items-center justify-between font-code-tabular text-xs sm:text-body-sm text-on-surface-variant">
                  <span>ĐIỂM SỰ CỐ: #TK-8492</span>
                  <span className="text-error font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-error inline-block"></span>
                    CẤP BÁCH
                  </span>
                </div>

                {/* Graphic Dispatch Vector */}
                <div className="w-full h-20 sm:h-24 bg-surface-container-lowest rounded-lg p-space-xs sm:p-space-sm flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-secondary via-transparent to-primary"></div>
                  <div className="flex items-center justify-between z-10 px-1 sm:px-2">
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[22px]">
                        pin_drop
                      </span>
                      <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface font-semibold">
                        Tọa độ GPS
                      </span>
                      <span className="font-code-tabular text-[9px] sm:text-[10px] text-on-surface-variant">
                        10.7769, 106.7009
                      </span>
                    </div>
                    <div className="flex-1 mx-1.5 sm:mx-2 flex flex-col items-center">
                      <span className="font-code-tabular text-[9px] sm:text-[10px] text-secondary font-semibold">
                        POSTGIS PIPELINE
                      </span>
                      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
                        <div className="w-full h-full bg-secondary animate-pulse"></div>
                      </div>
                      <span className="font-code-tabular text-[8px] sm:text-[9px] text-on-surface-variant mt-1 text-center">
                        0.038s MATCH POLYGON
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary-container text-[18px] sm:text-[22px]">
                        account_balance
                      </span>
                      <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface font-semibold text-center">
                        Đơn vị thụ lý
                      </span>
                      <span className="font-code-tabular text-[9px] sm:text-[10px] text-on-surface-variant text-center">
                        UBND Phường Bến Nghé
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-body-sm flex-wrap gap-1">
                  <span className="text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
                    Trạng thái tự động:
                  </span>
                  <span className="font-code-tabular text-[11px] sm:text-label-sm font-semibold text-secondary">
                    ĐÃ PHÂN BỔ ĐÚNG THẨM QUYỀN
                  </span>
                </div>
              </div>

              <div className="pt-space-xs text-on-surface-variant font-body-sm text-xs sm:text-body-sm leading-relaxed">
                Hệ thống loại bỏ hoàn toàn giai đoạn chuyển tiếp hồ sơ trung gian
                bằng cách nạp trực tiếp ranh giới số vào tầng truy vấn cơ sở dữ
                liệu.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
