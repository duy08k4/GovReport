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
import { Tenant } from './tenants.en.js';

@Entity('tenant_boundaries')
export class TenantBoundary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  tenant_id: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
  })
  boundary: string;

  @Column({ type: 'varchar', length: 100 })
  decision_version: string;

  @Index()
  @Column({ type: 'date' })
  effective_from: string;

  @Column({ type: 'date', nullable: true })
  effective_to: string | null;

  @Index()
  @Column({ type: 'boolean', default: true })
  is_current: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Tenant, (tenant) => tenant.boundaries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<Tenant>;
}
