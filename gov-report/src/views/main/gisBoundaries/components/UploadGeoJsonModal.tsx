import React, { useState } from "react";

interface UploadGeoJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (filename: string) => void;
}

const UploadGeoJsonModal: React.FC<UploadGeoJsonModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [srid, setSrid] = useState("4326");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Vui lòng chọn tập tin GeoJSON hoặc Shapefile (.zip).");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUploadSuccess(selectedFile.name);
      onClose();
    }, 900);
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
              upload_file
            </span>
            <span className="font-headline-sm text-base font-bold text-on-surface">
              Tải Lên Lớp Địa Giới Không Gian Mới
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
          <div className="flex flex-col gap-1">
            <label className="font-label-sm font-semibold text-on-surface">
              Chọn tập tin bản đồ (.geojson, .json, .zip Shapefile)
            </label>
            <input
              type="file"
              accept=".geojson,.json,.zip"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="p-2 rounded bg-surface-container-low border border-outline-variant/40 text-on-surface cursor-pointer text-xs"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm font-semibold text-on-surface">
              Hệ quy chiếu không gian (SRID)
            </label>
            <select
              value={srid}
              onChange={(e) => setSrid(e.target.value)}
              className="h-9 px-3 rounded bg-surface-container-low text-on-surface border border-outline-variant/40 text-xs"
            >
              <option value="4326">EPSG:4326 - WGS 84 (GPS Quốc tế chuẩn)</option>
              <option value="9209">EPSG:9209 - VN-2000 / Kinh tuyến trục 105°00' (Hà Nội)</option>
              <option value="9210">EPSG:9210 - VN-2000 / Kinh tuyến trục 105°45' (TP.HCM)</option>
            </select>
          </div>

          <div className="p-3 bg-surface-container-low rounded text-[11px] text-on-surface-variant flex items-start gap-2 border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[16px] shrink-0">
              info
            </span>
            <span>
              Hệ thống PostGIS sẽ tự động thực hiện phép biến đổi tọa độ <code>ST_Transform</code> về WGS84 và kiểm tra cấu trúc đa giác bằng <code>ST_IsValid</code>.
            </span>
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
              disabled={isProcessing}
              className="px-4 py-2 rounded bg-primary-container text-surface hover:bg-primary transition-colors font-semibold text-xs flex items-center gap-1.5"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">
                    autorenew
                  </span>
                  <span>Đang xử lý Topology...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Nạp vào PostGIS</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadGeoJsonModal;
