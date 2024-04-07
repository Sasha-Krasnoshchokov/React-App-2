import React from 'react';

import styled from 'styled-components';
import ModalTitle from './components/ModalsTitle';
import { Action, ID } from '../../types/common';
import ListEditor from '../dataEditors/ListEditor';
import CardEditor from '../dataEditors/CardEditor';

interface IEditorContentsProps {
  boardId?: ID;
  listId?: ID;
  taskId?: ID;
  action?: Action;
  boardEntity?: keyof typeof editorContents | null;
}
type IEditorContents = {
  [key: string]: (props?: IEditorContentsProps) => React.ReactNode;
};

const editorContents: IEditorContents = {
  board: (props) => <ListEditor {...props} />,
  list: (props) => <ListEditor {...props} />,
  task: (props) => <CardEditor {...props} />,
};

interface IProps {
  action?: Action;
  boardEntity?: keyof typeof editorContents | null;
  boardId?: ID;
  listId?: ID;
  taskId?: ID;
}

const DataEditor: React.FC<IProps> = ({ action, boardEntity, boardId, listId, taskId }) => {
  return (
    <EditorWrapper>
      <ModalTitle />
      {editorContents[boardEntity as keyof typeof editorContents]({
        action: action,
        boardId,
        listId,
        taskId,
        boardEntity,
      })}
    </EditorWrapper>
  );
};

export default DataEditor;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 85%;
  min-width: 320px;
  min-height: 200px;
  border-radius: 20px;
  background-color: rgba(224, 224, 224, 1);
  overflow: hidden;
`;
