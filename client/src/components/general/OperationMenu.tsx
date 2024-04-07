import React from 'react';
import styled from 'styled-components';

import { AddNewEntity } from '../features/Actions';
import ThreeDotsMenu from '../features/ThreeDotsMenu';
import useOperationMenu from '../../hooks/useOperationMenu';

interface IProps {
  classes: string;
}

const OperationMenu: React.FC<IProps> = ({ classes }) => {
  const { activeMenu, dataFromServer, isAddEntityBtn, selectedOperationMenu, handleCreateBoard, handleOperationMenu } =
    useOperationMenu();

  return (
    <Wrapper className={classes}>
      <OperationMenuBox
        data-label={activeMenu.title || 'News'}
        role="button"
        className="bg-gray-dark rounded-lg"
      >
        <List>
          {isAddEntityBtn && (
            <AddNewEntity
              $theme="white"
              onClick={handleCreateBoard}
            >{`Add ${`${activeMenu.id ?? ''}`.slice(0, -1)}`}</AddNewEntity>
          )}
          {dataFromServer.map((item, ind) => (
            <React.Fragment key={item.id ?? `board-${ind}`}>
              <div className="list-item">
                <div
                  id={`${item.id ?? `board-${ind}`}`}
                  className="select-btn"
                  role="button"
                  data-active={item.id === selectedOperationMenu?.id}
                  onClick={() => handleOperationMenu(item)}
                >
                  <p className="ellipsis-text">{item.title}</p>
                </div>
                <div className="dots-menu-wrapper">
                  <ThreeDotsMenu
                    menus={['edit', 'addList', 'delete']}
                    boardId={item.id}
                    $theme="white"
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </List>
      </OperationMenuBox>
    </Wrapper>
  );
};

export default React.memo(OperationMenu);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 0;
`;
const OperationMenuBox = styled.div`
  position: absolute;
  inset: 0 8px 0 0;
  gap: 12px;
  cursor: default;
  padding: 40px 4px 8px 8px;

  &:before {
    content: attr(data-label);
    position: absolute;
    inset: 0 auto auto 8px;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 40px;
  }
`;
const List = styled.ul`
  gap: 12px;
  width: 100%;
  height: 100%;
  padding: 0 4px 0 0;
  overflow: hidden auto;

  & .list-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    height: 40px;

    & .select-btn {
      display: flex;
      align-items: center;
      width: calc(100% - 16px - 8px);
      height: 100%;
      padding: 0 6px;
      color: #000;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      border-radius: 6px;
      background-color: #fff;
      transition: all 400ms;

      &[data-active='true'] {
        color: #fff;
        background-color: #d3dce635;
        transition: all 600ms;
      }

      &:hover {
        opacity: 0.75;
        cursor: pointer;
      }
    }
  }
`;
