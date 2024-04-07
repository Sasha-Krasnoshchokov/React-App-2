import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import mainSidebar from '../../data/mainSidebar';
import { IMenu } from '../../types/common';
import { useDispatch } from 'react-redux';
import { setActiveMenu } from '../../store/actions/activeMenuSlicer';
import { setIsContentUpdate } from '../../store/actions/contentUpdateSlicer';

interface IProps {
  classes: string;
}

const MainSidebar: React.FC<IProps> = ({ classes }) => {
  const dispatch = useDispatch();

  const [activeMenuId, setActiveMenuId] = useState<keyof IMenu | null>(null);

  const handleMenu = useCallback(
    (e: React.MouseEvent) => {
      const { id } = e.target as HTMLUListElement;
      setActiveMenuId(id as keyof IMenu);
      dispatch(setActiveMenu(mainSidebar.find((item) => item.id === id)));
      dispatch(setIsContentUpdate({ shouldMainContentUpdate: false, shouldOperationMenuUpdate: true }));
    },
    [dispatch]
  );
  return (
    <Wrapper className={classes}>
      <List
        role="button"
        onClick={handleMenu}
      >
        {mainSidebar.map((item) => (
          <React.Fragment key={item.id}>
            <li
              id={`${item.id ?? ''}`}
              data-active={item.id === activeMenuId}
              className="list-item"
            >
              {item.title}
            </li>
          </React.Fragment>
        ))}
      </List>
    </Wrapper>
  );
};

export default React.memo(MainSidebar);

const Wrapper = styled.aside`
  width: 100%;
  height: 100%;
  padding: 0 8px 8px 8px;
`;
const List = styled.ul`
  gap: 8px;
  width: 100%;
  height: 100%;
  cursor: default;

  & .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    border-radius: 6px;
    opacity: 0.85;
    background-color: #273444;
    overflow: hidden;
    transition: all 400ms;

    &:hover {
      opacity: 0.75;
      cursor: pointer;
    }
    &[data-active='true'] {
      color: #000;
      font-weight: 700;
      background-color: #fff;
      transition: all 600ms;
    }
  }
`;
