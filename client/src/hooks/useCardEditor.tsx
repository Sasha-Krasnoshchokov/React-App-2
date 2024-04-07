import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IHistory, ISelectorOption } from '../types/common';

import { resetModalConfig } from '../store/actions/modalPopupSlicer';
import { History } from '../models/History';
import activitiesGenerator from '../helpers/activitiesGenerator';

import editIconUrl from '../assets/editor.svg';
import deleteIconUrl from '../assets/delete.svg';
import { Task } from '../models/Task';
import priorities from '../data/priorities';
import { IBoardList, IBoardTask } from '../types/boards';
import requests, { TMethod } from '../api/api';
import { setIsContentUpdate } from '../store/actions/contentUpdateSlicer';

const useCardEditor = () => {
  const dispatch = useDispatch();
  const { boardId, listId, taskId, action } = useSelector((state: RootState) => state.modalPopup.modalPopup);

  const [isEdit, setIsEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [currentTask, setCurrentTask] = useState<IBoardTask | null>(null);
  const [currentList, setCurrentList] = useState<IBoardList | null>(null);

  const getTaskById = useCallback(async () => {
    setIsFetching(true);
    const response = await requests.get({
      entity: 'tasks',
      boardId: boardId ?? '',
      listId: listId ?? '',
      taskId: taskId ?? '',
    });
    setIsFetching(false);
    setCurrentTask(response?.data?.data ?? null);
  }, [boardId, listId, taskId]);

  const getListById = useCallback(async () => {
    setIsFetching(true);
    const response = await requests.get({
      entity: 'lists',
      boardId: boardId ?? '',
      listId: listId ?? '',
    });
    setIsFetching(false);
    setCurrentList(response?.data?.data ?? null);
  }, [boardId, listId]);

  const status = useMemo(() => {
    if (!currentList) return 'New';
    return currentList?.title ?? '';
  }, [currentList]);

  const createActivities = useCallback(() => {
    const activities: {
      title: null | IHistory;
      dueData: null | IHistory;
      priority: null | IHistory;
      description: null | IHistory;
    } = {
      title: null,
      dueData: null,
      priority: null,
      description: null,
    };
    if (newTitle && (!activities.title || (activities.title && !activities.title.description.includes(newTitle)))) {
      activities.title = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a title of this task from',
            action,
            strongLabel1: currentTask?.title ?? '',
            strongLabel2: newTitle,
          }),
          `${boardId ?? ''}`,
          `${listId ?? ''}`
        ),
      };
    }
    if (
      newDescription &&
      (!activities.description ||
        (activities.description && !activities.description.description.includes(newDescription)))
    ) {
      activities.description = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a description of this task',
            action,
          }),
          `${boardId ?? ''}`,
          `${listId ?? ''}`
        ),
      };
    }
    if (
      newDueDate &&
      (!activities.dueData || (activities.dueData && !activities.dueData.description.includes(newDueDate)))
    ) {
      activities.dueData = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a due date of this task',
            action,
            spanLabel1: currentTask?.dueDate ?? '',
            spanLabel2: newDueDate,
          }),
          `${boardId ?? ''}`,
          `${listId ?? ''}`
        ),
      };
    }
    if (
      newPriority &&
      (!activities.priority || (activities.priority && !activities.priority.description.includes(newPriority)))
    ) {
      activities.priority = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a priority of this task',
            action,
            spanLabel1: (currentTask?.priority ?? '') as string,
            spanLabel2: newPriority,
          }),
          `${boardId ?? ''}`,
          `${listId ?? ''}`
        ),
      };
    }
    return activities;
  }, [newTitle, newDueDate, newPriority, newDescription, currentTask, action, boardId, listId]);

  const updateServer = useCallback(
    async (method: TMethod, body?: IBoardTask | IHistory, entity?: 'activities') => {
      setIsFetching(true);
      await requests[method]({
        query: {
          entity: entity ?? 'tasks',
          taskId: !entity ? taskId ?? '' : '',
          boardId: !entity ? boardId ?? '' : '',
          listId: !entity ? listId ?? '' : '',
        },
        body,
      });
      setIsFetching(false);
    },
    [boardId, listId, taskId]
  );

  const handleEditorAction = useCallback(async () => {
    const newActivities = createActivities();
    if (
      action === 'edit' &&
      (!newTitle || newTitle === currentTask?.title) &&
      (!newDueDate || newDueDate === currentTask?.dueDate) &&
      (!newPriority || newPriority === currentTask?.priority) &&
      (!newDescription || newDescription === currentTask?.description)
    ) {
      setIsEdit(!isEdit);
      return;
    }
    let strongLabel1 = '';
    let spanLabel1 = '';
    let contentDescription = 'task';
    let newTask: IBoardTask | null = null;
    switch (action) {
      case 'delete':
        strongLabel1 = currentTask?.title ?? '';
        spanLabel1 = currentTask?.title ?? '';
        await updateServer('delete');
        break;
      case 'edit':
        strongLabel1 = (newTitle || currentTask?.title) ?? '';
        contentDescription = 'the fields of the task';
        if (!currentTask) return;
        newTask = {
          ...currentTask,
          title: newTitle || currentTask?.title || '',
          description: newDescription || currentTask?.description || '',
          dueDate: newDueDate || currentTask?.dueDate || '',
          priority: newPriority || currentTask?.priority || '',
          activities: [
            ...(currentTask?.activities || []),
            newActivities.title,
            newActivities.dueData,
            newActivities.priority,
            newActivities.description,
          ].filter((item: IHistory | null) => !!item) as IHistory[],
        };
        await updateServer('patch', newTask);
        break;
      case 'addTask':
        strongLabel1 = newTitle;
        newTask = {
          ...new Task({
            title: newTitle,
            description: newDescription,
            boardId: boardId ?? '',
            listId: listId ?? '',
            status,
            dueDate: newDueDate,
            priority: newPriority || priorities[0].title,
            activity: {
              ...new History(
                activitiesGenerator({
                  creator: 'You',
                  contentDescription,
                  action: 'create',
                  strongLabel1,
                  spanLabel2: currentTask?.title ?? '',
                }),
                `${boardId ?? ''}`,
                `${listId ?? ''}`
              ),
            },
          }),
        };
        await updateServer('post', newTask);
        break;
      default:
        console.error('Unknown action', action);
    }
    const newActivity: IHistory = {
      ...new History(
        activitiesGenerator({
          creator: 'You',
          contentDescription,
          action,
          strongLabel1,
          spanLabel1,
          spanLabel2: currentList?.title ?? '',
          afterSpanLabel2: 'list',
        }),
        `${boardId ?? ''}`,
        `${listId ?? ''}`
      ),
    };
    await updateServer('post', newActivity, 'activities');
    dispatch(resetModalConfig());
    dispatch(setIsContentUpdate({ shouldMainContentUpdate: true, shouldOperationMenuUpdate: false }));
  }, [
    action,
    createActivities,
    currentTask,
    dispatch,
    isEdit,
    listId,
    newDescription,
    newDueDate,
    newPriority,
    newTitle,
    status,
    updateServer,
    boardId,
    currentList,
  ]);

  const handleDate = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setNewDueDate(value);
  };

  const handlePriority = (option: ISelectorOption) => {
    setNewPriority(option.title);
  };

  useEffect(() => {
    setIsEdit(action === 'create' || action === 'addTask');
  }, [action]);

  useEffect(() => {
    if (listId) {
      getListById();
    }
  }, [getListById, listId]);

  useEffect(() => {
    if (taskId) {
      getTaskById();
    }
  }, [getTaskById, taskId]);

  return {
    isEdit,
    newTitle,
    isFetching,
    currentTask,
    newDescription,
    actionIconUrl: action === 'delete' ? deleteIconUrl : editIconUrl,
    status,
    handleDate,
    setNewTitle,
    handlePriority,
    setNewDescription,
    handleEditorAction,
  };
};

export default useCardEditor;
