import React from 'react';

import styled from 'styled-components';
// import BoardHeader from './boardPage/BoardHeader';
// import BoardContent from './boardPage/BoardContent';
import Logo from '../general/Logo';
import Avatar from '../general/Avatar';
import MainSidebar from '../general/MainSidebar';
import OperationMenu from '../general/OperationMenu';
import MainContent from '../general/MainContent';

interface IProps {}

const MainPage: React.FC<IProps> = () => {
  return (
    <MainPageWrapper className="bg-gray rounded-lg font-sans">
      <div className="grid">
        <MainHeader className="grid-header">
          <Logo />
          <Avatar />
        </MainHeader>
        <MainSidebar classes="grid-menu-bar" />
        <OperationMenu classes="grid-operation-menu" />
        <MainContent classes="grid-content bg-gray-light rounded-lg" />
      </div>
    </MainPageWrapper>
  );
};

export default React.memo(MainPage);

const MainPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 6px 6px 0;
  overflow: hidden;

  .grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100px 240px 1fr;
    grid-template-rows: 48px 1fr;
  }

  .grid-header {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
  .grid-menu-bar {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  .grid-operation-menu {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  .grid-content {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 8px;
`;
// const MainContent = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 8px;
// `;
