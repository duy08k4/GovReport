// ======================================================
// INCIDENT MANAGEMENT SYSTEM
// Architecture: NestJS + TypeORM + PostgreSQL + PostGIS
// Authentication: Self-managed
// Storage: S3-compatible / MinIO
// ======================================================


// ======================================================
// 1. ENUMS
// ======================================================

Enum user_sex {
  male
  female
}

Enum platform_role {
  root_admin
  operator
}

Enum tenant_role {
  tenant_admin
  dispatcher
  team_leader
  field_worker
}

Enum account_status {
  pending_verification
  active
  blocked
}

Enum tenant_status {
  active
  inactive
}

Enum tenant_type {
  administrative
  sector
}

Enum administrative_unit_type {
  province
  municipality
  ward
  commune
  special_zone
  district_legacy [note: 'Đơn vị cấp huyện cũ, chỉ phục vụ dữ liệu lịch sử']
}

Enum report_status {
  submitted
  received
  in_progress
  resolved
  rejected
  closed
}

Enum report_priority {
  low
  normal
  high
  urgent
}

Enum auth_token_purpose {
  email_verification
  phone_verification
  password_reset
}

Enum storage_provider {
  local
  s3_compatible
}


// ======================================================
// 2. IDENTITY & AUTHENTICATION
// ======================================================

// Tài khoản xác thực do NestJS trực tiếp quản lý.
// Không phụ thuộc Supabase Auth.

Table accounts [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  email varchar(255) [unique]
  phone varchar(20) [unique]

  password_hash varchar(255) [not null]

  status account_status [not null, default: 'pending_verification']

  email_verified_at timestamptz
  phone_verified_at timestamptz

  password_changed_at timestamptz
  last_login_at timestamptz

  failed_login_attempts int [not null, default: 0]
  locked_until timestamptz

  created_at timestamptz [not null, default: `now()`]
  updated_at timestamptz [not null, default: `now()`]

  Note: 'Tài khoản đăng nhập độc lập với hồ sơ người dùng. Phải có ít nhất email hoặc phone làm định danh đăng nhập.'
}


// Một người dùng có thể có hồ sơ nghiệp vụ trước khi kích hoạt tài khoản.

Table users [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  account_id uuid [unique]

  name varchar(255) [not null]

  phone varchar(20)
  email varchar(255)
  address varchar(255)

  sex user_sex

  avatar_media_id uuid

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  Note: 'Hồ sơ người dùng thực tế. Không đặt global role tại đây vì quyền hệ thống và quyền cơ quan được quản lý riêng.'
}


// Quyền ở cấp nền tảng.
// Người dân không cần một bản ghi role riêng.

Table user_platform_roles [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  user_id uuid [not null]
  role platform_role [not null]

  created_at timestamptz [not null, default: `now()`]

  indexes {
    (user_id, role) [unique]
  }

  Note: 'Quyền quản trị và vận hành toàn nền tảng.'
}


// Mỗi bản ghi đại diện cho một phiên đăng nhập trên một thiết bị.

Table auth_sessions [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  account_id uuid [not null]

  token_family_id uuid [not null]

  device_name varchar(255)

  ip_address inet
  user_agent text

  last_used_at timestamptz

  expires_at timestamptz [not null]
  revoked_at timestamptz

  created_at timestamptz [not null, default: `now()`]

  indexes {
    account_id
    token_family_id
    expires_at
  }

  Note: 'Quản lý phiên đăng nhập theo từng thiết bị. Thu hồi session khi đăng xuất hoặc phát hiện bất thường.'
}


// Lưu lịch sử refresh token để hỗ trợ rotation và phát hiện reuse.

Table auth_refresh_tokens [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  session_id uuid [not null]

  token_hash char(64) [unique, not null]

  expires_at timestamptz [not null]

  used_at timestamptz
  revoked_at timestamptz

  created_at timestamptz [not null, default: `now()`]

  indexes {
    session_id
    expires_at
  }

  Note: 'Chỉ lưu hash của refresh token. Không lưu refresh token gốc.'
}


// Xác minh email, số điện thoại và đặt lại mật khẩu.

Table auth_verification_tokens [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  account_id uuid [not null]

  purpose auth_token_purpose [not null]

  recipient varchar(255) [not null]

  token_hash char(64) [unique, not null]

  expires_at timestamptz [not null]
  used_at timestamptz

  created_at timestamptz [not null, default: `now()`]

  indexes {
    (account_id, purpose)
    expires_at
  }

  Note: 'Token xác minh và khôi phục tài khoản. Chỉ lưu hash của token.'
}


// ======================================================
// 3. SENSITIVE USER INFORMATION
// ======================================================

Table leader_sensitive_profiles [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  user_id uuid [unique, not null]

  national_id_ciphertext text [not null]

  national_id_lookup_hash char(64) [unique, not null]
  hash_key_version smallint [not null, default: 1]

  digital_signature_cert_encrypted text

  emergency_phone varchar(20)

  encrypted_identity_data jsonb

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  Note: 'Dữ liệu định danh nhạy cảm. Mã hóa tại tầng ứng dụng; lookup hash sử dụng HMAC có khóa bí mật.'
}


// ======================================================
// 4. ORGANIZATION & TENANT MANAGEMENT
// ======================================================

// Tenant đại diện cho tổ chức sử dụng hệ thống.
// Không đồng nhất tenant với đơn vị hành chính.

Table tenants [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  tenant_code varchar(50) [unique, not null]

  name varchar(255) [not null]

  parent_tenant_id uuid

  tenant_type tenant_type [not null]

  status tenant_status [not null, default: 'active']

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  Note: 'Cơ quan hoặc tổ chức sử dụng hệ thống. Hỗ trợ cơ quan hành chính và đơn vị chuyên ngành.'
}


// Danh mục đơn vị hành chính.
// Dùng bảng thay vì hardcode hoàn toàn trong enum cấp hành chính.

Table administrative_units [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  code varchar(50) [unique, not null]

  name varchar(255) [not null]

  unit_type administrative_unit_type [not null]

  parent_id uuid

  boundary geometry [note: 'PostgreSQL thực tế: geometry(MultiPolygon, 4326)']

  is_active boolean [not null, default: true]

  valid_from date [not null]
  valid_to date

  created_at timestamptz [not null, default: `now()`]
  updated_at timestamptz [not null, default: `now()`]

  indexes {
    parent_id
    unit_type
    is_active
  }

  Note: 'Danh mục địa bàn hành chính có hỗ trợ lịch sử thay đổi, chia tách và sáp nhập.'
}


// Một tenant có thể quản lý một hoặc nhiều đơn vị hành chính.
// Hỗ trợ cả các đơn vị chuyên ngành quản lý trên nhiều địa bàn.

Table tenant_administrative_units [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  tenant_id uuid [not null]
  administrative_unit_id uuid [not null]

  is_primary boolean [not null, default: false]

  valid_from date [not null]
  valid_to date

  created_at timestamptz [not null, default: `now()`]

  indexes {
    (tenant_id, administrative_unit_id, valid_from) [unique]
    administrative_unit_id
  }

  Note: 'Liên kết cơ quan với địa bàn hành chính được giao quản lý.'
}


// Ranh giới tác nghiệp của tenant.
// Tách biệt với ranh giới hành chính gốc.

Table tenant_boundaries [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  tenant_id uuid [not null]

  boundary geometry [not null, note: 'PostgreSQL thực tế: geometry(MultiPolygon, 4326)']

  decision_version varchar(100) [not null]

  effective_from date [not null]
  effective_to date

  is_current boolean [not null, default: true]

  created_at timestamptz [not null, default: `now()`]

  indexes {
    tenant_id
    is_current
    effective_from
  }

  Note: 'Các phiên bản ranh giới địa bàn tác nghiệp theo quyết định hoặc nghị quyết.'
}


// ======================================================
// 5. TEAMS & TENANT MEMBERSHIPS
// ======================================================

// Một tenant có nhiều đội / tổ công tác.

Table teams [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  tenant_id uuid [not null]

  name varchar(255) [not null]

  code varchar(50)

  leader_membership_id uuid

  phone varchar(20)

  description text

  is_active boolean [not null, default: true]

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (tenant_id, code) [unique]
    (tenant_id, id) [unique]
    tenant_id
  }

  Note: 'Đội hoặc tổ công tác trực thuộc một tenant.'
}


// Quan hệ phân công cán bộ vào cơ quan.
// Một người có thể làm việc tại nhiều tenant.

Table tenant_memberships [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  tenant_id uuid [not null]

  user_id uuid [not null]

  team_id uuid

  cadre_code varchar(50)

  job_title varchar(100) [not null]

  appointment_decision_number varchar(255)

  is_primary boolean [not null, default: false]

  role tenant_role [not null]

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (tenant_id, user_id) [unique]
    (tenant_id, id) [unique]
    (tenant_id, team_id)
    user_id
    role
  }

  Note: 'Thông tin công tác của một người tại một tenant. Không đồng nhất với tài khoản đăng nhập.'
}


// ======================================================
// 6. INCIDENT CATEGORIES
// ======================================================

Table categories [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  code varchar(50) [unique, not null]

  name varchar(255) [not null]

  sla_response_hours int [not null, default: 2]

  sla_resolve_hours int [not null, default: 48]

  is_active boolean [not null, default: true]

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  Note: 'Danh mục loại hình sự cố hạ tầng đô thị. SLA tính theo giờ; cần kiểm tra giá trị lớn hơn 0.'
}


// ======================================================
// 7. INCIDENT REPORTS
// ======================================================

Table reports [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  ticket_code varchar(50) [unique, not null]

  tenant_id uuid

  category_id uuid [not null]

  reporter_id uuid

  anonymous_device_hash char(64)

  title varchar(255) [not null]

  description text [not null]

  address text [not null]

  location geometry [not null, note: 'PostgreSQL thực tế: geometry(Point, 4326)']

  priority report_priority [not null, default: 'normal']

  status report_status [not null, default: 'submitted']

  assigned_to_team_id uuid

  assigned_to_membership_id uuid

  resolved_at timestamptz

  updated_at timestamptz [not null, default: `now()`]
  created_at timestamptz [not null, default: `now()`]

  indexes {
    ticket_code
    tenant_id
    category_id
    reporter_id
    status
    (tenant_id, status, created_at)
    (tenant_id, id) [unique]
  }

  Note: 'Báo cáo sự cố. tenant_id có thể NULL trước khi hệ thống xác định cơ quan chịu trách nhiệm. anonymous_device_hash là HMAC của định danh thiết bị.'
}


// Lịch sử phân công.
// Không chỉ lưu người/đội đang phụ trách mà còn lưu toàn bộ lịch sử.

Table report_assignments [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  report_id uuid [not null]

  tenant_id uuid [not null]

  team_id uuid

  membership_id uuid

  assigned_by_user_id uuid

  assignment_note text

  assigned_at timestamptz [not null, default: `now()`]

  ended_at timestamptz

  created_at timestamptz [not null, default: `now()`]

  indexes {
    report_id
    tenant_id
    team_id
    membership_id
    (report_id, assigned_at)
  }

  Note: 'Lưu lịch sử điều phối và bàn giao sự cố. Ít nhất phải có team_id hoặc membership_id.'
}


// ======================================================
// 8. REPORT HISTORY
// ======================================================

// Lịch sử thay đổi trạng thái và xử lý báo cáo.

Table report_histories [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  report_id uuid [not null]

  actor_user_id uuid

  previous_status report_status

  new_status report_status [not null]

  action_note text

  created_at timestamptz [not null, default: `now()`]

  indexes {
    (report_id, created_at)
    actor_user_id
  }

  Note: 'Nhật ký trạng thái và hành động xử lý. actor_user_id NULL nếu là tác vụ hệ thống.'
}


// ======================================================
// 9. FILE STORAGE
// ======================================================

// Lưu metadata, không lưu file nhị phân trong PostgreSQL.
// File thực tế được lưu trong MinIO hoặc S3-compatible storage.

Table media_assets [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  storage_provider storage_provider [not null]

  bucket varchar(255) [not null]

  object_key text [not null]

  original_filename varchar(255) [not null]

  mime_type varchar(150) [not null]

  size_bytes bigint [not null]

  checksum_sha256 char(64)

  uploaded_by uuid

  created_at timestamptz [not null, default: `now()`]

  deleted_at timestamptz

  indexes {
    (storage_provider, bucket, object_key) [unique]
    uploaded_by
  }

  Note: 'Metadata file. Không lưu URL truy cập cố định; backend tạo URL hoặc signed URL khi cần.'
}


// File đính kèm trực tiếp báo cáo.

Table report_media [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  report_id uuid [not null]

  media_id uuid [not null]

  sort_order int [not null, default: 0]

  created_at timestamptz [not null, default: `now()`]

  indexes {
    (report_id, media_id) [unique]
    media_id
  }

  Note: 'Danh sách ảnh/video đính kèm báo cáo sự cố.'
}


// File đính kèm biên bản hoặc lịch sử xử lý.

Table report_history_media [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  history_id uuid [not null]

  media_id uuid [not null]

  sort_order int [not null, default: 0]

  created_at timestamptz [not null, default: `now()`]

  indexes {
    (history_id, media_id) [unique]
    media_id
  }

  Note: 'Ảnh/video làm bằng chứng trong từng lần xử lý sự cố.'
}


// ======================================================
// 10. SYSTEM AUDIT LOGS
// ======================================================

Table system_audit_logs [headercolor: #175e7a] {
  id uuid [pk, not null, default: `gen_random_uuid()`]

  user_id uuid

  account_id uuid

  tenant_id uuid

  action varchar(100) [not null]

  target_table varchar(100) [not null]

  target_id varchar(100) [not null]

  before_state jsonb

  after_state jsonb

  ip_address inet

  user_agent text

  created_at timestamptz [not null, default: `now()`]

  indexes {
    user_id
    account_id
    tenant_id
    action
    created_at
    (tenant_id, created_at)
  }

  Note: 'Nhật ký kiểm toán. Phải loại bỏ password, token và dữ liệu nhạy cảm trước khi ghi log.'
}


// ======================================================
// 11. RELATIONSHIPS
// ======================================================


// Identity

Ref: users.account_id - accounts.id

Ref: user_platform_roles.user_id > users.id

Ref: auth_sessions.account_id > accounts.id

Ref: auth_refresh_tokens.session_id > auth_sessions.id

Ref: auth_verification_tokens.account_id > accounts.id

Ref: leader_sensitive_profiles.user_id - users.id


// User media

Ref: users.avatar_media_id > media_assets.id

Ref: media_assets.uploaded_by > users.id


// Organization

Ref: tenants.parent_tenant_id > tenants.id

Ref: administrative_units.parent_id > administrative_units.id

Ref: tenant_administrative_units.tenant_id > tenants.id

Ref: tenant_administrative_units.administrative_unit_id > administrative_units.id

Ref: tenant_boundaries.tenant_id > tenants.id


// Teams and memberships

Ref: teams.tenant_id > tenants.id

Ref: tenant_memberships.tenant_id > tenants.id

Ref: tenant_memberships.user_id > users.id

Ref: tenant_memberships.(tenant_id, team_id) > teams.(tenant_id, id)

Ref: teams.(tenant_id, leader_membership_id) > tenant_memberships.(tenant_id, id)


// Reports

Ref: reports.tenant_id > tenants.id

Ref: reports.category_id > categories.id

Ref: reports.reporter_id > users.id

Ref: reports.(tenant_id, assigned_to_team_id) > teams.(tenant_id, id)

Ref: reports.(tenant_id, assigned_to_membership_id) > tenant_memberships.(tenant_id, id)


// Assignment history

Ref: report_assignments.(tenant_id, report_id) > reports.(tenant_id, id)

Ref: report_assignments.(tenant_id, team_id) > teams.(tenant_id, id)

Ref: report_assignments.(tenant_id, membership_id) > tenant_memberships.(tenant_id, id)

Ref: report_assignments.assigned_by_user_id > users.id


// Report history

Ref: report_histories.report_id > reports.id

Ref: report_histories.actor_user_id > users.id


// Report media

Ref: report_media.report_id > reports.id

Ref: report_media.media_id > media_assets.id

Ref: report_history_media.history_id > report_histories.id

Ref: report_history_media.media_id > media_assets.id


// Audit logs

Ref: system_audit_logs.user_id > users.id

Ref: system_audit_logs.account_id > accounts.id

Ref: system_audit_logs.tenant_id > tenants.id