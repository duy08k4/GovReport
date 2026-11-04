import React from "react";

interface RequirementItem {
  icon: string;
  component: string;
  spec: string;
  purpose: React.ReactNode;
}

const REQUIREMENTS: RequirementItem[] = [
  {
    icon: "gps_fixed",
    component: "Dịch vụ định vị (GPS)",
    spec: "GPS có độ chính xác cao (< 5m)",
    purpose: (
      <>
        Tự động quét tọa độ hiện trường phục vụ động cơ định tuyến không gian{" "}
        <code className="bg-surface-container px-1 py-0.5 rounded font-code-tabular text-[11px] sm:text-[12px] text-secondary font-semibold">
          PostGIS ST_Contains
        </code>{" "}
        để chuyển tiếp hồ sơ về đúng đơn vị thụ lý.
      </>
    ),
  },
  {
    icon: "photo_camera",
    component: "Camera & Bộ nhớ",
    spec: "Độ phân giải tối thiểu 5MP",
    purpose:
      "Chụp ảnh và ghi video hiện trạng sự cố (ổ gà, ngập lụt, rác thải) kèm siêu dữ liệu EXIF; chụp ảnh nghiệm thu đối soát sau khi hoàn thành sửa chữa.",
  },
  {
    icon: "cell_tower",
    component: "Kết nối mạng",
    spec: "3G / 4G / LTE / Wi-Fi",
    purpose:
      "Đồng bộ dữ liệu sự cố, gửi tọa độ thời gian thực về Trung tâm điều hành đô thị IOC và nhận cảnh báo đẩy sự cố phát sinh trong khu vực lân cận.",
  },
  {
    icon: "badge",
    component: "Định danh & Tài khoản",
    spec: "VNeID hoặc Supabase Auth",
    purpose:
      "Đảm bảo tính pháp lý công vụ đối với Cán bộ tiếp nhận và theo dõi lịch sử xử lý, quyền công dân đóng góp ý kiến đối với Người dân địa phương.",
  },
];

const HardwareRequirementsSection: React.FC = () => {
  return (
    <section className="w-full mt-8 sm:mt-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 sm:mb-space-sm gap-2">
        <div>
          <h2 className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold">
            Yêu Cầu Phần Cứng &amp; Quyền Truy Cập Thiết Bị
          </h2>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
            Quy chuẩn kỹ thuật bắt buộc để đảm bảo ứng dụng vận hành đầy đủ chức
            năng tác chiến
          </p>
        </div>
        <span className="font-label-sm text-[11px] sm:text-label-sm text-secondary font-semibold uppercase tracking-wider flex items-center gap-1 shrink-0">
          <span className="material-symbols-outlined text-[15px] sm:text-[16px]">
            verified
          </span>
          Chuẩn An Toàn Cấp Độ 3
        </span>
      </div>

      {/* Table Container - Responsive with horizontal scroll on small viewports */}
      <div className="w-full overflow-x-auto border border-outline-variant rounded-lg bg-surface-container-lowest shadow-sm">
        <table className="w-full text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="bg-surface-container-high/60 border-b border-outline-variant font-label-md text-[11px] sm:text-label-md text-on-surface">
              <th className="py-2.5 sm:py-3 px-3 sm:px-4 uppercase tracking-wider w-1/4">
                Thành phần thiết bị
              </th>
              <th className="py-2.5 sm:py-3 px-3 sm:px-4 uppercase tracking-wider w-1/4">
                Yêu cầu tối thiểu
              </th>
              <th className="py-2.5 sm:py-3 px-3 sm:px-4 uppercase tracking-wider w-1/2">
                Mục đích sử dụng thực tế
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container font-body-sm text-xs sm:text-body-sm">
            {REQUIREMENTS.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-surface-container-low/40 transition-colors"
              >
                <td className="py-3 sm:py-3.5 px-3 sm:px-4 font-semibold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0">
                    {item.icon}
                  </span>
                  <span>{item.component}</span>
                </td>
                <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-on-surface-variant font-code-tabular">
                  {item.spec}
                </td>
                <td className="py-3 sm:py-3.5 px-3 sm:px-4 text-on-surface leading-relaxed">
                  {item.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HardwareRequirementsSection;
