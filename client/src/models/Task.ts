import { v4 as uuid } from 'uuid';
import { IBoardTask } from '../types/boards';
import { ID, IHistory } from '../types/common';

export class Task implements IBoardTask {
  id = uuid();
  title = '';
  createdAt = new Date().toString();
  description = '';
  boardId = '' as ID;
  listId = '' as ID;
  dueDate = '';
  status = '';
  priority = '';
  activities = [] as IHistory[];

  constructor({
    title,
    description,
    boardId,
    listId,
    status,
    dueDate,
    priority,
    activity,
  }: {
    title: string;
    description: string;
    boardId: ID;
    listId: ID;
    status: string;
    dueDate: string;
    priority: string;
    activity: IHistory;
  }) {
    this.title = title;
    this.description = description;
    this.boardId = boardId;
    this.listId = listId;
    this.status = status;
    this.dueDate = dueDate;
    this.priority = priority;
    this.activities.push(activity);
  }
}
