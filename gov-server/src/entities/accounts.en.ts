import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  type Relation,
} from 'typeorm';
import { AccountStatus } from '../enums/enums.js';
import { User } from './users.en.js';
import { AuthSession } from './auth_sessions.en.js';
import { AuthVerificationToken } from './auth_verification_tokens.en.js';
import { SystemAuditLog } from './system_audit_logs.en.js';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING_VERIFICATION,
  })
  status: AccountStatus;

  @Column({ type: 'timestamptz', nullable: true })
  email_verified_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  phone_verified_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  password_changed_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  last_login_at: Date | null;

  @Column({ type: 'int', default: 0 })
  failed_login_attempts: number;

  @Column({ type: 'timestamptz', nullable: true })
  locked_until: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @OneToOne(() => User, (user) => user.account)
  user?: Relation<User>;

  @OneToMany(() => AuthSession, (session) => session.account)
  sessions: Relation<AuthSession>[];

  @OneToMany(
    () => AuthVerificationToken,
    (token) => token.account,
  )
  verificationTokens: Relation<AuthVerificationToken>[];

  @OneToMany(() => SystemAuditLog, (log) => log.account)
  auditLogs: Relation<SystemAuditLog>[];
}
