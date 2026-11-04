import React, { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMsg('Vui lòng điền đầy đủ các trường thông tin');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg('Mật khẩu mới phải có tối thiểu 8 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Xác nhận mật khẩu mới không trùng khớp');
      return;
    }
    setErrorMsg('');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center !p-0 sm:!p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-surface-container-lowest !rounded-t-2xl sm:!rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden border border-outline-variant/20 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="!p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">lock_reset</span>
            <span className="font-headline-sm text-[16px] font-bold">
              Đổi Mật Khẩu Công Vụ
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 !rounded-full hover:bg-white/10 flex items-center justify-center text-on-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="!p-4 space-y-3 overflow-y-auto">
          {errorMsg && (
            <div className="!p-2.5 bg-error-container text-on-error-container text-body-sm !rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className="w-full !p-2.5 !pr-10 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary font-medium"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showOld ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 8 ký tự, gồm số & ký tự đặc biệt"
                className="w-full !p-2.5 !pr-10 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary font-medium"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-2.5 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showNew ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold uppercase">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full !p-2.5 bg-surface !rounded-lg border border-outline-variant/30 text-body-md text-on-surface focus:outline-none focus:border-secondary font-medium"
            />
          </div>

          {/* Requirements note */}
          <div className="!p-2.5 bg-surface-container-low !rounded-lg text-[11px] text-on-surface-variant space-y-1">
            <div className="font-semibold text-primary">Tiêu chuẩn bảo mật tài khoản chính phủ:</div>
            <div>• Tối thiểu 8 ký tự, kết hợp chữ in hoa, số và ký tự đặc biệt</div>
            <div>• Không trùng với 3 mật khẩu đã sử dụng gần nhất</div>
          </div>

          {/* Actions */}
          <div className="!pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 !py-2.5 !px-3 !rounded-lg bg-surface-container-high text-on-surface font-semibold text-label-md cursor-pointer hover:bg-surface-container-highest transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 !py-2.5 !px-3 !rounded-lg bg-primary text-on-primary font-semibold text-label-md flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#1E3A5F] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Cập Nhật Mật Khẩu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
