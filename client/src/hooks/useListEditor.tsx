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
  const [isFetching, setIsFetching] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [currentData, setCurrentData] = useState<IBoard | IBoardList | null>(null);

  const getEntityById = useCallback(async () => {
    setIsFetching(true);
    const response = await requests.get({
      entity: `${boardEntity}s`,
      boardId,
      listId,
    });
    setIsFetching(false);
    setCurrentData(response?.data?.data ?? null);
  }, [boardId, listId, boardEntity]);

  const updateServer = useCallback(
    async (method: TMethod, body?: IBoardList | IHistory, entity?: 'activities') => {
      setIsFetching(true);
      await requests[method]({
        query: {
          entity: entity ?? `${boardEntity}s`,
          boardId: entity === 'activities' ? '' : boardId,
          listId: entity === 'activities' ? '' : listId,
        },
        body,
      });
      setIsFetching(false);
    },
    [boardId, listId, boardEntity]
  );

  const handleEditorAction = useCallback(async () => {
    if (
      action === 'edit' &&
      (!newTitle || newTitle === currentData?.title) &&
      (!newDescription || newDescription === currentData?.description)
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
        strongLabel1 = currentData?.title ?? '';
        contentDescription = `the ${boardEntity}`;
        await updateServer('delete');
        if (boardEntity === 'board') {
          dispatch(resetActiveOperationMenu());
          dispatch(setIsContentUpdate({ shouldMainContentUpdate: true, shouldOperationMenuUpdate: true }));
        }
        break;
      case 'edit':
        strongLabel1 = currentData?.title ?? '';
        strongLabel2 = newTitle;
        newDescription &&
          newDescription !== currentData?.description &&
          (contentDescription = `the description of the ${boardEntity}`);
        newTitle && newTitle !== currentData?.title && (contentDescription = `the label of the ${boardEntity} from`);
        newBody = {
          ...currentData,
          title: newTitle || currentData?.title || '',
          description: newDescription || currentData?.description || '',
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
  }, [boardEntity, action, currentData, dispatch, isEdit, newDescription, newTitle, updateServer, boardId]);

  useEffect(() => {
    setIsEdit(action === 'create');
    if ((boardEntity === 'board' && boardId) || (boardEntity === 'list' && listId)) {
      getEntityById();
    }
  }, [action, boardId, listId, boardEntity, getEntityById]);

  return {
    isEdit,
    newTitle,
    isFetching,
    boardEntity,
    currentData,
    newDescription,
    actionIconUrl: action === 'delete' ? deleteIconUrl : editIconUrl,
    setNewTitle,
    setNewDescription,
    handleEditorAction,
  };
};

export default useListEditor;
