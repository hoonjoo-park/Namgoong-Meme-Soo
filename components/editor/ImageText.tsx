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
}

export const ImageText = ({ text, textBoundary, index }: Props) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizer, setResizer] = useState<string | null>(null);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleMoveStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDown(true);
    const event = e.nativeEvent;
    if (event instanceof MouseEvent) {
      setStartX(event.pageX);
      setStartY(event.pageY);
    }
    if (event instanceof TouchEvent) {
      setStartX(event.changedTouches[0].pageX);
      setStartY(event.changedTouches[0].pageY);
    }
    setStartTop(e.currentTarget.offsetTop);
    setStartLeft(e.currentTarget.offsetLeft);
  };

  const calcMoveValue = (e: MouseEvent | TouchEvent) => {
    if (!isDown || isResizing) return;
    e.preventDefault();
    e.stopPropagation();
    let toMoveTop = 0;
    let toMoveLeft = 0;
    if (e instanceof MouseEvent) {
      toMoveTop = e.pageY - startY + startTop;
      toMoveLeft = e.pageX - startX + startLeft;
    }
    if (e instanceof TouchEvent) {
      toMoveTop = e.changedTouches[0].pageY - startY + startTop;
      toMoveLeft = e.changedTouches[0].pageX - startX + startLeft;
    }
    const moveOptions =
      toMoveTop + 10 <= 0 ||
      toMoveTop + inputRef.current!.offsetHeight >= textBoundary!.bottom ||
      toMoveLeft - inputRef.current!.offsetWidth / 2 <= 0 ||
      toMoveLeft + inputRef.current!.offsetWidth / 2 >= textBoundary!.right;
    if (moveOptions) return;
    textMover(toMoveTop, toMoveLeft);
  };

  const textMover = (top: number, left: number) => {
    inputRef.current!.style.top = `${top}px`;
    inputRef.current!.style.left = `${left}px`;
    return;
  };

  const handleStopMoving = () => {
    setIsDown(false);
    window.removeEventListener('mousemove', calcMoveValue);
    window.removeEventListener('touchmove', calcMoveValue);
    window.removeEventListener('mouseup', handleStopMoving);
    window.removeEventListener('touchend', handleStopMoving);
  };

  const handleResizeStart = (
    e: React.MouseEvent<HTMLSpanElement> | React.TouchEvent<HTMLSpanElement>,
    type: string
  ) => {
    setResizer(type);
    setIsResizing(true);
    if (e instanceof MouseEvent) {
      setStartX(e.pageX);
      setStartY(e.pageY);
    }
    if (e instanceof TouchEvent) {
      setStartX(e.changedTouches[0].pageX);
      setStartY(e.changedTouches[0].pageY);
    }
    const inputStyle = getComputedStyle(inputRef.current!);
    const inputWidth = parseFloat(inputStyle.width);
    const inputHeight = parseFloat(inputStyle.height);
    setStartWidth(inputWidth);
    setStartHeight(inputHeight);
  };

  const calcResizeValue = (e: MouseEvent | TouchEvent) => {
    let movedX = 0;
    let movedY = 0;
    if (e instanceof MouseEvent) {
      movedX = startX - e.pageX;
      movedY = startY - e.pageY;
    }
    if (e instanceof TouchEvent) {
      movedX = startX - e.changedTouches[0].pageX;
      movedY = startY - e.changedTouches[0].pageY;
    }
    handleFontSize();
    handleResize(movedX, movedY);
  };

  const checkIsOverflowed = () => {
    const isOverflowedX =
      inputRef.current!.offsetWidth + 2 < inputRef.current!.scrollWidth;
    const isOverflowedY =
      inputRef.current!.offsetHeight + 3 < inputRef.current!.scrollHeight;
    return isOverflowedX || isOverflowedY;
  };

  useEffect(() => {
    handleFontSize();
  }, [text['text']]);

  const handleFontSize = () => {
    const inputStyle = getComputedStyle(inputRef.current!);
    if (checkIsOverflowed()) {
      while (true) {
        const fontSize = parseFloat(inputStyle.fontSize);
        if (!checkIsOverflowed() || fontSize <= 10) break;
        inputRef.current!.style.fontSize = `${fontSize - 0.1}px`;
      }
      return;
    }
    while (true) {
      const fontSize = parseFloat(inputStyle.fontSize);
      if (checkIsOverflowed() || fontSize >= 60) break;
      inputRef.current!.style.fontSize = `${fontSize + 0.1}px`;
    }
  };

  const handleResize = (movedX: number, movedY: number) => {
    switch (resizer) {
      case 'leftTop':
        inputRef.current!.style.width = `${startWidth + movedX}px`;
        inputRef.current!.style.height = `${startHeight + movedY}px`;
        inputRef.current!.style.top = `${startTop - movedY}px`;
        break;
      case 'rightTop':
        inputRef.current!.style.width = `${startWidth - movedX}px`;
        inputRef.current!.style.height = `${startHeight + movedY}px`;
        inputRef.current!.style.top = `${startTop - movedY}px`;
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
    window.removeEventListener('mousemove', calcResizeValue);
    window.removeEventListener('mouseup', stopResizing);
    window.removeEventListener('touchmove', calcResizeValue);
    window.removeEventListener('touchend', stopResizing);
  };

  useEffect(() => {
    if (!resizer || !isResizing) return;
    window.addEventListener('mousemove', calcResizeValue);
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('touchmove', calcResizeValue);
    window.addEventListener('touchend', stopResizing);
  }, [resizer, isResizing]);

  useEffect(() => {
    window.addEventListener('mousemove', calcMoveValue);
    window.addEventListener('mouseup', handleStopMoving);
    window.addEventListener('touchmove', calcMoveValue);
    window.addEventListener('touchend', handleStopMoving);
  }, [isDown]);

  return (
    <>
      <Text
        className={isResizing ? 'active' : ''}
        onMouseDown={(e) => handleMoveStart(e)}
        onTouchStart={(e) => handleMoveStart(e)}
        ref={inputRef}
        color={text['color']}
        index={index}
      >
        {text['text']}
        <Resizer
          className='resizer leftTop'
          onMouseDown={(e) => handleResizeStart(e, 'leftTop')}
          onTouchStart={(e) => handleResizeStart(e, 'leftTop')}
        ></Resizer>
        <Resizer
          className='resizer rightTop'
          onMouseDown={(e) => handleResizeStart(e, 'rightTop')}
          onTouchStart={(e) => handleResizeStart(e, 'rightTop')}
        ></Resizer>
        <Resizer
          className='resizer rightBottom'
          onMouseDown={(e) => handleResizeStart(e, 'rightBottom')}
          onTouchStart={(e) => handleResizeStart(e, 'rightBottom')}
        ></Resizer>
        <Resizer
          className='resizer leftBottom'
          onMouseDown={(e) => handleResizeStart(e, 'leftBottom')}
          onTouchStart={(e) => handleResizeStart(e, 'leftBottom')}
        ></Resizer>
      </Text>
    </>
  );
};

const Text = styled.div<StyleProps>`
  position: absolute;
  max-width: 470px;
  width: 60%;
  top: ${(props) => `calc(11% * ${props.index + 1})`};
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: 900;
  white-space: nowrap;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  user-select: none;
  touch-action: none;
  color: ${(props) => props.color};
  cursor: move;
  text-align: center;
  &:hover {
    border: 1px dashed ${COLOR.blue};
    & .resizer {
      display: block;
    }
  }
  &.active {
    border: 1px dashed ${COLOR.blue};
    & .resizer {
      display: block;
    }
  }
`;

const Resizer = styled.span`
  position: absolute;
  display: none;
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
