import React from "react";

const StatMetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
      {/* Stat 1: Agencies */}
      <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
        <div className="flex items-start justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Tổng cơ quan kích hoạt
          </span>
          <span className="material-symbols-outlined text-secondary text-[20px]">
            corporate_fare
          </span>
        </div>
        <div className="my-space-sm">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-xl text-3xl sm:text-headline-xl text-on-surface font-semibold tracking-tight">
              128
            </span>
            <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">
              đơn vị
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 mt-1 text-on-tertiary-container font-label-sm text-label-sm font-medium">
            <span className="w-1.5 h-1.5 bg-on-tertiary-container rounded-full" />
            <span>100% kết nối liên thông trục LGSP</span>
          </div>
        </div>
        <div className="pt-space-xs font-body-sm text-body-sm text-on-surface-variant flex justify-between bg-surface-container-low px-2 py-1">
          <span>34 Sở chuyên ngành</span>
          <span className="text-outline">/</span>
          <span>94 UBND Quận/Huyện</span>
        </div>
      </div>

      {/* Stat 2: Today Incoming Incidents */}
      <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-container" />
        <div className="flex items-start justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Sự cố tiếp nhận trong ngày
          </span>
          <span className="material-symbols-outlined text-primary-container text-[20px]">
            dynamic_feed
          </span>
        </div>
        <div className="my-space-sm">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-xl text-3xl sm:text-headline-xl text-on-surface font-semibold tracking-tight">
              1,420
            </span>
            <span className="font-label-lg text-label-lg text-on-surface-variant font-medium">
              vụ việc
            </span>
          </div>
          <div className="inline-flex items-center gap-1 mt-1 text-secondary font-label-sm text-label-sm font-medium">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+12.4% so với trung bình tuần</span>
          </div>
        </div>
        <div className="pt-space-xs font-body-sm text-body-sm text-on-surface-variant flex items-center justify-between bg-surface-container-low px-2 py-1">
          <span>Định tuyến không gian tự động</span>
          <span className="font-code-tabular text-code-tabular font-bold text-on-surface">
            98.2%
          </span>
        </div>
      </div>

      {/* Stat 3: SLA Breach Warning */}
      <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D97706]" />
        <div className="flex items-start justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Vi phạm cam kết SLA
          </span>
          <span className="material-symbols-outlined text-[#D97706] text-[20px]">
            timer_off
          </span>
        </div>
        <div className="my-space-sm">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-xl text-3xl sm:text-headline-xl text-on-surface font-semibold tracking-tight">
              2.1%
            </span>
            <span className="px-1.5 py-0.5 bg-[#FFFBEB] text-[#D97706] font-code-tabular text-[11px] font-bold">
              MỤC TIÊU ≤ 3.0%
            </span>
          </div>
          <div className="inline-flex items-center gap-1 mt-1 text-[#D97706] font-label-sm text-label-sm font-medium">
            <span className="material-symbols-outlined text-[14px]">warning</span>
            <span>30 vụ việc cận ngưỡng xử lý (&lt; 2h)</span>
          </div>
        </div>
        <div className="pt-space-xs font-body-sm text-body-sm text-on-surface-variant flex items-center justify-between bg-surface-container-low px-2 py-1">
          <span>Thời gian tiếp nhận trung bình</span>
          <span className="font-code-tabular text-code-tabular font-bold text-on-surface">
            11 phút
          </span>
        </div>
      </div>

      {/* Stat 4: Urgent Emergencies */}
      <div className="bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#DC2626]" />
        <div className="flex items-start justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Sự cố khẩn cấp (Urgent)
          </span>
          <span className="material-symbols-outlined text-[#DC2626] text-[20px]">
            crisis_alert
          </span>
        </div>
        <div className="my-space-sm">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-xl text-3xl sm:text-headline-xl text-[#DC2626] font-bold tracking-tight">
              14
            </span>
            <span className="font-label-lg text-label-lg text-error font-medium">
              vụ đang chờ
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]" />
            </span>
            <span className="px-1.5 py-0.5 bg-[#FEF2F2] text-[#DC2626] font-label-sm text-label-sm font-semibold tracking-wide">
              YÊU CẦU ĐIỀU ĐỘI NGAY
            </span>
          </div>
        </div>
        <div className="pt-space-xs font-body-sm text-body-sm text-on-surface-variant flex items-center justify-between bg-surface-container-low px-2 py-1">
          <span>Vụ việc cứu nạn / ngập sâu</span>
          <span className="font-code-tabular text-code-tabular font-bold text-error">
            09 / 14 vụ
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatMetricCards;
