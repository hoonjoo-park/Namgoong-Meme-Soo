import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { fetcher } from 'utils/fetcher';
import Editor from 'components/editor/Editor';
import { API_DATA } from 'types';

interface Props {
  memes: API_DATA[];
}

function Main({ memes }: Props) {
  const [currentMeme, setCurrentMeme] = useState<API_DATA | null>(null);
  return (
    <MainContainer>
      <Editor
        apiData={memes}
        currentMeme={currentMeme}
        setCurrentMeme={setCurrentMeme}
      />
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
