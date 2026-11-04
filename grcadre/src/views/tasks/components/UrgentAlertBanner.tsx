import React from 'react';
import { UrgentAlert } from '../types';

interface UrgentAlertBannerProps {
  alert: UrgentAlert;
  onAccept: (id: string) => void;
}

export const UrgentAlertBanner: React.FC<UrgentAlertBannerProps> = ({
  alert,
  onAccept,
}) => {
  if (alert.isAccepted) {
    return (
      <section className="bg-surface-container-lowest border border-[#16A34A]/40 !p-3.5 !rounded-xl shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 !rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-label-sm font-label-sm font-bold text-[#16A34A] uppercase">
              Đã tiếp nhận sự cố khẩn cấp
            </span>
            <span className="text-body-sm font-body-sm text-primary font-medium truncate">
              {alert.title}
            </span>
          </div>
        </div>
        <span className="text-label-sm font-code-tabular text-[#16A34A] font-bold !px-2 !py-0.5 !rounded bg-[#F0FDF4]">
          Đội đã nhận lệnh • Đang xử lý
        </span>
      </section>
    );
  }

  return (
    <section className="bg-error-container text-on-error-container !p-3.5 !rounded shadow-sm flex flex-col gap-2.5 relative overflow-hidden">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 !rounded-full bg-[#DC2626] text-white flex items-center justify-center flex-shrink-0 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">campaign</span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="!px-1.5 !py-0.5 !rounded text-[10px] font-label-sm font-bold bg-[#DC2626] text-white uppercase tracking-wider">
              {alert.level}
            </span>
            <span className="!px-1.5 !py-0.5 !rounded text-[10px] font-label-sm font-bold bg-primary text-on-primary uppercase tracking-wider">
              Được giao
            </span>
            <span className="text-label-sm font-label-sm font-code-tabular text-on-error-container font-semibold">
              {alert.distance}
            </span>
          </div>
          <h3 className="text-headline-sm font-headline-sm text-on-error-container font-bold leading-tight mt-1">
            {alert.title}
          </h3>
          <p className="text-body-sm font-body-sm text-on-error-container/90 mt-0.5">
            {alert.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between !pt-2">
        <div className="flex items-center gap-1 text-[11px] font-code-tabular text-on-error-container font-medium">
          <span className="material-symbols-outlined text-[14px]">timer</span>
          <span>{alert.slaRemaining}</span>
        </div>
        <button
          type="button"
          onClick={() => onAccept(alert.id)}
          className="!px-4 !py-2 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-95 text-white text-label-md font-label-lg !rounded flex items-center gap-1.5 shadow-sm transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
          <span>Nhận việc</span>
        </button>
      </div>
    </section>
  );
};

export default UrgentAlertBanner;
