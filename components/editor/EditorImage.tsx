import React, {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME, TEXT_BOUNDARY, TEXT_TYPE } from 'types';
import { COLOR, DEVICE } from 'constants/';
import { ImageText } from './ImageText';
interface Props {
  currentMeme: API_DATA | null | LOCAL_MEME;
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
  text: TEXT_TYPE;
  textBoundary: TEXT_BOUNDARY | null;
  inputs: number[];
}

const EditorImage = (
  { currentMeme, text, setCurrentMeme, textBoundary, inputs }: Props,
  ref: Ref<HTMLDivElement>
) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
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
    handleUnactive(e);
    const file = e.dataTransfer.files[0];
    const url = URL.createObjectURL(file);
    setCurrentMeme({ url: url });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    const url = URL.createObjectURL(file);
    setCurrentMeme({ url: url });
  };
  return currentMeme ? (
    <ImgBox ref={ref}>
      <Img src={currentMeme!.url} alt='meme' draggable='false' />
      {inputs.map((input, i) => (
        <ImageText
          key={`imgText-${i}`}
          index={i}
          text={text[i]}
          textBoundary={textBoundary}
        />
      ))}
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

const ImgBox = styled.div`
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
  height: 40rem;
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
    height: 350px;
    flex-shrink: 0;
  }
`;
