import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Space } from './Space';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  date: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Space, (space) => space.reservations)
  space: Space;
}
