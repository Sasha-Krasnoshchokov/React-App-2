import React, { useMemo } from 'react';
import styled from 'styled-components';

import spinnerUrl from '../../assets/spinner.svg';

interface IProps {
  position?: 'centered' | 'top-center' | 'end' | 'start';
}

const LoadingSpinner: React.FC<IProps> = ({ position }) => {
  const inset = useMemo(() => {
    switch (position) {
      case 'centered':
        return 'calc(50% - 20px) auto auto calc(50% - 20px)';
      case 'end':
        return 'calc(50% - 20px) -10% auto auto';
      case 'start':
        return 'calc(50% - 20px) auto auto -10%';
      case 'top-center':
        return '0 auto auto calc(50% - 20px)';
      default:
        return 'calc(50% - 20px) auto auto calc(50% - 20px)';
    }
  }, [position]);
  return <LoadingSpinnerWrapper $inset={inset} />;
};

export default React.memo(LoadingSpinner);

const LoadingSpinnerWrapper = styled.div<{ $inset: string }>`
  position: absolute;
  inset: ${({ $inset }) => $inset};
  width: 40px;
  height: 40px;
  background-image: url(${spinnerUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1000;
  animation: 1s ease-in infinite rotation;

  @keyframes rotation {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;
