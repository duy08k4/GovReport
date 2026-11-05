import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { User } from './users.en.js';

@Entity('leader_sensitive_profiles')
export class LeaderSensitiveProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  user_id: string;

  @Column({ type: 'text' })
  national_id_ciphertext: string;

  @Column({ type: 'char', length: 64, unique: true })
  national_id_lookup_hash: string;

  @Column({ type: 'smallint', default: 1 })
  hash_key_version: number;

  @Column({ type: 'text', nullable: true })
  digital_signature_cert_encrypted: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  emergency_phone: string | null;

  @Column({ type: 'jsonb', nullable: true })
  encrypted_identity_data: Record<string, unknown> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @OneToOne(() => User, (user) => user.sensitiveProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;
}
