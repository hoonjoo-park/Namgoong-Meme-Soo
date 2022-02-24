import React, { useState } from 'react';
import styled from '@emotion/styled';
import Editor from 'components/editor/Editor';
import { API_DATA, LOCAL_MEME } from 'types';

interface Props {
  memes: API_DATA[];
}

function Main({ memes }: Props) {
  const [currentMeme, setCurrentMeme] = useState<API_DATA | null | LOCAL_MEME>(
    null
  );
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
