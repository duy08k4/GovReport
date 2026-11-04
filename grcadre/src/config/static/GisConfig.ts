/**
 * Cấu hình không gian địa lý GIS, bản đồ và lớp ranh giới hành chính.
 * Toàn bộ tọa độ, nhà cung cấp bản đồ nền (Tile Layers) và danh mục lọc không gian.
 */

export interface MapCoords {
  lat: number;
  lng: number;
}

// Tọa độ chốt trực trung tâm: Cán bộ tại 24 Hàng Trống, Hoàn Kiếm, Hà Nội
export const GIS_CADRE_DEFAULT_COORDS: MapCoords = {
  lat: 21.0305,
  lng: 105.8508,
};

export const GIS_CADRE_DEFAULT_ADDRESS = '24 Hàng Trống, Q. Hoàn Kiếm, Hà Nội';

// Bán kính tác chiến mặc định xung quanh vị trí cán bộ
export const GIS_OPERATION_RADIUS_METERS = 500;

// Ranh giới hành chính Phường Hàng Trống, Quận Hoàn Kiếm
export const GIS_HANG_TRONG_BOUNDARY: [number, number][] = [
  [21.0335, 105.8492],
  [21.0332, 105.8532],
  [21.0268, 105.8538],
  [21.0265, 105.8505],
  [21.0285, 105.849],
];

// Giới hạn Zoom chuẩn di động cho bản đồ tác chiến
export const GIS_ZOOM_CONFIG = {
  DEFAULT_ZOOM: 16,
  MIN_ZOOM: 14,
  MAX_ZOOM: 18,
  MAX_NATIVE_ZOOM: 18,
} as const;

// Các nhà cung cấp lớp bản đồ nền (Tile Layers)
export const GIS_TILE_LAYERS = {
  carto: {
    key: 'carto',
    name: 'Bản Đồ CARTO',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO &copy; OpenStreetMap contributors',
    subdomains: 'abcd',
    desc: 'Bản đồ đô thị CARTO sắc nét, ranh giới hành chính & thủy hệ',
    icon: 'map',
  },
  satellite: {
    key: 'satellite',
    name: 'Ảnh Vệ Tinh Hỗn Hợp',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye',
    subdomains: 'abc',
    desc: 'Chụp không ảnh thực địa độ phân giải cao kết hợp tên phố',
    icon: 'satellite_alt',
  },
} as const;

// Danh mục bộ lọc sự cố trên thanh HUD GIS
export const GIS_FILTER_CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'my-team', label: 'Việc Đội tôi' },
  { key: '500m', label: 'Bán kính 500m' },
  { key: 'cay-xanh', label: 'Cây xanh' },
  { key: 'ho-ga', label: 'Hố ga' },
  { key: 'thoat-nuoc', label: 'Thoát nước' },
] as const;

export default GIS_CADRE_DEFAULT_COORDS;
