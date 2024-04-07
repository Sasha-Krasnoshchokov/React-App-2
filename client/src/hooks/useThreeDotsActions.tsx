import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalConfig } from '../store/actions/modalPopupSlicer';

import { Action, Entity, ID } from '../types/common';
import useClickOutsideBox from './useClickOutsideBox';

const useThreeDotsActions = (boardId?: ID, listId?: ID, taskId?: ID) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useClickOutsideBox('drop-menu', isOpen, () => setIsOpen(false));

  const handle3Dots = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuBtn = (e: React.MouseEvent) => {
    const { id: targetId } = e.target as HTMLButtonElement;
    const actionId = targetId.split('/')[1];
    const boardEntity = (
      actionId.includes('add') ? actionId.slice(3).toLowerCase() : taskId ? 'task' : listId ? 'list' : 'board'
    ) as Entity;

    setIsOpen(false);
    dispatch(
      setModalConfig({
        isModalOpen: true,
        contentKey: 'dataEditor',
        action: actionId.includes('add') ? 'create' : (actionId as Action),
        boardEntity,
        boardId,
        listId,
        taskId,
      })
    );
  };

  return {
    isOpen,
    handle3Dots,
    handleMenuBtn,
  };
};

export default useThreeDotsActions;
