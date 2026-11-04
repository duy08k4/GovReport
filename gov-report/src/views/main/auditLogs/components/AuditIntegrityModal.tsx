import React from "react";

interface AuditIntegrityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuditIntegrityModal: React.FC<AuditIntegrityModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4 animate-fadeIn"
      id="integrityModal"
    >
      <div className="w-full max-w-lg rounded bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md border border-outline-variant/30 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg sm:text-headline-sm text-on-surface font-bold">
              Xác Thực Chuỗi Băm Hoàn Tất
            </span>
            <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant font-code-tabular">
              Thuật toán SHA-256 • Kiểm định Merkle Tree
            </span>
          </div>
        </div>

        {/* Verification Summary Box */}
        <div className="p-space-md rounded bg-surface-container-low font-code-tabular text-[13px] space-y-2 text-on-surface border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">Số lượng bản ghi kiểm định:</span>
            <span className="font-bold">1,842,903 khối</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">
              Bản ghi bị chỉnh sửa hoặc chèn lệch:
            </span>
            <span className="font-bold text-tertiary-fixed-variant flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
              0 (Tính toàn vẹn 100%)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-on-surface-variant">
              Chữ ký số kiểm định mới nhất:
            </span>
            <span className="font-bold">Ban Cơ Yếu Chính Phủ</span>
          </div>
          <div className="text-[11px] text-outline pt-2 border-t border-surface-container leading-relaxed">
            Không phát hiện bất kỳ dấu hiệu can thiệp trực tiếp từ cơ sở dữ liệu vật lý
            hoặc rò rỉ quyền hạn quản trị. Chuỗi khối bất biến hoàn toàn toàn vẹn.
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <button
            onClick={onClose}
            className="px-space-md h-9 rounded bg-primary-container text-surface-container-lowest font-label-lg text-label-lg hover:bg-primary transition-colors cursor-pointer font-semibold shadow-sm"
            id="closeModalBtn"
            type="button"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditIntegrityModal;
