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
import { ReportStatus } from '../enums/enums.js';
import { Report } from './reports.en.js';
import { User } from './users.en.js';
import { ReportHistoryMedia } from './report_history_media.en.js';

@Entity('report_histories')
@Index(['report_id', 'created_at'])
export class ReportHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  report_id: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  actor_user_id: string | null;

  @Column({
    type: 'enum',
    enum: ReportStatus,
    nullable: true,
  })
  previous_status: ReportStatus | null;

  @Column({
    type: 'enum',
    enum: ReportStatus,
  })
  new_status: ReportStatus;

  @Column({ type: 'text', nullable: true })
  action_note: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Report, (report) => report.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: Relation<Report>;

  @ManyToOne(() => User, (user) => user.reportHistories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'actor_user_id' })
  actorUser?: Relation<User> | null;

  @OneToMany(
    () => ReportHistoryMedia,
    (historyMedia) => historyMedia.history,
  )
  mediaAttachments: Relation<ReportHistoryMedia>[];
}
