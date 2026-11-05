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
import { Report } from './reports.en.js';
import { MediaAsset } from './media_assets.en.js';

@Entity('report_media')
@Unique(['report_id', 'media_id'])
export class ReportMedia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  report_id: string;

  @Index()
  @Column({ type: 'uuid' })
  media_id: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Report, (report) => report.mediaAttachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: Relation<Report>;

  @ManyToOne(() => MediaAsset, (media) => media.reportMedia, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'media_id' })
  media: Relation<MediaAsset>;
}
