import React from 'react';

import styled from 'styled-components';

import { Action, ID } from '../../types/common';
import capitalize from '../../helpers/capitalize';
import useListEditor from '../../hooks/useListEditor';
import { EditorAction, EditorDescription, EditorTitle, EditorTitleWrapper } from './styling';
import LoadingSpinner from '../general/LoadingSpinner';

interface IProps {
  listId?: ID;
  action?: Action;
}

const ListEditor: React.FC<IProps> = ({ action }) => {
  const {
    isEdit,
    newTitle,
    isFetching,
    boardEntity,
    currentData,
    actionIconUrl,
    setNewTitle,
    setNewDescription,
    handleEditorAction,
  } = useListEditor();

  return (
    <ListEditorWrapper role="form">
      {isFetching && !currentData ? (
        <LoadingSpinner />
      ) : (
        <>
          <EditorTitleWrapper>
            <EditorTitle>
              {isEdit ? (
                <input
                  autoFocus
                  tabIndex={1}
                  placeholder="Add title"
                  defaultValue={currentData?.title}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                <span>{currentData?.title ?? ''}</span>
              )}
            </EditorTitle>
            {isFetching ? (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            ) : (
              <EditorAction
                type="button"
                tabIndex={3}
                $isEdit={isEdit}
                $iconUrl={actionIconUrl}
                $isDisabled={!newTitle && !currentData?.title}
                onClick={handleEditorAction}
              >
                {`${isEdit ? 'Save' : capitalize(action || '')} ${boardEntity}`}
              </EditorAction>
            )}
          </EditorTitleWrapper>
          {action !== 'delete' && (
            <EditorDescription>
              Description
              {isEdit ? (
                <textarea
                  rows={1}
                  tabIndex={2}
                  placeholder="Add description"
                  defaultValue={currentData?.description}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              ) : (
                <span>{currentData?.description ?? ''}</span>
              )}
            </EditorDescription>
          )}
        </>
      )}
    </ListEditorWrapper>
  );
};

export default ListEditor;

const ListEditorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
`;
