import React from "react";

const SecuritySection: React.FC = () => {
  return (
    <section className="w-full py-space-lg sm:py-space-xl mb-space-lg sm:mb-space-xl">
      <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-xl shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-space-sm sm:pb-space-lg gap-space-sm sm:gap-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs bg-surface-container-high/40 text-primary-container px-2.5 sm:px-3 py-1 rounded-lg mb-2">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-secondary">
                shield
              </span>
              <span className="font-label-sm text-[11px] sm:text-label-sm uppercase tracking-wider font-semibold">
                MÔ HÌNH BẢO MẬT &amp; PHÁP LÝ CÔNG VỤ
              </span>
            </div>
            <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-headline-lg text-primary-container font-bold">
              Kiểm Soát Truy Cập &amp; Bảo Mật Cấp Độ 3
            </h2>
            <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant mt-1 leading-relaxed">
              Đáp ứng nghiêm ngặt các quy chuẩn kỹ thuật an toàn thông tin theo
              Nghị định số 85/2016/NĐ-CP của Chính phủ.
            </p>
          </div>

          {/* Compliance Seal */}
          <div className="flex items-center gap-space-xs sm:gap-space-sm bg-surface-container-low px-space-sm sm:px-space-md py-space-xs sm:py-space-sm rounded-lg shrink-0 mt-2 lg:mt-0">
            <span className="material-symbols-outlined text-secondary text-[26px] sm:text-[32px]">
              gavel
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-xs sm:text-label-md font-bold text-primary-container">
                NGHỊ ĐỊNH 85/CP
              </span>
              <span className="font-code-tabular text-[10px] sm:text-body-sm text-on-surface-variant">
                Hồ sơ bảo đảm an toàn HTTT
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md sm:gap-space-lg pt-space-sm sm:pt-space-lg">
          {/* Security Pillar 1 */}
          <div className="bg-surface-container-low p-space-md sm:p-space-lg rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-space-xs sm:gap-space-sm mb-space-xs sm:mb-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px] sm:text-[24px]">
                  badge
                </span>
                <h4 className="font-headline-sm text-base sm:text-headline-sm text-primary-container font-semibold">
                  Xác thực Định danh Số
                </h4>
              </div>
              <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
                Tích hợp nền tảng xác thực Supabase Auth, hỗ trợ định danh qua tài
                khoản định danh điện tử VNeID. Phân quyền đa cấp nghiêm ngặt cho
                từng vị trí lãnh đạo, điều phối viên tổng đài và cán bộ thi công
                hiện trường.
              </p>
            </div>
            <div className="mt-space-sm sm:mt-space-md pt-space-xs sm:pt-space-sm bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between text-[11px] sm:text-label-sm text-on-surface-variant font-code-tabular">
              <span>OAuth 2.0 / VNeID Ready</span>
              <span className="text-secondary font-semibold">Level 2+</span>
            </div>
          </div>

          {/* Security Pillar 2 */}
          <div className="bg-surface-container-low p-space-lg rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-space-xs sm:gap-space-sm mb-space-xs sm:mb-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px] sm:text-[24px]">
                  person_off
                </span>
                <h4 className="font-headline-sm text-base sm:text-headline-sm text-primary-container font-semibold">
                  Bảo Vệ Danh Tính Người Dân
                </h4>
              </div>
              <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
                Cơ chế bảo vệ danh tính công dân gửi phản ánh (hỗ trợ báo cáo ẩn danh
                qua Device ID). Số điện thoại và thông tin cá nhân của người dân được
                mã hóa một chiều trong kho dữ liệu tác nghiệp để ngăn chặn mọi rủi ro
                lộ lọt.
              </p>
            </div>
            <div className="mt-space-sm sm:mt-space-md pt-space-xs sm:pt-space-sm bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between text-[11px] sm:text-label-sm text-on-surface-variant font-code-tabular">
              <span>Mã hóa AES-256</span>
              <span className="text-secondary font-semibold">Ẩn danh 100%</span>
            </div>
          </div>

          {/* Security Pillar 3 */}
          <div className="bg-surface-container-low p-space-lg rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-space-xs sm:gap-space-sm mb-space-xs sm:mb-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px] sm:text-[24px]">
                  fact_check
                </span>
                <h4 className="font-headline-sm text-base sm:text-headline-sm text-primary-container font-semibold">
                  Nhật Ký Thanh Tra Bất Biến
                </h4>
              </div>
              <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
                Hệ thống Audit Logs bất biến (Immutable Logs) lưu trữ toàn bộ lịch
                sử chỉnh sửa, chuyển giao và duyệt nghiệm thu phục vụ công tác
                thanh tra công vụ. Không một vai trò nào, kể cả Siêu Quản trị
                (SuperAdmin), có thể xóa vết nhật ký.
              </p>
            </div>
            <div className="mt-space-sm sm:mt-space-md pt-space-xs sm:pt-space-sm bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between text-[11px] sm:text-label-sm text-on-surface-variant font-code-tabular">
              <span>Append-only Audit DB</span>
              <span className="text-secondary font-semibold">
                Không thể giả mạo
              </span>
            </div>
          </div>
        </div>

        {/* Architecture Footnote Notice */}
        <div className="mt-space-md sm:mt-space-lg p-space-sm sm:p-space-md bg-surface-container-high/30 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs sm:gap-space-sm">
          <div className="flex items-center gap-space-xs sm:gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px] shrink-0">
              policy
            </span>
            <span className="font-body-sm text-xs sm:text-body-sm text-on-surface">
              Cơ chế quản lý phù hợp định hướng Chuyển đổi số quốc gia và tiêu
              chuẩn ISO/IEC 27001 về An toàn thông tin.
            </span>
          </div>
          <div className="font-code-tabular text-[10px] sm:text-label-sm text-outline shrink-0">
            HASH: SHA256-SIGN-SECURE
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
