import React from "react";

interface SlaHeaderProps {
  onOpenNewDrawer: () => void;
  onExport: () => void;
}

const SlaHeader: React.FC<SlaHeaderProps> = ({ onOpenNewDrawer, onExport }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Quy chuẩn QCVN 07:2023/BXD
          </span>
          <span className="text-outline text-label-sm font-label-sm">•</span>
          <span className="font-code-tabular text-code-tabular text-on-surface-variant">
            Phân luồng tự động cấp quốc gia
          </span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-primary tracking-tight font-bold">
          Danh Mục Sự Cố &amp; Khung Cam Kết Dịch Vụ (SLA)
        </h1>
        <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
          Thiết lập chỉ tiêu thời gian phản ứng nhanh và phân luồng tiếp nhận công ích.
          Toàn bộ thông số điều chỉnh sẽ được kích hoạt đồng bộ đến Trung tâm điều hành
          thông minh (IOC) 63 tỉnh/thành.
        </p>
      </div>

      <div className="flex items-center gap-space-sm shrink-0">
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-space-md h-9 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-lg text-label-lg shadow-sm transition-colors border border-outline-variant/30 cursor-pointer font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            file_download
          </span>
          <span>Xuất khung chỉ tiêu</span>
        </button>

        <button
          onClick={onOpenNewDrawer}
          className="inline-flex items-center gap-2 px-space-md h-9 rounded bg-primary-container hover:bg-primary text-surface font-label-lg text-label-lg shadow-sm transition-colors cursor-pointer font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
            add_circle
          </span>
          <span>Thêm danh mục sự cố mới</span>
        </button>
      </div>
    </div>
  );
};

export default SlaHeader;
