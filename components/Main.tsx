import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetcher } from 'utils/fetcher';
import Editor from './Editor';

function Main() {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { memes },
      } = await fetcher();
      setApiData(memes);
    })();
  }, []);
  return (
    <MainContainer>
      <Editor />
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
