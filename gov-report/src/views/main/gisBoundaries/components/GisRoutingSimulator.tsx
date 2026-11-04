import React, { useState, useEffect } from "react";

interface GisRoutingSimulatorProps {
  probeCoord: [number, number];
  onProbeChange: (coord: [number, number]) => void;
}

interface MatchResult {
  agencyName: string;
  matchDescription: string;
  tenantCode: string;
  distance: string;
  queryTime: string;
  dispatcherName: string;
  dispatcherRole: string;
}

// Hàm tính khoảng cách tương đối (mét) giữa 2 tọa độ GPS
function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // bán kính trái đất tính bằng mét
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const GisRoutingSimulator: React.FC<GisRoutingSimulatorProps> = ({
  probeCoord,
  onProbeChange,
}) => {
  const [latInput, setLatInput] = useState(probeCoord[0].toString());
  const [lngInput, setLngInput] = useState(probeCoord[1].toString());
  const [isRunning, setIsRunning] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Đồng bộ khi probeCoord thay đổi từ bản đồ
  useEffect(() => {
    setLatInput(probeCoord[0].toFixed(6));
    setLngInput(probeCoord[1].toFixed(6));
  }, [probeCoord]);

  // Centroid phường Hàng Trống
  const centroidLat = 21.0287;
  const centroidLng = 105.8523;

  const distance = calculateDistanceMeters(
    probeCoord[0],
    probeCoord[1],
    centroidLat,
    centroidLng
  );

  // Xác định cơ quan khớp dựa trên tọa độ
  const getMatchResult = (): MatchResult => {
    const lat = probeCoord[0];
    const lng = probeCoord[1];

    if (lat > 21.0315) {
      return {
        agencyName: "UBND Phường Hàng Gai",
        matchDescription:
          "Khớp chính xác với đa giác ranh giới Hàng Gai (QĐ-88/2026/UBND)",
        tenantCode: "UBND-HG-HN",
        distance: `${distance} m`,
        queryTime: "0.039 ms",
        dispatcherName: "Trần Thu Trang",
        dispatcherRole: "Điều phối viên trực ban 2",
      };
    } else if (lng > 105.8548) {
      return {
        agencyName: "UBND Phường Tràng Tiền",
        matchDescription:
          "Khớp chính xác với đa giác ranh giới Tràng Tiền (QĐ-88/2026/UBND)",
        tenantCode: "UBND-TT-HN",
        distance: `${distance} m`,
        queryTime: "0.041 ms",
        dispatcherName: "Lê Hoàng Long",
        dispatcherRole: "Điều phối viên trực ban 1",
      };
    }

    return {
      agencyName: "UBND Phường Hàng Trống",
      matchDescription:
        "Khớp chính xác với đa giác ranh giới hiện hành (QĐ-88/2026/UBND)",
      tenantCode: "UBND-HT-HN",
      distance: `${distance || 280} m`,
      queryTime: "0.042 ms",
      dispatcherName: "Nguyễn Văn Bình",
      dispatcherRole: "Điều phối viên trực ban 1",
    };
  };

  const [matchResult, setMatchResult] = useState<MatchResult>(getMatchResult());

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLatInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onProbeChange([num, probeCoord[1]]);
    }
  };

  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLngInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      onProbeChange([probeCoord[0], num]);
    }
  };

  const handleRunSimulator = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setMatchResult(getMatchResult());
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
      }, 700);
    }, 280);
  };

  return (
    <div className="bg-surface-container-lowest rounded p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface font-bold">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            near_me
          </span>
          <h2>Hộp Công Cụ Giả Lập Định Tuyến</h2>
        </div>
        <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-code-tabular text-code-tabular font-semibold">
          ST_Contains
        </span>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
        Kiểm thử thuật toán định tuyến phân giải không gian: Tự động gán cơ quan
        thẩm quyền tiếp nhận vé phản ánh dựa trên tọa độ GPS người dân cung cấp.
      </p>

      {/* Coordinate Inputs */}
      <div className="grid grid-cols-2 gap-space-sm">
        <div className="flex flex-col gap-1">
          <label
            className="font-label-md text-label-md text-on-surface font-medium"
            htmlFor="input-latitude"
          >
            Vĩ độ (Latitude):
          </label>
          <div className="relative">
            <input
              className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low font-code-tabular text-code-tabular text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
              id="input-latitude"
              type="text"
              value={latInput}
              onChange={handleLatChange}
              placeholder="21.028511"
            />
            <span className="absolute right-2 top-2 font-code-tabular text-[11px] text-outline font-medium">
              °N
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="font-label-md text-label-md text-on-surface font-medium"
            htmlFor="input-longitude"
          >
            Kinh độ (Longitude):
          </label>
          <div className="relative">
            <input
              className="w-full h-9 px-3 pr-8 rounded bg-surface-container-low font-code-tabular text-code-tabular text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 transition-all border border-outline-variant/30"
              id="input-longitude"
              type="text"
              value={lngInput}
              onChange={handleLngChange}
              placeholder="105.854167"
            />
            <span className="absolute right-2 top-2 font-code-tabular text-[11px] text-outline font-medium">
              °E
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Execute Trigger */}
      <button
        onClick={handleRunSimulator}
        disabled={isRunning}
        className="w-full h-11 rounded bg-secondary text-on-secondary font-label-lg text-label-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-space-xs shadow-sm font-semibold cursor-pointer disabled:opacity-80"
        id="btn-run-st-contains"
        type="button"
      >
        <span
          className={`material-symbols-outlined text-[20px] ${
            isRunning ? "animate-spin" : ""
          }`}
        >
          {isRunning ? "sync" : "explore"}
        </span>
        <span>
          {isRunning
            ? "Đang truy vấn ST_Contains..."
            : "CHẠY KIỂM THỬ ĐỊNH TUYẾN (ST_Contains)"}
        </span>
      </button>

      {/* Real-time Test Output Card */}
      <div
        className={`rounded p-space-sm flex flex-col gap-space-xs transition-all duration-300 border ${
          isHighlighted
            ? "bg-secondary-fixed/40 border-secondary"
            : "bg-surface-container-low border-outline-variant/20"
        }`}
        id="simulator-output-box"
      >
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
          <div className="flex items-center gap-1.5 font-label-lg text-label-lg text-secondary font-bold">
            <span className="material-symbols-outlined text-[18px]">
              check_circle
            </span>
            <span>KẾT QUẢ ĐỊNH TUYẾN TỨC THÌ</span>
          </div>
          <span className="font-code-tabular text-code-tabular px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-semibold">
            {matchResult.queryTime}
          </span>
        </div>

        {/* Agency Match Result */}
        <div className="flex flex-col bg-surface-container-lowest p-space-xs rounded border border-outline-variant/10">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Đơn vị tiếp nhận thẩm quyền:
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {matchResult.agencyName}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {matchResult.matchDescription}
          </span>
        </div>

        {/* Telemetry Row */}
        <div className="grid grid-cols-2 gap-space-xs pt-1 font-body-sm text-body-sm">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Mã định danh Tenant:
            </span>
            <span className="font-code-tabular text-code-tabular font-bold text-on-surface">
              {matchResult.tenantCode}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Khoảng cách tới tâm:
            </span>
            <span className="font-code-tabular text-code-tabular font-bold text-on-surface">
              {matchResult.distance}
            </span>
          </div>
        </div>

        {/* Dispatcher Preview */}
        <div className="mt-space-xs p-space-xs rounded bg-surface-container-high flex items-center gap-space-sm border border-outline-variant/20">
          <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[18px]">
              support_agent
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Cán bộ trực ban sẽ nhận lệnh:
            </span>
            <span className="font-label-lg text-label-lg text-on-surface truncate font-semibold">
              {matchResult.dispatcherName}{" "}
              <span className="font-normal text-on-surface-variant text-xs">
                ({matchResult.dispatcherRole})
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GisRoutingSimulator;
