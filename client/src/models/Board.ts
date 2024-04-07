import { v4 as uuid } from 'uuid';
import { IBoard } from '../types/boards';

export class Board implements IBoard {
  id = uuid();
  title = '';
  createdAt = new Date().toString();
  description = '';

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
