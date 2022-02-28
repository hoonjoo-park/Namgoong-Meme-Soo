import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { TEXT_BOUNDARY, TEXT_TYPE } from 'types';

interface Props {
  text: { text: string; color: string };
  textBoundary: TEXT_BOUNDARY | null;
}

export const ImageText = ({ text, textBoundary }: Props) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.pageX);
    setStartY(e.pageY);
    setStartTop(e.currentTarget.offsetTop);
    setStartLeft(e.currentTarget.offsetLeft);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDown) return;
    e.preventDefault();
    e.stopPropagation();
    const toMoveTop = e.pageY - startY + startTop;
    const toMoveLeft = e.pageX - startX + startLeft;
    const moveOptions =
      toMoveTop + 10 <= 0 ||
      toMoveTop + e.currentTarget.offsetHeight - 10 >= textBoundary!.bottom ||
      toMoveLeft - e.currentTarget.offsetWidth / 2 + 10 <= 0 ||
      toMoveLeft + e.currentTarget.offsetWidth / 2 - 10 >= textBoundary!.right;
    if (moveOptions) return;
    textMover(toMoveTop, toMoveLeft);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDown(true);
    setStartX(e.changedTouches[0].pageX);
    setStartY(e.changedTouches[0].pageY);
    setStartTop(e.currentTarget.offsetTop);
    setStartLeft(e.currentTarget.offsetLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.stopPropagation();
    const toMoveTop = e.changedTouches[0].pageY - startY + startTop;
    const toMoveLeft = e.changedTouches[0].pageX - startX + startLeft;
    const moveOptions =
      toMoveTop + 10 <= 0 ||
      toMoveTop + e.currentTarget.offsetHeight - 10 >= textBoundary!.bottom ||
      toMoveLeft - e.currentTarget.offsetWidth / 2 + 10 <= 0 ||
      toMoveLeft + e.currentTarget.offsetWidth / 2 - 10 >= textBoundary!.right;
    if (moveOptions) return;
    textMover(toMoveTop, toMoveLeft);
  };

  const textMover = (top: number, left: number) => {
    inputRef.current!.style.top = `${top}px`;
    inputRef.current!.style.left = `${left}px`;
    return;
  };

  return (
    <>
      <Text
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={handleMouseUp}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchEnd={handleMouseUp}
        ref={inputRef}
        color={text['color']}
      >
        {text['text']}
      </Text>
    </>
  );
};

const Text = styled.div<{ color: string }>`
  position: absolute;
  width: fit-content;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: 900;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  user-select: none;
  touch-action: none;
  color: ${(props) => props.color};
  cursor: pointer;
`;
