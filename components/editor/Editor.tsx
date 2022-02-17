import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { API_DATA, SINGLE_API_DATA, TEXT_TYPE } from 'types';
import EditorForm from './EditorForm';
import EditorImage from './EditorImage';
import EditorMemeList from './EditorMemeList';

interface Props {
  apiData: API_DATA;
  currentMeme: SINGLE_API_DATA | null;
  setCurrentMeme: Dispatch<SetStateAction<SINGLE_API_DATA | null>>;
}

function Editor({ apiData, currentMeme, setCurrentMeme }: Props) {
  const [text, setText] = useState<TEXT_TYPE>({
    top: '',
    middle: '',
    bottom: '',
  });
  const [color, setColor] = useState<string>('#000000');

  useEffect(() => {
    setText({ top: '', middle: '', bottom: '' });
  }, [currentMeme]);
  return (
    <EditorBox>
      <EditorImage currentMeme={currentMeme} text={text} color={color} />
      <RightBox>
        <EditorMemeList apiData={apiData} setCurrentMeme={setCurrentMeme} />
        <EditorForm
          currentMeme={currentMeme}
          text={text}
          setText={setText}
          color={color}
          setColor={setColor}
        />
      </RightBox>
    </EditorBox>
  );
}

export default Editor;

const EditorBox = styled.div`
  display: flex;
  height: 47rem;
  padding: 1.5em;
  border-radius: 5px;
  box-shadow: 0px 3px 14px -1px rgba(0, 0, 0, 0.75);
  overflow: hidden;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
