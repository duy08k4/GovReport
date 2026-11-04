import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { useIonRouter, IonPage, IonContent, IonToast } from "@ionic/react"

// Image
import GovReportLogo from "../../assets/govReport.png"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type { ForgotPasswordFormValues } from "./auth.type"

const ForgotPassword: React.FC = () => {
    const router = useIonRouter()

    // Step state: 1 = Nhập SĐT, 2 = Xác thực OTP & Đổi mật khẩu
    const [currentStep, setCurrentStep] = useState<1 | 2>(2)

    // Form inputs
    const [phone, setPhone] = useState<string>("0988892123")
    const [otp, setOtp] = useState<string[]>(["4", "8", "2", "", "", ""])
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    // UI state
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [timeLeft, setTimeLeft] = useState<number>(52)
    const [isCountdownActive, setIsCountdownActive] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    // Refs for 6 OTP input boxes
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Countdown effect
    useEffect(() => {
        if (!isCountdownActive || timeLeft <= 0) {
            return
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsCountdownActive(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isCountdownActive, timeLeft])

    // Masked phone format (e.g. 0988.***.892)
    const maskedPhone = useMemo(() => {
        const clean = phone.replace(/\D/g, "")
        if (clean.length >= 7) {
            return `${clean.slice(0, 4)}.***.${clean.slice(-3)}`
        }
        return "0988.***.892"
    }, [phone])

    // Password validation rules
    const passwordValidation = useMemo(() => {
        const hasMinLen = newPassword.length >= 8
        const hasUpper = /[A-Z]/.test(newPassword)
        const hasLower = /[a-z]/.test(newPassword)
        const hasNumber = /[0-9]/.test(newPassword)
        const isValid = hasMinLen && hasUpper && hasLower && hasNumber
        const isMatch = confirmPassword.length > 0 && newPassword === confirmPassword

        return {
            hasMinLen,
            hasUpper,
            hasLower,
            hasNumber,
            isValid,
            isMatch,
        }
    }, [newPassword, confirmPassword])

    // Navigation
    const handleBackToLogin = () => {
        router.push(ROUTES.LOGIN, "back", "pop")
    }

    // OTP Input logic
    const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // Allow paste 6-digit code
        if (value.length > 1) {
            const digits = value.replace(/\D/g, "").slice(0, 6).split("")
            if (digits.length > 0) {
                const updated = [...otp]
                digits.forEach((d, idx) => {
                    if (idx < 6) updated[idx] = d
                })
                setOtp(updated)
                const nextFocus = Math.min(digits.length, 5)
                inputRefs.current[nextFocus]?.focus()
                return
            }
        }

        const cleanVal = value.replace(/\D/g, "").slice(-1)
        const updated = [...otp]
        updated[index] = cleanVal
        setOtp(updated)

        if (cleanVal && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleResendOtp = () => {
        setTimeLeft(60)
        setIsCountdownActive(true)
        setToastMessage("Đã gửi lại mã OTP 6 chữ số tới số điện thoại " + maskedPhone)
        setShowToast(true)
    }

    const handleRequestPhoneOtp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const cleanPhone = phone.replace(/\D/g, "")
        if (cleanPhone.length < 9 || cleanPhone.length > 11) {
            setToastMessage("Vui lòng nhập số điện thoại hợp lệ (9-11 chữ số)")
            setShowToast(true)
            return
        }

        setToastMessage("Đã gửi mã xác nhận bảo mật tới " + cleanPhone)
        setShowToast(true)
        setTimeLeft(60)
        setIsCountdownActive(true)
        setCurrentStep(2)
    }

    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const fullOtp = otp.join("")
        if (fullOtp.length < 6) {
            setToastMessage("Vui lòng nhập đầy đủ mã xác thực OTP 6 chữ số")
            setShowToast(true)
            return
        }

        if (!passwordValidation.isValid) {
            setToastMessage("Mật khẩu mới yêu cầu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số")
            setShowToast(true)
            return
        }

        if (newPassword !== confirmPassword) {
            setToastMessage("Xác nhận mật khẩu mới chưa khớp")
            setShowToast(true)
            return
        }

        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            setToastMessage("Cập nhật mật khẩu mới thành công! Đang chuyển về trang Đăng nhập...")
            setShowToast(true)

            setTimeout(() => {
                router.push(ROUTES.LOGIN, "root", "replace")
            }, 1200)
        }, 1000)
    }

    return (
        <IonPage className="bg-surface font-body-md text-on-surface">
            <IonContent fullscreen className="ion-no-padding">
                <main className="flex-1 flex flex-col relative w-full bg-surface min-h-screen pt-safe pb-safe">
                    <div className="flex flex-col w-full !pb-8 max-w-md mx-auto">
                        {/* 1. Header Navigation Bar */}
                        <div className="w-full !px-4 !pt-3 !pb-2 flex items-center justify-between">
                            <button
                                className="inline-flex items-center !gap-1.5 !py-1.5 !px-2.5 !rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer border-none"
                                onClick={handleBackToLogin}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                <span>Đăng nhập</span>
                            </button>

                            <div className="flex items-center !gap-1.5 !py-1 !px-2.5 !rounded-lg bg-surface-container-high text-secondary">
                                <img
                                    src={GovReportLogo}
                                    alt="GovReport Logo"
                                    className="w-4 h-4 object-contain"
                                />
                                <span className="font-code-tabular text-code-tabular text-on-surface-variant font-semibold">
                                    Cổng Dịch Vụ Công
                                </span>
                            </div>
                        </div>

                        {/* 2. Tiêu đề hệ thống & mô tả */}
                        <div className="!px-4 !mt-2">
                            <div className="flex items-center !gap-2 !mb-1">
                                <span className="w-1.5 h-4 bg-secondary !rounded-full inline-block"></span>
                                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                                    Hệ thống Giám sát &amp; Báo cáo Đô thị
                                </span>
                            </div>
                            <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-primary tracking-tight font-bold">
                                Khôi Phục Mật Khẩu
                            </h1>
                            <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1">
                                Xác thực danh tính công dân để thiết lập lại quyền truy cập vào cổng dịch vụ
                            </p>
                        </div>

                        {/* 3. Thanh tiến trình 3 bước (Stepped Progress Bar) */}
                        <div className="!mx-4 !mt-4 !p-3 bg-surface-container !rounded-xl">
                            <div className="flex items-center justify-between relative">
                                {/* Connecting line */}
                                <div className="absolute left-6 right-6 top-3.5 h-[2px] bg-outline-variant -z-0">
                                    <div
                                        className={`h-full bg-secondary transition-all duration-300 ${
                                            currentStep === 1 ? "w-0" : "w-1/2"
                                        }`}
                                    />
                                </div>

                                {/* Step 1: Khai báo SĐT */}
                                <div
                                    className="flex flex-col items-center !gap-1 relative z-10 cursor-pointer"
                                    onClick={() => setCurrentStep(1)}
                                >
                                    <div
                                        className={`w-7 h-7 !rounded-full flex items-center justify-center font-label-sm text-label-sm shadow-sm transition-colors ${
                                            currentStep === 2
                                                ? "bg-secondary text-on-secondary"
                                                : "bg-primary text-on-primary ring-2 ring-surface"
                                        }`}
                                    >
                                        {currentStep === 2 ? (
                                            <span className="material-symbols-outlined text-[15px]">check</span>
                                        ) : (
                                            "1"
                                        )}
                                    </div>
                                    <span
                                        className={`font-label-sm text-label-sm ${
                                            currentStep === 1
                                                ? "font-semibold text-primary"
                                                : "text-on-surface"
                                        }`}
                                    >
                                        Khai báo SĐT
                                    </span>
                                </div>

                                {/* Step 2: Xác thực OTP */}
                                <div className="flex flex-col items-center !gap-1 relative z-10">
                                    <div
                                        className={`w-7 h-7 !rounded-full flex items-center justify-center font-label-sm text-label-sm shadow-sm transition-colors ${
                                            currentStep === 2
                                                ? "bg-primary text-on-primary ring-2 ring-surface font-bold"
                                                : "bg-surface-container-highest text-on-surface-variant"
                                        }`}
                                    >
                                        2
                                    </div>
                                    <span
                                        className={`font-label-sm text-label-sm ${
                                            currentStep === 2
                                                ? "font-semibold text-primary"
                                                : "text-on-surface-variant"
                                        }`}
                                    >
                                        Xác thực OTP
                                    </span>
                                </div>

                                {/* Step 3: Mật khẩu mới */}
                                <div className="flex flex-col items-center !gap-1 relative z-10">
                                    <div className="w-7 h-7 !rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm">
                                        3
                                    </div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Mật khẩu mới
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* GIAO DIỆN BƯỚC 1: Khai báo số điện thoại */}
                        {currentStep === 1 && (
                            <form
                                className="!mx-4 !mt-4 !p-4 bg-surface-container-lowest !rounded-xl shadow-sm flex flex-col !gap-4 border border-outline-variant/30"
                                onSubmit={handleRequestPhoneOtp}
                            >
                                <div>
                                    <div className="flex items-center justify-between !mb-2">
                                        <label
                                            className="font-label-md text-label-md text-primary flex items-center !gap-1.5 font-bold"
                                            htmlFor="phone-input"
                                        >
                                            <span className="material-symbols-outlined text-[18px] text-secondary">
                                                smartphone
                                            </span>
                                            Số điện thoại đã đăng ký
                                        </label>
                                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                                            Nhận OTP SMS
                                        </span>
                                    </div>

                                    <div className="relative bg-surface-container-low !rounded-lg border border-outline-variant/40 flex items-center shadow-xs">
                                        <span className="!pl-3 !pr-2 text-on-surface-variant font-code-tabular text-code-tabular shrink-0 select-none font-semibold">
                                            +84
                                        </span>
                                        <div className="w-px h-5 bg-surface-container-high !mr-2"></div>
                                        <input
                                            className="w-full h-11 !pr-3 bg-transparent text-on-surface font-code-tabular text-body-md !rounded-lg focus:outline-none placeholder:text-outline font-medium"
                                            id="phone-input"
                                            name="phone"
                                            pattern="[0-9]{9,11}"
                                            placeholder="0988 892 123"
                                            required
                                            type="tel"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1.5">
                                        Hệ thống sẽ gửi mã số xác thực gồm 6 chữ số đến số điện thoại này.
                                    </p>
                                </div>

                                <button
                                    className="w-full h-11 !mt-1 bg-primary text-on-primary hover:bg-primary-container active:opacity-90 !rounded-lg font-label-lg text-label-lg tracking-wide uppercase transition-all shadow-sm flex items-center justify-center !gap-2 cursor-pointer font-bold border-none"
                                    type="submit"
                                >
                                    <span>TIẾP TỤC &amp; GỬI MÃ OTP</span>
                                    <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
                                </button>
                            </form>
                        )}

                        {/* GIAO DIỆN BƯỚC 2: Nhập OTP & Đặt mật khẩu mới (Chuẩn theo TaskCode.md) */}
                        {currentStep === 2 && (
                            <>
                                {/* 4. Hộp thông báo SMS đã gửi */}
                                <div className="!mx-4 !mt-4 !p-3.5 bg-surface-container-low !rounded-xl flex items-start !gap-3 border border-outline-variant/20">
                                    <div className="w-8 h-8 !rounded-lg bg-surface-container-high text-secondary flex items-center justify-center shrink-0 !mt-0.5">
                                        <span className="material-symbols-outlined text-[18px]">sms</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wide">
                                                Thông báo hệ thống
                                            </span>
                                            <button
                                                className="font-label-sm text-label-sm text-secondary underline bg-transparent border-none p-0 cursor-pointer"
                                                onClick={() => setCurrentStep(1)}
                                                type="button"
                                            >
                                                Đổi SĐT
                                            </button>
                                        </div>
                                        <p className="font-body-sm text-body-sm text-on-surface !mt-0.5 leading-snug">
                                            Mã xác nhận bảo mật đã được gửi về số điện thoại{" "}
                                            <span className="font-code-tabular text-code-tabular font-bold text-primary">
                                                {maskedPhone}
                                            </span>{" "}
                                            qua tin nhắn SMS.
                                        </p>
                                    </div>
                                </div>

                                {/* 5. Khối form OTP & Mật khẩu mới */}
                                <form
                                    className="!mx-4 !mt-4 !p-4 bg-surface-container-lowest !rounded-xl shadow-sm flex flex-col !gap-4 border border-outline-variant/20"
                                    onSubmit={handleResetPassword}
                                >
                                    {/* Nhập mã OTP 6 chữ số */}
                                    <div>
                                        <div className="flex items-center justify-between !mb-2">
                                            <label className="font-label-md text-label-md text-primary flex items-center !gap-1.5 font-bold">
                                                <span className="material-symbols-outlined text-[18px] text-secondary">
                                                    pin
                                                </span>
                                                Nhập mã OTP 6 chữ số
                                            </label>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                                                Bảo mật cấp 2
                                            </span>
                                        </div>

                                        {/* 6 ô nhập mã OTP */}
                                        <div
                                            className="flex items-center justify-between !gap-1.5 w-full max-w-[340px] !mx-auto !py-1"
                                            id="otp-container"
                                        >
                                            {otp.map((digit, idx) => (
                                                <input
                                                    key={idx}
                                                    ref={el => {
                                                        inputRefs.current[idx] = el
                                                    }}
                                                    className="w-11 h-12 text-center font-headline-sm text-headline-sm font-code-tabular bg-surface-container-low text-primary !rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary outline-none transition-all font-bold border border-outline-variant/30"
                                                    inputMode="numeric"
                                                    maxLength={idx === 0 ? 6 : 1}
                                                    pattern="[0-9]*"
                                                    placeholder={digit ? "" : "•"}
                                                    type="text"
                                                    value={digit}
                                                    onChange={e => handleOtpChange(idx, e)}
                                                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                                                    onFocus={e => e.target.select()}
                                                />
                                            ))}
                                        </div>

                                        {/* Đếm ngược thời gian OTP & Gửi lại */}
                                        <div className="flex items-center justify-center !gap-1.5 !mt-2.5">
                                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                                                history
                                            </span>
                                            {isCountdownActive && timeLeft > 0 ? (
                                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                                    Gửi lại mã sau{" "}
                                                    <span
                                                        className="font-code-tabular text-code-tabular font-bold text-on-surface-variant"
                                                        id="countdown-timer"
                                                    >
                                                        ({timeLeft}s)
                                                    </span>
                                                </span>
                                            ) : (
                                                <button
                                                    className="font-label-sm text-label-sm text-secondary hover:underline font-bold !ml-1 bg-transparent border-none cursor-pointer"
                                                    id="resend-btn"
                                                    onClick={handleResendOtp}
                                                    type="button"
                                                >
                                                    Gửi lại ngay
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Đường ngăn cách */}
                                    <div className="h-[1px] bg-surface-container-high w-full !my-0.5"></div>

                                    {/* Cụm trường mật khẩu mới */}
                                    <div className="flex flex-col !gap-3">
                                        {/* Mật khẩu mới */}
                                        <div>
                                            <label
                                                className="block font-label-md text-label-md text-primary font-semibold !mb-1"
                                                htmlFor="new-password"
                                            >
                                                Mật khẩu mới
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    className="w-full h-11 !px-3 !pr-10 font-body-md text-body-md bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 !rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary outline-none transition-all font-medium border border-outline-variant/30"
                                                    id="new-password"
                                                    placeholder="Tối thiểu 8 ký tự kèm chữ &amp; số"
                                                    required
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                />
                                                <button
                                                    className="absolute right-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center"
                                                    onClick={() => setShowNewPassword(prev => !prev)}
                                                    type="button"
                                                    aria-label="Ẩn hoặc hiện mật khẩu mới"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        {showNewPassword ? "visibility_off" : "visibility"}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Xác nhận mật khẩu mới */}
                                        <div>
                                            <label
                                                className="block font-label-md text-label-md text-primary font-semibold !mb-1"
                                                htmlFor="confirm-password"
                                            >
                                                Xác nhận mật khẩu mới
                                            </label>
                                            <div className="relative flex items-center">
                                                <input
                                                    className="w-full h-11 !px-3 !pr-10 font-body-md text-body-md bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 !rounded-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary outline-none transition-all font-medium border border-outline-variant/30"
                                                    id="confirm-password"
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    required
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                />
                                                <button
                                                    className="absolute right-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 flex items-center"
                                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                                    type="button"
                                                    aria-label="Ẩn hoặc hiện xác nhận mật khẩu mới"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        {showConfirmPassword ? "visibility_off" : "visibility"}
                                                    </span>
                                                </button>
                                            </div>
                                            {confirmPassword.length > 0 && !passwordValidation.isMatch && (
                                                <p className="font-body-sm text-body-sm text-error !mt-1 flex items-center gap-1 font-medium">
                                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                                    <span>Mật khẩu xác nhận chưa khớp</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Hộp gợi ý tiêu chuẩn bảo mật mật khẩu */}
                                        <div className="!p-2.5 bg-surface-container-low !rounded-lg flex items-center !gap-2 border border-outline-variant/20">
                                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
                                                shield
                                            </span>
                                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                                                Mật khẩu yêu cầu ít nhất 1 chữ hoa, 1 chữ thường và 1 số
                                            </span>
                                        </div>
                                    </div>

                                    {/* Nút Submit cập nhật mật khẩu */}
                                    <button
                                        className="w-full h-11 !mt-1 bg-primary text-on-primary hover:bg-primary-container active:opacity-90 !rounded-lg font-label-lg text-label-lg tracking-wide uppercase transition-all shadow-sm flex items-center justify-center !gap-2 cursor-pointer font-bold border-none disabled:opacity-75"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-[19px]">
                                                    progress_activity
                                                </span>
                                                <span>ĐANG XỬ LÝ...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-[19px]">lock_reset</span>
                                                <span>LƯU MẬT KHẨU MỚI &amp; ĐĂNG NHẬP</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}

                        {/* 6. Hộp Hotline hỗ trợ kỹ thuật trực ban */}
                        <div className="!mx-4 !mt-4 !p-3 bg-surface-container-lowest !rounded-xl shadow-sm flex items-center justify-between border border-outline-variant/20">
                            <div className="flex items-center !gap-2.5">
                                <div className="w-9 h-9 !rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                </div>
                                <div>
                                    <div className="font-label-sm text-label-sm font-bold text-primary">
                                        Hotline hỗ trợ kỹ thuật trực ban
                                    </div>
                                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                                        Nhánh 1: Hỗ trợ người dân (24/7)
                                    </div>
                                </div>
                            </div>
                            <a
                                className="!px-3 !py-1.5 bg-surface-container text-primary !rounded-lg font-code-tabular text-code-tabular font-bold hover:bg-surface-container-high transition-colors text-right shrink-0 no-underline cursor-pointer"
                                href="tel:1900xxxx"
                            >
                                1900 xxxx
                            </a>
                        </div>

                        {/* 7. Dòng thông tin chứng chỉ chân trang */}
                        <div className="!mt-4 !px-4 text-center">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                                Cổng thông tin phản ánh hiện trường &amp; tiếp nhận ý kiến công dân điện tử
                            </span>
                        </div>
                    </div>
                </main>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={2500}
                    position="top"
                    className="text-[12px] font-label-md"
                />
            </IonContent>
        </IonPage>
    )
}

export default ForgotPassword

