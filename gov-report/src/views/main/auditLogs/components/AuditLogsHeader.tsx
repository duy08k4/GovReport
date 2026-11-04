import React from "react";

interface AuditLogsHeaderProps {
  onVerifyHash: () => void;
  onExportReport: () => void;
}

const AuditLogsHeader: React.FC<AuditLogsHeaderProps> = ({
  onVerifyHash,
  onExportReport,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
      <div className="flex flex-col gap-space-xs">
        <div className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-code-tabular text-code-tabular">
          <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface border border-outline-variant/30">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            SHA-256 APPEND-ONLY LOG
          </span>
          <span>•</span>
          <span className="text-xs sm:text-code-tabular">
            Tiêu Chuẩn ATTT Cấp Độ 3 (Nghị định 85/2016/NĐ-CP)
          </span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface tracking-tight font-bold">
          Nhật Ký Kiểm Toán Hệ Thống Bất Biến
        </h1>
        <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant max-w-3xl">
          Lưu vết bất biến toàn bộ hành vi an toàn thông tin, can thiệp điều phối và cập nhật
          ranh giới GIS phục vụ thanh tra công vụ.
        </p>
      </div>

      {/* Top Action CTAs */}
      <div className="flex flex-wrap items-center gap-space-sm shrink-0">
        <button
          onClick={onVerifyHash}
          id="verifyHashBtn"
          className="inline-flex items-center gap-space-xs px-space-md h-9 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer border border-outline-variant/30 font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            verified_user
          </span>
          <span>Kiểm tra chuỗi băm toàn vẹn</span>
        </button>

        <button
          onClick={onExportReport}
          className="inline-flex items-center gap-space-xs px-space-md h-9 rounded bg-primary-container text-surface-container-lowest hover:bg-primary font-label-lg text-label-lg transition-colors shadow-sm cursor-pointer font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">export_notes</span>
          <span>Kết xuất hồ sơ thanh tra</span>
        </button>
      </div>
    </div>
  );
};

export default AuditLogsHeader;
