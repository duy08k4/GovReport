import React from 'react';

interface ShiftBannerProps {
  cadreName?: string;
  cadreUnit?: string;
  isWorking: boolean;
  onToggleShift: () => void;
  gpsAccuracy?: string;
}

export const ShiftBanner: React.FC<ShiftBannerProps> = ({
  cadreName = 'Đ/c Nguyễn Văn Bình',
  cadreUnit = 'UBND Phường Hàng Trống • Đội Phản ứng nhanh số 1',
  isWorking,
  onToggleShift,
  gpsAccuracy = 'Khớp tâm 4m',
}) => {
  return (
    <section className="bg-surface-container-lowest !px-margin !py-space-md shadow-sm">
      <div className="flex items-center justify-between gap-space-sm">
        {/* Cadre Avatar & Identity */}
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 !rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[24px]">badge</span>
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 !rounded-full shadow-sm transition-colors ${
                isWorking ? 'bg-[#16A34A]' : 'bg-outline'
              }`}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-headline-sm font-headline-sm text-primary truncate font-bold">
                {cadreName}
              </h2>
              <span className="material-symbols-outlined text-secondary text-[18px]">
                verified
              </span>
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant truncate">
              {cadreUnit}
            </p>
          </div>
        </div>

        {/* Toggle trạng thái trực ca */}
        <button
          type="button"
          aria-label="Đổi trạng thái ca trực"
          onClick={onToggleShift}
          id="toggle-shift"
          className="flex-shrink-0 flex items-center gap-1.5 !px-2.5 !py-1.5 !rounded-full bg-surface-container transition-all active:scale-95 cursor-pointer"
        >
          <span
            className={`w-2.5 h-2.5 !rounded-full ${
              isWorking ? 'bg-[#16A34A] animate-pulse' : 'bg-outline'
            }`}
          />
          <span
            className={`text-label-sm font-label-sm font-bold ${
              isWorking ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            {isWorking ? 'Trực ca' : 'Nghỉ ca'}
          </span>
        </button>
      </div>

      {/* Thông điệp trạng thái vận hành ngoài trời */}
      <div className="!mt-space-sm !pt-2 bg-surface-container-low !px-3 !py-2 !rounded flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`material-symbols-outlined text-[18px] transition-colors ${
              isWorking ? 'text-[#16A34A]' : 'text-outline'
            }`}
          >
            {isWorking ? 'radio_button_checked' : 'radio_button_unchecked'}
          </span>
          <span
            className={`text-label-sm font-label-sm font-medium ${
              isWorking ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            {isWorking
              ? 'Đang trực ca [Sẵn sàng nhận việc]'
              : 'Đang nghỉ ca [Tạm ngừng nhận việc]'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant text-code-tabular font-code-tabular">
          <span className="material-symbols-outlined text-[14px]">my_location</span>
          <span>GPS: {gpsAccuracy}</span>
        </div>
      </div>
    </section>
  );
};

export default ShiftBanner;
