import React from "react";

const WorkflowSection: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-12 border-b border-[#E2E8F0]" id="gis-architecture">
      <div className="max-w-3xl mb-6 sm:mb-8">
        <div className="inline-block font-label-sm text-[11px] sm:text-label-sm uppercase font-bold text-[#0084A3] tracking-wider mb-2">
          Luồng điều hành không gian số
        </div>
        <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-headline-lg text-[#102A43] font-bold">
          Quy trình Điều phối Tự động Hóa Không Gian
        </h2>
        <p className="font-body-lg text-xs sm:text-sm lg:text-body-lg text-[#64748B] mt-2 leading-relaxed">
          Khép kín từ hiện trường người dân đến lực lượng tác chiến cơ quan chuyên môn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Bước 01 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-6 rounded-lg relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 sm:pb-4 mb-3 sm:mb-4">
              <span className="font-code-tabular text-2xl sm:text-[28px] font-bold text-[#CBD5E1]">
                01
              </span>
              <span className="material-symbols-outlined text-[#0084A3] text-[24px] sm:text-[28px]">
                photo_camera
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold">
              Ghi nhận hiện trường 1 chạm
            </h3>
            <p className="font-body-md text-xs sm:text-body-md text-[#64748B] mt-2 sm:mt-3 leading-relaxed">
              Người dân chụp ảnh, hệ thống tự động ghim tọa độ GPS thực địa, hỗ trợ
              gửi phản ánh ẩn danh qua mã định danh thiết bị chống spam.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#16A34A]">
              check_circle
            </span>
            <span>Tự động trích xuất EXIF GPS</span>
          </div>
        </div>

        {/* Bước 02 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-6 rounded-lg relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 sm:pb-4 mb-3 sm:mb-4">
              <span className="font-code-tabular text-2xl sm:text-[28px] font-bold text-[#0084A3]">
                02
              </span>
              <span className="material-symbols-outlined text-[#0084A3] text-[24px] sm:text-[28px]">
                account_tree
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold">
              Quét ranh giới &amp; Định tuyến GIS
            </h3>
            <p className="font-body-md text-xs sm:text-body-md text-[#64748B] mt-2 sm:mt-3 leading-relaxed">
              Động cơ PostGIS đối soát vị trí với bản đồ địa giới đa giác
              (Polygon), lập tức chuyển giao việc tới đúng tài khoản cán bộ trực
              ban của địa bàn.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#0084A3]">
              verified
            </span>
            <span>ST_Contains(Polygon, Point) = TRUE</span>
          </div>
        </div>

        {/* Bước 03 */}
        <div className="bg-white border border-[#E2E8F0] p-4 sm:p-6 rounded-lg relative flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3 sm:pb-4 mb-3 sm:mb-4">
              <span className="font-code-tabular text-2xl sm:text-[28px] font-bold text-[#CBD5E1]">
                03
              </span>
              <span className="material-symbols-outlined text-[#0084A3] text-[24px] sm:text-[28px]">
                verified_user
              </span>
            </div>
            <h3 className="font-headline-sm text-base sm:text-headline-sm text-[#102A43] font-semibold">
              Nghiệm thu &amp; Giám sát SLA
            </h3>
            <p className="font-body-md text-xs sm:text-body-md text-[#64748B] mt-2 sm:mt-3 leading-relaxed">
              Cán bộ hiện trường nhận lệnh điều hướng, xử lý dứt điểm và cập nhật
              ảnh bằng chứng; hệ thống lưu vết toàn bộ lịch sử kiểm toán.
            </p>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#16A34A]">
              history_edu
            </span>
            <span>Lưu vết chuỗi khối Audit Trail</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
