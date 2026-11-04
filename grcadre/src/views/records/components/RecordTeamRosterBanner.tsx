import React from 'react';
import { APP_CONFIG } from '../../../config/static/AppConfig';

interface RecordTeamRosterBannerProps {
  shiftTitle?: string;
  readinessText?: string;
}

export const RecordTeamRosterBanner: React.FC<RecordTeamRosterBannerProps> = ({
  shiftTitle = `Ca trực ${APP_CONFIG.TEAM_SHORT} (Sáng)`,
  readinessText = '3/3 Cán bộ sẵn sàng cơ động',
}) => {
  return (
    <div className="!px-margin !pb-space-sm">
      <div className="bg-surface-container-low rounded-xl !p-3 flex items-center justify-between border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">groups</span>
          </div>
          <div>
            <div className="font-label-md text-label-md text-primary font-semibold">
              {shiftTitle}
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              {readinessText}
            </div>
          </div>
        </div>

        <span className="!px-2 !py-0.5 rounded text-[11px] font-label-sm bg-on-tertiary-container/10 text-on-tertiary-container font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse" />
          <span>Trực tuyến</span>
        </span>
      </div>
    </div>
  );
};

export default RecordTeamRosterBanner;
