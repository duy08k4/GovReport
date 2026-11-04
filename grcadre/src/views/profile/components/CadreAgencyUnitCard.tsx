import React from 'react';
import { CadreProfile } from '../types';

interface CadreAgencyUnitCardProps {
  profile: CadreProfile;
  onCallHotline?: () => void;
}

export const CadreAgencyUnitCard: React.FC<CadreAgencyUnitCardProps> = ({
  profile,
  onCallHotline,
}) => {
  return (
    <div className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-xs mb-space-md border border-outline-variant/15">
      {/* Header */}
      <div className="flex items-center justify-between !pb-space-xs mb-space-sm border-b border-outline-variant/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">
            account_balance
          </span>
          <span className="text-label-lg font-label-lg text-primary tracking-tight uppercase font-bold">
            Đơn vị &amp; Tổ chức tác chiến
          </span>
        </div>
        <span className="text-label-sm font-label-sm text-secondary bg-surface-container-high !px-2 !py-0.5 !rounded font-semibold">
          Đơn vị chính
        </span>
      </div>

      <div className="space-y-space-sm text-body-sm font-body-sm">
        {/* Cơ quan chủ quản */}
        <div className="!p-2.5 bg-surface !rounded-lg">
          <div className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">
            Cơ quan chủ quản trực thuộc
          </div>
          <div className="text-on-surface font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              location_city
            </span>
            <span>
              {profile.agencyUnit}, {profile.districtCity}
            </span>
          </div>
        </div>

        {/* Đội công tác & Chỉ huy kíp */}
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="!p-2.5 bg-surface !rounded-lg">
            <div className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">
              Đội công tác
            </div>
            <div className="text-on-surface font-semibold text-body-md truncate">
              {profile.teamName}
            </div>
            <div className="text-[11px] font-code-tabular text-on-surface-variant mt-0.5 font-medium">
              {profile.teamCode}
            </div>
          </div>

          <div className="!p-2.5 bg-surface !rounded-lg">
            <div className="text-label-sm font-label-sm text-on-surface-variant mb-0.5">
              Chỉ huy kíp trực
            </div>
            <div className="text-on-surface font-semibold text-body-md truncate">
              {profile.commanderName}
            </div>
            <div className="text-[11px] font-label-sm text-on-surface-variant mt-0.5">
              {profile.commanderRole}
            </div>
          </div>
        </div>

        {/* Hotline trực ban */}
        <div className="!p-2.5 bg-surface !rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 !rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div>
              <div className="text-label-sm font-label-sm text-on-surface-variant">
                Hotline trực ban sở chỉ huy
              </div>
              <div className="text-on-surface font-code-tabular font-semibold">
                {profile.hotlineFormatted}
              </div>
            </div>
          </div>

          <a
            className="h-8 !px-3 !rounded bg-primary text-on-primary text-label-sm font-label-sm flex items-center gap-1 hover:bg-[#1E3A5F] active:scale-95 transition-all cursor-pointer font-medium"
            href={`tel:${profile.hotlineTel}`}
            onClick={onCallHotline}
          >
            <span className="material-symbols-outlined text-[14px]">call</span>
            <span>Gọi kíp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CadreAgencyUnitCard;
