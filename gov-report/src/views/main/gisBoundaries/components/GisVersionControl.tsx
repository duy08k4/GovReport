import React, { useState } from "react";

export interface BoundaryVersion {
  id: string;
  versionCode: string;
  decreeCode: string;
  effectiveDate: string;
  status: "active" | "archived";
  statusText: string;
  description: string;
  isMapLoaded?: boolean;
}

interface GisVersionControlProps {
  onOpenNewVersionModal: () => void;
  selectedAgency: string;
  onSelectAgency: (agencyCode: string) => void;
  versions?: BoundaryVersion[];
  onSelectVersion?: (version: BoundaryVersion) => void;
}

const DEFAULT_VERSIONS: BoundaryVersion[] = [
  {
    id: "v-2026-1",
    versionCode: "v2026.1",
    decreeCode: "QĐ-88/2026/UBND",
    effectiveDate: "01/01/2026 - Nay",
    status: "active",
    statusText: "HIỆN HÀNH - Active",
    description:
      "Cập nhật mốc giới sáp nhập tổ dân phố số 4 và mở rộng hành lang phố đi bộ Hồ Gươm.",
    isMapLoaded: true,
  },
  {
    id: "v-2023-2",
    versionCode: "v2023.2",
    decreeCode: "QĐ-14/2023/UBND",
    effectiveDate: "01/06/2023 - 31/12/2025",
    status: "archived",
    statusText: "LƯU TRỮ",
    description:
      "Địa giới cũ trước khi thực hiện quy hoạch lại không gian văn hóa thương mại.",
    isMapLoaded: false,
  },
];

const AGENCIES = [
  {
    code: "HN-HK-HT",
    name: "UBND Phường Hàng Trống, Quận Hoàn Kiếm, TP. Hà Nội",
  },
  {
    code: "HN-HK-HG",
    name: "UBND Phường Hàng Gai, Quận Hoàn Kiếm, TP. Hà Nội",
  },
  {
    code: "HN-HK-TT",
    name: "UBND Phường Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội",
  },
  {
    code: "HN-BD-DB",
    name: "UBND Phường Điện Biên, Quận Ba Đình, TP. Hà Nội",
  },
];

const GisVersionControl: React.FC<GisVersionControlProps> = ({
  onOpenNewVersionModal,
  selectedAgency,
  onSelectAgency,
  versions = DEFAULT_VERSIONS,
  onSelectVersion,
}) => {
  const [activeVersionId, setActiveVersionId] = useState<string>("v-2026-1");

  const handleToggleVersion = (ver: BoundaryVersion) => {
    setActiveVersionId(ver.id);
    if (onSelectVersion) {
      onSelectVersion(ver);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface font-bold">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            history
          </span>
          <h2>Lịch Sử Phiên Bản Ranh Giới</h2>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-code-tabular text-code-tabular font-medium">
          {versions.length} Phiên bản
        </span>
      </div>

      {/* Target Administrative Agency Picker */}
      <div className="flex flex-col gap-1.5">
        <label
          className="font-label-md text-label-md text-on-surface-variant font-medium"
          htmlFor="agency-selector"
        >
          Chọn cơ quan hành chính kiểm tra:
        </label>
        <div className="relative">
          <select
            className="w-full h-10 px-3 pr-8 rounded bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all cursor-pointer border border-outline-variant/30"
            id="agency-selector"
            value={selectedAgency}
            onChange={(e) => onSelectAgency(e.target.value)}
          >
            {AGENCIES.map((agency) => (
              <option key={agency.code} value={agency.code}>
                {agency.name}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[20px]">
            expand_more
          </span>
        </div>
      </div>

      {/* Version History List */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          Danh mục phiên bản địa giới lưu trữ
        </span>

        {versions.map((ver) => {
          const isSelected = activeVersionId === ver.id;
          const isActiveStatus = ver.status === "active";

          return (
            <div
              key={ver.id}
              className={`p-space-sm rounded flex flex-col gap-1.5 transition-all border ${
                isSelected
                  ? "bg-surface-container-low border-secondary/40 shadow-sm"
                  : "bg-surface-container-lowest border-outline-variant/20 hover:border-outline-variant/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface font-semibold">
                  <span className="font-code-tabular text-secondary">
                    {ver.versionCode}
                  </span>
                  <span className="text-on-surface-variant">•</span>
                  <span className="font-body-sm text-body-sm font-normal">
                    {ver.decreeCode}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold ${
                    isActiveStatus
                      ? "bg-tertiary-container text-on-tertiary-container"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {ver.statusText}
                </span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-code-tabular text-code-tabular text-xs">
                <span>Hiệu lực: {ver.effectiveDate}</span>
                {isActiveStatus ? (
                  <span className="text-secondary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                    Bản đồ đang nạp
                  </span>
                ) : (
                  <button
                    onClick={() => handleToggleVersion(ver)}
                    className="text-secondary hover:underline font-label-sm text-label-sm cursor-pointer"
                    type="button"
                  >
                    {isSelected ? "Đang chọn" : "Xem polygon"}
                  </button>
                )}
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {ver.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Add Legal Version Action */}
      <button
        onClick={onOpenNewVersionModal}
        className="w-full h-10 rounded bg-surface-container text-secondary font-label-lg text-label-lg hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-space-xs font-semibold cursor-pointer border border-outline-variant/20 shadow-xs"
        id="btn-new-version"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">
          add_circle
        </span>
        <span>Cập nhật phiên bản ranh giới pháp lý mới</span>
      </button>
    </div>
  );
};

export default GisVersionControl;
