import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

// Image
import GovReportLogo from "../../../assets/govReport.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant py-space-lg sm:py-space-xl px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-lg sm:gap-space-xl">
        {/* Col 1: Brand Info */}
        <div className="flex flex-col gap-space-xs sm:gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <img
              alt="Logo GovReport"
              className="h-6 sm:h-7 w-auto object-contain"
              src={GovReportLogo}
            />
            <span className="font-headline-sm text-sm sm:text-headline-sm text-primary-container font-semibold">
              GovReport - Nền tảng Dữ liệu Không gian Đô thị
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
            Hệ sinh thái tiếp nhận, giám sát và phân phối tự động phản ánh sự cố đô
            thị dựa trên nền tảng dữ liệu không gian thực (GIS) và mô hình quản trị
            đa cơ quan (Multi-tenant).
          </p>
          <div className="flex items-start gap-space-xs pt-space-xs text-secondary">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px] shrink-0 mt-0.5">
              verified_user
            </span>
            <span className="font-label-sm text-xs sm:text-label-sm text-on-surface-variant">
              Tuân thủ tiêu chuẩn an toàn thông tin cấp độ 3 theo quy chuẩn Cơ quan
              Nhà nước.
            </span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="flex flex-col gap-space-xs sm:gap-space-sm">
          <span className="font-label-sm text-xs sm:text-label-sm text-outline uppercase tracking-wider font-semibold">
            DANH MỤC LIÊN KẾT
          </span>
          <nav className="flex flex-col gap-1 sm:gap-space-xs">
            <Link
              className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
              to={ROUTES.HOME}
            >
              Trang chủ
            </Link>
            <Link
              className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
              to={ROUTES.ABOUT}
            >
              Về chúng tôi
            </Link>
            <Link
              className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
              to={ROUTES.DOWNLOAD}
            >
              Tải ứng dụng công dân &amp; cán bộ
            </Link>
            <a
              className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
              href="#guide"
            >
              Hướng dẫn gửi phản ánh
            </a>
            <a
              className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
              href="#lookup"
            >
              Tra cứu tiến độ hồ sơ qua mã Ticket
            </a>
          </nav>
        </div>

        {/* Col 3: 24/7 Hotline */}
        <div className="flex flex-col gap-space-xs sm:gap-space-sm">
          <span className="font-label-sm text-xs sm:text-label-sm text-outline uppercase tracking-wider font-semibold">
            TRỰC BAN VẬN HÀNH 24/7
          </span>
          <div className="flex flex-col gap-1 sm:gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">
                call
              </span>
              <span className="font-body-sm text-xs sm:text-body-sm font-semibold text-on-surface">
                1900 xxxx
              </span>
            </div>
            <p className="font-label-sm text-[11px] sm:text-label-sm text-on-surface-variant pl-5 sm:pl-6">
              (Nhánh 1: Hỗ trợ người dân | Nhánh 2: Kênh kỹ thuật cơ quan)
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">
                mail
              </span>
              <a
                className="font-body-sm text-xs sm:text-body-sm text-secondary hover:underline"
                href="mailto:hotro@govreport.gov.vn"
              >
                hotro@govreport.gov.vn
              </a>
            </div>
          </div>
          <div className="pt-space-sm sm:pt-space-md border-t border-outline-variant/60 mt-1 sm:mt-2">
            <p className="font-label-sm text-[11px] sm:text-label-sm text-outline">
              © 2026 GovReport. Bảo lưu mọi quyền. Phát triển phục vụ hiện đại hóa
              hạ tầng đô thị.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
