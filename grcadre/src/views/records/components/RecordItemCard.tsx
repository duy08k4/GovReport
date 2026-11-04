import React from 'react';
import { IncidentRecord } from '../types';

interface RecordItemCardProps {
  record: IncidentRecord;
  onClaimTask: (record: IncidentRecord) => void;
  onOpenAudit: (record: IncidentRecord) => void;
}

export const RecordItemCard: React.FC<RecordItemCardProps> = ({
  record,
  onClaimTask,
  onOpenAudit,
}) => {
  return (
    <div
      className="incident-card bg-surface-container-lowest !rounded-xl shadow-xs border border-outline-variant/30 !p-3.5 flex flex-col gap-3 relative overflow-hidden transition-all hover:shadow-md"
      data-status={record.status}
    >
      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-code-tabular text-code-tabular text-primary font-bold">
              {record.code}
            </span>
            <span
              className={`!px-2 !py-0.5 !rounded text-label-sm font-label-sm uppercase tracking-wider ${record.statusBadgeBg} ${record.statusBadgeColor} font-semibold`}
            >
              {record.statusLabel}
            </span>
          </div>
          <span className="text-body-sm font-body-sm text-outline mt-0.5">
            {record.timeText}
          </span>
        </div>

        {record.priority === 'urgent' && (
          <span className="!px-2 !py-0.5 !rounded text-label-sm font-label-sm bg-error-container text-error font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            <span>{record.priorityLabel || 'Ưu tiên cao'}</span>
          </span>
        )}

        {record.status === 'in_progress' && (
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {record.assignmentSource === 'tenant_dispatched' ? (
              <span className="!px-2 !py-0.5 !rounded bg-purple-50 text-purple-700 font-label-sm text-[11px] font-bold border border-purple-200">
                Được giao
              </span>
            ) : record.assignmentSource === 'self_claimed' ? (
              <span className="!px-2 !py-0.5 !rounded bg-[#F0FDF4] text-[#15803D] font-label-sm text-[11px] font-bold border border-emerald-200">
                Tự nhận
              </span>
            ) : null}
            {record.slaRemainingText && (
              <div className="flex items-center gap-1 !px-2 !py-0.5 !rounded bg-surface-container text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>{record.slaRemainingText}</span>
              </div>
            )}
          </div>
        )}

        {record.status === 'resolved' && (
          <div className="flex items-center gap-1.5">
            {record.assignmentSource === 'tenant_dispatched' ? (
              <span className="!px-2 !py-0.5 !rounded bg-purple-50 text-purple-700 font-label-sm text-[11px] font-bold border border-purple-200">
                Được giao
              </span>
            ) : record.assignmentSource === 'self_claimed' ? (
              <span className="!px-2 !py-0.5 !rounded bg-[#F0FDF4] text-[#15803D] font-label-sm text-[11px] font-bold border border-emerald-200">
                Tự nhận
              </span>
            ) : null}
            <span className="w-6 h-6 !rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </span>
          </div>
        )}
      </div>

      {/* Detail Context with Photo */}
      <div className="flex gap-3">
        {record.imageUrl && (
          <div className="w-20 h-20 !rounded-lg overflow-hidden shrink-0 bg-surface-container relative border border-outline-variant/20">
            <img
              src={record.imageUrl}
              alt={record.imageAlt || record.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {record.photosCount && record.photosCount > 1 && (
              <div className="absolute bottom-1 right-1 bg-primary/80 backdrop-blur-sm text-on-primary text-[9px] !px-1 !rounded flex items-center gap-0.5 font-medium">
                <span className="material-symbols-outlined text-[10px]">photo_library</span>
                <span>{record.photosCount} ảnh</span>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight truncate">
              {record.title}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 flex items-center gap-1 truncate">
              <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">
                location_on
              </span>
              <span className="truncate">{record.address}</span>
            </p>
          </div>

          {/* Đội phụ trách & Trưởng team */}
          {record.assignedTeam ? (
            <div className="flex flex-col mt-1">
              <div className="flex items-center gap-1.5 text-label-md font-label-md text-primary font-bold truncate">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  groups
                </span>
                <span className="truncate">{record.assignedTeam.name}</span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-medium">
                Chỉ huy: {record.assignedTeam.leaderName}
              </span>
            </div>
          ) : (
            <div className="text-label-md font-label-md text-on-surface-variant flex items-center gap-1.5 mt-1">
              <span className="material-symbols-outlined text-[16px] text-outline">
                shield
              </span>
              <span className="truncate">{record.teamName || 'Chưa phân công đội'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Case 1: Sự cố chưa có ai nhận -> Nút "Nhận việc" màu xanh */}
      {record.status === 'submitted' && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onClaimTask(record)}
            className="w-full h-10 bg-[#0084A3] hover:bg-[#006e87] text-white !rounded-lg font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-[0.99] transition-transform shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            <span>Nhận việc</span>
          </button>
        </div>
      )}

      {/* Case 2: Sự cố được cơ quan giao xuống -> Nút "Nhận việc" màu tím */}
      {record.status === 'received' && (
        <div className="flex flex-col gap-2">
          {record.tenantDirective && (
            <p className="text-[12px] text-purple-950 bg-purple-50 !p-2 !rounded-lg border border-purple-200 leading-relaxed font-medium">
              <span className="font-bold text-purple-800">Chỉ đạo:</span> {record.tenantDirective}
            </p>
          )}

          <button
            type="button"
            onClick={() => onClaimTask(record)}
            className="w-full h-10 bg-purple-700 hover:bg-purple-800 text-white !rounded-lg font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-[0.99] transition-transform shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            <span>Nhận việc</span>
          </button>
        </div>
      )}

      {/* Trạng thái Đang xử lý: Tiến độ thực địa & Gọi điện / Xem thực địa */}
      {record.status === 'in_progress' && (
        <>
          <div className="bg-surface-container-low rounded-lg !p-2.5 flex flex-col gap-1.5 border border-outline-variant/20">
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant truncate">
                {record.progressStepText || 'Tiến độ thực địa'}
              </span>
              <span className="font-code-tabular text-primary font-semibold">
                {record.progressPercent || 0}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500"
                style={{ width: `${record.progressPercent || 0}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${record.assignedTeam?.leaderPhone || '0912345678'}`}
              className="h-9 !rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors cursor-pointer border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">
                phone_in_talk
              </span>
              <span>Gọi Đội trưởng</span>
            </a>
            <button
              type="button"
              onClick={() => onOpenAudit(record)}
              className="h-9 !rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center gap-1.5 font-label-md text-label-md transition-colors cursor-pointer border border-outline-variant/30 active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Xem thực địa</span>
            </button>
          </div>
        </>
      )}

      {/* Trạng thái Đã hoàn thành: Nghiệm thu & Chữ ký dân cư */}
      {record.status === 'resolved' && (
        <div className="bg-surface-container-low rounded-lg !p-2.5 flex items-center justify-between border border-outline-variant/20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">
              fact_check
            </span>
            <span className="font-label-md text-label-md text-on-surface truncate">
              {record.proofNote || 'Đã lưu ảnh đối soát và chữ ký dân cư'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenAudit(record)}
            className="font-label-sm text-label-sm text-secondary font-semibold hover:underline shrink-0 ml-2 cursor-pointer"
          >
            Chi tiết
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordItemCard;
