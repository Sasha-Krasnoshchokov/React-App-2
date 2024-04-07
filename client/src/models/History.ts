import { v4 as uuid } from 'uuid';
import { ID, IHistory } from '../types/common';

export class History implements IHistory {
  id = uuid();
  description = '';
  createdAt = new Date().toString().split(' ').slice(0, 5).join(' ');
  creatorId = '';
  boardId = '' as ID;
  listId = '' as ID;

  constructor(description: string, boardId?: ID, listId?: ID) {
    this.description = description;
    this.boardId = boardId ?? '';
    this.listId = listId ?? '';
  }
}
