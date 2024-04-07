import { v4 as uuid } from 'uuid';
import { IBoardList } from './../types/boards';
import { ID } from '../types/common';

export class List implements IBoardList {
  id = uuid();
  title = '';
  tasks = [];
  createdAt = new Date().toString();
  description = '';
  boardId = '';

  constructor(title: string, description: string, boardId: ID) {
    this.title = title;
    this.boardId = `${boardId ?? ''}`;
    this.description = description;
  }
}
