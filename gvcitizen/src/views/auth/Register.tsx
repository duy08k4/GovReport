import type React from "react"
import { useState, useMemo } from "react"
import { useIonRouter, IonPage, IonContent, IonToast } from "@ionic/react"

// Image
import GovReportLogo from "../../assets/govReport.png"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type { RegisterFormValues } from "./auth.type"

const Register: React.FC = () => {
    const router = useIonRouter()

    const [formValues, setFormValues] = useState<RegisterFormValues>({
        name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    })

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isVNeIdLoading, setIsVNeIdLoading] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    // Password strength calculation
    const passwordStrength = useMemo(() => {
        const val = formValues.password

        if (!val) {
            return {
                score: 0,
                label: "Độ mạnh",
                textClass: "text-outline",
            }
        }

        let score = 0
        if (val.length >= 8) score++
        if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) score++
        if (/[^A-Za-z0-9]/.test(val) || val.length >= 12) score++

        if (score === 1) {
            return {
                score: 1,
                label: "Yếu",
                textClass: "text-error",
            }
        }

        if (score === 2) {
            return {
                score: 2,
                label: "Trung bình",
                textClass: "text-secondary",
            }
        }

        return {
            score: 3,
            label: "Mạnh",
            textClass: "text-on-tertiary-container font-semibold",
        }
    }, [formValues.password])

    // Password match check
    const isPasswordMatch = useMemo(() => {
        if (!formValues.confirmPassword) {
            return null
        }

        return formValues.password === formValues.confirmPassword
    }, [formValues.password, formValues.confirmPassword])

    const handleChange = (field: keyof RegisterFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

        setFormValues(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleBackToLogin = () => {
        router.push(ROUTES.LOGIN, "back", "pop")

    }

    const handleVNeIdQuickRegister = () => {
        setIsVNeIdLoading(true)
        setToastMessage("Đang kết nối Cơ sở dữ liệu định danh điện tử VNeID Mức 2...")
        setShowToast(true)

        setTimeout(() => {
            setIsVNeIdLoading(false)
            setToastMessage("Đã trích xuất thông tin CCCD định danh thành công! Vui lòng kiểm tra lại.")
            setShowToast(true)

            setFormValues(prev => ({
                ...prev,
                name: "Nguyễn Văn An",
                phone: "0912345678",
                address: "Số 42 Tràng Tiền, Hoàn Kiếm, Hà Nội",
            }))
        }, 1200)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formValues.name.trim()) {
            setToastMessage("Vui lòng nhập họ và tên công dân")
            setShowToast(true)
            return
        }

        if (!formValues.phone.trim()) {
            setToastMessage("Vui lòng nhập số điện thoại liên lạc")
            setShowToast(true)
            return
        }

        if (!formValues.address.trim()) {
            setToastMessage("Vui lòng nhập địa chỉ nơi cư trú")
            setShowToast(true)
            return
        }

        if (formValues.password.length < 8) {
            setToastMessage("Mật khẩu phải có tối thiểu 8 ký tự, bao gồm số và chữ")
            setShowToast(true)
            return
        }

        if (formValues.password !== formValues.confirmPassword) {
            setToastMessage("Mật khẩu nhập lại chưa khớp")
            setShowToast(true)
            return
        }

        if (!formValues.agreeTerms) {
            setToastMessage("Vui lòng xác nhận cam kết cung cấp thông tin trung thực")
            setShowToast(true)
            return
        }

        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            setToastMessage("Đã gửi mã OTP xác thực qua số điện thoại " + formValues.phone)
            setShowToast(true)

            setTimeout(() => {
                router.push(ROUTES.LOGIN, "root", "replace")
            }, 1000)
        }, 1200)
    }


    return (
        <IonPage className="bg-surface font-body-md text-on-surface">
            <IonContent fullscreen className="ion-no-padding">
                <main className="flex-1 flex flex-col relative w-full bg-surface min-h-screen pt-safe pb-safe">
                    <div className="flex flex-col w-full !pb-8 max-w-md mx-auto">
                        {/* 1. Nút quay lại Đăng nhập */}
                        <div className="!px-4 !pt-4 !pb-2">
                            <button
                                className="inline-flex items-center !gap-1.5 !py-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-secondary !rounded cursor-pointer bg-transparent border-none"
                                onClick={handleBackToLogin}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                <span className="font-label-md text-label-md font-medium">Quay lại Đăng nhập</span>
                            </button>
                        </div>

                        {/* 2. Tiêu đề và biểu tượng nhận diện Cổng dịch vụ công dân */}
                        <div className="!px-4 !pt-2 !pb-4">
                            <div className="flex items-center !gap-2 !mb-2">
                                <span className="inline-flex items-center justify-center w-6 h-6 !rounded bg-primary text-on-primary">
                                    <img
                                        src={GovReportLogo}
                                        alt="GovReport Logo"
                                        className="w-4 h-4 object-contain"
                                    />
                                </span>
                                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                                    Cổng Dịch Vụ Công Dân
                                </span>
                            </div>
                            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
                                Đăng Ký Tài Khoản Mới
                            </h1>
                            <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1.5 leading-relaxed">
                                Tạo tài khoản để nhận thông báo trực tiếp khi sự cố bạn báo cáo được khắc phục.
                            </p>
                        </div>

                        {/* 3. Thẻ Đăng ký nhanh bằng VNeID */}
                        <div className="!px-4 !mb-4">
                            <button
                                className="w-full bg-surface-container-high hover:bg-surface-container-highest transition-colors !rounded-xl !p-3 flex items-center justify-between text-left group cursor-pointer border border-outline-variant/30 disabled:opacity-75"
                                type="button"
                                onClick={handleVNeIdQuickRegister}
                                disabled={isVNeIdLoading}
                            >
                                <div className="flex items-center !gap-3">
                                    <div className="w-9 h-9 !rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            badge
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors font-semibold">
                                            Đăng ký nhanh bằng VNeID
                                        </div>
                                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                                            Tự động điền dữ liệu định danh CCCD
                                        </div>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                                    chevron_right
                                </span>
                            </button>
                        </div>

                        {/* 4. Vạch phân cách */}
                        <div className="!px-4 flex items-center !gap-3 !mb-4">
                            <div className="flex-1 h-px bg-surface-container-high"></div>
                            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-medium">
                                Hoặc nhập thủ công
                            </span>
                            <div className="flex-1 h-px bg-surface-container-high"></div>
                        </div>

                        {/* 5. Form đăng ký tài khoản công dân */}
                        <form className="!px-4 flex flex-col !gap-3.5" id="registerForm" onSubmit={handleSubmit}>
                            {/* Họ và tên công dân */}
                            <div>
                                <label className="block font-label-md text-label-md text-on-surface !mb-1 font-medium" htmlFor="fullName">
                                    Họ và tên công dân <span className="text-error">*</span>
                                </label>
                                <div className="relative bg-surface-container-lowest !rounded-lg border border-outline-variant/40 shadow-xs">
                                    <input
                                        className="w-full h-10 !px-3 bg-transparent text-on-surface font-body-md text-body-md !rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder:text-outline font-medium"
                                        id="fullName"
                                        name="name"
                                        placeholder="Ví dụ: Nguyễn Văn An"
                                        required
                                        type="text"
                                        value={formValues.name}
                                        onChange={handleChange("name")}
                                    />
                                </div>
                            </div>

                            {/* Số điện thoại liên lạc */}
                            <div>
                                <div className="flex items-center justify-between !mb-1">
                                    <label className="block font-label-md text-label-md text-on-surface font-medium" htmlFor="phoneNumber">
                                        Số điện thoại liên lạc <span className="text-error">*</span>
                                    </label>
                                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                                        Nhận mã xác thực OTP
                                    </span>
                                </div>
                                <div className="relative bg-surface-container-lowest !rounded-lg border border-outline-variant/40 flex items-center shadow-xs">
                                    <span className="!pl-3 !pr-2 text-on-surface-variant font-code-tabular text-code-tabular shrink-0 select-none font-semibold">
                                        +84
                                    </span>
                                    <div className="w-px h-4 bg-surface-container-high !mr-2"></div>
                                    <input
                                        className="w-full h-10 !pr-3 bg-transparent text-on-surface font-code-tabular text-body-md !rounded-lg focus:outline-none placeholder:text-outline font-medium"
                                        id="phoneNumber"
                                        name="phone"
                                        pattern="[0-9]{9,11}"
                                        placeholder="0912 345 678"
                                        required
                                        type="tel"
                                        value={formValues.phone}
                                        onChange={handleChange("phone")}
                                    />
                                </div>
                            </div>

                            {/* Địa chỉ email */}
                            <div>
                                <div className="flex items-center justify-between !mb-1">
                                    <label className="block font-label-md text-label-md text-on-surface font-medium" htmlFor="email">
                                        Địa chỉ email
                                    </label>
                                    <span className="font-body-sm text-body-sm text-outline">Tùy chọn</span>
                                </div>
                                <div className="relative bg-surface-container-lowest !rounded-lg border border-outline-variant/40 shadow-xs">
                                    <input
                                        className="w-full h-10 !px-3 bg-transparent text-on-surface font-body-md text-body-md !rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder:text-outline"
                                        id="email"
                                        name="email"
                                        placeholder="nhanbannghiemthu@domain.vn"
                                        type="email"
                                        value={formValues.email}
                                        onChange={handleChange("email")}
                                    />
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1">
                                    Dùng để nhận báo cáo nghiệm thu và biên bản số hoá.
                                </p>
                            </div>

                            {/* Địa chỉ nơi cư trú */}
                            <div>
                                <label className="block font-label-md text-label-md text-on-surface !mb-1 font-medium" htmlFor="address">
                                    Địa chỉ nơi cư trú <span className="text-error">*</span>
                                </label>
                                <div className="relative bg-surface-container-lowest !rounded-lg border border-outline-variant/40 shadow-xs flex items-center">
                                    <div className="absolute inset-y-0 left-0 !pl-2.5 flex items-center pointer-events-none text-outline">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    </div>
                                    <input
                                        className="w-full h-10 !pl-9 !pr-3 bg-transparent text-on-surface font-body-md text-body-md !rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 placeholder:text-outline font-medium"
                                        id="address"
                                        name="address"
                                        placeholder="Số nhà, ngõ/đường, Phường/Xã"
                                        required
                                        type="text"
                                        value={formValues.address}
                                        onChange={handleChange("address")}
                                    />
                                </div>
                            </div>

                            {/* Mật khẩu khởi tạo */}
                            <div>
                                <div className="flex items-center justify-between !mb-1">
                                    <label className="block font-label-md text-label-md text-on-surface font-medium" htmlFor="password">
                                        Mật khẩu khởi tạo <span className="text-error">*</span>
                                    </label>
                                    <span className={`font-label-sm text-label-sm ${passwordStrength.textClass}`} id="strengthText">
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <div className="relative bg-surface-container-lowest !rounded-lg border border-outline-variant/40 flex items-center shadow-xs">
                                    <input
                                        className="w-full h-10 !pl-3 !pr-10 bg-transparent text-on-surface font-body-md text-body-md !rounded-lg focus:outline-none placeholder:text-outline"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={formValues.password}
                                        onChange={handleChange("password")}
                                    />
                                    <button
                                        className="absolute right-0 top-0 bottom-0 !px-2.5 flex items-center text-outline hover:text-on-surface focus:outline-none cursor-pointer bg-transparent border-none"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        type="button"
                                        aria-label="Ẩn hoặc hiện mật khẩu"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>

                                {/* Thước đo độ mạnh mật khẩu */}
                                <div className="grid grid-cols-3 !gap-1.5 !mt-1.5" id="strengthMeter">
                                    <div
                                        className={`h-1 !rounded transition-colors ${
                                            passwordStrength.score >= 1
                                                ? passwordStrength.score === 1
                                                    ? "bg-error"
                                                    : passwordStrength.score === 2
                                                    ? "bg-secondary"
                                                    : "bg-on-tertiary-container"
                                                : "bg-surface-container-highest"
                                        }`}
                                    />
                                    <div
                                        className={`h-1 !rounded transition-colors ${
                                            passwordStrength.score >= 2
                                                ? passwordStrength.score === 2
                                                    ? "bg-secondary"
                                                    : "bg-on-tertiary-container"
                                                : "bg-surface-container-highest"
                                        }`}
                                    />
                                    <div
                                        className={`h-1 !rounded transition-colors ${
                                            passwordStrength.score >= 3
                                                ? "bg-on-tertiary-container"
                                                : "bg-surface-container-highest"
                                        }`}
                                    />
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1">
                                    Tối thiểu 8 ký tự, có số và chữ
                                </p>
                            </div>

                            {/* Nhập lại mật khẩu */}
                            <div>
                                <label className="block font-label-md text-label-md text-on-surface !mb-1 font-medium" htmlFor="confirmPassword">
                                    Nhập lại mật khẩu <span className="text-error">*</span>
                                </label>
                                <div className="relative bg-surface-container-lowest !rounded-lg border border-outline-variant/40 flex items-center shadow-xs">
                                    <input
                                        className="w-full h-10 !pl-3 !pr-10 bg-transparent text-on-surface font-body-md text-body-md !rounded-lg focus:outline-none placeholder:text-outline"
                                        id="confirmPassword"
                                        name="confirm_password"
                                        placeholder="••••••••"
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formValues.confirmPassword}
                                        onChange={handleChange("confirmPassword")}
                                    />
                                    <button
                                        className="absolute right-0 top-0 bottom-0 !px-2.5 flex items-center text-outline hover:text-on-surface focus:outline-none cursor-pointer bg-transparent border-none"
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        type="button"
                                        aria-label="Ẩn hoặc hiện mật khẩu xác nhận"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showConfirmPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                    {isPasswordMatch === true && (
                                        <div className="absolute right-9 flex items-center pointer-events-none">
                                            <span
                                                className="material-symbols-outlined text-[18px] text-on-tertiary-container transition-opacity"
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                check_circle
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {isPasswordMatch === false && (
                                    <div className="font-body-sm text-body-sm text-error !mt-1 flex items-center gap-1 font-medium">
                                        <span className="material-symbols-outlined text-[14px]">error</span>
                                        <span>Mật khẩu nhập lại chưa khớp</span>
                                    </div>
                                )}
                            </div>

                            {/* Cam kết pháp lý */}
                            <div className="!pt-1">
                                <label className="flex items-start !gap-2.5 cursor-pointer">
                                    <input
                                        className="!mt-1 h-4 w-4 !rounded accent-primary-container text-on-primary focus:ring-0 focus:outline-none cursor-pointer"
                                        id="termsCheckbox"
                                        required
                                        type="checkbox"
                                        checked={formValues.agreeTerms}
                                        onChange={handleChange("agreeTerms")}
                                    />
                                    <span className="font-body-sm text-body-sm text-on-surface leading-snug select-none">
                                        Tôi cam kết cung cấp thông tin sự cố trung thực, chính xác và chịu trách nhiệm trước quy định pháp luật.
                                    </span>
                                </label>
                            </div>

                            {/* Nút Submit CTA */}
                            <div className="!pt-2">
                                <button
                                    className="w-full h-11 bg-primary-container hover:bg-on-primary-fixed text-on-primary font-label-lg text-label-lg tracking-wide !rounded-xl uppercase flex items-center justify-center !gap-2 transition-colors active:bg-primary shadow-sm cursor-pointer disabled:opacity-75 font-bold"
                                    id="submitBtn"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-[18px]">
                                                progress_activity
                                            </span>
                                            <span>Đang xử lý OTP...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Tạo Tài Khoản Và Xác Thực</span>
                                            <span className="material-symbols-outlined text-[18px]">verified</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* 6. Liên kết Đăng nhập ngay */}
                        <div className="!px-4 !mt-6 text-center">
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Đã có tài khoản?{" "}
                                <button
                                    className="font-label-lg text-label-lg text-secondary underline decoration-1 underline-offset-2 hover:text-on-secondary-fixed-variant bg-transparent border-none p-0 cursor-pointer font-semibold"
                                    onClick={handleBackToLogin}
                                    type="button"
                                >
                                    Đăng nhập ngay
                                </button>
                            </p>
                        </div>

                        {/* 7. Huy hiệu An toàn & Bảo mật 256-bit */}
                        <div className="!px-4 !mt-6">
                            <div className="bg-surface-container-low !rounded-xl !p-3 text-center border border-outline-variant/20">
                                <div className="flex items-center justify-center !gap-1.5 text-secondary !mb-1">
                                    <span className="material-symbols-outlined text-[16px]">security</span>
                                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                                        An toàn &amp; Bảo mật 256-bit
                                    </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-outline">
                                    Hệ thống tiếp nhận phản ánh hiện trường thuộc khung Giám sát Đô thị Thông minh theo tiêu chuẩn hành chính công.
                                </p>
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

export default Register

