import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback, useEffect, useState } from 'react';
import { List } from '../models/List';
import { resetModalConfig } from '../store/actions/modalPopupSlicer';
import { History } from '../models/History';
import activitiesGenerator from '../helpers/activitiesGenerator';

import editIconUrl from '../assets/editor.svg';
import deleteIconUrl from '../assets/delete.svg';
import requests, { TMethod } from '../api/api';
import { IBoard, IBoardList } from '../types/boards';
import { IHistory } from '../types/common';
import { setIsContentUpdate } from '../store/actions/contentUpdateSlicer';
import { Board } from '../models/Board';
import { resetActiveOperationMenu } from '../store/actions/activeMenuSlicer';

const useListEditor = () => {
  const dispatch = useDispatch();
  const { boardId, listId, action, boardEntity } = useSelector((state: RootState) => state.modalPopup.modalPopup);

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [currentList, setCurrentList] = useState<IBoard | IBoardList | null>(null);

  const getEntityById = useCallback(async () => {
    const response = await requests.get({
      entity: `${boardEntity}s`,
      boardId,
      listId,
    });
    setCurrentList(response?.data?.data ?? null);
  }, [boardId, listId, boardEntity]);

  const updateServer = useCallback(
    async (method: TMethod, body?: IBoardList | IHistory, entity?: 'activities') => {
      await requests[method]({
        query: {
          entity: entity ?? `${boardEntity}s`,
          boardId: entity === 'activities' ? '' : boardId,
          listId: entity === 'activities' ? '' : listId,
        },
        body,
      });
    },
    [boardId, listId, boardEntity]
  );

  const handleEditorAction = useCallback(async () => {
    if (
      action === 'edit' &&
      (!newTitle || newTitle === currentList?.title) &&
      (!newDescription || newDescription === currentList?.description)
    ) {
      setIsEdit(!isEdit);
      return;
    }
    let newBody: IBoard | IBoardList | null = null;
    let strongLabel1 = '';
    let strongLabel2 = '';
    let contentDescription = `the ${boardEntity} label`;
    switch (action) {
      case 'delete':
        strongLabel1 = currentList?.title ?? '';
        contentDescription = `the ${boardEntity}`;
        await updateServer('delete');
        if (boardEntity === 'board') {
          dispatch(resetActiveOperationMenu());
          dispatch(setIsContentUpdate({ shouldMainContentUpdate: true, shouldOperationMenuUpdate: true }));
        }
        break;
      case 'edit':
        strongLabel1 = currentList?.title ?? '';
        strongLabel2 = newTitle;
        newDescription &&
          newDescription !== currentList?.description &&
          (contentDescription = `the description of the ${boardEntity}`);
        newTitle && newTitle !== currentList?.title && (contentDescription = `the label of the ${boardEntity} from`);
        newBody = {
          ...currentList,
          title: newTitle || currentList?.title || '',
          description: newDescription || currentList?.description || '',
        };
        await updateServer('patch', newBody);
        break;
      case 'create':
        contentDescription = `${boardEntity}`;
        strongLabel1 = newTitle;
        newBody =
          boardEntity === 'board'
            ? { ...new Board(newTitle, newDescription) }
            : { ...new List(newTitle, newDescription, boardId ?? '') };
        await updateServer('post', newBody);
        break;
      default:
        console.error('Unknown action', action);
    }
    const newActivity = {
      ...new History(
        activitiesGenerator({
          creator: 'You',
          contentDescription,
          action,
          strongLabel1,
          strongLabel2,
        }),
        `${boardId || (newBody?.id ?? '')}`
      ),
    };

    await updateServer('post', newActivity, 'activities');
    dispatch(resetModalConfig());
    dispatch(setIsContentUpdate({ shouldMainContentUpdate: true, shouldOperationMenuUpdate: true }));
  }, [boardEntity, action, currentList, dispatch, isEdit, newDescription, newTitle, updateServer, boardId]);

  useEffect(() => {
    setIsEdit(action === 'create');
    if ((boardEntity === 'board' && boardId) || (boardEntity === 'list' && listId)) {
      getEntityById();
    }
  }, [action, boardId, listId, boardEntity, getEntityById]);

  return {
    isEdit,
    newTitle,
    boardEntity,
    currentList,
    newDescription,
    actionIconUrl: action === 'delete' ? deleteIconUrl : editIconUrl,
    setNewTitle,
    setNewDescription,
    handleEditorAction,
  };
};

export default useListEditor;
