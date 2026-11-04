/**
 * Cấu hình thẻ trạng thái (Report Status Tag) và mức độ ưu tiên (Report Priority Tag)
 * Chuẩn hóa 1:1 theo DBStructure.md:
 * - Enum report_status (submitted, received, in_progress, resolved, rejected, closed)
 * - Enum report_priority (low, normal, high, urgent)
 */

export type ReportStatus =
  | 'submitted'
  | 'received'
  | 'in_progress'
  | 'resolved'
  | 'rejected'
  | 'closed';

export interface StatusTagStyle {
  label: string;
  badgeBg: string;
  badgeColor: string;
  borderColor?: string;
  icon?: string;
  description: string;
}

export const REPORT_STATUS_CONFIG: Record<ReportStatus, StatusTagStyle> = {
  submitted: {
    label: 'Mới gửi',
    badgeBg: 'bg-surface-container-highest',
    badgeColor: 'text-on-surface-variant',
    borderColor: 'border-outline-variant/30',
    icon: 'hourglass_empty',
    description: 'Mới gửi: Sự cố vừa được gửi lên, đang chờ tiếp nhận ban đầu',
  },
  received: {
    label: 'Đã tiếp nhận',
    badgeBg: 'bg-blue-100',
    badgeColor: 'text-[#0284C7]',
    borderColor: 'border-blue-200',
    icon: 'assignment_turned_in',
    description: 'Đã tiếp nhận: Cơ quan thẩm quyền xác nhận xử lý đúng địa bàn và chuyên môn',
  },
  in_progress: {
    label: 'Đang xử lý',
    badgeBg: 'bg-amber-100',
    badgeColor: 'text-[#D97706]',
    borderColor: 'border-amber-200',
    icon: 'engineering',
    description: 'Đang xử lý: Đã điều động lực lượng xuống hiện trường khắc phục',
  },
  resolved: {
    label: 'Đã xử lý xong',
    badgeBg: 'bg-emerald-100',
    badgeColor: 'text-[#16A34A]',
    borderColor: 'border-emerald-200',
    icon: 'check_circle',
    description: 'Đã xử lý xong: Đã khắc phục xong tại hiện trường, chờ nghiệm thu',
  },
  rejected: {
    label: 'Bị từ chối',
    badgeBg: 'bg-red-100',
    badgeColor: 'text-error',
    borderColor: 'border-red-200',
    icon: 'cancel',
    description: 'Bị từ chối: Tin báo sai sự thật, spam, hoặc không thuộc thẩm quyền',
  },
  closed: {
    label: 'Đã đóng',
    badgeBg: 'bg-gray-100',
    badgeColor: 'text-gray-700',
    borderColor: 'border-gray-200',
    icon: 'lock',
    description: 'Đã đóng: Đã hoàn tất nghiệm thu, trả lời kết quả cho dân và lưu trữ',
  },
};

export type ReportPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface PriorityTagStyle {
  label: string;
  badgeBg: string;
  badgeColor: string;
  borderColor?: string;
  icon: string;
  description: string;
}

export const REPORT_PRIORITY_CONFIG: Record<ReportPriority, PriorityTagStyle> = {
  low: {
    label: 'Thấp',
    badgeBg: 'bg-surface-container',
    badgeColor: 'text-on-surface-variant',
    icon: 'arrow_downward',
    description: 'Thấp: Sự cố nhỏ, không gây ảnh hưởng lớn đến đời sống hay giao thông',
  },
  normal: {
    label: 'Bình thường',
    badgeBg: 'bg-surface-container-high',
    badgeColor: 'text-on-surface-variant',
    icon: 'info',
    description: 'Bình thường: Cần xử lý theo quy trình thông thường',
  },
  high: {
    label: 'Cao',
    badgeBg: 'bg-amber-100',
    badgeColor: 'text-[#D97706]',
    borderColor: 'border-amber-200',
    icon: 'priority_high',
    description: 'Cao: Ảnh hưởng sinh hoạt, cản trở giao thông hoặc tiềm ẩn rủi ro',
  },
  urgent: {
    label: 'Khẩn cấp',
    badgeBg: 'bg-error-container',
    badgeColor: 'text-on-error-container',
    borderColor: 'border-error/30',
    icon: 'campaign',
    description: 'Khẩn cấp: Nguy cơ đe dọa trực tiếp tính mạng hoặc tài sản lớn',
  },
};

export const RECORD_FILTER_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'submitted', label: 'Mới gửi' },
  { key: 'received', label: 'Đã tiếp nhận' },
  { key: 'in_progress', label: 'Đang xử lý' },
  { key: 'resolved', label: 'Đã xử lý xong' },
  { key: 'closed', label: 'Đã đóng' },
] as const;
