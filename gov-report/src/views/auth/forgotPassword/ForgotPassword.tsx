import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"request" | "verify">("request");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    // Giả lập gửi OTP qua SMS / Email
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
      setSuccessMessage(
        `Mã OTP đã được gửi đến "${identifier}". Vui lòng kiểm tra tin nhắn hoặc hộp thư.`
      );
    }, 850);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (otp.trim().length < 4) {
      setErrorMessage("Vui lòng nhập đầy đủ mã xác thực OTP.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    setIsLoading(true);

    // Giả lập đặt lại mật khẩu thành công
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Đặt lại mật khẩu thành công! Đang chuyển đến Đăng nhập...");
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1200);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center relative">
      {/* Security Protocol Pill */}
      <div className="mb-4 sm:mb-5 z-10 flex items-center gap-2 px-3 py-1 bg-surface-container text-secondary text-[10px] sm:text-label-sm font-code-tabular rounded shadow-sm text-center">
        <span className="inline-block w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse shrink-0" />
        <span className="font-medium">
          KHÔI PHỤC TRUY CẬP: MÃ HÓA XÁC THỰC OTP AN TOÀN
        </span>
      </div>

      {/* Central Card */}
      <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl shadow-md p-6 sm:p-9 z-10 relative border border-outline-variant/40">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-container flex items-center justify-center mb-3 shadow-sm">
            <span className="material-symbols-outlined text-secondary-container text-[26px] sm:text-[30px]">
              lock_reset
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary-fixed rounded-full ring-2 ring-surface-container-lowest" />
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-headline-sm text-base sm:text-headline-sm text-primary tracking-tight font-bold">
              GovReport
            </span>
            <span className="font-code-tabular text-[10px] uppercase tracking-wider bg-surface-container text-secondary font-semibold px-1.5 py-0.5 rounded">
              Bảo mật
            </span>
          </div>

          <h1 className="font-headline-lg-mobile sm:font-headline-lg text-xl sm:text-headline-lg text-on-surface font-bold tracking-tight">
            Quên mật khẩu?
          </h1>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1 leading-relaxed">
            {step === "request"
              ? "Nhập email hoặc số điện thoại đã đăng ký để nhận mã OTP đặt lại mật khẩu"
              : "Nhập mã OTP và mật khẩu mới để hoàn tất khôi phục tài khoản"}
          </p>
        </div>

        {/* Notices */}
        {errorMessage && (
          <div className="mt-4 px-3 py-2 bg-error-container text-on-error-container rounded text-xs sm:text-body-sm font-medium flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[17px] shrink-0">
              error
            </span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 px-3 py-2 bg-[#F0FDF4] text-[#16A34A] border border-[#86EFAC] rounded text-xs sm:text-body-sm font-medium flex items-center gap-2 animate-fadeIn">
            <span className="material-symbols-outlined text-[17px] shrink-0">
              check_circle
            </span>
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Step 1: Request OTP Form */}
        {step === "request" ? (
          <form onSubmit={handleRequestOtp} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="forgotIdentifier"
              >
                Email hoặc Số điện thoại đã đăng ký
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  contact_mail
                </span>
                <input
                  id="forgotIdentifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com hoặc 09xxxxxxxx"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-3.5 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-primary-container text-on-primary font-label-lg text-xs sm:text-label-lg rounded font-semibold tracking-wider uppercase transition-opacity flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70 mt-1"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang gửi mã...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>GỬI MÃ XÁC THỰC (OTP)</span>
                  <span className="material-symbols-outlined text-[17px] sm:text-[18px]">
                    send
                  </span>
                </span>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: Verify OTP & Set New Password */
          <form onSubmit={handleResetPassword} className="mt-5 flex flex-col gap-3.5 sm:gap-4">
            {/* OTP Input */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <label
                  className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium"
                  htmlFor="otpCode"
                >
                  Mã xác thực OTP
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSuccessMessage(`Đã gửi lại mã OTP mới đến "${identifier}".`);
                  }}
                  className="font-label-md text-[11px] sm:text-xs text-secondary hover:underline cursor-pointer"
                >
                  Gửi lại mã?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  pin
                </span>
                <input
                  id="otpCode"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Ví dụ: 123456"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-3.5 bg-surface-container-low font-code-tabular text-sm sm:text-base text-on-surface font-bold tracking-widest rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="newPassword"
              >
                Mật khẩu mới
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  lock
                </span>
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-9 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 p-1 text-outline hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Ẩn hoặc hiện mật khẩu mới"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {showNewPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="confirmNewPassword"
              >
                Xác nhận mật khẩu mới
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  lock_reset
                </span>
                <input
                  id="confirmNewPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-3.5 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-primary-container text-on-primary font-label-lg text-xs sm:text-label-lg rounded font-semibold tracking-wider uppercase transition-opacity flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70 mt-1"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang cập nhật...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>ĐẶT LẠI MẬT KHẨU</span>
                  <span className="material-symbols-outlined text-[17px] sm:text-[18px]">
                    check
                  </span>
                </span>
              )}
            </button>
          </form>
        )}

        {/* Footer Segment */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-surface-container flex flex-col gap-3.5">
          <div className="text-center font-body-sm text-xs sm:text-body-sm text-on-surface-variant flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              arrow_back
            </span>
            <Link
              to={ROUTES.LOGIN}
              className="text-secondary font-semibold hover:underline"
            >
              Quay lại Đăng nhập
            </Link>
          </div>

          <div className="bg-surface-container-low rounded p-2.5 sm:p-3 flex gap-2 sm:gap-2.5 items-start border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
              history_edu
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-xs sm:text-label-md text-on-surface font-semibold">
                Bảo vệ định danh công vụ
              </span>
              <p className="font-body-sm text-[11px] sm:text-[12px] text-on-surface-variant leading-relaxed mt-0.5">
                Mọi yêu cầu đặt lại mật khẩu đều được mã hóa và lưu vết vào Nhật ký
                Kiểm toán An toàn Thông tin (Audit Log) theo tiêu chuẩn Cấp độ 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
