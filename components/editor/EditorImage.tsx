import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { API_DATA, SINGLE_API_DATA, TEXT_TYPE } from 'types';

interface Props {
  currentMeme: SINGLE_API_DATA | null;
  text: TEXT_TYPE;
}

function EditorImage({ currentMeme, text }: Props) {
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
    const toMoveTop = e.pageY - startY + startTop;
    const toMoveLeft = e.pageX - startX + startLeft;
    if (e.currentTarget.id === 'topText') {
      topRef.current!.style.top = `${toMoveTop}px`;
      topRef.current!.style.left = `${toMoveLeft}px`;
      return;
    }
    if (e.currentTarget.id === 'middleText') {
      middleRef.current!.style.top = `${toMoveTop}px`;
      middleRef.current!.style.left = `${toMoveLeft}px`;
      return;
    }
    if (e.currentTarget.id === 'bottomText') {
      bottomRef.current!.style.top = `${toMoveTop}px`;
      bottomRef.current!.style.left = `${toMoveLeft}px`;
      return;
    }
  };

  return currentMeme ? (
    <ImgBox>
      <Img src={currentMeme!.url} alt='meme' draggable='false' />
      <ImageText
        id='topText'
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={handleMouseUp}
        ref={topRef}
      >
        {text.top}
      </ImageText>
      <ImageText
        id='middleText'
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        ref={middleRef}
      >
        {text.middle}
      </ImageText>
      <ImageText
        id='bottomText'
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        ref={bottomRef}
      >
        {text.bottom}
      </ImageText>
    </ImgBox>
  ) : (
    <NoImage>
      <h3>이미지를 선택해주세요</h3>
    </NoImage>
  );
}

export default EditorImage;

const ImgBox = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 32rem;
  border-radius: 5px;
  margin-right: 1rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const NoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32rem;
  height: 100%;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-right: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const ImageText = styled.div`
  position: absolute;
  width: fit-content;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  user-select: none;
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
