import axios, { AxiosResponse } from 'axios';
import { ID, IHistory } from '../types/common';
import { IBoardTask, IBoardList, IBoard } from '../types/boards';

const API = axios.create({
  baseURL: 'http://localhost:4000/',
});

export type TMethod = 'get' | 'post' | 'patch' | 'delete';
type TBody = IBoard | IBoardList | IBoardList[] | IBoardTask | IBoardTask[] | IHistory;
type TEntity = 'boards' | 'lists' | 'tasks' | 'taskMove' | 'activities';

interface IQuery {
  entity: TEntity;
  boardId?: ID;
  listId?: ID;
  taskId?: ID;
}

interface IUrlByEntity {
  boardId?: ID;
  listId?: ID;
  taskId?: ID;
}
const urlByEntity: Record<TEntity, (props: IUrlByEntity) => string> = {
  boards: ({ boardId }: IUrlByEntity) => `boards${boardId ? `/${boardId}` : ''}`,
  lists: ({ boardId, listId }: IUrlByEntity) =>
    `lists${
      listId ? `/${listId}${boardId ? `/?boardId=${boardId}` : ''}` : `${boardId ? `/?boardId=${boardId}` : ''}`
    }`,
  tasks: ({ boardId, listId, taskId }: IUrlByEntity) =>
    `tasks${
      taskId
        ? `/${taskId}${boardId ? `/?boardId=${boardId}${listId ? `&listId=${listId}` : ''}` : ''}`
        : `${
            boardId
              ? `/?boardId=${boardId}${listId ? `&listId=${listId}` : ''}`
              : `${listId ? `/?listId=${listId}` : ''}`
          }`
    }`,
  taskMove: () => 'tasks/move',
  activities: ({ boardId }: IUrlByEntity) => `activities${boardId ? `/${boardId}` : ''}`,
};

interface IApiFactoryProps {
  method: TMethod;
  query: IQuery;
  body?: TBody;
}
const apiFactory = ({ method, query, body }: IApiFactoryProps): Promise<AxiosResponse<any, any>> | null => {
  const { entity, boardId, listId, taskId } = query;
  const url = urlByEntity[entity]({ boardId, listId, taskId });

  try {
    return API[method](url, body);
  } catch (e) {
    console.error('Request failed', e);
    return null;
  }
};

const requests: Record<TMethod, (props: any) => Promise<AxiosResponse<any, any>> | null> = {
  get: (query: IQuery) => apiFactory({ method: 'get', query }),
  post: ({ query, body }: { query: IQuery; body: TBody }) => apiFactory({ method: 'post', query, body }),
  patch: ({ query, body }: { query: IQuery; body: TBody }) => apiFactory({ method: 'patch', query, body }),
  delete: ({ query }: { query: IQuery }) => apiFactory({ method: 'delete', query }),
};

export default requests;
