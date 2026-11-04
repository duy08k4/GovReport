export interface TenantCadre {
  id: string; // Khóa chính bản ghi tenant_memberships
  userId: string; // Khóa trỏ sang users.id
  tenantId: string; // Cơ quan cán bộ trực thuộc
  teamId?: string | null; // NULL nếu chưa tham gia đội nào theo schema tenant_memberships
  name: string; // users.name
  cadreCode: string; // tenant_memberships.cadre_code (VD: CC-0142)
  jobTitle: string; // tenant_memberships.job_title
  role: "tenant_admin" | "dispatcher" | "team_leader" | "field_worker";
  roleLabel: string;
  phone: string;
  email: string;
  avatarInitials: string;
  appointmentDecisionNumber?: string;
}

export interface TeamMember {
  id: string;
  membershipId?: string;
  userId?: string;
  teamId: string;
  name: string;
  code: string; // Mã định danh cán bộ (cadre_code)
  role: string; // Vai trò trong đội
  jobTitle?: string;
  phone: string;
  email: string;
  dutyStatus?: "ready" | "on_duty" | "off_duty";
  avatarInitials: string;
  joinedAt: string;
}

export interface TeamItem {
  id: string;
  tenantId: string;
  name: string; // Tên đội/tổ công tác (VD: Đội Phản ứng nhanh số 1, Tổ TTĐT số 2)
  code: string; // Mã định danh nội bộ (VD: PUN-01, TTDT-02)
  leaderUserId?: string;
  leaderName?: string;
  phone: string; // Hotline/SĐT liên lạc
  description: string; // Mô tả phạm vi chức năng, nhiệm vụ
  isActive: boolean; // Trạng thái hoạt động
  updatedAt: string;
  createdAt: string;
  members: TeamMember[];
}

export interface AgencyItem {
  id: string;
  code: string;
  name: string;
  parentCode?: string;
  parentName?: string;
  isCentral?: boolean;
  level: string;
  levelBadgeClass: string;
  category: string;
  status: "active" | "inactive";
  staffCount: string;
  staffSub: string;
  gisSynced: boolean;
  hotline?: string;
  address?: string;
}
