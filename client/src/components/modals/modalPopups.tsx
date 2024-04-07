import { Action, ID } from '../../types/common';
import DataEditor from './DataEditor';
import HistoryPopup from './History';
import ModalLoading from './components/ModalsLoading';

interface IProps {
  boardId?: ID;
  listId?: ID;
  taskId?: ID;
  action?: Action;
  boardEntity?: keyof typeof modalPopups | null;
}
const modalPopups: { [key: string]: (props?: IProps) => React.ReactNode } = {
  loading: () => <ModalLoading />,
  history: () => <HistoryPopup />,
  dataEditor: (props?: IProps) => <DataEditor {...props} />,
};

export default modalPopups;
