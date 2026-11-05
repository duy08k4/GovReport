import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { TenantStatus, TenantType } from '../enums/enums.js';
import { TenantAdministrativeUnit } from './tenant_administrative_units.en.js';
import { TenantBoundary } from './tenant_boundaries.en.js';
import { Team } from './teams.en.js';
import { TenantMembership } from './tenant_memberships.en.js';
import { Report } from './reports.en.js';
import { ReportAssignment } from './report_assignments.en.js';
import { SystemAuditLog } from './system_audit_logs.en.js';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  tenant_code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  parent_tenant_id: string | null;

  @Column({
    type: 'enum',
    enum: TenantType,
  })
  tenant_type: TenantType;

  @Column({
    type: 'enum',
    enum: TenantStatus,
    default: TenantStatus.ACTIVE,
  })
  status: TenantStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Tenant, (tenant) => tenant.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_tenant_id' })
  parentTenant?: Relation<Tenant> | null;

  @OneToMany(() => Tenant, (tenant) => tenant.parentTenant)
  children: Relation<Tenant>[];

  @OneToMany(
    () => TenantAdministrativeUnit,
    (administrativeUnit) => administrativeUnit.tenant,
  )
  administrativeUnits: Relation<TenantAdministrativeUnit>[];

  @OneToMany(() => TenantBoundary, (boundary) => boundary.tenant)
  boundaries: Relation<TenantBoundary>[];

  @OneToMany(() => Team, (team) => team.tenant)
  teams: Relation<Team>[];

  @OneToMany(() => TenantMembership, (membership) => membership.tenant)
  memberships: Relation<TenantMembership>[];

  @OneToMany(() => Report, (report) => report.tenant)
  reports: Relation<Report>[];

  @OneToMany(() => ReportAssignment, (assignment) => assignment.tenant)
  assignments: Relation<ReportAssignment>[];

  @OneToMany(() => SystemAuditLog, (log) => log.tenant)
  auditLogs: Relation<SystemAuditLog>[];
}
