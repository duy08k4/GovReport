import React from 'react';
import { CadreProfile } from '../types';

interface CadreIdentityCardProps {
  profile: CadreProfile;
}

export const CadreIdentityCard: React.FC<CadreIdentityCardProps> = ({ profile }) => {
  return (
    <div className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-xs mb-space-md mt-space-sm relative overflow-hidden border border-outline-variant/15">
      {/* Status strip indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

      <div className="flex items-start gap-space-md">
        {/* Avatar with official framing */}
        <div className="relative flex-shrink-0">
          <img
            className="w-16 h-16 !rounded-lg object-cover bg-surface-container shadow-xs"
            alt="Chân dung cán bộ công chức nam Việt Nam nghiêm túc mặc trang phục thanh tra quản lý đô thị chuẩn mực phông nền xanh hành chính ánh sáng studio nét chi tiết tác phong chuẩn mực"
            src={profile.avatarUrl}
          />
          {profile.isVerified && (
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 !rounded-full bg-secondary text-surface-container-lowest flex items-center justify-center shadow-xs"
              title="Đã xác thực định danh công vụ"
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          )}
        </div>

        {/* Identity details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-space-xs flex-wrap">
            <h2 className="text-headline-sm font-headline-sm text-primary tracking-tight truncate">
              {profile.name}
            </h2>
          </div>
          <div className="flex items-center gap-space-xs mt-0.5">
            <span className="text-label-sm font-code-tabular text-on-surface-variant bg-surface-container !px-1.5 !py-0.5 !rounded">
              {profile.code}
            </span>
            <span className="text-body-sm font-body-sm text-on-surface-variant truncate">
              {profile.cadreType}
            </span>
          </div>
          <p className="text-body-sm font-body-sm text-on-surface mt-1 font-medium">
            {profile.position}
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 !px-2 !py-0.5 bg-secondary-container !rounded text-on-secondary-container">
            <span className="material-symbols-outlined text-[14px]">shield_person</span>
            <span className="text-label-sm font-label-sm uppercase tracking-wider font-semibold">
              {profile.roleBadge} ({profile.roleBadgeCode})
            </span>
          </div>
        </div>
      </div>

      {/* Quick Duty Status Bar */}
      <div className="grid grid-cols-2 gap-space-sm mt-space-md !pt-space-sm bg-surface-container-low !rounded-lg !p-space-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full !rounded-full bg-tertiary-fixed-dim opacity-75" />
            <span className="relative inline-flex !rounded-full h-2.5 w-2.5 bg-on-tertiary-container" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-label-sm text-on-surface-variant uppercase leading-tight font-medium">
              Trạng thái kíp
            </span>
            <span className="text-label-md font-label-md text-on-surface font-semibold">
              {profile.dutyStatusLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">timer</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-label-sm text-on-surface-variant uppercase leading-tight font-medium">
              Thời gian phiên
            </span>
            <span className="text-label-md font-code-tabular text-on-surface font-semibold">
              {profile.sessionDuration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadreIdentityCard;
