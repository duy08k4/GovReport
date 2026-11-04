import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";
import { isDesktopApp } from "../../../utils/platform";
import GovReportLogo from "../../../assets/govReport.png";

const AuthHeader: React.FC = () => {
  const isDesktop = isDesktopApp();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand with official Logo */}
        <Link
          to={isDesktop ? ROUTES.LOGIN : ROUTES.HOME}
          className="flex items-center gap-2 sm:gap-space-sm group"
        >
          <img
            alt="Logo GovReport"
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={GovReportLogo}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-space-xs">
              <span className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold tracking-tight">
                GovReport
              </span>
              <span className="font-code-tabular text-[10px] sm:text-label-sm uppercase bg-surface-container text-secondary px-1.5 py-0.5 rounded font-semibold">
                GIS Cấp 3
              </span>
            </div>
            <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant hidden md:block">
              Hệ thống Phản ánh &amp; Điều phối Hạ tầng Đô thị
            </span>
          </div>
        </Link>

        {/* Navigation Action - chỉ hiển thị trên Web, ẩn trên Desktop */}
        {!isDesktop && (
          <nav>
            <Link
              to={ROUTES.HOME}
              className="font-label-lg text-xs sm:text-label-lg text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded hover:bg-surface-container-low font-medium"
            >
              <span className="material-symbols-outlined text-[17px] sm:text-[18px]">
                arrow_back
              </span>
              <span>Quay lại Trang chủ</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
