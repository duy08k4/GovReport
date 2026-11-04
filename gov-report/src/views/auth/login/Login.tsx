import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    // Giả lập xác thực Supabase / Auth Service
    setTimeout(() => {
      setIsLoading(false);
      if (identifier.toLowerCase().includes("error")) {
        setErrorMessage("Thông tin xác thực không chính xác. Vui lòng kiểm tra lại.");
      } else {
        // Đăng nhập thành công -> chuyển về giao diện quản trị chính
        navigate(ROUTES.MAIN);
      }
    }, 850);
  };

  const handleVNeIDLogin = () => {
    alert("Đang kết nối Cổng Định danh điện tử Quốc gia (VNeID SSO)...");
  };

  return (
    <div className="flex flex-col w-full items-center justify-center relative">
      {/* Security Protocol Pill */}
      <div className="mb-4 sm:mb-5 z-10 flex items-center gap-2 px-3 py-1 bg-surface-container text-secondary text-[10px] sm:text-label-sm font-code-tabular rounded shadow-sm text-center">
        <span className="inline-block w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse shrink-0" />
        <span className="font-medium">
          AN TOÀN BẢO MẬT: TLS 1.3 &amp; AES-256 TIÊU CHUẨN CẤP ĐỘ 3
        </span>
      </div>

      {/* Central Authentication Card */}
      <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl shadow-md p-6 sm:p-9 z-10 relative border border-outline-variant/40">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          {/* Specialized GIS & Civic Shield Symbol */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-container flex items-center justify-center mb-3 shadow-sm">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-secondary-container"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              viewBox="0 0 24 24"
            >
              <path
                className="text-secondary opacity-60"
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              />
              <path
                className="text-secondary-fixed"
                d="M12 7v5l3 3"
                strokeWidth="2"
              />
              <path className="text-secondary-fixed" d="M9 10h6" />
              <circle
                className="text-secondary-container"
                cx="12"
                cy="12"
                fill="currentColor"
                r="2"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary-fixed rounded-full ring-2 ring-surface-container-lowest" />
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-headline-sm text-base sm:text-headline-sm text-primary tracking-tight font-bold">
              GovReport
            </span>
            <span className="font-code-tabular text-[10px] uppercase tracking-wider bg-surface-container text-secondary font-semibold px-1.5 py-0.5 rounded">
              Xác thực
            </span>
          </div>
          <h1 className="font-headline-lg-mobile sm:font-headline-lg text-xl sm:text-headline-lg text-on-surface font-bold tracking-tight">
            Đăng nhập hệ thống
          </h1>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1">
            Cổng thông tin tiếp nhận &amp; điều phối xử lý sự cố đô thị
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 flex flex-col gap-3.5 sm:gap-4">
          {/* Input Group: Account Identifier */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium"
                htmlFor="identifier"
              >
                Email hoặc Số điện thoại
              </label>
              <span className="font-code-tabular text-[10px] sm:text-[11px] text-outline font-normal">
                Định dạng chuẩn
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                account_circle
              </span>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@example.com hoặc 09xxxxxxxx"
                required
                className="w-full h-10 pl-9 sm:pl-10 pr-3.5 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
              />
            </div>
          </div>

          {/* Input Group: Password */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium"
                htmlFor="passwordInput"
              >
                Mật khẩu
              </label>
              <span className="font-code-tabular text-[10px] sm:text-[11px] text-outline">
                Bảo vệ 2 lớp
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                lock
              </span>
              <input
                id="passwordInput"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-10 pl-9 sm:pl-10 pr-10 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center rounded cursor-pointer"
                aria-label="Ẩn hoặc hiện mật khẩu"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Utilities Row: Remember Session & Forgot Password */}
          <div className="flex items-center justify-between pt-0.5 text-xs sm:text-body-sm">
            <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-surface-container text-secondary focus:ring-0 cursor-pointer accent-secondary"
              />
              <span className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                Ghi nhớ phiên
              </span>
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="font-label-md text-xs sm:text-label-md text-secondary hover:underline font-semibold transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="px-3 py-2 bg-error-container text-on-error-container rounded text-xs sm:text-body-sm font-medium flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-[17px] shrink-0">
                error
              </span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 sm:h-11 mt-1 bg-primary-container text-on-primary font-label-lg text-xs sm:text-label-lg rounded font-semibold tracking-wider uppercase transition-opacity flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang xác thực...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>ĐĂNG NHẬP</span>
                <span className="material-symbols-outlined text-[17px] sm:text-[18px]">
                  arrow_forward
                </span>
              </span>
            )}
          </button>
        </form>

        {/* Structural Divider */}
        <div className="relative my-5 sm:my-6 flex items-center justify-center">
          <div className="w-full h-px bg-surface-container-high" />
          <span className="absolute px-3 bg-surface-container-lowest font-code-tabular text-[10px] sm:text-[11px] text-outline font-semibold tracking-widest uppercase">
            HOẶC
          </span>
        </div>

        {/* National Digital Identity (VNeID) Integration */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleVNeIDLogin}
            className="w-full h-10 sm:h-11 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-xs sm:text-label-lg rounded font-medium transition-colors flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 shadow-sm border border-outline-variant/30 cursor-pointer"
          >
            {/* VNeID Emblem Minimal Vector Badge */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#BE1E2D] flex items-center justify-center shadow-xs shrink-0">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="font-semibold text-primary">Đăng nhập bằng VNeID</span>
            <span className="font-code-tabular text-[9px] sm:text-[10px] uppercase font-bold bg-error-container text-on-error-container px-1 py-0.5 rounded">
              Mức 2
            </span>
          </button>
          <p className="font-body-sm text-[10px] sm:text-[11px] text-outline text-center px-1 leading-relaxed">
            Hỗ trợ xác thực định danh điện tử mức độ 2 cho công dân và cán bộ công quyền.
          </p>
        </div>

        {/* Footer Segment */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-surface-container flex flex-col gap-3.5 sm:gap-4">
          {/* Registration Link */}
          <div className="text-center font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
            <span>Chưa có tài khoản công dân?</span>
            <Link
              to={ROUTES.REGISTER}
              className="text-secondary font-semibold hover:underline ml-1"
            >
              Đăng ký ngay
            </Link>
          </div>

          {/* Administrative Notice Box */}
          <div className="bg-surface-container-low rounded p-2.5 sm:p-3 flex gap-2 sm:gap-2.5 items-start border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
              corporate_fare
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-xs sm:text-label-md text-on-surface font-semibold">
                Tài khoản Điều hành &amp; Cán bộ Hiện trường
              </span>
              <p className="font-body-sm text-[11px] sm:text-[12px] text-on-surface-variant leading-relaxed mt-0.5">
                Tài khoản chuyên trách do Cơ quan Quản lý Đô thị cấp phát. Liên hệ
                Phòng Công nghệ Thông tin để được cấu hình phân quyền GIS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
