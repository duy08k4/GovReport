import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Định nghĩa cấu trúc dữ liệu sự cố
export interface IncidentData {
  id: string;
  ticketCode: string;
  title: string;
  category: string;
  status: "urgent" | "in_progress" | "resolved";
  statusLabel: string;
  priority: "high" | "normal" | "low";
  lat: number;
  lng: number;
  address: string;
  reportedAt: string;
  slaRemaining: string;
}

// Dữ liệu sự cố mẫu
export const DEFAULT_INCIDENTS: IncidentData[] = [
  {
    id: "inc-001",
    ticketCode: "SC-2026-HN01",
    title: "Hố ga mất nắp",
    category: "Thoát nước & Hạ tầng",
    status: "urgent",
    statusLabel: "Khẩn cấp",
    priority: "high",
    lat: 21.0298,
    lng: 105.8525,
    address: "Ngã tư Đinh Tiên Hoàng - Hàng Khay, Q. Hoàn Kiếm",
    reportedAt: "10 phút trước",
    slaRemaining: "45 phút",
  },
  {
    id: "inc-002",
    ticketCode: "SC-2026-HN02",
    title: "Đèn tín hiệu mất điện",
    category: "Giao thông & Điện lực",
    status: "in_progress",
    statusLabel: "Đang giải quyết",
    priority: "normal",
    lat: 21.0255,
    lng: 105.8558,
    address: "Phố Hàng Bài, Q. Hoàn Kiếm",
    reportedAt: "35 phút trước",
    slaRemaining: "1 giờ 15 phút",
  },
];

interface SpatialIncidentMapProps {
  incidents?: IncidentData[];
  center?: [number, number];
  zoom?: number;
}

// Component hỗ trợ xử lý resize & update view khi props thay đổi
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  useEffect(() => {
    // Đảm bảo tile layer được render đầy đủ kích thước sau khi DOM mount
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
};

// Hàm tạo custom DivIcon cho từng điểm sự cố
const createCustomPinIcon = (title: string, isUrgent: boolean) => {
  const tagBg = isUrgent ? "bg-[#DC2626]" : "bg-[#D97706]";
  const pulseClass = isUrgent ? "animate-pulse" : "";

  return L.divIcon({
    className: "custom-incident-pin",
    html: `
      <div class="flex flex-col items-center cursor-pointer group" style="transform: translate(-50%, -100%);">
        <div class="${tagBg} text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap mb-1 transition-transform group-hover:scale-105">
          ${title}
        </div>
        <div class="w-4 h-4 ${tagBg} rounded-full border-2 border-white shadow-md flex items-center justify-center ${pulseClass}">
          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
};

const SpatialIncidentMap: React.FC<SpatialIncidentMapProps> = ({
  incidents = DEFAULT_INCIDENTS,
  center = [21.0285, 105.8542], // Tọa độ trung tâm Hoàn Kiếm, Hà Nội
  zoom = 15,
}) => {
  return (
    <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-100 rounded-lg overflow-hidden border border-[#E2E8F0]">
      {/* Bản đồ React-Leaflet */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <MapController center={center} zoom={zoom} />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY}`}
        />

        {incidents.map((item) => {
          const isUrgent = item.status === "urgent";
          return (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={createCustomPinIcon(item.title, isUrgent)}
            >
              <Popup>
                <div className="font-sans text-xs leading-snug min-w-[170px] py-0.5">
                  <div className="font-bold text-[#102A43] text-[13px] mb-0.5">
                    {item.title}
                  </div>
                  <div className="text-[#64748B] text-[11px] mb-1.5">
                    Mã: <strong>{item.ticketCode}</strong>
                  </div>
                  <div className="text-[#334155] mb-1.5">📍 {item.address}</div>
                  <div className="flex justify-between items-center border-t border-[#E2E8F0] pt-1.5 mt-1.5">
                    <span
                      className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${isUrgent
                        ? "bg-[#FEE2E2] text-[#DC2626]"
                        : "bg-[#FEF3C7] text-[#D97706]"
                        }`}
                    >
                      {item.statusLabel}
                    </span>
                    <span className="text-[#64748B] text-[10px]">
                      SLA: {item.slaRemaining}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map HUD Overlays: Lưới địa giới */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-white/95 border border-[#CBD5E1] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[4px] shadow-sm z-[1000] pointer-events-auto">
        <div className="font-label-sm text-[11px] sm:text-label-sm text-[#102A43] font-bold">
          Lưới địa giới: Quận Hoàn Kiếm
        </div>
        <div className="font-code-tabular text-[10px] sm:text-[11px] text-[#64748B]">
          21.0285° N, 105.8542° E
        </div>
      </div>

      {/* Map HUD Overlays: Chú thích loại sự cố (Legend) */}
      <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-white/95 border border-[#CBD5E1] p-1.5 sm:p-2 rounded-[4px] flex items-center gap-2 sm:gap-3 z-[1000] pointer-events-auto shadow-sm">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#DC2626] animate-pulse"></span>
          <span className="font-label-sm text-[10px] sm:text-[11px] text-[#1E293B]">Khẩn cấp</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#D97706]"></span>
          <span className="font-label-sm text-[10px] sm:text-[11px] text-[#1E293B]">Đang giải quyết</span>
        </div>
      </div>
    </div>
  );
};

export default SpatialIncidentMap;
