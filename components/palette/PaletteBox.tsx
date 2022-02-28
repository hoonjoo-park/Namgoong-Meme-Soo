import { COLOR, COLOR_PALETTE, DEVICE } from 'constants/';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { PaletteColor } from './PaletteColor';
import { TEXT_TYPE } from 'types';

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  handleColor: (color: string, number: number) => void;
  index: number;
}

export const PaletteBox = ({ color, setColor, handleColor, index }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [palettes, setPalettes] = useState(COLOR_PALETTE);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <ColorBox className={isOpen ? 'open' : ''} onClick={handleOpen}>
      {palettes.map((col, i) => (
        <PaletteColor
          key={`color-${i}`}
          color={col}
          currentColor={color}
          setColor={setColor}
          palettes={palettes}
          setPalettes={setPalettes}
          handleColor={handleColor}
          index={index}
        />
      ))}
    </ColorBox>
  );
};

const ColorBox = styled.ul`
  position: absolute;
  right: 55%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  max-width: calc(2rem + 2px);
  max-height: 2rem;
  overflow: hidden;
  transition: all 0.1s ease-in-out;
  &.open {
    max-width: ${COLOR_PALETTE.length * 2.5}rem;
  }
  @media ${DEVICE.PHONE} {
    max-width: calc(1.5rem + 2px);
    max-height: 1.5rem;
    &.open {
      max-width: ${COLOR_PALETTE.length * 2}rem;
    }
  }
`;
