import Meme from 'components/editor/Meme';
import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME } from 'types';
import { COLOR, DEVICE } from 'constants/';
import { FaRedoAlt } from 'react-icons/fa';

interface Props {
  apiData: API_DATA[];
  currentMeme: API_DATA | null | LOCAL_MEME;
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
}

function EditorMemeList({ apiData, currentMeme, setCurrentMeme }: Props) {
  const handleClear = () => {
    setCurrentMeme(null);
  };
  return (
    <MemeListContainer>
      <MemeContainer>
        <ClearButton onClick={handleClear}>
          <FaRedoAlt />
        </ClearButton>
        {apiData.map((data) => (
          <Meme key={data.id} meme={data} setCurrentMeme={setCurrentMeme} />
        ))}
      </MemeContainer>
    </MemeListContainer>
  );
}

export default EditorMemeList;

const MemeListContainer = styled.div`
  position: relative;
  width: calc(100%-1em);
  height: 100%;
  padding: 1em;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-bottom: 2rem;
  overflow: scroll;
  @media ${DEVICE.PHONE} {
    margin-bottom: 0.5rem;
  }
`;

const MemeContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ClearButton = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 5rem;
  height: 5rem;
  margin-right: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.75);
  transition: transform 0.2s ease-in-out;
  font-weight: 700;
  color: ${COLOR.red};
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  svg {
    transform: rotate(225deg);
  }
  @media ${DEVICE.PHONE} {
    min-width: 3rem;
    height: 3rem;
  }
`;
