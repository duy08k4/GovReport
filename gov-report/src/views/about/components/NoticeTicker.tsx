import React from "react";

const NoticeTicker: React.FC = () => {
  return (
    <section className="w-full pt-4 pb-2">
      <div className="w-full bg-[#FEF3C7] border border-[#FCD34D] rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 shadow-none">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
          <span className="inline-flex items-center justify-center p-1.5 rounded bg-[#FDE68A] text-[#92400E] shrink-0 mt-0.5 sm:mt-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">campaign</span>
          </span>
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <span className="bg-[#DC2626] text-white font-label-sm text-[10px] sm:text-label-sm px-2 py-0.5 rounded-[4px] uppercase tracking-wide font-bold shrink-0">
              TIN KHẨN CẤP
            </span>
            <p className="font-body-md text-xs sm:text-body-md text-[#78350F] font-medium leading-relaxed">
              Cảnh báo triều cường gây ngập cục bộ tại một số tuyến đường trũng thấp từ 16h30 đến 19h00.
              Người dân vui lòng sử dụng tính năng &quot;Báo cáo nhanh&quot; nếu phát hiện nắp cống bị trôi.
            </p>
          </div>
        </div>
        <a
          className="inline-flex items-center gap-1 text-[#92400E] hover:text-[#78350F] font-label-md text-xs sm:text-label-md font-semibold underline underline-offset-4 shrink-0 self-end md:self-auto"
          href="#quick-report"
        >
          <span>Báo cáo ngay</span>
          <span className="material-symbols-outlined text-[15px] sm:text-[16px]">arrow_forward</span>
        </a>
      </div>
    </section>
  );
};

export default NoticeTicker;
