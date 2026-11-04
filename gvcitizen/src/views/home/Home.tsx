import type React from "react"
import { useState } from "react"
import { useIonRouter, IonToast } from "@ionic/react"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type { IncidentCategory, RecentTicketProgress, UrbanAlert } from "./home.type"

const INCIDENT_CATEGORIES: IncidentCategory[] = [
    {
        id: "drain",
        title: "Hố ga / Cống",
        icon: "adjust",
    },
    {
        id: "flood",
        title: "Ngập úng đường",
        icon: "flood",
    },
    {
        id: "tree",
        title: "Cây ngã đổ",
        icon: "nature",
    },
    {
        id: "electric",
        title: "Đứt cáp / Điện",
        icon: "electric_bolt",
    },
    {
        id: "lighting",
        title: "Chiếu sáng",
        icon: "light",
    },
    {
        id: "waste",
        title: "Rác thải ùn ứ",
        icon: "delete",
    },
    {
        id: "pavement",
        title: "Sụt lún vỉa hè",
        icon: "broken_image",
    },
    {
        id: "other",
        title: "Sự cố khác",
        icon: "more_horiz",
    },
]

const MOCK_TICKET: RecentTicketProgress = {
    id: "ticket-1",
    code: "SC-2026-HN09",
    timeAgo: "14:15 hôm nay",
    title: "Hố ga mất nắp trước số 12 Tràng Thi",
    statusText: "Đang xử lý tại hiện trường",
    currentStep: 3,
    teamName: "Đội Công trình Đô thị số 1",
    hasOfficerLocation: true,
}

const MOCK_ALERT: UrbanAlert = {
    id: "alert-1",
    title: "Cảnh báo ngập úng đô thị",
    time: "17:00 Hôm nay",
    content: "Dự báo triều cường ngập sâu tại các tuyến phố ven hồ từ 17:00 chiều nay. Người dân chú ý điều chỉnh lộ trình và di chuyển an toàn.",
}

const Home: React.FC = () => {
    const router = useIonRouter()

    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    const handleQuickReport = () => {
        setToastMessage("Khởi động camera chụp sự cố 1-chạm...")
        setShowToast(true)

        setTimeout(() => {
            router.push(ROUTES.REPORT_NEW, "forward", "push")
        }, 600)
    }

    const handleCategorySelect = (category: IncidentCategory) => {
        setToastMessage(`Tạo phản ánh: ${category.title}`)
        setShowToast(true)

        setTimeout(() => {
            router.push(ROUTES.REPORT_NEW, "forward", "push")
        }, 500)
    }

    const handleViewAllTickets = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push(ROUTES.REPORTS, "forward", "push")
    }

    const handleViewOfficerLocation = () => {
        setToastMessage("Đang mở định vị thực địa cán bộ xử lý...")
        setShowToast(true)

        setTimeout(() => {
            router.push(ROUTES.MAP, "forward", "push")
        }, 400)
    }

    return (
        <div className="flex flex-col w-full !pb-6 flex-1 !gap-4 max-w-md mx-auto">
            {/* 1. GPS Real-time Geolocation Ribbon */}
            <section className="!px-margin !pt-2">
                <div className="w-full bg-surface-container-low !px-space-md !py-space-sm !rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/20">
                    <div className="flex items-center !gap-space-xs min-w-0 !pr-2">
                        <span
                            className="material-symbols-outlined text-secondary text-[18px] shrink-0"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            my_location
                        </span>
                        <div className="min-w-0">
                            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                                Gần bạn:{" "}
                                <span className="font-semibold text-on-surface">
                                    Số 24 Phố Hàng Trống, Hoàn Kiếm
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center !gap-1 shrink-0 bg-surface-container !px-2 !py-0.5 !rounded-full">
                        <span className="w-1.5 h-1.5 !rounded-full bg-on-tertiary-container animate-pulse"></span>
                        <span className="font-code-tabular text-[11px] text-on-surface-variant font-medium">
                            GPS &lt; 4m
                        </span>
                    </div>
                </div>
            </section>

            {/* 2. Hero CTA Trung Tâm (Functional Minimalist & High-Impact) */}
            <section className="!px-margin">
                <div className="relative overflow-hidden !rounded-xl bg-gradient-to-br from-primary via-primary-container to-inverse-surface !p-5 text-on-primary shadow-md">
                    {/* Ambient Graphic Vector Pattern */}
                    <div className="absolute -right-8 -bottom-8 w-44 h-44 !rounded-full bg-secondary/15 blur-2xl pointer-events-none"></div>
                    <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
                        <span className="material-symbols-outlined text-[100px] leading-none text-white select-none">
                            report
                        </span>
                    </div>

                    <div className="relative z-10 flex flex-col !gap-3">
                        <div className="inline-flex items-center !gap-1.5 !px-2.5 !py-1 !rounded-full bg-surface-container-lowest/15 backdrop-blur-sm self-start">
                            <span className="w-2 h-2 !rounded-full bg-secondary-container"></span>
                            <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                                Tiếp nhận tức thời 24/7
                            </span>
                        </div>

                        <div className="flex flex-col !gap-1">
                            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white tracking-tight font-bold">
                                Phát Hiện Sự Cố Đô Thị?
                            </h2>
                            <p className="font-body-sm text-body-sm text-primary-fixed-dim line-clamp-2">
                                Hố ga hỏng, ngập úng, cây đổ, đứt dây điện... Báo ngay cho ban ngành xử lý ngay tại hiện trường.
                            </p>
                        </div>

                        {/* Large 1-Tap Trigger Button */}
                        <button
                            className="!mt-2 w-full h-12 bg-secondary active:bg-on-secondary-container text-white font-label-lg text-label-lg !rounded-lg flex items-center justify-center !gap-2 shadow-sm transition-all duration-150 transform active:scale-[0.99] select-none cursor-pointer border-none font-bold"
                            id="quickReportBtn"
                            type="button"
                            onClick={handleQuickReport}
                        >
                            <span
                                className="material-symbols-outlined text-[24px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                photo_camera
                            </span>
                            <span className="tracking-wide">CHỤP ẢNH BÁO CÁO NGAY (1 CHẠM)</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Grid Danh Mục Sự Cố Phổ Biến (4 Columns x 2 Rows) */}
            <section className="!px-margin flex flex-col !gap-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Danh mục sự cố phổ biến
                    </h3>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                        Bấm chọn loại
                    </span>
                </div>

                <div className="grid grid-cols-4 !gap-2">
                    {INCIDENT_CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            className="category-card flex flex-col items-center text-center !p-2 !rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors shadow-sm group cursor-pointer border border-outline-variant/20"
                            type="button"
                            onClick={() => handleCategorySelect(category)}
                        >
                            <div className="w-11 h-11 !rounded-lg bg-surface-container flex items-center justify-center text-secondary group-active:scale-95 transition-transform !mb-1.5">
                                <span className="material-symbols-outlined text-[24px]">
                                    {category.icon}
                                </span>
                            </div>
                            <span className="font-label-sm text-[11px] leading-tight text-on-surface font-medium line-clamp-2">
                                {category.title}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* 4. Khối Tiến Độ Hồ Sơ Gần Nhất (Recent Ticket Progress Card) */}
            <section className="!px-margin flex flex-col !gap-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Tiến độ hồ sơ gần nhất
                    </h3>
                    <button
                        type="button"
                        onClick={handleViewAllTickets}
                        className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer bg-transparent border-none p-0 font-medium"
                    >
                        Tất cả (3)
                    </button>
                </div>

                <div className="w-full bg-surface-container-lowest !rounded-xl !p-4 shadow-sm flex flex-col !gap-3 border border-outline-variant/20">
                    {/* Card Header: Code & Status Tag */}
                    <div className="flex items-start justify-between !gap-2 !pb-2 border-b border-surface-container-high/40">
                        <div>
                            <div className="flex items-center !gap-2">
                                <span className="font-code-tabular text-code-tabular font-bold text-primary">
                                    {MOCK_TICKET.code}
                                </span>
                                <span className="w-1 h-1 !rounded-full bg-outline-variant"></span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                                    {MOCK_TICKET.timeAgo}
                                </span>
                            </div>
                            <p className="font-label-lg text-label-lg text-on-surface font-semibold !mt-0.5">
                                {MOCK_TICKET.title}
                            </p>
                        </div>
                        <span className="shrink-0 inline-flex items-center !gap-1 !px-2 !py-0.5 !rounded text-[11px] font-label-sm font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                            <span className="w-1.5 h-1.5 !rounded-full bg-[#D97706] animate-pulse"></span>
                            {MOCK_TICKET.statusText}
                        </span>
                    </div>

                    {/* Linear Visual Stepper (4 Steps) */}
                    <div className="!py-1">
                        <div className="relative flex items-center justify-between">
                            {/* Continuous Track Line */}
                            <div className="absolute left-3 right-3 top-3 -translate-y-1/2 h-1 bg-surface-container-highest z-0">
                                {/* Progress Fill (Up to Step 3) */}
                                <div className="h-full bg-secondary w-[66%] transition-all duration-300"></div>
                            </div>

                            {/* Step 1: Đã gửi */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-6 h-6 !rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                </div>
                                <span className="font-label-sm text-[10px] !mt-1 text-on-surface-variant font-medium">
                                    Đã gửi
                                </span>
                            </div>

                            {/* Step 2: Tiếp nhận */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-6 h-6 !rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                </div>
                                <span className="font-label-sm text-[10px] !mt-1 text-on-surface-variant font-medium">
                                    Tiếp nhận
                                </span>
                            </div>

                            {/* Step 3: Đang sửa (Active) */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-6 h-6 !rounded-full bg-surface-container-lowest text-secondary shadow-sm flex items-center justify-center border border-secondary">
                                    <span className="w-2.5 h-2.5 !rounded-full bg-secondary animate-ping"></span>
                                </div>
                                <span className="font-label-sm text-[10px] !mt-1 text-secondary font-bold">
                                    Đang sửa
                                </span>
                            </div>

                            {/* Step 4: Hoàn tất */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-6 h-6 !rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                                    <span className="w-2 h-2 !rounded-full bg-outline-variant"></span>
                                </div>
                                <span className="font-label-sm text-[10px] !mt-1 text-on-surface-variant font-medium">
                                    Hoàn tất
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Quick Action */}
                    <div className="!pt-2 flex items-center justify-between border-t border-surface-container-high/40">
                        <div className="flex items-center !gap-1.5 text-on-surface-variant">
                            <span className="material-symbols-outlined text-[18px] text-secondary">
                                engineering
                            </span>
                            <span className="font-body-sm text-body-sm font-medium">
                                {MOCK_TICKET.teamName}
                            </span>
                        </div>
                        <button
                            className="!h-8 !px-3 !rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center !gap-1 transition-colors cursor-pointer border-none font-semibold"
                            type="button"
                            onClick={handleViewOfficerLocation}
                        >
                            <span>Xem vị trí cán bộ</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. Khối Cảnh Báo Hạ Tầng Đô Thị (Urban Alert Banner) */}
            <section className="!px-margin">
                <div className="w-full bg-[#FFFBEB] text-[#78350F] !p-3.5 !rounded-xl flex items-start !gap-3 shadow-sm border border-[#FDE68A]">
                    <div className="w-8 h-8 !rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 !mt-0.5">
                        <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            warning
                        </span>
                    </div>
                    <div className="flex flex-col !gap-0.5 min-w-0">
                        <div className="flex items-center !gap-1.5">
                            <span className="font-label-sm text-label-sm uppercase font-bold text-[#92400E] tracking-wide">
                                {MOCK_ALERT.title}
                            </span>
                            <span className="w-1.5 h-1.5 !rounded-full bg-[#D97706]"></span>
                            <span className="font-code-tabular text-[10px] text-[#B45309] font-semibold">
                                {MOCK_ALERT.time}
                            </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-[#78350F] leading-snug">
                            {MOCK_ALERT.content}
                        </p>
                    </div>
                </div>
            </section>

            {/* Toast Feedback */}
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={2200}
                position="bottom"
                className="text-[12px] font-label-md"
            />
        </div>
    )
}

export default Home

