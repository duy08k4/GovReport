import React, { useState } from 'react';
import { MapIncident } from '../types';

interface IncidentPopupSheetProps {
  incident: MapIncident | null;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onViewDetails: (incident: MapIncident) => void;
}

export const IncidentPopupSheet: React.FC<IncidentPopupSheetProps> = ({
  incident,
  isOpen,
  onClose,
  onOpen,
  onViewDetails,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!incident) {
    return null;
  }

  // Chuyển hướng chỉ đường Google Maps
  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      incident.address
    )}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="incident-bottom-sheet"
      className={`absolute bottom-0 inset-x-0 z-[1001] w-full bg-surface-container-lowest rounded-t-2xl shadow-2xl border-t border-outline-variant/30 transition-all duration-300 ease-out select-none ${
        !isOpen
          ? 'translate-y-full pointer-events-none opacity-0'
          : isMinimized
          ? 'translate-y-[calc(100%-48px)]'
          : 'translate-y-0'
      }`}
      style={{
        boxShadow: '0 -10px 25px -5px rgba(0, 21, 42, 0.12), 0 -8px 10px -6px rgba(0, 21, 42, 0.08)',
      }}
    >
      {/* Sheet Drag Handle & Collapse/Expand Header */}
      <div
        className="w-full flex items-center justify-between !px-margin !pt-2 !pb-1 cursor-pointer"
        id="sheet-drag-handle"
        onClick={() => setIsMinimized((prev) => !prev)}
        title={isMinimized ? 'Chạm để mở rộng thông tin' : 'Chạm để thu gọn'}
      >
        <div className="w-8">
          {/* Dummy for balancing */}
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-1.25 bg-outline-variant/70 rounded-full transition-colors hover:bg-outline" />
          {isMinimized && (
            <span className="text-[10px] font-label-sm font-semibold text-secondary mt-1 flex items-center gap-0.5">
              <span>{incident.code}</span> • <span>{incident.priorityLabel}</span>
              <span className="material-symbols-outlined text-[14px]">expand_less</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized((prev) => !prev);
            }}
            className="w-7 h-7 rounded-full text-on-surface-variant hover:bg-surface-container flex items-center justify-center transition-colors"
            title={isMinimized ? 'Mở rộng' : 'Thu gọn'}
            aria-label="Thu gọn hoặc mở rộng"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isMinimized ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-7 h-7 rounded-full text-on-surface-variant hover:bg-surface-container flex items-center justify-center transition-colors"
            title="Đóng popup"
            aria-label="Đóng popup sự cố"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>

      {/* Sheet Content Body */}
      <div className="!px-margin !pt-1 !pb-space-lg">
        {/* Header Meta & Status Chips */}
        <div className="flex items-center justify-between gap-space-xs mt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`!px-2 !py-0.5 rounded font-label-sm text-[11px] font-bold uppercase tracking-wider ${incident.statusBadgeBg} ${incident.statusBadgeColor}`}
            >
              {incident.priorityLabel}
            </span>
            <span className="!px-2 !py-0.5 rounded font-label-sm text-[11px] font-semibold bg-surface-container-high text-on-surface-variant uppercase tracking-wider">
              {incident.teamName}
            </span>
          </div>
          <span className="font-code-tabular text-[12px] font-bold text-secondary tracking-tight">
            {incident.code}
          </span>
        </div>

        {/* Incident Title */}
        <h3 className="font-headline-sm text-headline-sm text-on-surface mt-2 tracking-tight line-clamp-2 leading-tight">
          {incident.title}
        </h3>

        {/* Address subtext */}
        <p className="text-[12px] text-on-surface-variant flex items-center gap-1 mt-1 truncate">
          <span className="material-symbols-outlined text-[15px] text-secondary shrink-0">
            location_on
          </span>
          <span className="truncate">{incident.address}</span>
        </p>

        {/* Distance & ETA Matrix Banner */}
        <div className="grid grid-cols-2 gap-space-xs mt-3 !p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                navigation
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                Cự ly tiếp cận
              </span>
              <span className="font-body-md text-body-md font-bold text-on-surface leading-tight truncate">
                {incident.distance}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                incident.slaUrgent ? 'bg-error/10' : 'bg-surface-container-high'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  incident.slaUrgent ? 'text-error animate-pulse' : 'text-on-surface-variant'
                }`}
              >
                timer
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`font-label-sm text-[10px] uppercase font-semibold ${
                  incident.slaUrgent ? 'text-error' : 'text-on-surface-variant'
                }`}
              >
                Hạn mức SLA
              </span>
              <span
                className={`font-body-md text-body-md font-bold leading-tight truncate ${
                  incident.slaUrgent ? 'text-error' : 'text-on-surface'
                }`}
              >
                {incident.slaText}
              </span>
            </div>
          </div>
        </div>

        {/* Field Operator Action Buttons */}
        <div className="grid grid-cols-2 gap-space-sm mt-3 pt-1">
          <button
            type="button"
            onClick={handleDirections}
            className="h-10 !px-3 !rounded bg-surface-container-lowest hover:bg-surface-container active:scale-98 text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all shadow-sm border border-outline-variant/40 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              directions
            </span>
            <span className="font-semibold">Chỉ đường</span>
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(incident)}
            data-path="chi-tiet-tac-vu"
            className="h-10 !px-3 !rounded bg-primary-container hover:bg-primary active:scale-98 text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            <span className="font-semibold">Chi tiết xử lý</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentPopupSheet;
