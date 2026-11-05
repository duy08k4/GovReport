import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
  type Relation,
} from 'typeorm';
import { PlatformRole } from '../enums/enums.js';
import { User } from './users.en.js';

@Entity('user_platform_roles')
@Unique(['user_id', 'role'])
export class UserPlatformRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  user_id: string;

  @Column({
    type: 'enum',
    enum: PlatformRole,
  })
  role: PlatformRole;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.platformRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;
}
