import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.svg';

interface IProps {}

const Logo: React.FC<IProps> = () => {
  return <LogoWrapper className="text-lg font-semibold">EasyMan</LogoWrapper>;
};

export default React.memo(Logo);

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  height: 100%;
  padding: 0 4px 0 40px;

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 4px;
    transform: translateY(-50%);
    width: 32px;
    height: 24px;
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;
