import Meme from 'components/editor/Meme';
import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME } from 'types';
import { DEVICE } from 'constants/';

interface Props {
  apiData: API_DATA[];
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
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
