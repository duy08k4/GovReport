import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';
import { ROUTES } from '../../../config/Routing';

const ForgotPassword: React.FC = () => {
  const router = useIonRouter();

  // OTP states (6 digits)
  const [otp, setOtp] = useState<string[]>(['8', '3', '5', '', '', '']);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Timer states
  const [countdown, setCountdown] = useState<number>(48);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  // Password states
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Feedback states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle Resend OTP
  const handleResendOtp = () => {
    if (isResendDisabled) return;
    setCountdown(60);
    setIsResendDisabled(true);
    setErrorMessage(null);
    setSuccessMessage('Mã xác thực mới đã được gửi lại tới số điện thoại 0978.***.552');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Handle Paste event for OTP (support pasting 6-digit SMS / auth code)
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;
    const newOtp = [...otp];
    pastedData.split('').forEach((char, idx) => {
      newOtp[idx] = char;
    });
    setOtp(newOtp);
    const focusTarget = Math.min(pastedData.length, 5);
    otpInputsRef.current[focusTarget]?.focus();
  };

  // OTP Box inputs handler
  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const newOtp = [...otp];

    if (cleaned.length === 0) {
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // If multiple characters typed into existing box, take the last typed digit
    const digitToUse = cleaned.slice(-1);
    newOtp[index] = digitToUse;
    setOtp(newOtp);

    // Auto-advance to next box if digit entered
    if (index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  // Password criteria according to exact government standards:
  // 1. Độ dài: từ 8 đến 20 ký tự
  // 2. Chữ cái viết hoa: có chữ in hoa A-Z
  // 3. Chữ thường & số: có chữ thường (a-z) và số (0-9)
  // 4. Ký tự đặc biệt: !@#$%^&*()_+-=[]{};':"|,.<>/?`~
  const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;

  const condLength = newPassword.length >= 8 && newPassword.length <= 20;
  const condUpper = /[A-Z]/.test(newPassword);
  const condLowerAndNumber = /[a-z]/.test(newPassword) && /[0-9]/.test(newPassword);
  const condSpecial = SPECIAL_CHAR_REGEX.test(newPassword);

  const conditionsMetCount =
    (condLength ? 1 : 0) +
    (condUpper ? 1 : 0) +
    (condLowerAndNumber ? 1 : 0) +
    (condSpecial ? 1 : 0);

  // Phân loại độ mạnh: Chưa nhập, Yếu (1-2), Khá (3), Mạnh (4)
  const getPasswordStrength = (): {
    label: 'Chưa nhập' | 'Yếu' | 'Khá' | 'Mạnh';
    barCount: number;
    colorClass: string;
    textColorClass: string;
  } => {
    if (!newPassword || newPassword.length === 0) {
      return {
        label: 'Chưa nhập',
        barCount: 0,
        colorClass: 'bg-surface-container-highest',
        textColorClass: 'text-on-surface-variant',
      };
    }

    if (conditionsMetCount <= 2) {
      return {
        label: 'Yếu',
        barCount: Math.max(1, conditionsMetCount),
        colorClass: 'bg-error',
        textColorClass: 'text-error',
      };
    }

    if (conditionsMetCount === 3) {
      return {
        label: 'Khá',
        barCount: 3,
        colorClass: 'bg-secondary',
        textColorClass: 'text-secondary',
      };
    }

    return {
      label: 'Mạnh',
      barCount: 4,
      colorClass: 'bg-on-tertiary-container',
      textColorClass: 'text-on-tertiary-container',
    };
  };

  const isOtpComplete = otp.join('').length === 6;
  const strength = getPasswordStrength();
  const isStrong = strength.label === 'Mạnh';
  const isPasswordMatch = !confirmPassword || newPassword === confirmPassword;
  const isFormValid = isOtpComplete && isStrong && Boolean(confirmPassword) && newPassword === confirmPassword;

  // Submit reset password
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setErrorMessage('Vui lòng nhập đầy đủ 6 chữ số mã OTP xác thực.');
      return;
    }

    if (!isStrong) {
      if (!newPassword) {
        setErrorMessage('Vui lòng thiết lập mật khẩu mới.');
      } else if (strength.label === 'Khá') {
        setErrorMessage('Mật khẩu ở mức "Khá" (còn 1 điều kiện chưa thỏa). Chỉ khi đạt mức "Mạnh" mới có thể đổi mật khẩu.');
      } else {
        setErrorMessage('Mật khẩu ở mức "Yếu". Chỉ khi mật khẩu đạt mức "Mạnh" mới có thể đổi mật khẩu.');
      }
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp với mật khẩu mới.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Khôi phục mật khẩu công vụ thành công! Đang chuyển hướng về trang đăng nhập...');
      setTimeout(() => {
        router.push(ROUTES.LOGIN, 'root', 'replace');
      }, 1500);
    }, 1000);
  };

  return (
    <IonPage className="bg-surface">
      <IonContent fullscreen className="ion-no-padding">
        {/* Khung chứa chuẩn Mobile First */}
        <div className="w-full min-h-screen bg-surface flex flex-col items-center">
          <main className="w-full max-w-md min-h-screen flex flex-col justify-between bg-surface relative pt-safe pb-safe shadow-sm">
            <div className="flex flex-col w-full pb-8">

              {/* Top Navigation & Header */}
              <div className="px-4 pt-2 pb-4 bg-surface flex flex-col gap-1.5">
                <div className="flex items-center justify-between pb-1">
                  <button
                    type="button"
                    onClick={() => router.push(ROUTES.LOGIN, 'back', 'pop')}
                    className="flex items-center gap-1 text-primary font-label-md text-label-md py-1 pr-2 hover:opacity-80 active:opacity-60 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    <span>Đăng nhập</span>
                  </button>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-high rounded-DEFAULT text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[15px] text-secondary">security</span>
                    <span>Cổng Cán Bộ</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary-container text-on-primary">
                    <span className="material-symbols-outlined text-[16px]">shield_person</span>
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Hệ Thống Báo Cáo Công Vụ
                  </span>
                </div>
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-bold">
                  Khôi Phục Mật Khẩu Công Vụ
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Xác thực hai chiều qua mã OTP gửi đến số điện thoại hoặc email công vụ
                </p>
              </div>

              <div className="px-4 flex flex-col gap-4">

                {/* Step Indicator (3-step functional flow) */}
                <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-outline-variant/30">
                  <div className="flex items-center justify-between relative">
                    {/* Connecting Track Line */}
                    <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-surface-variant z-0"></div>
                    <div
                      className={`absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-primary z-0 transition-all duration-300 ${isOtpComplete ? 'right-6' : 'w-1/2'
                        }`}
                    ></div>

                    {/* Step 1: Completed */}
                    <div className="flex flex-col items-center gap-1.5 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container text-tertiary-fixed flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface font-medium">Khai báo</span>
                    </div>

                    {/* Step 2: Active or Completed */}
                    <div className="flex flex-col items-center gap-1.5 relative z-10">
                      {isOtpComplete ? (
                        <div className="w-8 h-8 rounded-full bg-tertiary-container text-tertiary-fixed flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check
                          </span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md ring-4 ring-surface-container-low shadow-sm font-bold">
                          2
                        </div>
                      )}
                      <span
                        className={`font-label-sm text-label-sm ${isOtpComplete ? 'text-on-surface font-medium' : 'text-primary font-bold'
                          }`}
                      >
                        Xác thực OTP
                      </span>
                    </div>

                    {/* Step 3: Pending or Active */}
                    <div className="flex flex-col items-center gap-1.5 relative z-10">
                      {isOtpComplete ? (
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-md text-label-md ring-4 ring-surface-container-low shadow-sm font-bold">
                          3
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-md text-label-md">
                          3
                        </div>
                      )}
                      <span
                        className={`font-label-sm text-label-sm ${isOtpComplete ? 'text-primary font-bold' : 'text-on-surface-variant'
                          }`}
                      >
                        Đổi mật khẩu
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Active Step 2 Card: OTP Verification */}
                  <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-container">
                      <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                        mark_chat_read
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Đã phát hành mã bảo mật
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                          Mã xác thực 6 chữ số đã được gửi tới số điện thoại công vụ:{' '}
                          <span className="font-code-tabular text-code-tabular text-on-surface font-bold tracking-wide">
                            0978.***.552
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* 6-digit OTP Input Group */}
                    <div className="flex flex-col items-center gap-2 pt-1">
                      <label className="font-label-md text-label-md text-on-surface-variant self-start font-medium">
                        Nhập mã OTP (6 chữ số):
                      </label>
                      <div className="flex items-center justify-between w-full gap-2">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              otpInputsRef.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            onFocus={(e) => e.target.select()}
                            onPaste={handleOtpPaste}
                            placeholder="•"
                            className="otp-box w-11 h-12 text-center font-code-tabular text-headline-sm text-primary bg-surface-container-low rounded-lg border border-outline-variant/40 focus:border-secondary focus:bg-surface-container-lowest focus:outline-none transition-all shadow-xs"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Resend Timer Feedback */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        <span className="font-body-sm text-body-sm">
                          Gửi lại mã sau{' '}
                          <span className="font-code-tabular text-code-tabular text-primary font-bold">
                            {countdown > 0 ? `(${countdown}s)` : '(Hết hạn)'}
                          </span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                        className="font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
                      >
                        Gửi lại mã
                      </button>
                    </div>
                  </div>

                  {/* Step 3 In-Flow: New Password Credentials */}
                  <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-3.5 border border-outline-variant/30">
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">
                          lock_reset
                        </span>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          Thiết Lập Mật Khẩu Mới
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Bước 3
                      </span>
                    </div>

                    {/* New Password Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="new-password">
                        Mật khẩu mới <span className="text-error">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                          key
                        </span>
                        <input
                          id="new-password"
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Nhập mật khẩu (từ 8 đến 20 ký tự)"
                          className="w-full h-10 pl-9 pr-10 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md placeholder:text-outline border border-outline-variant/40 focus:border-secondary focus:outline-none focus:bg-surface-container-lowest transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          aria-label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          className="absolute right-3 text-on-surface-variant p-1 focus:outline-none"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showNewPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>

                      {/* Password Strength Meter (4 cấp: Chưa nhập, Yếu, Khá, Mạnh) */}
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="grid grid-cols-4 gap-1.5 w-full">
                          <div
                            className={`h-1 rounded-full transition-colors ${strength.barCount >= 1 ? strength.colorClass : 'bg-surface-container-highest'
                              }`}
                          ></div>
                          <div
                            className={`h-1 rounded-full transition-colors ${strength.barCount >= 2 ? strength.colorClass : 'bg-surface-container-highest'
                              }`}
                          ></div>
                          <div
                            className={`h-1 rounded-full transition-colors ${strength.barCount >= 3 ? strength.colorClass : 'bg-surface-container-highest'
                              }`}
                          ></div>
                          <div
                            className={`h-1 rounded-full transition-colors ${strength.barCount >= 4 ? strength.colorClass : 'bg-surface-container-highest'
                              }`}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Độ mạnh:{' '}
                            <span className={`font-bold ${strength.textColorClass}`}>
                              {strength.label}
                            </span>
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                            Chuẩn an toàn cấp II
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface font-medium" htmlFor="confirm-password">
                        Xác nhận mật khẩu mới <span className="text-error">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
                          check_circle
                        </span>
                        <input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Nhập lại chính xác mật khẩu mới"
                          className="w-full h-10 pl-9 pr-10 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md placeholder:text-outline border border-outline-variant/40 focus:border-secondary focus:outline-none focus:bg-surface-container-lowest transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          className="absolute right-3 text-on-surface-variant p-1 focus:outline-none"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {!isPasswordMatch && (
                        <p className="font-label-sm text-label-sm text-error mt-0.5">
                          Mật khẩu xác nhận không trùng khớp.
                        </p>
                      )}
                    </div>

                    {/* Security Guidance Matrix Checklist */}
                    <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
                      <div className="flex items-center gap-1.5 text-on-surface">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span className="font-label-sm text-label-sm uppercase font-bold text-primary">
                          Tiêu chuẩn mật khẩu an toàn:
                        </span>
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant leading-snug">
                        Tối thiểu 8 ký tự (tối đa 20), gồm chữ in hoa, chữ thường, chữ số và ký tự đặc biệt (!@#$%...).
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <div
                          className={`flex items-center gap-1.5 transition-colors ${newPassword.length > 20
                            ? 'text-error font-bold'
                            : condLength
                              ? 'text-on-tertiary-container font-bold'
                              : 'text-on-surface-variant'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {newPassword.length > 20 ? 'error' : condLength ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span className="font-label-sm text-[11px]">
                            {newPassword.length > 20
                              ? `Tối đa 20 ký tự (${newPassword.length}/20)`
                              : `8 – 20 ký tự (${newPassword.length}/20)`}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 transition-colors ${condUpper ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {condUpper ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span className="font-label-sm text-[11px]">Chữ in hoa (A-Z)</span>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 transition-colors ${condLowerAndNumber ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {condLowerAndNumber ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span className="font-label-sm text-[11px]">Chữ thường &amp; Số (0-9)</span>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 transition-colors ${condSpecial ? 'text-on-tertiary-container font-bold' : 'text-on-surface-variant'
                            }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {condSpecial ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span className="font-label-sm text-[11px]">Ký tự đặc biệt (!@#$...)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Message Banner */}
                  {errorMessage && (
                    <div className="p-space-sm bg-error-container/40 border border-error/30 text-error rounded-lg flex items-start gap-2 text-body-sm shadow-xs">
                      <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
                      <span className="font-medium leading-relaxed">{errorMessage}</span>
                    </div>
                  )}

                  {successMessage && (
                    <div className="p-space-sm bg-surface-container-lowest border border-on-tertiary-container/30 text-on-tertiary-container rounded-lg flex items-start gap-2 text-body-sm shadow-md">
                      <span
                        className="material-symbols-outlined text-[18px] shrink-0 mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-medium leading-relaxed text-on-surface">{successMessage}</span>
                    </div>
                  )}

                  {/* Main Submission CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3! px-4! bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg tracking-wide uppercase shadow-sm active:opacity-90 flex items-center justify-center gap-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">
                          progress_activity
                        </span>
                        <span>ĐANG CẬP NHẬT MẬT KHẨU...</span>
                      </>
                    ) : (
                      <>
                        <span>CẬP NHẬT MẬT KHẨU VÀ ĐĂNG NHẬP</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Support Hotline Footer Notice */}
                <div className="mt-2 p-3 rounded-xl bg-surface-container flex items-start gap-3 border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">headset_mic</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold">
                      Hỗ trợ kỹ thuật khẩn
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                      Trực ban công nghệ thông tin cơ quan:{' '}
                      <span className="font-code-tabular text-code-tabular font-bold text-primary">
                        024.3825.xxxx
                      </span>{' '}
                      (Nhánh kỹ thuật)
                    </p>
                  </div>
                </div>

                {/* Footer back link */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => router.push(ROUTES.LOGIN, 'back', 'pop')}
                    className="font-label-md text-label-md text-secondary hover:underline font-semibold"
                  >
                    Quay lại trang Đăng nhập
                  </button>
                </div>

              </div>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
