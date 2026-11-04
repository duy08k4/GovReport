import React from "react";

interface SlaHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryCode: string;
}

const SlaHistoryModal: React.FC<SlaHistoryModalProps> = ({
  isOpen,
  onClose,
  categoryCode,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-lg max-w-xl w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              history_edu
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Lịch Sử Điều Chỉnh Danh Mục SLA
            </h3>
          </div>
          <button
            className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Đóng cửa sổ"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body logs */}
        <div className="space-y-3 font-body-sm text-body-sm text-on-surface max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20">
            <div className="flex items-center justify-between font-code-tabular text-code-tabular">
              <span className="font-bold text-primary">
                ADMIN: Root Administrator (ID: 001)
              </span>
              <span className="text-outline text-xs">14:22:09 - 18/05/2025</span>
            </div>
            <div className="text-on-surface">
              Rút ngắn SLA tiếp nhận: <strong>2 giờ → 1 giờ</strong>. Mã:{" "}
              <span className="font-code-tabular text-secondary font-semibold">
                {categoryCode}
              </span>
            </div>
            <div className="text-on-surface-variant font-label-sm text-label-sm">
              Căn cứ: Nghị quyết tăng cường ATGT mùa mưa bão năm 2025.
            </div>
          </div>

          <div className="p-space-sm rounded bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20">
            <div className="flex items-center justify-between font-code-tabular text-code-tabular">
              <span className="font-bold text-primary">
                ADMIN: Hệ Thống Tự Động (SYSTEM)
              </span>
              <span className="text-outline text-xs">08:00:00 - 01/01/2025</span>
            </div>
            <div className="text-on-surface">
              Khởi tạo quy chuẩn SLA mặc định QCVN 07:2023.
            </div>
            <div className="text-on-surface-variant font-label-sm text-label-sm">
              Nguồn: Quy chuẩn kỹ thuật quốc gia về công trình hạ tầng kỹ thuật.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-outline-variant/20">
          <button
            className="px-space-md h-9 rounded bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors cursor-pointer font-medium"
            onClick={onClose}
            type="button"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlaHistoryModal;
