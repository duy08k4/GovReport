import React, { useState } from 'react';
import { IncidentCategory, MapLayerType } from '../types';
import { GIS_CADRE_DEFAULT_ADDRESS, GIS_TILE_LAYERS } from '../../../config/static/GisConfig';

interface GisHudBarProps {
  currentLocationText?: string;
  activeFilter: IncidentCategory;
  onFilterChange: (category: IncidentCategory) => void;
  onRecenter: () => void;
  activeLayer: MapLayerType;
  onLayerChange: (layer: MapLayerType) => void;
  filterCounts: {
    all: number;
    myTeam: number;
    radius500m: number;
    cayXanh: number;
    hoGa: number;
    thoatNuoc: number;
  };
}

export const GisHudBar: React.FC<GisHudBarProps> = ({
  currentLocationText = `Vị trí: ${GIS_CADRE_DEFAULT_ADDRESS}`,
  activeFilter,
  onFilterChange,
  onRecenter,
  activeLayer,
  onLayerChange,
  filterCounts,
}) => {
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  const filterOptions: { key: IncidentCategory; label: string }[] = [
    { key: 'all', label: `Tất cả (${filterCounts.all})` },
    { key: 'my-team', label: 'Việc Đội tôi' },
    { key: '500m', label: 'Bán kính 500m' },
    { key: 'cay-xanh', label: 'Cây xanh' },
    { key: 'ho-ga', label: 'Hố ga' },
    { key: 'thoat-nuoc', label: 'Thoát nước' },
  ];

  const layerOptions: { key: MapLayerType; label: string; icon: string; desc: string }[] = [
    {
      key: 'carto',
      label: GIS_TILE_LAYERS.carto.name,
      icon: GIS_TILE_LAYERS.carto.icon,
      desc: GIS_TILE_LAYERS.carto.desc,
    },
    {
      key: 'satellite',
      label: GIS_TILE_LAYERS.satellite.name,
      icon: GIS_TILE_LAYERS.satellite.icon,
      desc: GIS_TILE_LAYERS.satellite.desc,
    },
  ];

  return (
    <div className="!px-margin !pt-space-sm !pb-space-xs z-30 flex flex-col gap-space-xs pointer-events-auto relative">
      {/* Search / Mode Row */}
      <div className="flex items-center justify-between gap-space-xs bg-surface-container-lowest !p-1.5 rounded shadow-sm border border-outline-variant/30">
        <div className="flex items-center gap-space-xs flex-1 min-w-0 !px-2 !py-1 bg-surface-container-low rounded">
          <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">
            my_location
          </span>
          <span className="font-label-md text-label-md text-on-surface truncate select-text">
            {currentLocationText}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onRecenter}
            className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high active:scale-95 text-primary flex items-center justify-center transition-all cursor-pointer"
            id="btn-recenter"
            title="Định vị GPS về cán bộ"
            aria-label="Định vị GPS"
          >
            <span className="material-symbols-outlined text-[18px]">gps_fixed</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLayerMenu((prev) => !prev)}
            className={`w-8 h-8 rounded active:scale-95 flex items-center justify-center transition-all cursor-pointer ${
              showLayerMenu
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container hover:bg-surface-container-high text-primary'
            }`}
            id="btn-toggle-layer"
            title="Đổi lớp bản đồ"
            aria-label="Đổi lớp bản đồ"
          >
            <span className="material-symbols-outlined text-[18px]">layers</span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu Đổi lớp bản đồ */}
      {showLayerMenu && (
        <div className="absolute top-[52px] right-margin z-40 w-64 bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/40 p-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-outline-variant/20 px-1">
            <span className="text-[11px] font-label-sm font-bold text-on-surface uppercase tracking-wider">
              Lớp bản đồ tác chiến
            </span>
            <button
              type="button"
              onClick={() => setShowLayerMenu(false)}
              className="text-on-surface-variant hover:text-primary text-[14px] p-0.5 rounded"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {layerOptions.map((opt) => {
              const isSelected = activeLayer === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    onLayerChange(opt.key);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full text-left p-2 rounded flex items-start gap-2.5 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container-high border-l-2 border-secondary'
                      : 'hover:bg-surface-container-low'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] mt-0.5 ${
                      isSelected ? 'text-secondary font-bold' : 'text-on-surface-variant'
                    }`}
                  >
                    {opt.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[12px] font-label-md ${
                          isSelected ? 'font-bold text-primary' : 'font-medium text-on-surface'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          check
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-on-surface-variant leading-tight line-clamp-1 mt-0.5">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Chips Carousel (Horizontal scrollable) */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar !py-0.5 select-none"
        id="filter-container"
      >
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              data-filter={opt.key}
              onClick={() => onFilterChange(opt.key)}
              className={`filter-chip !px-3 !py-1 rounded font-label-sm text-label-sm uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary shadow-xs font-semibold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface shadow-2xs'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GisHudBar;
