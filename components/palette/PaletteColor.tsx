import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { DEVICE } from 'constants/';

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  currentColor: string;
}

interface StyleProps {
  color: string;
}

export const PaletteColor = ({ color, setColor, currentColor }: Props) => {
  const handleClick = () => {
    setColor(color);
  };
  return (
    <ColorItem
      className={currentColor === color ? 'active' : ''}
      color={color}
      onClick={handleClick}
    ></ColorItem>
  );
};

const ColorItem = styled.li<StyleProps>`
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  border: 1px solid #eaeaea;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  &:hover {
    transform: scale(1.05);
  }
  &.active {
    border: 2px solid #00adb5;
  }
  @media ${DEVICE.PHONE} {
    width: 2rem;
    height: 2rem;
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
`;
