import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useIonRouter, IonToast } from "@ionic/react"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Circle, Polygon, useMap } from "react-leaflet"

// Config
import { ROUTES } from "../../config/Routing"
import {
    GIS_CITIZEN_DEFAULT_COORDS,
    GIS_HANG_TRONG_BOUNDARY,
    GIS_ZOOM_CONFIG,
    GIS_TILE_LAYERS,
} from "../../config/GisConfig"

// Type
import type { MapFilterType, MapLayerMode, MapIncidentPin, MapFilterOption } from "./map.type"

const FILTER_OPTIONS: MapFilterOption[] = [
    {
        key: "all",
        label: "Tất cả (18)",
        icon: "layers",
    },
    {
        key: "flood",
        label: "Điểm ngập",
        dotColor: "bg-secondary",
    },
    {
        key: "drain",
        label: "Hố ga",
        dotColor: "bg-error",
    },
    {
        key: "construction",
        label: "Đang thi công",
        dotColor: "bg-secondary-fixed-dim",
    },
    {
        key: "completed",
        label: "Đã sửa xong",
        dotColor: "bg-tertiary-fixed-dim",
    },
]

const MOCK_PINS: MapIncidentPin[] = [
    {
        id: "pin-urgent",
        code: "SC-2026-HN09",
        title: "Hố ga mất nắp nguy hiểm",
        type: "urgent",
        statusBadge: "Khẩn cấp",
        statusColor: "text-on-error",
        statusBg: "bg-error",
        timeAgo: "14 phút trước",
        address: "Số 42 Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm",
        dispatchStatus: "UBND Phường & Đội Phản ứng nhanh đang xử lý. Đã rào chắn cảnh báo tạm thời và điều phối nắp thay thế.",
        coords: {
            lat: 21.0255,
            lng: 105.8542,
        },
        icon: "report",
        pinColor: "text-error",
    },
    {
        id: "pin-construction",
        code: "SC-2026-HN11",
        title: "Sửa chữa cáp viễn thông ngầm",
        type: "construction",
        statusBadge: "Đang thi công",
        statusColor: "text-on-primary",
        statusBg: "bg-secondary-fixed-dim",
        timeAgo: "45 phút trước",
        address: "Ngã tư Bà Triệu - Lý Thường Kiệt, Q. Hoàn Kiếm",
        dispatchStatus: "Đội Kỹ thuật Điện lực & Viễn thông đang phân luồng và xử lý hộp kỹ thuật.",
        coords: {
            lat: 21.0238,
            lng: 105.8528,
        },
        icon: "construction",
        pinColor: "text-on-error-container",
    },
    {
        id: "pin-completed",
        code: "SC-2026-HN05",
        title: "Đã khắc phục sụt lún vỉa hè",
        type: "completed",
        statusBadge: "Đã sửa xong",
        statusColor: "text-on-primary",
        statusBg: "bg-tertiary-fixed-dim",
        timeAgo: "2 giờ trước",
        address: "Số 12 Hàng Trống, P. Hàng Trống, Q. Hoàn Kiếm",
        dispatchStatus: "Đội Duy tu Công trình số 1 đã lát mới gạch vỉa hè và nghiệm thu hiện trường đạt chuẩn.",
        coords: {
            lat: 21.0298,
            lng: 105.8502,
        },
        icon: "check",
        pinColor: "text-on-tertiary-container",
    },
    {
        id: "pin-flood",
        code: "SC-2026-HN08",
        title: "Cảnh báo ngập úng mặt đường",
        type: "flood",
        statusBadge: "Cảnh báo ngập",
        statusColor: "text-white",
        statusBg: "bg-secondary",
        timeAgo: "25 phút trước",
        address: "Khu vực ven hồ Đinh Tiên Hoàng, Hoàn Kiếm",
        dispatchStatus: "Trạm bơm thoát nước Yên Sở đang vận hành hết công suất. Đề nghị phương tiện hạn chế lưu thông.",
        coords: {
            lat: 21.0315,
            lng: 105.8530,
        },
        icon: "flood",
        pinColor: "text-secondary",
    },
]

/**
 * Leaflet Controller Component bên trong MapContainer
 * Giúp điều khiển camera, vô hiệu hóa lag render mảnh bản đồ trong Ionic
 */
const LeafletMapController: React.FC<{
    recenterTrigger: number
    activeLayer: MapLayerMode
    selectedPinCoords: { lat: number, lng: number } | null
}> = ({ recenterTrigger, activeLayer, selectedPinCoords }) => {
    const map = useMap()

    // Khắc phục triệt để lỗi không tải mảnh bản đồ (invalidateSize)
    useEffect(() => {
        map.invalidateSize()

        const timer1 = setTimeout(() => {
            map.invalidateSize()
        }, 150)

        const timer2 = setTimeout(() => {
            map.invalidateSize()
        }, 450)

        let resizeObserver: ResizeObserver | null = null
        try {
            const container = map.getContainer()
            if (typeof ResizeObserver !== "undefined" && container) {
                resizeObserver = new ResizeObserver(() => {
                    map.invalidateSize()
                })
                resizeObserver.observe(container)
            }
        } catch {
            // Fallback an toàn
        }

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            if (resizeObserver) {
                resizeObserver.disconnect()
            }
        }
    }, [map])

    // Cập nhật lại khung vẽ khi đổi layer
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize()
        }, 100)
        return () => clearTimeout(timer)
    }, [activeLayer, map])

    // Recenter vị trí công dân
    useEffect(() => {
        if (recenterTrigger > 0) {
            map.flyTo([GIS_CITIZEN_DEFAULT_COORDS.lat, GIS_CITIZEN_DEFAULT_COORDS.lng], 16.5, {
                duration: 1.0,
            })
        }
    }, [recenterTrigger, map])

    // Pan tới điểm sự cố khi người dùng bấm chọn pin
    useEffect(() => {
        if (selectedPinCoords) {
            map.panTo([selectedPinCoords.lat, selectedPinCoords.lng], {
                animate: true,
                duration: 0.6,
            })
        }
    }, [selectedPinCoords, map])

    return null
}

const Map: React.FC = () => {
    const router = useIonRouter()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [activeFilter, setActiveFilter] = useState<MapFilterType>("all")
    const [activeLayer, setActiveLayer] = useState<MapLayerMode>("carto")
    const [selectedPin, setSelectedPin] = useState<MapIncidentPin>(MOCK_PINS[0])
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(true)
    const [isAvoidedRoute, setIsAvoidedRoute] = useState<boolean>(false)
    const [isRadarActive, setIsRadarActive] = useState<boolean>(false)
    const [recenterTrigger, setRecenterTrigger] = useState<number>(0)
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showToast, setShowToast] = useState<boolean>(false)

    // Mount an toàn cho Leaflet MapContainer trong Ionic
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true)
        }, 120)
        return () => clearTimeout(timer)
    }, [])

    // Cấu hình URL TileLayer chỉ gồm 2 lớp: CARTO (kèm API key từ .env) và Ảnh Vệ Tinh (Esri)
    const tileLayerConfig = useMemo(() => {
        if (activeLayer === "satellite") {
            return {
                url: GIS_TILE_LAYERS.satellite.url,
                attribution: GIS_TILE_LAYERS.satellite.attribution,
                subdomains: GIS_TILE_LAYERS.satellite.subdomains,
            }
        }

        // Mặc định: Lớp CARTO Voyager với API Key từ .env
        return {
            url: GIS_TILE_LAYERS.carto.url,
            attribution: GIS_TILE_LAYERS.carto.attribution,
            subdomains: GIS_TILE_LAYERS.carto.subdomains,
        }
    }, [activeLayer])

    // Lọc sự cố theo danh mục
    const filteredPins = useMemo(() => {
        return MOCK_PINS.filter(pin => {
            if (activeFilter === "all") return true
            if (activeFilter === "flood") return pin.type === "flood"
            if (activeFilter === "drain") return pin.type === "urgent"
            if (activeFilter === "construction") return pin.type === "construction"
            if (activeFilter === "completed") return pin.type === "completed"
            return true
        })
    }, [activeFilter])

    // Marker vị trí hiện tại của công dân (Số 24 Hàng Trống)
    const citizenMarkerIcon = useMemo(() => {
        return L.divIcon({
            className: "custom-incident-pin",
            html: `
                <div class="relative flex flex-col items-center pointer-events-auto cursor-pointer" title="Bạn đang ở đây (Số 24 Hàng Trống)">
                    <div class="px-2.5 py-1 mb-1 rounded-md bg-[#00152a] text-white font-sans text-[11px] font-semibold whitespace-nowrap shadow-md flex items-center gap-1 border border-white/20">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#74d3f4] animate-ping"></span>
                        <span>Bạn đang ở đây (Số 24 Hàng Trống)</span>
                    </div>
                    <div class="relative flex items-center justify-center w-8 h-8">
                        <div class="absolute w-8 h-8 rounded-full bg-[#006780]/25 animate-ping"></div>
                        <div class="w-5 h-5 rounded-full bg-[#006780] shadow-md flex items-center justify-center ring-2 ring-white">
                            <div class="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            `,
            iconSize: [220, 64],
            iconAnchor: [110, 56],
        })
    }, [])

    // Hàm tạo Icon Leaflet theo đúng TaskCode.md
    const createPinIcon = (pin: MapIncidentPin, isSelected: boolean) => {
        if (pin.type === "urgent") {
            return L.divIcon({
                className: "custom-incident-pin",
                html: `
                    <div class="relative flex flex-col items-center cursor-pointer transition-transform ${
                        isSelected ? "scale-115 drop-shadow-xl z-50" : "hover:scale-105"
                    }" title="${pin.code} - ${pin.title}">
                        <div class="px-2 py-0.5 mb-1 rounded bg-[#ba1a1a] text-white font-sans text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white/30 whitespace-nowrap">
                            <span class="material-symbols-outlined text-[13px]">warning</span>
                            <span>${pin.statusBadge}</span>
                        </div>
                        <div class="relative w-9 h-9 flex items-center justify-center">
                            <span class="material-symbols-outlined text-[#ba1a1a] text-[36px] drop-shadow-sm" style="font-variation-settings: 'FILL' 1;">location_on</span>
                            <span class="material-symbols-outlined text-white absolute top-1.5 text-[15px]">report</span>
                        </div>
                        <div class="w-2 h-1 bg-black/25 rounded-full blur-[1px]"></div>
                    </div>
                `,
                iconSize: [120, 60],
                iconAnchor: [60, 56],
            })
        }

        if (pin.type === "construction") {
            return L.divIcon({
                className: "custom-incident-pin",
                html: `
                    <div class="relative flex flex-col items-center cursor-pointer transition-transform ${
                        isSelected ? "scale-115 drop-shadow-xl z-50" : "hover:scale-105"
                    }" title="${pin.code} - ${pin.title}">
                        <div class="px-2 py-0.5 mb-1 rounded bg-[#7ddbfd] text-[#006077] font-sans text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 border border-[#006077]/30 whitespace-nowrap">
                            <span class="material-symbols-outlined text-[13px]">construction</span>
                            <span>${pin.statusBadge}</span>
                        </div>
                        <div class="relative w-8 h-8 flex items-center justify-center">
                            <span class="material-symbols-outlined text-[#93000a] text-[32px] drop-shadow-sm" style="font-variation-settings: 'FILL' 1;">location_on</span>
                            <span class="material-symbols-outlined text-white absolute top-1 text-[13px]">construction</span>
                        </div>
                    </div>
                `,
                iconSize: [120, 56],
                iconAnchor: [60, 52],
            })
        }

        if (pin.type === "completed") {
            return L.divIcon({
                className: "custom-incident-pin",
                html: `
                    <div class="relative flex flex-col items-center cursor-pointer transition-transform ${
                        isSelected ? "scale-115 drop-shadow-xl z-50" : "hover:scale-105"
                    }" title="${pin.code} - ${pin.title}">
                        <div class="px-2 py-0.5 mb-1 rounded bg-[#1aa54c] text-white font-sans text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white/30 whitespace-nowrap">
                            <span class="material-symbols-outlined text-[13px]">check</span>
                            <span>${pin.statusBadge}</span>
                        </div>
                        <div class="relative w-8 h-8 flex items-center justify-center">
                            <span class="material-symbols-outlined text-[#1aa54c] text-[30px] drop-shadow-sm" style="font-variation-settings: 'FILL' 1;">location_on</span>
                            <span class="material-symbols-outlined text-white absolute top-1 text-[13px]">check</span>
                        </div>
                    </div>
                `,
                iconSize: [120, 56],
                iconAnchor: [60, 52],
            })
        }

        // Flood pin
        return L.divIcon({
            className: "custom-incident-pin",
            html: `
                <div class="relative flex flex-col items-center cursor-pointer transition-transform ${
                    isSelected ? "scale-115 drop-shadow-xl z-50" : "hover:scale-105"
                }" title="${pin.code} - ${pin.title}">
                    <div class="px-2 py-0.5 mb-1 rounded bg-[#006780] text-white font-sans text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white/30 whitespace-nowrap">
                        <span class="material-symbols-outlined text-[13px]">flood</span>
                        <span>${pin.statusBadge}</span>
                    </div>
                    <div class="relative w-8 h-8 flex items-center justify-center">
                        <span class="material-symbols-outlined text-[#006780] text-[32px] drop-shadow-sm" style="font-variation-settings: 'FILL' 1;">location_on</span>
                        <span class="material-symbols-outlined text-white absolute top-1 text-[13px]">flood</span>
                    </div>
                </div>
            `,
            iconSize: [120, 56],
            iconAnchor: [60, 52],
        })
    }

    const handleSelectPin = (pin: MapIncidentPin) => {
        setSelectedPin(pin)
        setIsBottomSheetVisible(true)
        setIsAvoidedRoute(false)
    }

    const handleRecenter = () => {
        setRecenterTrigger(prev => prev + 1)
        setToastMessage("Đã định vị & căn giữa vị trí của bạn (24 Hàng Trống)")
        setShowToast(true)
    }

    const handleToggleLayers = () => {
        const nextLayer = activeLayer === "carto" ? "satellite" : "carto"
        setActiveLayer(nextLayer)
        setToastMessage(
            nextLayer === "satellite"
                ? "Đã kích hoạt lớp Bản đồ Ảnh Vệ Tinh Đô Thị (Esri World Imagery)"
                : "Đã kích hoạt lớp Bản đồ Đường Phố Đô Thị (CARTO Voyager)"
        )
        setShowToast(true)
    }

    const handleToggleRadar = () => {
        setIsRadarActive(prev => !prev)
        setToastMessage(
            isRadarActive
                ? "Đã tắt bán kính cảnh báo 2km"
                : "Đã kích hoạt bán kính cảnh báo nguy cơ ngập & sự cố 2km"
        )
        setShowToast(true)
    }

    const handleAvoidRoute = () => {
        setIsAvoidedRoute(true)
        setToastMessage("Đã cập nhật lộ trình di chuyển an toàn tránh điểm sự cố " + selectedPin.code)
        setShowToast(true)
    }

    const handleOpenDetail = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push(ROUTES.REPORTS, "forward", "push")
    }

    // Màn hình chờ khi Leaflet MapContainer chưa sẵn sàng
    if (!isMounted) {
        return (
            <div
                className="relative w-full h-[calc(100vh-8.5rem)] overflow-hidden bg-surface-container-low select-none flex flex-col items-center justify-center !gap-2 max-w-md mx-auto"
                id="gis-viewport"
            >
                <div className="w-9 h-9 !rounded-full border-3 border-secondary border-t-transparent animate-spin" />
                <span className="font-label-md text-[12px] text-on-surface-variant font-medium">
                    Đang kết nối bản đồ CARTO...
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full relative h-[calc(100vh-8.5rem)] overflow-hidden bg-surface-container-low max-w-md mx-auto">
            {/* 1. Leaflet Interactive GIS Map Canvas Engine y hệt grcadre */}
            <div className="w-full h-full relative z-0">
                <MapContainer
                    center={[GIS_CITIZEN_DEFAULT_COORDS.lat, GIS_CITIZEN_DEFAULT_COORDS.lng]}
                    zoom={GIS_ZOOM_CONFIG.DEFAULT_ZOOM}
                    minZoom={GIS_ZOOM_CONFIG.MIN_ZOOM}
                    maxZoom={GIS_ZOOM_CONFIG.MAX_ZOOM}
                    zoomControl={false}
                    className="w-full h-full"
                >
                    {/* Map Controller for Resize & Pan */}
                    <LeafletMapController
                        recenterTrigger={recenterTrigger}
                        activeLayer={activeLayer}
                        selectedPinCoords={selectedPin?.coords || null}
                    />

                    {/* Layer Tile của CARTO hoặc ESRI Satellite - Giới hạn maxZoom và maxNativeZoom 18 */}
                    <TileLayer
                        key={activeLayer}
                        url={tileLayerConfig.url}
                        attribution={tileLayerConfig.attribution}
                        subdomains={tileLayerConfig.subdomains}
                        maxZoom={GIS_ZOOM_CONFIG.MAX_ZOOM}
                        maxNativeZoom={GIS_ZOOM_CONFIG.MAX_NATIVE_ZOOM}
                    />

                    {/* Đa giác ranh giới hành chính: Phường Hàng Trống (giống grcadre) */}
                    <Polygon
                        positions={GIS_HANG_TRONG_BOUNDARY}
                        pathOptions={{
                            color: "#006780",
                            weight: 2.5,
                            dashArray: "6, 4",
                            fillColor: "#006780",
                            fillOpacity: activeLayer === "satellite" ? 0.15 : 0.06,
                        }}
                    />

                    {/* 2km Warning Radius Circle */}
                    {isRadarActive && (
                        <Circle
                            center={[GIS_CITIZEN_DEFAULT_COORDS.lat, GIS_CITIZEN_DEFAULT_COORDS.lng]}
                            radius={2000}
                            pathOptions={{
                                color: "#006780",
                                fillColor: "#006780",
                                fillOpacity: 0.12,
                                weight: 2,
                                dashArray: "4, 6",
                            }}
                        />
                    )}

                    {/* Citizen Current Location Marker */}
                    <Marker
                        position={[GIS_CITIZEN_DEFAULT_COORDS.lat, GIS_CITIZEN_DEFAULT_COORDS.lng]}
                        icon={citizenMarkerIcon}
                        eventHandlers={{
                            click: () => {
                                setToastMessage("Bạn đang ở Số 24 Hàng Trống, Hoàn Kiếm, Hà Nội")
                                setShowToast(true)
                            },
                        }}
                    />

                    {/* Dynamic Incident Pins */}
                    {filteredPins.map(pin => {
                        const isSelected = selectedPin.id === pin.id

                        return (
                            <Marker
                                key={pin.id}
                                position={[pin.coords.lat, pin.coords.lng]}
                                icon={createPinIcon(pin, isSelected)}
                                eventHandlers={{
                                    click: () => handleSelectPin(pin),
                                }}
                            />
                        )
                    })}
                </MapContainer>
            </div>

            {/* 2. Floating Top Filter Strip */}
            <div className="absolute top-3 inset-x-0 z-[1000] !px-margin pointer-events-auto">
                <div className="flex items-center !gap-space-xs overflow-x-auto !py-1 no-scrollbar">
                    {FILTER_OPTIONS.map(filter => {
                        const isActive = activeFilter === filter.key

                        return (
                            <button
                                key={filter.key}
                                className={`filter-btn flex items-center !gap-1.5 !px-3 !py-1.5 !rounded-lg font-label-sm text-label-sm whitespace-nowrap shadow-sm transition-colors cursor-pointer border-none font-semibold ${
                                    isActive
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                                }`}
                                type="button"
                                onClick={e => {
                                    e.stopPropagation()
                                    setActiveFilter(filter.key)
                                }}
                            >
                                {filter.icon && (
                                    <span className="material-symbols-outlined text-[16px]">
                                        {filter.icon}
                                    </span>
                                )}
                                {filter.dotColor && (
                                    <span className={`w-2 h-2 !rounded-full ${filter.dotColor}`}></span>
                                )}
                                <span>{filter.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* 3. Floating GIS Utility Controls (Right Side) */}
            <div className="absolute right-4 top-16 z-[1000] flex flex-col !gap-2 pointer-events-auto">
                {/* Recenter GPS */}
                <button
                    className="w-10 h-10 !rounded-lg bg-surface-container-lowest text-on-surface shadow-md flex items-center justify-center hover:bg-surface-container transition-transform cursor-pointer border-none active:scale-95"
                    id="recenterBtn"
                    title="Định vị của tôi"
                    type="button"
                    onClick={handleRecenter}
                >
                    <span className="material-symbols-outlined text-[20px] text-secondary">
                        my_location
                    </span>
                </button>

                {/* Layer Toggle (CARTO Voyager <-> Satellite) */}
                <button
                    className={`w-10 h-10 !rounded-lg shadow-md flex items-center justify-center transition-colors cursor-pointer border-none ${
                        activeLayer === "satellite"
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                    }`}
                    title={activeLayer === "satellite" ? "Bản đồ đường phố CARTO" : "Bản đồ ảnh vệ tinh Esri"}
                    type="button"
                    onClick={handleToggleLayers}
                >
                    <span className="material-symbols-outlined text-[20px]">layers</span>
                </button>

                {/* 2km Warning Radius Radar */}
                <button
                    className={`w-10 h-10 !rounded-lg shadow-md flex items-center justify-center transition-colors cursor-pointer border-none ${
                        isRadarActive
                            ? "bg-secondary text-white"
                            : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                    }`}
                    title="Bán kính 2km cảnh báo"
                    type="button"
                    onClick={handleToggleRadar}
                >
                    <span className="material-symbols-outlined text-[20px]">radar</span>
                </button>
            </div>

            {/* 4. Bottom Sheet: Incident Summary Card với nút ẩn xuống & thu gọn */}
            <div
                className={`absolute bottom-2 inset-x-4 z-[1000] transition-all duration-300 ease-out transform ${
                    isBottomSheetVisible
                        ? "translate-y-0 opacity-100 pointer-events-auto"
                        : "translate-y-full opacity-0 pointer-events-none"
                }`}
                id="incidentBottomSheet"
            >
                <div className="bg-surface-container-lowest !rounded-xl shadow-xl overflow-hidden !p-space-md border border-outline-variant/30">
                    {/* Top Bar: Drag Handle Indicator & Nút Ẩn Xuống */}
                    <div className="flex items-center justify-between !mb-2">
                        {/* Cân đối khoảng trống bên trái */}
                        <div className="w-7"></div>

                        {/* Thanh gạt kéo thu gọn */}
                        <div
                            className="w-10 h-1.25 bg-outline-variant/60 hover:bg-outline !rounded-full cursor-pointer transition-colors"
                            onClick={() => setIsBottomSheetVisible(false)}
                            title="Chạm để ẩn thông tin xuống"
                        />

                        {/* Nút bấm ẩn popup xuống rõ ràng */}
                        <button
                            type="button"
                            className="w-7 h-7 !rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary flex items-center justify-center transition-colors cursor-pointer border-none p-0"
                            onClick={() => setIsBottomSheetVisible(false)}
                            title="Ẩn thông tin sự cố xuống"
                            aria-label="Ẩn thông tin xuống"
                        >
                            <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
                        </button>
                    </div>

                    {/* Meta Tag & Time */}
                    <div className="flex items-start justify-between !gap-space-sm !mb-2">
                        <div className="flex items-center !gap-2">
                            <span className="!px-2 !py-0.5 !rounded-lg bg-error-container text-on-error-container font-code-tabular text-code-tabular font-bold">
                                {selectedPin.code}
                            </span>
                            <span
                                className={`!px-2 !py-0.5 !rounded-lg font-label-sm text-label-sm uppercase tracking-wider flex items-center !gap-1 font-bold ${
                                    selectedPin.statusBg
                                } ${selectedPin.statusColor}`}
                            >
                                <span className="w-1.5 h-1.5 !rounded-full bg-current"></span>
                                {selectedPin.statusBadge}
                            </span>
                        </div>
                        <span className="font-code-tabular text-code-tabular text-on-surface-variant flex items-center !gap-1 font-medium text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {selectedPin.timeAgo}
                        </span>
                    </div>

                    {/* Incident Title */}
                    <h2 className="font-headline-sm text-headline-sm text-on-surface !mb-1 flex items-center !gap-1.5 font-bold">
                        <span className="material-symbols-outlined text-error text-[20px]">
                            dangerous
                        </span>
                        <span>{selectedPin.title}</span>
                    </h2>

                    {/* Address & Geo-coordinates */}
                    <div className="flex items-center !gap-1 text-on-surface-variant !mb-3">
                        <span className="material-symbols-outlined text-secondary text-[16px] shrink-0">
                            place
                        </span>
                        <p className="font-body-sm text-body-sm truncate font-medium">
                            {selectedPin.address}
                        </p>
                    </div>

                    {/* Dispatch Operational Status */}
                    <div className="!p-2.5 !rounded-lg bg-surface-container-low !mb-space-md border border-outline-variant/20">
                        <div className="flex items-center !gap-2 !mb-1">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                                verified_user
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                                Tiến độ ứng phó đô thị
                            </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            {selectedPin.dispatchStatus}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 !gap-2">
                        <button
                            className={`h-10 !px-3 !rounded-lg font-label-md text-label-md flex items-center justify-center !gap-1.5 transition-colors cursor-pointer border-none font-semibold ${
                                isAvoidedRoute
                                    ? "bg-surface-container text-on-tertiary-container"
                                    : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface"
                            }`}
                            id="avoidRouteBtn"
                            type="button"
                            onClick={handleAvoidRoute}
                        >
                            {isAvoidedRoute ? (
                                <>
                                    <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">
                                        check_circle
                                    </span>
                                    <span>Đã cập nhật lộ trình</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px] text-error">
                                        alt_route
                                    </span>
                                    <span>Tránh tuyến này</span>
                                </>
                            )}
                        </button>

                        <button
                            className="h-10 !px-3 !rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center !gap-1.5 transition-colors shadow-sm cursor-pointer border-none font-semibold"
                            data-path="quan-ly-phan-anh-&-tra-cuu-ticket"
                            type="button"
                            onClick={handleOpenDetail}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                assignment_turned_in
                            </span>
                            <span>Mở chi tiết</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Nút mở lại Popup khi đang ở trạng thái ẩn */}
            {!isBottomSheetVisible && selectedPin && (
                <div className="absolute bottom-3 inset-x-4 z-[1000] flex justify-center pointer-events-auto">
                    <button
                        type="button"
                        onClick={() => setIsBottomSheetVisible(true)}
                        className="bg-surface-container-lowest/95 backdrop-blur-md !px-3.5 !py-2 !rounded-full shadow-lg border border-outline-variant/30 flex items-center !gap-2 text-on-surface hover:bg-surface-container transition-all cursor-pointer font-semibold text-[12px] active:scale-95"
                    >
                        <span className="w-2 h-2 !rounded-full bg-error animate-pulse"></span>
                        <span>Xem sự cố: {selectedPin.code}</span>
                        <span className="material-symbols-outlined text-[18px] text-secondary">
                            keyboard_arrow_up
                        </span>
                    </button>
                </div>
            )}

            {/* Micro Toast Feedback */}
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

export default Map
