import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { API_DATA, SINGLE_API_DATA, TEXT_TYPE } from 'types';

interface Props {
  currentMeme: SINGLE_API_DATA | null;
  text: TEXT_TYPE;
}
interface Position {
  top: { x: number; y: number };
  middle: { x: number; y: number };
  bottom: { x: number; y: number };
}

function EditorImage({ currentMeme, text }: Props) {
  const [position, setPosition] = useState<Position>({
    top: { x: 0, y: 0 },
    middle: { x: 0, y: 0 },
    bottom: { x: 0, y: 0 },
  });
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);

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
    if (e.currentTarget.id === 'topText')
      return setPosition({ ...position, top: { x: toMoveLeft, y: toMoveTop } });
    if (e.currentTarget.id === 'middleText')
      return setPosition({
        ...position,
        middle: { x: toMoveLeft, y: toMoveTop },
      });
    if (e.currentTarget.id === 'bottomText')
      return setPosition({
        ...position,
        bottom: { x: toMoveLeft, y: toMoveTop },
      });
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
        position={position}
      >
        {text.top}
      </ImageText>
      <ImageText
        id='middleText'
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        position={position}
      >
        {text.middle}
      </ImageText>
      <ImageText
        id='bottomText'
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => handleMouseMove(e)}
        position={position}
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

const ImageText = styled.div<{ position: Position }>`
  position: absolute;
  width: fit-content;
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  cursor: pointer;
  &#topText {
    top: ${(props) =>
      props.position.top.y === 0 ? '10%' : `${props.position.top.y}px`};
    left: ${(props) =>
      props.position.top.x === 0 ? '50%' : `${props.position.top.x}px`};
  }
  &#middleText {
    top: ${(props) =>
      props.position.middle.y === 0 ? '50%' : props.position.middle.y};
    left: ${(props) =>
      props.position.middle.x === 0 ? '50%' : props.position.middle.x};
  }
  &#bottomText {
    top: ${(props) =>
      props.position.bottom.y === 0 ? '90%' : props.position.bottom.y};
    left: ${(props) =>
      props.position.bottom.x === 0 ? '50%' : props.position.bottom.x};
  }
`;
