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
import { AuthTokenPurpose } from '../enums/enums.js';
import { Account } from './accounts.en.js';

@Entity('auth_verification_tokens')
@Index(['account_id', 'purpose'])
export class AuthVerificationToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  account_id: string;

  @Column({
    type: 'enum',
    enum: AuthTokenPurpose,
  })
  purpose: AuthTokenPurpose;

  @Column({ type: 'varchar', length: 255 })
  recipient: string;

  @Column({ type: 'char', length: 64, unique: true })
  token_hash: string;

  @Index()
  @Column({ type: 'timestamptz' })
  expires_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  used_at: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Account, (account) => account.verificationTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Relation<Account>;
}
