import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

const ServiceGridSection: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-12 mb-6 sm:mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div>
          <div className="inline-block font-label-sm text-[11px] sm:text-label-sm uppercase font-bold text-[#0084A3] tracking-wider mb-2">
            Hạng mục phục vụ công ích
          </div>
          <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-headline-lg text-[#102A43] font-bold">
            Các Lĩnh vực Hạ tầng Đô thị Tiếp nhận Trực tuyến
          </h2>
        </div>
        <p className="font-body-md text-xs sm:text-body-md text-[#64748B] max-w-md leading-relaxed">
          Hệ thống phân luồng trực tiếp đến các sở ban ngành chuyên trách và
          doanh nghiệp công ích trên địa bàn tỉnh, thành phố.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Cột 1: Giao thông & Mặt đường */}
        <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg flex flex-col justify-between hover:border-[#0084A3] transition-colors shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-[6px] bg-[#E0F2FE] text-[#0084A3] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">traffic</span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold mb-1.5 sm:mb-2">
              Giao thông &amp; Mặt đường
            </h3>
            <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] leading-relaxed">
              Hố ga mất nắp, ổ gà, lún nứt vỉa hè, biển báo hư hại, đèn tín hiệu
              giao thông hỏng hoặc chớp tắt bất thường.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span>Đơn vị: Sở GTVT</span>
            <span className="text-[#0084A3] font-medium">SLA: 2-24h</span>
          </div>
        </div>

        {/* Cột 2: Thoát nước & Ngập úng */}
        <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg flex flex-col justify-between hover:border-[#0084A3] transition-colors shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-[6px] bg-[#E0F2FE] text-[#0084A3] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">flood</span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold mb-1.5 sm:mb-2">
              Thoát nước &amp; Ngập úng
            </h3>
            <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] leading-relaxed">
              Tắc cống ngầm, ngập sâu sau mưa, nắp chắn rác bị nghẹt, xói lở
              kênh mương thoát nước, rác thải tràn miệng thu.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span>Đơn vị: Cty Thoát nước</span>
            <span className="text-[#0084A3] font-medium">SLA: 1-4h</span>
          </div>
        </div>

        {/* Cột 3: Cây xanh & Đô thị */}
        <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg flex flex-col justify-between hover:border-[#0084A3] transition-colors shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-[6px] bg-[#E0F2FE] text-[#0084A3] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">park</span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold mb-1.5 sm:mb-2">
              Cây xanh &amp; Đô thị
            </h3>
            <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] leading-relaxed">
              Cây gãy đổ chắn đường sau bão, cành cây vướng vào hệ thống đường
              dây điện cao áp, nguy cơ bật gốc cây cổ thụ.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span>Đơn vị: Cty Cây xanh</span>
            <span className="text-[#0084A3] font-medium">SLA: 2-6h</span>
          </div>
        </div>

        {/* Cột 4: Chiếu sáng & Hạ tầng điện */}
        <div className="border border-slate-200 bg-white p-4 sm:p-6 rounded-lg flex flex-col justify-between hover:border-[#0084A3] transition-colors shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-[6px] bg-[#E0F2FE] text-[#0084A3] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                electrical_services
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold mb-1.5 sm:mb-2">
              Chiếu sáng &amp; Hạ tầng điện
            </h3>
            <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] leading-relaxed">
              Đứt cáp viễn thông chùng võng, cột điện rạn nứt nghiêng nguy hiểm,
              mất điện chiếu sáng công cộng diện rộng.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span>Đơn vị: Điện lực &amp; Chiếu sáng</span>
            <span className="text-[#0084A3] font-medium">SLA: 1-12h</span>
          </div>
        </div>
      </div>

      {/* Quick Link Banner for Citizens */}
      <div className="mt-8 sm:mt-12 bg-white border border-[#E2E8F0] rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E0F2FE] text-[#0084A3] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] sm:text-[28px]">
              support_agent
            </span>
          </div>
          <div>
            <h4 className="font-headline-sm text-sm sm:text-headline-sm text-[#102A43] font-bold">
              Cần gửi phản ánh sự cố khẩn cấp trực tiếp?
            </h4>
            <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] mt-0.5 leading-relaxed">
              Gọi ngay tổng đài trực ban điều phối tác chiến 1900 xxxx (Nhánh 1)
              hoặc mở ứng dụng GovReport trên điện thoại.
            </p>
          </div>
        </div>
        <Link
          to={ROUTES.DOWNLOAD}
          className="bg-[#102A43] text-white font-label-md text-xs sm:text-label-md font-semibold px-4 sm:px-5 py-2.5 rounded-[6px] hover:bg-[#0c1f32] transition-colors shrink-0 self-stretch sm:self-auto text-center"
        >
          Cài đặt App GovReport
        </Link>
      </div>
    </section>
  );
};

export default ServiceGridSection;
