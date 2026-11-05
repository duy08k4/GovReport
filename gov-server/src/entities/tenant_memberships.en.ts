import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
  Index,
  type Relation,
} from 'typeorm';
import { TenantRole } from '../enums/enums.js';
import { Tenant } from './tenants.en.js';
import { User } from './users.en.js';
import { Team } from './teams.en.js';
import { Report } from './reports.en.js';
import { ReportAssignment } from './report_assignments.en.js';

@Entity('tenant_memberships')
@Unique(['tenant_id', 'user_id'])
@Index(['tenant_id', 'team_id'])
export class TenantMembership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenant_id: string;

  @Index()
  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  team_id: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cadre_code: string | null;

  @Column({ type: 'varchar', length: 100 })
  job_title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  appointment_decision_number: string | null;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @Index()
  @Column({
    type: 'enum',
    enum: TenantRole,
  })
  role: TenantRole;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Tenant, (tenant) => tenant.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<Tenant>;

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @ManyToOne(() => Team, (team) => team.members, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'team_id' })
  team?: Relation<Team> | null;

  @OneToMany(() => Report, (report) => report.assignedToMembership)
  reports: Relation<Report>[];

  @OneToMany(() => ReportAssignment, (assignment) => assignment.membership)
  assignments: Relation<ReportAssignment>[];
}
