import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SpaceParameters {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;
}