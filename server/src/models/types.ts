export type TID = string | number;
export type TAction = 'create' | 'edit' | 'delete' | 'move' | 'addCard';

export enum EPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Higest = 'Highest',
}
export type TActionDb = 'added' | 'updated' | 'deleted' | 'got';
export type TEntity = 'board' | 'boards' | 'list' | 'lists' | 'task' | 'tasks' | 'activity' | 'activities' | null;
