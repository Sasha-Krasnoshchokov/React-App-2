import React, { useCallback, useEffect, useState } from 'react';

import ModalTitle from './components/ModalsTitle';
import {
  HistoryList,
  HistoryListItem,
  HistoryListItemDate,
  HistoryListItemPoint,
  HistoryListItemText,
  HistoryPopupWrapper,
} from './styling';
import { IHistory } from '../../types/common';
import requests from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LoadingSpinner from '../general/LoadingSpinner';

export const Activities: React.FC<{ list: IHistory[] }> = ({ list }) => (
  <HistoryList>
    {[...list].reverse().map((item) => (
      <React.Fragment key={item.id}>
        <HistoryListItem>
          <HistoryListItemPoint />
          <HistoryListItemText dangerouslySetInnerHTML={{ __html: item.description }} />
          <HistoryListItemDate>{item.createdAt}</HistoryListItemDate>
        </HistoryListItem>
      </React.Fragment>
    ))}
  </HistoryList>
);

interface IProps {}

const HistoryPopup: React.FC<IProps> = () => {
  const { get } = requests;
  const { activeOperationMenu } = useSelector((state: RootState) => state.activeMenu);

  const [activities, setActivities] = useState<IHistory[]>([]);

  const getData = useCallback(async () => {
    const response = await get({ entity: 'activities', boardId: activeOperationMenu.id });
    setActivities(response?.data?.data || []);
  }, [get, activeOperationMenu]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <HistoryPopupWrapper>
      <ModalTitle title="History" />
      <HistoryList>{activities.length === 0 ? <LoadingSpinner /> : <Activities list={activities} />}</HistoryList>
    </HistoryPopupWrapper>
  );
};

export default HistoryPopup;
