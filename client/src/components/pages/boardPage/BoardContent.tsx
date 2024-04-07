import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardList from './BoardList';
import requests from '../../../api/api';
import { IBoardList } from '../../../types/boards';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsContentUpdate } from '../../../store/actions/contentUpdateSlicer';
import { ID } from '../../../types/common';
import LoadingSpinner from '../../general/LoadingSpinner';

export interface IBoardListsContext {
  lists: IBoardList[];
}
export const BoardListsContext = React.createContext<IBoardListsContext | null>(null);

interface IProps {
  boardId?: ID;
}
const BoardContent: React.FC<IProps> = ({ boardId }) => {
  const dispatch = useDispatch();
  const { shouldMainContentUpdate } = useSelector((state: RootState) => state.contentUpdate);

  const [isFetching, setIsFetching] = useState(false);
  const [lists, setLists] = useState<IBoardList[]>([]);

  const getData = useCallback(async () => {
    setIsFetching(true);
    const response = await requests.get({ entity: 'lists', boardId });
    setIsFetching(false);
    setLists(response?.data?.data ?? []);
    dispatch(setIsContentUpdate({ shouldMainContentUpdate: false, shouldOperationMenuUpdate: false }));
  }, [boardId, dispatch]);

  useEffect(() => {
    if (shouldMainContentUpdate) {
      getData();
    }
  }, [getData, shouldMainContentUpdate]);

  return (
    <BoardListsContext.Provider value={{ lists }}>
      <BoardContentWrapper>
        {isFetching ? (
          <LoadingSpinner position="centered" />
        ) : (
          <>
            {lists.length > 0 ? (
              <BoardListsWrapper $columns={lists.length > 4 ? lists.length : 4}>
                {lists.map((item, ind) => (
                  <React.Fragment key={`${item.title}-${ind}`}>
                    <BoardList
                      column={ind + 1}
                      list={item}
                    />
                  </React.Fragment>
                ))}
              </BoardListsWrapper>
            ) : (
              <p className="empty-content">You have no lists yet</p>
            )}
          </>
        )}
      </BoardContentWrapper>
    </BoardListsContext.Provider>
  );
};

export default BoardContent;

const BoardContentWrapper = styled.section`
  width: 100%;
  height: 100%;

  & .empty-content {
    margin: 0 auto;
    width: max-content;
    padding: 12px;
    font-size: 24px;
    line-height: 36px;
  }
`;

const BoardListsWrapper = styled.ul<{ $columns?: number }>`
  width: 100%;
  height: 100%;

  ${({ $columns }) =>
    $columns
      ? `
        display: grid;
        grid-gap: 8px;
        grid-template-columns: repeat(${$columns}, 1fr);
      `
      : ''}
  @media (max-width: 540px) {
    height: calc(100% - 100px);
  }
`;
