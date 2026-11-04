import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Tọa độ Hoàn Kiếm, Hà Nội
const MAP_CENTER: [number, number] = [21.0287, 105.8523];

// Đa giác Phường Hàng Trống (v2026.1 - Hiện hành)
const HANG_TRONG_POLYGON: [number, number][] = [
  [21.0315, 105.8498],
  [21.0312, 105.8548],
  [21.0262, 105.8545],
  [21.0266, 105.8492],
];

// Đa giác lịch sử v2023.2 (Lưu trữ)
const HISTORIC_POLYGON: [number, number][] = [
  [21.0322, 105.849],
  [21.0318, 105.8558],
  [21.0255, 105.8552],
  [21.026, 105.8485],
];

// Các phường lân cận
const HANG_GAI_POLYGON: [number, number][] = [
  [21.0345, 105.8485],
  [21.034, 105.8535],
  [21.0315, 105.8532],
  [21.0318, 105.848],
];

const TRANG_TIEN_POLYGON: [number, number][] = [
  [21.026, 105.8548],
  [21.0265, 105.8615],
  [21.0215, 105.861],
  [21.0218, 105.8545],
];

// Vị trí trạm quan trắc IoT
const SENSORS: { id: string; name: string; position: [number, number]; value: string }[] = [
  {
    id: "sn-1",
    name: "Trạm đo mức ngập Tháp Rùa",
    position: [21.0282, 105.8524],
    value: "Mực nước: 0.12m (Bình thường)",
  },
  {
    id: "sn-2",
    name: "Cảm biến ngập ngã tư Tràng Thi",
    position: [21.0272, 105.85],
    value: "Mực nước: 0.05m (Khô ráo)",
  },
];

interface GisCanvasMapProps {
  probeCoord: [number, number];
  onProbeChange: (coord: [number, number]) => void;
}

// Controller xử lý click trên bản đồ để di chuyển điểm thử nghiệm
const MapEventsHandler: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
    },
  });
  return null;
};

// Map controller hỗ trợ resize và zoom
const MapController: React.FC<{
  onMapReady: (map: L.Map) => void;
}> = ({ onMapReady }) => {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map, onMapReady]);

  return null;
};

// Custom Marker: Trọng tâm Centroid
const createCentroidIcon = () => {
  return L.divIcon({
    className: "custom-incident-pin",
    html: `
      <div class="relative flex items-center justify-center" style="transform: translate(-50%, -50%);">
        <div class="w-4 h-4 rounded-full bg-[#ba1a1a] border-2 border-white shadow-md flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Custom Marker: Điểm thử nghiệm ST_Contains
const createProbeIcon = () => {
  return L.divIcon({
    className: "custom-incident-pin",
    html: `
      <div class="relative flex items-center justify-center" style="transform: translate(-50%, -50%);">
        <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-secondary opacity-50"></span>
        <div class="w-4 h-4 rounded-full bg-secondary border-2 border-white shadow-md flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
};

// Custom Marker: Trạm quan trắc IoT
const createSensorIcon = () => {
  return L.divIcon({
    className: "custom-incident-pin",
    html: `
      <div class="w-6 h-6 rounded bg-[#102a43] text-[#7ffc97] flex items-center justify-center shadow-md border border-white/60 text-[13px]" style="transform: translate(-50%, -50%);">
        <span class="material-symbols-outlined text-[15px]">sensors</span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const GisCanvasMap: React.FC<GisCanvasMapProps> = ({
  probeCoord,
  onProbeChange,
}) => {
  const [showBoundary, setShowBoundary] = useState(true);
  const [showSensors, setShowSensors] = useState(false);
  const [showWkt, setShowWkt] = useState(true);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  return (
    <div className="bg-surface-container-lowest rounded overflow-hidden shadow-sm flex flex-col border border-outline-variant/30">
      {/* Workspace Header & Spatial Controls Toolbar */}
      <div className="p-space-sm bg-surface-container-high flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-space-xs font-label-lg text-label-lg text-on-surface font-bold">
          <span className="material-symbols-outlined text-[20px] text-secondary">
            layers
          </span>
          <span>Bản đồ không gian tương tác (Interactive PostGIS Canvas)</span>
        </div>

        {/* Tool controls */}
        <div className="flex items-center gap-1 bg-surface-container-lowest p-0.5 rounded shadow-sm border border-outline-variant/40">
          <button
            onClick={() => setShowBoundary((prev) => !prev)}
            className={`px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer ${
              showBoundary
                ? "bg-secondary-container text-on-secondary-container font-semibold"
                : "hover:bg-surface-container text-on-surface-variant"
            }`}
            title="Lớp địa giới hành chính"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">polyline</span>
            <span>Ranh giới</span>
          </button>

          <button
            onClick={() => setShowSensors((prev) => !prev)}
            className={`px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer ${
              showSensors
                ? "bg-secondary-container text-on-secondary-container font-semibold"
                : "hover:bg-surface-container text-on-surface-variant"
            }`}
            title="Bật/Tắt lớp trạm quan trắc"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">sensors</span>
            <span>Trạm quan trắc</span>
          </button>

          <button
            onClick={() => {
              setIsMeasuring((prev) => !prev);
              if (!isMeasuring) {
                alert("Chế độ Thước đo: Nhấp vào 2 điểm bất kỳ trên bản đồ để đo khoảng cách vi phân PostGIS ST_Distance.");
              }
            }}
            className={`px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer ${
              isMeasuring
                ? "bg-secondary-container text-on-secondary-container font-semibold"
                : "hover:bg-surface-container text-on-surface-variant"
            }`}
            title="Đo khoảng cách địa lý"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>Thước đo</span>
          </button>

          <button
            onClick={() => setShowWkt((prev) => !prev)}
            className={`px-2 py-1 rounded font-code-tabular text-code-tabular flex items-center gap-1 transition-colors cursor-pointer ${
              showWkt
                ? "bg-secondary-container text-on-secondary-container font-semibold"
                : "hover:bg-surface-container text-on-surface-variant"
            }`}
            title="Xem đặc tả Well-Known Text (WKT)"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">data_object</span>
            <span>WKT</span>
          </button>
        </div>
      </div>

      {/* Real React-Leaflet Map Container */}
      <div className="relative z-0 isolate w-full h-[520px] bg-surface-container overflow-hidden">
        <MapContainer
          center={MAP_CENTER}
          zoom={15}
          zoomControl={false}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
          style={{ height: "100%", width: "100%" }}
        >
          <MapController onMapReady={setMapInstance} />
          <MapEventsHandler
            onMapClick={(lat, lng) => onProbeChange([lat, lng])}
          />

          {/* Carto Voyager Basemap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${
              import.meta.env.VITE_CARTO_API_KEY
            }`}
          />

          {/* Adjacent Ward 1: P. Hàng Gai */}
          {showBoundary && (
            <Polygon
              positions={HANG_GAI_POLYGON}
              pathOptions={{
                color: "#74777e",
                weight: 1.5,
                fillColor: "#e7eeff",
                fillOpacity: 0.55,
              }}
            >
              <Popup>
                <div className="font-sans text-xs">
                  <strong>P. HÀNG GAI</strong>
                  <div className="text-slate-600">Đơn vị hành chính giáp ranh phía Bắc</div>
                </div>
              </Popup>
            </Polygon>
          )}

          {/* Adjacent Ward 2: P. Tràng Tiền */}
          {showBoundary && (
            <Polygon
              positions={TRANG_TIEN_POLYGON}
              pathOptions={{
                color: "#74777e",
                weight: 1.5,
                fillColor: "#e7eeff",
                fillOpacity: 0.55,
              }}
            >
              <Popup>
                <div className="font-sans text-xs">
                  <strong>P. TRÀNG TIỀN</strong>
                  <div className="text-slate-600">Đơn vị hành chính giáp ranh phía Đông</div>
                </div>
              </Popup>
            </Polygon>
          )}

          {/* Historic Boundary v2023.2 */}
          {showBoundary && (
            <Polygon
              positions={HISTORIC_POLYGON}
              pathOptions={{
                color: "#74777e",
                dashArray: "6, 4",
                weight: 2,
                opacity: 0.8,
                fillColor: "#94a3b8",
                fillOpacity: 0.15,
              }}
            >
              <Popup>
                <div className="font-sans text-xs">
                  <strong>Ranh giới lịch sử v2023.2 (QĐ-14/2023/UBND)</strong>
                  <div className="text-slate-600">Địa giới cũ trước khi quy hoạch lại phố đi bộ</div>
                </div>
              </Popup>
            </Polygon>
          )}

          {/* Current Active Polygon: P. Hàng Trống (v2026.1) */}
          {showBoundary && (
            <Polygon
              positions={HANG_TRONG_POLYGON}
              pathOptions={{
                color: "#006780",
                weight: 3,
                fillColor: "#7ddbfd",
                fillOpacity: 0.28,
              }}
            >
              <Popup>
                <div className="font-sans text-xs min-w-[190px]">
                  <strong className="text-secondary text-sm">P. HÀNG TRỐNG (v2026.1)</strong>
                  <div className="text-slate-700 mt-1">Quyết định: QĐ-88/2026/UBND</div>
                  <div className="text-slate-500 text-[11px]">Trạng thái: is_current = true</div>
                </div>
              </Popup>
            </Polygon>
          )}

          {/* Centroid Marker */}
          <Marker position={MAP_CENTER} icon={createCentroidIcon()}>
            <Popup>
              <div className="font-sans text-xs">
                <strong>Tọa độ trọng tâm (Centroid):</strong>
                <div className="font-mono text-slate-700">21.0287° N, 105.8523° E</div>
              </div>
            </Popup>
          </Marker>

          {/* Interactive Probe Point Marker */}
          <Marker position={probeCoord} icon={createProbeIcon()}>
            <Popup>
              <div className="font-sans text-xs">
                <strong className="text-secondary">ĐIỂM THỬ NGHIỆM ĐỊNH TUYẾN:</strong>
                <div className="font-mono text-slate-700">
                  {probeCoord[0]}, {probeCoord[1]}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Nhấp vào bất kỳ đâu trên bản đồ để đổi vị trí kiểm thử ST_Contains
                </div>
              </div>
            </Popup>
          </Marker>

          {/* IoT Sensor Markers */}
          {showSensors &&
            SENSORS.map((s) => (
              <Marker key={s.id} position={s.position} icon={createSensorIcon()}>
                <Popup>
                  <div className="font-sans text-xs">
                    <strong className="text-[#102a43]">{s.name}</strong>
                    <div className="text-on-tertiary-container font-semibold mt-0.5">
                      {s.value}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        {/* Floating Map Legend Overlay */}
        <div className="absolute z-20 bottom-3 left-3 bg-surface-container-lowest/95 backdrop-blur p-space-sm rounded shadow-sm flex flex-col gap-1.5 max-w-xs pointer-events-auto border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
            Chú giải dữ liệu GIS
          </span>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <span className="w-4 h-1.5 bg-secondary rounded-sm inline-block" />
            <span>Ranh giới pháp lý hiện hành (is_current)</span>
          </div>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <span className="w-4 h-0 border-t-2 border-dashed border-outline inline-block" />
            <span>Đa giác lưu trữ (Sau sáp nhập/chia tách)</span>
          </div>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-error inline-block" />
            <span>Tọa độ trọng tâm (Centroid_lat/lng)</span>
          </div>
        </div>

        {/* Coordinate Reticle & Zoom HUD */}
        <div className="absolute z-20 top-3 right-3 flex flex-col gap-1 items-end pointer-events-auto">
          <div className="bg-surface-container-lowest px-space-sm py-1 rounded shadow-sm font-code-tabular text-code-tabular text-on-surface border border-outline-variant/30">
            EPSG:4326 | Z: 15.4
          </div>
          <div className="flex flex-col bg-surface-container-lowest rounded shadow-sm overflow-hidden border border-outline-variant/30">
            <button
              onClick={() => mapInstance?.zoomIn()}
              aria-label="Phóng to"
              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
            <button
              onClick={() => mapInstance?.zoomOut()}
              aria-label="Thu nhỏ"
              className="w-8 h-8 flex items-center justify-center hover:bg-surface-container text-on-surface border-t border-outline-variant/30 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* PostGIS WKT Inspector Collapsible Bar */}
      {showWkt && (
        <div className="p-space-sm bg-surface-container-lowest flex flex-col gap-1 border-t border-outline-variant/30">
          <div className="flex items-center justify-between text-on-surface font-label-sm text-label-sm">
            <span className="flex items-center gap-1 font-semibold text-secondary">
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              DỮ LIỆU KHÔNG GIAN POSTGIS (ST_AsText):
            </span>
            <span className="font-code-tabular text-code-tabular text-on-surface-variant">
              Polygon (SRID=4326) • 14 Đỉnh
            </span>
          </div>
          <div className="p-space-xs rounded bg-surface-container font-code-tabular text-code-tabular text-on-surface-variant overflow-x-auto whitespace-nowrap">
            MULTIPOLYGON(((105.8523 21.0287, 105.8548 21.0301, 105.8569 21.0264, 105.8531 21.0249, 105.8523 21.0287)))
          </div>
        </div>
      )}

      {/* Quick Spatial Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm p-space-sm bg-surface-container-low border-t border-outline-variant/30">
        <div className="bg-surface-container-lowest p-space-sm rounded shadow-sm flex flex-col border border-outline-variant/20">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Diện tích quản lý
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-code-tabular font-bold">
            0.29 km²
          </span>
          <span className="font-body-sm text-body-sm text-on-tertiary-container font-medium">
            Khớp địa chính 100%
          </span>
        </div>
        <div className="bg-surface-container-lowest p-space-sm rounded shadow-sm flex flex-col border border-outline-variant/20">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Tốc độ ST_Contains
          </span>
          <span className="font-headline-sm text-headline-sm text-secondary font-code-tabular font-bold">
            0.038 ms
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            GiST Quad-Tree Index
          </span>
        </div>
        <div className="bg-surface-container-lowest p-space-sm rounded shadow-sm flex flex-col border border-outline-variant/20">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Phiên bản hiệu lực
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-code-tabular font-bold">
            v2026.1
          </span>
          <span className="font-body-sm text-body-sm text-secondary font-medium">
            Theo QĐ-88/2026/UBND
          </span>
        </div>
      </div>
    </div>
  );
};

export default GisCanvasMap;
