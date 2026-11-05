import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  type Relation,
} from 'typeorm';
import { ReportPriority, ReportStatus } from '../enums/enums.js';
import { Tenant } from './tenants.en.js';
import { Category } from './categories.en.js';
import { User } from './users.en.js';
import { Team } from './teams.en.js';
import { TenantMembership } from './tenant_memberships.en.js';
import { ReportAssignment } from './report_assignments.en.js';
import { ReportHistory } from './report_histories.en.js';
import { ReportMedia } from './report_media.en.js';

@Entity('reports')
@Index(['tenant_id', 'status', 'created_at'])
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50, unique: true })
  ticket_code: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  tenant_id: string | null;

  @Index()
  @Column({ type: 'uuid' })
  category_id: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  reporter_id: string | null;

  @Column({ type: 'char', length: 64, nullable: true })
  anonymous_device_hash: string | null;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  address: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: string;

  @Column({
    type: 'enum',
    enum: ReportPriority,
    default: ReportPriority.NORMAL,
  })
  priority: ReportPriority;

  @Index()
  @Column({
    type: 'enum',
    enum: ReportStatus,
    default: ReportStatus.SUBMITTED,
  })
  status: ReportStatus;

  @Column({ type: 'uuid', nullable: true })
  assigned_to_team_id: string | null;

  @Column({ type: 'uuid', nullable: true })
  assigned_to_membership_id: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  resolved_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => Tenant, (tenant) => tenant.reports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Relation<Tenant> | null;

  @ManyToOne(() => Category, (category) => category.reports, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: Relation<Category>;

  @ManyToOne(() => User, (user) => user.reports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'reporter_id' })
  reporter?: Relation<User> | null;

  @ManyToOne(() => Team, (team) => team.reports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'assigned_to_team_id' })
  assignedToTeam?: Relation<Team> | null;

  @ManyToOne(() => TenantMembership, (membership) => membership.reports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'assigned_to_membership_id' })
  assignedToMembership?: Relation<TenantMembership> | null;

  @OneToMany(() => ReportAssignment, (assignment) => assignment.report)
  assignments: Relation<ReportAssignment>[];

  @OneToMany(() => ReportHistory, (history) => history.report)
  histories: Relation<ReportHistory>[];

  @OneToMany(() => ReportMedia, (media) => media.report)
  mediaAttachments: Relation<ReportMedia>[];
}
