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
import { ReportHistory } from './report_histories.en.js';
import { MediaAsset } from './media_assets.en.js';

@Entity('report_history_media')
@Unique(['history_id', 'media_id'])
export class ReportHistoryMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  history_id: string;

  @Index()
  @Column({ type: 'uuid' })
  media_id: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(
    () => ReportHistory,
    (history) => history.mediaAttachments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'history_id' })
  history: Relation<ReportHistory>;

  @ManyToOne(() => MediaAsset, (media) => media.historyMedia, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'media_id' })
  media: Relation<MediaAsset>;
}
