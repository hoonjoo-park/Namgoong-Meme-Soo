import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { TEXT_BOUNDARY } from 'types';
import { COLOR } from 'constants/';

interface Props {
  text: { text: string; color: string };
  textBoundary: TEXT_BOUNDARY | null;
  index: number;
}

interface StyleProps {
  index: number;
  color: string;
  fontSize: number;
}

export const ImageText = ({ text, textBoundary, index }: Props) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizer, setResizer] = useState<string | null>(null);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [fontSize, setFontSize] = useState(32);
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
    if (!isDown || isResizing) return;
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
    if (!isDown || isResizing) return;
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

  const resizeStart = (e: React.MouseEvent, type: string) => {
    setResizer(type);
    setIsResizing(true);
    setResizeStartX(e.clientX);
    setResizeStartY(e.clientY);
    const inputStyle = getComputedStyle(inputRef.current!);
    const inputWidth = parseFloat(inputStyle.width);
    const inputHeight = parseFloat(inputStyle.height);
    setStartWidth(inputWidth);
    setStartHeight(inputHeight);
  };

  const touchResizeStart = (e: React.TouchEvent, type: string) => {
    setResizer(type);
    setIsResizing(true);
    setResizeStartX(e.changedTouches[0].clientX);
    setResizeStartY(e.changedTouches[0].clientY);
    const inputStyle = getComputedStyle(inputRef.current!);
    setStartWidth(parseFloat(inputStyle.width));
    setStartHeight(parseFloat(inputStyle.height));
  };

  const mouseResizing = (e: MouseEvent) => {
    const movedX = resizeStartX - e.clientX;
    const movedY = resizeStartY - e.clientY;
    handleFontSize();
    if (movedX === 0) return;
    handleResize(movedX, movedY);
  };

  const touchResizing = (e: TouchEvent) => {
    const movedX = resizeStartX - e.changedTouches[0].clientX;
    const movedY = resizeStartY - e.changedTouches[0].clientY;
    handleFontSize();
    if (movedX === 0) return;
    handleResize(movedX, movedY);
  };

  const handleFontSize = () => {
    const fontSize =
      inputRef.current!.offsetWidth * inputRef.current!.offsetHeight * 0.005;
    if (fontSize < 80) {
      setFontSize(fontSize);
    }
  };

  const handleResize = (movedX: number, movedY: number) => {
    switch (resizer) {
      case 'leftTop':
        inputRef.current!.style.width = `${startWidth + movedX}px`;
        inputRef.current!.style.height = `${startHeight + movedY}px`;
        break;
      case 'rightTop':
        inputRef.current!.style.width = `${startWidth - movedX}px`;
        inputRef.current!.style.height = `${startHeight + movedY}px`;
        break;
      case 'rightBottom':
        inputRef.current!.style.width = `${startWidth - movedX}px`;
        inputRef.current!.style.height = `${startHeight - movedY}px`;
        break;
      case 'leftBottom':
        inputRef.current!.style.width = `${startWidth + movedX}px`;
        inputRef.current!.style.height = `${startHeight - movedY}px`;
        break;
      default:
        return;
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', mouseResizing);
    document.removeEventListener('mouseup', stopResizing);
  };

  useEffect(() => {
    if (!resizer || !isResizing) return;
    document.addEventListener('mousemove', mouseResizing);
    document.addEventListener('mouseup', stopResizing);
    document.addEventListener('touchmove', touchResizing);
    document.addEventListener('touchend', stopResizing);
  }, [resizer, isResizing]);
  return (
    <>
      <Text
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchEnd={handleMouseUp}
        ref={inputRef}
        color={text['color']}
        index={index}
        fontSize={fontSize}
      >
        {text['text']}
        <Resizer
          className='resizer leftTop'
          onMouseDown={(e) => resizeStart(e, 'leftTop')}
          onTouchStart={(e) => touchResizeStart(e, 'leftTop')}
        ></Resizer>
        <Resizer
          className='resizer rightTop'
          onMouseDown={(e) => resizeStart(e, 'rightTop')}
          onTouchStart={(e) => touchResizeStart(e, 'rightTop')}
        ></Resizer>
        <Resizer
          className='resizer rightBottom'
          onMouseDown={(e) => resizeStart(e, 'rightBottom')}
          onTouchStart={(e) => touchResizeStart(e, 'rightBottom')}
        ></Resizer>
        <Resizer
          className='resizer leftBottom'
          onMouseDown={(e) => resizeStart(e, 'leftBottom')}
          onTouchStart={(e) => touchResizeStart(e, 'leftBottom')}
        ></Resizer>
      </Text>
    </>
  );
};

const Text = styled.div<StyleProps>`
  position: absolute;
  width: fit-content;
  top: ${(props) => `calc(11% * ${props.index + 1})`};
  left: 50%;
  transform: translateX(-50%);
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: 900;
  white-space: nowrap;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  user-select: none;
  touch-action: none;
  color: ${(props) => props.color};
  cursor: move;
  text-align: center;
  border: 1px dashed ${COLOR.blue};
`;

const Resizer = styled.span`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: ${COLOR.blue};
  border-radius: 50%;
  &.leftTop {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }
  &.rightTop {
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }
  &.rightBottom {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
  &.leftBottom {
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }
`;
