import React from "react";

const SlaKpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-lg">
      {/* Thẻ 1: Khẩn cấp */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Tiếp nhận khẩn cấp
            </span>
            <div className="font-headline-lg text-2xl sm:text-headline-lg text-error font-bold mt-1 tracking-tight">
              Tối đa 2 giờ
            </div>
          </div>
          <div className="w-10 h-10 rounded bg-error-container/40 flex items-center justify-center text-error shrink-0">
            <span className="material-symbols-outlined text-[22px]">alarm</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/20">
          <span>Áp dụng đối với sự cố nguy hại cao</span>
          <span className="font-code-tabular text-code-tabular font-bold text-error">
            99.2% Đạt
          </span>
        </div>
      </div>

      {/* Thẻ 2: Xử lý hiện trường */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Chuẩn xử lý hiện trường
            </span>
            <div className="font-headline-lg text-2xl sm:text-headline-lg text-primary font-bold mt-1 tracking-tight">
              24h - 72h
            </div>
          </div>
          <div className="w-10 h-10 rounded bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[22px]">engineering</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/20">
          <span>Phân hóa theo 4 cấp độ kỹ thuật</span>
          <span className="font-code-tabular text-code-tabular font-bold text-on-surface">
            Trung bình: 31.4h
          </span>
        </div>
      </div>

      {/* Thẻ 3: Tỷ lệ tuân thủ */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/30">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Tuân thủ toàn hệ thống
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface font-bold tracking-tight">
                97.9%
              </span>
              <span className="inline-flex items-center text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[14px]">
                  arrow_upward
                </span>
                +0.6%
              </span>
            </div>
          </div>
          {/* Mini SVG Donut Chart */}
          <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-surface-container-highest"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="97.9, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="material-symbols-outlined text-[16px] text-secondary absolute">
              verified
            </span>
          </div>
        </div>
        <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant border-t border-outline-variant/20">
          <span>Tháng hiện tại (18.420 sự cố)</span>
          <span className="font-code-tabular text-code-tabular font-bold text-on-tertiary-container">
            Vượt ngưỡng
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlaKpiCards;
