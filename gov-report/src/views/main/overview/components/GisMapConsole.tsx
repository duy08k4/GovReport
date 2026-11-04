import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Tọa độ các trung tâm trọng điểm
const REGION_COORDINATES: Record<
  "all" | "hanoi" | "danang" | "hcmc",
  { center: [number, number]; zoom: number }
> = {
  all: { center: [16.0544, 107.5], zoom: 6 },
  hanoi: { center: [21.0285, 105.8542], zoom: 12 },
  danang: { center: [16.0544, 108.2022], zoom: 13 },
  hcmc: { center: [10.8231, 106.6297], zoom: 12 },
};

// Đa giác ranh giới PostGIS ST_Contains mẫu
const HANOI_BOUNDS: [number, number][] = [
  [21.085, 105.77],
  [21.075, 105.885],
  [21.01, 105.905],
  [20.975, 105.85],
  [20.985, 105.775],
];

const HCMC_BOUNDS: [number, number][] = [
  [10.865, 106.63],
  [10.845, 106.745],
  [10.74, 106.735],
  [10.725, 106.65],
  [10.77, 106.6],
];

// Controller cập nhật vị trí bản đồ khi chọn vùng
const MapController: React.FC<{
  center: [number, number];
  zoom: number;
  onMapReady?: (map: L.Map) => void;
}> = ({ center, zoom, onMapReady }) => {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

// Hàm tạo Icon cụm sự cố không gian (Heatmap Cluster)
const createClusterIcon = (count: number, isAmber = false) => {
  const bgClass = isAmber ? "bg-[#D97706]" : "bg-[#DC2626]";
  const pingColor = isAmber ? "bg-[#D97706]" : "bg-[#DC2626]";

  return L.divIcon({
    className: "custom-incident-pin",
    html: `
      <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
        <span class="animate-ping absolute inline-flex h-12 w-12 rounded-full ${pingColor} opacity-40"></span>
        <div class="w-9 h-9 rounded-full ${bgClass} flex items-center justify-center text-white font-mono text-[13px] font-bold shadow-lg ring-2 ring-white/60 hover:scale-110 transition-transform">
          ${count}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

// Hàm tạo Icon ghim sự cố khẩn cấp (Pinned Marker)
const createPinnedIncidentIcon = (label: string) => {
  return L.divIcon({
    className: "custom-incident-pin",
    html: `
      <div class="flex items-center gap-1.5 bg-[#FEF2F2] px-2.5 py-1 shadow-md border border-[#DC2626]/50 rounded cursor-pointer whitespace-nowrap hover:scale-105 transition-transform" style="transform: translate(-50%, -100%);">
        <span class="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
        <span class="font-sans text-[11px] text-[#DC2626] font-bold tracking-tight">${label}</span>
      </div>
    `,
    iconSize: [220, 32],
    iconAnchor: [110, 32],
    popupAnchor: [0, -32],
  });
};

const GisMapConsole: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<
    "all" | "hanoi" | "danang" | "hcmc"
  >("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const currentView = REGION_COORDINATES[activeRegion];

  const handleRegionClick = (region: "all" | "hanoi" | "danang" | "hcmc") => {
    setActiveRegion(region);
  };

  const handleZoomIn = () => {
    if (mapInstance) mapInstance.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstance) mapInstance.zoomOut();
  };

  const handleResetCenter = () => {
    setActiveRegion("all");
    if (mapInstance) {
      mapInstance.flyTo(REGION_COORDINATES.all.center, REGION_COORDINATES.all.zoom, {
        duration: 1.2,
      });
    }
  };

  // Lọc hiển thị marker theo danh mục
  const showHanoiFlood = activeCategory === "all" || activeCategory === "water";
  const showHcmcTree = activeCategory === "all" || activeCategory === "tree";

  return (
    <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
      {/* Map Control Header */}
      <div className="px-space-md py-3 bg-surface-container-low flex flex-col xl:flex-row xl:items-center justify-between gap-space-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            layers
          </span>
          <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide font-bold">
            Bản Đồ Nhiệt &amp; Cụm Tác Chiến Không Gian (PostGIS Clustered Heatmap)
          </span>
        </div>

        {/* Quick Filters Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Admin Level Filter */}
          <div className="inline-flex bg-surface-container-lowest p-0.5 border border-outline-variant/40 rounded">
            <button
              onClick={() => handleRegionClick("all")}
              className={`px-2 py-1 font-label-sm text-label-sm transition-colors ${activeRegion === "all"
                  ? "bg-surface-container text-on-surface font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
              type="button"
            >
              Toàn quốc
            </button>
            <button
              onClick={() => handleRegionClick("hanoi")}
              className={`px-2 py-1 font-label-sm text-label-sm transition-colors ${activeRegion === "hanoi"
                  ? "bg-surface-container text-on-surface font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
              type="button"
            >
              Hà Nội
            </button>
            <button
              onClick={() => handleRegionClick("danang")}
              className={`px-2 py-1 font-label-sm text-label-sm transition-colors ${activeRegion === "danang"
                  ? "bg-surface-container text-on-surface font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
              type="button"
            >
              Đà Nẵng
            </button>
            <button
              onClick={() => handleRegionClick("hcmc")}
              className={`px-2 py-1 font-label-sm text-label-sm transition-colors ${activeRegion === "hcmc"
                  ? "bg-surface-container text-on-surface font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
              type="button"
            >
              TP.HCM
            </button>
          </div>

          {/* Category Filter Selector */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="h-7 px-2 font-body-sm text-body-sm bg-surface-container-lowest text-on-surface focus:outline-none focus:bg-surface-container border border-outline-variant/40 rounded"
          >
            <option value="all">Tất cả danh mục sự cố</option>
            <option value="water">Ngập úng &amp; Thoát nước</option>
            <option value="pothole">Hố ga &amp; Mặt đường</option>
            <option value="tree">Cây xanh gãy đổ</option>
            <option value="power">Hạ tầng lưới điện đô thị</option>
          </select>
        </div>
      </div>

      {/* Geospatial Map Canvas Container */}
      <div className="relative z-0 isolate w-full h-[540px] bg-[#00152a] overflow-hidden select-none">
        {/* Real Leaflet Map */}
        <MapContainer
          center={currentView.center}
          zoom={currentView.zoom}
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
          style={{ height: "100%", width: "100%", background: "#00152a" }}
        >
          <MapController
            center={currentView.center}
            zoom={currentView.zoom}
            onMapReady={setMapInstance}
          />

          {/* Carto Dark Matter Basemap Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={`https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY
              }`}
          />

          {/* PostGIS ST_Contains Polygon Bound: Hanoi Core */}
          <Polygon
            positions={HANOI_BOUNDS}
            pathOptions={{
              color: "#0084A3",
              dashArray: "6, 4",
              weight: 2,
              fillColor: "#006780",
              fillOpacity: 0.18,
            }}
          >
            <Popup>
              <div className="font-sans text-xs min-w-[180px] p-1">
                <div className="font-bold text-[#0084A3] text-[13px] mb-1">
                  ST_CONTAINS: REGION_HN_CORE
                </div>
                <div className="text-slate-600 mb-1">
                  Phân vùng tác chiến trung tâm TP. Hà Nội
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Diện tích: ~42.5 km² • Thuật toán PostGIS ST_DWithin(&lt; 500m)
                </div>
              </div>
            </Popup>
          </Polygon>

          {/* PostGIS ST_Contains Polygon Bound: HCMC South */}
          <Polygon
            positions={HCMC_BOUNDS}
            pathOptions={{
              color: "#0084A3",
              dashArray: "6, 4",
              weight: 2,
              fillColor: "#006780",
              fillOpacity: 0.18,
            }}
          >
            <Popup>
              <div className="font-sans text-xs min-w-[180px] p-1">
                <div className="font-bold text-[#0084A3] text-[13px] mb-1">
                  ST_CONTAINS: REGION_HCM_SOUTH
                </div>
                <div className="text-slate-600 mb-1">
                  Phân vùng tác chiến trọng điểm TP. Hồ Chí Minh
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Diện tích: ~58.2 km² • Tự động phân cấp điều phối LGSP
                </div>
              </div>
            </Popup>
          </Polygon>

          {/* Hotspot Cluster Marker: Hà Nội */}
          <Marker
            position={[21.0285, 105.8542]}
            icon={createClusterIcon(482, false)}
            eventHandlers={{
              click: () => handleRegionClick("hanoi"),
            }}
          >
            <Popup>
              <div className="font-sans text-xs min-w-[170px] p-1">
                <div className="font-bold text-[#102A43] text-[13px] mb-0.5">
                  Khu vực TP. Hà Nội
                </div>
                <div className="text-[#DC2626] font-semibold text-[11px] mb-1">
                  06 sự cố khẩn cấp • 482 sự cố ghi nhận
                </div>
                <div className="font-mono text-[10px] text-slate-500 mb-2">
                  21.0285° N, 105.8542° E
                </div>
                <button
                  onClick={() => handleRegionClick("hanoi")}
                  className="w-full py-1 bg-secondary text-white text-[11px] rounded font-medium hover:bg-opacity-90"
                  type="button"
                >
                  Phóng to khu vực Hà Nội
                </button>
              </div>
            </Popup>
          </Marker>

          {/* Hotspot Cluster Marker: Đà Nẵng */}
          <Marker
            position={[16.0544, 108.2022]}
            icon={createClusterIcon(184, true)}
            eventHandlers={{
              click: () => handleRegionClick("danang"),
            }}
          >
            <Popup>
              <div className="font-sans text-xs min-w-[170px] p-1">
                <div className="font-bold text-[#102A43] text-[13px] mb-0.5">
                  Khu vực TP. Đà Nẵng
                </div>
                <div className="text-[#D97706] font-semibold text-[11px] mb-1">
                  01 sự cố khẩn cấp • 184 sự cố ghi nhận
                </div>
                <div className="font-mono text-[10px] text-slate-500 mb-2">
                  16.0544° N, 108.2022° E
                </div>
                <button
                  onClick={() => handleRegionClick("danang")}
                  className="w-full py-1 bg-secondary text-white text-[11px] rounded font-medium hover:bg-opacity-90"
                  type="button"
                >
                  Phóng to khu vực Đà Nẵng
                </button>
              </div>
            </Popup>
          </Marker>

          {/* Hotspot Cluster Marker: TP.HCM */}
          <Marker
            position={[10.8231, 106.6297]}
            icon={createClusterIcon(754, false)}
            eventHandlers={{
              click: () => handleRegionClick("hcmc"),
            }}
          >
            <Popup>
              <div className="font-sans text-xs min-w-[170px] p-1">
                <div className="font-bold text-[#102A43] text-[13px] mb-0.5">
                  Khu vực TP. Hồ Chí Minh
                </div>
                <div className="text-[#DC2626] font-semibold text-[11px] mb-1">
                  07 sự cố khẩn cấp • 754 sự cố ghi nhận
                </div>
                <div className="font-mono text-[10px] text-slate-500 mb-2">
                  10.8231° N, 106.6297° E
                </div>
                <button
                  onClick={() => handleRegionClick("hcmc")}
                  className="w-full py-1 bg-secondary text-white text-[11px] rounded font-medium hover:bg-opacity-90"
                  type="button"
                >
                  Phóng to khu vực TP.HCM
                </button>
              </div>
            </Popup>
          </Marker>

          {/* Pinned Incident Marker 1: Hà Nội Ngập úng Liễu Giai */}
          {showHanoiFlood && (
            <Marker
              position={[21.0335, 105.8142]}
              icon={createPinnedIncidentIcon("Hà Nội: Ngập úng sâu Liễu Giai")}
            >
              <Popup>
                <div className="font-sans text-xs min-w-[200px] p-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#DC2626] text-[12px]">
                      SC-2026-HN09
                    </span>
                    <span className="px-1.5 py-0.2 bg-[#FEF2F2] text-[#DC2626] font-bold text-[10px] rounded">
                      KHẨN CẤP
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800 mb-1">
                    Ngập úng sâu tuyến Liễu Giai - Đội Cấn
                  </div>
                  <div className="text-slate-600 text-[11px] mb-1.5">
                    📍 Đường Liễu Giai, P. Cống Vị, Q. Ba Đình
                  </div>
                  <div className="border-t border-slate-200 pt-1 text-[11px] text-slate-500 flex justify-between">
                    <span>Đơn vị: Cty Thoát Nước Đô Thị</span>
                    <span className="text-[#D97706] font-semibold">SLA: 45 phút</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Pinned Incident Marker 2: TP.HCM Gãy nhánh cổ thụ Q.1 */}
          {showHcmcTree && (
            <Marker
              position={[10.7769, 106.6953]}
              icon={createPinnedIncidentIcon("TP.HCM: Gãy nhánh cổ thụ Q.1")}
            >
              <Popup>
                <div className="font-sans text-xs min-w-[200px] p-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#DC2626] text-[12px]">
                      SC-2026-SG77
                    </span>
                    <span className="px-1.5 py-0.2 bg-[#FEF2F2] text-[#DC2626] font-bold text-[10px] rounded">
                      KHẨN CẤP
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800 mb-1">
                    Gãy nhánh cổ thụ vướng cáp viễn thông
                  </div>
                  <div className="text-slate-600 text-[11px] mb-1.5">
                    📍 Trục đường Lê Duẩn, P. Bến Nghé, Quận 1
                  </div>
                  <div className="border-t border-slate-200 pt-1 text-[11px] text-slate-500 flex justify-between">
                    <span>Đơn vị: Đội Công Viên Cây Xanh 2</span>
                    <span className="text-[#DC2626] font-semibold">Cần xe cẩu</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Top-Left Map Telemetry HUD */}
        <div className="absolute z-20 top-3 left-3 bg-primary-container/90 text-on-primary p-2.5 font-code-tabular text-[12px] flex flex-col gap-1 backdrop-blur-sm pointer-events-none border border-outline-variant/30 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tertiary-fixed rounded-full animate-pulse" />
            <span className="font-semibold text-secondary-fixed">
              SRID: EPSG:4326 (WGS 84)
            </span>
          </div>
          <div className="text-on-primary-container">Độ phân giải không gian: 0.0001°</div>
          <div className="text-on-primary-container">
            Truy vấn không gian: ST_DWithin(&lt; 500m)
          </div>
          <div className="text-on-primary-container">Thời gian quét ranh giới: 3.2ms</div>
        </div>

        {/* Bottom-Right Floating Map Controls */}
        <div className="absolute z-20 bottom-3 right-3 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            aria-label="Phóng to bản đồ"
            className="w-8 h-8 bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors shadow-md border border-outline-variant/40 rounded cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
          <button
            onClick={handleZoomOut}
            aria-label="Thu nhỏ bản đồ"
            className="w-8 h-8 bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors shadow-md border border-outline-variant/40 rounded cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <button
            onClick={handleResetCenter}
            aria-label="Định vị trung tâm"
            className="w-8 h-8 bg-surface-container-lowest text-secondary flex items-center justify-center hover:bg-surface-container transition-colors shadow-md border border-outline-variant/40 rounded cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">my_location</span>
          </button>
        </div>
      </div>

      {/* Map Legend Section */}
      <div className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm text-body-sm font-body-sm">
        <div className="flex items-center gap-space-md flex-wrap">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Chú Giải Bản Đồ:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#DC2626] inline-block" />
            <span className="text-on-surface">Khẩn cấp (SLA &lt; 2h)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#D97706] inline-block" />
            <span className="text-on-surface">Đang xử lý</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#16A34A] inline-block" />
            <span className="text-on-surface">Đã hoàn thành</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1.5 bg-[#0084A3] inline-block" />
            <span className="text-on-surface">Ranh giới ST_Contains</span>
          </div>
        </div>
        <div className="text-on-surface-variant font-code-tabular text-[12px]">
          Đồng bộ GIS: <span className="text-on-surface font-semibold">14:26:08</span> GMT+7
        </div>
      </div>
    </div>
  );
};

export default GisMapConsole;
