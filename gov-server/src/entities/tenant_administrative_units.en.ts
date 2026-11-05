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
import { Tenant } from './tenants.en.js';
import { AdministrativeUnit } from './administrative_units.en.js';

@Entity('tenant_administrative_units')
@Unique(['tenant_id', 'administrative_unit_id', 'valid_from'])
export class TenantAdministrativeUnit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenant_id: string;

  @Index()
  @Column({ type: 'uuid' })
  administrative_unit_id: string;

  @Column({ type: 'boolean', default: false })
  is_primary: boolean;

  @Column({ type: 'date' })
  valid_from: string;

  @Column({ type: 'date', nullable: true })
  valid_to: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Tenant, (tenant) => tenant.administrativeUnits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<Tenant>;

  @ManyToOne(
    () => AdministrativeUnit,
    (unit) => unit.tenantAdministrativeUnits,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'administrative_unit_id' })
  administrativeUnit: Relation<AdministrativeUnit>;
}
