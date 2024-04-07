import React, { useCallback, useEffect, useState } from 'react';
import ModalPopup from './components/modals/ModalPopup';
import MainPage from './components/pages/MainPage';
import requests from './api/api';
import { useDispatch } from 'react-redux';
import { resetModalConfig, setModalConfig } from './store/actions/modalPopupSlicer';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState(false);

  const callServer = useCallback(async () => {
    dispatch(setModalConfig({ isModalOpen: true, contentKey: 'loading' }));
    const response = await requests.get({ entity: 'server' });
    console.log({ response });
    setIsConnected(true);
    dispatch(resetModalConfig());
  }, [dispatch]);

  useEffect(() => {
    if (!isConnected) {
      callServer();
    }
  }, [isConnected, callServer]);
  return (
    <>
      <ModalPopup />
      <MainPage />
    </>
  );
};

export default App;
