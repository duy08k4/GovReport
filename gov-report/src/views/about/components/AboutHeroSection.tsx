import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";
import SpatialIncidentMap, { DEFAULT_INCIDENTS, IncidentData } from "./SpatialIncidentMap";

const AboutHeroSection: React.FC = () => {
  const [ticketInput, setTicketInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchedCode, setSearchedCode] = useState("SC-2026-HN01");
  const [incidents] = useState<IncidentData[]>(DEFAULT_INCIDENTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = ticketInput.trim();
    if (query) {
      setSearchedCode(query.toUpperCase());
      setShowResult(true);
    } else {
      setSearchedCode("SC-2026-HN01");
      setShowResult(true);
    }
  };

  return (
    <section className="w-full py-6 sm:py-8 md:py-12 border-b border-[#E2E8F0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Column: Heading, Content & Ticket Search */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Badge định danh cấp cao */}
          <div className="inline-flex items-center gap-1.5 bg-[#E0F2FE] border border-[#BAE6FD] text-[#0084A3] px-2.5 sm:px-3 py-1 rounded-[4px] font-label-sm text-[11px] sm:text-label-sm font-bold tracking-wider mb-4 sm:mb-5">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">map</span>
            <span>NỀN TẢNG TIẾP NHẬN TẬP TRUNG ĐA CƠ QUAN BẰNG GIS</span>
          </div>

          {/* H1 Chính thức */}
          <h1 className="font-headline-xl text-2xl sm:text-3xl md:text-[38px] lg:text-[44px] md:leading-[46px] lg:leading-[52px] text-[#102A43] font-bold tracking-tight">
            Tiếp nhận và Điều phối Xử lý Sự cố Đô thị Tức thì
          </h1>

          {/* Sub-headline */}
          <p className="font-body-lg text-sm sm:text-base lg:text-body-lg text-[#64748B] max-w-3xl mt-3 sm:mt-4 leading-relaxed">
            Mọi phản ánh về ngập úng, hố ga mất nắp, cây ngã đổ hay sự cố lưới điện
            được tự động định tuyến không gian đến đúng đơn vị hành chính và lực
            lượng hiện trường phụ trách, giám sát công khai theo chuẩn cam kết xử
            lý (SLA).
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 sm:mt-6 w-full sm:w-auto">
            <Link
              to={ROUTES.DOWNLOAD}
              className="bg-[#102A43] text-white font-label-lg text-xs sm:text-label-lg font-semibold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-[6px] hover:bg-[#0c1f32] transition-colors inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">download</span>
              <span>Tải ứng dụng di động</span>
            </Link>
            <a
              href="#gis-architecture"
              className="bg-white text-[#102A43] border border-[#CBD5E1] font-label-lg text-xs sm:text-label-lg font-semibold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-[6px] hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2 flex-1 sm:flex-initial"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">layers</span>
              <span>Tìm hiểu kiến trúc GIS</span>
            </a>
          </div>

          {/* Khối Tra Cứu Nhanh Vé Sự Cố (Public Ticket Search) */}
          <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-lg mt-6 sm:mt-8 shadow-sm">
            <label
              className="block font-label-md text-xs sm:text-label-md text-[#1E293B] font-semibold mb-2 flex items-center gap-1.5"
              htmlFor="ticket-input"
            >
              <span className="material-symbols-outlined text-[#0084A3] text-[18px]">travel_explore</span>
              <span>Tra cứu tiến độ giải quyết sự cố công khai:</span>
            </label>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[18px] sm:text-[20px]">
                  pin
                </span>
                <input
                  id="ticket-input"
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="Nhập mã hồ sơ (Ví dụ: SC-2026-HN01)"
                  className="w-full h-[40px] sm:h-[42px] pl-9 sm:pl-10 pr-3 bg-white border border-[#CBD5E1] rounded-[6px] text-xs sm:text-body-md font-body-md text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#0084A3]"
                />
              </div>
              <button
                type="submit"
                className="h-[40px] sm:h-[42px] bg-[#0084A3] hover:bg-[#006e88] text-white font-label-md text-xs sm:text-label-md font-semibold px-4 sm:px-6 rounded-[6px] transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px] sm:text-[18px]">search</span>
                <span>Tra cứu tiến độ ngay</span>
              </button>
            </form>

            <div className="mt-2.5 flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
              <span>Không yêu cầu tài khoản công dân</span>
              <span className="text-[#0084A3] font-medium">Bảo mật định danh 100%</span>
            </div>

            {/* Dynamic Results Output Box */}
            {showResult && (
              <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container-low p-3 rounded-[4px] border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="font-code-tabular text-xs sm:text-code-tabular font-bold text-[#102A43]">
                      {searchedCode}
                    </span>
                    <span className="bg-[#FFFBEB] text-[#D97706] border border-[#FCD34D] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                      ĐANG XỬ LÝ
                    </span>
                  </div>
                  <span className="font-label-sm text-xs sm:text-label-sm text-on-surface-variant">
                    SLA còn: 45 phút
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Hero Visual - Mockup Không gian GIS Tác chiến */}
        <div className="lg:col-span-5 w-full mt-6 lg:mt-0">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5 sm:pb-3 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#16A34A] inline-block animate-pulse"></span>
                <span className="font-label-md text-xs sm:text-label-md font-bold text-[#102A43]">
                  BẢN ĐỒ TÁC CHIẾN THỜI GIAN THỰC
                </span>
              </div>
              <span className="font-code-tabular text-[10px] sm:text-code-tabular text-[#64748B]">
                EPSG: 3857 | PostGIS
              </span>
            </div>

            {/* Interactive Leaflet Spatial Incident Map */}
            <SpatialIncidentMap incidents={incidents} />

            <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
              <span>Tiếp nhận tự động 24/7 từ Cổng DVC &amp; App</span>
              <span className="font-code-tabular text-[#0084A3] font-semibold">Ping: 12ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
