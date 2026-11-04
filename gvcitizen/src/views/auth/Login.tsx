import type React from "react"
import { useState } from "react"
import { useIonRouter, IonPage, IonContent, IonToast } from "@ionic/react"

// Image
import GovReportLogo from "../../assets/govReport.png"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type { LoginFormValues } from "./auth.type"

const Login: React.FC = () => {
    const router = useIonRouter()

    const [formValues, setFormValues] = useState<LoginFormValues>({
        identifier: "",
        password: "",
        rememberMe: false,
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVNeIdLoading, setIsVNeIdLoading] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    const handleChange = (field: keyof LoginFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

        setFormValues(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev)

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formValues.identifier.trim()) {
            setToastMessage("Vui lòng nhập số điện thoại hoặc email đã đăng ký")
            setShowToast(true)
            return
        }

        if (!formValues.password) {
            setToastMessage("Vui lòng nhập mật khẩu an toàn")
            setShowToast(true)
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setToastMessage("Đăng nhập thành công! Đang chuyển hướng...")
            setShowToast(true)

            setTimeout(() => {
                router.push(ROUTES.HOME, "root", "replace")
            }, 400)
        }, 700)
    }

    const handleVNeIdLogin = () => {
        setIsVNeIdLoading(true)
        setToastMessage("Đang kết nối xác thực tài khoản định danh điện tử VNeID Mức 2...")
        setShowToast(true)

        setTimeout(() => {
            setIsVNeIdLoading(false)
            router.push(ROUTES.HOME, "root", "replace")
        }, 1200)
    }

    const handleAnonymousReport = () => {
        setToastMessage("Chuyển sang chế độ phản ánh sự cố ẩn danh...")
        setShowToast(true)

        setTimeout(() => {
            router.push(ROUTES.ANONYMOUS_REPORT, "forward", "push")
        }, 300)
    }

    const handleRegister = () => {
        router.push(ROUTES.REGISTER, "forward", "push")

    }

    const handleForgotPassword = () => {
        router.push(ROUTES.FORGOT_PASSWORD, "forward", "push")

    }


    return (
        <IonPage className="bg-surface font-body-md text-on-surface">
            <IonContent fullscreen className="ion-no-padding">
                <main className="flex-1 flex flex-col relative w-full bg-surface min-h-screen pt-safe pb-safe">
                    <div className="flex flex-col w-full !px-margin !pb-space-lg !pt-space-md max-w-md mx-auto">
                        {/* Brand / Architectural Civic Identity Header */}
                        <div className="flex flex-col items-center text-center !mt-space-sm !mb-space-lg">
                            {/* Official System Logo */}
                            <div className="relative w-20 h-20 !mb-space-sm flex items-center justify-center">
                                <img
                                    src={GovReportLogo}
                                    alt="GovReport Logo"
                                    className="w-full h-full object-contain drop-shadow-sm select-none"
                                />
                            </div>

                            {/* System Badge */}
                            <div className="inline-flex items-center !gap-1.5 !px-2.5 !py-0.5 !mb-space-xs !rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase">
                                <span className="w-1.5 h-1.5 !rounded-full bg-secondary"></span>
                                Cổng Dịch Vụ Công Đô Thị Số
                            </div>

                            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
                                Đăng nhập tài khoản công dân
                            </h1>

                            <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1 max-w-xs">
                                Theo dõi tiến độ xử lý và đồng hành cùng đô thị văn minh
                            </p>
                        </div>

                        {/* Operational Input Matrix */}
                        <form className="flex flex-col !gap-space-md w-full" onSubmit={handleSubmit}>
                            {/* Field 1: Phone / Email */}
                            <div className="flex flex-col !gap-1.5">
                                <label className="font-label-md text-label-md text-on-surface flex items-center !gap-1.5" htmlFor="identifier">
                                    <span>Số điện thoại hoặc Email</span>
                                </label>
                                <div className="relative flex items-center bg-surface-container-lowest !rounded-lg shadow-sm">
                                    <span className="material-symbols-outlined text-outline absolute left-3 pointer-events-none text-[20px]">
                                        alternate_email
                                    </span>
                                    <input
                                        className="w-full h-11 !pl-10 !pr-3 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none !rounded-lg"
                                        id="identifier"
                                        placeholder="Nhập SĐT hoặc email đã đăng ký"
                                        required
                                        type="text"
                                        value={formValues.identifier}
                                        onChange={handleChange("identifier")}
                                    />
                                </div>
                            </div>

                            {/* Field 2: Password */}
                            <div className="flex flex-col !gap-1.5">
                                <label className="font-label-md text-label-md text-on-surface flex items-center !gap-1.5" htmlFor="password">
                                    <span>Mật khẩu</span>
                                </label>
                                <div className="relative flex items-center bg-surface-container-lowest !rounded-lg shadow-sm">
                                    <span className="material-symbols-outlined text-outline absolute left-3 pointer-events-none text-[20px]">
                                        lock
                                    </span>
                                    <input
                                        className="w-full h-11 !pl-10 !pr-11 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none !rounded-lg"
                                        id="password"
                                        placeholder="Nhập mật khẩu an toàn"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={formValues.password}
                                        onChange={handleChange("password")}
                                    />
                                    <button
                                        aria-label="Ẩn hoặc hiện mật khẩu"
                                        className="absolute right-0 top-0 bottom-0 !px-3 flex items-center justify-center text-outline hover:text-on-surface transition-colors cursor-pointer"
                                        id="togglePasswordBtn"
                                        type="button"
                                        onClick={handleTogglePassword}
                                    >
                                        <span className="material-symbols-outlined text-[20px]" id="passwordEyeIcon">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Contextual Controls: Remember & Recovery */}
                            <div className="flex items-center justify-between !pt-0.5">
                                <label className="flex items-center !gap-2 cursor-pointer select-none">
                                    <input
                                        className="w-4 h-4 !rounded text-secondary focus:ring-0 focus:outline-none bg-surface-container-high border-none cursor-pointer"
                                        id="rememberMe"
                                        type="checkbox"
                                        checked={formValues.rememberMe}
                                        onChange={handleChange("rememberMe")}
                                    />
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Ghi nhớ đăng nhập</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="font-label-md text-label-md text-secondary hover:underline cursor-pointer bg-transparent border-none !p-0"
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>

                            {/* Primary Affirmative Action: 44px Operational Navy CTA */}
                            <button
                                className="w-full h-11 bg-primary-container active:bg-primary text-on-primary font-label-lg text-label-lg tracking-wider !rounded-xl uppercase flex items-center justify-center !gap-2 shadow-sm transition-colors !mt-1 cursor-pointer disabled:opacity-75"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white !rounded-full animate-spin"></span>
                                        <span>ĐANG XỬ LÝ...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>ĐĂNG NHẬP</span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Structural Visual Divider */}
                        <div className="relative flex items-center justify-center !my-space-md">
                            <div className="w-full h-px bg-surface-container-highest"></div>
                            <span className="absolute bg-surface !px-3 font-label-sm text-label-sm text-outline uppercase tracking-wider">
                                HOẶC
                            </span>
                        </div>

                        {/* National Digital Identity Dispatch: VNeID Quick Auth */}
                        <button
                            className="w-full bg-surface-container-lowest active:bg-surface-container-low !rounded-xl !p-3 flex items-center justify-between shadow-sm transition-colors group cursor-pointer disabled:opacity-75"
                            type="button"
                            onClick={handleVNeIdLogin}
                            disabled={isVNeIdLoading}
                        >
                            <div className="flex items-center !gap-3">
                                {/* VNeID Emblem Badge */}
                                <div className="w-9 h-9 !rounded-lg bg-error flex items-center justify-center text-on-error shrink-0">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FACC15"></path>
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-label-lg text-label-lg text-on-surface flex items-center !gap-1.5">
                                        Đăng nhập bằng VNeID
                                    </span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                                        Xác thực nhanh Mức 2 (Định danh điện tử)
                                    </span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-secondary text-[22px] transition-colors">
                                chevron_right
                            </span>
                        </button>

                        {/* Urgent / Anonymous Incident Fast-Path */}
                        <div className="!mt-space-md !p-3 !rounded-xl bg-surface-container flex items-center justify-between">
                            <div className="flex items-center !gap-2.5">
                                <div className="w-7 h-7 !rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-label-sm text-label-sm text-on-surface uppercase">Phản ánh sự cố gấp</span>
                                    <button
                                        type="button"
                                        onClick={handleAnonymousReport}
                                        className="font-label-md text-label-md text-secondary underline font-semibold flex items-center !gap-1 bg-transparent border-none !p-0 cursor-pointer text-left"
                                    >
                                        <span>Tiếp tục với tư cách Khách (Báo cáo ẩn danh)</span>
                                    </button>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-secondary text-[20px]">visibility_off</span>
                        </div>

                        {/* Operational Footer & Legal Certifications */}
                        <div className="flex flex-col items-center text-center !mt-space-lg !gap-space-xs">
                            <div className="font-body-md text-body-md text-on-surface-variant">
                                Chưa có tài khoản?
                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="text-secondary font-label-lg text-label-lg !ml-1 hover:underline bg-transparent border-none !p-0 cursor-pointer"
                                >
                                    Đăng ký ngay
                                </button>
                            </div>

                            {/* Security Tier Badge */}
                            <div className="inline-flex items-center !gap-1.5 !px-3 !py-1 !rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm !mt-1">
                                <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
                                <span>Hệ thống an toàn thông tin Cấp độ 3 theo tiêu chuẩn Nhà nước</span>
                            </div>
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

export default Login
