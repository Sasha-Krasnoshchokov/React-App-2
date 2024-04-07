import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('lists')
export class List {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 40 })
  boardId: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  createdAt: string;
}
