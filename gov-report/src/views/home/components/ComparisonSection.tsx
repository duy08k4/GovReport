import React from "react";

const ComparisonSection: React.FC = () => {
  return (
    <section className="w-full py-space-lg sm:py-space-xl">
      <div className="flex flex-col mb-space-md sm:mb-space-lg">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px]">
            compare_arrows
          </span>
          <span className="font-label-md text-[11px] sm:text-label-md uppercase tracking-wider text-secondary font-semibold">
            SO SÁNH PHƯƠNG THỨC
          </span>
        </div>
        <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-headline-lg text-primary-container font-bold mt-1">
          Chuyển Đổi Phương Thức Tác Chiến Hạ Tầng
        </h2>
        <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
          Bảng đối soát trực diện giữa mô hình tiếp nhận truyền thống và cơ chế
          phản ứng số theo hướng đối tượng không gian.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md sm:gap-space-lg">
        {/* Cột Trái: Hạn chế truyền thống */}
        <div className="bg-surface-container-low rounded-lg p-space-md sm:p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-space-sm sm:pb-space-md mb-space-sm sm:mb-space-md bg-surface-container-lowest p-space-xs sm:p-space-sm rounded-lg">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-error text-[18px] sm:text-[22px]">
                  history_toggle_off
                </span>
                <h3 className="font-headline-sm text-sm sm:text-headline-sm text-error font-semibold">
                  Hạn chế của mô hình truyền thống
                </h3>
              </div>
              <span className="font-label-sm text-[10px] sm:text-label-sm bg-error-container text-on-error-container px-2 py-0.5 rounded-lg uppercase">
                BẤT CẬP CŨ
              </span>
            </div>

            <div className="flex flex-col gap-space-sm sm:gap-space-md">
              {/* Item 1 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px]">close</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-on-surface font-semibold">
                    Phân định trách nhiệm mơ hồ
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Người dân bối rối không biết sự cố thuộc thẩm quyền phường nào
                    hay sở ban ngành nào dẫn tới gửi nhầm đơn vị, bức xúc kéo dài.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px]">close</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-on-surface font-semibold">
                    Xử lý trung gian lòng vòng
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Cuộc gọi đường dây nóng và văn bản phản ánh dễ bị chậm trễ, thất
                    lạc hoặc đùn đẩy văn bản qua nhiều phòng ban hành chính.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px]">close</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-on-surface font-semibold">
                    Sai lệch tọa độ &amp; thiếu ảnh kiểm chứng
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Mô tả định tính như &quot;gần cột điện trước số nhà...&quot;,
                    thiếu tọa độ GPS chính xác và ảnh chụp kiểm chứng hiện trường thực
                    tế gây khó khăn cho đội cơ động.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px]">close</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-on-surface font-semibold">
                    Không thể đo lường SLA công vụ
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Khó kiểm soát định lượng thời gian cán bộ xử lý thực tế và thiếu
                    căn cứ đánh giá hiệu quả, tính minh bạch thi đua khen thưởng cuối
                    kỳ.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-md sm:mt-space-lg pt-space-xs sm:pt-space-sm bg-surface-container-lowest p-space-xs sm:p-space-sm rounded-lg flex items-center gap-2 text-on-surface-variant font-label-sm text-[11px] sm:text-label-sm">
            <span className="material-symbols-outlined text-error text-[16px] sm:text-[18px]">
              warning
            </span>
            <span>Thời gian phản hồi bình quân: 7 - 14 ngày làm việc</span>
          </div>
        </div>

        {/* Cột Phải: Giải pháp đột phá GovReport */}
        <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-space-sm sm:pb-space-md mb-space-sm sm:mb-space-md bg-surface-container-high/40 p-space-xs sm:p-space-sm rounded-lg">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[22px]">
                  verified
                </span>
                <h3 className="font-headline-sm text-sm sm:text-headline-sm text-primary-container font-semibold">
                  Giải pháp đột phá của GovReport
                </h3>
              </div>
              <span className="font-label-sm text-[10px] sm:text-label-sm bg-secondary text-on-secondary px-2 py-0.5 rounded-lg uppercase">
                CÔNG NGHỆ SỐ
              </span>
            </div>

            <div className="flex flex-col gap-space-sm sm:gap-space-md">
              {/* Item 1 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px] font-bold">
                    check
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-primary-container font-semibold">
                    Định tuyến không gian tự động 0.05 giây
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Định tuyến không gian tự động theo tọa độ thực địa đối soát đa giác
                    PostGIS trong vài mili-giây, người dân không cần biết cơ quan nào
                    phụ trách.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px] font-bold">
                    check
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-primary-container font-semibold">
                    Mô hình Đa cơ quan (Multi-tenant) liên thông
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Mô hình Đa cơ quan phân bổ dữ liệu chuẩn xác đến từng đơn vị phụ
                    trách (Điện lực, Cây xanh, Thoát nước, UBND Phường) trên cùng một
                    nền tảng thống nhất.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px] font-bold">
                    check
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-primary-container font-semibold">
                    Giám sát chỉ tiêu SLA nghiêm ngặt
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Giám sát chặt chẽ chỉ tiêu cam kết dịch vụ (SLA) tiếp nhận trong
                    2h và xử lý dứt điểm; tự động báo động đỏ khi có nguy cơ quá hạn.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-space-xs sm:gap-space-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] sm:text-[16px] font-bold">
                    check
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-xs sm:text-sm lg:text-label-lg text-primary-container font-semibold">
                    Lưu vết kiểm toán số (Audit Logs) bất biến
                  </span>
                  <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    Lưu vết kiểm toán số toàn diện từ lúc phát sinh tin báo đến ảnh
                    chụp nghiệm thu trước/sau kèm định danh cán bộ hiện trường.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-space-md sm:mt-space-lg pt-space-xs sm:pt-space-sm bg-surface-container-high/30 p-space-xs sm:p-space-sm rounded-lg flex items-center gap-2 text-secondary font-label-sm text-[11px] sm:text-label-sm font-semibold">
            <span className="material-symbols-outlined text-secondary text-[16px] sm:text-[18px]">
              bolt
            </span>
            <span>
              Thời gian tiếp nhận điều phối: Ngay tức thì (&lt; 2 giờ tiếp nhận hiện trường)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
