import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useIonRouter, IonPage, IonContent, IonToast, IonModal } from "@ionic/react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"

// Config
import { ROUTES } from "../../config/Routing"
import { GIS_TILE_LAYERS } from "../../config/GisConfig"

// Type
import type { IncidentCategoryOption, IncidentFormState } from "./createReport.type"

const INCIDENT_CATEGORIES: IncidentCategoryOption[] = [
    {
        value: "ho-ga",
        label: "Hố ga mất nắp / Hư hỏng",
        group: "Hạ tầng giao thông & thoát nước",
    },
    {
        value: "duong-lun",
        label: "Đường sụt lún / Ổ gà nguy hiểm",
        group: "Hạ tầng giao thông & thoát nước",
    },
    {
        value: "chieu-sang",
        label: "Cột đèn / Dây điện đứt rơi",
        group: "Hạ tầng giao thông & thoát nước",
    },
    {
        value: "cay-gay",
        label: "Cây xanh gãy đổ cản trở",
        group: "Hạ tầng giao thông & thoát nước",
    },
    {
        value: "rac-thai",
        label: "Ùn ứ rác thải / Ô nhiễm cục bộ",
        group: "Hạ tầng giao thông & thoát nước",
    },
]

const SAMPLE_PHOTOS = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADZT28fU2p0waeBe0cK_dsOdK28WOujzLyeY6gCWh2VvXx68zsmLRXVQsDYNGLRj6b9c_AVyRSWpIgbPZysvbPvrBy0q0_dVLXJ5i1lqe4UJEcTtETbiyMFb6fn87WWxehJGN3Z296noos89_dIQFiBZWU0QImuCMrDpgMDhFcE1JiaK7-BuCba8_XMNRdxRUdHM9H4EWax9KYHk2nt4CxtEbCrdPybcbjDNiGKp0HKRqnavLJRXY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB0SlujYJrNLNC5VH19YA0MN47bxYCRHHq6kc6hI_Mk3V1-hmrvlmpefTvjJARxWmRJTkyYVyYUiR3PCq1C0ehsCOczzAwSyDfa2VHt8hVltne7MMlm4hpXzM0rc2iwKoaZl_B_Ohw_idgj_V_OKYrmHKXOc9Ois4LFjFSgRNIIS8OiBfqQHRg0z6fOmBTvr-BVODxBOhc6rH9mYpuQxa5_JQX3dojfOba_RYQJioV2En_gMByr7hU",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDw9Sl_Pv7Aib5-_KhsYTGA1c8m7sjyonNeBynF-Bw-J7cWgteWG73Ew3w7BxtLVFdwh6f0WVGbu-jNtjPNY2SO-mYrJjSDJIVQV0GsKg91pbF11rkZ21NwXwCXrP0kYA1l3jlo16eaQPILMV7fhbAZTcXg16MJIFAbLqPUXauLSg8aDuRaRbp9shCBGwE5DZRHdzDJnguH8sj2I2T6B5lsJQI6b2fOexSP0N5OX-0PRsfy3A0BC8s",
]

// Tọa độ GPS mặc định tự động (42 Tràng Tiền)
const DEFAULT_AUTO_GPS = {
    lat: 21.0254,
    lng: 105.8561,
    accuracy: 3.5,
    address: "Số 42 Phố Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội",
    adminUnit: "UBND Phường Tràng Tiền",
}

/**
 * Hàm ước tính địa chỉ và phường tiếp nhận từ tọa độ địa lý Hoàn Kiếm
 */
const estimateAddressFromCoords = (
    lat: number,
    lng: number
): { address: string; adminUnit: string } => {
    if (lat < 21.027) {
        return {
            address: `Số ${Math.floor(Math.abs(lng * 1000) % 65) + 1} Phố Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội`,
            adminUnit: "UBND Phường Tràng Tiền",
        }
    }
    if (lng > 105.852) {
        return {
            address: `Số ${Math.floor(Math.abs(lat * 1000) % 80) + 1} Phố Đinh Tiên Hoàng, P. Hàng Bạc, Q. Hoàn Kiếm, Hà Nội`,
            adminUnit: "UBND Phường Hàng Bạc",
        }
    }
    return {
        address: `Số ${Math.floor(Math.abs(lat * 1000) % 50) + 1} Phố Hàng Trống, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội`,
        adminUnit: "UBND Phường Hàng Trống",
    }
}

/**
 * Controller giúp Leaflet MapContainer trên trang chính cập nhật kích thước đúng tỉ lệ
 */
const LeafletMiniMapController: React.FC<{ coords: [number, number]; zoom?: number }> = ({
    coords,
    zoom = 17,
}) => {
    const map = useMap()

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize()
            map.setView(coords, zoom)
        }, 150)

        return () => clearTimeout(timer)
    }, [map, coords, zoom])

    return null
}

/**
 * Controller theo dõi chuyển động tâm bản đồ (Center Tracker) chuẩn Grab/Google Maps UX
 */
const ManualCenterTrackerController: React.FC<{
    initialCoords: [number, number]
    onCenterChange: (lat: number, lng: number) => void
    onMovingChange: (moving: boolean) => void
    onMapReady: (map: L.Map) => void
}> = ({ initialCoords, onCenterChange, onMovingChange, onMapReady }) => {
    const map = useMap()

    useEffect(() => {
        onMapReady(map)
        const timer = setTimeout(() => {
            map.invalidateSize()
            map.setView(initialCoords, 17)
        }, 150)

        return () => clearTimeout(timer)
    }, [map, initialCoords, onMapReady])

    useEffect(() => {
        const handleMoveStart = () => {
            onMovingChange(true)
        }

        const handleMove = () => {
            const center = map.getCenter()
            onCenterChange(center.lat, center.lng)
        }

        const handleMoveEnd = () => {
            onMovingChange(false)
            const center = map.getCenter()
            onCenterChange(center.lat, center.lng)
        }

        map.on("movestart", handleMoveStart)
        map.on("move", handleMove)
        map.on("moveend", handleMoveEnd)

        return () => {
            map.off("movestart", handleMoveStart)
            map.off("move", handleMove)
            map.off("moveend", handleMoveEnd)
        }
    }, [map, onCenterChange, onMovingChange])

    return null
}

const CreateReport: React.FC = () => {
    const router = useIonRouter()
    const manualMapInstanceRef = useRef<L.Map | null>(null)

    // Form State
    const [formState, setFormState] = useState<IncidentFormState>({
        images: [SAMPLE_PHOTOS[0]],
        activeImageIndex: 0,
        lat: DEFAULT_AUTO_GPS.lat,
        lng: DEFAULT_AUTO_GPS.lng,
        accuracyMeters: DEFAULT_AUTO_GPS.accuracy,
        timestamp: "08:30:14 | UTC+7",
        address: DEFAULT_AUTO_GPS.address,
        adminUnit: DEFAULT_AUTO_GPS.adminUnit,
        category: "ho-ga",
        description:
            "Hố ga sâu hơn 1m mất nắp hoàn toàn trên làn đường xe máy, trời mưa ngập rất nguy hiểm cho người đi đường!",
        isUrgent: true,
        isAnonymous: false,
        isSubmitting: false,
        isSubmitted: false,
        ticketCode: "#HN-8492",
        isManualLocation: false,
    })

    // UI Interactive States
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>("")
    const [showEditAddressModal, setShowEditAddressModal] = useState<boolean>(false)
    const [customAddressInput, setCustomAddressInput] = useState<string>(formState.address)

    // Manual Location Picker Modal states
    const [showManualMapModal, setShowManualMapModal] = useState<boolean>(false)
    const [isMapMoving, setIsMapMoving] = useState<boolean>(false)
    const [tempManualCoords, setTempManualCoords] = useState<{ lat: number; lng: number }>({
        lat: formState.lat,
        lng: formState.lng,
    })
    const [tempManualAddressInfo, setTempManualAddressInfo] = useState<{
        address: string
        adminUnit: string
    }>({
        address: formState.address,
        adminUnit: formState.adminUnit,
    })
    const [showConfirmLocationModal, setShowConfirmLocationModal] = useState<boolean>(false)

    // Tạo icon Marker Pin bằng Leaflet HTML cho mini map
    const centerPinIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
                <span style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background-color: rgba(0, 103, 128, 0.35); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
                <div style="width: 30px; height: 30px; border-radius: 9999px; background-color: #00152a; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.25); border: 2px solid #ffffff;">
                    <span class="material-symbols-outlined" style="font-size: 20px; color: #74d3f4;">location_on</span>
                </div>
            </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
    })

    const manualSelectPinIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">
                <span style="position: absolute; width: 38px; height: 38px; border-radius: 9999px; background-color: rgba(186, 26, 26, 0.35); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
                <div style="width: 32px; height: 32px; border-radius: 9999px; background-color: #ba1a1a; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px -1px rgba(186, 26, 26, 0.4); border: 2.5px solid #ffffff;">
                    <span class="material-symbols-outlined" style="font-size: 20px; color: #ffffff;">pin_drop</span>
                </div>
            </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
    })

    // Handlers
    const handleBack = () => {
        router.push(ROUTES.HOME, "back", "pop")
    }

    const handleRemoveActiveImage = () => {
        if (formState.images.length <= 1) {
            setToastMessage("Cần giữ ít nhất 1 ảnh hiện trường để đối soát!")
            setShowToast(true)
            return
        }

        const nextImages = formState.images.filter((_, idx) => idx !== formState.activeImageIndex)
        setFormState(prev => ({
            ...prev,
            images: nextImages,
            activeImageIndex: 0,
        }))
        setToastMessage("Đã gỡ ảnh hiện trường.")
        setShowToast(true)
    }

    const handleAddCloseUpPhoto = () => {
        if (formState.images.length >= 3) {
            setToastMessage("Đã đạt giới hạn tối đa 3 ảnh hiện trường.")
            setShowToast(true)
            return
        }

        const nextPhoto = SAMPLE_PHOTOS[formState.images.length % SAMPLE_PHOTOS.length]
        setFormState(prev => ({
            ...prev,
            images: [...prev.images, nextPhoto],
            activeImageIndex: prev.images.length,
        }))
        setToastMessage("Đã bổ sung ảnh cận cảnh hiện trường.")
        setShowToast(true)
    }

    const handleAddPanoramaPhoto = () => {
        if (formState.images.length >= 3) {
            setToastMessage("Đã đạt giới hạn tối đa 3 ảnh hiện trường.")
            setShowToast(true)
            return
        }

        const nextPhoto = SAMPLE_PHOTOS[(formState.images.length + 1) % SAMPLE_PHOTOS.length]
        setFormState(prev => ({
            ...prev,
            images: [...prev.images, nextPhoto],
            activeImageIndex: prev.images.length,
        }))
        setToastMessage("Đã bổ sung ảnh góc toàn cảnh khu vực.")
        setShowToast(true)
    }

    const handleResetToAutoGps = () => {
        setToastMessage("Đang khôi phục vị trí GPS tự động...")
        setShowToast(true)

        setTimeout(() => {
            setFormState(prev => ({
                ...prev,
                lat: DEFAULT_AUTO_GPS.lat,
                lng: DEFAULT_AUTO_GPS.lng,
                accuracyMeters: DEFAULT_AUTO_GPS.accuracy,
                address: DEFAULT_AUTO_GPS.address,
                adminUnit: DEFAULT_AUTO_GPS.adminUnit,
                timestamp: new Date().toLocaleTimeString("vi-VN") + " | UTC+7",
                isManualLocation: false,
            }))
            setToastMessage(
                `Đã khôi phục vị trí GPS: ${DEFAULT_AUTO_GPS.lat}°N, ${DEFAULT_AUTO_GPS.lng}°E`
            )
            setShowToast(true)
        }, 500)
    }

    const handleOpenManualPicker = () => {
        setTempManualCoords({
            lat: formState.lat,
            lng: formState.lng,
        })
        setTempManualAddressInfo({
            address: formState.address,
            adminUnit: formState.adminUnit,
        })
        setShowManualMapModal(true)
    }

    // Callback cập nhật tọa độ tâm trực tiếp khi người dùng kéo bản đồ
    const handleCenterChange = useCallback((lat: number, lng: number) => {
        const roundedLat = Number(lat.toFixed(5))
        const roundedLng = Number(lng.toFixed(5))
        setTempManualCoords({ lat: roundedLat, lng: roundedLng })

        const addressInfo = estimateAddressFromCoords(roundedLat, roundedLng)
        setTempManualAddressInfo(addressInfo)
    }, [])

    const handleResetManualMapToGps = () => {
        if (manualMapInstanceRef.current) {
            manualMapInstanceRef.current.flyTo(
                [DEFAULT_AUTO_GPS.lat, DEFAULT_AUTO_GPS.lng],
                17,
                { duration: 0.5 }
            )
        }
        handleCenterChange(DEFAULT_AUTO_GPS.lat, DEFAULT_AUTO_GPS.lng)
    }

    // Nhấn nút CHỌN VỊ TRÍ NÀY: Lấy đúng vị trí tâm view và hiện confirm
    const handleRequestConfirmManualLocation = () => {
        if (manualMapInstanceRef.current) {
            const center = manualMapInstanceRef.current.getCenter()
            handleCenterChange(center.lat, center.lng)
        }
        setShowConfirmLocationModal(true)
    }

    // Người dùng xác nhận lần 2 trên hộp thoại Confirm
    const handleConfirmManualLocationCommit = () => {
        setFormState(prev => ({
            ...prev,
            lat: tempManualCoords.lat,
            lng: tempManualCoords.lng,
            accuracyMeters: 1.0,
            address: tempManualAddressInfo.address,
            adminUnit: tempManualAddressInfo.adminUnit,
            isManualLocation: true,
        }))

        setShowConfirmLocationModal(false)
        setShowManualMapModal(false)
        setToastMessage("Đã cập nhật vị trí sự cố thủ công thành công.")
        setShowToast(true)
    }

    const handleToggleVoice = () => {
        const nextState = !isRecording
        setIsRecording(nextState)

        if (nextState) {
            setToastMessage("Hệ thống nhận diện giọng nói AI đang nghe...")
            setShowToast(true)
            setTimeout(() => {
                setFormState(prev => ({
                    ...prev,
                    description:
                        prev.description +
                        " Hố ga sâu nguy hiểm, đã có xe máy bị trượt ngã vào sáng nay, đề nghị khẩn cấp cử đội kỹ thuật xử lý rào chắn!",
                }))
                setIsRecording(false)
                setToastMessage("Đã chuyển đổi giọng nói thành văn bản thành công.")
                setShowToast(true)
            }, 3000)
        }
    }

    const handleSaveAddress = () => {
        setFormState(prev => ({
            ...prev,
            address: customAddressInput,
        }))
        setShowEditAddressModal(false)
        setToastMessage("Đã cập nhật địa chỉ phản ánh.")
        setShowToast(true)
    }

    const handleSubmitReport = () => {
        if (formState.isSubmitting || formState.isSubmitted) return

        setFormState(prev => ({ ...prev, isSubmitting: true }))

        setTimeout(() => {
            setFormState(prev => ({
                ...prev,
                isSubmitting: false,
                isSubmitted: true,
            }))
            setToastMessage(
                `Phản ánh đã được gửi thành công tới ${formState.adminUnit}!`
            )
            setShowToast(true)

            setTimeout(() => {
                router.push(ROUTES.REPORTS, "forward", "push")
            }, 1400)
        }, 900)
    }

    return (
        <IonPage className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen">
            {/* Header chuẩn Mobile Stack */}
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
                            Tạo Phản Ánh Hiện Trường
                        </h1>
                    </div>

                    <div className="flex items-center !gap-space-sm !pr-space-xs">
                        <button
                            type="button"
                            aria-label="Tùy chọn khác"
                            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface !rounded bg-transparent border-none cursor-pointer"
                            onClick={() => {
                                setToastMessage("Phiên bản GovReport Mobile v2.4.0")
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

            {/* Nội dung cuộn chính */}
            <IonContent fullscreen className="ion-no-padding">
                <main className="flex-1 flex flex-col relative w-full !pt-14 pb-safe bg-surface">
                    <div className="flex flex-col w-full !pb-8 max-w-md mx-auto">
                        {/* Status Context Banner */}
                        <div className="!px-margin !pt-space-sm !pb-space-xs bg-surface-container-low flex items-center justify-between border-b border-outline-variant/15">
                            <div className="flex items-center !gap-space-xs">
                                <span className="w-2 h-2 !rounded-full bg-on-tertiary-container animate-pulse"></span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                                    Hệ thống tiếp nhận 24/7 trực tuyến
                                </span>
                            </div>
                            <span className="font-code-tabular text-code-tabular text-secondary font-semibold">
                                Tự động định vị AI
                            </span>
                        </div>

                        <div className="flex flex-col !px-margin !gap-space-md !mt-space-sm">
                            {/* 1. KHỐI CHỤP ẢNH HIỆN TRƯỜNG (Bắt buộc) */}
                            <section className="flex flex-col !gap-space-xs bg-surface-container-lowest !p-space-sm !rounded-lg shadow-sm border border-outline-variant/15">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center !gap-space-xs">
                                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                                            1. Hình ảnh hiện trường
                                        </span>
                                        <span className="font-label-sm text-label-sm text-error font-bold">
                                            * Bắt buộc
                                        </span>
                                    </div>
                                    <span className="font-code-tabular text-code-tabular text-on-surface-variant">
                                        {formState.images.length}/3 ảnh
                                    </span>
                                </div>

                                {/* Khung ảnh 16:9 với Watermark GPS ngầm */}
                                <div className="relative w-full aspect-[16/9] !rounded overflow-hidden bg-surface-container">
                                    <img
                                        className="w-full h-full object-cover transition-opacity duration-300"
                                        alt="Góc nhìn thực tế cận cảnh hiện trường hố ga nguy hiểm"
                                        src={formState.images[formState.activeImageIndex] || formState.images[0]}
                                    />

                                    {/* Live Watermark Overlay */}
                                    <div className="absolute bottom-0 inset-x-0 bg-primary/80 backdrop-blur-sm text-on-primary !px-space-sm !py-1 flex items-center justify-between text-xs">
                                        <div className="flex items-center !gap-1">
                                            <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                                                pin_drop
                                            </span>
                                            <span className="font-code-tabular text-code-tabular text-surface">
                                                {formState.lat}°N, {formState.lng}°E
                                            </span>
                                        </div>
                                        <span className="font-code-tabular text-code-tabular text-surface-container-highest">
                                            {formState.timestamp}
                                        </span>
                                    </div>

                                    {/* Tag Xác thực hình ảnh */}
                                    <div className="absolute top-2 left-2 bg-primary-container/90 text-primary-fixed !px-2 !py-0.5 !rounded flex items-center !gap-1 shadow-sm backdrop-blur-xs">
                                        <span className="material-symbols-outlined text-[13px] text-tertiary-fixed">
                                            verified
                                        </span>
                                        <span className="font-label-sm text-label-sm font-medium">
                                            Đã gắn tọa độ gốc
                                        </span>
                                    </div>

                                    {/* Nút gỡ ảnh */}
                                    <button
                                        type="button"
                                        aria-label="Xóa ảnh này"
                                        className="absolute top-2 right-2 w-7 h-7 !rounded bg-primary/70 text-on-primary flex items-center justify-center hover:bg-primary transition-colors border-none cursor-pointer"
                                        onClick={handleRemoveActiveImage}
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                </div>

                                {/* Chụp thêm ảnh khác */}
                                <div className="grid grid-cols-2 !gap-space-xs !pt-space-xs">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center !gap-1 !py-2 !px-space-xs bg-surface-container-low hover:bg-surface-container text-secondary !rounded transition-colors text-center border-none cursor-pointer font-medium"
                                        onClick={handleAddCloseUpPhoto}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                                        <span className="font-label-sm text-label-sm">Chụp thêm cận cảnh</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center !gap-1 !py-2 !px-space-xs bg-surface-container-low hover:bg-surface-container text-secondary !rounded transition-colors text-center border-none cursor-pointer font-medium"
                                        onClick={handleAddPanoramaPhoto}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">panorama</span>
                                        <span className="font-label-sm text-label-sm">Chụp góc toàn cảnh</span>
                                    </button>
                                </div>
                            </section>

                            {/* 2. KHỐI VỊ TRÍ SỰ CỐ (Tự động ghim GPS & Chọn vị trí thủ công) */}
                            <section className="flex flex-col !gap-space-xs bg-surface-container-lowest !p-space-sm !rounded-lg shadow-sm border border-outline-variant/15">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center !gap-1.5">
                                        <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                                            2. Vị trí sự cố xác thực
                                        </span>
                                        {formState.isManualLocation ? (
                                            <span className="!px-2 !py-0.5 !rounded bg-error-container text-on-error-container font-code-tabular text-[11px] font-semibold">
                                                Chọn thủ công
                                            </span>
                                        ) : (
                                            <span className="!px-2 !py-0.5 !rounded bg-secondary/15 text-secondary font-code-tabular text-[11px] font-semibold">
                                                GPS Tự động
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center !gap-1 bg-surface-container-high !px-2 !py-0.5 !rounded text-secondary font-code-tabular text-code-tabular">
                                        <span className="material-symbols-outlined text-[14px]">my_location</span>
                                        <span>Độ chính xác: {formState.accuracyMeters}m</span>
                                    </div>
                                </div>

                                {/* Bản đồ mở rộng (h-60) với CARTO Voyager TileLayer & Action Buttons */}
                                <div className="relative w-full h-60 !rounded-xl overflow-hidden border border-outline-variant/20 z-0 shadow-inner">
                                    <MapContainer
                                        center={[formState.lat, formState.lng]}
                                        zoom={17}
                                        scrollWheelZoom={false}
                                        dragging={true}
                                        zoomControl={false}
                                        className="w-full h-full z-0"
                                    >
                                        <TileLayer
                                            url={GIS_TILE_LAYERS.carto.url}
                                            attribution={GIS_TILE_LAYERS.carto.attribution}
                                            subdomains={GIS_TILE_LAYERS.carto.subdomains}
                                        />
                                        <Marker
                                            position={[formState.lat, formState.lng]}
                                            icon={formState.isManualLocation ? manualSelectPinIcon : centerPinIcon}
                                        />
                                        <LeafletMiniMapController coords={[formState.lat, formState.lng]} />
                                    </MapContainer>

                                    {/* Overlay nhẹ */}
                                    <div className="absolute inset-0 bg-primary/10 pointer-events-none z-10"></div>

                                    {/* Floating Action Bar: Định vị lại & Chọn vị trí thủ công */}
                                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between !gap-2 z-20">
                                        <button
                                            type="button"
                                            className="bg-surface-container-lowest/95 hover:bg-surface-container text-on-surface !px-2.5 !py-1.5 !rounded-lg shadow-md flex items-center !gap-1.5 border border-outline-variant/20 cursor-pointer font-medium text-xs backdrop-blur-sm transition-all"
                                            onClick={handleResetToAutoGps}
                                            title="Khôi phục về tọa độ GPS tự động ban đầu"
                                        >
                                            <span className="material-symbols-outlined text-[16px] text-secondary">
                                                my_location
                                            </span>
                                            <span className="font-label-sm">Định vị lại GPS</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="bg-secondary text-white hover:bg-on-secondary-container !px-3 !py-1.5 !rounded-lg shadow-md flex items-center !gap-1.5 border-none cursor-pointer font-medium text-xs transition-all active:scale-95"
                                            onClick={handleOpenManualPicker}
                                            title="Mở bản đồ lớn để chọn vị trí thủ công"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                edit_location_alt
                                            </span>
                                            <span className="font-label-sm">Chọn vị trí thủ công</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Địa chỉ nhận diện tự động & PostGIS Route */}
                                <div className="flex flex-col !gap-space-xs !mt-space-xs">
                                    <div className="!p-space-xs bg-surface-container-low !rounded flex items-start justify-between !gap-space-sm border border-outline-variant/15">
                                        <div className="flex items-start !gap-space-xs min-w-0">
                                            <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 shrink-0">
                                                home_pin
                                            </span>
                                            <div className="min-w-0">
                                                <span className="font-label-sm text-label-sm text-on-surface-variant block">
                                                    Địa chỉ hiện trường (tọa độ {formState.lat}°N, {formState.lng}°E)
                                                </span>
                                                <p className="font-body-md text-body-md text-on-surface font-medium truncate">
                                                    {formState.address}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            aria-label="Sửa địa chỉ"
                                            className="text-secondary hover:text-on-secondary-fixed-variant !p-1 !rounded font-label-sm text-label-sm shrink-0 flex items-center bg-transparent border-none cursor-pointer"
                                            onClick={() => {
                                                setCustomAddressInput(formState.address)
                                                setShowEditAddressModal(true)
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">edit</span>
                                        </button>
                                    </div>

                                    <div className="!px-space-xs !py-1.5 bg-surface-container !rounded flex items-center justify-between border border-outline-variant/15">
                                        <div className="flex items-center !gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-secondary">
                                                account_balance
                                            </span>
                                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                                                Đơn vị tiếp nhận (PostGIS routing):
                                            </span>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface font-semibold bg-surface-container-lowest !px-2 !py-0.5 !rounded shadow-sm">
                                            {formState.adminUnit}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* 3. KHỐI PHÂN LOẠI SỰ CỐ */}
                            <section className="flex flex-col !gap-space-xs bg-surface-container-lowest !p-space-sm !rounded-lg shadow-sm border border-outline-variant/15">
                                <div className="flex items-center justify-between">
                                    <label
                                        className="font-label-lg text-label-lg text-on-surface font-semibold"
                                        htmlFor="incident-category"
                                    >
                                        3. Phân loại sự cố
                                    </label>
                                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                                        Hạ tầng giao thông &amp; thoát nước
                                    </span>
                                </div>
                                <div className="relative">
                                    <select
                                        id="incident-category"
                                        className="w-full h-10 !pl-3 !pr-10 appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-body-md text-body-md !rounded cursor-pointer outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-colors border border-outline-variant/20"
                                        value={formState.category}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, category: e.target.value }))
                                        }
                                    >
                                        {INCIDENT_CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center !px-2 pointer-events-none text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[20px]">
                                            expand_more
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* 4. KHỐI MÔ TẢ HIỆN TRƯỜNG */}
                            <section className="flex flex-col !gap-space-xs bg-surface-container-lowest !p-space-sm !rounded-lg shadow-sm border border-outline-variant/15">
                                <div className="flex items-center justify-between">
                                    <label
                                        className="font-label-lg text-label-lg text-on-surface font-semibold"
                                        htmlFor="incident-desc"
                                    >
                                        4. Mô tả chi tiết hiện trường
                                    </label>
                                    <button
                                        type="button"
                                        id="voice-record-btn"
                                        title="Nhấn để nói"
                                        className={`flex items-center !gap-1 !px-2 !py-1 !rounded transition-colors border-none cursor-pointer ${
                                            isRecording
                                                ? "bg-error text-on-error"
                                                : "bg-surface-container-high text-secondary hover:bg-secondary hover:text-on-secondary"
                                        }`}
                                        onClick={handleToggleVoice}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-[16px] ${
                                                isRecording ? "animate-pulse" : ""
                                            }`}
                                        >
                                            {isRecording ? "radio_button_checked" : "mic"}
                                        </span>
                                        <span className="font-label-sm text-label-sm font-medium">
                                            {isRecording ? "Đang nghe..." : "Giọng nói"}
                                        </span>
                                    </button>
                                </div>
                                <div className="relative">
                                    <textarea
                                        id="incident-desc"
                                        className="w-full !p-space-xs bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md !rounded outline-none focus:ring-1 focus:ring-secondary transition-colors resize-none placeholder:text-on-surface-variant/60 border border-outline-variant/20"
                                        placeholder="Mô tả cụ thể kích thước, tình trạng hiện trường..."
                                        rows={3}
                                        value={formState.description}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, description: e.target.value }))
                                        }
                                    ></textarea>
                                </div>
                            </section>

                            {/* 5. CỜ BÁO KHẨN CẤP (Urgent Priority Toggle) */}
                            <section className="!p-space-sm bg-error-container/20 !rounded-lg flex items-center justify-between !gap-space-sm border border-error/25">
                                <div className="flex items-start !gap-space-xs">
                                    <span className="material-symbols-outlined text-error text-[22px] mt-0.5 shrink-0">
                                        warning
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md text-error font-semibold">
                                            Cờ báo khẩn cấp (Ưu tiên số 1)
                                        </span>
                                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                                            Nguy cơ tai nạn chết người hoặc chấn thương tức thì
                                        </span>
                                    </div>
                                </div>
                                {/* Custom Toggle */}
                                <button
                                    type="button"
                                    aria-checked={formState.isUrgent}
                                    aria-label="Cờ báo khẩn cấp"
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer !rounded-full transition-colors duration-200 ease-in-out focus:outline-none border-none p-0 ${
                                        formState.isUrgent ? "bg-error" : "bg-surface-container-highest"
                                    }`}
                                    role="switch"
                                    onClick={() =>
                                        setFormState(prev => ({ ...prev, isUrgent: !prev.isUrgent }))
                                    }
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform !rounded-full bg-surface shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                                            formState.isUrgent ? "translate-x-5" : "translate-x-0"
                                        }`}
                                    ></span>
                                </button>
                            </section>

                            {/* 6. TÙY CHỌN QUYỀN RIÊNG TƯ */}
                            <section className="!px-space-xs !py-space-xs flex items-center !gap-space-sm bg-surface-container-low !rounded border border-outline-variant/15">
                                <input
                                    id="anon-checkbox"
                                    type="checkbox"
                                    className="w-4 h-4 text-primary !rounded bg-surface-container-lowest cursor-pointer accent-secondary"
                                    checked={formState.isAnonymous}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, isAnonymous: e.target.checked }))
                                    }
                                />
                                <label
                                    htmlFor="anon-checkbox"
                                    className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer"
                                >
                                    <strong className="font-semibold text-on-surface">Gửi ẩn danh:</strong>{" "}
                                    Chỉ cung cấp hình ảnh và tọa độ GPS, không chia sẻ thông tin định danh công dân cho đơn vị xử lý.
                                </label>
                            </section>

                            {/* 7. NÚT GỬI PHẢN ÁNH (Full-width CTA ở đáy) */}
                            <div className="!mt-space-xs flex flex-col !gap-space-xs">
                                <button
                                    id="submit-report-btn"
                                    type="button"
                                    disabled={formState.isSubmitting || formState.isSubmitted}
                                    className={`w-full h-12 font-label-lg text-label-lg !rounded shadow-sm flex items-center justify-center !gap-space-sm transition-all transform active:scale-[0.99] border-none cursor-pointer font-bold ${
                                        formState.isSubmitted
                                            ? "bg-tertiary-container text-tertiary-fixed"
                                            : formState.isSubmitting
                                              ? "bg-primary-container text-primary-fixed opacity-90 cursor-wait"
                                              : "bg-primary-container active:bg-primary text-on-primary hover:bg-primary-container/90"
                                    }`}
                                    onClick={handleSubmitReport}
                                >
                                    {formState.isSubmitted ? (
                                        <>
                                            <span className="material-symbols-outlined text-[20px]">
                                                check_circle
                                            </span>
                                            <span>ĐÃ TIẾP NHẬN - SỐ PHIẾU {formState.ticketCode}</span>
                                        </>
                                    ) : formState.isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined text-[20px] animate-spin">
                                                progress_activity
                                            </span>
                                            <span>Đang truyền dữ liệu GIS...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                                                send
                                            </span>
                                            <span>GỬI PHẢN ÁNH CHO CHÍNH QUYỀN</span>
                                        </>
                                    )}
                                </button>

                                {/* Feedback note */}
                                <p className="font-label-sm text-label-sm text-on-surface-variant text-center">
                                    Mã tra cứu PostGIS sẽ tự sinh và đồng bộ vào Zalo/SMS sau khi tiếp nhận.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </IonContent>

            {/* Modal Bản đồ toàn màn hình: Chọn vị trí thủ công chuẩn Grab / Google Maps UX */}
            <IonModal
                isOpen={showManualMapModal}
                onDidDismiss={() => setShowManualMapModal(false)}
            >
                <div className="flex flex-col h-full w-full bg-surface">
                    {/* Header Modal */}
                    <div className="h-14 !px-4 bg-surface/95 backdrop-blur-md flex items-center justify-between border-b border-outline-variant/20 z-30">
                        <div className="flex items-center !gap-2.5">
                            <button
                                type="button"
                                className="w-9 h-9 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface border-none cursor-pointer"
                                onClick={() => setShowManualMapModal(false)}
                            >
                                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                            </button>
                            <div className="flex flex-col">
                                <h3 className="font-label-lg text-label-lg font-bold text-on-surface leading-tight">
                                    Chọn vị trí trên bản đồ
                                </h3>
                                <span className="font-label-sm text-on-surface-variant text-xs">
                                    Kéo bản đồ để đặt tâm vào đúng sự cố
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-9 h-9 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                            onClick={() => setShowManualMapModal(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    {/* Vùng Bản đồ tương tác toàn màn hình với tâm ngắm & Pin neo ở chính giữa */}
                    <div className="flex-1 relative w-full z-10 overflow-hidden">
                        <MapContainer
                            center={[tempManualCoords.lat, tempManualCoords.lng]}
                            zoom={17}
                            scrollWheelZoom={true}
                            dragging={true}
                            zoomControl={false}
                            className="w-full h-full z-10"
                        >
                            <TileLayer
                                url={GIS_TILE_LAYERS.carto.url}
                                attribution={GIS_TILE_LAYERS.carto.attribution}
                                subdomains={GIS_TILE_LAYERS.carto.subdomains}
                            />
                            <ManualCenterTrackerController
                                initialCoords={[tempManualCoords.lat, tempManualCoords.lng]}
                                onCenterChange={handleCenterChange}
                                onMovingChange={setIsMapMoving}
                                onMapReady={map => {
                                    manualMapInstanceRef.current = map
                                }}
                            />
                        </MapContainer>

                        {/* Tâm giữa màn hình: Vòng ngắm chính xác & Pin neo định vị chuẩn Grab / Google Maps */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <div className="relative flex flex-col items-center justify-center -translate-y-4">
                                {/* Vòng tâm ngắm hỗ trợ ngắm chính xác sự cố */}
                                <div
                                    className={`w-12 h-12 !rounded-full border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
                                        isMapMoving
                                            ? "border-secondary scale-110 bg-secondary/15"
                                            : "border-secondary/60 scale-100 bg-secondary/5"
                                    }`}
                                >
                                    <div className="w-2 h-2 !rounded-full bg-secondary shadow-sm"></div>
                                </div>

                                {/* Pin định vị nổi ở trên điểm tâm, nảy lên khi kéo bản đồ */}
                                <div
                                    className={`absolute bottom-6 flex flex-col items-center transition-transform duration-150 ${
                                        isMapMoving ? "-translate-y-3 scale-110" : "translate-y-0 scale-100"
                                    }`}
                                >
                                    <div className="w-10 h-10 !rounded-full bg-error text-white flex items-center justify-center shadow-xl border-2 border-white ring-2 ring-error/30">
                                        <span className="material-symbols-outlined text-[22px]">
                                            pin_drop
                                        </span>
                                    </div>
                                    {/* Mũi kim cắm đúng tâm vòng tròn */}
                                    <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-error -mt-0.5"></div>
                                </div>

                                {/* Bóng đổ của Pin trên mặt đường */}
                                <div
                                    className={`absolute bottom-4 w-5 h-1.5 !rounded-full bg-black/35 blur-[1px] transition-all duration-150 ${
                                        isMapMoving ? "scale-75 opacity-30" : "scale-100 opacity-80"
                                    }`}
                                ></div>
                            </div>
                        </div>

                        {/* Nút reset về GPS hiện tại góc trên bên phải */}
                        <button
                            type="button"
                            className="absolute top-4 right-4 z-20 bg-surface-container-lowest/95 hover:bg-surface-container text-on-surface !px-3 !py-2 !rounded-xl shadow-lg flex items-center !gap-1.5 border border-outline-variant/20 cursor-pointer font-medium text-xs backdrop-blur-md transition-all active:scale-95"
                            onClick={handleResetManualMapToGps}
                        >
                            <span className="material-symbols-outlined text-[18px] text-secondary">
                                my_location
                            </span>
                            <span>Về GPS gốc</span>
                        </button>

                        {/* Hướng dẫn thao tác nổi góc trên bên trái */}
                        <div className="absolute top-4 left-4 z-20 bg-primary/85 text-white !px-3 !py-1.5 !rounded-xl shadow-md backdrop-blur-sm flex items-center !gap-1.5 pointer-events-none">
                            <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                                pan_tool
                            </span>
                            <span className="font-label-sm text-xs">
                                {isMapMoving ? "Đang di chuyển..." : "Tâm ghim sẽ là vị trí chọn"}
                            </span>
                        </div>
                    </div>

                    {/* Footer Sheet: Hiển thị thông tin điểm ngay tâm view & Nút CHỌN VỊ TRÍ NÀY */}
                    <div className="!p-4 bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col !gap-3 shadow-lg z-30 max-w-md mx-auto w-full">
                        <div className="!p-3 !rounded-xl bg-surface-container-low flex flex-col !gap-1 border border-outline-variant/15">
                            <div className="flex items-center justify-between">
                                <span className="font-label-sm text-secondary font-bold uppercase tracking-wider flex items-center !gap-1">
                                    <span className="w-2 h-2 !rounded-full bg-secondary animate-pulse"></span>
                                    Vị trí tại tâm ngắm
                                </span>
                                <span className="font-code-tabular text-on-surface-variant font-semibold text-xs">
                                    {tempManualCoords.lat}°N, {tempManualCoords.lng}°E
                                </span>
                            </div>
                            <p className="font-body-md text-sm text-on-surface font-medium truncate">
                                {tempManualAddressInfo.address}
                            </p>
                            <div className="flex items-center !gap-1 text-xs text-on-surface-variant">
                                <span className="material-symbols-outlined text-[14px] text-secondary">
                                    account_balance
                                </span>
                                <span>Tiếp nhận: {tempManualAddressInfo.adminUnit}</span>
                            </div>
                        </div>

                        {/* Nút CHỌN VỊ TRÍ NÀY - Lấy chính xác vị trí ở tâm giữa màn hình */}
                        <button
                            type="button"
                            className="w-full h-12 bg-secondary active:bg-on-secondary-container text-white font-label-lg font-bold !rounded-xl shadow-md flex items-center justify-center !gap-2 border-none cursor-pointer transition-all active:scale-[0.99]"
                            onClick={handleRequestConfirmManualLocation}
                        >
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            <span>CHỌN VỊ TRÍ NÀY</span>
                        </button>
                    </div>
                </div>
            </IonModal>

            {/* Modal Xác nhận Đổi vị trí thủ công (Confirm Dialog - Bước 2) */}
            <IonModal
                isOpen={showConfirmLocationModal}
                onDidDismiss={() => setShowConfirmLocationModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4">
                    <div className="flex items-start !gap-3">
                        <div className="w-10 h-10 !rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[22px]">pin_drop</span>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Xác nhận đổi vị trí hiện trường?
                            </h3>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                                Bạn đang thay đổi vị trí sự cố sang điểm đã ngắm tại tâm:
                            </span>
                        </div>
                    </div>

                    <div className="!p-3.5 !rounded-xl bg-surface-container-low flex flex-col !gap-1.5 border border-outline-variant/20">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-label-sm text-outline font-semibold">TỌA ĐỘ TẠI TÂM</span>
                            <span className="font-code-tabular font-bold text-secondary">
                                {tempManualCoords.lat}°N, {tempManualCoords.lng}°E
                            </span>
                        </div>
                        <div className="font-body-md text-sm text-on-surface font-medium">
                            {tempManualAddressInfo.address}
                        </div>
                        <div className="flex items-center !gap-1 text-xs text-on-surface-variant pt-1 border-t border-outline-variant/15">
                            <span className="material-symbols-outlined text-[14px] text-secondary">
                                account_balance
                            </span>
                            <span>Đơn vị xử lý: <strong>{tempManualAddressInfo.adminUnit}</strong></span>
                        </div>
                    </div>

                    <p className="font-body-sm text-xs text-outline leading-relaxed">
                        Lưu ý: Tọa độ mới sẽ được chuyển trực tiếp cho đơn vị hành chính quản lý địa bàn để điều phối cán bộ hiện trường.
                    </p>

                    <div className="grid grid-cols-2 !gap-3 !pt-1">
                        <button
                            type="button"
                            className="h-10 !rounded-lg bg-surface-container-low text-on-surface font-label-md font-semibold border-none cursor-pointer hover:bg-surface-container transition-colors"
                            onClick={() => setShowConfirmLocationModal(false)}
                        >
                            HỦY BỎ
                        </button>
                        <button
                            type="button"
                            className="h-10 !rounded-lg bg-secondary text-white font-label-md font-semibold border-none cursor-pointer hover:bg-on-secondary-container transition-colors shadow-sm"
                            onClick={handleConfirmManualLocationCommit}
                        >
                            XÁC NHẬN VỊ TRÍ
                        </button>
                    </div>
                </div>
            </IonModal>

            {/* Modal Sửa địa chỉ trực tiếp */}
            <IonModal
                isOpen={showEditAddressModal}
                onDidDismiss={() => setShowEditAddressModal(false)}
                className="modal-compact"
            >
                <div className="bg-surface-container-lowest !p-5 !rounded-t-2xl flex flex-col !gap-4">
                    <div className="flex items-center justify-between border-b border-outline-variant/20 !pb-3">
                        <div className="flex items-center !gap-2">
                            <div className="w-8 h-8 !rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">edit_location</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                                Chỉnh sửa địa chỉ sự cố
                            </h3>
                        </div>
                        <button
                            type="button"
                            className="w-8 h-8 !rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border-none cursor-pointer"
                            onClick={() => setShowEditAddressModal(false)}
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>

                    <div className="flex flex-col !gap-2">
                        <label className="font-label-sm text-on-surface-variant font-medium">
                            Địa chỉ hiện trường cụ thể
                        </label>
                        <input
                            type="text"
                            value={customAddressInput}
                            onChange={e => setCustomAddressInput(e.target.value)}
                            className="w-full h-11 !px-3 bg-surface-container-low text-on-surface font-body-md !rounded-lg border border-outline-variant/30 outline-none focus:ring-1 focus:ring-secondary"
                            placeholder="Nhập số nhà, tên đường, phường..."
                        />
                    </div>

                    <div className="grid grid-cols-2 !gap-3 !pt-2">
                        <button
                            type="button"
                            className="h-10 !rounded-lg bg-surface-container-low text-on-surface font-label-md font-semibold border-none cursor-pointer hover:bg-surface-container transition-colors"
                            onClick={() => setShowEditAddressModal(false)}
                        >
                            HỦY
                        </button>
                        <button
                            type="button"
                            className="h-10 !rounded-lg bg-secondary text-white font-label-md font-semibold border-none cursor-pointer hover:bg-on-secondary-container transition-colors"
                            onClick={handleSaveAddress}
                        >
                            LƯU ĐỊA CHỈ
                        </button>
                    </div>
                </div>
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

export default CreateReport
