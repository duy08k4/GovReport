import type React from "react"
import { useState, useMemo } from "react"
import { useIonRouter, IonToast } from "@ionic/react"

// Config
import { ROUTES } from "../../config/Routing"

// Type
import type { CitizenReportItem, ReportFilterStatus, ReportFilterTab } from "./reports.type"

const INITIAL_REPORTS: CitizenReportItem[] = [
    {
        id: "rep-1",
        code: "SC-2026-HN09",
        createdAt: "29/03/2026 • 08:30",
        status: "completed",
        statusLabel: "ĐÃ HOÀN TẤT",
        title: "Hố ga mất nắp trên làn xe máy",
        address: "Số 42 Tràng Tiền, P. Tràng Tiền",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB0SlujYJrNLNC5VH19YA0MN47bxYCRHHq6kc6hI_Mk3V1-hmrvlmpefTvjJARxWmRJTkyYVyYUiR3PCq1C0ehsCOczzAwSyDfa2VHt8hVltne7MMlm4hpXzM0rc2iwKoaZl_B_Ohw_idgj_V_OKYrmHKXOc9Ois4LFjFSgRNIIS8OiBfqQHRg0z6fOmBTvr-BVODxBOhc6rH9mYpuQxa5_JQX3dojfOba_RYQJioV2En_gMByr7hU",
        imageAlt:
            "A clean paved urban street lane in Hanoi with a brand-new, securely installed heavy-duty iron manhole cover flush with the asphalt road, bright daylight municipal maintenance photography.",
        statusNote: "Mời bạn nghiệm thu & đánh giá!",
        unitAssigned: "UBND P. Hàng Trống & Cty Thoát nước",
        handlingDuration: "3 giờ 45 phút",
    },
    {
        id: "rep-2",
        code: "SC-2026-HN14",
        createdAt: "29/03/2026 • 08:15",
        status: "in_progress",
        statusLabel: "ĐANG KHẮC PHỤC",
        title: "Ngập úng đô thị - Tắc cống ngập",
        address: "Số 36 Đinh Tiên Hoàng, P. Hàng Bạc",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDw9Sl_Pv7Aib5-_KhsYTGA1c8m7sjyonNeBynF-Bw-J7cWgteWG73Ew3w7BxtLVFdwh6f0WVGbu-jNtjPNY2SO-mYrJjSDJIVQV0GsKg91pbF11rkZ21NwXwCXrP0kYA1l3jlo16eaQPILMV7fhbAZTcXg16MJIFAbLqPUXauLSg8aDuRaRbp9shCBGwE5DZRHdzDJnguH8sj2I2T6B5lsJQI6b2fOexSP0N5OX-0PRsfy3A0BC8s",
        imageAlt:
            "A municipal drainage maintenance team with high-visibility safety vests pumping out standing water and clearing a clogged street storm drain on Dinh Tien Hoang street near Hoan Kiem Lake, Hanoi.",
        statusNote: "Đội công ích đang nạo vét bùn",
        progressPercent: 65,
    },
    {
        id: "rep-3",
        code: "SC-2026-HN20",
        createdAt: "29/03/2026 • 07:45",
        status: "pending",
        statusLabel: "CHỜ TIẾP NHẬN",
        title: "Cành cây gãy vướng dây điện",
        address: "Phố Hàng Thiếc, P. Hàng Gai",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDG9hSPnxDKm4e-n2FGSdxuuQqOq_Pcwkarsjt-Ot5SoCushp4jG3HM5nU2op7X2aTz-O_Ls46ve1DpRfIrP6q1QmL6-wGxuUYP_TJ50IfEloidy-gmtDt-hYEtdVpv7scBt5GtccjEsNhuGhhgcWDvFa5J7W_crpcOvpAtQIljqtEZJrhMuYXDP0tYeTcsWVXTmR6sAXOFOb6BgmTBxjFMbOU-Jm24uG_WojOfwUydaG3E5zHCfA4",
        imageAlt:
            "A fallen tree branch entangled in low-voltage overhead utility cables on an old quarter street in Hanoi Vietnam, cloudy morning lighting with caution flags in background.",
        statusNote: "Hệ thống đang định tuyến GIS",
        autoRoutingNote: "Điện lực Hoàn Kiếm",
    },
]

const Reports: React.FC = () => {
    const router = useIonRouter()

    const [reports] = useState<CitizenReportItem[]>(INITIAL_REPORTS)
    const [activeFilter, setActiveFilter] = useState<ReportFilterStatus>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    // Dynamic Filter Tabs calculation
    const filterTabs: ReportFilterTab[] = useMemo(() => {
        const counts = {
            all: reports.length,
            pending: reports.filter(r => r.status === "pending").length,
            in_progress: reports.filter(r => r.status === "in_progress").length,
            completed: reports.filter(r => r.status === "completed").length,
        }

        return [
            {
                key: "all",
                label: "Tất cả",
                count: counts.all,
            },
            {
                key: "pending",
                label: "Đang chờ duyệt",
                count: counts.pending,
            },
            {
                key: "in_progress",
                label: "Đang khắc phục",
                count: counts.in_progress,
            },
            {
                key: "completed",
                label: "Đã hoàn tất",
                count: counts.completed,
            },
        ]
    }, [reports])

    // Filter and Search logic
    const filteredReports = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        return reports.filter(report => {
            const matchesCategory = activeFilter === "all" || report.status === activeFilter
            if (!matchesCategory) return false

            if (!query) return true

            const textToSearch = `${report.code} ${report.title} ${report.address} ${report.statusLabel}`.toLowerCase()
            return textToSearch.includes(query)
        })
    }, [reports, activeFilter, searchQuery])

    // QR Scanner Simulation
    const handleScanQr = () => {
        setSearchQuery("SC-2026-HN09")
        setToastMessage("Đã quét QR phiếu hẹn thành công: SC-2026-HN09")
        setShowToast(true)
    }

    // Rate / Review action
    const handleReviewFeedback = (report: CitizenReportItem) => {
        setToastMessage(`Cảm ơn bạn! Đã gửi đánh giá hài lòng 5 sao cho hồ sơ ${report.code}`)
        setShowToast(true)
    }

    // View Timeline action
    const handleViewTimeline = (report: CitizenReportItem) => {
        setToastMessage(`Đang tải nhật ký thi công hiện trường: ${report.code}`)
        setShowToast(true)
    }

    // View Detail action
    const handleViewDetail = (report: CitizenReportItem) => {
        setToastMessage(`Xem chi tiết định tuyến hồ sơ: ${report.code}`)
        setShowToast(true)
    }

    // New report tip action
    const handleNewReportTip = () => {
        router.push(ROUTES.HOME, "root", "replace")
    }

    return (
        <div className="flex flex-col w-full !pb-10 max-w-md mx-auto">
            {/* Interactive Feedback Banner (Delight Moment) */}
            <div className="!px-margin !pt-space-md">
                <div className="bg-surface-container-low !rounded-xl !p-space-md shadow-sm relative overflow-hidden border border-outline-variant/20">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-fixed/30 !rounded-full blur-xl pointer-events-none"></div>
                    <div className="flex items-start !gap-space-sm relative z-10">
                        <div className="w-10 h-10 !rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                            <span
                                className="material-symbols-outlined text-[20px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                task_alt
                            </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                1 phản ánh vừa hoàn tất!
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant !mt-0.5 leading-snug">
                                Ý kiến nghiệm thu của bạn là cơ sở để thẩm định chất lượng dịch vụ công.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: Tra cứu nhanh ticket */}
            <div className="!px-margin !pt-space-md">
                <div className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm border border-outline-variant/20">
                    <div className="flex items-center justify-between !mb-space-sm">
                        <span className="font-label-lg text-label-lg text-on-surface flex items-center !gap-space-xs font-bold">
                            <span className="material-symbols-outlined text-secondary text-[20px]">
                                manage_search
                            </span>
                            Tra cứu hồ sơ tiếp nhận
                        </span>
                        <span className="font-code-tabular text-code-tabular text-on-surface-variant font-medium">
                            Hệ thống QLĐT
                        </span>
                    </div>

                    <div className="flex flex-col !gap-space-sm">
                        <div className="relative flex items-center">
                            <input
                                className="w-full h-[42px] bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md !pl-10 !pr-12 !rounded-lg outline-none focus:bg-surface-container-lowest border border-outline-variant/30 focus:border-secondary transition-colors font-medium"
                                id="ticket-search-input"
                                placeholder="Nhập mã hồ sơ (VD: SC-2026-0001)..."
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                                search
                            </span>
                            {/* QR Scanner Trigger */}
                            <button
                                className="absolute right-1.5 w-8 h-8 !rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center transition-colors active:scale-95 cursor-pointer border-none"
                                id="btn-scan-qr"
                                title="Quét QR phiếu hẹn"
                                type="button"
                                onClick={handleScanQr}
                            >
                                <span className="material-symbols-outlined text-[19px]">
                                    qr_code_scanner
                                </span>
                            </button>
                        </div>

                        <button
                            className="w-full h-10 bg-primary-container hover:bg-primary text-on-primary !rounded-lg font-label-lg text-label-lg flex items-center justify-center !gap-space-xs transition-colors shadow-sm active:scale-[0.99] cursor-pointer border-none font-bold"
                            id="btn-search-ticket"
                            type="button"
                            onClick={() => {
                                if (!searchQuery.trim()) {
                                    setToastMessage("Vui lòng nhập mã hồ sơ hoặc quét mã QR")
                                    setShowToast(true)
                                }
                            }}
                        >
                            <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                            <span>Tra cứu ngay</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 2: Bộ lọc trạng thái ngang */}
            <div className="!pt-space-md">
                <div className="flex items-center !gap-space-xs overflow-x-auto !px-margin no-scrollbar !py-0.5">
                    {filterTabs.map(tab => {
                        const isActive = activeFilter === tab.key

                        return (
                            <button
                                key={tab.key}
                                className={`filter-tab shrink-0 !px-3.5 !py-1.5 !rounded-full font-label-md text-label-md flex items-center !gap-1.5 transition-all shadow-sm cursor-pointer border-none font-semibold ${
                                    isActive
                                        ? "bg-primary-container text-on-primary"
                                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container active:scale-95"
                                }`}
                                data-filter={tab.key}
                                type="button"
                                onClick={() => setActiveFilter(tab.key)}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`!px-1.5 !py-0.2 !rounded-full font-code-tabular text-[11px] font-bold ${
                                        isActive
                                            ? "bg-surface-container-highest/30 text-on-primary"
                                            : "bg-surface-container text-on-surface"
                                    }`}
                                >
                                    {tab.count < 10 && tab.key === "all" ? `0${tab.count}` : tab.count}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Section 3: Danh sách sự cố cá nhân */}
            <div className="!px-margin !pt-space-md flex flex-col !gap-space-md" id="reports-container">
                {filteredReports.map(report => {
                    // 1. Thẻ Đã hoàn tất - Chờ nghiệm thu
                    if (report.status === "completed") {
                        return (
                            <div
                                key={report.id}
                                className="report-card completed bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm transition-all duration-200 border border-outline-variant/20"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between !pb-space-xs border-b border-surface-container-high/40">
                                    <div className="flex items-center !gap-space-xs">
                                        <span className="font-code-tabular text-code-tabular font-bold text-primary">
                                            {report.code}
                                        </span>
                                        <span className="w-1 h-1 !rounded-full bg-outline-variant"></span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                                            {report.createdAt}
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center !px-2 !py-0.5 !rounded bg-tertiary-container text-tertiary-fixed font-label-sm text-[10px] tracking-wide uppercase font-bold border border-tertiary-fixed/30">
                                        {report.statusLabel}
                                    </span>
                                </div>

                                {/* Main info */}
                                <div className="flex !gap-space-sm !pt-space-xs items-start !mt-2">
                                    <div className="w-16 h-16 !rounded-lg overflow-hidden shrink-0 bg-surface-container border border-outline-variant/30">
                                        <img
                                            className="w-full h-full object-cover"
                                            data-alt={report.imageAlt}
                                            src={report.imageUrl}
                                            alt={report.title}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-bold">
                                            {report.title}
                                        </span>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center !gap-1 !mt-0.5 truncate font-medium">
                                            <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">
                                                pin_drop
                                            </span>
                                            {report.address}
                                        </p>
                                        <div className="flex items-center !gap-1 !mt-1 text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                                            <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                                                verified
                                            </span>
                                            <span>{report.statusNote}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action metadata block */}
                                <div className="!mt-space-sm !pt-space-sm bg-surface-container-low !rounded-lg !p-space-sm flex flex-col !gap-1.5 border border-outline-variant/20">
                                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                                        <span>Đơn vị phối hợp:</span>
                                        <span className="text-on-surface font-semibold truncate max-w-[200px]">
                                            {report.unitAssigned}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                                        <span>Thời gian xử lý:</span>
                                        <span className="text-on-surface font-code-tabular font-bold">
                                            {report.handlingDuration}
                                        </span>
                                    </div>
                                </div>

                                {/* Primary Action CTA */}
                                <button
                                    className="!mt-space-sm w-full !py-2.5 !px-space-md bg-secondary text-on-secondary !rounded-lg font-label-lg text-label-lg flex items-center justify-center !gap-2 hover:bg-on-secondary-container transition-all active:scale-[0.99] shadow-sm cursor-pointer border-none font-bold"
                                    type="button"
                                    onClick={() => handleReviewFeedback(report)}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        rate_review
                                    </span>
                                    <span>Xem ảnh đối soát &amp; Đánh giá hài lòng</span>
                                </button>
                            </div>
                        )
                    }

                    // 2. Thẻ Đang khắc phục hiện trường
                    if (report.status === "in_progress") {
                        return (
                            <div
                                key={report.id}
                                className="report-card in_progress bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm transition-all duration-200 border border-outline-variant/20"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between !pb-space-xs border-b border-surface-container-high/40">
                                    <div className="flex items-center !gap-space-xs">
                                        <span className="font-code-tabular text-code-tabular font-bold text-primary">
                                            {report.code}
                                        </span>
                                        <span className="w-1 h-1 !rounded-full bg-outline-variant"></span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                                            {report.createdAt}
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center !px-2 !py-0.5 !rounded bg-surface-container-high text-secondary font-label-sm text-[10px] tracking-wide uppercase font-bold border border-secondary/20">
                                        {report.statusLabel}
                                    </span>
                                </div>

                                {/* Main info */}
                                <div className="flex !gap-space-sm !pt-space-xs items-start !mt-2">
                                    <div className="w-16 h-16 !rounded-lg overflow-hidden shrink-0 bg-surface-container border border-outline-variant/30">
                                        <img
                                            className="w-full h-full object-cover"
                                            data-alt={report.imageAlt}
                                            src={report.imageUrl}
                                            alt={report.title}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-bold">
                                            {report.title}
                                        </span>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center !gap-1 !mt-0.5 truncate font-medium">
                                            <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">
                                                pin_drop
                                            </span>
                                            {report.address}
                                        </p>
                                        <div className="flex items-center !gap-1.5 !mt-1 text-secondary font-label-sm text-label-sm font-semibold">
                                            <span className="w-2 h-2 !rounded-full bg-secondary animate-pulse"></span>
                                            <span>{report.statusNote}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress bar indicator */}
                                <div className="!mt-space-sm !pt-space-sm flex flex-col !gap-1.5">
                                    <div className="flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant font-medium">
                                        <span>Tiến độ khắc phục:</span>
                                        <span className="font-code-tabular text-secondary font-bold">
                                            {report.progressPercent}%
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-surface-container !rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-secondary !rounded-full transition-all duration-500"
                                            style={{ width: `${report.progressPercent}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    className="!mt-space-sm w-full !py-2 !px-space-md bg-surface-container-low hover:bg-surface-container text-on-surface !rounded-lg font-label-lg text-label-lg flex items-center justify-center !gap-2 transition-colors active:scale-[0.99] cursor-pointer border border-outline-variant/20 font-bold"
                                    type="button"
                                    onClick={() => handleViewTimeline(report)}
                                >
                                    <span className="material-symbols-outlined text-[18px] text-secondary">
                                        timeline
                                    </span>
                                    <span>Theo dõi tiến trình chi tiết</span>
                                </button>
                            </div>
                        )
                    }

                    // 3. Thẻ Mới gửi - Chờ duyệt / Định tuyến GIS
                    return (
                        <div
                            key={report.id}
                            className="report-card pending bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm transition-all duration-200 border border-outline-variant/20"
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between !pb-space-xs border-b border-surface-container-high/40">
                                <div className="flex items-center !gap-space-xs">
                                    <span className="font-code-tabular text-code-tabular font-bold text-primary">
                                        {report.code}
                                    </span>
                                    <span className="w-1 h-1 !rounded-full bg-outline-variant"></span>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                                        {report.createdAt}
                                    </span>
                                </div>
                                <span className="inline-flex items-center !px-2 !py-0.5 !rounded bg-surface-container text-on-surface-variant font-label-sm text-[10px] tracking-wide uppercase font-bold border border-outline-variant/30">
                                    {report.statusLabel}
                                </span>
                            </div>

                            {/* Main info */}
                            <div className="flex !gap-space-sm !pt-space-xs items-start !mt-2">
                                <div className="w-16 h-16 !rounded-lg overflow-hidden shrink-0 bg-surface-container border border-outline-variant/30">
                                    <img
                                        className="w-full h-full object-cover"
                                        data-alt={report.imageAlt}
                                        src={report.imageUrl}
                                        alt={report.title}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 font-bold">
                                        {report.title}
                                    </span>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center !gap-1 !mt-0.5 truncate font-medium">
                                        <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">
                                            pin_drop
                                        </span>
                                        {report.address}
                                    </p>
                                    <div className="flex items-center !gap-1.5 !mt-1 text-on-surface-variant font-label-sm text-label-sm">
                                        <span className="material-symbols-outlined text-[15px] text-outline">
                                            hub
                                        </span>
                                        <span>{report.statusNote}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Simple metadata footer */}
                            <div className="!mt-space-sm !pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container-high/40">
                                <span className="flex items-center !gap-1 font-medium">
                                    <span className="material-symbols-outlined text-[15px] text-secondary">
                                        sensors
                                    </span>
                                    Phân bổ tự động: {report.autoRoutingNote}
                                </span>
                                <button
                                    className="text-secondary font-label-sm hover:underline font-bold flex items-center !gap-0.5 cursor-pointer bg-transparent border-none p-0"
                                    type="button"
                                    onClick={() => handleViewDetail(report)}
                                >
                                    <span>Chi tiết</span>
                                    <span className="material-symbols-outlined text-[14px]">
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    )
                })}

                {/* Empty State Placeholder */}
                {filteredReports.length === 0 && (
                    <div
                        className="!px-margin !py-space-xl flex flex-col items-center justify-center text-center bg-surface-container-lowest !rounded-xl shadow-sm border border-outline-variant/20"
                        id="empty-state"
                    >
                        <div className="w-16 h-16 !rounded-full bg-surface-container-high flex items-center justify-center !mb-space-sm text-secondary">
                            <span className="material-symbols-outlined text-[32px]">folder_off</span>
                        </div>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                            Không tìm thấy phản ánh
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant !mt-1 max-w-[260px]">
                            Vui lòng kiểm tra lại mã hồ sơ hoặc chọn bộ lọc trạng thái khác.
                        </p>
                    </div>
                )}
            </div>

            {/* Helpful tip card for citizen engagement */}
            <div className="!px-margin !pt-space-lg">
                <div
                    className="bg-surface-container-lowest !rounded-xl !p-space-md shadow-sm flex items-center !gap-space-sm border border-outline-variant/20 cursor-pointer hover:bg-surface-container-low transition-colors"
                    onClick={handleNewReportTip}
                >
                    <div className="w-10 h-10 !rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="font-label-md text-label-md text-on-surface font-bold block">
                            Bạn phát hiện sự cố mới?
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Chụp ảnh và gửi phản ánh nhanh chỉ trong 30 giây tại Trang chủ.
                        </span>
                    </div>
                </div>
            </div>

            {/* Toast Feedback */}
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={2200}
                position="top"
                className="text-[12px] font-label-md"
            />
        </div>
    )
}

export default Reports

