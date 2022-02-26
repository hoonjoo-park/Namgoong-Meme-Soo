import React, {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME, TEXT_TYPE } from 'types';
import { COLOR, DEVICE } from 'constants/';
interface Props {
  currentMeme: API_DATA | null | LOCAL_MEME;
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
  text: TEXT_TYPE;
  color: string;
}

const EditorImage = (
  { currentMeme, text, color, setCurrentMeme }: Props,
  ref: Ref<HTMLDivElement>
) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startTop, setStartTop] = useState(0);
  const [startLeft, setStartLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

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

  const handleEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleUnactive = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleUnactive(e);
    const file = e.dataTransfer.files[0];
    const url = URL.createObjectURL(file);
    setCurrentMeme({ url: url });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    const url = URL.createObjectURL(file);
    setCurrentMeme({ url: url });
  };
  return currentMeme ? (
    <ImgBox color={color} ref={ref}>
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
    <NoImage
      className={isDragging ? 'dragging' : ''}
      onDragEnter={(e) => handleEnter(e)}
      onDragOver={(e) => handleOver(e)}
      onDragLeave={(e) => handleUnactive(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <h3>이미지를 선택해주세요</h3>
      <label htmlFor='uploadImage'>직접 업로드</label>
      <input
        type='file'
        accept='image/*'
        name='uploadImage'
        id='uploadImage'
        onChange={(e) => handleChange(e)}
      />
    </NoImage>
  );
};

export default forwardRef(EditorImage);

const ImgBox = styled.div<{ color: string }>`
  position: relative;
  flex-shrink: 0;
  width: 40%;
  border-radius: 5px;
  margin-right: 1rem;
  & * {
    color: ${(props) => props.color};
  }
  @media ${DEVICE.PHONE} {
    width: 100%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const NoImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40%;
  height: 100%;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-right: 1rem;
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  input {
    display: none;
  }
  label {
    background-color: ${COLOR.blue};
    color: ${COLOR.white};
    border-radius: 5px;
    width: 7rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    cursor: pointer;
  }
  &.dragging {
    border: 2px solid ${COLOR.blue};
  }
  @media ${DEVICE.PHONE} {
    width: 100%;
  }
`;

const ImageText = styled.div`
  position: absolute;
  width: fit-content;
  left: 50%;
  padding: 10px;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: 900;
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
