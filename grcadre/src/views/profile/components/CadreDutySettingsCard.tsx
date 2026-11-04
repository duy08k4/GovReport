import React from 'react';

interface CadreDutySettingsCardProps {
  alertOutsideDuty: boolean;
  sirenVolume: number;
  onToggleAlertOutside: () => void;
  onSirenVolumeChange: (vol: number) => void;
  onOpenHandover: () => void;
  onOpenShiftSwap: () => void;
  onOpenChangePassword: () => void;
}

export const CadreDutySettingsCard: React.FC<CadreDutySettingsCardProps> = ({
  alertOutsideDuty,
  sirenVolume,
  onToggleAlertOutside,
  onSirenVolumeChange,
  onOpenHandover,
  onOpenShiftSwap,
  onOpenChangePassword,
}) => {
  return (
    <div className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-xs mb-space-md border border-outline-variant/15">
      {/* Header */}
      <div className="flex items-center gap-2 !pb-space-xs mb-space-sm border-b border-outline-variant/10">
        <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
        <span className="text-label-lg font-label-lg text-primary tracking-tight uppercase font-bold">
          Tùy biến ca trực &amp; Vận hành
        </span>
      </div>

      <div className="space-y-space-md">
        {/* Toggle: Alert outside duty hours */}
        <div className="flex items-center justify-between">
          <div className="!pr-3">
            <label
              className="text-body-md font-body-md text-on-surface font-semibold block cursor-pointer"
              onClick={onToggleAlertOutside}
            >
              Thông báo sự cố ngoài giờ
            </label>
            <span className="text-body-sm font-body-sm text-on-surface-variant block mt-0.5">
              Nhận tín hiệu khẩn cấp điều động dự bị khi không trong ca trực
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={alertOutsideDuty}
            onClick={onToggleAlertOutside}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer !rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              alertOutsideDuty ? 'bg-secondary' : 'bg-outline-variant'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform !rounded-full bg-surface-container-lowest shadow-xs ring-0 transition duration-200 ease-in-out mt-0.5 ${
                alertOutsideDuty ? 'translate-x-5 ml-0.5' : 'translate-x-0.5 ml-0.5'
              }`}
            />
          </button>
        </div>

        {/* Emergency Siren Settings */}
        <div className="!p-2.5 bg-surface !rounded-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-label-md font-label-md text-on-surface flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[16px] text-error">campaign</span>
              <span>Âm lượng còi hú Khẩn cấp (Urgent)</span>
            </span>
            <span className="text-code-tabular text-label-sm font-bold text-error">
              {sirenVolume}%
            </span>
          </div>
          <p className="text-[12px] font-body-sm text-on-surface-variant mb-2">
            Bỏ qua chế độ Không làm phiền (DND) khi có sự cố thảm họa hoặc ANTT nguy cấp
          </p>
          <input
            type="range"
            min="50"
            max="100"
            value={sirenVolume}
            onChange={(e) => onSirenVolumeChange(Number(e.target.value))}
            className="w-full h-2 bg-surface-container-highest !rounded-lg appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-code-tabular mt-1">
            <span>50% (Tiêu chuẩn)</span>
            <span>100% (Còi hú cực đại)</span>
          </div>
        </div>

        {/* Action items */}
        <div className="space-y-space-xs !pt-space-xs">
          <button
            type="button"
            onClick={onOpenHandover}
            className="w-full !py-2.5 !px-3 !rounded-lg bg-surface hover:bg-surface-container active:scale-[0.99] text-left flex items-center justify-between text-body-md font-body-md text-on-surface transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                published_with_changes
              </span>
              <span className="font-medium">Bàn giao ca trực &amp; Biên bản số</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              chevron_right
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenShiftSwap}
            className="w-full !py-2.5 !px-3 !rounded-lg bg-surface hover:bg-surface-container active:scale-[0.99] text-left flex items-center justify-between text-body-md font-body-md text-on-surface transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                event_busy
              </span>
              <span className="font-medium">Đăng ký báo nghỉ phép / Đổi ca trực</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              chevron_right
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenChangePassword}
            className="w-full !py-2.5 !px-3 !rounded-lg bg-surface hover:bg-surface-container active:scale-[0.99] text-left flex items-center justify-between text-body-md font-body-md text-on-surface transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                lock_reset
              </span>
              <span className="font-medium">Đổi mật khẩu tài khoản công vụ</span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadreDutySettingsCard;
