import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

const DownloadBreadcrumb: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between py-2 sm:py-space-sm border-b border-outline-variant/60 mb-space-sm sm:mb-space-md gap-2">
      {/* Micro-Nav Breadcrumb */}
      <div className="flex items-center flex-wrap gap-1 sm:gap-space-xs font-label-sm text-xs sm:text-label-sm text-on-surface-variant">
        <Link to={ROUTES.HOME} className="hover:text-primary transition-colors">
          GovReport
        </Link>
        <span className="text-outline">/</span>
        <span className="hidden xs:inline">Kênh Phân Phối Thiết Bị</span>
        <span className="text-outline hidden xs:inline">/</span>
        <span className="text-secondary font-semibold">Tải Ứng Dụng Di Động</span>
      </div>

      {/* Operational Status Indicator */}
      <div className="inline-flex items-center gap-1.5 sm:gap-space-xs font-code-tabular text-[11px] sm:text-body-sm text-on-surface-variant bg-surface-container px-2 sm:px-space-sm py-0.5 rounded self-start sm:self-auto">
        <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse shrink-0"></span>
        <span className="font-medium">Hệ sinh thái di động: VẬN HÀNH ỔN ĐỊNH</span>
      </div>
    </div>
  );
};

export default DownloadBreadcrumb;
