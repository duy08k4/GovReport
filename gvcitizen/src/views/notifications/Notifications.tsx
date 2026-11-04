import type React from "react"
import { useState, useMemo } from "react"
import { useIonRouter, IonPage, IonContent, IonToast, IonModal } from "@ionic/react"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type {
    NotificationCategory,
    NotificationFilterOption,
    NotificationItem,
} from "./notifications.type"

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: "noti-1",
        category: "dossier",
        categoryLabel: "ĐÃ NGHIỆM THU",
        categoryBadgeClass: "text-on-tertiary-container bg-surface-container-low",
        ticketCode: "SC-2026-HN09",
        timeAgo: "15 phút trước",
        isUnread: true,
        title: "Hồ sơ SC-2026-HN09 đã hoàn tất khắc phục!",
        description:
            "UBND Phường Tràng Tiền đã xử lý xong sự cố Hố ga mất nắp. Mời bạn vào kiểm tra ảnh đối soát và đánh giá mức độ hài lòng.",
        icon: "check_circle",
        iconFill: true,
        iconColorClass: "text-on-tertiary-container",
        iconBgClass: "bg-surface-container-low",
        beforeImg:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ82LxyhPD2IySh7Qk_tqp_ubuk3CTarVjlrjZZ6FtKVlSP58E-Qoqjgh5yGTURqXW9WtfAyioDtOF7mNB-iZXlLmgueHH5YfXm9ULpSYa6wTOk0upxdpRufuICnnyz8LF1M_dMdY6tdX_Fl3xCDGPX3SyPIHk8dh_zlmRh8I0VjCcvrPQEYmFL5usapLjZOK6fKG6av4qb6US3UXL0hJ7K4xgetKlmJWLcXWCilTAjvRZ-G4mgGA",
        beforeAlt:
            "Hiện trường sự cố ban đầu hố ga mất nắp nguy hiểm trên mặt đường nhựa đô thị Hà Nội trước khi sửa chữa, góc chụp kỹ thuật giám sát hạ tầng.",
        afterImg:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDLsbbAyWHcbhlF-SQxO-EXV18yPT4rKrXmn9KIpHqP9kIAF1IBmXTvIiKHzB9K_lK5f17HWqKqaUB75XHTDr-_NFJZOra0cWCdo8b5_njHLoyyfDcODQGw885CKFjNj89SOD1qtJgsMsTKzu4wTPulfBcKSLhNVhrx2ell4e7EKI6LnX1uDBFTuyB7r2ltnPFOhHE1PKS2CQoH7tqwaLBbgApjZ72_uZCKjJyf4m_2zMJwiGdIKs4",
        afterAlt:
            "Nắp hố ga gang mới tinh được lắp đặt bằng phẳng kiên cố với mặt đường nhựa Tràng Tiền Hà Nội, ánh sáng ban ngày rõ nét kỹ thuật nghiệm thu hoàn thành.",
        signatureLabel: "Biên bản ký số IOC",
        actionButtonText: "Xem biên bản nghiệm thu",
    },
    {
        id: "noti-2",
        category: "dossier",
        categoryLabel: "HIỆN TRƯỜNG",
        categoryBadgeClass: "text-secondary bg-surface-container-high",
        ticketCode: "SC-2026-HN11",
        timeAgo: "2 giờ trước",
        isUnread: true,
        title: "Cán bộ đã có mặt tại hiện trường",
        description:
            "Đ/c Nguyễn Văn Bình (Đội Phản ứng nhanh số 1) đã tiếp cận hiện trường tại 42 Tràng Tiền.",
        icon: "commute",
        iconFill: true,
        iconColorClass: "text-secondary",
        iconBgClass: "bg-surface-container-low",
        officerName: "Đ/c Nguyễn Văn Bình • Tổ 1",
        officerStatus: "Thiết bị giám sát trực tiếp kích hoạt",
        hasOfficerLocation: true,
    },
    {
        id: "noti-3",
        category: "alert",
        categoryLabel: "CẢNH BÁO GIAO THÔNG",
        categoryBadgeClass: "text-error bg-error-container",
        timeAgo: "4 giờ trước",
        isUnread: true,
        title: "Thông báo phân luồng thi công ngầm",
        description:
            "Tạm cấm phương tiện ô tô qua Phố Tràng Thi từ 22:00 đêm nay để nạo vét cống ngầm chống ngập.",
        icon: "crisis_alert",
        iconFill: true,
        iconColorClass: "text-error",
        iconBgClass: "bg-surface-container-high",
        scheduleTime: "22:00 — 05:00 sáng",
        alternateRoute: "Hai Bà Trưng → Quán Sứ",
    },
    {
        id: "noti-4",
        category: "system",
        categoryLabel: "ĐỊNH DANH VNEID",
        categoryBadgeClass: "text-on-surface-variant bg-surface-container",
        timeAgo: "Hôm qua",
        isUnread: false,
        title: "Đã liên kết VNeID Mức độ 2",
        description:
            "Tài khoản công dân đã liên kết thành công với VNeID Mức độ 2. Toàn bộ phản ánh đô thị của bạn sẽ được ưu tiên tiếp nhận trực tiếp vào luồng xử lý cấp quận.",
        icon: "security",
        iconFill: true,
        iconColorClass: "text-secondary",
        iconBgClass: "bg-surface-container-low",
        verificationCode: "VN-8902-L2",
        statusBadgeText: "Đã kích hoạt",
    },
]

const Notifications: React.FC = () => {
    const router = useIonRouter()

    // State
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
    const [activeFilter, setActiveFilter] = useState<NotificationCategory>("all")
    const [isAllRead, setIsAllRead] = useState<boolean>(false)

    // Modals & Toasts
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>("")
    const [selectedDossier, setSelectedDossier] = useState<NotificationItem | null>(null)
    const [showInspectionModal, setShowInspectionModal] = useState<boolean>(false)

    // Handlers
    const handleBack = () => {
        router.push(ROUTES.HOME, "back", "pop")
    }

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(item => ({
                ...item,
                isUnread: false,
            }))
        )
        setIsAllRead(true)
        setToastMessage("Đã đánh dấu đọc tất cả thông báo đô thị.")
        setShowToast(true)
    }

    const handleViewOfficerOnMap = () => {
        setToastMessage("Đang mở bản đồ GIS định vị cán bộ hiện trường...")
        setShowToast(true)
        setTimeout(() => {
            router.push(ROUTES.MAP, "forward", "push")
        }, 350)
    }

    const handleOpenInspectionModal = (item: NotificationItem) => {
        setSelectedDossier(item)
        setShowInspectionModal(true)
    }

    // Filtered notifications
    const filteredNotifications = useMemo(() => {
        if (activeFilter === "all") return notifications
        return notifications.filter(item => item.category === activeFilter)
    }, [notifications, activeFilter])

    // Filter tabs definition with dynamic counters
    const filterTabs: NotificationFilterOption[] = useMemo(() => {
        const dossierCount = notifications.filter(n => n.category === "dossier").length
        const alertCount = notifications.filter(n => n.category === "alert").length

        return [
            {
                key: "all",
                label: `Tất cả (${notifications.length})`,
            },
            {
                key: "dossier",
                label: `Hồ sơ của tôi (${dossierCount})`,
                dotColor: "bg-tertiary-container",
            },
            {
                key: "alert",
                label: `Cảnh báo khẩn (${alertCount})`,
                dotColor: "bg-error",
            },
        ]
    }, [notifications])

    return (
        <IonPage className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen">
            {/* 1. Header chuẩn Mobile Stack */}
            <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
                <div className="h-14 !px-space-xs flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center !gap-space-xs min-w-0 pr-2">
                        <button
                            type="button"
                            aria-label="Quay lại"
                            className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-secondary !rounded bg-transparent border-none cursor-pointer shrink-0"
                            onClick={handleBack}
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </button>
                        <h1 className="!text-[16px] !font-semibold text-on-surface truncate tracking-tight leading-snug">
                            Trung Tâm Thông Báo Đô Thị
                        </h1>
                    </div>

                    <div className="flex items-center !gap-space-sm !pr-space-xs">
                        <button
                            type="button"
                            aria-label="Tùy chọn khác"
                            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface !rounded bg-transparent border-none cursor-pointer"
                            onClick={() => {
                                setToastMessage("Phiên bản GovReport Mobile v2.4.0 • Kênh IOC 24/7")
                                setShowToast(true)
                            }}
                        >
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                        <button
                            type="button"
                            aria-label="Hồ sơ công dân"
                            className="w-8 h-8 !rounded-full bg-primary flex items-center justify-center border-none p-0 cursor-pointer"
                            onClick={() => router.push(ROUTES.PROFILE, "forward", "push")}
                        >
                            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. Nội dung cuộn chính */}
            <IonContent fullscreen className="ion-no-padding">
                <main className="flex-1 flex flex-col relative w-full !pt-14 pb-safe bg-surface">
                    <div className="flex flex-col w-full !pb-space-xl max-w-md mx-auto">
                        {/* Top Bar Action Sub-header */}
                        <div className="!px-margin !pt-space-sm !pb-space-xs flex items-center justify-between">
                            <div className="flex items-center !gap-space-xs">
                                <span className="inline-flex w-2 h-2 !rounded-full bg-secondary animate-pulse"></span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                                    Hệ thống thông báo công dân
                                </span>
                            </div>

                            <button
                                type="button"
                                id="btn-read-all"
                                disabled={isAllRead}
                                className={`font-label-sm text-label-sm flex items-center !gap-1 bg-transparent border-none cursor-pointer transition-colors ${
                                    isAllRead
                                        ? "text-on-surface-variant/60 cursor-default"
                                        : "text-secondary hover:text-on-secondary-fixed-variant"
                                }`}
                                onClick={handleMarkAllAsRead}
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {isAllRead ? "done" : "done_all"}
                                </span>
                                <span>{isAllRead ? "Đã xong" : "Đọc tất cả"}</span>
                            </button>
                        </div>

                        {/* Filter Chips Bar */}
                        <div className="!px-margin !py-space-sm flex items-center !gap-space-xs overflow-x-auto no-scrollbar">
                            {filterTabs.map(tab => {
                                const isActive = activeFilter === tab.key
                                return (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        className={`!px-3 !py-1.5 !rounded font-label-sm text-label-sm transition-all shrink-0 flex items-center !gap-1 border-none cursor-pointer ${
                                            isActive
                                                ? "bg-primary text-on-primary font-bold shadow-sm"
                                                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                        }`}
                                        onClick={() => setActiveFilter(tab.key)}
                                    >
                                        {tab.dotColor && (
                                            <span
                                                className={`w-1.5 h-1.5 !rounded-full ${tab.dotColor}`}
                                            ></span>
                                        )}
                                        <span>{tab.label}</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Feed Status Ticker / Summary */}
                        <div className="!mx-margin !mt-space-xs !mb-space-sm !p-space-sm bg-surface-container-low !rounded flex items-center justify-between border border-outline-variant/15">
                            <div className="flex items-center !gap-space-sm min-w-0">
                                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                                    sensors
                                </span>
                                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                    Kênh dữ liệu giám sát phân tầng thời gian thực cấp Phường
                                </p>
                            </div>
                            <span className="font-code-tabular text-label-sm text-secondary font-bold uppercase shrink-0">
                                IOC-24/7
                            </span>
                        </div>

                        {/* Notifications Feed */}
                        <div className="!px-margin flex flex-col !gap-space-sm" id="notifications-list">
                            {filteredNotifications.length === 0 ? (
                                /* Interactive Empty State for Filter Swaps */
                                <div className="!mx-margin !my-space-lg !p-space-lg bg-surface-container-lowest !rounded flex flex-col items-center justify-center text-center !gap-space-sm border border-outline-variant/15">
                                    <div className="w-12 h-12 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[28px]">
                                            notifications_off
                                        </span>
                                    </div>
                                    <div className="flex flex-col !gap-1">
                                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                                            Không có thông báo nào
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                                            Hiện tại mục lọc này chưa ghi nhận thêm cập nhật mới từ hệ thống.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                filteredNotifications.map(noti => (
                                    <article
                                        key={noti.id}
                                        className="bg-surface-container-lowest !p-space-md !rounded flex flex-col !gap-space-sm relative transition-all duration-200 border border-outline-variant/15 shadow-xs"
                                        data-category={noti.category}
                                    >
                                        {/* Card Header */}
                                        <div className="flex items-start justify-between !gap-space-sm">
                                            <div className="flex items-center !gap-space-sm min-w-0">
                                                <div
                                                    className={`w-8 h-8 !rounded ${noti.iconBgClass} flex items-center justify-center shrink-0`}
                                                >
                                                    <span
                                                        className={`material-symbols-outlined ${noti.iconColorClass} text-[20px]`}
                                                        style={
                                                            noti.iconFill
                                                                ? { fontVariationSettings: "'FILL' 1" }
                                                                : undefined
                                                        }
                                                    >
                                                        {noti.icon}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center !gap-1.5">
                                                        <span
                                                            className={`font-label-sm text-label-sm ${noti.categoryBadgeClass} !px-1.5 !py-0.5 !rounded uppercase font-bold`}
                                                        >
                                                            {noti.categoryLabel}
                                                        </span>
                                                        {noti.ticketCode && (
                                                            <span className="font-code-tabular text-label-sm text-on-surface-variant font-semibold">
                                                                {noti.ticketCode}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center !gap-1 shrink-0">
                                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                                    {noti.timeAgo}
                                                </span>
                                                {noti.isUnread && (
                                                    <span className="unread-dot w-2 h-2 !rounded-full bg-secondary shrink-0 transition-all duration-200"></span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="flex flex-col !gap-1">
                                            <h2 className="font-headline-sm text-headline-sm text-on-surface">
                                                {noti.title}
                                            </h2>
                                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                                {noti.description}
                                            </p>
                                        </div>

                                        {/* Khối hình ảnh đối soát Trước / Sau nếu có */}
                                        {noti.beforeImg && noti.afterImg && (
                                            <div className="grid grid-cols-2 !gap-space-xs mt-0.5">
                                                <div className="flex flex-col !gap-1">
                                                    <div className="relative w-full h-24 !rounded overflow-hidden bg-surface-container">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            alt={noti.beforeAlt}
                                                            src={noti.beforeImg}
                                                        />
                                                        <span className="absolute bottom-1 left-1 bg-primary/80 text-on-primary font-label-sm text-[10px] !px-1.5 !py-0.5 !rounded">
                                                            Trước
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col !gap-1">
                                                    <div className="relative w-full h-24 !rounded overflow-hidden bg-surface-container">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            alt={noti.afterAlt}
                                                            src={noti.afterImg}
                                                        />
                                                        <span className="absolute bottom-1 left-1 bg-tertiary-container text-on-tertiary font-label-sm text-[10px] !px-1.5 !py-0.5 !rounded font-semibold">
                                                            Sau khắc phục
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Khối Cán bộ tại hiện trường */}
                                        {noti.officerName && (
                                            <div className="!p-space-xs !rounded bg-surface-container-low flex items-center justify-between border border-outline-variant/15">
                                                <div className="flex items-center !gap-2 min-w-0">
                                                    <div className="w-7 h-7 !rounded bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            engineering
                                                        </span>
                                                    </div>
                                                    <div className="truncate">
                                                        <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                                                            {noti.officerName}
                                                        </p>
                                                        <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                                                            {noti.officerStatus}
                                                        </p>
                                                    </div>
                                                </div>
                                                {noti.hasOfficerLocation && (
                                                    <button
                                                        type="button"
                                                        className="!px-2.5 !py-1 !rounded bg-secondary text-on-secondary font-label-sm text-[12px] flex items-center !gap-1 shrink-0 border-none cursor-pointer font-bold active:scale-95 transition-transform"
                                                        onClick={handleViewOfficerOnMap}
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">
                                                            my_location
                                                        </span>
                                                        <span>Vị trí</span>
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* Khối Khung giờ thực thi & Lộ trình phân luồng giao thông */}
                                        {noti.scheduleTime && noti.alternateRoute && (
                                            <div className="!p-space-sm !rounded bg-surface-container flex flex-col !gap-1 border border-outline-variant/15">
                                                <div className="flex items-center justify-between text-on-surface font-label-sm text-label-sm">
                                                    <span className="flex items-center !gap-1">
                                                        <span className="material-symbols-outlined text-[16px] text-secondary">
                                                            schedule
                                                        </span>
                                                        <span>Khung giờ thực thi:</span>
                                                    </span>
                                                    <span className="font-code-tabular text-on-surface font-semibold">
                                                        {noti.scheduleTime}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                                                    <span className="flex items-center !gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            alt_route
                                                        </span>
                                                        <span>Lộ trình thay thế:</span>
                                                    </span>
                                                    <span className="truncate pl-2 font-medium text-on-surface">
                                                        {noti.alternateRoute}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Khối Biên bản ký số hoặc Xác thực VNeID */}
                                        {noti.actionButtonText && (
                                            <div className="!pt-space-xs flex items-center justify-between border-t border-outline-variant/15">
                                                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center !gap-1">
                                                    <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                                                        verified
                                                    </span>
                                                    <span>{noti.signatureLabel}</span>
                                                </span>
                                                <button
                                                    type="button"
                                                    className="!px-3 !py-2 !rounded bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors flex items-center !gap-1.5 border-none cursor-pointer font-bold"
                                                    onClick={() => handleOpenInspectionModal(noti)}
                                                >
                                                    <span>{noti.actionButtonText}</span>
                                                    <span className="material-symbols-outlined text-[16px]">
                                                        arrow_forward
                                                    </span>
                                                </button>
                                            </div>
                                        )}

                                        {/* Khối Định danh VNeID Footer */}
                                        {noti.verificationCode && noti.statusBadgeText && (
                                            <div className="flex items-center justify-between !pt-space-xs border-t border-outline-variant/15">
                                                <div className="flex items-center !gap-1.5">
                                                    <span
                                                        className="material-symbols-outlined text-on-tertiary-container text-[18px]"
                                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                                    >
                                                        verified_user
                                                    </span>
                                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                                        Mã xác thực:{" "}
                                                        <span className="font-code-tabular text-on-surface font-semibold">
                                                            {noti.verificationCode}
                                                        </span>
                                                    </span>
                                                </div>
                                                <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high !px-2 !py-1 !rounded font-bold">
                                                    {noti.statusBadgeText}
                                                </span>
                                            </div>
                                        )}
                                    </article>
                                ))
                            )}
                        </div>

                        {/* Footer Certification Authority */}
                        <footer className="!mt-space-lg !px-margin flex flex-col items-center justify-center !gap-space-xs text-center">
                            <div className="w-8 h-0.5 bg-surface-container-highest !rounded mb-1"></div>
                            <div className="flex items-center !gap-1.5 text-on-surface-variant">
                                <span className="material-symbols-outlined text-[16px] text-secondary">
                                    domain
                                </span>
                                <span className="font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                                    Trung tâm Giám sát &amp; Điều hành Đô thị Thông minh IOC
                                </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                                Hạ tầng kết nối chính quyền số và công dân Thủ đô • Phiên bản 3.4.0
                            </p>
                        </footer>
                    </div>
                </main>
            </IonContent>

            {/* Modal: Xem biên bản nghiệm thu ký số */}
            <IonModal
                isOpen={showInspectionModal}
                onDidDismiss={() => setShowInspectionModal(false)}
                className="modal-compact"
            >
                {selectedDossier && (
                    <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4 max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-outline-variant/20 !pb-3">
                            <div className="flex items-center !gap-2">
                                <div className="w-8 h-8 !rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                </div>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                    Biên Bản Nghiệm Thu Số
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="w-8 h-8 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                                onClick={() => setShowInspectionModal(false)}
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        <div className="!p-3.5 !rounded-xl bg-surface-container-low flex flex-col !gap-2 border border-outline-variant/20">
                            <div className="flex items-center justify-between">
                                <span className="font-label-sm text-outline font-semibold uppercase">MÃ HỒ SƠ</span>
                                <span className="font-code-tabular font-bold text-secondary">{selectedDossier.ticketCode}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-label-sm text-outline font-semibold uppercase">ĐƠN VỊ THI CÔNG</span>
                                <span className="font-label-sm font-semibold text-on-surface">Cty Thoát nước Hà Nội & UBND P. Tràng Tiền</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-label-sm text-outline font-semibold uppercase">CHỨNG THƯ KÝ SỐ</span>
                                <span className="font-code-tabular text-on-tertiary-container font-bold">IOC-HN-DIGITAL-CERT-2026</span>
                            </div>
                        </div>

                        <div className="flex flex-col !gap-2">
                            <span className="font-label-md font-bold text-on-surface">Đánh giá mức độ hài lòng của công dân:</span>
                            <div className="grid grid-cols-3 !gap-2">
                                <button
                                    type="button"
                                    className="!py-2 !rounded-lg bg-surface-container-low hover:bg-tertiary-container hover:text-white transition-colors text-xs font-semibold border border-outline-variant/20 cursor-pointer"
                                    onClick={() => {
                                        setShowInspectionModal(false)
                                        setToastMessage("Cảm ơn bạn đã đánh giá: Rất hài lòng!")
                                        setShowToast(true)
                                    }}
                                >
                                    ⭐ Rất hài lòng
                                </button>
                                <button
                                    type="button"
                                    className="!py-2 !rounded-lg bg-surface-container-low hover:bg-secondary hover:text-white transition-colors text-xs font-semibold border border-outline-variant/20 cursor-pointer"
                                    onClick={() => {
                                        setShowInspectionModal(false)
                                        setToastMessage("Cảm ơn bạn đã đánh giá: Hài lòng!")
                                        setShowToast(true)
                                    }}
                                >
                                    👍 Hài lòng
                                </button>
                                <button
                                    type="button"
                                    className="!py-2 !rounded-lg bg-surface-container-low hover:bg-error-container hover:text-on-error-container transition-colors text-xs font-semibold border border-outline-variant/20 cursor-pointer"
                                    onClick={() => {
                                        setShowInspectionModal(false)
                                        setToastMessage("Đã tiếp nhận góp ý để chính quyền khắc phục thêm.")
                                        setShowToast(true)
                                    }}
                                >
                                    ⚠️ Cần xử lý thêm
                                </button>
                            </div>
                        </div>

                        <div className="!pt-2 flex justify-end">
                            <button
                                type="button"
                                className="w-full h-11 !rounded-lg bg-primary text-on-primary font-label-md font-bold border-none cursor-pointer hover:bg-primary-container transition-colors"
                                onClick={() => {
                                    setShowInspectionModal(false)
                                    router.push(ROUTES.REPORTS, "forward", "push")
                                }}
                            >
                                XEM CHI TIẾT PHẢN ÁNH NÀY
                            </button>
                        </div>
                    </div>
                )}
            </IonModal>

            {/* Feedback Toast */}
            <IonToast
                isOpen={showToast}
                message={toastMessage}
                duration={2500}
                onDidDismiss={() => setShowToast(false)}
                position="top"
                className="font-body-md"
            />
        </IonPage>
    )
}

export default Notifications

