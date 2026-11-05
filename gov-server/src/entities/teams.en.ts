import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Unique,
  Index,
  type Relation,
} from 'typeorm';
import { Tenant } from './tenants.en.js';
import { TenantMembership } from './tenant_memberships.en.js';
import { Report } from './reports.en.js';
import { ReportAssignment } from './report_assignments.en.js';

@Entity('teams')
@Unique(['tenant_id', 'code'])
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  tenant_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string | null;

  @Column({ type: 'uuid', nullable: true })
  leader_membership_id: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Tenant, (tenant) => tenant.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<Tenant>;

  @OneToOne(() => TenantMembership, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'leader_membership_id' })
  leaderMembership?: Relation<TenantMembership> | null;

  @OneToMany(() => TenantMembership, (membership) => membership.team)
  members: Relation<TenantMembership>[];

  @OneToMany(() => Report, (report) => report.assignedToTeam)
  reports: Relation<Report>[];

  @OneToMany(() => ReportAssignment, (assignment) => assignment.team)
  assignments: Relation<ReportAssignment>[];
}
