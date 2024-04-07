import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IBoard } from '../types/boards';
import { setModalConfig } from '../store/actions/modalPopupSlicer';
import requests from '../api/api';
import { setIsContentUpdate } from '../store/actions/contentUpdateSlicer';
import { setActiveOperationMenu } from '../store/actions/activeMenuSlicer';

const useOperationMenu = () => {
  const dispatch = useDispatch();
  const { activeMenu } = useSelector((state: RootState) => state.activeMenu);
  const { shouldOperationMenuUpdate } = useSelector((state: RootState) => state.contentUpdate);

  const [isFetching, setIsFetching] = useState(false);
  const [selectedOperationMenu, setSelectedOperationMenu] = useState<IBoard | null>(null);
  const [dataFromServer, setDataFromServer] = useState<IBoard[]>([]);
  const isAddEntityBtn = useMemo(() => activeMenu.id === 'boards' || activeMenu.id === 'teams', [activeMenu]);

  const handleCreateBoard = () => {
    dispatch(
      setModalConfig({
        isModalOpen: true,
        contentKey: 'dataEditor',
        action: 'create',
        boardEntity: 'board',
      })
    );
  };

  const getData = useCallback(async () => {
    if (activeMenu.id !== 'boards') {
      setDataFromServer([]);
      return;
    }
    setIsFetching(true);
    const response = await requests.get({ entity: 'boards' });

    setIsFetching(false);
    setDataFromServer(response?.data?.data ?? []);
    dispatch(setIsContentUpdate({ shouldMainContentUpdate: true, shouldOperationMenuUpdate: false }));
  }, [dispatch, activeMenu]);

  useEffect(() => {
    if (shouldOperationMenuUpdate) {
      getData();
    }
  }, [getData, shouldOperationMenuUpdate, activeMenu]);

  const handleOperationMenu = useCallback(
    (menu: IBoard) => {
      setSelectedOperationMenu(menu);
      dispatch(
        setActiveOperationMenu({
          id: menu.id ?? '',
          title: menu.title ?? '',
          iconUrl: '',
        })
      );
      dispatch(setIsContentUpdate({ shouldMainContentUpdate: true, shouldOperationMenuUpdate: false }));
    },
    [dispatch]
  );

  return {
    activeMenu,
    isFetching,
    dataFromServer,
    isAddEntityBtn,
    selectedOperationMenu,
    handleCreateBoard,
    handleOperationMenu,
  };
};

export default useOperationMenu;
