import React from "react";

const MetricCountersSection: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-10 border-b border-[#E2E8F0]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Thẻ 1 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-lg flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-[#0084A3] mb-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">polyline</span>
              <span className="font-code-tabular text-[11px] sm:text-label-sm font-semibold uppercase text-[#64748B]">
                GIS Engine
              </span>
            </div>
            <div className="font-headline-xl text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#102A43] tracking-tight">
              100%
            </div>
            <div className="font-headline-sm text-sm sm:text-headline-sm text-[#102A43] mt-1 font-semibold">
              Định tuyến tự động qua GIS
            </div>
          </div>
          <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] mt-3 pt-3 border-t border-[#F1F5F9] leading-relaxed">
            Không cần lọc thủ công, đối soát tọa độ ST_Contains tức thì.
          </p>
        </div>

        {/* Thẻ 2 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-lg flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-[#DC2626] mb-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">timer</span>
              <span className="font-code-tabular text-[11px] sm:text-label-sm font-semibold uppercase text-[#64748B]">
                SLA Cam kết
              </span>
            </div>
            <div className="font-headline-xl text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#102A43] tracking-tight">
              2 Giờ
            </div>
            <div className="font-headline-sm text-sm sm:text-headline-sm text-[#102A43] mt-1 font-semibold">
              Cam kết tiếp nhận tin khẩn cấp
            </div>
          </div>
          <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] mt-3 pt-3 border-t border-[#F1F5F9] leading-relaxed">
            SLA tiếp nhận tối đa toàn hệ thống đối với cảnh báo nguy hiểm.
          </p>
        </div>

        {/* Thẻ 3 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-lg flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-[#0084A3] mb-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">lan</span>
              <span className="font-code-tabular text-[11px] sm:text-label-sm font-semibold uppercase text-[#64748B]">
                Multi-tenant
              </span>
            </div>
            <div className="font-headline-xl text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#102A43] tracking-tight">
              Đa cơ quan
            </div>
            <div className="font-headline-sm text-sm sm:text-headline-sm text-[#102A43] mt-1 font-semibold">
              Đồng bộ liên thông
            </div>
          </div>
          <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] mt-3 pt-3 border-t border-[#F1F5F9] leading-relaxed">
            Từ UBND Xã/Phường đến các Sở Xây dựng, GTVT, Thoát nước.
          </p>
        </div>

        {/* Thẻ 4 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-5 rounded-lg flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between text-[#16A34A] mb-2">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">fact_check</span>
              <span className="font-code-tabular text-[11px] sm:text-label-sm font-semibold uppercase text-[#64748B]">
                Kiểm toán số
              </span>
            </div>
            <div className="font-headline-xl text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#102A43] tracking-tight">
              100%
            </div>
            <div className="font-headline-sm text-sm sm:text-headline-sm text-[#102A43] mt-1 font-semibold">
              Minh bạch bằng chứng
            </div>
          </div>
          <p className="font-body-sm text-xs sm:text-body-sm text-[#64748B] mt-3 pt-3 border-t border-[#F1F5F9] leading-relaxed">
            Mọi sự cố có ảnh nghiệm thu trước và sau xử lý công khai.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MetricCountersSection;
