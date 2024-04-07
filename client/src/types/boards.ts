import { IPriority, IHistory, ID } from './common';

export interface IBoardTask {
  id?: ID;
  boardId?: ID;
  listId?: ID;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  status: string;
  priority: IPriority | string;
  activities: IHistory[];
}

export interface IBoardList {
  id?: ID;
  boardId?: ID;
  title?: string;
  tasks?: IBoardTask[];
  createdAt?: string;
  description?: string;
}
export interface IBoard {
  id?: ID;
  title?: string;
  lists?: IBoardList[];
  createdAt?: string;
  description?: string;
}
