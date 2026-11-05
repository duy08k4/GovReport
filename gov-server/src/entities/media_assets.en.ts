import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
  Index,
  type Relation,
} from 'typeorm';
import { StorageProvider } from '../enums/enums.js';
import { User } from './users.en.js';
import { ReportMedia } from './report_media.en.js';
import { ReportHistoryMedia } from './report_history_media.en.js';

@Entity('media_assets')
@Unique(['storage_provider', 'bucket', 'object_key'])
export class MediaAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: StorageProvider,
  })
  storage_provider: StorageProvider;

  @Column({ type: 'varchar', length: 255 })
  bucket: string;

  @Column({ type: 'text' })
  object_key: string;

  @Column({ type: 'varchar', length: 255 })
  original_filename: string;

  @Column({ type: 'varchar', length: 150 })
  mime_type: string;

  @Column({ type: 'bigint' })
  size_bytes: string;

  @Column({ type: 'char', length: 64, nullable: true })
  checksum_sha256: string | null;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  uploaded_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date | null;

  // Relations
  @ManyToOne(() => User, (user) => user.uploadedMedia, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'uploaded_by' })
  uploader?: Relation<User> | null;

  @OneToMany(() => ReportMedia, (reportMedia) => reportMedia.media)
  reportMedia: Relation<ReportMedia>[];

  @OneToMany(() => ReportHistoryMedia, (historyMedia) => historyMedia.media)
  historyMedia: Relation<ReportHistoryMedia>[];
}
