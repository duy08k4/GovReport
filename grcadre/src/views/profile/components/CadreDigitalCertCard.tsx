import React from 'react';
import { CadreProfile } from '../types';

interface CadreDigitalCertCardProps {
  profile: CadreProfile;
  onVerifyClick?: () => void;
}

export const CadreDigitalCertCard: React.FC<CadreDigitalCertCardProps> = ({
  profile,
  onVerifyClick,
}) => {
  return (
    <div className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-xs mb-space-md border border-outline-variant/15">
      {/* Header */}
      <div className="flex items-center gap-2 !pb-space-xs mb-space-sm border-b border-outline-variant/10">
        <span className="material-symbols-outlined text-[20px] text-primary">
          encrypted
        </span>
        <span className="text-label-lg font-label-lg text-primary tracking-tight uppercase font-bold">
          Pháp lý số &amp; Chứng thư điều hành
        </span>
      </div>

      {/* Digital Certificate Token Card */}
      <div
        className="!p-space-sm bg-surface-container-low !rounded-lg mb-space-sm cursor-pointer hover:bg-surface-container transition-colors"
        onClick={onVerifyClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 !rounded bg-tertiary-fixed-dim text-on-tertiary-container flex items-center justify-center mt-0.5 flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">key</span>
            </div>
            <div>
              <div className="text-label-md font-label-md text-on-surface font-bold">
                {profile.certTitle}
              </div>
              <div className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                {profile.certIssuer}
              </div>
            </div>
          </div>
          <span className="text-label-sm font-label-sm text-on-tertiary-container bg-surface-container-lowest !px-1.5 !py-0.5 !rounded font-semibold shadow-2xs">
            {profile.certStatus}
          </span>
        </div>

        <div className="mt-2.5 !pt-2 flex items-center justify-between text-code-tabular text-[12px] text-on-surface-variant border-t border-outline-variant/20">
          <span>Hiệu lực khóa: {profile.certExpiry}</span>
          <span className="flex items-center gap-1 text-secondary font-semibold">
            <span className="material-symbols-outlined text-[14px]">task_alt</span>
            <span>{profile.certTokenType}</span>
          </span>
        </div>
      </div>

      {/* Citizen / Cadre Electronic ID */}
      <div className="!p-space-sm bg-surface !rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 !rounded bg-primary-container text-surface-container-lowest flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[16px]">badge</span>
          </div>
          <div>
            <div className="text-label-md font-label-md text-on-surface font-semibold">
              Định danh điện tử (VNeID)
            </div>
            <div className="text-code-tabular text-[12px] text-on-surface-variant font-medium">
              {profile.vneidNumber} • {profile.vneidLevel}
            </div>
          </div>
        </div>
        <div className="w-2.5 h-2.5 !rounded-full bg-secondary ring-2 ring-secondary/20" />
      </div>
    </div>
  );
};

export default CadreDigitalCertCard;
