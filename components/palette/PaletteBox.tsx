import { COLOR_PALETTE } from 'constants/';
import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { PaletteColor } from './PaletteColor';

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}

export const PaletteBox = ({ color, setColor }: Props) => {
  return (
    <ColorBox>
      {COLOR_PALETTE.map((col, i) => (
        <PaletteColor
          key={`color-${i}`}
          color={col}
          currentColor={color}
          setColor={setColor}
        />
      ))}
    </ColorBox>
  );
};

const ColorBox = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
`;
