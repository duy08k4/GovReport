import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polygon,
  useMap,
} from 'react-leaflet';
import { MapIncident, IncidentCategory, MapLayerType } from '../types';
import {
  GIS_CADRE_DEFAULT_COORDS,
  GIS_HANG_TRONG_BOUNDARY,
  GIS_TILE_LAYERS,
  GIS_ZOOM_CONFIG,
  GIS_OPERATION_RADIUS_METERS,
} from '../../../config/static/GisConfig';

interface GisMapCanvasProps {
  incidents: MapIncident[];
  selectedIncident: MapIncident | null;
  onSelectIncident: (incident: MapIncident) => void;
  activeFilter: IncidentCategory;
  activeLayer: MapLayerType;
  onCadreClick: () => void;
  recenterTrigger?: number;
}

// Tọa độ trung tâm cán bộ và ranh giới hành chính lấy từ GisConfig
const CADRE_COORDS = GIS_CADRE_DEFAULT_COORDS;
const HANG_TRONG_BOUNDARY = GIS_HANG_TRONG_BOUNDARY;

// Lấy CARTO API Key từ biến môi trường .env (VITE_CARTO_API_KEY)
const CARTO_API_KEY = import.meta.env.VITE_CARTO_API_KEY || '';

/**
 * Controller Component chạy bên trong MapContainer
 * Giải quyết dứt điểm lỗi "chỗ có chỗ không / không tải các mảnh bản đồ":
 * - Tự động gọi map.invalidateSize() khi DOM container render xong
 * - Lắng nghe ResizeObserver theo dõi kích thước layout của Ionic
 * - Hỗ trợ Recenter, Zoom và Compass
 */
const LeafletMapController: React.FC<{
  recenterTrigger?: number;
  activeLayer: MapLayerType;
  onZoomInRef: React.MutableRefObject<(() => void) | null>;
  onZoomOutRef: React.MutableRefObject<(() => void) | null>;
  onResetCompassRef: React.MutableRefObject<(() => void) | null>;
}> = ({
  recenterTrigger,
  activeLayer,
  onZoomInRef,
  onZoomOutRef,
  onResetCompassRef,
}) => {
    const map = useMap();

    // Khắc phục triệt để lỗi không tải mảnh bản đồ (invalidateSize sau khi render)
    useEffect(() => {
      // 1. Gọi ngay khi Leaflet instance sẵn sàng
      map.invalidateSize();

      // 2. Gọi sau các khoảng thời gian trễ ngắn để bắt kịp quá trình paint layout của Ionic
      const timer1 = setTimeout(() => {
        map.invalidateSize();
      }, 150);

      const timer2 = setTimeout(() => {
        map.invalidateSize();
      }, 450);

      // 3. Sử dụng ResizeObserver để tự động cập nhật khi container thay đổi kích thước
      let resizeObserver: ResizeObserver | null = null;
      try {
        const container = map.getContainer();
        if (typeof ResizeObserver !== 'undefined' && container) {
          resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
          });
          resizeObserver.observe(container);
        }
      } catch {
        // Fallback an toàn nếu browser cũ không hỗ trợ
      }

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [map]);

    // Cập nhật lại khung vẽ bản đồ mỗi khi đổi layer (CARTO <-> Satellite)
    useEffect(() => {
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 100);
      return () => clearTimeout(timer);
    }, [activeLayer, map]);

    // Điều khiển các nút Zoom và Compass
    useEffect(() => {
      onZoomInRef.current = () => map.zoomIn();
      onZoomOutRef.current = () => map.zoomOut();
      onResetCompassRef.current = () => {
        map.flyTo([CADRE_COORDS.lat, CADRE_COORDS.lng], 16.5, {
          duration: 1.0,
        });
      };
    }, [map, onZoomInRef, onZoomOutRef, onResetCompassRef]);

    // Recenter GPS khi bấm nút Recenter ở HUD
    useEffect(() => {
      if (recenterTrigger && recenterTrigger > 0) {
        map.flyTo([CADRE_COORDS.lat, CADRE_COORDS.lng], 16.5, {
          duration: 1.2,
        });
      }
    }, [recenterTrigger, map]);

    return null;
  };

export const GisMapCanvas: React.FC<GisMapCanvasProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
  activeFilter,
  activeLayer,
  onCadreClick,
  recenterTrigger,
}) => {
  // Trạng thái chờ giao diện DOM và layout container hoàn tất render
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const zoomInRef = useRef<(() => void) | null>(null);
  const zoomOutRef = useRef<(() => void) | null>(null);
  const resetCompassRef = useRef<(() => void) | null>(null);

  // Chỉ kích hoạt render Leaflet sau khi component đã mount và DOM đã ổn định
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  // Cấu hình URL TileLayer chỉ gồm 2 lớp: CARTO và Ảnh Vệ Tinh
  const tileLayerConfig = useMemo(() => {

    if (activeLayer === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution:
          '&copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community',
        subdomains: 'abcd',
      };
    }

    // Mặc định: Lớp CARTO Voyager với API Key từ .env
    return {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY}`,
      attribution:
        '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
    };
  }, [activeLayer]);

  // Icon Leaflet vị trí cán bộ hiện trường (24 Hàng Trống) với pulsing aura
  const cadreIcon = useMemo(() => {
    return L.divIcon({
      className: 'custom-incident-pin',
      html: `
        <div class="relative flex items-center justify-center pointer-events-auto cursor-pointer" title="Vị trí của bạn: 24 Hàng Trống">
          <span class="absolute w-8 h-8 rounded-full bg-secondary opacity-40 animate-ping"></span>
          <span class="absolute w-5 h-5 rounded-full bg-secondary-container opacity-80"></span>
          <span class="w-3.5 h-3.5 rounded-full bg-secondary ring-2 ring-white z-10 shadow-sm"></span>
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-white font-sans text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap shadow-md border border-[#c3c6ce]/30 pointer-events-none">
            Vị trí của bạn (Số 24)
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }, []);

  // Tạo Icon Leaflet cho từng sự cố theo thiết kế TaskCode.md
  const createIncidentIcon = (inc: MapIncident, isSelected: boolean) => {
    if (inc.priority === 'urgent') {
      return L.divIcon({
        className: 'custom-incident-pin',
        html: `
          <div class="relative flex flex-col items-center cursor-pointer transition-transform ${isSelected ? 'scale-125 z-50 drop-shadow-xl' : 'hover:scale-110 active:scale-95'
          }" title="${inc.code} - ${inc.title}">
            <div class="bg-error text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md ring-2 ${isSelected ? 'ring-primary ring-offset-1' : 'ring-white'
          }">
              <span class="material-symbols-outlined text-[19px]" style="font-variation-settings: 'FILL' 1;">priority_high</span>
            </div>
            <div class="w-2 h-2 bg-error rotate-45 -mt-1 ring-1 ring-white"></div>
            <div class="mt-0.5 bg-error-container text-on-error-container px-1 rounded font-mono text-[9px] font-bold uppercase tracking-tight shadow-sm whitespace-nowrap border border-error/20">
              ${inc.pinLabel}
            </div>
          </div>
        `,
        iconSize: [80, 52],
        iconAnchor: [40, 48],
      });
    }

    if (inc.priority === 'in-progress') {
      return L.divIcon({
        className: 'custom-incident-pin',
        html: `
          <div class="relative flex flex-col items-center cursor-pointer transition-transform ${isSelected ? 'scale-125 z-50 drop-shadow-xl' : 'hover:scale-110 active:scale-95'
          }" title="${inc.code} - ${inc.title}">
            <div class="bg-white text-[#111c2d] w-7 h-7 rounded-full flex items-center justify-center shadow-sm ring-1 ${isSelected ? 'ring-2 ring-[#00152a]' : 'ring-gray-300'
          }">
              <div class="w-6 h-6 rounded-full bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
                <span class="material-symbols-outlined text-[16px]">${inc.icon}</span>
              </div>
            </div>
            <div class="w-1.5 h-1.5 bg-white rotate-45 -mt-1 shadow-sm"></div>
            <div class="mt-0.5 bg-[#FFFBEB] text-[#D97706] px-1 rounded font-mono text-[9px] font-bold uppercase tracking-tight shadow-sm whitespace-nowrap border border-[#D97706]/30">
              ${inc.pinLabel}
            </div>
          </div>
        `,
        iconSize: [80, 50],
        iconAnchor: [40, 46],
      });
    }

    // Pending incident
    return L.divIcon({
      className: 'custom-incident-pin',
      html: `
        <div class="relative flex flex-col items-center cursor-pointer transition-transform ${isSelected ? 'scale-125 z-50 drop-shadow-xl' : 'hover:scale-110 active:scale-95'
        }" title="${inc.code} - ${inc.title}">
          <div class="bg-white text-[#111c2d] w-7 h-7 rounded-full flex items-center justify-center shadow-sm ring-1 ${isSelected ? 'ring-2 ring-[#00152a]' : 'ring-gray-300'
        }">
            <div class="w-6 h-6 rounded-full bg-[#7ddbfd] text-[#006077] flex items-center justify-center">
              <span class="material-symbols-outlined text-[16px]">${inc.icon}</span>
            </div>
          </div>
          <div class="w-1.5 h-1.5 bg-white rotate-45 -mt-1 shadow-sm"></div>
          <div class="mt-0.5 bg-[#7ddbfd] text-[#006077] px-1 rounded font-mono text-[9px] font-bold uppercase tracking-tight shadow-sm whitespace-nowrap border border-[#006780]/30">
            ${inc.pinLabel}
          </div>
        </div>
      `,
      iconSize: [80, 50],
      iconAnchor: [40, 46],
    });
  };

  // Lọc sự cố theo filter chip
  const isIncidentVisible = (incident: MapIncident) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'my-team') return incident.team === 'my-team';
    if (activeFilter === '500m') return incident.distanceMeters <= 500;
    if (activeFilter === 'cay-xanh') return incident.category === 'cay-xanh';
    if (activeFilter === 'ho-ga') return incident.category === 'ho-ga';
    if (activeFilter === 'thoat-nuoc') return incident.category === 'thoat-nuoc';
    return true;
  };

  // Màn hình chờ khi giao diện chưa render xong
  if (!isMounted) {
    return (
      <div
        className="relative w-full h-full min-h-[360px] overflow-hidden bg-surface-container-low select-none flex flex-col items-center justify-center gap-2 border-y border-outline-variant/30"
        id="gis-viewport"
      >
        <div className="w-9 h-9 rounded-full border-3 border-secondary border-t-transparent animate-spin" />
        <span className="font-label-md text-[12px] text-on-surface-variant font-medium">
          Đang kết nối bản đồ CARTO...
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full min-h-[360px] overflow-hidden bg-surface-container-low select-none"
      id="gis-viewport"
    >
      {/* Container Leaflet Map thực tế, chỉ render khi DOM đã sẵn sàng */}
      <MapContainer
        center={[CADRE_COORDS.lat, CADRE_COORDS.lng]}
        zoom={16.2}
        minZoom={GIS_ZOOM_CONFIG.MIN_ZOOM}
        maxZoom={GIS_ZOOM_CONFIG.MAX_ZOOM}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-1"
      >
        {/* Layer Tile của CARTO hoặc ESRI Satellite - Giới hạn maxZoom và maxNativeZoom 18 tránh lỗi 404 mất mảnh bản đồ */}
        <TileLayer
          key={activeLayer}
          url={tileLayerConfig.url}
          attribution={tileLayerConfig.attribution}
          subdomains={tileLayerConfig.subdomains}
          maxZoom={GIS_ZOOM_CONFIG.MAX_ZOOM}
          maxNativeZoom={GIS_ZOOM_CONFIG.MAX_NATIVE_ZOOM}
        />

        {/* Bộ điều khiển tương tác bản đồ Leaflet & InvalidateSize */}
        <LeafletMapController
          recenterTrigger={recenterTrigger}
          activeLayer={activeLayer}
          onZoomInRef={zoomInRef}
          onZoomOutRef={zoomOutRef}
          onResetCompassRef={resetCompassRef}
        />

        {/* Đa giác ranh giới hành chính: Phường Hàng Trống */}
        <Polygon
          positions={HANG_TRONG_BOUNDARY}
          pathOptions={{
            color: '#006780',
            weight: 2.5,
            dashArray: '6, 4',
            fillColor: '#006780',
            fillOpacity: activeLayer === 'satellite' ? 0.15 : 0.06,
          }}
        />

        {/* Bán kính tác chiến 500m quanh vị trí cán bộ */}
        <Circle
          center={[CADRE_COORDS.lat, CADRE_COORDS.lng]}
          radius={GIS_OPERATION_RADIUS_METERS}
          pathOptions={{
            color: '#74D3F4',
            weight: 1.5,
            dashArray: '4, 4',
            fillColor: 'transparent',
            opacity: 0.85,
          }}
        />

        {/* Marker vị trí GPS của cán bộ (24 Hàng Trống) */}
        <Marker
          position={[CADRE_COORDS.lat, CADRE_COORDS.lng]}
          icon={cadreIcon}
          eventHandlers={{
            click: onCadreClick,
          }}
        />

        {/* Các Marker ghim sự cố tác chiến */}
        {incidents.map((inc) => {
          if (!isIncidentVisible(inc)) return null;
          const isSelected = selectedIncident?.id === inc.id;

          return (
            <Marker
              key={inc.id}
              position={[inc.coords.lat, inc.coords.lng]}
              icon={createIncidentIcon(inc, isSelected)}
              eventHandlers={{
                click: () => onSelectIncident(inc),
              }}
            />
          );
        })}
      </MapContainer>

      {/* Floating Map Controls tùy biến góc trên phải (Zoom +, Zoom -, Hướng Bắc) */}
      <div className="absolute right-3 top-4 z-[999] flex flex-col gap-1.5 shadow-sm pointer-events-auto">
        <button
          type="button"
          onClick={() => zoomInRef.current?.()}
          className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-container active:scale-95 text-on-surface flex items-center justify-center font-bold text-sm shadow-sm border border-outline-variant/30 transition-all cursor-pointer"
          title="Phóng to bản đồ"
          aria-label="Phóng to"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomOutRef.current?.()}
          className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-container active:scale-95 text-on-surface flex items-center justify-center font-bold text-sm shadow-sm border border-outline-variant/30 transition-all cursor-pointer"
          title="Thu nhỏ bản đồ"
          aria-label="Thu nhỏ"
        >
          −
        </button>
        <button
          type="button"
          onClick={() => resetCompassRef.current?.()}
          className="w-8 h-8 rounded bg-surface-container-lowest hover:bg-surface-container active:scale-95 text-secondary flex items-center justify-center shadow-sm border border-outline-variant/30 transition-all cursor-pointer"
          title="Định hướng và trở về vị trí cán bộ"
          aria-label="Hướng Bắc"
        >
          <span className="material-symbols-outlined text-[18px]">explore</span>
        </button>
      </div>

      {/* Legend Quick Indicator Overlay (Góc trái dưới) */}
      <div className="absolute left-3 bottom-14 z-[999] bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1.5 rounded shadow-sm border border-outline-variant/30 text-[10px] font-label-sm text-on-surface flex flex-col gap-1 select-none pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-error" />
          <span className="text-on-surface-variant font-medium">Khẩn cấp (01)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          <span className="text-on-surface-variant font-medium">Đang xử lý (01)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-on-surface-variant font-medium">Chờ tiếp nhận (01)</span>
        </div>
      </div>
    </div>
  );
};

export default GisMapCanvas;
