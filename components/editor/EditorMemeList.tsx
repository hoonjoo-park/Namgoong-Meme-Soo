import Meme from 'components/editor/Meme';
import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { API_DATA, SINGLE_API_DATA } from 'types';

interface Props {
  apiData: API_DATA;
  setCurrentMeme: Dispatch<SetStateAction<SINGLE_API_DATA | null>>;
}

function EditorMemeList({ apiData, setCurrentMeme }: Props) {
  return (
    <MemeListContainer>
      <MemeContainer>
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
  width: 48rem;
  height: 18rem;
  padding: 2em;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin-bottom: 2rem;
  overflow: scroll;
  &::after {
    content: '';
    position: absolute;
    width: 2em;
    height: 100%;
    background-color: #ffffff;
    right: 0;
    top: 0;
  }
`;

const MemeContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 30rem;
`;
