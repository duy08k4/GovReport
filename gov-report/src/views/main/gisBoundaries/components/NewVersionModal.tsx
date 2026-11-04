import React, { useState } from "react";

interface NewVersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVersion: (versionData: {
    versionCode: string;
    decreeCode: string;
    effectiveDate: string;
    description: string;
  }) => void;
}

const NewVersionModal: React.FC<NewVersionModalProps> = ({
  isOpen,
  onClose,
  onAddVersion,
}) => {
  const [versionCode, setVersionCode] = useState("v2026.2");
  const [decreeCode, setDecreeCode] = useState("QĐ-102/2026/UBND");
  const [effectiveDate, setEffectiveDate] = useState("01/07/2026");
  const [description, setDescription] = useState(
    "Điều chỉnh ranh giới phân định tuyến phố đi bộ mở rộng và phân kỳ quản lý hạ tầng đô thị."
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!versionCode.trim() || !decreeCode.trim()) {
      alert("Vui lòng nhập đầy đủ Mã phiên bản và Số quyết định pháp lý.");
      return;
    }

    onAddVersion({
      versionCode: versionCode.trim(),
      decreeCode: decreeCode.trim(),
      effectiveDate: effectiveDate.trim(),
      description: description.trim(),
    });

    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-on-background/40 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl z-50 p-6 border border-outline-variant/30 flex flex-col gap-4 font-body-sm text-body-sm">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">
              add_circle
            </span>
            <span className="font-headline-sm text-base font-bold text-on-surface">
              Cập Nhật Phiên Bản Ranh Giới Pháp Lý Mới
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm font-semibold text-on-surface">
                Mã phiên bản (Version)
              </label>
              <input
                value={versionCode}
                onChange={(e) => setVersionCode(e.target.value)}
                required
                className="h-9 px-3 rounded bg-surface-container-low text-on-surface border border-outline-variant/40 text-xs font-mono"
                placeholder="VD: v2026.2"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm font-semibold text-on-surface">
                Số quyết định pháp lý
              </label>
              <input
                value={decreeCode}
                onChange={(e) => setDecreeCode(e.target.value)}
                required
                className="h-9 px-3 rounded bg-surface-container-low text-on-surface border border-outline-variant/40 text-xs"
                placeholder="VD: QĐ-88/2026/UBND"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm font-semibold text-on-surface">
              Ngày hiệu lực
            </label>
            <input
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="h-9 px-3 rounded bg-surface-container-low text-on-surface border border-outline-variant/40 text-xs font-mono"
              placeholder="VD: 01/01/2026"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm font-semibold text-on-surface">
              Ghi chú nội dung quy hoạch / điều chỉnh
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2.5 rounded bg-surface-container-low text-on-surface border border-outline-variant/40 text-xs resize-none"
              placeholder="Mô tả căn cứ sáp nhập, điều chỉnh ranh giới..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-medium text-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors font-semibold text-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Lưu phiên bản</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewVersionModal;
