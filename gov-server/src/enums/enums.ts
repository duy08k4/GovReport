export enum UserSex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum PlatformRole {
  ROOT_ADMIN = 'root_admin',
  OPERATOR = 'operator',
}

export enum TenantRole {
  TENANT_ADMIN = 'tenant_admin',
  DISPATCHER = 'dispatcher',
  TEAM_LEADER = 'team_leader',
  FIELD_WORKER = 'field_worker',
}

export enum AccountStatus {
  PENDING_VERIFICATION = 'pending_verification',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export enum TenantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum TenantType {
  ADMINISTRATIVE = 'administrative',
  SECTOR = 'sector',
}

export enum AdministrativeUnitType {
  PROVINCE = 'province',
  MUNICIPALITY = 'municipality',
  WARD = 'ward',
  COMMUNE = 'commune',
  SPECIAL_ZONE = 'special_zone',
  DISTRICT_LEGACY = 'district_legacy',
}

export enum ReportStatus {
  SUBMITTED = 'submitted',
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
  CLOSED = 'closed',
}

export enum ReportPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum AuthTokenPurpose {
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  PASSWORD_RESET = 'password_reset',
}

export enum StorageProvider {
  LOCAL = 'local',
  S3_COMPATIBLE = 's3_compatible',
}

