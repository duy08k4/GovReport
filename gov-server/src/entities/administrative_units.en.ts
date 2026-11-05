import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  type Relation,
} from 'typeorm';
import { AdministrativeUnitType } from '../enums/enums.js';
import { TenantAdministrativeUnit } from './tenant_administrative_units.en.js';

@Entity('administrative_units')
export class AdministrativeUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index()
  @Column({
    type: 'enum',
    enum: AdministrativeUnitType,
  })
  unit_type: AdministrativeUnitType;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  parent_id: string | null;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
    nullable: true,
  })
  boundary: string | null;

  @Index()
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'date' })
  valid_from: string;

  @Column({ type: 'date', nullable: true })
  valid_to: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  // Relations
  @ManyToOne(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.children,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'parent_id' })
  parent?: Relation<AdministrativeUnit> | null;

  @OneToMany(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.parent,
  )
  children: Relation<AdministrativeUnit>[];

  @OneToMany(
    () => TenantAdministrativeUnit,
    (tenantAdministrativeUnit) => tenantAdministrativeUnit.administrativeUnit,
  )
  tenantAdministrativeUnits: Relation<TenantAdministrativeUnit>[];
}
