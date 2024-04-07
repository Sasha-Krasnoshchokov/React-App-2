import React from 'react';
import ModalPopup from './components/modals/ModalPopup';
import MainPage from './components/pages/MainPage';

const App: React.FC = () => {
  return (
    <>
      <ModalPopup />
      <MainPage />
    </>
  );
};

export default App;
