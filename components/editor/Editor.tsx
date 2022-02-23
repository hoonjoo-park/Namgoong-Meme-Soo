import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { API_DATA, LOCAL_MEME, TEXT_TYPE } from 'types';
import EditorForm from './EditorForm';
import EditorImage from './EditorImage';
import EditorMemeList from './EditorMemeList';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface Props {
  apiData: API_DATA[];
  currentMeme: API_DATA | null | LOCAL_MEME;
  setCurrentMeme: Dispatch<SetStateAction<API_DATA | null | LOCAL_MEME>>;
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
  const imageRef = useRef<HTMLDivElement>(null);

  const saveImage = async () => {
    if (imageRef.current) {
      const image = imageRef.current;
      const blob = await domtoimage.toBlob(image);
      saveAs(blob, 'meme.png');
    }
  };

  return (
    <EditorBox>
      <EditorImage
        currentMeme={currentMeme}
        setCurrentMeme={setCurrentMeme}
        text={text}
        color={color}
        ref={imageRef}
      />
      <RightBox>
        <EditorMemeList apiData={apiData} setCurrentMeme={setCurrentMeme} />
        <EditorForm
          currentMeme={currentMeme}
          text={text}
          setText={setText}
          color={color}
          setColor={setColor}
          saveImage={saveImage}
        />
      </RightBox>
    </EditorBox>
  );
}

export default Editor;

const EditorBox = styled.div`
  display: flex;
  height: 40rem;
  width: 70vw;
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
