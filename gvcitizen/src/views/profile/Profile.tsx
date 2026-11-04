import type React from "react"
import { useState } from "react"
import { useIonRouter, IonToast, IonModal } from "@ionic/react"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type {
    CitizenProfileData,
    CivicImpactStats,
    EmergencyContactItem,
    SlaStandardItem,
} from "./profile.type"

const DEFAULT_PROFILE: CitizenProfileData = {
    fullName: "Nguyễn Văn An",
    phoneNumber: "0988.***.892",
    email: "an.nguyen@email.com",
    avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCFRW50o4H-V6Jg_U00CzFxET5LnkR6m9nftFLbSKMKWFx2KUNiz6aKSXUR1JFSvoYnXRScf4dY0vb0Po2namPFsqyQiHibClBg5d5pTUNNibIC_rhevN_bCrdbwhQOM9S98zkbxupev38EtlnDxtuJ9R2GfcNpqY0DiS5YFrNfiM9wHLtZhMMnjXbD7f5stRTf_kMeMYAfDcOLtzpx7dtVLqfPK1rkzkLJGsdeP7mRm9GDWrW0hjA",
    avatarAlt:
        "Chân dung nghiêm túc, ấm áp của một công dân nam trẻ tuổi người Việt Nam mặc áo sơ mi công sở sáng màu, phông nền trung tính hiện đại.",
    vneidVerified: true,
    vneidLevel: 2,
    cccdMasked: "001095******",
    address: "P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội",
}

const DEFAULT_STATS: CivicImpactStats = {
    level: 3,
    levelLabel: "Cấp độ 3",
    honorBadgeTitle: "Công dân tích cực Đô thị số",
    totalSubmitted: 12,
    totalResolved: 11,
    successRate: 91.6,
}

const EMERGENCY_CONTACTS: EmergencyContactItem[] = [
    {
        id: "113",
        number: "113",
        name: "Cảnh sát phản ứng nhanh",
        description: "An ninh, trật tự công cộng và tội phạm",
        icon: "local_police",
        colorClass: "text-[#0284c7] bg-[#e0f2fe]",
    },
    {
        id: "114",
        number: "114",
        name: "Cứu hỏa & Cứu hộ cứu nạn",
        description: "Hỏa hoạn, cháy nổ, mắc kẹt, sự cố hiểm họa",
        icon: "local_fire_department",
        colorClass: "text-[#dc2626] bg-[#fee2e2]",
    },
    {
        id: "115",
        number: "115",
        name: "Cấp cứu y tế khẩn cấp",
        description: "Tai nạn giao thông, chấn thương, đột quỵ",
        icon: "emergency",
        colorClass: "text-[#ea580c] bg-[#ffedd5]",
    },
    {
        id: "1022",
        number: "1022",
        name: "Tổng đài IOC Tiếp nhận Phản ánh",
        description: "Hạ tầng kỹ thuật, môi trường, trật tự đô thị",
        icon: "support_agent",
        colorClass: "text-[#059669] bg-[#d1fae5]",
    },
]

const SLA_STANDARDS: SlaStandardItem[] = [
    {
        id: "sla-1",
        category: "Khẩn cấp & An toàn tính mạng",
        maxResponseHours: "Dưới 2 giờ",
        resolutionTarget: "Điều động lực lượng hiện trường ngay",
        icon: "warning",
    },
    {
        id: "sla-2",
        category: "Hạ tầng kỹ thuật & Ngập úng",
        maxResponseHours: "Dưới 12 giờ",
        resolutionTarget: "Tiếp nhận và bố trí khắc phục kỹ thuật",
        icon: "handyman",
    },
    {
        id: "sla-3",
        category: "Môi trường & Vệ sinh đô thị",
        maxResponseHours: "Dưới 24 giờ",
        resolutionTarget: "Công ty Môi trường Đô thị thu gom xử lý",
        icon: "delete_sweep",
    },
    {
        id: "sla-4",
        category: "Trật tự vỉa hè & Giao thông",
        maxResponseHours: "Dưới 48 giờ",
        resolutionTarget: "Tổ trật tự đô thị phường kiểm tra xử lý",
        icon: "traffic",
    },
]

const Profile: React.FC = () => {
    const router = useIonRouter()

    // Interactive settings state
    const [pushNotificationEnabled, setPushNotificationEnabled] = useState<boolean>(true)
    const [anonymousModeEnabled, setAnonymousModeEnabled] = useState<boolean>(false)

    // Toast state
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    // Modal sheets
    const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false)
    const [showSlaModal, setShowSlaModal] = useState<boolean>(false)
    const [showTermsModal, setShowTermsModal] = useState<boolean>(false)
    const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false)
    const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState<boolean>(false)

    // Handlers
    const handleTogglePushNotifications = () => {
        const nextState = !pushNotificationEnabled
        setPushNotificationEnabled(nextState)
        setToastMessage(
            nextState
                ? "Đã kích hoạt thông báo đẩy thời gian thực từ IOC."
                : "Đã tạm dừng thông báo đẩy thời gian thực."
        )
        setShowToast(true)
    }

    const handleToggleAnonymous = () => {
        const nextState = !anonymousModeEnabled
        setAnonymousModeEnabled(nextState)
        setToastMessage(
            nextState
                ? "Đã bật chế độ ẩn danh mặc định khi gửi phản ánh."
                : "Đã tắt chế độ ẩn danh. Danh tính VNeID sẽ được đính kèm."
        )
        setShowToast(true)
    }

    const handleLogout = () => {
        setShowLogoutConfirmModal(false)
        setToastMessage("Đăng xuất tài khoản thành công.")
        setShowToast(true)
        setTimeout(() => {
            router.push(ROUTES.LOGIN, "root", "replace")
        }, 300)
    }

    return (
        <div className="flex flex-col w-full !px-margin !pb-6 !gap-space-md max-w-md mx-auto">
            {/* 1. Khối Thông Tin Định Danh Công Dân */}
            <section className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm border border-outline-variant/15">
                <div className="flex items-start !gap-space-md">
                    <div className="relative flex-shrink-0">
                        <img
                            className="w-16 h-16 !rounded-full object-cover shadow-sm ring-2 ring-surface-container-low"
                            alt={DEFAULT_PROFILE.avatarAlt}
                            src={DEFAULT_PROFILE.avatarUrl}
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 !rounded-full bg-surface-container-lowest flex items-center justify-center shadow-xs">
                            <span
                                className="material-symbols-outlined text-secondary text-[16px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                verified
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center justify-between !gap-space-xs">
                            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                                {DEFAULT_PROFILE.fullName}
                            </h2>
                            <button
                                aria-label="Chỉnh sửa thông tin"
                                className="text-secondary hover:text-on-secondary-fixed-variant !p-1 -mr-1 flex items-center bg-transparent border-none cursor-pointer"
                                type="button"
                                onClick={() => setShowEditProfileModal(true)}
                            >
                                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-0.5 mt-0.5">
                            <span className="font-code-tabular text-code-tabular text-on-surface-variant flex items-center !gap-1.5 truncate">
                                <span className="material-symbols-outlined text-[14px] text-outline">call</span>
                                {DEFAULT_PROFILE.phoneNumber}
                            </span>
                            <span className="font-code-tabular text-code-tabular text-on-surface-variant flex items-center !gap-1.5 truncate">
                                <span className="material-symbols-outlined text-[14px] text-outline">mail</span>
                                {DEFAULT_PROFILE.email}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Huy hiệu VNeID mức 2 */}
                <div className="!mt-space-md !pt-space-sm bg-surface-container-low !rounded-lg !p-2.5 flex items-center !gap-space-sm border border-outline-variant/20">
                    <div className="w-7 h-7 !rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                        <span
                            className="material-symbols-outlined text-on-secondary-fixed-variant text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            verified_user
                        </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                            Tài khoản định danh điện tử
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">
                            Đã xác thực CCCD gắn chip qua VNeID (Mức 2)
                        </span>
                    </div>
                    <span
                        className="material-symbols-outlined text-on-tertiary-container text-[20px] ml-auto flex-shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        check_circle
                    </span>
                </div>
            </section>

            {/* 2. Khối Đóng Góp Vì Cộng Đồng (Citizen Civic Impact) */}
            <section className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm border border-outline-variant/15">
                <div className="flex items-center justify-between !pb-space-sm">
                    <div className="flex items-center !gap-2">
                        <span
                            className="material-symbols-outlined text-secondary text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            workspace_premium
                        </span>
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                            Đóng góp vì cộng đồng
                        </span>
                    </div>
                    <span className="!px-2 !py-0.5 bg-surface-container-high !rounded text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        {DEFAULT_STATS.levelLabel}
                    </span>
                </div>

                {/* Thẻ danh dự & Thống kê bento */}
                <div className="bg-gradient-to-r from-surface-container-low to-surface-container !p-3 !rounded-lg flex items-center !gap-3 border border-outline-variant/20">
                    <div className="w-10 h-10 !rounded-full bg-surface-container-lowest flex items-center justify-center shadow-xs flex-shrink-0">
                        <span
                            className="material-symbols-outlined text-secondary text-[22px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            military_tech
                        </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wide">
                            Huy hiệu danh dự
                        </span>
                        <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                            {DEFAULT_STATS.honorBadgeTitle}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 !gap-space-sm !mt-space-sm">
                    <div className="bg-surface-container-low !p-3 !rounded-lg flex flex-col justify-between border border-outline-variant/10">
                        <div className="flex items-center !gap-1.5 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px]">campaign</span>
                            <span className="font-label-sm text-label-sm font-medium">Phản ánh gửi</span>
                        </div>
                        <div className="!mt-2 flex items-baseline !gap-1">
                            <span className="font-headline-md text-headline-md text-primary font-bold">
                                {DEFAULT_STATS.totalSubmitted}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">tin báo</span>
                        </div>
                    </div>

                    <div className="bg-surface-container-low !p-3 !rounded-lg flex flex-col justify-between border border-outline-variant/10">
                        <div className="flex items-center !gap-1.5 text-on-tertiary-container">
                            <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                task_alt
                            </span>
                            <span className="font-label-sm text-label-sm font-medium">Đã khắc phục</span>
                        </div>
                        <div className="!mt-2 flex items-baseline !gap-1">
                            <span className="font-headline-md text-headline-md text-on-tertiary-container font-bold">
                                {DEFAULT_STATS.totalResolved}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">hoàn tất</span>
                        </div>
                    </div>
                </div>

                <div className="!mt-space-sm !px-1 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                    <span className="truncate">Tỷ lệ chính quyền giải quyết thành công</span>
                    <span className="font-code-tabular text-code-tabular font-semibold text-secondary">
                        {DEFAULT_STATS.successRate}%
                    </span>
                </div>
            </section>

            {/* 3. Danh Mục Tiện Ích & Cài Đặt */}
            <section className="bg-surface-container-lowest !rounded-xl !p-space-sm shadow-sm flex flex-col border border-outline-variant/15">
                <div className="!px-space-sm !py-2">
                    <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
                        Quy chuẩn &amp; Tiện ích công dân
                    </span>
                </div>

                {/* Mục 1: Cam kết SLA */}
                <button
                    type="button"
                    className="flex items-center justify-between !px-space-sm !py-3 !rounded-lg hover:bg-surface-container-low active:bg-surface-container transition-colors bg-transparent border-none text-left cursor-pointer w-full"
                    onClick={() => setShowSlaModal(true)}
                >
                    <div className="flex items-center !gap-space-md min-w-0">
                        <div className="w-9 h-9 !rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary">
                            <span className="material-symbols-outlined text-[20px]">schedule</span>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                Cam kết thời gian chuẩn mực SLA
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                Thời hạn xử lý tin của cơ quan hành chính
                            </span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">
                        chevron_right
                    </span>
                </button>

                {/* Mục 2: Danh bạ khẩn cấp */}
                <button
                    type="button"
                    className="flex items-center justify-between !px-space-sm !py-3 !rounded-lg hover:bg-surface-container-low active:bg-surface-container transition-colors bg-transparent border-none text-left cursor-pointer w-full"
                    onClick={() => setShowEmergencyModal(true)}
                >
                    <div className="flex items-center !gap-space-md min-w-0">
                        <div className="w-9 h-9 !rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-error">
                            <span className="material-symbols-outlined text-[20px]">call</span>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                Danh bạ khẩn cấp đô thị
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                113, 114, 115 &amp; Tổng đài 1022 tiếp nhận
                            </span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">
                        chevron_right
                    </span>
                </button>

                <div className="my-1 !mx-space-sm h-px bg-surface-container-low"></div>

                <div className="!px-space-sm !py-2">
                    <span className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
                        Cấu hình hệ thống &amp; Bảo mật
                    </span>
                </div>

                {/* Mục 3: Cài đặt thông báo (Toggle) */}
                <div className="flex items-center justify-between !px-space-sm !py-3 !rounded-lg">
                    <div className="flex items-center !gap-space-md min-w-0">
                        <div className="w-9 h-9 !rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary">
                            <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                Thông báo đẩy thời gian thực
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                Cập nhật tiến độ xử lý và cảnh báo khẩn
                            </span>
                        </div>
                    </div>
                    <button
                        aria-checked={pushNotificationEnabled}
                        aria-label="Bật tắt thông báo đẩy"
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer !rounded-full transition-colors duration-200 ease-in-out focus:outline-none border-none p-0 ${
                            pushNotificationEnabled ? "bg-secondary" : "bg-outline-variant"
                        }`}
                        role="switch"
                        type="button"
                        onClick={handleTogglePushNotifications}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform !rounded-full bg-surface-container-lowest shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                                pushNotificationEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                        ></span>
                    </button>
                </div>

                {/* Mục 4: Báo cáo ẩn danh mặc định (Toggle) */}
                <div className="flex items-center justify-between !px-space-sm !py-3 !rounded-lg">
                    <div className="flex items-center !gap-space-md min-w-0">
                        <div className="w-9 h-9 !rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                Báo cáo ẩn danh mặc định
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                Giấu danh tính cá nhân khi gửi kiến nghị
                            </span>
                        </div>
                    </div>
                    <button
                        aria-checked={anonymousModeEnabled}
                        aria-label="Bật tắt báo cáo ẩn danh mặc định"
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer !rounded-full transition-colors duration-200 ease-in-out focus:outline-none border-none p-0 ${
                            anonymousModeEnabled ? "bg-secondary" : "bg-outline-variant"
                        }`}
                        role="switch"
                        type="button"
                        onClick={handleToggleAnonymous}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform !rounded-full bg-surface-container-lowest shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                                anonymousModeEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                        ></span>
                    </button>
                </div>

                {/* Mục 5: Đổi mật khẩu tài khoản */}
                <button
                    type="button"
                    className="flex items-center justify-between !px-space-sm !py-3 !rounded-lg hover:bg-surface-container-low active:bg-surface-container transition-colors bg-transparent border-none text-left cursor-pointer w-full"
                    onClick={() => router.push(ROUTES.FORGOT_PASSWORD, "forward", "push")}
                >
                    <div className="flex items-center !gap-space-md min-w-0">
                        <div className="w-9 h-9 !rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-secondary">
                            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                Đổi mật khẩu tài khoản
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                Cập nhật mật khẩu định kỳ để tăng cường bảo vệ
                            </span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">
                        chevron_right
                    </span>
                </button>

                {/* Mục 6: Điều khoản & Bảo mật */}
                <button
                    type="button"
                    className="flex items-center justify-between !px-space-sm !py-3 !rounded-lg hover:bg-surface-container-low active:bg-surface-container transition-colors bg-transparent border-none text-left cursor-pointer w-full"
                    onClick={() => setShowTermsModal(true)}
                >
                    <div className="flex items-center !gap-space-md min-w-0">
                        <div className="w-9 h-9 !rounded-lg bg-surface-container-low flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                        </div>
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                                Điều khoản &amp; Bảo mật dữ liệu
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                Quy chế lưu trữ &amp; quyền riêng tư công dân
                            </span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[20px] flex-shrink-0">
                        chevron_right
                    </span>
                </button>
            </section>

            {/* 4. Nút bấm Đăng xuất & Phiên bản ứng dụng */}
            <div className="flex flex-col items-center !gap-space-sm !mt-1">
                <button
                    className="w-full h-11 bg-error-container text-on-error-container font-label-lg text-label-lg font-semibold !rounded-lg flex items-center justify-center !gap-2 hover:bg-error/20 active:opacity-90 transition-all border-none cursor-pointer"
                    type="button"
                    onClick={() => setShowLogoutConfirmModal(true)}
                >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    ĐĂNG XUẤT TÀI KHOẢN
                </button>

                <div className="flex flex-col items-center justify-center text-center !py-2">
                    <span className="font-code-tabular text-label-sm text-on-surface-variant">
                        GovReport Citizen v2.4.0 (Đô thị số vì dân)
                    </span>
                    <span className="font-body-sm text-[10px] text-outline !mt-0.5">
                        Trung tâm Điều hành Đô thị Thông minh IOC • Nền tảng Quốc gia
                    </span>
                </div>
            </div>

            {/* Modal: Danh bạ khẩn cấp đô thị */}
            <IonModal
                isOpen={showEmergencyModal}
                onDidDismiss={() => setShowEmergencyModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 !pb-3">
                        <div className="flex items-center !gap-2">
                            <div className="w-8 h-8 !rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">emergency</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Danh bạ khẩn cấp đô thị
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="w-8 h-8 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                            onClick={() => setShowEmergencyModal(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <div className="flex flex-col !gap-3">
                        {EMERGENCY_CONTACTS.map(contact => (
                            <a
                                key={contact.id}
                                href={`tel:${contact.number}`}
                                className="flex items-center justify-between !p-3 !rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-inherit no-underline border border-outline-variant/15"
                            >
                                <div className="flex items-center !gap-3 min-w-0">
                                    <div
                                        className={`w-10 h-10 !rounded-xl flex items-center justify-center flex-shrink-0 ${contact.colorClass}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {contact.icon}
                                        </span>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-label-lg text-label-lg font-bold text-on-surface">
                                            {contact.name}
                                        </span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                            {contact.description}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center !gap-1.5 !px-3 !py-1.5 !rounded-lg bg-surface-container-lowest text-secondary font-code-tabular font-bold text-[15px] shadow-xs flex-shrink-0">
                                    <span className="material-symbols-outlined text-[16px]">call</span>
                                    {contact.number}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </IonModal>

            {/* Modal: Cam kết thời gian chuẩn mực SLA */}
            <IonModal
                isOpen={showSlaModal}
                onDidDismiss={() => setShowSlaModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 !pb-3">
                        <div className="flex items-center !gap-2">
                            <div className="w-8 h-8 !rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">schedule</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Cam kết thời gian SLA
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="w-8 h-8 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                            onClick={() => setShowSlaModal(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <p className="font-body-md text-on-surface-variant text-sm">
                        Trung tâm Điều hành Đô thị Thông minh IOC cam kết giám sát và đôn đốc các đơn vị
                        hành chính xử lý theo khung chuẩn sau:
                    </p>

                    <div className="flex flex-col !gap-3">
                        {SLA_STANDARDS.map(sla => (
                            <div
                                key={sla.id}
                                className="!p-3.5 !rounded-xl bg-surface-container-low flex flex-col !gap-1.5 border border-outline-variant/15"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center !gap-2 text-primary font-semibold font-label-md">
                                        <span className="material-symbols-outlined text-[18px]">
                                            {sla.icon}
                                        </span>
                                        {sla.category}
                                    </div>
                                    <span className="!px-2 !py-0.5 !rounded bg-secondary/15 text-secondary font-code-tabular text-label-sm font-bold">
                                        {sla.maxResponseHours}
                                    </span>
                                </div>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                    {sla.resolutionTarget}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </IonModal>

            {/* Modal: Điều khoản & Bảo mật dữ liệu */}
            <IonModal
                isOpen={showTermsModal}
                onDidDismiss={() => setShowTermsModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 !pb-3">
                        <div className="flex items-center !gap-2">
                            <div className="w-8 h-8 !rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Điều khoản & Bảo mật
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="w-8 h-8 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                            onClick={() => setShowTermsModal(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <div className="flex flex-col !gap-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        <div className="!p-3 !rounded-lg bg-surface-container-low border border-outline-variant/15 flex flex-col !gap-1">
                            <span className="font-label-md text-on-surface font-semibold">
                                1. Bảo vệ danh tính công dân
                            </span>
                            <span>
                                Thông tin tài khoản định danh CCCD/VNeID được mã hóa AES-256 đầu cuối. Khi gửi
                                phản ánh ở chế độ ẩn danh, danh tính của bạn hoàn toàn được bảo mật đối với người
                                tiếp nhận hiện trường.
                            </span>
                        </div>
                        <div className="!p-3 !rounded-lg bg-surface-container-low border border-outline-variant/15 flex flex-col !gap-1">
                            <span className="font-label-md text-on-surface font-semibold">
                                2. Trách nhiệm phản ánh trung thực
                            </span>
                            <span>
                                Công dân cam kết cung cấp hình ảnh, vị trí tọa độ GPS và mô tả chính xác về hiện
                                trường sự cố phục vụ công tác giám sát trật tự đô thị.
                            </span>
                        </div>
                    </div>
                </div>
            </IonModal>

            {/* Modal: Chỉnh sửa thông tin hồ sơ */}
            <IonModal
                isOpen={showEditProfileModal}
                onDidDismiss={() => setShowEditProfileModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 !pb-3">
                        <div className="flex items-center !gap-2">
                            <div className="w-8 h-8 !rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Thông tin định danh
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="w-8 h-8 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                            onClick={() => setShowEditProfileModal(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <div className="!p-3.5 !rounded-xl bg-surface-container-low flex flex-col !gap-2 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                            <span className="font-label-sm text-outline font-semibold uppercase">Họ và tên</span>
                            <span className="font-label-lg font-bold text-on-surface">{DEFAULT_PROFILE.fullName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-label-sm text-outline font-semibold uppercase">Số CCCD</span>
                            <span className="font-code-tabular text-on-surface font-medium">{DEFAULT_PROFILE.cccdMasked}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-label-sm text-outline font-semibold uppercase">Định danh VNeID</span>
                            <span className="font-label-sm font-bold text-on-tertiary-container">Mức 2 (Đã đối soát)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-label-sm text-outline font-semibold uppercase">Địa chỉ thường trú</span>
                            <span className="font-body-sm text-on-surface text-right max-w-[200px] truncate">{DEFAULT_PROFILE.address}</span>
                        </div>
                    </div>

                    <div className="flex items-start !gap-2 !p-2.5 bg-primary-fixed/25 !rounded-lg text-primary text-xs">
                        <span className="material-symbols-outlined text-[16px] flex-shrink-0 text-secondary mt-0.5">info</span>
                        <span>
                            Thông tin cá nhân được xác thực và đồng bộ tự động từ Cơ sở Dữ liệu Quốc gia về Dân cư thông qua VNeID Mức 2.
                        </span>
                    </div>
                </div>
            </IonModal>

            {/* Modal: Xác nhận Đăng xuất */}
            <IonModal
                isOpen={showLogoutConfirmModal}
                onDidDismiss={() => setShowLogoutConfirmModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4">
                    <div className="flex items-center !gap-3 text-error">
                        <div className="w-10 h-10 !rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[22px]">logout</span>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Đăng xuất tài khoản?
                            </h3>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                                Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng GovReport Citizen?
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 !gap-3 !pt-2">
                        <button
                            type="button"
                            className="h-10 !rounded-lg bg-surface-container-low text-on-surface font-label-md font-semibold border-none cursor-pointer hover:bg-surface-container transition-colors"
                            onClick={() => setShowLogoutConfirmModal(false)}
                        >
                            HỦY BỎ
                        </button>
                        <button
                            type="button"
                            className="h-10 !rounded-lg bg-error-container text-on-error-container font-label-md font-semibold border-none cursor-pointer hover:bg-error/20 transition-colors"
                            onClick={handleLogout}
                        >
                            ĐĂNG XUẤT
                        </button>
                    </div>
                </div>
            </IonModal>

            {/* Feedback Toast Notification */}
            <IonToast
                isOpen={showToast}
                message={toastMessage}
                duration={2500}
                onDidDismiss={() => setShowToast(false)}
                position="top"
                className="font-body-md"
            />
        </div>
    )
}

export default Profile

