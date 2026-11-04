/**
 * Cấu hình không gian địa lý GIS, bản đồ và các lớp Tile Layers cho Citizen App.
 * Đồng bộ chính xác 100% với cấu hình GIS và API Key của grcadre.
 */

export interface MapCoords {
    lat: number
    lng: number
}

// Tọa độ vị trí công dân tại Số 24 Hàng Trống, Hoàn Kiếm, Hà Nội
export const GIS_CITIZEN_DEFAULT_COORDS: MapCoords = {
    lat: 21.0305,
    lng: 105.8508,
}

export const GIS_CITIZEN_DEFAULT_ADDRESS = "Số 24 Phố Hàng Trống, Hoàn Kiếm, Hà Nội"

// Bán kính cảnh báo nguy cơ đô thị (2km)
export const GIS_WARNING_RADIUS_METERS = 2000

// Ranh giới hành chính Phường Hàng Trống, Quận Hoàn Kiếm (giống grcadre)
export const GIS_HANG_TRONG_BOUNDARY: [number, number][] = [
    [21.0335, 105.8492],
    [21.0332, 105.8532],
    [21.0268, 105.8538],
    [21.0265, 105.8505],
    [21.0285, 105.849],
]

// Giới hạn Zoom chuẩn di động cho bản đồ tác chiến & cảnh báo đô thị
export const GIS_ZOOM_CONFIG = {
    DEFAULT_ZOOM: 16.2,
    MIN_ZOOM: 14,
    MAX_ZOOM: 18,
    MAX_NATIVE_ZOOM: 18,
} as const

// Lấy CARTO API Key từ biến môi trường .env (VITE_CARTO_API_KEY)
export const CARTO_API_KEY = import.meta.env.VITE_CARTO_API_KEY || ""

// Các nhà cung cấp lớp bản đồ nền (Tile Layers) y hệt grcadre
export const GIS_TILE_LAYERS = {
    carto: {
        key: "carto",
        name: "Bản Đồ CARTO",
        url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY || ""}`,
        attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        desc: "Bản đồ đô thị CARTO sắc nét, ranh giới hành chính & thủy hệ",
        icon: "map",
    },
    satellite: {
        key: "satellite",
        name: "Ảnh Vệ Tinh Hỗn Hợp",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "&copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community",
        subdomains: "abcd",
        desc: "Chụp không ảnh thực địa độ phân giải cao kết hợp tên phố",
        icon: "satellite_alt",
    },
} as const

export type GisLayerKey = keyof typeof GIS_TILE_LAYERS

export default GIS_CITIZEN_DEFAULT_COORDS
