import { TaskActivity } from 'src/activities/entity/activities.entity';

export interface IResponseFromDB<T> {
  data: T;
  error: any;
  success: boolean;
  message: string;
}

export interface IMoveTo {
  boardId: string;
  listId: string;
  taskId: string;
  newListId: string;
  activity: TaskActivity;
  status: string;
}
