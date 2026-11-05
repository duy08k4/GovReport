import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  type Relation,
} from 'typeorm';
import { Account } from './accounts.en.js';
import { AuthRefreshToken } from './auth_refresh_tokens.en.js';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  account_id: string;

  @Index()
  @Column({ type: 'uuid' })
  token_family_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  device_name: string | null;

  @Column({ type: 'inet', nullable: true })
  ip_address: string | null;

  @Column({ type: 'text', nullable: true })
  user_agent: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  last_used_at: Date | null;

  @Index()
  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  revoked_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Account, (account) => account.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Relation<Account>;

  @OneToMany(() => AuthRefreshToken, (rt) => rt.session)
  refreshTokens: Relation<AuthRefreshToken>[];
}
