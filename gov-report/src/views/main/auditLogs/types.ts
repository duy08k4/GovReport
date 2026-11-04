export type AuditAction =
  | "OVERRIDE_ROUTING"
  | "UPDATE_GIS"
  | "ASSIGN_CADRE"
  | "BLOCK_ACCOUNT"
  | "UPDATE_SLA"
  | "LOGIN";

export type AuditTargetTable =
  | "reports"
  | "tenants"
  | "tenant_boundaries"
  | "categories"
  | "users"
  | "leader_sensitive_profiles"
  | "auth_sessions";

export interface DiffFieldChange {
  key: string;
  before: any;
  after: any;
  isModified?: boolean;
  statusTag?: string; // e.g. "[CŨ]", "[MỚI - ĐIỀU CHUYỂN]", "[CẬP NHẬT]"
}

export interface DiffState {
  rawBefore: Record<string, any>;
  rawAfter: Record<string, any>;
  beforeSummary: string;
  afterSummary: string;
  changes: DiffFieldChange[];
}

export interface AuditLogRecord {
  id: string;
  timestamp: string; // e.g. "2026-03-29 14:28:12.894"
  hash: string; // e.g. "8f4a1c...e3d9"
  fullHash: string;
  previousHash: string;
  caCertificate: string;
  actor: {
    id: string; // e.g. "#AD-0091"
    name: string; // e.g. "Trần Anh Dũng"
    role: string; // e.g. "Root Admin"
    initials: string; // e.g. "HN"
    avatarBg: string;
    identityCard?: string; // e.g. "001089012984"
  };
  action: AuditAction;
  targetTable: AuditTargetTable;
  targetKey: string; // e.g. "SC-2026-HN09"
  ipAddress: string; // e.g. "118.70.192.88"
  deviceInfo: string; // e.g. "Chrome 122 (macOS ARM)"
  forensics: {
    userAgent: string;
    tokenVersion: string;
    ipGeoLocation: string;
  };
  diff: DiffState;
}

export interface AuditFilterState {
  action: string;
  targetTable: string;
  actorQuery: string;
  timeRange: string;
  ipAddress: string;
}
