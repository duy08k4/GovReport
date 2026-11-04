import React, { useState } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { ROUTES } from '../../../config/Routing';
import { APP_CONFIG } from '../../../config/static/AppConfig';
import GovReportLogo from '../../../assets/govReport.png';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [identity, setIdentity] = useState('CC-HN-2024-9182');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isVNeIdLoading, setIsVNeIdLoading] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!identity.trim()) {
      setNoticeMessage('Vui lòng nhập mã thẻ công chức, email hoặc SĐT.');
      return;
    }

    setIsLoading(true);
    setNoticeMessage(null);

    // Giả lập xác thực nghiệp vụ cán bộ hiện trường
    setTimeout(() => {
      setIsLoading(false);
      // Chuyển hướng tới trang chủ tác chiến
      router.push(ROUTES.HOME, 'root', 'replace');
    }, 1200);
  };

  const handleVNeIdLogin = () => {
    setIsVNeIdLoading(true);
    setNoticeMessage('Đang kết nối xác thực tài khoản định danh VNeID Cấp độ 2 qua Cổng DVC Quốc gia...');
    setTimeout(() => {
      setIsVNeIdLoading(false);
      router.push(ROUTES.HOME, 'root', 'replace');
    }, 1500);
  };

  return (
    <IonPage className="bg-surface">
      <IonContent fullscreen className="ion-no-padding">
        {/* Khung chứa chuẩn Mobile First (Tự co giãn 100% trên điện thoại, căn giữa tinh tế trên màn hình rộng) */}
        <div className="w-full min-h-screen bg-surface flex flex-col items-center">
          <main className="w-full max-w-md min-h-screen flex flex-col justify-between bg-surface relative pt-safe pb-safe shadow-sm">
            
            <div className="flex flex-col w-full pb-safe">
              {/* Status Bar / Ambient Indicator */}
              <div className="w-full bg-primary-container px-space-md py-space-xs flex items-center justify-between text-surface-container-lowest">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-surface-variant">
                    {APP_CONFIG.DUTY_STATUS_TEXT}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-surface-variant text-[14px]">cell_tower</span>
                  <span className="font-code-tabular text-[11px] font-medium text-surface-variant">
                    MẠNG NỘI BỘ WAN-CP
                  </span>
                </div>
              </div>

              <div className="px-space-md pt-space-md pb-space-lg flex flex-col gap-space-lg">
                {/* Header Section: Institutional Trust & Branding */}
                <div className="flex flex-col items-center text-center">
                  {/* Crest / Emblem: GovReport Logo */}
                  <div className="relative w-18 h-18 mb-space-sm flex items-center justify-center">
                    <img
                      src={GovReportLogo}
                      alt="GovReport Logo"
                      className="w-full h-full object-contain drop-shadow-sm select-none"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed-dim opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
                    </span>
                  </div>

                  {/* Main Typography Hierarchy */}
                  <h1 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-primary font-bold">
                    GovReport Cadre
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant font-medium mt-0.5">
                    Cổng Tác Chiến Hiện Trường Công Quyền
                  </p>

                  {/* Security Level Badge */}
                  <div className="mt-space-sm inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-high rounded-full">
                    <span
                      className="material-symbols-outlined text-[15px] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wide">
                      BẢO MẬT CẤP ĐỘ 3 • SUPABASE &amp; VNeID
                    </span>
                  </div>
                </div>

                {/* Login Surface Panel */}
                <form
                  onSubmit={handleLogin}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md"
                >
                  {/* Alert notification if any */}
                  {noticeMessage && (
                    <div className="p-2.5 bg-surface-container-low rounded-lg text-primary text-body-sm flex items-start gap-2 border border-secondary-container">
                      <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">info</span>
                      <span>{noticeMessage}</span>
                    </div>
                  )}

                  {/* Input Group 1: Identity / Credential */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                      htmlFor="cadre-identity"
                    >
                      <span>Mã thẻ công chức / Email / SĐT</span>
                      <span className="font-code-tabular text-[11px] text-secondary font-medium uppercase">
                        Khu vực IV-01
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <input
                        id="cadre-identity"
                        type="text"
                        autoComplete="username"
                        inputMode="text"
                        placeholder="Ví dụ: CC-HN-0842 hoặc nam.nguyen@badinh.gov.vn"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        className="w-full h-11 pl-10 pr-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline rounded-lg outline-none border border-outline-variant/40 focus:border-secondary focus:bg-surface-container-low transition-colors duration-150"
                      />
                    </div>
                  </div>

                  {/* Input Group 2: Operational Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-md text-label-md text-on-surface font-semibold"
                        htmlFor="cadre-password"
                      >
                        Mật khẩu tác chiến
                      </label>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[13px] text-tertiary-container"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          encrypted
                        </span>
                        Mã hóa AES-256
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center pointer-events-none text-outline">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                      </div>
                      <input
                        id="cadre-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder="Nhập chuỗi ký tự mật mã"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 pl-10 pr-11 bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline rounded-lg outline-none border border-outline-variant/40 focus:border-secondary focus:bg-surface-container-low transition-colors duration-150"
                      />
                      <button
                        id="toggle-password-btn"
                        type="button"
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-[20px]" id="password-icon">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Remember device toggle */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none py-0.5">
                    <input
                      id="remember-device"
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface font-medium leading-none">
                      Ghi nhớ phiên đăng nhập trên thiết bị công vụ
                    </span>
                  </label>

                  {/* Primary Action Dispatch Button */}
                  <button
                    id="submit-login-btn"
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary-container text-surface-container-lowest font-label-lg text-label-lg rounded-lg flex items-center justify-center gap-2 active:bg-primary transition-all duration-150 shadow-sm disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                        <span>ĐANG XÁC THỰC DANH TÍNH...</span>
                      </>
                    ) : (
                      <>
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          vpn_key
                        </span>
                        <span>ĐĂNG NHẬP HỆ THỐNG</span>
                      </>
                    )}
                  </button>

                  {/* Tactical Splitter */}
                  <div className="relative flex items-center justify-center my-1">
                    <div className="w-full h-[1px] bg-surface-container-high"></div>
                    <span className="absolute px-3 bg-surface-container-lowest font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest font-bold">
                      HOẶC ĐỊNH DANH ĐIỆN TỬ
                    </span>
                  </div>

                  {/* VNeID One-Touch Authentication Button */}
                  <button
                    id="vneid-login-btn"
                    type="button"
                    onClick={handleVNeIdLogin}
                    disabled={isVNeIdLoading}
                    className="w-full h-12 bg-surface-container-low hover:bg-surface-container active:scale-[0.99] text-on-surface font-label-lg text-label-lg rounded-lg flex items-center justify-between px-3.5 transition-all duration-150 disabled:opacity-80"
                  >
                    <div className="flex items-center gap-2.5">
                      {/* VNeID Iconic Badge Emblem */}
                      <div className="w-7 h-7 rounded-md bg-[#DC2626] flex items-center justify-center shadow-xs shrink-0">
                        <span
                          className="material-symbols-outlined text-[18px] text-[#FEF08A]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-label-md text-label-md font-bold text-on-surface leading-tight">
                          Đăng nhập bằng VNeID
                        </span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant leading-tight">
                          Định danh điện tử Mức độ 2
                        </span>
                      </div>
                    </div>
                    {isVNeIdLoading ? (
                      <span className="material-symbols-outlined animate-spin text-secondary text-[22px]">
                        progress_activity
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-secondary text-[22px]">arrow_forward</span>
                    )}
                  </button>

                  {/* Auxiliary Redirection Navigation */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => router.push(ROUTES.FORGOT_PASSWORD)}
                      className="font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors py-1"
                    >
                      Quên mật khẩu công vụ?
                    </button>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <button
                      type="button"
                      onClick={() => router.push(ROUTES.REGISTER_CADRE)}
                      className="font-label-md text-label-md text-primary font-semibold hover:text-secondary transition-colors py-1"
                    >
                      Khai báo hồ sơ cán bộ mới
                    </button>
                  </div>
                </form>

                {/* Official Protocol Notice (Footer Regulatory Slate) */}
                <div className="bg-surface-container-high rounded-lg p-space-sm flex items-start gap-2.5">
                  <span
                    className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    policy
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wide">
                      Quy chế Vận hành Hiện trường
                    </span>
                    <p className="font-body-sm text-[12px] leading-relaxed text-on-surface-variant">
                      Ứng dụng chuyên dụng cho lực lượng cán bộ, đội cơ động và tổ phản ứng nhanh cấp cơ sở. Mọi thao tác
                      và vị trí định vị đều được ghi nhận tự động vào Nhật ký thanh tra công vụ điện tử.
                    </p>
                  </div>
                </div>

                {/* Technical Build Identification */}
                <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-80 pt-1">
                  <span className="font-code-tabular text-[11px]">Bản dựng Cadre v3.4.12-PROV</span>
                  <span>•</span>
                  <span className="font-code-tabular text-[11px]">Trạm phát số: HN-BD-01</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
