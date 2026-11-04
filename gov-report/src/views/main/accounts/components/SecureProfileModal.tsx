import React from "react";

export interface SecureProfileData {
  name: string;
  cccd: string;
  phone: string;
  agency: string;
  role: string;
  certCode: string;
}

interface SecureProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: SecureProfileData | null;
}

const SecureProfileModal: React.FC<SecureProfileModalProps> = ({
  isOpen,
  onClose,
  profileData,
}) => {
  if (!isOpen || !profileData) return null;

  const maskedCccd =
    profileData.cccd.length > 6
      ? profileData.cccd.substring(0, 6) + "******"
      : profileData.cccd || "001092******";

  const maskedPhone =
    profileData.phone.length > 4
      ? profileData.phone.substring(0, 4) + ".xxx.xxx"
      : profileData.phone || "0912.xxx.xxx";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface-container-lowest shadow-2xl flex flex-col overflow-hidden border border-outline-variant/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-space-lg py-space-md bg-primary-container text-surface-container-lowest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
              admin_panel_settings
            </span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm leading-tight font-bold">
                Hồ Sơ Mật Cán Bộ Lãnh Đạo
              </span>
              <span className="font-label-sm text-label-sm text-secondary-fixed font-semibold">
                Cấp Thẩm Quyền: BAN CƠ YẾU CHÍNH PHỦ (Mật L2)
              </span>
            </div>
          </div>
          <button
            className="text-on-primary-container hover:text-surface-container-lowest transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Đóng hồ sơ"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-space-lg flex flex-col gap-space-md max-h-[75vh] overflow-y-auto">
          {/* Notice banner */}
          <div className="flex items-start gap-space-sm p-3 bg-error-container/40 text-on-error-container border border-error-container">
            <span className="material-symbols-outlined text-[18px] text-error shrink-0 mt-0.5">
              warning
            </span>
            <span className="font-body-sm text-body-sm leading-relaxed">
              Mọi truy xuất hồ sơ định danh lãnh đạo và cán bộ điều hành đều được ghi nhận vào
              Nhật ký kiểm toán bảo mật cấp quốc gia (Audit Log).
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md p-space-md bg-surface-container-low font-body-sm text-body-sm border border-outline-variant/20">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Họ và tên cán bộ:
              </span>
              <span className="font-label-lg text-label-lg text-on-surface mt-0.5 font-bold">
                {profileData.name}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Cơ quan bổ nhiệm:
              </span>
              <span className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">
                {profileData.agency}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Chức danh công tác:
              </span>
              <span className="font-body-md text-body-md text-on-surface mt-0.5">
                {profileData.role}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Số CCCD (Đã mã hóa):
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-code-tabular text-[14px] text-primary font-bold">
                  {maskedCccd}
                </span>
                <span
                  className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim"
                  title="Khớp chuẩn CSDL Quốc gia về dân cư"
                >
                  verified_user
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                SĐT Khẩn Cấp Trực Tuyến:
              </span>
              <span className="font-code-tabular text-[13px] text-on-surface mt-0.5 font-medium">
                {maskedPhone}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Khóa Công Khai (Public Key):
              </span>
              <span className="font-code-tabular text-[11px] text-on-surface-variant mt-0.5 truncate">
                SHA256: 4b2f8a...e71c99
              </span>
            </div>
          </div>

          {/* Crypto Certificate Section */}
          <div className="p-space-md bg-surface-container flex flex-col gap-2 border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  encrypted
                </span>
                <span className="font-label-md text-label-md text-on-surface uppercase font-bold">
                  Chứng thư số công vụ chuyên dùng
                </span>
              </div>
              <span className="px-2 py-0.5 bg-tertiary-container text-tertiary-fixed-dim font-label-sm text-label-sm font-semibold">
                HỢP LỆ (VALID)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] font-code-tabular text-on-surface-variant pt-2 border-t border-outline-variant/20">
              <div>
                Đơn vị cấp: <span className="text-on-surface font-semibold">Ban Cơ yếu Chính phủ</span>
              </div>
              <div>
                Mã định danh:{" "}
                <span className="text-on-surface font-semibold">
                  {profileData.certCode || "BCY-CP/2023-99412"}
                </span>
              </div>
              <div>
                Tiêu chuẩn mã hóa: <span className="text-on-surface">RSA 4096 / SHA-256</span>
              </div>
              <div>
                Thời hạn: <span className="text-on-surface">Đến 31/12/2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-space-lg py-space-md bg-surface-container flex items-center justify-end gap-space-sm border-t border-outline-variant/30">
          <button
            className="px-4 h-9 bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors cursor-pointer font-medium"
            onClick={onClose}
            type="button"
          >
            Đóng cửa sổ
          </button>
          <button
            className="px-4 h-9 bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer font-semibold shadow-sm"
            onClick={() => alert("Lệnh tái ký và gia hạn chứng thư số đã gửi tới Ban Cơ yếu.")}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">key</span>
            <span>Xác thực lại khóa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecureProfileModal;
