import React, { useState, useEffect } from "react";
import GisHeader from "./components/GisHeader";
import GisCanvasMap from "./components/GisCanvasMap";
import GisVersionControl, {
  BoundaryVersion,
} from "./components/GisVersionControl";
import GisRoutingSimulator from "./components/GisRoutingSimulator";
import UploadGeoJsonModal from "./components/UploadGeoJsonModal";
import NewVersionModal from "./components/NewVersionModal";

const INITIAL_VERSIONS: BoundaryVersion[] = [
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

const GisBoundaries: React.FC = () => {
  // Điểm thử nghiệm tọa độ ST_Contains
  const [probeCoord, setProbeCoord] = useState<[number, number]>([
    21.028511, 105.854167,
  ]);

  // Cơ quan hành chính đang chọn
  const [selectedAgency, setSelectedAgency] = useState<string>("HN-HK-HT");

  // Danh sách các phiên bản ranh giới pháp lý
  const [versions, setVersions] = useState<BoundaryVersion[]>(INITIAL_VERSIONS);

  // Trạng thái modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isNewVersionModalOpen, setIsNewVersionModalOpen] =
    useState<boolean>(false);

  // Banner thông báo tạm thời khi hoàn thành tác vụ
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUploadSuccess = (filename: string) => {
    setAlertMessage(`Đã nạp và lập chỉ mục GiST r-tree thành công từ tệp: ${filename}`);
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  const handleAddVersion = (newVerData: {
    versionCode: string;
    decreeCode: string;
    effectiveDate: string;
    description: string;
  }) => {
    const newVersion: BoundaryVersion = {
      id: `v-${Date.now()}`,
      versionCode: newVerData.versionCode,
      decreeCode: newVerData.decreeCode,
      effectiveDate: `${newVerData.effectiveDate} - Nay`,
      status: "active",
      statusText: "HIỆN HÀNH - Active",
      description: newVerData.description,
      isMapLoaded: true,
    };

    // Chuyển các phiên bản cũ sang archived
    const updatedVersions = versions.map((v) => ({
      ...v,
      status: "archived" as const,
      statusText: "LƯU TRỮ",
      isMapLoaded: false,
    }));

    setVersions([newVersion, ...updatedVersions]);
    setIsNewVersionModalOpen(false);
    setAlertMessage(
      `Đã công bố phiên bản ranh giới pháp lý mới: ${newVerData.versionCode} (${newVerData.decreeCode})`
    );
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Toast Alert Feedback */}
      {alertMessage && (
        <div className="fixed top-20 right-6 z-50 bg-secondary text-on-secondary px-4 py-3 rounded shadow-lg flex items-center gap-2 font-label-md text-label-md animate-bounce">
          <span className="material-symbols-outlined text-[20px]">
            check_circle
          </span>
          <span>{alertMessage}</span>
          <button
            onClick={() => setAlertMessage(null)}
            className="ml-2 hover:opacity-75 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header and Spatial Integrity Banner */}
      <GisHeader onOpenUploadModal={() => setIsUploadModalOpen(true)} />

      {/* Main Grid 60% / 40% (lg:grid-cols-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT 60%: Interactive GIS Workspace (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <GisCanvasMap
            probeCoord={probeCoord}
            onProbeChange={setProbeCoord}
          />
        </div>

        {/* RIGHT 40%: Administrative Controls (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* BLOCK 1: Boundary Version Control */}
          <GisVersionControl
            onOpenNewVersionModal={() => setIsNewVersionModalOpen(true)}
            selectedAgency={selectedAgency}
            onSelectAgency={setSelectedAgency}
            versions={versions}
          />

          {/* BLOCK 2: PostGIS ST_Contains Simulator */}
          <GisRoutingSimulator
            probeCoord={probeCoord}
            onProbeChange={setProbeCoord}
          />
        </div>
      </div>

      {/* Modals */}
      <UploadGeoJsonModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <NewVersionModal
        isOpen={isNewVersionModalOpen}
        onClose={() => setIsNewVersionModalOpen(false)}
        onAddVersion={handleAddVersion}
      />
    </div>
  );
};

export default GisBoundaries;
