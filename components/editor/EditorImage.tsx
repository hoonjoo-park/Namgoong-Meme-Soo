import styled from 'styled-components';
import { API_DATA, SINGLE_API_DATA, TEXT_TYPE } from 'types';

interface Props {
  currentMeme: SINGLE_API_DATA | null;
  text: TEXT_TYPE;
}

function EditorImage({ currentMeme, text }: Props) {
  return currentMeme ? (
    <ImgBox>
      <Img src={currentMeme!.url} alt='meme' />
      <ImageText id='topText'>{text.top}</ImageText>
      <ImageText id='middleText'>{text.middle}</ImageText>
      <ImageText id='bottomText'>{text.bottom}</ImageText>
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
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 2px 2px 3px rgba(150, 150, 150, 1);
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  cursor: pointer;
  &#topText {
    top: 10%;
  }
  &#middleText {
    top: 50%;
    transform: translate(-50%);
  }
  &#bottomText {
    bottom: 10%;
  }
`;
