export type TPriority = 'low' | 'medium' | 'high' | 'highest' | '';
export type ID = string | number;
export type Action = 'create' | 'edit' | 'delete' | 'move' | 'addTask' | 'addList' | 'addBoard';
export type Entity = 'board' | 'list' | 'task' | 'user' | null;

export interface IAction {
  title: string;
  iconUrl?: string;
  color?: string;
}

export interface IPriority {
  title: TPriority;
  color?: string;
}

export interface IHistory {
  id: ID;
  description: string;
  createdAt: string;
  creatorId: ID;
}

export interface ISelectorOption {
  key: string | Action | TPriority;
  iconUrl: string;
  color: string;
  title: string;
}

export interface IMenu {
  id: ID;
  title: string;
  iconUrl: string;
}
