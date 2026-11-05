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
import { AuthSession } from './auth_sessions.en.js';

@Entity('auth_refresh_tokens')
export class AuthRefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  session_id: string;

  @Column({ type: 'char', length: 64, unique: true })
  token_hash: string;

  @Index()
  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  used_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  revoked_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => AuthSession, (session) => session.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  session: Relation<AuthSession>;
}
