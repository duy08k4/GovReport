import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { UserSex } from '../enums/enums.js';
import { Account } from './accounts.en.js';
import { UserPlatformRole } from './user_platform_roles.en.js';
import { LeaderSensitiveProfile } from './leader_sensitive_profiles.en.js';
import { MediaAsset } from './media_assets.en.js';
import { TenantMembership } from './tenant_memberships.en.js';
import { Report } from './reports.en.js';
import { ReportAssignment } from './report_assignments.en.js';
import { ReportHistory } from './report_histories.en.js';
import { SystemAuditLog } from './system_audit_logs.en.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true, nullable: true })
  account_id: string | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string | null;

  @Column({
    type: 'enum',
    enum: UserSex,
    nullable: true,
  })
  sex: UserSex | null;

  @Column({ type: 'uuid', nullable: true })
  avatar_media_id: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @OneToOne(() => Account, (account) => account.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'account_id' })
  account?: Relation<Account> | null;

  @OneToMany(() => UserPlatformRole, (role) => role.user)
  platformRoles: Relation<UserPlatformRole>[];

  @OneToOne(() => LeaderSensitiveProfile, (profile) => profile.user)
  sensitiveProfile?: Relation<LeaderSensitiveProfile> | null;

  @ManyToOne(() => MediaAsset, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'avatar_media_id' })
  avatarMedia?: Relation<MediaAsset> | null;

  @OneToMany(() => MediaAsset, (media) => media.uploader)
  uploadedMedia: Relation<MediaAsset>[];

  @OneToMany(() => TenantMembership, (membership) => membership.user)
  memberships: Relation<TenantMembership>[];

  @OneToMany(() => Report, (report) => report.reporter)
  reports: Relation<Report>[];

  @OneToMany(() => ReportAssignment, (assignment) => assignment.assignedByUser)
  assignedReports: Relation<ReportAssignment>[];

  @OneToMany(() => ReportHistory, (history) => history.actorUser)
  reportHistories: Relation<ReportHistory>[];

  @OneToMany(() => SystemAuditLog, (log) => log.user)
  auditLogs: Relation<SystemAuditLog>[];
}
