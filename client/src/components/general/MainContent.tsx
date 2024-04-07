import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ThreeDotsMenu from '../features/ThreeDotsMenu';
import { setModalConfig } from '../../store/actions/modalPopupSlicer';
import BoardContent from '../pages/boardPage/BoardContent';

interface IProps {
  classes: string;
  children?: React.ReactNode;
}

const MainContent: React.FC<IProps> = ({ classes, children }) => {
  const dispatch = useDispatch();
  const { activeOperationMenu } = useSelector((state: RootState) => state.activeMenu);

  const handleHistory = () => {
    dispatch(setModalConfig({ isModalOpen: true, contentKey: 'history' }));
  };
  return (
    <Wrapper className={classes}>
      {children}
      <MainContentHeader className="bg-gray-dark text-white rounded-md">
        <MainContentTitle>
          {activeOperationMenu.id ? (
            <>
              <span className="title ellipsis-text">{activeOperationMenu.title ?? ''}</span>
              <div className="dots-menu-wrapper">
                <ThreeDotsMenu
                  menus={['edit', 'addList', 'delete']}
                  boardId={activeOperationMenu.id}
                  $theme="white"
                />
              </div>
            </>
          ) : (
            'Statistics'
          )}
        </MainContentTitle>
        {activeOperationMenu.id ? (
          <div>
            <HistoryButton
              type="button"
              onClick={handleHistory}
            >
              History
            </HistoryButton>
          </div>
        ) : (
          <div />
        )}
      </MainContentHeader>
      <MainContentBox>{activeOperationMenu.id && <BoardContent boardId={activeOperationMenu.id} />}</MainContentBox>
    </Wrapper>
  );
};

export default React.memo(MainContent);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const MainContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
const MainContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
  min-width: 10%;
  gap: 4px;

  & .title {
    padding: 4px 6px;
    border-radius: 4px;

    &:hover {
      background-color: #d3dce635;
    }
  }
`;

const HistoryButton = styled.button`
  padding: 4px 6px;
  border-radius: 4px;
  color: #000;
  font-weight: 600;
  background-color: #fff;
  transition: all 400ms;

  &:hover {
    color: #fff;
    background-color: #d3dce635;
    transition: all 600ms;
  }
`;
const MainContentBox = styled.div`
  position: absolute;
  inset: 40px 4px 0 4px;
  padding: 8px 0 4px 0;
  overflow: auto hidden;
`;
