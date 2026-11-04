import { ReportStatus, ReportPriority } from '../../config/static/ReportStateTag';

export type RecordScope = 'agency' | 'team';

export type RecordStatus = 'all' | ReportStatus;

export interface AssignedCadre {
  id: string;
  name: string;
  initials: string;
  role: string;
  statusText: string;
  distanceText: string;
  phone: string;
  isReady: boolean;
  avatarBg?: string;
  avatarColor?: string;
}

export type AssignmentSource = 'self_claimed' | 'tenant_dispatched';

export interface AssignedTeamInfo {
  id: string;
  name: string;
  code: string;
  leaderName: string;
  leaderRole: string;
  leaderPhone: string;
  isMyTeam: boolean;
}

export interface IncidentRecord {
  id: string;
  code: string;
  title: string;
  address: string;
  status: ReportStatus;
  statusLabel: string;
  statusBadgeBg: string;
  statusBadgeColor: string;
  priority?: ReportPriority;
  priorityLabel?: string;
  timeText: string;
  teamName: string;
  imageUrl?: string;
  imageAlt?: string;
  imageBadge?: string;
  assignedCadre?: AssignedCadre;
  assignedCadres?: AssignedCadre[];
  assignedTeam?: AssignedTeamInfo;
  assignmentSource?: AssignmentSource;
  tenantDirective?: string;
  progressPercent?: number;
  progressStepText?: string;
  slaRemainingText?: string;
  proofNote?: string;
  photosCount?: number;
  isMyTeam: boolean;
}
