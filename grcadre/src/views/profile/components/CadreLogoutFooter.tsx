import React from 'react';
import { APP_CONFIG } from '../../../config/static/AppConfig';

interface CadreLogoutFooterProps {
  appVersion?: string;
  channelInfo?: string;
  onLogout: () => void;
}

export const CadreLogoutFooter: React.FC<CadreLogoutFooterProps> = ({
  appVersion = APP_CONFIG.VERSION,
  channelInfo = APP_CONFIG.ENCRYPTION_CHANNEL,
  onLogout,
}) => {
  return (
    <div className="flex flex-col items-center gap-space-md mb-2 mt-2">
      {/* Logout button: Flat 1px red outline style matching TaskCode.md */}
      <button
        type="button"
        onClick={onLogout}
        style={{ outline: '1px solid currentColor' }}
        className="w-full !py-3 !px-4 !rounded-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error active:scale-[0.99] text-label-md font-label-md uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer font-bold shadow-xs"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        <span>Đăng xuất phiên làm việc an toàn</span>
      </button>

      {/* App version and operational build details */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <div className="flex items-center gap-1.5 text-code-tabular text-[11px] text-on-surface-variant">
          <span className="w-1.5 h-1.5 !rounded-full bg-secondary ring-2 ring-secondary/20" />
          <span className="font-semibold text-on-surface">{appVersion}</span>
        </div>
        <span className="text-[10px] font-code-tabular text-outline">
          {channelInfo}
        </span>
      </div>
    </div>
  );
};

export default CadreLogoutFooter;
