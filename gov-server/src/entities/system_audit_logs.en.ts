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
import { User } from './users.en.js';
import { Account } from './accounts.en.js';
import { Tenant } from './tenants.en.js';

@Entity('system_audit_logs')
@Index(['tenant_id', 'created_at'])
export class SystemAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  user_id: string | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  account_id: string | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  tenant_id: string | null;

  @Index()
  @Column({ type: 'varchar', length: 100 })
  action: string;

  @Column({ type: 'varchar', length: 100 })
  target_table: string;

  @Column({ type: 'varchar', length: 100 })
  target_id: string;

  @Column({ type: 'jsonb', nullable: true })
  before_state: Record<string, unknown> | null;

  @Column({ type: 'jsonb', nullable: true })
  after_state: Record<string, unknown> | null;

  @Column({ type: 'inet', nullable: true })
  ip_address: string | null;

  @Column({ type: 'text', nullable: true })
  user_agent: string | null;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.auditLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user?: Relation<User> | null;

  @ManyToOne(() => Account, (account) => account.auditLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'account_id' })
  account?: Relation<Account> | null;

  @ManyToOne(() => Tenant, (tenant) => tenant.auditLogs, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant?: Relation<Tenant> | null;
}
