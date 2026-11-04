export interface AuditStep {
  id: string;
  title: string;
  time: string;
  description: string;
  icon: string;
  type: "citizen" | "postgis" | "warning" | "override";
}

export interface IncidentItem {
  id: string;
  code: string;
  timeAgo: string;
  title: string;
  category: string;
  categoryId: "drainage" | "electric" | "roads" | "trees";
  address: string;
  coordinates: string;
  lat: number;
  lng: number;
  agency: string;
  agencyTenantId: "ubnd-hoankiem" | "sgtvt-hanoi" | "socongthuong" | "evn-hanoi";
  agencyWarning?: string;
  priority: "urgent" | "high" | "normal" | "low";
  priorityLabel: string;
  status: "submitted" | "received" | "in_progress" | "resolved" | "rejected" | "closed";
  statusLabel: string;
  slaRemaining: string;
  isBreached?: boolean;
  isSpinning?: boolean;
  citizenQuote: string;
  photoUrl: string;
  photoName: string;
  auditTrail: AuditStep[];
}

export interface GeoConflictAlert {
  id: string;
  title: string;
  description: string;
  badge: string;
  isUrgent?: boolean;
}
