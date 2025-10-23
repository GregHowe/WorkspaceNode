import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Telemetry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  siteId: string;

  @Column()
  officeId: string;

  @Column()
  ts: string;

  @Column('float')
  temp_c: number;

  @Column('float')
  humidity_pct: number;

  @Column('int')
  co2_ppm: number;

  @Column('int')
  occupancy: number;

  @Column('int')
  power_w: number;

    @Column('int')
    battery_pct: number;  
}
