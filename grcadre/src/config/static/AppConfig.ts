/**
 * Cấu hình thông tin ứng dụng, phiên bản và đơn vị hành chính công vụ tĩnh.
 * Không phụ thuộc vào database hay API động.
 */

export const APP_CONFIG = {
  APP_NAME: 'GovReport Cadre',
  SUB_TITLE: 'Cổng Tác Chiến Hiện Trường',
  VERSION: 'GovReport Cadre v3.4.12-PROV',
  ENCRYPTION_CHANNEL: 'Trực ban số: HN-BD-01 • Kênh mã hóa AES-256',
  DUTY_STATUS_TEXT: 'HỆ THỐNG TRỰC BAN 24/7',

  // Đơn vị hành chính chủ quản
  UNIT_NAME: 'UBND Phường Hàng Trống',
  DISTRICT_CITY: 'Quận Hoàn Kiếm, TP. Hà Nội',
  UNIT_SHORT: 'UBND P. Hàng Trống',

  // Đội công tác tác chiến
  TEAM_NAME: 'Đội Phản ứng nhanh số 1',
  TEAM_SHORT: 'Phản ứng nhanh 1',
  TEAM_CODE: 'TEAM-P1-01',
  TEAM_LEADER_TITLE: 'Tổ trưởng phản ứng nhanh',
  TEAM_LEADER_CODE: 'team_leader',

  // Chỉ huy kíp trực
  COMMANDER_NAME: 'Đ/c Trần Văn Hùng',
  COMMANDER_ROLE: 'Đội trưởng',

  // Đường dây nóng chỉ huy tác chiến 24/7
  HOTLINE_DISPLAY: '024.3825.xxxx (24/7)',
  HOTLINE_TEL: '02438250000',
  HOTLINE_1022: '1022',
} as const;

// Danh mục cơ quan trực thuộc (Tenants)
export const TENANT_AGENCIES = [
  { id: 'ubnd_hang_trong', name: 'UBND Phường Hàng Trống, Q. Hoàn Kiếm, Hà Nội' },
  { id: 'ubnd_trang_tien', name: 'UBND Phường Tràng Tiền, Q. Hoàn Kiếm, Hà Nội' },
  { id: 'ubnd_dong_xuan', name: 'UBND Phường Đồng Xuân, Q. Hoàn Kiếm, Hà Nội' },
  { id: 'ubnd_cua_dong', name: 'UBND Phường Cửa Đông, Q. Hoàn Kiếm, Hà Nội' },
  { id: 'tt_do_thi_hk', name: 'Đội Thanh tra Đô thị Quận Hoàn Kiếm' },
] as const;

// Danh mục đội/tổ công tác tác chiến
export const WORK_TEAMS = [
  { id: 'rapid_team_1', name: 'Đội Phản ứng nhanh số 1' },
  { id: 'rapid_team_2', name: 'Đội Phản ứng nhanh số 2' },
  { id: 'patrol_team', name: 'Tổ Tuần tra Trật tự Phố cổ' },
  { id: 'environment_team', name: 'Tổ Xử lý Vệ sinh Môi trường & Đô thị' },
  { id: 'cadre_desk', name: 'Bộ phận Tiếp nhận & Xử lý Hồ sơ Một cửa' },
] as const;

export default APP_CONFIG;
