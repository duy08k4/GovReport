import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  type Relation,
} from 'typeorm';
import { Report } from './reports.en.js';
import { Tenant } from './tenants.en.js';
import { Team } from './teams.en.js';
import { TenantMembership } from './tenant_memberships.en.js';
import { User } from './users.en.js';

@Entity('report_assignments')
@Index(['report_id', 'assigned_at'])
export class ReportAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  report_id: string;

  @Index()
  @Column({ type: 'uuid' })
  tenant_id: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  team_id: string | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  membership_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  assigned_by_user_id: string | null;

  @Column({ type: 'text', nullable: true })
  assignment_note: string | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  ended_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Report, (report) => report.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: Relation<Report>;

  @ManyToOne(() => Tenant, (tenant) => tenant.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<Tenant>;

  @ManyToOne(() => Team, (team) => team.assignments, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'team_id' })
  team?: Relation<Team> | null;

  @ManyToOne(
    () => TenantMembership,
    (membership) => membership.assignments,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'membership_id' })
  membership?: Relation<TenantMembership> | null;

  @ManyToOne(() => User, (user) => user.assignedReports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'assigned_by_user_id' })
  assignedByUser?: Relation<User> | null;
}
