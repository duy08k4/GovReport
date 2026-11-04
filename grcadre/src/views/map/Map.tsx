import React, { useState } from 'react';
import { useIonRouter, IonToast } from '@ionic/react';
import { ROUTES } from '../../config/Routing';
import GisHudBar from './components/GisHudBar';
import GisMapCanvas from './components/GisMapCanvas';
import IncidentPopupSheet from './components/IncidentPopupSheet';
import { MapIncident, IncidentCategory, MapLayerType } from './types';

// Dữ liệu sự cố trên bản đồ tác chiến từ TaskCode.md
const MOCK_MAP_INCIDENTS: MapIncident[] = [
  {
    id: 'inc-1',
    code: 'SC-2026-HN09',
    title: 'Hố ga mất nắp nguy hiểm trước số 42 Tràng Tiền',
    category: 'ho-ga',
    categoryName: 'Hố ga',
    team: 'my-team',
    teamName: 'Đội phản ứng nhanh số 1',
    priority: 'urgent',
    priorityLabel: 'Khẩn cấp',
    statusBadgeBg: 'bg-[#FEF2F2]',
    statusBadgeColor: 'text-[#DC2626]',
    address: 'Số 42 Tràng Tiền, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distance: '180m • 2 phút đi bộ',
    distanceMeters: 180,
    slaText: 'Còn 45 phút',
    slaUrgent: true,
    pinX: 225,
    pinY: 280,
    pinLabel: 'SC-HN09 • 180m',
    icon: 'priority_high',
    coords: {
      lat: 21.0255,
      lng: 105.8542,
    },
  },
  {
    id: 'inc-2',
    code: 'SC-2026-HN08',
    title: 'Cành cây gãy chắn lối đi trước số 15 Bà Triệu',
    category: 'cay-xanh',
    categoryName: 'Cây xanh',
    team: 'other',
    teamName: 'Đội Cây xanh Đô thị',
    priority: 'in-progress',
    priorityLabel: 'Đang xử lý',
    statusBadgeBg: 'bg-[#FFFBEB]',
    statusBadgeColor: 'text-[#D97706]',
    address: 'Số 15 Bà Triệu, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distance: '320m • 4 phút đi bộ',
    distanceMeters: 320,
    slaText: 'Còn 120 phút',
    slaUrgent: false,
    pinX: 210,
    pinY: 410,
    pinLabel: 'Đang xử lý',
    icon: 'park',
    coords: {
      lat: 21.0238,
      lng: 105.8528,
    },
  },
  {
    id: 'inc-3',
    code: 'SC-2026-HN14',
    title: 'Tắc nghẽn rãnh thoát nước ngõ Cầu Đất',
    category: 'thoat-nuoc',
    categoryName: 'Thoát nước',
    team: 'other',
    teamName: 'Đội Thoát nước Đô thị',
    priority: 'pending',
    priorityLabel: 'Chờ duyệt',
    statusBadgeBg: 'bg-secondary-container',
    statusBadgeColor: 'text-on-secondary-container',
    address: 'Ngõ Cầu Đất, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    distance: '450m • 6 phút đi bộ',
    distanceMeters: 450,
    slaText: 'Còn 180 phút',
    slaUrgent: false,
    pinX: 95,
    pinY: 320,
    pinLabel: 'Chờ duyệt',
    icon: 'water_drop',
    coords: {
      lat: 21.0271,
      lng: 105.8496,
    },
  },
];

export const Map: React.FC = () => {
  const router = useIonRouter();

  // Filter & Layer States
  const [activeFilter, setActiveFilter] = useState<IncidentCategory>('all');
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('carto');

  // Selected Incident State (Default SC-2026-HN09 as specified in TaskCode.md)
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(
    MOCK_MAP_INCIDENTS[0]
  );

  // Absolute popup open/close state
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

  // Recenter counter
  const [recenterCount, setRecenterCount] = useState<number>(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  // Calculate filter counts
  const filterCounts = {
    all: MOCK_MAP_INCIDENTS.length,
    myTeam: MOCK_MAP_INCIDENTS.filter((i) => i.team === 'my-team').length,
    radius500m: MOCK_MAP_INCIDENTS.filter((i) => i.distanceMeters <= 500).length,
    cayXanh: MOCK_MAP_INCIDENTS.filter((i) => i.category === 'cay-xanh').length,
    hoGa: MOCK_MAP_INCIDENTS.filter((i) => i.category === 'ho-ga').length,
    thoatNuoc: MOCK_MAP_INCIDENTS.filter((i) => i.category === 'thoat-nuoc').length,
  };

  // Recenter GPS Action
  const handleRecenter = () => {
    setRecenterCount((prev) => prev + 1);
    setToastMessage('Đã đồng bộ GPS tại: 24 Hàng Trống (Độ chính xác: ±3m)');
    setShowToast(true);

    const cadrePin = document.getElementById('pin-cadre-gps');
    if (cadrePin) {
      cadrePin.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Select Pin Action
  const handleSelectIncident = (incident: MapIncident) => {
    setSelectedIncident(incident);
    setIsPopupOpen(true);
  };

  // Cadre location click
  const handleCadreClick = () => {
    setToastMessage('Vị trí cán bộ: 24 Hàng Trống • Trực ca: Sáng (07:00 - 15:30)');
    setShowToast(true);
  };

  // View details action: Chuyển thẳng đến trang Chi tiết tác vụ
  const handleViewDetails = (incident: MapIncident) => {
    router.push(`/main/tasks/${incident.code}`, 'forward', 'push');
  };

  return (
    <>
      <div className="flex flex-col w-full h-[calc(100dvh-8.5rem)] relative select-none">
        {/* Top Floating GIS HUD Bar */}
        <GisHudBar
          currentLocationText="Vị trí: 24 Hàng Trống, Q. Hoàn Kiếm"
          activeFilter={activeFilter}
          onFilterChange={(cat) => setActiveFilter(cat)}
          onRecenter={handleRecenter}
          activeLayer={activeLayer}
          onLayerChange={(layer) => {
            setActiveLayer(layer);
            setToastMessage(
              layer === 'carto'
                ? 'Đã chuyển sang: Bản Đồ CARTO'
                : 'Đã chuyển sang: Ảnh Vệ Tinh Hỗn Hợp'
            );
            setShowToast(true);
          }}
          filterCounts={filterCounts}
        />

        {/* Interactive GIS Canvas Viewport Wrapper */}
        <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-surface-container-low border-y border-outline-variant/30">
          {/* SVG Map Canvas with Pins & Controls */}
          <GisMapCanvas
            incidents={MOCK_MAP_INCIDENTS}
            selectedIncident={selectedIncident}
            onSelectIncident={handleSelectIncident}
            activeFilter={activeFilter}
            activeLayer={activeLayer}
            onCadreClick={handleCadreClick}
            recenterTrigger={recenterCount}
          />

          {/* Re-open Pill button if popup was closed */}
          {!isPopupOpen && selectedIncident && (
            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] shadow-lg flex items-center gap-1.5 border border-outline-variant/40 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary-container">
                priority_high
              </span>
              <span>Xem {selectedIncident.code}</span>
              <span className="material-symbols-outlined text-[16px]">expand_less</span>
            </button>
          )}

          {/* 
            CRITICAL USER SPECIFICATION:
            "Cái popup sự cố sẽ là absolute trên nhé."
            Positioned absolute over the bottom area of the map canvas
          */}
          <IncidentPopupSheet
            incident={selectedIncident}
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onOpen={() => setIsPopupOpen(true)}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>

      {/* Thông báo tương tác nhanh */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2500}
        position="top"
        className="text-[12px] font-label-md"
      />
    </>
  );
};

export default Map;
