export type NotificationCategory = 'all' | 'urgent' | 'assignment' | 'sla' | 'system';

export interface LocationPreview {
  distance: string;
  coords: string;
}

export interface DispatcherInfo {
  name: string;
  initials: string;
  role: string;
  unit: string;
}

export interface SlaInfo {
  remainingText: string;
  elapsedPercent: number;
}

export interface AlertNotification {
  id: string;
  category: 'urgent' | 'assignment' | 'sla' | 'system';
  isRead: boolean;
  timeAgo: string;
  badgeLabel: string;
  title?: string;
  ticketCode?: string;
  description: string;
  locationPreview?: LocationPreview;
  dispatcher?: DispatcherInfo;
  sla?: SlaInfo;
  issuedBy?: string;
  actionText: string;
  actionIcon: string;
  targetRoute?: string;
}

export interface FilterChip {
  key: NotificationCategory;
  label: string;
  count?: number;
  hasUrgentDot?: boolean;
}
