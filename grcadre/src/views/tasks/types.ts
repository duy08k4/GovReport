import { ReportStatus, ReportPriority } from '../../config/static/ReportStateTag';

export type TaskScope = 'my-tasks' | 'team-tasks';

export interface TaskItem {
  id: string;
  code: string; // Tương ứng ticket_code trong bảng reports của DBStructure.md
  title: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  distance: string;
  address: string;
  slaText: string;
  slaColor?: string;
  slaIcon?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageBadge?: string;
  assignedToMe: boolean;
  isUnassigned?: boolean;
  assignmentSource?: 'self_claimed' | 'tenant_dispatched';
  assignedTeamName?: string; // Tương ứng teams.name (assigned_to_team_id)
  assignedLeaderName?: string; // Tương ứng users.name (assigned_to_user_id / teams.leader_user_id)
  tenantDirective?: string; // Chỉ đạo từ Dispatcher / Tenant
  status: ReportStatus; // Chuẩn hóa enum report_status theo DBStructure.md
  priority?: ReportPriority; // Chuẩn hóa enum report_priority theo DBStructure.md
  completedTime?: string;
}

export interface KpiData {
  needReceive: number;
  inProgress: number;
  slaWarning: number;
}

export interface UrgentAlert {
  id: string;
  code: string;
  level: string;
  distance: string;
  title: string;
  description: string;
  slaRemaining: string;
  isAccepted: boolean;
}
