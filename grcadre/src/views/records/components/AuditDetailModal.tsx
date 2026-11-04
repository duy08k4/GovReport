import React from 'react';
import { IncidentRecord } from '../types';

interface AuditDetailModalProps {
  isOpen: boolean;
  incident: IncidentRecord | null;
  onClose: () => void;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({
  isOpen,
  incident,
  onClose,
}) => {
  if (!isOpen || !incident) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-center !p-4 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/30 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="!p-4 border-b border-surface-container-high/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Hồ sơ đối soát thực địa
              </h3>
              <p className="font-code-tabular text-[12px] text-secondary font-semibold">
                {incident.code}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="!p-4 overflow-y-auto flex flex-col gap-3">
          {/* Photo */}
          {incident.imageUrl && (
            <div className="w-full h-48 rounded-xl overflow-hidden bg-surface-container relative border border-outline-variant/20 shadow-xs">
              <img
                src={incident.imageUrl}
                alt={incident.imageAlt || incident.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-sm text-on-primary text-[10px] !px-2 !py-0.5 rounded-full flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                <span>Ảnh chụp thực địa GPS khớp tâm</span>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {incident.title}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                location_on
              </span>
              <span>{incident.address}</span>
            </p>
          </div>

          {/* Details list */}
          <div className="bg-surface-container-low rounded-xl !p-3 flex flex-col gap-2 border border-outline-variant/20 text-body-sm">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Trạng thái:</span>
              <span
                className={`!px-2 !py-0.5 rounded text-label-sm font-semibold uppercase ${incident.statusBadgeBg} ${incident.statusBadgeColor}`}
              >
                {incident.statusLabel}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Thời gian tiếp nhận:</span>
              <span className="font-medium text-on-surface">{incident.timeText}</span>
            </div>

            {incident.assignmentSource && (
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Cơ chế nhận việc:</span>
                <span
                  className={`!px-2 !py-0.5 !rounded text-label-sm font-bold ${
                    incident.assignmentSource === 'tenant_dispatched'
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'bg-[#F0FDF4] text-[#15803D] border border-emerald-200'
                  }`}
                >
                  {incident.assignmentSource === 'tenant_dispatched'
                    ? 'Được giao'
                    : 'Tự nhận'}
                </span>
              </div>
            )}

            {incident.assignedTeam ? (
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant">Đội thụ lý:</span>
                <div className="text-right">
                  <span className="font-semibold text-primary block">
                    {incident.assignedTeam.name}
                  </span>
                  <span className="text-[11px] text-on-surface-variant block">
                    Chỉ huy: {incident.assignedTeam.leaderName} ({incident.assignedTeam.leaderPhone})
                  </span>
                </div>
              </div>
            ) : incident.assignedCadre ? (
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Cán bộ phụ trách:</span>
                <span className="font-semibold text-primary">
                  {incident.assignedCadre.name}
                </span>
              </div>
            ) : null}

            {incident.tenantDirective && (
              <div className="flex flex-col gap-0.5 !pt-1 border-t border-outline-variant/15 text-[12px]">
                <span className="text-on-surface-variant font-medium">Chỉ đạo từ Cơ quan địa phương (Tenant / UBND):</span>
                <span className="text-primary italic font-semibold">"{incident.tenantDirective}"</span>
              </div>
            )}

            {incident.progressPercent !== undefined && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between text-body-sm">
                  <span className="text-on-surface-variant">Tiến độ hiện trường:</span>
                  <span className="font-bold text-primary">
                    {incident.progressPercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${incident.progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Verification Pill */}
          <div className="bg-emerald-50 text-emerald-800 rounded-xl !p-3 flex items-center gap-2 border border-emerald-200">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">
              verified_user
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-[12px] font-semibold">
                Dữ liệu đối soát hợp lệ
              </span>
              <span className="text-[11px] text-emerald-700">
                Đã ghi nhận mốc thời gian, tọa độ GPS hiện trường và biên bản kỹ thuật.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="!p-4 !pt-2 border-t border-surface-container flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditDetailModal;
