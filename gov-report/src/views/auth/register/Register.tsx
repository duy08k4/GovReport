import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/Routing";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Vui lòng đồng ý với Quy chế sử dụng để tiếp tục.");
      return;
    }

    setIsLoading(true);

    // Giả lập đăng ký tài khoản công dân
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Đăng ký tài khoản thành công! Đang chuyển đến Đăng nhập...");
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1200);
    }, 900);
  };

  const handleVNeIDRegister = () => {
    alert("Đang kết nối Cổng Dịch vụ công Quốc gia & VNeID để trích xuất danh tính...");
  };

  return (
    <div className="flex flex-col w-full items-center justify-center relative">
      {/* Security Protocol Pill */}
      <div className="mb-4 sm:mb-5 z-10 flex items-center gap-2 px-3 py-1 bg-surface-container text-secondary text-[10px] sm:text-label-sm font-code-tabular rounded shadow-sm text-center">
        <span className="inline-block w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse shrink-0" />
        <span className="font-medium">
          ĐĂNG KÝ TÀI KHOẢN CÔNG DÂN: XÁC THỰC DANH TÍNH ĐÔ THỊ
        </span>
      </div>

      {/* Central Registration Card */}
      <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl shadow-md p-6 sm:p-9 z-10 relative border border-outline-variant/40">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-container flex items-center justify-center mb-3 shadow-sm">
            <span className="material-symbols-outlined text-secondary-container text-[26px] sm:text-[30px]">
              how_to_reg
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary-fixed rounded-full ring-2 ring-surface-container-lowest" />
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-headline-sm text-base sm:text-headline-sm text-primary tracking-tight font-bold">
              GovReport
            </span>
            <span className="font-code-tabular text-[10px] uppercase tracking-wider bg-surface-container text-secondary font-semibold px-1.5 py-0.5 rounded">
              Công dân số
            </span>
          </div>

          <h1 className="font-headline-lg-mobile sm:font-headline-lg text-xl sm:text-headline-lg text-on-surface font-bold tracking-tight">
            Đăng ký tài khoản
          </h1>
          <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-1 leading-relaxed">
            Khởi tạo tài khoản công dân số để gửi phản ánh và theo dõi tiến độ xử lý
            sự cố trực tuyến
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 flex flex-col gap-3.5 sm:gap-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
              htmlFor="fullName"
            >
              Họ và tên công dân
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                badge
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                className="w-full h-10 pl-9 sm:pl-10 pr-3.5 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
              />
            </div>
          </div>

          {/* Phone & Email (2 Cols on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  phone_iphone
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xxxxxxxx"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-3 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="email"
              >
                Địa chỉ Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-3 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="registerPassword"
              >
                Mật khẩu
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  lock
                </span>
                <input
                  id="registerPassword"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-9 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 p-1 text-outline hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Ẩn hoặc hiện mật khẩu"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className="font-label-lg text-xs sm:text-label-lg text-on-surface font-medium mb-1"
                htmlFor="confirmPassword"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] sm:text-[20px] text-outline pointer-events-none">
                  lock_reset
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 pl-9 sm:pl-10 pr-9 bg-surface-container-low font-body-md text-xs sm:text-body-md text-on-surface rounded border border-transparent focus:border-secondary focus:bg-surface-container-lowest transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 p-1 text-outline hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Ẩn hoặc hiện mật khẩu xác nhận"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 rounded bg-surface-container text-secondary focus:ring-0 cursor-pointer accent-secondary shrink-0"
              />
              <span className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant leading-relaxed">
                Tôi cam kết thông tin khai báo là chính xác và đồng ý với{" "}
                <a href="#terms" className="text-secondary font-medium hover:underline">
                  Quy chế bảo vệ dữ liệu &amp; an toàn thông tin
                </a>{" "}
                GovReport.
              </span>
            </label>
          </div>

          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="px-3 py-2 bg-error-container text-on-error-container rounded text-xs sm:text-body-sm font-medium flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-[17px] shrink-0">
                error
              </span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="px-3 py-2 bg-[#F0FDF4] text-[#16A34A] border border-[#86EFAC] rounded text-xs sm:text-body-sm font-medium flex items-center gap-2 animate-fadeIn">
              <span className="material-symbols-outlined text-[17px] shrink-0">
                check_circle
              </span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 sm:h-11 mt-1 bg-primary-container text-on-primary font-label-lg text-xs sm:text-label-lg rounded font-semibold tracking-wider uppercase transition-opacity flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:opacity-90 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang xử lý đăng ký...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>ĐĂNG KÝ TÀI KHOẢN</span>
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

        {/* National Digital Identity (VNeID) Fast Registration */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleVNeIDRegister}
            className="w-full h-10 sm:h-11 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-xs sm:text-label-lg rounded font-medium transition-colors flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 shadow-sm border border-outline-variant/30 cursor-pointer"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#BE1E2D] flex items-center justify-center shadow-xs shrink-0">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFD700]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="font-semibold text-primary">
              Đăng ký nhanh bằng VNeID
            </span>
            <span className="font-code-tabular text-[9px] sm:text-[10px] uppercase font-bold bg-error-container text-on-error-container px-1 py-0.5 rounded">
              Tự động
            </span>
          </button>
          <p className="font-body-sm text-[10px] sm:text-[11px] text-outline text-center px-1 leading-relaxed">
            Tự động điền và xác minh thông tin dựa trên hồ sơ Căn cước công dân gắn chip.
          </p>
        </div>

        {/* Footer Segment */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-surface-container flex flex-col gap-3.5 sm:gap-4">
          <div className="text-center font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
            <span>Đã có tài khoản công dân?</span>
            <Link
              to={ROUTES.LOGIN}
              className="text-secondary font-semibold hover:underline ml-1"
            >
              Đăng nhập ngay
            </Link>
          </div>

          <div className="bg-surface-container-low rounded p-2.5 sm:p-3 flex gap-2 sm:gap-2.5 items-start border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px] shrink-0 mt-0.5">
              security
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-xs sm:text-label-md text-on-surface font-semibold">
                Lưu ý dành cho Cán bộ &amp; Lực lượng Hiện trường
              </span>
              <p className="font-body-sm text-[11px] sm:text-[12px] text-on-surface-variant leading-relaxed mt-0.5">
                Cán bộ công vụ không đăng ký tại cổng này. Tài khoản tác chiến được
                cấp trực tiếp từ Trung tâm Điều phối Đô thị sau khi duyệt công văn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
