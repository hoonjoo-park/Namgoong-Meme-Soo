import styled from 'styled-components';
import { API_DATA, SINGLE_API_DATA } from 'types';

interface Props {
  currentMeme: SINGLE_API_DATA | null;
}

function EditorImage({ currentMeme }: Props) {
  return currentMeme ? (
    <Img src={currentMeme!.url} alt='meme' />
  ) : (
    <NoImage>
      <h3>이미지를 선택해주세요</h3>
    </NoImage>
  );
}

export default EditorImage;

const Img = styled.img`
  width: 32rem;
  height: 100%;
  border-radius: 5px;
  margin-right: 1rem;
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
