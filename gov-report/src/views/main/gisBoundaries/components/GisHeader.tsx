import React, { useState } from "react";

interface GisHeaderProps {
  onOpenUploadModal: () => void;
}

const GisHeader: React.FC<GisHeaderProps> = ({ onOpenUploadModal }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "done">("idle");

  const handleSyncSpatial = () => {
    setIsSyncing(true);
    setSyncStatus("syncing");

    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus("done");

      setTimeout(() => {
        setSyncStatus("idle");
      }, 2500);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full mb-space-lg">
      {/* Operational Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary tracking-wider uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <span>PostGIS Spatial Engine v3.4 • SRID EPSG:4326 / VN-2000</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface tracking-tight font-bold">
            Quản Trị Ranh Giới GIS &amp; Động Cơ Định Tuyến PostGIS
          </h1>
          <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant max-w-3xl">
            Hệ tọa độ VN-2000 / EPSG:4326 • Tự động thích ứng khi sáp nhập và điều chỉnh địa giới hành chính không gián đoạn dịch vụ
          </p>
        </div>

        {/* Global GIS Action Group */}
        <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center shrink-0">
          <button
            onClick={handleSyncSpatial}
            disabled={isSyncing}
            className="h-9 px-space-md rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-lg text-label-lg flex items-center gap-space-xs transition-colors shadow-sm border border-outline-variant/40 font-medium cursor-pointer"
            id="sync-spatial-btn"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isSyncing ? "animate-spin text-secondary" : syncStatus === "done" ? "text-on-tertiary-container" : "text-secondary"
              }`}
            >
              {syncStatus === "done" ? "check" : "sync"}
            </span>
            <span>
              {isSyncing
                ? "Đang làm mới R-tree..."
                : syncStatus === "done"
                ? "Đã làm mới PostGIS"
                : "Đồng bộ lại không gian"}
            </span>
          </button>
          <button
            onClick={onOpenUploadModal}
            className="h-9 px-space-md rounded bg-primary-container text-surface hover:bg-primary font-label-lg text-label-lg flex items-center gap-space-xs transition-colors shadow-sm font-semibold cursor-pointer"
            id="upload-geojson-btn"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
              upload_file
            </span>
            <span>Tải lên Shapefile / GeoJSON mới</span>
          </button>
        </div>
      </section>

      {/* Notification Banner for Spatial Integrity */}
      <div className="w-full p-space-sm bg-surface-container-highest rounded flex items-center justify-between text-on-surface font-body-sm text-body-sm shadow-sm border border-outline-variant/30 flex-wrap gap-2">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
            verified
          </span>
          <span>
            Đa giác hành chính cấp Phường/Xã toàn quốc:{" "}
            <strong className="font-code-tabular text-code-tabular text-primary font-bold">
              10,599
            </strong>{" "}
            đơn vị đã lập chỉ mục GiST r-tree. Sẵn sàng định tuyến sự cố tức thì.
          </span>
        </div>
        <span className="hidden md:inline font-code-tabular text-code-tabular text-on-surface-variant font-medium">
          TopoCheck: Hoàn hảo (0 khe hở/0 giao cắt lỗi)
        </span>
      </div>
    </div>
  );
};

export default GisHeader;
