import React from "react";

const MdmSupportBanner: React.FC = () => {
  return (
    <section className="w-full mt-6 sm:mt-space-lg mb-8 sm:mb-space-xl bg-surface-container p-4 sm:p-space-md border border-outline-variant rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-space-sm shadow-sm">
      <div className="flex items-start sm:items-center gap-2.5 sm:gap-space-xs">
        <span className="material-symbols-outlined text-secondary text-[22px] sm:text-[26px] shrink-0 mt-0.5 sm:mt-0">
          contact_support
        </span>
        <div>
          <p className="font-headline-sm text-sm sm:text-headline-sm text-primary font-bold">
            Cần hỗ trợ cài đặt trên thiết bị đặc chủng?
          </p>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant leading-relaxed">
            Tổ hỗ trợ kỹ thuật Trung tâm Dữ liệu Đô thị sẵn sàng cấu hình cấu trúc
            MDM hoặc cấp chứng chỉ nội bộ cho cơ quan.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-space-sm shrink-0 w-full md:w-auto">
        <a
          className="bg-surface-container-lowest border border-outline-variant hover:border-secondary text-primary font-semibold py-2 px-3.5 sm:px-4 rounded text-xs sm:text-body-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          href="tel:1900xxxx"
        >
          <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">
            phone_in_talk
          </span>
          <span>Tổng đài: 1900 xxxx (Nhánh 2)</span>
        </a>

        <a
          className="bg-primary-container hover:bg-primary text-white font-semibold py-2 px-3.5 sm:px-4 rounded text-xs sm:text-body-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          href="mailto:hotro@govreport.gov.vn"
        >
          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
            mail
          </span>
          <span>Yêu cầu MDM Package</span>
        </a>
      </div>
    </section>
  );
};

export default MdmSupportBanner;
