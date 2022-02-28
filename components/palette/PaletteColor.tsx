import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { DEVICE } from 'constants/';
import { TEXT_TYPE } from 'types';

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  currentColor: string;
  palettes: string[];
  setPalettes: Dispatch<SetStateAction<string[]>>;
  handleColor: (color: string, number: number) => void;
  index: number;
}

interface StyleProps {
  color: string;
}

export const PaletteColor = ({
  color,
  setColor,
  currentColor,
  palettes,
  setPalettes,
  handleColor,
  index,
}: Props) => {
  const handleClick = () => {
    const toReplace = palettes[0];
    if (color !== toReplace) {
      const filteredPalettes = palettes.filter((palette) => palette !== color);
      const newPalettes = filteredPalettes.slice(1);
      newPalettes.push(toReplace);
      newPalettes.unshift(color);
      setPalettes(newPalettes);
      setColor(color);
      handleColor(color, index);
    }
  };
  return (
    <>
      <ColorItem
        className={currentColor === color ? 'active' : ''}
        color={color}
        onClick={handleClick}
      ></ColorItem>
    </>
  );
};

const ColorItem = styled.li<StyleProps>`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  border: 1px solid #eaeaea;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  @media ${DEVICE.PHONE} {
    width: 2rem;
    height: 2rem;
  }
`;
