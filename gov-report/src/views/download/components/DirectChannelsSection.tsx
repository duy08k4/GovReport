import React from "react";

const DirectChannelsSection: React.FC = () => {
  return (
    <section className="w-full mt-8 sm:mt-space-xl">
      <div className="border-b border-outline-variant pb-2 sm:pb-space-xs mb-4 sm:mb-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0">
        <div>
          <h2 className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold uppercase tracking-tight">
            Kênh Phân Phối Trực Tiếp
          </h2>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
            Chọn nền tảng phù hợp với thiết bị đầu cuối của bạn
          </p>
        </div>
        <span className="font-code-tabular text-xs sm:text-body-sm text-on-surface-variant bg-surface-container px-2 sm:px-2.5 py-1 rounded self-start sm:self-auto font-medium">
          BUILD: 2026.04-RC2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-space-lg">
        {/* Cột 1: Dành cho thiết bị Apple iOS */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 sm:p-space-lg flex flex-col items-center text-center shadow-sm">
          {/* Huy hiệu */}
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-surface-container text-on-surface-variant rounded text-[11px] sm:text-label-sm font-label-sm font-semibold mb-3 sm:mb-space-md">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-primary">
              file_download
            </span>
            <span>Phiên bản dành cho iOS 14.0 trở lên</span>
          </div>

          <h3 className="font-headline-sm text-lg sm:text-headline-sm text-primary font-bold">
            Apple iOS &amp; iPadOS
          </h3>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1 mb-3 sm:mb-space-md max-w-sm leading-relaxed">
            Tối ưu hóa phần cứng chip Apple Neural Engine để hỗ trợ nhận diện sơ
            bộ loại sự cố thông qua camera.
          </p>

          {/* QR Code Container */}
          <div className="p-3 bg-white border border-outline-variant rounded-lg flex flex-col items-center shadow-sm">
            <svg
              className="w-32 h-32 sm:w-40 sm:h-40"
              fill="none"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#FFFFFF" height="160" width="160" />
              {/* Top Left Finder */}
              <rect
                fill="none"
                height="40"
                stroke="#102A43"
                strokeWidth="4"
                width="40"
                x="12"
                y="12"
              />
              <rect fill="#102A43" height="20" width="20" x="22" y="22" />
              {/* Top Right Finder */}
              <rect
                fill="none"
                height="40"
                stroke="#102A43"
                strokeWidth="4"
                width="40"
                x="108"
                y="12"
              />
              <rect fill="#102A43" height="20" width="20" x="118" y="22" />
              {/* Bottom Left Finder */}
              <rect
                fill="none"
                height="40"
                stroke="#102A43"
                strokeWidth="4"
                width="40"
                x="12"
                y="108"
              />
              <rect fill="#102A43" height="20" width="20" x="22" y="118" />
              {/* Data Grid Cells Matrix */}
              <rect fill="#102A43" height="8" width="8" x="60" y="16" />
              <rect fill="#102A43" height="8" width="8" x="76" y="16" />
              <rect fill="#102A43" height="8" width="8" x="92" y="16" />
              <rect fill="#0084A3" height="8" width="16" x="68" y="28" />
              <rect fill="#102A43" height="16" width="8" x="60" y="44" />
              <rect fill="#102A43" height="8" width="8" x="76" y="44" />
              <rect fill="#0084A3" height="16" width="8" x="92" y="44" />
              <rect fill="#102A43" height="8" width="8" x="16" y="60" />
              <rect fill="#102A43" height="8" width="16" x="32" y="68" />
              <rect fill="#102A43" height="8" width="16" x="16" y="84" />
              <rect fill="#0084A3" height="8" width="8" x="36" y="92" />
              <rect fill="#E2E8F0" height="24" width="40" x="60" y="68" />
              <text
                fill="#102A43"
                fontFamily="Inter, sans-serif"
                fontSize="9"
                fontWeight="700"
                textAnchor="middle"
                x="80"
                y="84"
              >
                iOS GOV
              </text>
              <rect fill="#102A43" height="8" width="16" x="112" y="60" />
              <rect fill="#102A43" height="16" width="8" x="136" y="68" />
              <rect fill="#0084A3" height="8" width="8" x="112" y="84" />
              <rect fill="#102A43" height="8" width="16" x="128" y="92" />
              <rect fill="#102A43" height="16" width="8" x="60" y="104" />
              <rect fill="#102A43" height="8" width="16" x="76" y="112" />
              <rect fill="#102A43" height="8" width="8" x="100" y="104" />
              <rect fill="#0084A3" height="16" width="8" x="68" y="128" />
              <rect fill="#102A43" height="8" width="16" x="84" y="136" />
              <rect fill="#102A43" height="8" width="16" x="108" y="120" />
              <rect fill="#102A43" height="16" width="16" x="132" y="132" />
            </svg>
            <span className="font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              Quét bằng ứng dụng Camera iPhone
            </span>
          </div>

          {/* Download Action Button */}
          <a
            className="bg-primary-container hover:bg-primary text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-[6px] w-full flex items-center justify-center gap-2 mt-3 sm:mt-space-md transition-colors shadow-sm"
            href="#download-ios"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">ios</span>
            <span className="font-label-lg text-xs sm:text-label-lg">Tải từ App Store</span>
          </a>

          {/* Specs Sub-table */}
          <div className="mt-3 sm:mt-space-md pt-2.5 sm:pt-space-sm border-t border-surface-container w-full grid grid-cols-3 text-left gap-1">
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline">Dung lượng</span>
              <span className="font-code-tabular text-xs sm:text-body-sm font-semibold text-primary">
                ~35 MB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline">Hỗ trợ</span>
              <span className="font-body-sm text-xs sm:text-body-sm font-semibold text-primary truncate">
                iPhone, iPad
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline">Phiên bản</span>
              <span className="font-code-tabular text-xs sm:text-body-sm font-semibold text-secondary truncate">
                v2.4.0 (Ổn định)
              </span>
            </div>
          </div>
        </div>

        {/* Cột 2: Dành cho thiết bị Android */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 sm:p-space-lg flex flex-col items-center text-center shadow-sm">
          {/* Huy hiệu */}
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-surface-container text-on-surface-variant rounded text-[11px] sm:text-label-sm font-label-sm font-semibold mb-3 sm:mb-space-md">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#006780]">
              android
            </span>
            <span>Phiên bản dành cho Android 8.0 trở lên</span>
          </div>

          <h3 className="font-headline-sm text-lg sm:text-headline-sm text-primary font-bold">
            Google Android &amp; Máy trạm
          </h3>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1 mb-3 sm:mb-space-md max-w-sm leading-relaxed">
            Được tối ưu cho mọi cấu hình thiết bị, hỗ trợ máy tính bảng chuyên
            dụng của lực lượng Thanh tra Đô thị.
          </p>

          {/* QR Code Container */}
          <div className="p-3 bg-white border border-outline-variant rounded-lg flex flex-col items-center shadow-sm">
            <svg
              className="w-32 h-32 sm:w-40 sm:h-40"
              fill="none"
              viewBox="0 0 160 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#FFFFFF" height="160" width="160" />
              {/* Top Left Finder */}
              <rect
                fill="none"
                height="40"
                stroke="#006780"
                strokeWidth="4"
                width="40"
                x="12"
                y="12"
              />
              <rect fill="#006780" height="20" width="20" x="22" y="22" />
              {/* Top Right Finder */}
              <rect
                fill="none"
                height="40"
                stroke="#006780"
                strokeWidth="4"
                width="40"
                x="108"
                y="12"
              />
              <rect fill="#006780" height="20" width="20" x="118" y="22" />
              {/* Bottom Left Finder */}
              <rect
                fill="none"
                height="40"
                stroke="#006780"
                strokeWidth="4"
                width="40"
                x="12"
                y="108"
              />
              <rect fill="#006780" height="20" width="20" x="22" y="118" />
              {/* Data Grid Cells Matrix */}
              <rect fill="#102A43" height="8" width="12" x="64" y="16" />
              <rect fill="#006780" height="8" width="12" x="84" y="16" />
              <rect fill="#102A43" height="16" width="8" x="60" y="28" />
              <rect fill="#006780" height="8" width="8" x="76" y="28" />
              <rect fill="#102A43" height="12" width="8" x="92" y="32" />
              <rect fill="#006780" height="8" width="12" x="16" y="64" />
              <rect fill="#102A43" height="12" width="8" x="36" y="60" />
              <rect fill="#102A43" height="8" width="16" x="20" y="80" />
              <rect fill="#006780" height="8" width="12" x="40" y="88" />
              <rect fill="#D8E3FB" height="24" width="40" x="60" y="68" />
              <text
                fill="#006780"
                fontFamily="Inter, sans-serif"
                fontSize="9"
                fontWeight="700"
                textAnchor="middle"
                x="80"
                y="84"
              >
                ANDROID
              </text>
              <rect fill="#102A43" height="16" width="8" x="112" y="64" />
              <rect fill="#006780" height="8" width="16" x="128" y="60" />
              <rect fill="#102A43" height="12" width="12" x="124" y="80" />
              <rect fill="#006780" height="8" width="16" x="60" y="108" />
              <rect fill="#102A43" height="12" width="12" x="84" y="104" />
              <rect fill="#102A43" height="16" width="8" x="64" y="128" />
              <rect fill="#006780" height="8" width="12" x="80" y="124" />
              <rect fill="#102A43" height="8" width="8" x="96" y="136" />
              <rect fill="#102A43" height="12" width="12" x="112" y="112" />
              <rect fill="#006780" height="8" width="16" x="132" y="120" />
              <rect fill="#102A43" height="8" width="12" x="116" y="136" />
            </svg>
            <span className="font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
              Quét bằng Google Lens hoặc Camera
            </span>
          </div>

          {/* Download Action Button */}
          <a
            className="bg-primary-container hover:bg-primary text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-[6px] w-full flex items-center justify-center gap-2 mt-3 sm:mt-space-md transition-colors shadow-sm"
            href="#download-android"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shop</span>
            <span className="font-label-lg text-xs sm:text-label-lg">Tải từ Google Play</span>
          </a>

          {/* Secondary Direct APK Link */}
          <a
            className="inline-flex items-center gap-1 text-[#0084A3] hover:text-[#006077] underline font-medium text-xs sm:text-sm mt-2.5 sm:mt-3 transition-colors text-center"
            href="#download-apk"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">file_download</span>
            <span>Tải file APK trực tiếp (Dành cho thiết bị chuyên dụng của Cán bộ)</span>
          </a>

          {/* Specs Sub-table */}
          <div className="mt-3 sm:mt-space-md pt-2.5 sm:pt-space-sm border-t border-surface-container w-full grid grid-cols-3 text-left gap-1">
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline">Dung lượng</span>
              <span className="font-code-tabular text-xs sm:text-body-sm font-semibold text-primary">
                ~28 MB
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline">Hỗ trợ</span>
              <span className="font-body-sm text-xs sm:text-body-sm font-semibold text-primary truncate">
                Các máy Android
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] sm:text-label-sm text-outline">Phiên bản</span>
              <span className="font-code-tabular text-xs sm:text-body-sm font-semibold text-secondary truncate">
                v2.4.0 (Ổn định)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectChannelsSection;
