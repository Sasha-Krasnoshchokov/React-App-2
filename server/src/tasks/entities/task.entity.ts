import { EPriority } from 'src/models/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 40 })
  boardId: string;

  @Column({ type: 'varchar', length: 40 })
  listId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 600 })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  dueDate: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'enum', enum: EPriority })
  priority: string;

  @Column({ type: 'varchar', length: 120 })
  createdAt: string;
}
