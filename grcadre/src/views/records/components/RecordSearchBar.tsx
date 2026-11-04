import React from 'react';

interface RecordSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onScanQr: () => void;
}

export const RecordSearchBar: React.FC<RecordSearchBarProps> = ({
  value,
  onChange,
  onClear,
  onScanQr,
}) => {
  return (
    <div className="!px-margin !pt-space-sm !pb-space-xs">
      <div className="flex items-center gap-space-sm">
        <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg !px-3 !py-2 shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline text-[20px] mr-2 select-none">
            search
          </span>
          <input
            type="text"
            className="w-full bg-transparent text-on-surface placeholder:text-outline text-body-md font-body-md outline-none"
            placeholder="Tìm mã SC-2026-XXXX, tên đường..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-outline hover:text-on-surface active:scale-90 transition-transform cursor-pointer"
              title="Xóa tìm kiếm"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Quét mã QR hồ sơ giấy"
          onClick={onScanQr}
          className="w-10 h-10 shrink-0 bg-primary-container text-on-primary rounded-lg flex items-center justify-center hover:bg-primary active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Quét mã QR hồ sơ giấy"
        >
          <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
        </button>
      </div>
    </div>
  );
};

export default RecordSearchBar;
