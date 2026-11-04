import { APP_CONFIG } from './AppConfig';

/**
 * Cấu hình thông tin hồ sơ cán bộ, pháp lý công vụ và trang thiết bị tác chiến tĩnh.
 * Không phụ thuộc vào database.
 */

export const CADRE_DEFAULT_PROFILE = {
  id: 'cadre-0842',
  name: 'Đ/c Nguyễn Văn Bình',
  code: 'CC-HN-0842',
  cadreType: 'Cán bộ chính quy',
  position: 'Chuyên viên Quản lý Trật tự Đô thị',
  roleBadge: APP_CONFIG.TEAM_LEADER_TITLE,
  roleBadgeCode: APP_CONFIG.TEAM_LEADER_CODE,
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDvm_G_qR1BlKN_uA-0SzmNfwM3AWtnweAbKiV-5Cs-aGLcVbLwN_KcvqpRpJY7NivS21YYKS_j6vKYbCrJPFEduZimVAhT9OArWCMJfd0lTeCtqZT79J5KUAtT9RxMO8KOyXFOAwMMMol__o2WzNbzjdIzswUixQc68ADPSWeIy7AehHNkINbJXCQkmnuoyGnPeZOpIGp06MS4rvuhKv62DDazt5VEMz42l2NUarHgY_XjKAr5r80',
  isVerified: true,
  dutyStatus: 'on_duty' as const,
  dutyStatusLabel: 'Đang trong ca trực',
  sessionDuration: '04g 28ph liên tục',
  agencyUnit: APP_CONFIG.UNIT_NAME,
  districtCity: APP_CONFIG.DISTRICT_CITY,
  teamName: APP_CONFIG.TEAM_NAME,
  teamCode: APP_CONFIG.TEAM_CODE,
  commanderName: APP_CONFIG.COMMANDER_NAME,
  commanderRole: APP_CONFIG.COMMANDER_ROLE,
  hotlineFormatted: APP_CONFIG.HOTLINE_DISPLAY,
  hotlineTel: APP_CONFIG.HOTLINE_TEL,
  certTitle: 'Chữ ký số Chuyên dùng Công vụ',
  certIssuer: 'Ban Cơ yếu Chính phủ (BCY-CP)',
  certStatus: 'Hợp lệ',
  certExpiry: '12/2027',
  certTokenType: 'PKI Hardware Token',
  vneidNumber: '001092004***',
  vneidLevel: 'Định danh cấp độ 2',
};

// Cài đặt ca trực mặc định
export const CADRE_DEFAULT_SETTINGS = {
  alertOutsideDuty: true,
  emergencySirenVolume: 100,
};

// Danh mục kiểm đếm quân tư trang bàn giao ca
export const CADRE_HANDOVER_EQUIPMENT = [
  { id: 'walkie', label: 'Bộ đàm kỹ thuật số Motorola DMR', defaultChecked: true },
  { id: 'meter', label: 'Máy đo cường độ âm thanh cầm tay', defaultChecked: true },
  { id: 'token', label: 'Thẻ PKI Hardware Token BCY-CP', defaultChecked: true },
  { id: 'vehicle', label: 'Phương tiện xe máy điện tuần tra', defaultChecked: true },
];

// Danh sách cán bộ trực ban sẵn sàng điều động / đổi ca
export const CADRE_TEAM_ROSTER = [
  {
    id: 'cadre-1',
    name: 'Nguyễn Văn Bình',
    code: 'CC-HN-0842',
    initials: 'NB',
    role: 'Cán bộ Trật tự đô thị • Đang xử lý 1 việc',
    statusText: 'Đang xử lý 1 việc',
    distanceText: 'Cách 350m',
    phone: '0912345678',
    isReady: false,
    avatarBg: 'bg-secondary-container',
    avatarColor: 'text-on-secondary-container',
  },
  {
    id: 'cadre-2',
    name: 'Lê Hoàng Nam',
    code: 'CC-HN-0843',
    initials: 'LN',
    role: 'Sẵn sàng nhận lệnh (Vừa xong SC-03)',
    statusText: 'Sẵn sàng nhận lệnh',
    distanceText: 'Cách 120m',
    phone: '0987654321',
    isReady: true,
    avatarBg: 'bg-primary-container',
    avatarColor: 'text-on-primary',
  },
  {
    id: 'cadre-3',
    name: 'Vũ Anh Tuấn',
    code: 'CC-HN-0844',
    initials: 'VT',
    role: 'Cán bộ Địa chính - Xây dựng',
    statusText: 'Tại trụ sở',
    distanceText: 'Tại trụ sở',
    phone: '0901234567',
    isReady: true,
    avatarBg: 'bg-surface-container-highest',
    avatarColor: 'text-primary',
  },
];

// Danh sách các Đội công tác chuyên trách trực thuộc Tenant/Cơ quan
export interface TenantTeamItem {
  id: string;
  name: string;
  code: string;
  specialization: string;
  leaderName: string;
  leaderRole: string;
  leaderPhone: string;
  leaderInitials: string;
  membersCount: number;
  isMyTeam: boolean;
  status: 'active' | 'busy' | 'standby';
  statusLabel: string;
  distanceText: string;
  avatarBg: string;
  avatarColor: string;
}

export const TENANT_TEAMS_ROSTER: TenantTeamItem[] = [
  {
    id: 'team-1',
    name: 'Đội Phản ứng nhanh số 1',
    code: 'PUN-01',
    specialization: 'Xử lý sự cố khẩn cấp, cứu nạn & trật tự cơ động',
    leaderName: 'Đ/c Nguyễn Văn Bình',
    leaderRole: 'Đội trưởng • Kíp trực chính',
    leaderPhone: '0912345678',
    leaderInitials: 'NB',
    membersCount: 4,
    isMyTeam: true,
    status: 'active',
    statusLabel: 'Sẵn sàng nhận lệnh',
    distanceText: 'Cách 180m',
    avatarBg: 'bg-primary-container',
    avatarColor: 'text-on-primary',
  },
  {
    id: 'team-2',
    name: 'Đội Quản lý Trật tự Đô thị',
    code: 'TTDT-01',
    specialization: 'Biển hiệu lấn chiếm, lòng đường vỉa hè & trật tự xây dựng',
    leaderName: 'Đ/c Lê Hoàng Nam',
    leaderRole: 'Đội trưởng TTĐT',
    leaderPhone: '0987654321',
    leaderInitials: 'LN',
    membersCount: 6,
    isMyTeam: false,
    status: 'active',
    statusLabel: 'Đang tuần tra',
    distanceText: 'Cách 350m',
    avatarBg: 'bg-secondary-container',
    avatarColor: 'text-on-secondary-container',
  },
  {
    id: 'team-3',
    name: 'Đội Cây xanh Đô thị',
    code: 'CX-02',
    specialization: 'Cắt tỉa, giải tỏa cây gãy đổ & công viên cây xanh',
    leaderName: 'Đ/c Trần Quốc Toản',
    leaderRole: 'Tổ trưởng Cây xanh',
    leaderPhone: '0901234567',
    leaderInitials: 'TQ',
    membersCount: 5,
    isMyTeam: false,
    status: 'standby',
    statusLabel: 'Trực trạm cơ động',
    distanceText: 'Cách 750m',
    avatarBg: 'bg-[#F0FDF4]',
    avatarColor: 'text-[#16A34A]',
  },
  {
    id: 'team-4',
    name: 'Đội Thoát nước & Chống ngập',
    code: 'TN-01',
    specialization: 'Khơi thông cống ngầm, xử lý hố ga & bơm ngập úng đô thị',
    leaderName: 'Đ/c Vũ Anh Tuấn',
    leaderRole: 'Tổ trưởng Thoát nước',
    leaderPhone: '0934567890',
    leaderInitials: 'VT',
    membersCount: 4,
    isMyTeam: false,
    status: 'active',
    statusLabel: 'Sẵn sàng thiết bị',
    distanceText: 'Cách 520m',
    avatarBg: 'bg-[#EFF6FF]',
    avatarColor: 'text-[#2563EB]',
  },
];

export default CADRE_DEFAULT_PROFILE;
