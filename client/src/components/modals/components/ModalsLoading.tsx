import React from 'react';

import styled from 'styled-components';
import LoadingSpinner from '../../general/LoadingSpinner';

interface IProps {
  title?: string;
}

const ModalLoading: React.FC<IProps> = () => {
  return (
    <ModalLoadingWrapper>
      <span className="text">Connecting...Please wait!</span>
      <div className="spinner">
        <LoadingSpinner />
      </div>
    </ModalLoadingWrapper>
  );
};

export default ModalLoading;

const ModalLoadingWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  & .text {
    padding: 12px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
  }
  & .spinner {
    position: relative;
    min-width: 40px;
  }
`;
