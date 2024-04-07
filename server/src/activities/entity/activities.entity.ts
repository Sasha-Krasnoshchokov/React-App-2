import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BoardActivity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 120 })
  createdAt: string;

  @Column({ type: 'varchar', length: 40 })
  boardId: string;
}

@Entity()
export class TaskActivity extends BoardActivity {
  @Column({ type: 'varchar', length: 40 })
  listId: string;
  @Column({ type: 'varchar', length: 40 })
  taskId: string;
}
