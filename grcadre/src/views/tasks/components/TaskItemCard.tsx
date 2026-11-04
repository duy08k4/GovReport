import React from 'react';
import { TaskItem } from '../types';

interface TaskItemCardProps {
  task: TaskItem;
  onViewDetail?: (taskId: string) => void;
  onNavigateMap?: (taskId: string) => void;
  onClaimTask?: (taskId: string) => void;
}

export const TaskItemCard: React.FC<TaskItemCardProps> = ({
  task,
  onViewDetail,
  onNavigateMap,
  onClaimTask,
}) => {
  // 1. Thẻ việc đã hoàn tất xem xét nhanh (Resolved / Closed state theo DBStructure.md)
  if (task.status === 'resolved' || task.status === 'closed') {
    return (
      <article
        onClick={() => onViewDetail?.(task.id)}
        className="bg-surface-container-lowest !p-3 !rounded shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 !rounded bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">task_alt</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-label-md font-label-md text-primary truncate font-semibold">
              #{task.code}: {task.title}
            </span>
            <span className="text-code-tabular font-code-tabular text-on-surface-variant text-[11px]">
              {task.completedTime || 'Đã chốt biên bản lúc 14:10'}
            </span>
          </div>
        </div>
        <span className="!px-2 !py-0.5 !rounded text-[10px] font-label-sm font-bold bg-[#F0FDF4] text-[#16A34A] flex-shrink-0">
          Hoàn thành
        </span>
      </article>
    );
  }

  // 2. Thẻ việc chung của Đội (chưa có người nhận)
  if (task.isUnassigned) {
    return (
      <article className="bg-surface-container-lowest !p-3.5 !rounded shadow-sm flex flex-col gap-space-sm relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`!px-1.5 !py-0.5 !rounded text-[11px] font-label-sm font-bold ${task.categoryBg} ${task.categoryColor}`}
            >
              {task.category}
            </span>
            <span className="text-code-tabular font-code-tabular text-on-surface-variant font-bold text-label-sm">
              #{task.code}
            </span>
          </div>
          <div className="flex items-center gap-1 !px-2 !py-0.5 !rounded bg-surface-container text-primary font-code-tabular text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">navigation</span>
            <span>{task.distance}</span>
          </div>
        </div>

        {/* Tiêu đề */}
        <div className="flex flex-col">
          <h4 className="text-headline-sm font-headline-sm text-on-surface font-semibold leading-tight">
            {task.title}
          </h4>
          <div className="flex items-center gap-1.5 mt-1.5 text-on-surface-variant text-body-sm font-body-sm">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              location_on
            </span>
            <span className="truncate">{task.address}</span>
          </div>
        </div>

        {/* Thông tin SLA chung */}
        <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant !px-1">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              group_off
            </span>
            <span>Chưa phân công Đội tiếp nhận</span>
          </div>
          <div className="flex items-center gap-1 text-code-tabular font-code-tabular text-[#16A34A] font-semibold">
            <span className="material-symbols-outlined text-[14px]">hourglass_bottom</span>
            <span>{task.slaText}</span>
          </div>
        </div>

        {/* Hình ảnh hiện trường sự cố chung */}
        {task.imageUrl && (
          <div className="w-full h-32 !rounded overflow-hidden relative bg-surface-container">
            <img
              src={task.imageUrl}
              alt={task.imageAlt || task.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 !px-2 !py-0.5 !rounded bg-[#0084A3] text-white text-[10px] font-label-sm font-bold uppercase tracking-wider">
              {task.imageBadge || 'Chờ tiếp nhận'}
            </div>
          </div>
        )}

        {/* Nút hành động nổi bật: Nhận việc */}
        <button
          type="button"
          onClick={() => onClaimTask?.(task.id)}
          className="w-full h-10 !px-4 !rounded bg-[#0084A3] hover:bg-[#006e87] active:scale-[0.99] text-white text-label-md font-label-lg flex items-center justify-center gap-2 shadow-sm transition-all mt-1 cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
          <span className="tracking-wide">Nhận việc</span>
        </button>
      </article>
    );
  }

  // 3. Thẻ việc của Đội (assignedToMe / Đội đang phụ trách)
  return (
    <article className="bg-surface-container-lowest !p-3.5 !rounded shadow-sm flex flex-col gap-space-sm relative">
      {/* Huy hiệu phân cấp & thông tin mã */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`!px-1.5 !py-0.5 !rounded text-[11px] font-label-sm font-bold ${task.categoryBg} ${task.categoryColor}`}
          >
            {task.category}
          </span>
          <span className="text-code-tabular font-code-tabular text-on-surface-variant font-bold text-label-sm">
            #{task.code}
          </span>
          {task.assignmentSource === 'tenant_dispatched' ? (
            <span className="!px-1.5 !py-0.5 !rounded bg-purple-50 text-purple-700 font-label-sm text-[10px] font-bold border border-purple-200">
              Được giao
            </span>
          ) : task.assignmentSource === 'self_claimed' ? (
            <span className="!px-1.5 !py-0.5 !rounded bg-[#F0FDF4] text-[#15803D] font-label-sm text-[10px] font-bold border border-emerald-200">
              Tự nhận
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1 !px-2 !py-0.5 !rounded bg-surface-container text-primary font-code-tabular text-label-sm font-semibold shrink-0">
          <span className="material-symbols-outlined text-[14px]">navigation</span>
          <span>{task.distance}</span>
        </div>
      </div>

      {/* Tiêu đề & nội dung */}
      <div className="flex flex-col">
        <h4 className="text-headline-sm font-headline-sm text-on-surface font-semibold leading-tight">
          {task.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1.5 text-on-surface-variant text-body-sm font-body-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            location_on
          </span>
          <span className="truncate">{task.address}</span>
        </div>
        {task.tenantDirective && (
          <p className="text-[11px] font-body-sm text-primary font-medium mt-1 bg-surface-container-low !p-1.5 !rounded border border-primary/20">
            <strong>Chỉ đạo từ Cơ quan:</strong> {task.tenantDirective}
          </p>
        )}
      </div>

      {/* Cảnh báo thời hạn SLA */}
      <div className="bg-surface-container-low !px-2.5 !py-1.5 !rounded flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#D97706] text-[16px]">schedule</span>
          <span className="text-label-sm font-label-sm text-[#D97706] font-semibold">
            {task.slaText}
          </span>
        </div>
        <span className="text-[11px] font-label-sm text-on-surface-variant font-medium">
          Chỉ huy: Đ/c Nguyễn Văn Bình
        </span>
      </div>

      {/* Hình ảnh hiện trường thực địa */}
      {task.imageUrl && (
        <div className="w-full h-32 !rounded overflow-hidden relative bg-surface-container">
          <img
            src={task.imageUrl}
            alt={task.imageAlt || task.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2 bg-primary/80 text-white text-[10px] font-code-tabular !px-2 !py-0.5 !rounded backdrop-blur-sm">
            {task.imageBadge || 'Hiện trường gốc • 15:42'}
          </div>
        </div>
      )}

      {/* Cụm nút thao tác */}
      <div className="grid grid-cols-2 gap-2 !pt-1">
        <button
          type="button"
          onClick={() => onViewDetail?.(task.id)}
          className="h-9 !px-3 !rounded bg-surface-container-high hover:bg-surface-container-highest text-primary text-label-md font-label-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>Xem chi tiết</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateMap?.(task.id)}
          className="h-9 !px-3 !rounded bg-primary hover:bg-[#1E3A5F] text-on-primary text-label-md font-label-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">directions</span>
          <span>Dẫn đường</span>
        </button>
      </div>
    </article>
  );
};

export default TaskItemCard;
