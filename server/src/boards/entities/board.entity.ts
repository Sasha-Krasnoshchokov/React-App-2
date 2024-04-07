import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('boards')
export class Board {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  createdAt: string;
}
