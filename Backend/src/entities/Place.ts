import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Space } from './Space';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  capacity: number;

  @OneToMany(() => Space, (space) => space.place)
  spaces: Space[];
}
