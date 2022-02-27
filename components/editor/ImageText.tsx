import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { TEXT_BOUNDARY, TEXT_TYPE } from 'types';

interface Props {
  text: TEXT_TYPE;
  textBoundary: TEXT_BOUNDARY | null;
}

export const ImageText = ({ text, textBoundary }: Props) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
    textMover(toMoveTop, toMoveLeft, e);
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
    console.log(
      'to Left:',
      toMoveLeft,
      'to Top:',
      toMoveTop,
      textBoundary,
      'width:',
      e.currentTarget.offsetWidth
    );
    if (moveOptions) return;
    textMover(toMoveTop, toMoveLeft, e);
  };

  const textMover = (
    top: number,
    left: number,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    if (e.currentTarget.id === 'topText') {
      topRef.current!.style.top = `${top}px`;
      topRef.current!.style.left = `${left}px`;
      return;
    }
    if (e.currentTarget.id === 'middleText') {
      middleRef.current!.style.top = `${top}px`;
      middleRef.current!.style.left = `${left}px`;
      return;
    }
    if (e.currentTarget.id === 'bottomText') {
      bottomRef.current!.style.top = `${top}px`;
      bottomRef.current!.style.left = `${left}px`;
      return;
    }
  };

  return (
    <>
      <Text
        id='topText'
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={handleMouseUp}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchEnd={handleMouseUp}
        ref={topRef}
      >
        {text.top}
      </Text>
      <Text
        id='middleText'
        onPointerDown={(e) => handleMouseDown(e)}
        onPointerUp={handleMouseUp}
        onPointerMove={(e) => handleMouseMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchEnd={handleMouseUp}
        ref={middleRef}
      >
        {text.middle}
      </Text>
      <Text
        id='bottomText'
        onPointerDown={(e) => handleMouseDown(e)}
        onPointerUp={handleMouseUp}
        onPointerMove={(e) => handleMouseMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchEnd={handleMouseUp}
        ref={bottomRef}
      >
        {text.bottom}
      </Text>
    </>
  );
};

const Text = styled.div`
  position: absolute;
  width: fit-content;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: 900;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  user-select: none;
  touch-action: none;
  cursor: pointer;
  &#topText {
    top: 10%;
  }
  &#middleText {
    top: 50%;
  }
  &#bottomText {
    top: 90%;
  }
`;
