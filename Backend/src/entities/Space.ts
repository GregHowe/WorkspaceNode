import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Place } from './Place';
import { Reservation } from './Reservation';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  // @Column()
  // type: string;

@Column({ nullable: true })
reference?: string;

@Column({ nullable: true })
description?: string;

  @ManyToOne(() => Place, (place) => place.spaces)
  place: Place;

  @OneToMany(() => Reservation, (reservation) => reservation.space)
  reservations: Reservation[];
}
